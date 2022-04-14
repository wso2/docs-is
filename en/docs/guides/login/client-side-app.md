# Enable Login for a Client Side Application

This page guides you through enabling authentication using the [Authorization Code](../../../references/concepts/authorization/authorization-code-grant) 
grant type with PKCE for client side applications (e.g.,mobile application , single page application) that uses OpenID Connect. 

!!! tip
    PKCE is a recommended security measure used to mitigate a [code interception attack](../../../deploy/mitigate-attacks/mitigate-authorization-code-interception-attacks/).

## Register a service provider

{!fragments/register-a-service-provider.md!}

----

## Configure the service provider

{!fragments/oauth-app-pkce.md!}

----

## Try it

Make the following requests via your application to connect your application to WSO2 IS. 

1. Obtain the `authorization_code` by sending an authorization request to the authorization endpoint. 

    !!! tip
        You can use this [online tool](https://tonyxu-io.github.io/pkce-generator/) to generate PKCE code challenges to include the `code challenge` and `code_challenge_method` parameters. 
        First click **Generate Code Verifier**. 
        Now click **Generate Code Challenge**.
        Note the two values. The code challenge you get here is the base64 URL encoded value of the SHA256 hashed `code_verifier` so the code challenge method will be `S256`.    
    
    !!! abstract ""
        **Request Format**
        ```
        https://<host>/oauth2/authorize?scope=openid&response_type=code
        &redirect_uri=<redirect_uri>
        &client_id=<OAuth Client Key>
        &code_challenge=<PKCE_code_challenge>
        &code_challenge_method=<PKCE_code_challenge_method>
        ```
        ---
        **Sample Request**
        ```
        https://localhost:9443/oauth2/authorize?scope=openid&response_type=code
        &redirect_uri=https://localhost/callback
        &client_id=YYVdAL3lLcmrubZ2IkflCAuLwk0a
        &code_challenge=5vEtIy2T-G65yXHc8g5zcJDQXICBzZMrtERq0zhx7hM
        &code_challenge_method=S256
        ```
    
2. Obtain the access token by sending a token request to the token endpoint using the `authorization_code` received in step 1, and the `<OAuth Client Key>` and `<OAuth Client Secret>` obtained when configuring the service provider.

    !!! abstract ""
        **Request Format**
        ```
        curl -i -X POST -u <OAuth Client Key>:<Client Secret> -k -d 
        'grant_type=authorization_code&redirect_uri=<redirect_uri>
        &code=<authorization_code>&code_verifier=<PKCE_code_verifier>' 
        https://localhost:9443/oauth2/token
        ```
        ---
        **Sample Request**
        ```
        curl -i -X POST -u YYVdAL3lLcmrubZ2IkflCAuLwk0a:azd39swy3Krt59fLjewYuD_EylIa -k -d 
        'grant_type=authorization_code
        &redirect_uri=https://localhost/callback&code=d827ec7e-1b8e-3d81-a4c0-2f7ff67ce844
        &code_verifier=aYr1jbrAHhZDC5WBi8wQPdraATAvvKy93S22rkPDkkRTHzzaAMVOJ5MHgRPgoKf8xDBJPE08'
        https://localhost:9443/oauth2/token
        ```

3. Validate the ID token. For the token request, you will receive a response containing the access token, scope, and ID token. The ID token contains basic user information. To check what is encoded within the ID token, you can use a tool such as <https://devtoolzone.com/decoder/jwt>.

----

!!! info "Related topics"
    - [Concept: Authorization Code Grant](../../../references/concepts/authorization/authorization-code-grant)
    - [Quick Start: OpenID Connect Authentication](../../../quick-starts/webapp-oidc-sample)
    - [Guide: Authorization Code Grant](../../access-delegation/authorization-code)
    - [Guide: Manage User Sessions](../session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout](../oidc-backchannel-logout)
    - [Guide: Advanced OpenID Connect Configurations](../../login/oauth-app-config-advanced)
    - [Deploy: Mitigate Authorization Code Interception Attacks](../../../deploy/mitigate-attacks/mitigate-authorization-code-interception-attacks/)    

