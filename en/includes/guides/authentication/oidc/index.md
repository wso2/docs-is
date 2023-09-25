# Configure OIDC Flows

Learn how to discover the OIDC endpoints in your {{ product_name }} organization and then use them to implement OIDC flows in your applications.

## Discover the OIDC endpoints

This section covers how you can configure OIDC-based login for your single page application by discovering the required OIDC endpoints and configuring them in the {{ product_name }} Console.

[Discover OIDC endpoints](../../guides/authentication/oidc/discover-oidc-configs/) has detailed instructions on this.


## Implement authorization code grant in apps

The guides listed below will help you understand the OIDC login flow using the authorization code flow.

- [Implement authorization code flow](../../guides/authentication/oidc/implement-auth-code/)

- [Implement authorization code flow with PKCE](../../guides/authentication/oidc/implement-auth-code-with-pkce/)

- [Implement private key JWT client authentication for OIDC](../../guides/authentication/oidc/private-key-jwt-client-auth/)

## Validate ID tokens

This section explains how the signature and the claims are verifieed in the ID token that is sent by {{ product_name }} to an application.

[Validate ID tokens](../../guides/authentication/oidc/validate-id-tokens/) has detailed instructions on this.

## Request user information

When {{ product_name }} sends the ID token to an application, there is user information encoded within it. This can be obtained using the userinfo endpoint.

[Request user information](../../guides/authentication/oidc/request-user-info/) has detailed instructions on this.

## Token validation by resource servers

{{ product_name }} provides the '/oauth2/introspect' endpoint to perform token validation. Using this, the resource server can verify the access token before authorizing the access.

[Token validation by resource servers](../../guides/authentication/oidc/token-validation-resource-server/) has detailed instructions on this.

## Revoke access tokens

The token revocation endpoint can revoke any access granted to both confidential clients such as web apps and public clients such as the SPAs or mobile apps.

[Revoke access tokens](../../guides/authentication/oidc/revoke-tokens/) has detailed instructions on this.

## Add logout to application

The logout endpoint is used to terminate the user session at {{ product_name }} and to log the user out.

[Add logout to application](../../guides/authentication/oidc/add-logout/) has detailed instructions on this.