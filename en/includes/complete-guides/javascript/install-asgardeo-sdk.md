

## Install @asgardeo/auth-spa

The Asgardeo JavaScript SDK is a production-ready SDK that simplifies integrating {{product_name}} as an Identity Provider in your JavaScript applications. It provides essential features like user authentication, retrieving user information, and an HTTP client for sending network requests with attached tokens. Additionally, it ensures best practices by being Secure by Design and Secure by Default.

!!! Info

    Asgardeo JavaScript SDK has been developed on open standards such as OAuth2, OpenID Connect etc, therefore you can use the Asgardeo JavaScript SDK for adding authentication to your application with any other OpenID Connect  identity provider such as [WSO2 Identity Server (WSO2 IS)](https://wso2.com/identity-server/){:target="_blank"}  and WSO2 [Private Identity Cloud (WSO2 PIC)](https://wso2.com/private-identity-cloud/){:target="_blank"} .

As the next step, run the following command to install the JavaScript SDK from the npm registry.

```bash
npm install @asgardeo/auth-spa

```

!!! tip "Tip"
    
    Alternatively, you can pull down the `@asgardeo/auth-spa` SDK from the unpkg content delivery network directly in your HTML files as shown below. 

    ```html title="index.html" 
    <script src="https://unpkg.com/@asgardeo/auth-spa@latest/dist/asgardeo-spa.production.min.js"/>
    ```



## Initialize @asgardeo/auth-spa

During the previous section, we have added Asgardeo Javascript SDK as a dependency in our app.  Now we are going to use the `AuthSPAClient` component from the Asgardeo Javascript SDK. Add the following code snippet to the `main.js` file to initialize the `AuthSPAClient` component, as shown below.

!!! Important

    Replace below placeholders with your registered organization name in {{product_name}} and the generated`client-id` from the app you registered in {{product_name}}.

    - `<your-app-client-id>`
    - `https://api.asgardeo.io/t/<your-organization-name>`

```javascript title="src/main.js" 

import { AsgardeoSPAClient } from "@asgardeo/auth-spa";

const auth = AsgardeoSPAClient.getInstance();

await auth.initialize({
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "<your-app-client-id>",
  baseUrl: "https://api.asgardeo.io/t/<your-organization-name>",
  scope: ["openid", "profile"]
});

```

We used `AsgardeoSPAClient` at the root level of the application to ensure that all components can interact with the authentication logic provided by Asgardeo. It takes the configuration object with the following values for the single page application defined in the {{product_name}} console. You can copy these values from the {{product_name}}  console.

| **Field**             | **Description**                                                                                                                                                             | **Example**                            |
|------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| `signInRedirectURL`    | The URL to redirect the user to after successfully signing in. This URL should be an absolute URL and only accessible to authenticated users.                             | `http://localhost:5173`               |
| `signOutRedirectURL`   | The URL to redirect the user to after signing out. This should be an absolute URL and should be accessible without authentication.                                         | `http://localhost:5173`               |
| `clientID`             | The client ID of the created OIDC application.                                                                                                                           | N/A                                    |
| `baseUrl`              | The base URL of the Identity Provider API. This depends on the identity provider you are using. For Asgardeo, this can be obtained from your application settings in the Asgardeo console. | `https://www.asgardeo.io/t/<org_name>` |
| `scope`               | Specifies the required application scopes as a list. In this guide, we need access to user details, so we will request the `profile` scope.                               | `["profile"]`                         |




!!! Info

    If you’re familiar with OAuth2 or OIDC, you might notice that there’s no client secret involved here. This is because, according to the OAuth2 specification, our JavaScript app is classified as a public client. Since it runs on user devices and cannot securely store credentials, the Identity Provider (IdP) should not authenticate public clients before issuing access tokens. The {{product_name}} SDK addresses this by implementing the **PKCE (Proof Key for Code Exchange)** extension, which helps mitigate the security risks associated with public clients

Here’s a brief overview of what `AsgardeoSPAClient` provides:

- **Context Management:** It creates a context that holds the authentication state and methods to handle authentication actions like logging in, logging out, and checking the user's authentication status.


- **Session Handling:**- AsgardeoSPAClient manages user sessions, including token storage and retrieval, token refresh, and user session expiration handling.


- **Easy Access to Authentication:** By using AsgardeoSPAClient, any component within your app can easily access authentication details and actions using hooks like useAuthContext.


- **Initialization and Configuration:** It initializes the SDK with the necessary configuration, such as client ID, server endpoints, and other authentication settings
