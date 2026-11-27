The `OrganizationList` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) lists the organizations that the signed-in user belongs to.

## Overview

Each organization in the list is a button. When the user clicks one, the component emits `select` and switches to that organization, in the same way as [`<OrganizationSwitcher>`]({{base_path}}/sdks/vue/components/organization-components/organization-switcher/).

## Usage

The following examples show how to use `OrganizationList`.

### Basic usage

```vue title="OrganizationList example"
<script setup>
import { OrganizationList } from '@asgardeo/vue'

const onSelect = (organization) => {
  console.log('Switching to', organization.name)
}
</script>

<template>
  <OrganizationList @select="onSelect" />
</template>
```

### Custom UI

Use the default slot to render the list yourself. The slot replaces the built-in UI. To switch organizations from your own UI, use `switchOrganization()` from [`useOrganization()`]({{base_path}}/sdks/vue/composables/use-organization/).

{% raw %}

```vue title="Custom list"
<template>
  <OrganizationList v-slot="{ organizations, isLoading }">
    <p v-if="isLoading">Loading...</p>
    <ul v-else>
      <li v-for="org in organizations" :key="org.id">{{ org.name }}</li>
    </ul>
  </OrganizationList>
</template>
```

{% endraw %}

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | ❌ | CSS class to add to the root element. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ organizations, isLoading }` | Replaces the built-in UI. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | `Organization` | Emitted when the user clicks an organization, before the switch. |
