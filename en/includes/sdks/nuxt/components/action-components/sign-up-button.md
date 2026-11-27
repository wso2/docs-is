`<AsgardeoSignUpButton>` renders a button that starts the sign-up flow of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

When the user clicks the button:

- If you set `signUpUrl` (or `NUXT_PUBLIC_ASGARDEO_SIGN_UP_URL`), the button navigates to that URL. Use this to send users to a page in your app that renders [`<AsgardeoSignUp>`]({{base_path}}/sdks/nuxt/components/authentication/sign-up/), or to any other registration page.
- Otherwise, the button navigates to the {{product_name}} self-registration page. The SDK builds its URL from `baseUrl`, `clientId`, and `applicationId`. If the SDK can't build that URL from `baseUrl`, the button navigates to the `/sign-up` page of your app.

The button shows a loading state while it navigates.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<template>
  <AsgardeoSignedOut>
    <AsgardeoSignInButton />
    <AsgardeoSignUpButton />
  </AsgardeoSignedOut>
</template>
```

Without slot content, the button shows the text **Sign Up**.

### Custom content

{% raw %}

```vue
<template>
  <AsgardeoSignUpButton class="btn btn-primary">
    <template #default="{ isLoading }">
      {{ isLoading ? 'Opening…' : 'Create an account' }}
    </template>
  </AsgardeoSignUpButton>
</template>
```

{% endraw %}

## Props

`<AsgardeoSignUpButton>` has no props. The `class` and `style` attributes are applied to the button.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ isLoading: boolean }` | Button content. Defaults to **Sign Up**. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Emitted after the button starts the navigation. |
| `error` | `unknown` | Emitted when starting sign-up fails. |
