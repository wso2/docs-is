# OAuth2 grant types of {{ product_name }} applications

OAuth 2.0 defines several grant types used to obtain an access token, which is required to access protected resources on behalf of a user or an application. Each grant type is designed for a specific use case and supports different parameters.

The grant types supported by {{ product_name }} applications are as follows:

**OAuth 2.0 grants**

- [Authorization code grant](#authorization-code-grant)
- [Refresh token grant](#refresh-token-grant)
- [Client credentials grant](#client-credentials-grant)
- [Implicit grant](#implicit-grant)
- [Password grant](#password-grant)
- [Token exchange grant](#token-exchange-grant)
- [SAML 2.0 bearer grant](#saml-20-bearer-grant)

**{{ product_name }}'s custom grants**

- [Organization switch grant](#organization-switch-grant)

{{grant_type_configs_note}}

## Authorization code grant

The Authorization code flow provides a secure way for a client application to obtain an access token without exposing the user's credentials to the client application. The user only authenticates with the authorization server, which then issues an authorization code that can be exchanged for an access token.

This helps to protect the user's credentials and prevents them from being compromised by malicious client applications.

The following diagram shows how the authorization code flow works.

![How the authorization code grant works]({{base_path}}/assets/img/references/grants/authorization-code.png)

1. The user visits the client application and requests for login through {{ product_name }}.
2. The client application redirects the authorization code request to {{ product_name }}.
3. {{ product_name }} prompts the user to enter credentials.
4. The user enters the credentials.
5. After successful authentication, {{ product_name }} sends the authorization code to the client application.
6. The client application uses this authorization code to request an access token from {{ product_name }}.
7. {{ product_name }} sends the access token and ID token to the client application.
8. The client application can now request user information from the resource server by providing the access token.
9. The resource server returns the requested user information to the client application.


## Refresh token grant
The refresh token grant provides a secure way for client applications to obtain a new access token without requiring the user to re-authenticate. This can help improve the user experience by avoiding unnecessary login prompts and reducing the load on the authorization server by reducing the frequency of authentication requests.
Refresh tokens typically have a longer lifetime than access tokens, and the user or the authorization server can revoke them at any time.

The following diagram shows how the refresh token flow works.

![How the refresh token grant works]({{base_path}}/assets/img/references/grants/refresh-token.png)

1. The client application requests user information from the resource server by providing the access token.
2. As the access token is expired, the resource server returns an error message.
3. By sending the refresh token, the client application requests a new access token from {{ product_name }}.
4. {{ product_name }} sends a new access token and a new refresh token.


## Client credentials grant

The client credentials flow provides a secure way for client applications to obtain an access token without user authentication. This can be useful in scenarios where the client application needs to access its own resources, such as data storage or APIs, but does not require access to user data.
However, it is important to ensure that the client credentials are kept secure, as any party that posses these credentials can obtain access tokens and access the client's resources.

The following diagram shows how the client credentials grant flow works.

![How the client credentials grant works]({{base_path}}/assets/img/references/grants/client-credentials.png)

1. The client application sends its credentials (`client_id` and `client_secret`) to {{ product_name }} and requests an access token.
2. {{ product_name }} sends the access token to the client application.
3. The client application can now request user information from the resource server by providing the access token.
4. The resource server returns the requested user information to the client application.

## Implicit grant

!!! note
    {{ product_name }} does not recommend using implicit grant in it's applications.

The implicit grant flow is an OAuth 2.0 grant type that enables a client application to obtain an access token directly from the authorization server without an intermediate authorization code exchange. This flow is commonly used in browser-based applications where the client application runs in a web browser.

However, it is important to note that the access token is exposed in the browser's URL fragment, which can make it vulnerable to certain types of attacks, such as cross-site scripting (XSS). As a result, this flow is typically not recommended for applications that require high security.

The following diagram shows how the implicit grant flow works.

![How the implicit grant works]({{base_path}}/assets/img/references/grants/implicit-grant.png)

1. The user visits the client application and requests for login through {{ product_name }}.
2. The client application redirects the authorization request to {{ product_name }}.
3. {{ product_name }} prompts the user to enter credentials.
4. The user enters the credentials.
5. After successful authentication, {{ product_name }} sends the access token to the client application.
6. The client application can now request user information from the resource server by providing the access token.
7. The resource server returns requested user information to the client application.

## Password grant
The password grant flow is an OAuth 2.0 grant type that enables a client application to obtain an access token by presenting the user's username and password directly to the authorization server. This flow is generally considered less secure than other grant types, as it requires the client application to handle and transmit the user's credentials.

The password grant is primarily used in scenarios where the client application is highly trusted, and the user experience is prioritized over security concerns. It is generally not recommended for use in public-facing applications or scenarios where sensitive data is accessed.

The following diagram shows how the password grant flow works.

![How the password grant works]({{base_path}}/assets/img/references/grants/password-grant.png)

1. The user visits the client application and requests for login through {{ product_name }}.
2. The client application requests the user's credentials.
3. The user sends the requested credentials to the client application.
4. The client application sends the user's credentials and requests an access token from {{ product_name }}.
5. {{ product_name }} sends the access token to the client application.
6. The client application can now request user information from the resource server by providing the access token.
7. The resource server returns the requested user information to the client application.

## Token exchange grant
OAuth 2.0 token exchange is a grant type in the OAuth 2.0 framework that enables the exchange of one type of token for another. This grant type is defined in the [OAuth Token Exchange specification (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693)

The token exchange grant type is useful in scenarios where an application needs to obtain a different type of access token with a different set of permissions or attributes than the one it currently possesses. It allows an application to act on a user's or another entity's behalf, obtaining a new access token that represents the requested authorization.

!!! note "Important"
    Currently, {{ product_name }} supports the following capabilities of the OAuth 2.0 Token Exchange specification:

    - Impersonation semantics of the OAuth 2.0 token exchange grant type.
    - Exchanging JWT security tokens in the token exchange flow.

The following diagram shows how the token exchange grant flow works.

![How the token exchange grant works]({{base_path}}/assets/img/references/grants/token-exchange-grant.png)

1. The user sends a login request to the client application.
2. The client application sends an authorization request to the third-party IdP.
3. The third-party IdP returns the JWT access token for the user to the client application.
4. The client application makes a token exchange request to the authorization server, specifying the Token Exchange grant type and providing the necessary parameters, such as the original access token.
5. The authorization server validates the request, performs the token exchange, generates a new access token of the requested type based on the provided parameters and the server's policy, and responds to the client with the new access token.
6. The client application can now request resources from the resource server by providing the access token.
7. As the resource server trusts {{ product_name }} issued tokens, it returns the requested resources to the client application.

See [configure the token exchange flow]({{base_path}}/guides/authentication/configure-the-token-exchange-flow) for more details.

## SAML 2.0 bearer grant

SAML 2.0 bearer grant is a grant type in the OAuth 2.0 framework that enables the exchange of a SAML 2.0 assertion for an OAuth 2.0 access token. This grant type is defined in the [SAML 2.0 Profile for OAuth 2.0 Client Authentication and Authorization Grants specification (RFC 7522)](https://datatracker.ietf.org/doc/html/rfc7522)

The SAML 2.0 bearer grant is a secure method that allows clients to obtain an OAuth 2.0 access token by presenting a SAML 2.0 assertion. This grant type is particularly useful in scenarios where the client already has a SAML assertion from a trusted identity provider and seeks to exchange it for an access token. It offers significant advantages in systems that already utilize SAML for Single Sign-On (SSO), as it enables the client to obtain an access token without requiring the user to re-authenticate. To use this grant type, the client submits a request with the SAML assertion to the token endpoint, and following successful authentication and validation, the server issues an access token.

The following diagram shows how the token exchange grant flow works.

![How the token exchange grant works]({{base_path}}/assets/img/references/grants/saml2-bearer-grant.png)

1. The user sends a login request to the client application.
2. The client application sends an authentication request to the third-party IdP using SAML 2.0.
3. Upon successful user authentication, the third-party IdP issues a SAML 2.0 assertion to the client application.
4. The client application makes a token exchange request to the authorization server, specifying the SAML 2.0 bearer grant type and providing the necessary parameters, such as the original SAML 2.0 assertion.
5. The Authorization Server validates the SAML 2.0 assertion and if valid, generates a new access token of the requested type based on the provided parameters and the server's policy, and responds to the client with the new access token.
6. The client application can now request resources from the resource server by providing the access token.
7. As the resource server trusts {{ product_name }} issued tokens, it returns the requested resources to the client application.

## Organization switch grant

The organization switch grant is a custom grant type in {{ product_name }} that enables users to switch between different organizations in a hierarchical organization structure.

Client applications should always use one of the traditional grant types to authorize user access. The organization switch grant is also required when the authorization request is for resources of an organization. That is because it is necessary to switch between the organization (root) and the organization to obtain access tokens that are valid for organizations.

The following diagram illustrates this flow.

![How the organizatoin switch grant works]({{base_path}}/assets/img/references/grants/organization-switch.png)

1. The user visits the client application and requests login through the organization (root).
2. The client application redirects the authorization code request to the organization (root).
3. {{ product_name }} prompts the login page of the root organization's application.
4. The user selects the **SSO** authentication option.
5. The organization (root) prompts the user to enter the organization name.
6. The user enters the organization name.
7. The organization (root) sends an authorization code request to the organization.
8. The organization prompts the user to enter credentials.
9. The user enters the credentials.
10. The organization sends the authorization code to the organization (root).
11. The organization (root) uses this authorization code to request an access token from the organization.
12. The organization sends the access token and ID token to the organization (root).
13. The organization (root) sends the authorization code to the client application.

    !!! note
        This is the response to the authorization code request in step two.

14. The client application uses this authorization code to request an access token from the organization (root).
15. The organization (root) sends the access token and ID token to the client application.
16. The client application exchanges the access token received in the above step for an access token for the organization.
17. The organization (root) initiates an exchange for an access token and sends an access token against the organization to the client application.
18. The user requests information from the client application.
19. The client application requests user information from the organization by providing the access token received in step 17.
20. The organization returns requested user information to the client application.