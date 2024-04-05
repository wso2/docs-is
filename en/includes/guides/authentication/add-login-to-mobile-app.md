# Add login to a mobile app

Mobile applications, by design, cannot maintain any secrets. These kinds of applications are called public clients.

Based on the [OAuth 2.0 best practices for browser-based apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-08){:target="_blank"}, {{ product_name }} recommends securing your mobile apps using the OpenID Connect Authorization Code Flow for public clients with the PKCE ([Proof Key for Code Exchange](https://datatracker.ietf.org/doc/html/rfc7636){:target="_blank"}) extension.

See the guides given below to add login to your mobile applications with {{ product_name }}.

## Manually add login to your mobile app

- [Implement authorization code flow with PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/)

{{ link_to_tutotials }}