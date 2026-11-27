`<AsgardeoCallback>` is a headless component of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) that forwards OAuth callback parameters to the route that started an OAuth redirect.

## Overview

You don't need `<AsgardeoCallback>` for the standard redirect sign-in flow. The module's `/api/auth/callback` server route handles that callback, sets the session cookie, and redirects the user.

`<AsgardeoCallback>` is for client-side flows that store their originating route in `sessionStorage` under the key `asgardeo_oauth_<state>` before they redirect to an identity provider. When it mounts in the browser, the component:

1. Reads `code`, `state`, `nonce`, `error`, and `error_description` from the URL. If none of `code`, `state`, or `error` is present, it does nothing.
2. Looks up the stored entry for `state` and checks that it's no older than five minutes. It then removes the entry.
3. Navigates to the stored path with `code` (and `nonce`, if present) as query parameters. If the provider returned an error, it navigates with `error` and `error_description` instead.

If validation fails, the component calls `onError` and navigates to the stored path, or to `/`, with `error=callback_error` and an `error_description`.

The component renders nothing.

## Usage

The component is auto-registered, so you don't need to import it.

```vue title="pages/callback.vue"
<script setup lang="ts">
const onError = (error: Error) => {
  console.error('OAuth callback failed:', error);
};
</script>

<template>
  <AsgardeoCallback :on-error="onError" />
</template>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onError` | `(error: Error) => void` | No | Called when the callback contains an error or fails validation. |
| `onNavigate` | `(path: string) => void` | No | Replaces the default navigation, which uses Nuxt's `navigateTo()`. |
