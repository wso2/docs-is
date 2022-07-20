# Password Grant with OAuth 2.0 Playground

This page guides you through using a sample Playground application to try out authentication to an OAuth 2.0/OpenID Connect web application using the [Password]({{base_path}}/references/concepts/authorization/resource-owner-grant/) grant type.

----

{!./includes/oauth-playground.md !}

----

## Try Password grant 

The following cURL command can be used to try this grant type.

!!! abstract ""
    **Request Format**
    ```
    curl -v -X POST --basic -u <client_ID>:<client_secret> -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=<username>&password=<password>" <token_endpoint>
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -X POST --basic -u 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=password&username=admin&password=admin" https://localhost:9443/oauth2/token
    ```

You will receive the following response with the access token and refresh token.

```
{
    "access_token":"16ab408c-0f31-3321-8bed-313e836df373",
    "refresh_token":"3c285b4f-ec29-3751-9ced-74c92061b327",
    "token_type":"Bearer",
    "expires_in":3600
}
```


