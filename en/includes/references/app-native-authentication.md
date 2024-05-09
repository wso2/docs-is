# App-native authentication

App-native authentication is an extension to the OAuth 2.0 protocol that enables users to login to native and mobile applications from the application itself, without being redirected to a web browser. This enables developers to keep the users within the context of the application and provide them with a seamless login experience.

This document contain detailed information on the **authentication API** that powers app-native authentication.

!!! note
    Explore the OpenAPI definition of the [authentication API]({{base_path}}/apis/app-native-authentication-api/).

## How does it work?

The following diagram illustrates the high-level steps involved with app-native authentication.

![app-native-authentication-sequence]({{base_path}}/assets/img/guides/app-native-authentication/app-native-authentication-sequence.png){: width="650" style="display: block; margin: 0; border: 0px;"}


1. User initiates a login request at the application's login page.
2. The application initiates an app-native authentication request.
3. The server responds with instructions for the next step of the authentication.
4. The application prompts for user input.
5. User interacts with the application and enters the credentials.
6. The application sends the response back to the server.

    !!! info
        Steps 3-6 repeat until the authentication flow is completed.

7. After a successful authentiation, the appliaction receives an OAuth2 authorization code.
8. The authorization code can then be exchanged for an access token.

## How Authentication API works

The [authentication API]({{base_path}}/apis/app-native-authentication-api/) is an interactive, stateful API that enables multi-step authentication. Let's look at how the authentication API is used in app-native authentication.

The following steps explain app-native authentication in detail.

1. When an application initiates an app-native login, it is done using an OAuth 2.0 authorization code request with the `response_mode` set to `direct` as shown below.


	!!! note
		Learn how to [implement login using the authorization code flow]({{base_path}}/guides/authentication/oidc/implement-auth-code/)

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

2. The application in return, receives a response that contain the **flowId** parameter.

    !!! note
        In app-native authentication, after the initial request to the `/authorize` endpoint, subsequent requests are made to the `/authn` endpoint. The **flowId** parameter is used to bind the requests made to the `/authn` endpoint to the initial request.

3. The application then sends a POST request to the `/authn` endpoint with a payload as shown below.


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
    ??? note "learn about the parameters"
        - **flowId**: A unique identifier for the entire authentication flow. This is provided in the initial     response for the auth request.
        - **selectedAuthenticator**: The authenticator selected by the user for authentication.
        - **authenticatorId**: The unique identifier of the authenticator.
        - **params**: The parameters required by the authenticator for authentication.

4. The response of the `/authn` endpoint will be as follows.


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

    ??? note "learn about the parameters"

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


5. The authentication flow completes when the application receives an OAuth 2.0 authorization code with the    relevant OAuth 2.0 artifacts in a json format as shown below.
	```json
	{
	   "code": "6ff8b7e1-01fc-39b9-b56d-a1f5826e6d2a",
	   "state": "logpg",
	   "session_state": "43b1ffc92c8d349942e99bd0270fca05f934ad6f612b27f40a5fa60b96bd0iD4RK8Etr4XruxnYMEvcKQ"
	}
	```

## Sample scenarios

The following are several sample scenarios in which users can be logged in using app-native authentication. Each scenario goes through a single or multiple interactions with the `/authn` endpoint based on the login flow configured for the application.

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
