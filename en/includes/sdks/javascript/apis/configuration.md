Pass these options to [`AsgardeoAuthClient.initialize()`]({{base_path}}/sdks/javascript/apis/asgardeo-auth-client/#initialize). The configuration type is `AuthClientConfig<T>`, where `T` holds any extra fields your integration adds. The framework and platform SDKs map their own configuration onto these options.

```typescript
await auth.initialize(
  {
    afterSignInUrl: "http://localhost:3000/callback",
    afterSignOutUrl: "http://localhost:3000",
    clientId: "<your-app-client-id>",
    baseUrl: "{{content.sdkconfig.baseUrl}}"
  },
  store,
  cryptoUtils
);
```

## Required options

| Option | Type | Description |
|--------|------|-------------|
| `afterSignInUrl` | `string` | Where {{product_name}} redirects the user after sign-in. It must match an authorized redirect URL of the application. Sent as `redirect_uri`. |
| `clientId` | `string` | The client ID of the application you registered in {{product_name}}. |

You also need one of `baseUrl`, `wellKnownEndpoint` or a complete `endpoints` object, so the client can find the {{product_name}} endpoints. See [How endpoints are resolved](#how-endpoints-are-resolved).

## Endpoint options

| Option | Type | Description |
|--------|------|-------------|
| `baseUrl` | `string` | The base URL of your {{product_name}} organization, for example `{{content.sdkconfig.baseUrl}}`. |
| `wellKnownEndpoint` | `string` | The URL of the OpenID Connect discovery document. When set, the client reads the endpoints from it. |
| `endpoints` | `object` | Endpoint URLs that override the resolved ones. |

### How endpoints are resolved

The client resolves the endpoints once, the first time it needs one, and saves them to the store:

1. If `wellKnownEndpoint` is set, the client fetches the discovery document from it.
2. Otherwise, if `baseUrl` is set, the client builds the endpoints from it without a network call:

    | Endpoint | URL |
    |----------|-----|
    | Authorization | `<baseUrl>/oauth2/authorize` |
    | Token | `<baseUrl>/oauth2/token` |
    | Issuer | `<baseUrl>/oauth2/token` |
    | JWKS | `<baseUrl>/oauth2/jwks` |
    | User info | `<baseUrl>/oauth2/userinfo` |
    | Revocation | `<baseUrl>/oauth2/revoke` |
    | End session | `<baseUrl>/oidc/logout` |
    | Check session iframe | `<baseUrl>/oidc/checksession` |

3. Otherwise, the client uses the `endpoints` option, which must then contain all eight endpoints.

In every case, the values in `endpoints` take precedence. Use the short key names, or the OpenID Connect discovery field names in camel case (the client converts those to snake case):

| Key | Camel case discovery name | Discovery field |
|-----|---------------------------|-----------------|
| `authorization` | `authorizationEndpoint` | `authorization_endpoint` |
| `token` | `tokenEndpoint` | `token_endpoint` |
| `endSession` | `endSessionEndpoint` | `end_session_endpoint` |
| `jwks` | `jwksUri` | `jwks_uri` |
| `revocation` | `revocationEndpoint` | `revocation_endpoint` |
| `userInfo` | `userinfoEndpoint` | `userinfo_endpoint` |
| `introspection` | `introspectionEndpoint` | `introspection_endpoint` |
| `checkSession` | `checkSessionIframe` | `check_session_iframe` |
| `issuer` | `issuer` | `issuer` |

## Optional options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `afterSignOutUrl` | `string` | — | Where {{product_name}} redirects the user after sign-out. When not set, the client uses `afterSignInUrl`. It must match an authorized redirect URL of the application. |
| `clientSecret` | `string` | — | The client secret, for confidential clients such as server-side apps. The client sends it in token, refresh and revocation requests. Don't use it in public clients such as browser apps. |
| `scopes` | `string` \| `string[]` | `"openid profile internal_login"` | The scopes to request, as an array or a space-separated string. The default applies only when no scopes are set; scopes you set are sent as they are. |
| `enablePKCE` | `boolean` | `true` | Use PKCE (`S256`) in the authorization code flow. |
| `responseMode` | `"query"` \| `"form_post"` \| `"direct"` | `"query"` | How {{product_name}} returns the authorization code. Sent as `response_mode`. |
| `prompt` | `string` | — | The OpenID Connect `prompt` parameter, for example `login` to always show the login page. |
| `sendCookiesInRequests` | `boolean` | `true` | Send cookies with the token, refresh, revocation, custom grant and JWKS requests (`credentials: "include"`). When `false`, the client uses `credentials: "same-origin"`. |
| `sendIdTokenInLogoutRequest` | `boolean` | — | Send the ID token as `id_token_hint` in the sign-out URL. When not set, the sign-out URL carries `client_id` instead. |
| `tokenRequest.authMethod` | `"client_secret_basic"` \| `"client_secret_post"` \| `"none"` | — | How the client authenticates at the token endpoint during the code exchange when `clientSecret` is set. When not set, the client uses `client_secret_basic` if `platform` is `AsgardeoV2`, and `client_secret_post` otherwise. With `none`, no secret is sent. |
| `tokenValidation.idToken.validate` | `boolean` | `true` | Validate the ID token's signature and claims after each token request. |
| `tokenValidation.idToken.validateIssuer` | `boolean` | `true` | Check the ID token's `iss` claim against the issuer. |
| `tokenValidation.idToken.clockTolerance` | `number` | `300` | Allowed clock skew, in seconds, when validating the ID token. |
| `applicationId` | `string` | — | The UUID of the application in {{product_name}}. The client saves it to the store, and keeps using the saved value when a later `initialize()` call leaves it out. |
| `platform` | `Platform` | — | The platform the client connects to: `Platform.Asgardeo`, `Platform.IdentityServer`, `Platform.AsgardeoV2` or `Platform.Unknown`. |
| `organizationChain.sourceInstanceId` | `number` | — | The instance ID of another client whose access token the `exchangeToken()` placeholders read. Used to exchange a token from one organization for a token in another. |
| `organizationChain.targetOrganizationId` | `string` | — | The organization to exchange the token for. Read by framework SDKs together with `sourceInstanceId`. |

The `tokenValidation` options are merged with their defaults, so you can set only the ones you want to change. For example, `tokenValidation: { idToken: { clockTolerance: 60 } }` keeps validation on.
