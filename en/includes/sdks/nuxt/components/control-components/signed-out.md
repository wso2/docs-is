`<AsgardeoSignedOut>` renders its content only when the user is signed out of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoSignedOut>` reads `isSignedIn` from `useAsgardeo()`. When the user is signed out, it renders its `default` slot. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<template>
  <AsgardeoSignedOut>
    <AsgardeoSignInButton />
  </AsgardeoSignedOut>
</template>
```

### With a fallback

```vue
<template>
  <AsgardeoSignedOut>
    <AsgardeoSignInButton />
    <template #fallback>
      <AsgardeoSignOutButton />
    </template>
  </AsgardeoSignedOut>
</template>
```

## Props

`<AsgardeoSignedOut>` has no props.

## Slots

| Slot | Description |
|------|-------------|
| `default` | Content to render when the user is signed out. |
| `fallback` | Content to render when the user is signed in. |
