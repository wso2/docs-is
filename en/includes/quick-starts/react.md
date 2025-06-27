# React Quickstart

Welcome to the React Quickstart guide! In this document, you will learn to build a React app, add user sign-in and display user profile information using {{ product_name }}.

[//] STEPS_START

## Configure an Application in {{ product_name }}

- Sign into {{ product_name }} console and navigate to **Applications > New Application**.
- Select **React** and complete the wizard popup by providing a suitable name and an authorized redirect URL. 

!!! Example
    **name:** {{ product }}-react
    
    **Authorized redirect URL:** http://localhost:5173

Note down the following values from the **Guide** tab of the registered application. You will need them to configure Asgardeo React SDK.

- **`Client ID`** - The unique identifier for your application.
- **`Base URL`** - The base URL for your {{ product_name }} organization. This will be typically in the format `{{content.sdkconfig.baseUrl}}`.

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

The `<AsgardeoProvider />` serves as a context provider for user sign-in in the app. You can integrate this provider to your app by wrapping the root component.

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

Visit your app's homepage at [http://localhost:5173](http://localhost:5173).

!!! Important

    You need to create a test user in {{ product_name }} by following this [guide]({{ base_path }}/guides/users/manage-users/#onboard-single-user){:target="_blank"} to tryout sign-in and signed-out features.

## Display signed-in user's profile information

The SDK provides several ways to access the signed-in user's profile information. You can use the `User`, `UserProfile`, or `UserDropdown` components to access and display user profile information in a declarative way.

- `User`: The `User` component provides a render prop pattern to access user profile information:
- `UserProfile`: The `UserProfile` component provides a declarative way to display and update user profile information.
- `UserDropdown`: The `UserDropdown` component provides a dropdown menu with built-in user information and sign-out functionality.

```javascript title="src/App.jsx" hl_lines="1 10 18-25"
import { SignedIn, SignedOut, SignInButton, SignOutButton, User } from '@asgardeo/react'
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
                <p>Welcome back, {user.username}</p>
              </div>
            )}
          </User>
          <UserProfile
        </SignedIn>
      </main>
    </>
  )
}

export default App
```

## Choose how users will sign in

Before running the app, you need to decide how you want users to sign into your application:

<div class="mode-selection-container">
  <button class="md-typeset md-button mode-selection-btn active" data-quickstart-mode="redirect">
    <input type="radio" name="quickstart-mode" class="mode-radio" checked>
    <span class="radio-circle"></span>
    Redirect to {{ product_name }} (Default)
  </button>
  <button class="md-typeset md-button mode-selection-btn" data-quickstart-mode="embedded">
    <input type="radio" name="quickstart-mode" class="mode-radio">
    <span class="radio-circle"></span>
    Show sign-in form in your app
  </button>
</div>

<div class="mode-content" id="redirect-content">

**Redirect to {{ product_name }} (Default)**

When users click "Sign In", they'll be taken to {{ product_name }}'s sign-in page. After signing in, they'll be brought back to your app. This is the default option and works out of the box.

**Pros:**
- Easy to set up
- More secure (login details never pass through your app)
- Same look and feel across all your apps

**Cons:**
- Users temporarily leave your app to sign in
- Less control over how the sign-in page looks

</div>

<div class="mode-content" id="embedded-content" style="display: none;">

**Show sign-in form in your app**

The sign-in form appears directly inside your application using the `SignIn` component. Users never leave your app during the sign-in process.

**Pros:**
- Users stay on your app the entire time
- You control exactly how the sign-in form looks
- Smoother user experience with your branding

**Cons:**
- Requires a few extra setup steps
- Slightly more configuration needed

</div>

## Set up the in-app sign-in form [//] SHOW_IF="data-quickstart-mode=embedded"

If you want the sign-in form to appear inside your app, follow these additional steps:

1. **Update your main.jsx file** to enable the in-app sign-in form:

```javascript title="src/main.jsx" hl_lines="11"
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
      enableEmbeddedMode={true}
    >
      <App />
    </AsgardeoProvider>
  </StrictMode>
)
```

2. **Replace the Sign In button with the sign-in form** in your App.jsx:

```javascript title="src/App.jsx" hl_lines="1 12"
import { SignedIn, SignedOut, SignIn, SignOutButton, User, UserDropdown, UserProfile } from '@asgardeo/react'
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
          <SignIn />
        </SignedOut>
      </header>
      <main>
        <SignedIn>
          <User>
            {(user) => (
              <div>
                <p>Welcome back, {user.username}</p>
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

3. **Update your app settings** in {{ product_name }}:
   - Go to **Applications > Your App > Protocol**
   - Turn on **Allow authentication without redirection**
   - Add your app's web address (e.g., `http://localhost:5173`) to the **Allowed Origins** list

!!! Note
    The sign-in form includes username/email and password fields, plus any social login buttons you've set up (like "Sign in with Google").

## Run the app [//] SHOW_IF="data-quickstart-mode=redirect,data-quickstart-mode=embedded"

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

Visit your app's homepage at [http://localhost:5173](http://localhost:5173) to see the user sign-in and profile information in action.

[//] STEPS_END
