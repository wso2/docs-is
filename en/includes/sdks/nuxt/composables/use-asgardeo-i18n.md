`useAsgardeoI18n()` returns the translation function and language settings of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) UI.

## Overview

`useAsgardeoI18n()` is the `useI18n()` composable of `@asgardeo/vue`. The module auto-imports it as `useAsgardeoI18n` so that it doesn't collide with `useI18n()` from `@nuxtjs/i18n`.

[`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/) configures it with the `preferences.i18n` module option. See [Module configuration]({{base_path}}/sdks/nuxt/configuration/module-configuration/#preferences).

!!! note
    Call `useAsgardeoI18n()` only in components that render inside `<AsgardeoRoot>`. Otherwise, it throws an error.

## Usage

{% raw %}

```vue
<script setup lang="ts">
const { t, currentLanguage, setLanguage } = useAsgardeoI18n();
</script>

<template>
  <p>{{ t('signin.heading') }} ({{ currentLanguage }})</p>
  <button @click="setLanguage('fr-FR')">Français</button>
</template>
```

{% endraw %}

## API

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `t(key, params?)` | `(key: string, params?: Record<string, string \| number>) => string` | Translates a key, with optional named parameters. |
| `currentLanguage` | `Readonly<Ref<string>>` | The current language code, for example `'en-US'`. |
| `fallbackLanguage` | `string` | The language used when a translation is missing. |
| `bundles` | `Readonly<Ref<Record<string, I18nBundle>>>` | All available translation bundles. |
| `setLanguage(language)` | `(language: string) => void` | Changes the current language. |
| `injectBundles(bundles)` | `(bundles: Record<string, I18nBundle>) => void` | Adds translation bundles. Injected bundles override the defaults, and bundles from `preferences.i18n.bundles` override injected bundles. |
<!-- markdownlint-enable MD056 -->
