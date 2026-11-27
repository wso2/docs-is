`<AsgardeoUserProfile>` displays the signed-in user's profile and lets the user edit it, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoUserProfile>` reads the profile, its SCIM2 schemas, and `updateProfile()` from [`useUser()`]({{base_path}}/sdks/nuxt/composables/use-user/). The server fetches the profile while it renders the page. When the user saves a change, the component sends it to `PATCH /api/auth/user/profile` and updates the displayed profile.

!!! note
    `<AsgardeoUserProfile>` must render inside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/). It needs `preferences.user.fetchUserProfile` to be `true`, which is the default.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<template>
  <AsgardeoSignedIn>
    <AsgardeoUserProfile />
  </AsgardeoSignedIn>
</template>
```

### Read-only profile with selected fields

```vue
<template>
  <AsgardeoUserProfile
    title="My account"
    :editable="false"
    :show-fields="['name.givenName', 'name.familyName', 'emails']"
  />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Profile'` | Title of the profile card. |
| `editable` | `boolean` | `true` | Whether the user can edit the fields. |
| `cardLayout` | `boolean` | `true` | Whether to render the profile in a card. |
| `showFields` | `string[]` | `[]` | SCIM2 attribute names to show, such as `name.givenName`. When empty, all fields are shown. |
| `hideFields` | `string[]` | `[]` | SCIM2 attribute names to hide. |
| `className` | `string` | `''` | CSS class for the root element. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ profile, isLoading, error }` | Replaces the built-in profile view. |
| `footer` | – | Content to render below the profile. |
