The `OrganizationSwitcher` component provides a dropdown menu for switching between organizations in your Asgardeo-enabled app. It automatically retrieves organizations and the current organization from context, and includes built-in dialogs for managing organizations, viewing organization profiles, and creating new organizations.

## Overview

The `OrganizationSwitcher` component displays the current organization and allows users to switch to another organization, view organization details, or create a new organization. It supports custom menu items, fallback UI for unauthenticated users, and can be customized via props.

## Usage

Use `OrganizationSwitcher` to enable organization switching in your app.

### Basic Usage

Display the organization switcher using context data:

```javascript title="OrganizationSwitcher Example"
import { OrganizationSwitcher } from '@asgardeo/react'

<OrganizationSwitcher />
```

### With Custom Organization Switch Handler

Handle organization switching with custom logic:

{% raw %}

```javascript title="Custom Organization Switch Handler"
<OrganizationSwitcher
  onOrganizationSwitch={(org) => {
    console.log('Switching to:', org.name);
    // Custom logic here
  }}
/>
```

{% endraw %}

### With Fallback for Unauthenticated Users

Show fallback content when the user is not signed in:

```javascript title="Fallback"
<OrganizationSwitcher
  fallback={<div>Please sign in to view organizations</div>}
/>
```

### With Custom Menu Items

Add extra menu items to the dropdown:

```javascript title="Custom Menu Items"
<OrganizationSwitcher
  menuItems={[
    { label: 'Help', href: '/help' },
    { label: 'Settings', onClick: () => openSettings() }
  ]}
/>
```

## Features

- Displays current organization with avatar, name, member count, and role.
- Dropdown menu lists other organizations to switch to.
- Built-in dialogs for:
  - Managing organizations (shows organization list in a popup)
  - Viewing/editing organization profile (shows profile in a popup)
  - Creating a new organization (shows creation form in a popup)
- Supports custom menu items and organization switch handlers.
- Handles loading and error states automatically.

## Props

| Prop                 | Type                                         | Required | Description                                                      |
|----------------------|----------------------------------------------|----------|------------------------------------------------------------------|
| `currentOrganization`| `Organization`                               | ❌       | Override for current organization (uses context by default)      |
| `organizations`      | `Organization[]`                             | ❌       | Override for organizations list (uses context by default)        |
| `onOrganizationSwitch`| `(organization: Organization) => void`      | ❌       | Callback for organization switch (uses context by default)       |
| `menuItems`          | `Array<{ label, onClick?, href?, icon? }>`   | ❌       | Additional menu items for the dropdown                           |
| `fallback`           | `ReactElement`                               | ❌       | Content to show when user is not signed in                       |
| `avatarSize`         | `number`                                     | ❌       | Size of the organization avatar                                  |
| `showTriggerLabel`   | `boolean`                                    | ❌       | Show organization name next to avatar in the trigger             |
| `className`          | `string`                                     | ❌       | Additional CSS class names                                       |
| `style`              | `React.CSSProperties`                        | ❌       | Inline styles for the container                                  |

## Customization

The `OrganizationSwitcher` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<OrganizationSwitcher className="my-org-switcher" />
```

#### Default CSS Classes

The component and its base include vendor-prefixed classes for targeting:

- `.asgardeo-organization-switcher` – Switcher container
- `.asgardeo-organization-switcher__trigger` – Trigger button
- `.asgardeo-organization-switcher__trigger-label` – Organization name label in trigger
- `.asgardeo-organization-switcher__content` – Dropdown/popup content
- `.asgardeo-organization-switcher__header` – Header section (current org)
- `.asgardeo-organization-switcher__header-info` – Header info section
- `.asgardeo-organization-switcher__header-name` – Organization name in header
- `.asgardeo-organization-switcher__header-meta` – Meta info (member count, role)
- `.asgardeo-organization-switcher__header-role` – Role badge in header
- `.asgardeo-organization-switcher__manage-button` – "Manage" button
- `.asgardeo-organization-switcher__menu` – Menu container
- `.asgardeo-organization-switcher__menu-item` – Menu item
- `.asgardeo-organization-switcher__menu-divider` – Divider between menu sections
- `.asgardeo-organization-switcher__organization-info` – Organization info in menu
- `.asgardeo-organization-switcher__organization-name` – Organization name in menu
- `.asgardeo-organization-switcher__organization-meta` – Organization meta in menu
- `.asgardeo-organization-switcher__loading-container` – Loading state
- `.asgardeo-organization-switcher__loading-text` – Loading text
- `.asgardeo-organization-switcher__error-container` – Error state
- `.asgardeo-organization-switcher__error-text` – Error text
- `.asgardeo-organization-switcher__section-header` – Section header
- `.asgardeo-organization-switcher__section-header-container` – Section header container

### CSS Custom Properties (CSS Variables)

You can theme the switcher and other SDK components using CSS variables:

```css
:root {
  --asgardeo-primary-color: #007bff;
  --asgardeo-primary-hover: #0056b3;
  --asgardeo-border-radius: 8px;
  --asgardeo-font-family: 'Inter', sans-serif;
  --asgardeo-button-padding: 12px 24px;
}
```

### Custom Renderers

You can override the rendering of organizations, loading, error, and menu items using the following props:

```javascript
<OrganizationSwitcher
  renderOrganization={(org, isSelected) => (
    <div className="custom-org-item">
      <strong>{org.name}</strong>
      {isSelected && <span> (Current)</span>}
    </div>
  )}
  renderLoading={() => <div>Loading organizations...</div>}
  renderError={(error) => <div className="error">{error}</div>}
  menuItems={[
    { label: 'Custom Action', onClick: () => alert('Custom!') }
  ]}
/>
```

### Layout and Mode

- Use the `style` prop for inline styles.
- Control avatar size with `avatarSize`.
- Show/hide organization name in trigger with `showTriggerLabel`.
- Show member count and role badge with `showMemberCount` and `showRole`.

{% raw %}

```javascript
<OrganizationSwitcher
  avatarSize={32}
  showTriggerLabel={false}
  showMemberCount={true}
  showRole={true}
  style={{ minWidth: 300 }}
/>
```

{% endraw %}

## Notes

- Automatically retrieves organizations and current organization from context if not provided.
- Includes built-in dialogs for organization management, profile, and creation.
- Handles loading and error states for organization data.
- Useful for multi-tenant and organization-aware applications.
