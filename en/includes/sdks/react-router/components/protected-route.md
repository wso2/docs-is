The `ProtectedRoute` component renders its child only when the user is signed in with {{product_name}}. Use it as the `element` of a React Router route to keep signed-out users away from that route.

## Overview

`ProtectedRoute` reads the authentication state from `AsgardeoProvider` and decides what to render in this order:

1. While the SDK is still determining the authentication state, it renders `loader` (nothing by default).
2. If the user is signed in, it renders `children`.
3. If the user is signed out and you provided `fallback`, it renders `fallback`.
4. If the user is signed out and you provided `redirectTo`, it navigates to that path with React Router's `<Navigate replace />`, so the protected URL doesn't stay in the browser history.
5. If you provided neither, it starts sign-in. See [Sign in without a redirect or fallback](#sign-in-without-a-redirect-or-fallback).

`fallback` takes precedence over `redirectTo` when you pass both.

## Usage

`ProtectedRoute` must be rendered inside both `AsgardeoProvider` and a React Router router.

### Redirect signed-out users

Send signed-out users to a route of your app, such as a page that renders the `SignIn` component or a `SignInButton`.

```tsx title="Redirect to a sign-in page"
import { ProtectedRoute } from '@asgardeo/react-router';
import { Route } from 'react-router';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute redirectTo="/signin">
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

### Show a fallback

Render content in place instead of navigating away.

```tsx title="Fallback content"
<Route
  path="/admin"
  element={
    <ProtectedRoute fallback={<p>Please sign in to view this page.</p>}>
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

### Show a loading state

While the SDK initializes, `ProtectedRoute` renders nothing unless you pass `loader`.

```tsx title="Custom loader"
<Route
  path="/dashboard"
  element={
    <ProtectedRoute redirectTo="/signin" loader={<Spinner />}>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

!!! note

    The `loader` prop is a React element shown while authentication is loading. It isn't related to React Router's route `loader` data function.

### Protect a group of routes

Wrap an `<Outlet />` in a layout route to protect every child route with one `ProtectedRoute`.

```tsx title="Protected layout route"
import { ProtectedRoute } from '@asgardeo/react-router';
import { Outlet, Route, Routes } from 'react-router';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/signin" element={<SignInPage />} />
  <Route
    element={
      <ProtectedRoute redirectTo="/signin">
        <Outlet />
      </ProtectedRoute>
    }
  >
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/settings" element={<Settings />} />
  </Route>
</Routes>
```

### Sign in without a redirect or fallback

If you pass neither `fallback` nor `redirectTo`, `ProtectedRoute` starts sign-in once for signed-out users and renders `loader` until the browser leaves the page. The sign-in options are the provider's `signInOptions` merged with this component's `signInOptions` prop, which take precedence.

- If `signInUrl` is set on `AsgardeoProvider`, it navigates to that URL.
- Otherwise, if you passed `onSignIn`, it calls `onSignIn(signIn, signInOptions)`, where `signIn` is the SDK's sign-in method and `signInOptions` are the merged options.
- Otherwise, it calls `signIn(signInOptions)` with the merged options.

{% raw %}

```tsx title="Sign in with extra authorize parameters"
<Route
  path="/secure"
  element={
    <ProtectedRoute signInOptions={{ prompt: 'login' }}>
      <SecureContent />
    </ProtectedRoute>
  }
/>
```

{% endraw %}

{% raw %}

```tsx title="Custom sign-in handler"
<Route
  path="/secure"
  element={
    <ProtectedRoute
      onSignIn={(signIn, options) => {
        signIn({ ...options, login_hint: 'user@example.com' });
      }}
      signInOptions={{ prompt: 'login' }}
    >
      <SecureContent />
    </ProtectedRoute>
  }
/>
```

{% endraw %}

!!! note

    If `signIn()` fails, `ProtectedRoute` throws an `AsgardeoRuntimeError` with the code `ProtectedRoute-SignInError-001` during render, so the error reaches the nearest error boundary, such as a data router's route `ErrorBoundary`.

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactElement` | ✅ | – | Element to render when the user is signed in. |
| `fallback` | `ReactElement` | ❌ | – | Element to render when the user is signed out. Takes precedence over `redirectTo`. |
| `redirectTo` | `string` | ❌ | – | Path to navigate to, with `replace`, when the user is signed out and no `fallback` is set. |
| `loader` | `ReactNode` | ❌ | `null` | Content to render while the authentication state is loading. |
| `signInOptions` | `Record<string, any>` | ❌ | – | Authorize request parameters (for example, `prompt`, `fidp`, `login_hint`, `max_age`, `ui_locales`) used when the component starts sign-in, merged over the provider's `signInOptions`. Applies only when neither `fallback` nor `redirectTo` is set. |
| `onSignIn` | `(defaultSignIn: (options?: Record<string, any>) => void, signInOptions?: Record<string, any>) => void` | ❌ | – | Replaces the default sign-in call. Receives the SDK's `signIn` method and the merged sign-in options. Applies only when neither `fallback` nor `redirectTo` is set and `signInUrl` isn't set on `AsgardeoProvider`. |

## Notes

- The check runs when the route renders. React Router data loaders and actions for the route still run for signed-out users, so protect any sensitive data on your API as well.
- To protect content inside a page instead of a whole route, use the React SDK's [`SignedIn`]({{base_path}}/sdks/react/components/control-components/signed-in/) component.
