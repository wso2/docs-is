The `SignedOut` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders its content only when the user is signed out.

## Overview

`SignedOut` reads `isSignedIn` from the authentication context. When the user is not signed in, it renders its default slot. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one. Use it for sign-in prompts and content for anonymous visitors.

## Usage

The following examples show how to use `SignedOut`.

### Basic usage

```vue title="SignedOut example"
<script setup>
import { SignedOut, SignInButton } from '@asgardeo/vue'
</script>

<template>
  <SignedOut>
    <p>Sign in to see your dashboard.</p>
    <SignInButton />
  </SignedOut>
</template>
```

### With a fallback

Use the `fallback` slot to show other content when the user is signed in.

```vue title="With fallback"
<template>
  <SignedOut>
    <SignInButton />
    <template #fallback>
      <p>You are already signed in.</p>
    </template>
  </SignedOut>
</template>
```

## Props

`SignedOut` has no props.

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content to render when the user is not signed in. |
| `fallback` | Content to render when the user is signed in. |
