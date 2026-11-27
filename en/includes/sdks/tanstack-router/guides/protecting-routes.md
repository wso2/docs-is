This guide shows how to protect routes in a TanStack Router app with the {{product_name}} TanStack Router SDK, using either code-based or file-based routing. It assumes you have already set up `AsgardeoProvider` by following the [{{product_name}} React quickstart]({{base_path}}/quick-starts/react/).

## Install the SDK

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

## Provide authentication to the router

`AsgardeoProvider` must wrap `RouterProvider` so that `ProtectedRoute` can read the authentication state.

```tsx title="main.tsx"
import { AsgardeoProvider } from '@asgardeo/react';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { createRoot } from 'react-dom/client';
import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

createRoot(document.getElementById('root')!).render(
  <AsgardeoProvider
    baseUrl="https://api.asgardeo.io/t/<your-org>"
    clientId="<your-client-id>"
  >
    <RouterProvider router={router} />
  </AsgardeoProvider>,
);
```

With code-based routing, build `routeTree` with `rootRoute.addChildren([...])` instead of importing the generated file.

## Protect a group of routes

Instead of wrapping every protected page, create a pathless layout route whose component is a [`ProtectedRoute`]({{base_path}}/sdks/tanstack-router/components/protected-route/) around an `<Outlet />`. Every child route then requires a signed-in user.

=== "File-based routing"

    ```tsx title="src/routes/_authenticated.tsx"
    import { ProtectedRoute } from '@asgardeo/tanstack-router';
    import { createFileRoute, Outlet } from '@tanstack/react-router';

    export const Route = createFileRoute('/_authenticated')({
      component: () => (
        <ProtectedRoute redirectTo="/signin" loader={<p>Loading...</p>}>
          <Outlet />
        </ProtectedRoute>
      ),
    });
    ```

    Put protected pages under `src/routes/_authenticated/`, for example `src/routes/_authenticated/dashboard.tsx` for `/dashboard`.

=== "Code-based routing"

    ```tsx title="routes.tsx"
    import { ProtectedRoute } from '@asgardeo/tanstack-router';
    import { createRootRoute, createRoute, Outlet } from '@tanstack/react-router';
    import Dashboard from './pages/Dashboard';
    import Home from './pages/Home';
    import Settings from './pages/Settings';
    import SignInPage from './pages/SignInPage';

    const rootRoute = createRootRoute({ component: () => <Outlet /> });

    const indexRoute = createRoute({ getParentRoute: () => rootRoute, path: '/', component: Home });
    const signInRoute = createRoute({ getParentRoute: () => rootRoute, path: '/signin', component: SignInPage });

    const authenticatedRoute = createRoute({
      getParentRoute: () => rootRoute,
      id: 'authenticated',
      component: () => (
        <ProtectedRoute redirectTo="/signin" loader={<p>Loading...</p>}>
          <Outlet />
        </ProtectedRoute>
      ),
    });

    const dashboardRoute = createRoute({ getParentRoute: () => authenticatedRoute, path: '/dashboard', component: Dashboard });
    const settingsRoute = createRoute({ getParentRoute: () => authenticatedRoute, path: '/settings', component: Settings });

    export const routeTree = rootRoute.addChildren([
      indexRoute,
      signInRoute,
      authenticatedRoute.addChildren([dashboardRoute, settingsRoute]),
    ]);
    ```

## Add the sign-in page

`ProtectedRoute` in this package doesn't start sign-in itself, so give `redirectTo` a page that does. For example, show a `SignInButton` from the React SDK and send signed-in users onward:

```tsx title="SignInPage.tsx"
import { SignedIn, SignedOut, SignInButton } from '@asgardeo/react';
import { Navigate } from '@tanstack/react-router';

export default function SignInPage() {
  return (
    <>
      <SignedOut>
        <p>Sign in to continue.</p>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <Navigate to="/dashboard" />
      </SignedIn>
    </>
  );
}
```

!!! tip

    If you don't need a sign-in page, use `fallback` to show content in place of the protected route instead. See [`ProtectedRoute`]({{base_path}}/sdks/tanstack-router/components/protected-route/) for all options.

## Handle embedded sign-in redirects

If your sign-in page uses the React SDK's embedded `SignIn` component and the flow redirects to an external page, add a [`CallbackRoute`]({{base_path}}/sdks/tanstack-router/components/callback-route/) at the path the flow returns to:

```tsx title="src/routes/callback.tsx"
import { CallbackRoute } from '@asgardeo/tanstack-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/callback')({
  component: CallbackRoute,
});
```

## What protection covers

`ProtectedRoute` decides what to render on the client. A protected route's `beforeLoad` and `loader` functions still run for signed-out users, and the browser can still request your API directly. Always validate access tokens on your server or API as well. See [Accessing protected APIs]({{base_path}}/sdks/react/guides/accessing-protected-apis/).
