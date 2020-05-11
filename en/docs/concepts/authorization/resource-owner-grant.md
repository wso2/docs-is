# Resource Owner Password Credentials Grant Type

### Recommended Use

The **resource owner password credentials grant type** is suitable in cases where the resource owner has a trust relationship
with the client (e.g., a service’s own mobile client) and in situations where the client can obtain the resource owner’s
credentials.

### How does it work ?

Instead of redirecting the user to the authorization server, the client itself will prompt the user for the resource
owner's username and password. The client will then send these credentials to the authorization server along with the
client’s own credentials.

![password-grant](../../assets/img/concepts/password-grant-flow.png)

One of the following cURL commands can be used to try this grant type.

``` java tab="Request 1"
curl -v -X POST -H "Authorization: Basic <base64 encoded client id:client secret value>" -k -d "grant_type=password&username=<username>&password=<password>" -H "Content-Type:application/x-www-form-urlencoded" <token_endpoint>
```

``` java tab="Request 2"
curl -u <client id>:<client secret> -k -d "grant_type=password&username=<username>&password=<password>" -H "Content-Type:application/x-www-form-urlencoded" <token_endpoint>
```

You will receive a response similar to the format below.

**Response**

``` java
{"token_type":"Bearer","expires_in":2510,"refresh_token":"5ba3dedc77581df5f84f9b228eef0b91","access_token":"ca19a540f544777860e44e75f605d927"}
```

!!! info "Support for refresh token grant - Yes"
	This grant type issues a refresh token which can be used to obtain new access tokens using the [refresh token grant](refresh-token-grant.md).

