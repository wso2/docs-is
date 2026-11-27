The `ProtectedRoute` component renders its child only when the user is signed in with {{product_name}}. Use it in a TanStack Router route's `component` to keep signed-out users away from that route.

## Overview

`ProtectedRoute` reads the authentication state from `AsgardeoProvider` and decides what to render in this order:

1. While the SDK is still determining the authentication state, it renders `loader` (nothing by default).
2. If the user is signed in, it renders `children`.
3. If the user is signed out and you provided `fallback`, it renders `fallback`.
4. If the user is signed out and you provided `redirectTo`, it navigates to that path with TanStack Router's `<Navigate />`.
5. If you provided neither, it throws an `AsgardeoRuntimeError` with the code `ProtectedRoute-ValidationError-001`.

`fallback` takes precedence over `redirectTo` when you pass both. You must pass at least one of them.

## Usage

`ProtectedRoute` must be rendered inside both `AsgardeoProvider` and TanStack Router's `RouterProvider`.

### Redirect signed-out users

Send signed-out users to a route of your app, such as a page that renders the `SignIn` component or a `SignInButton`.

```tsx title="Redirect to a sign-in page"
import { ProtectedRoute } from '@asgardeo/tanstack-router';
import { createRoute } from '@tanstack/react-router';

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute redirectTo="/signin">
      <Dashboard />
    </ProtectedRoute>
  ),
});
```

### Show a fallback

Render content in place instead of navigating away.

```tsx title="Fallback content"
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => (
    <ProtectedRoute fallback={<p>Please sign in to view this page.</p>}>
      <AdminPanel />
    </ProtectedRoute>
  ),
});
```

### Show a loading state

While the SDK initializes, `ProtectedRoute` renders nothing unless you pass `loader`.

```tsx title="Custom loader"
const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <ProtectedRoute redirectTo="/signin" loader={<Spinner />}>
      <Dashboard />
    </ProtectedRoute>
  ),
});
```

!!! note

    The `loader` prop is a React element shown while authentication is loading. It isn't related to TanStack Router's route `loader` function.

### Protect a group of routes

Use a pathless layout route that wraps an `<Outlet />` to protect every child route with one `ProtectedRoute`.

```tsx title="Protected layout route"
import { ProtectedRoute } from '@asgardeo/tanstack-router';
import { createRoute, Outlet } from '@tanstack/react-router';

const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  component: () => (
    <ProtectedRoute redirectTo="/signin">
      <Outlet />
    </ProtectedRoute>
  ),
});

const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/dashboard',
  component: Dashboard,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  signInRoute,
  authenticatedRoute.addChildren([dashboardRoute]),
]);
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactElement` | ✅ | – | Element to render when the user is signed in. |
| `fallback` | `ReactElement` | ❌ | – | Element to render when the user is signed out. Takes precedence over `redirectTo`. |
| `redirectTo` | `string` | ❌ | – | Path to navigate to when the user is signed out and no `fallback` is set. Required if `fallback` isn't set. |
| `loader` | `ReactNode` | ❌ | `null` | Content to render while the authentication state is loading. |

## Notes

- The check runs when the route's component renders. TanStack Router `beforeLoad` and `loader` functions for the route still run for signed-out users, so protect any sensitive data on your API as well.
- Unlike the React Router SDK, this `ProtectedRoute` doesn't start sign-in on its own and has no `signInOptions` or `onSignIn` props. To start sign-in, redirect to a page that uses the React SDK's `SignInButton` or `SignIn` component, or call `signIn()` from [`useAsgardeo()`]({{base_path}}/sdks/react/hooks/use-asgardeo/).
- To protect content inside a page instead of a whole route, use the React SDK's [`SignedIn`]({{base_path}}/sdks/react/components/control-components/signed-in/) component.
