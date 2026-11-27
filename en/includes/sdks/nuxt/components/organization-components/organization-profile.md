`<AsgardeoOrganizationProfile>` displays the details of the organization that the user is currently acting in, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoOrganizationProfile>` reads `currentOrganization` from [`useOrganization()`]({{base_path}}/sdks/nuxt/composables/use-organization/) and renders its details in a card.

The SDK doesn't provide a route that updates an organization. To let users edit the name or description, set `editable` and pass your own `onUpdate` handler.

!!! note
    `<AsgardeoOrganizationProfile>` must render inside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/).

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<template>
  <AsgardeoOrganizationProfile />
</template>
```

### Editable profile

```vue
<script setup lang="ts">
const onUpdate = async (payload: Record<string, unknown>) => {
  await $fetch('/api/my-org', { method: 'PATCH', body: payload });
};
</script>

<template>
  <AsgardeoOrganizationProfile title="Team settings" editable :on-update="onUpdate" />
</template>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Organization Profile'` | Title of the card. |
| `editable` | `boolean` | `false` | Whether the user can edit the organization's details. |
| `onUpdate` | `(payload: Record<string, unknown>) => Promise<void>` | – | Called when the user saves an edit, with the changed field, such as `{ name }` or `{ description }`. |
| `className` | `string` | `''` | CSS class for the root element. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ organization }` | Replaces the built-in profile view. |
| `fallback` | – | Content to render when there's no current organization. |
