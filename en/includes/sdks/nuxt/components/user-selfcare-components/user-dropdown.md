`<AsgardeoUserDropdown>` renders a dropdown menu with the signed-in user's details, a profile view, and a sign-out action, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoUserDropdown>` reads `user` and `signOut()` from `useAsgardeo()`. The trigger shows the user's avatar and name. The menu offers:

- A profile item that opens a modal with an editable user profile.
- A sign-out item that calls `useAsgardeo().signOut()`.

!!! note
    `<AsgardeoUserDropdown>` must render inside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/), because it reads profile data from `useUser()`.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue title="components/AppHeader.vue"
<template>
  <header>
    <AsgardeoSignedOut>
      <AsgardeoSignInButton />
    </AsgardeoSignedOut>
    <AsgardeoSignedIn>
      <AsgardeoUserDropdown />
    </AsgardeoSignedIn>
  </header>
</template>
```

### Custom trigger

Use the `default` slot to replace the whole dropdown with your own UI.

{% raw %}

```vue
<template>
  <AsgardeoUserDropdown>
    <template #default="{ user, isOpen, toggle }">
      <button @click="toggle">
        {{ user?.displayName }} {{ isOpen ? '▲' : '▼' }}
      </button>
    </template>
  </AsgardeoUserDropdown>
</template>
```

{% endraw %}

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | CSS class for the root element. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ user, isOpen, toggle }` | Replaces the built-in dropdown. |
| `items` | – | Extra menu items to add to the built-in menu. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `profileClick` | – | Emitted when the user opens the profile view. |
