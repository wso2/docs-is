`AsgardeoSPAClient` is the main API of the {{product_name}} Browser SDK (`@asgardeo/browser`). It manages the authentication state of a single-page application and exposes methods to sign users in and out, read tokens and user information, and call protected APIs.

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

## Instances

Use this method to get a client instance.

### getInstance()

```typescript
static getInstance(id?: number): AsgardeoSPAClient
```

Returns the client instance for the given ID, and creates it on the first call. Most apps use the default instance (`0`). Use different IDs to keep separate authentication contexts in the same app, for example to sign in to two organizations at once.

### initialize()

```typescript
initialize(config: AuthSPAClientConfig): Promise<boolean>
```

Configures the instance. Call it once, before any other method. See [Configuration]({{base_path}}/sdks/browser/apis/configuration/) for the available options.

## Authentication

These methods sign the user in and out.

### signIn()

```typescript
signIn(
  config?: SignInConfig,
  authorizationCode?: string,
  sessionState?: string,
  state?: string
): Promise<User | undefined>
```

Starts the sign-in flow by redirecting the user to {{product_name}}. When {{product_name}} redirects back with an authorization code, call `signIn()` again to exchange the code for tokens. Pass `{ callOnlyOnRedirect: true }` to only complete a redirect and never start a new flow:

```javascript
import { hasAuthParamsInUrl } from "@asgardeo/browser";

if (hasAuthParamsInUrl()) {
  await auth.signIn({ callOnlyOnRedirect: true });
}
```

`SignInConfig` also accepts:

- `fidp` – Takes the user straight to a specific identity provider's login page.
- `forceInit` – Reloads the OpenID provider metadata from the well-known endpoint.
- Any other key – Added to the authorization request as a query parameter.

### signInSilently()

```typescript
signInSilently(additionalParams?: Record<string, string | boolean>): Promise<User | boolean | undefined>
```

Signs the user in without a redirect if they already have a session with {{product_name}}, for example from another application. It sends a `prompt=none` request in a hidden iframe and resolves to `false` when there is no session. Check the result with `isSignedIn()`.

### signOut()

```typescript
signOut(): Promise<boolean>
```

Clears the session in the app and redirects the user to {{product_name}} to end their session there. {{product_name}} then redirects to `afterSignOutUrl`.

### isSignedIn()

```typescript
isSignedIn(): Promise<boolean | undefined>
```

Resolves to `true` when the user is signed in to the app.

### isSessionActive()

```typescript
isSessionActive(): Promise<boolean | undefined>
```

Resolves to `true` when there is an active session in the browser.

## User information

These methods return information about the signed-in user.

### getUser()

```typescript
getUser(): Promise<User | undefined>
```

Returns the signed-in user's basic information, taken from the ID token, such as `username`.

### getDecodedIdToken()

```typescript
getDecodedIdToken(): Promise<IdToken | undefined>
```

Returns the decoded payload of the ID token.

## Tokens

These methods read, refresh, and revoke the user's tokens.

### getAccessToken()

```typescript
getAccessToken(): Promise<string>
```

Returns the access token. It is not available when `storage` is set to `webWorker`; use `httpRequest()` to call APIs instead.

### getIdToken()

```typescript
getIdToken(): Promise<string | undefined>
```

Returns the raw ID token.

### refreshAccessToken()

```typescript
refreshAccessToken(): Promise<User | undefined>
```

Gets a new access token using the refresh token.

### revokeAccessToken()

```typescript
revokeAccessToken(): Promise<boolean | undefined>
```

Revokes the access token and clears the session information from the app, without redirecting the user.

### exchangeToken()

```typescript
exchangeToken(config: TokenExchangeRequestConfig): Promise<Response | User | undefined>
```

Sends a request to the token endpoint with a custom grant, for example a token exchange.

## HTTP requests

These methods send HTTP requests with the user's access token attached.

### httpRequest()

```typescript
httpRequest(config: HttpRequestConfig): Promise<HttpResponse | undefined>
```

Sends a request with the user's access token in the `Authorization` header. When `storage` is `webWorker`, this is the only way to call protected APIs, because the token never leaves the worker, and the URL must start with `baseUrl` or one of `allowedExternalUrls`.

### httpRequestAll()

```typescript
httpRequestAll(config: HttpRequestConfig[]): Promise<HttpResponse[] | undefined>
```

Sends several requests in parallel, each with the user's access token.

See [Accessing protected APIs]({{base_path}}/sdks/browser/guides/accessing-protected-apis/) for examples.

## Events

These methods add and remove listeners for SDK events.

### on()

```typescript
on(hook: Hooks, callback: (response?: any) => void, id?: string): Promise<void>
```

Runs `callback` when an event happens. The available hooks are:

| Hook | Fires when |
|------|------------|
| `sign-in` | The user signs in. |
| `sign-out` | The user signs out. |
| `sign-out-failed` | Sign-out fails. |
| `initialize` | The client finishes initializing. |
| `revoke-access-token` | The access token is revoked. |
| `custom-grant` | A custom grant request completes. Pass the grant's `id` as the third argument. |
| `http-request-start` | An `httpRequest()` call starts. |
| `http-request-success` | An `httpRequest()` call succeeds. |
| `http-request-error` | An `httpRequest()` call fails. |
| `http-request-finish` | An `httpRequest()` call finishes. |

```javascript
auth.on("sign-in", (user) => {
  console.log("Signed in as", user.username);
});
```

## Other methods

| Method | Description |
|--------|-------------|
| `getOpenIDProviderEndpoints()` | Returns the OpenID provider endpoints the client uses. |
| `reInitialize(config)` | Updates the configuration of an initialized client. |
| `clearSession()` | Clears the session information from the app's storage. |
