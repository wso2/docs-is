`<AsgardeoUser>` exposes the signed-in user of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) to your template through a scoped slot.

## Overview

`<AsgardeoUser>` reads `user` from `useAsgardeo()`. When a user is signed in, it renders its `default` slot and passes the user object as the `user` slot prop. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one.

The user object is built from the claims of the ID token. It contains `displayName`, `username`, and the user claims of the ID token, such as `given_name` and `email`, depending on the scopes and attributes your application requests.

## Usage

The component is auto-registered, so you don't need to import it.

{% raw %}

```vue
<template>
  <AsgardeoUser>
    <template #default="{ user }">
      <p>Welcome back, {{ user.displayName || user.username }}!</p>
    </template>
    <template #fallback>
      <p>You are not signed in.</p>
    </template>
  </AsgardeoUser>
</template>
```

{% endraw %}

## Props

`<AsgardeoUser>` has no props.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ user }` | Content to render when a user is signed in. |
| `fallback` | – | Content to render when no user is signed in. |
