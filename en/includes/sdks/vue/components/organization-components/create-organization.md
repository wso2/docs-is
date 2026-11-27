The `CreateOrganization` component of the {{product_name}} Vue SDK (`@asgardeo/vue`) renders a form that creates a new organization.

## Overview

`CreateOrganization` asks for an organization name and creates the organization when the user selects **Create**. The new organization is created under the organization the user is signed in to. After it's created, the SDK refreshes the list of the user's organizations, so components such as `OrganizationSwitcher` and `OrganizationList` show it.

While the request is in progress, the button is disabled and shows a spinner. If the name is empty or the request fails, the component shows the error above the form.

!!! note

    The signed-in user needs permission to create organizations in {{product_name}}, and the app must request the `internal_organization_create` scope. Add it to the `scopes` prop of `<AsgardeoProvider>`.

## Usage

The following examples show how to use `CreateOrganization`.

### Basic usage

```vue title="CreateOrganization example"
<script setup>
import { CreateOrganization, SignedIn } from '@asgardeo/vue'
</script>

<template>
  <SignedIn>
    <CreateOrganization />
  </SignedIn>
</template>
```

### Custom title and description

```vue title="Custom text"
<template>
  <CreateOrganization
    title="New team"
    description="Create an organization for your team."
  />
</template>
```

### Custom UI

Use the default slot to render your own form. The slot receives the form state and the functions that update and submit it.

{% raw %}

```vue title="Custom UI"
<template>
  <CreateOrganization v-slot="{ orgName, setOrgName, handleSubmit, isSubmitting, error }">
    <form @submit.prevent="handleSubmit">
      <input :value="orgName" placeholder="Organization name" @input="setOrgName($event.target.value)" />
      <button type="submit" :disabled="isSubmitting">Create</button>
      <p v-if="error">{{ error }}</p>
    </form>
  </CreateOrganization>
</template>
```

{% endraw %}

## Props

<!-- markdownlint-disable MD056 -->
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | ❌ | Title of the form. Defaults to `'Create Organization'`. |
| `description` | `string` | ❌ | Text shown under the title. Defaults to `'Create a new sub-organization.'`. |
| `className` | `string` | ❌ | CSS class to add to the root element. |
<!-- markdownlint-enable MD056 -->

## Slots

| Slot | Slot props | Description |
|------|------------|-------------|
| `default` | `{ orgName, setOrgName, handleSubmit, isSubmitting, error }` | Replaces the built-in form. `orgName` is the entered name, `setOrgName(name)` updates it, `handleSubmit()` creates the organization, `isSubmitting` is `true` while the request is in progress, and `error` is the error message, or `null`. |
