`AsgardeoAuthClient` is the core OpenID Connect client of the {{product_name}} JavaScript SDK (`@asgardeo/javascript`). It builds the authorization and sign-out URLs, exchanges the authorization code for tokens, validates the ID token, refreshes and revokes tokens, and keeps the session in a store that you provide. It doesn't redirect the user or read the callback URL; your integration does that.

!!! note
    Apps should use a framework or platform SDK, which wraps this client. See the [overview]({{base_path}}/sdks/javascript/overview/).

```typescript
import { AsgardeoAuthClient } from "@asgardeo/javascript";

const auth = new AsgardeoAuthClient();

await auth.initialize(
  {
    afterSignInUrl: "http://localhost:3000/callback",
    afterSignOutUrl: "http://localhost:3000",
    clientId: "<your-app-client-id>",
    baseUrl: "{{content.sdkconfig.baseUrl}}"
  },
  store,       // implements Storage
  cryptoUtils  // implements Crypto
);
```

The class takes a type parameter, `AsgardeoAuthClient<T>`, for extra configuration fields that your integration stores alongside the standard ones. The configuration passed to `initialize()` is typed as `AuthClientConfig<T>`.

## Setup

These methods create and configure the client.

### constructor()

```typescript
new AsgardeoAuthClient<T>()
```

Creates a client. The constructor takes no arguments; call `initialize()` before any other method.

### initialize()

```typescript
initialize(
  config: AuthClientConfig<T>,
  store: Storage,
  inputCryptoUtils: Crypto,
  instanceID?: number
): Promise<void>
```

Configures the client and saves the configuration to the store, merged over the defaults (see [Configuration]({{base_path}}/sdks/javascript/apis/configuration/)).

| Parameter | Description |
|-----------|-------------|
| `config` | The client configuration. |
| `store` | An object that implements [`Storage`]({{base_path}}/sdks/javascript/apis/storage/). The client keeps all of its data in it. |
| `inputCryptoUtils` | An object that implements [`Crypto`]({{base_path}}/sdks/javascript/apis/crypto/). |
| `instanceID` | The ID of this client instance. The client prefixes its storage keys with `instance_<instanceID>-<clientId>` (or `instance_<instanceID>` without a client ID), so several clients can share one store. When omitted, the first `initialize()` call on an object uses `0` and later calls on the same object add one. |

`initialize()` doesn't contact {{product_name}}. The client loads the OpenID provider metadata the first time it needs an endpoint, or when you call `loadOpenIDProviderConfiguration()`.

### reInitialize()

```typescript
reInitialize(config: Partial<AuthClientConfig<T>>): Promise<void>
```

Merges `config` into the stored configuration and reloads the OpenID provider metadata.

### loadOpenIDProviderConfiguration()

```typescript
loadOpenIDProviderConfiguration(forceInit: boolean): Promise<void>
```

Resolves the OpenID Connect endpoints and saves them to the store. It returns immediately if the endpoints are already loaded, unless `forceInit` is `true`. See [How endpoints are resolved]({{base_path}}/sdks/javascript/apis/configuration/#how-endpoints-are-resolved).

### getOpenIDProviderEndpoints()

```typescript
getOpenIDProviderEndpoints(): Promise<Partial<OIDCEndpoints>>
```

Returns the loaded endpoints: `authorizationEndpoint`, `checkSessionIframe`, `endSessionEndpoint`, `introspectionEndpoint`, `issuer`, `jwksUri`, `registrationEndpoint`, `revocationEndpoint`, `tokenEndpoint` and `userinfoEndpoint`. Endpoints that weren't resolved are empty strings.

## Sign-in

A sign-in with the authorization code flow takes two calls: `getSignInUrl()` before the redirect, and `requestAccessToken()` after {{product_name}} redirects back to `afterSignInUrl`.

```typescript
// 1. Send the user to {{product_name}}.
const signInUrl = await auth.getSignInUrl();

// 2. On the callback, exchange the code for tokens.
const params = new URL(callbackUrl).searchParams;

const tokens = await auth.requestAccessToken(
  params.get("code"),
  params.get("session_state"),
  params.get("state")
);
```

### getSignInUrl()

```typescript
getSignInUrl(
  requestConfig?: ExtendedAuthorizeRequestUrlParams,
  userId?: string
): Promise<string>
```

Returns the authorization URL to redirect the user to. The URL carries `response_type=code`, `client_id`, `scope`, `redirect_uri` (`afterSignInUrl`), `response_mode`, `prompt` (when configured) and a `state` value. When `enablePKCE` is on, the client creates a code verifier, saves it to the store and adds `code_challenge` with `code_challenge_method=S256`.

`requestConfig` accepts:

- `fidp` – Takes the user straight to a specific identity provider.
- `forceInit` – Reloads the OpenID provider metadata before building the URL.
- Any other key – Added to the URL as a query parameter.

`userId` keeps the PKCE code verifier separate for each user. Use it when one client serves many users, for example on a server.

### requestAccessToken()

```typescript
requestAccessToken(
  authorizationCode: string,
  sessionState: string,
  state: string,
  userId?: string,
  tokenRequestConfig?: { params: Record<string, unknown> }
): Promise<TokenResponse>
```

Exchanges the authorization code for tokens at the token endpoint and saves them to the store. Pass the `code`, `session_state` and `state` values from the callback URL; the client uses `state` to find the PKCE code verifier that `getSignInUrl()` saved.

When a client secret is configured, the client authenticates with the method set in `tokenRequest.authMethod`. When `tokenValidation.idToken.validate` is on, the client verifies the ID token against the JWKS endpoint before it saves the session. `tokenRequestConfig.params` adds extra parameters to the token request body.

The result is a `TokenResponse`: `accessToken`, `idToken`, `refreshToken`, `expiresIn`, `scope`, `tokenType` and `createdAt`.

### isSignedIn()

```typescript
isSignedIn(userId?: string): Promise<boolean>
```

Resolves to `true` when the store has an access token that hasn't expired, based on its `expires_in` value.

## Sign-out

These methods build the sign-out URL and check the result of a sign-out.

### getSignOutUrl()

```typescript
getSignOutUrl(userId?: string): Promise<string>
```

Returns the URL of the end-session endpoint to redirect the user to. It sets `post_logout_redirect_uri` to `afterSignOutUrl`, or to `afterSignInUrl` when `afterSignOutUrl` isn't set, and `state=sign_out_success`. When `sendIdTokenInLogoutRequest` is on, it adds the ID token as `id_token_hint`; otherwise it adds `client_id`.

`getSignOutUrl()` doesn't clear the session. Clear it with `clearSession()` when you're ready.

### isSignOutSuccessful()

```typescript
static isSignOutSuccessful(afterSignOutUrl: string): boolean
```

Returns `true` when the URL {{product_name}} redirected to after sign-out carries `state=sign_out_success` and no `error` parameter.

### didSignOutFail()

```typescript
static didSignOutFail(afterSignOutUrl: string): boolean
```

Returns `true` when that URL carries `state=sign_out_success` together with an `error` parameter.

### clearSession()

```typescript
clearSession(userId?: string): Promise<void>
static clearSession(userId?: string): Promise<void>
```

Removes the session data and the temporary data (such as PKCE code verifiers) from the store. Call it on the client instance. The static version acts on the most recently initialized client, so with several clients on the same page it can clear another client's session.

## Tokens

These methods read, refresh, exchange, and revoke the user's tokens.

### getAccessToken()

```typescript
getAccessToken(userId?: string): Promise<string>
```

Returns the access token from the store.

### getIdToken()

```typescript
getIdToken(userId?: string): Promise<string>
```

Returns the raw ID token from the store.

### getDecodedIdToken()

```typescript
getDecodedIdToken(userId?: string, idToken?: string): Promise<IdToken>
```

Returns the decoded payload of an ID token: `idToken` when you pass it, otherwise the stored ID token.

### decodeJwtToken()

```typescript
decodeJwtToken<U = Record<string, unknown>>(token: string): Promise<U>
```

Decodes the payload of any JWT. It doesn't verify the signature.

### refreshAccessToken()

```typescript
refreshAccessToken(userId?: string): Promise<TokenResponse>
```

Gets new tokens with the stored refresh token and saves them. It throws when there is no refresh token; {{product_name}} issues one only when the application has the refresh token grant enabled.

### revokeAccessToken()

```typescript
revokeAccessToken(userId?: string): Promise<Response>
```

Revokes the access token at the revocation endpoint, then clears the session from the store.

### exchangeToken()

```typescript
exchangeToken(
  config: TokenExchangeRequestConfig,
  userId?: string
): Promise<TokenResponse | Response>
```

Sends a request with a custom grant to the token endpoint, for example a token exchange or an organization switch. The client uses these fields of `config`:

| Field | Description |
|-------|-------------|
| `data` | The body parameters, sent as `application/x-www-form-urlencoded`. String values can use the placeholders {% raw %}`{{accessToken}}`, `{{username}}`, `{{scopes}}`, `{{clientId}}` and `{{clientSecret}}`{% endraw %}, which the client replaces with values from the session and configuration. |
| `attachToken` | When `true`, sends the access token in the `Authorization` header. |
| `returnsSession` | When `true`, handles the response like a sign-in: validates the ID token, saves the tokens and resolves to a `TokenResponse`. Otherwise resolves to the parsed response body. |
| `tokenEndpoint` | Sends the request to this URL instead of the token endpoint. |

`TokenExchangeRequestConfig` also has `id`, `signInRequired` and `shouldReplayAfterRefresh`, which framework SDKs use.

When `organizationChain.sourceInstanceId` is configured, the placeholders read the access token from that client instance's session instead of this one's.

```typescript
{% raw %}const response = await auth.exchangeToken({
  attachToken: false,
  data: {
    client_id: "{{clientId}}",
    grant_type: "organization_switch",
    scope: "{{scopes}}",
    switching_organization: "<organization-id>",
    token: "{{accessToken}}"
  },
  id: "organization-switch",
  returnsSession: true,
  signInRequired: true
});
{% endraw %}
```

## User and session

These methods return user information and manage the session.

### getUser()

```typescript
getUser(userId?: string): Promise<User>
```

Returns the user's information from the ID token claims, including `username` and `displayName` (the `preferred_username` claim, or the given and family names). Empty values are left out.

### getUserSession()

```typescript
getUserSession(userId?: string): Promise<UserSession>
```

Returns the granted `scopes` as an array and the OpenID Connect `sessionState`.

## PKCE

Use these when the PKCE code verifier has to move between processes, for example when the sign-in URL is built in one request and the callback is handled in another.

### getPKCECode()

```typescript
getPKCECode(state: string, userId?: string): Promise<string>
```

Returns the code verifier saved for the given `state` value.

### setPKCECode()

```typescript
setPKCECode(pkce: string, state: string, userId?: string): Promise<void>
```

Saves a code verifier for the given `state` value.

## Internals

| Method | Description |
|--------|-------------|
| `getStorageManager()` | Returns the `StorageManager` that reads and writes this client's data in the store. |
| `getInstanceId()` | Returns the instance ID of this client. |
| `getCrypto()` | Resolves to the `IsomorphicCrypto` helper built on your `Crypto` implementation. It creates PKCE values, decodes JWTs and validates ID tokens. |
