---
template: templates/quick-start.html
heading: React Quickstart
description: Welcome to the React Quickstart guide! In this document, you will learn to build a React application, add user login and display user profile information using Asgardeo.
what_you_will_learn:
  - Create new React app using Vite
  - Install <a href="https://github.com/asgardeo/asgardeo-auth-react-sdk" target="_blank">@asgardeo/auth-react</a> package
  - Add user login and logout
  - Display user profile information
prerequisites:
  - About 15 minutes
  - <a href="{{ config.extra.base_path }}/get-started/create-asgardeo-account/">Asgardeo account</a>
  - Install a JS package manager
  - A favorite text editor or IDE
source_code: <a href="https://github.com/asgardeo/asgardeo-auth-react-sdk/tree/main/samples/asgardeo-react-app" target="_blank" class="github-icon">React Vite App Sample</a>
whats_next:
  - Try out Asgardeo complete React guide
  - Try out Asgardeo user onboarding complete guide for React
  - Read Asgardeo security best practices for React app guide
---

## Configure an application Asgardeo

- Sign into Asgardeo console and navigate to Applications > New Application.

- Select Single Page Application and Complete the wizard popup by providing a suitable name and an authorized redirect URL
  - Name -  Asgardeo-React
  - Authorized redirect URL - `https://localhost:5173`

!!! abstract

    The authorized redirect URL determines where Asgardeo should send users after they successfully log in. Typically, this will be the web address where your application is hosted. For this guide, we'll use `https://localhost:5173`, as the sample application will be accessible at this URL.

!!! note

    Note down the following values : you will need them during the **Step 4**

    - `client-id`
    - `base-url` 
    - `redirect-url`

## Create a React application using Vite

Create (a.k.a scaffold) your new React application using Vite.

=== "npm"

    ``` bash
    npm create vite@latest asgardeo-react -- --template react

    cd asgardeo-react

    npm install

    npm run dev
    ```

=== "yarn"

    ``` bash
    yarn create vite@latest asgardeo-react -- --template react

    cd asgardeo-react

    yran install

    yarn dev
    ```

=== "pnpm"

    ``` bash
    pnpm create vite@latest asgardeo-react -- --template react

    cd asgardeo-react

    pnpm install

    pnpm run dev
    ```

## Install @asgardeo/auth-react 

Asgardeo React SDK provides all the components and hooks you need to integrate Asgardeo into your app. To get started, simply add the Asgardeo React SDK to the project.

=== "npm"

    ``` bash
    npm install @asgardeo/auth-react 
    ```

=== "yarn"

    ``` bash
    yarn add @asgardeo/auth-react 
    ```

=== "pnpm"

    ``` bash
    pnpm add @asgardeo/auth-react 
    ```

## Add <AuthProvider /> to your app

The `<AuthProvider />` serves as a context provider for user login in the app. You can add the AuthProvider to your app by  wrapping  the root component. 

Add the following changes to the `main.jsx` file.

!!! note

    Replace below placeholders with your registered organization name in Asgardeo and the generated `client-id` from the app you registered in Asgardeo.

    - `<your-app-client-id>`
    - `https://api.asgardeo.io/t/<your-organization-name>` 

```javascript title="src/main.jsx" hl_lines="4 7-13 17 19" linenums="1"
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from '@asgardeo/auth-react';
import './index.css';

const config = {
    signInRedirectURL: "http://localhost:5173",
    signOutRedirectURL: "http://localhost:5173",
    clientID: "<your-app-client-id>",
    baseUrl: "https://api.asgardeo.io/t/<your-organization-name>",
    scope: [ "openid","profile" ]
}

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
    <AuthProvider config={ config }>
        <App />
    </AuthProvider>
</React.StrictMode>,
);

```

## Add login and logout link to your app 

Asgardeo provides `useAuthContext` hook to conveniently access user authentication data and sign-in and sign-out methods. 

Replace the existing content of the `App.jsx` file with following content.

```javascript title="src/App.jsx" hl_lines="1 5 9-13" linenums="1"
import { useAuthContext } from "@asgardeo/auth-react";
import './App.css';

const App = () => {
const { state, signIn, signOut } = useAuthContext();

return (
    <>
    {
        state.isAuthenticated
        ? <button onClick={() => signOut()}>Logout</button>
        : <button onClick={() => signIn()}>Login</button>
    }
    </>
)
};

export default App;
```

Visit your app's homepage at [http://localhost:5173](http://localhost:5173). 

!!! tip

    You need to create a test user in Asgardeo by following this guide  to tryout login and logout features. 

## Display logged in user details

Modified the code as below to see logged in user details.

```javascript title="src/App.jsx" hl_lines="8-15" linenums="1"
...

const App = () => {
...

return (
    <>
    {
        state.isAuthenticated ?
        <>
            <p>Welocme {state.username}</p>
            <button onClick={() => signOut()}>Logout</button>
        </>
        : <button onClick={() => signIn()}>Login</button>
    }
    </>
)
};

...
```
