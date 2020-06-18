# Enable Login for an OIDC Web Application

This page guides you through enabling login for an [OpenID Connect](../../../concepts/authentication/intro-oidc) web application. 

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/webapp-oidc-sample" rel="nofollow noopener">Try it with the sample</a>

----
(TODO: dev-portal-fragment)
{!fragments/register-a-service-provider.md!}

----
(TODO: dev-portal-fragment)
{!fragments/oauth-app-config-basic.md!}

----

## Configure the client application

Make the following requests via your application to connect your application to WSO2 IS. 

1. Obtain the `authorization_code` by sending an authorization request to the authorization endpoint.

    ```tab="Request Format"
    https://<host>/oauth2/authorize?scope=openid&response_type=code
    &redirect_uri=<redirect_uri>
    &client_id=<oauth_client_key>
    ```

    ```tab="Sample Request"
    https://localhost:9443/oauth2/authorize?scope=openid&response_type=code
    &redirect_uri=https://localhost/callback
    &client_id=YYVdAL3lLcmrubZ2IkflCAuLwk0a
    ```

2. Obtain the access token by sending a token request to the token endpoint using the `authorization_code` recieved in step 1, and the `oauth_client_key` and `oauth_client_secret` obtained when configuring the service provider.

    ```tab="Request Format"
    curl -i -X POST -u <oauth_client_key>:<oauth_client_secret> -k -d 
    'grant_type=authorization_code&redirect_uri=<redirect_uri>
    &code=<authorization_code>' https://localhost:9443/oauth2/token
    ```

    ```tab="Sample Request"
    curl -i -X POST -u YYVdAL3lLcmrubZ2IkflCAuLwk0a:azd39swy3Krt59fLjewYuD_EylIa -k -d 
    'grant_type=authorization_code
    &redirect_uri=https://localhost/callback&code=d827ec7e-1b8e-3d81-a4c0-2f7ff67ce844'
    https://localhost:9443/oauth2/token
    ```

3. Validate the ID token. For the token request, you will receive a response containing the access token, scope, and ID token. The ID token contains basic user information. To check what is encoded within the ID token, you can use a tool such as <https://devtoolzone.com/decoder/jwt>.

----

!!! info "Related Topics"
    - [Concept: OpenID Connect](../../../concepts/authentication/intro-oidc)
    - [Demo: OpenID Connect Authentication](../../../quick-starts/webapp-oidc-sample)
    - [Guide: OAuth Grant Types](../../access-delegation/oauth-grant-types)
    - [Guide: Manage User Sessions](../session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)
    - [Guide: OpenID Connect Discovery](../oidc-discovery)