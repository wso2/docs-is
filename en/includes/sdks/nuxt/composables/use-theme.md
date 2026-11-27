`useTheme()` returns the theme that the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) applies to its components, and a method that toggles the color scheme.

## Overview

[`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/) builds the theme from two module options:

- `preferences.theme.mode` sets the color scheme. It defaults to `'light'`.
- `preferences.theme.inheritFromBranding` applies the branding preference of your organization to the theme. It defaults to `true`.

See [Module configuration]({{base_path}}/sdks/nuxt/configuration/module-configuration/#preferences). The module auto-imports `useTheme()`.

!!! note
    Call `useTheme()` only in components that render inside `<AsgardeoRoot>`. Otherwise, it throws an error.

## Usage

{% raw %}

```vue
<script setup lang="ts">
const { colorScheme, toggleTheme } = useTheme();
</script>

<template>
  <button @click="toggleTheme">
    Switch to {{ colorScheme === 'light' ? 'dark' : 'light' }} mode
  </button>
</template>
```

{% endraw %}

## API

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `theme` | `Readonly<Ref<Theme>>` | The resolved theme that the SDK's components use. |
| `colorScheme` | `Readonly<Ref<'light' \| 'dark'>>` | The current color scheme. |
| `direction` | `Readonly<Ref<'ltr' \| 'rtl'>>` | The text direction of the UI. |
| `inheritFromBranding` | `boolean` | Whether the theme inherits from the branding preference. |
| `isBrandingLoading` | `Readonly<Ref<boolean>>` | Whether the branding theme is loading. |
| `brandingError` | `Readonly<Ref<Error \| null>>` | The error from loading the branding theme, if any. |
| `toggleTheme()` | `() => void` | Toggles the color scheme between light and dark. |
<!-- markdownlint-enable MD056 -->
