`AsgardeoJavaScriptClient` is the base class for the clients of the platform SDKs: the Browser SDK's and Node.js SDK's clients extend it. It wraps an [`AsgardeoAuthClient`]({{base_path}}/sdks/javascript/apis/asgardeo-auth-client/), defines the methods every {{product_name}} client exposes (the `AsgardeoClient` interface), and implements agent and organization token flows that work the same on every platform.

!!! note
    Apps should use a framework or platform SDK, which provides a complete client. See the [overview]({{base_path}}/sdks/javascript/overview/).

```typescript
import { AsgardeoJavaScriptClient } from "@asgardeo/javascript";

class MyPlatformClient extends AsgardeoJavaScriptClient {
  // Implement initialize(), signIn(), signOut(), getUser() and the
  // other AsgardeoClient methods for your platform.
}
```

## constructor()

```typescript
new AsgardeoJavaScriptClient<T = Config>(
  config?: AuthClientConfig<T>,
  cacheStore?: Storage,
  cryptoUtils?: Crypto
)
```

When `config` is given, the constructor creates an `AsgardeoAuthClient` and starts its `initialize()` with `cacheStore` and `cryptoUtils`. The methods on this page wait for that to finish.

- `cacheStore` – A [`Storage`]({{base_path}}/sdks/javascript/apis/storage/) implementation. Defaults to an in-memory store.
- `cryptoUtils` – A [`Crypto`]({{base_path}}/sdks/javascript/apis/crypto/) implementation. Defaults to one built on the Web Crypto API and the `jose` library.

## Methods for subclasses to implement

`AsgardeoJavaScriptClient` declares these `AsgardeoClient` methods, and each one throws `Method not implemented.` until a subclass overrides it:

| Method | Purpose |
|--------|---------|
| `initialize(config, storage?)` / `reInitialize(config)` | Set up or update the client. |
| `signIn()`, `signInSilently()`, `signOut()`, `signUp()`, `recover()` | Authentication, registration and account recovery flows. |
| `isSignedIn()`, `isLoading()` | Authentication state. |
| `getUser()`, `getUserProfile()`, `updateUserProfile()` | User information. |
| `getAccessToken()`, `exchangeToken()`, `decodeJwtToken()` | Tokens. |
| `getAllOrganizations()`, `getMyOrganizations()`, `getCurrentOrganization()`, `switchOrganization()` | Organizations. |
| `getConfiguration()`, `setSession()`, `clearSession()` | Configuration and session data. |

## Implemented methods

The class implements the following methods itself.

### getDiscoveryResponse()

```typescript
getDiscoveryResponse(): Promise<OIDCDiscoveryApiResponse | null>
```

Returns the OpenID provider metadata saved in the store, or `null` when the client was created without a configuration.

### getAgentToken()

```typescript
getAgentToken(agentConfig: AgentConfig): Promise<TokenResponse>
```

Signs in as an AI agent and returns its tokens. The client starts an app-native authentication flow, signs in with the agent's credentials through the authenticator named in `agentConfig`, and exchanges the resulting code for tokens.

`AgentConfig` has:

- `agentID` – The agent's ID. Required.
- `agentSecret` – The agent's secret. Required by this method.
- `authenticatorName` – The authenticator to use. Defaults to `Username & Password`.

### getOBOSignInURL()

```typescript
getOBOSignInURL(agentConfig: AgentConfig): Promise<string>
```

Returns a sign-in URL with `requested_actor=<agentID>`, so the user can authorize the agent to act on their behalf.

### getOBOToken()

```typescript
getOBOToken(agentConfig: AgentConfig, authCodeResponse: AuthCodeResponse): Promise<TokenResponse>
```

Completes the on-behalf-of flow. It gets an agent token with `getAgentToken()`, then exchanges the user's authorization code (`code`, `session_state` and `state` from `authCodeResponse`) with the agent token as `actor_token`.

### getOrgAuthorizationUrl()

```typescript
getOrgAuthorizationUrl(
  orgDiscoveryType: "orgID" | "orgHandle" | "org" | "emailDomain",
  discoveryInput: string,
  options?: OrgAuthorizationUrlOptions
): Promise<string>
```

Returns a sign-in URL that takes the user to a specific child organization, identified by its ID, handle, name, or the domain of an email address.

| Option | Description |
|--------|-------------|
| `isEnhancedOrgAuth` | When `true`, leaves out `fidp=OrganizationSSO`. Defaults to `false`. |
| `resource` | Added as the `resource` parameter. |
| `agentConfig` | Adds `requested_actor=<agentID>`. |
| `additionalParams` | Extra query parameters. Parameters the SDK manages, such as `client_id`, `redirect_uri`, `scope`, `state` and `code_challenge`, can't be overridden. |

### switchTokenToOrganization()

```typescript
switchTokenToOrganization(
  token: string,
  switchingOrganization: string,
  scopes?: string[]
): Promise<TokenResponse>
```

Exchanges `token` for a token of the organization `switchingOrganization` with the `organization_switch` grant. It doesn't use or change the stored session, so it works without a signed-in user.

### getOrganizationAgentToken()

```typescript
getOrganizationAgentToken(
  agentConfig: AgentConfig,
  switchingOrganization: string,
  orgScopes?: string[]
): Promise<TokenResponse>
```

Gets an agent token with `getAgentToken()` and switches it to the organization `switchingOrganization`.
