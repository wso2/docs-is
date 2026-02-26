
## Install `@asgardeo/react`

The Asgardeo React SDK is a production-ready SDK that simplifies integrating {{product_name}} as an Identity Provider in your React applications. It provides essential features like user authentication, retrieving user information, and an HTTP client for sending network requests with attached tokens. Additionally, it ensures best practices by being Secure by Design and Secure by Default.

!!! Info

    Asgardeo React SDK has been developed on open standards such as OAuth2, OpenID Connect etc, therefore you can use the Asgardeo React SDK for adding authentication to your application with any other OpenID Connect  identity provider such as [WSO2 Identity Server (WSO2 IS)](https://wso2.com/identity-server/){:target="_blank"}  and WSO2 [Private Identity Cloud (WSO2 PIC)](https://wso2.com/private-identity-cloud/){:target="_blank"} .

As the next step, run the following command to install the React SDK from the npm registry. Make sure to stop the dev server you started in the previous step.

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

During the previous step, we have added Asgardeo React SDK as a dependency in our app.  Now we are going to use the `<AsgardeoProvider />` component from the Asgardeo React SDK which is  built on top of [React Context](https://react.dev/learn/passing-data-deeply-with-context){:target="_blank"}.  The `<AsgardeoProvider />` serves as a context provider for user login in the app. You can add the `<AsgardeoProvider />` to your app by  wrapping  the root component to access authentication-related capabilities throughout the component tree.

First, you need to open the project using an IDE such as VS Code. Then,  as shown below, you need to wrap the **<App/>** component in `main.jsx` with the `<AsgardeoProvider />` component. Make sure to replace the placeholders in this code from the configuration parameters that we generated in [step-3]({{base_path}}/complete-guides/react/register-an-application/) that are given below.

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

As shown above, we used `<AuthProvider />` at the root level of the application to ensure that all components can interact with the authentication logic provided by {{product_name}}. It takes the configuration object with the following values for the single page application defined in the {{product_name}} console. You can copy these values from the {{product_name}}  console.

<!-- markdownlint-disable MD056 -->
| Parameter | Type | Required | Description | Example
|------|-----------|----------|-------------|-----------------------------------|
| `baseUrl` | `string` | Yes | The base URL of the Identity Provider API. This depends on the identity provider you are using. For {{product_name}}, this can be obtained from your application settings in the {{product_name}} console. | `{{content.sdkconfig.baseUrl}}` |
| `clientId` | `string` | Yes | Your application's client ID | -                                 |
| `afterSignInUrl` | `string` | No | URL to redirect after sign in (defaults to current URL) | `http://localhost:5173`          |
| `afterSignOutUrl` | `string` | No | URL to redirect after sign out (defaults to current URL) | `http://localhost:5173/login`     |
| `scopes` | `string[] | string` | No | OAuth scopes to request (defaults to `'openid profile internal_login'`) | `[ "openid profile internal_login" ]`                  |
| `storage` | `'localStorage' | 'sessionStorage'` | No | Storage mechanism for tokens (defaults to `'localStorage'`) | `localStorage`          |
<!-- markdownlint-enable MD056 -->

!!! Info

    If you’re familiar with OAuth2 or OIDC, you might notice that there’s no client secret involved here. This is because, according to the OAuth2 specification, our React app is classified as a public client. Since it runs on user devices and cannot securely store credentials, the Identity Provider (IdP) should not authenticate public clients before issuing access tokens. The {{product_name}} SDK addresses this by implementing the PKCE (Proof Key for Code Exchange) extension, which helps mitigate the security risks associated with public clients

Here’s a brief overview of what `<AsgardeoProvider />` provides:

* **Context Management:** It creates a context that holds the authentication state and methods to handle authentication actions like logging in, logging out, and checking the user's authentication status.
* **Session Handling:** `<AsgardeoProvider />` manages user sessions, including token storage and retrieval, token refresh, and user session expiration handling.
* **Easy Access to Authentication:** By wrapping your app with `<AuthProvider />`, any component within your app can easily access authentication details and actions using hooks like useAuthContext.
* **Initialization and Configuration:** It initializes the SDK with the necessary configuration, such as client ID, server endpoints, and other authentication settings.
