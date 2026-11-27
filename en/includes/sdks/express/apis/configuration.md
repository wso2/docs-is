Pass these options to `AsgardeoExpressClient.getInstance()`.

```javascript
import { AsgardeoExpressClient } from "@asgardeo/express";

AsgardeoExpressClient.getInstance({
  appURL: "http://localhost:3000",
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  clientId: "<your-app-client-id>",
  clientSecret: "<your-app-client-secret>"
});
```

## Required options

| Option | Type | Description |
|--------|------|-------------|
| `appURL` | `string` | The URL your app runs at, without a trailing slash, for example `http://localhost:3000`. The SDK builds the redirect URLs from it. |
| `baseUrl` | `string` | The base URL of your {{product_name}} organization, for example `{{content.sdkconfig.baseUrl}}`. The SDK builds the OpenID Connect endpoints from it. You can leave it out if you set `wellKnownEndpoint` or `endpoints` instead. |
| `clientId` | `string` | The client ID of the application you registered in {{product_name}}. |
| `clientSecret` | `string` | The client secret of the application. Express apps are registered as traditional web applications, which authenticate to the token endpoint with the client secret. |

## Optional options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `loginPath` | `string` | `"/login"` | The path of the sign-in route. {{product_name}} also redirects the user back to this path after sign-in, so `appURL` + `loginPath` must be an authorized redirect URL of the application. |
| `logoutPath` | `string` | `"/logout"` | The path of the sign-out route. {{product_name}} redirects the user back to this path after sign-out, so `appURL` + `logoutPath` must be an authorized redirect URL of the application. |
| `cookieConfig` | `object` | See [Session cookie]({{base_path}}/sdks/express/apis/session-cookie/) | Options for the `ASGARDEO_SESSION_ID` cookie: `maxAge`, `httpOnly`, `sameSite` and `secure`. |
| `signInConfig` | `object` | — | Parameters to add to the authorization request. `fidp` takes the user straight to a specific identity provider's login page, `forceInit` reloads the OpenID provider metadata, and any other key is sent as a query parameter. |
| `scopes` | `string` \| `string[]` | `["openid", "profile", "internal_login"]` | The scopes to request. When you set scopes, the SDK requests only those. |
| `enablePKCE` | `boolean` | `true` | Use PKCE in the authorization code flow. |
| `prompt` | `string` | — | The OpenID Connect `prompt` parameter, for example `login` to always show the login page. |
| `tokenRequest.authMethod` | `string` | `"client_secret_post"` | How the app authenticates to the token endpoint with its client secret: `client_secret_post` sends it in the request body and `client_secret_basic` sends it in the `Authorization` header. |
| `sendIdTokenInLogoutRequest` | `boolean` | — | Send the ID token as `id_token_hint` in the sign-out request. Otherwise, the SDK sends `client_id`. |
| `sendCookiesInRequests` | `boolean` | `true` | Send cookies in requests to {{product_name}}. |
| `tokenValidation.idToken.validate` | `boolean` | `true` | Validate the ID token. |
| `tokenValidation.idToken.validateIssuer` | `boolean` | `true` | Validate the issuer of the ID token. |
| `tokenValidation.idToken.clockTolerance` | `number` | `300` | Allowed clock skew, in seconds, when validating the ID token. |
| `endpoints` | `object` | — | Override individual OpenID Connect endpoints, such as `authorizationEndpoint`, `tokenEndpoint` and `endSessionEndpoint`, instead of the ones built from `baseUrl`. |
| `wellKnownEndpoint` | `string` | — | An OpenID Connect discovery endpoint to read the endpoints from, instead of building them from `baseUrl`. |

!!! note
    The SDK sets `afterSignInUrl` to `appURL` + `loginPath` and `afterSignOutUrl` to `appURL` + `logoutPath`, and ignores any values you pass for them. The sign-in route reads the authorization code from the query string, so keep the default response mode.
