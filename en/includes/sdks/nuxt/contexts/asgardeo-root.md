`<AsgardeoRoot>` is the root component of the {{product_name}} Nuxt SDK (`@asgardeo/nuxt`). Wrap your app with it in `app.vue` so that the SDK's components and composables receive user, organization, theme, and branding data.

## Overview

The module's plugin provides the core authentication context, which `useAsgardeo()` reads, to the whole app. `<AsgardeoRoot>` adds the rest of the context tree on top of it:

- i18n, which `useAsgardeoI18n()` reads.
- Flow metadata, which `useFlowMeta()` reads.
- Branding, which `useBranding()` reads.
- Theme, which `useTheme()` reads.
- Flow state, which `useFlow()` reads.
- The user profile, which `useUser()` reads.
- Organizations, which `useOrganization()` reads.

`<AsgardeoRoot>` seeds these contexts from the data the server fetched while rendering the page, so the client doesn't fetch it again on the first render. When a context needs fresh data, such as after a profile update or an organization switch, `<AsgardeoRoot>` calls the module's `/api/auth/*` routes.

`<AsgardeoRoot>` takes no props. It reads its settings from the `asgardeo.preferences` options in `nuxt.config.ts`. See [Module configuration]({{base_path}}/sdks/nuxt/configuration/module-configuration/#preferences).

## Usage

The module registers `<AsgardeoRoot>` globally, so you don't need to import it.

```vue title="app.vue"
<template>
  <AsgardeoRoot>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </AsgardeoRoot>
</template>
```

!!! note
    `useUser()`, `useOrganization()`, `useTheme()`, `useBranding()`, `useAsgardeoI18n()`, `useFlow()`, and `useFlowMeta()` throw an error when they run outside `<AsgardeoRoot>`. Components that use them, such as `<AsgardeoUserProfile>` and `<AsgardeoOrganizationSwitcher>`, must also render inside it. `useAsgardeo()` works anywhere in the app.

## Slots

| Slot | Description |
|------|-------------|
| `default` | Your app. |

## How preferences affect the contexts

| Preference | Effect on `<AsgardeoRoot>` |
|------------|----------------------------|
| `preferences.user.fetchUserProfile: false` | The user context has no profile data, `updateProfile()` returns an unsuccessful result, and `revalidateProfile()` does nothing. |
| `preferences.user.fetchOrganizations: false` | The organization context has no organizations, and switching, listing, and creating organizations aren't available. |
| `preferences.theme.inheritFromBranding: false` | The branding context has no branding preference, and the theme doesn't inherit from branding. |
| `preferences.theme.mode` | Sets the color scheme of the theme. Defaults to `'light'`. |
| `preferences.i18n` | Sets the language, fallback language, and translation bundles. |
