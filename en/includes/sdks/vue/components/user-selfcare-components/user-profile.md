The `UserProfile` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) displays the signed-in user's profile and lets them edit it.

## Overview

`UserProfile` shows the attributes of the user's {{product_name}} profile, using the profile schemas to label each field. When `editable` is `true`, users can edit fields inline. The component saves changes to {{product_name}} through the SCIM 2.0 `/scim2/Me` endpoint, updates the profile in the SDK and shows an error if the update fails.

## Usage

The following examples show how to use `UserProfile`.

### Basic usage

```vue title="UserProfile example"
<script setup>
import { SignedIn, UserProfile } from '@asgardeo/vue'
</script>

<template>
  <SignedIn>
    <UserProfile />
  </SignedIn>
</template>
```

### Read-only profile with selected fields

```vue title="Read-only profile"
<template>
  <UserProfile
    :editable="false"
    :show-fields="['name.givenName', 'name.familyName', 'emails']"
    card-variant="outlined"
    title="My profile"
  />
</template>
```

### Custom UI

Use the default slot to render the profile yourself. The slot replaces the built-in UI.

{% raw %}

```vue title="Custom profile"
<template>
  <UserProfile v-slot="{ profile }">
    <div v-if="profile">
      <h2>{{ profile.userName }}</h2>
    </div>
  </UserProfile>
</template>
```

{% endraw %}

## Props

<!-- markdownlint-disable MD056 -->
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ❌ | Title shown at the top of the profile. Defaults to `'Profile'`. |
| `editable` | `boolean` | ❌ | Whether users can edit fields. Defaults to `true`. |
| `showFields` | `string[]` | ❌ | Names of the only fields to show. Use SCIM attribute names, with sub-attributes joined by a dot, for example `name.givenName`. Defaults to `[]`, which shows all fields. |
| `hideFields` | `string[]` | ❌ | Names of fields to hide, in the same format as `showFields`. Defaults to `[]`. |
| `showAvatar` | `boolean` | ❌ | Whether to show the avatar section. Defaults to `true`. |
| `avatarSize` | `'sm'`, `'md'` or `'lg'` | ❌ | Size of the avatar. Defaults to `'lg'`. |
| `cardLayout` | `boolean` | ❌ | Whether to wrap the profile in a card. Defaults to `true`. |
| `cardVariant` | `'elevated'`, `'outlined'` or `'flat'` | ❌ | Style of the card. Defaults to `'elevated'`. |
| `compact` | `boolean` | ❌ | Uses tighter spacing, for example inside a modal. Defaults to `false`. |
| `className` | `string` | ❌ | CSS class to add to the root element. |
<!-- markdownlint-enable MD056 -->

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ profile, error, isLoading }` | Replaces the built-in UI. `profile` is the flattened user profile, or `null` if none is available. `error` is the last update error message. |
| `footer` | — | Content to render at the bottom of the built-in UI. |
