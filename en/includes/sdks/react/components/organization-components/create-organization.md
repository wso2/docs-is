The `CreateOrganization` component provides a complete organization creation form integrated with Asgardeo authentication and organization context. It supports default API calls, custom handlers, and fallback UI for unauthenticated users.

## Overview

The `CreateOrganization` component renders a form for creating a new organization. It automatically uses the current organization as the parent (unless overridden), handles loading and error states, and updates the organization list after creation. You can customize the creation logic, success handling, and fallback UI.

## Usage

Use `CreateOrganization` to allow users to create organizations in your app.

### Basic Usage

Create an organization using the default API and context:

```javascript title="CreateOrganization Example"
import { CreateOrganization } from '@asgardeo/react'

<CreateOrganization
  onSuccess={(org) => console.log('Created:', org)}
  onCancel={() => navigate('/organizations')}
/>
```

### With Custom Organization Creation Handler

Provide a custom handler for organization creation:

```javascript title="Custom Handler"
<CreateOrganization
  onCreate={async (payload) => {
    const result = await myCustomAPI.createOrganization(payload);
    return result;
  }}
  onSuccess={(org) => {
    console.log('Organization created:', org.name);
    // Custom success logic here
  }}
/>
```

### With Fallback for Unauthenticated Users

Show fallback content when the user is not signed in:

```javascript title="Fallback"
<CreateOrganization
  fallback={<div>Please sign in to create an organization</div>}
/>
```

## Props

<!-- markdownlint-disable MD056 -->
| Prop              | Type                                      | Required | Description                                                      |
|-------------------|-------------------------------------------|----------|------------------------------------------------------------------|
| `fallback`        | `ReactElement`                            | ❌       | Content to show when the user is not signed in                   |
| `onCreate`        | `(payload: CreateOrganizationPayload) => Promise<any>` | ❌       | Custom organization creation handler                             |
| `onSuccess`       | `(organization: any) => void`             | ❌       | Callback after successful creation                               |
| `onCancel`        | `() => void`                              | ❌       | Callback when the user cancels the form                          |
| `defaultParentId` | `string`                                  | ❌       | Parent organization ID (defaults to current organization)        |
| `cardLayout`      | `boolean`                                 | ❌       | Show form in a card layout                                       |
| `mode`            | `'inline' | 'popup'`                     | ❌       | Display mode for the form (inline or popup)                      |
| `open`            | `boolean`                                 | ❌       | Whether the popup is open (for `mode="popup"`)                   |
| `onOpenChange`    | `(open: boolean) => void`                 | ❌       | Callback when popup open state changes                           |
| `initialValues`   | `Partial<{ name, handle, description }>`  | ❌       | Initial values for the form fields                               |
| `renderAdditionalFields` | `() => ReactNode`                  | ❌       | Render additional custom fields in the form                      |
| `title`           | `string`                                  | ❌       | Custom form title                                                |
<!-- markdownlint-enable MD056 -->

## Customization

The `CreateOrganization` component is designed for easy customization to fit your application's design system.

### CSS Classes and Styling

You can use the `className` prop to apply custom styles:

```javascript
<CreateOrganization className="my-org-form" />
```

#### Default CSS Classes

The form includes vendor-prefixed classes for targeting:

- `.asgardeo-create-organization` – Form container
- `.asgardeo-create-organization__card` – Card layout
- `.asgardeo-create-organization__content` – Main content area
- `.asgardeo-create-organization__form` – Form element
- `.asgardeo-create-organization__field-group` – Field group
- `.asgardeo-create-organization__input` – Input fields
- `.asgardeo-create-organization__textarea` – Description textarea
- `.asgardeo-create-organization__actions` – Action buttons
- `.asgardeo-create-organization__error-alert` – Error alert
- `.asgardeo-create-organization__popup` – Popup dialog content

### CSS Custom Properties (CSS Variables)

You can theme the form and other SDK components using CSS variables:

```css
:root {
  --asgardeo-primary-color: #007bff;
  --asgardeo-primary-hover: #0056b3;
  --asgardeo-border-radius: 8px;
  --asgardeo-font-family: 'Inter', sans-serif;
  --asgardeo-button-padding: 12px 24px;
}
```

### Additional Fields

You can inject custom fields into the form using the `renderAdditionalFields` prop:

```javascript
<CreateOrganization
  renderAdditionalFields={() => (
    <TextField
      label="Custom Field"
      placeholder="Enter value"
      name="customField"
    />
  )}
/>
```

### Layout and Mode

- Use `cardLayout={true}` for a card-style form.
- Use `mode="popup"` to display the form in a dialog.
- Customize the form title with the `title` prop.

```javascript
<CreateOrganization
  cardLayout={false}
  mode="popup"
  title="Register New Organization"
/>
```

## Error Handling

- Displays error messages if organization creation fails.
- Handles loading state during API calls.

## Notes

- Automatically uses the current organization as parent if not specified.
- Revalidates the organization list after creation.
- Supports both inline and popup display modes.
- Shows fallback UI for unauthenticated users.
