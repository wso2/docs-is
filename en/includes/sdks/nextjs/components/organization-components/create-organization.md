The `CreateOrganization` component provides a complete organization creation form integrated with Asgardeo authentication and organization context. It supports default API calls, custom handlers, and fallback UI for unauthenticated users.

## Overview

The `CreateOrganization` component renders a form for creating a new organization. It automatically uses the current organization as the parent (unless overridden), handles loading and error states, and updates the organization list after creation. You can customize the creation logic, success handling, and fallback UI.

## Usage

Use `CreateOrganization` to allow users to create organizations in your app.

### Basic Usage

Create an organization using the default API and context:

```javascript title="CreateOrganization Example"
import { CreateOrganization } from '@asgardeo/nextjs'

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

| Prop              | Type                                      | Required | Description                                                      |
|-------------------|-------------------------------------------|----------|------------------------------------------------------------------|
| `fallback`        | `ReactElement`                            | ❌       | Content to show when the user is not signed in                   |
| `onCreate`        | `(payload: CreateOrganizationPayload) => Promise<any>` | ❌       | Custom organization creation handler                             |
| `onSuccess`       | `(organization: any) => void`             | ❌       | Callback after successful creation                               |
| `onCancel`        | `() => void`                              | ❌       | Callback when the user cancels the form                          |
| `defaultParentId` | `string`                                  | ❌       | Parent organization ID (defaults to current organization)        |
| `cardLayout`      | `boolean`                                 | ❌       | Show form in a card layout                                       |
