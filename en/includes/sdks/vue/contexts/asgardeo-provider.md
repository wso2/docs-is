`<AsgardeoProvider>` is the root component of the {{product_name}} Vue SDK (`@asgardeo/vue`). It configures the SDK, manages the authentication state, and shares it with every component rendered inside it through Vue's `provide`/`inject`. The SDK's components and composables only work inside it.

## Overview

When `<AsgardeoProvider>` mounts, it:

1. Initializes the SDK with the props you pass.
2. Restores the session if the user is already signed in, and loads the user's profile and organizations.
3. Completes the sign-in when {{product_name}} redirects the user back to `afterSignInUrl` with an authorization code.

[`AsgardeoPlugin`]({{base_path}}/sdks/vue/plugins/asgardeo-plugin/) registers `<AsgardeoProvider>` globally, so you can use it in your templates without importing it.

## Usage

The following examples show how to use `<AsgardeoProvider>`.

### Basic usage

Install the plugin, then wrap your app's content with `<AsgardeoProvider>` and pass your application's `client-id` and `base-url`.

```javascript title="src/main.js"
import { createApp } from 'vue'
import { AsgardeoPlugin } from '@asgardeo/vue'
import App from './App.vue'

createApp(App).use(AsgardeoPlugin).mount('#app')
```

```vue title="src/App.vue"
<template>
  <AsgardeoProvider
    client-id="<your-app-client-id>"
    base-url="{{content.sdkconfig.baseUrl}}"
  >
    <router-view />
  </AsgardeoProvider>
</template>
```

!!! note
    Props are camelCase in JavaScript (`clientId`, `baseUrl`) and kebab-case in templates (`client-id`, `base-url`). Use `v-bind` (`:`) for props that aren't strings, such as `:scopes` or `:instance-id`.

!!! tip
    Composables such as `useAsgardeo()` read the context that `<AsgardeoProvider>` provides to its children. Call them in components rendered inside the provider, not in the component whose template renders `<AsgardeoProvider>`.

### Advanced usage

Pass more props to control the sign-in flow, for example:

```vue title="src/App.vue"
<template>
  <AsgardeoProvider
    client-id="<your-app-client-id>"
    base-url="{{content.sdkconfig.baseUrl}}"
    after-sign-in-url="http://localhost:5173/dashboard"
    after-sign-out-url="http://localhost:5173"
    :scopes="['openid', 'profile', 'email', 'internal_login']"
    storage="localStorage"
  >
    <router-view />
  </AsgardeoProvider>
</template>
```

For all props, see [Props](#props).

## Props

<!-- markdownlint-disable MD056 -->
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `clientId` | `string` | ✅ | Client ID of your application. |
| `baseUrl` | `string` | ✅ | The base URL of your {{product_name}} organization, for example `{{content.sdkconfig.baseUrl}}`. |
| `afterSignInUrl` | `string` | ❌ | Where {{product_name}} redirects the user after sign-in. Register it as an authorized redirect URL of your application. Defaults to `window.location.origin`. |
| `afterSignOutUrl` | `string` | ❌ | Where {{product_name}} redirects the user after sign-out. Defaults to `window.location.origin`. |
| `afterSignUpUrl` | `string` | ❌ | Where the user lands after signing up. |
| `scopes` | `string[]` \| `string` | ❌ | OpenID Connect scopes to request during sign-in, as an array or a space-separated string. When you don't set it, the SDK requests `openid profile internal_login`. If you set it, include `internal_login` so the SDK can read the user's profile from {{product_name}}. |
| `storage` | `string` | ❌ | Where the SDK stores the session: `sessionStorage`, `localStorage`, `browserMemory` or `webWorker`. Defaults to `sessionStorage`. |
| `signOutOptions` | `SignOutOptions` | ❌ | Extra parameters for sign-out. |
| `signUpOptions` | `SignUpOptions` | ❌ | Extra parameters for sign-up. |
| `signInOptions` | `SignInOptions` | ❌ | Extra parameters to add to the authorization request, such as `{ prompt: 'login' }` or `{ fidp: 'OrganizationSSO' }`. `<SignInButton>` uses them when it starts the sign-in. |
| `signInUrl` | `string` | ❌ | URL of a custom sign-in page. When set, `<SignInButton>` navigates to it instead of redirecting to {{product_name}}. |
| `signUpUrl` | `string` | ❌ | URL of a custom sign-up page. When set, `<SignUpButton>` navigates to it instead of opening the {{product_name}} sign-up page. |
| `applicationId` | `string` | ❌ | The UUID of your application in {{product_name}}. The embedded `<SignUp>` component sends it when it starts the registration flow. |
| `organizationHandle` | `string` | ❌ | The handle of your {{product_name}} organization. When not set, the SDK derives it from `baseUrl`. Set it if your organization uses a custom domain. |
| `syncSession` | `boolean` | ❌ | Keeps the app session in sync with the {{product_name}} session using OIDC iframe-based session management. Third-party cookie restrictions can stop this from working in some browsers. |
| `instanceId` | `number` | ❌ | ID of the SDK instance. Use different IDs to run more than one provider in the same app. Defaults to `0`. |
| `organizationChain` | `object` | ❌ | Settings to sign a user in to an organization using the session of another instance: `sourceInstanceId` (`number`) and `targetOrganizationId` (`string`). |
| `platform` | `string` | ❌ | The identity platform. The SDK detects it, so you don't need to set it. |
| `preferences` | `Preferences` | ❌ | UI and data preferences. `preferences.theme` sets `mode`, `overrides`, `direction` and `inheritFromBranding` (fetches the branding preference of your organization and applies it to the theme). `preferences.i18n` sets `language`, `fallbackLanguage` and extra `bundles`. `preferences.user.fetchUserProfile` and `preferences.user.fetchOrganizations` (both `true` by default) control which user data the SDK fetches after sign-in. |
| `allowedExternalUrls` | `string[]` | ❌ | Other URLs, besides `baseUrl`, that `http.request()` may send the access token to when `storage` is `webWorker`. |
| `tokenValidation` | `object` | ❌ | ID token validation settings: `idToken.validate`, `idToken.validateIssuer` and `idToken.clockTolerance`. Options you leave out keep their defaults. |
<!-- markdownlint-enable MD056 -->
