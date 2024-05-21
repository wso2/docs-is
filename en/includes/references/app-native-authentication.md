# App-native authentication

Applications usually depend on external web browsers for login. This means that users logging into an application are directed away from the application's environment to a web browser to complete the login process. This is not ideal if your priority is to implement a seamless login experience.

App-native authentication was introduced as a solution to this problem. By adopting an API-based approach, app-native authentication provides developers means to develop a secure login process within the application.

The following diagram illustrates the high-level steps involved with app-native authentication.

![app-native-authentication-sequence]({{base_path}}/assets/img/guides/app-native-authentication/app-native-authentication-sequence.png){: width="650" style="display: block; margin: 0; border: 0px;"}

!!! note
    Learn how to [implement app-native authentication in {{product_name}}]({{base_path}}/guides/authentication/app-native-authentication/add-app-native-authentication)

## How does it work?

This section digs deep into the steps involved in app-native authentication and the associated API calls.

1. Applications initiate app-native authentication using an OAuth 2.0 authorization code request by setting the `response_mode` to `direct` as shown below.

	=== "Sample request (`/authorize`)"
	
		```java
		curl --location '{{api_base_path}}'
		--header 'Accept: application/json'
		--header 'Content-Type: application/x-www-form-urlencoded'
		--data-urlencode 'client_id=<client_id>'
		--data-urlencode 'response_type=<response_type>'
		--data-urlencode 'redirect_uri=<redircet_url>'
		--data-urlencode 'state=<state>'
		--data-urlencode 'scope=<space separated scopes>'
		--data-urlencode 'response_mode=direct'
		```
	
	=== "Example (`/authorize`)"
	
		```java
		curl --location '{{api_example_base_path}}'
		--header 'Accept: application/json'
		--header 'Content-Type: application/x-www-form-urlencoded'
		--data-urlencode 'client_id=VTs12Ie26wb8HebnWercWZiAhMMa'
		--data-urlencode 'response_type=code'
		--data-urlencode 'redirect_uri=https://example-app.com/redirect'
		--data-urlencode 'state=logpg'
		--data-urlencode 'scope=openid internal_login'
		--data-urlencode 'response_mode=direct'
		```

    !!! note
	      Learn how to [implement login using the authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/).


2. The application receives the following response that contains key components like the **flowId** parameter that uniquely identifies the login flow and the **authenticators** array that contains the authentication options available for the first step.
    
    ``` json
    {
      "flowId": "3bd1f207-e5b5-4b45-8a91-13b0acfb2151",
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
                  "isConfidential": false,
                  "order": 1,
                  "i18nKey": "param.username"
                }
              ]
            },
            "requiredParams": [
              "username",
              "password"
            ]
          }
        ],
        "acceptErrorParams": false,
        "messages": [
          {
            "type": "ERROR",
            "messageId": "msg_invalid_un_pw",
            "message": "Invalid username or password.",
            "i18nKey": "message.msg_invalid_un_pw",
            "context": [
              {
                "key": "remainingAttempts",
                "value": "2"
              }
            ]
          }
        ]
      },
      "links": [
        {
          "name": "authentication",
          "href": "/api/authenticate/v1",
          "method": "POST"
        }
      ]
    }
    ```
  
    ??? note "Learn about the parameters"

        - **flowId**: A unique identifier for the entire authentication flow.
        - **flowStatus**: Indicates the status of the authentication flow. Possible values are `INCOMPLETE`, `FAILED_INCOMPLETE`, and `SUCCESS_COMPLETED`.
        - **nextStep**: Contains the details of the next step in the authentication flow.
        - **stepType**: The type of the next step. Possible values are `MULTI_OPTIONS_PROMPT` and `AUTHENTICATOR_PROMPT`. 
                MULTI_OPTIONS_PROMPT indicates that the user has multiple options to choose from, while AUTHENTICATOR_PROMPT 
            indicates that the user has to authenticate using a specific authentication option.
        - **authenticators**: The list of authentication options available for the next step. If the stepType is `AUTHENTICATOR_PROMPT`, the list will only contain one authentication option.
        - **authenticatorId**: The unique identifier of the authenticator. This id is mutable and can change based on the authenticator configuration.
        - **authenticator**: The name of the authenticator.
        - **idp**: The Identity Provider of the authenticator. This will be `LOCAL` for local authenticators and will contain the IDP name for federated authenticators.
        - **metadata**: The metadata related to the authentication option.
        - **promptType**: The type of the prompt. Possible values are `USER_PROMPT`, `INTERNAL_PROMPT`, and `REDIRECTION_PROMPT`. 
                    Authentication options that require user interaction will have the prompt type as `USER_PROMPT`. 
                    Authentication options that require the application to perform an action will have the prompt type 
                    as `INTERNAL_PROMPT`. Authentication options that require the application to redirect the user to a 
                    different URL will have the prompt type as `REDIRECTION_PROMPT`.
        - **params**: When the prompt type is `USER_PROMPT`, this will contain the list of input parameter metadata to render the UI.
        - **additionalData**: Additional data required to complete the authentication step. Ex: Redirect URL for federated authentication.
        - **requiredParams**: The required parameters for the authentication option. These are the parameters that the application must send to the authentication API in the next request to complete the authentication step.
        - **messages**: The info and error messages related to the authentication option.
        - **i18nKey**: The internationalization key. This key will be available many places of the response and can be used where content localization is required.

3. The application then gathers the credentials for one of the presented authentication options from the user.

4. The applcation makes a POST request to the `/authn` endpoint using the **Authentication API**. The payload of this request includes the **flowId** and the **selectedAuthenticator** object which contains credentials for the user-selected authentication option.

    !!! note
        Explore the OpenAPI definition of the [authentication API]({{base_path}}/apis/app-native-authentication-api/).
  
    === "Sample payload (`/authn`)"
        ```json
        {
        "flowId": "{flowId received from the initial response}",
        "selectedAuthenticator": {
            "authenticatorId": "{authenticator id for the selected authenticator}",
            "params": {
                "{requested parameters from the authenticator}"
            }
        }
        }
        ```
    === "Example (`/authn`)"
        ``` json
        {
        "flowId": "3bd1f207-e5b5-4b45-8a91-13b0acfb2151",
        "selectedAuthenticator": {
            "authenticatorId": "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM",
            "params": {
            "username": "johnd",
            "password": "U$3r"
            }
        }
        }
        ```
  
    ??? note "Learn about the parameters"
        - **flowId**: A unique identifier for the entire authentication flow. This is provided in the initial     response forthe auth request.
        - **selectedAuthenticator**: The authenticator selected by the user for authentication.
        - **authenticatorId**: The unique identifier of the authenticator.
        - **params**: The values entered by the user for the parameters required for authentication.

5. The authentication API responds with a similar payload as step 2 above. This response contains the **authenticators** array that contains the authentication options available for the next step.

6. Steps 3-5 repeats for all the steps of the login flow.

7. The authentication flow completes when the application receives an OAuth 2.0 authorization code with the relevant OAuth 2.0 artifacts in a json format as shown below.
	```json
	{
	   "code": "6ff8b7e1-01fc-39b9-b56d-a1f5826e6d2a",
	   "state": "logpg",
	   "session_state": "43b1ffc92c8d349942e99bd0270fca05f934ad6f612b27f40a5fa60b96bd0iD4RK8Etr4XruxnYMEvcKQ"
	}
	```

## Sample scenarios

The following are several sample scenarios in which users can be logged in using app-native authentication. Each scenario goes through a single or multiple interactions with the `/authn` endpoint based on the number of steps configured for the application.

### Scenario 1: Log in with a username & password

The application goes through the following steps to complete app-native authentication for a user logging in with username & password.

- **Step 1**: Initiate the request with the `/authorize` endpoint.

    !!! note
        The response contains information on the first authentication step (the only step for this flow).

    === "Request(`/authorize`)"

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
          "flowId": "bea32017-7124-4b7a-ab31-17633754d04d",
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
        As this is the only step configured for the application, the `/authn` endpoint returns an authorization code, upon successful authentication.

    === "Request (`/authn`)"

        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
            "flowId": "bea32017-7124-4b7a-ab31-17633754d04d",
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
          "flowStatus": "SUCCESS_COMPLETED",
          "authData": {
            "code": "bbb0bsdb-857a-3a80-bfbb-48038380bf79"
          }
        }
        ```

### Scenario 2: 2FA with username & password and TOTP

The application goes through the following steps to complete app-native authentication for a user logging in with username & password in the first step and TOTP in the second step.

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
                "authenticatorId": "dG90cDpMT0NBTA",
                "authenticator": "TOTP",
                "idp": "LOCAL",
                "metadata": {
                  "i18nKey": "authenticator.totp",
                  "promptType": "USER_PROMPT",
                  "params": [
                    {
                      "param": "token",
                      "type": "STRING",
                      "order": 0,
                      "i18nKey": "totp.authenticator",
                      "displayName": "Token",
                      "confidential": false
                    }
                  ]
                },
                "requiredParams": [
                  "token"
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

- **Step 3**: Carry the same `flowId` and request the `/authn` endpoint for TOTP authentication.

    !!! note
        As this is the final step configured for the application, the `/authn` endpoint returns an authorization code upon successful authentication.

    === "Request 2 (`/authn`)"

        ```bash
        curl --location '{{authn_path}}' \
        --header 'Content-Type: application/json' \
        --data '{
          "flowId": "162b7547-e057-4c84-9237-1c7e69bdc122",
          "selectedAuthenticator": {
            "authenticatorId": "dG90cDpMT0NBTA",
            "params": {
                "token": "609357"
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
