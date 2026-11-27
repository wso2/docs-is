Pass these options to `LegacyAsgardeoNodeClient.initialize()`.

```javascript
import { LegacyAsgardeoNodeClient } from "@asgardeo/node";

const auth = new LegacyAsgardeoNodeClient();

await auth.initialize({
  afterSignInUrl: "http://localhost:3000/callback",
  afterSignOutUrl: "http://localhost:3000",
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  clientId: "<your-app-client-id>",
  clientSecret: "<your-app-client-secret>"
});
```

## Required options

| Option | Type | Description |
|--------|------|-------------|
| `baseUrl` | `string` | The base URL of your {{product_name}} organization, for example `{{content.sdkconfig.baseUrl}}`. The SDK builds the OpenID Connect endpoints from it. You can leave it out if you set `wellKnownEndpoint` or `endpoints` instead. |
| `clientId` | `string` | The client ID of the application you registered in {{product_name}}. |
| `clientSecret` | `string` | The client secret of the application. Server-side apps are registered as traditional web applications, which authenticate to the token endpoint with the client secret. |
| `afterSignInUrl` | `string` | The redirect URL. {{product_name}} sends the user here with the authorization code after sign-in. It must match an authorized redirect URL of the application. |

## Optional options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `afterSignOutUrl` | `string` | — | Where {{product_name}} redirects the user after sign-out. When it is not set, the SDK uses `afterSignInUrl`. It must match an authorized redirect URL of the application. |
| `scopes` | `string` \| `string[]` | `["openid", "profile", "internal_login"]` | The scopes to request. When you set scopes, the SDK requests only those. |
| `enablePKCE` | `boolean` | `true` | Use PKCE in the authorization code flow. |
| `prompt` | `string` | — | The OpenID Connect `prompt` parameter, for example `login` to always show the login page. |
| `responseMode` | `"query"` \| `"form_post"` | `"query"` | How {{product_name}} returns the authorization code. With `form_post`, read `code`, `session_state` and `state` from the request body instead of the query string. |
| `tokenRequest.authMethod` | `string` | `"client_secret_post"` | How the app authenticates to the token endpoint with its client secret: `client_secret_post` sends it in the request body and `client_secret_basic` sends it in the `Authorization` header. |
| `sendIdTokenInLogoutRequest` | `boolean` | — | Send the ID token as `id_token_hint` in the sign-out request. Otherwise, the SDK sends `client_id`. |
| `sendCookiesInRequests` | `boolean` | `true` | Send cookies in requests to {{product_name}}. |
| `tokenValidation.idToken.validate` | `boolean` | `true` | Validate the ID token. |
| `tokenValidation.idToken.validateIssuer` | `boolean` | `true` | Validate the issuer of the ID token. |
| `tokenValidation.idToken.clockTolerance` | `number` | `300` | Allowed clock skew, in seconds, when validating the ID token. |
| `endpoints` | `object` | — | Override individual OpenID Connect endpoints, such as `authorizationEndpoint`, `tokenEndpoint` and `endSessionEndpoint`, instead of the ones built from `baseUrl`. |
| `wellKnownEndpoint` | `string` | — | An OpenID Connect discovery endpoint to read the endpoints from, instead of building them from `baseUrl`. |
