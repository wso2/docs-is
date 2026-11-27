The {{product_name}} Node SDK (`@asgardeo/node`) adds authentication to server-side applications that run on Node.js. It handles the OpenID Connect authorization code flow with PKCE on the server, keeps each user's tokens in a server-side store keyed by a session ID that you choose, and gives you the user's tokens and information on later requests.

The SDK does not depend on a web framework. Your app owns the HTTP layer: it reads the session ID from a cookie, redirects the user, and calls the SDK. Use it with the Node.js `http` module or any framework that does not have its own {{product_name}} SDK.

!!! tip
    If you build with Express, use the [{{product_name}} Express SDK]({{base_path}}/sdks/express/overview/) instead. It is built on this SDK and adds the sign-in and sign-out routes, the session cookie, and route protection for you. For Next.js, use the [Next.js SDK]({{base_path}}/sdks/nextjs/overview/).

## Installation

Use one of the following options to install the {{product_name}} Node SDK.

=== "npm"

    ```bash
    npm install @asgardeo/node
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/node
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/node
    ```

## How it works

1. Your app gives each browser a session ID, usually in an HTTP-only cookie, and passes it to the SDK as `userId`.
2. On the sign-in route, `signIn()` builds the authorization URL and hands it to a callback that you use to redirect the user to {{product_name}}.
3. {{product_name}} redirects the user back to `afterSignInUrl` with an authorization code. Pass the code, `session_state` and `state` to `signIn()` to get the tokens. The SDK stores them against the session ID.
4. On later requests, read the session ID from the cookie and call methods such as `isSignedIn()`, `getUser()` and `getAccessToken()` with it.
5. To sign the user out, `signOut()` returns the {{product_name}} sign-out URL to redirect the user to.

## Example

The following example uses the Node.js `http` module. Register an application in {{product_name}} as a traditional web application, and add `http://localhost:3000/callback` and `http://localhost:3000` as authorized redirect URLs.

```javascript title="server.js"
import { createServer } from "node:http";
import { randomUUID } from "node:crypto";
import { LegacyAsgardeoNodeClient } from "@asgardeo/node";

const APP_URL = "http://localhost:3000";
const COOKIE_NAME = "SESSION_ID";

const auth = new LegacyAsgardeoNodeClient();

await auth.initialize({
  afterSignInUrl: `${APP_URL}/callback`,
  afterSignOutUrl: APP_URL,
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  clientId: "<your-app-client-id>",
  clientSecret: "<your-app-client-secret>"
});

// Reads the session ID from the request's cookies.
const getSessionId = (req) =>
  (req.headers.cookie ?? "")
    .split(";")
    .map((cookie) => cookie.trim().split("="))
    .find(([name]) => name === COOKIE_NAME)?.[1];

const redirect = (res, location) => {
  res.writeHead(302, { Location: location }).end();
};

createServer(async (req, res) => {
  const url = new URL(req.url, APP_URL);

  try {
    // Starts the sign-in flow.
    if (url.pathname === "/login") {
      const sessionId = getSessionId(req) ?? randomUUID();

      const tokens = await auth.signIn((authorizationUrl) => {
        res.setHeader("Set-Cookie", `${COOKIE_NAME}=${sessionId}; Path=/; HttpOnly; SameSite=Lax`);
        redirect(res, authorizationUrl);
      }, sessionId);

      // The user already has a valid session.
      if (tokens.accessToken) {
        redirect(res, "/");
      }

      return;
    }

    // Handles the redirect back from {{product_name}}.
    if (url.pathname === "/callback") {
      const sessionId = getSessionId(req);

      // The user cancelled sign-in or {{product_name}} returned an error.
      if (url.searchParams.has("error")) {
        res.statusCode = 401;
        res.end(url.searchParams.get("error_description") ?? "Sign-in failed.");

        return;
      }

      if (!sessionId) {
        redirect(res, "/login");

        return;
      }

      await auth.signIn(
        (authorizationUrl) => redirect(res, authorizationUrl),
        sessionId,
        url.searchParams.get("code") ?? undefined,
        url.searchParams.get("session_state") ?? undefined,
        url.searchParams.get("state") ?? undefined
      );

      if (!res.headersSent) {
        redirect(res, "/");
      }

      return;
    }

    // Signs the user out.
    if (url.pathname === "/logout") {
      const sessionId = getSessionId(req);

      if (!sessionId) {
        redirect(res, "/");

        return;
      }

      // Returns the sign-out URL and removes the user's tokens from the SDK's store.
      const signOutUrl = await auth.signOut(sessionId);

      res.setHeader("Set-Cookie", `${COOKIE_NAME}=; Path=/; Max-Age=0`);
      redirect(res, signOutUrl);

      return;
    }

    const sessionId = getSessionId(req);

    if (sessionId && (await auth.isSignedIn(sessionId))) {
      const user = await auth.getUser(sessionId);

      res.end(`Hello ${user.username}. <a href="/logout">Sign out</a>`);

      return;
    }

    res.end(`<a href="/login">Sign in</a>`);
  } catch (error) {
    res.statusCode = 500;
    res.end(error.message);
  }
}).listen(3000);
```

## APIs

The SDK provides the following APIs.

### LegacyAsgardeoNodeClient

`LegacyAsgardeoNodeClient` is the class that apps use. Create an instance, configure it with `initialize()`, and use it to sign users in and out and to read tokens and user information.

- **[`LegacyAsgardeoNodeClient`]({{base_path}}/sdks/node/apis/legacy-asgardeo-node-client/)** – Methods for authentication, tokens, user information and session storage.
- **[Configuration]({{base_path}}/sdks/node/apis/configuration/)** – The options that `initialize()` accepts.

### Framework integration APIs

The SDK also exports building blocks for writing a {{product_name}} SDK for a Node.js framework, such as the base client class and session cookie helpers that the Next.js SDK uses. Apps do not need them.

- **[Framework integration APIs]({{base_path}}/sdks/node/apis/framework-integration/)** – `AsgardeoNodeClient`, `CookieConfig`, `getSessionCookieOptions()` and `generateSessionId()`.

## Guides

- **[Accessing protected APIs]({{base_path}}/sdks/node/guides/accessing-protected-apis/)** – Get the user's access token and call APIs with it.

## Logging

The SDK writes debug logs to the console when the `LOG_LEVEL` environment variable is set to `DEBUG`, `INFO`, `WARN` or `ERROR`. Logging is off by default.

```bash
LOG_LEVEL=DEBUG node server.js
```
