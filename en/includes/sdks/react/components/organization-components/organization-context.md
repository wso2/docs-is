The `OrganizationContext` component establishes a nested authentication context scoped to a child organization, enabling multi-organization access within a single React application.

## Overview

In Business-to-Business (B2B) applications, users signed in to a parent organization often need to access resources belonging to a child organization. `OrganizationContext` creates an isolated authentication context for the target organization. Each `OrganizationContext` in your application must receive a unique `instanceId` to keep the authentication contexts separate.

For a complete overview of how organizations work in Asgardeo and how to set them up, see the [organization management guide]({{base_path}}/guides/organization-management).

## Usage

Place `OrganizationContext` anywhere inside your `AsgardeoProvider` tree and wrap it with `SignedIn` to ensure the component only attempts to authenticate with the child organization after the parent session is active. Any component rendered inside `OrganizationContext` reads the child organization's session.

!!! note

    Before using `OrganizationContext`, you must share your application with the target organization in the Asgardeo Console. For a complete process on how to share applications with organizations, see the [Share applications]({{base_path}}/guides/organization-management/share-applications/) section of the organization management guide.

### Basic usage

```javascript title="main.jsx"  hl_lines="5 15-18 20"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AsgardeoProvider, OrganizationContext, OrganizationProfile, SignedIn } from '@asgardeo/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AsgardeoProvider
      clientId="<your-app-client-id>"
      baseUrl="{{content.sdkconfig.baseUrl}}"
    >
      <App />
      <SignedIn>
        <OrganizationContext
          instanceId={1}
          targetOrganizationId="<child-organization-id>"
        >
          <OrganizationProfile />
        </OrganizationContext>
      </SignedIn>
    </AsgardeoProvider>
  </StrictMode>
)
```

!!! info

    `useAsgardeo` inside `OrganizationProfile` (or any component rendered within `OrganizationContext`) returns the child organization's session, not the parent's.

## Props

| Prop                   | Type        | Required | Description                                                                                                       |
|------------------------|-------------|----------|-------------------------------------------------------------------------------------------------------------------|
| `instanceId`           | `number`    | ✅       | A unique identifier for this provider instance. Must be unique across all `AsgardeoProvider` and `OrganizationContext` instances in the application. |
| `targetOrganizationId` | `string`    | ✅       | The ID of the child organization to authenticate with.                                                            |
| `children`             | `ReactNode` | ✅       | Content to render within the child organization's authentication context.                                         |
| `clientId`             | `string`    | ❌       | The client ID of the application registered in the child organization. Defaults to the parent provider's `clientId`. |
| `baseUrl`              | `string`    | ❌       | The base URL for the child organization. Defaults to the parent provider's `baseUrl`.                            |
| `sourceInstanceId`     | `number`    | ❌       | The `instanceId` of the provider to use as the token exchange source. Defaults to the nearest parent provider.   |
| `afterSignInUrl`       | `string`    | ❌       | The URL to redirect to after sign-in. Inherited from the parent provider if not specified.                        |
| `afterSignOutUrl`      | `string`    | ❌       | The URL to redirect to after sign-out. Inherited from the parent provider if not specified.                       |
| `scopes`               | `string[]`  | ❌       | The OAuth2 scopes to request for the child organization session.                                                  |
