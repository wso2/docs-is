The {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) is a Nuxt module that adds authentication, user self-care, and organization management to Nuxt applications. It runs the OAuth 2.0 authorization code flow on the server, keeps the session in a signed, HTTP-only cookie, and gives your pages ready-made components and composables.

When you add the module to `nuxt.config.ts`, it:

- Registers server API routes under `/api/auth/*` that handle sign-in, the OAuth callback, sign-out, tokens, the user profile, organizations, and branding.
- Resolves the session and prefetches the user, profile, organizations, and branding on every server-rendered page request, then hydrates that state on the client.
- Auto-registers `<AsgardeoRoot>` and the UI components with an `Asgardeo` prefix, such as `<AsgardeoSignedIn>` and `<AsgardeoSignInButton>`.
- Auto-imports composables such as `useAsgardeo()`, `useUser()`, and `useOrganization()`.
- Registers a named route middleware, `auth`, that protects pages.

## Installation

Use one of the following options to install the {{product_name}} Nuxt SDK.

=== "npm"

    ```bash
    npm install @asgardeo/nuxt
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/nuxt
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/nuxt
    ```

Then add the module to `nuxt.config.ts`:

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  modules: ['@asgardeo/nuxt'],
});
```

## Getting started

Try out the [{{product_name}} Nuxt quickstart guide]({{base_path}}/quick-starts/nuxt/).

## Configuration

- **[Module configuration]({{base_path}}/sdks/nuxt/configuration/module-configuration/)** – The `asgardeo` options in `nuxt.config.ts` and the environment variables the module reads.

## Root component

- **[`<AsgardeoRoot>`]({{base_path}}/sdks/nuxt/contexts/asgardeo-root/)** – Wraps your app in `app.vue` and supplies the user, organization, theme, branding, flow, and i18n contexts that the components and composables read.

## Components

All components are auto-registered. Use them in any `<template>` without importing them.

### Action components

- **[`<AsgardeoSignInButton>`]({{base_path}}/sdks/nuxt/components/action-components/sign-in-button/)** – Starts the sign-in flow.
- **[`<AsgardeoSignOutButton>`]({{base_path}}/sdks/nuxt/components/action-components/sign-out-button/)** – Signs the user out.
- **[`<AsgardeoSignUpButton>`]({{base_path}}/sdks/nuxt/components/action-components/sign-up-button/)** – Starts the sign-up flow.

### Control components

- **[`<AsgardeoSignedIn>`]({{base_path}}/sdks/nuxt/components/control-components/signed-in/)** – Renders content only when the user is signed in.
- **[`<AsgardeoSignedOut>`]({{base_path}}/sdks/nuxt/components/control-components/signed-out/)** – Renders content only when the user is signed out.
- **[`<AsgardeoLoading>`]({{base_path}}/sdks/nuxt/components/control-components/loading/)** – Renders content while the authentication state is loading.

### Authentication components

- **[`<AsgardeoSignIn>`]({{base_path}}/sdks/nuxt/components/authentication/sign-in/)** – An embedded, app-native sign-in form.
- **[`<AsgardeoSignUp>`]({{base_path}}/sdks/nuxt/components/authentication/sign-up/)** – An embedded, app-native sign-up form.
- **[`<AsgardeoCallback>`]({{base_path}}/sdks/nuxt/components/authentication/callback/)** – A headless component that forwards OAuth callback parameters to the originating route.

### User self-care components

- **[`<AsgardeoUser>`]({{base_path}}/sdks/nuxt/components/user-selfcare-components/user/)** – Exposes the signed-in user through a scoped slot.
- **[`<AsgardeoUserProfile>`]({{base_path}}/sdks/nuxt/components/user-selfcare-components/user-profile/)** – Displays and edits the user's profile.
- **[`<AsgardeoUserDropdown>`]({{base_path}}/sdks/nuxt/components/user-selfcare-components/user-dropdown/)** – A dropdown menu with user details, a profile view, and sign-out.

### Organization components (B2B)

- **[`<AsgardeoOrganization>`]({{base_path}}/sdks/nuxt/components/organization-components/organization/)** – Exposes the current organization through a scoped slot.
- **[`<AsgardeoOrganizationProfile>`]({{base_path}}/sdks/nuxt/components/organization-components/organization-profile/)** – Displays the current organization's details.
- **[`<AsgardeoOrganizationSwitcher>`]({{base_path}}/sdks/nuxt/components/organization-components/organization-switcher/)** – Lets the user switch between organizations.
- **[`<AsgardeoOrganizationList>`]({{base_path}}/sdks/nuxt/components/organization-components/organization-list/)** – Lists the user's organizations.
- **[`<AsgardeoCreateOrganization>`]({{base_path}}/sdks/nuxt/components/organization-components/create-organization/)** – A form that creates a sub-organization.

## Composables

All composables are auto-imported.

- **[`useAsgardeo()`]({{base_path}}/sdks/nuxt/composables/use-asgardeo/)** – Authentication state and the sign-in, sign-out, sign-up, and access token methods.
- **[`useUser()`]({{base_path}}/sdks/nuxt/composables/use-user/)** – The user's SCIM2 profile and methods to update and refresh it.
- **[`useOrganization()`]({{base_path}}/sdks/nuxt/composables/use-organization/)** – The current organization, the user's organizations, and organization switching.
- **[`useTheme()`]({{base_path}}/sdks/nuxt/composables/use-theme/)** – The resolved theme and color scheme.
- **[`useBranding()`]({{base_path}}/sdks/nuxt/composables/use-branding/)** – The organization's branding preference.
- **[`useAsgardeoI18n()`]({{base_path}}/sdks/nuxt/composables/use-asgardeo-i18n/)** – Translations and the current language of the SDK's UI.
- **[`useFlow()`]({{base_path}}/sdks/nuxt/composables/use-flow/)** – UI state of the embedded authentication flows.
- **[`useFlowMeta()`]({{base_path}}/sdks/nuxt/composables/use-flow-meta/)** – Flow metadata used by the embedded authentication flows.

## Route protection

- **[`auth` middleware]({{base_path}}/sdks/nuxt/middleware/auth/)** – A named route middleware that redirects signed-out visitors to sign-in.
- **[`defineAsgardeoMiddleware()`]({{base_path}}/sdks/nuxt/middleware/define-asgardeo-middleware/)** – Creates a route middleware with a custom redirect and extra checks.

## Server

- **[Server API routes]({{base_path}}/sdks/nuxt/server/api-routes/)** – The `/api/auth/*` routes that the module registers.
- **[Server utilities]({{base_path}}/sdks/nuxt/server/server-utilities/)** – Helpers from `@asgardeo/nuxt/server` for your own server routes, such as `requireServerSession()` and `getValidAccessToken()`.

## Guides

- **[Protecting routes]({{base_path}}/sdks/nuxt/guides/protecting-routes/)** – Protect pages and server routes.
- **[Accessing protected APIs]({{base_path}}/sdks/nuxt/guides/accessing-protected-apis/)** – Call APIs with the user's access token.
