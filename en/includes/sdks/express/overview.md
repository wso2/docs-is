The {{product_name}} Express SDK (`@asgardeo/express`) adds authentication to Express applications. It is built on the [{{product_name}} Node SDK]({{base_path}}/sdks/node/overview/) and runs the OpenID Connect authorization code flow on the server. It adds sign-in and sign-out routes to your app, keeps the user's session in a cookie, and gives you middleware to protect routes.

!!! tip
    Express apps should use this SDK rather than the Node SDK. Use the Node SDK only for Node.js apps that don't use Express.

## Installation

Use one of the following options to install the {{product_name}} Express SDK. The SDK reads the session cookie from `req.cookies`, so also install a cookie parser such as `cookie-parser`.

=== "npm"

    ```bash
    npm install @asgardeo/express cookie-parser
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/express cookie-parser
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/express cookie-parser
    ```

The SDK works with Express 4.21.2 or later.

## How it works

1. `AsgardeoExpressClient.getInstance(config)` creates the client.
2. `AsgardeoExpressClient.asgardeoExpressAuth()` returns a router that adds a sign-in route (`/login` by default) and a sign-out route (`/logout` by default).
3. When the user opens the sign-in route, the SDK sets the `ASGARDEO_SESSION_ID` cookie and redirects them to {{product_name}}. {{product_name}} redirects them back to the same route, where the SDK gets the tokens, stores them against the session ID, and calls your `onSignIn` callback.
4. `AsgardeoExpressClient.protectRoute()` returns middleware that only lets signed-in users through.
5. In your routes, `req.asgardeoAuth` is the client. Pass it the session ID from `req.cookies.ASGARDEO_SESSION_ID` to read the user's information and tokens.

## Example

Register an application in {{product_name}} as a traditional web application, and add `http://localhost:3000/login` and `http://localhost:3000/logout` as authorized redirect URLs.

```javascript title="app.js"
import express from "express";
import cookieParser from "cookie-parser";
import { AsgardeoExpressClient } from "@asgardeo/express";

const app = express();

app.use(cookieParser());

AsgardeoExpressClient.getInstance({
  appURL: "http://localhost:3000",
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  clientId: "<your-app-client-id>",
  clientSecret: "<your-app-client-secret>"
});

// Adds the /login and /logout routes.
app.use(
  AsgardeoExpressClient.asgardeoExpressAuth(
    (res, tokenResponse) => {
      res.redirect("/profile");
    },
    (res) => {
      res.redirect("/");
    },
    (res, error) => {
      res.status(500).send(error.message);
    }
  )
);

// Only lets signed-in users through.
const requireAuth = AsgardeoExpressClient.protectRoute((res, reason) => {
  res.redirect("/login");

  return true;
});

app.get("/", (req, res) => {
  res.send(`<a href="/login">Sign in</a>`);
});

app.get("/profile", requireAuth, async (req, res) => {
  const user = await req.asgardeoAuth.getUser(req.cookies.ASGARDEO_SESSION_ID);

  res.send(`Hello ${user.username}. <a href="/logout">Sign out</a>`);
});

app.listen(3000);
```

The sign-in route is also the redirect URL that {{product_name}} sends the authorization code to, and the sign-out route is where {{product_name}} sends the user after sign-out. Both must be authorized redirect URLs of the application.

## APIs

The SDK provides the following APIs.

### AsgardeoExpressClient

`AsgardeoExpressClient` is the entry point of the SDK. Create the client with `AsgardeoExpressClient.getInstance()`, add its middleware to your app, and use it to read tokens and user information.

- **[`AsgardeoExpressClient`]({{base_path}}/sdks/express/apis/asgardeo-express-client/)** – Methods for authentication, tokens and user information.
- **[Configuration]({{base_path}}/sdks/express/apis/configuration/)** – The options that `getInstance()` accepts.
- **[Session cookie]({{base_path}}/sdks/express/apis/session-cookie/)** – The cookie the SDK sets and how to change its options.

### Middleware

- **[`asgardeoExpressAuth()`]({{base_path}}/sdks/express/apis/asgardeo-express-auth/)** – Adds the sign-in and sign-out routes.
- **[`protectRoute()`]({{base_path}}/sdks/express/apis/protect-route/)** – Lets only signed-in users reach a route.

## Guides

- **[Protecting routes]({{base_path}}/sdks/express/guides/protecting-routes/)** – Make routes available only to signed-in users.
- **[Accessing protected APIs]({{base_path}}/sdks/express/guides/accessing-protected-apis/)** – Get the user's access token and call APIs with it.

## Logging

The SDK writes debug logs to the console when the `LOG_LEVEL` environment variable is set to `DEBUG`, `INFO`, `WARN` or `ERROR`. Logging is off by default.

```bash
LOG_LEVEL=DEBUG node app.js
```
