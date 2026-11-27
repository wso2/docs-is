`useAsgardeo()` is the main composable of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`). It returns the authentication state and the methods that sign users in and out and get access tokens.

## Overview

The module auto-imports `useAsgardeo()`, and its plugin provides the authentication context to the whole app, so you can call `useAsgardeo()` in any component, page, or layout, including outside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/).

The server resolves the session while it renders the page, and the client hydrates that state. `isSignedIn` and `user` are correct on the first render, on both the server and the client.

## Usage

{% raw %}

```vue title="pages/index.vue"
<script setup lang="ts">
const { isSignedIn, user, signIn, signOut } = useAsgardeo();
</script>

<template>
  <div v-if="isSignedIn">
    <p>Welcome, {{ user?.displayName }}!</p>
    <button @click="signOut()">Sign out</button>
  </div>
  <button v-else @click="signIn({ returnTo: '/dashboard' })">Sign in</button>
</template>
```

{% endraw %}

The state values are read-only Vue refs. Vue unwraps them in templates. In `<script setup>`, read them with `.value`, for example `isSignedIn.value`.

## API

`useAsgardeo()` returns the following values.

### State

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `isSignedIn` | `Readonly<Ref<boolean>>` | Whether the user is signed in. |
| `isLoading` | `Readonly<Ref<boolean>>` | Whether the authentication state is loading. |
| `isInitialized` | `Readonly<Ref<boolean>>` | Whether the authentication state has loaded. The opposite of `isLoading`. |
| `user` | `Readonly<Ref<User \| null>>` | The signed-in user, built from the ID token claims, or `null`. Contains `displayName`, `username`, and the user claims of the ID token. |
| `organization` | `Readonly<Ref<Organization \| null>>` | The organization the user is acting in, as resolved by the server, or `null`. |
<!-- markdownlint-enable MD056 -->

### Configuration

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `baseUrl` | `string \| undefined` | The configured `baseUrl`. |
| `clientId` | `string \| undefined` | The configured `clientId`. |
| `applicationId` | `string \| undefined` | The configured `applicationId`. |
| `afterSignInUrl` | `string \| undefined` | The configured `afterSignInUrl`. |
| `signInUrl` | `string \| undefined` | The configured `signInUrl`. |
| `signUpUrl` | `string \| undefined` | The configured `signUpUrl`. |
<!-- markdownlint-enable MD056 -->

### Methods

| Method | Description |
|--------|-------------|
| `signIn(options?)` | Starts the redirect sign-in flow by navigating to `/api/auth/signin`. Pass `{ returnTo: '/path' }` to return the user to that path after sign-in. `returnTo` must be a relative path that starts with a single `/`. |
| `signIn(payload, request?)` | Runs one step of the embedded sign-in flow when `payload` has a `flowId` property. Sends the step to `POST /api/auth/signin` and returns the flow response. When the flow completes, it updates the authentication state. `<AsgardeoSignIn>` calls this for you. |
| `signOut()` | Sends a `POST` request to `/api/auth/signout`, which clears the session cookies, and then navigates to the sign-out URL that the server returns. {{product_name}} then redirects the user to `afterSignOutUrl`. |
| `signUp()` | Navigates to `signUpUrl` if it's set. Otherwise, navigates to the {{product_name}} self-registration page that the SDK builds from `baseUrl`, `clientId`, and `applicationId`. If the SDK can't build that URL, it navigates to `/sign-up`. |
| `signUp(payload)` | Runs one step of the embedded sign-up flow when `payload` has a `flowType` property. Sends the step to `POST /api/auth/signup` and returns the flow response. When the flow completes, it navigates to `afterSignInUrl`. `<AsgardeoSignUp>` calls this for you. |
| `getAccessToken()` | Returns `Promise<string>`. Fetches the access token from `GET /api/auth/token`, which refreshes it when it's about to expire. Resolves to an empty string if there's no session or the request fails. |

!!! note
    The returned object also contains `getIdToken()`, `getDecodedIdToken()`, `exchangeToken()`, `http.request()`, `http.requestAll()`, `signInSilently()`, `clearSession()`, `switchOrganization()`, and `reInitialize()`. They exist for compatibility with the `@asgardeo/vue` context type and do nothing in the Nuxt SDK. Tokens stay on the server. To switch organizations, use [`useOrganization().switchOrganization()`]({{base_path}}/sdks/nuxt/composables/use-organization/).

## Related

- [`useUser()`]({{base_path}}/sdks/nuxt/composables/use-user/) for the full SCIM2 profile.
- [Accessing protected APIs]({{base_path}}/sdks/nuxt/guides/accessing-protected-apis/) for using access tokens.
