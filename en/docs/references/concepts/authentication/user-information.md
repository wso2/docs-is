# Obtaining User Information

To obtain basic profile information about the user who generates the access token, it is mandatory to pass the `openid` scope,
when generating the access token.

The following two options are available to obtain the actual user information.

  -   [Decoding the id_ token](#decoding-the-id_token) 

  -   [Invoking the userinfo endpoint](#invoking-the-userinfo-endpoint)


## Decoding the id_token

By decoding the id_token, a payload with user information such as email (similar to the one shown below) can be obtained.


    
    { 
    "sub":"alice",
    "at_hash":"cXhWIvIwRbPgT0ALmazJHQ",
    "acr":"urn:mace:incommon:iap:silver",
    "sub":"user1@carbon.super",
    "aud":[
       "KoNDleSrF3naXWwhavao4bBoMYca"
    ],
    "azp":"KoNDleSrF3naXWwhavao4bBoMYca",
    "organization":"WSO2",
    "iss":"https://172.16.2.111:9443/oauth2/token",
    "exp":1511950413,
    "iat":1511946813,
    "email":"user1@gmail.com"
    }
    

## Invoking the userinfo endpoint

An access token can be used to invoke the userinfo endpoint to obtain user information as a payload. These claims in the
payload are normally represented by a JSON object that contains a collection of name and value pairs for the claims.
The format of the curl command is given below.

Request

``` java
curl -k -v -H "Authorization: Bearer {ACCESS_TOKEN}" https://{HOSTNAME}:{PORT}/userinfo
```
 
 Response
 
``` java
HTTP/1.1 200 OK
  Content-Type: application/json

  {
   "sub": "248289761001",
   "name": "Jane Doe",
   "given_name": "Jane",
   "family_name": "Doe",
   "preferred_username": "j.doe",
   "email": "janedoe@example.com",
  }
```
