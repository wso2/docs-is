

## Install authentication  SDK

The [Angular OAuth2 OIDC SDK](https://github.com/manfredsteyer/angular-oauth2-oidc/){:target="_blank"} is a production-ready authentication SDK that simplifies integrating {{product_name}} with your Angular applications. It provides key features such as user authentication, retrieving user information, and automatically attaching tokens to HTTP requests for secure API communication. 

Next, change your current directory to the project folder and run the following command to install the Angular OAuth2 OIDC SDK from the npm registry.

```bash
 npm install angular-oauth2-oidc

```

## Add `AuthConfig` to your app

In the previous step, you added the Angular OAuth2 OIDC SDK as a dependency in your app. Now, we will configure the `AuthConfig` to set up authentication using {{product_name}}. The `OAuthService` provided by the SDK will handle authentication throughout the application. You can configure the authentication service by providing the necessary OIDC settings like the `client_id`, `issuer`, and `redirect URIs`. These configurations allow your Angular app to communicate with {{product_name}} for user authentication.

In the `app.config.ts` file, you can import the `OAuthService` from the SDK. This corresponds to [Option 1](https://github.com/manfredsteyer/angular-oauth2-oidc?tab=readme-ov-file#option-1-standalone-apis){:target="_blank"} indicated in the Angular OIDC SDK, which utilizes Standalone Components introduced with Angular 14. You can set up the OAuth client using the standalone API of the SDK by calling `provideOAuthClient()`. Next, configure the `AuthConfig` with your {{product_name}} application details.


Replace the content of `app.config.ts` file with the following code. 

!!! Important

    Make sure to replace the placeholders in the following code with the **`client-id`** and **`issuer`** values you copied in **Step-3** during the application registration in the {{product_name}} console. 

    - `<your-app-client-id>`
    - `<your-app-issuer-url>`


```javascript title="app.config.ts"

import { ApplicationConfig, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideOAuthClient, OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { routes } from './app.routes';

export const authConfig: AuthConfig = {
  issuer: '<your-app-issuer-url>',
  redirectUri: 'http://localhost:4200',
  clientId: '<your-app-client-id>',
  responseType: 'code',
  scope: 'openid profile email internal_login',
  strictDiscoveryDocumentValidation: false,
};

function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => { });
  };
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideHttpClient(),
  provideOAuthClient(),
  {
    provide: APP_INITIALIZER,
    useFactory: initializeOAuth,
    deps: [OAuthService],
    multi: true
  }
  ]
};


```

!!! Important

    Make sure to add **`strictDiscoveryDocumentValidation: false`** parameter. The configuration parameter `strictDiscoveryDocumentValidation` is set to `true` by default. This ensures that all endpoints provided in the Identity Provider discovery document share the same base URL as the issuer parameter. However, several Identity Providers, including {{product_name}}, may use different domains or path parameters for various endpoints in the discovery document. While these providers may still comply with the OpenID Connect Provider Configuration specification, they will fail this library's discovery document validation. To resolve this, you need to set `strictDiscoveryDocumentValidation` to `false`




As shown above, we configure authentication at the root level of the Angular application to ensure that all components can interact with the authentication logic provided by {{product_name}}. This is achieved by passing a configuration object, `authConfig` to the `OAuthService` with the following values, which are defined in the {{product_name}} console. The `authConfig` object holds the configuration necessary for connecting the app to {{product_name}}. It includes properties like `redirectUri`, which determine where users are redirected after signing in or out. The `clientID` identifies the application, and issuer specifies the {{product_name}} token API endpoint specific to your organization, which is used to obtain the discovery document by the SDK. The scope array lists the OAuth2.0 permissions the app requires, such as `openid` and `profile`.


The following table provide a summery of the important configuration parameters. 

| **Parameter** | **Description**                                                                                                                                                                                                                     | **Example**                                  |
|---------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------|
| `redirectUri` | The URL to redirect the user to after successfully signing in. This URL should be an absolute URL and only accessible to authenticated users.                                                                                      | `http://localhost:4200`                      |
| `clientId`    | The client ID of the created OIDC application.                                                                                                                                                                                     |                                              |
| `issuer`      | The issuer name of the Identity Provider, used by the SDK to obtain the discovery document by invoking the OIDC discovery endpoint at `<issuer>/.well-known/openid-configuration`. For {{product_name}}, this is the same as the token endpoint. | `https://api.asgardeo.io/t/<org_name>/oauth2/token` |
| `scope`       | Specifies the required application scopes as a list. In this guide, we request the 'profile' scope for access to user details.                                                                                                     | `[ "openid profile" ]`                       |

!!! Important

    Since your Angular app is classified as a public client according to OAuth2 specifications (as it runs on user devices and cannot securely store credentials), no client secret is involved. Public clients cannot securely store credentials, so Identity Providers should not authenticate public clients before issuing access tokens. The Angular OAuth2 OIDC SDK addresses this by using the **PKCE (Proof Key for Code Exchange)** extension to mitigate security risks associated with public clients.