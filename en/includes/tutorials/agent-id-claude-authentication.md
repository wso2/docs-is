# Authenticate Agents with their own Agent ID to Claude API Using Workload Identity Federation

This tutorial walks you through connecting an AI agent registered in {{product_name}} to the Claude API using [Anthropic's Workload Identity Federation (WIF)](https://docs.anthropic.com/en/docs/build-with-claude/workload-identity-federation/). By the end of this tutorial, your agent will authenticate with {{product_name}}, obtain a signed JWT, exchange it for a short-lived Claude access token, and make API calls without any static API keys.

## Overview

The authentication flow works as follows:

1. Your AI agent authenticates with {{product_name}} using its Agent ID and Secret.
2. {{product_name}} issues a signed JWT (access token) to the agent.
3. The agent presents this JWT to Anthropic's token endpoint.
4. Anthropic validates the JWT and returns a short-lived access token.
5. The agent uses the access token to call the Claude API.

## Prerequisites

Before you begin, ensure you have the following:

- An [Anthropic](https://console.anthropic.com/) account with access to the Claude Console.
{% if product_name == "WSO2 Identity Server" %}
- A deployed instance of {{product_name}} that is accessible via a public URL.
{% endif %}
- `curl` and `jq` installed on your machine (for the shell-based approach).
- Python 3.9+ (for the SDK-based approach).

{% if product_name == "WSO2 Identity Server" %}
!!! note
    To configure Anthropic to work with {{product_name}}, your {{product_name}} instance must be publicly accessible over HTTPS and serve traffic on port 443. Anthropic retrieves the JWKS endpoint only from a publicly accessible HTTPS endpoint.
{% endif %}

## Step 1: Register an Agent in {{product_name}}

This is what replaces the shared static API key. Each agent gets its own Agent ID and Secret, so it's a distinct principal your security model can reason about, not just a possessor of a key.

1. Log in to the {{product_name}} Console.
2. Navigate to **Agentic AI**.
3. Click **New Agent** and provide a descriptive name for your agent.
4. Assign the agent to appropriate groups and roles based on the resources it needs to access.
5. Note down the **Agent ID** and **Agent Secret** that {{product_name}} generates.

## Step 2: Create an Application in {{product_name}}

Your agent needs an OAuth application to obtain tokens through the app-native authentication flow.

The application is the channel the agent authenticates through. It's what issues the JWT that Claude will later validate, so its protocol settings (grant type, token type, audience) need to line up with what Claude's federation rule expects in Step 5.

1. Go to **Applications** and click **New Application**.
2. Select **Standard-Based Application**.
3. In the **Protocol** tab, configure the following:
   - Enable the **Authorization Code** grant type.
   - Set the access token type to **JWT**.
   - Add `https://api.anthropic.com` as an **audience** for the access token.
   - Set an authorized redirect URI (e.g., `https://example.com/callback`).
4. In the **Advanced** tab:
   - Enable **App Native Authentication**.
5. Click **Save** and note down the **Client ID**.

## Step 3: Configure {{product_name}} as a Federation Issuer in Claude Console

From this point on, Claude will accept identity assertions signed by {{product_name}}. Registering the issuer and JWKS URL is what lets Claude verify the JWT's signature without you managing any shared secret between the two systems.

1. In the Claude Console, go to **Settings > Workload Identity**.
2. Under **Issuers**, click **Add Issuer** and enter:
   - **Issuer URL**: `{{ api_base_path }}/oauth2/token`
   - **JWKS URL**: `{{ api_base_path }}/oauth2/jwks`
   - **Name**: `{{product_name}}-agents`
3. Click **Save**.

## Step 4: Create a Service Account in Claude

The service account is the identity the agent acts as on the Claude side. It's the counterpart to the Agent ID in {{product_name}}: one named, workspace-scoped principal in Claude that a federation rule will map the agent to.

1. In the Claude Console, go to **Settings > Service Accounts**.
2. Click **Create Service Account** and give it a descriptive name (e.g., `booking-agent`).
3. Add the service account to the workspace where it needs API access.
4. Note down the **Service Account ID** (format: `svac_...`).

## Step 5: Create a Federation Rule

This is where the policy actually lives. The rule binds a JWT's issuer and subject claim to a specific service account, so pinning on issuer alone isn't enough: any agent under that issuer could assume any service account. Pinning iss + sub together ensures one agent can't impersonate another, even within the same federation.

1. In the Claude Console, go to **Settings > Workload Identity > Federation Rules**.
2. Click **Create Rule** and configure:
   - **Issuer**: Select the `{{product_name}}-agents` issuer you created in Step 3.
   - **Subject claim**: Set this to the Agent ID from {{product_name}} (the `sub` claim value in the JWT).
   - **Audience**: `https://api.anthropic.com`
   - **Service Account**: Select the service account you created in Step 4.
   - **Token lifetime**: `600` seconds (10 minutes).
3. Enable the rule for the workspace(s) where the agent needs access.
4. Click **Save** and note down the **Federation Rule ID** (format: `fdrl_...`).

!!! note
    If you enable the rule across multiple workspaces, you must include the `workspace_id` parameter in the token exchange request. Without it, Anthropic returns an error: `"rule is enabled for more than one workspace; pass workspace_id to choose one"`.

## Step 6: Authenticate Your Agent

With all the configuration in place, your agent can now authenticate and call the Claude API.

### Option A: Shell Script

This approach demonstrates the full flow using `curl` commands.

#### Phase 1: Obtain an Identity Token from {{product_name}}

The agent authenticates with {{product_name}} using the app-native authentication API. This is a redirect-free, API-driven flow that uses PKCE (RFC 7636) for security. The flow involves three API calls:

1. Initiate an authorize request with `response_mode=direct` and PKCE parameters.
2. Authenticate with the Agent ID and Secret via the `/authn` endpoint.
3. Exchange the resulting authorization code for a JWT access token.

For the complete walkthrough of this flow, see the [{{product_name}} documentation on AI agent authentication]({{base_path}}/guides/agentic-ai/ai-agents/agent-authentication/#ai-agent-acting-on-its-own/).

The resulting `access_token` from {{product_name}} is a signed JWT that you will present to Claude's WIF.

#### Phase 2: Exchange the JWT for a Claude Access Token

Present the {{product_name}}-issued JWT to Anthropic's token endpoint:

```bash
ANTHROPIC_RESPONSE=$(curl -s https://api.anthropic.com/v1/oauth/token \
  -H 'content-type: application/json' \
  --data '{
    "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
    "assertion": "'$JWT'",
    "federation_rule_id": "fdrl_...",
    "organization_id": "<your-anthropic-org-id>",
    "service_account_id": "svac_...",
    "workspace_id": "wrkspc_..."
  }')

ACCESS_TOKEN=$(echo "$ANTHROPIC_RESPONSE" | jq -r .access_token)
```

#### Phase 3: Call the Claude API

Use the short-lived access token to make API calls:

```bash
curl -s https://api.anthropic.com/v1/messages \
  -H "authorization: Bearer $ACCESS_TOKEN" \
  -H 'anthropic-version: 2023-06-01' \
  -H 'content-type: application/json' \
  --data '{
    "model": "claude-sonnet-4-6",
    "max_tokens": 1024,
    "messages": [{"role": "user", "content": "Hello, Claude"}]
  }'
```

### Option B: Python SDK

For production agents, use the Anthropic Python SDK with the {{product_name}} Python SDK for automatic token management.

#### Install dependencies

```bash
pip install anthropic asgardeo asgardeo-ai
```

#### Complete example

```python
import asyncio
import time
from asgardeo import AsgardeoConfig
from asgardeo_ai import AgentAuthManager, AgentConfig
from anthropic import Anthropic, WorkloadIdentityCredentials

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

class AgentIDTokenProvider:
    """Provides identity tokens from {{product_name}} for Anthropic WIF.

    Caches the token and refreshes automatically when expired.
    The Anthropic SDK calls this provider whenever it needs a
    new identity token for the WIF exchange.
    """

    EXPIRY_BUFFER_SECONDS = 60

    def __init__(self, identity_provider_config, agent_cfg, scopes=None):
        self.identity_provider_config = identity_provider_config
        self.agent_cfg = agent_cfg
        self.scopes = scopes or ["openid", "profile"]
        self._cached_token = None
        self._token_expiry = 0

    def __call__(self):
        if self._is_token_valid():
            return self._cached_token
        return asyncio.run(self._refresh_token())

    def _is_token_valid(self):
        if self._cached_token is None:
            return False
        return time.time() < (
            self._token_expiry - self.EXPIRY_BUFFER_SECONDS
        )

    async def _refresh_token(self):
        async with AgentAuthManager(
            self.identity_provider_config, self.agent_cfg
        ) as auth_manager:
            agent_token = await auth_manager.get_agent_token(
                self.scopes
            )
            self._cached_token = agent_token.access_token
            self._token_expiry = (
                time.time() + agent_token.expires_in
            )
            return self._cached_token

# Initialize the token provider and Anthropic client
token_provider = AgentIDTokenProvider(config, agent_config)

client = Anthropic(
    credentials=WorkloadIdentityCredentials(
        identity_token_provider=token_provider,
        federation_rule_id="fdrl_...",
        organization_id="<your-anthropic-org-id>",
        service_account_id="svac_...",
        workspace_id="wrkspc_...",
    ),
)

# Make an API call
message = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    messages=[{"role": "user", "content": "Hello, Claude"}],
)
print(message.content[0].text)
```

The `AgentIDTokenProvider` handles token caching and refresh with a 60-second buffer before expiry. The Anthropic SDK's `WorkloadIdentityCredentials` manages the Claude access token lifecycle independently, calling the provider whenever it needs a fresh identity token for the WIF exchange. Together, they allow long-running agents to operate continuously without manual token management.

## What's Next

- Learn more about [{{product_name}} Agent ID]({{base_path}}/guides/agentic-ai/ai-agents/).
- Secure agents access to [MCP Servers]({{base_path}}/guides/agentic-ai/mcp/)
