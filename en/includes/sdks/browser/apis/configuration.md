Pass these options to `AsgardeoSPAClient.initialize()`.

```javascript
import { AsgardeoSPAClient } from "@asgardeo/browser";

const auth = AsgardeoSPAClient.getInstance();

await auth.initialize({
  afterSignInUrl: "http://localhost:5173",
  afterSignOutUrl: "http://localhost:5173",
  clientId: "<your-app-client-id>",
  baseUrl: "{{content.sdkconfig.baseUrl}}"
});
```

## Required options

| Option | Type | Description |
|--------|------|-------------|
| `baseUrl` | `string` | The base URL of your {{product_name}} organization, for example `{{content.sdkconfig.baseUrl}}`. |
| `clientId` | `string` | The client ID of the application you registered in {{product_name}}. |
| `afterSignInUrl` | `string` | Where {{product_name}} redirects the user after sign-in. It must match an authorized redirect URL of the application. |

## Optional options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `afterSignOutUrl` | `string` | — | Where {{product_name}} redirects the user after sign-out. It must match an authorized redirect URL of the application. |
| `scopes` | `string[]` | `["openid", "profile", "internal_login"]` | The scopes to request. |
| `storage` | `"sessionStorage"` \| `"localStorage"` \| `"browserMemory"` \| `"webWorker"` | `"sessionStorage"` | Where the session is stored. With `webWorker`, tokens stay inside a web worker and are not readable by your app's code; call APIs with `httpRequest()`. |
| `enablePKCE` | `boolean` | `true` | Use PKCE in the authorization code flow. |
| `responseMode` | `"query"` \| `"form_post"` | `"query"` | How {{product_name}} returns the authorization code. |
| `prompt` | `string` | — | The OpenID Connect `prompt` parameter, for example `login` to always show the login page. |
| `allowedExternalUrls` | `string[]` | — | URLs other than `baseUrl` that `httpRequest()` may send the access token to. Applies when `storage` is `webWorker`. |
| `periodicTokenRefresh` | `boolean` | `false` | Refresh the access token before it expires. |
| `autoLogoutOnTokenRefreshError` | `boolean` | `false` | Sign the user out when refreshing the access token fails. |
| `syncSession` | `boolean` | `false` | Keep the app's session in sync with {{product_name}} using OpenID Connect session management. |
| `checkSessionInterval` | `number` | `3` | How often, in seconds, to check the session when `syncSession` is enabled. |
| `sessionRefreshInterval` | `number` | `300` | How often, in seconds, to refresh the session when `syncSession` is enabled. |
| `sendCookiesInRequests` | `boolean` | `true` | Send cookies in requests to {{product_name}}. |
| `sendIdTokenInLogoutRequest` | `boolean` | — | Send the ID token as `id_token_hint` in the sign-out request. |
| `tokenValidation.idToken.validate` | `boolean` | `true` | Validate the ID token. |
| `tokenValidation.idToken.validateIssuer` | `boolean` | `true` | Validate the issuer of the ID token. |
| `tokenValidation.idToken.clockTolerance` | `number` | `300` | Allowed clock skew, in seconds, when validating the ID token. |
| `endpoints` | `object` | — | Override individual OpenID Connect endpoints instead of using the ones from the well-known endpoint. |
| `wellKnownEndpoint` | `string` | — | A custom OpenID Connect discovery endpoint. |
