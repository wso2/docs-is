`<AsgardeoOrganizationSwitcher>` lets the user switch between the organizations they belong to, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoOrganizationSwitcher>` reads `currentOrganization`, `myOrganizations`, and `switchOrganization()` from [`useOrganization()`]({{base_path}}/sdks/nuxt/composables/use-organization/). It shows the current organization and a menu of the user's organizations.

When the user picks an organization, the SDK calls `POST /api/auth/organizations/switch`. The server exchanges the session's token for a token scoped to that organization and reissues the session cookie.

After the switch, the SDK refreshes the organization data, the user profile and the authentication state on the page.

!!! note
    `<AsgardeoOrganizationSwitcher>` must render inside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/). It needs `preferences.user.fetchOrganizations` to be `true`, which is the default.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<template>
  <AsgardeoSignedIn>
    <AsgardeoOrganizationSwitcher />
  </AsgardeoSignedIn>
</template>
```

### Custom UI

{% raw %}

```vue
<template>
  <AsgardeoOrganizationSwitcher>
    <template #default="{ currentOrganization, organizations, handleSelect, isOpen, toggle }">
      <button @click="toggle">{{ currentOrganization?.name ?? 'Select organization' }}</button>
      <ul v-if="isOpen">
        <li v-for="org in organizations" :key="org.id">
          <button @click="handleSelect(org)">{{ org.name }}</button>
        </li>
      </ul>
    </template>
  </AsgardeoOrganizationSwitcher>
</template>
```

{% endraw %}

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `className` | `string` | `''` | CSS class for the root element. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ currentOrganization, organizations, isLoading, isOpen, toggle, handleSelect }` | Replaces the built-in switcher. Call `handleSelect(organization)` to switch. |
