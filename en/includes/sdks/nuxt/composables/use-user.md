`useUser()` returns the signed-in user's SCIM2 profile and methods that update and refresh it, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

The server fetches the profile from {{product_name}} while it renders the page, and [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/) supplies it to `useUser()`. The module auto-imports `useUser()`.

!!! note
    Call `useUser()` only in components that render inside `<AsgardeoRoot>`. Otherwise, it throws an error. When `preferences.user.fetchUserProfile` is `false`, the profile values are `null` and `updateProfile()` returns an unsuccessful result.

## Usage

{% raw %}

```vue
<script setup lang="ts">
const { flattenedProfile, updateProfile } = useUser();

const changeNickname = async () => {
  const result = await updateProfile({
    payload: { nickName: 'Ace' },
  });

  if (!result.success) {
    console.error(result.error);
  }
};
</script>

<template>
  <p>Email: {{ flattenedProfile?.emails }}</p>
  <button @click="changeNickname">Change nickname</button>
</template>
```

{% endraw %}

## API

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `profile` | `Readonly<Ref<UserProfile \| null>>` | The user profile from the SCIM2 `/Me` endpoint. |
| `flattenedProfile` | `Readonly<Ref<User \| null>>` | The profile flattened into a map of attribute names to values. |
| `schemas` | `Readonly<Ref<Schema[] \| null>>` | The SCIM2 schemas that describe the profile attributes. |
| `updateProfile(requestConfig)` | `(requestConfig: UpdateMeProfileConfig) => Promise<{ data: { user: User }; error: string; success: boolean }>` | Updates the profile through `PATCH /api/auth/user/profile`. The server sends `requestConfig.payload` to the SCIM2 `/Me` endpoint as the value of a `replace` operation. On success, it updates `profile`, `flattenedProfile`, and `useAsgardeo().user`. |
| `revalidateProfile()` | `() => Promise<void>` | Fetches the profile again from `GET /api/auth/user/profile`. |
| `onUpdateProfile(user)` | `(user: User) => void` | Updates the local profile state with the given user. `updateProfile()` calls this for you. |
<!-- markdownlint-enable MD056 -->
