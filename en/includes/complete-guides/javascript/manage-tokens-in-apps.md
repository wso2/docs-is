
## Token Validation

A key principle of security tokens is that the receiver must first validate the token. This involves checking the authenticity of the token issuer, ensuring the token meets validity criteria such as expiration time, and confirming that the receiver is authorized to use the token. The {{product_name}} Browser SDK validates the ID token automatically when it is obtained:

- **Signature Validation:** The SDK verifies the ID token's signature using the public keys retrieved from the {{product_name}} JWKS endpoint. This ensures that the token has been issued by a trusted authority and has not been tampered with.
- **Expiration Check:** The SDK checks the `exp` (expiration) claim to ensure the token has not expired, allowing for a small clock skew (`tokenValidation.idToken.clockTolerance`, 300 seconds by default).
- **Issuer Validation:** The SDK verifies that the `iss` (issuer) claim matches the expected issuer of your {{product_name}} organization.
- **Audience Validation:** The SDK checks the `aud` (audience) claim to ensure the token is intended for your application, identified by the `clientId` in your configuration.

## Token Refresh

When an access token expires, the SDK can get a new one with the refresh token, without involving the user:

- `httpRequest` refreshes the access token and retries the request when the API responds with `401 Unauthorized`.
- Set `periodicTokenRefresh: true` in the configuration to refresh the access token shortly before it expires.
- Call `refreshAccessToken()` to refresh it yourself.

Refreshing requires a refresh token, so make sure the **Refresh Token** grant type is enabled in the **Protocol** tab of your application in the {{product_name}} console. If the token cannot be refreshed, the user needs to sign in again.

## Token Persistence

In the {{product_name}} Browser SDK, the state storage mechanism determines where the authentication state, tokens, and other related data are stored. By default, {{product_name}} Browser SDK uses session storage, but you can configure the SDK to use other storage options like local storage or even a web worker.

You can specify the storage mechanism with the `storage` option of `auth.initialize`. Here's how you can configure it for different storage types.

- **Local Storage:** localStorage stores data across browser sessions, meaning the data persists even after the browser is closed and reopened.

```javascript

await auth.initialize({
   // other configs
   storage: "localStorage"
});

```

- **Session Storage:** sessionStorage stores data for the duration of the page session. The data is cleared when the page session ends (e.g., when the tab is closed).

```javascript

await auth.initialize({
   // other configs
   storage: "sessionStorage"
});


```

- **Web Worker:** Using a web worker allows state to be managed in a separate thread, which can be beneficial for performance and security.

```javascript

await auth.initialize({
   // other configs
   storage: "webWorker"
});

```

Compared to other methods for persisting tokens, web workers are the most secure option, due to the following reasons.

- **Performance**: Web workers run in a separate thread from the main JavaScript execution, offloading tasks like handling authentication state, which reduces the load on the main thread and leads to smoother UI interactions.

- **Security:** Operating in isolation from the DOM, web workers reduce the risk of cross-site scripting (XSS) attacks by keeping sensitive authentication data secure.

- **Asynchronous** Task Management: Web workers enhance the handling of asynchronous tasks, such as token renewal or data fetching, without blocking the main thread.

- **Scalability:** By enabling parallelism, web workers make applications more responsive and better equipped to handle multiple concurrent operations.

## Initiate Logout

The {{product_name}} Browser SDK provides a simple approach  to handle user logout from your app. When a user logs out, the SDK ensures that both the local session and the session on the {{product_name}} are terminated, ensuring a complete and secure logout process and you don’t need to worry on cleanup activities

When a user initiates log out, the following steps typically occur.

- **Local Session Termination:** The SDK clears any locally stored credentials, such as the access token and the ID token, which are used to maintain the user's authentication state within the application. This effectively logs the user out of the application locally.

- **Redirection to {{product_name}} for sign out:** After clearing the local session, the SDK redirects the user to the sign-out endpoint of your {{product_name}} organization. This ensures that the user is also signed out globally from {{product_name}}. It’s particularly important in single sign-on (SSO) scenarios where the user might be logged into multiple applications under the same identity.

- **Post Sign-Out Redirection:** Once the global sign-out is complete, the user is redirected back to a specified URL, usually the application's homepage or a custom logout page, which is configured with the `afterSignOutUrl` option.

## Silent Sign In

Silent sign-in lets an app check whether the user already has a session with {{product_name}}, for example because they signed in to another application, and sign them in without showing a login page. The SDK's `signInSilently` method sends a `prompt=none` authorization request in a hidden iframe. If there is a session, the user is signed in; if not, it resolves to `false` and the user stays signed out.

Call it on page load when the user isn't signed in yet, as the app in this guide does:

```javascript
(async () => {
  if (hasAuthParamsInUrl()) {
    // {{ product_name }} redirected back with an authorization code: complete the sign-in.
    await auth.signIn({ callOnlyOnRedirect: true });
  } else if (!(await auth.isSignedIn())) {
    // No local session: check for an existing session with {{ product_name }}.
    await auth.signInSilently();
  }

  // Update the UI accordingly.
  if (await auth.isSignedIn()) {
    const user = await auth.getUser();

    document.getElementById("authenticated-view").style.display = "block";
    document.getElementById("unauthenticated-view").style.display = "none";
    document.getElementById("username").textContent = user.username;
  } else {
    document.getElementById("authenticated-view").style.display = "none";
    document.getElementById("unauthenticated-view").style.display = "block";
  }
})();
```

!!! note

    Silent sign-in relies on the {{product_name}} session cookie being available inside the iframe. Browsers that block third-party cookies may prevent it, in which case the user signs in with the login button instead.
