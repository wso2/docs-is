`<AsgardeoCreateOrganization>` renders a form that creates a sub-organization, using the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`).

## Overview

`<AsgardeoCreateOrganization>` asks for an organization name. When the user submits the form, the component calls `createOrganization()` from [`useOrganization()`]({{base_path}}/sdks/nuxt/composables/use-organization/), which sends a `POST` request to `/api/auth/organizations`. On success, the form clears. On failure, the form shows the error.

!!! note
    The list of the user's organizations doesn't refresh automatically after a new organization is created. Call `useOrganization().revalidateMyOrganizations()` to refresh it.

!!! note
    `<AsgardeoCreateOrganization>` must render inside [`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/). It needs `preferences.user.fetchOrganizations` to be `true`, which is the default.

## Usage

The component is auto-registered, so you don't need to import it.

### Basic usage

```vue
<template>
  <AsgardeoCreateOrganization title="New team" description="Create a workspace for your team." />
</template>
```

### Custom form

{% raw %}

```vue
<template>
  <AsgardeoCreateOrganization>
    <template #default="{ orgName, setOrgName, handleSubmit, isSubmitting, error }">
      <form @submit.prevent="handleSubmit">
        <input :value="orgName" @input="setOrgName($event.target.value)" placeholder="Organization name" />
        <button type="submit" :disabled="isSubmitting">Create</button>
        <p v-if="error">{{ error }}</p>
      </form>
    </template>
  </AsgardeoCreateOrganization>
</template>
```

{% endraw %}

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | `'Create Organization'` | Title of the form. |
| `description` | `string` | `'Create a new sub-organization.'` | Description shown below the title. |
| `className` | `string` | `''` | CSS class for the root element. |

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ orgName, setOrgName, handleSubmit, isSubmitting, error }` | Replaces the built-in form. |
