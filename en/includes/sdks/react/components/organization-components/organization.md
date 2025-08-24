The `Organization` component is a declarative way to access the current organization object from the Asgardeo organization context. It uses render props to expose organization data, making it easy to display organization information or conditionally render UI based on organization selection.

## Overview

The `Organization` component automatically retrieves the current organization from context and passes it to its children as a render prop. If no organization is selected, it renders the provided `fallback` content or nothing by default.

## Usage

Use the `Organization` component to access and display organization information in your React application.

### Basic Usage

Display the organization's name, ID, and role:

```javascript title="Organization Example"
import { Organization } from '@asgardeo/react'

<Organization fallback={<p>No organization selected</p>}>
  {(organization) => (
    <div>
      <h1>Current Organization: {organization?.name}</h1>
      <p>ID: {organization?.id}</p>
      <p>Role: {organization?.role}</p>
      {organization?.memberCount && (
        <p>Members: {organization.memberCount}</p>
      )}
    </div>
  )}
</Organization>
```

!!! info "Note"

    The `organization` object will be `null` if no organization is selected. Use the `fallback` prop to show alternative content.

## Props

<!-- markdownlint-disable MD056 -->
| Prop       | Type                                         | Required | Description                                      |
|------------|----------------------------------------------|----------|--------------------------------------------------|
| `children` | `(organization: IOrganization | null) => ReactNode` | ✅       | Render prop function that receives the organization object |
| `fallback` | `ReactNode`                                  | ❌       | Content to render when no organization is selected|
<!-- markdownlint-enable MD056 -->

## Notes

- Use this component to declaratively access the current organization object anywhere in your app.
