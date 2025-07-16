
## Token Validation

A key principle of security tokens is that the receiver must first validate the token. This involves checking the authenticity of the token issuer, ensuring the token meets validity criteria such as expiration time, and confirming that the receiver is authorized to use the token. The Asgardeo SDK handles token validation automatically as part of its authentication and session management process to ensure that users have valid and unexpired tokens when accessing protected resources.

When a user signs in, the Asgardeo  SDK acquires an access token (and often an ID token) from {{product_name}}. The access token is by default an opaque token and the ID token is in the form of JSON Web Tokens (JWTs). The SDK automatically validates the token when it is obtained. This involves several checks:

- **Signature Validation:** The SDK verifies the JWT's signature using the public key retrieved from {{product_name}} JWKS endpoint. This ensures that the token has been issued by a trusted authority and has not been tampered with.

- **Expiration Check:** The SDK checks the `exp` (expiration) claim in the token to ensure it has not expired. Tokens are time-bound, and once the expiration time is reached, the token is considered invalid.

- **Issuer Validation:** The SDK verifies that the `iss` (issuer) claim in the token matches the expected issuer URL, which is typically the base URL specified in the .env file.

- **Audience Validation:** The SDK checks the aud (audience) claim to ensure the token is intended for your application (identified by the `clientID` in your .env file).

## Token Persistence

In the Asgardeo SDK, by default, an in memory token storage is used to store access tokens.

## Initiate Logout

The Asgardeo SDK provides a simple approach  to handle user logout from your app. When a user logs out, the SDK ensures that both the local session and the session on the {{product_name}} are terminated, ensuring a complete and secure logout process and you don’t need to worry on cleanup activities

When a user initiates log out, the following steps typically occur.

- **Local Session Termination:** The SDK clears any locally stored credentials, such as the access token and the ID token, which are used to maintain the user's authentication state within the application. This effectively logs the user out of the application locally.

- **Redirection to {{product_name}} for sign out:** After clearing the local session, the SDK redirects the user to the sign-out endpoint of your {{product_name}} organization. This ensures that the user is also signed out globally from {{product_name}}. It’s particularly important in single sign-on (SSO) scenarios where the user might be logged into multiple applications under the same identity.

- **Post Sign-Out Redirection:** Once the global sign-out is complete, the user is redirected back to a specified URL, usually the application's homepage or a custom logout page, which is configured in the SDK's authConfig under signOutRedirectURL.
