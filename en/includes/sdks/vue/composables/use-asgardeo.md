The `useAsgardeo()` composable of the {{product_name}} Vue SDK (`@asgardeo/vue`) returns the authentication state and methods that `<AsgardeoProvider>` manages.

## Overview

Call `useAsgardeo()` in the `setup` of any component rendered inside `<AsgardeoProvider>`. It returns an object with:

- **Reactive state** as read-only refs: `isSignedIn`, `isLoading`, `isInitialized`, `user` and `organization`. Templates unwrap them; in scripts, read them with `.value`.
- **Methods** to sign users in and out, read tokens and send authenticated requests.
- **Configuration values** passed to `<AsgardeoProvider>`, such as `clientId` and `baseUrl`.

## Usage

{% raw %}

```vue title="src/components/Header.vue"
<script setup>
import { useAsgardeo } from '@asgardeo/vue'

const { isSignedIn, isLoading, user, signIn, signOut } = useAsgardeo()
</script>

<template>
  <p v-if="isLoading">Loading...</p>
  <div v-else-if="isSignedIn">
    <p>Signed in as {{ user?.userName }}</p>
    <button @click="signOut()">Sign out</button>
  </div>
  <button v-else @click="signIn()">Sign in</button>
</template>
```

{% endraw %}

To react to changes in a script, watch the refs:

```javascript title="Inside <script setup>"
import { watch } from 'vue'
import { useAsgardeo } from '@asgardeo/vue'

const { isSignedIn, getAccessToken } = useAsgardeo()

watch(isSignedIn, async (signedIn) => {
  if (signedIn) {
    const accessToken = await getAccessToken()
    // Use the access token.
  }
}, { immediate: true })
```

## Return value

`useAsgardeo()` returns the following values, grouped by purpose.

### State

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `isSignedIn` | `Readonly<Ref<boolean>>` | Whether the user is signed in. |
| `isLoading` | `Readonly<Ref<boolean>>` | Whether the SDK is busy, for example initializing, completing a sign-in or loading the user. Starts as `true`. |
| `isInitialized` | `Readonly<Ref<boolean>>` | Whether the SDK has finished initializing. |
| `user` | `Readonly<Ref<any>>` | The signed-in user, or `null`. Holds the attributes of the user's {{product_name}} profile (SCIM 2.0), or the ID token claims if the profile can't be read. |
| `organization` | `Readonly<Ref<Organization>>` | The organization the user is signed in to, with `id`, `name` and `orgHandle` taken from the ID token. |
<!-- markdownlint-enable MD056 -->

### Methods

<!-- markdownlint-disable MD056 -->
| Method | Description |
|--------|-------------|
| `signIn(options?)` | Redirects the user to {{product_name}} to sign in. `options` adds parameters to the authorization request, such as `{ prompt: 'login' }`. Throws an `AsgardeoRuntimeError` if sign-in fails. |
| `signOut()` | Clears the session in the app and redirects the user to {{product_name}} to end their session there. {{product_name}} then redirects to `afterSignOutUrl`. |
| `signUp()` | Opens the {{product_name}} sign-up page. |
| `signInSilently(options?)` | Signs the user in without a redirect if they already have a session with {{product_name}}, using a `prompt=none` request in a hidden iframe. Resolves to the user, or `false` if there is no session. |
| `getAccessToken()` | Returns a promise that resolves to the access token. |
| `getIdToken()` | Returns a promise that resolves to the raw ID token. |
| `getDecodedIdToken()` | Returns a promise that resolves to the decoded payload of the ID token. |
| `http.request(config)` | Sends an HTTP request with the user's access token. See [Accessing protected APIs]({{base_path}}/sdks/vue/guides/accessing-protected-apis/). |
| `http.requestAll(configs)` | Sends several HTTP requests in parallel and resolves when all of them complete. |
| `switchOrganization(organization)` | Switches the session to another organization with an `organization_switch` token exchange, then reloads the user. |
| `exchangeToken(config)` | Runs a custom token exchange grant. |
| `reInitialize(config)` | Updates the SDK configuration with the given values. Resolves to `true` on success. |
| `clearSession()` | Clears the session stored in the app without contacting {{product_name}}. |
<!-- markdownlint-enable MD056 -->

### Configuration values

| Property | Type | Description |
|----------|------|-------------|
| `clientId` | `string` | The `clientId` passed to `<AsgardeoProvider>`. |
| `baseUrl` | `string` | The `baseUrl` passed to `<AsgardeoProvider>`. |
| `afterSignInUrl` | `string` | The URL that {{product_name}} redirects to after sign-in. |
| `applicationId` | `string` | The `applicationId` passed to `<AsgardeoProvider>`. |
| `organizationHandle` | `string` | The `organizationHandle` passed to `<AsgardeoProvider>`. |
| `signInUrl` | `string` | The `signInUrl` passed to `<AsgardeoProvider>`. |
| `signUpUrl` | `string` | The `signUpUrl` passed to `<AsgardeoProvider>`. |
| `signInOptions` | `SignInOptions` | The `signInOptions` passed to `<AsgardeoProvider>`. |
| `storage` | `string` | The `storage` passed to `<AsgardeoProvider>`. |
| `instanceId` | `number` | The ID of the SDK instance. |

## Errors

If you call `useAsgardeo()` in a component that isn't rendered inside `<AsgardeoProvider>`, it throws:

```text
[Asgardeo] useAsgardeo() was called outside of <AsgardeoProvider>. Make sure to install the AsgardeoPlugin or wrap your app with <AsgardeoProvider>.
```

!!! tip
    The component whose template renders `<AsgardeoProvider>` is outside the provider. Move code that calls `useAsgardeo()` into a child component.
