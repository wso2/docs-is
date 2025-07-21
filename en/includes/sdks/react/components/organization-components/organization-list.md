The `OrganizationList` component displays a paginated list of organizations available to the signed-in user, with built-in support for filtering, custom rendering, and popup mode. It integrates with the Asgardeo organization context and provides flexible configuration for organization selection and display.

## Overview

The `OrganizationList` component automatically fetches organizations from context and displays them in a styled, paginated list. It supports custom organization rendering, error and loading states, and can be shown inline or as a popup dialog.

## Usage

Use `OrganizationList` to show organizations and allow users to select or switch organizations.

### Basic Usage

Display a list of organizations with default rendering:

```javascript title="OrganizationList Example"
import { OrganizationList } from '@asgardeo/react'

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
      <p>Can switch: {org.canSwitch ? 'Yes' : 'No'}</p>
    </div>
  )}
/>
```

## Props

<!-- markdownlint-disable MD056 -->
| Prop                   | Type                                                    | Required | Description                                                      |
|------------------------|---------------------------------------------------------|----------|------------------------------------------------------------------|
| `autoFetch`            | `boolean`                                               | ❌       | Automatically fetch organizations on mount                       |
| `filter`               | `string`                                                | ❌       | Filter string for organizations                                  |
| `limit`                | `number`                                                | ❌       | Number of organizations to fetch per page                        |
| `recursive`            | `boolean`                                               | ❌       | Include recursive organizations                                  |
| `onOrganizationSelect` | `(organization: OrganizationWithSwitchAccess) => void`  | ❌       | Callback when an organization is selected/clicked                |
| `mode`                 | `'inline' | 'popup'`                                   | ❌       | Display mode: inline or popup dialog                             |
| `open`                 | `boolean`                                               | ❌       | Whether the popup is open (for `mode="popup"`)                   |
| `onOpenChange`         | `(open: boolean) => void`                               | ❌       | Callback when popup open state changes                           |
| `title`                | `string`                                                | ❌       | Title for the popup dialog                                       |
| `renderOrganization`   | `(organization: OrganizationWithSwitchAccess, index: number) => ReactNode` | ❌ | Custom renderer for each organization item                       |
| `renderEmpty`          | `() => ReactNode`                                       | ❌       | Custom renderer for empty state                                  |
| `renderError`          | `(error: string) => ReactNode`                          | ❌       | Custom renderer for error state                                  |
| `renderLoading`        | `() => ReactNode`                                       | ❌       | Custom renderer for loading state                                |
| `renderLoadMore`       | `(onLoadMore: () => Promise<void>, isLoading: boolean) => ReactNode` | ❌ | Custom renderer for load more button                             |
| `showStatus`           | `boolean`                                               | ❌       | Show organization status in the list                             |
| `className`            | `string`                                                | ❌       | Additional CSS class names                                       |
| `style`                | `React.CSSProperties`                                   | ❌       | Inline styles for the container                                  |
<!-- markdownlint-enable MD056 -->

## Customization

The `OrganizationList` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<OrganizationList className="my-org-list" />
```

#### Default CSS Classes

The component and its base include vendor-prefixed classes for targeting:

- `.asgardeo-organization-list` – List container
- `.asgardeo-organization-list__container` – Inner container
- `.asgardeo-organization-list__error-state` – Error message
- `.asgardeo-organization-list__loading-overlay` – Loading overlay

For organization items and controls (from `BaseOrganizationList`):

- `.asgardeo-organization-list__header` – Header section
- `.asgardeo-organization-list__list-container` – Organization items container
- `.asgardeo-organization-list__organization-item` – Organization item
- `.asgardeo-organization-list__organization-content` – Item content
- `.asgardeo-organization-list__organization-info` – Info section
- `.asgardeo-organization-list__organization-name` – Organization name
- `.asgardeo-organization-list__organization-handle` – Organization handle
- `.asgardeo-organization-list__organization-status` – Status text
- `.asgardeo-organization-list__status-text-active` – Active status
- `.asgardeo-organization-list__status-text-inactive` – Inactive status
- `.asgardeo-organization-list__organization-actions` – Actions (e.g., switch button)
- `.asgardeo-organization-list__badge-success` – Success badge
- `.asgardeo-organization-list__badge-error` – Error badge
- `.asgardeo-organization-list__loading-container` – Loading state
- `.asgardeo-organization-list__error-container` – Error container
- `.asgardeo-organization-list__empty-container` – Empty state
- `.asgardeo-organization-list__load-more-button` – Load more button
- `.asgardeo-organization-list__popup-content` – Popup dialog content

### CSS Custom Properties (CSS Variables)

You can theme the list and other SDK components using CSS variables:

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

You can override the rendering of organizations, loading, error, empty state, and load more button:

```javascript
<OrganizationList
  renderOrganization={(org) => (
    <div key={org.id} className="custom-org-item">
      <h3>{org.name}</h3>
      <p>Handle: @{org.orgHandle}</p>
    </div>
  )}
  renderLoading={() => <div>Loading organizations...</div>}
  renderError={(error) => <div className="error">{error}</div>}
  renderEmpty={() => <div>No organizations found.</div>}
  renderLoadMore={(onLoadMore, isLoading) => (
    <button onClick={onLoadMore} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Load More'}
    </button>
  )}
/>
```

### Layout and Mode

- Use `mode="popup"` to display the list in a dialog.
- Customize the dialog title with the `title` prop.
- Use the `style` prop for inline styles.

{% raw %}

```javascript
<OrganizationList
  mode="popup"
  open={isOpen}
  onOpenChange={setIsOpen}
  title="Select Organization"
  style={{ minWidth: 400 }}
/>
```

{% endraw %}

## Notes

- Automatically fetches organizations and handles pagination.
- Supports both inline and popup display modes.
- Customizable rendering for organizations, loading, error, and empty states.
- Integrates with Asgardeo organization context for seamless data access.
