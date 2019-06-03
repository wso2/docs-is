# Resource Owner Password Credentials Grant

### Recommended use

The resource owner password credentials grant type is suitable in cases
where the resource owner has a trust relationship with the client (e.g.,
a service’s own mobile client) and in situations where the client can
obtain the resource owner’s credentials.

### The flow

Instead of redirecting the user to the authorization server, the client
itself will ask the user for the resource owner's username and password.
The client will then send these credentials to the authorization server
along with the client’s own credentials.

The diagram below illustrates the resource owner password credentials
grant flow.

![](attachments/103329603/103329604.png){width="560"}

**Support for [refresh token grant](_Refresh_Token_Grant_)** - **Yes**

The cURL commands below can be used to try this grant type.

``` powershell
curl -v -X POST -H "Authorization: Basic <base64 encoded client id:client secret value>" -k -d "grant_type=password&username=<username>&password=<password>" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

Or

``` powershell
curl -u <client id>:<client secret> -k -d "grant_type=password&username=<username>&password=<password>" -H "Content-Type:application/x-www-form-urlencoded" https://localhost:9443/oauth2/token
```

You will receive a response similar to the format below.

**Response**

``` java
{"token_type":"Bearer","expires_in":2510,"refresh_token":"5ba3dedc77581df5f84f9b228eef0b91","access_token":"ca19a540f544777860e44e75f605d927"}
```

**Related Topics**

-   See the [Try Password Grant](_Try_Password_Grant_) topic to try out
    a sample of the resource owner password credentials grant with WSO2
    Identity Server and WSO2 OAuth2 Playground.
