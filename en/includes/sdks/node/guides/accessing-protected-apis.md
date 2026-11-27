Once the user signs in, the SDK keeps their access token on the server. Read it with `getAccessToken()` and send it in the `Authorization` header of requests to APIs that need it. The token never has to reach the browser.

## Call an API with the access token

Pass the user's session ID, the same `userId` you used to sign them in, to `getAccessToken()`.

```javascript
import { LegacyAsgardeoNodeClient } from "@asgardeo/node";

const auth = new LegacyAsgardeoNodeClient();

// ... initialize the client and sign the user in.

async function getProfile(sessionId) {
  if (!(await auth.isSignedIn(sessionId))) {
    throw new Error("The user is not signed in.");
  }

  const accessToken = await auth.getAccessToken(sessionId);

  const response = await fetch("{{content.sdkconfig.baseUrl}}/scim2/Me", {
    headers: {
      Accept: "application/scim+json",
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.json();
}
```

!!! tip
    To call {{product_name}} APIs such as `/scim2/Me`, the access token needs the `internal_login` scope. The SDK requests it by default. If you set `scopes` yourself, include it.

## Handle expired tokens

When the access token has expired, `isSignedIn()` refreshes it with the refresh token. Enable the refresh token grant for the application in {{product_name}} so that a refresh token is issued. Check `isSignedIn()` before you read the token:

```javascript
async function getValidAccessToken(sessionId) {
  // Refreshes an expired access token. Resolves to false when the user must sign in again.
  if (!(await auth.isSignedIn(sessionId))) {
    throw new Error("The user must sign in again.");
  }

  return auth.getAccessToken(sessionId);
}
```

## Exchange the token

To get a token for another audience or organization, send a token exchange or other grant to the token endpoint with `exchangeToken()`. See [`exchangeToken()`]({{base_path}}/sdks/node/apis/legacy-asgardeo-node-client/#exchangetoken).
