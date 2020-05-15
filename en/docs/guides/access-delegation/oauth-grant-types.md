# Configure OAuth Grant Types

This page guides you through using one of the [OAuth Grant Types](../../../../concepts/authorization/grant-types) to configure authentication for an OAuth/OpenID Connect web application. 

----

{!fragments/oauth-oidc-grants.md!}

----

## Resource owner / password credentials grant type

Send the following request using a browser-based application to obtain the access token. 

!!! tip
    You can also use the WSO2 Identity Server Playground sample as the browser-based application to obtain the request. For instructions on using the Playground app, see [Password Grant with OAuth 2.0 Playground](../../../quick-starts/password-playground).

``` tab="Request Format"
curl -v -X POST --basic -u <client_ID>:<client_secret> -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=<username>&password=<password>" <token_endpoint>
```

```tab="Sample Request"
curl -v -X POST --basic -u 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=admin&password=admin" https://localhost:9443/oauth2/token
```

You will receive the following response with the access token and refresh token. 

```
{"access_token":"16ab408c-0f31-3321-8bed-313e836df373","refresh_token":"3c285b4f-ec29-3751-9ced-74c92061b327","token_type":"Bearer","expires_in":3600}
```

----

## Client credentials grant type

Send the following request using a browser-based application to obtain the access token. 

!!! tip
    You can also use the WSO2 Identity Server Playground sample as the browser-based application to obtain the request. For instructions on using the Playground app, see [Client Credentials Grant with OAuth 2.0 Playground](../../../quick-starts/client-credentials-playground).

``` tab="Request Format"
curl -v -X POST --basic -u <client_ID>:<client_secret>_VCQJwa -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=client_credentials" <token_endpoint>
```

```tab="Sample Request"
curl -v -X POST --basic -u 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=client_credentials" https://localhost:9443/oauth2/token
```

You will receive the following response with the access token.

```
{"access_token":"16ab408c-0f31-3321-8bed-313e836df373","token_type":"Bearer","expires_in":2986}
```

----

{!fragments/self-contained-access-tokens.md!}

----

{!fragments/oauth-transaction-logs.md!}


