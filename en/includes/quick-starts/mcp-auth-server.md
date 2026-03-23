# MCP-Auth Quickstart

This quickstart shows you how to build a secure MCP (Model Context Protocol) server using [MCP TypeScript SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk) and [WSO2 MCP Auth SDK](https://www.npmjs.com/package/@asgardeo/mcp-express). After completing this guide, you will have a working MCP server that secured using **OAuth 2.1** according to the [MCP auth specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization).

[//] STEPS_START

## Set up the dev environment

Create a directory called `mcp-auth-quickstart` by running the following commands.

``` bash
 mkdir mcp-auth-quickstart && cd mcp-auth-quickstart
```

Then initialize a Node.js project using the following command.

=== "npm"

    ``` bash
     npm init -y
    ```
=== "yarn"

    ``` bash
    yarn init -y
    ```
=== "nnpm"

    ``` bash
    nnpm init -y
    ```

Now open the `package.json` file and replace the existing content with the following given content.

```json title="package.json"
{
  "name": "mcp-auth-quickstart",
  "version": "1.0.0",
  "type": "module",
  "main": "server.ts",
  "scripts": {
    "start": "npx tsx server.ts"
  }
}
```

Install the following dependencies.

=== "npm"

    ``` bash
    npm install express zod @modelcontextprotocol/sdk
    npm install -D typescript tsx @types/express @types/node @types/cors
    ```

=== "yarn"

    ``` bash
    yarn add express zod @modelcontextprotocol/sdk
    yarn add -D typescript tsx @types/express @types/node @types/cors
    ``` 

=== "nnpm"

    ``` bash
    nnpm install express zod @modelcontextprotocol/sdk
    nnpm install -D typescript tsx @types/express @types/node @types/cors
    ```

Initialize the TypeScript configuration by running the following command.

=== "npm"

    ``` 
    npx tsc --init
    ``` 

=== "yarn"

    ```
    yarn tsc --init
    ```

=== "nnpm"

    ```
    nnpm tsc --init
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

## Create a simple MCP server

First, create `mcp-server.ts` file in the the root and add the following code. This sets up a MCP server with a MCP tool(addition):

```typescript title="mcp-server.ts"

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

// Create an MCP server
export const server = new McpServer({
    name: 'demo-server',
    version: '1.0.0',
});

// Register a simple addition tool
export function registerMCPTools() {
    server.registerTool(
        'add',
        {
            title: 'Addition Tool',
            description: 'Add two numbers',
            inputSchema: { a: z.number(), b: z.number() },
        },
        async ({ a, b }) => {
            const result = a + b;
            return {
                content: [{ type: 'text', text: String(result) }],
            };
        }
    );
    console.log("✅ MCP Tools Registered");
}

```

Next, create `server.ts` file and add the code below. This configures a Streamable HTTP MCP transport for the MCP server, along with CORS handling to prevent cross-origin errors when testing with browser clients.

```typescript title="server.ts"

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { server, registerMCPTools } from './mcp-server.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*', exposedHeaders: ['Mcp-Session-Id'] }));
app.use(express.json());

registerMCPTools();

app.post('/mcp', async (req, res) => {
    const transport = new StreamableHTTPServerTransport({
        enableJsonResponse: true,
    });

    res.on('close', () => transport.close());

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/mcp`);
});
```

## Run and test without auth

First run the dev server by running the following command.

=== "npm"

    ```bash
    npm start
    ```

=== "yarn"

    ```bash
    yarn start
    ```

=== "pnpm"

    ```bash
    pnpm start
    ```

Use **MCP Inspector** as the client to test the MCP server.

 In a new terminal window, run the following command to launch MCP Inspector against the running MCP server, ensuring you specify the transport and the URL explicitly.

```bash
npx @modelcontextprotocol/inspector --url http://localhost:3000/mcp --transport streamable-http

```  

Use it to list tools, invoke the "add" tool using the inspector UI.


## Add auth to the MCP server

Stop the dev server and install the Asgardeo MCP Auth SDK.

=== "npm"

    ``` bash
    npm install @asgardeo/mcp-express
    ```

=== "yarn"

    ``` bash
    yarn add @asgardeo/mcp-express
    ```

=== "nnpm"
    ```bash
    nnpm install @asgardeo/mcp-express
    ```

Create '.env' file and add the base URL of your {{product_name}} organization as given below.

```env
BASE_URL=https://api.asgardeo.io/t/<you-org-name>

```

Update `server.ts` to integrate the Asgardeo middleware. This adds:

- Initialization of `McpAuthServer`.
- Registration of OAuth endpoints via `router()`.
- Protection of the `/mcp` route with `protect()`.
- Optional: Bearer token extraction for use in tools and resources (for example, to obtain user details).

Here's the full updated `server.ts`:

```typescript title="server.ts"  hl_lines="6 15 17"

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { server, registerMCPTools } from './mcp-server.js';
import { configuredAuthServer as auth } from '@asgardeo/mcp-express';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({ origin: '*', exposedHeaders: ['Mcp-Session-Id'] }));
app.use(express.json());

registerMCPTools();
app.use(auth.router());

app.post('/mcp', auth.protect(), async (req, res) => {
    const transport = new StreamableHTTPServerTransport({
        enableJsonResponse: true,
    });

    res.on('close', () => transport.close());

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}/mcp`);
});
```

Run the dev server by running the following command again.

=== "npm"

    ``` bash
    npm start
    ```

=== "yarn"

    ``` bash
    npm start
    ```

=== "nnpm"

    ``` bash
    npm start
    ```

## Test the MCP server with auth

!!! Tip
    In the previous step, the MCP server was secured with Asgardeo middleware and now requires a valid access token to access it. In this step, MCP Inspector is registered as an MCP client in {{product_name}} so it can obtain an access token.

To register MCP Inspector as a MCP client in {{product_name}}:

<!-- markdownlint-disable MD007 -->
- Sign in to {{ product_name }} console and navigate to **Applications > New Application**.
- Select **MCP Client** and complete the wizard popup by providing:
    - A suitable **name** *(e.g., MCPInspectorApp)*
    - The **authorized redirect URL** *(e.g., http://localhost:6274/oauth/callback/debug)*
<!-- markdownlint-enable MD007 -->

!!! Info
    The authorized redirect URL determines where users are sent after login, typically where the client app connecting to the MCP server is running. 
    For this guide, we'll use ["MCP Inspector"](https://modelcontextprotocol.io/docs/tools/inspector) to test the MCP server, so we'll use `http://localhost:6274/oauth/callback/debug`, as the authorized redirect URL.

Make a note of the **client-id** from the **Protocol** tab of the registered application. You will need it during next step. 

Use MCP Inspector to test (now requires auth):

```bash
npx @modelcontextprotocol/inspector --url http://localhost:3000/mcp --transport streamable-http

```

!!! Info
    You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to try out the login feature.

1. In the MCP inspector, open the **Authentication** settings in the left side. Under *OAuth 2.0 Flow* provide the `client-id` obtained earlier in this guide.

2. Click **Open Auth Settings** and then click **Quick OAuth2 Flow** to initiate the OAuth2 flow, then the inspector will prompt for authentication. Follow the OAuth flow to obtain a bearer token from {{ product_name }}.

3. Once the user authentication is complete, click the **Connect** button from the left side.  Now you should be able to view and invoke the tools exposed by the MCP server.

!!! Important
    With CORS enabled, browser-based clients should connect without errors. For production, customize CORS origins and explore SDK docs for advanced features like stateful sessions.

[//] STEPS_END
