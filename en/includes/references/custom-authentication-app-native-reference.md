### Scenario 9: User logs in with service based custom authentication

The application goes through the following steps to complete app-native authentication for a user logging in with service based custom authentication.

- **Step 1**: Initiate the request with the `/authorize` endpoint.

    !!! note
        The response contains information on the first authentication step (the only step for this flow).

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
                "authenticatorId": "Y3VzdG9tLWFiY19hdXRoZW50aWNhdG9y",
                "authenticator": "custom-abc_authenticator",
                "idp": "ABC Authenticator",
                "metadata": {
                    "i18nKey": "AbstractAuthenticatorAdapter",
                    "promptType": "INTERNAL_PROMPT",
                    "additionalData": {
                        "endpointUrl": "https://externalservice/authentication/userinput",
                        "state": "ec159061-2a93-415d-8786-652d4f344241"
                    }
                }
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
- **Step 2**: The application should interact with external service, and authenticate the user.  After it's complete, proceed with the next /authn request as outlined in the subsequent step.

    !!! important
        Service-based custom authentication is categorized under the `INTERNAL_PROMPT` prompt type authenticator, which requires the application to explicitly trigger the authentication option for the user. The application is responsible for handling and processing the data received and invoking the external authenticator accordingly.

- **Step 3**: Carry the same `flowId` and request the `/authn` endpoint for custom authentication.

    !!! note
        The application is not required to return the state or parameters with the /authn request.

    === "Request 2 (`/authn`)"
    
        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
          "flowId": "162b7547-e057-4c84-9237-1c7e69bdc122",
          "selectedAuthenticator": {
            "authenticatorId": "Y3VzdG9tLWFiY19hdXRoZW50aWNhdG9y",
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

    !!! note
        As this is the only step configured for the application, the `/authn` endpoint returns an authorization code, upon successful authentication.
