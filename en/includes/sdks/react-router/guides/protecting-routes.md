This guide shows how to protect routes in a React Router v7 app with the {{product_name}} React Router SDK. It assumes you have already set up `AsgardeoProvider` by following the [{{product_name}} React quickstart]({{base_path}}/quick-starts/react/).

## Install the SDK

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

## Protect a group of routes

Instead of wrapping every protected page, create a layout route whose element is a [`ProtectedRoute`]({{base_path}}/sdks/react-router/components/protected-route/) around an `<Outlet />`. Every child route then requires a signed-in user.

The following example uses React Router's data router (`createBrowserRouter`). The same pattern works with `<BrowserRouter>` and `<Routes>`.

```tsx title="App.tsx"
import { AsgardeoProvider } from '@asgardeo/react';
import { ProtectedRoute } from '@asgardeo/react-router';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Settings from './pages/Settings';
import SignInPage from './pages/SignInPage';

const router = createBrowserRouter([
  { path: '/', element: <Home /> },
  { path: '/signin', element: <SignInPage /> },
  {
    element: (
      <ProtectedRoute redirectTo="/signin" loader={<p>Loading...</p>}>
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/settings', element: <Settings /> },
    ],
  },
]);

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

`AsgardeoProvider` must wrap `RouterProvider` so that `ProtectedRoute` can read the authentication state.

## Add the sign-in page

The route you pass to `redirectTo` is a normal page of your app. For example, show a `SignInButton` from the React SDK and send signed-in users onward:

```tsx title="pages/SignInPage.tsx"
import { SignedIn, SignedOut, SignInButton } from '@asgardeo/react';
import { Navigate } from 'react-router';

export default function SignInPage() {
  return (
    <>
      <SignedOut>
        <p>Sign in to continue.</p>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>
    </>
  );
}
```

!!! tip

    If you don't need a sign-in page, use `fallback` to show content in place of the protected route instead. See [`ProtectedRoute`]({{base_path}}/sdks/react-router/components/protected-route/) for all options.

## Handle embedded sign-in redirects

If your sign-in page uses the React SDK's embedded `SignIn` component and the flow redirects to an external page, add a [`CallbackRoute`]({{base_path}}/sdks/react-router/components/callback-route/) at the path the flow returns to:

```tsx
import { CallbackRoute } from '@asgardeo/react-router';

const router = createBrowserRouter([
  // ...other routes
  { path: '/callback', element: <CallbackRoute /> },
]);
```

## What protection covers

`ProtectedRoute` decides what to render on the client. React Router `loader` and `action` functions for a protected route still run for signed-out users, and the browser can still request your API directly. Always validate access tokens on your server or API as well. See [Accessing protected APIs]({{base_path}}/sdks/react/guides/accessing-protected-apis/).
