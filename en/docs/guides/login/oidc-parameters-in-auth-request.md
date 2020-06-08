#Use Advanced Parameters in Authentication Requests

This page guides you through some special request parameters used with Open ID Connect authentication requests.

 ----
 
##[State parameter](../../../concepts/traditional-authentication-request)
You can use this parameter when you need to maintain a correlation between the request and the response.

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
 
##[Nonce Parameter](../../authentication/concepts/traditional-authentication-request)
You can use this parameter, when the client application needs to validate an ID Token issued by WSO2 Identity Server.
The nonce claim embedded in the ID token must contain the exact same value that was sent in the request. 
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
 
##[Prompt Parameter](../../authentication/concepts/traditional-authentication-request)
This parameter which can be sent with the authentication requests, can have the following three values.
    
    -   none         `
    -   login         `
    -   consent
    
###prompt=none
The silent authentication can be initiated by using the prompt=none parameter with the authentication request.

```tab="Sample Request"
https://<host>:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=<callback_url>&prompt=none&scope=openid
```

If the user has an already authenticated session and a pre-configured consent with the WSO2 Identity Server a successful response can be obtained as follows.

Successful Response

```tab="Sample Response"
https://<callback_url>#token_type=Bearer&expires_in=60&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
```

Error Response

```tab="Sample Response"
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


###prompt=login
The force authentication can be initiated by using the prompt=login parameter with the authentication request.

```tab="Sample Request"
https://<host>:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=http://localhost:8080/playground2/oauth2client&prompt=none&scope=openid
```

If the user is successfully re-authenticated with the WSO2 Identity Server a successful  response can be obtained as follows.

Successful Response

```tab="Sample Response"
https://<callback_url>#token_type=Bearer&expires_in=60&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
```

Error Response

```tab="Sample Response"
   https://callback_url
   error_description=ERROR_DESCRIPTION&
   error=ERROR_CODE&
   session_state==...
```

| Error                 | Error Description         | 
   | --------------------- | ------------- | 
   | login_required | Occurs when the user can not re-authenticate the user  |                            
   
   ----
   
###prompt=consent
 Prompting forceful user consent can be initiated by using the prompt=consent parameter with the authentication request.
 
 ```tab="Sample Request"
 https://<host>:9443/oauth2/authorize?response_type=token&client_id=NgTICXFPYnt7ETUm6Fc8NMU8K38a&redirect_uri=http://localhost:8080/playground2/oauth2client&prompt=consent&scope=openid&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
 ```
 
 If the user is successfully provided the consent again, even if the consent is already given,  the WSO2 Identity Server will return a successful  response as follows.

Successful Response
 
 ```tab="Sample Response"
 https://<callback_url>#token_type=Bearer&expires_in=60&access_token=10a361a99aa4bd6e0aa79c6ea7bcdb66
 ```
 
Error Response
 
 ```tab="Sample Response"
    https://callback_url
    error_description=ERROR_DESCRIPTION&
    error=ERROR_CODE&
    session_state==...
 ```
 
 | Error                 | Error Description         | 
    | --------------------- | ------------- | 
    | consent_required | Occurs when the user can not provide the consent again  | 
    
   ----
     
!!! info "Related Topics"
     - [Enable Login for a Sample OpenID Connect Web Application](../../../concepts/authentication/traditional-authentication-request)