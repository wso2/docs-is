The `SignOutButton` component renders a button that signs the user out using the {{product_name}} Vue SDK (`@asgardeo/vue`).

## Overview

When clicked, `SignOutButton` calls `signOut()`. The SDK clears the session in the app and redirects the user to {{product_name}} to end their session there. {{product_name}} then redirects the user to the `afterSignOutUrl` set on `<AsgardeoProvider>`.

## Usage

The following examples show how to use `SignOutButton`.

### Basic usage

Place the button where only signed-in users see it, for example inside `<SignedIn>`.

```vue title="SignOutButton example"
<script setup>
import { SignedIn, SignOutButton } from '@asgardeo/vue'
</script>

<template>
  <SignedIn>
    <SignOutButton />
  </SignedIn>
</template>
```

Without slot content, the button shows the `elements.buttons.signout.text` translation of the current language ("Sign Out" in English).

### Custom content

Put your own content in the default slot. The slot receives `isLoading`, which is `true` while sign-out is in progress.

{% raw %}

```vue title="Custom content"
<template>
  <SignOutButton v-slot="{ isLoading }">
    {{ isLoading ? 'Signing out...' : 'Log out' }}
  </SignOutButton>
</template>
```

{% endraw %}

## Props

`SignOutButton` has no props.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ isLoading: boolean }` | Content of the button. Defaults to the `elements.buttons.signout.text` translation. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the button is clicked, before `signOut()` starts. |
| `error` | `unknown` | Emitted when sign-out fails. |

## Styling

The button has the CSS class `asgardeo-sign-out-button`. Add your own classes with the `class` attribute.
