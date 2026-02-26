

## Token Validation

A key principle of security tokens is that the receiver must first validate the token. This involves checking the authenticity of the token issuer, ensuring the token meets validity criteria such as expiration time, and confirming that the receiver is authorized to use the token. The Angular OAuth2 OIDC SDK handles token validation as part of its authentication process, ensuring that users hold valid and unexpired tokens before accessing protected resources.

When a user signs in, the SDK acquires an access token and an ID token from the identity provider. The access token is a UUID, which requires an API call to the IdP for validation. On the other hand, the ID token is a JSON Web Token (JWT), and the SDK automatically validates it by performing the following checks:

- **Signature Validation:** The SDK verifies the JWT's signature using the public key retrieved from the identity provider's JWKS endpoint. This ensures the token has been issued by a trusted authority and hasn’t been tampered with.

- **Expiration Check:** The SDK checks the exp (expiration) claim to ensure the token is still valid. If the token has expired, it is considered invalid.

- **Issuer Validation:** The iss (issuer) claim in the token is validated against the configured issuer URL. This ensures the token came from the expected identity provider.

- **Audience Validation:** The SDK checks the aud (audience) claim to confirm that the token is meant for your application, identified by the clientId.

## Token Persistence

In the Angular OAuth2 OIDC SDK, the storage mechanism determines where the authentication state, tokens, and related data are stored. By default, the SDK uses `sessionStorage` for token persistence, but it also allows you to configure it to use `localStorage` or other custom storage mechanisms.

You can specify the storage mechanism in the OAuthService configuration by invoking the setStorage method in app.config.ts. Here's how you can configure it for different storage types.

- **Local Storage:** localStorage stores data across browser sessions, meaning the data persists even after the browser is closed and reopened.

```javascript

function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    oauthService.setStorage(localStorage);
    return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {});
  };
}


```

- **Session Storage:** sessionStorage stores data for the duration of the page session. The data is cleared when the page session ends (e.g., when the tab is closed).

```javascript

function initializeOAuth(oauthService: OAuthService): () => Promise<void> {
  return () => {
    oauthService.configure(authConfig);
    oauthService.setStorage(sessionStorage);
    return oauthService.loadDiscoveryDocumentAndTryLogin().then(() => {});
  };
}



```

- **Custom Storage:** You can define a custom storage mechanism for handling token persistence, such as using a secure web worker. To implement a custom storage solution, you can extend the OAuthStorage class, following the guidance provided in the [documentation](https://manfredsteyer.github.io/angular-oauth2-oidc/docs/classes/OAuthStorage.html#info){:target="_blank"}.


## Initiate Logout

The Angular OAuth2 OIDC SDK provides a straightforward approach to handle user logout in your application. When a user logs out, the SDK ensures that both the local session and the session on the identity provider are terminated, providing a complete and secure logout process without requiring manual cleanup activities.

When a user initiates logout, the following steps typically occur:

- **Local Session Termination:** The SDK clears any locally stored credentials, such as the access token and ID token, which are essential for maintaining the user's authentication state within the application. This effectively logs the user out of the application locally.

- **Redirection to Identity Provider for Sign Out:** After clearing the local session, the SDK redirects the user to the sign-out endpoint of your identity provider (in this case, {{product_name}}). This ensures that the user is also signed out globally from {{product_name}}. This step is especially important in single sign-on (SSO) scenarios where the user may be logged into multiple applications under the same identity.

- **Post Sign-Out Redirection:** Once the global sign-out process is complete, the user is redirected back to a specified URL, which is usually the application's homepage or a custom logout page. This URL can be configured in the SDK's `authConfig` under the `postLogoutRedirectUri`.


