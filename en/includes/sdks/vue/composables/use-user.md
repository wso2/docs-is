The `useUser()` composable of the {{product_name}} Vue SDK (`@asgardeo/vue`) returns the signed-in user's profile, as read from {{product_name}}.

## Overview

After sign-in, `<AsgardeoProvider>` reads the user's profile from the SCIM 2.0 `/scim2/Me` endpoint, and the schemas that describe its attributes. `useUser()` gives you this data as read-only refs. If the SDK can't read the profile, it uses the claims of the ID token instead and the schema list is empty.

Call `useUser()` in the `setup` of any component rendered inside `<AsgardeoProvider>`.

## Usage

{% raw %}

```vue title="src/components/ProfileSummary.vue"
<script setup>
import { useUser } from '@asgardeo/vue'

const { flattenedProfile, revalidateProfile } = useUser()
</script>

<template>
  <div v-if="flattenedProfile">
    <p>Username: {{ flattenedProfile.userName }}</p>
    <p>First name: {{ flattenedProfile['name.givenName'] }}</p>
    <button @click="revalidateProfile()">Refresh</button>
  </div>
</template>
```

{% endraw %}

## Return value

| Property | Type | Description |
|----------|------|-------------|
| `profile` | `Readonly<Ref<UserProfile>>` | The full profile object, with three properties: `profile` (the user as returned by {{product_name}}), `flattenedProfile` and `schemas`. `null` until the profile loads. |
| `flattenedProfile` | `Readonly<Ref<User>>` | The user's attributes as a flat map, with sub-attributes joined by a dot, for example `name.givenName`. `null` until the profile loads. |
| `schemas` | `Readonly<Ref<Schema[]>>` | The SCIM 2.0 attribute definitions of the profile, with sub-attributes flattened. `null` until the profile loads. |
| `revalidateProfile()` | `() => Promise<void>` | Reads the profile from {{product_name}} again. |

To edit the profile, use the [`<UserProfile>`]({{base_path}}/sdks/vue/components/user-selfcare-components/user-profile/) component.

## Errors

If you call `useUser()` in a component that isn't rendered inside `<AsgardeoProvider>`, it throws an error.
