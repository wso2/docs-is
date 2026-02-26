The `OrganizationProfile` component displays and manages organization information in a structured, editable format. It automatically fetches organization details using the provided organization ID, supports inline and popup display modes, and allows editing with automatic backend updates.

## Overview

The `OrganizationProfile` component retrieves organization data from the Asgardeo API and displays it with support for editing fields, custom layouts, and error/loading states. Updates are synced with the backend, and you can customize the fields, layout, and fallback UI.

## Usage

Use `OrganizationProfile` to show and edit organization details in your app.

### Basic Usage

Display and edit organization profile:

```javascript title="OrganizationProfile Example"
import { OrganizationProfile } from '@asgardeo/react'

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
  onUpdate={async (payload) => {
    console.log('Organization updated:', payload);
    // payload contains updated field values
  }}
/>
```

### Popup Mode

Show the profile in a popup dialog:

```javascript title="Popup Mode"
<OrganizationProfile
  organizationId="0d5e071b-d3d3-475d-b3c6-1a20ee2fa9b1"
  mode="popup"
  open={isOpen}
  onOpenChange={setIsOpen}
  popupTitle="Edit Organization Profile"
/>
```

## Props

<!-- markdownlint-disable MD056 -->
| Prop            | Type                                      | Required | Description                                                      |
|-----------------|-------------------------------------------|----------|------------------------------------------------------------------|
| `organizationId`| `string`                                  | ✅       | The ID of the organization to fetch and display                  |
| `editable`      | `boolean`                                 | ❌       | Enable editing of organization fields                            |
| `fields`        | `Array<{ key, label, editable?, render? }>`| ❌       | Custom field configuration for display/editing                   |
| `cardLayout`    | `boolean`                                 | ❌       | Show profile in a card layout                                    |
| `mode`          | `'default' | 'popup'`                    | ❌       | Display mode: inline or popup dialog                             |
| `open`          | `boolean`                                 | ❌       | Whether the popup is open (for `mode="popup"`)                   |
| `onOpenChange`  | `(open: boolean) => void`                 | ❌       | Callback when popup open state changes                           |
| `onUpdate`      | `(payload: any) => Promise<void>`         | ❌       | Callback after organization update                               |
| `title`         | `string`                                  | ❌       | Custom profile title                                             |
| `popupTitle`    | `string`                                  | ❌       | Custom title for popup dialog                                    |
| `loadingFallback`| `ReactElement`                           | ❌       | Content to show while loading organization data                  |
| `errorFallback` | `ReactElement`                            | ❌       | Content to show on error                                         |
| `fallback`      | `ReactElement`                            | ❌       | Content to show when no organization data is available           |
<!-- markdownlint-enable MD056 -->

## Customization

The `OrganizationProfile` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<OrganizationProfile className="my-org-profile" />
```

#### Default CSS Classes

The component and its base include vendor-prefixed classes for targeting:

- `.asgardeo-organization-profile` – Profile container
- `.asgardeo-organization-profile__card` – Card layout
- `.asgardeo-organization-profile__header` – Header section (avatar, name, handle)
- `.asgardeo-organization-profile__org-info` – Organization info section
- `.asgardeo-organization-profile__name` – Organization name
- `.asgardeo-organization-profile__handle` – Organization handle
- `.asgardeo-organization-profile__info-container` – Fields container
- `.asgardeo-organization-profile__field` – Field row
- `.asgardeo-organization-profile__field-content` – Field content
- `.asgardeo-organization-profile__field-actions` – Field action buttons
- `.asgardeo-organization-profile__label` – Field label
- `.asgardeo-organization-profile__value` – Field value
- `.asgardeo-organization-profile__value-empty` – Empty value
- `.asgardeo-organization-profile__status-badge` – Status badge
- `.asgardeo-organization-profile__popup` – Popup dialog content
- `.asgardeo-organization-profile__edit-button` – Edit button
- `.asgardeo-organization-profile__placeholder-button` – Placeholder button
- `.asgardeo-organization-profile__field-input` – Field input

### CSS Custom Properties (CSS Variables)

You can theme the profile and other SDK components using CSS variables:

```css
:root {
  --asgardeo-primary-color: #007bff;
  --asgardeo-primary-hover: #0056b3;
  --asgardeo-border-radius: 8px;
  --asgardeo-font-family: 'Inter', sans-serif;
  --asgardeo-button-padding: 12px 24px;
}
```

### Fields Configuration

You can customize which organization fields are displayed and how they are rendered using the `fields` prop:

```javascript
<OrganizationProfile
  organizationId="..."
  fields={[
    { key: 'id', label: 'Organization ID', editable: false },
    { key: 'name', label: 'Organization Name', editable: true },
    { key: 'description', label: 'Description', editable: true, render: (value) => value || 'No description' },
    { key: 'created', label: 'Created Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
    { key: 'lastModified', label: 'Last Modified Date', editable: false, render: (value) => new Date(value).toLocaleDateString() },
    { key: 'attributes', label: 'Custom Attributes', editable: true }
  ]}
/>
```

### Layout and Mode

- Use `cardLayout={true}` for a card-style profile.
- Use `mode="popup"` to display the profile in a dialog.
- Customize the dialog title with the `popupTitle` prop.
- Use the `style` prop for inline styles.

{% raw %}

```javascript
<OrganizationProfile
  organizationId="..."
  cardLayout={true}
  mode="popup"
  open={isOpen}
  onOpenChange={setIsOpen}
  popupTitle="Edit Organization Profile"
  style={{ minWidth: 600 }}
/>
```

{% endraw %}

## Editing & Error Handling

- Supports inline editing of organization fields.
- Automatically syncs updates with backend via SCIM2 API.
- Shows loading and error states with customizable fallback UI.

## Notes

- Automatically fetches organization data using the provided ID.
- Supports both inline and popup display modes.
- Customizable fields, layout, and error/loading/fallback content.
