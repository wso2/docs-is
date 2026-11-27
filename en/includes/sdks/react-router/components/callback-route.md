The `CallbackRoute` component handles the browser's return to your app during an embedded sign-in flow and sends the user back to the page that started it, using React Router's navigation.

## Overview

When the React SDK's embedded `SignIn` component needs to send the user to an external page (for example, a social identity provider), it saves the current path and a random `state` value in `sessionStorage` before redirecting. When the browser comes back, `CallbackRoute`:

1. Reads `code`, `state`, `nonce`, `error`, and `error_description` from the URL.
2. Checks that `state` matches a saved value created in the last 10 minutes, then removes the saved value.
3. Navigates back to the saved path with `code` (and `nonce`, if present) as query parameters, so the `SignIn` component on that page can continue the flow. On an error, it navigates with `error` and `error_description` query parameters instead, to the saved path or to `/` if no saved path matches the `state`.

If the page runs in a popup (`window.opener` is set), it posts the parameters to the opener window and doesn't navigate.

`CallbackRoute` wraps the React SDK's `Callback` component and passes it a navigation handler that uses React Router's `navigate()`. If your router has a `basename`, `CallbackRoute` strips it from the saved path before navigating, so the user lands on the right route. It renders no UI.

!!! note

    `CallbackRoute` only processes redirects started by the SDK's embedded `SignIn` component. It isn't needed for the standard redirect-based sign-in, which `AsgardeoProvider` completes on its own.

## Usage

Add `CallbackRoute` at the path that the sign-in flow redirects back to.

```tsx title="Register the callback route"
import { CallbackRoute } from '@asgardeo/react-router';
import { Route, Routes } from 'react-router';

<Routes>
  <Route path="/signin" element={<SignInPage />} />
  <Route path="/callback" element={<CallbackRoute />} />
</Routes>
```

### Handle errors

By default, errors are logged to the console. Pass `onError` to handle them yourself. `CallbackRoute` still navigates back with the error query parameters after calling it.

```tsx title="Custom error handler"
<Route
  path="/callback"
  element={<CallbackRoute onError={(error) => reportError(error)} />}
/>
```

### Custom navigation

Pass `onNavigate` to take over navigation. `CallbackRoute` then calls it with the full path, including query parameters, and doesn't use React Router's `navigate()` or strip the `basename`.

```tsx title="Custom navigation"
<Route
  path="/callback"
  element={<CallbackRoute onNavigate={(path) => window.location.assign(path)} />}
/>
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `onError` | `(error: Error) => void` | ❌ | Logs the error with `console.error` | Called when the callback can't be processed, for example when `state` is missing, unknown, or expired, or when the URL has an `error` parameter. |
| `onNavigate` | `(path: string) => void` | ❌ | React Router `navigate()` with the `basename` removed | Called with the path to go to instead of the default navigation. |
