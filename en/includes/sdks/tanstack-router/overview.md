The {{product_name}} TanStack Router SDK (`@asgardeo/tanstack-router`) is an add-on for the [{{product_name}} React SDK]({{base_path}}/sdks/react/overview/) (`@asgardeo/react`). It adds components that connect {{product_name}} authentication to [TanStack Router](https://tanstack.com/router/latest){:target="_blank"}, so you can protect routes and handle sign-in callbacks with TanStack Router's own navigation.

The package doesn't replace the React SDK. You still configure authentication with `AsgardeoProvider` from `@asgardeo/react`, and the components in this package read the authentication state from it.

## Installation

Install the TanStack Router SDK together with its peer dependencies: the {{product_name}} React SDK and TanStack Router.

=== "npm"

    ```bash
    npm install @asgardeo/tanstack-router @asgardeo/react @tanstack/react-router
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/tanstack-router @asgardeo/react @tanstack/react-router
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/tanstack-router @asgardeo/react @tanstack/react-router
    ```

The package declares the following peer dependency ranges:

| Package | Version |
|---------|---------|
| `@asgardeo/react` | `>=0.15.0` |
| `@tanstack/react-router` | `>=1.134.4` |
| `react` | `>=16.8.0` |

## Getting started

If you haven't set up the React SDK yet, follow the [{{product_name}} React quickstart]({{base_path}}/quick-starts/react/) first, and see the [React SDK documentation]({{base_path}}/sdks/react/overview/) for configuring `AsgardeoProvider`. Then render `RouterProvider` inside `AsgardeoProvider`:

```tsx title="App.tsx"
import { AsgardeoProvider } from '@asgardeo/react';
import { ProtectedRoute } from '@asgardeo/tanstack-router';
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from '@tanstack/react-router';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';

const rootRoute = createRootRoute({ component: () => <Outlet /> });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: Home,
});

const signInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signin',
  component: SignInPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute redirectTo="/signin">
      <Dashboard />
    </ProtectedRoute>
  ),
});

const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, signInRoute, dashboardRoute]),
});

export default function App() {
  return (
    <AsgardeoProvider
      baseUrl="https://api.asgardeo.io/t/<your-org>"
      clientId="<your-client-id>"
    >
      <RouterProvider router={router} />
    </AsgardeoProvider>
  );
}
```

## Components

- **[`ProtectedRoute`]({{base_path}}/sdks/tanstack-router/components/protected-route/)** – Renders a route's content only when the user is signed in. Otherwise it renders a fallback or redirects.
- **[`CallbackRoute`]({{base_path}}/sdks/tanstack-router/components/callback-route/)** – Handles the redirect back to your app during an embedded sign-in flow and navigates to the original page using TanStack Router.

## Guides

- **[Protecting routes]({{base_path}}/sdks/tanstack-router/guides/protecting-routes/)** – Protect single routes and whole route groups with code-based or file-based routing.
