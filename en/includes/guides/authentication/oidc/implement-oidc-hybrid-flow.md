# Implement login using the OIDC Hybrid flow

Hybrid flow is an authorization flow defined in the [OpenID Connect specification](https://openid.net/specs/openid-connect-core-1_0.html#HybridFlowAuth){target="_blank"} that combines aspects of both the authorization code flow and the implicit flow. Depending on the requested response type, the flow allows clients to receive both an authorization code and tokens in the authorization response.

You may implement the hybrid flow using {{product_name}} by following the steps below.

## Prerequisites

- To get started, you need to have an application registered in {{ product_name }}. If you don't already have one, [register an OIDC application]({{base_path}}/guides/applications/register-oidc-web-app/#register-app).

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

- Go to the **Protocol** section of the created application and take note of the generated `Client ID` and the `Client secret`.

## Enable the hybrid flow

Follow the steps below to enable the hybrid flow for your application.

1. On the {{ product_name }} Console, go to **Applications**.
2. Select your application and go to its **Protocol** tab.
3. Under **Allowed grant types**, select **Code**.
4. Under **Hybrid Flow**, select **Enable Hybrid Flow** and select the preferred response type.

    ![Enable hybrid flow]({{base_path}}/assets/img/guides/authentication/enable-hybrid-flow.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! tip

        Learn more about the response types in [Implement the hybrid flow](#implement-the-hybrid-flow)

    !!! warning

        It is not recommended to use `code token` and `code id_token token` response types, as obtaining the access token directly from the authorization endpoint without client authentication introduces potential security vulnerabilities, including the risk of account takeover attacks.

5. Click **Update** to save the changes.

{% else %}

- Go to the **Protocol** section of the created application and do the following:

    - Take note of the **Client ID** and the **Client secret** generated for the application.

    - Under **Allowed grant types**, select **Code** and click **Update** to save the changes.

{% endif %}

## Implement the hybrid flow

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}
Now that you have [enabled the hybrid flow](#enable-the-hybrid-flow) for your application, let's take a look at how you may implement the hybrid flow for your application.

{% else %}

Let's take a look at how you may implement the hybrid flow for your application.

{% endif %}

The initial authorization request is similar to that of the [authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/), with the exception of setting the `response_type` parameter to one of [code token](#code-token), [code id_token](#code-id_token), or [code id_token token](#code-id_token-token).

{% if product_name == "WSO2 Identity Server" %}

!!! warning

    It is not recommended to use `code token` and `code id_token token` response types, as obtaining the access token directly from the authorization endpoint without client authentication introduces potential security vulnerabilities, including the risk of account takeover attacks.

{% endif %}

``` bash
{{host_name}}/oauth2/authorize?
response_type={response_type}
&client_id={client_ID}
&nonce={random_value_generated_by_client}
&redirect_uri={url_to_redirect_after_login}
```
The following sections explain the reponse types available with the OIDC Hybrid Flow.

### code token

!!! warning

    It is not recommended to use `code token` response type as it does not adhere to best practices and may introduce security risks.

Hybrid flow intiated with the `code token` response type requests for an authorization code and an access token from the authorization endpoint.

=== "request format (`code token`)"

    ``` bash
    {{host_name}}/oauth2/authorize?
    response_type=code%20token
    &client_id={client_id}
    &nonce={random_value_generated_by_client}
    &redirect_uri={url_to_redirect_after_login}
    &scope={scopes}
    ```

=== "sample request (`code token`)"

    ``` bash
    {{host_name}}/oauth2/authorize?
    response_type=code%20token
    &client_id=SkpwV3lG88X0BU1msAoRRA0zrWEa
    &nonce=asd
    &redirect_uri=http://localhost:8080/playground2/oauth2client
    &scope=openid
    ```
=== "sample response (`code token`)"

    ``` bash
    http://localhost:8080/playground2/oauth2client#
    access_token=1940a308-d492-3660-a9f8-46723cc582e9
    &code=99b34587-5483-374d-8b25-50485498e761
    &token_type=Bearer
    &expires_in=299999
    &session_state=baae9a71cdabe38b4643b9d59bd9f65ffaf5a9b8c453f4256c085e5a1c57e624.-EA3ZqPzLvsk25CKmt56YA
    ```

The token received in the response may be immediately used to invoke APIs authorized for it. The authorization code can be exchanged to receive other tokens such as access tokens, refresh tokens and the ID token as follows.

=== "request format"

    ```bash
    curl -k -v '{{host_name}}/oauth2/token' \
    -u '{client_ID}:{client_secret}' \
    -d 'grant_type=authorization_code&code={authorization_code}&redirect_uri={url_to_redirect_after_login}'
    ```

=== "sample request"

    ``` bash
    curl -k -v '{{host_name}}/oauth2/token' \
    -u 'SkpwV3lG88X0BU1msAoRRA0zrWEa:0XVfmHcThOWpBN0iJf_4679Ir0Qe_fPMJCXSREW4bM4a' \
    -d 'grant_type=authorization_code&code=99b34587-5483-374d-8b25-50485498e761&redirect_uri=http://localhost:8080/playground2/oauth2client'
    ```
=== "sample response"

    ``` bash
    {“access_token”:”1940a308-d492–3660-a9f8–46723cc582e9",
    ”refresh_token”:”6b96cc3a-00da-3d7d-acd1–5aaf76dcd9d4",
    ”scope”:”openid”,
    ”id_token”:”eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsInN1YiI6ImFkbWluIiwiYXVkIjpbIm5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiXSwiYXpwIjoibmN6Ymc1bTV4eHQ2dFA0VU1ad0I2UHRRb1FvYSIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTUxMDgzMTAxMCwibm9uY2UiOiJhc2QiLCJpYXQiOjE1MTA4MzEwMDd9.XKV0ioEvflR4MHGthO3cwXwC88msNgqR4l1O83mfhxOMtO1PG3ABWB5E4aFXFpR9t-8zJs09slhLsDTDhmC33KE8Die61UK9_Vb5aNA4XCkawyJt8dCX6clc6UUbTEO5N1ubXA18QFgwAEWpvoTz1hKx8XLnvOSehbdEKsoPunoHDmXpYJe_9hBg5V3kN-VHxdKdGOtl9u-Aml42s5p45cZY0mlFVcKjatBAf7hqWNPlUebyujDWG1Iyk_-AXNQ2wYi0F77uG7_HstP_tp0sOctu0TYCK8bwBTXEJYMPt1CqOqcae05m8N8hb0zs6Yxvyx_udCJPG-8n2zRB-T-kcg”,
    ”token_type”:”Bearer”,
    ”expires_in”:299494}
    ```

!!! note

    There may be instances where the access token received from the `/authorize` endpoint and the one received from the `/token` endpoint are not the same.

### code id_token

Hybrid flow intiated with the `code id_token` response type requests for an authorization code and an ID token from the authorization endpoint.

=== "request format (`code id_token`)"

    ``` bash
    {{host_name}}/oauth2/authorize?
    response_type=code%20id_token
    &client_id={client_id}
    &nonce={random_value_generated_by_client}
    &redirect_uri={url_to_redirect_after_login}
    &scope={scopes}
    ```

=== "sample request (`code id_token`)"

    ``` bash
    {{host_name}}/oauth2/authorize?
    response_type=code%20id_token
    &client_id=SkpwV3lG88X0BU1msAoRRA0zrWEa
    &nonce=asd
    &redirect_uri=http://localhost:8080/playground2/oauth2client
    &scope=openid
    ```
=== "sample response (`code id_token`)"

    ```bash
    http://localhost:8080/playground2/oauth2client#
    id_token=eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsInN1YiI6ImFkbWluIiwiYXVkIjpbIm5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiXSwiYXpwIjoibmN6Ymc1bTV4eHQ2dFA0VU1ad0I2UHRRb1FvYSIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTUxMDgzMTAxMCwibm9uY2UiOiJhc2QiLCJpYXQiOjE1MTA4MzEwMDd9.XKV0ioEvflR4MHGthO3cwXwC88msNgqR4l1O83mfhxOMtO1PG3ABWB5E4aFXFpR9t-8zJs09slhLsDTDhmC33KE8Die61UK9_Vb5aNA4XCkawyJt8dCX6clc6UUbTEO5N1ubXA18QFgwAEWpvoTz1hKx8XLnvOSehbdEKsoPunoHDmXpYJe_9hBg5V3kN-VHxdKdGOtl9u-Aml42s5p45cZY0mlFVcKjatBAf7hqWNPlUebyujDWG1Iyk_-AXNQ2wYi0F77uG7_HstP_tp0sOctu0TYCK8bwBTXEJYMPt1CqOqcae05m8N8hb0zs6Yxvyx_udCJPG-8n2zRB-T-kcg
    &code=16fd899f-5f0c-3114-875e-2547b629cd05
    &session_state=d96bad64e37e82196898a824082aafbdd945c922e7d40cb4e0013d9fad6d68c8.o0_m4GJ1YJvNUUqg8k3LrQ
    ```

The authorization code can be exchanged to receive other tokens such as access tokens, refresh tokens and the ID token as follows.

=== "request format"

    ```bash
    curl -k -v '{{host_name}}/oauth2/token' \
    -u '{client_ID}:{client_secret}' \
    -d 'grant_type=authorization_code&code={authorization_code}&redirect_uri={url_to_redirect_after_login}'
    ```

=== "sample request"

    ``` bash
    curl -k -v '{{host_name}}/oauth2/token' \
    -u 'SkpwV3lG88X0BU1msAoRRA0zrWEa:0XVfmHcThOWpBN0iJf_4679Ir0Qe_fPMJCXSREW4bM4a' \
    -d 'grant_type=authorization_code&code=16fd899f-5f0c-3114-875e-2547b629cd05&redirect_uri=http://localhost:8080/playground2/oauth2client'
    ```

=== "sample response"

    ``` java
    {“access_token”:”1940a308-d492–3660-a9f8–46723cc582e9",
    ”refresh_token”:”6b96cc3a-00da-3d7d-acd1–5aaf76dcd9d4",
    ”scope”:”openid”,
    ”id_token”:”eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsInN1YiI6ImFkbWluIiwiYXVkIjpbIm5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiXSwiYXpwIjoibmN6Ymc1bTV4eHQ2dFA0VU1ad0I2UHRRb1FvYSIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTUxMDgzMjI3MSwibm9uY2UiOiJhc2QiLCJpYXQiOjE1MTA4MzIyNjd9.jAGLp8FFdIyFi4ZmvRPX9hVu8NbLVL2iM1895UNrS7wqgl2PCi7zHnvBoOYkbsxxMYGoVepFNzz7hHbk-kuzq_kBoBsZK2Ucbv0hUkwiEkigLy6hpGm-mqXjai3cjlJevWOVcZbMhkEyRlsZtdUG0RCzteT7emAuZLFm5zfMpq1h5JsVRGjK_6fQbHhB2Svkl_kV_ctAD8_kymASGEjRGnwGW5np4uBI0NPYMDTvrl8N9i6yfUVD9-y7rL9Gtrq9hK28Swj5Szvv_c1IX8wYBP-p8gu2cBpGIulIq-OkbfCUh-rrbh96relOaKwKwk0g7nST6o6wZTAwaicNQBYHYw”,
    ”token_type”:”Bearer”,
    ”expires_in”:298234}
    ```

### code id_token token

!!! warning

    It is not recommended to use `code id_token token` response type as it does not adhere to best practices and may introduce security risks.


Hybrid flow intiated with the `code id_token token` response type requests for an authorization code, an access token and an ID token from the authorization endpoint.

=== "request format (`code id_token token`)"

    ``` bash
    {{host_name}}/oauth2/authorize?
    response_type=code%20id_token%20token
    &client_id={client_id}
    &nonce={random_value_generated_by_client}
    &redirect_uri={url_to_redirect_after_login}
    &scope={scopes}
    ```

=== "sample request (`code id_token token`)"

    ``` bash
    {{host_name}}/oauth2/authorize?
    response_type=code%20id_token%20token
    &client_id=SkpwV3lG88X0BU1msAoRRA0zrWEa
    &nonce=asd
    &redirect_uri=http://localhost:8080/playground2/oauth2client
    &scope=openid
    ```
=== "sample response (`code id_token token`)"

    ```bash
    http://localhost:8080/playground2/oauth2client#
    id_token=eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsImNfaGFzaCI6IlhDUnVTMmhFT0JfM0hkeG9FM0pxT2ciLCJzdWIiOiJhZG1pbiIsImF1ZCI6WyJuY3piZzVtNXh4dDZ0UDRVTVp3QjZQdFFvUW9hIl0sImF6cCI6Im5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE1MTA4MzMxNjQsIm5vbmNlIjoiYXNkIiwiaWF0IjoxNTEwODMzMTYwfQ.WgpDf07dDVqrJRBbe_EqLYAfuRQQ1GkBJzgxaIczLTU_e-HasS6e24l75P0Csv0i2gUXk_H9d8zyJ6zalp2geBUmJ1wXLJtELrp-wvVaHVj-_aLHXM_8bsjL-BTj_f-OUEpGiDsPh19GxcMWw6hOubM0JKMh6ZWbF_A7-7RWwlh3vvRSjHhzhWypfjfP1NGTByjICJWF31AbGgfBy7OUUDhOIURYZM0m5u0fmvvD4O8qah1zjTxUL6mLaalOZ7QNppPU7SmPgeSQnfNsxy5KCA_N1vYyNLxzs3NitcCZAOQ88XU2AF-W4Sykay0tp1qiI35mqHg2cYinNPEdrnCYyQ
    &access_token=1940a308-d492-3660-a9f8-46723cc582e9
    &code=55aa698d-ac3b-30ec-b4ca-f5e803590a4b  
    &token_type=Bearer
    &expires_in=297341
    &session_state=872ac70304690624d4b3e2c705b5f452043be5f758ddd2487aa193730d9ef809.IwoAA6ua4m5CRth0erWuxA
    ```

The authorization code can be exchanged to receive other tokens such as access tokens, refresh tokens and the ID token as follows.

=== "request format"

    ```bash
    curl -k -v '{{host_name}}/oauth2/token' \
    -u '{client_ID}:{client_secret}' \
    -d 'grant_type=authorization_code&code={authorization_code}&redirect_uri={url_to_redirect_after_login}'
    ```

=== "sample request"

    ``` bash
    curl -k -v '{{host_name}}/oauth2/token' \
    -u 'SkpwV3lG88X0BU1msAoRRA0zrWEa:0XVfmHcThOWpBN0iJf_4679Ir0Qe_fPMJCXSREW4bM4a' \
    -d 'grant_type=authorization_code&code=55aa698d-ac3b-30ec-b4ca-f5e803590a4b&redirect_uri=http://localhost:8080/playground2/oauth2client'
    ```

=== "sample response"

    ``` java
    {“access_token”:”1940a308-d492–3660-a9f8–46723cc582e9",
    ”refresh_token”:”6b96cc3a-00da-3d7d-acd1–5aaf76dcd9d4",
    ”scope”:”openid”,
    ”id_token”:”eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsInN1YiI6ImFkbWluIiwiYXVkIjpbIm5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiXSwiYXpwIjoibmN6Ymc1bTV4eHQ2dFA0VU1ad0I2UHRRb1FvYSIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTUxMDgzMzMwNywibm9uY2UiOiJhc2QiLCJpYXQiOjE1MTA4MzMzMDN9.k69ufNIJHJHb6foeRSMVoJsgAWz0q65_8R6Lhz-tIW-tdLDI7eNg3kSL5-S2T3uFn7XFvn113wEWvCS8X3JBCIPMAFCmGBCR_L5pCh_OO6_xQeZyfa0fx_R27kZ9EIW5u0WSSjlpzzvr_50YldCfXMhZASjZlA5sCZ9BReyhkEUW_kSCWUDJEPaFQqgKVNfnRmr1q4N2lJwXPHjjE-4BcTMxKY87mqFzq_HVdXc1SRVIG0iuWkiYaD34pK8ZI12GFGSmOpDzhYb06uxrR8GC4jpq_WHMvMKrPrLaoVkEFaqomgxLIOJaNZJzqpe3wlaWM952eTndpSW0HSR5kgZgmw”,
    ”token_type”:”Bearer”,
    ”expires_in”:297198}
    ```

## Validate codes/tokens in the hybrid flow

The following are some of the recommended validations you should perform during the hybrid flow.

- In response modes where a code and an ID token are returned from the authorization endpoint (such as [code id_token](#code-id_token)), use the `c_hash` in the decoded ID token to validate the authorization code.

    ??? details "How c_hash is calculated"

        The `c_hash` is calculated using the following method:

        - Convert the authorization code into its ASCII representation.
        - Hash the octets of the ASCII representation using the hash algorithm specified in the JOSE header of the ID token. For instance, if the alg is RS256, the hash algorithm used is SHA-256.
        - Take the left-most half of the hash and base64url-encode it.

- In response modes where an access token and an ID token are returned from the authorization endpoint (such as [code id_token token](#code-id_token-token)), use the `at_hash` in the decoded ID token to validate the access token.

    ??? details "How at_hash is calculated"

        The `at_hash` is calculated using the following method:

        - Convert the access token into its ASCII representation.
        - Hash the octets of the ASCII representation using the hash algorithm specified in the JOSE header of the ID token. For instance, if the alg is RS256, the hash algorithm used is SHA-256.
        - Take the left-most half of the hash and base64url-encode it.

- In the [code id_token](#code-id_token) or [code id_token token](#code-id_token-token) response modes, an ID token will be returned from the authorization endpoint and the received authorization code can be exchanged to obtain a second ID token from the token endpoint. Be sure to perform the following validations for the received ID tokens:

    1.  Ensure that the `iss` and `sub` claim values are identical.
    2.  If there are common user claims available in the ID tokens, ensure their values are identical.
    3.  All claims related to the authentication event should be available in both ID tokens.
    4.  The `at_hash` and `c_hash` claims, which are present in the ID token returned from the authorization endpoint, may be omitted from the ID token received from the token endpoint.

!!! note

    Find more information on hybrid flow validations in the [OIDC specification](https://openid.net/specs/openid-connect-core-1_0.html#HybridFlowAuth){target="_blank"}