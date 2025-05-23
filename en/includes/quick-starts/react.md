# React Quickstart

Welcome to the React Quickstart guide! In this document, you will learn to build a React app, add user sign-in and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application**.
- Select **Single Page Application** and complete the wizard popup by providing a suitable name and an authorized redirect URL. 

!!! Example
    **name:** {{ product }}-react
    
    **Authorized redirect URL:** http://localhost:5173

Note down the following values from the **Protocol** tab of the registered application. You will need them to configure  Asgardeo React SDK.

- **`client-id`** from the **Protocol** tab. 
- **The name of your {{ product_name }} organization**


!!! Info

    The authorized redirect URL determines where {{ product_name }} should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use`http://localhost:5173`, as the sample app will be accessible at this URL.

## Create a React app using Vite

Create (a.k.a scaffold) your new React app using [Vite](https://vite.dev/).

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

Asgardeo React SDK provides all the components and hooks you need to integrate {{ product_name }} into your app. To get started, simply add the Asgardeo React SDK to the project. Make sure to stop the dev server started in the previous step. 

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

The `<AsgardeoProvider />` serves as a context provider for user sign-in in the app. You can add the AsgardeoProvider to your app by wrapping  the root component.

Add the following changes to the `main.jsx` file.

!!! Important

    Replace below placeholders with your registered organization name in {{ product_name }} and the generated`client-id` from the app you registered in {{ product_name }}.

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
      config={ {
        signInRedirectURL: 'http://localhost:5173',
        signOutRedirectURL: 'http://localhost:5173',
        clientID: '<your-app-client-id>',
        baseUrl: '{{content.sdkconfig.baseUrl}}',
        scope: ['openid', 'profile'],
      } }
    >
      <App />
    </AsgardeoProvider>
  </StrictMode>
)
```

## Add signed-in and signed-out to your app

Asgardeo SDK provides `useAsgardeo` hook to conveniently access user authentication data and sign-in and sign-out functions.

Replace the existing content of the `App.jsx` file with following content.

```javascript title="src/App.jsx"  hl_lines="1 7-12"
import { SignedIn, SignedOut, SignInButton, SignOutButton } from '@asgardeo/react'
import './App.css'

function App() {
  return (
    <>
      <SignedIn>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  )
}

export default App
```

Visit your app's homepage at [http://localhost:5173](http://localhost:5173).

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout sign-in and signed-out features.

## Display signed-in in user details

The `User` component from Asgardeo provides access to the signed-in in user's profile information.
You can use it to display user details like name, email, profile picture, and other user profile attributes.

```javascript title="src/App.jsx" hl_lines="1 8-15"
import { User } from '@asgardeo/react'
import './App.css'

function App() {
  return (
    <>
      <SignedIn>
        <User>
          {(user) => (
            <div>
              <img src={user.picture} alt={user.name} />
              <p>Welcome back, {user.name}</p>
            </div>
          )}
        </User>
        <SignOutButton />
      </SignedIn>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  )
}

export default App
```

## Using the `useAsgardeo` Hook (For Programmatic Control)

For more granular control, you can use the `useAsgardeo` hook. This hook provides direct access to SDK's functions and state:

```javascript title="src/components/AuthStatus.jsx"
import { useAsgardeo } from '@asgardeo/react'
import './App.css'

function App() {
  const { user, signIn, signOut, isSignedIn, isLoading } = useAsgardeo()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      {isSignedIn ? (
        <div>
          <div>
            <img src={user.picture} alt={user.name} />
            <p>Welcome back, {user.name}</p>
          </div>
          <button onClick={() => signOut()}>Sign Out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </div>
  )
}
```

The `useAsgardeo` hook provides:

- `user` - The authenticated user's profile information
- `signIn()` - Function to initiate the sign-in flow
- `signOut()` - Function to sign out the current user
- `isSignedIn` - Boolean indicating if a user is currently signed in
- `isLoading` - Boolean indicating if the authentication state is being determined

!!! tip
    Use `useAsgardeo` when you need programmatic control over authentication or want to access state & functions in custom components.

[//] STEPS_END
