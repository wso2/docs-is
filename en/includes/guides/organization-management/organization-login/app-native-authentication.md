# App-native authentication for organizations

App-native authentication lets mobile and native applications handle B2B login without redirecting users to a browser. Users complete the full authentication flow from within the application, including any multi-factor authentication steps required by the organization.

!!! note "Before you begin"
    - [Set up app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/add-app-native-authentication/) for your application.
    - Ensure your application uses the **enhanced organization authentication** model. To verify, go to the **Shared Access** tab of your application in the {{ product_name }} Console and check that **Enhanced Organization Authentication** is enabled.

---

## Initiate organization login

The initial request follows the same structure as a standard app-native authentication request, with `response_mode=direct`. The difference is in the endpoint — it must target the organization rather than the root organization.

### Method 1: Initiate using direct organization path

Send the request directly to the organization's endpoint using the root organization handle and the accessing organization's ID.

=== "Sample request"

    ```bash
    curl --location 'https://{{host_name}}/t/<root_org_handle>/o/<org_id>/oauth2/authorize'
    --header 'Accept: application/json'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=<client_id>'
    --data-urlencode 'response_type=code'
    --data-urlencode 'redirect_uri=<redirect_uri>'
    --data-urlencode 'scope=<scopes>'
    --data-urlencode 'response_mode=direct'
    ```

Replace `<root_org_handle>` with the handle of your root organization and `<org_id>` with the accessing organization's ID.

The response includes the available authentication options for the organization.

=== "Sample response"

    ```json
    {
        "flowId": "<flow_id>",
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
                }
            ]
        },
        "links": [
            {
                "name": "authentication",
                "href": "https://{{host_name}}/t/<root_org_handle>/o/<org_id>/oauth2/authn",
                "method": "POST"
            }
        ]
    }
    ```

When the user provides their credentials, send them to the organization-scoped Authentication API endpoint.

=== "Sample request"

    ```bash
    curl --location 'https://{{host_name}}/t/<root_org_handle>/o/<org_id>/oauth2/authn'
    --header 'Accept: application/json'
    --header 'Content-Type: application/json'
    --data '{
        "flowId": "<flow_id>",
        "selectedAuthenticator": {
            "authenticatorId": "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM",
            "params": {
                "username": "<username>",
                "password": "<password>"
            }
        }
    }'
    ```

The final token request also uses the organization-scoped path:

=== "Sample request"

    ```bash
    curl --location 'https://{{host_name}}/t/<root_org_handle>/o/<org_id>/oauth2/token'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=<client_id>'
    --data-urlencode 'grant_type=authorization_code'
    --data-urlencode 'code=<code>'
    --data-urlencode 'redirect_uri=<redirect_uri>'
    ```

### Method 2: Initiate from root organization endpoint

Send the request to the root organization's endpoint.

=== "Sample request"

    ```bash
    curl --location 'https://{{host_name}}/t/<root_org_handle>/oauth2/authorize'
    --header 'Accept: application/json'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=<client_id>'
    --data-urlencode 'response_type=code'
    --data-urlencode 'redirect_uri=<redirect_uri>'
    --data-urlencode 'scope=<scopes>'
    --data-urlencode 'response_mode=direct'
    ```

The response includes the available authentication options for the root organization, along with an **SSO** option that lets the user identify their organization.

=== "Sample response"

    ```json
    {
        "flowId": "<flow_id>",
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
                    "authenticatorId": "T3JnYW5pemF0aW9uSWRlbnRpZmllckhhbmRsZXI6TE9DQUw",
                    "authenticator": "SSO",
                    "idp": "LOCAL",
                    "metadata": {
                        "i18nKey": "authenticator.organization.identifier"
                    }
                }
            ]
        },
        "links": [
            {
                "name": "authentication",
                "href": "https://{{host_name}}/t/<root_org_handle>/oauth2/authn",
                "method": "POST"
            }
        ]
    }
    ```

When the user selects the **SSO** option, send the organization selection response to the Authentication API along with a parameter that identifies the organization.

=== "Sample request"

    ```bash
    curl --location 'https://{{host_name}}/t/<root_org_handle>/oauth2/authn'
    --header 'Accept: application/json'
    --header 'Content-Type: application/json'
    --data '{
        "flowId": "<flow_id>",
        "selectedAuthenticator": {
            "authenticatorId": "T3JnYW5pemF0aW9uSWRlbnRpZmllckhhbmRsZXI6TE9DQUw",
            "params": {
                "orgHandle": "<org_handle>"
            }
        }
    }'
    ```

You can identify the organization using any of the following parameters:

| Parameter | Description |
|-----------|-------------|
| `orgId` | The organization's ID. |
| `orgHandle` | The organization's handle. |
| `org` | The organization's name. |
| `login_hint` | An email address used to discover the organization by its email domain. |
| `orgDiscoveryType` | The discovery mechanism to use (for example, `emailDomain`). |

See [Organization discovery]({{base_path}}/guides/organization-management/organization-login/organization-discovery/) for more on these parameters.

Once the user's organization is identified, {{ product_name }} scopes the remaining authentication steps to that organization. For example, the next authentication step — such as a username and password prompt — would be sent to the organization-scoped Authentication API endpoint:

=== "Sample request"

    ```bash
    curl --location 'https://{{host_name}}/t/<root_org_handle>/o/<org_id>/oauth2/authn'
    --header 'Accept: application/json'
    --header 'Content-Type: application/json'
    --data '{
        "flowId": "<flow_id>",
        "selectedAuthenticator": {
            "authenticatorId": "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM",
            "params": {
                "username": "<username>",
                "password": "<password>"
            }
        }
    }'
    ```

The final token request is sent to the root organization's token endpoint, matching the initial authorize call:

=== "Sample request"

    ```bash
    curl --location 'https://{{host_name}}/t/<root_org_handle>/oauth2/token'
    --header 'Content-Type: application/x-www-form-urlencoded'
    --data-urlencode 'client_id=<client_id>'
    --data-urlencode 'grant_type=authorization_code'
    --data-urlencode 'code=<code>'
    --data-urlencode 'redirect_uri=<redirect_uri>'
    ```

---

## Complete the authentication flow

After the initial request, {{ product_name }} returns instructions for the next authentication step. The rest of the flow — collecting user credentials, calling the Authentication API, and receiving the authorization code — is the same as regular app-native authentication.

See [Add app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/add-app-native-authentication/) for the full step-by-step flow.

---

## What's next

- [Add app-native authentication]({{base_path}}/guides/authentication/app-native-authentication/add-app-native-authentication/) — Full guide to setup and the authentication flow.
- [Handle advanced login scenarios]({{base_path}}/guides/authentication/app-native-authentication/handle-advanced-login-scenarios/) — SSO, multi-option login, and federated authentication.
