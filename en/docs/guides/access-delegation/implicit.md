# Implicit Grant

This page guides you through using [Implicit Grant](../../../references/concepts/authorization/implicit-grant/) 
to configure authentication for an OAuth/OpenID Connect application. 

----

## Register a service provider

{!fragments/register-a-service-provider.md!}

5. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

6. Click **Configure.**   

7. Make sure **Implicit** is selected from the **Allowed Grant Types** list.
        
8. Enter the **Callback Url**.

    !!! tip
        The **Callback Url** is the exact location in the service provider's application to which an access token will 
        be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.
            
9.  Click **Add**. 

    !!! note
        Note the generated **OAuth Client Key**. You will need this value later on when sending the request to the token endpoint.

----

## Implicit grant type

Send the following request using a browser-based application to obtain the ID token. 

!!! tip
    You can also use the WSO2 Identity Server Playground sample as the browser-based application to obtain the request. For instructions on using the Playground app, see [Implicit Grant with OAuth 2.0 Playground](../../../quick-starts/implicit-playground).

``` tab="Request Format"
https://<host>:<port>/oauth2/authorize?
response_type=token&
&client_id=<client-ID>
&redirect_uri=<callback-url>
```

```tab="Sample Request"
https://localhost:9443/oauth2/authorize?
response_type=token&
client_id=0rhQErXIX49svVYoXJGt0DWBuFca&
redirect_uri=http://wso2is.local:8080/playground2/oauth2client
```

You will receive the ID token. 

```
http://wso2is.local:8080/playground2/oauth2client#access_token=317c19b3-73e3-3906-8627-d1c952856b5d&token_type=Bearer&expires_in=3600
```

!!! info "Related topics"
    - [Concept: Implicit Grant](../../../references/concepts/authorization/implicit-grant/)
    - [Guide: Advanced OpenID Connect Configurations](../../../guides/login/oauth-app-config-advanced)
    - [Quick Start: Implicit Grant with OAuth 2.0 Playground](../../../quick-starts/implicit-playground)
