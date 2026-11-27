The `LanguageSwitcher` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders a dropdown that changes the language of the SDK's components.

## Overview

The button shows the label of the current language. When the user picks a language, the component calls `setLanguage()` from [`useI18n()`]({{base_path}}/sdks/vue/composables/use-i18n/). The SDK only switches to a language that it has a translation bundle for. For any other value, it keeps the current language and logs a warning.

!!! note
    The SDK only loads the `en-US` bundle. Add a bundle for each other language you offer with `injectBundles()` from [`useI18n()`]({{base_path}}/sdks/vue/composables/use-i18n/). Without a `languages` prop, the switcher lists every language that has a bundle, labelled with the bundle's display name.

## Usage

The following examples show how to use `LanguageSwitcher`.

### Basic usage

```vue title="LanguageSwitcher example"
<script setup>
import { LanguageSwitcher, useI18n } from '@asgardeo/vue'
import { fr_FR } from '@asgardeo/i18n'

const { injectBundles } = useI18n()
injectBundles({ 'fr-FR': fr_FR })

const languages = [
  { label: 'English', value: 'en-US' },
  { label: 'Français', value: 'fr-FR' },
]
</script>

<template>
  <LanguageSwitcher :languages="languages" />
</template>
```

### Custom UI

Use the default slot to render your own switcher.

{% raw %}

```vue title="Custom switcher"
<script setup>
import { LanguageSwitcher } from '@asgardeo/vue'

const supportedLanguages = [
  { label: 'English', value: 'en-US' },
  { label: 'Français', value: 'fr-FR' },
]
</script>

<template>
  <LanguageSwitcher
    :languages="supportedLanguages"
    v-slot="{ currentLanguage, languages, isOpen, toggle, handleSelect }"
  >
    <button @click="toggle">{{ currentLanguage }}</button>
    <ul v-if="isOpen">
      <li v-for="lang in languages" :key="lang.value">
        <button @click="handleSelect(lang.value)">{{ lang.label }}</button>
      </li>
    </ul>
  </LanguageSwitcher>
</template>
```

{% endraw %}

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `languages` | `SelectOption[]` | ❌ | The languages to offer, as `{ label, value }` objects. `value` is the locale code. |
| `className` | `string` | ❌ | CSS class to add to the root element. |

## Slots

The default slot replaces the built-in UI and receives the following slot props:

| Slot prop | Type | Description |
|-----------|------|-------------|
| `currentLanguage` | `string` | The locale code of the current language. |
| `languages` | `SelectOption[]` | The languages passed to the component. |
| `isOpen` | `boolean` | Whether the dropdown is open. |
| `toggle` | `() => void` | Opens or closes the dropdown. |
| `handleSelect` | `(language: string) => void` | Closes the dropdown and switches to the language. |
