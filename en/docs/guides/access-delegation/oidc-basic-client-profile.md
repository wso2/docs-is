# OpenID Connect Basic Client Profile

This section provides information about the expected requests and the
relevant responses that the WSO2 Identity Server would generate for the
[OpenID Connect Basic Client](../../../references/concepts/authentication/basic-client-profile/) flow.
 

## Register a service provider

{!fragments/register-a-service-provider.md!}

---

## Basic OAuth/OpenID Connect configuration

{!fragments/oauth-app-config-basic.md!}

---

## Try out the flow

1. Use the following authorization request with `code` as the response_type to obtain the authorization code from the authorization endpoint.

    !!! abstract ""
        **Request Format**
        ```
        https://<host>:<port>/oauth2/authorize?response_type=code&client_id=<oauth_client_key>&nonce=<nonce_value>&redirect_uri=<redirect_uri>&scope=openid
        ```
        ---
        **Sample Request**
        ```curl
        https://localhost:9443/oauth2/authorize?response_type=code&client_id=N_nhS_UXctKHofSyLju1rbt_Cbwa&nonce=asd&redirect_uri=http://localhost:8080/playground2/oauth2client&scope=openid
        ```

    You will receive the authorization code upon successful authorization. 

    ``` 
    http://localhost:8080/playground2/oauth2client?code=60aa3902-e69d-331d-8bce-99a34599c2aa&session_state=918232b9eb8855f8ea09f1fca81c53328defadf3e53d50d6f404101c64c0dd50.mvgxky6sDbUbHztwhFsNhg
    ```

2. Send the code to the token endpoint using the following curl command to request for an access token, refresh token, and id_token.

    !!! abstract ""
        **Request Format**
        ```
        curl -k -v --basic -u <oauth_client_key>:<oauth_client_secret> -d "grant_type=<grant_type>&code=<code>&redirect_uri=<redirect_uri>" https://<host>:<port>/oauth2/token
        ```
        ---
        **Sample Request**
        ```curl
        curl -k -v --basic -u N_nhS_UXctKHofSyLju1rbt_Cbwa:AOkWrH42XKRSsFongXpUnR6mpHYa -d "grant_type=authorization_code&code=99b34587–5483–374d-8b25–50485498e761&redirect_uri=http://localhost:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
        ```

    You will receive the following response from the token endpoint.

    ```
    {
        "access_token":"80c7c0d7-070a-38ff-a1f4-d21a444cdb67",
        "refresh_token":"18917dd6-4566-3294-92a9-01ec89cccf4d",
        "scope":"openid",
        "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJjZTA5YTM1NjBhYzI4ZDc3YWNlZjJjYzQxZGUyNjEzZDMxY2NmOGQwYTgxYjRhNzY2ZTlhYTFmZDRlNjhhMzA5IiwiYXRfaGFzaCI6IncwUG1fVFp4TlFfQTBRUU91RjJESUEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiY19oYXNoIjoibzhIX0Fqc3FOSWkyd3g5LWVzcFo0dyIsInN1YiI6ImFkbWluIiwibmJmIjoxNjE1ODc0NTM5LCJhenAiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTU4NzgxMzksImlhdCI6MTYxNTg3NDUzOSwibm9uY2UiOiJhc2QifQ.LIoD9ltfqsxysMaC1b0kX-Ot4qL5GycpF5R-GIB_wBkQvN5BVEQZ4XV2t0t9GaQv1gSApsd6CtUAvV0haAqaNDElVcDQrmsyyHNzN0051biTQWQkoC4wwtO6_w1MSmgbH_aNVjQkBWt2vnaWtn6bt9sdZVxGRSb3_Amxdty_rDmiOzhJPwxZbkdPp1US0jmAn2XOoQQyH7e__qoXSjjoBAKXQtncJWAKtteDUBQTqVLj13TdS8dYqnEQByKNvhpz8rZjGaBV9pxtOWoqnbc3IMA4lX47Mpxl22ZqhIn0J6WCQ7nJtEkfx6XNHdatWZyG2x20pxbZkgya6sKAEoy3zw",
        "token_type":"Bearer",
        "expires_in":2286
    }
    ```

    The returned ID token carries the user details. It follows the following format:
    ` <header>.<body>.<signature>` . 
    
    The decoded ID token can be seen below.
    
    ```
    {
        "x5t": "MzYxMmFkOGYwMWI0ZWNmNDcxNGYwYmM4ZTA3MWI2NDAzZGQzNGM0ZGRlNjJkODFkZDRiOTFkMWFhMzU2ZGVlNg",
        "kid": "MzYxMmFkOGYwMWI0ZWNmNDcxNGYwYmM4ZTA3MWI2NDAzZGQzNGM0ZGRlNjJkODFkZDRiOTFkMWFhMzU2ZGVlNg_RS256",
        "alg": "RS256"
    }.
    {
        "isk": "ce09a3560ac28d77acef2cc41de2613d31ccf8d0a81b4a766e9aa1fd4e68a309",
        "at_hash": "w0Pm_TZxNQ_A0QQOuF2DIA",
        "aud": "CVyQeM5P33gfN80vur3NcxzPgHwa",
        "c_hash": "o8H_AjsqNIi2wx9-espZ4w",
        "sub": "admin",
        "nbf": 1615874539,
        "azp": "CVyQeM5P33gfN80vur3NcxzPgHwa",
        "amr": [
           "BasicAuthenticator"
        ],
        "iss": "https://localhost:9443/oauth2/token",
        "exp": 1615878139,
        "iat": 1615874539,
        "nonce": "asd"
    }.<signature value>
    ```

    !!! tip
        Alternatively, you can get user information by running the following cURL command on the terminal.
    
        **cURL Command**

        ```
        curl -k -H "Authorization: Bearer <Acess_token>" https://localhost:9443/oauth2/userinfo?schema=openid
        ```
        
        **Response**
        
        ```
        {  
            "sub":"admin",
            "email":"admin@wso2.com",
            "website":"https://wso2.com",
            "name":"admin",
            "family_name":"admin",
            "preferred_username":"admin",
            "given_name":"admin",
            "profile":"https://wso2.com",
            "country":"Sri Lanka"
        }
        ``` 

!!! info "Related topics"
    - [Concept: OpenID Connect Implicit Client](../../../references/concepts/authentication/basic-client-profile/)
    - [Guide: Advanced OpenID Connect Configurations](../../login/oauth-app-config-advanced)
