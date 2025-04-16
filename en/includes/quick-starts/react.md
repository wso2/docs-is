# React Quickstart

Welcome to the React Quickstart guide! In this document, you will learn to build a React app, add user login and display user profile information using {{ product_name }}.

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

Create (a.k.a scaffold) your new React app using Vite.

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

## Install @asgardeo/auth-react

Asgardeo React SDK provides all the components and hooks you need to integrate {{ product_name }} into your app. To get started, simply add the Asgardeo React SDK to the project. Make sure to stop the dev server started in the previous step. 

=== "npm"

    ```bash
    npm install @asgardeo/auth-react
    ```

=== "yarn"

    ```bash
    yarn add @asgardeo/auth-react
    ```

=== "pnpm"

    ```bash
    pnpm add @asgardeo/auth-react
    ```

## Add `<AuthProvider />` to your app

The `<AuthProvider />` serves as a context provider for user login in the app. You can add the AuthProvider to your app by wrapping  the root component.

Add the following changes to the `main.jsx` file.

!!! Important

    Replace below placeholders with your registered organization name in {{ product_name }} and the generated`client-id` from the app you registered in {{ product_name }}.

    - `<your-app-client-id>`
    - `https://api.asgardeo.io/t/<your-organization-name>`

```javascript title="src/main.jsx" hl_lines="5 9-17 19"
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '@asgardeo/auth-react'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider
      config={ {
        signInRedirectURL: 'http://localhost:5173',
        signOutRedirectURL: 'http://localhost:5173',
        clientID: '<your-app-client-id>',
        baseUrl: 'https://api.asgardeo.io/t/<your-organization-name>',
        scope: ['openid', 'profile'],
      } }
    >
      <App />
    </AuthProvider>
  </StrictMode>
)
```

## Add login and logout link to your app

Asgardeo SDK provides `useAuthContext` hook to conveniently access user authentication data and sign-in and sign-out methods.

Replace the existing content of the `App.jsx` file with following content.

```javascript title="src/App.jsx"  hl_lines="1 5 9-13"
import { useAuthContext } from '@asgardeo/auth-react'
import './App.css'

function App() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <>
      {state.isAuthenticated ? (
        <button onClick={() => signOut()}>Logout</button>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </>
  )
}

export default App
```

Visit your app's homepage at [http://localhost:5173](http://localhost:5173).

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features.

## Display logged in user details

Modify the code as below to see logged in user details.

```javascript title="src/App.jsx" hl_lines="11"
import { useAuthContext } from '@asgardeo/auth-react'
import './App.css'

function App() {
  const { state, signIn, signOut } = useAuthContext();

  return (
    <>
      {state.isAuthenticated ? (
        <>
          <p>Welcome {state.username}</p>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </>
  )
}

export default App
```

[//] STEPS_END
