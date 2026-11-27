Use `AsgardeoExpressClient.protectRoute()` to make routes available only to signed-in users. It returns Express middleware that checks the user's session and calls a callback of yours when the user is not signed in.

Before you start, set up the SDK as shown in the [overview]({{base_path}}/sdks/express/overview/): add a cookie parser, create the client with `getInstance()`, and add the router from `asgardeoExpressAuth()`.

## Protect a page

Create the middleware once and add it to each route you want to protect. Redirect users who are not signed in to the sign-in route, and return `true` so that the request stops there.

```javascript
import { AsgardeoExpressClient } from "@asgardeo/express";

const requireAuth = AsgardeoExpressClient.protectRoute((res, reason) => {
  res.redirect("/login");

  return true;
});

app.get("/dashboard", requireAuth, async (req, res) => {
  const user = await req.asgardeoAuth.getUser(req.cookies.ASGARDEO_SESSION_ID);

  res.send(`Welcome, ${user.username}.`);
});
```

Now open `http://localhost:3000/dashboard` without signing in. The app sends you to {{product_name}} to sign in. After you sign in, the `onSignIn` callback of `asgardeoExpressAuth()` decides where you land.

!!! note
    Return `true` from the callback whenever it sends a response. If it returns `false`, the middleware lets the request through to the route even though the user is not signed in.

## Protect an API

For routes that your frontend calls with `fetch`, send a `401` response instead of a redirect.

```javascript
const requireAuthForApi = AsgardeoExpressClient.protectRoute((res, reason) => {
  res.status(401).json({ error: reason });

  return true;
});

app.get("/api/me", requireAuthForApi, async (req, res) => {
  res.json(await req.asgardeoAuth.getUser(req.cookies.ASGARDEO_SESSION_ID));
});
```

`reason` is `"Unauthenticated"` when the request has no session cookie and `"Invalid session cookie"` when it has one but the session is not signed in, for example because the access token expired and couldn't be refreshed.

## Protect a group of routes

Add the middleware to an Express router to protect every route in it.

```javascript
import express from "express";

const account = express.Router();

account.use(requireAuth);

account.get("/", (req, res) => {
  res.send("Account home");
});

account.get("/settings", (req, res) => {
  res.send("Account settings");
});

app.use("/account", account);
```

Don't add the middleware in front of the sign-in and sign-out routes. Users who are not signed in need to reach them.
