`asgardeoExpressAuth()` returns an Express router that adds the sign-in and sign-out routes to your app. It is a static method of `AsgardeoExpressClient`.

```typescript
static asgardeoExpressAuth(
  onSignIn: (res: express.Response, response: TokenResponse, req: express.Request) => void,
  onSignOut: (res: express.Response, req: express.Request) => void,
  onError: (res: express.Response, exception: AsgardeoAuthException, req: express.Request) => void
): express.Router
```

Call it after `AsgardeoExpressClient.getInstance(config)`, or it throws an error. Add a cookie parser before it, because the routes read the session cookie from `req.cookies`.

```javascript
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
```

## Routes

The router adds two `GET` routes. Change their paths with the `loginPath` and `logoutPath` options.

| Route | Default path | What it does |
|-------|--------------|--------------|
| Sign-in | `/login` | Starts the sign-in flow and handles the redirect back from {{product_name}}. |
| Sign-out | `/logout` | Starts the sign-out flow and handles the redirect back from {{product_name}}. |

### Sign-in route

The sign-in route is also the redirect URL of the application, so it handles both steps of sign-in:

1. When the user opens it, the SDK sets the `ASGARDEO_SESSION_ID` cookie and redirects them to {{product_name}}. If the user already has a valid session, the SDK calls `onSignIn` instead.
2. When {{product_name}} redirects the user back with `code` and `state` query parameters, the SDK exchanges the code for tokens, stores them against the session ID, and calls `onSignIn`.

If {{product_name}} redirects back with an `error` query parameter, for example because the user cancelled sign-in, or if getting the tokens fails, the SDK calls `onError`.

### Sign-out route

1. When the user opens it, the SDK gets the {{product_name}} sign-out URL for the session, clears the `ASGARDEO_SESSION_ID` cookie, and redirects the user to {{product_name}}. If the request has no `ASGARDEO_SESSION_ID` cookie, the SDK calls `onError` instead.
2. When {{product_name}} redirects the user back with `state=sign_out_success`, the SDK calls `onSignOut`.

The sign-out route also removes the user's tokens from the SDK's store.

## Callbacks

Each callback receives the Express response, and the request as its last argument. Use the response to finish the request, for example with `res.redirect()` or `res.send()`. If a callback doesn't send a response, the request is left hanging.

| Callback | Signature | Called when |
|----------|-----------|-------------|
| `onSignIn` | `(res: express.Response, response: TokenResponse, req: express.Request) => void` | The user is signed in. `response` holds the tokens. See [`TokenResponse`]({{base_path}}/sdks/node/apis/legacy-asgardeo-node-client/#signin). |
| `onSignOut` | `(res: express.Response, req: express.Request) => void` | {{product_name}} redirects the user back to the sign-out route after sign-out. |
| `onError` | `(res: express.Response, exception: AsgardeoAuthException, req: express.Request) => void` | Sign-in or sign-out fails. `exception` has `code`, `name` and `message` fields. |

## The client on the request

The router also adds the client to every request that passes through it, as `req.asgardeoAuth` and `res.asgardeoAuth`. Use it in routes that come after the router:

```javascript
app.get("/profile", async (req, res) => {
  const user = await req.asgardeoAuth.getUser(req.cookies.ASGARDEO_SESSION_ID);

  res.json(user);
});
```
