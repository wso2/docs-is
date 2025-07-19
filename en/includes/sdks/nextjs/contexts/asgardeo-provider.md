The `AsgardeoProvider` is the root context provider component that configures the `@asgardeo/nextjs` and provides authentication context to your entire Next.js application. It must wrap your application to enable authentication features.

## Overview

The `AsgardeoProvider` initializes the Asgardeo authentication client, manages authentication state, and provides context to child components through React Context. It handles token management, user sessions, organization switching, and branding preferences automatically.

## Usage

The `AsgardeoProvider` must be used at the root of your Next.js application to ensure that all components have access to authentication features.

### Basic Usage

A minimal setup involves wrapping your root component with the `AsgardeoProvider` and providing the necessary `clientId` and `baseUrl` props.

```javascript title="src/pages/_app.jsx" hl_lines="5 9-12 14"
import { AsgardeoProvider } from '@asgardeo/nextjs';
import App from './App';

export default function MyApp({ Component, pageProps }) {
  return (
    <AsgardeoProvider clientId="<your-app-client-id>" baseUrl="{{content.sdkconfig.baseUrl}}">
      <Component {...pageProps} />
    </AsgardeoProvider>
  );
}
```

### Advanced Usage

For more advanced configurations, you can provide additional props such as:

- `scopes`: Specifies the OpenID Connect scopes to request during sign-in.
- `afterSignInUrl`: URL to redirect to after successful sign-in.
- `afterSignOutUrl`: URL to redirect to after sign-out.
- `preferences`: Customization options for UI behavior, theming, and internationalization (i18n).
- etc.

For a complete list of props, refer to the [Props section](#props) below.

```javascript title="src/pages/_app.jsx"  hl_lines="12-41"
import { AsgardeoProvider } from '@asgardeo/nextjs';
import App from './App';

export default function MyApp({ Component, pageProps }) {
  return (
    <AsgardeoProvider
      clientId="<your-app-client-id>"
      baseUrl="{{content.sdkconfig.baseUrl}}"
      scopes="openid profile internal_login internal_organization_create internal_organization_view internal_organization_update internal_organization_delete"
      afterSignInUrl="/dashboard"
      afterSignOutUrl="/home"
      // ...other props
    >
      <Component {...pageProps} />
    </AsgardeoProvider>
  );
}
```
