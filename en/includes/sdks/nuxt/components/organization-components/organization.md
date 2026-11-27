`<AsgardeoOrganization>` exposes the organization that the user is currently acting in to your template through a scoped slot, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoOrganization>` reads `currentOrganization` from [`useOrganization()`]({{base_path}}/sdks/nuxt/composables/use-organization/). When the user is acting in an organization, it renders its `default` slot and passes the organization as the `organization` slot prop. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one.

!!! note
    `<AsgardeoOrganization>` must render inside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/). It needs `preferences.user.fetchOrganizations` to be `true`, which is the default.

## Usage

The component is auto-registered, so you don't need to import it.

{% raw %}

```vue
<template>
  <AsgardeoOrganization>
    <template #default="{ organization }">
      <p>Current organization: {{ organization.name }}</p>
    </template>
    <template #fallback>
      <p>No organization selected.</p>
    </template>
  </AsgardeoOrganization>
</template>
```

{% endraw %}

## Props

`<AsgardeoOrganization>` has no props.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ organization }` | Content to render when the user is acting in an organization. |
| `fallback` | – | Content to render when there's no current organization. |
