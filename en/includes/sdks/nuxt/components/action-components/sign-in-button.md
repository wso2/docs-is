`<AsgardeoSignInButton>` renders a button that starts the sign-in flow of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

When the user clicks the button:

- If you set `signInUrl` (or `NUXT_PUBLIC_ASGARDEO_SIGN_IN_URL`), the button navigates to that URL. Use this to send users to a page in your app that renders [`<AsgardeoSignIn>`]({{base_path}}/sdks/nuxt/components/authentication/sign-in/).
- Otherwise, the button navigates to `/api/auth/signin`, which redirects the browser to the {{product_name}} sign-in page. After sign-in, the user returns to the `returnTo` path, if you set one, or to `afterSignInUrl`.

The button shows a loading state while it navigates.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue title="components/AppHeader.vue"
<template>
  <AsgardeoSignInButton />
</template>
```

Without slot content, the button shows the text **Sign In**.

### Custom content

{% raw %}

```vue
<template>
  <AsgardeoSignInButton class="btn btn-primary">
    <template #default="{ isLoading }">
      {{ isLoading ? 'Redirecting…' : 'Log in' }}
    </template>
  </AsgardeoSignInButton>
</template>
```

{% endraw %}

### Return to a specific page

Pass a `returnTo` path in `signInOptions` to bring the user back to that page after sign-in.

```vue
<template>
  <AsgardeoSignInButton :sign-in-options="{ returnTo: '/dashboard' }" />
</template>
```

!!! note
    `returnTo` must be a relative path that starts with a single `/`. The server ignores any other value and uses `afterSignInUrl` instead. `signInOptions` has no effect when `signInUrl` is set.

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `signInOptions` | `Record<string, any>` | No | Options for the redirect sign-in flow. The SDK reads `returnTo` from it. |

The `class` and `style` attributes are applied to the button.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ isLoading: boolean }` | Button content. Defaults to **Sign In**. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted after the button starts the navigation. |
| `error` | `unknown` | Emitted when starting the sign-in fails. |
