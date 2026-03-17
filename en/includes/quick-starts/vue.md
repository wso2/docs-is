# Vue quickstart

Welcome to the Vue quickstart guide! In this document, you will learn to build a Vue app, add user sign-in, and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an application in {{ product_name }}

- Sign into the {{ product_name }} Console and navigate to **Applications > New Application**.
- Select **Vue** and complete the wizard by providing a suitable name and an authorized redirect URL.

!!! Example
    **Name:** `{{ product }}-vue`

    **Authorized redirect URL:** `http://localhost:5173`

Once you finish creating the application, note down the following values from its **Guide** tab. You will need them to configure the Asgardeo Vue SDK.

- **Client ID** - The unique identifier for your application.
- **Base URL** - The base URL of your {{ product_name }} organization. This typically follows the format `{{content.sdkconfig.baseUrl}}`

!!! Info

    The authorized redirect URL determines where {{ product_name }} should send users after they successfully sign in. Typically, this will be the web address where your app is hosted. For this guide, we'll use `http://localhost:5173`, as the sample app will be accessible at this URL.

## Create a Vue app using Vite

Create (scaffold) your new Vue app using [Vite](https://vite.dev/).

=== "npm"

    ```bash
    npm create vite@latest {{ product }}-vue -- --template vue
    cd {{ product }}-vue
    npm install
    npm run dev
    ```

=== "yarn"

    ```bash
    yarn create vite@latest {{ product }}-vue -- --template vue
    cd {{ product }}-vue
    yarn install
    yarn dev
    ```

=== "pnpm"

    ```bash
    pnpm create vite@latest {{ product }}-vue -- --template vue
    cd {{ product }}-vue
    pnpm install
    pnpm dev
    ```

## Install `@asgardeo/vue`

Asgardeo Vue SDK provides all the components and composables you need to integrate {{ product_name }} into your app. To get started, simply add the Asgardeo Vue SDK to the project. Make sure to stop the dev server you started in the previous step.

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

## Add `AsgardeoPlugin` and `<AsgardeoProvider />` to your app

`AsgardeoPlugin` registers the Asgardeo Vue SDK globally with your Vue application. `<AsgardeoProvider />` wraps your app and makes authentication context available to all child components.

Add the following changes to `main.js` to register the plugin.

```javascript title="src/main.js" hl_lines="3 6"
import { createApp } from 'vue'
import './style.css'
import { AsgardeoPlugin } from '@asgardeo/vue'
import App from './App.vue'

createApp(App)
  .use(AsgardeoPlugin)
  .mount('#app')
```

Then replace the contents of `App.vue` with the following to wrap your app with `<AsgardeoProvider />`.

!!! Important

    Replace the following placeholders with your registered organization name in {{ product_name }} and the generated `client-id` from the app you registered in {{ product_name }}.

    - `<your-app-client-id>`
    - `{{content.sdkconfig.baseUrl}}`

```vue title="src/App.vue" hl_lines="2-4"
<template>
  <AsgardeoProvider
    client-id="<your-app-client-id>"
    base-url="{{content.sdkconfig.baseUrl}}"
  >
    <!-- Your app content goes here -->
  </AsgardeoProvider>
</template>
```

## Add sign-in and sign-out to your app

Asgardeo Vue SDK provides `SignInButton` and `SignOutButton` components to handle user sign-in and sign-out. Use these components alongside `SignedIn` and `SignedOut` to conditionally render content based on the user's sign-in state.

Replace the contents of `App.vue` with the following.

```vue title="src/App.vue" hl_lines="1-3 10-16"
<script setup>
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@asgardeo/vue'
</script>

<template>
  <AsgardeoProvider
    client-id="<your-app-client-id>"
    base-url="{{content.sdkconfig.baseUrl}}"
  >
    <header>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  </AsgardeoProvider>
</template>
```

## Display the signed-in user's profile information

You can use the `UserProfile` or `UserDropdown` components to display user profile information in a declarative way.

- `UserProfile`: Displays and allows the user to edit their profile information.
- `UserDropdown`: Provides a dropdown menu with built-in user information and sign-out functionality.

```vue title="src/App.vue" hl_lines="2 12 19-23"
<script setup>
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserDropdown, UserProfile } from '@asgardeo/vue'
</script>

<template>
  <AsgardeoProvider
    client-id="<your-app-client-id>"
    base-url="{{content.sdkconfig.baseUrl}}"
  >
    <header>
      <SignedIn>
        <UserDropdown />
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
    <main>
      <SignedIn>
        <UserProfile />
      </SignedIn>
    </main>
  </AsgardeoProvider>
</template>
```

## Run the app

To run the app, use the following command:

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

Visit your app's homepage at [http://localhost:5173](http://localhost:5173).

!!! Important

    To try out sign-in and sign-out features, create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"}.

[//] STEPS_END
