The {{product_name}} Express SDK keeps track of each user's session with a cookie named `ASGARDEO_SESSION_ID`. The cookie holds a random session ID. The user's tokens stay on the server, in the SDK's store, keyed by that ID.

## How the SDK uses the cookie

- The sign-in route sets the cookie just before it redirects the user to {{product_name}}. If the request already has the cookie, the SDK keeps its value. Otherwise, it creates a new session ID.
- The sign-in route, the sign-out route and `protectRoute()` read the cookie from `req.cookies`. Express does not parse cookies on its own, so add a cookie parser such as `cookie-parser` before the SDK's middleware:

    ```javascript
    import cookieParser from "cookie-parser";

    app.use(cookieParser());
    ```

- The sign-out route clears the cookie before it redirects the user to {{product_name}}.

To read the user's information or tokens in your routes, pass the cookie's value to the client:

```javascript
const accessToken = await req.asgardeoAuth.getAccessToken(req.cookies.ASGARDEO_SESSION_ID);
```

## Cookie options

Set the cookie's options with `cookieConfig` when you create the client. The SDK passes them to Express's `res.cookie()`.

```javascript
AsgardeoExpressClient.getInstance({
  appURL: "https://app.example.com",
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  clientId: "<your-app-client-id>",
  clientSecret: "<your-app-client-secret>",
  cookieConfig: {
    maxAge: 8 * 60 * 60 * 1000, // 8 hours
    secure: true
  }
});
```

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `maxAge` | `number` | `86400000` (24 hours) | How long the cookie lasts, in milliseconds. |
| `httpOnly` | `boolean` | `true` | Keep the cookie out of reach of JavaScript in the browser. |
| `sameSite` | `string` | `"lax"` | The cookie's `SameSite` attribute: `"lax"`, `"strict"` or `"none"`. |
| `secure` | `boolean` | `false` | Only send the cookie over HTTPS. |

!!! tip
    The default for `secure` is `false`, so the cookie also works on `http://localhost`. Set it to `true` when your app runs over HTTPS in production.

!!! note
    When the access token expires, `isSignedIn()` and `protectRoute()` refresh it with the refresh token, so the user stays signed in for as long as the cookie lasts. Enable the refresh token grant for the application in {{product_name}}. Without a refresh token, the user is treated as signed out once the access token expires, even if the cookie is still there.
