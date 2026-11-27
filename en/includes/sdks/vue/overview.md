The {{product_name}} Vue SDK (`@asgardeo/vue`) adds authentication to Vue 3 single-page applications. It gives you a Vue plugin, a root provider component, ready-made components for sign-in, sign-out, user profiles and organizations, and composables that expose the authentication state and methods to your own components.

The SDK is built on the [{{product_name}} Browser SDK]({{base_path}}/sdks/browser/overview/). It uses the OpenID Connect authorization code flow with PKCE and keeps the session in the browser.

## Installation

Use one of the following options to install the {{product_name}} Vue SDK.

=== "npm"

    ```bash
    npm install @asgardeo/vue
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/vue
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/vue
    ```

## Getting started

Try out the [{{product_name}} Vue quickstart guide.]({{base_path}}/quick-starts/vue/)

A minimal setup installs the plugin and wraps your app with `<AsgardeoProvider>`:

```javascript title="src/main.js"
import { createApp } from 'vue'
import { AsgardeoPlugin } from '@asgardeo/vue'
import App from './App.vue'

createApp(App).use(AsgardeoPlugin).mount('#app')
```

```vue title="src/App.vue"
<script setup>
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserDropdown } from '@asgardeo/vue'
</script>

<template>
  <AsgardeoProvider
    client-id="<your-app-client-id>"
    base-url="{{content.sdkconfig.baseUrl}}"
  >
    <SignedIn>
      <UserDropdown />
      <SignOutButton />
    </SignedIn>
    <SignedOut>
      <SignInButton />
    </SignedOut>
  </AsgardeoProvider>
</template>
```

## Plugin and provider

- **[`AsgardeoPlugin`]({{base_path}}/sdks/vue/plugins/asgardeo-plugin/)** – The Vue plugin. Install it with `app.use()` to register `<AsgardeoProvider>` globally and add the SDK's styles.
- **[`<AsgardeoProvider>`]({{base_path}}/sdks/vue/contexts/asgardeo-provider/)** – The root component that configures the SDK and shares the authentication state with every component inside it.

## Components

Import components from `@asgardeo/vue` in the components that use them. Only `<AsgardeoProvider>` is registered globally by the plugin.

### Action components

- **[`<SignInButton>`]({{base_path}}/sdks/vue/components/action-components/sign-in-button/)** – A button that starts the sign-in flow.
- **[`<SignOutButton>`]({{base_path}}/sdks/vue/components/action-components/sign-out-button/)** – A button that signs the user out.
- **[`<SignUpButton>`]({{base_path}}/sdks/vue/components/action-components/sign-up-button/)** – A button that starts the sign-up flow.

### Control components

- **[`<SignedIn>`]({{base_path}}/sdks/vue/components/control-components/signed-in/)** – Renders its content only when the user is signed in.
- **[`<SignedOut>`]({{base_path}}/sdks/vue/components/control-components/signed-out/)** – Renders its content only when the user is signed out.
- **[`<Loading>`]({{base_path}}/sdks/vue/components/control-components/loading/)** – Renders its content while the SDK is busy.

### Authentication components

- **[`<SignIn>`]({{base_path}}/sdks/vue/components/authentication/sign-in/)** – An embedded sign-in form rendered inside your app.
- **[`<SignUp>`]({{base_path}}/sdks/vue/components/authentication/sign-up/)** – An embedded self-registration form rendered inside your app.

### User self-care components

- **[`<User>`]({{base_path}}/sdks/vue/components/user-selfcare-components/user/)** – Exposes the signed-in user through a scoped slot.
- **[`<UserProfile>`]({{base_path}}/sdks/vue/components/user-selfcare-components/user-profile/)** – Displays the user's profile and lets them edit it.
- **[`<UserDropdown>`]({{base_path}}/sdks/vue/components/user-selfcare-components/user-dropdown/)** – An avatar button that opens a menu with the user's details, a profile view and sign-out.

### Organization components (B2B)

- **[`<Organization>`]({{base_path}}/sdks/vue/components/organization-components/organization/)** – Exposes the current organization through a scoped slot.
- **[`<OrganizationProfile>`]({{base_path}}/sdks/vue/components/organization-components/organization-profile/)** – Displays the details of the current organization.
- **[`<OrganizationSwitcher>`]({{base_path}}/sdks/vue/components/organization-components/organization-switcher/)** – A dropdown to switch between the user's organizations.
- **[`<OrganizationList>`]({{base_path}}/sdks/vue/components/organization-components/organization-list/)** – A list of the user's organizations.
- **[`<CreateOrganization>`]({{base_path}}/sdks/vue/components/organization-components/create-organization/)** – A form that creates a new organization.

### Internationalization components

- **[`<LanguageSwitcher>`]({{base_path}}/sdks/vue/components/i18n-components/language-switcher/)** – A dropdown to change the language of the SDK's components.

## Composables

Call composables from components rendered inside `<AsgardeoProvider>`.

- **[`useAsgardeo()`]({{base_path}}/sdks/vue/composables/use-asgardeo/)** – Authentication state and methods for sign-in, sign-out, tokens and HTTP requests.
- **[`useUser()`]({{base_path}}/sdks/vue/composables/use-user/)** – The signed-in user's profile and the schemas that describe it.
- **[`useOrganization()`]({{base_path}}/sdks/vue/composables/use-organization/)** – The current organization, the user's organizations and organization switching.
- **[`useI18n()`]({{base_path}}/sdks/vue/composables/use-i18n/)** – The current language, language switching and translations.
- **[`useTheme()`]({{base_path}}/sdks/vue/composables/use-theme/)** – The theme applied to the SDK's components and light or dark mode switching.

## Guides

- **[Accessing protected APIs]({{base_path}}/sdks/vue/guides/accessing-protected-apis/)** – Call APIs that require the user's access token.
- **[Protecting routes]({{base_path}}/sdks/vue/guides/protecting-routes/)** – Keep signed-out users away from pages with a Vue Router guard.
