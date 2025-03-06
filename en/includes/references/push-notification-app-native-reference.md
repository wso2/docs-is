### Scenario 6: 2FA with username & password and Push Notification

The application goes through the following steps to complete app-native authentication for a user logging in with username & password in the first step and Push Notification in the second step.

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

    === "Request 1 (`/authn`)"
    
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
    
    === "Response 1 (`/authn`)"
    
        ```json
        {
          "flowId": "162b7547-e057-4c84-9237-1c7e69bdc122",
          "flowStatus": "INCOMPLETE",
          "flowType": "AUTHENTICATION",
          "nextStep": {
            "stepType": "AUTHENTICATOR_PROMPT",
            "authenticators": [
              {
                "authenticatorId": "cHVzaC1ub3RpZmljYXRpb24tYXV0aGVudGljYXRvcg",
                "authenticator": "Push Notification Authenticator",
                "idp": "LOCAL",
                "metadata": {
                  "i18nKey": "authenticator.push.notification",
                  "promptType": "INTERNAL_PROMPT",
                  "additionalData": {
                    "statusEndpoint": "https://localhost:3000/push-auth/check-status?pushAuthId=2dbcf154-dcc0-4497-a087-6db477ff818e"
                  }
                },
                "requiredParams": [
                  "scenario"
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

    !!! important
        Push notification based authentication does not require any user input like other authenticators do. If the user
        has a device registered to receive push notifications, the notification will be sent during the execution of the
        authenticator. Hence, If you are getting the above response for the first step, it means that the push authenitcator
        has been executed and the notification has been already sent.

- **Step 3**: Ping to the status endpoint to check the status of the ongoing push authentication request.

    To complete push-based authentication, the authentication response must be sent from the registered device. The registered device will initiate a push authentication request directly to {{product_name}}.

    To verify the status of the push authentication request, poll the status endpoint provided in the previous response. The possible status values are:

      1. **PENDING**: The push authentication request has not yet been initiated by the registered device.
      2. **COMPLETED**: The push authentication request has been received and successfully processed by {{product_name}}.

    !!! note
        This step is only applicable for the push notificaion based authenticator and not part of the default app native authentication flow.

    Once the status changes to **COMPLETED**, proceed with the next /authn request as outlined in the subsequent step.

    === "Request"
    
        ```bash
        curl --location '{{check_status_endpoint}}push-auth/check-status?pushAuthId=92e0d286-e24b-471e-a2cf-6ba3a969a982' 
        ```
    
    === "Response"
    
        ```json
        {
          "status": "PENDING"
        }
        ```

- **Step 4**: Carry the same `flowId` and request the `/authn` endpoint for Push Notification authentication.

    In order to continue the push notification based authentication flow, the `scenario` has to be set to **PROCEED_PUSH_AUTHENTICATION** as shown in the request below.

    !!! note
        As this is the final step configured for the application, the `/authn` endpoint returns an authorization code upon successful authentication.

    === "Request 2 (`/authn`)"
    
        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
          "flowId": "162b7547-e057-4c84-9237-1c7e69bdc122",
          "selectedAuthenticator": {
            "authenticatorId": "cHVzaC1ub3RpZmljYXRpb24tYXV0aGVudGljYXRvcg",
            "params": {
                "scenario": "PROCEED_PUSH_AUTHENTICATION"
            }
          }
        }'
        ```
    
    === "Response 2 (`/authn`)"
    
        ```json
        {
          "flowStatus": "SUCCESS_COMPLETED",
          "authData": {
          "code": "5f1b2c2a-1436-35a5-b8e4-942277313287"
          }
        }
        ```

  
  
