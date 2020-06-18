# Enable Login for a Client Side Application

This page guides you through enabling authentication using the [Authorization Code](../../../concepts/authorization/authorization-code-grant) 
grant type with [PKCE](TODO:insert-link-to-concepts) for client side applications (e.g.,mobile application , single page application) that uses OpenID Connect. 

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/webapp-oidc-sample"   rel="nofollow noopener">Try it with the sample</a>

----
(TODO: dev-portal-fragment)

{!fragments/register-a-service-provider.md!}

----
(TODO: dev-portal-fragment)
{!fragments/oauth-app-config-basic.md!}

----


## Enable PKCE

When configuring **OAuth/OpenID Connect Configuration** for the service provider, select **PKCE Mandatory** in order to enable PKCE. 

![enable-pkce](../../assets/img/guides/enable-pkce.png)

----

## Configure the client application

Make the following requests via your application to connect your application to WSO2 IS. 

1. Obtain the `authorization_code` by sending an authorization request to the authorization endpoint. 

    !!! tip
        You can use [an online tool](https://tonyxu-io.github.io/pkce-generator/) to generate PKCE code challenges to include the `code challenge` and `code_challenge_method` parameters. 

    ```tab="Request Format"
    https://<host>/oauth2/authorize?scope=openid&response_type=code
    &redirect_uri=<redirect_uri>
    &client_id=<OAuth Client Key>
    &code_challenge=<PKCE_code_challenge>
    &code_challenge_method=<PKCE_code_challenge_method>
    ```

    ```tab="Sample Request"
    https://localhost:9443/oauth2/authorize?scope=openid&response_type=code
    &redirect_uri=https://localhost/callback
    &client_id=YYVdAL3lLcmrubZ2IkflCAuLwk0a
    &code_challenge=5vEtIy2T-G65yXHc8g5zcJDQXICBzZMrtERq0zhx7hM
    &code_challenge_method=S256
    ```
    
2. Obtain the access token by sending a token request to the token endpoint using the `authorization_code` recieved in step 1, and the `<OAuth Client Key>` and `<OAuth Client Secret>` obtained when configuring the service provider.


    ```tab="Request Format"
    curl -i -X POST -u <OAuth Client Key>:<Client Secret> -k -d 
    'grant_type=authorization_code&redirect_uri=<redirect_uri>
    &code=<authorization_code>&code_verifier=<PKCE_code_verifier>' 
    https://localhost:9443/oauth2/token
    ```

    ```tab="Sample Request"
    curl -i -X POST -u YYVdAL3lLcmrubZ2IkflCAuLwk0a:azd39swy3Krt59fLjewYuD_EylIa -k -d 
    'grant_type=authorization_code
    &redirect_uri=https://localhost/callback&code=d827ec7e-1b8e-3d81-a4c0-2f7ff67ce844
    &code_verifier=aYr1jbrAHhZDC5WBi8wQPdraATAvvKy93S22rkPDkkRTHzzaAMVOJ5MHgRPgoKf8xDBJPE08'
    https://localhost:9443/oauth2/token
    ```

3. Validate the ID token. For the token request, you will receive a response containing the access token, scope, and ID token. The ID token contains basic user information. To check what is encoded within the ID token, you can use a tool such as <https://devtoolzone.com/decoder/jwt>.

----

!!! info "Related Topics"
    - [Concept: Authorization Code Grant](../../../concepts/authorization/authorization-code-grant)
    - [Concept: PKCE](TODO:insert-link-to-concepts)
    - [Demo: OpenID Connect Authentication](../../../quick-starts/webapp-oidc-sample)
    - [Guide: OAuth Grant Types](../../access-delegation/oauth-grant-types)
    - [Guide: Manage User Sessions](../session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)


