Once the user signs in, the SDK keeps their access token on the server. Read it with `getAccessToken()` and send it in the `Authorization` header of requests to APIs that need it. The token never has to reach the browser.

## Call an API with the access token

Pass the session ID from the `ASGARDEO_SESSION_ID` cookie to `getAccessToken()`. Protect the route with `protectRoute()` so that it only runs for signed-in users.

```javascript
import { AsgardeoExpressClient } from "@asgardeo/express";

const requireAuth = AsgardeoExpressClient.protectRoute((res, reason) => {
  res.redirect("/login");

  return true;
});

app.get("/profile", requireAuth, async (req, res) => {
  const accessToken = await req.asgardeoAuth.getAccessToken(req.cookies.ASGARDEO_SESSION_ID);

  const response = await fetch("{{content.sdkconfig.baseUrl}}/scim2/Me", {
    headers: {
      Accept: "application/scim+json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  res.json(await response.json());
});
```

!!! tip
    To call {{product_name}} APIs such as `/scim2/Me`, the access token needs the `internal_login` scope. The SDK requests it by default. If you set `scopes` yourself, include it.

## When the access token expires

When the access token expires, `isSignedIn()` and `protectRoute()` refresh it with the refresh token, so the token you read after `protectRoute()` is valid. Enable the refresh token grant for the application in {{product_name}} so that a refresh token is issued.

When the tokens can't be refreshed, `protectRoute()` calls your callback with `"Invalid session cookie"`. Send the user through the sign-in route again. If they still have a session in {{product_name}}, they get new tokens without having to enter their credentials.

## Exchange the token

To get a token for another audience or organization, send a token exchange or other grant to the token endpoint with `exchangeToken()`. See [`exchangeToken()`]({{base_path}}/sdks/node/apis/legacy-asgardeo-node-client/#exchangetoken) in the Node SDK documentation.
