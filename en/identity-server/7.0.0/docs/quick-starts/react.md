---
template: templates/quick-start.html
heading: React Quickstart
description: Welcome to the React Quickstart guide! In this document, you will learn to build a React app, add user login and display user profile information using WSO2 Identity Server.
what_you_will_learn:
  - Create new React app using Vite
  - Install <a href="https://github.com/asgardeo/asgardeo-auth-react-sdk" target="_blank">@asgardeo/auth-react</a> package
  - Add user login and logout
  - Display user profile information
prerequisites:
  - About 15 minutes
  - <a href="{{ base_path }}/get-started/quick-set-up/">Set-up WSO2 Identity Server</a>
  - Install <a href="https://nodejs.org/en/download/package-manager" target="_blank" rel="noopener noreferrer">Node.js</a> on your system.
  - Make sure you have a JavaScript package manager like <code>npm</code>, <code>yarn</code>, or <code>pnpm</code>.
  - A favorite text editor or IDE
source_code: <a href="https://github.com/asgardeo/asgardeo-auth-react-sdk/tree/main/samples/asgardeo-react-app" target="_blank" class="github-icon">React Vite App Sample</a>
whats_next:
  - Try out <a href="{{ base_path }}/complete-guides/react/introduction/" target="_blank">{{ product_name }} complete React guide</a>
  - Try out {{product_name}} user onboarding complete guide for React
  - Read security best practices for React app guide
---
## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to Applications > New Application.
- Select Single Page Application and complete the wizard popup by providing a suitable name and an authorized redirect URL

  - Name -  IS-React
  - Authorized redirect URL - `http://localhost:5173`

!!! Info

    The authorized redirect URL determines where WSO2 Identity Server should send users after they successfully log in. Typically, this will be the web address where your app is hosted. For this guide, we'll use`http://localhost:5173`, as the sample app will be accessible at this URL.

!!! note

    Note down the following values : you will need them during the **Step 4**

    - `client-id`
    - `base-url`
    - `redirect-url`

## Create a React app using Vite

Create (a.k.a scaffold) your new React app using Vite.

=== "npm"

    ``` bash
    npm create vite@latest is-react -- --template react

    cd is-react

    npm install

    npm run dev
    ```

=== "yarn"

    ``` bash
    yarn create vite@latest is-react -- --template react

    cd is-react

    yran install

    yarn dev
    ```

=== "pnpm"

    ``` bash
    pnpm create vite@latest is-react -- --template react

    cd is-react

    pnpm install

    pnpm run dev
    ```

## Install @asgardeo/auth-react

Asgardeo React SDK provides all the components and hooks you need to integrate Asgardeo into your app. To get started, simply add the Asgardeo React SDK to the project. Make sure to stop the dev server started in the previous step. 

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


!!! Info

    Asgardeo-branded SDKs can be used to build apps to work with the all WSO2 identity suite of products that includes WSO2 Identity Server (WSO2 IS), WSO2 Private Identity Cloud (WSO2 PIC), and Asgardeo.
    


## Add `<AuthProvider />` to your app

The `<AuthProvider />` serves as a context provider for user login in the app. You can add the AuthProvider to your app by  wrapping  the root component.

Add the following changes to the `main.jsx` file.

!!! Important

    Replace below placeholders with the generated`client-id` from the app you registered in WSO2 Identity Server.

    - `<your-app-client-id>`
    

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthProvider } from '@asgardeo/auth-react';
import './index.css';

const config = {
    signInRedirectURL: "http://localhost:5173",
    signOutRedirectURL: "http://localhost:5173",
    clientID: "<your-app-client-id>",
    baseUrl: "https://localhost:9443",
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

Asgardeo React SDK provides `useAuthContext` hook to conveniently access user authentication data and sign-in and sign-out methods.

Replace the existing content of the `App.jsx` file with following content.

```javascript
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

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout login and logout features.

## Display logged in user details

Modified the code as below to see logged in user details.

```javascript
...

const App = () => {
...

return (
    <>
        {
            state.isAuthenticated ?
            <>
                <p>Welcome {state.username}</p>
                <button onClick={() => signOut()}>Logout</button>
            </>
            : <button onClick={() => signIn()}>Login</button>
        }
    </>
)
};

...
```
