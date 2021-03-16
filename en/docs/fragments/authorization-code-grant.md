# Authorization Code Grant

This page guides you through using [Authorization Code Grant](../../../references/concepts/authorization/authorization-code-grant/) 
to configure authentication for an OAuth/OpenID Connect application. 

----

## Register a service provider

{!fragments/register-a-service-provider.md!}

5. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

6. Click **Configure.**   

7. Make sure **Code** is selected from the **Allowed Grant Types** list.
        
8. Enter the **Callback Url**.

    !!! tip
        The **Callback Url** is the exact location in the service provider's application to which an access token will 
        be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.
            
9.  Click **Add**. 

    !!! note
        Note the generated **OAuth Client Key** and **Client Secret**. You will need these values later on when sending 
        the requesting the code and the access token.

----

## Authorization code grant type

1. Send the following request using a browser-based application to obtain the authorization code. 

    !!! tip
        You can also use the WSO2 Identity Server Playground sample as the browser-based application to obtain the request. For instructions on using the Playground app, see [Authorization Code Grant with OAuth 2.0 Playground](../../../quick-starts/auth-code-playground).

    ``` tab="Request Format"
    https://<host>:<port>/oauth2/authorize?
    response_type=code&
    client_id=<client_ID>&
    redirect_uri=<callback_url>&
    scope=<scope>
    ```

    ```tab="Sample Request"
    https://localhost:9443/oauth2/authorize?
    response_type=code&
    client_id=0rhQErXIX49svVYoXJGt0DWBuFca&
    redirect_uri=http://wso2is.local:8080/playground2/oauth2client
    ```

    !!! note
        `scope` is an optional parameter that can used to define any scope you wish to obtain the token for. To use the application with OpenID Connect, enter the value `openid` as the scope.
    
    You will receive an authorization code. 

    ``` tab="Response Format"
    <callback_url>?code=<code>
    ```
    
    ``` tab="Sample Response"
    http://wso2is.local:8080/playground2/oauth2client?code=9142d4cad58c66d0a5edfad8952192
    ```

2. Run the following curl command using the authorization code received, to obtain the access token. 

    ``` tab="Request Format"
    curl -v -X POST --basic -u <client_ID>:<client_secret> -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=<authorization_code>&redirect_uri=<callback_url> <token_endpoint>
    ```

    ``` tab="Sample Request"
    curl -v -X POST --basic -u 7wYeybBGCVfLxPmS0z66WNMffyMa:WYfwHUsbsEvwtqmDLuaxF_VCQJwa -H "Content-Type:application/x-www-form-urlencoded;charset=UTF-8" -k -d "grant_type=authorization_code&code=a0996a17-4a34-3d99-bfcd-6bd1faa604d0&redirect_uri=http://wso2is.local:8080/playground2/oauth2client" https://localhost:9443/oauth2/token
    ```

3. You will receive the following response with the access token and refresh token. 

    ```
    {"access_token":"317c19b3-73e3-3906-8627-d1c952856b5d","refresh_token":"52569186-163f-3c9c-b2f4-539a0e8529ce","token_type":"Bearer","expires_in":3600}
    ```

!!! info "Related Topics"
    - [Concept: Authorization Code Grant](../../../references/concepts/authorization/authorization-code-grant/)
    - [Guide: Advanced OpenID Connect Configurations](../../login/oauth-app-config-advanced)
    - [Demo: Authorization Code Grant with OAuth 2.0 Playground](../../../quick-starts/auth-code-playground)
    