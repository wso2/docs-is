# Configure OpenID Connect Hybrid Flow

WSO2 Identity Server supports the [OpenID Connect hybrid flow](../../../concepts/hybrid-client-profile) for authentication.

-----

## Configure hybrid flow

Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file.

```toml
[[oauth.custom_response_type]]
name="code token"
class="org.wso2.carbon.identity.oauth2.authz.handlers.HybridResponseTypeHandler"

[[oauth.custom_response_type]]
name="code id_token"
class="org.wso2.carbon.identity.oauth2.authz.handlers.HybridResponseTypeHandler"

[[oauth.custom_response_type]]
name="code id_token token"
class="org.wso2.carbon.identity.oauth2.authz.handlers.HybridResponseTypeHandler"
```

Specifying any of the following `response_type` values in an authorization request selects the hybrid flow for authentication.

-   [code token](#code-token)
-   [code id\_token](#code-id_token)
-   [code id\_token token](#code-id_token-token)

To understand how the `response_type` value specified in an authorization request selects the hybrid flow to be the authentication flow, let's take a look at the following `response_type` values in detail.

-----

## code token

This `response_type` requests a code and an access token from the authorization endpoint.  
  
1. Use the following authorization request with `code token` as the `response_type`. 

    ```tab="Request Format"
    https://localhost:9443/oauth2/authorize?response_type=code token&client_id=<client_id>&nonce=asd&redirect_uri=<redirect_uri>&scope=openid
    ```

    ```tab="Sample Request"
    https://localhost:9443/oauth2/authorize?response_type=code token&client_id=N_nhS_UXctKHofSyLju1rbt_Cbwa&nonce=asd&redirect_uri=http://localhost:8080/playground2/oauth2client&scope=openid
    ```

    You will receive the following sample response upon successful authorization. 

    ```
    http://localhost:8080/playground2/oauth2client#access_token=1940a308-d492-3660-a9f8-46723cc582e9&code=99b34587-5483-374d-8b25-50485498e761&token_type=Bearer&expires_in=299999&session_state=baae9a71cdabe38b4643b9d59bd9f65ffaf5a9b8c453f4256c085e5a1c57e624.-EA3ZqPzLvsk25CKmt56YA
    ```

2. Send the code to the token endpoint using the following curl command to request for an access token, refresh token, and id\_token.
<a name="curl"></a>

    ``` tab="Request Format"
    curl -k -v — user <client_id>:<client_secret> -d “grant_type=<grant_type>&code=<code>&redirect_uri=<redirect_uri>" https://localhost:9443/oauth2/token
    ```

    ``` tab="Sample Request"
    curl -k -v — user N_nhS_UXctKHofSyLju1rbt_Cbwa:AOkWrH42XKRSsFongXpUnR6mpHYa -d “grant_type=authorization_code&code=99b34587–5483–374d-8b25–50485498e761&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
    ```

    You will receive the following response from the token endpoint.

    ```
    {“access_token”:”1940a308-d492–3660-a9f8–46723cc582e9",”refresh_token”:”6b96cc3a-00da-3d7d-acd1–5aaf76dcd9d4",”scope”:”openid”,”id_token”:”eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsInN1YiI6ImFkbWluIiwiYXVkIjpbIm5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiXSwiYXpwIjoibmN6Ymc1bTV4eHQ2dFA0VU1ad0I2UHRRb1FvYSIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTUxMDgzMTAxMCwibm9uY2UiOiJhc2QiLCJpYXQiOjE1MTA4MzEwMDd9.XKV0ioEvflR4MHGthO3cwXwC88msNgqR4l1O83mfhxOMtO1PG3ABWB5E4aFXFpR9t-8zJs09slhLsDTDhmC33KE8Die61UK9_Vb5aNA4XCkawyJt8dCX6clc6UUbTEO5N1ubXA18QFgwAEWpvoTz1hKx8XLnvOSehbdEKsoPunoHDmXpYJe_9hBg5V3kN-VHxdKdGOtl9u-Aml42s5p45cZY0mlFVcKjatBAf7hqWNPlUebyujDWG1Iyk_-AXNQ2wYi0F77uG7_HstP_tp0sOctu0TYCK8bwBTXEJYMPt1CqOqcae05m8N8hb0zs6Yxvyx_udCJPG-8n2zRB-T-kcg”,”token_type”:”Bearer”,”expires_in”:299494}
    ```

3. Optionally, you can decrypt the `id_token`. It will be similar to the decrypted `id_token` shown below.

    ``` 
    {
    “at_hash”: “JrZY9MtYVEIIJUx-DDBmww”,
    “sub”: “admin”,
    “aud”: [
    “nczbg5m5xxt6tP4UMZwB6PtQoQoa”
    ],
    “azp”: “nczbg5m5xxt6tP4UMZwB6PtQoQoa”,
    “iss”: “https://localhost:9443/oauth2/token",
    “exp”: 1510831010,
    “nonce”: “asd”,
    “iat”: 1510831007
    }
    ```

There can be instances where you get two access tokens. One from the authorization endpoint and the other from the token endpoint. These two access tokens may or may not be same.

## code id_token 

This `response_type` requests a code and an id\_token from the authorization endpoint.

1. Use the following authorization request with `code id_token` as the `response_type`. 

    ```tab="Request Format"
    https://localhost:9443/oauth2/authorize?response_type=code id_token&client_id=<client_id>&nonce=asd&redirect_uri=<redirect_uri>&scope=openid
    ```

    ```tab="Sample Request"
    https://localhost:9443/oauth2/authorize?response_type=code id_token&client_id=N_nhS_UXctKHofSyLju1rbt_Cbwa&nonce=asd&redirect_uri=http://localhost:8080/playground2/oauth2client&scope=openid
    ```

    You will receive the following response upon successful authorization:

    ```
    http://localhost:8080/playground2/oauth2client?code=16fd899f-5f0c-3114-875e-2547b629cd05&id_token=eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsImNfaGFzaCI6IlM1VU9YUk5OeVlzSTZaMEczeHhkcHciLCJzdWIiOiJhZG1pbiIsImF1ZCI6WyJuY3piZzVtNXh4dDZ0UDRVTVp3QjZQdFFvUW9hIl0sImF6cCI6Im5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE1MTA4MzE1MTIsIm5vbmNlIjoiYXNkIiwiaWF0IjoxNTEwODMxNTA4fQ.BsiXZwP_EFnNH-5r01z4P18OZbVY1WHOD1GSTrDa4-TxcSEuMOlvIQA54Poy0hUS8RCP46XB-WhUaOHQpvsHBj6CUCkNWAqJj5F-TetXUhONhnI0Hp7K3zofa_E5-ucFmUoKVwk-wFAMakKziIsX9P8v9-mi2kPlQPDyS3i7tkRlABS5emgbOSHxNsoKjdaglLT78zdARMFfF0i0oaDyRv9nfZIgSZJE1Qec99DA7engA43NJQCB1vMjF9Qruefyyjtq2abaLLRG6Yh6NeWDyIXkjjbHEcKxzBsKU6VqL84DqHHYFUwZ1nL2aLon1kHXUHgGfuhuBJ5qIwEtbZrQLw#session_state=d96bad64e37e82196898a824082aafbdd945c922e7d40cb4e0013d9fad6d68c8.o0_m4GJ1YJvNUUqg8k3LrQ
    ```

3. Optionally, you can decrypt the `id_token`. It will be similar to the decrypted `id_token` shown below.

    ``` 
    {
    “at_hash”: “JrZY9MtYVEIIJUx-DDBmww”,
    “c_hash”: “S5UOXRNNyYsI6Z0G3xxdpw”,
    “sub”: “admin”,
    “aud”: [
    “nczbg5m5xxt6tP4UMZwB6PtQoQoa”
    ],
    “azp”: “nczbg5m5xxt6tP4UMZwB6PtQoQoa”,
    “iss”: “https://localhost:9443/oauth2/token",
    “exp”: 1510831512,
    “nonce”: “asd”,
    “iat”: 1510831508
    }
    ```

    !!! tip
        Here, the id\_token is required to have a `c\_hash` value.
        
        `c\_hash` is the base64url encoding of the left-most half of a hash of theoctets in the ASCII representation of a code value, where the hash algorithm used is the hash algorithm of the `alg` header parameter of the ID token’s JOSE header.
        
        The `c\_hash` value is mandatory when an id_token is issued with code, and the `response_type` is equal to `code id_token` or `code id_token token` .


4. You can send the code to the token endpoint to request for an access token, refresh token and id\_token. For this you can use the same curl command provided for the code token specified [above](#curl).
    
    You will receive the following response from the token endpoint.

    ``` 
    {“access_token”:”1940a308-d492–3660-a9f8–46723cc582e9",”refresh_token”:”6b96cc3a-00da-3d7d-acd1–5aaf76dcd9d4",”scope”:”openid”,”id_token”:”eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsInN1YiI6ImFkbWluIiwiYXVkIjpbIm5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiXSwiYXpwIjoibmN6Ymc1bTV4eHQ2dFA0VU1ad0I2UHRRb1FvYSIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTUxMDgzMjI3MSwibm9uY2UiOiJhc2QiLCJpYXQiOjE1MTA4MzIyNjd9.jAGLp8FFdIyFi4ZmvRPX9hVu8NbLVL2iM1895UNrS7wqgl2PCi7zHnvBoOYkbsxxMYGoVepFNzz7hHbk-kuzq_kBoBsZK2Ucbv0hUkwiEkigLy6hpGm-mqXjai3cjlJevWOVcZbMhkEyRlsZtdUG0RCzteT7emAuZLFm5zfMpq1h5JsVRGjK_6fQbHhB2Svkl_kV_ctAD8_kymASGEjRGnwGW5np4uBI0NPYMDTvrl8N9i6yfUVD9-y7rL9Gtrq9hK28Swj5Szvv_c1IX8wYBP-p8gu2cBpGIulIq-OkbfCUh-rrbh96relOaKwKwk0g7nST6o6wZTAwaicNQBYHYw”,”token_type”:”Bearer”,”expires_in”:298234}
    ```

5. You can decrypt this `id_token` as well. It will be similar to the decrypted `id_token` shown below.

    ``` 
    {
    “at_hash”: “JrZY9MtYVEIIJUx-DDBmww”,
    “sub”: “admin”,
    “aud”: [
    “nczbg5m5xxt6tP4UMZwB6PtQoQoa”
    ],
    “azp”: “nczbg5m5xxt6tP4UMZwB6PtQoQoa”,
    “iss”: “https://localhost:9443/oauth2/token",
    “exp”: 1510832271,
    “nonce”: “asd”,
    “iat”: 1510832267
    }
    ```

6. If there are two id\_tokens issued, where one id\_token is from authorization endpoint and other is from token endpoint, be sure to perform the [neccessary validations](#validations), which are based on the OpenID Connect specification.

-----

## code id_token token 

This `response_type` requests a code, an access token, and an id\_token from the authorization endpoint.

1. Use the following authorization request with `code id_token token` as the `response_type`. 

    ```tab="Request Format"
    https://localhost:9443/oauth2/authorize?response_type=code id_token token&client_id=<client_id>&nonce=asd&redirect_uri=<redirect_uri>&scope=openid
    ```

    ```tab="Sample Request"
    https://localhost:9443/oauth2/authorize?response_type=code id_token token&client_id=N_nhS_UXctKHofSyLju1rbt_Cbwa&nonce=asd&redirect_uri=http://localhost:8080/playground2/oauth2client&scope=openid
    ```

    You will receive the following upon successful authorization. 

    ``` 
    http://localhost:8080/playground2/oauth2client#access_token=1940a308-d492-3660-a9f8-46723cc582e9&code=55aa698d-ac3b-30ec-b4ca-f5e803590a4b&id_token=eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsImNfaGFzaCI6IlhDUnVTMmhFT0JfM0hkeG9FM0pxT2ciLCJzdWIiOiJhZG1pbiIsImF1ZCI6WyJuY3piZzVtNXh4dDZ0UDRVTVp3QjZQdFFvUW9hIl0sImF6cCI6Im5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE1MTA4MzMxNjQsIm5vbmNlIjoiYXNkIiwiaWF0IjoxNTEwODMzMTYwfQ.WgpDf07dDVqrJRBbe_EqLYAfuRQQ1GkBJzgxaIczLTU_e-HasS6e24l75P0Csv0i2gUXk_H9d8zyJ6zalp2geBUmJ1wXLJtELrp-wvVaHVj-_aLHXM_8bsjL-BTj_f-OUEpGiDsPh19GxcMWw6hOubM0JKMh6ZWbF_A7-7RWwlh3vvRSjHhzhWypfjfP1NGTByjICJWF31AbGgfBy7OUUDhOIURYZM0m5u0fmvvD4O8qah1zjTxUL6mLaalOZ7QNppPU7SmPgeSQnfNsxy5KCA_N1vYyNLxzs3NitcCZAOQ88XU2AF-W4Sykay0tp1qiI35mqHg2cYinNPEdrnCYyQ&token_type=Bearer&expires_in=297341&session_state=872ac70304690624d4b3e2c705b5f452043be5f758ddd2487aa193730d9ef809.IwoAA6ua4m5CRth0erWuxA
    ```

2. Optionally, you can decrypt the `id_token`. It will be similar to the decrypted `id_token` shown below.

    ``` java
    {
    “at_hash”: “JrZY9MtYVEIIJUx-DDBmww”,
    “c_hash”: “XCRuS2hEOB_3HdxoE3JqOg”,
    “sub”: “admin”,
    “aud”: [
    “nczbg5m5xxt6tP4UMZwB6PtQoQoa”
    ],
    “azp”: “nczbg5m5xxt6tP4UMZwB6PtQoQoa”,
    “iss”: “https://localhost:9443/oauth2/token",
    “exp”: 1510833164,
    “nonce”: “asd”,
    “iat”: 1510833160
    }
    ```

3. You can send the code to the token endpoint to request for an access token, refresh token and id\_token. You can use the same curl command provided for the code token specified [above](#curl).

    You will receive the following response from the token endpoint. 

    ``` 
    {“access_token”:”1940a308-d492–3660-a9f8–46723cc582e9",”refresh_token”:”6b96cc3a-00da-3d7d-acd1–5aaf76dcd9d4",”scope”:”openid”,”id_token”:”eyJ4NXQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJraWQiOiJOVEF4Wm1NeE5ETXlaRGczTVRVMVpHTTBNekV6T0RKaFpXSTRORE5sWkRVMU9HRmtOakZpTVEiLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiSnJaWTlNdFlWRUlJSlV4LUREQm13dyIsInN1YiI6ImFkbWluIiwiYXVkIjpbIm5jemJnNW01eHh0NnRQNFVNWndCNlB0UW9Rb2EiXSwiYXpwIjoibmN6Ymc1bTV4eHQ2dFA0VU1ad0I2UHRRb1FvYSIsImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImV4cCI6MTUxMDgzMzMwNywibm9uY2UiOiJhc2QiLCJpYXQiOjE1MTA4MzMzMDN9.k69ufNIJHJHb6foeRSMVoJsgAWz0q65_8R6Lhz-tIW-tdLDI7eNg3kSL5-S2T3uFn7XFvn113wEWvCS8X3JBCIPMAFCmGBCR_L5pCh_OO6_xQeZyfa0fx_R27kZ9EIW5u0WSSjlpzzvr_50YldCfXMhZASjZlA5sCZ9BReyhkEUW_kSCWUDJEPaFQqgKVNfnRmr1q4N2lJwXPHjjE-4BcTMxKY87mqFzq_HVdXc1SRVIG0iuWkiYaD34pK8ZI12GFGSmOpDzhYb06uxrR8GC4jpq_WHMvMKrPrLaoVkEFaqomgxLIOJaNZJzqpe3wlaWM952eTndpSW0HSR5kgZgmw”,”token_type”:”Bearer”,”expires_in”:297198}
    ```

4. If there are two id\_tokens issued, where one id\_token is from authorization endpoint and other is from token endpoint, be sure to perform the [neccessary validations](#validations), which are based on the OpenID Connect specification.

----

## id_token validations

1.  Ensure that the `iss` and `sub` claim values are identical in the two `id_tokens` .

2.  If any one of the ID tokens contain claims about the end user, and are present in both, the values of the claims should be the same in both.

3.  All claims about the authentication event that is present in either should be present in both.

4.  The `at\_hash` and `c\_hash` claims may be omitted from the ID token returned from the token endpoint even when the claims are present in
    the ID token returned from the authorization endpoint.
