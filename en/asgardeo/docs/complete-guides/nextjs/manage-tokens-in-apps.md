---
template: templates/complete-guide.html
heading: Manage tokens in React apps 
read_time: 2 min
---

## Token Validation

A key principle of security tokens is that the receiver must first validate the token. This involves checking the authenticity of the token issuer, ensuring the token meets validity criteria such as expiration time, and confirming that the receiver is authorized to use the token. The Asgardeo React SDK handles token validation automatically as part of its authentication and session management process to ensure that users have valid and unexpired tokens when accessing protected resources.

When a user signs in, the Asgardeo React SDK acquires an access token (and often an ID token) from {{product_name}}. The access token is by default an opaque token and the ID token is in the form of JSON Web Tokens (JWTs). The SDK automatically validates the token when it is obtained. This involves several checks:

- **Signature Validation:** The SDK verifies the JWT's signature using the public key retrieved from {{product_name}} JWKS endpoint. This ensures that the token has been issued by a trusted authority and has not been tampered with.

- **Expiration Check:** The SDK checks the `exp` (expiration) claim in the token to ensure it has not expired. Tokens are time-bound, and once the expiration time is reached, the token is considered invalid.

- **Issuer Validation:** The SDK verifies that the `iss` (issuer) claim in the token matches the expected issuer URL, which is typically the base URL specified in the `authConfig`.

- **Audience Validation:** The SDK checks the aud (audience) claim to ensure the token is intended for your application (identified by the `clientID` in your   `authConfig`).

If the token is close to being expired, the SDK will automatically attempt to renew the token by performing a silent sign-in (explained below). This helps maintain a seamless user experience without requiring the user to re-authenticate frequently. If the token has already expired and cannot be renewed silently, the user will be redirected to the login page to obtain a new token.

## Token Persistence

In the Asgardeo React SDK, the state storage mechanism determines where the authentication state, tokens, and other related data are stored. By default, Asgardeo React SDK uses session storage, but you can configure the SDK to use other storage options like local storage or even a web worker.

You can specify the storage mechanism in the authConfig object using the storage property. Here's how you can configure it for different storage types.

- **Local Storage:** localStorage stores data across browser sessions, meaning the data persists even after the browser is closed and reopened.

```javascript

const authConfig = {
   // other configs
   storage: "localStorage"
}

```

- **Session Storage:** sessionStorage stores data for the duration of the page session. The data is cleared when the page session ends (e.g., when the tab is closed).

```javascript

const authConfig = {
   // other configs
   storage: "sessionStorage"
}


```

- **Web Worker:** Using a web worker allows state to be managed in a separate thread, which can be beneficial for performance and security.

```javascript

const authConfig = {
   // other configs
   storage: "webWorker"
}

```

Compared to other methods for persisting tokens, web workers are the most secure option, due to the following reasons.

- **Performance**: Web workers run in a separate thread from the main JavaScript execution, offloading tasks like handling authentication state, which reduces the load on the main thread and leads to smoother UI interactions.

- **Security:** Operating in isolation from the DOM, web workers reduce the risk of cross-site scripting (XSS) attacks by keeping sensitive authentication data secure.

- **Asynchronous** Task Management: Web workers enhance the handling of asynchronous tasks, such as token renewal or data fetching, without blocking the main thread.

- **Scalability:** By enabling parallelism, web workers make applications more responsive and better equipped to handle multiple concurrent operations.

## Initiate Logout

The Asgardeo React SDK provides a simple approach  to handle user logout from your app. When a user logs out, the SDK ensures that both the local session and the session on the {{product_name}} are terminated, ensuring a complete and secure logout process and you don’t need to worry on cleanup activities

When a user initiates log out, the following steps typically occur.

- **Local Session Termination:** The SDK clears any locally stored credentials, such as the access token and the ID token, which are used to maintain the user's authentication state within the application. This effectively logs the user out of the application locally.

- **Redirection to {{product_name}} for sign out:** After clearing the local session, the SDK redirects the user to the sign-out endpoint of your {{product_name}} organization. This ensures that the user is also signed out globally from {{product_name}}. It’s particularly important in single sign-on (SSO) scenarios where the user might be logged into multiple applications under the same identity.

- **Post Sign-Out Redirection:** Once the global sign-out is complete, the user is redirected back to a specified URL, usually the application's homepage or a custom logout page, which is configured in the SDK's authConfig under signOutRedirectURL.

## Silent Sign In

Silent login allows an app to check if a user is already authenticated, either through a session cookie or a token stored in the browser, and re-authenticate automatically in the background. To implement silent sign-in using the Asgardeo React SDK, you can leverage the library's built-in support for token renewal and session management. Here's how you can do it:

- **Configure the Silent Sign-In:** Ensure that your `authConfig` is set up to allow silent sign-in. You need to configure the prompt parameter to `none` when initiating a silent sign-in request. This instructs the identity provider to not display any login prompts and to rely on existing sessions instead.

- **Use the SDK’s Built-in Functionality:** The Asgardeo React SDK typically handles silent token renewal automatically if the configuration is set correctly. When the access token is about to expire, the SDK will attempt to renew it silently in the background.

- **Handling Token Expiry:** In your React components, you can handle token expiry by checking the authentication state and initiating a silent sign-in if the user’s session is still valid but the token has expired.

```javascript

import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";


const authConfig = {
  signInRedirectURL: "http://localhost:5173",
  signOutRedirectURL: "http://localhost:5173",
  clientID: "<client_ID>",
  baseUrl: "https://api.asgardeo.io/t/<org_name>",
  scope: ["openid", "profile"],
  enableSilentSignIn: true // Enable silent sign-in
};


const App = () => {
 const { state, signIn } = useAuthContext();


 React.useEffect(() => {
   if (!state.isAuthenticated) {
     signIn({ prompt: "none" }).catch(() => {
       // Handle silent sign-in failure
     });
   }
 }, [state.isAuthenticated, signIn]);


 return (
   <AuthProvider config={authConfig}>
      {/* App content */}
   </AuthProvider>
 )
}


export default App;
useAuthContext


```
