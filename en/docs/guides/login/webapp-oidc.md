# Enable Login for an OIDC Web Application

This page guides you through enabling login for an [OpenID Connect](../../../references/concepts/authentication/intro-oidc) web application. 

## Create a service provider

{!fragments/register-a-service-provider.md!}

----

## Configure the service provider

{!fragments/oauth-app-config-basic.md!}

{!fragments/oauth-app-config-advanced-tip.md!}

----

## Try a sample app

{!fragments/deploying-sample-apps.md!}

### Set up the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. [Download](https://github.com/wso2/samples-is/releases/download/v4.3.0/pickup-manager.war) the `pickup-manager.war` file from the latest release assets.

### Configure the sample

Next, deploy the sample web app on a web container.

1. Extract the `pickup-manager.war` file and open the `manager.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

2. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated for the newly created service provider.

    ![pickup-key-secret-2](../../../assets/img/fragments/pickup-key-secret-2.png)

3. Next, copy the extracted and modified `pickup-manager` folder to the `<TOMCAT_HOME>/webapps` folder.

### Try it out 

1. Start the Tomcat server and access the following URL on your browser: `http://wso2is.local:8080/pickup-dispatch/home.jsp`.

2. Click **Login**. You will be redirected to the login page of WSO2 Identity Server. 

3. Log in using your WSO2 Identity Server credentials (e.g., admin/admin). Provide the required consent. You will be redirected to the Pickup Dispatch application home page.

You have successfully configured authentication for an OpenID Connect application.

## How login works

1. Obtain the `authorization_code` by sending an authorization request to the authorization endpoint.

    !!! abstract  ""
        **Request Format**
        ```
        https://<host>:<port>/oauth2/authorize?scope=openid&response_type=code
        &redirect_uri=<callback_url>
        &client_id=<oauth_client_key>
        ```
        ---
        **Sample Request**
        ```
        https://localhost:9443/oauth2/authorize?scope=openid&response_type=code
        &redirect_uri=https://localhost/callback
        &client_id=YYVdAL3lLcmrubZ2IkflCAuLwk0a
        ```

    You will receive the authorization code upon successful authorization.
    
    !!! abstract ""
        **Response Format**
        ```
        <callback_url>?code=<code>
        ```
        ---
        **Sample Response**
        ```
        https://localhost/callback?code=9142d4cad58c66d0a5edfad8952192
        ```

2. Obtain the access token by sending a token request to the token endpoint using the `code` received in step 1, and the `oauth_client_key` and `oauth_client_secret` obtained when configuring the service provider.

    !!! abstract ""
        **Request Format**
        ```
        curl -i -X POST -u <oauth_client_key>:<oauth_client_secret> -k -d 
        'grant_type=authorization_code&redirect_uri=<redirect_uri>
        &code=<code>' https://<host>:<port>/oauth2/token
        ```
        ---
        **Sample Request**
        ```
        curl -i -X POST -u YYVdAL3lLcmrubZ2IkflCAuLwk0a:azd39swy3Krt59fLjewYuD_EylIa -k -d 
        'grant_type=authorization_code
        &redirect_uri=https://localhost/callback&code=d827ec7e-1b8e-3d81-a4c0-2f7ff67ce844'
        https://localhost:9443/oauth2/token
        ```

3. For the token request, you will receive a response containing the access token, scope, and ID token similar to the sample response provided below.
   
    ``` java
    {
        "access_token":"80c7c0d7-070a-38ff-a1f4-d21a444cdb67",
        "refresh_token":"18917dd6-4566-3294-92a9-01ec89cccf4d",
        "scope":"openid"
        "id_token":"eyJ4NXQiOiJNell4TW1Ga09HWXdNV0kwWldObU5EY3hOR1l3WW1NNFpUQTNNV0kyTkRBelpHUXpOR00wWkdSbE5qSmtPREZrWkRSaU9URmtNV0ZoTXpVMlpHVmxOZyIsImtpZCI6Ik16WXhNbUZrT0dZd01XSTBaV05tTkRjeE5HWXdZbU00WlRBM01XSTJOREF6WkdRek5HTTBaR1JsTmpKa09ERmtaRFJpT1RGa01XRmhNelUyWkdWbE5nX1JTMjU2IiwiYWxnIjoiUlMyNTYifQ.eyJpc2siOiJjZTA5YTM1NjBhYzI4ZDc3YWNlZjJjYzQxZGUyNjEzZDMxY2NmOGQwYTgxYjRhNzY2ZTlhYTFmZDRlNjhhMzA5IiwiYXRfaGFzaCI6IncwUG1fVFp4TlFfQTBRUU91RjJESUEiLCJhdWQiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiY19oYXNoIjoibzhIX0Fqc3FOSWkyd3g5LWVzcFo0dyIsInN1YiI6ImFkbWluIiwibmJmIjoxNjE1ODc0NTM5LCJhenAiOiJDVnlRZU01UDMzZ2ZOODB2dXIzTmN4elBnSHdhIiwiYW1yIjpbIkJhc2ljQXV0aGVudGljYXRvciJdLCJpc3MiOiJodHRwczpcL1wvbG9jYWxob3N0Ojk0NDNcL29hdXRoMlwvdG9rZW4iLCJleHAiOjE2MTU4NzgxMzksImlhdCI6MTYxNTg3NDUzOSwibm9uY2UiOiJhc2QifQ.LIoD9ltfqsxysMaC1b0kX-Ot4qL5GycpF5R-GIB_wBkQvN5BVEQZ4XV2t0t9GaQv1gSApsd6CtUAvV0haAqaNDElVcDQrmsyyHNzN0051biTQWQkoC4wwtO6_w1MSmgbH_aNVjQkBWt2vnaWtn6bt9sdZVxGRSb3_Amxdty_rDmiOzhJPwxZbkdPp1US0jmAn2XOoQQyH7e__qoXSjjoBAKXQtncJWAKtteDUBQTqVLj13TdS8dYqnEQByKNvhpz8rZjGaBV9pxtOWoqnbc3IMA4lX47Mpxl22ZqhIn0J6WCQ7nJtEkfx6XNHdatWZyG2x20pxbZkgya6sKAEoy3zw",
        "token_type":"Bearer",
        "expires_in":2286
    }
    ```

    The ID token contains basic user information. To check what is encoded within the ID token, you can use a tool such as <https://devtoolzone.com/decoder/jwt>.


!!! info "Related topics"
    - [Concept: OpenID Connect](../../../references/concepts/authentication/intro-oidc)
    - [Quick Start: OpenID Connect Authentication](../../../quick-starts/webapp-oidc-sample)
    - [Guide: Advanced OpenID Connect Configurations](../../login/oauth-app-config-advanced)
    - [Guide: Authorization Code Grant](../../access-delegation/authorization-code/)
    - [Guide: Manage User Sessions](../session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)
    - [Guide: OpenID Connect Discovery](../oidc-discovery)