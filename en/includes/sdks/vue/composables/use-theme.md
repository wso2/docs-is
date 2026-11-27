The `useTheme()` composable of the {{product_name}} Vue SDK (`@asgardeo/vue`) returns the theme that the SDK's components use, and lets you switch between light and dark mode.

## Overview

The SDK builds a theme of colors, spacing, borders and shadows, and writes it to the page as CSS custom properties with the `--asgardeo-` prefix on the `<html>` element. The SDK's components read these properties. The theme starts in light mode.

Call `useTheme()` in the `setup` of any component rendered inside `<AsgardeoProvider>`.

## Usage

{% raw %}

```vue title="src/components/ThemeToggle.vue"
<script setup>
import { useTheme } from '@asgardeo/vue'

const { colorScheme, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme()">
    Switch to {{ colorScheme === 'light' ? 'dark' : 'light' }} mode
  </button>
</template>
```

{% endraw %}

## Return value

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `colorScheme` | `Readonly<Ref<'light' or 'dark'>>` | The current color scheme. |
| `toggleTheme()` | `() => void` | Switches between light and dark mode. |
| `theme` | `Readonly<Ref<Theme>>` | The resolved theme, including its `cssVariables`. |
| `direction` | `Readonly<Ref<'ltr' or 'rtl'>>` | The text direction of the theme. The SDK also sets it as the `dir` attribute of `<html>`. |
<!-- markdownlint-enable MD056 -->

## Errors

If you call `useTheme()` in a component that isn't rendered inside `<AsgardeoProvider>`, it throws an error.
