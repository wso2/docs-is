The `useOrganization()` composable of the {{product_name}} Vue SDK (`@asgardeo/vue`) returns the organization the user is signed in to, the organizations they belong to, and a method to switch between them.

## Overview

After sign-in, `<AsgardeoProvider>` builds the current organization from the ID token and reads the list of the user's organizations from {{product_name}}. `useOrganization()` gives you this data as read-only refs, along with methods to switch organizations and reload the list.

Call `useOrganization()` in the `setup` of any component rendered inside `<AsgardeoProvider>`.

## Usage

{% raw %}

```vue title="src/components/OrgPicker.vue"
<script setup>
import { useOrganization } from '@asgardeo/vue'

const { currentOrganization, myOrganizations, isLoading, error, switchOrganization } = useOrganization()
</script>

<template>
  <p>Current: {{ currentOrganization?.name }}</p>
  <p v-if="error">{{ error }}</p>
  <ul>
    <li v-for="org in myOrganizations" :key="org.id">
      <button :disabled="isLoading" @click="switchOrganization(org)">{{ org.name }}</button>
    </li>
  </ul>
</template>
```

{% endraw %}

## Return value

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `currentOrganization` | `Readonly<Ref<Organization>>` | The organization the user is signed in to, with `id`, `name` and `orgHandle` taken from the ID token, or `null`. |
| `myOrganizations` | `Readonly<Ref<Organization[]>>` | The organizations the signed-in user belongs to. |
| `isLoading` | `Readonly<Ref<boolean>>` | Whether an organization switch is in progress. |
| `error` | `Readonly<Ref<string>>` | The error message of the last failed switch, or `null`. |
| `switchOrganization(organization)` | `(organization: Organization) => Promise<void>` | Switches the session to the organization with an `organization_switch` token exchange, then reloads the user and the organizations. The organization must have an `id`. Rejects if the switch fails. |
| `revalidateMyOrganizations()` | `() => Promise<Organization[]>` | Reads the user's organizations from {{product_name}} again and resolves to the new list. |
| `getAllOrganizations()` | `() => Promise<AllOrganizationsApiResponse>` | Reads all the organizations available to the user from {{product_name}}. |
<!-- markdownlint-enable MD056 -->

## Errors

If you call `useOrganization()` in a component that isn't rendered inside `<AsgardeoProvider>`, it throws an error.
