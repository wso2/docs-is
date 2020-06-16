# Use Advanced Parameters in Authentication Requests

This page guides you through some special request parameters used with [OpenID Connect](../../../concepts/authentication/intro-oidc) authentication requests.

 ----
 
## State parameter

Use the [state parameter](../../../concepts/authentication/traditional-authentication-request#state-parameter) to maintain a correlation between the request and the response.

```tab="Sample Request"
https://<host>:/authorize?
response_type=token
&client_id=s6BhdRkqt3
&state=xyz
&redirect_uri=<callback_url>
```

```tab="Sample Response"
HTTP/1.1 302 Found
Location: <callback_url>#access_token=2YotnFZFEjr1zCsicMWpAA
&state=xyz
&token_type=bearer
&expires_in=3600
```
 ----
 
## Nonce Parameter

Use the [nonce parameter](../../authentication/concepts/traditional-authentication-request#nonce-parameter) to validate an ID token issued by WSO2 Identity Server.

The `nonce` claim embedded in the ID token must contain the exact value that was sent in the request. 
If not, authentication should be rejected by the application.

```tab="Sample Request"
https://<host>:9443/oauth2/authorize?response_type=id_token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=<callback_url>&nonce=abc&scope=openid
```

```tab="Sample Response"
HTTP/1.1 302 Found
Location: <callback_url>#access_token=2YotnFZFEjr1zCsicMWpAA
&state=xyz
&token_type=bearer
&expires_in=3600
```

The decoded ID token is as follows.
```{"auth_time":1453184484,"exp":1453188084,"sub":"admin@carbon.super","azp":"W2OoSxQDCVrBk1lnffo1NGCKZbQa","at_hash":"DoxjyXzmrL6Z_kWRzmBdCA","nonce":"abc","aud":["W2OoSxQDCVrBk1lnffo1NGCKZbQa"],"iss":"https:\/\/playground.local:9443\/oauth2\/token","iat":1453184484}```

 ----
 
## Prompt Parameter

The [prompt parameter](../../authentication/concepts/traditional-authentication-request#prompt-parameter) which can be sent with the authentication requests, can have the following three values.
    
    -   none         `
    -   login         `
    -   consent
    
### prompt=none
The silent authentication can be initiated by using the prompt=none parameter with the authentication request.

```tab="Sample Request"
https://<host>:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=<callback_url>&prompt=none&scope=openid
```

If the user has an already authenticated session and a pre-configured consent with the WSO2 Identity Server, you will receive a successful response as follows.

```tab="Successful Response"
https://<callback_url>#token_type=Bearer&expires_in=60&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
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

```tab="Sample Request"
https://<host>:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=http://localhost:8080/playground2/oauth2client&prompt=none&scope=openid
```

If the user is successfully re-authenticated with WSO2 Identity Server, you will receive a successful response as follows.

```tab="Successful Response"
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
 
 ```tab="Sample Request"
 https://<host>:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=http://localhost:8080/playground2/oauth2client&prompt=consent&scope=openid&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
 ```
 
 If the user has successfully provided the consent again, even if the consent is already given, WSO2 Identity Server will return a successful response as follows.

 ```tab="Successful Response"
 https://<callback_url>#token_type=Bearer&expires_in=60&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
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
    

----
     
!!! info "Related Topics"
     - [Concept: OpenID Connect](../../../concepts/authentication/intro-oidc)
     - [Concept: OpenID Connect Authentication Parameters](../../../concepts/authentication/traditional-authentication-request)
     - [Guide: Enable Login for a OpenID Connect Web Application](../webapp-oidc)
     - [Guide: OAuth Grant Types](../../access-delegation/oauth-grant-types)