The `SignedOut` component conditionally renders its children only when the user is signed out using Asgardeo authentication. It provides a simple way to show UI sections for unauthenticated users and display fallback content when the user is signed in.

## Overview

The `SignedOut` component checks the authentication state and renders its children if the user is signed out. If the user is signed in, it renders the provided `fallback` content or nothing by default. This is useful for showing sign-in prompts or public content.

## Usage

You can use the `SignedOut` component to wrap any content that should only be visible to unauthenticated users.

### Basic Usage

Use `SignedOut` to show content only when signed out.

```javascript title="SignedOut Example"
import { SignedOut } from '@asgardeo/react'

<SignedOut>
  <p>Please sign in to continue</p>
</SignedOut>
```

!!! info "Note"

    If the user is signed in, nothing will be rendered unless you provide a `fallback` prop.

### With Fallback

Show alternative content when the user is signed in:

```javascript title="With Fallback"
<SignedOut fallback={<p>You are already signed in</p>}>
  <p>Please sign in to continue</p>
</SignedOut>
```

## Props

| Prop       | Type        | Required | Description                                      |
|------------|-------------|----------|--------------------------------------------------|
| `children` | `ReactNode` | ✅       | Content to render when the user is signed out     |
| `fallback` | `ReactNode` | ❌       | Content to render when the user is signed in      |

## Notes

- Useful for showing sign-in prompts, public pages, or UI elements for unauthenticated users.
