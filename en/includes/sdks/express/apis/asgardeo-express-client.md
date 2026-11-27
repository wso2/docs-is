`AsgardeoExpressClient` is the main API of the {{product_name}} Express SDK (`@asgardeo/express`). It is a single instance shared by your whole app. It provides the middleware that adds the sign-in and sign-out routes and protects routes, and methods to read the signed-in user's information and tokens.

```javascript
import { AsgardeoExpressClient } from "@asgardeo/express";

AsgardeoExpressClient.getInstance({
  appURL: "http://localhost:3000",
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  clientId: "<your-app-client-id>",
  clientSecret: "<your-app-client-secret>"
});
```

Most instance methods take a `userId` argument. It is the session ID that the SDK stores in the `ASGARDEO_SESSION_ID` cookie, not the user's ID in {{product_name}}. Read it from `req.cookies.ASGARDEO_SESSION_ID`.

## Instance

Use this method to get a client instance.

### getInstance()

```typescript
static getInstance(config: ExpressClientConfig, storage?: Storage): AsgardeoExpressClient
static getInstance(): AsgardeoExpressClient
```

Creates the client on the first call and returns it on every call. Call it with your configuration once, when your app starts and before you use the middleware. See [Configuration]({{base_path}}/sdks/express/apis/configuration/) for the available options.

After that, call it without arguments to get the client. Calling it without arguments before the client exists throws an error. Calling it again with a configuration returns the existing client and ignores the new configuration.

`storage` is where the SDK keeps the users' tokens and its other data. When you omit it, the SDK keeps them in memory in the current process. See [Session storage]({{base_path}}/sdks/node/apis/legacy-asgardeo-node-client/#session-storage) in the Node SDK documentation for the `Storage` interface.

In routes that come after `asgardeoExpressAuth()`, the client is also available as `req.asgardeoAuth` and `res.asgardeoAuth`.

## Middleware

These functions add {{product_name}} authentication to an Express app.

### asgardeoExpressAuth()

```typescript
static asgardeoExpressAuth(
  onSignIn: (res: express.Response, response: TokenResponse, req: express.Request) => void,
  onSignOut: (res: express.Response, req: express.Request) => void,
  onError: (res: express.Response, exception: AsgardeoAuthException, req: express.Request) => void
): express.Router
```

Returns a router that adds the sign-in and sign-out routes. See [`asgardeoExpressAuth()`]({{base_path}}/sdks/express/apis/asgardeo-express-auth/).

### protectRoute()

```typescript
static protectRoute(
  callback: (res: express.Response, error: string) => boolean
): (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<void>
```

Returns middleware that lets only signed-in users through. See [`protectRoute()`]({{base_path}}/sdks/express/apis/protect-route/).

Both methods throw an error if you call them before `getInstance(config)`.

## Authentication

These methods sign the user in and out.

### signIn()

```typescript
signIn(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
  signInConfig?: Record<string, string | boolean>
): Promise<TokenResponse>
```

Runs the sign-in flow for a request. The sign-in route that `asgardeoExpressAuth()` adds calls it for you, so you rarely need to call it yourself.

- When the request has no `ASGARDEO_SESSION_ID` cookie, it creates a new session ID.
- When the user already has a valid session, it resolves with the stored tokens.
- When the request has no `code` and `state` query parameters, it sets the `ASGARDEO_SESSION_ID` cookie, redirects the user to {{product_name}}, and resolves with a `TokenResponse` whose fields are empty.
- When the request has `code` and `state` query parameters, it exchanges the code for tokens, stores them against the session ID, and resolves with them.
- When the request URL has an `error` query parameter, it rejects.

`signInConfig` adds parameters to the authorization request. See the `signInConfig` option in [Configuration]({{base_path}}/sdks/express/apis/configuration/).

### signOut()

```typescript
signOut(userId: string): Promise<string>
```

Returns the {{product_name}} sign-out URL for the user and removes the user's tokens from the store. The sign-out route that `asgardeoExpressAuth()` adds calls it for you.

### isSignedIn()

```typescript
isSignedIn(userId: string): Promise<boolean>
```

Resolves to `true` when the store holds an access token for the session that has not expired. When the access token has expired and there is a refresh token, it refreshes the tokens first. When the refresh isn't possible, it removes the user's tokens and resolves to `false`.

### refreshAccessToken()

```typescript
refreshAccessToken(userId: string): Promise<TokenResponse>
```

Gets new tokens with the stored refresh token and stores them. `isSignedIn()`, and so `protectRoute()`, already does this when the access token has expired. Call it only to refresh the tokens ahead of time.

## User information

These methods return information about the signed-in user.

### getUser()

```typescript
getUser(userId: string): Promise<User>
```

Returns the user's information, taken from the claims in the ID token. It includes `username` and `displayName`, along with the other claims in the token.

```javascript
app.get("/profile", requireAuth, async (req, res) => {
  const user = await req.asgardeoAuth.getUser(req.cookies.ASGARDEO_SESSION_ID);

  res.json(user);
});
```

### getDecodedIdToken()

```typescript
getDecodedIdToken(userId?: string, idToken?: string): Promise<IdToken>
```

Returns the decoded payload of an ID token: `idToken` when you pass it, otherwise the user's stored ID token.

## Tokens

These methods read and manage the user's tokens.

### getAccessToken()

```typescript
getAccessToken(userId?: string): Promise<string>
```

Returns the user's access token. See [Accessing protected APIs]({{base_path}}/sdks/express/guides/accessing-protected-apis/).

### getIdToken()

```typescript
getIdToken(userId: string): Promise<string>
```

Returns the user's raw ID token. Rejects when the user is not signed in.

### revokeAccessToken()

```typescript
revokeAccessToken(userId?: string): Promise<Response>
```

Revokes the user's access token in {{product_name}}, then removes the user's tokens from the store. Resolves with the response from the revocation endpoint.

### exchangeToken()

```typescript
exchangeToken(config: TokenExchangeRequestConfig, userId?: string): Promise<TokenResponse | Response>
```

Sends a request to the token endpoint with a grant type of your choice, for example a token exchange. See [`exchangeToken()`]({{base_path}}/sdks/node/apis/legacy-asgardeo-node-client/#exchangetoken) in the Node SDK documentation for the fields of `TokenExchangeRequestConfig`.

## Other methods

| Method | Description |
|--------|-------------|
| `getOpenIDProviderEndpoints()` | Returns the OpenID provider endpoints the client uses. |
| `reInitialize(config)` | Merges `config` into the current configuration and reloads the OpenID provider metadata. |
| `getStorageManager()` | Returns the `StorageManager` that reads and writes the SDK's data in the store. |
