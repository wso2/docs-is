### Scenario {{session_control_scenario_id}}: Application is configured with concurrent-sessions based access control

The application goes through the following steps to complete app-native authentication for a user logging in with username & password in the first step and engages the Active Sessions Limited in the second step.

- **Step 1**: Initiate the request with the `/authorize` endpoint.

    !!! note
        The response contains information on the first authentication step.

    === "Request (`/authorize`)"

        ```bash
        curl --location '{{api_base_path}}'
        --header 'Accept: application/json'
        --header 'Content-Type: application/x-www-form-urlencoded'
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka'
        --data-urlencode 'response_type=code'
        --data-urlencode 'redirect_uri=https://example.com/home'
        --data-urlencode 'scope=openid profile'
        --data-urlencode 'response_mode=direct'
        ```
    === "Response (`/authorize`)"

        ```json
        {
          "flowId": "162b7547-e057-4c84-9237-1c7e69bdc122",
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

- **Step 2**: Carry the `flowId` received in the above response and request the `/authn` endpoint for username & password authentication.

    !!! note
        Upon successful authentication, the `/authn` endpoint returns information on the next authentication step.

    === "Request (`/authn`)"

        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
          "flowId": "162b7547-e057-4c84-9237-1c7e69bdc122",
          "selectedAuthenticator": {
            "authenticatorId": "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM",
            "params": {
                "username": "johnd",
                "password": "U$3r"
            }
          }
        }'
        ```

    === "Response (`/authn`)"

        ```json
        {
            "flowId": "e4d31f92-1ffe-4dea-80ac-8a1b665bb399",
            "flowStatus": "INCOMPLETE",
            "flowType": "AUTHENTICATION",
            "nextStep": {
                "stepType": "AUTHENTICATOR_PROMPT",
                "authenticators": [
                    {
                        "authenticatorId": "U2Vzc2lvbkV4ZWN1dG9yOkxPQ0FM",
                        "authenticator": "Active Sessions Limit",
                        "idp": "LOCAL",
                        "metadata": {
                            "promptType": "USER_PROMPT",
                            "params": [
                                {
                                    "param": "promptResp",
                                    "type": "STRING",
                                    "order": 1,
                                    "i18nKey": "promptResp.param",
                                    "displayName": "Prompt Response",
                                    "confidential": false
                                },
                                {
                                    "param": "promptId",
                                    "type": "STRING",
                                    "order": 2,
                                    "i18nKey": "promptId.param",
                                    "displayName": "Prompt ID",
                                    "confidential": false
                                },
                                {
                                    "param": "ActiveSessionsLimitAction",
                                    "type": "STRING",
                                    "order": 3,
                                    "i18nKey": "activeSessionsLimitAction.param",
                                    "displayName": "Active Sessions Limit Action",
                                    "confidential": false
                                },
                                {
                                    "param": "sessionsToTerminate",
                                    "type": "MULTI_VALUED",
                                    "order": 4,
                                    "i18nKey": "sessionsToTerminate.param",
                                    "displayName": "Sessions to Terminate",
                                    "confidential": false
                                }
                            ],
                            "additionalData": {
                                "sessions": "[{\"lastAccessTime\":\"1741513176234\",\"browser\":\"PostmanRuntime\",\"sessionId\":\"027b638ed0388c49d1d943b914d9e1833ffb5af0a83116f225903cc91fb43727\",\"device\":\"Other\",\"platform\":\"Other\"},{\"lastAccessTime\":\"1741513261190\",\"browser\":\"Firefox\",\"sessionId\":\"2d932c1ac04c0c365ab929bb30397f64a850c1acc37db87bb24c2a686b8b9b1b\",\"device\":\"Mac\",\"platform\":\"Mac OS X\"},{\"lastAccessTime\":\"1741513275913\",\"browser\":\"Chrome\",\"sessionId\":\"d2ce34b45408e14b57578d36852bda7d5e275b1eaf3a600677d19c8e034f6fdd\",\"device\":\"Mac\",\"platform\":\"Mac OS X\"}]",
                                "MaxSessionCount": "1",
                                "promptId": "e4d31f92-1ffe-4dea-80ac-8a1b665bb399"
                            }
                        },
                        "requiredParams": [
                            "promptResp",
                            "promptId",
                            "ActiveSessionsLimitAction"
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

- **Step 3**: Carry the same `flowId` and request the `/authn` endpoint for active sessions limiting.

    !!! note
        As this is the final step configured for the application, the `/authn` endpoint returns an authorization code upon successful authentication.


    | Variable  | Description   | Sample values  |
    |-----------|---------------|---------------|
    | `promptResp` | The response to the prompt | `yes` |
    | `promptId` | The ID of the prompt. This can be retrieved from Step 2 response. | `e4d31f92-1ffe-4dea-80ac-8a1b665bb399` |
    | `ActiveSessionsLimitAction` | The action to be taken when the active sessions limit is reached. | `denyLimitActiveSessionsAction`, `refreshActiveSessionsAction`, `terminateActiveSessionsAction` |
    | `sessionsToTerminate` | The session IDs to be terminated. This parameter needs to be sent when `terminateActiveSessionsAction` is selected for `ActiveSessionsLimitAction` | `["027b638ed0388c49d1d943b914d9e1833ffb5af0a83116f225903cc91fb43727", "d2ce34b45408e14b57578d36852bda7d5e275b1eaf3a600677d19c8e034f6fdd"]` |

    === "Request (`/authn`)"

        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
          "flowId": "e4d31f92-1ffe-4dea-80ac-8a1b665bb399",
          "selectedAuthenticator": {
            "authenticatorId": "U2Vzc2lvbkV4ZWN1dG9yOkxPQ0FM",
            "params": {
                "promptResp": "yes",
                "promptId": "e4d31f92-1ffe-4dea-80ac-8a1b665bb399",
                "ActiveSessionsLimitAction": "terminateActiveSessionsAction",
                "sessionsToTerminate": ["027b638ed0388c49d1d943b914d9e1833ffb5af0a83116f225903cc91fb43727", "d2ce34b45408e14b57578d36852bda7d5e275b1eaf3a600677d19c8e034f6fdd", "2d932c1ac04c0c365ab929bb30397f64a850c1acc37db87bb24c2a686b8b9b1b"]}]
            }
          }
        }'
        ```

    === "Response (`/authn`)"
        
        ```json
        {
          "flowStatus": "SUCCESS_COMPLETED",
          "authData": {
            "code": "4dae99f3-b981-3527-237f-903a6fc92340"
          }
        }
        ```