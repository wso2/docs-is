The `SignIn` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders a sign-in form inside your app, so users sign in without being redirected to the {{product_name}} sign-in page.

!!! note
    The component uses the [app-native authentication API]({{base_path}}/references/app-native-authentication/). Enable app-native authentication for your application in {{product_name}} before you use it.

## Overview

When it mounts, `SignIn` starts a sign-in flow with {{product_name}} and renders the steps that your application's login flow defines, such as username and password or other authenticators. It shows errors returned by {{product_name}}.

When the flow succeeds, `SignIn` emits `success` and redirects the browser to the `afterSignInUrl` of `<AsgardeoProvider>`, adding the authorization response to the URL. `<AsgardeoProvider>` then completes the sign-in on that page.

## Usage

The following examples show how to use `SignIn`.

### Basic usage

Render `SignIn` on the page where users sign in, for example a `/signin` route.

```vue title="SignIn example"
<script setup>
import { SignIn } from '@asgardeo/vue'
</script>

<template>
  <SignIn />
</template>
```

To send users to this page from `<SignInButton>`, set `sign-in-url` on `<AsgardeoProvider>` to the page's URL.

### Appearance and events

```vue title="SignIn with props and events"
<script setup>
import { SignIn } from '@asgardeo/vue'

const onError = (error) => {
  console.error('Sign-in failed:', error)
}
</script>

<template>
  <SignIn size="large" variant="elevated" @error="onError" />
</template>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | ❌ | CSS class to add to the component. |
| `size` | `'small'`, `'medium'` or `'large'` | ❌ | Size of the form. Defaults to `'medium'`. |
| `variant` | `'elevated'`, `'outlined'` or `'flat'` | ❌ | Style of the card that wraps the form. Defaults to `'outlined'`. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `success` | `Record<string, any>` | Emitted when the sign-in flow completes, with the authorization response. The component then redirects to `afterSignInUrl`. |
| `error` | `Error` | Emitted when the flow fails. |
