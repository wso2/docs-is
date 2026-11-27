The `OrganizationProfile` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) displays the details of the organization the user is signed in to.

## Overview

`OrganizationProfile` shows the current organization's name, handle and ID, and its description and created and last-modified dates when they are available. With `editable` set, users can edit the name and description inline, and the component passes each change to your `onUpdate` function. The component doesn't save changes by itself.

## Usage

The following examples show how to use `OrganizationProfile`.

### Basic usage

```vue title="OrganizationProfile example"
<script setup>
import { OrganizationProfile } from '@asgardeo/vue'
</script>

<template>
  <OrganizationProfile />
</template>
```

### Editable profile

```vue title="Editable profile"
<script setup>
import { OrganizationProfile } from '@asgardeo/vue'

const saveOrganization = async (changes) => {
  // Send the change, for example { name: 'New name' }, to your backend.
}
</script>

<template>
  <OrganizationProfile editable :on-update="saveOrganization" />
</template>
```

### Custom UI

{% raw %}

```vue title="Custom UI"
<template>
  <OrganizationProfile v-slot="{ organization }">
    <h2 v-if="organization">{{ organization.name }}</h2>
  </OrganizationProfile>
</template>
```

{% endraw %}

## Props

<!-- markdownlint-disable MD056 -->
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ❌ | Title of the component. Defaults to `'Organization Profile'`. |
| `editable` | `boolean` | ❌ | Whether users can edit the name and description. Defaults to `false`. |
| `onUpdate` | `(payload: Record<string, unknown>) => Promise<void>` | ❌ | Called with the changed field when the user saves an edit. |
| `className` | `string` | ❌ | CSS class to add to the root element. |
<!-- markdownlint-enable MD056 -->

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ organization }` | Replaces the built-in UI. `organization` is the current organization, or `null`. |
| `fallback` | — | Content to render when there is no current organization. Ignored if you use the default slot. |
