# Client Credentials Grant

This page guides you through using [Client Credentials Grant](../../../references/concepts/authorization/client-credential-grant/) 
to configure authentication for an OAuth/OpenID Connect application. 

----

## Register a service provider

{!fragments/register-a-service-provider.md!}

5. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

6. Click **Configure.**   

7. Make sure **Client Credential** is selected from the **Allowed Grant Types** list.
        
8. Enter the **Callback Url**.

    !!! tip
        The **Callback Url** is the exact location in the service provider's application to which an access token will 
        be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.
            
9.  Click **Add**. 

    !!! note
        Note the generated **OAuth Client Key** and **OAuth Client Secret**. You will need these values later on when sending 
        the request to the token endpoint.

----

## Client credentials grant type

Send the following request using a browser-based application to obtain the access token. 

!!! tip
    You can also use the WSO2 Identity Server Playground sample as the browser-based application to obtain the request. For instructions on using the Playground app, see [Client Credentials Grant with OAuth 2.0 Playground](../../../quick-starts/client-credentials-playground).

!!! abstract ""
    **Request Format**
    ```curl
    curl -v -X POST --basic -u <oauth_client_key>:<oauth_client_secret> -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=client_credentials" <token_endpoint>
    ```
    ---
    **Sample Request**
    ```curl
    curl -v -X POST --basic -u 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=client_credentials" https://localhost:9443/oauth2/token
    ```

You will receive the following response with the access token.

```
{
    "access_token":"16ab408c-0f31-3321-8bed-313e836df373",
    "token_type":"Bearer",
    "expires_in":2986
}
```

!!! info "Related topics"
    - [Concept: Client Credentials Grant](../../../references/concepts/authorization/client-credential-grant/)
    - [Guide: Advanced OpenID Connect Configurations](../../../guides/login/oauth-app-config-advanced)
    - [Demo: Client Credentials Grant with OAuth 2.0 Playground](../../../quick-starts/client-credentials-playground)
