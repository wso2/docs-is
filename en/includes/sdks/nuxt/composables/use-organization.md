`useOrganization()` returns the user's current organization and organizations, and methods that switch, list, and create organizations, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

The server resolves the current organization and the user's organizations while it renders the page, and [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/) supplies them to `useOrganization()`. The methods call the module's `/api/auth/organizations/*` routes. The module auto-imports `useOrganization()`.

!!! note
    Call `useOrganization()` only in components that render inside `<AsgardeoRoot>`. Otherwise, it throws an error. When `preferences.user.fetchOrganizations` is `false`, the organization values are empty, `switchOrganization()` throws an error, `getAllOrganizations()` returns no organizations, and `createOrganization` is `undefined`.

## Usage

{% raw %}

```vue
<script setup lang="ts">
const { currentOrganization, myOrganizations, switchOrganization, isLoading, error } = useOrganization();

const switchTo = async (organization) => {
  // Updates the session, then the organization, profile and authentication state on the page.
  await switchOrganization(organization);
};
</script>

<template>
  <p>Current: {{ currentOrganization?.name ?? 'None' }}</p>
  <ul>
    <li v-for="org in myOrganizations" :key="org.id">
      <button :disabled="isLoading" @click="switchTo(org)">{{ org.name }}</button>
    </li>
  </ul>
  <p v-if="error">{{ error }}</p>
</template>
```

{% endraw %}

## API

<!-- markdownlint-disable MD056 -->
| Property | Type | Description |
|----------|------|-------------|
| `currentOrganization` | `Readonly<Ref<Organization \| null>>` | The organization the user is acting in, or `null`. |
| `myOrganizations` | `Readonly<Ref<Organization[]>>` | The organizations the user belongs to. |
| `isLoading` | `Readonly<Ref<boolean>>` | Whether an organization switch is in progress. |
| `error` | `Readonly<Ref<string \| null>>` | The error message of the last failed switch, or `null`. |
| `switchOrganization(organization)` | `(organization: Organization) => Promise<void>` | Switches to the organization through `POST /api/auth/organizations/switch`. The server exchanges the session's token for a token scoped to the organization and reissues the session cookie. Throws an error if the switch fails. |
| `getAllOrganizations()` | `() => Promise<AllOrganizationsApiResponse>` | Fetches the organizations available to the user from `GET /api/auth/organizations`. |
| `revalidateMyOrganizations()` | `() => Promise<Organization[]>` | Fetches the user's organizations again from `GET /api/auth/organizations/me` and updates `myOrganizations`. |
| `createOrganization(payload)` | `(payload: CreateOrganizationPayload) => Promise<Organization>` | Creates a sub-organization through `POST /api/auth/organizations`. |
<!-- markdownlint-enable MD056 -->

`switchOrganization()` updates the session on the server, then refreshes `currentOrganization`, `myOrganizations`, the user profile and the authentication state on the page.
