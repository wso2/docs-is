The `SignedIn` component conditionally renders its children only when the user is signed in using Asgardeo authentication. It provides a simple way to protect UI sections and display fallback content when the user is not authenticated.

## Overview

The `SignedIn` component checks the authentication state and renders its children if the user is signed in. If not, it renders the provided `fallback` content or nothing by default. This is useful for protecting routes or UI elements that require authentication.

## Usage

You can use the `SignedIn` component to wrap any content that should only be visible to authenticated users.

### Basic Usage

Use `SignedIn` to show content only when signed in.

```javascript title="SignedIn Example"
import { SignedIn } from '@asgardeo/react'

<SignedIn>
  <p>Welcome! You are signed in.</p>
</SignedIn>
```

!!! info "Note"

    If the user is not signed in, nothing will be rendered unless you provide a `fallback` prop.

### With Fallback

Show alternative content when the user is not signed in:

```javascript title="With Fallback"
<SignedIn fallback={<p>Please sign in to continue</p>}>
  <p>Welcome! You are signed in.</p>
</SignedIn>
```

## Props

| Prop       | Type        | Required | Description                                      |
|------------|-------------|----------|--------------------------------------------------|
| `children` | `ReactNode` | ✅       | Content to render when the user is signed in      |
| `fallback` | `ReactNode` | ❌       | Content to render when the user is not signed in  |

## Notes

- Useful for protecting routes, pages, or UI sections that require authentication.
