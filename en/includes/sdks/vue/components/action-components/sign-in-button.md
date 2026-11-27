The `SignInButton` component renders a button that starts the sign-in flow of the {{product_name}} Vue SDK (`@asgardeo/vue`).

## Overview

When clicked, `SignInButton` calls `signIn()` and redirects the user to the {{product_name}} sign-in page. If you set `signInUrl` on `<AsgardeoProvider>`, it navigates to that URL instead. The button is disabled and shows a spinner while the request is in progress.

## Usage

The following examples show how to use `SignInButton`.

### Basic usage

```vue title="SignInButton example"
<script setup>
import { SignInButton } from '@asgardeo/vue'
</script>

<template>
  <SignInButton />
</template>
```

Without slot content, the button shows the `elements.buttons.signin.text` translation of the current language ("Sign In" in English).

### Custom content

Put your own content in the default slot. The slot receives `isLoading`, which is `true` while sign-in is in progress.

{% raw %}

```vue title="Custom content"
<template>
  <SignInButton v-slot="{ isLoading }">
    {{ isLoading ? 'Redirecting...' : 'Log in' }}
  </SignInButton>
</template>
```

{% endraw %}

### Extra authorization parameters

Use `sign-in-options` to add parameters to the authorization request for this button only. Without it, the button uses the `signInOptions` set on `<AsgardeoProvider>`.

```vue title="Sign-in options"
<template>
  <SignInButton :sign-in-options="{ prompt: 'login' }" />
</template>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signInOptions` | `Record<string, any>` | ❌ | Parameters to add to the authorization request. Overrides the `signInOptions` of `<AsgardeoProvider>`. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ isLoading: boolean }` | Content of the button. Defaults to the `elements.buttons.signin.text` translation. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the button is clicked, before `signIn()` starts. |
| `error` | `unknown` | Emitted when sign-in fails. |

## Styling

The button has the CSS class `asgardeo-sign-in-button`. Add your own classes with the `class` attribute.

```vue
<SignInButton class="my-sign-in-button" />
```

!!! tip
    For a fully custom button, call `signIn()` from [`useAsgardeo()`]({{base_path}}/sdks/vue/composables/use-asgardeo/) in your own button's click handler.
