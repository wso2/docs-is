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
NUXT_PUBLIC_ASGARDEO_AFTER_SIGN_OUT_URL="<after-sign-out-redirect-url>"
ASGARDEO_CLIENT_SECRET="<your-app-client-secret>"
```

{% if product_name == "WSO2 Identity Server" %}
!!! Note
    If you are running in a local development or testing environment using self-signed SSL certificates, the application may fail to connect to {{ product_name }} due to TLS certificate validation errors. To bypass this check, add `NODE_TLS_REJECT_UNAUTHORIZED=0` to the `.env` file.
{% endif %}

## Register the Asgardeo Nuxt module

Open `nuxt.config.ts` and add `@asgardeo/nuxt` to the `modules` array. The SDK reads the credentials you set in `.env` automatically — you only need to declare the module.

```typescript title="nuxt.config.ts" hl_lines="2"
export default defineNuxtConfig({
  modules: ['@asgardeo/nuxt'],
});
```

The SDK reads your credentials from the environment variables automatically. You can optionally configure post sign-in / sign-out destinations in the `asgardeo` config block if needed.

## Wrap your app with `<AsgardeoProvider />`

`<AsgardeoProvider />` mounts the SDK's full provider tree (auth, user, organization, branding, theme) and exposes the SSR-hydrated state to every composable below it. The component is auto-registered by the module — you do not need to import it.

Replace the contents of `app.vue` with the following.

```vue title="app.vue" hl_lines="2 4"
<template>
  <AsgardeoProvider>
    <NuxtPage />
  </AsgardeoProvider>
</template>
```

!!! Info
    All SDK components are auto-registered (for example, `SignedIn`, `SignInButton`, `UserDropdown`). You can use them directly in any `<template>` without an explicit import.

## Add sign-in and sign-out to your app

The Asgardeo Nuxt SDK provides `<SignInButton />` and `<SignOutButton />` to start and end a session. Combine them with `<SignedIn />` and `<SignedOut />` to render content based on the user's authentication state.

Create a `pages/index.vue` file (or replace its contents if it already exists) with the following.

```vue title="pages/index.vue" hl_lines="3-8"
<template>
  <header>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <SignOutButton />
    </SignedIn>
  </header>
</template>
```

When the user clicks **Sign In**, the SDK calls `/api/auth/signin`, which redirects the browser to {{ product_name }}'s sign-in page. After authentication, {{ product_name }} sends the user back to `/api/auth/callback` where the SDK exchanges the authorization code for tokens and issues the session cookie.

## Display the signed-in user's profile information

The SDK provides several ways to access the signed-in user's profile information. You can use the `User`, `UserProfile`, or `UserDropdown` components to access and display user profile information in a declarative way.

- `<User />`: Component provides a scoped slot (v-slot) pattern to access user profile information:
- `<UserProfile />` — Component provides a declarative way to display and update user profile information.
- `<UserDropdown />` — Component provides a dropdown menu with built-in user information and sign-out functionality.

Update `pages/index.vue` to render the dropdown and a personalized greeting.

{% raw %}

```vue title="pages/index.vue" hl_lines="7 14-19"
<template>
  <header>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <SignedIn>
      <UserDropdown />
      <SignOutButton />
    </SignedIn>
  </header>

  <main>
    <SignedIn>
      <User v-slot="{ user }">
        <div>
          <p>Welcome back, {{ user.userName || user.username || user.sub }}</p>
        </div>
      </User>
      <UserProfile />
    </SignedIn>
  </main>
</template>
```

{% endraw %}

## Protect a page with middleware

The Asgardeo Nuxt SDK provides a named middleware called `asgardeoMiddleware` that you can use to gate any route behind authentication. Unauthenticated visitors are redirected to the sign-in flow automatically.

Use `definePageMeta` to apply the `asgardeoMiddleware` middleware to any page. For example, create a `pages/dashboard.vue`:

{% raw %}

```vue title="pages/dashboard.vue" hl_lines="2"
<script setup lang="ts">
  definePageMeta({ middleware: ['asgardeoMiddleware'] });
</script>
```

{% endraw %}

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

When users click `Sign In`, your app redirects them to {{ product_name }}'s sign-in page. After they sign in, it redirects them back to your app. This default behavior works without extra configurations.

</div>

<div class="mode-content" data-content-for="quickstart" data-content-value="embedded" style="display: none;">

The sign-in form appears directly inside your application using the `SignIn` component. Users never leave your app during the sign-in process.

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

```vue title="pages/sign-in.vue" hl_lines="2"
<template>
  <SignIn />
</template>
```

Then, update the `.env` file with the route for the sign-in page. Add the following line to your `.env` file:

```bash title=".env"
NUXT_PUBLIC_ASGARDEO_SIGN_IN_URL="/sign-in"
```

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
