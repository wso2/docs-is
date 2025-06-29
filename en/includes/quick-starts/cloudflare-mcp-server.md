# Cloudflare MCP server Quickstart

Welcome to the Cloudflare MCP server Quickstart guide! In this document, you will learn to build a Cloudflare MCP server, secure it using {{ product_name }} and define a MCP tool to return profile information.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application.**
- Select **Traditional Web Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.(*Ensure that the protocol remains set to OpenID Connect (OIDC).*)

!!! Example
    Name : CloudflareMCPServer

    Authorized redirect URL: http://localhost:8788/callback

!!! Info

    The authorized redirect URL determines where {{product_name}} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use `http://localhost:8788/callback`, as the authorized redirect URL.

Make a note of the following values from the **Protocol** and **Info** tabs of the registered application. You will need them during the **Step 4**

- **`client-id`** from the **Protocol** tab.
- **`client-secret`** from the **Protocol** tab.
- **The name of your {{ product_name }} organization**.

## Create a Cloudflare MCP server

Create a Cloudflare MCP server project by running the following command.

=== "npm"

    ``` bash
    npm create cloudflare@latest -- asgardeo-mcp-quickstart --template=cloudflare/ai/demos/remote-mcp-github-oauth
    ```

=== "yarn"

    ``` bash
    yarn create cloudflare@latest -- asgardeo-mcp-quickstart --template=cloudflare/ai/demos/remote-mcp-github-oauth
    ```

=== "nnpm"

    ``` bash
    nnpm create cloudflare@latest -- asgardeo-mcp-quickstart --template=cloudflare/ai/demos/remote-mcp-github-oauth
    ```

Move into the project directory, and delete the `github-handler.ts`, `workers-oauth-utils.ts` and `utils.ts` files available in the `src` directory.

``` bash
    
    cd asgardeo-mcp-quickstart

```

Then copy the following Asgardeo handler files from the [Cloudflare MCP Asgardeo handler GitHub repository](https://github.com/sagara-gunathunga/cloudflare-mcp-asgardeo/tree/main/asgardeo-handler){:target="_blank"}.

- asgardeo-handler.ts
- types.ts
- utils.ts
- workers-oauth-utils.ts

Replace the existing content of the `index.ts` file with the following code.
Here, you are defining an **McpServer** and a tool called **whoami** to return user profile details.

```typescript title="index.ts"

import OAuthProvider from "@cloudflare/workers-oauth-provider";
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { AsgardeoHandler, tokenExchangeCallback } from "./asgardeo-handler";
import { Props } from "./types";


export class MyMCP extends McpAgent<Env, {}, Props> {
  server = new McpServer({
    name: "Asgardeo OAuth Proxy Demo",
    version: "1.0.0",
  });

  async init() {
    this.server.tool(
      "whoami",
      "Get user info from your user profile",
      {},
      async () => ({
        content: [
          {
            type: "text",
            text: JSON.stringify({
              username: this.props.claimSet.username,
              given_name: this.props.claimSet.given_name,
              family_name: this.props.claimSet.family_name,
              organization: this.props.claimSet.org_name,
            }),
          },
        ],
        ],
        ]
      });
    );
  }
}
```

Then add the following code at the end of the file to exports a ready-to-use Asgardeo OAuth provider, pre-configured for handling authentication flows at specific endpoints in the Cloudflare serverless environment.

```typescript title="index.ts"

export default new OAuthProvider({
  apiRoute: "/sse",
  apiHandler: MyMCP.mount("/sse") as any,
  defaultHandler: AsgardeoHandler as any,
  authorizeEndpoint: "/authorize",
  tokenEndpoint: "/token",
  clientRegistrationEndpoint: "/register",
  tokenExchangeCallback: tokenExchangeCallback
});
  

```

## Run and test locally

Create a file called `.dev.vars` by running the following command.

```bash
    touch .dev.vars

```

Then add the following values into `.dev.vars` file, and make sure to replace the placeholders with the values you copied above.

```properties title="index.ts"

ASGARDEO_CLIENT_ID=<your-app-client-id>
ASGARDEO_CLIENT_SECRET=<your-app-client-secret>
ASGARDEO_BASE_URL=https://api.asgardeo.io/t/<your-organization-name>'
ASGARDEO_SCOPE=openid profile
ASGARDEO_SCOPE=openid profile

```

Start the development server locally by running the following command.

=== "npm"

    ``` bash
    
    npm start

    ```

=== "yarn"

    ``` bash

    yarn start

    ```

=== "nnpm"

    ``` bash

    pnpm start

    ```

Your MCP server is now running on `http://localhost:8788/sse`.

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login feature.

To test the MCP server go to the Cloudflare [Workers AI LLM Playground](https://playground.ai.cloudflare.com/){:target="_blank"}  and enter the `http://localhost:8788/sse` URL under the MCP Servers section. Then, you’ll be shown a **consent screen**, and once approved, you’ll be redirected to **{{ product_name }}** for authentication. After completing the authentication flow, you will be presented with the tools exposed by your MCP server.

If you invoke the `whoami` tool, you should be able to see your **profile information** returned from the server. Alternatively, you can use any other MCP testing tools you are familiar with to test this MCP server.

## Run and test in Cloudflare

First, create a KV namespace in Cloudflare using the following command.

```bash
npx wrangler kv namespace create OAUTH_KV
```

Make sure to update **wrangler.jsonc** file with the **id** value received after running the above command.

```json title="wrangler.jsonc"

"kv_namespaces": [
  {
    "binding": "OAUTH_KV",
    "id": "<your-kv-id>"
  }
],
```

Then, set the following secrets via Wrangler by running the following commands.

```bash
npx wrangler@latest secret put ASGARDEO_CLIENT_ID
npx wrangler@latest secret put ASGARDEO_CLIENT_SECRET
npx wrangler@latest secret put ASGARDEO_BASE_URL
npx wrangler@latest secret put ASGARDEO_SCOPE
npx wrangler@latest secret put COOKIE_ENCRYPTION_KEY # add any random string here e.g. openssl rand -hex 32
```

You can use the values stored in  **`.dev.vars`** file with the above command.

Deploy the MCP server to make it available on your workers.dev domain.

```bash
npx wrangler@latest deploy
```

Make a note of the newly created Cloudflare Worker URL, which is printed as output when you run the deployment command. You can also find this URL by logging into the **Cloudflare web console**. The Worker URL typically follows this format:`https://remote-mcp-asgardeo.<your-subdomain>.workers.dev`

Next, you need to **configure a callback URL** using the above Worker URL. The complete callback URL should take the following format.

```bash
https://remote-mcp-asgardeo.<your-subdomain>.workers.dev/callback
```

To set it up:

1. Log in to the **Asgardeo Console**.
2. Navigate to the application you created.
3. Go to the **Protocol** tab.
4. Add above value into **Authorized redirect URLs**  so that Asgardeo can recognize it as a valid redirect URL.

The connection URL of the MCP server that we deployed into Cloudflare take the following format.

```bash
https://remote-mcp-asgardeo.<your-subdomain>.workers.dev/sse
```

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login feature.

You can test the MCP server using the [Cloudflare Workers AI LLM Playground](https://playground.ai.cloudflare.com/).
Simply enter `https://remote-mcp-asgardeo.<your-subdomain>.workers.dev/sse` as the MCP server URL and click **Connect**. This will redirect you to the Asgardeo login page. Once you've completed the login process, you’ll be able to interact with the LLM in the Playground and use the tools defined in your MCP server.

For example, try asking the LLM: **“Who am I?”**

[//] STEPS_END
