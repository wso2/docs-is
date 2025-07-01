# React Quickstart

Welcome to the React Quickstart guide! In this document, you will learn to build a React app, add user sign-in and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into the {{ product_name }} Console and navigate to **Applications > New Application**.
- Select **React** and complete the wizard by providing a suitable name and an authorized redirect URL.

!!! Example
    **Name:** `{{ product }}-react`

    **Authorized redirect URL:** `http://localhost:5173`

Once you finish creating the application, note down the following values from its **Guide** tab. You will need them to configure Asgardeo React SDK.

- **Client ID** - The unique identifier for your application.
- **Base URL** - The base URL of your {{ product_name }} organization. This typically follows the format `{{content.sdkconfig.baseUrl}}`

!!! Info

    The authorized redirect URL determines where {{ product_name }} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use `http://localhost:5173`, as the sample app will be accessible at this URL.

## Create a React app using Vite

Create (scaffold) your new React app using [Vite](https://vite.dev/).

=== "npm"

    ```bash
    npm create vite@latest {{ product }}-react -- --template react
    cd {{ product }}-react
    npm install
    npm run dev
    ```

=== "yarn"

    ```bash
    yarn create vite@latest {{ product }}-react -- --template react
    cd {{ product }}-react
    yarn install
    yarn dev
    ```

=== "pnpm"

    ```bash
    pnpm create vite@latest {{ product }}-react -- --template react
    cd {{ product }}-react
    pnpm install
    pnpm dev
    ```

## Install `@asgardeo/react`

Asgardeo React SDK provides all the components and hooks you need to integrate {{ product_name }} into your app. To get started, simply add the Asgardeo React SDK to the project. Make sure to stop the dev server you started in the previous step.

=== "npm"

    ```bash
    npm install @asgardeo/react
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/react
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/react
    ```

## Add `<AsgardeoProvider />` to your app

The `<AsgardeoProvider />` serves as a context provider for the SDK. You can integrate this provider to your app by wrapping the root component.

Add the following changes to the `main.jsx` file.

!!! Important

    Replace below placeholders with your registered organization name in {{ product_name }} and the generated `client-id` from the app you registered in {{ product_name }}.

    - `<your-app-client-id>`
    - `{{content.sdkconfig.baseUrl}}`

```javascript title="src/main.jsx" hl_lines="5 9-12 14"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AsgardeoProvider } from '@asgardeo/react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AsgardeoProvider
      clientId="<your-app-client-id>"
      baseUrl="{{content.sdkconfig.baseUrl}}"
    >
      <App />
    </AsgardeoProvider>
  </StrictMode>
)
```

## Add sign-in and sign-out to your app

Asgardeo SDK provides `SignInButton`, `SignOutButton` components to handle user sign-in and sign-out. You can use these components along side `SignedIn` and `SignedOut` components to conditionally render content based on the user's logged in state.

Replace the existing content of the `App.jsx` file with following content.

```javascript title="src/App.jsx"  hl_lines="1 7-12"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@asgardeo/react'
import './App.css'

function App() {
  return (
    <header>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </header>
  )
}

export default App
```

## Display signed-in user's profile information

You can use the `User`, `UserProfile`, or `UserDropdown` components to access and display user profile information in a declarative way.

- `User`: The `User` component provides a render prop pattern to access user profile information:
- `UserProfile`: The `UserProfile` component provides a declarative way to display and update user profile information.
- `UserDropdown`: The `UserDropdown` component provides a dropdown menu with built-in user information and sign-out functionality.

```javascript title="src/App.jsx" hl_lines="1 9 18-25"
import { SignedIn, SignedOut, SignInButton, SignOutButton, User, UserDropdown, UserProfile } from '@asgardeo/react'
import './App.css'

function App() {
  return (
    <>
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
          <User>
            {(user) => (
              <div>
                <p>Welcome back, {user.userName || user.username || user.sub}</p>
              </div>
            )}
          </User>
          <UserProfile />
        </SignedIn>
      </main>
    </>
  )
}

export default App
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
