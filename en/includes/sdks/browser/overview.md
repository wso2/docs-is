The {{product_name}} Browser SDK (`@asgardeo/browser`) adds authentication to single-page applications built with plain JavaScript or any framework that runs in the browser. It handles the OpenID Connect authorization code flow with PKCE, stores the session in the browser, and lets you call protected APIs with the user's access token.

!!! tip
    If you build with React, Vue, Next.js or Nuxt, use the framework SDK instead. Each one is built on this SDK and adds components and hooks for that framework.

## Installation

Use one of the following options to install the {{product_name}} Browser SDK.

=== "npm"

    ```bash
    npm install @asgardeo/browser
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/browser
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/browser
    ```

## Getting started

Try out the [{{product_name}} JavaScript quickstart guide.]({{base_path}}/quick-starts/javascript/)

## APIs

The SDK provides the following APIs.

### AsgardeoSPAClient

`AsgardeoSPAClient` is the entry point of the SDK. Get an instance with `AsgardeoSPAClient.getInstance()`, configure it with `initialize()`, and use it to sign users in and out, read tokens and user information, and call protected APIs.

- **[`AsgardeoSPAClient`]({{base_path}}/sdks/browser/apis/asgardeo-spa-client/)** – Methods for authentication, tokens, user information, HTTP requests and event hooks.
- **[Configuration]({{base_path}}/sdks/browser/apis/configuration/)** – The options that `initialize()` accepts.

### Utilities

- **`hasAuthParamsInUrl()`** – Returns `true` when the current URL carries an authorization code, which means {{product_name}} has redirected the user back to your app after sign-in.

## Guides

- **[Accessing protected APIs]({{base_path}}/sdks/browser/guides/accessing-protected-apis/)** – Call APIs that require the user's access token.
