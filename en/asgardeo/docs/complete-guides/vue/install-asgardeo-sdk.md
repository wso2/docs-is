---
template: templates/complete-guide.html
heading: Install and configure Asgardeo SDK
read_time: 2 min
---

## Install @asgardeo/vue

The Asgardeo Vue SDK is a production-ready SDK that simplifies integrating {{product_name}} as an Identity Provider in your Vue applications. It provides essential features like user authentication, retrieving user information, and an HTTP client for sending network requests with attached tokens. Additionally, it ensures best practices by being Secure by Design and Secure by Default.

!!! Info

    Asgardeo Vue SDK has been developed on open standards such as OAuth2, OpenID Connect, etc., therefore, you can use the Asgardeo Vue SDK for adding authentication to your application with any other OpenID Connect identity provider such as [WSO2 Identity Server (WSO2 IS)](https://wso2.com/identity-server/){:target="_blank"} and WSO2 [Private Identity Cloud (WSO2 PIC)](https://wso2.com/private-identity-cloud/){:target="_blank"}.

As the next step, run the following command to install the Vue SDK from the npm registry.

```bash
npm install @asgardeo/vue
```

## Add Asgardeo Plugin to your Vue app

During the previous step, we have added the Asgardeo Vue SDK as a dependency in our app. Now, we are going to use the `asgardeoPlugin` from the Asgardeo Vue SDK to integrate authentication into our Vue application.

First, you need to open the project using an IDE such as VS Code. Then, as shown below, initialize the Asgardeo plugin in `main.ts` or `main.js` with the necessary configuration. Make sure to replace the placeholders with the configuration parameters generated in the {{product_name}} console.

```javascript
import "./assets/main.css";

import { asgardeoPlugin, type AuthVueConfig } from "@asgardeo/vue";
import { createApp, type App as VueApp } from "vue";
import App from "./App.vue";
import router from "./router";

const app: VueApp = createApp(App);

const config = {
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "<your-app-client-id>",
  baseUrl: "https://api.asgardeo.io/t/<your-organization-name>",
  scope: ["openid", "profile"],
};

app.use(router);
app.use(asgardeoPlugin, config);

app.mount("#app");
```

As shown above, we used `asgardeoPlugin` at the root level of the application to ensure that all components can interact with the authentication logic provided by {{product_name}}. It takes the configuration object with the following values for the single-page application defined in the {{product_name}} console. You can copy these values from the {{product_name}} console.

| Parameter          | Description                                                                                                                                                                                                | Example                                |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| signInRedirectURL  | The URL to redirect the user to after successfully signing in. This URL should be an absolute URL and only accessible to authenticated users.                                                              | `http://localhost:5173`                |
| signOutRedirectURL | The URL to redirect the user to after signing out. This should be an absolute URL and should be accessible without authentication.                                                                         | `http://localhost:5173/login`          |
| clientID           | The client ID of the created OIDC application                                                                                                                                                              | -                                      |
| baseUrl            | The base URL of the Identity Provider API. This depends on the identity provider you are using. For {{product_name}}, this can be obtained from your application settings in the {{product_name}} console. | `https://www.asgardeo.io/t/<org_name>` |
| scope              | Specifies the required application scopes as a list. In this guide, we need access to user details, so we will request the 'profile' scope.                                                                | `[ "profile" ]`                        |

!!! Info

    If you’re familiar with OAuth2 or OIDC, you might notice that there’s no client secret involved here. This is because, according to the OAuth2 specification, our Vue app is classified as a public client. Since it runs on user devices and cannot securely store credentials, the Identity Provider (IdP) should not authenticate public clients before issuing access tokens. The {{product_name}} SDK addresses this by implementing the PKCE (Proof Key for Code Exchange) extension, which helps mitigate the security risks associated with public clients.

Here’s a brief overview of what `asgardeoPlugin` provides:

- **Context Management:** It creates a Vue plugin that holds the authentication state and methods to handle authentication actions like logging in, logging out, and checking the user's authentication status.
- **Session Handling:** `asgardeoPlugin` manages user sessions, including token storage and retrieval, token refresh, and user session expiration handling.
- **Easy Access to Authentication:** By using `asgardeoPlugin`, any component within your app can easily access authentication details and actions using Vue composables.
- **Initialization and Configuration:** It initializes the SDK with the necessary configuration, such as client ID, server endpoints, and other authentication settings.
