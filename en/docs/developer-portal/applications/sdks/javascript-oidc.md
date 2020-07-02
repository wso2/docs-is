# Single Page Application SDK

The WSO2 Identity Server OIDC authentication SDK supports implementing authentication in JavaScript and Typescript client applications with OpenID Connect (OIDC). It handles a lot of authentication related details such as the grant, protocol, token management and token storage. 

This library currently supports [OAuth 2.0 Authorization Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1) with [PKCE](https://tools.ietf.org/html/rfc7636).

You can also find the source code of this library [here](https://github.com/wso2-extensions/identity-sdks-js/tree/master/identity-oidc-js).

---

## Getting started

Run `yarn run build`

> For development (watch mode) Run `yarn run watch`.

### 1. Initialize the client

```js
// Import the module
import { IdentityAuth } from "@wso2/identity-oidc-js";

/**
 * Minimal required configuration sample to initialize the client
 */
const authConfig = {
    loginCallbackURL: "https://localhost:9000/myapp/home",
    logoutCallbackURL: "https://localhost:9000/myapp/login",
    clientHost: "https://localhost:9000",
    clientID: "KwrHtf9iJdr6ewr0A9IYKIErR0rt",
    serverOrigin: "https://localhost:9443"
};

/**
 * Initialize authClient
 */
const authClient = new IdentityAuth(authConfig);
```

#### Configuration Options

Required options

| Config              | Type    | Default | Description |
|---                  |---      | ---     |---          |
| `loginCallbackURL`  | string  | -       | Where to redirect upon successful authentication. (Note:- This should be configured in WSO2 Identity Server) E.g. https://mydomain.com/myapp/home |
| `logoutCallbackURL` | string  | -       | Where to redirect after logout. (Note:- This should be configured in WSO2 Identity Server) E.g. https://mydomain.com/myapp/login |
| `clientHost`        | string  | -       | Application origin address with tenant path if applicable . E.g. https://mydomain.com or https://mydomain.com/t/exmaple.com |
| `clientID`          | string  | -       | OIDC Application clientID generated in WSO2 Identity Server |
| `serverOrigin`      | string  | -       | WSO2 Identity Server address. E.g. https://is.mydomain.com |

Optional configurations

| Config              | Type    | Default               | Description |
|---                  |---      | ---                   |---          |
| `autherizationType` | string  | "authorization_code"  |             |
| `clientSecret`      | string  | -                     | OIDC Application clientSecret generated in WSO2 Identity Server |
| `consentDenied`     | boolean | false                 |             |
| `enablePKCE`        | boolean | true                  |             |
| `prompt`            | string  | ""                    | "none", "login", "consent" |
| `responseMode`      | string  | "query"               | "query" or "form_post"  |
| `scope`             | array   | [ "" ]                |             |
| `tenant`            | string  | "carbon.super"        | Tenant name. (Note:- Leave it blank for super tenant) E.g. example.com |
| `tenantPath`        | string  | ""                    | Tenant Path. (Note:- Leave it blank for super tenant) E.g. /t/example.com |

### 2. Methods (API Reference)

* [signIn](#signin%20callback%20)
* [signOut](#signout%20callback%20)

#### signIn( _callback_ )

```js
authClient.signIn(() => {
    // Callback method trigger before signin redirection
})
.then((response) => {
    // Response with basic user details upon logged in
})
.catch((error) => {
    // Handle erorr
});
```

#### signOut( _callback_ )

```js
authClient.signOut(() => {
    // Callback method trigger before signout redirection
})
.catch((error) => {
    // Handle erorr
});
```

---

<!-- TODO: Refactor below content -->
<!-- ## Advance methods

#### OPConfigurationUtil.initOPConfiguration(wellKnownEndpoint, forceInit)

Initiate the authentication module using openid provider configuration endpoint.
* `wellKnownEndpoint` well known endpoint.
* `forceInit` whether to re-initiate the configuration.

#### OPConfigurationUtil.resetOPConfiguration()

Reset the configuration acquired from openid provider.

#### SignInUtil.sendAuthorizationRequest(requestParams)

Sends the OAuth2 authorization code request to the IdP based on the provided request params.

`requestParams` is type of `OIDCRequestParamsInterface`

```typescript
interface OIDCRequestParamsInterface {
    clientID: string;
    clientHost: string;
    clientSecret?: string;
    enablePKCE: boolean;
    redirectUri: string;
    scope?: string[];
    serverOrigin: string;
}
```

* `clientID` Client id of the application.
* `clientHost` Client host name.
* `clientSecret` Client secret of the application. If not provided, it will considered as a public client.
* `enablePKCE` Enable PKCE for the authorization grant type.
* `redirectUri` Callback url of the application.

#### SignInUtil.hasAuthorizationCode()

Check whether the current url contains the OAuth2 authorization code.

#### SignInUtil.sendTokenRequest(requestParams)

Sends the OAuth2 token request and returns a Promise with token response. Also validate the signature of the id_token.

`requestParams` is type of `OIDCRequestParamsInterface` as explained above.

Response will be a `Promise<TokenResponseInterface>`.

```js
interface TokenResponseInterface {
    accessToken: string;
    idToken: string;
    expiresIn: string;
    scope: string;
    refreshToken: string;
    tokenType: string;
}
```

* `accessToken` access token.
* `idToken` id_token value.
* `expiresIn`validity period.
* `scope` scope returned.
* `refreshToken` refresh token.
* `tokenType` token type.

#### SignInUtil.getAuthenticatedUser(idToken)

This will extract the authenticated user from the id_token.

Response will be in `AuthenticatedUserInterface`.

```js
interface AuthenticatedUserInterface {
    displayName?: string;
    email?: string;
    username: string;
}
```

* `displayName` display name of the user.
* `email` email of the user.
* `username` username.

#### AuthenticateSessionUtil.initUserSession(tokenResponse, authenticatedUser)

This will initiate the user session using the attributes in tokenResponse and authenticatedUser.

tokenResponse is type of `TokenResponseInterface` and authenticatedUser is type of `AuthenticatedUserInterface`.

#### AuthenticateSessionUtil.getAccessToken()

This will returns a Promise containing the OAuth2 access_token. Also it will refresh the access_token if it is expired.

Response will be a `Promise<string>`.

#### SignOutUtil.sendSignOutRequest(redirectUri)

Sends the logout request the openid provider. Requires the redirect uri of the application.

#### AuthenticateSessionUtil.endAuthenticatedSession()

Terminates the user session and clears the session attributes. -->

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.