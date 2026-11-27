The `SignedIn` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders its content only when the user is signed in.

## Overview

`SignedIn` reads `isSignedIn` from the authentication context. When the user is signed in, it renders its default slot. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one. The content updates as soon as the sign-in state changes.

## Usage

The following examples show how to use `SignedIn`.

### Basic usage

```vue title="SignedIn example"
<script setup>
import { SignedIn } from '@asgardeo/vue'
</script>

<template>
  <SignedIn>
    <p>Welcome! You are signed in.</p>
  </SignedIn>
</template>
```

### With a fallback

Use the `fallback` slot to show other content when the user isn't signed in.

```vue title="With fallback"
<template>
  <SignedIn>
    <p>Welcome! You are signed in.</p>
    <template #fallback>
      <p>Please sign in to continue.</p>
    </template>
  </SignedIn>
</template>
```

## Props

`SignedIn` has no props.

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content to render when the user is signed in. |
| `fallback` | Content to render when the user is not signed in. |

!!! note
    `SignedIn` only hides content in the browser. Protect the data itself on your server, for example by validating the access token in your API.
