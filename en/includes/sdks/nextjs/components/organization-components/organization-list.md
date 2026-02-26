The `OrganizationList` component displays a paginated list of organizations available to the signed-in user, with built-in support for filtering, custom rendering, and popup mode. It integrates with the Asgardeo organization context and provides flexible configuration for organization selection and display.

## Overview

The `OrganizationList` component automatically fetches organizations from context and displays them in a styled, paginated list. It supports custom organization rendering, error and loading states, and can be shown inline or as a popup dialog.

## Usage

Use `OrganizationList` to show organizations and allow users to select or switch organizations.

### Basic Usage

Display a list of organizations with default rendering:

```javascript title="OrganizationList Example"
import { OrganizationList } from '@asgardeo/nextjs'

<OrganizationList />
```

### With Custom Limit and Filter

Limit the number of organizations and filter by status:

{% raw %}

```javascript title="Custom Limit & Filter"
<OrganizationList
  limit={20}
  filter="active"
  onOrganizationSelect={(org) => {
    console.log('Selected organization:', org.name);
  }}
/>
```

{% endraw %}

### As a Popup Dialog

Show the organization list in a modal popup:

```javascript title="Popup Mode"
<OrganizationList
  mode="popup"
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Select Organization"
/>
```

### With Custom Organization Renderer

Customize how each organization is rendered:

```javascript title="Custom Organization Renderer"
<OrganizationList
  renderOrganization={(org) => (
    <div key={org.id}>
      <h3>{org.name}</h3>
