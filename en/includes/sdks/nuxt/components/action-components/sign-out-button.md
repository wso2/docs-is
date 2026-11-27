`<AsgardeoSignOutButton>` renders a button that signs the user out with the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

When the user clicks the button, it calls `useAsgardeo().signOut()`, which:

1. Sends a `POST` request to `/api/auth/signout`.
2. The server clears the session cookies and returns the {{product_name}} sign-out URL.
3. The browser navigates to that URL. {{product_name}} ends the session and redirects the user to `afterSignOutUrl`.

If the user has no valid session, or the server can't build the sign-out URL, the server still clears the cookies and the browser navigates to `afterSignOutUrl` directly.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<template>
  <AsgardeoSignedIn>
    <AsgardeoSignOutButton />
  </AsgardeoSignedIn>
</template>
```

Without slot content, the button shows the text **Sign Out**.

### Custom content

{% raw %}

```vue
<template>
  <AsgardeoSignOutButton class="btn btn-secondary">
    <template #default="{ isLoading }">
      {{ isLoading ? 'Signing out…' : 'Log out' }}
    </template>
  </AsgardeoSignOutButton>
</template>
```

{% endraw %}

## Props

`<AsgardeoSignOutButton>` has no props. The `class` and `style` attributes are applied to the button.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ isLoading: boolean }` | Button content. Defaults to **Sign Out**. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted after sign-out starts the navigation. |
| `error` | `unknown` | Emitted when sign-out fails. |
