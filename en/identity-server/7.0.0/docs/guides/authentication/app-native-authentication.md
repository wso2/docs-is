# App-Native Authentication

In a conventional mobile application, users are typically redirected to an external web browser during login. 
However, with App-Native Authentication, developers can integrate the complete authentication flow 
within the application itself giving the end-user a seamless login experience.

App-Native Authentication extends the OAuth 2.0 protocol and introduces a new Authentication API to incorporate 
comprehensive authentication features, including Multi-Factor Authentication (MFA), Adaptive Authentication, and support 
for federated logins, directly within the application.

![app-native-authentication-flow]({{base_path}}/assets/img/guides/app-native-authentication/app-native-authentication-flow.png){: width="1000" style="display: block; margin: 0; border: 0px;"}

## How it works
App-Native Authentication is an extension to the OAuth 2.0 protocol. Hence, the initial request made by the 
application is similar to a typical OAuth 2.0 authorization code request with a single difference; the `response_mode` 
parameter is set to `direct`. Thereafter, the client application interacts with the Authentication API to complete the 
authentication flow. 

### Authentication API

The Authentication API is an interactive stateful API which operates on a request-response model that facilitates a 
multi-step authentication process within applications. Upon initiating an authentication request, the server responds with 
instructions for the next step in the authentication flow. This process involves a series of exchanges where the 
application sends data or performs actions as dictated by the server's responses. The interaction continues, step by step, 
until authentication is successfully completed and the API returns an OAuth2 authorization code which can then be exchanged 
for an access token.

![app-native-authentication-sequence]({{base_path}}/assets/img/guides/app-native-authentication/app-native-authentication-sequence.png){: width="650" style="display: block; margin: 0; border: 0px;"}

!!! tip "OpenAPI definition"
    Go through the OpenAPI definition of the [Authentication API]({{base_path}}/apis/authentication-api/){: target="#"} 
    in order to understand the API.

??? tip "Key constructs of the Authentication API" 
    This section provides an overview of the key constructs of the Authentication API. Refer the 
    [OpenAPI definition]({{base_path}}/apis/authentication-api/){: target="#"} for a complete list of constructs.
    
    ##### Request
    
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
    
    - **flowId**: A unique identifier for the entire authentication flow. This is provided in the initial response for the auth request. 
    - **selectedAuthenticator**: The authenticator selected by the user for authentication.
    - **authenticatorId**: The unique identifier of the authenticator.
    - **params**: The parameters required by the authenticator for authentication.
    
    ##### Response
    
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
    - **requiredParams**: The required parameters for the authentication option. These are the parameters that 
                    the application must send to the authentication API in the next request to complete the authentication step.
    - **messages**: The info and error messages related to the authentication option.
    - **i18nKey**: The internationalization key. This key will be available many places of the response and can be used where content localization is required.

??? tip "Sample scenarios"
    #### Scenario 1: The application has a login flow configured with a Username & Password authentication option.
    
    **Request #1**
    
    ##### Request
    ```bash
    curl --location 'https://localhost:9443/oauth2/authorize' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka' \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'redirect_uri=https://example.com/home' \
    --data-urlencode 'scope=openid profile' \
    --data-urlencode 'response_mode=direct'
    ```
    
    ##### Response
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
          "href": "https://localhost:9443/oauth2/authn",
          "method": "POST"
        }
      ]
    }
    ```
    
    **Request #2**
    
    ##### Request
    ```bash
    curl --location 'https://localhost:9443/oauth2/authn' \
    --header 'Content-Type: application/json' \
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
    
    ##### Response
    ```json
    {
      "flowStatus": "SUCCESS_COMPLETED",
      "authData": {
        "code": "bbb0bsdb-857a-3a80-bfbb-48038380bf79"
      }
    }
    ```
    </br>
    #### Scenario 2: The application has a login flow configured with a Username & Password authentication as step 1 and TOTP authentication as step 2.
    
    **Request #1**
    
    ##### Request
    ```bash
    curl --location 'https://localhost:9443/oauth2/authorize' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka' \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'redirect_uri=https://example.com/home' \
    --data-urlencode 'scope=openid profile' \
    --data-urlencode 'response_mode=direct'
    ```
    
    ##### Response
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
          "href": "https://localhost:9443/oauth2/authn",
          "method": "POST"
        }
      ]
    }
    ```
    
    **Request #2**
    
    ##### Request
    ```bash
    curl --location 'https://localhost:9443/oauth2/authn' \
    --header 'Content-Type: application/json' \
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
    
    ##### Response
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
          "href": "https://localhost:9443/oauth2/authn",
          "method": "POST"
        }
      ]
    }
    ```
    
    **Request #3**
    
    ##### Request
    ```bash
    curl --location 'https://localhost:9443/oauth2/authn' \
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
    
    ##### Response
    ```json
    {
      "flowStatus": "SUCCESS_COMPLETED",
      "authData": {
        "code": "5f1b2c2a-1436-35a5-b8e4-942277313287"
      }
    }
    ```

### When to use App-Native Authentication
For applications, adopting the browser-based authentication approach is the standard recommendation due to its straightforward 
implementation and enhanced security, leveraging direct user interactions with {{product_name}} to mitigate the complexity 
and risks associated with handling sensitive authentication data. App-Native Authentication becomes suitable when 
a seamless user experience is paramount, and the application's design necessitates keeping the user within the app's environment.
However, Application Native Authentication should only be used by the organization's own applications and should not be used
with third-party applications as the user credentials will be exposed to third parties.

!!! warning "Limitations of App-Native Authentication"

	App-Native Authentication has the following limitations compared to a browser-based authentication flow:

	- Does not prompt for user consent for attribute sharing or access delegation.
	- Does not prompt the user to provide missing mandatory attributes.
	- Does not support prompts in adaptive authentication flows.
	- Entire authentication flow cannot be initiated if a non supported authentication option is configured for the application.
	- Cannot enroll authenticators (e.g. TOTP authenticator) during authentication.

## Try out
Follow the steps below to try out App-Native Authentication with {{product_name}}.

### Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/).

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) in {{ product_name }}.

### Enable App-Native Authentication

Follow the steps below to enable app-native authentication for your application.

1. On {{product_name}} Console, go to **Applications**.

2. Go to the **Protocol** tab and select **Code** from **Allowed grant types**.

3. Click **Update** to save the changes.

4. Go to the **Advanced** tab of your application and select **Enable app-native authentication API**.

    ![Enable app-native authentication]({{base_path}}/assets/img/guides/app-native-authentication/enable-app-native-authentication.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the changes.

6. Go to the **Login flow** tab and configure a login flow with the supported authentication options.

    ??? tip "Finding supported authentication options in the login flow"
        Supported authentication options are tagged with `#APIAuth`.
        <br><br>
        ![Supported authentication options]({{base_path}}/assets/img/guides/app-native-authentication/supported-authentication-options.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

7. Click **Update** to save the changes.

!!! tip "Postman collection"
    Try out App-Native Authentication using Postman. 

    [![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/8657284-8d164672-61aa-4326-bc5e-30314c49f6d0){: target="#"}

### Secure the authentication request
In App-Native Authentication scenarios, the users input their credentials
directly into the application. Due to this, an adversary, potentially mimicking a legitimate application may attempt 
to impersonate the client application to capture user credentials. 

App-Native Authentication uses the Authentication API which is an open API that does not require any form of 
authentication. You can implement the following mechanisms to secure the authentication request (The below mechanisms 
are applicable for the initial authentication request and all subsequent requests are bound to it via the flow id, 
which prevents alterations mid-process).

- **Client attestation** - If the application is published in the Apple App Store or Google Play Store, attestation 
        capabilities provided by the platform can be used to ensure the request originated from the legitimate client application.
- **Client authentication** - If the application is capable of securely storing a client secret (confidential client), 
      client authentication can be used to secure the request.

#### Using client attestation
If the application is hosted either in the Apple App Store or the Google Play Store, follow the steps below to leverage 
the attestation services provided by these platforms to verify the legitimacy of the client.

1. On the {{product_name}} Console, go to **Applications**.
2. Go to the **Advanced** tab of your application and select **Enable client attestation**.
3. Select either **Apple** or **Android** to specify which attestation service you wish to use.

4. Provide details about the attestation service.

	![Enable client attestation]({{base_path}}/assets/img/references/enable-client-attestation.png){: width="600" style="display: block; margin: 0;"}

	a. **For android**:

    !!! tip
	    By leveraging the Google Play Integrity API, {{product_name}} ensures a heightened level of security for Application Native Authentication. It actively detects and responds to potential threats, thereby safeguarding against attacks and mitigating the risk of abuse.
	    Learn more about the [Play Integrity API](https://developer.android.com/google/play/integrity/overview).

	- Provide the package name of the application which takes the format of the reverse domain format (e.g. com.example.myapp)

	- Provide the service account credentials.
		
		!!! note
			Learn more about [service account credentials](https://cloud.google.com/iam/docs/service-account-creds).

	b. **For apple**:

    !!! tip
	    By leveraging DCAppAttestService, {{product_name}} adds an extra layer of security to Application Native Authentication for iOS apps. It actively detects and responds to potential threats, safeguarding against unauthorized access and malicious activities.
	    Learn more about [Apple's DeviceCheck Attest Service](https://developer.apple.com/documentation/devicecheck/dcappattestservice)

	- Provide the app ID of your application which consists of the Team ID and the bundle ID separated by a period (.). (e.g. A1B2C3D4E5.com.domainname.applicationname)

5. Click **Update** to save the changes.

!!! tip "Using client attestation in the request"
    The client application should obtain the attestation object from the platform and pass it {{product_name}} via the 
    `x-client-attestation` header in the initial authentication request.

    === "Sample request"

        ```bash
        curl --location 'https://localhost:9443/oauth2/authorize' \
        --header 'x-client-attestation: <attestation_object>' \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'client_id=<client_id>' \
        --data-urlencode 'response_type=code' \
        --data-urlencode 'redirect_uri=<redirect_uri>' \
        --data-urlencode 'scope=<scope>' \
        --data-urlencode 'response_mode=direct'
        ```

    === "Example"
    
        ```bash
        curl --location 'https://localhost:9443/oauth2/authorize' \
        --header 'x-client-attestation: eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2R0NNIn0.O1miRMXle8A4hLH46VkxHgdU9i1-ow...' \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka' \
        --data-urlencode 'response_type=code' \
        --data-urlencode 'redirect_uri=https://example.com/home' \
        --data-urlencode 'scope=openid profile' \
        --data-urlencode 'response_mode=direct'
        ```

#### Using client authentication
Confidential clients that are able to securely store a secret can make use of client authentication to secure authentication requests. 

The initial authentication request is an OAuth 2.0 Authorization request, any [supported authentication mechanism]({{base_path}}/references/app-settings/oidc-settings-for-app/#client-authentication) 
for an OAuth confidential client can be used to secure this request. There are no additional configurations required to enable 
client authentication. However, make sure that application is **not** marked as a "Public client" in the application 
configurations under "Client Authentication" in the "Protocol" section. Furthermore, if preferred, [Pushed Authorization Requests (PAR)]({{base_path}}/guides/authentication/oidc/implement-login-with-par/)
can also be used to initiate the authentication request.

!!! tip "Using client authentication in the request"
    The following is a sample request using client secret based authentication.

    === "Sample request"

        ```bash
        curl --location 'https://localhost:9443/oauth2/authorize' \
        --header 'Authorization: Basic <base64encoded(client_id:client_secret)>' \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'client_id=<client_id>' \
        --data-urlencode 'response_type=code' \
        --data-urlencode 'redirect_uri=<redirect_uri>' \
        --data-urlencode 'scope=<scope>' \
        --data-urlencode 'response_mode=direct'
        ```

    === "Example"
    
        ```bash
        curl --location 'https://localhost:9443/oauth2/authorize' \
        --header 'Authorization: Basic WFd4N0RlVGlSNU13SGRYUk9HaUprYTpmVDlCN0RJTGZ3MWZVUmpQRVpHOG9fWFA4Q20ySFFQOEhBclJFhNYQ==' \
        --header 'Accept: application/json' \
        --header 'Content-Type: application/x-www-form-urlencoded' \
        --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka' \
        --data-urlencode 'response_type=code' \
        --data-urlencode 'redirect_uri=https://example.com/home' \
        --data-urlencode 'scope=openid profile' \
        --data-urlencode 'response_mode=direct'
        ```


### Handling SSO
With app-native authentication there are two ways that Single Sign-On (SSO) can be handled for user sessions.

#### Cookie based SSO

App-native authentication, just as the OAuth authorization code flow, sets an SSO cookie (commonAuthId). If the cookie 
is preserved, any subsequent authorization request that occurs with this cookie will automatically perform SSO.

#### SessionId based SSO

SessionId parameter based SSO is useful if the implementation does not maintain cookies. The id_token that the application 
receives after the initial authentication request, contains the `isk` claim. When making a subsequent authorization request the `isk` value can be used as the `sessionId` for SSO to occur.

Given below is a sample authorization request using the `isk` value as the `sessionId`

=== "Sample request"

    ```bash
    curl --location 'https://localhost:9443/oauth2/authorize' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'client_id=<client_id>' \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'redirect_uri=<redirect_uri>' \
    --data-urlencode 'scope=<scope>' \
    --data-urlencode 'response_mode=direct' \
    --data-urlencode 'sessionId=<isk claim obtained from the id_token>'
    ```

=== "Example"

    ```bash
    curl --location 'https://localhost:9443/oauth2/authorize' \
    --header 'Accept: application/json' \
    --header 'Content-Type: application/x-www-form-urlencoded' \
    --data-urlencode 'client_id=XWRkRNkJDeTiR5MwHdXROGiJka' \
    --data-urlencode 'response_type=code' \
    --data-urlencode 'redirect_uri=https://example.com/home' \
    --data-urlencode 'scope=openid profile' \
    --data-urlencode 'response_mode=direct' \
    --data-urlencode 'sessionId=77961448dd65199ec519fee4685553fe153e9d7bb80e26e41cb5cedc89a2b731'
    ```

!!! note
    If both cookie based SSO and SessionId based SSO are used, cookie based SSO takes precedence.
