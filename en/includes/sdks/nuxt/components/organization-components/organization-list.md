`<AsgardeoOrganizationList>` lists the organizations that the signed-in user belongs to, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoOrganizationList>` reads `myOrganizations` and `switchOrganization()` from [`useOrganization()`]({{base_path}}/sdks/nuxt/composables/use-organization/). When the user selects an organization, the component emits `select` and then switches to that organization through `POST /api/auth/organizations/switch`.

After the switch, the SDK refreshes the organization data, the user profile and the authentication state on the page.

!!! note
    `<AsgardeoOrganizationList>` must render inside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/). It needs `preferences.user.fetchOrganizations` to be `true`, which is the default.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<script setup lang="ts">
const onSelect = (organization: { id: string; name: string }) => {
  console.log('Switching to', organization.name);
};
</script>

<template>
  <AsgardeoOrganizationList @select="onSelect" />
</template>
```

### Custom UI

{% raw %}

```vue
<template>
  <AsgardeoOrganizationList>
    <template #default="{ organizations, isLoading }">
      <p v-if="isLoading">Loading…</p>
      <ul v-else>
        <li v-for="org in organizations" :key="org.id">{{ org.name }}</li>
      </ul>
    </template>
  </AsgardeoOrganizationList>
</template>
```

{% endraw %}

When you use the `default` slot, the list renders your content instead of the built-in list, and selecting an organization is up to you. Call `useOrganization().switchOrganization()` to switch.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | CSS class for the root element. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ organizations, isLoading }` | Replaces the built-in list. |

## Events

| Event | Payload | Description |
|-------|---------|-------------|
| `select` | `Organization` | Emitted when the user selects an organization, before the switch starts. |
