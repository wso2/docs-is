# Authenticate with Basic Auth Request Path Authenticator

This page guides you through using the request path authenticator for basic authentication. 
The Basic Authentication Request Path Authenticator is engaged when user credentials (username and password) 
are sent along with a request for authentication. You can use this authentication mechanism if you wish to skip 
prompting the user with the login page during the authentication flow.

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../quick-starts/basic-auth-request-path-sample" rel="nofollow noopener">Try it with the sample</a>


----

(TODO: dev-portal-fragment)

{!fragments/register-a-service-provider.md!}

----

{!fragments/oauth-app-config-basic.md!}

----
{!fragments/local-outbound-for-request-path.md!}

----

## Configure the client application

Send the following requests via your application using the `<SEC_TOKEN>` in the authorization header, to the token endpoint. 

!!! tip
    The `<SEC_TOKEN>` in the authorization endpoint will be the `username:password` in Base64
    encoded format. You can use a [Base64 encoder](https://www.base64encode.org/) 
    to encode this. For instance, the username and password admin:admin, is "
    `YWRtaW46YWRtaW4=".
    
Replace the **` <SEC_TOKEN>,CLIENT_ID>`** and **`<REDIRECT_URI>`** tags with the relevant values.

    
```tab="Request Format"
    curl -v -X POST -H "Authorization: Basic <Base64 encoded value of username:password>" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "response_type=<code>&client_id=<client_id>&redirect_uri=<redirect_uri>&scope=openid&prompt=none"  http://<host>:9443/oauth2/authorize
```

```tab="Response Format"
    Location: <callbackurl>?code=8a498de9-1f5d-3bd0-a3c9c06be6e08151&session_state=61cd6d0ac6f73bf2bab6f5d710d446c6592b6bedb01c240c1377312118f3e186.N92JLOL5gufcXSwxh2V4xg
```

!!! note
    RequestPath authentication will only skip prompting the login page and not the consent page.
    You can also skip prompting the user consent page using one of the following methods.
    
    * You can skip prompting consent for a particular request by sending the `prompt=none` attribute in the authorization request
    * You can skip prompting consent for an application by enabling the **Skip Consent** option on the developer portal.
    ![](insertlink in portal)
    * You can skip re-prompting consent by selecting the **Approve always** option for an application and user before sending the request.
    * You can add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file to disable prompting
     consent for all applications in WSO2 Identity Server.
    ```xml
    [oauth]
    consent_prompt=false
    ```

!!! Troubleshooting Tip  
        If you have not disabled consent using the deployment.toml file as mentioned above, the response will be as follows.
    
        ```
        Location: https://localhost:9443/authenticationendpoint/oauth2_consent.do?loggedInUser=admin&application=plagroundapp&scope=openid&sessionDataKeyConsent=a14f4a5d-16bb-4e47-9c53-5eacee9828f2&spQueryParams=
        ```
    
        The consent page URL given in the response is the consent page that requires user interaction to either approve 
        or deny the authorization request. You can access the consent page URL via a web browser and either approve or 
        deny consent. The URL will then be redirected to the following page.
        
        ```
        https://curl-app/callback?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
        ```

-----

!!! info "Related Links"
     -   [Demo: Enable Authentication with Basic Auth Request Path Authenticator](../../quick-starts/basic-auth-request-path-sample)
     -   [Guide: Authenticate with OAuth Request Path Authenticator](../../guides/oauth-request-path)
     -   [Demo: Enable Authentication with OAuth Request Path Authenticator](../../quick-starts/oauth-request-path-sample)
           