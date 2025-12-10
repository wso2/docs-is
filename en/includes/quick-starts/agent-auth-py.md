# AI Agent Authentication Quickstart

Welcome to the AI Agent Authentication Quickstart!

This guide walks you through authenticating AI agents with **{{ product_name }}** and integrating them seamlessly with secure MCP servers using Python with modern agent frameworks and cutting-edge AI models.

By the end of this guide, you will have:

- An AI agent that authenticates using Agent Credentials (AI agent acting on its own)
- An AI agent that performs On-Behalf-Of (OBO) authentication using PKCE + authorization code flow
- A working AI agent that calls an MCP server with valid {{ product_name }}-issued tokens
- A clear understanding of both authentication scenarios described in [Agent Authentication Guide](https://wso2.com/asgardeo/docs/guides/agentic-ai/ai-agents/agent-authentication/)

You do not need prior agent development experience. Everything you need is explained as you go.

[//] STEPS_START

## Register an AI agent

To enable authentication for your AI agent, begin by registering it in {{ product_name }}.

- Sign in to [{{ product_name }}](https://console.asgardeo.io/) console and go to **Agents**.
- Click **+ New Agent**.
- Provide:
  - Name: A descriptive name for your AI agent for human-readable display purposes
  - Description (optional): Purpose and functionality of the agent
- Click **Create** to complete the registration.

After successful registration, your agent will receive a unique **Agent ID** and an **Agent Secret** which is shown only once. Make sure to store them securely, as you’ll need them later in this guide.

## Configure an Application in {{ product_name }}

To allow your agent (or user acting through the agent) to authenticate and connect to a secure MCP server, an application in {{ product_name }} needs to be set up first.

- In [{{ product_name }}](https://console.asgardeo.io/) console, navigate to **Applications > New Application**.
- Select **MCP Client Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    Name : AgentAuthenticatorApp

    Authorized redirect URL: http://localhost:6274/oauth/callback

!!! Info
    The **authorized redirect URL** defines the location Asgardeo sends users to after a successful login, typically the address of the client application that connects to the MCP server.
    In this guide, the AI agent behaves as the client which consists of a lightweight OAuth 2.1 callback server runs at `http://localhost:6274/oauth/callback` to capture the authorization code. So, we will use this URL as the authorized redirect for this guide.

Make a note of the **client-id** from the **Protocol** tab of the registered application. You will need it during the [Build an AI Agent](#build-an-ai-agent) section of this guide.

## Run the MCP Server

Your AI agent will call an MCP tool hosted on a secure MCP server. You can:

- Follow the [MCP Auth Server Quickstart](https://wso2.com/asgardeo/docs/quick-starts/mcp-auth-server/#add-auth-to-the-mcp-server) to set one up quickly (Recommended), or
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

Pick your agent development framework and install the corresponding dependencies.

=== "LangChain"

    ```bash
    pip install asgardeo asgardeo_ai langchain langchain-google-genai langchain-mcp-adapters python-dotenv
    ```

=== "Google ADK"

    ```bash
    pip install asgardeo asgardeo_ai python-dotenv google-adk==1.20.0 google-genai==1.53.0
    ```

Create `main.py` that implements an AI agent which first obtains a valid access token from **{{ product_name }}** by authenticating itself. The agent then includes that token in the `Authorization` header (for example `Authorization: Bearer <token>`) when calling the MCP tool.

=== "LangChain"

    ```python title="main.py"
    import os
    import asyncio
    
    from dotenv import load_dotenv
    from pathlib import Path
    
    from asgardeo import AsgardeoConfig, AsgardeoNativeAuthClient
    from asgardeo_ai import AgentConfig, AgentAuthManager
    
    from langchain_mcp_adapters.client import MultiServerMCPClient
    from langchain.agents import create_agent
    from langchain_google_genai import ChatGoogleGenerativeAI
    
    
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
    
    
    async def main():
    
        # Scenario 1: AI agent acting on its own using its own credentials to authenticate
        async with AgentAuthManager(ASGARDEO_CONFIG, AGENT_CONFIG) as auth_manager:
            # Get agent token
            agent_token = await auth_manager.get_agent_token(["openid"])
    
    
        # Connect to MCP Server with Authorization Header
        client = MultiServerMCPClient(
            {
                "mcp_server": {
                    "transport": "streamable_http",
                    "url": "<mcp_server_url>",
                    "headers": {
                        "Authorization": f"Bearer {agent_token.access_token}"
                    }
                }
            }
        )
    
        # LLM (Gemini) + LangChain Agent
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            temperature=0.9
        )
    
        tools = await client.get_tools()
        agent = create_agent(llm, tools)
    
        user_input = input("Enter your question: ")
    
        # Invoke the agent
        response = await agent.ainvoke(
            {"messages": [{"role": "user", "content": user_input}]}
        )
    
        print("Agent Response:", response["messages"][-1].content)
    
    
    # Run app
    if __name__ == "__main__":
        asyncio.run(main())
    
    ```

=== "Google ADK"

    ```python title="main.py"
    import os
    import asyncio
    from pathlib import Path
    from dotenv import load_dotenv
    
    from asgardeo import AsgardeoConfig
    from asgardeo_ai import AgentConfig, AgentAuthManager
    
    from google.adk.agents.llm_agent import LlmAgent
    from google.adk.runners import InMemoryRunner
    from google.adk.tools.mcp_tool import McpToolset
    from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPConnectionParams
    from google.genai import types
    
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
    
    async def build_toolset():
        async with AgentAuthManager(ASGARDEO_CONFIG, AGENT_CONFIG) as auth_manager:
            # Get agent token
            agent_token = await auth_manager.get_agent_token(["openid"])
    
        # Connect to MCP Server with Auth Header
        return McpToolset(
            connection_params=StreamableHTTPConnectionParams(
                url= "<mcp_server_url>",
                headers={"Authorization": f"Bearer {agent_token.access_token}"}
            )
        )
    
    async def main():
    
        mcp_toolset = await build_toolset()
    
        # Define LLM Agent (Gemini)
        agent = LlmAgent(
            model="gemini-2.0-flash",
            name="add_agent",
            description="Adds two numbers using an MCP server.",
            instruction="When the user asks to add numbers, call the MCP tool `add(a, b)`.",
            tools=[mcp_toolset],
        )
    
        # Setup runner + session
        runner = InMemoryRunner(agent, app_name="add_numbers_app")
    
        session = await runner.session_service.create_session(
            app_name="add_numbers_app",
            user_id="user"
        )
    
        question = input("Enter your question: ")
    
        try:
            async for event in runner.run_async(
                    user_id="user",
                    session_id=session.id,
                    new_message=types.Content(
                        role="user",
                        parts=[types.Part(text=question)]
                    ),
            ):
                if event.content and event.content.parts:
                    text = event.content.parts[0].text
                    if text:
                        print(text)
    
        finally:
            await mcp_toolset.close()
            await runner.close()
    
    if __name__ == "__main__":
        asyncio.run(main())

    ```

!!! Important
    Replace `<mcp_server_url>` with your MCP server’s URL.
    If you followed the [MCP Auth Server quickstart](https://wso2.com/asgardeo/docs/quick-starts/mcp-auth-server/#add-auth-to-the-mcp-server), you can use: `http://127.0.0.1:8000/mcp`

Add environment configuration by creating a `.env` file at the project root to hold the {{ product_name }} configuration:

```properties title=".env"
# Asgardeo OAuth2 Configuration
ASGARDEO_BASE_URL=https://api.asgardeo.io/t/<your-tenant>
CLIENT_ID=<your-client-id>
REDIRECT_URI=http://localhost:6274/oauth/callback

# Asgardeo Agent Credentials
AGENT_ID=<agent_id>
AGENT_SECRET=<agent_secret>

# Google Gemini API Key
GOOGLE_API_KEY=<google_api_key>
```

!!! Important

    - Replace `<your-tenant>`, `<your-client-id>`and the redirect URL with the values obtained from the {{ product_name }} console.
      The tenant name is visible in the console URL path (e.g., `https://console.asgardeo.io/t/<your-tenant>`), and the `client ID` can be found in the application's **Protocol** tab.

    - Add the `Agent ID` and `Agent Secret` from the [Agent Registration](#register-an-ai-agent) step.

    - You’ll need a Google API key to use Gemini as your model. You can generate one from [Google AI Studio](https://aistudio.google.com/app/api-keys)

## Project Structure

Your project folder should now look like this:

``` bash
├── main.py              # Your AI Agent
└── .env                 # Your Asgardeo configs
```

## Run and Test with Authentication

Start your AI Agent by running the following command.

``` bash
  python main.py
```

If authentication succeeds, your agent will prompt you for a question and securely invoke the MCP tool.

``` bash
Enter your question: Can you add twenty two and twelve?
Agent Response: The sum of twenty two and twelve is 34.
```

If authentication fails, the MCP server will return:

``` bash
httpx.HTTPStatusError: Client error '401 Unauthorized'
```

To test the setup without authentication, simply remove the `Authorization` header from your client configuration, as shown below:

=== "LangChain"

    ```python
    ...
    client = MultiServerMCPClient(
        {
            "mcp_server": {
                "transport": "streamable_http",
                "url": "<mcp_server_url>"
            }
        }
    )
    ...
    ```

=== "Google ADK"

    ```python
    ...
    return McpToolset(
            connection_params=StreamableHTTPConnectionParams(
                url= "<mcp_server_url>",
                headers={"Authorization": f"Bearer {agent_token.access_token}"}
            )
        )
    ...
    ```

## Test the On-Behalf-Of (OBO) Flow

In the previous step, the AI agent authenticated **itself** using its own credentials.
Now, let’s look at the second scenario: **the agent authenticating on behalf of a user**.

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

=== "LangChain"

    ```python title="main.py"
    import os
    import asyncio
    
    from dotenv import load_dotenv
    from pathlib import Path
    
    from asgardeo import AsgardeoConfig, AsgardeoNativeAuthClient
    from asgardeo_ai import AgentConfig, AgentAuthManager
    
    from langchain_mcp_adapters.client import MultiServerMCPClient
    from langchain.agents import create_agent
    from langchain_google_genai import ChatGoogleGenerativeAI
    
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
    
    
    async def main():
    
        # Perform OBO flow (authenticating on behalf of the user)
        async with AgentAuthManager(ASGARDEO_CONFIG, AGENT_CONFIG) as auth_manager:
            # Get agent token
            agent_token = await auth_manager.get_agent_token(["openid"])
    
            # Generate user authorization URL
            auth_url, state, code_verifier = auth_manager.get_authorization_url_with_pkce(["openid"])
    
            print("Open this URL in your browser to authenticate:")
            print(auth_url)
    
            callback = OAuthCallbackServer(port=6274)
            callback.start()
    
            print("Waiting for authorization code from redirect...")
    
            # Wait for redirect
            auth_code, returned_state, error = await callback.wait_for_code()
            callback.stop()
    
            if auth_code is None:
                print(f"Authorization failed or cancelled. Error: {error}")
                return
    
            print(f"Received auth_code={auth_code}")
    
            # Exchange auth code for user token (OBO flow)
            obo_token = await auth_manager.get_obo_token(auth_code, agent_token=agent_token, code_verifier=code_verifier)
    
    
        # Connect to MCP Server with Authorization Header
        client = MultiServerMCPClient(
            {
                "mcp_server": {
                    "transport": "streamable_http",
                    "url": "<mcp_server_url>",
                    "headers": {
                        "Authorization": f"Bearer {obo_token.access_token}",
                    }
                }
            }
        )
    
        # LLM (Gemini) + LangChain Agent
        llm = ChatGoogleGenerativeAI(
            model="gemini-2.0-flash",
            temperature=0.9
        )
    
        tools = await client.get_tools()
        agent = create_agent(llm, tools)
    
        user_input = input("Enter your question: ")
    
        # Invoke the agent
        response = await agent.ainvoke(
            {"messages": [{"role": "user", "content": user_input}]}
        )
    
        print("Agent Response:", response["messages"][-1].content)
    
    
    # Run app
    if __name__ == "__main__":
        asyncio.run(main())
    ```

=== "Google ADK"

    ```python title="main.py"
    import os
    import asyncio
    from pathlib import Path
    from dotenv import load_dotenv
    
    from asgardeo import AsgardeoConfig
    from asgardeo_ai import AgentConfig, AgentAuthManager
    
    from google.adk.agents.llm_agent import LlmAgent
    from google.adk.runners import InMemoryRunner
    from google.adk.tools.mcp_tool import McpToolset
    from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPConnectionParams
    from google.genai import types
    
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
    
    # Perform OBO flow (authenticating on behalf of the user)
    async def build_toolset():
        async with AgentAuthManager(ASGARDEO_CONFIG, AGENT_CONFIG) as auth_manager:
            # Get agent token
            agent_token = await auth_manager.get_agent_token(["openid"])
    
            # Generate user authorization URL
            auth_url, state, code_verifier = auth_manager.get_authorization_url_with_pkce(["openid"])
    
            print("Open this URL in your browser to authenticate:")
            print(auth_url)
    
            callback = OAuthCallbackServer(port=6274)
            callback.start()
    
            print("Waiting for authorization code from redirect...")
    
            # Wait for redirect
            auth_code, returned_state, error = await callback.wait_for_code()
            callback.stop()
    
            if auth_code is None:
                print(f"Authorization failed or cancelled. Error: {error}")
                return
    
            print(f"Received auth_code={auth_code}")
    
            # Exchange auth code for user token (OBO flow)
            obo_token = await auth_manager.get_obo_token(auth_code, agent_token=agent_token, code_verifier=code_verifier)
    
        # Connect to MCP Server with Auth Header
        return McpToolset(
            connection_params=StreamableHTTPConnectionParams(
                url= "<mcp_server_url>",
                headers={"Authorization": f"Bearer {obo_token.access_token}"}
            )
        )
    
    async def main():
    
        mcp_toolset = await build_toolset()
    
        # Define LLM Agent (Gemini)
        agent = LlmAgent(
            model="gemini-2.0-flash",
            name="add_agent",
            description="Adds two numbers using an MCP server.",
            instruction="When the user asks to add numbers, call the MCP tool `add(a, b)`.",
            tools=[mcp_toolset],
        )
    
        # Setup runner + session
        runner = InMemoryRunner(agent, app_name="add_numbers_app")
    
        session = await runner.session_service.create_session(
            app_name="add_numbers_app",
            user_id="user"
        )
    
        question = input("Enter your question: ")
    
        try:
            async for event in runner.run_async(
                    user_id="user",
                    session_id=session.id,
                    new_message=types.Content(
                        role="user",
                        parts=[types.Part(text=question)]
                    ),
            ):
                if event.content and event.content.parts:
                    text = event.content.parts[0].text
                    if text:
                        print(text)
    
        finally:
            await mcp_toolset.close()
            await runner.close()
    
    if __name__ == "__main__":
        asyncio.run(main())
    ```

## Project Structure (OBO flow)

After adding OBO support, your project should look like this:

``` bash
├── main.py              # AI agent with OBO authentication flow
├── oauth_callback.py    # Captures OAuth redirect from Asgardeo
└── .env                 # Environment configuration
```

## Run and Test the OBO flow

Start your agent:

``` bash
  python main.py
```

You will see an output similar to:

``` bash
    Open this URL in your browser to authenticate:
    https://api.asgardeo.io/...<full authorize URL>...

    Waiting for the authorization code...
```

Open the URL in your browser and log in as a test user.

!!! Info
    You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to try out the login feature.

After successful login, return to the terminal. Your agent will automatically resume once it receives the authorization code and call the MCP tool on behalf of the authenticated user.

``` bash
    Authorization code received: <code>
    Enter your question: Can you add seventy six and eight?
    Agent Response: The sum of seventy six and eight is 84.
```

Your AI agent has now successfully performed an authenticated, user-authorized, On-Behalf-Of request to your MCP server.

[//] STEPS_END
