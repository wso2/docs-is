The `UserDropdown` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders an avatar button that opens a menu for the signed-in user.

## Overview

The menu shows the user's name and email or username, followed by:

- **Profile** – Opens a modal with the [`<UserProfile>`]({{base_path}}/sdks/vue/components/user-selfcare-components/user-profile/) component, where the user can edit their profile.
- Your own menu items, if you add any.
- **Sign Out** – Signs the user out.

The avatar shows the user's initials.

## Usage

The following examples show how to use `UserDropdown`.

### Basic usage

```vue title="UserDropdown example"
<script setup>
import { SignedIn, UserDropdown } from '@asgardeo/vue'
</script>

<template>
  <SignedIn>
    <UserDropdown />
  </SignedIn>
</template>
```

### Custom menu items

Add items between **Profile** and **Sign Out** with `menu-items`.

```vue title="Custom menu items"
<script setup>
import { UserDropdown } from '@asgardeo/vue'

const menuItems = [
  { label: 'Settings', onClick: () => console.log('Open settings') },
  { label: 'Help', onClick: () => console.log('Open help'), separatorBefore: true },
]
</script>

<template>
  <UserDropdown :menu-items="menuItems" size="sm" menu-align="left" show-chevron />
</template>
```

### Custom UI

Use the default slot to render your own trigger and menu. The slot replaces the built-in UI.

{% raw %}

```vue title="Custom dropdown"
<template>
  <UserDropdown v-slot="{ user, isOpen, toggle }">
    <button @click="toggle">{{ user?.userName }}</button>
    <ul v-if="isOpen">
      <li>Settings</li>
    </ul>
  </UserDropdown>
</template>
```

{% endraw %}

## Props

<!-- markdownlint-disable MD056 -->
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `menuItems` | `DropdownMenuItem[]` | ❌ | Items to add between **Profile** and **Sign Out**. |
| `size` | `'sm'`, `'md'` or `'lg'` | ❌ | Size of the avatar and the menu. Defaults to `'md'`. |
| `menuAlign` | `'auto'`, `'left'` or `'right'` | ❌ | How to align the menu with the button. `'auto'` opens it on the side with more space. Defaults to `'auto'`. |
| `showChevron` | `boolean` | ❌ | Whether to show a down arrow beside the avatar. Defaults to `false`. |
| `className` | `string` | ❌ | CSS class to add to the root element. |
<!-- markdownlint-enable MD056 -->

??? info "DropdownMenuItem"

    | Property | Type | Required | Description |
    |----------|------|----------|-------------|
    | `label` | `string` | ✅ | Text of the item. |
    | `onClick` | `() => void` | ✅ | Called when the item is clicked. The menu closes first. |
    | `icon` | `VNode` | ❌ | Icon to show before the label, created with Vue's `h()`. |
    | `separatorBefore` | `boolean` | ❌ | Adds a divider before the item. |
    | `danger` | `boolean` | ❌ | Shows the item in red, for destructive actions. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ user, isOpen, toggle }` | Replaces the built-in UI. `toggle()` opens and closes the menu. |
| `items` | — | Extra items to render after `menuItems`, before **Sign Out**. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `profileClick` | — | Emitted when the user clicks **Profile**. |
