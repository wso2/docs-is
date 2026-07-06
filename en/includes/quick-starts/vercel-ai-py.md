# Vercel AI Quickstart (Python)

This quickstart shows you how to create AI agent identities in {{ product_name }}, authenticate agents using their credentials, and securely connect them to MCP servers with Vercel AI.

[//] STEPS_START

## Register an AI agent

To give your AI agent an identity, first register it in {{ product_name }}.

- Sign in to the [{{ product_name }}](https://console.asgardeo.io/) console and go to **Agents**, and then click **+ New Agent**.
- Enter the following details:
    - **Name:** A descriptive name for your AI agent _(e.g., Math Assistant)_.
- Click **Create** to complete the registration.

After registering the agent, you'll receive an **Agent ID** and an **Agent Secret**. The Agent Secret is shown only once, so make sure to store it securely. You'll need these credentials later in this guide.

## Configure and run the sample MCP Server

To let your agent (or a user acting through the agent) authenticate and connect to a secure MCP server, first create an MCP Client in {{ product_name }}.

- In [{{ product_name }}](https://console.asgardeo.io/) console, navigate to **Applications > New Application**.
- Select **MCP Client Application** and complete the wizard pop-up by providing the following details.
    - Name: A descriptive name for your MCP client application _(e.g., MCP Client)_.
    - Authorized redirect URL: The authorized redirect URL  _(e.g.,http://localhost:6274/oauth/callback)_.

!!! Info
    The **authorized redirect URL** defines the location {{ product_name }} sends users to after a successful login, typically the address of the client application that connects to the MCP server.
    In this guide, the AI agent behaves as the client, which consists of a lightweight OAuth 2.1 callback server running at `http://localhost:6274/oauth/callback` to capture the authorization code. So, we will use this URL as the authorized redirect for this guide.

Make a note of the **client-id** from the **Protocol** tab of the registered application. You will need it during the [Build an AI Agent](#build-an-ai-agent) section of this guide.

Your AI agent will call an MCP tool hosted on a secure MCP server. You can:

- Follow the [MCP Auth Server Quickstart](https://wso2.com/identity-platform/docs/quick-starts/mcp-auth-server/#add-auth-to-the-mcp-server) to set one up quickly (Recommended), or
- Use your own MCP server secured with {{ product_name }}

## Build an AI Agent

Create a directory called `agent-auth-quickstart` by running the following commands.

```bash

  mkdir agent-auth-quickstart

  cd agent-auth-quickstart
  
```

Then set up and activate a Python virtual environment using the following commands.

=== "macOS/Linux"

    ```bash
    python3 -m venv .venv

    source .venv/bin/activate
    ```

=== "Windows"

    ```bash
    python -m venv .venv

    .venv\Scripts\activate
    ```

Install the following dependencies.

```bash

pip install asgardeo asgardeo_ai python-dotenv vercel-ai-sdk==0.0.1.dev4

```

Create `main.py` that implements an AI agent which first obtains a valid access token from **{{ product_name }}** by authenticating itself. The agent then includes that token in the `Authorization` header (for example `Authorization: Bearer <token>`) when calling the MCP tool.

```python title="main.py"

import os
import asyncio

from dotenv import load_dotenv
from pathlib import Path

from asgardeo import AsgardeoConfig
from asgardeo_ai import AgentConfig, AgentAuthManager

import vercel_ai_sdk as ai

# Load environment variables from .env file
load_dotenv()

ASGARDEO_CONFIG = AsgardeoConfig(
    base_url=os.getenv("ASGARDEO_BASE_URL"),
    client_id=os.getenv("CLIENT_ID"),
    redirect_uri=os.getenv("REDIRECT_URI")
)

AGENT_CONFIG = AgentConfig(
    agent_id=os.getenv("AGENT_ID"),
    agent_secret=os.getenv("AGENT_SECRET")
)

async def my_agent(llm, messages, auth_token):

    tools = await ai.mcp.get_http_tools(
        os.getenv("MCP_SERVER_URL"),
        headers={
            "Authorization": f"Bearer {auth_token}"
        }
    )

    return await ai.stream_loop(llm, messages, tools=tools)


async def main():
    async with AgentAuthManager(ASGARDEO_CONFIG, AGENT_CONFIG) as auth_manager:
        agent_token = await auth_manager.get_agent_token(["openid"])

        google_key = os.getenv("GOOGLE_API_KEY", "")
        os.environ["OPENAI_API_KEY"] = google_key
        os.environ["OPENAI_BASE_URL"] = "https://generativelanguage.googleapis.com/v1beta/openai/"

        llm = ai.openai.OpenAIModel(
            model=os.getenv("MODEL_NAME")
        )

        while True:
            user_input = input("\nEnter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: ")
            messages = ai.make_messages(user=user_input)

            # Exit the loop if the user types "exit"
            if user_input.lower() == "exit":
                print("Exiting the program. Goodbye!")
                break
            result = ai.run(my_agent, llm, messages, agent_token.access_token)

            print("\nAgent Response: ", end="")

            async for msg in result:
                if getattr(msg, "text_delta", None):
                    print(msg.text_delta, end="", flush=True)

            print()

if __name__ == "__main__":
asyncio.run(main())

```

Add environment configuration by creating a `.env` file at the project root to hold the {{ product_name }} configuration:

```properties title=".env"

# WSO2 Identity Platform OAuth2 Configuration
ASGARDEO_BASE_URL=https://api.asgardeo.io/t/<your-tenant>
CLIENT_ID=<your-client-id>
REDIRECT_URI=http://localhost:6274/oauth/callback

# WSO2 Identity Platform Agent Credentials
AGENT_ID=<agent_id>
AGENT_SECRET=<agent_secret>

# Google Gemini API Key
GOOGLE_API_KEY=<google_api_key>

# MCP Server URL
MCP_SERVER_URL=<mcp_server_url>

# LLM model used by the agent (any supported model can be used).
MODEL_NAME="gemini-2.5-flash"

```

!!! Important

    - Replace `<your-tenant>`, `<your-client-id>`and the redirect URL with the values obtained from the {{ product_name }} console.
      The tenant name is visible in the console URL path (e.g., `https://console.asgardeo.io/t/<your-tenant>`), and the `client ID` can be found in the application's **Protocol** tab.

    - Add the `Agent ID` and `Agent Secret` from the [Agent Registration](#register-an-ai-agent) step.

    - You’ll need a Google API key to use Gemini as your model. You can generate one from [Google AI Studio](https://aistudio.google.com/app/api-keys)

    - Replace `<mcp_server_url>` with your MCP server’s URL.
      If you followed the [MCP Auth Server quickstart](https://wso2.com/asgardeo/docs/quick-starts/mcp-auth-server/#add-auth-to-the-mcp-server), you can use: `http://127.0.0.1:8000/mcp`

Your project folder should now look like this:

```bash
├── main.py              # Your AI Agent
└── .env                 # Your WSO2 Identity Platform configs
```

## Test the Agent Login Flow

Start your AI Agent by running the following command.

```bash

  python main.py

```

If authentication succeeds, your agent will prompt you for a question and securely invoke the MCP tool.

```bash

Enter your question: Can you add twenty two and twelve?
Agent Response: The sum of twenty two and twelve is 34.

```

If authentication fails, the MCP server will return:

```bash

httpx.HTTPStatusError: Client error '401 Unauthorized'

```

To test the setup without authentication, simply remove the `Authorization` header from your client configuration, as shown below:

```python
...
tools = await ai.mcp.get_http_tools(
os.getenv("MCP_SERVER_URL"),
    )
...

```

## Test the On-Behalf-Of Flow

In the previous step, the AI agent authenticated **itself** using its own credentials.
Now, let’s look at the scenario where **the agent authenticates on behalf of a user**.

This flow uses:

- Authorization code issued after the user logs in
- PKCE (Proof Key for Code Exchange) to ensure only your agent can securely exchange the authorization code for the OBO token
- A final token exchange that produces an **OBO token**, representing the user

Your AI agent will then call the MCP server _as the authenticated user_.

During the OBO flow, {{ product_name }} redirects back to your client application with an `authorization code` after the user logs in.
To handle this, create a file named `oauth_callback.py` with the following implementation at the project root. This lightweight HTTP server listens for the redirect and captures `authorization_code` and `state`.

<details>
<summary>Expand to view the implementation of `oauth_callback.py`</summary>

```python title="oauth_callback.py"

import http.server
import socketserver
import threading
import asyncio
from urllib.parse import urlparse, parse_qs

class OAuthCallbackServer:
    def __init__(self, port: int = 6274, timeout: int = 120):
        self.port = port
        self.timeout = timeout
        self.auth_code = None
        self.state = None
        self._error = None
        self._httpd = None

    class _Handler(http.server.SimpleHTTPRequestHandler):
        parent = None

        def do_GET(self):
            url = urlparse(self.path)
            params = parse_qs(url.query)

            # OAuth error case
            if "error" in params:
                self.parent._error = params["error"][0]
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"Authorization cancelled or failed. You can close this window.")
                return

            # Success case
            if "code" in params:
                self.parent.auth_code = params["code"][0]
                self.parent.state = params.get("state", [None])[0]
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"Authentication successful. You can close this window.")
                return

            # Invalid callback
            if url.path != "/oauth/callback":
                self.parent._error = "Invalid Callback URL"
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"Invalid redirect. You can close this window.")
                return

    def start(self):
        handler = self._Handler
        handler.parent = self

        self._httpd = socketserver.TCPServer(("localhost", self.port), handler)
        thread = threading.Thread(target=self._httpd.serve_forever)
        thread.daemon = True
        thread.start()

    def stop(self):
        if self._httpd:
            self._httpd.shutdown()

    async def wait_for_code(self):
        """Returns (auth_code, state). auth_code==None means canceled, error, or timed out."""
        elapsed = 0
        while self.auth_code is None and self._error is None and elapsed < self.timeout:
            await asyncio.sleep(0.1)
            elapsed += 0.1

        return (self.auth_code, self.state, self._error)
```

</details>

Then, update the `main.py` to perform the OBO Flow. This will:

- Authenticate the agent
- Generate an authorization URL for the user
- Capture the authorization code
- Exchange the code + agent token for an OBO token
- Call the MCP server using the OBO token

Here is the updated implementation:

```python title="main.py"

import os
import asyncio
import sys
import webbrowser

import vercel_ai_sdk as ai

from dotenv import load_dotenv
from pathlib import Path

from asgardeo import AsgardeoConfig
from asgardeo_ai import AgentConfig, AgentAuthManager

from oauth_callback import OAuthCallbackServer

# Load environment variables from .env file
load_dotenv()

ASGARDEO_CONFIG = AsgardeoConfig(
    base_url=os.getenv("ASGARDEO_BASE_URL"),
    client_id=os.getenv("CLIENT_ID"),
    redirect_uri=os.getenv("REDIRECT_URI")
)

AGENT_CONFIG = AgentConfig(
    agent_id=os.getenv("AGENT_ID"),
    agent_secret=os.getenv("AGENT_SECRET")
)

# 1. Define the agent logic (no decorators needed)
async def my_agent(llm, messages, auth_token):

    # Connect to MCP Server using the user's OBO token
    tools = await ai.mcp.get_http_tools(
        os.getenv("MCP_SERVER_URL"),
        headers={
            "Authorization": f"Bearer {auth_token}"
        }
    )

    # Execute the agent tool loop
    return await ai.stream_loop(llm, messages, tools=tools)


async def main():
    async with AgentAuthManager(ASGARDEO_CONFIG, AGENT_CONFIG) as auth_manager:
        agent_token = await auth_manager.get_agent_token(["openid", "email"])

        auth_url, state, code_verifier = auth_manager.get_authorization_url_with_pkce(["openid", "email"])

        callback = OAuthCallbackServer(port=6274)
        callback.start()

        print(f"\nOpening browser for authentication...")
        webbrowser.open(auth_url)

        auth_code, returned_state, error = await callback.wait_for_code()
        callback.stop()

        if auth_code is None:
            print(f"Authorization failed or cancelled. Error: {error}")
            return

        obo_token = await auth_manager.get_obo_token(auth_code, agent_token=agent_token, code_verifier=code_verifier)

        google_key = os.getenv("GOOGLE_API_KEY", "")
        os.environ["OPENAI_API_KEY"] = google_key
        os.environ["OPENAI_BASE_URL"] = "https://generativelanguage.googleapis.com/v1beta/openai/"

        llm = ai.openai.OpenAIModel(
            model=os.getenv("MODEL_NAME")
        )

        while True:
            user_input = input("\nEnter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: ")

            # Exit the loop if the user types "exit"
            if user_input.lower() == "exit":
                print("Exiting the program. Goodbye!")
                break

            messages = ai.make_messages(user=user_input)
            result = ai.run(my_agent, llm, messages, obo_token.access_token)

            print("\nAgent Response: ", end="")

            # Stream the output token-by-token
            async for msg in result:
                if getattr(msg, "text_delta", None):
                    print(msg.text_delta, end="", flush=True)
            print()

if __name__ == "__main__":
asyncio.run(main())

```

After adding OBO support, your project should look like this:

```bash
├── main.py              # AI agent with OBO authentication flow
├── oauth_callback.py    # Captures OAuth redirect from WSO2 Identity Platform
└── .env                 # Environment configuration
```

Start your agent:

```bash

  python main.py

```

You will see an output similar to this and your default browser will open, prompting you to log in:

```bash

    Opening browser for authentication...

```

!!! Info
    You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="\_blank"} to try out the login feature.

After successful login, return to the terminal. Your agent will automatically resume once it receives the authorization code and call the MCP tool on behalf of the authenticated user.

```bash

    Successfully obtained OBO Token.

    Enter your question (e.g., 'Add 45 and 99') or type 'exit' to quit:
    
```

Your AI agent has now successfully performed an authenticated, user-authorized, On-Behalf-Of request to your MCP server.

[//] STEPS_END
