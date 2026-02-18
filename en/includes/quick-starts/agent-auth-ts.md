# Agent Identity Quickstart

Welcome to the Agent Identity Quickstart!

This guide walks you through establishing AI agent identities with **{{ product_name }}**, authenticating agents with their credentials, and integrating them seamlessly with secure MCP servers using TypeScript over modern agent frameworks and cutting-edge AI models.

For the demonstration, let's build a math-capable agent that will interpret conversational queries and invoke specific arithmetic tools exposed by a secured Model Context Protocol (MCP) server to deliver precise calculations.

By the end of this guide, you will have:

- An AI agent that authenticates using Agent Credentials, obtains a token to access a secure MCP Server(AI agent acting on its own)
- An AI agent that gets authorization delegated by a user to access a secured MCP Server (Agent acting On-Behalf-Of (OBO) a user)
- A clear understanding of both authentication scenarios described in [Agent Authentication Guide](https://wso2.com/asgardeo/docs/guides/agentic-ai/ai-agents/agent-authentication/)

You do not need prior agent development experience. Everything you need is explained as you go.

[//] STEPS_START

## Register an AI agent

To establish an identity for your AI agent, begin by registering it in {{ product_name }}.

- Sign in to [{{ product_name }}](https://console.asgardeo.io/) console and go to **Agents**.
- Click **+ New Agent**.
- Provide:
    - Name: A descriptive name for your AI agent for human-readable display purposes
    - Description (optional): Purpose and functionality of the agent

!!! Example
    Name: Math Assistant Agent

    Description: An AI agent that invokes protected MCP tools to answer math-related questions.

- Click **Create** to complete the registration.

After successful registration, your agent will receive a unique **Agent ID** and an **Agent Secret**, which is shown only once. Make sure to store them securely, as you’ll need them later in this guide.

## Configure an Application in {{ product_name }}

To allow your agent (or user acting through the agent) to authenticate and connect to a secure MCP server, a MCP Client needs to be set up in {{ product_name }}.

- In [{{ product_name }}](https://console.asgardeo.io/) console, navigate to **Applications > New Application**.
- Select **MCP Client Application** and complete the wizard pop-up by providing a suitable name and an authorized redirect URL.

!!! Example
    Name: AgentAuthenticatorApp

    Authorized redirect URL: http://localhost:3001/callback

!!! Info
    The **authorized redirect URL** defines the location Asgardeo sends users to after a successful login, typically the address of the client application that connects to the MCP server.
    In this guide, the AI agent behaves as the client, which consists of a lightweight OAuth 2.1 callback server running at `http://localhost:3001/callback` to capture the authorization code. So, we will use this URL as the authorized redirect for this guide.

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

Then initialize a Node.js project using the following command.

``` bash
npm init -y
```

Now open the `package.json` file and replace the existing content with the following given content.

```json title="package.json"
{
  "name": "agent-auth-quickstart",
  "version": "1.0.0",
  "type": "module",
  "main": "agent.ts",
  "scripts": {
    "start": "npx tsx agent.ts"
  }
}
```

Pick your agent development framework and install the corresponding dependencies.

=== "LangChain"

    ```bash
    npm install @asgardeo/javascript @langchain/google-genai @langchain/langgraph @langchain/mcp-adapters base64url fast-sha256 jose secure-random-bytes tsx typescript
    npm install --save-dev @types/node
    ```

=== "Google ADK"

    ```bash
    npm install @asgardeo/javascript @google/adk base64url dotenv fast-sha256 jose secure-random-bytes tsx typescript
    npm install --save-dev @types/node
    ```

Initialize the TypeScript configuration by running the following command.

```bash 
npx tsc --init
``` 

Update the `tsconfig.json` file with the following settings.

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

Create `agent.ts` that implements an AI agent which first obtains a valid access token from **{{ product_name }}** by authenticating itself. The agent then includes that token in the `Authorization` header (for example `Authorization: Bearer <token>`) when calling the MCP tool.

=== "LangChain"

    ```typescript title="agent.ts"
    import { stdin as input, stdout as output } from "node:process";
    import * as readline from "node:readline/promises";

    import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
    import { createReactAgent } from "@langchain/langgraph/prebuilt";
    import { MultiServerMCPClient } from "@langchain/mcp-adapters";

    import { AsgardeoAgentAuth } from "./util/auth";

    const asgardeoConfig = {
        afterSignInUrl: "http://localhost:3001/callback",
        clientId: "<client-id>",
        baseUrl: "https://api.asgardeo.io/t/<your-organization-name>",
    };

    const agentConfig = {
        agentID: "<agent-id>",
        agentSecret: "<agent-id>",
    };

    const model = new ChatGoogleGenerativeAI({
        apiKey: "<gemini-api-key>",
        model: "gemini-2.5-flash",
    });

    async function runAgent() {
        // 1. Get Agent Token
        const asgardeoAgentAuth = new AsgardeoAgentAuth(asgardeoConfig);
        const agentToken = await asgardeoAgentAuth.getAgentToken(agentConfig);

        // 2. Setup the Multi-Server MCP Client and pass the received access token in Authorization header.
        const client = new MultiServerMCPClient({
            math: {
                transport: "http",
                url: "http://localhost:3000/mcp",
                headers: {
                    Authorization: "Bearer " + agentToken.accessToken,
                },
            },
        });

        // 3. Connect and Convert MCP Tools to LangChain Tools
        const tools = await client.getTools();

        // 4. Create the Agent
        const agent = createReactAgent({
            llm: model,
            tools: tools,
        });

        // 5. Setup the interface to read input
        const rl = readline.createInterface({ input, output });
        console.log("--- AI Agent Started (Type 'exit' to quit) ---");

        while (true) {
            try {
                // 6. Ask the user for their prompt
                const userInput = await rl.question("You: ");

                if (userInput.toLowerCase() === "exit") {
                    console.log("Goodbye!");
                    break;
                }

                // 7. Run the Agent
                const result = await agent.invoke({
                    messages: [{ role: "user", content: userInput }],
                });

                // 8. Print the Answer
                const finalResponse = result.messages[result.messages.length - 1];
                console.log("Agent: " + finalResponse.content);
            } catch (error) {
                console.error("Error running agent:", error);
                break;
            }
        }

        // 9. Cleanup
        await client.close();
        rl.close();
    }

    runAgent().catch(console.error);
    ```

=== "Google ADK"

    ```typescript title="agent.ts"
    import { stdin as input, stdout as output } from "node:process";
    import * as readline from "node:readline/promises";

    import "dotenv/config";
    import { LlmAgent, MCPToolset, InMemoryRunner } from "@google/adk";

    import { AsgardeoAgentAuth } from "./util/auth";

    const asgardeoConfig = {
        afterSignInUrl: "http://localhost:3001/callback",
        clientId: "<client-id>",
        baseUrl: "https://api.asgardeo.io/t/<organization-name>",
    };

    const agentConfig = {
        agentID: "<agent-id>",
        agentSecret: "<agent-secret>",
    };

    async function runAgent() {
        // 1. Get Agent Token
        const asgardeoAgentAuth = new AsgardeoAgentAuth(asgardeoConfig);
        const agentToken = await asgardeoAgentAuth.getAgentToken(agentConfig);

        // 2. Define LLM Agent
        const rootAgent = new LlmAgent({
            name: "example_agent",
            model: "gemini-2.5-flash",
            instruction: `You are a helpful AI assistant.`,
            tools: [
                new MCPToolset({
                    type: "StreamableHTTPConnectionParams",
                    url: "http://localhost:3000/mcp",
                    header: {
                        Authorization: `Bearer ${agentToken.accessToken}`,
                    },
                }),
            ],
        });

        // 3. Initiate Runner with the Agent
        const runner = new InMemoryRunner({
            agent: rootAgent,
            appName: "my-custom-app",
        });

        // 4. Create a session for the user
        const userId = "user-123";
        const session = await runner.sessionService.createSession({
            appName: "my-custom-app",
            userId: userId,
        });

        console.log(`Session created: ${session.id}`);

        // 5. Capture user input
        const rl = readline.createInterface({ input, output });
        console.log("--- AI Agent Started (Type 'exit' to quit) ---");

        while (true) {
            const userInput = await rl.question("You: ");

            if (userInput.toLowerCase() === "exit") {
                console.log("Goodbye!");
                break;
            }

            // 6. Define the User Message from input
            const userMessage = {
                role: "user",
                parts: [{ text: userInput }],
            };

            // 7. Run the agent loop
            // runAsync returns an async generator that yields events (thoughts, tool calls, responses)
            const eventStream = runner.runAsync({
                userId: userId,
                sessionId: session.id,
                newMessage: userMessage,
            });

            // 8. Consume events
            try {
                for await (const event of eventStream) {
                    // Check if the event has text content to display
                    if (event.content && event.content.parts) {
                        const text = event.content.parts.map((p) => p.text).join("");
                        if (text) {
                            console.log(`Agent : ${text}`);
                        }
                    }
                }
            } catch (error) {
                console.error("Error running agent:", error);
            }
        }

        rl.close();
    }

    runAgent().catch(console.error);
    ```

!!! Important

    - Replace `<organization-name>` and `<client-id>` with the values obtained from the {{ product_name }} console.
      The organization name is visible in the console URL path (e.g., `https://console.asgardeo.io/t/<your-tenant>`), and the `client ID` can be found in the application's **Protocol** tab.

    - Add the `<agent-id>` and `<agent-secret>` from the [Agent Registration](#register-an-ai-agent) step.

    - This code assumes you are running the MCP server on `http://localhost:3000/mcp` as we set up in [MCP Auth Server quickstart](https://wso2.com/asgardeo/docs/quick-starts/mcp-auth-server/#add-auth-to-the-mcp-server). If you have configured a separate MCP, change the URL accordingly.

## Setup Gemini API Key

To Get access to Google's Gemini LLM capabilities, you need a Google API key. You can generate one from [Google AI Studio](https://aistudio.google.com/app/api-keys).
Then make the appropriate changes depending on your development framework.

=== "LangChain"
    ```markdown
    Simply replace the `<gemini-api-key>` in `agent.ts` file.
    ```

=== "Google ADK"

    ```bash
    echo 'GEMINI_API_KEY="YOUR_API_KEY"' > .env
    ```

## Add Asgardeo Auth Utils

The following util file provides methods for agents to authenticate with Asgardeo. Create a new directly called `util` and inside, add the following `auth.ts` file.

<details>
<summary>Expand to view the implementation of `auth.ts`</summary>

```typescript title="auth.ts"
import {
    AsgardeoAuthClient,
    AuthClientConfig,
    Storage,
    StorageManager,
    Crypto,
    JWKInterface,
    TokenResponse,
    ExtendedAuthorizeRequestUrlParams,
    initializeEmbeddedSignInFlow,
    EmbeddedSignInFlowInitiateResponse,
    executeEmbeddedSignInFlow,
    EmbeddedFlowExecuteRequestConfig,
    EmbeddedSignInFlowHandleResponse,
    EmbeddedSignInFlowStatus,
} from "@asgardeo/javascript";
import base64url from "base64url";
import sha256 from "fast-sha256";
import * as jose from "jose";
import randombytes from "secure-random-bytes";

interface AgentConfig {
    agentID: string;
    agentSecret: string;
}

export interface AuthCodeResponse {
    code: string;
    state: string;
    session_state: string;
}

class CacheStore implements Storage {
    private cache: Map<string, string> = new Map();

    public async setData(key: string, value: string): Promise<void> {
        this.cache.set(key, value);
    }

    public async getData(key: string): Promise<string> {
        return this.cache.get(key) ?? "{}";
    }

    public async removeData(key: string): Promise<void> {
        this.cache.delete(key);
    }
}

class CryptoUtils implements Crypto<Buffer | string> {
    public constructor() {}

    public base64URLEncode(value: Buffer | string): string {
        return base64url.encode(value).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }

    public base64URLDecode(value: string): string {
        return base64url.decode(value).toString();
    }

    public hashSha256(data: string): string | Buffer {
        return Buffer.from(sha256(new TextEncoder().encode(data)));
    }

    public generateRandomBytes(length: number): string | Buffer {
        return randombytes(length);
    }

    public async verifyJwt(
        idToken: string,
        jwk: Partial<JWKInterface>,
        algorithms: string[],
        clientId: string,
        issuer: string,
        subject: string,
        clockTolerance?: number,
    ): Promise<boolean> {
        const key: jose.CryptoKey | Uint8Array = await jose.importJWK(jwk);
        return jose
            .jwtVerify(idToken, key, {
                algorithms,
                audience: clientId,
                clockTolerance,
                issuer,
                subject,
            })
            .then(() => Promise.resolve(true));
    }
}

export class AsgardeoAgentAuth<T> {
    private auth: AsgardeoAuthClient<T>;

    private cryptoUtils: Crypto;

    private store: Storage;

    private storageManager: StorageManager<T>;

    private baseURL: string;

    constructor(config: AuthClientConfig<T>) {
        this.store = new CacheStore();
        this.cryptoUtils = new CryptoUtils();
        this.auth = new AsgardeoAuthClient();
        this.auth.initialize(config, this.store, this.cryptoUtils);
        this.storageManager = this.auth.getStorageManager();

        this.baseURL = config.baseUrl ?? "";
    }

    // Build Authorize request
    public async getAuthURL(customParams?: ExtendedAuthorizeRequestUrlParams): Promise<string> {
        const authURL: string | undefined = await this.auth.getSignInUrl(customParams);

        if (authURL) {
            return Promise.resolve(authURL.toString());
        }
        return Promise.reject(new Error("Could not build Authorize URL"));
    }

    // Get Agent Token. (AI agent acting on its own)
    public async getAgentToken(agentConfig: AgentConfig): Promise<TokenResponse> {
        const customParam = {
            response_mode: "direct",
        };
        const authorizeURL: URL = new URL(await this.getAuthURL(customParam));

        const authorizeResponse: EmbeddedSignInFlowInitiateResponse = await initializeEmbeddedSignInFlow({
            url: `${authorizeURL.origin}${authorizeURL.pathname}`,
            payload: Object.fromEntries(authorizeURL.searchParams.entries()),
        });

        const usernamePasswordAuthenticator = authorizeResponse.nextStep.authenticators.find(
            (auth) => auth.authenticator === "Username & Password",
        );

        if (!usernamePasswordAuthenticator) {
            return Promise.reject(new Error("Basic authenticator not found among authentication steps."));
        }

        const authnRequest: EmbeddedFlowExecuteRequestConfig = {
            baseUrl: this.baseURL,
            payload: {
                flowId: authorizeResponse.flowId,
                selectedAuthenticator: {
                    authenticatorId: usernamePasswordAuthenticator.authenticatorId,
                    params: {
                        username: agentConfig.agentID,
                        password: agentConfig.agentSecret,
                    },
                },
            },
        };

        const authnResponse: EmbeddedSignInFlowHandleResponse = await executeEmbeddedSignInFlow(authnRequest);

        if (authnResponse.flowStatus != EmbeddedSignInFlowStatus.SuccessCompleted) {
            return Promise.reject(new Error("Agent Authentication Failed."));
        }

        return this.auth.requestAccessToken(
            authnResponse.authData.code,
            authnResponse.authData.session_state,
            authnResponse.authData.state,
        );
    }

    // Build Authorize request for the OBO Flow
    public async getOBOFlowAuthURL(agentConfig: AgentConfig): Promise<string> {
        // The authorize request must include requested_actor parameter from the agent configs
        const customParam = {
            requested_actor: agentConfig.agentID,
        };

        // Build authorize URL using AsgardeoAuthClient
        const authURL: string | undefined = await this.auth.getSignInUrl(customParam);

        if (authURL) {
            return Promise.resolve(authURL.toString());
        }
        return Promise.reject(new Error("Could not build Authorize URL"));
    }

    // Get OBO Token. (AI agent acting on behalf of a user)
    public async getOBOToken(agentConfig: AgentConfig, authCodeResponse: AuthCodeResponse): Promise<TokenResponse> {
        // Get Agent Token
        const agentToken = await this.getAgentToken(agentConfig);

        // Pass Agent Token when requesting access token
        const tokenRequestConfig = {
            params: {
                actor_token: agentToken.accessToken,
            },
        };

        // Return OBO Token
        return await this.auth.requestAccessToken(
            authCodeResponse.code,
            authCodeResponse.session_state,
            authCodeResponse.state,
            undefined,
            tokenRequestConfig
        );
    }
}
```
</details>

## Project Structure

Your project folder should now look like this:

=== "LangChain"

    ``` bash
    .
    ├── agent.ts            # Your AI Agent
    ├── node_modules
    │   └── ...
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    └── util
        └── auth.ts         # Auth Util Methods
    ```

=== "Google ADK"

    ``` bash
    .
    ├── .env                # Environment file containing the Gemini API Key
    ├── agent.ts            # Your AI Agent
    ├── node_modules
    │   └── ...
    ├── package-lock.json
    ├── package.json
    ├── tsconfig.json
    └── util
        └── auth.ts         # Auth Util Methods
    ```

## Run and Test with Authentication

Start your AI Agent by running the following command.

``` bash
npm start
```

If authentication succeeds, your agent will prompt you for a question and securely invoke the MCP tool.

```
--- AI Agent Started (Type 'exit' to quit) ---
You: Can you add twenty two and twelve?
Agent: The sum of twenty two and twelve is 34.
You: exit
Goodbye!
```

## Test the On-Behalf-Of (OBO) Flow

In the previous step, the AI agent authenticated **itself** using its own credentials.
Now, let’s look at the scenario where **the agent authenticates on behalf of a user**.

This flow uses:

- Authorization code issued after the user logs in
- PKCE (Proof Key for Code Exchange) to ensure only your agent can securely exchange the authorization code for the OBO token
- A final token exchange that produces an **OBO token**, representing the user

Your AI agent will then call the MCP server _as the authenticated user_.

During the OBO flow, {{ product_name }} redirects back to your client application with an `authorization code` after the user logs in. Our agent will then catch the `authorization code` from {{ product_name }} and exchange it to a OBO Token.

To handle this, we need to setup a simple `express` server within `agent.ts`. This lightweight HTTP server listens for the redirect and captures `authorization_code` and `state`.

To get started, first install the following dependencies,

```bash
npm install express
npm install --save-dev@types/express
```

Then, update the `agent.ts` to perform the OBO Flow. This will:

- Authenticate the agent
- Generate an authorization URL for the user
- Capture the authorization code
- Exchange the code + agent token for an OBO token
- Call the MCP server using the OBO token

Here is the updated implementation:

=== "LangChain"

    ```typescript title="agent.ts"
    import { stdin as input, stdout as output } from "node:process";
    import * as readline from "node:readline/promises";
    import { Server } from "http";

    import express from "express";
    import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
    import { createReactAgent } from "@langchain/langgraph/prebuilt";
    import { MultiServerMCPClient } from "@langchain/mcp-adapters";

    import { AsgardeoAgentAuth, AuthCodeResponse } from "./util/auth";

    const port = '3001';

    const asgardeoConfig = {
        afterSignInUrl: "http://localhost:3001/callback",
        clientId: "<client-id>",
        baseUrl: "https://api.asgardeo.io/t/<your-organization-name>",
    };

    const agentConfig = {
        agentID: "<agent-id>",
        agentSecret: "<agent-id>",
    };

    const model = new ChatGoogleGenerativeAI({
        apiKey: "<gemini-api-key>",
        model: "gemini-2.5-flash",
    });

    async function runAgent() {
        const asgardeoAgentAuth = new AsgardeoAgentAuth(asgardeoConfig);

        // 1. Prompt the user to log in through browser
        const authURL = await asgardeoAgentAuth.getOBOFlowAuthURL(agentConfig);
        console.log("Open this URL in your browser to authenticate: " + authURL);

        // 2. Create a simple express server to catch the authorization code upon redirect.
        const app = express();
        let server: Server;

        let authCodeResponse: AuthCodeResponse | undefined;

        const authCodePromise = new Promise<AuthCodeResponse>((resolve) => {
            app.get("/callback", async (req, res) => {
                try {
                    const code = req.query.code as string;
                    const session_state = req.query.session_state as string;
                    const state = req.query.state as string;

                    if (!code) {
                        res.status(400).send("No authorization code found.");
                        Promise.reject(new Error("No authorization code found."));
                    }

                    console.log("Authorization Code received. Code: " + code);

                    authCodeResponse = {
                        code: code,
                        state: state,
                        session_state: session_state,
                    };

                    resolve(authCodeResponse);

                    // Send response to browser
                    res.send("<h1>Login Successful!</h1><p>You can close this window.</p>");
                } catch (err) {
                    res.status(500).send("Internal Server Error");
                } finally {
                    // Close the server regardless of success or failure once request is handled
                    if (server) {
                        server.close(() => console.log("Local server closed."));
                    }
                }
            });
        });

        // 3. Start the server and listen to port
        server = app
            .listen(port, () => {
                console.log(`Waiting on port ${port}...`);
            })
            .on("error", (error) => {
                console.error("Server error:", error);
                process.exit(1);
            });

        // 4. Wait for the authorization code to be received
        authCodeResponse = await authCodePromise;

        // 5. Exchange the auth code for a token using OBO flow
        const oboToken = await asgardeoAgentAuth.getOBOToken(agentConfig, authCodeResponse);

        // 6. Setup the Multi-Server MCP Client and pass the received access token in Authorization header.
        const client = new MultiServerMCPClient({
            math: {
                transport: "http",
                url: "http://localhost:3000/mcp",
                headers: {
                    Authorization: "Bearer " + oboToken.accessToken,
                },
            },
        });

        // 7. Connect and Convert MCP Tools to LangChain Tools
        const tools = await client.getTools();

        // 8. Create the Agent
        const agent = createReactAgent({
            llm: model,
            tools: tools,
        });

        // 9. Setup the interface to read input
        const rl = readline.createInterface({ input, output });
        console.log("--- AI Agent Started (Type 'exit' to quit) ---");

        while (true) {
            try {
                // 10. Ask the user for their prompt
                const userInput = await rl.question("You: ");

                if (userInput.toLowerCase() === "exit") {
                    console.log("Goodbye!");
                    break;
                }

                // 11. Run the Agent
                const result = await agent.invoke({
                    messages: [{ role: "user", content: userInput }],
                });

                // 12. Print the Answer
                const finalResponse = result.messages[result.messages.length - 1];
                console.log("Agent: " + finalResponse.content);
            } catch (error) {
                console.error("Error running agent:", error);
                break;
            }
        }

        // 13. Cleanup
        await client.close();
        rl.close();
    }

    runAgent().catch(console.error);
    ```

=== "Google ADK"

    ```typescript title="agent.ts"
    import { stdin as input, stdout as output } from "node:process";
    import * as readline from "node:readline/promises";
    import { Server } from "http";

    import "dotenv/config";
    import express from "express";
    import { LlmAgent, MCPToolset, InMemoryRunner } from "@google/adk";

    import { AsgardeoAgentAuth, AuthCodeResponse } from "./util/auth";

    const port = '3001';

    const asgardeoConfig = {
        afterSignInUrl: "http://localhost:3001/callback",
        clientId: "<client-id>",
        baseUrl: "https://api.asgardeo.io/t/<organization-name>",
    };

    const agentConfig = {
        agentID: "<agent-id>",
        agentSecret: "<agent-secret>",
    };

    async function runAgent() {
        const asgardeoAgentAuth = new AsgardeoAgentAuth(asgardeoConfig);

        // 1. Prompt the user to log in through browser
        const authURL = await asgardeoAgentAuth.getOBOFlowAuthURL(agentConfig);
        console.log("Open this URL in your browser to authenticate: " + authURL);

        // 2. Create a simple express server to catch the authorization code upon redirect.
        const app = express();
        let server: Server;

        let authCodeResponse: AuthCodeResponse | undefined;

        const authCodePromise = new Promise<AuthCodeResponse>((resolve) => {
            app.get("/callback", async (req, res) => {
                try {
                    const code = req.query.code as string;
                    const session_state = req.query.session_state as string;
                    const state = req.query.state as string;

                    if (!code) {
                        res.status(400).send("No authorization code found.");
                        Promise.reject(new Error("No authorization code found."));
                    }

                    console.log("Authorization Code received. Code: " + code);

                    authCodeResponse = {
                        code: code,
                        state: state,
                        session_state: session_state,
                    };

                    resolve(authCodeResponse);

                    // Send response to browser
                    res.send("<h1>Login Successful!</h1><p>You can close this window.</p>");
                } catch (err) {
                    res.status(500).send("Internal Server Error");
                } finally {
                    // Close the server regardless of success or failure once request is handled
                    if (server) {
                        server.close(() => console.log("Local server closed."));
                    }
                }
            });
        });

        // 3. Start the server and listen to port
        server = app
            .listen(port, () => {
                console.log(`Waiting on port ${port}...`);
            })
            .on("error", (error) => {
                console.error("Server error:", error);
                process.exit(1);
            });

        // 4. Wait for the authorization code to be received
        authCodeResponse = await authCodePromise;

        // 5. Exchange the auth code for a token using OBO flow
        const oboToken = await asgardeoAgentAuth.getOBOToken(agentConfig, authCodeResponse);

        // 2. Define LLM Agent
        const rootAgent = new LlmAgent({
            name: "example_agent",
            model: "gemini-2.5-flash",
            instruction: `You are a helpful AI assistant.`,
            tools: [
                new MCPToolset({
                    type: "StreamableHTTPConnectionParams",
                    url: "http://localhost:3000/mcp",
                    header: {
                        Authorization: `Bearer ${oboToken.accessToken}`,
                    },
                }),
            ],
        });

        // 3. Initiate Runner with the Agent
        const runner = new InMemoryRunner({
            agent: rootAgent,
            appName: "my-custom-app",
        });

        // 4. Create a session for the user
        const userId = "user-123";
        const session = await runner.sessionService.createSession({
            appName: "my-custom-app",
            userId: userId,
        });

        console.log(`Session created: ${session.id}`);

        // 5. Capture user input
        const rl = readline.createInterface({ input, output });
        console.log("--- AI Agent Started (Type 'exit' to quit) ---");

        while (true) {
            const userInput = await rl.question("You: ");

            if (userInput.toLowerCase() === "exit") {
                console.log("Goodbye!");
                break;
            }

            // 6. Define the User Message from input
            const userMessage = {
                role: "user",
                parts: [{ text: userInput }],
            };

            // 7. Run the agent loop
            // runAsync returns an async generator that yields events (thoughts, tool calls, responses)
            const eventStream = runner.runAsync({
                userId: userId,
                sessionId: session.id,
                newMessage: userMessage,
            });

            // 8. Consume events
            try {
                for await (const event of eventStream) {
                    // Check if the event has text content to display
                    if (event.content && event.content.parts) {
                        const text = event.content.parts.map((p) => p.text).join("");
                        if (text) {
                            console.log(`Agent : ${text}`);
                        }
                    }
                }
            } catch (error) {
                console.error("Error running agent:", error);
            }
        }

        rl.close();
    }

    runAgent().catch(console.error);
    ```

## Run and Test the OBO flow

Start your agent:

``` bash
npm start
```

You will see an output similar to:

```
Open this URL in your browser to authenticate: https://api.asgardeo.io/...<full authorize URL>...
Waiting on port 3001...`
```

Open the URL in your browser and log in as a test user.

!!! Info
    You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to try out the login feature.

After successful login, return to the terminal. Your agent will automatically resume once it receives the authorization code and call the MCP tool on behalf of the authenticated user.

```
Authorization Code received. Code: ...
Local server closed.
--- AI Agent Started (Type 'exit' to quit) ---
You: 
```

Your AI agent has now successfully performed an authenticated, user-authorized, On-Behalf-Of request to your MCP server.

[//] STEPS_END
