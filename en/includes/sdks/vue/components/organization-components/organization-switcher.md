The `OrganizationSwitcher` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders a dropdown that lets the user switch between the organizations they belong to.

## Overview

The button shows the name of the current organization. Opening it lists the user's organizations and marks the current one. When the user picks an organization, the SDK switches to it with an `organization_switch` token exchange, then reloads the user, the profile and the organizations.

## Usage

The following examples show how to use `OrganizationSwitcher`.

### Basic usage

```vue title="OrganizationSwitcher example"
<script setup>
import { OrganizationSwitcher, SignedIn } from '@asgardeo/vue'
</script>

<template>
  <SignedIn>
    <OrganizationSwitcher />
  </SignedIn>
</template>
```

### Custom UI

Use the default slot to render your own switcher.

{% raw %}

```vue title="Custom switcher"
<template>
  <OrganizationSwitcher
    v-slot="{ currentOrganization, organizations, isOpen, toggle, handleSelect }"
  >
    <button @click="toggle">{{ currentOrganization?.name ?? 'Select organization' }}</button>
    <ul v-if="isOpen">
      <li v-for="org in organizations" :key="org.id">
        <button @click="handleSelect(org)">{{ org.name }}</button>
      </li>
    </ul>
  </OrganizationSwitcher>
</template>
```

{% endraw %}

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `className` | `string` | ❌ | CSS class to add to the root element. |

## Slots

The default slot replaces the built-in UI and receives the following slot props:

| Slot prop | Type | Description |
|-----------|------|-------------|
| `currentOrganization` | `Organization` or `null` | The organization the user is signed in to. |
| `organizations` | `Organization[]` | The user's organizations. |
| `isLoading` | `boolean` | Whether a switch is in progress. |
| `isOpen` | `boolean` | Whether the dropdown is open. |
| `toggle` | `() => void` | Opens or closes the dropdown. |
| `handleSelect` | `(organization: Organization) => void` | Closes the dropdown and switches to the organization. |
