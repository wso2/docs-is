The `UserDropdown` component displays a user avatar with a dropdown menu, automatically retrieving user data from the Asgardeo authentication context. It includes an inbuilt user profile popup and sign-out functionality, making it easy to integrate profile management and sign-out actions.

## Overview

The `UserDropdown` component shows a trigger (usually an avatar) that opens a dropdown menu with user-related actions, such as viewing the profile or signing out. The profile dialog appears as a popup, and sign-out is handled internally. You can customize the dropdown and trigger using props or render props.

## Usage

You can use the `UserDropdown` in several ways: with default behavior, custom menu items, or full render props for advanced UI control.

### Basic Usage

Show a user dropdown with default menu items and user data.

```javascript title="UserDropdown Example"
import { UserDropdown } from '@asgardeo/react'

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
| `renderDropdown` | `function`                    | ❌       | Custom dropdown content renderer |
| `onSignOut`      | `function`                    | ❌       | Callback after sign-out is triggered |
| `isLoading`           | `boolean`                 | ❌       | Whether the user data is currently loading. Automatically managed by `UserDropdown` |
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
| `meta` | `FlowMetadataResponse or null` | Flow metadata returned by the platform. Only available on v2, `null` otherwise |

#### MenuItem interface

Each menu item in the `menuItems` array can have the following properties:

| Property  | Type          | Required | Description |
|-----------|---------------|----------|-------------|
| `label`   | `ReactNode`   | ✅       | The label to display for the menu item |
| `onClick` | `function`    | ❌       | Callback function when the menu item is clicked |
| `href`    | `string`      | ❌       | URL to navigate to when the menu item is clicked |
| `icon`    | `ReactNode`   | ❌       | Icon to display next to the label |

## Customization

The `UserDropdown` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<UserDropdown className="user-card shadow-lg" />
```

#### Default CSS Classes

The dropdown includes vendor-prefixed classes for targeting:

- `.asgardeo-user-dropdown` – Dropdown container
- `.asgardeo-user-dropdown__trigger` – Trigger button
- `.asgardeo-user-dropdown__trigger-label` – Username label
- `.asgardeo-user-dropdown__content` – Dropdown content
- `.asgardeo-user-dropdown__header` – Dropdown header
- `.asgardeo-user-dropdown__header-info` – Header info section
- `.asgardeo-user-dropdown__header-name` – Display name
- `.asgardeo-user-dropdown__header-email` – Email/username
- `.asgardeo-user-dropdown__menu` – Menu container
- `.asgardeo-user-dropdown__menu-item` – Menu item
- `.asgardeo-user-dropdown__menu-divider` – Divider

### CSS Custom Properties (CSS Variables)

You can theme the dropdown and other SDK components using CSS variables:

```css
:root {
  --asgardeo-primary-color: #007bff;
  --asgardeo-primary-hover: #0056b3;
  --asgardeo-border-radius: 8px;
  --asgardeo-font-family: 'Inter', sans-serif;
  --asgardeo-button-padding: 12px 24px;
}
```

### Menu Items

You can provide custom menu items via the `menuItems` prop:

```javascript
<UserDropdown
  menuItems={[
    { label: 'Profile', onClick: () => openProfile() },
    { label: 'Settings', href: '/settings' },
    { label: 'Sign Out', onClick: () => signOut() }
  ]}
/>
```

### Attribute Mapping

Customize which user profile fields are used for display:

{% raw %}

```javascript
<UserDropdown
  attributeMapping={{
    firstName: ['customFirstName'],
    lastName: ['customLastName'],
    picture: ['customPictureUrl'],
    username: ['customUsername']
  }}
/>
```

{% endraw %}

### Render Props for Custom UI

You can customize the dropdown UI and behavior using render props for full control.

#### Full Render Props

Completely control the dropdown UI and behavior using render props:

{% raw %}

```javascript title="Render Props"
<UserDropdown>
  {({ user, isLoading, openProfile, signOut }) => (
    <div>
      <button onClick={openProfile}>
        {user?.name?.givenName || 'Loading...'}
      </button>
      <button onClick={signOut}>Logout</button>
    </div>
  )}
</UserDropdown>
```

{% endraw %}

#### Partial Render Props

Customize only the trigger button while keeping the default dropdown

{% raw %}

```javascript title="Partial Render Props"
<UserDropdown
  renderTrigger={({ user, openProfile }) => (
    <button onClick={openProfile} className="custom-trigger">
      Welcome, {user?.name?.givenName}!
    </button>
  )}
/>
```

{% endraw %}

## Error Handling

If an error occurs (e.g., sign-out fails), an `AsgardeoRuntimeError` is thrown with a descriptive message.

## Notes

- Automatically disables menu items and shows loading state when user data is loading.
- Supports both render props and traditional children for maximum flexibility.
- Integrates with Asgardeo context for user data and authentication actions.
