# Agent Identity Quickstart

Welcome to the Agent Identity Quickstart!

This guide walks you through establishing AI agent identities with **{{ product_name }}**, authenticating agents with their credentials, and integrating them seamlessly with secure MCP servers using TypeScript over modern agent frameworks and cutting-edge AI models.

For the demonstration, let's build a math-capable agent that will interpret conversational queries and invoke specific arithmetic tools exposed by a secured Model Context Protocol (MCP) server to deliver precise calculations.

By the end of this guide, you will have:

- An AI agent that authenticates using Agent Credentials, obtains a token to access a secure MCP Server (AI agent acting on its own)
- An AI agent that gets authorization delegated by a user to access a secured MCP Server (Agent acting On-Behalf-Of (OBO) a user)
- A clear understanding of both authentication scenarios described in [Agent Authentication Guide]({{ base_path }}/guides/agentic-ai/ai-agents/agent-authentication/)

You do not need prior agent development experience. Everything you need is explained as you go.

[//] STEPS_START

## Register an AI agent

To establish an identity for your AI agent, begin by registering it in {{ product_name }}.

1. Sign in to [{{ product_name }}](https://console.asgardeo.io/) console and go to **Agents**.
2. Click **+ New Agent**.
3. Provide:
  - Name: A descriptive name for your AI agent for human-readable display purposes
  - Description (optional): Purpose and functionality of the agent

!!! Example
    Name: Math Assistant Agent

    Description: An AI agent that invokes protected MCP tools to answer math-related questions.

4. Click **Create** to complete the registration.

After successful registration, your agent will receive a unique **Agent ID** and an **Agent Secret**. Store the Agent Secret securely as it is displayed only once and is required later in this guide.

## Configure an Application in {{ product_name }}

To allow your agent (or user acting through the agent) to authenticate and connect to a secure MCP server, an MCP Client needs to be set up in {{ product_name }}.

1. In [{{ product_name }}](https://console.asgardeo.io/) console, navigate to **Applications > New Application**.
2. Select **MCP Client Application** and complete the wizard pop-up by providing a suitable name and an authorized redirect URL.

!!! Example
    Name: AgentAuthenticatorApp

    Authorized redirect URL: http://localhost:3001/callback

!!! Info
    The **authorized redirect URL** defines the location Asgardeo sends users to after a successful login, typically the address of the client application that connects to the MCP server.
    In this guide, the AI agent behaves as the client, which consists of a lightweight OAuth 2.1 callback server running at `http://localhost:3001/callback` to capture the authorization code. So, we will use this URL as the authorized redirect for this guide.

Make a note of the **Client ID** from the **Protocol** tab of the registered application. You will need it during the [Build an AI Agent](#build-an-ai-agent) section of this guide.

## Run the MCP Server

Your AI agent will call an MCP tool hosted on a secure MCP server. You can:

- Follow the [MCP Auth Server Quickstart]({{ base_path }}/quick-starts/mcp-auth-server/#add-auth-to-the-mcp-server) to set one up quickly (Recommended), or
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

=== "Vercel AI"

    The Vercel AI SDK does not currently provide built-in support for MCP tool invocation. However, it can still be used for agent development by implementing custom logic that calls the MCP server using the agent’s access token obtained from Asgardeo.
     
    ```
    npm install @ai-sdk/google @asgardeo/javascript @modelcontextprotocol/sdk ai base64url dotenv fast-sha256 jose secure-random-bytes typescript
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
    
    import { AsgardeoJavaScriptClient } from "@asgardeo/javascript";
    
    import dotenv from "dotenv";
    
    // Load environment variables from .env file
    dotenv.config();
    
    const asgardeoConfig = {
    afterSignInUrl: process.env.REDIRECT_URI || "",
    clientId: process.env.CLIENT_ID || "",
    baseUrl: process.env.ASGARDEO_BASE_URL || "",
    };
    
    const agentConfig = {
    agentID: process.env.AGENT_ID || "",
    agentSecret: process.env.AGENT_SECRET || "",
    };
    
    const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || "",
    model: process.env.MODEL_NAME || "gemini-2.5-flash",
    });
    
    async function runAgent() {
    const asgardeoJavaScriptClient = new AsgardeoJavaScriptClient(asgardeoConfig);
    const agentToken = await asgardeoJavaScriptClient.getAgentToken(agentConfig);
    
        const client = new MultiServerMCPClient({
            math: {
                transport: "http",
                url: process.env.MCP_SERVER_URL || "http://localhost:8000/mcp",
                headers: {
                    Authorization: "Bearer " + agentToken.accessToken,
                },
            },
        });
    
        const tools = await client.getTools();
    
        const agent = createReactAgent({
            llm: model,
            tools: tools,
        });
    
        const rl = readline.createInterface({ input, output });
    
        while (true) {
            try {
                const userInput = await rl.question("\nEnter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: ");
    
                if (userInput.toLowerCase() === "exit") {
                    console.log("Goodbye!");
                    break;
                }
    
                const result = await agent.invoke({
                    messages: [{ role: "user", content: userInput }],
                });
    
                const finalResponse = result.messages[result.messages.length - 1];
                console.log("Agent: " + finalResponse.content);
            } catch (error) {
                console.error("Error running agent:", error);
                break;
            }
        }
    
        await client.close();
        rl.close();
    }
    
    runAgent().catch(console.error);
    ```

=== "Google ADK"

    ```typescript title="agent.ts"
    import { stdin as input, stdout as output } from "node:process";
    import * as readline from "node:readline/promises";
    
    import dotenv from "dotenv";
    
    import { LlmAgent, MCPToolset, InMemoryRunner } from "@google/adk";
    
    import { AsgardeoJavaScriptClient } from "@asgardeo/javascript";
    
    // Load environment variables from .env file
    dotenv.config();
    
    const asgardeoConfig = {
    afterSignInUrl: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    baseUrl: process.env.ASGARDEO_BASE_URL,
    };
    
    const agentConfig = {
    agentID: process.env.AGENT_ID,
    agentSecret: process.env.AGENT_SECRET,
    };
    
    process.env.GOOGLE_GENAI_API_KEY = process.env.GOOGLE_API_KEY;
    
    async function runAgent() {
    silenceADK();
    const asgardeoJavaScriptClient = new AsgardeoJavaScriptClient(asgardeoConfig);
    const agentToken = await asgardeoJavaScriptClient.getAgentToken(agentConfig);
    
        const rootAgent = new LlmAgent({
            name: "example_agent",
            model: process.env.MODEL_NAME || "gemini-2.5-flash",
            instruction: "You are a helpful AI assistant.",
            apiKey: process.env.GOOGLE_API_KEY,
            tools: [
                new MCPToolset({
                    type: "StreamableHTTPConnectionParams",
                    url: process.env.MCP_SERVER_URL,
                    header: {
                        Authorization: `Bearer ${agentToken.accessToken}`,
                    },
                }),
            ],
        });
    
        const runner = new InMemoryRunner({
            agent: rootAgent,
            appName: "my-custom-app",
        });
    
        const userId = "user-123";
        const session = await runner.sessionService.createSession({
            appName: "my-custom-app",
            userId: userId,
        });
    
        const rl = readline.createInterface({ input, output });
    
        try {
            while (true) {
                const userInput = await rl.question("\nEnter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: ");
    
                if (userInput.toLowerCase() === "exit") {
                    await runner.sessionService.deleteSession({
                        appName: "my-custom-app",
                        sessionId: session.id,
                    });
                    console.log("Goodbye!");
                    break;
                }
    
                const userMessage = {
                    role: "user",
                    parts: [{ text: userInput }],
                };
    
                const eventStream = runner.runAsync({
                    userId: userId,
                    sessionId: session.id,
                    newMessage: userMessage,
                });
    
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
        } finally {
            rl.close();
            process.exit(0);
        }
    }
    
    function silenceADK() {
    const originalWrite = process.stdout.write;
    // @ts-ignore
    process.stdout.write = function (chunk, encoding, callback) {
    if (typeof chunk === 'string' && chunk.includes('[ADK INFO]')) {
    return true; // Skip this log
    }
    return originalWrite.apply(process.stdout, [chunk, encoding, callback]);
    };
    }
    
    runAgent().catch(console.error);
    ```

=== "Vercel AI"

    ```typescript title="agent.ts"
    import { stdin as input, stdout as output } from "node:process";
    import * as readline from "node:readline/promises";
    
    import { streamText, tool, jsonSchema } from "ai";
    import { google } from "@ai-sdk/google";
    
    import { Client } from "@modelcontextprotocol/sdk/client/index.js";
    import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
    
    import { AsgardeoJavaScriptClient } from "@asgardeo/javascript";
    
    import dotenv from "dotenv";
    
    // Load environment variables from .env file
    dotenv.config();
    
    const asgardeoConfig = {
        afterSignInUrl: process.env.REDIRECT_URI || "",
        clientId: process.env.CLIENT_ID || "",
        baseUrl: process.env.ASGARDEO_BASE_URL || "",
    };
    
    const agentConfig = {
    agentID: process.env.AGENT_ID || "",
    agentSecret: process.env.AGENT_SECRET || "",
    };
    
    async function getMCPTools(url: string, authToken: string) {
        const transport = new StreamableHTTPClientTransport(
            new URL(url),
            {
                requestInit: {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            }
        );
        
        const client = new Client({
            name: "vercel-ai-agent",
            version: "1.0.0",
        });
    
        await client.connect(transport);
    
        const { tools: mcpTools } = await client.listTools();
    
        // Convert MCP tools to Vercel AI SDK tool format
        const tools: Record<string, any> = {};
        for (const mcpTool of mcpTools) {
            tools[mcpTool.name] = tool({
                description: mcpTool.description || "",
                parameters: jsonSchema(
                    mcpTool.inputSchema || { type: "object" as const, properties: {} }
                ),
                execute: async (args: any) => {
                    const result = await client.callTool({
                        name: mcpTool.name,
                        arguments: args,
                    });
                    if (result.content && Array.isArray(result.content)) {
                        return result.content
                            .filter((c: any) => c.type === "text")
                            .map((c: any) => c.text)
                            .join("\n");
                    }
                    return JSON.stringify(result);
                },
            });
        }

        return { tools, client };
    }
    
    async function runAgent() {
        const asgardeoJavaScriptClient = new AsgardeoJavaScriptClient(asgardeoConfig);
        const agentToken = await asgardeoJavaScriptClient.getAgentToken(agentConfig);
    
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GOOGLE_API_KEY || "";
    
        const llm = google(process.env.MODEL_NAME || "gemini-2.5-flash");
    
        const { tools, client: mcpClient } = await getMCPTools(
            process.env.MCP_SERVER_URL || "",
            agentToken.accessToken,
        );
    
        const rl = readline.createInterface({ input, output });
    
        while (true) {
            try {
                const userInput = await rl.question("\nEnter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: ");
    
                if (userInput.toLowerCase() === "exit") {
                    console.log("Exiting the program. Goodbye!");
                    rl.close();
                    break;
                }
    
                const messages = [{ role: "user" as const, content: userInput }];
    
                const result = streamText({
                    model: llm,
                    messages: messages,
                    tools: tools,
                    maxSteps: 5,
                });
    
                process.stdout.write("\nAgent Response: ");
    
                let fullResponse = "";
                for await (const chunk of result.textStream) {
                    fullResponse += chunk;
                    process.stdout.write(chunk);
                }
    
                const finalResult = await result.steps;
                console.log();
            } catch (error) {
                console.error("Error running agent:", error);
                break;
            }
        }
    
        await mcpClient.close();
    }
    
    runAgent().catch(console.error);
    ```

Add environment configuration by creating a `.env` file at the project root to hold the {{ product_name }} configuration:

```properties title=".env"
# Asgardeo OAuth2 Configuration
ASGARDEO_BASE_URL=https://api.asgardeo.io/t/<your-tenant>
CLIENT_ID=<your-client-id>
REDIRECT_URI=http://localhost:3001/callback

# Asgardeo Agent Credentials
AGENT_ID=<agent_id>
AGENT_SECRET=<agent_secret>

# Google Gemini API Key
GOOGLE_API_KEY=<google_api_key>

# MCP Server URL
MCP_SERVER_URL=<mcp_server_url>
```

!!! Important

    - Replace `<organization-name>` and `<client-id>` with the values obtained from the {{ product_name }} console.
      The organization name is visible in the console URL path (e.g., `https://console.asgardeo.io/t/<your-tenant>`), and the `client ID` can be found in the application's **Protocol** tab.

    - Add the `<agent-id>` and `<agent-secret>` from the [Agent Registration](#register-an-ai-agent) step.

    - You’ll need a Google API key to use Gemini as your model. You can generate one from [Google AI Studio](https://aistudio.google.com/app/api-keys)

    - Replace `<mcp_server_url>` with your MCP server’s URL.
      If you followed the [MCP Auth Server quickstart](https://wso2.com/asgardeo/docs/quick-starts/mcp-auth-server/#add-auth-to-the-mcp-server), you can use: `http://127.0.0.1:8000/mcp`

## Project Structure

Your project folder should now look like this:

=== "LangChain"

    ``` bash
    .
    ├── .env                # Environment file containing all the configuration variables
    ├── agent.ts            # Your AI Agent
    ├── node_modules
    │   └── ...
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
    ```

=== "Google ADK"

    ``` bash
    .
    ├── .env                # Environment file containing all the configuration variables
    ├── agent.ts            # Your AI Agent
    ├── node_modules
    │   └── ...
    ├── package-lock.json
    ├── package.json
    └── tsconfig.json
    ```

## Run and Test with Authentication

Start your AI Agent by running the following command.

``` bash
npm start
```

If authentication succeeds, your agent will prompt you for a question and securely invoke the MCP tool.

```markdown
--- AI Agent Started (Type 'exit' to quit) ---
Enter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: add 3455 and 235
Agent : The sum of 3455 and 235 is 3690.
```

## Test the On-Behalf-Of (OBO) Flow

In the previous step, the AI agent authenticated **itself** using its own credentials.
Now, let’s look at the scenario where **the agent authenticates on behalf of a user**.

This flow uses:

- Authorization code issued after the user logs in
- PKCE (Proof Key for Code Exchange) to ensure only your agent can securely exchange the authorization code for the OBO token
- A final token exchange that produces an **OBO token**, representing the user

Your AI agent will then call the MCP server _as the authenticated user_.

During the OBO flow, {{ product_name }} redirects back to your client application with an `authorization code` after the user logs in. Our agent will then catch the `authorization code` from {{ product_name }} and exchange it for an OBO token.

To handle this, we need to set up a simple `express` server within `agent.ts`. This lightweight HTTP server listens for the redirect and captures `authorization_code` and `state`.

To get started, first install the following dependencies,

```bash
npm install express
npm install --save-dev @types/express
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
    
    import { AsgardeoJavaScriptClient, AuthCodeResponse } from "@asgardeo/javascript";
    
    import dotenv from "dotenv";
    import open from "open";
    
    const port = '3001';
    
    // Load environment variables from .env file
    dotenv.config();
    
    const asgardeoConfig = {
    afterSignInUrl: process.env.REDIRECT_URI || "",
    clientId: process.env.CLIENT_ID || "",
    baseUrl: process.env.ASGARDEO_BASE_URL || "",
    };
    
    const agentConfig = {
    agentID: process.env.AGENT_ID || "",
    agentSecret: process.env.AGENT_SECRET || "",
    };
    
    const model = new ChatGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_API_KEY || "",
    model: process.env.MODEL_NAME || "gemini-2.5-flash",
    });
    
    async function runAgent() {
    const asgardeoJavaScriptClient = new AsgardeoJavaScriptClient(asgardeoConfig);
    
        const authURL = await asgardeoJavaScriptClient.getOBOSignInURL(agentConfig);
        console.log("Opening authentication URL in your browser...");
        await open(authURL);
    
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
                        return;
                    }
    
                    authCodeResponse = {
                        code: code,
                        state: state,
                        session_state: session_state,
                    };
    
                    resolve(authCodeResponse);
    
                    res.send("<h1>Login Successful!</h1><p>You can close this window.</p>");
                } catch (err) {
                    res.status(500).send("Internal Server Error");
                } finally {
                    if (server) {
                        server.close();
                    }
                }
            });
        });
    
        server = app
            .listen(port, () => {
            })
            .on("error", (error) => {
                console.error("Server error:", error);
                process.exit(1);
            });
    
        authCodeResponse = await authCodePromise;
    
        const oboToken = await asgardeoJavaScriptClient.getOBOToken(agentConfig, authCodeResponse);
    
        const client = new MultiServerMCPClient({
            math: {
                transport: "http",
                url: process.env.MCP_SERVER_URL || "http://localhost:8000/mcp",
                headers: {
                    Authorization: "Bearer " + oboToken.accessToken,
                },
            },
        });
    
        const tools = await client.getTools();
    
        const agent = createReactAgent({
            llm: model,
            tools: tools,
        });
    
        const rl = readline.createInterface({ input, output });
    
        try {
            while (true) {
                try {
                    const userInput = await rl.question("\nEnter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: ");
    
                    if (userInput.toLowerCase() === "exit") {
                        console.log("Goodbye!");
                        break;
                    }
    
                    const result = await agent.invoke({
                        messages: [{ role: "user", content: userInput }],
                    });
    
                    const finalResponse = result.messages[result.messages.length - 1];
                    console.log("Agent: " + finalResponse.content);
                } catch (error) {
                    console.error("Error running agent:", error);
                    break;
                }
            }
        } finally {
            await client.close();
            rl.close();
            process.exit(0);
        }
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
    
    import { AsgardeoJavaScriptClient } from "@asgardeo/javascript";
    
    import dotenv from "dotenv";
    import open from "open";
    
    import { dirname, resolve } from "node:path";
    import { fileURLToPath } from "node:url";
    
    const __dirname = dirname(fileURLToPath(import.meta.url));
    
    const port = '3001';
    
    // Load environment variables from .env file
    dotenv.config();
    
    const asgardeoConfig = {
    afterSignInUrl: process.env.REDIRECT_URI || "",
    clientId: process.env.CLIENT_ID || "",
    baseUrl: process.env.ASGARDEO_BASE_URL || "",
    };
    
    const agentConfig = {
    agentID: process.env.AGENT_ID || "",
    agentSecret: process.env.AGENT_SECRET || "",
    };
    
    process.env.GOOGLE_GENAI_API_KEY = process.env.GOOGLE_API_KEY;
    
    async function runAgent() {
    silenceADK();
    const asgardeoJavaScriptClient = new AsgardeoJavaScriptClient(asgardeoConfig);
    
        const authURL = await asgardeoJavaScriptClient.getOBOSignInURL(agentConfig);
        console.log("Opening authentication URL in your browser...");
        await open(authURL);
    
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
    
                    authCodeResponse = {
                        code: code,
                        state: state,
                        session_state: session_state,
                    };
    
                    resolve(authCodeResponse);
    
                    res.send("<h1>Login Successful!</h1><p>You can close this window.</p>");
                } catch (err) {
                    res.status(500).send("Internal Server Error");
                } finally {
                    if (server) {
                        server.close();
                    }
                }
            });
        });
    
        server = app
            .listen(port, () => {
            })
            .on("error", (error) => {
                console.error("Server error:", error);
                process.exit(1);
            });
    
        authCodeResponse = await authCodePromise;
    
        const oboToken = await asgardeoJavaScriptClient.getOBOToken(agentConfig, authCodeResponse);
    
        const rootAgent = new LlmAgent({
            name: "example_agent",
            model: process.env.MODEL_NAME || "gemini-2.5-flash",
            instruction: "You are a helpful AI assistant.",
            apiKey: process.env.GOOGLE_API_KEY,
            tools: [
                new MCPToolset({
                    type: "StreamableHTTPConnectionParams",
                    url: process.env.MCP_SERVER_URL,
                    header: {
                        Authorization: `Bearer ${oboToken.accessToken}`,
                    },
                }),
            ],
        });
    
        const runner = new InMemoryRunner({
            agent: rootAgent,
            appName: "my-custom-app",
        });
    
        const userId = "user-123";
        const session = await runner.sessionService.createSession({
            appName: "my-custom-app",
            userId: userId,
        });
    
        const rl = readline.createInterface({ input, output });
    
        try {
            while (true) {
                const userInput = await rl.question("\nEnter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: ");
    
                if (userInput.toLowerCase() === "exit") {
                    console.log("Goodbye!");
                    break;
                }
    
                const userMessage = {
                    role: "user",
                    parts: [{ text: userInput }],
                };
    
                const eventStream = runner.runAsync({
                    userId: userId,
                    sessionId: session.id,
                    newMessage: userMessage,
                });
    
                try {
                    for await (const event of eventStream) {
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
        } finally {
            rl.close();
            process.exit(0);
        }
    }
    
    function silenceADK() {
    const originalWrite = process.stdout.write;
    // @ts-ignore
    process.stdout.write = function (chunk, encoding, callback) {
    if (typeof chunk === 'string' && chunk.includes('[ADK INFO]')) {
    return true;
    }
    return originalWrite.apply(process.stdout, [chunk, encoding, callback]);
    };
    }
    
    runAgent().catch(console.error);
    ```

=== "Vercel AI"

    ```typescript title="agent.ts"
    import { stdin as input, stdout as output } from "node:process";
    import * as readline from "node:readline/promises";
    import { Server } from "http";
    
    import express from "express";
    import { streamText, tool, jsonSchema } from "ai";
    import { google } from "@ai-sdk/google";
    
    import { Client } from "@modelcontextprotocol/sdk/client/index.js";
    import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";
    
    import { AsgardeoJavaScriptClient, AuthCodeResponse } from "@asgardeo/javascript";
    
    import dotenv from "dotenv";
    import open from "open";
    
    // Load environment variables from .env file
    dotenv.config();
    
    const redirectUri = process.env.REDIRECT_URI || "";
    
    if (!redirectUri) {
        throw new Error("Missing required env var: REDIRECT_URI");
    }
    const redirectURL = new URL(redirectUri);
    const callbackPath = redirectURL.pathname;
    const callbackPort = Number(
        redirectURL.port || (redirectURL.protocol === "https:" ? 443 : 80)
    );
    
    const asgardeoConfig = {
        afterSignInUrl: process.env.REDIRECT_URI || "",
        clientId: process.env.CLIENT_ID || "",
        baseUrl: process.env.ASGARDEO_BASE_URL || "",
    };
    
    const agentConfig = {
        agentID: process.env.AGENT_ID || "",
        agentSecret: process.env.AGENT_SECRET || "",
    };
    
    async function getMCPTools(url: string, authToken: string) {
        const transport = new StreamableHTTPClientTransport(
            new URL(url),
            {
                requestInit: {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                },
            }
        );
    
        const client = new Client({
            name: "vercel-ai-agent",
            version: "1.0.0",
        });
    
        await client.connect(transport);
    
        const { tools: mcpTools } = await client.listTools();
    
        const tools: Record<string, any> = {};
        for (const mcpTool of mcpTools) {
            tools[mcpTool.name] = tool({
                description: mcpTool.description || "",
                parameters: jsonSchema(
                    mcpTool.inputSchema || { type: "object" as const, properties: {} }
                ),
                execute: async (args: any) => {
                    const result = await client.callTool({
                        name: mcpTool.name,
                        arguments: args,
                    });
                    if (result.content && Array.isArray(result.content)) {
                        return result.content
                            .filter((c: any) => c.type === "text")
                            .map((c: any) => c.text)
                            .join("\n");
                    }
                    return JSON.stringify(result);
                },
            });
        }
    
        return { tools, client };
    }
    
    async function runAgent() {
    const asgardeoJavaScriptClient = new AsgardeoJavaScriptClient(asgardeoConfig);
    
        const authURL = await asgardeoJavaScriptClient.getOBOSignInURL(agentConfig);
        console.log("Opening authentication URL in your browser...");
        await open(authURL);
    
        const app = express();
        let server: Server;
    
        let authCodeResponse: AuthCodeResponse | undefined;
    
        const authCodePromise = new Promise<AuthCodeResponse>((resolve) => {
            app.get(callbackPath, async (req, res) => {
                try {
                    const code = req.query.code as string;
                    const session_state = req.query.session_state as string;
                    const state = req.query.state as string;
    
                    if (!code) {
                        res.status(400).send("No authorization code found.");
                        return;
                    }
    
                    authCodeResponse = {
                        code: code,
                        state: state,
                        session_state: session_state,
                    };
    
                    resolve(authCodeResponse);
    
                    res.send("<h1>Login Successful!</h1><p>You can close this window.</p>");
                } catch (err) {
                    res.status(500).send("Internal Server Error");
                } finally {
                    if (server) {
                        server.close();
                    }
                }
            });
        });
    
        server = app
            .listen(callbackPort, () => {
            })
            .on("error", (error) => {
                console.error("Server error:", error);
                process.exit(1);
            });
    
        authCodeResponse = await authCodePromise;
    
        const oboToken = await asgardeoJavaScriptClient.getOBOToken(agentConfig, authCodeResponse);
    
        process.env.GOOGLE_GENERATIVE_AI_API_KEY = process.env.GOOGLE_API_KEY || "";
    
        const llm = google(process.env.MODEL_NAME || "gemini-2.5-flash");
    
        const { tools, client: mcpClient } = await getMCPTools(
            process.env.MCP_SERVER_URL || "",
            oboToken.accessToken,
        );
    
        const rl = readline.createInterface({ input, output });
    
        try {
            while (true) {
                try {
                    const userInput = await rl.question("\nEnter your question (e.g., 'Add 45 and 99') or type 'exit' to quit: ");
    
                    if (userInput.toLowerCase() === "exit") {
                        console.log("Exiting the program. Goodbye!");
                        break;
                    }
    
                    const messages = [{ role: "user" as const, content: userInput }];
    
                    const result = streamText({
                        model: llm,
                        messages: messages,
                        tools: tools,
                        maxSteps: 5,
                    });
    
                    process.stdout.write("\nAgent Response: ");
    
                    for await (const chunk of result.textStream) {
                        process.stdout.write(chunk);
                    }
    
                    console.log();
                } catch (error) {
                    console.error("Error running agent:", error);
                    break;
                }
            }
        } finally {
            await mcpClient.close();
            rl.close();
            process.exit(0);
        }
    }
    
    runAgent().catch(console.error);
    ```

Add environment configuration by creating a `.env` file at the project root to hold the {{ product_name }} configuration:

```properties title=".env"
# Asgardeo OAuth2 Configuration
ASGARDEO_BASE_URL=https://api.asgardeo.io/t/<your-tenant>
CLIENT_ID=<your-client-id>
REDIRECT_URI=http://localhost:3001/callback

# Asgardeo Agent Credentials
AGENT_ID=<agent_id>
AGENT_SECRET=<agent_secret>

# Google Gemini API Key
GOOGLE_API_KEY=<google_api_key>

# MCP Server URL
MCP_SERVER_URL=<mcp_server_url>
```

## Run and Test the OBO flow

Start your agent:

``` bash
npm start
```

You will see an output similar to this and your default browser will open, prompting you to log in:

``` bash
    Opening browser for authentication...
```

!!! Info
You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to try out the login feature.

After successful login, return to the terminal. Your agent will automatically resume once it receives the authorization code and call the MCP tool on behalf of the authenticated user.

``` bash
    Enter your question (e.g., 'Add 45 and 99') or type 'exit' to quit:
```

Your AI agent has now successfully performed an authenticated, user-authorized, On-Behalf-Of request to your MCP server.

[//] STEPS_END
