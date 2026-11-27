`auth` is a named route middleware that the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) registers to protect pages. It redirects signed-out visitors to sign-in and brings them back to the page afterward.

## Overview

When a visitor opens a page that uses the `auth` middleware:

- If the user is signed in, the page renders.
- If the user is signed out, the middleware redirects the browser to `/api/auth/signin?returnTo=<path>`, where `<path>` is the full path of the requested page. After sign-in, {{product_name}} redirects the user back to `/api/auth/callback`, which then redirects the user to that path.

The middleware runs during server-side rendering and on client-side navigation. It reads the authentication state that the server resolved and the client hydrated, so it doesn't send a request of its own.

## Usage

Add the middleware to a page with `definePageMeta()`:

```vue title="pages/dashboard.vue"
<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
});
</script>

<template>
  <h1>Dashboard</h1>
</template>
```

To combine it with other middleware, pass an array:

```ts
definePageMeta({
  middleware: ['auth', 'my-other-middleware'],
});
```

!!! note
    The `auth` middleware protects pages only. It doesn't protect your server API routes. Check the session in those routes with `requireServerSession()`. See [Protecting routes]({{base_path}}/sdks/nuxt/guides/protecting-routes/).

!!! tip
    The `auth` middleware is the same as `defineAsgardeoMiddleware()` with no options. To redirect somewhere else, or to add more checks, see [`defineAsgardeoMiddleware()`]({{base_path}}/sdks/nuxt/middleware/define-asgardeo-middleware/).
