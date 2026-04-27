# Nuxt quickstart

Welcome to the Nuxt quickstart guide! In this document, you will learn to build a Nuxt app, add user login, and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an application in {{ product_name }}

- Sign into the {{ product_name }} Console and navigate to **Applications > New Application**.
- Select **Traditional Web Application** and complete the wizard by providing a suitable name, the **OpenID Connect** protocol, and an authorized redirect URL.

!!! Example
    **Name:** `{{ product }}-nuxt`

    **Authorized redirect URL:** `http://localhost:3000/api/auth/callback`

Once you finish creating the application, note down the following values from its **Info** tab. You will need them to configure the Asgardeo Nuxt SDK.

- **Client ID** - The unique identifier for your application.
- **Client Secret** - The confidential secret generated for your application.
- **Base URL** - The base URL of your {{ product_name }} organization. This typically follows the format `{{content.sdkconfig.baseUrl}}`.

!!! Info

    The authorized redirect URL is the address {{ product_name }} sends the user back to after a successful sign-in. The SDK exposes this callback at `/api/auth/callback`, so for local development you must register `http://localhost:3000/api/auth/callback`.

## Create a Nuxt app

Create your new Nuxt app.

=== "npm"

    ```bash
    npm create nuxt@latest {{ product }}-nuxt
    cd {{ product }}-nuxt
    npm run dev
    ```

=== "yarn"

    ```bash
    yarn create nuxt@latest {{ product }}-nuxt
    cd {{ product }}-nuxt
    yarn dev
    ```

=== "pnpm"

    ```bash
    pnpm create nuxt@latest {{ product }}-nuxt
    cd {{ product }}-nuxt
    pnpm dev
    ```

## Install `@asgardeo/nuxt`

The Asgardeo Nuxt SDK is shipped as a Nuxt module. It registers a Nitro server plugin that runs the OAuth flow, a set of API routes under `/api/auth/*`, and auto-imported components and composables you can use anywhere in your app. Stop the dev server before installing the module.

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

## Set up environment variables

Create a `.env` file in the root of your Nuxt project. The Nuxt module reads `NUXT_PUBLIC_*` variables on the client and the unprefixed secrets on the server only.

```bash title=".env"
NUXT_PUBLIC_ASGARDEO_BASE_URL="{{content.sdkconfig.baseUrl}}"
NUXT_PUBLIC_ASGARDEO_CLIENT_ID="<your-app-client-id>"
ASGARDEO_CLIENT_SECRET="<your-app-client-secret>"
ASGARDEO_SESSION_SECRET="<random-32-character-string>"
```

!!! Important
    `ASGARDEO_CLIENT_SECRET` and `ASGARDEO_SESSION_SECRET` are server-only values — they are never sent to the browser. Do **not** prefix them with `NUXT_PUBLIC_`. Generate `ASGARDEO_SESSION_SECRET` as a strong random string (for example, `openssl rand -hex 32`); it is used to sign the session cookie.

{% if product_name == "WSO2 Identity Server" %}
!!! Note
    If you are running in a local development or testing environment using self-signed SSL certificates, the application may fail to connect to {{ product_name }} due to TLS certificate validation errors. To bypass this check, add `NODE_TLS_REJECT_UNAUTHORIZED=0` to the `.env` file.
{% endif %}

## Register the Asgardeo Nuxt module

Open `nuxt.config.ts` and add `@asgardeo/nuxt` to the `modules` array. The SDK reads the credentials you set in `.env` automatically — you only need to declare the module.

```typescript title="nuxt.config.ts" hl_lines="2 4-7"
export default defineNuxtConfig({
  modules: ['@asgardeo/nuxt'],

  asgardeo: {
    afterSignInUrl: '/',
    afterSignOutUrl: '/',
  },
});
```

The `asgardeo` block is where you tune SDK behavior such as the post sign-in / sign-out destinations. `baseUrl`, `clientId`, `clientSecret`, and `sessionSecret` are picked up from the environment variables, so you do not need to repeat them here.

## Wrap your app with `<AsgardeoRoot />`

`<AsgardeoRoot />` is the Nuxt equivalent of the React `AsgardeoProvider`. It mounts the SDK's full provider tree (auth, user, organization, branding, theme) and exposes the SSR-hydrated state to every composable below it. The component is auto-registered by the module — you do not need to import it.

Replace the contents of `app.vue` with the following.

```vue title="app.vue" hl_lines="2 4"
<template>
  <AsgardeoRoot>
    <NuxtPage />
  </AsgardeoRoot>
</template>
```

!!! Info
    All SDK components are auto-registered with the `Asgardeo` prefix (for example, `AsgardeoSignedIn`, `AsgardeoSignInButton`, `AsgardeoUserDropdown`). You can use them directly in any `<template>` without an explicit import.

## Add sign-in and sign-out to your app

The Asgardeo Nuxt SDK provides `<AsgardeoSignInButton />` and `<AsgardeoSignOutButton />` to start and end a session. Combine them with `<AsgardeoSignedIn />` and `<AsgardeoSignedOut />` to render content based on the user's authentication state.

Create a `pages/index.vue` file (or replace its contents if it already exists) with the following.

```vue title="pages/index.vue" hl_lines="3-8"
<template>
  <header>
    <AsgardeoSignedOut>
      <AsgardeoSignInButton />
    </AsgardeoSignedOut>
    <AsgardeoSignedIn>
      <AsgardeoSignOutButton />
    </AsgardeoSignedIn>
  </header>
</template>
```

When the user clicks **Sign In**, the SDK calls `/api/auth/signin`, which redirects the browser to {{ product_name }}'s sign-in page. After authentication, {{ product_name }} sends the user back to `/api/auth/callback` where the SDK exchanges the authorization code for tokens and issues the session cookie.

## Display the signed-in user's profile information

The SDK ships ready-made user components and a `useAsgardeo()` composable for reading the current session. Use whichever fits the surface you are building:

- `<AsgardeoUserDropdown />` — a dropdown with the user's avatar, basic profile info, and a built-in sign-out action.
- `<AsgardeoUserProfile />` — a full profile view that lets the user inspect and update their attributes.
- `useAsgardeo()` — programmatic access to `isSignedIn`, `user`, `signIn()`, and `signOut()`.

Update `pages/index.vue` to render the dropdown and a personalized greeting.

{% raw %}
```vue title="pages/index.vue" hl_lines="2 11-14 19-22"
<script setup lang="ts">
const { user } = useAsgardeo();
</script>

<template>
  <header>
    <AsgardeoSignedOut>
      <AsgardeoSignInButton />
    </AsgardeoSignedOut>
    <AsgardeoSignedIn>
      <AsgardeoUserDropdown />
      <AsgardeoSignOutButton />
    </AsgardeoSignedIn>
  </header>

  <main>
    <AsgardeoSignedIn>
      <p>
        Welcome back,
        {{ user?.givenName ?? user?.username ?? user?.sub }}.
      </p>
      <AsgardeoUserProfile />
    </AsgardeoSignedIn>
  </main>
</template>
```
{% endraw %}

`useAsgardeo()` reads from server-hydrated state, so on the very first render the user object is already populated — no client-side flicker.

## Protect a page with middleware

Use `defineAsgardeoMiddleware()` to gate any route behind authentication. Unauthenticated visitors are redirected to the sign-in flow automatically.

Create the middleware file:

```typescript title="middleware/auth.ts"
export default defineAsgardeoMiddleware();
```

Then opt any page into protection with `definePageMeta`. For example, create a `pages/dashboard.vue`:

{% raw %}
```vue title="pages/dashboard.vue"
<script setup lang="ts">
definePageMeta({ middleware: ['auth'] });

const { flattenedProfile } = useUser();
</script>

<template>
  <h1>Dashboard</h1>
  <pre>{{ flattenedProfile }}</pre>
</template>
```
{% endraw %}

`useUser()` returns the SCIM 2.0 profile that the SDK fetched on the server during SSR, so the page renders with the data ready on first paint.

## Choose how users will sign in

Before running the app, you need to decide how you want users to sign into your application:

<div class="mode-selection-container" data-selection-group="quickstart">
  <button class="md-typeset md-button mode-selection-btn active" data-quickstart="redirect" data-next-step="10" data-default="true">
    <input type="radio" name="quickstart-mode" class="mode-radio" data-selection-radio checked>
    <span class="radio-circle"></span>
    Redirect to {{ product_name }} (Default)
  </button>
  <button class="md-typeset md-button mode-selection-btn" data-quickstart="embedded" data-next-step="10">
    <input type="radio" name="quickstart-mode" class="mode-radio" data-selection-radio>
    <span class="radio-circle"></span>
    Show sign-in form in your app
  </button>
</div>

<div class="mode-content" data-content-for="quickstart" data-content-value="redirect">

When users click **Sign In**, your app navigates to `/api/auth/signin` which redirects them to {{ product_name }}'s hosted sign-in page. After they sign in, {{ product_name }} redirects them back to `/api/auth/callback` in your app where the server exchanges the code for tokens. This default behavior works without extra configuration.

</div>

<div class="mode-content" data-content-for="quickstart" data-content-value="embedded" style="display: none;">

The sign-in form appears directly inside your application using the `<AsgardeoSignIn>` component. Users never leave your app during the sign-in process. When `signInUrl` is set in the module config, `<AsgardeoSignInButton>` navigates to that page instead of redirecting to {{ product_name }}.

</div>

## Enable `App-Native Authentication` [//] SHOW_IF="data-quickstart=embedded"

The embedded sign-in functionality depends on the **App-Native Authentication** feature. This feature allows your app to authenticate users without redirecting them to the {{ product_name }} sign-in page.

To enable this feature, follow these steps:

- Navigate to {{ product_name }} Console.
- Go to **Applications > Your App > Advanced**.
- Enable **App-Native Authentication** by checking the checkbox.

!!! Info

    Read more about [App-Native Authentication]({{ base_path }}/guides/authentication/app-native-authentication/){:target="_blank"} to understand how it works.

## Set up the in-app sign-in form [//] SHOW_IF="data-quickstart=embedded"

Create a dedicated sign-in page that renders the embedded form. Create `pages/sign-in.vue`:

```vue title="pages/sign-in.vue"
<script setup lang="ts">
function onSuccess() {
  navigateTo('/');
}
</script>

<template>
  <AsgardeoSignIn @success="onSuccess" />
</template>
```

Then update `nuxt.config.ts` to tell the module about the sign-in page. When `signInUrl` is set, `<AsgardeoSignInButton>` navigates to that URL instead of triggering the redirect flow:

```typescript title="nuxt.config.ts" hl_lines="5"
export default defineNuxtConfig({
  modules: ['@asgardeo/nuxt'],

  asgardeo: {
    signInUrl: '/sign-in',
    afterSignInUrl: '/',
    afterSignOutUrl: '/',
  },
});
```

!!! Info

    If your sign-in flow includes social login steps (e.g. Google, GitHub), those steps redirect the user's browser to the external provider and then back to your app. Create a `pages/callback.vue` to handle this:

    ```vue title="pages/callback.vue"
    <template>
      <AsgardeoCallback @error="(err) => console.error(err)" />
    </template>
    ```

    You must also register `http://localhost:3000/callback` as an additional **Authorized redirect URL** in the {{ product_name }} Console for the social login redirect to be accepted.

## Run the app [//] SHOW_IF="data-quickstart=redirect,data-quickstart=embedded"

Start the dev server.

=== "npm"

    ```bash
    npm run dev
    ```

=== "yarn"

    ```bash
    yarn dev
    ```

=== "pnpm"

    ```bash
    pnpm dev
    ```

Visit your app's homepage at [http://localhost:3000](http://localhost:3000).

!!! Important
    To try out sign-in and sign-out, create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"}.

[//] STEPS_END
