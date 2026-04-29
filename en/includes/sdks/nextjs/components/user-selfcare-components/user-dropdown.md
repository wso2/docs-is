The `UserDropdown` component displays a user avatar with a dropdown menu, automatically retrieving user data from the Asgardeo authentication context. It includes an inbuilt user profile popup and sign-out functionality, making it easy to integrate profile management and sign-out actions.

## Overview

The `UserDropdown` component shows a trigger (usually an avatar) that opens a dropdown menu with user-related actions, such as viewing the profile or signing out. The profile dialog appears as a popup, and sign-out is handled internally. You can customize the dropdown and trigger using props or render props.

## Usage

You can use the `UserDropdown` in several ways: with default behavior, custom menu items, or full render props for advanced UI control.

### Basic Usage

Show a user dropdown with default menu items and user data.

```javascript title="UserDropdown Example"
import { UserDropdown } from '@asgardeo/nextjs'

<UserDropdown />
```

### With Custom Menu Items

You can provide custom menu items for the dropdown menu:

```javascript title="Custom Menu Items"
<UserDropdown menuItems={[
  { label: 'Profile', onClick: () => {} },
  { label: 'Settings', href: '/settings' },
  { label: 'Sign Out', onClick: () => {} }
]} />
```

!!! info "Note"

    You can provide a `fallback` prop to render custom content when no user is signed in.

### With Custom Configuration

Customize the dropdown appearance and fallback content:

```javascript title="Custom Configuration"
<UserDropdown
  showTriggerLabel={true}
  avatarSize={40}
  fallback={<div>Please sign in</div>}
/>
```

## Props

The `UserDropdown` component accepts the following props:

| Prop             | Type                           | Required | Description |
|------------------|-------------------------------|----------|-------------|
| `attributeMapping`    | `object`                  | ❌       | Mapping of component attribute names to identity provider field names. Supports `firstName`, `lastName`, `picture`, and `username` fields |
| `className`           | `string`                  | ❌       | CSS class name for the dropdown container |
| `menuItems`      | `MenuItem[]`                  | ❌       | Custom menu items for the dropdown |
| `showTriggerLabel` | `boolean`                    | ❌       | Show user's name next to avatar |
| `avatarSize`     | `number`                      | ❌       | Size of the avatar in pixels |
| `fallback`       | `ReactElement`                | ❌       | Content to show when no user is signed in |
| `children`       | `function`                    | ❌       | Render prop for full customization |
| `renderTrigger`  | `function`                    | ❌       | Custom trigger button renderer |
| `isLoading`           | `boolean`                 | ❌       | Whether the user data is currently loading. Automatically managed by `UserDropdown` |
| `onSignOut`           | `function`                | ❌       | Callback function for sign out action |
| `portalId`            | `string`                  | ❌       | The HTML element ID where the portal should be mounted |
| `showDropdownHeader`  | `boolean`                 | ❌       | Show dropdown header with user information |

### Render prop arguments

When using the `children` or `renderTrigger` render props, the following arguments are provided:

| Parameter | Type | Description |
|-----------|------|-------------|
| `user` | `object` | The authenticated user object. Note that `user.name` is a nested object with `givenName` and `familyName` fields rather than a flat string |
| `isLoading` | `boolean` | Whether the user data is currently loading |
| `isProfileOpen` | `boolean` | Whether the profile dialog is currently open |
| `openProfile` | `function` | Opens the user profile dialog |
| `closeProfile` | `function` | Closes the user profile dialog |
| `signOut` | `function` | Triggers the sign-out flow |

#### MenuItem interface

Each menu item in the `menuItems` array can have the following properties:

| Property  | Type          | Required | Description |
|-----------|---------------|----------|-------------|
| `label`   | `ReactNode`   | ✅       | The label to display for the menu item |
| `onClick` | `function`    | ❌       | Callback function when the menu item is clicked |
| `href`    | `string`      | ❌       | URL to navigate to when the menu item is clicked |
| `icon`    | `ReactNode`   | ❌       | Icon to display next to the label |
