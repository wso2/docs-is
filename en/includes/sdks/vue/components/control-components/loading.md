The `Loading` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders its content while the SDK is busy, for example while it initializes, completes a sign-in or loads the user's profile.

## Overview

`Loading` reads `isLoading` from the authentication context. While it is `true`, `Loading` renders its default slot. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one.

## Usage

The following examples show how to use `Loading`.

### Basic usage

```vue title="Loading example"
<script setup>
import { Loading } from '@asgardeo/vue'
</script>

<template>
  <Loading>
    <p>Loading...</p>
  </Loading>
</template>
```

### With a fallback

Use the `fallback` slot to show your content once the SDK is idle.

```vue title="With fallback"
<script setup>
import { Loading, SignedIn, SignedOut, SignInButton } from '@asgardeo/vue'
</script>

<template>
  <Loading>
    <p>Loading...</p>
    <template #fallback>
      <SignedIn>
        <p>Welcome back!</p>
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </template>
  </Loading>
</template>
```

## Props

`Loading` has no props.

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content to render while the SDK is busy. |
| `fallback` | Content to render when the SDK is not busy. |
