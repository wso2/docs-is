The {{product_name}} JavaScript SDK (`@asgardeo/javascript`) exports standalone functions that call {{product_name}} REST APIs. They don't depend on `AsgardeoAuthClient` or on a session: each one takes the URL and request options, sends one request with `fetch`, and returns the parsed response.

## Common behavior

- **Base URL** – Most functions take `baseUrl`, the base URL of your organization, for example `{{content.sdkconfig.baseUrl}}`, and append the API path to it. Functions that also take `url` use it in place of the built URL when you set it.
- **Authentication** – The functions don't add an access token. Pass it in `headers`, for example `headers: { Authorization: "Bearer <access-token>" }`. Each function's configuration accepts the other [`RequestInit`](https://developer.mozilla.org/en-US/docs/Web/API/RequestInit) options too, such as `credentials` and `signal`; the function sets `method` itself.
- **Custom fetch** – Functions that take `fetcher` call `fetcher(url, requestInit)` instead of `fetch`, so you can route requests through your own HTTP client. It must return a `Response`-like object with `ok`, `status`, `statusText`, `json()` and `text()`.
- **Errors** – The functions throw `AsgardeoAPIError` for an invalid URL, a missing required field, or a response that isn't successful. `statusCode` and `statusText` hold the HTTP status. Most functions also wrap network failures in an `AsgardeoAPIError` with `statusCode` `0`.

```typescript
import { getScim2Me } from "@asgardeo/javascript";

const user = await getScim2Me({
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  headers: { Authorization: `Bearer ${accessToken}` }
});
```

## User profile

These functions read and update the signed-in user's profile.

### getScim2Me()

```typescript
getScim2Me(config: GetScim2MeConfig): Promise<User>
```

Gets the signed-in user's SCIM2 profile with `GET <baseUrl>/scim2/Me`. The function removes the user store prefix, such as `DEFAULT/`, from `username`, `userName` and `user_name`.

`GetScim2MeConfig`: `baseUrl?`, `url?`, `fetcher?` and request options.

### updateMeProfile()

```typescript
updateMeProfile(config: UpdateMeProfileConfig): Promise<User>
```

Updates the signed-in user's profile with `PATCH <baseUrl>/scim2/Me`. The function sends `payload` as the value of a single SCIM `replace` operation.

`UpdateMeProfileConfig`: `payload` (required), `baseUrl?`, `url?`, `fetcher?` and request options.

### getSchemas()

```typescript
getSchemas(config: GetSchemasConfig): Promise<Schema[]>
```

Gets the SCIM2 schemas, which describe the user attributes, with `GET <baseUrl>/scim2/Schemas`.

`GetSchemasConfig`: `baseUrl?`, `url?`, `fetcher?` and request options.

### getMeFederatedAssociations()

```typescript
getMeFederatedAssociations(config: GetMeFederatedAssociationsConfig): Promise<FederatedAssociation[]>
```

Gets the signed-in user's linked accounts from external identity providers with `GET <baseUrl>/api/users/v1/me/federated-associations`.

`GetMeFederatedAssociationsConfig`: `baseUrl?`, `url?`, `fetcher?` and request options.

### getUserInfo()

```typescript
getUserInfo(config: Partial<Request>): Promise<User>
```

Calls the OpenID Connect userinfo endpoint with `GET`. Pass the full endpoint URL in `url`, for example `{{content.sdkconfig.baseUrl}}/oauth2/userinfo`.

## Organizations

These functions list, read, and switch organizations.

### getAllOrganizations()

```typescript
getAllOrganizations(config: GetAllOrganizationsConfig): Promise<AllOrganizationsApiResponse>
```

Lists organizations with `GET <baseUrl>/api/server/v1/organizations`. Resolves to `{ organizations, hasMore, nextCursor, totalCount }`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | — | Required. |
| `filter` | `string` | — | A filter expression. |
| `limit` | `number` | `10` | The maximum number of organizations to return. |
| `recursive` | `boolean` | `false` | Include organizations at every level below. |
| `fetcher` | `function` | — | A custom fetch function. |

### getMeOrganizations()

```typescript
getMeOrganizations(config: GetMeOrganizationsConfig): Promise<Organization[]>
```

Lists the organizations the signed-in user belongs to with `GET <baseUrl>/api/users/v1/me/organizations`.

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `baseUrl` | `string` | — | Required. |
| `filter` | `string` | — | A filter expression. |
| `limit` | `number` | `10` | The maximum number of organizations to return. |
| `recursive` | `boolean` | `false` | Include organizations at every level below. |
| `after` / `before` | `string` | — | Pagination cursors. |
| `authorizedAppName` | `string` | — | Filter by the name of an authorized application. |
| `fetcher` | `function` | — | A custom fetch function. |

### getOrganization()

```typescript
getOrganization(config: GetOrganizationConfig): Promise<OrganizationDetails>
```

Gets an organization's details with `GET <baseUrl>/api/server/v1/organizations/<organizationId>`.

`GetOrganizationConfig`: `baseUrl` and `organizationId` (both required), `fetcher?` and request options.

### createOrganization()

```typescript
createOrganization(config: CreateOrganizationConfig): Promise<Organization>
```

Creates a child organization with `POST <baseUrl>/api/server/v1/organizations`.

`CreateOrganizationConfig`: `baseUrl` and `payload` (both required), `fetcher?` and request options. `payload` has `name`, `description`, `parentId` and an optional `orgHandle`. The function always sends `type` as `TENANT`.

### updateOrganization()

```typescript
updateOrganization(config: UpdateOrganizationConfig): Promise<OrganizationDetails>
```

Updates an organization with `PATCH <baseUrl>/api/server/v1/organizations/<organizationId>`.

`UpdateOrganizationConfig`: `baseUrl`, `organizationId` and `operations` (all required), `fetcher?` and request options. Each operation has `operation` (`"ADD"`, `"REPLACE"` or `"REMOVE"`), `path` and an optional `value`.

### createPatchOperations()

```typescript
createPatchOperations(
  payload: Record<string, any>
): { operation: "REPLACE" | "REMOVE"; path: string; value?: any }[]
```

Builds the `operations` for `updateOrganization()` from an object. Each key becomes a `REPLACE` operation on `/<key>`, or a `REMOVE` operation when the value is empty.

```typescript
import { createPatchOperations, updateOrganization } from "@asgardeo/javascript";

await updateOrganization({
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  organizationId: "<organization-id>",
  operations: createPatchOperations({ description: "Sales team" }),
  headers: { Authorization: `Bearer ${accessToken}` }
});
```

## Branding

These functions read the branding preferences of an organization or application.

### getBrandingPreference()

```typescript
getBrandingPreference(config: GetBrandingPreferenceConfig): Promise<BrandingPreference>
```

Gets the branding (theme, colors, logos and layout) configured in the {{product_name}} Console with `GET <baseUrl>/api/server/v1/branding-preference/resolve`.

`GetBrandingPreferenceConfig`: `baseUrl` (required), `locale?`, `name?`, `type?`, `fetcher?` and request options. `locale`, `name` and `type` are sent as query parameters when set.

!!! tip
    `transformBrandingPreferenceToTheme()` and `createTheme()`, also exported from the package, turn the branding preference into a theme object for UI components.

## App-native authentication

These functions run the app-native authentication API, which lets an app collect the user's credentials itself instead of redirecting to the {{product_name}} login page.

### initializeEmbeddedSignInFlow()

```typescript
initializeEmbeddedSignInFlow(config: EmbeddedFlowExecuteRequestConfig): Promise<EmbeddedSignInFlowInitiateResponse>
```

Starts the flow with `POST <baseUrl>/oauth2/authorize`. `payload` (required) holds the authorization request parameters, which the function sends form-encoded; include `response_mode: "direct"`. The response has the `flowId` and the authenticators of the first step in `nextStep`.

### executeEmbeddedSignInFlow()

```typescript
executeEmbeddedSignInFlow(config: EmbeddedFlowExecuteRequestConfig): Promise<EmbeddedSignInFlowHandleResponse>
```

Submits a step with `POST <baseUrl>/oauth2/authn`. `payload` has the `flowId` and the `selectedAuthenticator` (`authenticatorId` and `params`, such as `username` and `password`). When the flow completes, `flowStatus` is `SUCCESS_COMPLETED` and `authData` holds the `code`, `state` and `session_state` to pass to `AsgardeoAuthClient.requestAccessToken()`.

### executeEmbeddedSignUpFlow()

```typescript
executeEmbeddedSignUpFlow(config: EmbeddedFlowExecuteRequestConfig): Promise<EmbeddedFlowExecuteResponse>
```

Runs a self-registration step with `POST <baseUrl>/api/server/v1/flow/execute`. The function sends `payload` with `flowType` set to `REGISTRATION`.

`EmbeddedFlowExecuteRequestConfig`: `baseUrl?`, `url?`, `payload?` and request options. Set `baseUrl` or `url`.

```typescript
import { executeEmbeddedSignInFlow, initializeEmbeddedSignInFlow } from "@asgardeo/javascript";

// `auth` is an initialized AsgardeoAuthClient.
const authorizeUrl = new URL(await auth.getSignInUrl({ response_mode: "direct" }));

const { flowId, nextStep } = await initializeEmbeddedSignInFlow({
  url: `${authorizeUrl.origin}${authorizeUrl.pathname}`,
  payload: Object.fromEntries(authorizeUrl.searchParams.entries())
});

const result = await executeEmbeddedSignInFlow({
  baseUrl: "{{content.sdkconfig.baseUrl}}",
  payload: {
    flowId,
    selectedAuthenticator: {
      authenticatorId: nextStep.authenticators[0].authenticatorId,
      params: { username: "<username>", password: "<password>" }
    }
  }
});

const { code, session_state, state } = result.authData;
await auth.requestAccessToken(code, session_state, state);
```

## Flow APIs for AsgardeoV2

These functions call the flow APIs of the `AsgardeoV2` platform (`platform: "AsgardeoV2"`), not {{product_name}}'s `/oauth2/authn` or `/api/server/v1/flow/execute` APIs. They are experimental and may change.

| Function | Request |
|----------|---------|
| `executeEmbeddedSignInFlowV2(config)` | `POST <baseUrl>/flow/execute`. When the flow completes and `authId` is set, also calls `<baseUrl>/oauth2/auth/callback` and returns the `redirectUrl`. |
| `executeEmbeddedSignUpFlowV2(config)` | `POST <baseUrl>/flow/execute`, with the same `authId` handling. |
| `executeEmbeddedRecoveryFlowV2(config)` | `POST <baseUrl>/flow/execute`. |
| `executeEmbeddedUserOnboardingFlowV2(config)` | `POST <baseUrl>/flow/execute`. |
| `getFlowMetaV2(config)` | `GET <baseUrl>/flow/meta`, with optional `type`, `id`, `language` and `namespace` query parameters. |
| `getOrganizationUnitChildren(config)` | `GET <baseUrl>/organization-units/<organizationUnitId>/ous`, with `limit` (default `10`) and `offset` (default `0`). |
