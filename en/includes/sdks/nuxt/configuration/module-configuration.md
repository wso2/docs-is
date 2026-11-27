The {{product_name}} Nuxt SDK (`@asgardeo/nuxt`) reads its configuration from the `asgardeo` key in `nuxt.config.ts` and from environment variables. You can configure a basic app with environment variables alone.

## Usage

You can configure the SDK with environment variables, with the `asgardeo` key in `nuxt.config.ts`, or with both.

### Environment variables

Create a `.env` file in the root of your Nuxt project.

```bash title=".env"
NUXT_PUBLIC_ASGARDEO_BASE_URL="{{content.sdkconfig.baseUrl}}"
NUXT_PUBLIC_ASGARDEO_CLIENT_ID="<your-app-client-id>"
ASGARDEO_CLIENT_SECRET="<your-app-client-secret>"
# Secret used to sign the session cookie. Required in production.
ASGARDEO_SESSION_SECRET="<a-random-string-of-at-least-32-characters>"
```

Then add the module to `nuxt.config.ts`:

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  modules: ['@asgardeo/nuxt'],
});
```

### Module options

Use the `asgardeo` key for options that have no environment variable, or to set values in code.

```ts title="nuxt.config.ts"
export default defineNuxtConfig({
  modules: ['@asgardeo/nuxt'],
  asgardeo: {
    afterSignInUrl: '/dashboard',
    afterSignOutUrl: '/',
    scopes: ['openid', 'profile', 'internal_login', 'email'],
    preferences: {
      theme: {
        mode: 'system',
      },
      user: {
        fetchOrganizations: false,
      },
    },
  },
});
```

!!! note
    Keep `clientSecret` and `sessionSecret` out of `nuxt.config.ts` and set them with the `ASGARDEO_CLIENT_SECRET` and `ASGARDEO_SESSION_SECRET` environment variables. The module stores both in the private, server-only runtime config. If either one reaches the public runtime config, the module removes it and logs a security error.

### Precedence

For each public option, the module uses the first value it finds in this order:

1. The environment variable, if it's set.
2. The value in the `asgardeo` key of `nuxt.config.ts`.
3. The built-in default, if the option has one.

For `clientSecret` and `sessionSecret`, the environment variable wins over the `nuxt.config.ts` value.

## Options

<!-- markdownlint-disable MD056 -->
| Option | Environment variable | Type | Default | Description |
|--------|----------------------|------|---------|-------------|
| `baseUrl` | `NUXT_PUBLIC_ASGARDEO_BASE_URL` | `string` | – | Base URL of your {{product_name}} organization, for example `{{content.sdkconfig.baseUrl}}`. Required. |
| `clientId` | `NUXT_PUBLIC_ASGARDEO_CLIENT_ID` | `string` | – | Client ID of your application. Required. |
| `clientSecret` | `ASGARDEO_CLIENT_SECRET` | `string` | – | Client secret of your application. Server-only. The server reads `ASGARDEO_CLIENT_SECRET` at runtime too, so you can set it only in the production environment. |
| `sessionSecret` | `ASGARDEO_SESSION_SECRET` | `string` | – | Secret that signs the session cookie. Server-only. Required in production. See [Session secret](#session-secret). |
| `afterSignInUrl` | `NUXT_PUBLIC_ASGARDEO_AFTER_SIGN_IN_URL` | `string` | `'/'` | Where the user lands after signing in, when no `returnTo` path was requested. |
| `afterSignOutUrl` | `NUXT_PUBLIC_ASGARDEO_AFTER_SIGN_OUT_URL` | `string` | `'/'` | Where the user lands after signing out. A relative path is resolved against the request origin. See [Redirect URLs](#redirect-urls). |
| `signInUrl` | `NUXT_PUBLIC_ASGARDEO_SIGN_IN_URL` | `string` | – | A page in your app to send users to from `<AsgardeoSignInButton>`, such as a page that renders `<AsgardeoSignIn>`. When it isn't set, the button uses the redirect flow through `/api/auth/signin`. |
| `signUpUrl` | `NUXT_PUBLIC_ASGARDEO_SIGN_UP_URL` | `string` | – | A URL to send users to from `<AsgardeoSignUpButton>` and `useAsgardeo().signUp()`. When it isn't set, the SDK builds the {{product_name}} self-registration URL from `baseUrl`, `clientId`, and `applicationId`. |
| `applicationId` | `NUXT_PUBLIC_ASGARDEO_APPLICATION_ID` | `string` | – | ID of your application in {{product_name}}. The SDK adds it to the self-registration URL and to embedded sign-up requests. |
| `scopes` | – | `string[]` | `['openid', 'profile', 'internal_login']` | OAuth 2.0 scopes to request. See [Scopes](#scopes). |
| `preferences` | – | `object` | – | Controls server-side data fetching, theming, and i18n. See [Preferences](#preferences). |
| `tokenRequest.authMethod` | – | `'client_secret_basic' \| 'client_secret_post' \| 'none'` | `'client_secret_post'` | How the server authenticates the client at the token endpoint. |
| `platform` | – | `string` | – | Identity platform variant that the server-side client uses, as a `Platform` value or key (for example `'IdentityServer'`). Leave it unset for {{product_name}}. |
<!-- markdownlint-enable MD056 -->

### Scopes

When you don't set `scopes`, the SDK requests `openid`, `profile`, and `internal_login`. The `internal_login` scope lets the access token read the user's own profile (SCIM2 `/Me`) and organizations. Without it, those requests fail with `403` and the profile falls back to the ID token claims.

The scopes you set, in the module options or in `runtimeConfig.public.asgardeo.scopes`, replace the defaults. Include `internal_login` in your list to keep the profile and organizations working.

### Preferences

<!-- markdownlint-disable MD056 -->
| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `preferences.user.fetchUserProfile` | `boolean` | `true` | Fetches the user's SCIM2 profile during server-side rendering and supplies it to `useUser()`. When `false`, `useUser()` returns empty profile data and can't update the profile. |
| `preferences.user.fetchOrganizations` | `boolean` | `true` | Fetches the current organization and the user's organizations during server-side rendering and supplies them to `useOrganization()`. When `false`, the organization context is empty and organization switching isn't available. |
| `preferences.theme.inheritFromBranding` | `boolean` | `true` | Fetches the branding preference from {{product_name}} and applies it to the theme. |
| `preferences.theme.mode` | `'light' \| 'dark' \| 'system' \| 'class' \| 'branding'` | `'light'` | Color scheme of the SDK's components. `'system'` follows the operating system setting, `'class'` reads a CSS class on `<html>`, and `'branding'` follows the active theme of the branding preference. |
| `preferences.i18n.language` | `string` | – | Language of the SDK's UI text, for example `'en-US'`. |
| `preferences.i18n.fallbackLanguage` | `string` | – | Language to use when a translation is missing. |
| `preferences.i18n.bundles` | `object` | – | Custom translation bundles that override the default text. |
<!-- markdownlint-enable MD056 -->

## Session secret

The SDK stores the session in a cookie that it signs with `sessionSecret`. Set `ASGARDEO_SESSION_SECRET` to a random string of at least 32 characters.

`ASGARDEO_SESSION_SECRET` is required in production. When `NODE_ENV` is `production` and no session secret is set, the server logs an error and doesn't initialize the client, and any attempt to sign or verify a session cookie fails. In development, the SDK logs a warning and signs cookies with a built-in, insecure secret.

The session cookie is HTTP-only, uses `SameSite=Lax`, is `Secure` when `NODE_ENV` is `production`, and expires one hour after it's issued.

## Redirect URLs

The SDK builds the OAuth redirect URL from the origin of the incoming request and the callback route, for example `http://localhost:3000/api/auth/callback`. Register this URL as an authorized redirect URL of your application in the {{product_name}} Console. Behind a reverse proxy, the SDK reads the `X-Forwarded-Host` and `X-Forwarded-Proto` headers to find the public origin. The SDK works out this URL for each sign-in request, so if the app is served from more than one origin, register the callback URL of each origin.

{{product_name}} accepts only an absolute post sign-out redirect URL. If `afterSignOutUrl` is a relative path such as the default `/`, the SDK resolves it against the request origin, so `/` becomes `http://localhost:3000/`. Register that URL as an authorized redirect URL as well.

## Missing configuration

If `baseUrl` or `clientId` is missing:

- The server logs an error asking you to set `NUXT_PUBLIC_ASGARDEO_BASE_URL` and `NUXT_PUBLIC_ASGARDEO_CLIENT_ID`, and doesn't initialize the client.
- In development, the browser console shows a warning. The `/api/auth/*` routes don't work until you fix the configuration.
