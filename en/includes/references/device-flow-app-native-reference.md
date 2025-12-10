### Scenario 8: Device authorization flow

The application goes through the following steps to complete app-native authentication using the device authorization flow.

- **Step 1**: Get the required codes.

    The app initiates a login request to the device authorization endpoint.

    !!! note
        The response contains the `user_code` and `device_code` required for the client device.

    === "Request (`/device_authorize`)"

        ```bash
        curl --location '{{api_oauth2_path}}/device_authorize/'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
        --data-urlencode 'scope=openid profile'
        ```
    === "Response (`/device_authorize`)"

        ```json
        {
            "user_code": "s2DqSNK",
            "device_code": "d3fe0db1-2334-48fa-b7d9-821ecfad10d5",
            "interval": 5,
            "verification_uri": "{{api_oauth2_path}}/authenticationendpoint/device.do",
            "verification_uri_complete": "{{api_oauth2_path}}/authenticationendpoint/device.do?user_code=s2DqSNK",
            "expires_in": 600
        }
        ```

- **Step 2**: Authorize the client device.

    The app on the client device calls the device endpoint with the `user_code` to initiate authentication.

    !!! note
        Set `response_mode=direct` to initiate app-native authentication.

    === "Request (`/device`)"

        ```bash
        curl --location '{{api_oauth2_path}}/device/'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'user_code=s2DqSNK'
        --data-urlencode 'response_mode=direct'
        ```
    === "Response (`/device`)"

        ```json
        {
            "flowId": "95339089-72d1-4825-80fe-ab7864f4943b",
            "flowStatus": "INCOMPLETE",
            "flowType": "AUTHENTICATION",
            "nextStep": {
                "stepType": "AUTHENTICATOR_PROMPT",
                "authenticators": [
                    {
                        "authenticatorId": "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM",
                        "authenticator": "Username & Password",
                        "idp": "LOCAL",
                        "metadata": {
                            "i18nKey": "authenticator.basic",
                            "promptType": "USER_PROMPT",
                            "params": [
                                {
                                    "param": "username",
                                    "type": "STRING",
                                    "order": 0,
                                    "i18nKey": "username.param",
                                    "displayName": "Username",
                                    "confidential": false
                                },
                                {
                                    "param": "password",
                                    "type": "STRING",
                                    "order": 1,
                                    "i18nKey": "password.param",
                                    "displayName": "Password",
                                    "confidential": true
                                }
                            ]
                        },
                        "requiredParams": [
                            "username",
                            "password"
                        ]
                    }
                ]
            },
            "links": [
                    {
                "name": "authentication",
                "href": "{{authn_path}}",
                "method": "POST"
                }
            ]
        }
        ```

- **Step 3**: Carry the `flowId` received in the above response and request the `/authn` endpoint for username & password authentication.

    === "Request (`/authn`)"

        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
            "flowId": "95339089-72d1-4825-80fe-ab7864f4943b",
            "selectedAuthenticator": {
                "authenticatorId": "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM",
                "params": {
                    "username": "username",
                    "password": "password"
                }
            }
        }'
        ```

    === "Response (`/authn`)"

        ```json
        {
            "flowStatus": "SUCCESS_COMPLETED",
            "authData": {
                "app_name": "Mobile App"
            }
        }
        ```

- **Step 4**: Once the user completes authentication, the app on the client device polls the token endpoint with the `device_code` to obtain the access token.

    === "Request (`/token`)"

        ```bash
        curl --location '{{api_oauth2_path}}/token/'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'grant_type=urn:ietf:params:oauth:grant-type:device_code'
        --data-urlencode 'device_code=d3fe0db1-2334-48fa-b7d9-821ecfad10d5'
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
        ```

    === "Response (`/token`)"

        ```json
        {
            "access_token": "74d610ab-7f4a-3b11-90e8-279d76644fc7",
            "refresh_token": "fdb58069-ecc7-3803-9b8b-6f2ed85eff19",
            "token_type": "Bearer",
            "expires_in": 3600
        }
        ```
