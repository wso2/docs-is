# OAuth2 grant types

Grant types in OAuth 2.0 are defined as the methods used by a client to obtain an access token from the identity provider. {{product_name}} supports the following grant types. Each grant type is designed for a specific use case and supports different parameters.

#### OAuth 2.0 grants

- [Authorization code grant](#authorization-code-grant)
- [Refresh token grant](#refresh-token-grant)
- [Client credentials grant](#client-credentials-grant)
- [Implicit grant](#implicit-grant)
- [Password grant](#password-grant)
{% if product_name == "WSO2 Identity Server" %}
- [Device authorization grant](#device-authorization-grant)
{% endif %}
- [Token exchange grant](#token-exchange-grant)
{% if product_name == "WSO2 Identity Server" %}
- [SAML 2.0 bearer grant](#saml-20-bearer-grant)
{% endif %}

#### {{product_name}}'s custom grants

- [Organization switch grant](#organization-switch-grant)

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
        &scope=<scopes>
        ```

    === "Sample request (/authorize)"

        ```bash
        {{base_url_example}}/oauth2/authorize
        ?response_type=code
        &client_id=cHuGSLCm77ApRFcsdyh_4sdFU2XYa
        &redirect_uri=https://localhost:3000
        &scope=internal_application_mgt_view internal_user_mgt_list
        ```

3. {{ product_name }} prompts the user for login.
4. The user logs in.
5. After successful authentication, {{ product_name }} sends the authorization code to the client application.

    ``` bash
    https://localhost:3000?code=9142d4cad58c66d0a5edfad8952192
    ```
6. The client application uses this authorization code to request an access token from {{ product_name }} (back channel).

    === "Request format (/token)"

        ``` bash
        curl -v -X POST {{base_url}}/oauth2/token \ 
        --basic -u <CLIENT_ID>:<CLIENT_SECRET> \
        --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k \
        --data-urlencode "grant_type=authorization_code" \
        --data-urlencode "code=<AUTHORIZATION_CODE>" \
        --data-urlencode "redirect_uri=<REDIRECT_URI>"
        ```

    === "Sample request (/token)"

        ```bash
        curl -v -X POST {{base_url_example}}/oauth2/token \ 
        --basic -u Ei0Wf9bzfsdvdd0lfwSvTPje8kcEa:HFI2S2HR9kdfg543f5xMpuIAjgJxnZQUT1_e52ga \
        --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k \
        --data-urlencode "grant_type=authorization_code" \
        --data-urlencode "code=9142d4cad58c66d0a5edfad8952192" \
        --data-urlencode "redirect_uri=https://localhost:3000"
        ```

7. {{ product_name }} responds with the access token and other tokens to the client application.

    ```json
    {
        "access_token":"131d4094-b94c-3714-9e73-672aa433248d",
        "refresh_token":"96a6d697-0120-3bec-86be-21b58f600a07",
        "token_type":"Bearer",
        "scope": "internal_application_mgt_view internal_user_mgt_list"
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
        --header "Content-Type: application/x-www-form-urlencoded" \
        --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
        --data-urlencode "grant_type=refresh_token" \
        --data-urlencode "refresh_token=<REFRESH_TOKEN>"
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -k {{base_url_example}}/oauth2/token \
        --header "Content-Type: application/x-www-form-urlencoded" \
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

The client credentials flow is a secure OAuth 2.0 flow used for machine-to-machine communication. It provides a secure way for client applications to obtain an access token without user involvement. This can be useful in scenarios where the client application needs to access resources that do not require authentication, such as APIs or services that the client owns and manages.

If you wish to implement this grant type, it is important to ensure that the client credentials are kept secure, as any party that possesses these credentials can obtain access tokens and access the client's resources.

The following diagram shows how the client credentials grant flow works.

![How the client credentials grant works]({{base_path}}/assets/img/references/grants/client-credentials.png)

1. The client application sends its credentials (`client_id` and `client_secret`) to {{ product_name }} and requests an access token.

    === "Request format (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth2/token \
        --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=client_credentials" \
        --data-urlencode "scope=<scopes>"
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -v -k -X POST {{base_url_example}}/oauth2/token \
        --header "Authorization: Basic RWkwV2Y5YnpmTXE0UTBsZndTdlRQamU4a2NFYTpIRvvyUzJIUjlrZE9YMjBXTG9JNmY1eE1wdUlBamdKeG5aUVVUMV9lNTJnYQ==" \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=client_credentials" \
        --data-urlencode "scope=internal_idp_view internal_idp_create internal_organization_view"
        ```

2. {{ product_name }} sends the access token to the client application.

    ```json
    {
    "token_type":"Bearer",
    "expires_in":3600,
    "access_token":"ca19a540f544777860e44e75f605d927",
    "scope": "internal_idp_view internal_idp_create internal_organization_view"
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
        curl -v -k -X POST {{base_url}}/oauth2/token \
        --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
        --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" \
        --data-urlencode "grant_type=password" \
        --data-urlencode "username=<username>&password=<password>" \
        --data-urlencode "scope=<scopes>"

        ```
    
    === "Sample request (/token)"

        ```bash
        curl -v -k -X POST {{base_url_example}}/oauth2/token \
        --header "Authorization: Basic RWkwV2Y5YnpmTXE0UTBsZndTdlRQamU4a2NFYTpIRvvyUzJIUjlrZE9YMjBXTG9JNmY1eE1wdUlBamdKeG5aUVVUMV9lNTJnYQ==" \
        --header "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" \
        --data-urlencode "grant_type=password" \
        --data-urlencode "username=admin&password=admin" \
        --data-urlencode "scope=internal_idp_view internal_idp_create internal_organization_view"
        ```

5. {{ product_name }} sends the access token to the client application.

    ```json
    {
    "access_token":"16ab408c-0f31-3321-8bed-313e836df373",
    "refresh_token":"3c285b4f-ec29-3751-9ced-74c92061b327",
    "token_type":"Bearer",
    "expires_in":3600,
    "scope": "internal_idp_view internal_idp_create internal_organization_view"
    }
    ```

6. The client application can now request user information from the resource server by providing the access token.
7. The resource server returns the requested user information to the client application.

{% if product_name == "WSO2 Identity Server" %}
## Device authorization grant

Device authorization grant (Device flow) is an OAuth 2.0 extension that lets clients sign in to applications through input-constrained devices and devices without a browser. 
Such devices include smart TVs, printers, and gaming consoles. The device flow does not require two-way communication between the OAuth client and the device. Instead, it guides the end user to another device, such as a smartphone, to complete the sign-in process.

The diagram below illustrates the device flow.

![device-authorization-grant-diagram]({{base_path}}/assets/img/references/grants/device-flow.png)

1. The client device sends an access request including its client identifier to {{product_name}}.

    === "Request format (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth2/device_authorize \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "client_id=<CLIENT_ID>"
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -v -k -X POST {{base_url_example}}/oauth2/device_authorize \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "client_id=bbwJEayR_OMwPkAgm9VOMzLnYLga"
        ```

2. {{product_name}} issues a device code, a user code, and a verification URI.

    ```json
    {
    "user_code":"s2DqSNK",
    "device_code":"d3fe0db1-2334-48fa-b7d9-821ecfad10d5",
    "interval":5000,
    "verification_uri_complete":"{{base_url}}/authenticationendpoint/device.do?user_code=s2DqSNK",
    "verification_uri":"{{base_url}}/authenticationendpoint/device.do",
    "expires_in":3600
    }
    ```


3. The client device instructs the user to access the provided URI using a secondary device (e.g., a mobile device). The client device provides the user with the user code.

4. WSO2 Identity server prompts the user to enter the end-user code and the user enters the user code.

5. WSO2 Identity server validates the code and asks the end user to accept or decline the authorization request.

6. While the end user reviews the authorization request, the client polls the authorization server with the device code and client identifier to check if the user has completed the authorization step.

    === "Request format (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth2/token \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:device_code" \
        --data-urlencode "client_id=<CLIENT_ID>" \
        --data-urlencode "device_code=<DEVICE_CODE>"
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth2/token \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:device_code" \
        --data-urlencode "client_id=bbwJEayR_OMwPkAgm9VOMzLnYLga" \
        --data-urlencode "device_code=d3fe0db1-2334-48fa-b7d9-821ecfad10d5"
        ```

7. If the user grants access, the authorization server validates the verification code and responds with the access token.

    ```json
    {
    "access_token":"74d610ab-7f4a-3b11-90e8-279d76644fc7",
    "refresh_token":"fdb58069-ecc7-3803-9b8b-6f2ed85eff19",
    "token_type":"Bearer",
    "expires_in":3600
    }
    ```

8. The client application can now request resources from the resource server by providing the access token.

9. The resource server returns the requested user information to the client application.

{% endif %}

## Token exchange grant

OAuth 2.0 token exchange is a grant type in the OAuth 2.0 framework that enables the exchange of one type of token for another with a different set of permissions or attributes. This grant type is defined in the [OAuth Token Exchange specification (RFC 8693)](https://datatracker.ietf.org/doc/html/rfc8693){:target="_blank"}

The following diagram shows how the token exchange grant flow works.

![How the token exchange grant works]({{base_path}}/assets/img/references/grants/token-exchange-grant.png)

1. The user sends a login request to the client application.
2. The client application sends an authorization request to the third-party IdP.
3. The third-party IdP returns the JWT access token for the user to the client application.
4. The client application makes a token exchange request to the authorization server:

    === "Request format (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth2/token \
        --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:jwt" \
        --data-urlencode "subject_token=<token>" \
        --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:access_token" \
        --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange"
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -v -k -X POST {{base_url_example}}/oauth2/token \
        --header "Authorization: Basic RWkwV2Y5YnpmTXE0UTBsZndTdlRQamU4a2NFYTpIRvvyUzJIUjlrZE9YMjBXTG9JNmY1eE1wdUlBamdKeG5aUVVUMV9lNTJnYQ==" \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "subject_token_type=urn:ietf:params:oauth:token-type:jwt" \
        --data-urlencode "subject_token=eyJ4NXQiOiJDN3Q1elQ4UUhXcWJBZ3ZJOGVXWTN4UnlwcE0iLCJraWQiOiJaR0UyTXpjeE1XWXpORGhtTVRoak1HSmlOamhpTmpNMFlqWXhNakJtTUdZeFl6ZzBabU0zWldJd1pHRmxZakk1TTJZelpHTmtaalkxWXpBeE5qZzNNUV9SUzI1NiIsImFsZyI6IlJTMjU2In0.eyJpc2siOiI3YmRhNTY5ZGY0OTZkYzgzYjc1OGZkNmVhN2M2YWU1YzgyNWMyZTMyMDJmN2VjMDhiNTNhNDM2NmViOTA0MDUxIiwiYXRfaGFzaCI6IjVVWU9udGlvcFpqTm5URWhaaudGeGciLCJzdWIiOiI1OWU2Y2VlYS04ZTY2LTQxOTItYmUwOS0zNDBiYjAyZDU3YzEiLCJhbXIiOlsiQmFzaWNBdXRoZW50aWNhdG9yIl0sImlzcyI6Imh0dHBzOlwvXC9hcGkuYXNnYXJkZW8uaW9cL3RcL2hpbWVzaGRldmluZGFcL29hdXRoMlwvdG9rZW4iLCJmaGlyVXNlciI6IlBhdGllbnRcLzEiLCJzaWQiOiJjZjI5YjYzOC00ZWE0LTRiMDEtOWY0NS05MmUwYWMxMDlkZTIiLCJhdWQiOiJ6b1Z0RnlBZjZnYnhXWUxMSkxvcUh2OUo5aGNhIiwiY19oYXNoIjoiM3lYUVBNWVhHVEZWZWwzSWlQWXJXdyIsIm5iZiI6MTcyODI5OTM1OSwiYXpwIjoiem9WdEZ5QWY2Z2J4V1lMTEpMb3FIdjlKOWhjYSIsIm9yZ19pZCI6ImRlOWM1ZjE0LTEwYjYtNDk5YS05OTNkLTg5ZmMzNjJiYjI0MCIsImV4cCI6MTcyODMwMjk1OSwib3JnX25hbWUiOiJoaW1lc2hkZXZpbmRhIiwiaWF0IjoxNzI4Mjk5MzU5LCJqdGkiOiIwZmNkZDMzNy1lZWMyLTRmNDItOGNkZS05YWY0NTkzYTBiZGEifQ.EH2ex0J3Sc6XOC5CRa2ZO2Th2rGYa5Qwk1sYDxaKmSFdnTN90JXduaEdCucR0yv_GzqFe5VX2mpfmtGrFGIsrOBcqDNaw28BTgtgA20j4I_ZD8vrZdjo20K-h-ZuM-bcEtpGR_hAUtomqddGj42sl1Wb0C3ZrcqD2M7g_av9zQLgqCd3Wc6RnTAWHvrm4lWH4Z9MY2U-TCa-9P7VQ5od9dxlYAlLUwmeSTbre-EQxXPQBh8RYGuH9SrxQ7GYbgyOSnR-ZXywPulS8DcxNPMPWP4LAHMrY0xfxoN9yp5SQOYPu08XzyQ6YSY579nHfNamzu8lB7o3yoJio1d0LM4PaQ" \
        --data-urlencode "requested_token_type=urn:ietf:params:oauth:token-type:access_token" \
        --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:token-exchange"
        ```

    
5. The authorization server responds to the client with the new access token.
6. The client application can now request resources from the resource server by providing the access token.
7. As the resource server trusts {{ product_name }} issued tokens, it returns the requested resources to the client application.

See [configure the token exchange flow]({{base_path}}/guides/authentication/configure-token-exchange) for more details.

{% if product_name == "WSO2 Identity Server" %}
## SAML 2.0 bearer grant

SAML 2.0 bearer grant is a grant type in the OAuth 2.0 framework that enables the exchange of a SAML 2.0 assertion for an OAuth 2.0 access token. This grant type is defined in the [SAML 2.0 Profile for OAuth 2.0 Client Authentication and Authorization Grants specification (RFC 7522)](https://datatracker.ietf.org/doc/html/rfc7522){:target="_blank"}.

The following diagram shows how the token exchange grant flow works.

![How the token exchange grant works]({{base_path}}/assets/img/references/grants/saml2-bearer-grant.png)

1. The user sends a login request to the client application.
2. The client application sends an authentication request to the third-party IdP using SAML 2.0.
3. Upon successful user authentication, the third-party IdP issues a SAML 2.0 assertion to the client application.
4. The client application makes a token exchange request to the authorization server.

    === "Request format (/token)"

        ```bash
        curl -v -k -X POST {{base_url}}/oauth2/token \
        --header "Authorization: Basic <Base64Encoded(CLIENT_ID:CLIENT_SECRET)>" \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer" \
        --data-urlencode "assertion=<base64-URL_encoded_assertion>" \
        --data-urlencode "scope=<scopes>" \
        ```
    
    === "Sample request (/token)"

        ```bash
        curl -v -k -X POST {{base_url_example}}/oauth2/token \
        --header "Authorization: Basic RWkwV2Y5YnpmTXE0UTBsZndTdlRQamU4a2NFYTpIRvvyUzJIUjlrZE9YMjBXTG9JNmY1eE1wdUlBamdKeG5aUVVUMV9lNTJnYQ==" \
        --header "Content-Type:application/x-www-form-urlencoded" \
        --data-urlencode "grant_type=urn:ietf:params:oauth:grant-type:saml2-bearer" \
        --data-urlencode "assertion=PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZczpUcmFuc2Zvcm1zPgo8ZHM6VHJhbnNmb3JtIEFsZ29yaXRobT0iaHR0cDovL3d3zOlRyYW5zZm9ybXMaW" \
        --data-urlencode "scope=internal_idp_view internal_idp_create internal_organization_view"
        ```

5. The Authorization Server validates the SAML 2.0 assertion and if valid, generates a new access token and responds to the client with the new access token.
6. The client application can now request resources from the resource server by providing the access token.
7. As the resource server trusts {{ product_name }} issued tokens, it returns the requested resources to the client application.
{% endif %}

## Organization switch grant

The organization switch grant is a custom grant type in {{ product_name }} that enables users to switch between [organizations]({{base_path}}/guides/organization-management/) that exists in a hierarchical structure.

The following diagram illustrates the process of obtaining an access token using the authorization code grant for the root organization and exchanging it for an access token usable within a child organization.

![How the organization switch grant works]({{base_path}}/assets/img/references/grants/organization-switch.png){:  width="800"}

- Steps 1-7 follows the [authorization code grant](#authorization-code-grant) and the client application obtains the necessary access tokens for the root organization.

- The client application then exchanges the received access token for another that can be used within the specified child organization.

    === "Request format (/token)"

        ``` bash
        curl -v -X POST {{base_url}}/oauth2/token \
        --header 'Authorization: Basic <base64 Encoded (clientId:clientSecret)>' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=organization_switch' \
        --data-urlencode 'token={access token from an organization}' \
        --data-urlencode 'scope={required scopes}' \
        --data-urlencode 'switching_organization={organization id}'
        ```
    
    === "Sample request (/token)"

        ``` bash
        curl -v -X POST {{base_url_example}}/oauth2/token \
        --header 'Authorization: Basic ejhSQjZ5c2REWmhlNFFPMHpKQVF6S2JpNlA0YTp6MEM3OXpsb3B4OGk3QnlPdzhLMTVBOWRwbFlh' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'grant_type=organization_switch' \
        --data-urlencode 'token=54bd024f-5080-3db5-9422-785f5d610605' \
        --data-urlencode 'scope=openid internal_org_application_mgt_view' \
        --data-urlencode 'switching_organization=9e394cbf-70bf-532a-955d-0ef34597f2ef'
        ```

    After the root organization validates that the user is a member of the child organization, it returns the exchanged access token to the client application.

!!! Important

    - Although we used the authorization grant type, access tokens issued for a root organization user via other grant types can also be exchanged using the organization switch grant.

    - Apart from the use case explained above, access tokens can be exchanged in the following ways:

        - Root organization user can exchange the access token with a grandchild organization or any other organization down the hierarchy as long as the user has shared access with the relevant organization.

        - A child organization user can exchange the access token obtained for a child organization with another child organization.
    
    - All token exchange requests should be made to the root organization where the client application resides.