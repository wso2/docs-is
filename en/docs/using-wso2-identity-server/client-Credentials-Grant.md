# Client Credentials Grant

### Recommended use

This grant is suitable for machine-to-machine authentication or for a
client making requests to an API that does not require the user’s
permission. This grant should be allowed for use only by trusted
clients.

### The flow

The client can request an access token using only its client credentials
with this grant type. It is similar to the [resource owner password
credentials grant](_Resource_Owner_Password_Credentials_Grant_) type
except in this case, only the client’s credentials are used to
authenticate a request for an access token.

  

The diagram below illustrates the client credentials grant flow.

  

![](attachments/103329605/103329606.png){width="500"}

**Support for [refresh token grant](_Refresh_Token_Grant_) -** No

The cURL commands below can be used to try this grant type.

``` powershell
curl -v -X POST -H "Authorization: Basic <base64 encoded client id:client secret value>" -k -d "grant_type=client_credentials" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

``` powershell
 curl -u <client id>:<client secret> -k -d "grant_type=client_credentials" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

You will receive a response similiar to the format below.

**Response**

``` java
{"token_type":"Bearer","expires_in":2061,"access_token":"ca19a540f544777860e44e75f605d927"}
```

**Related Topics**

-   See the [Try Client Credentials
    Grant](_Try_Client_Credentials_Grant_) topic to try out a sample of
    the resource owner password credentials grant with WSO2 Identity
    Server and WSO2 OAuth2 Playground.
