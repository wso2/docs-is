# Handle advanced login scenarios

This section guides you on handling advanced login scenarios with app-native authentication.

!!! note "Before you begin"
    [Add app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/add-app-native-authentication/) to your application.

## Handle Federated authentication

App-native authentication supports federated authentication which enables users can log in to the application with an external Identity Provider (IdP). Federated authentication can be configured in the following two ways.

### Native mode

If the external IdP provides an SDK to handle authentication programmatically, login through this IdP can be handled natively within the application. Once the authentication is complete, the application receives the `access_token` and `id_token` from the IdP which are then sent to {{product_name}}.

If you wish to authenticate users in the native mode, configure a trusted token issuer and a certificate (or a JWKS endpoint) in your connection.

To do so,

1. In the {{product_name}} Console, go to **Connections** and select your IdP.

2. In its **General** tab, 

    - under **issuer** configure a trusted token issuer.
    - under **Certificates**, configure either upload a certificate or configure a JWKS Endpoint.

3. Click **Update** to save the changes.

!!! tip
    Refer to the [sample scenario]({{base_path}}/references/app-native-authentication/#scenario-4-user-selects-federated-authentication-native-mode) to see it in action.


### Redirect mode

In the rediect mode, the application redirects the user to the IdP as it does in a [conventional federated login flow]({{base_path}}/guides/authentication/federated-login/). However, under the hood, app-native authentication handles federated authentication slightly differently.

!!! note "How is it different?"
    
    Although federated login flows in both [conventional login]({{base_path}}/guides/authentication/federated-login/) and app-native authentication redirect the user to the external IdP, there is a subtle difference between them.

    - In a conventional flow, {{product_name}} redirects the user to the external IdP. Once the authentication is complete, the user is redirected back to {{product_name}} with an authorization code.

    - In app-native authentication, {{product_name}} constructs a redirection URL (in which the callback URL is set to the application) and sends it to the application. The application redirects the user to the external IdP using the redirection URL. Once the authentication is complete, the IdP redirects the user back to the application (using the callback URL) with an authorization code. The application then sends the authorization code to {{product_name}}.

    App-native authentication handles it this way so as to maintain the API-centric flow between {{product_name}} and the application.

If you wish to authenticate users in the redirect mode, simply DO NOT configure an issuer and a certificate (or a JWKS endpoint) for your IdP.

!!! tip
    Refer to the [sample scenario]({{base_path}}/references/app-native-authentication/#scenario-5-user-selects-federated-authentication-redirect-mode) to see it in action.

## Handle different authenticator types

There are three types of authenticators you may configure for app-native authentication as defined by the **promptType** parameter corresponding to each authenticator.

- `USER_PROMPT` - Authenticators that only require user input (e.g. Username & Password).

- `INTERNAL_PROMPT` - Authenticators that require an action to make the option available for the user. (e.g. to enable login with passkey, the app should interact with the platform APIs).

- `REDIRECTION_PROMPT`: Authenticators that require user be redirected to an external Identity Provider (e.g. login with Google).

The following example shows details of the username & password authenticator which is of type `USER_PROMPT`. 

```json
{
    "flowId": "30dea4e6-bd60-4630-a6c9-d3f9cdd55881",
    ...
    "nextStep": {
        "stepType": "MULTI_OPTIONS_PROMPT",
        "authenticators": [
            {
                "authenticatorId": "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM",
                "authenticator": "Username & Password",
                "idp": "LOCAL",
                "metadata": {
                    "i18nKey": "authenticator.basic",
                    "promptType": "USER_PROMPT",
            ...
        ]
    ...
}
```
Based on the number of login options configured for a step, these authenticator types behave differently.

### For single-option login

Single-option login steps are indicated by the `stepType` parameter being set to `AUTHENTICATOR_PROMPT` in the response.

For steps with a single login option, regardless of the type of authenticator, {{product_name}} responds with the required metadata for that option. Therefore, the application does not have to go through additional steps to 'initiate' authenticators.

!!! tip
    Refer to the [sample scenario]({{base_path}}/references/app-native-authentication/#scenario-1-user-logs-in-with-a-username-password) to see it in action.

### For multi-option login

Multi-option login steps are indicated by the `stepType` parameter being set to `MULTI_OPTIONS_PROMPT` in the response.

For a step with multiple login options, authenticators behave the following way based on the type.

-  `USER_PROMPT` - The response contains the metadata for such authenticators.

- `REDIRECTION_PROMPT`, `INTERNAL PROMPT` -  The response does not contain the metadata for such authenticators. This is because authenticators of these types require a form of initiation. Therefore, the application should make an additional request to {{product_name}} to 'initiate' the authenticator and receive the metadata.

!!! tip
    Refer to the [sample scenario]({{base_path}}/references/app-native-authentication/#scenario-3-user-selects-passkey-login-out-of-multiple-options) to see it in action.


## Handle Single Sign-On
Single Sign-On (SSO) for app-native authentication can be handled in the following two ways.

### Cookie based SSO

App-native authentication, just as the OAuth authorization code flow, sets an SSO cookie (commonAuthId). If the cookie is preserved, any subsequent authorization request that occurs with this cookie will automatically perform SSO.

### SessionId based SSO

SessionId parameter based SSO is useful if the implementation does not maintain cookies. The `id_token` that the application receives after the initial authentication request, contains the `isk` claim. When making a subsequent authorization request the `isk` value can be used as the `sessionId` for SSO to occur.

Given below is a sample authorization request using the `isk` value as the `sessionId`

=== "Sample request"

    ```bash
    curl --location '{{api_base_path}}'
    --header 'Accept: application/json'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=<client_id>'
    --data-urlencode 'response_type=code'
    --data-urlencode 'redirect_uri=<redirect_uri>'
    --data-urlencode 'scope=<scope>'
    --data-urlencode 'response_mode=direct'
    --data-urlencode 'sessionId=<isk claim obtained from the id_token>'
    ```

=== "Example"

    ```bash
    curl --location '{{api_example_base_path}}'
    --header 'Accept: application/json'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
    --data-urlencode 'response_type=code'
    --data-urlencode 'redirect_uri=https://example.com/home'
    --data-urlencode 'scope=openid profile'
    --data-urlencode 'response_mode=direct'
    --data-urlencode 'sessionId=77961448dd65199ec519fee4685553fe153e9d7bb80e26e41cb5cedc89a2b731'
    ```

!!! note
    If both cookie based SSO and SessionId based SSO are used, cookie based SSO takes precedence.