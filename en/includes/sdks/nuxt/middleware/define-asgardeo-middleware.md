`defineAsgardeoMiddleware()` creates a Nuxt route middleware that protects pages with the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`). Use it when you need a different redirect target than the built-in [`auth` middleware]({{base_path}}/sdks/nuxt/middleware/auth/).

## Overview

`defineAsgardeoMiddleware(options?)` returns a route middleware that you export from a file in your `middleware/` directory. The module auto-imports `defineAsgardeoMiddleware()`, and you can also import it from `@asgardeo/nuxt`.

The middleware reads the authentication state that the server resolved and the client hydrated. If the user is signed out, it redirects the browser to `<redirectTo>?returnTo=<path>`, where `<path>` is the full path of the requested page.

## Usage

Create a named middleware file:

```ts title="middleware/protected.ts"
export default defineAsgardeoMiddleware({
  redirectTo: '/sign-in',
});
```

Then use it on a page by its file name:

```vue title="pages/settings.vue"
<script setup lang="ts">
definePageMeta({
  middleware: 'protected',
});
</script>
```

!!! note
    Only the `/api/auth/signin` route reads the `returnTo` query parameter. If you set `redirectTo` to a page of your own, such as one that renders `<AsgardeoSignIn>`, the user lands on `afterSignInUrl` after sign-in, unless your page handles `returnTo` itself.

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `redirectTo` | `string` | `'/api/auth/signin'` | Where to send users who fail a check. For signed-out users, the middleware adds a `returnTo` query parameter. |
| `requireOrganization` | `boolean` | `false` | Also requires the session to belong to an organization, for example after the user switched to a sub-organization. Users signed in to the root organization fail this check. Users who fail it are sent to `redirectTo` without `returnTo`. |
| `requireScopes` | `string[]` | `[]` | Also requires every listed scope to be granted to the session's access token. Users who fail this check are sent to `redirectTo` without `returnTo`. |

!!! note
    These checks only control navigation in the app. To protect data, also check the session in your server routes with [`requireServerSession()`]({{base_path}}/sdks/nuxt/server/server-utilities/), which returns the session with its `organizationId` and `scopes`.

## Return value

A Nuxt route middleware, as returned by `defineNuxtRouteMiddleware()`.
