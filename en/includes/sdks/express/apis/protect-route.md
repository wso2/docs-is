`protectRoute()` returns Express middleware that lets only signed-in users reach a route. It is a static method of `AsgardeoExpressClient`.

```typescript
static protectRoute(
  callback: (res: express.Response, error: string) => boolean
): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>
```

Call it after `AsgardeoExpressClient.getInstance(config)`, or it throws an error.

```javascript
import { AsgardeoExpressClient } from "@asgardeo/express";

const requireAuth = AsgardeoExpressClient.protectRoute((res, reason) => {
  res.redirect("/login");

  return true;
});

app.get("/profile", requireAuth, (req, res) => {
  res.send("Only signed-in users see this.");
});
```

## How it works

For each request, the middleware reads the `ASGARDEO_SESSION_ID` cookie from `req.cookies`:

- If the session has an access token that has not expired, it calls `next()` and the request continues to your route.
- Otherwise, it calls `callback` with the response and the reason the request was rejected.

| Reason | When |
|--------|------|
| `"Unauthenticated"` | The request has no `ASGARDEO_SESSION_ID` cookie. |
| `"Invalid session cookie"` | The request has the cookie, but the session is not signed in, for example because the access token expired. |

## The callback

```typescript
(res: express.Response, error: string) => boolean
```

The callback decides what happens to a request from a user who is not signed in. Respond to the request in the callback, for example by redirecting to the sign-in route or sending a `401` response, and return `true` to stop the request there.

!!! note
    If the callback returns `false`, the middleware calls `next()` and the request continues to your route even though the user is not signed in. Return `true` whenever the callback has sent a response.

```javascript
const requireAuthForApi = AsgardeoExpressClient.protectRoute((res, reason) => {
  res.status(401).json({ error: reason });

  return true;
});

app.get("/api/orders", requireAuthForApi, async (req, res) => {
  // ...
});
```

See [Protecting routes]({{base_path}}/sdks/express/guides/protecting-routes/) for more examples.
