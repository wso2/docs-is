`useBranding()` returns the branding preference of your organization, as fetched by the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

The server fetches the branding preference while it renders each page, and [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/) supplies it to `useBranding()`. When the user is acting in an organization, the server fetches that organization's branding. The module auto-imports `useBranding()`.

!!! note
    Call `useBranding()` only in components that render inside `<AsgardeoRoot>`. Otherwise, it throws an error. When `preferences.theme.inheritFromBranding` is `false`, the server doesn't fetch the branding preference and `brandingPreference` is `null`.

## Usage

{% raw %}

```vue
<script setup lang="ts">
const { brandingPreference, activeTheme } = useBranding();
</script>

<template>
  <p v-if="brandingPreference">Active branding theme: {{ activeTheme }}</p>
</template>
```

{% endraw %}

## API

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `brandingPreference` | `Readonly<Ref<BrandingPreference \| null>>` | The branding preference from {{product_name}}. |
| `theme` | `Readonly<Ref<Theme \| null>>` | The theme derived from the branding preference. |
| `activeTheme` | `Readonly<Ref<'light' \| 'dark' \| null>>` | The active theme of the branding preference. |
| `isLoading` | `Readonly<Ref<boolean>>` | Whether the branding preference is loading. |
| `error` | `Readonly<Ref<Error \| null>>` | The error from loading the branding preference, if any. |
| `fetchBranding()` | `() => Promise<void>` | Fetches the latest branding preference through `GET /api/auth/branding` and updates `brandingPreference`. |
| `refetch()` | `() => Promise<void>` | Same as `fetchBranding()`. |
<!-- markdownlint-enable MD056 -->
