`<AsgardeoSignIn>` renders an embedded sign-in form of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`), so users sign in inside your app instead of on the {{product_name}} sign-in page.

!!! note
    Underneath, the component uses the [App-native Authentication API]({{base_path}}/references/app-native-authentication/) to run the sign-in flow. Enable app-native authentication for your application in the {{product_name}} Console before you use it.

## Overview

`<AsgardeoSignIn>` renders the steps of the sign-in flow that you configured for your application. Each step goes through the module's `POST /api/auth/signin` route, so your client secret stays on the server. When the flow completes, the server exchanges the authorization code for tokens, sets the session cookie, and the component:

1. Updates the authentication state, so `useAsgardeo().isSignedIn` becomes `true` without a page reload.
2. Emits `success`.
3. Navigates to `afterSignInUrl`.

## Usage

The component is auto-registered, so you don't need to import it. Create a sign-in page that renders it:

```vue title="pages/sign-in.vue"
<template>
  <AsgardeoSignIn />
</template>
```

Then point `<AsgardeoSignInButton>` at that page:

```bash title=".env"
NUXT_PUBLIC_ASGARDEO_SIGN_IN_URL="/sign-in"
```

### Handle events

```vue title="pages/sign-in.vue"
<script setup lang="ts">
const onError = (error: Error) => {
  console.error('Sign-in failed:', error);
};
</script>

<template>
  <AsgardeoSignIn variant="elevated" size="large" @error="onError" />
</template>
```

## Props

<!-- markdownlint-disable MD056 -->
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | CSS class for the root element. |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | Size of the form and its controls. |
| `variant` | `'elevated' \| 'outlined' \| 'flat'` | `'outlined'` | Card style of the form. |
<!-- markdownlint-enable MD056 -->

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `success` | `Record<string, any>` | Emitted when the sign-in flow completes. |
| `error` | `Error` | Emitted when a step of the sign-in flow fails. |
