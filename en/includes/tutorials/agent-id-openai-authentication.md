# Authenticate Agents with their own Agent ID to OpenAI API Using Workload Identity Federation

This tutorial walks you through connecting an AI agent registered in {{product_name}} to the OpenAI API using [OpenAI's Workload Identity Federation (WIF)](https://developers.openai.com/api/docs/guides/workload-identity-federation). By the end of this tutorial, your agent will authenticate with {{product_name}}, obtain a signed JWT, exchange it for a short-lived OpenAI access token, and make API calls without any static API keys.

## Overview

The authentication flow works as follows:

1. Your AI agent authenticates with {{product_name}} using its Agent ID and Secret.
2. {{product_name}} issues a signed JWT (access token) to the agent.
3. The agent presents this JWT to OpenAI's token endpoint.
4. OpenAI validates the JWT and returns a short-lived access token.
5. The agent uses the access token to call the OpenAI API.

## Prerequisites

Before you begin, ensure you have the following:

- An [OpenAI Developer](https://developers.openai.com/) account with access to the [API Platform](https://platform.openai.com/login).
- `curl` and `jq` installed on your machine (for the shell-based approach).
- Python 3.9+ (for the SDK-based approach).

## Step 1: Register an Agent in {{product_name}}

This is what replaces the shared static API key. Each agent gets its own Agent ID and Secret, so it's a distinct principal your security model can reason about, not just a possessor of a key.

1. Log in to the {{product_name}} Console.
2. Navigate to **Agents** tab.
3. Click **New Agent** and provide a descriptive name for your agent.
4. Assign the agent to appropriate groups and roles based on the resources it needs to access.
5. Note down the **Agent ID** and **Agent Secret** that {{product_name}} generates.

## Step 2: Create an Application in {{product_name}}

Your agent needs an OAuth application to obtain tokens through the app-native authentication flow.

The application is the channel the agent authenticates through. It's what issues the JWT that OpenAI will later validate, so its protocol settings (grant type, token type, audience) need to line up with what OpenAI's identity provider settings expects.

1. Go to **Applications**, click **New Application** and select **Standard-Based Application**.
2. Give a suitable name and tick the box with **Allow AI agents to sign into this application**.
3. In the **Protocol** tab, configure the following:
    - Enable the **Authorization Code** grant type.
    - Make sure Access token type is **JWT**.
    - Set an authorized redirect URI (e.g., `https://example.com/callback`).
4. From the **Advanced** tab, enable **App Native Authentication**.
5. Click **Save** and note down the **Client ID** and **Client Secret**.

## Step 3: Configure {{product_name}} as a Workload Identity Provider in OpenAI Platform

From this point on, OpenAI will accept identity assertions signed by {{product_name}}. Registering the issuer and JWKS URL is what lets OpenAI verify the JWT's signature without you managing any shared secret between the two systems.

1. In the OpenAI Platform, go to **Security > Workload Identity Provider**.
2. Click on **Create Identity Provider** and configure the following.
    - **OIDC Issuer URL**: `{{ api_base_path }}/oauth2/token`
    - **Audience**: `<your-application-client-id>`
    {% if product_name == "WSO2 Identity Server" %}
    - If you are running a local instance of {{product_name}}, check **Use uploaded JWKS for token verification** and paste your JWKS JSON in the textbox.
    {% endif %}
3. Click **create** and note down the **Provider ID** (format: `idp_...`).

{% if product_name == "WSO2 Identity Server" %}
!!! note
    To get the JWKS JSON from your local {{product_name}} instance, you can fetch the `{{api_base_path}}/oauth2/jwks` endpoint. When enabled, OpenAI verifies tokens against this uploaded JWKS instead of fetching keys from OIDC discovery.
{% endif %}

## Step 4: Set Up the Service Account Mapping in OpenAI Platform

The service account is the identity the agent acts as on the OpenAI side. A service account mapping defines which external identities can mint access tokens for an OpenAI service account. This mapping enables OpenAI to bind JWT's issuer and subject claims to a specific service account.

1. In the OpenAI Platform, go to **Security** and click on the workload identity provider you just created.
2. Click on **Create mapping**.
    - Set Name to be a unique value within the Workload Identity Provider.
    - Set the **Agent ID** (from {{product_name}}) as the `sub` claim value.
    - If needed, you can add more claims to validate such as `act`. OpenAI makes sure all the cliams are matching before issuing a new token.
    - Set **Project** to the OpenAI project that owns the target service account.
    - Give a name to the service account. Check the box to create a new account.
    - Select appropriate permissions to further narrow access tokens minted from this mapping.
3. Click **create**.
4. Note down the **service account ID** (format: `user-..`). You can get the service account id either from hovering over the 'i' symbol or going to the **People** tab.

## Step 5: Authenticate Your Agent

With all the configuration in place, your agent can now authenticate and call the OpenAI API.

### Option A: Shell Script

This approach demonstrates the full flow using `curl` commands.

#### Phase 1: Obtain an Identity Token from {{product_name}}

The agent authenticates with {{product_name}} using the app-native authentication API. This is a redirect-free, API-driven flow that uses PKCE (RFC 7636) for security. The flow involves three API calls:

1. Initiate an authorize request with `response_mode=direct` and PKCE parameters.
2. Authenticate with the Agent ID and Secret via the `/authn` endpoint.
3. Exchange the resulting authorization code for a JWT access token.

For the complete walkthrough of this flow, see the [{{product_name}} documentation on AI agent authentication]({{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#ai-agent-acting-on-its-own/).

The resulting `access_token` from {{product_name}} is a signed JWT that you will present to OpenAI's WIF.

#### Phase 2: Exchange the JWT for a OpenAI Access Token

Present the {{product_name}}-issued JWT to OpenAI's token endpoint:

```bash
OPENAI_RESPONSE=$(curl -s https://auth.openai.com/oauth/token \
  -H 'content-type: application/json' \
  --data '{
    "grant_type": "urn:ietf:params:oauth:grant-type:token-exchange",
    "subject_token_type": "urn:ietf:params:oauth:token-type:jwt",
    "subject_token": "'$JWT'",
    "identity_provider_id": "idp_...",
    "service_account_id": "user-..."
  }')

ACCESS_TOKEN=$(echo "$OPENAI_RESPONSE" | jq -r .access_token)
```

#### Phase 3: Call the OpenAI API

Use the short-lived access token to make API calls:

```bash
curl -s https://api.openai.com/v1/responses \
  -H "authorization: Bearer $ACCESS_TOKEN" \
  -H 'content-type: application/json' \
  --data '{
    "model": "gpt-5.4-mini",
    "input": "write a 3 word sentence",
    "store": true
  }'
```

### Option B: Python SDK

For production agents, use the OpenAI Python SDK with the {{product_name}} Python SDK for automatic token management.

#### Install dependencies

```bash
pip install openai asgardeo asgardeo-ai
```

#### Complete example

```python
import asyncio
import time
from asgardeo import AsgardeoConfig
from asgardeo_ai import AgentAuthManager, AgentConfig
from openai import OpenAI
from openai.auth import SubjectTokenProvider

# {{product_name}} configuration
config = AsgardeoConfig(
    base_url="{{ api_base_path }}",
    client_id="<your-client-id>",
    client_secret="<your-client-secret>",
    redirect_uri="<your-redirect-uri>",
)

# Agent credentials
agent_config = AgentConfig(
    agent_id="<your-agent-id>",
    agent_secret="<your-agent-secret>",
)

def token_provider(
        identity_provider_config: AsgardeoConfig,
        agent_cfg: AgentConfig,
        scopes=["openid", "profile"]
    ) -> SubjectTokenProvider:
    """
    Provide JWT access token from {{product_name}} to OpenAI WIF.

    It caches the token and refreshes automatically when expired.
    The OpenAI SDK calls this function whenever it needs a
    new token for the WIF exchange.
    """

    EXPIRY_BUFFER_SECONDS = 60
    cached_token : str | None = None
    token_expiry : float = 0

    def is_token_valid():
        if cached_token is None:
            return False
        return time.time() < (
            token_expiry - EXPIRY_BUFFER_SECONDS
        )
    
    async def refresh_token():
        nonlocal cached_token, token_expiry
        async with AgentAuthManager(
            identity_provider_config, agent_cfg
        ) as auth_manager:
            agent_token = await auth_manager.get_agent_token(scopes)
            cached_token = agent_token.access_token
            token_expiry = (
                time.time() + agent_token.expires_in
            )
            return cached_token
    
    def get_token() -> str:
        if is_token_valid():
            return cached_token
        return asyncio.run(refresh_token())
        
    return {"token_type": "jwt", "get_token": get_token}

# Initialize the OpenAI client
client = OpenAI(
    workload_identity={
        "identity_provider_id": "idp_...",
        "service_account_id": "user-...",
        "provider": token_provider(config, agent_config)
    },
)

# Make an API call
response = client.responses.create(
    model="gpt-5.4-mini",
    input="Write a 3 word sentence"
)

print(response.output_text)
```

The `token_provider()` function handles token caching and refresh with a 60-second buffer before expiry. The OpenAI SDK manages the OpenAI access token lifecycle independently, calling the provider whenever it needs a fresh identity token for the WIF exchange. Together, they allow long-running agents to operate continuously without manual token management.

## What's Next

- Learn more about [{{product_name}} Agent ID]({{base_path}}/guides/agentic-ai/ai-agents/).
- Secure agents access to [MCP Servers]({{base_path}}/guides/agentic-ai/mcp/)
