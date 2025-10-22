# TypeScript MCP Server with {{ product_name }} Authentication

Welcome to the TypeScript MCP Server Quickstart guide! In this document, you will learn to build a **type-safe** Node.js MCP server using TypeScript, secure it with {{ product_name }} authentication, and create authenticated MCP tools that return user profile information.

This guide uses the **{{ product_name }} MCP Express SDK** which provides built-in OAuth2 authentication middleware for MCP servers.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application**.
- Select **Single Page Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL.

!!! Example
    Name: SecureMCPTypeScriptServer

    Authorized redirect URL: http://localhost:3000/oauth/callback

!!! Info
    The authorized redirect URL determines where {{ product_name }} should send users after they successfully log in. For this guide, we'll use `http://localhost:3000/oauth/callback` as the authorized redirect URL.

Make a note of the following values from the **Protocol** and **Info** tabs of the registered application. You will need them in **Step 4**.

- **`client-id`** from the **Protocol** tab.
- **Base URL** from the browser address bar (e.g., `https://api.asgardeo.io/t/your-org`).

## Create a TypeScript MCP Server Project

Create a directory called `typescript-mcp-auth-quickstart` by running the following commands:

``` bash
mkdir typescript-mcp-auth-quickstart
cd typescript-mcp-auth-quickstart
```

Initialize a Node.js project using the following command:

=== "npm"

    ``` bash
    npm init -y
    ```

=== "yarn"

    ``` bash
    yarn init -y
    ```

=== "pnpm"

    ``` bash
    pnpm init
    ```

Install the required dependencies:

=== "npm"

    ``` bash
    npm install @modelcontextprotocol/sdk @asgardeo/mcp-express express cors
    npm install -D typescript @types/node @types/express @types/cors ts-node nodemon
    ```

=== "yarn"

    ``` bash
    yarn add @modelcontextprotocol/sdk @asgardeo/mcp-express express cors
    yarn add -D typescript @types/node @types/express @types/cors ts-node nodemon
    ```

=== "pnpm"

    ``` bash
    pnpm add @modelcontextprotocol/sdk @asgardeo/mcp-express express cors
    pnpm add -D typescript @types/node @types/express @types/cors ts-node nodemon
    ```

Create a TypeScript configuration file:

```bash
npx tsc --init
```

Open the `tsconfig.json` file and replace the content with the following configuration:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "Node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "strict": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

Update the `package.json` file with the following content:

```json title="package.json"
{
  "name": "typescript-mcp-auth-quickstart",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "nodemon --exec ts-node --esm src/index.ts",
    "clean": "rm -rf dist"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.0.0",
    "@asgardeo/mcp-express": "^1.0.0",
    "express": "^4.18.0",
    "cors": "^2.8.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "@types/node": "^20.0.0",
    "@types/express": "^4.17.0",
    "@types/cors": "^2.8.0",
    "ts-node": "^10.9.0",
    "nodemon": "^3.0.0"
  }
}
```

Create a `src` directory and add the main server file:

```bash
mkdir src
```

## Create the TypeScript MCP Server

Create a file called `src/index.ts` and add the following TypeScript code:

```typescript title="src/index.ts"
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { McpAuthServer } from '@asgardeo/mcp-express';
import express, { Application } from 'express';
import cors from 'cors';

// Type definitions for better type safety
interface UserProfile {
  sub: string;
  email?: string;
  given_name?: string;
  family_name?: string;
  [key: string]: any;
}

interface AuthenticatedContext {
  userProfile: UserProfile;
  accessToken: string;
}

class SecureMCPServer {
  private server: Server;
  private app: Application;
  private mcpAuthServer: McpAuthServer;
  private readonly port: number;

  constructor() {
    this.port = parseInt(process.env.PORT || '3000', 10);
    this.server = new Server(
      {
        name: 'secure-typescript-mcp-server',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
        },
      }
    );

    this.app = express();
    this.setupExpress();
    this.initializeMCPAuth();
    this.setupMCPHandlers();
  }

  private setupExpress(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  private initializeMCPAuth(): void {
    const baseUrl = process.env.ASGARDEO_BASE_URL;
    
    if (!baseUrl) {
      throw new Error('ASGARDEO_BASE_URL environment variable is required');
    }

    this.mcpAuthServer = new McpAuthServer({
      issuer: baseUrl,
      server: this.server,
    });

    // Apply authentication middleware to MCP endpoints
    this.app.use('/mcp', this.mcpAuthServer.protect());
  }

  private setupMCPHandlers(): void {
    // Handle tool listing requests
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'whoami',
            description: 'Get the authenticated user profile information',
            inputSchema: {
              type: 'object',
              properties: {},
              additionalProperties: false,
            },
          },
          {
            name: 'user-preferences',
            description: 'Get user preferences and settings',
            inputSchema: {
              type: 'object',
              properties: {
                category: {
                  type: 'string',
                  description: 'Preference category to retrieve',
                  enum: ['theme', 'notifications', 'privacy', 'all'],
                },
              },
              additionalProperties: false,
            },
          },
        ],
      };
    });

    // Handle tool execution requests
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      // Get authenticated context from MCP auth middleware
      const authContext = this.getAuthenticatedContext(request);

      switch (name) {
        case 'whoami':
          return this.handleWhoAmI(authContext);

        case 'user-preferences':
          return this.handleUserPreferences(authContext, args as { category?: string });

        default:
          throw new Error(`Unknown tool: ${name}`);
      }
    });
  }

  private getAuthenticatedContext(request: any): AuthenticatedContext {
    // Extract user profile from the authenticated request
    // This would be populated by the MCP auth middleware
    const userProfile = (request as any).userProfile as UserProfile;
    const accessToken = (request as any).accessToken as string;

    if (!userProfile) {
      throw new Error('User not authenticated');
    }

    return { userProfile, accessToken };
  }

  private async handleWhoAmI(context: AuthenticatedContext) {
    const { userProfile } = context;

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            message: 'User profile retrieved successfully',
            profile: {
              id: userProfile.sub,
              email: userProfile.email || 'Not provided',
              firstName: userProfile.given_name || 'Not provided',
              lastName: userProfile.family_name || 'Not provided',
              fullProfile: userProfile,
            },
          }, null, 2),
        },
      ],
    };
  }

  private async handleUserPreferences(
    context: AuthenticatedContext,
    args: { category?: string }
  ) {
    const { userProfile } = context;
    const { category = 'all' } = args;

    // Mock user preferences based on category
    const preferences = this.getMockPreferences(category, userProfile);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({
            message: `User preferences for category '${category}' retrieved successfully`,
            userId: userProfile.sub,
            category,
            preferences,
          }, null, 2),
        },
      ],
    };
  }

  private getMockPreferences(category: string, userProfile: UserProfile): any {
    const allPreferences = {
      theme: {
        colorScheme: 'dark',
        fontSize: 'medium',
        language: 'en',
      },
      notifications: {
        email: true,
        push: true,
        sms: false,
      },
      privacy: {
        profileVisibility: 'private',
        dataSharing: false,
        analyticsOptIn: true,
      },
    };

    if (category === 'all') {
      return allPreferences;
    }

    return allPreferences[category as keyof typeof allPreferences] || {};
  }

  public async start(): Promise<void> {
    // Set up MCP HTTP transport endpoint
    this.app.use('/mcp', this.mcpAuthServer.router());

    // Start the Express server
    this.app.listen(this.port, () => {
      console.log(`🚀 Secure TypeScript MCP Server running on http://localhost:${this.port}`);
      console.log(`📡 MCP endpoint available at http://localhost:${this.port}/mcp`);
      console.log(`🔐 Authentication required for all MCP tools`);
    });
  }
}

// Start the server
const server = new SecureMCPServer();
server.start().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
```

## Set Up Environment Configuration

Create an environment configuration file:

```bash
touch .env.example
```

Add the following content to `.env.example`:

```bash title=".env.example"
# Asgardeo Configuration
ASGARDEO_BASE_URL=https://api.asgardeo.io/t/your-org

# Server Configuration
PORT=3000
```

Create your actual environment file:

```bash
cp .env.example .env
```

Update `.env` with your actual {{ product_name }} configuration:

```bash title=".env"
# Replace with your actual Asgardeo organization URL
ASGARDEO_BASE_URL=https://api.asgardeo.io/t/your-org

PORT=3000
```

!!! Important
    Replace `your-org` in the `ASGARDEO_BASE_URL` with your actual {{ product_name }} organization name from the base URL you copied in **Step 1**.

## Build and Run the Server

Build the TypeScript code:

=== "npm"

    ``` bash
    npm run build
    ```

=== "yarn"

    ``` bash
    yarn build
    ```

=== "pnpm"

    ``` bash
    pnpm build
    ```

Start the server in production mode:

=== "npm"

    ``` bash
    npm start
    ```

=== "yarn"

    ``` bash
    yarn start
    ```

=== "pnpm"

    ``` bash
    pnpm start
    ```

For development with auto-reload:

=== "npm"

    ``` bash
    npm run dev
    ```

=== "yarn"

    ``` bash
    yarn dev
    ```

=== "pnpm"

    ``` bash
    pnpm dev
    ```

You should see output similar to:

```
🚀 Secure TypeScript MCP Server running on http://localhost:3000
📡 MCP endpoint available at http://localhost:3000/mcp
🔐 Authentication required for all MCP tools
```

## Configure Claude Desktop

Configure **Claude Desktop** as the client application to test the MCP server:

1. Open **Claude Desktop**.
2. Click on **Claude Desktop > Settings > Developer**.
3. Click on **Edit Config** button. This will open the `claude_desktop_config.json` file location.

Add the following configuration to the `claude_desktop_config.json` file:

```json title="claude_desktop_config.json"
{
  "mcpServers": {
    "secure-typescript-server": {
      "command": "npx",
      "args": [
        "mcp-remote@latest",
        "http://localhost:3000/mcp",
        "--static-oauth-client-info",
        "{\"client_id\": \"<your-client-id>\"}",
        "--static-oauth-client-metadata",
        "{\"scope\": \"openid profile email\"}"
      ]
    }
  }
}
```

!!! Important
    Replace `<your-client-id>` with the actual client ID you copied from the {{ product_name }} console in **Step 1**.

## Test the Authenticated MCP Server

Restart **Claude Desktop** to load the new configuration.

When you open Claude Desktop, it will redirect you to the {{ product_name }} login page for user authentication.

!!! Important
    You need to create a test user in {{ product_name }} by following the instructions in the [Onboard a Single User guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to try out the login feature.

Once authentication is complete, you can test the MCP server with the following prompts:

### Test the `whoami` tool:

```text
Who am I?
```

You should see your user profile information returned with full type safety.

### Test the `user-preferences` tool:

```text
Show me my user preferences for notifications
```

or

```text
What are all my user preferences?
```

The server will return mock preference data based on your authenticated user profile.

## Understanding the TypeScript Implementation

### **Type Safety Benefits**

This TypeScript implementation provides several advantages over JavaScript:

- **Interface definitions** for `UserProfile` and `AuthenticatedContext`
- **Compile-time error checking** for method signatures and return types
- **IntelliSense support** in your IDE for better development experience
- **Explicit typing** for MCP tool arguments and responses

### **Authentication Flow**

1. **Client requests** an MCP tool through Claude Desktop
2. **MCP Auth middleware** intercepts the request and checks for authentication
3. **If not authenticated**, user is redirected to {{ product_name }} login
4. **After successful login**, the access token is validated
5. **User profile information** is attached to the request context
6. **MCP tools execute** with authenticated user context

### **Security Features**

- **OAuth2 authentication** with {{ product_name }}
- **Token validation** on every request
- **User context isolation** - each user only sees their own data
- **Type-safe error handling** for authentication failures

[//] STEPS_END

## Next Steps

Now that you have a working TypeScript MCP server with {{ product_name }} authentication, you can:

- **Add more MCP tools** that use the authenticated user context
- **Integrate with external APIs** using the user's access token
- **Implement role-based access control** for different MCP tools
- **Add data persistence** with user-specific data storage
- **Deploy to production** with proper environment configuration

## Troubleshooting

### **"Not authenticated" errors**

- Verify your {{ product_name }} application configuration
- Check that the client ID in Claude Desktop config matches your application
- Ensure your redirect URL matches exactly (`http://localhost:3000/oauth/callback`)
- Clear browser cache and retry authentication

### **TypeScript compilation errors**

- Run `npm run build` to check for type errors
- Ensure all dependencies are properly installed
- Verify your `tsconfig.json` configuration matches the guide

### **Server startup issues**

- Check that port 3000 is not in use: `lsof -i :3000`
- Verify your `.env` file has the correct `ASGARDEO_BASE_URL`
- Ensure Node.js version is 16 or higher: `node --version`

### **Module resolution errors**

- Delete `node_modules` and reinstall dependencies
- Clear TypeScript cache: `npx tsc --build --clean`
- Verify your `package.json` has `"type": "module"`

## Learn More

- [{{ product_name }} Documentation]({{ base_path }}/)
- [MCP Specification](https://modelcontextprotocol.io/specification/latest){:target="_blank"}
- [{{ product_name }} MCP Express SDK](https://www.npmjs.com/package/@asgardeo/mcp-express){:target="_blank"}
- [TypeScript MCP SDK](https://github.com/modelcontextprotocol/typescript-sdk){:target="_blank"}
- [Complete Sample Project](https://github.com/ngsanthosh/typescript-mcp-auth-quickstart){:target="_blank"}