# Authenticate with Basic Auth Request Path Authenticator

This page guides you through using the request path authenticator for basic authentication. 
The Basic Authentication Request Path Authenticator is engaged when user credentials (username and password) 
are sent along with a request for authentication. You can use this authentication mechanism if you wish to skip 
prompting the user with the login page during the authentication flow.

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../quick-starts/basic-auth-request-path-sample" rel="nofollow noopener">Try it with the sample</a>


----

## Create a service provider

{!fragments/register-a-service-provider.md!}

----

## Basic OAuth/OpenID Connect configuration

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
    
Replace the ` <SEC_TOKEN>`, `<CLIENT_ID>`, `<IS_HOST>`, `<IS_PORT>` and `<CALLBACK_URL>` tags with the relevant values.

    
```tab="Request Format"
curl -v -X POST -H "Authorization: Basic <SEC_TOKEN>" -H "Content-Type: application/x-www-form-urlencoded;charset=UTF-8" -k -d "response_type=code&client_id=<CLIENT_ID>&redirect_uri=<CALLBACK_URL>&scope=openid&prompt=none"  http://<IS_HOST>:<IS_PORT>/oauth2/authorize
```

```tab="Response Format"
Location: <callback_url>?code=<code>&session_state=<session_state>
```

!!! note
    RequestPath authentication will only skip prompting the login page and not the consent page.
    You can also skip prompting the user consent page using one of the following methods.
    
    * You can skip prompting consent for a particular request by sending the `prompt=none` attribute in the authorization request
    * You can skip prompting consent for an application by enabling the **Skip Login Consent** option on the management console.
    
	![](../../../assets/img/guides/skip-consent.png)

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
        <callback_url>?code=37c79c505960e90d5b25f62ce760c98c&session_state=6d1a72e0f3f6392d6648ec5e6ed0
        ```

-----

!!! info "Related Links"
     -   [Quick Start: Enable Authentication with Basic Auth Request Path Authenticator](../../quick-starts/basic-auth-request-path-sample)
     -   [Guide: Authenticate with OAuth Request Path Authenticator](../../guides/oauth-request-path)
     -   [Quick Start: Enable Authentication with OAuth Request Path Authenticator](../../quick-starts/oauth-request-path-sample)
           