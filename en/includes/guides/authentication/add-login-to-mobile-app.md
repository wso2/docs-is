# Add login to a mobile app

Mobile applications, by design, cannot maintain any secrets. These kinds of applications are called public clients.

Based on the [OAuth 2.0 best practices for browser-based apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-08), {{ product_name }} recommends securing your mobile apps using the OpenID Connect Authorization Code Flow for public clients with the PKCE ([Proof Key for Code Exchange](https://datatracker.ietf.org/doc/html/rfc7636)) extension.

See the guides given below to add login to your mobile applications with {{ product_name }}.

## Manually add login to your mobile app

- [Implement authorization code flow with PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/)

## Add login to your framework-based mobile apps

- [Authenticate users into Android applications]({{base_path}}/tutorials/auth-users-into-android-apps/)
- [Authenticate users into Flutter applications]({{base_path}}/tutorials/auth-users-into-flutter-apps/)