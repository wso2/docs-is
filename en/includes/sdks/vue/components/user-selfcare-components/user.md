The `User` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) gives your template access to the signed-in user through a scoped slot.

## Overview

`User` reads `user` from the authentication context. When a user is available, it renders its default slot and passes the user as the slot prop `user`. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one.

The user object holds the attributes of the user's {{product_name}} profile, read from the SCIM 2.0 `/scim2/Me` endpoint, for example `userName`, `name.givenName` and `emails`. If the SDK can't read the profile, the object holds the claims of the user's ID token instead.

## Usage

The following examples show how to use `User`.

### Basic usage

{% raw %}

```vue title="User example"
<script setup>
import { User } from '@asgardeo/vue'
</script>

<template>
  <User v-slot="{ user }">
    <p>Signed in as {{ user.userName }}</p>
  </User>
</template>
```

{% endraw %}

### With a fallback

When you use more than one slot, use `<template>` tags.

{% raw %}

```vue title="With fallback"
<template>
  <User>
    <template #default="{ user }">
      <p>Hello, {{ user.name?.givenName }}!</p>
    </template>
    <template #fallback>
      <p>Please sign in.</p>
    </template>
  </User>
</template>
```

{% endraw %}

## Props

`User` has no props.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ user }` | Content to render when a user is available. |
| `fallback` | — | Content to render when no user is available. |

!!! tip
    To read the user in your script, use `user` from [`useAsgardeo()`]({{base_path}}/sdks/vue/composables/use-asgardeo/), or the profile from [`useUser()`]({{base_path}}/sdks/vue/composables/use-user/).
