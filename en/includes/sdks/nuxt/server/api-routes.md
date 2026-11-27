The {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) registers server API routes under `/api/auth/*`. The SDK's components and composables call these routes for you. You can also call them from your own code, for example with `$fetch()`.

## Overview

The routes run on the Nuxt server, so the client secret and tokens never reach the browser. Routes that need a signed-in user read the session from the signed session cookie. If the cookie is missing, invalid, or expired, they respond with `401`.

!!! note
    Avoid adding your own routes under `/api/auth/` with the same paths, because they would conflict with the SDK's routes.

## Authentication

| Method | Route | Session required | Description |
|--------|-------|------------------|-------------|
| `GET` | `/api/auth/signin` | No | Starts the redirect sign-in flow. Redirects (`302`) to the {{product_name}} authorization endpoint. |
| `POST` | `/api/auth/signin` | No | Runs a step of the embedded sign-in flow. |
| `GET` | `/api/auth/callback` | No | Handles the OAuth callback of the redirect sign-in flow. |
| `POST` | `/api/auth/callback` | No | Exchanges an authorization code for tokens from client-side code. |
| `POST` | `/api/auth/signout` | No | Clears the session and returns the sign-out URL. |
| `POST` | `/api/auth/signup` | No | Runs a step of the embedded sign-up flow. |

### `GET /api/auth/signin`

Starts the authorization code flow. The route stores a temporary sign-in session in a signed cookie that expires in 15 minutes, and redirects the browser to the {{product_name}} authorization endpoint.

| Query parameter | Description |
|-----------------|-------------|
| `returnTo` | Optional. A relative path to return to after sign-in. The route ignores values that don't start with `/` or that start with `//`. |

### `POST /api/auth/signin`

Runs a step of the embedded, app-native sign-in flow.

| Body field | Description |
|------------|-------------|
| `payload` | The flow step payload. If it's empty or has no `flowId` property, the route returns `{ data: { signInUrl }, success: true }` with the authorization URL that starts the flow. |
| `request` | Optional settings for the step. |

The route responds with `{ data, success: true }`, where `data` is the flow response. When the flow completes, the route exchanges the authorization code for tokens, sets the session cookie, and responds with `{ data: { afterSignInUrl }, success: true }`.

### `GET /api/auth/callback`

{{product_name}} redirects the browser here after sign-in. The route reads `code`, `state`, and `session_state` from the query string, exchanges the code for tokens, sets the session cookie, and redirects (`302`) to the `returnTo` path from the sign-in request, or to `afterSignInUrl`.

If {{product_name}} returns an `error`, or if the code, state, or temporary sign-in session is missing or invalid, the route responds with `400`. If the token exchange fails, it responds with `500`.

### `POST /api/auth/callback`

| Body field | Description |
|------------|-------------|
| `code` | The authorization code. Required. |
| `state` | The `state` value from the callback. |
| `sessionState` | The `session_state` value from the callback. Optional. |

On success, the route sets the session cookie and responds with `{ redirectUrl, success: true }`, where `redirectUrl` is `afterSignInUrl`. If the token exchange fails, it responds with `{ error, success: false }`.

### `POST /api/auth/signout`

Gets the {{product_name}} sign-out URL for the session, clears the session cookies, and responds with `{ redirectUrl }`. Navigate the browser to `redirectUrl` to end the session in {{product_name}}, which then redirects the user to `afterSignOutUrl`. If there's no valid session, or the sign-out URL can't be built, `redirectUrl` is `afterSignOutUrl`.

The route accepts only `POST` requests, so a link on another site can't sign your users out.

### `POST /api/auth/signup`

Runs a step of the embedded sign-up flow.

| Body field | Description |
|------------|-------------|
| `payload` | The flow step payload. If it's missing, the route responds with `{ data: { signUpUrl: '' }, success: true }`. |

The route responds with `{ data, success: true }`, where `data` is the flow response. When the flow completes, `data` is the completed flow response with an added `afterSignUpUrl`, the configured `afterSignInUrl`. `<AsgardeoSignUp>` navigates there unless its own `afterSignUpUrl` prop is set.

## Session and tokens

| Method | Route | Session required | Response |
|--------|-------|------------------|----------|
| `GET` | `/api/auth/session` | No | `{ isSignedIn, user, isLoading }`. When there's no valid session, `isSignedIn` is `false` and `user` is `null`. |
| `GET` | `/api/auth/token` | Yes | `{ accessToken }`. Refreshes the access token when it expires within 60 seconds and the session has a refresh token, and then reissues the session cookie. Responds with `401` if the token can't be refreshed. |

## User

| Method | Route | Session required | Response |
|--------|-------|------------------|----------|
| `GET` | `/api/auth/user` | Yes | The user, built from the ID token claims. |
| `GET` | `/api/auth/user/profile` | Yes | The user's SCIM2 profile, with `profile`, `flattenedProfile`, and `schemas`. |
| `PATCH` | `/api/auth/user/profile` | Yes | Updates the SCIM2 `/Me` profile. The body is an `UpdateMeProfileConfig` object, whose `payload` the server sends as the value of a `replace` operation. Responds with `{ data: { user }, error: '', success: true }`. |

## Organizations

| Method | Route | Session required | Response |
|--------|-------|------------------|----------|
| `GET` | `/api/auth/organizations` | Yes | All organizations available to the user, as an `AllOrganizationsApiResponse`. |
| `POST` | `/api/auth/organizations` | Yes | Creates a sub-organization. The body is a `CreateOrganizationPayload`. Responds with the new organization. |
| `GET` | `/api/auth/organizations/me` | Yes | The organizations the user belongs to. |
| `GET` | `/api/auth/organizations/current` | Yes | The organization the user is acting in, or `null`. |
| `GET` | `/api/auth/organizations/:id` | Yes | The details of the organization with the given ID. |
| `POST` | `/api/auth/organizations/switch` | Yes | Switches the session to an organization. The body is `{ organization }`, and `organization.id` is required. The route exchanges the session's token for a token scoped to the organization, reissues the session cookie, and responds with `{ success: true }`. |

## Branding

| Method | Route | Session required | Response |
|--------|-------|------------------|----------|
| `GET` | `/api/auth/branding` | No | The branding preference. When the user is acting in an organization, the route returns that organization's branding. Otherwise, it returns the root organization's branding. |

## Errors

Unless a route above says otherwise, routes that need a session respond with `401` when there's no valid session, `400` when the request body is invalid, and `500` when the call to {{product_name}} fails. The embedded sign-in and sign-up routes respond with `502` when a flow step fails.
