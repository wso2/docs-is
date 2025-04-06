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

        ```bash
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
        - **flowId**: A unique identifier for the entire authentication flow. This is provided in the initial response forthe auth request.
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

### Scenario 1: User logs in with a username & password

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
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
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

### Scenario 3: User selects passkey login out of multiple options

If a login step has multiple login options, the application goes through the following steps to complete passkey login with app-native authentication.

!!! note "Before you begin"

    To implement app-native authentication with passkeys on a mobile application, you must facilitate the relevant platform (iOS or Android) to validate your mobile application. Refer to the [Passkeys documentation]({{base_path}}/guides/authentication/passwordless-login/add-passwordless-login-with-passkey/#use-passkeys-with-app-native-authentication) for instructions.


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
          "flowId": "59b40c8b-4d2f-426f-a3fa-62d4ed28a169",
          "flowStatus": "INCOMPLETE",
          "flowType": "AUTHENTICATION",
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
                  },
                  {
                      "authenticatorId": "RklET0F1dGhlbnRpY2F0b3I6TE9DQUw",
                      "authenticator": "Passkey",
                      "idp": "LOCAL",
                      "metadata": {
                          "i18nKey": "authenticator.Fido"
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
  
    !!! tip
        Response for a multi-option login step has some key differences compared to that of a single-option step.

        1. **stepType** parameter returns MULTI_OPTIONS_PROMPT to indicate the availability of multiple   login options.

        2. For login options that require some form of user initiation (such as email/sms OTP, passkey), the **authenticators** array contains only the ID of the authenticator and not the required metadata.

- **Step 2**: The response in this example, returns two login options for the step. i.e. Username & password and passkey. Let's look at how each option works.

    - **Username & Password**: As this option does not need user initiation, the response from step 1 already contains the required metadata. Hence, if the user chooses to enter the username and password, the flow continues similar to as it does in *Scenario 1*.

    - **Passkey**: If a user initates passkey login, the application needs to make an additional request to the `/authn` endpoint to initiate the passkey flow and receive the related metadata.
  
    As the user continues with the passkey flow, the application makes a request to the `/authn` endpoint to initiate the passkey flow along with the `flowId` and the `authenticatorId` of the passkey authenticator as follows.

    === "Request (`/authn`)"
       
        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
          "flowId": "59b40c8b-4d2f-426f-a3fa-62d4ed28a169",
          "selectedAuthenticator": {
            "authenticatorId": "RklET0F1dGhlbnRpY2F0b3I6TE9DQUw"
            }
        }'
        ```
  
    === "Response (`/authn`)"
        
        ```json
        {
          "flowId": "59b40c8b-4d2f-426f-a3fa-62d4ed28a169",
          "flowStatus": "INCOMPLETE",
          "flowType": "AUTHENTICATION",
          "nextStep": {
            "stepType": "AUTHENTICATOR_PROMPT",
            "authenticators": [
              {
                "authenticatorId": "RklET0F1dGhlbnRpY2F0b3I6TE9DQUw",
                "authenticator": "Passkey",
                "idp": "LOCAL",
                "metadata": {
                  "i18nKey": "authenticator.Fido",
                  "promptType": "INTERNAL_PROMPT",
                  "additionalData": {
                      "challengeData": "eyJyZXF1ZXN0SWQiOiJ1b2hBYnRpSE9TaWJKbjN1Y0ZqdzZ4bFJxT
                                        zBqSlZ6NWtPdS1oWHRyb3JJIiwicHVibGljS2V5Q3JlZGVudGlhbFJ
                                        lcXVlc3RPcHRpb25zIjp7ImNoYWxsZW5nZSI6IjkxTGhoSWFBUFVzb
                                        TNERGllRXJpbDBJN2txdnFINVJldzhKcDctaGd3cEEiLCJycElkIjo
                                        ibG9jYWxob3N0IiwiZXh0ZW5zaW9ucyI6e319fQ"          
                  }
                },
                "requiredParams": [
                    "tokenResponse"
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

- **Step 3** - The application goes through the following steps to process passkey authentication.
    1. First, it extracts the `challengeData` value from the response and base64 decodes it to obtain the json-based challenge payload.
    2. Then, it invokes the platform APIs with the decoded challenge data.
    3. The user interacts with the application and presents a passkey.
    4. Upon successful authentication, the application receives the server response.

- **Step 4** - The application base64 encodes the response and includes it as the **tokenResponse** in the request to the `/authn` endpoint.

    !!! note
        As this is the only step configured for the application, the `/authn` endpoint returns an authorization code, upon successful authentication.

    === "Request (`/authn`)"
       
        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
            "flowId": "59b40c8b-4d2f-426f-a3fa-62d4ed28a169",
            "selectedAuthenticator": {
              "authenticatorId": "RklET0F1dGhlbnRpY2F0b3I6TE9DQUw",
                "params": {
                  "tokenResponse":
                  "eyJyZXF1ZXN0SWQiOiJ1b2hBYnRpSE9TaWJKbjN1Y0ZqdzZ4bFJxTzBqSlZ6NWtPdS1oWHRyb
                  3JJIiwiY3JlZGVudGlhbCI6eyJpZCI6Imc2OGF6eHhWeDZxUnhxQWllbEVwRHotaHVTZyIsInJ
                  lc3BvbnNlIjp7ImF1dGhlbnRpY2F0b3JEYXRhIjoiU1pZTjVZZ09qR2gwTkJjUFpIWmdXNF9rc
                  nJtaWhqTEhtVnp6dW9NZGwyTWRBQUFBQUEiLCJjbGllbnREYXRhSlNPTiI6ImV5SjBlWEJsSWp
                  vaWQyVmlZWFYwYUc0dVoyVjBJaXdpWTJoaGJHeGxibWRsSWpvaU9URk1hR2hKWVVGUVZYTnRNM
                  FJFYVdWRmNtbHNNRWszYTNGMmNVZzFVbVYzT0Vwd055MW9aM2R3UVNJc0ltOXlhV2RwYmlJNkl
                  taDBkSEJ6T2k4dmJHOWpZV3hvYjNOME9qZzBORE1pTENKamNtOXpjMDl5YVdkcGJpSTZabUZzY
                  zJVc0ltOTBhR1Z5WDJ0bGVYTmZZMkZ1WDJKbFgyRmtaR1ZrWDJobGNtVWlPaUprYnlCdWIzUWd
                  ZMjl0Y0dGeVpTQmpiR2xsYm5SRVlYUmhTbE5QVGlCaFoyRnBibk4wSUdFZ2RHVnRjR3hoZEdVd
                  UlGTmxaU0JvZEhSd2N6b3ZMMmR2Ynk1bmJDOTVZV0pRWlhnaWZRIiwic2lnbmF0dXJlIjoiTUV
                  VQ0lRQ0xWSGF2c1FkZHhDVElfQkxFS053WG5rUDZpb3AwcldzRjlEMHJyVFRNdkFJZ0hqM1JhM
                  W55UmU5ckdWVWcxd3NhbThudExobW5QbWpLbFRJLTZhaDJzSmMiLCJ1c2VySGFuZGxlIjoiTnp
                  EeU5tOWE0NEFmUktjeXJCQVR6M1RtQVFLaHAwNEQwd3B3Y01iYlE3MCJ9LCJjbGllbnRFeHRlb
                  nNpb25SZXN1bHRzIjp7fSwidHlwZSI6InB1YmxpYy1rZXkifX0"
                }
            }
        }'

        ```
  
    === "Response (`/authn`)"
        
        ```json
        {
          "flowStatus": "SUCCESS_COMPLETED",
          "authData": {
            "code": "7da717f3-b841-32c7-b97f-563a64350090"
          }
        }
        ```

### Scenario 4 : User selects federated authentication (Native mode)

The application goes through the following steps to complete app-native authentication for a federated authentication flow configured in the native mode. For this example, let's assume that the user logs in with Google.

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
          "flowId": "f7cab9e5-7a3b-41a9-8e0c-e45d13f22a69",
          "flowStatus": "INCOMPLETE",
          "flowType": "AUTHENTICATION",
          "nextStep": {
            "stepType": "AUTHENTICATOR_PROMPT",
            "authenticators": [
              {
                "authenticatorId": "R29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3I6R29vZ2xlTmF0aXZl",
                "authenticator": "Google",
                "idp": "GoogleNative",
                "metadata": {
                  "i18nKey": "authenticator.google",
                  "promptType": "INTERNAL_PROMPT",
                  "additionalData": {
                      "clientId": "237235402223-d8sedg6c3b68kb1j8.apps.googleusercontent.com",
                      "nonce": "bbe1a9a4-729d-4293-abb0-6825580efb97",
                      "scope": "openid email profile"
                  }
                },
                "requiredParams": [
                    "accessToken",
                    "idToken"
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

- **Step 2**: The application should interact with Google, usually through the Google SDK, and authenticate the user. Upon successful authentication, the application receives an access token and an ID token from Google.

    !!! tip "Important"
        - Pass the scopes received in the initial response to the authorization request made to Google. {{product_name}} expects the attributes provided by these scopes from Google.
        - The application should include the `nonce` value received from the initial response in the authentication request made to Google. {{product_name}} uses this value to validate the tokens received from Google. 

- **Step 3**: The application does the following when making the authentication request to the `/authn` endpoint.

    - Carry the `flowId` received in the initial response to uniquely identify the login flow.
    - Use the `clientId` found in the initial response to identify the relevant Google connector.
    - Include the ID token and the access token received from Google's response.

    !!! note
        As this is the only step configured for the application, the `/authn` endpoint returns an authorization code, upon successful authentication.

    === "Request (`/authn`)"

        ```bash
        curl --location '{{authn_path}}' \
        --header 'Content-Type: application/json' \
        --data '{
          "flowId": "f7cab9e5-7a3b-41a9-8e0c-e45d13f22a69",
          "selectedAuthenticator": {
            "authenticatorId": "R29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3I6R29vZ2xlTmF0aXZl",
            "params": {
            "accessToken": 
            "ya29.a0wedf9e3_Mbj1U3JiGTDmJMbfeaYKdGZbxy-G-MAwefjJiScaJHpZ9kSAC0w
            X1F5Lhg269dssQtV1kv1LsedzvweasvJgAulsAV8_qFss-fEcCoGqJAVwesdvfQnrQ0171",
            "idToken":
            "eyJhbGciOiJSUzI1NiIsImtpZCI6ImUxYjkzYzY0MDE0NGI4NGJkMDViZjI5NmQ2NzI2MmI
            2YmM2MWE0ODciLCJ0eXAiOiJKV1QifQ.sdgn023ewklsxm  calsdkalskfnmcoakslasjlkxncoealksnfcolaksnfcmoiasklnfcmoalksdfnvcmeoasdlk
            fjcmoeaskdfjcmoieaskfjcmieaskfmasfje09wr230ewfnmio23jewr0f92p3oewurjf0239e
            owrjf.T-vCBKhQbGC8-5ig3_9g3MoRvqHsOYRbSxXD3XLMtwuKw0pzkK9OW3vyV1m79SBvXLU5Z6ZvXp
            ml_3NjTgqJTAUvIV-Dw7HTjkjabdnfc98oi23khwnrfwdss5gsifH_VDIk_-ub7nbYfkP11UBoKFtah
            9eK8aUnaa4ZFG9-gYS0tgUeDNUm-8X4a6S_577tOlPekvE19oUVgBLZD1w7t7HMmHuBGMzPkfPEDmY2
            0UVo3GdoKXB4r0tXwRHUQ3rbqhMMf_HqByNnx40w"
            }
          }
        }'
        ```

    === "Response (`/authn`)"

        ```json
        {
          "flowStatus": "SUCCESS_COMPLETED",
          "authData": {
          "code": "4d34r89f3-c081-4427-94ea-745a6fc9ae21"
          }
        }
        ```

### Scenario 5: User selects federated authentication (Redirect mode)

The application goes through the following steps to complete app-native authentication for a federated authentication flow configured in the redirect mode. For this example, let's assume that the user logs in with Google.

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
          "flowId": "0ad36d10-56c3-496b-a326-2e3ba4ff5cd1",
          "flowStatus": "INCOMPLETE",
          "flowType": "AUTHENTICATION",
          "nextStep": {
            "stepType": "AUTHENTICATOR_PROMPT",
            "authenticators": [
              {
                "authenticatorId": "R29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3I6R29vZ2xl",
                "authenticator": "Google",
                "idp": "Google",
                "metadata": {
                  "i18nKey": "authenticator.google",
                  "promptType": "REDIRECTION_PROMPT",
                  "additionalData": {
                    "state": "b4764a2c-a445-4d52-a2eb-609991fe5b84,OIDC",
                      "redirectUrl": "https://accounts.google.com/o/oauth2/auth?response_type=code&
                                      redirect_uri=https%3A%2F%2Fexample-app.com%2Fredirect&state=b4764a2c-a445-4d52-a2eb-609991fe5b84%2COIDC&nonce=ad656495-011c-4fc5-9928-7e5207d869cd&client_id=230622702223-d86c3b0ahu68kg74as23592jtvomb1j8.apps.googleusercontent.com&scope=email+openid+profile"
                  }
                },
                "requiredParams": [
                    "code",
                    "state"
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

- **Step 2**: The application redirects the user to the URL received in the `redirectUrl` parameter of the response. The user will then interact with Google to complete the authentication. After it's complete, Google redirects the user back to the application.

    !!! tip
        The app can make use of the `state` parameter received in the initial response to correlate Google's response coming back to the app.

- **Step 3**: 
Carry the `flowId` and `state` parameters received in the initial response and the `code` parameter received in Google's response and request the `/authn` endpoint for authentication.

    !!! note
        As this is the only step configured for the application, the `/authn` endpoint returns an authorization code, upon successful authentication.

    === "Request (`/authn`)"

        ```bash
        curl --location '{{authn_path}}'
        --header 'Content-Type: application/json'
        --data '{
            "flowId": "0ad36d10-56c3-496b-a326-2e3ba4ff5cd1",
            "selectedAuthenticator": {
            "authenticatorId": "R29vZ2xlT0lEQ0F1dGhlbnRpY2F0b3I6R29vZ2xl",
            "params": {
              "code": "4/0cZFSWx-2d0MReJMLIt8EQW4kor8d53ZQNMX3eLWtwog",
              "state": "b4764a2c-a445-4d52-a2eb-609991fe5b84,OIDC"
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



