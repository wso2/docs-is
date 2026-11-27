
## Install @asgardeo/browser

The {{product_name}} Browser SDK (`@asgardeo/browser`) is a production-ready SDK that simplifies integrating {{product_name}} as an Identity Provider in your JavaScript applications. It provides essential features like user authentication, retrieving user information, and an HTTP client for sending network requests with attached tokens. Additionally, it ensures best practices by being Secure by Design and Secure by Default.

!!! Info

    The {{product_name}} Browser SDK has been developed on open standards such as OAuth2, OpenID Connect etc, therefore you can use it for adding authentication to your application with any other OpenID Connect identity provider such as [WSO2 Identity Server (WSO2 IS)](https://wso2.com/identity-server/){:target="_blank"} and WSO2 [Private Identity Cloud (WSO2 PIC)](https://wso2.com/private-identity-cloud/){:target="_blank"}.

As the next step, run the following command to install the SDK from the npm registry.

```bash
npm install @asgardeo/browser
```

## Initialize @asgardeo/browser

During the previous section, we have added the {{product_name}} Browser SDK as a dependency in our app. Now we are going to use the `AsgardeoSPAClient` from the SDK. Replace the contents of the `src/main.js` file with the following code snippet to initialize the `AsgardeoSPAClient`.

!!! Important

    Replace below placeholders with your registered organization name in {{product_name}} and the generated `client-id` from the app you registered in {{product_name}}.

    - `<your-app-client-id>`
    - `{{content.sdkconfig.baseUrl}}`

```javascript title="src/main.js"
import { AsgardeoSPAClient } from "@asgardeo/browser";

const auth = AsgardeoSPAClient.getInstance();

await auth.initialize({
  afterSignInUrl: "http://localhost:5173",
  afterSignOutUrl: "http://localhost:5173",
  clientId: "<your-app-client-id>",
  baseUrl: "{{content.sdkconfig.baseUrl}}"
});
```

We used `AsgardeoSPAClient` at the root level of the application to ensure that all parts of the app can interact with the authentication logic provided by {{product_name}}. It takes a configuration object with the following values for the single page application defined in the {{product_name}} console. You can copy these values from the {{product_name}} console.

| **Field** | **Description** | **Example** |
|-----------|-----------------|-------------|
| `afterSignInUrl` | The URL to redirect the user to after successfully signing in. It must match an authorized redirect URL of the application. | `http://localhost:5173` |
| `afterSignOutUrl` | The URL to redirect the user to after signing out. It should be accessible without authentication. | `http://localhost:5173` |
| `clientId` | The client ID of the created OIDC application. | N/A |
| `baseUrl` | The base URL of the Identity Provider API. This depends on the identity provider you are using. For {{product_name}}, this can be obtained from your application settings in the {{product_name}} console. | `{{content.sdkconfig.baseUrl}}` |
| `scopes` | Optional. The scopes to request, as a list. The SDK requests `openid`, `profile` and `internal_login` by default, which is enough for this guide. | `["openid", "profile"]` |

See the [Browser SDK configuration reference]({{ base_path }}/sdks/browser/apis/configuration/) for all the options.

!!! Info

    If you’re familiar with OAuth2 or OIDC, you might notice that there’s no client secret involved here. This is because, according to the OAuth2 specification, our JavaScript app is classified as a public client. Since it runs on user devices and cannot securely store credentials, the Identity Provider (IdP) should not authenticate public clients before issuing access tokens. The {{product_name}} SDK addresses this by implementing the **PKCE (Proof Key for Code Exchange)** extension, which helps mitigate the security risks associated with public clients.

Here’s a brief overview of what `AsgardeoSPAClient` provides:

- **Authentication actions:** Methods to sign the user in and out, and to check whether the user is signed in.
- **Session handling:** It manages user sessions, including token storage and retrieval, and token refresh.
- **User information:** Methods to read the signed-in user's details and tokens.
- **HTTP client:** A method to call protected APIs with the user's access token attached.
