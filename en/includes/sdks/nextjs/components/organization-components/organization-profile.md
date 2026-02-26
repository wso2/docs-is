The `OrganizationProfile` component displays and manages organization information in a structured, editable format. It automatically fetches organization details using the provided organization ID, supports inline and popup display modes, and allows editing with automatic backend updates.

## Overview

The `OrganizationProfile` component retrieves organization data from the Asgardeo API and displays it with support for editing fields, custom layouts, and error/loading states. Updates are synced with the backend, and you can customize the fields, layout, and fallback UI.

## Usage

Use `OrganizationProfile` to show and edit organization details in your app.

### Basic Usage

Display and edit organization profile:

```javascript title="OrganizationProfile Example"
import { OrganizationProfile } from '@asgardeo/nextjs'

<OrganizationProfile organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1" />
```

### Read-Only Mode

Show organization details without editing:

```javascript title="Read-Only"
<OrganizationProfile
  organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
  editable={false}
/>
```

### Card Layout and Custom Fallbacks

Display as a card and show custom loading/error/fallback content:

```javascript title="Card Layout & Fallbacks"
<OrganizationProfile
  organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
  cardLayout={true}
  loadingFallback={<div>Loading organization...</div>}
  errorFallback={<div>Failed to load organization</div>}
  fallback={<div>No organization data available</div>}
/>
```

### Custom Fields and Update Callback

Configure fields and handle updates:

```javascript title="Custom Fields & Update"
<OrganizationProfile
  organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
  fields={[
    { key: 'id', label: 'Organization ID', editable: false },
    { key: 'name', label: 'Organization Name', editable: true },
    { key: 'description', label: 'Description', editable: true, render: (value) => value || 'No description' },
    { key: 'created', label: 'Created Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
    { key: 'lastModified', label: 'Last Modified Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
    { key: 'attributes', label: 'Custom Attributes', editable: true }
  ]}
