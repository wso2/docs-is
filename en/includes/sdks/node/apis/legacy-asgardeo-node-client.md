`LegacyAsgardeoNodeClient` is the main API of the {{product_name}} Node SDK (`@asgardeo/node`) for apps. It runs the OpenID Connect authorization code flow on the server and keeps each user's tokens in a store, keyed by a session ID that your app generates and sends to the browser, usually in a cookie.

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

Most methods take a `userId` argument. It is the session ID that identifies the user's session in the SDK's store, not the user's ID in {{product_name}}. Use a random, hard-to-guess value such as one from `crypto.randomUUID()`, and keep it in an HTTP-only cookie.

!!! note
    The name `Legacy` reflects how the class is implemented inside the SDK. It is the class to use in apps. `AsgardeoNodeClient` is a base class for building framework SDKs. See [Framework integration APIs]({{base_path}}/sdks/node/apis/framework-integration/).

## Setup

These methods create and configure the client.

### constructor

```typescript
new LegacyAsgardeoNodeClient<T>()
```

Creates a client. The constructor takes no arguments. Call `initialize()` before any other method.

### initialize()

```typescript
initialize(config: AuthClientConfig<T>, store?: Storage): Promise<boolean>
```

Configures the client. See [Configuration]({{base_path}}/sdks/node/apis/configuration/) for the available options.

`store` is where the SDK keeps configuration, provider metadata, PKCE verifiers and each user's tokens. When you omit it, the SDK keeps them in memory in the current process. See [Session storage](#session-storage).

### reInitialize()

```typescript
reInitialize(config: Partial<AuthClientConfig<T>>): Promise<void>
```

Merges `config` into the current configuration and reloads the OpenID provider metadata.

### getConfigData()

```typescript
getConfigData(): Promise<AuthClientConfig<T>>
```

Returns the configuration the client is using, including the defaults the SDK applied.

## Authentication

These methods sign the user in and out.

### signIn()

```typescript
signIn(
  authURLCallback: (url: string) => void,
  userId: string,
  authorizationCode?: string,
  sessionState?: string,
  state?: string,
  signInConfig?: Record<string, string | boolean>
): Promise<TokenResponse>
```

Signs the user in. What it does depends on the arguments and on the session:

- **The user already has a valid session** – Resolves with the stored tokens. `authURLCallback` is not called.
- **No `authorizationCode` or `state`** – Builds the authorization URL and passes it to `authURLCallback`. Redirect the user to that URL in the callback. The promise then resolves with a `TokenResponse` whose fields are empty.
- **`authorizationCode` and `state` are present** – Exchanges the code for tokens, validates the ID token, stores the tokens against `userId`, and resolves with them.

When {{product_name}} redirects the user back to `afterSignInUrl`, read `code`, `session_state` and `state` from the query string and pass them as `authorizationCode`, `sessionState` and `state`. Use the same `userId` you used to start the flow, because the SDK stores the PKCE code verifier against it.

`signInConfig` adds parameters to the authorization request:

- `fidp` – Takes the user straight to a specific identity provider's login page.
- `forceInit` – Reloads the OpenID provider metadata before building the URL. It is not sent to {{product_name}}.
- Any other key – Added to the authorization request as a query parameter.

`signIn()` rejects when `userId` is empty, or when it needs to start the flow and `authURLCallback` is not a function.

`TokenResponse` has the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `accessToken` | `string` | The access token. |
| `idToken` | `string` | The ID token. |
| `refreshToken` | `string` | The refresh token, or an empty string when there isn't one. |
| `expiresIn` | `string` | The lifetime of the access token, in seconds. |
| `scope` | `string` | The scopes granted to the access token. |
| `tokenType` | `string` | The token type, for example `Bearer`. |
| `createdAt` | `number` | When the tokens were received, in milliseconds since the epoch. |

### getSignInUrl()

```typescript
getSignInUrl(requestConfig?: ExtendedAuthorizeRequestUrlParams, userId?: string): Promise<string>
```

Returns the authorization URL without starting the flow through `signIn()`. `requestConfig` accepts the same keys as `signInConfig`. Pass the user's session ID as `userId` so that the PKCE code verifier is stored for that session.

### signOut()

```typescript
signOut(userId: string): Promise<string>
```

Returns the {{product_name}} sign-out URL for the user and removes the user's tokens from the store. Redirect the user to the URL to end their session in {{product_name}}. {{product_name}} then redirects them to `afterSignOutUrl` with `state=sign_out_success` in the query string.

### isSignOutSuccessful()

```typescript
static isSignOutSuccessful(afterSignOutUrl: string): boolean
```

Returns `true` when the given URL, usually the URL of the request to your `afterSignOutUrl`, carries `state=sign_out_success` and no `error` parameter.

### didSignOutFail()

```typescript
static didSignOutFail(afterSignOutUrl: string): boolean
```

Returns `true` when the given URL carries `state=sign_out_success` together with an `error` parameter.

### isSignedIn()

```typescript
isSignedIn(userId: string): Promise<boolean>
```

Resolves to `true` when the store holds an access token for `userId` that has not expired. When the access token has expired and the store has a refresh token, `isSignedIn()` refreshes the tokens and resolves to `true`. When there is no refresh token or the refresh fails, it removes the user's tokens and resolves to `false`.

## User information

These methods return information about the signed-in user.

### getUser()

```typescript
getUser(userId: string): Promise<User>
```

Returns the user's information, taken from the claims in the ID token. It includes `username` and `displayName` (the `preferred_username` claim, or the user's given and family names), along with the other claims in the token. Claims with empty values are left out.

### getDecodedIdToken()

```typescript
getDecodedIdToken(userId?: string, idToken?: string): Promise<IdToken>
```

Returns the decoded payload of an ID token: `idToken` when you pass it, otherwise the stored ID token of `userId`.

### decodeJwtToken()

```typescript
decodeJwtToken<K = Record<string, unknown>>(token: string): Promise<K>
```

Decodes the payload of any JWT, without validating it.

## Tokens

These methods read and manage the user's tokens.

### getAccessToken()

```typescript
getAccessToken(userId?: string): Promise<string>
```

Returns the user's access token from the store. See [Accessing protected APIs]({{base_path}}/sdks/node/guides/accessing-protected-apis/).

### getIdToken()

```typescript
getIdToken(userId: string): Promise<string>
```

Returns the user's raw ID token. Rejects when the user is not signed in.

### refreshAccessToken()

```typescript
refreshAccessToken(userId?: string): Promise<TokenResponse>
```

Gets new tokens with the stored refresh token and stores them. Rejects when there is no refresh token, for example when the application does not have the refresh token grant enabled in {{product_name}}.

`isSignedIn()` already refreshes an expired access token. Call `refreshAccessToken()` only to refresh the tokens ahead of time.

### revokeAccessToken()

```typescript
revokeAccessToken(userId?: string): Promise<Response>
```

Revokes the user's access token in {{product_name}}, then removes the user's tokens from the store. Resolves with the response from the revocation endpoint.

### exchangeToken()

```typescript
exchangeToken(config: TokenExchangeRequestConfig, userId?: string): Promise<TokenResponse | Response>
```

Sends a request to the token endpoint with a grant type of your choice, for example a token exchange. `TokenExchangeRequestConfig` has the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `id` | `string` | A name for the request. |
| `data` | `object` | The body of the request. Each key and value is sent as a form parameter. |
| `attachToken` | `boolean` | Sends the user's access token in the `Authorization` header. |
| `returnsSession` | `boolean` | When `true`, the SDK treats the response as new tokens for the user, stores them, and resolves with a `TokenResponse`. When `false`, it resolves with the parsed response body. |
| `signInRequired` | `boolean` | Required by the type. The Node SDK does not use it. |
| `tokenEndpoint` | `string` | Optional. Sends the request to this URL instead of the token endpoint from the OpenID provider metadata. |

## Session storage

By default, the SDK keeps its data in memory in the Node.js process. Sessions are lost when the process restarts and are not shared between instances of your app. To keep sessions in a shared store, such as Redis or a database, pass an object that implements the `Storage` interface to `initialize()`:

```typescript
interface Storage {
  getData(key: string): Promise<string>;
  setData(key: string, value: string): Promise<void>;
  removeData(key: string): Promise<void>;
}
```

```javascript
const store = {
  async getData(key) {
    return (await redis.get(key)) ?? "{}";
  },
  async setData(key, value) {
    await redis.set(key, value);
  },
  async removeData(key) {
    await redis.del(key);
  }
};

await auth.initialize(config, store);
```

Values are JSON strings. When a key does not exist, `getData()` should resolve with `"{}"`, as the default store does.

### getStorageManager()

```typescript
getStorageManager(): Promise<StorageManager<T>>
```

Returns the `StorageManager` that reads and writes the SDK's data in the store. Use it for tasks the client does not cover, such as reading the raw session data with `getSessionData(userId)`.

## Other methods

| Method | Description |
|--------|-------------|
| `getOpenIDProviderEndpoints()` | Returns the OpenID provider endpoints the client uses. |
