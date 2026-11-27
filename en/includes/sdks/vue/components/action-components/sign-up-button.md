The `SignUpButton` component renders a button that takes the user to self-registration using the {{product_name}} Vue SDK (`@asgardeo/vue`).

## Overview

When clicked, `SignUpButton` opens the {{product_name}} sign-up page of your application. If you set `signUpUrl` on `<AsgardeoProvider>`, it navigates to that URL instead, for example a page of your app that renders the [`<SignUp>`]({{base_path}}/sdks/vue/components/authentication/sign-up/) component.

!!! note
    Self-registration must be enabled in your {{product_name}} organization for users to sign up.

## Usage

The following examples show how to use `SignUpButton`.

### Basic usage

```vue title="SignUpButton example"
<script setup>
import { SignedOut, SignUpButton } from '@asgardeo/vue'
</script>

<template>
  <SignedOut>
    <SignUpButton />
  </SignedOut>
</template>
```

Without slot content, the button shows the `elements.buttons.signup.text` translation of the current language ("Sign Up" in English).

### Custom content

Put your own content in the default slot. The slot receives `isLoading`.

{% raw %}

```vue title="Custom content"
<template>
  <SignUpButton v-slot="{ isLoading }">
    {{ isLoading ? 'Please wait...' : 'Create an account' }}
  </SignUpButton>
</template>
```

{% endraw %}

## Props

`SignUpButton` has no props.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ isLoading: boolean }` | Content of the button. Defaults to the `elements.buttons.signup.text` translation. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted when the button is clicked, before the sign-up action starts. |
| `error` | `unknown` | Emitted when the action fails. |

## Styling

The button has the CSS class `asgardeo-sign-up-button`. Add your own classes with the `class` attribute.
