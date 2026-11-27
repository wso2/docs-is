The `useI18n()` composable of the {{product_name}} Vue SDK (`@asgardeo/vue`) returns the language state of the SDK and a translation function. The SDK's `<SignIn>` and `<SignUp>` components, the social sign-in buttons and the error messages of `<UserProfile>` use these translations.

## Overview

Translations come in bundles, one per locale code. The SDK loads only the `en-US` bundle. To support other languages, add bundles with `injectBundles()`. The `@asgardeo/i18n` package, which the SDK depends on, exports ready-made bundles such as `fr_FR`, `pt_BR`, `pt_PT`, `hi_IN`, `ta_IN`, `te_IN` and `si_LK`. Add it to your app's dependencies to import from it.

The SDK picks the initial language from, in order, the `lang` query parameter of the URL, the language saved in a cookie from an earlier visit, and the browser's language. It saves the current language in that cookie whenever it changes. Keys that the current language doesn't translate fall back to `en-US`.

Call `useI18n()` in the `setup` of any component rendered inside `<AsgardeoProvider>`.

## Usage

The following examples show how to manage languages with `useI18n()`.

### Add a language

```vue title="src/components/I18nSetup.vue"
<script setup>
import { useI18n } from '@asgardeo/vue'
import { fr_FR } from '@asgardeo/i18n'

const { injectBundles, setLanguage } = useI18n()

injectBundles({ 'fr-FR': fr_FR })
setLanguage('fr-FR')
</script>
```

### Translate text

{% raw %}

```vue title="Translate text"
<script setup>
import { useI18n } from '@asgardeo/vue'

const { currentLanguage, t } = useI18n()
</script>

<template>
  <p>Language: {{ currentLanguage }}</p>
  <h1>{{ t('signin.heading') }}</h1>
</template>
```

{% endraw %}

## Return value

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `currentLanguage` | `Readonly<Ref<string>>` | The locale code of the current language, for example `en-US`. |
| `fallbackLanguage` | `string` | The language used for keys that the current language doesn't translate: `en-US`. |
| `bundles` | `Readonly<Ref<Record<string, I18nBundle>>>` | The available translation bundles, by locale code. |
| `setLanguage(language)` | `(language: string) => void` | Switches to the language with the given locale code. If there is no bundle for it, the language doesn't change and the SDK logs a warning. |
| `t(key, params?)` | `(key: string, params?: Record<string, string or number>) => string` | Returns the translation of `key` in the current language, then in the fallback language, and otherwise the key itself. Replaces `{name}` placeholders with the values in `params`. |
| `injectBundles(bundles)` | `(bundles: Record<string, I18nBundle>) => void` | Adds translation bundles, by locale code. Translations for a locale code that already has a bundle are merged into it. |
<!-- markdownlint-enable MD056 -->

## Errors

If you call `useI18n()` in a component that isn't rendered inside `<AsgardeoProvider>`, it throws an error.
