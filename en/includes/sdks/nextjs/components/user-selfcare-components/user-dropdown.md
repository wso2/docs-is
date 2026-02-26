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

The `UserDropdown` component accepts all props from `BaseUserDropdown`, except `user` and `onManageProfile` (handled internally):

| Prop             | Type                           | Required | Description |
|------------------|-------------------------------|----------|-------------|
| `menuItems`      | `MenuItem[]`                  | ❌       | Custom menu items for the dropdown |
| `showTriggerLabel` | `boolean`                    | ❌       | Show user's name next to avatar |
| `avatarSize`     | `number`                      | ❌       | Size of the avatar |
| `fallback`       | `ReactElement`                | ❌       | Content to show when no user is signed in |
| `children`       | `function`                    | ❌       | Render prop for full customization |
| `renderTrigger`  | `function`                    | ❌       | Custom trigger button renderer |
