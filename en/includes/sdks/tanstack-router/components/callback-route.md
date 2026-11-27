The `CallbackRoute` component handles the browser's return to your app during an embedded sign-in flow and sends the user back to the page that started it, using TanStack Router's navigation.

## Overview

When the React SDK's embedded `SignIn` component needs to send the user to an external page (for example, a social identity provider), it saves the current path and a random `state` value in `sessionStorage` before redirecting. When the browser comes back, `CallbackRoute`:

1. Reads `code`, `state`, `nonce`, `error`, and `error_description` from the URL.
2. Checks that `state` matches a saved value created in the last 10 minutes, then removes the saved value.
3. Navigates back to the saved path with `code` (and `nonce`, if present) as query parameters, so the `SignIn` component on that page can continue the flow. On an error, it navigates with `error` and `error_description` query parameters instead, to the saved path or to `/` if no saved path matches the `state`.

If the page runs in a popup (`window.opener` is set), it posts the parameters to the opener window and doesn't navigate.

`CallbackRoute` wraps the React SDK's `Callback` component and passes it a navigation handler that uses `router.navigate()`. If your router has a `basepath`, `CallbackRoute` strips it from the saved path before navigating, so the user lands on the right route. It renders no UI.

!!! note

    `CallbackRoute` only processes redirects started by the SDK's embedded `SignIn` component. It isn't needed for the standard redirect-based sign-in, which `AsgardeoProvider` completes on its own.

## Usage

Add a route that renders `CallbackRoute` at the path that the sign-in flow redirects back to. All props are optional, so you can pass the component directly.

```tsx title="Register the callback route"
import { CallbackRoute } from '@asgardeo/tanstack-router';
import { createRoute } from '@tanstack/react-router';

const callbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/callback',
  component: CallbackRoute,
});
```

With file-based routing:

```tsx title="src/routes/callback.tsx"
import { CallbackRoute } from '@asgardeo/tanstack-router';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/callback')({
  component: CallbackRoute,
});
```

### Handle errors

By default, errors are logged to the console. Pass `onError` to handle them yourself. `CallbackRoute` still navigates back with the error query parameters after calling it.

```tsx title="Custom error handler"
const callbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/callback',
  component: () => <CallbackRoute onError={(error) => reportError(error)} />,
});
```

### Custom navigation

Pass `onNavigate` to take over navigation. `CallbackRoute` then calls it with the full path, including query parameters, and doesn't use `router.navigate()` or strip the `basepath`.

```tsx title="Custom navigation"
const callbackRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/callback',
  component: () => <CallbackRoute onNavigate={(path) => window.location.assign(path)} />,
});
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onError` | `(error: Error) => void` | ❌ | Logs the error with `console.error` | Called when the callback can't be processed, for example when `state` is missing, unknown, or expired, or when the URL has an `error` parameter. |
| `onNavigate` | `(path: string) => void` | ❌ | `router.navigate({ to: path })` with the `basepath` removed | Called with the path to go to instead of the default navigation. |
