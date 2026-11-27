The {{product_name}} React Router SDK (`@asgardeo/react-router`) is an add-on for the [{{product_name}} React SDK]({{base_path}}/sdks/react/overview/) (`@asgardeo/react`). It adds components that connect {{product_name}} authentication to [React Router](https://reactrouter.com/){:target="_blank"}, so you can protect routes and handle sign-in callbacks with React Router's own navigation.

The package doesn't replace the React SDK. You still configure authentication with `AsgardeoProvider` from `@asgardeo/react`, and the components in this package read the authentication state from it.

## Installation

Install the React Router SDK together with its peer dependencies: the {{product_name}} React SDK and React Router.

=== "npm"

    ```bash
    npm install @asgardeo/react-router @asgardeo/react react-router
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/react-router @asgardeo/react react-router
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/react-router @asgardeo/react react-router
    ```

The package declares the following peer dependency ranges:

| Package | Version |
|---------|---------|
| `@asgardeo/react` | `>=0.15.0` |
| `react` | `>=16.8.0` |
| `react-router` | `>=6.30.1` |

!!! note

    The examples in these docs use React Router v7, where everything is imported from `react-router`. If you use React Router v6, import the router components (such as `BrowserRouter`, `Routes`, and `Route`) from `react-router-dom` as usual.

## Getting started

If you haven't set up the React SDK yet, follow the [{{product_name}} React quickstart]({{base_path}}/quick-starts/react/) first, and see the [React SDK documentation]({{base_path}}/sdks/react/overview/) for configuring `AsgardeoProvider`. Then render your React Router setup inside `AsgardeoProvider`:

```tsx title="App.tsx"
import { AsgardeoProvider } from '@asgardeo/react';
import { ProtectedRoute } from '@asgardeo/react-router';
import { BrowserRouter, Route, Routes } from 'react-router';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import SignInPage from './pages/SignInPage';

export default function App() {
  return (
    <AsgardeoProvider
      baseUrl="https://api.asgardeo.io/t/<your-org>"
      clientId="<your-client-id>"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute redirectTo="/signin">
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AsgardeoProvider>
  );
}
```

## Components

- **[`ProtectedRoute`]({{base_path}}/sdks/react-router/components/protected-route/)** – Renders a route's content only when the user is signed in. Otherwise it renders a fallback, redirects, or starts sign-in.
- **[`CallbackRoute`]({{base_path}}/sdks/react-router/components/callback-route/)** – Handles the redirect back to your app during an embedded sign-in flow and navigates to the original page using React Router.

## Guides

- **[Protecting routes]({{base_path}}/sdks/react-router/guides/protecting-routes/)** – Protect single routes and whole route groups, and show a loading state while the SDK initializes.
