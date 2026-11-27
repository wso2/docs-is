The `Organization` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) gives your template access to the organization the user is signed in to, through a scoped slot.

## Overview

`Organization` reads `currentOrganization` from the organization context. When it is available, `Organization` renders its default slot and passes it as the slot prop `organization`. Otherwise, it renders the `fallback` slot, or nothing if you don't provide one.

The SDK builds the current organization from the `org_id`, `org_name` and `org_handle` claims of the user's ID token, so `organization` has the properties `id`, `name` and `orgHandle`.

## Usage

{% raw %}

```vue title="Organization example"
<script setup>
import { Organization } from '@asgardeo/vue'
</script>

<template>
  <Organization>
    <template #default="{ organization }">
      <p>Current organization: {{ organization.name }}</p>
    </template>
    <template #fallback>
      <p>No organization selected.</p>
    </template>
  </Organization>
</template>
```

{% endraw %}

## Props

`Organization` has no props.

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ organization }` | Content to render when a current organization is available. |
| `fallback` | — | Content to render when no current organization is available. |
