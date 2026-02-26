The `Loading` component conditionally renders its children only when the Asgardeo authentication context is in a loading state. It provides a simple way to show loading indicators or fallback content while authentication or related operations are in progress.

## Overview

The `Loading` component checks the authentication loading state and renders its children if the app is currently loading. If not, it renders the provided `fallback` content or nothing by default. This is useful for displaying loading spinners, skeletons, or custom messages during authentication transitions.

## Usage

You can use the `Loading` component to wrap any content that should only be visible while loading.

### Basic Usage

Use `Loading` to show content only when loading.

```javascript title="Loading Example"
import { Loading } from '@asgardeo/react'

<Loading>
  <p>Loading...</p>
</Loading>
```

!!! info "Note"

    If the app is not loading, nothing will be rendered unless you provide a `fallback` prop.

### With Fallback

Show alternative content when not loading:

```javascript title="With Fallback"
<Loading fallback={<p>Finished Loading...</p>}>
  <p>Loading...</p>
</Loading>
```

## Props

| Prop       | Type        | Required | Description                                      |
|------------|-------------|----------|--------------------------------------------------|
| `children` | `ReactNode` | ✅       | Content to render when loading                   |
| `fallback` | `ReactNode` | ❌       | Content to render when not loading               |

## Notes

- Useful for showing loading indicators, skeletons, or custom messages during authentication or data fetching.
