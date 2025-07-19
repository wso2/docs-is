The `OrganizationSwitcher` component provides a dropdown menu for switching between organizations in your Asgardeo-enabled app. It automatically retrieves organizations and the current organization from context, and includes built-in dialogs for managing organizations, viewing organization profiles, and creating new organizations.

## Overview

The `OrganizationSwitcher` component displays the current organization and allows users to switch to another organization, view organization details, or create a new organization. It supports custom menu items, fallback UI for unauthenticated users, and can be customized via props.

## Usage

Use `OrganizationSwitcher` to enable organization switching in your app.

### Basic Usage

Display the organization switcher using context data:

```javascript title="OrganizationSwitcher Example"
import { OrganizationSwitcher } from '@asgardeo/nextjs'

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
