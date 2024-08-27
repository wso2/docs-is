# OAuth2 grant types

Grant types in OAuth 2.0 are defined as the methods used by a client to obtain an access token from the identity provider. {{product_name}} supports the following grant types. Each grant type is designed for a specific use case and supports different parameters.

- [Authorization code grant](#authorization-code-grant)
- [Refresh token grant](#refresh-token-grant)
- [Client credentials grant](#client-credentials-grant)
- [Implicit grant](#implicit-grant)
- [Password grant](#password-grant)
- [Token exchange grant](#token-exchange-grant)
- [SAML 2.0 bearer grant](#saml-20-bearer-grant)
- [Organization switch grant (custom)](#organization-switch-grant)

The following sections explore each grant type in further detail.

{{grant_type_configs_note}}

## Authorization code grant

The Authorization code flow is a secure method for clients to obtain an access token by exchanging an authorization code received through the front channel. As the access token is directly transmitted to the client via a secure back channel, it is not exposed to the user's user agent (e.g. web browser) reducing its risk of being intercepted by a malicious party.

The following diagram shows how the authorization code flow works.

![How the authorization code grant works]({{base_path}}/assets/img/references/grants/authorization-code.png)

1. The user visits the client application and requests for login through {{ product_name }}.
2. The client application redirects the authorization code request to {{ product_name }} (front channel).


    === "Request format (/authorize)"

        ``` bash
        {{base_url}}/oauth2/authorize
        ?response_type=code
        &client_id=<CLIENT_ID>
        &redirect_uri=<REDIRECT_URI>
        ```

    === "Sample request (/authorize)"

        ```bash
        {{base_url_example}}/oauth2/authorize
        ?response_type=code
        &client_id=cHuGSLCm77ApRFcsdyh_4sdFU2XYa
        &redirect_uri=https://localhost:3000
        ```

3. {{ product_name }} prompts the user to enter credentials.
4. The user enters the credentials.
5. After successful authentication, {{ product_name }} sends the authorization code to the client application.

    ``` bash
    http://localhost:3000?code=9142d4cad58c66d0a5edfad8952192
    ```
6. The client application uses this authorization code to request an access token from {{ product_name }} (back channel).

    === "Request format (/token)"

        ``` bash
        curl -v -X POST {{base_url}}/oauth2/token\ 
        --basic -u <CLIENT_ID>:<CLIENT_SECRET> \
        --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k \
        --data-urlencode "grant_type=authorization_code" \
        --data-urlencode "code=<AUTHORIZATION_CODE>" \
        --data-urlencode "redirect_uri=<REDIRECT_URI>"
        ```
    === "Sample request (/token)"

        ```bash
        curl -v -X POST {{base_url_example}}/oauth2/token\ 
        --basic -u Ei0Wf9bzfsdvdd0lfwSvTPje8kcEa:HFI2S2HR9kdfg543f5xMpuIAjgJxnZQUT1_e52ga \
        --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k \
        --data-urlencode "grant_type=authorization_code" \
        --data-urlencode "code=0sdvsw1-05a2-3ebe-bb42-e007160b46f4" \
        --data-urlencode "redirect_uri=https://localhost:3000"
        ```

7. {{ product_name }} responds with the access token and other tokens to the client application.

    ```json
    {
        "access_token":"131d4094-b94c-3714-9e73-672aa433248d",
        "refresh_token":"96a6d697-0120-3bec-86be-21b58f600a07",
        "token_type":"Bearer",
        "expires_in":3600
    }
    ```

    !!! note "Refresh token"

        Refresh tokens are used to obtain new access tokens. Learn more about the [refresh token grant](#refresh-token-grant)

8. The client application can now request user information from the resource server by providing the access token.

9. The resource server returns the requested user information to the client application.

## Refresh token grant

When an access token expires, clients may use the refresh token grant to obtain a new access token without requiring the user to re-authenticate. This can help improve the user experience by avoiding unnecessary login prompts and reducing the load on the authorization server. Refresh tokens typically have a longer lifetime than access tokens, and the user or the authorization server can revoke them at any time.

The following diagram shows how the refresh token flow works.

![How the refresh token grant works]({{base_path}}/assets/img/references/grants/refresh-token.png)

1. The client application requests user information from the resource server by providing the access token.
2. As the access token is expired, the resource server returns an error message.
3. By sending the refresh token, the client application requests a new access token from {{ product_name }}.

    === "Request format (/token)"

        ```bash
        curl -k {{base_url}}/oauth2/token \
        --header "Content-Type: application/x-www-form-urlencoded"
        --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
        --data-urlencode "grant_type=refresh_token" \
        --data-urlencode "refresh_token=<REFRESH_TOKEN>"
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -k {{base_url}}/oauth2/token \
        --header "Content-Type: application/x-www-form-urlencoded"
        --header "Authorization: Basic RWkwV2Y5YnpmTXE0UTBsZndTdlRQamU4a2NFYTpIRvvyUzJIUjlrZE9YMjBXTG9JNmY1eE1wdUlBamdKeG5aUVVUMV9lNTJnYQ==" \
        --data-urlencode "grant_type=refresh_token" \
        --data-urlencode "refresh_token=96a6dsd97-0120-3bec-86be-21b58f600a07"
        ```

4. {{ product_name }} sends a new access token and a new refresh token.

    ```json
    {
    "access_token":"b9ed0658-f187-3d39-a4f1-6d42522e1eee",
    "refresh_token":"3426ff78-62a5-32fa-be6e-74ab69d4cbf4",
    "token_type":"Bearer",
    "expires_in":3600
    }
    ```

## Client credentials grant

The client credentials flow provides a secure way for client applications to obtain an access token without user authentication. This can be useful in scenarios where the client application needs to access its own resources, such as data storage or APIs, without requiring user authentication.
However, it is important to ensure that the client credentials are kept secure, as any party that posses these credentials can obtain access tokens and access the client's resources.

The following diagram shows how the client credentials grant flow works.

![How the client credentials grant works]({{base_path}}/assets/img/references/grants/client-credentials.png)

1. The client application sends its credentials (`client_id` and `client_secret`) to {{ product_name }} and requests an access token.

    === "Request format (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth/token \
        --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=client_credentials" 
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth/token \
        --header "Authorization: Basic RWkwV2Y5YnpmTXE0UTBsZndTdlRQamU4a2NFYTpIRvvyUzJIUjlrZE9YMjBXTG9JNmY1eE1wdUlBamdKeG5aUVVUMV9lNTJnYQ==" \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=client_credentials"
        ```

2. {{ product_name }} sends the access token to the client application.

    ```json
    {
    "token_type":"Bearer",
    "expires_in":2061,
    "access_token":"ca19a540f544777860e44e75f605d927"
    }
    ```
    
3. The client application can now request for resources by providing the access token.

4. The resource server returns the requested resources to the client application.

## Implicit grant

!!! warning
        {{ product_name }} does not recommend using implicit grant for applications.

The implicit grant flow is an OAuth 2.0 grant type that enables a client application to obtain an access token from the authorization server without the intermediate exchange of an authorization code. This flow is commonly used in scenarios where the client application runs on a web browser.

However, it is important to note that the access token is exposed in the browser's URL fragment, which can make it vulnerable to certain types of attacks, such as cross-site scripting (XSS). As a result, this flow is typically not recommended for applications that require high security.

The following diagram shows how the implicit grant flow works.

![How the implicit grant works]({{base_path}}/assets/img/references/grants/implicit-grant.png)

1. The user visits the client application and requests for login through {{ product_name }}.
2. The client application redirects the authorization request to {{ product_name }}.

    === "Request format (/authorize)"

        ```bash
        {{base_url}}/oauth2/authorize
        ?response_type=token
        &client_id=<CLIENT_ID>
        &redirect_uri=<REDIRECT_URI>
        ```

    === "Sample request (/authorize)"

        ```bash
        {{base_url_example}}/oauth2/authorize
        ?response_type=token
        &client_id=cHuGSLCm77ApRFcsdyh_4sdFU2XYa
        &redirect_uri=https://localhost:3000
        ```

3. {{ product_name }} prompts the user to enter credentials.
4. The user enters the credentials.
5. After successful authentication, {{ product_name }} sends the access token to the client application.

    ```bash
    https://localhost:3000
    #access_token=317c19b3-73e3-3906-8627-d1c952856b5d
    &token_type=Bearer
    &expires_in=3600
    ```

6. The client application can now request user information from the resource server by providing the access token.
7. The resource server returns requested user information to the client application.

## Password grant

The password grant flow is an OAuth 2.0 grant type that enables a client application to obtain an access token by presenting the user's username and password directly to the authorization server. This flow is generally considered less secure than other grant types as it requires the client application to handle and transmit the user's credentials.

The password grant is primarily used in scenarios where the client application is highly trusted and the user experience is prioritized over security. It is generally not recommended for use in public-facing applications or scenarios where sensitive data is accessed.

The following diagram shows how the password grant flow works.

![How the password grant works]({{base_path}}/assets/img/references/grants/password-grant.png)

1. The user visits the client application and requests for login through {{ product_name }}.
2. The client application requests the user's credentials.
3. The user enters the requested credentials to the client application.

4. The client application sends the user's credentials and requests an access token from {{ product_name }}.

    === "Request format (/token)"

        ```bash
        curl -v -X POST -k -d {{base_url}}/oauth2/token \
        --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
        --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" \
        --data-urlencode "grant_type=password" \
        --data-urlencode "username=<username>&password=<password>"
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth/token \
        --header "Authorization: Basic RWkwV2Y5YnpmTXE0UTBsZndTdlRQamU4a2NFYTpIRvvyUzJIUjlrZE9YMjBXTG9JNmY1eE1wdUlBamdKeG5aUVVUMV9lNTJnYQ==" \
        --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" \
        --data-urlencode "grant_type=password" \
        --data-urlencode "username=admin&password=admin"
        ```

5. {{ product_name }} sends the access token to the client application.

    ```json
    {
    "access_token":"16ab408c-0f31-3321-8bed-313e836df373",
    "refresh_token":"3c285b4f-ec29-3751-9ced-74c92061b327",
    "token_type":"Bearer",
    "expires_in":3600
    }
    ```

6. The client application can now request user information from the resource server by providing the access token.
7. The resource server returns the requested user information to the client application.

{% if product_name == "WSO2 Identity Server" %}
## Device authorization grant

Device authorization grant (Device flow) is an OAuth 2.0 extension that lets clients sign in to applications through,

- Input-constrained devices
- Devices without a browser

Such devices include smart TVs, printers, and gaming consoles. Device flow instructs the user to review the authorization request on a secondary device, such as a smartphone.

The device flow does not require two-way communication between the OAuth client and the device. It guides the end user to another device to complete the sign-in process.

The diagram below illustrates the device flow.

![device-authorization-grant-diagram]({{base_path}}/assets/img/references/grants/device-flow.png)

1. The client device sends an access request including its client identifier to WSO2 Identity Server.

2. WSO2 Identity Server issues a device code, a user code, and a verification URI.

3. The client device instructs the user to access the provided URI using a secondary device (e.g., a mobile device). The client device provides the user with the user code.

4. WSO2 Identity server prompts the user to enter the end-user code and the user enters the uder code

5. WSO2 Identity server validates the code and asks the end user to accept or decline the authorization request.

6. While the end user reviews the authorization request, the client polls the authorization server with the device code and client identifier to check if the user has completed the authorization step.

7. If the user grants access, the authorization server validates the verification code and responds with the access token.

8. The client application can now request resources from the resource server by providing the access token.

9. The resource server returns the requested user information to the client application.

{% endif %}

## Token exchange grant
OAuth 2.0 token exchange is a grant type in the OAuth 2.0 framework that enables the exchange of one type of token for another. This grant type is defined in the [OAuth Token Exchange specification (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693){:target="_blank"}

The token exchange grant type is useful in scenarios where an application needs to obtain a different type of access token with a different set of permissions or attributes than the one it currently possesses. It allows an application to act on a user's or another entity's behalf, obtaining a new access token that represents the requested authorization.

!!! note "note"
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

See [configure the token exchange flow]({{base_path}}/guides/authentication/configure-token-exchange) for more details.

## SAML 2.0 bearer grant

SAML 2.0 bearer grant is a grant type in the OAuth 2.0 framework that enables the exchange of a SAML 2.0 assertion for an OAuth 2.0 access token. This grant type is defined in the [SAML 2.0 Profile for OAuth 2.0 Client Authentication and Authorization Grants specification (RFC 7522)](https://datatracker.ietf.org/doc/html/rfc7522){:target="_blank"}

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
