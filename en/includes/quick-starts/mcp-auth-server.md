# MCP-Auth Quickstart

Welcome to the MCP-Auth server Quickstart guide! In this document, you will learn to build a Node.js MCP server, secure it using {{ product_name }} and define a MCP tool to return profile information.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application**.
- Select **Single Page Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    Name : MCPAuthServer

    Authorized redirect URL: http://localhost:47926/oauth/callback

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use `http://localhost:47926/oauth/callback`, as the authorized redirect URL.

Make a note of the following values from the **Protocol** and **Info** tabs of the registered application. You will need them during the **Step 4**

- **`client-id`** from the **Protocol** tab.
- **`Token Endpoint`** from the **Info** tab.

## Create a Node.js MCP server

Create a directory called `mcp-auth-quickstart` by running the following commands.

``` bash
  mkdir  mcp-auth-quickstart
  cd mcp-auth-quickstart
```

Than initialize a Node.js project using the following command.

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
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  }
}
```

Install the following dependencies.

=== "npm"

    ``` bash
    npm install @modelcontextprotocol/sdk express
    ```

=== "yarn"

    ``` bash
    yarn install @modelcontextprotocol/sdk express
    ```

=== "nnpm"

    ``` bash
    nnpm install @modelcontextprotocol/sdk express
    ```

Crate a file called `index.js` and add the following content.

```javascript title="index.js"
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import express from 'express';

const server = new McpServer({
  name: 'WhoAmI',
  version: '0.0.0',
});

server.tool('whoami', async () => {
  return {
    content: [{ type: 'text', text: JSON.stringify({ error: 'Not authenticated' }) }],
  };
});

const PORT = 3001;
const app = express();

const transports = {};

app.get('/sse', async (_req, res) => {
  const transport = new SSEServerTransport('/messages', res);
  transports[transport.sessionId] = transport;

  res.on('close', () => {
    delete transports[transport.sessionId];
  });

  await server.connect(transport);
});

app.post('/messages', async (req, res) => {
  const sessionId = String(req.query.sessionId);
  const transport = transports[sessionId];
  if (transport) {
    await transport.handlePostMessage(req, res, req.body);
  } else {
    res.status(400).send('No transport found for sessionId');
  }
});

app.listen(PORT);
```

## Run and test without auth

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

Configure **Claude Desktop** as the client application to test the MCP server.

1. Open **Claude Desktop**.
2. Click on **Claude Desktop > Settings > Developer**.
3. Click on **Edit Config** button. This will open `claude_desktop_config.json` file location and you can open this file using an text editor.

Add the following configuration to `claude_desktop_config.json` file.

```json title="claude_desktop_config.json"
{
    "mcpServers": {
        "whoami-server": {
            "command": "npx",
            "args": [
                "mcp-remote@latest",
                "http://localhost:3001/sse"
            ]
        }
    }
}
```

Use the following simple prompt to test the MCP server.

```text
Who am I?
```

You should be able to see "Not authenticated" error message.

## Add auth to the MCP server

Stop the dev server and install the MCP-auth dependency.

=== "npm"

    ``` bash
    npm install mcp-auth
    ```

=== "yarn"

    ``` bash
    yarn install mcp-auth
    ```

=== "nnpm"

    ``` bash
    nnpm install mcp-auth
    ```
Update the imports section of `index.js` file with the highlighted code.

```javascript title="index.js" hl_lines="3"
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SSEServerTransport } from '@modelcontextprotocol/sdk/server/sse.js';
import { MCPAuth, fetchServerConfig, MCPAuthTokenVerificationError } from 'mcp-auth';
import express from 'express';
```

Add `index.js` file to include the MCP Auth configuration as given below.

```javascript title="index.js"
const authIssuer = '<Token Endpoint>';
const mcpAuth = new MCPAuth({
    server: await fetchServerConfig(authIssuer, { type: 'oidc' }),
});
```

Make sure to update `<Token Endpoint>` with the value you copied during the first step.

Then add the following given `verifyToken` function to the `index.js` file.

```javascript title="index.js"
const verifyToken = async (token) => {
    const { issuer, userinfoEndpoint } = mcpAuth.config.server.metadata;

    const response = await fetch(userinfoEndpoint, {
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
        throw new MCPAuthTokenVerificationError('token_verification_failed', response);
    }

    const userInfo = await response.json();

    if (typeof userInfo !== 'object' || userInfo === null || !('sub' in userInfo)) {
        throw new MCPAuthTokenVerificationError('invalid_token', response);
    }

    return {
        token,
        issuer,
        subject: String(userInfo.sub),
        clientId: '',
        scopes: [],
        claims: userInfo,
    };
};
```

Finally update the tool to return the user profile details and apply the MCP Auth route and middleware function by modifying the highlighted code in the `index.js` file.

```javascript title="index.js" hl_lines="1-7 11-12"
server.tool('whoami', ({ authInfo }) => {
  return {
    content: [
      { type: 'text', text: JSON.stringify(authInfo?.claims ?? { error: 'Not authenticated' }) },
    ],
  };
});

const PORT = 3001;
const app = express();
app.use(mcpAuth.delegatedRouter());
app.use(mcpAuth.bearerAuth(verifyToken));
const transports = {};
```

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

1. Open **Claude Desktop**.
2. Click on **Claude Desktop > Settings > Developer**.
3. Click on **Edit Config** button. This will open `claude_desktop_config.json` file location and you can open this file using an text editor.

Add the following configuration to `claude_desktop_config.json` file.

```json title="claude_desktop_config.json"
{
    "mcpServers": {
        "whoami-server": {
            "command": "npx",
            "args": [
                "mcp-remote@latest",
                "http://localhost:3001/sse",
                "--static-oauth-client-info",
                "{ \"client_id\": \"<client-id>\"}",
                "--static-oauth-client-metadata",
                "{ \"scope\": \"openid profile email\"}"
            ]
        }
    }
}
```

Make sure to replace `<client-id>` with the value you copied during the first step.

Now, when you open Claude Desktop, it will redirect you to the Asgardeo login page for user authentication.

!!! Important

    You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a Single User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to try out the login feature.

Once the authentication is complete, you should be able to view the tools exposed by the MCP server.

To test the MCP server, use the following simple prompt:

```text
Who am I?
```

You should now see your user profile information returned from the server.

[//] STEPS_END
