The {{product_name}} JavaScript SDK (`@asgardeo/javascript`) is the framework-agnostic core that every {{product_name}} JavaScript SDK is built on. It implements the OpenID Connect authorization code flow with PKCE, token handling, ID token validation and session storage, and ships typed functions for the {{product_name}} REST APIs. It has no dependency on a browser, a server runtime or a UI framework: you plug in the storage and cryptography for your platform.

!!! warning
    Don't use this package directly in an application. Use the SDK for your framework or platform instead. Each one is built on this package and handles storage, cryptography, redirects and session management for you.

    - [Browser SDK]({{base_path}}/sdks/browser/overview/)
    - [Node.js SDK]({{base_path}}/sdks/node/overview/)
    - [React SDK]({{base_path}}/sdks/react/overview/)
    - [Vue SDK]({{base_path}}/sdks/vue/overview/)
    - [Next.js SDK]({{base_path}}/sdks/nextjs/overview/)
    - [Nuxt SDK]({{base_path}}/sdks/nuxt/overview/)
    - [Express SDK]({{base_path}}/sdks/express/overview/)

    Use `@asgardeo/javascript` only when you build an integration or an SDK for a platform that none of these cover.

## Installation

Use one of the following options to install the {{product_name}} JavaScript SDK.

=== "npm"

    ```bash
    npm install @asgardeo/javascript
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/javascript
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/javascript
    ```

## How an integration fits together

An integration creates an `AsgardeoAuthClient`, and gives it three things when it calls `initialize()`:

1. **Configuration** – The application's client ID, redirect URLs and the {{product_name}} endpoints.
2. **A store** – An object that implements the `Storage` interface. The client keeps its configuration, the OpenID provider metadata, the PKCE code verifier and the user's tokens in it.
3. **Crypto utilities** – An object that implements the `Crypto` interface. The client uses it to create PKCE values, decode tokens and verify the ID token signature.

The client builds URLs and talks to the {{product_name}} token, revocation and JWKS endpoints with `fetch`. Your integration is responsible for redirecting the user, reading the authorization code from the callback, and deciding where the store keeps its data.

```typescript
import { AsgardeoAuthClient } from "@asgardeo/javascript";

const auth = new AsgardeoAuthClient();

await auth.initialize(
  {
    afterSignInUrl: "http://localhost:3000/callback",
    afterSignOutUrl: "http://localhost:3000",
    clientId: "<your-app-client-id>",
    baseUrl: "{{content.sdkconfig.baseUrl}}"
  },
  myStore,  // implements Storage
  myCrypto  // implements Crypto
);

// Send the user to this URL to sign in.
const signInUrl = await auth.getSignInUrl();
```

## APIs

The SDK provides the following APIs.

### Authentication client

- **[`AsgardeoAuthClient`]({{base_path}}/sdks/javascript/apis/asgardeo-auth-client/)** – The core OpenID Connect client. Builds sign-in and sign-out URLs, exchanges and refreshes tokens, and reads the session.
- **[`AsgardeoJavaScriptClient`]({{base_path}}/sdks/javascript/apis/asgardeo-javascript-client/)** – The base class that the Browser and Node.js SDK clients extend. Adds agent and organization token flows on top of `AsgardeoAuthClient`.
- **[Configuration]({{base_path}}/sdks/javascript/apis/configuration/)** – The options that `AsgardeoAuthClient.initialize()` accepts.

### Interfaces to implement

- **[`Storage`]({{base_path}}/sdks/javascript/apis/storage/)** – The key-value store that holds configuration, provider metadata and session data.
- **[`Crypto`]({{base_path}}/sdks/javascript/apis/crypto/)** – Encoding, hashing, random bytes and JWT verification for the platform.

### REST API functions

- **[REST API functions]({{base_path}}/sdks/javascript/apis/rest-api-functions/)** – Standalone functions for the user profile (SCIM2), organization, branding and app-native authentication APIs.

### Errors

The functions and the client throw these error types:

- **`AsgardeoAuthException`** – Thrown by `AsgardeoAuthClient`. Has `code`, `name` and `message`.
- **`AsgardeoAPIError`** – Thrown by the REST API functions. Extends `AsgardeoError` and adds `statusCode` and `statusText`.
- **`AsgardeoRuntimeError`** – Thrown for invalid input, for example scopes that are neither a string nor an array. Extends `AsgardeoError` and adds `details`.
- **`AsgardeoError`** – The base class of `AsgardeoAPIError` and `AsgardeoRuntimeError`. Has `code` and `origin`.
