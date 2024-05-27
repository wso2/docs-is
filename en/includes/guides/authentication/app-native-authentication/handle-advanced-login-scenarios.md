# Handle advanced login scenarios

This section guides you on handling advanced login scenarios with app-native authentication.

!!! note "Before you begin"
    [Add app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/add-app-native-authentication/) to your application.

## Handle Federated authentication

App-native authentication supports federated authentication which enables users can log in to the application with an external Identity Provider (IdP). Federated authentication can be configured in the following two ways.

### Native mode

If the external IdP provides an SDK to handle authentication programmatically, login through this IdP can be handled natively within the application. Once the authentication is complete, the application receives the `access_token` and `id_token` from the IdP which are then sent to {{product_name}}.

If you wish to authenticate users in the native mode, configure a certificate or specify the JWKS endpoint for the created connection. {{product_name}} uses this to validate the tokens received from the IdP

To do so,

1. In the {{product_name}} Console, go to **Connections** and select your IdP.

2. In its **General** tab, under **Certificates**, configure either a JWKS Endpoint or upload a certificate.

3. Click **Update** to save the changes.

!!! tip
    Refer to the [sample scenario]({{base_path}}/references/app-native-authentication/#scenario-4-user-selects-federated-authentication-native-mode) to see it in action.


### Redirect mode

In the rediect mode, the application redirects the user to the IdP for authentication. Once it's complete, the application receives an authorization code from the IdP which is then sent back to {{product_name}}. ({{product_name}} users this to make a token call to the IdP.).

If you wish to authenticate users in the redirect mode, simply DO NOT configure a certificate or specify the JWKS endpoint for your IdP.

!!! tip
    Refer to the [sample scenario]({{base_path}}/references/app-native-authentication/#scenario-5-user-selects-federated-authentication-redirect-mode) to see it in action.


## Handle multi-option login

If you have multiple login options configured for a single login step, app-native authentication handles it slightly differently based on the types of authenticators you have configured for the step.

There are three types of authenticators you may configure for app-native authentication. The **promptType** parameter for each authenticator describes the type of authenticator.

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

- `USER_PROMPT` - Authenticators that only require user input (e.g. Username & Password).

- `INTERNAL_PROMPT` - Authenticators that require an action to make the option available for the user. (e.g. to enable login with passkey, the app should interact with the platform APIs).

- `REDIRECTION_PROMPT`: Authenticators that require user be redirected to an external Identity Provider (e.g. login with Google).
    
If the user selected authenticator is of type,

-  **USER_PROMPT** (e.g. username & password) or **REDIRECTION_PROMPT** (e.g. login with Google) -  the API response contains the metadata for the authenticators in the API response. Therefore, the application can collect the credentials from the user and send back to {{product_name}} for authentication.

- **INTERNAL PROMPT** (e.g. SMS OTP), the API response does not contain the metadata for that authenticator in the response. This is because authenticators of this type require a form of initiation. Therefore, the application should make an additional request to {{product_name}} to 'initiate' the authenticator and receive its metadata.

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