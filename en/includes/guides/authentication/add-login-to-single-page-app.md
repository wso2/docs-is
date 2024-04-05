# Add login to an SPA

Single-page apps (SPAs) by design run with the source code exposed in the browser, which means that they cannot maintain any secrets. These kinds of applications are called public clients.

Based on the [OAuth 2.0 best practices for browser-based apps](https://datatracker.ietf.org/doc/html/draft-ietf-oauth-browser-based-apps-08){:target="_blank"}, {{ product_name }} recommends securing your SPAs using the OpenID Connect Authorization Code Flow for public clients with the PKCE ([Proof Key for Code Exchange](https://datatracker.ietf.org/doc/html/rfc7636){:target="_blank"}) extension.

See the guides given below to add login to your SPAs with {{ product_name }}.

## Try out samples

- [React SPA Sample]({{base_path}}/get-started/try-samples/qsg-spa-react/)
- [JavaScript SPA Sample]({{base_path}}/get-started/try-samples/qsg-spa-javascript/)

## Use an SDK to add login to your SPA

- [React SDK]({{base_path}}/get-started/try-your-own-app/react/)
- [Javascript SDK]({{base_path}}/get-started/try-your-own-app/javascript/)

## Manually add login to your SPA

- [Implement authorization code flow with PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/)
