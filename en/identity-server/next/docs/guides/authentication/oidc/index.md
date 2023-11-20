# Configure OIDC Flows

Learn how to discover the OIDC endpoints in your WSO2 Identity Server organization and then use them to implement OIDC flows in your applications.

## Discover the OIDC endpoints

This section covers how you can configure OIDC-based login for your single page application by discovering the required OIDC endpoints and configuring them in the WSO2 Identity Server Console.

[Discover OIDC endpoints]({{base_path}}/guides/authentication/oidc/discover-oidc-configs/) has detailed instructions on this.


## Implement authorization code grant in apps

The guides listed below will help you understand the OIDC login flow using the authorization code flow.

- [Implement authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/)

- [Implement authorization code flow with PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/)

- [Implement private key JWT client authentication for OIDC]({{base_path}}/guides/authentication/oidc/private-key-jwt-client-auth/)

## Implement login using Pushed Authorization Requests

WSO2 Identity Server provides the '/par' endpoint which returns a reference to the authorization payload called the request_uri. This authorization payload is sent by the back-channel during a PAR initiated login.

- [Implement login using Pushed Authorization Requests]({{base_path}}/guides/authentication/oidc/implement-login-with-par/) has detailed instructions on this.

## JWT Secured Authorization Response Mode (JARM) for OAuth 2.0

With JWT Secured Authorization Response Mode, clients can request authorization response parameters in JWT format instead of plain text.

- [JWT Secured Authorization Response Mode (JARM) for OAuth 2.0]({{base_path}}/guides/authentication/oidc/jarm/) has detailed instructions on this.

## Validate ID tokens

This section explains how the signature and the claims are verifieed in the ID token that is sent by WSO2 Identity Server to an application.

[Validate ID tokens]({{base_path}}/guides/authentication/oidc/validate-id-tokens/) has detailed instructions on this.

## Request user information

When WSO2 Identity Server sends the ID token to an application, there is user information encoded within it. This can be obtained using the userinfo endpoint.

[Request user information]({{base_path}}/guides/authentication/oidc/request-user-info/) has detailed instructions on this.

## Token validation by resource servers

WSO2 Identity Server provides the '/oauth2/introspect' endpoint to perform token validation. Using this, the resource server can verify the access token before authorizing the access.

[Token validation by resource servers]({{base_path}}/guides/authentication/oidc/token-validation-resource-server/) has detailed instructions on this.

## Revoke access tokens

The token revocation endpoint can revoke any access granted to both confidential clients such as web apps and public clients such as the SPAs or mobile apps.

[Revoke access tokens]({{base_path}}/guides/authentication/oidc/revoke-tokens/) has detailed instructions on this.

## Add logout to application

The logout endpoint is used to terminate the user session at WSO2 Identity Server and to log the user out.

[Add logout to application]({{base_path}}/guides/authentication/oidc/add-logout/) has detailed instructions on this.