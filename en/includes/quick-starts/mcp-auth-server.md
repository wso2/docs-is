# MCP-Auth Quickstart

Welcome to the Secure MCP server Quickstart guide! This document shows you how to build a secure MCP (Model Context Protocol) server using [MCP TypeScript SDK](https://www.npmjs.com/package/@modelcontextprotocol/sdk) and [WSO2 MCP Auth SDK](https://www.npmjs.com/package/@asgardeo/mcp-express).

You will create an MCP server that:

- **Implements authorization** with {{ product_name }}
- **Defines a tool** that adds two numbers
- **Serves a resource** that generates a greeting

After completing this guide, you will have a working MCP server that uses OAuth 2.1 according to the [MCP auth specification](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization).

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign in to {{ product_name }} console and navigate to **Applications > New Application**.
- Select **MCP Client** and complete the wizard popup by providing a suitable name and an the authorized redirect URL.

!!! Example
    Name : MCPInspectorApp

    Authorized redirect URL: http://localhost:6274/oauth/callback

!!! Info
    The authorized redirect URL determines where users are sent after login, typically where the client app connecting to the MCP server is running. 
    For this guide, we'll use ["MCP Inspector"](https://modelcontextprotocol.io/docs/tools/inspector) to test the MCP server, so we'll use `http://localhost:6274/oauth/callback`, as the authorized redirect URL.

Make a note of the **client-id** from the **Protocol** tab of the registered application. You will need it during the [Test the MCP server with auth](#test-the-mcp-server-with-auth) section of this guide.

## Create a Simple MCP server

Create a directory called `mcp-auth-quickstart` by running the following commands.

``` bash
  mkdir  mcp-auth-quickstart
  cd mcp-auth-quickstart
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
    npm install typescript tsx express zod @modelcontextprotocol/sdk
    npm install --save-dev @types/express @types/node @types/cors
    ```

=== "yarn"

    ``` bash
    yarn add typescript tsx express zod @modelcontextprotocol/sdk
    yarn add --dev @types/express @types/node @types/cors
    ``` 

=== "nnpm"

    ``` bash
    nnpm install typescript tsx express zod @modelcontextprotocol/sdk
    nnpm install --save-dev @types/express @types/node @types/cors
    ```

Initialize the TypeScript configuration by running the following command.

=== "npx"

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

Create `server.ts` in the root and add the code below. This implements a Streamable-HTTP MCP server with a basic tool (addition) and resource (greeting), plus CORS handling to avoid cross-origin errors when testing with browser clients.

```typescript title="server.ts"
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import cors from 'cors'; // Add this import
import { z } from 'zod';

// Create an MCP server
const server = new McpServer({
    name: 'demo-server',
    version: '1.0.0'
});

// Define the port
const port = '3000';

// Register a simple addition tool
server.registerTool(
    'add',
    {
        title: 'Addition Tool',
        description: 'Add two numbers',
        inputSchema: { a: z.number(), b: z.number() },
        outputSchema: { result: z.number() }
    },
    async ({ a, b }) => {
        const output = { result: a + b };
        return {
            content: [{ type: 'text', text: JSON.stringify(output) }],
            structuredContent: output
        };
    }
);

// Register a dynamic greeting resource
server.registerResource(
    'greeting',
    new ResourceTemplate('greeting://{name}', { list: undefined }),
    {
        title: 'Greeting Resource',
        description: 'Dynamic greeting generator'
    },
    async (uri, { name }) => ({
        contents: [
            {
                uri: uri.href,
                text: `Hello, ${name}!`
            }
        ]
    })
);

// Set up Express app
const app = express();

// Enable CORS (add this block)
app.use(
    cors({
        origin: '*', // Allow all origins for development; restrict in production (e.g., ['https://your-client-domain.com'])
        exposedHeaders: ['Mcp-Session-Id'],
    })
);

app.use(express.json());

// Handle MCP requests at /mcp endpoint
app.post('/mcp', async (req, res) => {
    // Create a new transport for each request (stateless mode)
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true
    });

    res.on('close', () => {
        transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

// Start the server
app.listen(port, () => {
    console.log(`Demo MCP Server running on http://localhost:${port}/mcp`);
}).on('error', error => {
    console.error('Server error:', error);
    process.exit(1);
});

```

## Run and test without auth

First run the dev server by running the following command.
```bash
npm start
```

Use **MCP Inspector** as the client application to test the MCP server.

 In a new terminal window, run the following command to launch MCP Inspector against the running MCP server, ensuring you specify the transport and the URL explicitly.

```bash
npx @modelcontextprotocol/inspector --url http://localhost:3000/mcp --transport streamable-http
```  

Use it to list tools/resources, invoke the "add" tool, or query the "greeting" resource using the inspector UI.


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

Update `server.ts` to integrate the Asgardeo middleware. This adds:
    - Initialization of `McpAuthServer`.
    - Registration of OAuth endpoints via `router()`.
    - Protection of the `/mcp` route with `protect()`.
    - Optional: Bearer token extraction for use in tools/resources (e.g., to obtain user details).

Here's the full updated `server.ts`:

```typescript title="server.ts"
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import cors from 'cors'; // Add this import
import { z } from 'zod';
import {McpAuthServer} from '@asgardeo/mcp-express';

// Define the port
const port = '3000';

// Initialize McpAuthServer (Asgardeo auth middleware)
const mcpAuthServer = new McpAuthServer({
  baseUrl: '{{content.sdkconfig.baseUrl}}',
  issuer: '{{content.sdkconfig.baseUrl}}/oauth2/token',
  resource: `http://localhost:${port}/mcp`,
});

// Create an MCP server
const server = new McpServer({
    name: 'demo-auth-server',
    version: '1.0.0'
});

// Register a simple addition tool
server.registerTool(
    'add',
    {
        title: 'Addition Tool',
        description: 'Add two numbers',
        inputSchema: { a: z.number(), b: z.number() },
        outputSchema: { result: z.number() }
    },
    async ({ a, b }) => {
        const output = { result: a + b };
        return {
            content: [{ type: 'text', text: JSON.stringify(output) }],
            structuredContent: output
        };
    }
);

// Register a dynamic greeting resource
server.registerResource(
    'greeting',
    new ResourceTemplate('greeting://{name}', { list: undefined }),
    {
        title: 'Greeting Resource',
        description: 'Dynamic greeting generator'
    },
    async (uri, { name }) => ({
        contents: [
            {
                uri: uri.href,
                text: `Hello, ${name}!`
            }
        ]
    })
);

// Set up Express app
const app = express();

// Enable CORS (add this block)
app.use(
    cors({
        origin: '*', // Allow all origins for development; restrict in production (e.g., ['https://your-client-domain.com'])
        exposedHeaders: ['Mcp-Session-Id'],
    })
);

app.use(express.json());
app.use(mcpAuthServer.router());

// Handle MCP requests at /mcp endpoint
app.post('/mcp', mcpAuthServer.protect(), async (req, res) => {
    // Create a new transport for each request (stateless mode)
    const transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: undefined,
        enableJsonResponse: true
    });

    res.on('close', () => {
        transport.close();
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
});

// Start the server
app.listen(port, () => {
    console.log(`Demo MCP Server running on http://localhost:${port}/mcp`);
}).on('error', error => {
    console.error('Server error:', error);
    process.exit(1);
});
```

Verify and update the placeholder values of `mcpAuthServer` configurations to properly connect to `{{ product_name }}`. Alternatively, you can use environment variables to manage these configurations securely.

First run the dev server by running the following command.

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

Use MCP Inspector to test (now requires auth):
   ```
   npx @modelcontextprotocol/inspector --url http://localhost:3000/mcp --transport streamable-http
   ```

   - In the MCP inspector, open the *Authentication* settings in the left side. Under *OAuth 2.0 Flow* provide the `client-id` obtained earlier in this guide.
   - Click *Connect*, the inspector will prompt for authentication. Follow the OAuth flow to obtain a bearer token from {{ product_name }}.

    !!! Info
        You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to try out the login feature.

   - Once the authentication is complete, you should be able to view the resources and invoke the tools exposed by the MCP server. 
   - Unauthenticated requests to `/mcp` (e.g., via curl without Authorization header)return **401 errors** with **WWW-Authenticate headers**.

!!! Important
    With CORS enabled, browser-based clients should connect without errors. For production, customize CORS origins and explore SDK docs for advanced features like stateful sessions.

[//] STEPS_END
