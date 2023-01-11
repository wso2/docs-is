# Enable login using the Authorization Code flow and PKCE

This guide gives you instructions on how to implement login with OpenID Connect in your application by using the [authorization code flow]({{base_path}}/references/concepts/authorization/authorization-code-grant) and PKCE. This method is most suitable for public clients, which are applications that cannot keep the client credentials securely.

Single-page applications and native mobile applications are some examples for public clients.

For public clients, it is recommended to use [PKCE](https://datatracker.ietf.org/doc/html/rfc7636) along with the authorization code grant to mitigate [code interception attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-authorization-code-interception-attacks/).

## Register a service provider

{!./includes/register-a-service-provider.md!}

----

## Configure the service provider

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

2. Make sure **Code** is selected from the **Allowed Grant Types** list.

3. Enter the **Callback Url** of your application.

    !!! tip
        The **Callback Url** is the exact location in the service provider's application to which an access token will be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

4. Select **PKCE Mandatory** to enable PKCE for your application.

    ![enable-pkce]({{base_path}}/assets/img/guides/enable-pkce.png)

5. Click **Update** to save your configurations.

    !!! note
        - Note the generated **OAuth Client Key** and **OAuth Client Secret**. You will need these values later when sending the request.

        - To configure more advanced configurations, see [OAuth/OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced).

----

## Get authorization code

To obtain the `authorization_code`, send an authorization request to the authorization endpoint using the following request format.

!!! tip
    You can use this [Online PKCE Generator Tool](https://tonyxu-io.github.io/pkce-generator/) to generate PKCE code challenges.

    To generate the **challenge** and **verifier** through the tool:

    1. Click **Generate Code Verifier**.
    2. Click **Generate Code Challenge**.
    
    Note the two values. You will need them to get the authorization code and the tokens. The code challenge you get here is the base64 URL encoded value of the SHA256 hashed `code_verifier`, so the code challenge method will be `S256`.

**Request format**
    ```bash
    https://<host>/oauth2/authorize?scope=openid&response_type=code
    &redirect_uri=<redirect_uri>
    &client_id=<OAuth Client Key>
    &code_challenge=<PKCE_code_challenge>
    &code_challenge_method=<PKCE_code_challenge_method>
    ```

**Sample Request**
    ```bash
    https://localhost:9443/oauth2/authorize?scope=openid&response_type=code
    &redirect_uri=https://localhost/callback
    &client_id=YYVdAL3lLcmrubZ2IkflCAuLwk0a
    &code_challenge=5vEtIy2T-G65yXHc8g5zcJDQXICBzZMrtERq0zhx7hM
    &code_challenge_method=S256
    ```

This authorization request takes the following parameters.

| Request Parameter | Description    |
|-------------------|----------------|
| `redirect_uri`  | This is where the response is redirected to at the end of the process. This needs to be the same as one of the URLs given in the registered apps. |
| `client_id` | The client ID generated when registering the application on IS.
| `code_challenge`    | The client creates and records a secret cryptographical random string (`code_verifier`), which is then encoded using URL safe base64 encoding to transform it into the `code_challenge`. The `code_challenge` is required for the authorization code flow with PKCE. You can use some [tools](https://tonyxu-io.github.io/pkce-generator/) to generate the `code_challenge` and `code_verifier`.
| `code_challenge_method` | This is the method used for transforming the `code_verifier` into the `code_challenge`. Identity Server supports S256 and `plain`. This is required for the authorization code flow with PKCE. |

## Get tokens

After receiving the authorization code, the application has to exchange it for getting the below tokens:

- `access_token`
- `id_token`
- `refresh_token` (only if the `refresh_token` grant type is enabled for the service provider registered on IS)

You can get the tokens by sending the following token request to the token endpoint.

**Request Format**
    ```curl
    curl -i -X POST -u <OAuth Client Key>:<Client Secret> 
    -k -d 'grant_type=authorization_code
    &redirect_uri=<redirect_uri>
    &code=<authorization_code>
    &code_verifier=<PKCE_code_verifier>' 
    https://localhost:9443/oauth2/token
    ```

**Sample Request**
    ```curl
    curl -i -X POST -u YYVdAL3lLcmrubZ2IkflCAuLwk0a:azd39swy3Krt59fLjewYuD_EylIa 
    -k -d 'grant_type=authorization_code
    &redirect_uri=https://localhost/callback&code=d827ec7e-1b8e-3d81-a4c0-2f7ff67ce844
    &code_verifier=aYr1jbrAHhZDC5WBi8wQPdraATAvvKy93S22rkPDkkRTHzzaAMVOJ5MHgRPgoKf8xDBJPE08'
    https://localhost:9443/oauth2/token
    ```

This token request takes the following parameters.

| Request Parameter | Description    |
|-------------------|----------------|
| `grant_type`    | The grant type. Here we are using the `authorization_code` grant.   |
| `redirect_uri`  | This is where the response is redirected to at the end of the process. This needs to be the same as one of the URLs given in the registered apps. |
| `code`  | The authorization code received from the authorization request.   |
| `code_verifier` | The plain text cryptographical random string used to generate the `code_challenge`. This is required for the authorization code flow with PKCE.    |


You will receive a response containing the access token, scope, and ID token for the token request.

!!! info "Validate the ID token"
    The ID token contains basic user information. To check what is encoded within the ID token, you can use the [JWT Token Decoder](https://devtoolzone.com/decoder/jwt) tool.

----

!!! info "Related topics"
    - [Concept: Authorization Code Grant]({{base_path}}/references/concepts/authorization/authorization-code-grant)
    - [Guide: OpenID Connect Authentication]({{base_path}}/guides/login/oidc-authentication)
    - [Guide: Authorization Code Grant]({{base_path}}/guides/access-delegation/auth-code-playground)
    - [Guide: Manage User Sessions]({{base_path}}/guides/login/session-management-logout)
    - [Guide: OpenID Connect Back-Channel Logout]({{base_path}}/guides/login/oidc-backchannel-logout)
    - [Guide: Advanced OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced)
    - [Deploy: Mitigate Authorization Code Interception Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-authorization-code-interception-attacks/)