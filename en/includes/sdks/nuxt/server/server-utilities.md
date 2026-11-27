The {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) provides server utilities for your own Nitro server routes. Import them from the `@asgardeo/nuxt/server` subpath, which keeps them out of the client bundle.

```ts
import {
  useServerSession,
  requireServerSession,
  getValidAccessToken,
  getAsgardeoContext,
} from '@asgardeo/nuxt/server';
```

These utilities aren't auto-imported. Import them in each server file that uses them.

## `requireServerSession(event)`

Returns the session of the current request. If there's no valid session, it throws a `401` error, which Nitro turns into a `401` response.

```ts title="server/api/profile.get.ts"
import { requireServerSession } from '@asgardeo/nuxt/server';

export default defineEventHandler(async (event) => {
  const session = await requireServerSession(event);

  return { userId: session.sub, organizationId: session.organizationId ?? null };
});
```

**Returns**: `Promise<AsgardeoSessionPayload>`

## `useServerSession(event)`

Returns the session of the current request, or `null` if the session cookie is missing, invalid, or expired. Use it when a route serves both signed-in and signed-out users.

```ts title="server/api/greeting.get.ts"
import { useServerSession } from '@asgardeo/nuxt/server';

export default defineEventHandler(async (event) => {
  const session = await useServerSession(event);

  return { message: session ? 'Welcome back!' : 'Hello, guest!' };
});
```

**Returns**: `Promise<AsgardeoSessionPayload | null>`

## `getValidAccessToken(event)`

Returns an access token for the current session that's safe to use. If the token expires within 60 seconds and the session has a refresh token, the function refreshes the token with the {{product_name}} token endpoint, reissues the session cookie with the new tokens, and returns the new access token.

It throws a `401` error if there's no valid session, if the token has expired and there's no refresh token, or if the refresh fails.

```ts title="server/api/orders.get.ts"
import { getValidAccessToken } from '@asgardeo/nuxt/server';

export default defineEventHandler(async (event) => {
  const accessToken = await getValidAccessToken(event);

  return $fetch('https://api.example.com/orders', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
});
```

**Returns**: `Promise<string>`

!!! tip
    Use `getValidAccessToken()` instead of reading `accessToken` from the session, because the session's token can be expired.

## `getAsgardeoContext(event)`

Returns the authentication context that the SDK attaches to page requests while it renders them, or `null` if there's none. The context contains:

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `isSignedIn` | `boolean` | Whether the request has a valid session. |
| `session` | `AsgardeoSessionPayload \| null` | The session, or `null`. |
| `ssr` | `object` | The data that the server fetched for the page: `user`, `userProfile`, `currentOrganization`, `myOrganizations`, `brandingPreference`, and `resolvedBaseUrl`. Present only when the user is signed in. |
<!-- markdownlint-enable MD056 -->

!!! note
    In API routes (`/api/*`), the context has `isSignedIn` and `session` only; `ssr` is present for page requests. For `/_nuxt/*` and `/__nuxt_*` paths, `getAsgardeoContext()` returns `null`.

**Returns**: `AsgardeoEventContext | null`

## The session object

`AsgardeoSessionPayload` has these properties:

| Property | Type | Description |
|----------|------|-------------|
| `sub` | `string` | The user's ID, from the `sub` claim of the ID token. |
| `sessionId` | `string` | The ID of the session. |
| `accessToken` | `string` | The access token. It can be expired. Use `getValidAccessToken()` to get a fresh token. |
| `accessTokenExpiresAt` | `number` | When the access token expires, in seconds since the epoch. Optional. |
| `idToken` | `string` | The raw ID token. Optional. |
| `refreshToken` | `string` | The refresh token. Optional. |
| `organizationId` | `string` | The organization the user is acting in, from the `user_org` or `organization_id` claim of the ID token. Optional. |
| `scopes` | `string` | The granted scopes, separated by spaces. |
| `iat` | `number` | When the session cookie was issued, in seconds since the epoch. |
| `exp` | `number` | When the session cookie expires, in seconds since the epoch. |
