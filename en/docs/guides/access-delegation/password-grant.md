# Resource Owner Password Credentials Grant

This page guides you through using [Resource Owner Password Credentials Grant](../../../references/concepts/authorization/resource-owner-grant/) 
to configure authentication for an OAuth/OpenID Connect application. 

----

## Register a service provider

{!fragments/register-a-service-provider.md!}

5. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

6. Click **Configure.**   

7. Make sure **Password** is selected from the **Allowed Grant Types** list.
        
8. Enter the **Callback Url**.

    !!! tip
        The **Callback Url** is the exact location in the service provider's application to which an access token will 
        be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.
            
9.  Click **Add**. 

    !!! note
        Note the generated **OAuth Client Key** and **Client Secret**. You will need these values later on when sending 
        the request to the token endpoint.

----

## Resource owner password credentials grant type

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

!!! info "Related Topics"
    - [Concept: Resource Owner Password Credentials Grant](../../../references/concepts/authorization/resource-owner-grant/)
    - [Guide: Advanced OpenID Connect Configurations](../../../guides/login/oauth-app-config-advanced)
    - [Demo: Password Grant with OAuth 2.0 Playground](../../../quick-starts/password-playground)
