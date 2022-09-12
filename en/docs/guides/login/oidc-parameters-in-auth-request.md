# Use Advanced Parameters in Authentication Requests

This page guides you through some special request parameters used with [OpenID Connect]({{base_path}}/references/concepts/authentication/intro-oidc) authentication requests.

 ----
 
## State parameter

Use the [state parameter]({{base_path}}/references/concepts/authentication/traditional-authentication-request#state-parameter) to maintain a correlation between the request and the response.

!!! abstract ""
    **Request Format**
    ```
    https://<IS_HOST>:<IS_PORT>/oauth2/authorize?
    response_type=<response_type>
    &client_id=<client_id>
    &state=<state_value>
    &redirect_uri=<callback_url>
    ```
    ---
    **Sample Request**
    ```
    https://localhost:9443/oauth2/authorize?
    response_type=token
    &client_id=s6BhdRkqt3
    &state=xyz
    &redirect_uri=https://localhost.com:8080/callback
    ```

You will receive a response similar to the one shown below.

!!! abstract ""
    **Response Format**
    ```
    HTTP/1.1 302 Found
    Location: <callback_url>#access_token=<access_token>
    &state=<state_value>
    &token_type=<token_type>
    &expires_in=<token_expiry_time>
    ```
    ---
    **Sample Response**
    ```
    HTTP/1.1 302 Found
    Location: https://localhost.com:8080/callback#access_token=2YotnFZFEjr1zCsicMWpAA
    &state=xyz
    &token_type=bearer
    &expires_in=3600
    ```

 ----
 
## Nonce Parameter

Use the [nonce parameter]({{base_path}}/references/concepts/authentication/traditional-authentication-request/#nonce-parameter) to validate an ID token issued by WSO2 Identity Server.

The `nonce` claim embedded in the ID token must contain the exact value that was sent in the request. 
If not, authentication should be rejected by the application.

!!! abstract ""
    **Request Format**
    ```
    https://<IS_HOST>:<IS_PORT>/oauth2/authorize?response_type=<response_type>&client_id=<client_id>&redirect_uri=<callback_url>&nonce=<nonce_value>&scope=openid
    ```
    ---
    **Sample Request**
    ```
    https://localhost:9443/oauth2/authorize?response_type=id_token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=https://localhost.com:8080/callback&nonce=abc&scope=openid
    ```

You will receive a response similar to shown below.

!!! abstract ""
    **Response Format**
    ```
    HTTP/1.1 302 Found
    Location: <callback_url>#access_token=<access_token>
    &state=<state_value>
    &token_type=<token_type>
    &expires_in=<token_expiry_time>
    ```
    ---
    **Sample Response**
    ```
    HTTP/1.1 302 Found
    Location: https://localhost.com:8080/callback#access_token=2YotnFZFEjr1zCsicMWpAA
    &state=xyz
    &token_type=bearer
    &expires_in=3600
    ```

The decoded ID token is as follows.

```
{
    "auth_time":1453184484,
    "exp":1453188084,
    "sub":"admin@carbon.super",
    "azp":"W2OoSxQDCVrBk1lnffo1NGCKZbQa",
    "at_hash":"DoxjyXzmrL6Z_kWRzmBdCA",
    "nonce":"abc",
    "aud":["W2OoSxQDCVrBk1lnffo1NGCKZbQa"],
    "iss":"https://playground.local:9443/oauth2/token",
    "iat":1453184484
}
```

 ----
 
## Prompt Parameter

The [prompt parameter]({{base_path}}/references/concepts/authentication/traditional-authentication-request/#prompt-parameter) which can be sent with the authentication requests, can have the following three values.
    
-   none         
-   login         
-   consent
    
### prompt=none

The silent authentication can be initiated by using the `prompt=none` parameter with the authentication request.

!!! abstract ""
    **Request Format**
    ```
    https://<IS_HOST>:<IS_PORT>/oauth2/authorize?response_type=token&client_id=<client_id>&redirect_uri=<callback_url>&prompt=none&scope=openid
    ```
    ---
    **Sample Request**
    ```
    https://localhost:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=https://localhost.com:8080/callback&prompt=none&scope=openid
    ```

If the user has an already authenticated session and a pre-configured consent with the WSO2 Identity Server, you will receive a successful response as follows.

!!! abstract ""
    **Response Format**
    ```
    <callback_url>#token_type=<token_type>&expires_in=<expiry_time>&access_token=<access_token>
    ```
    ---
    **Sample Response**
    ```
    https://localhost.com:8080/callback#token_type=Bearer&expires_in=60&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
    ```

**Error Response**

```
https://callback_url
error_description=ERROR_DESCRIPTION&
error=ERROR_CODE&
session_state==...
```
    
| Error                 | Error Description         | 
| --------------------- | ------------- | 
| login_required | Occurs when the user does not have a login session  |                            
| consent_required           | Occurs when the user has a login session but does not have a pre-configured consent  |                              
   
----


### prompt=login

Use the `prompt=login` parameter with the authentication request to force authenticating the user even if the user has been authenticated already.

!!! abstract ""
    **Sample Request**
    ```
    https://<host>:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=http://localhost:8080/playground2/oauth2client&prompt=login&scope=openid
    ```

If the user is successfully re-authenticated with WSO2 Identity Server, you will receive a successful response as follows.

!!! abstract ""
    **Successful Response**
    ```
    https://<callback_url>#token_type=Bearer&expires_in=60&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
    ```

**Error Response**

```
https://callback_url
error_description=ERROR_DESCRIPTION&
error=ERROR_CODE&
session_state==...
```

| Error                  | Error Description         | 
| --------------------- | ------------- | 
| login_required | Occurs when WSO2 Identity Server can not re-authenticate the user  |                            
   
   ----
   
### prompt=consent

Use the `prompt=consent` parameter with the authentication request to force prompting user consent.

!!! abstract ""
    **Request Format**
    ```
    https://<IS_HOST>:<IS_PORT>/oauth2/authorize?response_type=<response_type>&client_id=<client_id>&redirect_uri=<callback_url>&prompt=consent&scope=openid&access_token=<access_token>
    ```
    ---
    **Sample Request**
    ```
    https://localhost:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=http://localhost:8080/playground2/oauth2client&prompt=consent&scope=openid&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
    ```
 
 If the user has successfully provided the consent again, even if the consent is already given, WSO2 Identity Server will return a successful response as follows.

!!! abstract ""
    **Response Format**
    ```
    <callback_url>#token_type=<token_type>&expires_in=<expiry_time>&access_token=<access_token>
    ```
    ---
    **Sample Response**
    ```
    http://localhost:8080/playground2/oauth2client#token_type=Bearer&expires_in=60&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
    ```
 
**Error Response**

```
https://callback_url
error_description=ERROR_DESCRIPTION&
error=ERROR_CODE&
session_state==...
```
 
| Error                 | Error Description         | 
| --------------------- | ------------- | 
| consent_required | Occurs when the user cannot provide the consent again  | 
    

     
!!! info "Related topics"
    - [Concept: OpenID Connect]({{base_path}}/references/concepts/authentication/intro-oidc)
    - [Concept: OpenID Connect Authentication Parameters]({{base_path}}/references/concepts/authentication/traditional-authentication-request)
    - [Guide: Enable Login for a OpenID Connect Web Application]({{base_path}}/guides/login/webapp-oidc)
    - [Guide: Authorization Code Grant]({{base_path}}/guides/access-delegation/auth-code-playground)
