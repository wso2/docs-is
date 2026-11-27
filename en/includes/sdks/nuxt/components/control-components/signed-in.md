`<AsgardeoSignedIn>` renders its content only when the user is signed in with the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoSignedIn>` reads `isSignedIn` from `useAsgardeo()`. When the user is signed in, it renders its `default` slot. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one.

Because the server resolves the session before it renders the page, `<AsgardeoSignedIn>` renders the correct content during server-side rendering, without a flash of signed-out content.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<template>
  <AsgardeoSignedIn>
    <p>Welcome! You are signed in.</p>
  </AsgardeoSignedIn>
</template>
```

### With a fallback

```vue
<template>
  <AsgardeoSignedIn>
    <p>Welcome! You are signed in.</p>
    <template #fallback>
      <p>Please sign in to continue.</p>
    </template>
  </AsgardeoSignedIn>
</template>
```

!!! note
    `<AsgardeoSignedIn>` only hides content in the UI. To block access to a page, use the [`auth` middleware]({{base_path}}/sdks/nuxt/middleware/auth/). To protect data, check the session in your server routes. See [Protecting routes]({{base_path}}/sdks/nuxt/guides/protecting-routes/).

## Props

`<AsgardeoSignedIn>` has no props.

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content to render when the user is signed in. |
| `fallback` | Content to render when the user is signed out. |
