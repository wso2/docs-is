# Pre-issue access token action

The pre-issue access token action in {{product_name}} allows you to execute custom logic before issuing an access token. This action is triggered during the OAuth2 token issuance process, enabling you to modify the access token or implement additional checks before the token is issued.

You can use this functionality to:

- Add, modify, or remove scopes.
- Add, modify, or remove audience values.
- Modify or remove user attributes incorporated into the access token.
- Add custom claims (only string, number, boolean, and string type arrays are allowed).
- Update the validity period of the access token.

Once an access token is modified, the changes are persisted as transactional data (for the period access token is active, until it is purged from the underlying data store). In subsequent flows, the modified access token is made available to applications, resource servers, and any actions engaged in later flows. For example, if an access token is modified during the authorization code flow, the same modified access token is used in the refresh token flow.

!!! note
    Currently, this action can only be applied at the root organization level and is available exclusively for <code>JWT</code> tokens. It supports the following grant types: <code>authorization code</code>, <code>client credentials</code>, <code>password</code>, and <code>refresh token</code>.

## How pre-issue access token action works

When a pre-issue access token action is configured with your external service endpoint, {{product_name}} will call your service and wait for a response whenever a token request is received. Upon receiving the response, {{product_name}} will apply any modifications to the access token as specified in the response and then continue with the flow.

The [pre-issue access token API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/api-contract/) defines the request and response structures that your service must implement.

### Request from {{product_name}}

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>requestId</td>
<td><p>A unique correlation identifier that associates with the token request received by {{product_name}}.</p></td>
</tr>
</tr>
<tr class="even">
<td>actionType</td>
<td><p>Specifies the action being triggered, which in this case is <code>PRE_ISSUE_ACCESS_TOKEN</code>.</p></td>
</tr>
<tr class="odd">
<td>event</td>
<td><p>Contains context information relevant to access token issue flow. Refer <a href="#event">event</a> section for details.</p> </p></td>
</tr>
<tr class="even">
<td>allowedOperations</td>
<td><p>Specifies the objects within the event data that can be modified. Refer <a href="#allowed-operations">allowedOperations</a> section for details.</p></td>
</tr>
</tbody>
</table>

#### event
<a name="event"></a>

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>event.request</td>
<td>
<p>This property encapsulates the details of the access token request, including parameters and headers. It provides the following specific properties.</p>
<table>
<tbody>
<tr>
<td>clientId</td>
<td>The unique identifier of the client (application) that is requesting the access token.</td>
</tr>
<tr>
<td>grantType</td>
<td>The type of OAuth2 grant used for the token request, such as authorization code, client credentials, password, or refresh token. This defines the flow that is being used to obtain the access token.</td>
</tr>
<tr>
<td>scopes</td>
<td>The scopes requested by the client, which define the permissions associated with the access token. Scopes determine what resources the access token will grant access to.</td>
</tr>
<tr>
<td>additionalHeaders</td>
<td>Any additional HTTP headers included in the access token request. These may contain custom information or metadata that the client has sent.
All headers in request are not incorporated specially sensitive headers like ‘Authorization’, ‘Cookie’, etc.</td>
</tr>
<tr>
<td>additionalParams</td>
<td>Any additional parameters included in the access token request. These may be custom parameters defined by the client or necessary for specific flows.
All request parameters are not incorporated, specially sensitive parameters like client secret, username and password, etc.</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tr>
<tr class="even">
<td>event.tenant</td>
<td><p>This property represents the root organization(tenant) under which the token request is being processed.</p>
<tr class="odd">
<td>event.user</td>
<td><p>This property contains information about the authenticated user associated with the token request.</p>
</td>
</tr>
<tr class="even">
<td>event.userStore</td>
<td><p>This property indicates the user store in which the user's data is being managed.</p>
</td>
</tr>
<tr class="odd">
<td>event.accessToken</td>
<td><p>This property represents the access token that is about to be issued. It contains claims and scopes, of the access token which can then be modified by your external service based on the logic implemented in the pre-issue access token action.
.</p>
<table>
<tbody>
<tr>
<td>claims</td>
<td><p>This property is an array that contains both standard access token claims and any OpenID Connect (OIDC) claims configured to be included in the access token.</p>
<p>Standard claims:</p>
<table>
<tbody>
<tr>
<td>sub</td>
<td>The subject identifier for the token, typically representing the user. In M2M apps that use client credentials this represents the application.</td>
</tr>
<tr>
<td>iss</td>
<td>The issuer of the token, which is the tenant of WSO2 Identity Server that act as the authorization server.</td>
</tr>
<tr>
<td>aud</td>
<td>The audience for the token.</td>
</tr>
<tr>
<td>client_id</td>
<td>The identifier of the client (application) that requested the token.</td>
</tr>
<tr>
<td>aut</td>
<td><p>The authorized user type associated with the token.</p>
<p>Can have the following values:</p>
<p><code>APPLICATION</code>: Indicates that the token is authorized for an application.
<code>APPLICATION_USER</code>: Indicates that the token is authorized for a user.</p>
</td>
</tr>
<tr>
<td>expires_in</td>
<td>The duration (in seconds) for which the token is valid.</td>
</tr>
<tr>
<td>binding_type</td>
<td>Indicates the <a href="{{base_path}}/references/token-binding/">type of binding</a> associated with the token, if applicable.</td>
</tr>
<tr>
<td>binding_ref</td>
<td>A reference identifier for the binding, if applicable.</td>
</tr>
<tr>
<td>subject_type</td>
<td>Specifies the type of subject (e.g., public or pairwise) as per OIDC specifications.
</td>
</tr>
</tbody>
</table>
<p>OIDC claims are any additional claims configured in the application to be included in the access token. These claims are based on the OIDC standard and may include user profile information such as email, given-name, or custom claims specific to the application.</p>
</td>
</tr>
<tr>
<td>scopes</td>
<td>Lists the permissions or access levels granted by the access token.</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr class="even">
<td>event.refreshToken</td>
<td><p>This property represents the refresh token associated with the token issuance event. It contains the claims related to the refresh token, such as expires_in. These claims can be modified by your external service during the pre-issue access token action based on custom logic.</p>
<table>
<tbody>
<tr>
<td>claims</td>
<td><p>This property is an array that contains the claims related to the refresh token.</p>
<table>
<tbody>
<tr>
<td>expires_in</td>
<td>The duration (in seconds) for which the refresh token is valid.</td>
</tr>
</tbody>
</table>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>

#### allowedOperations
<a name="allowed-operations"></a>

The allowedOperations property in the context of the pre-issue access token action defines the set of operations that your external service is permitted to perform on the access token's claims as well as on certain claims of the refresh token. This property is specifically related to the <code>event.accessToken</code> and <code>event.refreshToken</code> properties and outlines which attributes can have additional properties added, values replaced, or be removed. The <code>allowedOperations</code> are defined using JSON Patch modification semantics.

In the context of the pre-issue access token action, certain claims related to authorization decisions, such as audience (aud), access token validity (expires_in), and scopes (scopes), are allowed to be modified. These claims are typically associated with the resource server and influence how access is granted.

However, other standard access token claims, such as the issuer (iss) and token bindings (binding_type), represent the authorization server and are critical for authorization decisions. As such, these properties are not available for modification through the action. Instead, application and organization-level configurations should be used to change these properties and their associated behaviors.

Additionally, any OIDC claims incorporated into the access token are also allowed to be modified.

Here is the example of an allowedOperations object in a request formatted as a JSON payload:

```json
{
  "allowedOperations": [
    {
      "op": "add",
      "paths": [
        "/accessToken/claims/",
        "/accessToken/scopes/",
        "/accessToken/claims/aud/"
      ]
    },
    {
      "op": "remove",
      "paths": ["/accessToken/scopes/", "/accessToken/claims/aud/"]
    },
    {
      "op": "replace",
      "paths": [
        "/accessToken/scopes/",
        "/accessToken/claims/aud/",
        "/accessToken/claims/expires_in",
        "/refreshToken/claims/expires_in"
      ]
    }
  ]
}
```

#### Example request from {{product_name}}:

This example illustrates a request sent to an external service configured as a pre-issue access token action, for an application authorizing a user via the authorization code grant flow.

```http
POST /token HTTP/1.1
Host: localhost
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/json

{
    "actionType": "PRE_ISSUE_ACCESS_TOKEN",
    "event": {
        "request": {
            "additionalHeaders": {
                "host": [
                    "localhost:9443"
                ],
                "user-agent": [
                    "curl/7.79.1"
                ],
                "accept": [
                    "*/*"
                ]
            },
            "clientId": "1u31N7of6gCNR9FqkG1neSlsF_Qa",
            "grantType": "authorization_code"
        },
        "tenant": {
            "id": "-1234",
            "name": "carbon.super"
        },
        "user": {
            "id": "e204849c-4ec2-41f1-8ff7-ec1ebff02821"
        },
        "userStore": {
            "id": "UFJJTUFSWQ==",
            "name": "PRIMARY"
        },
        "accessToken": {
            "tokenType": "JWT",
            "scopes": [
                "email",
                "groups",
                "openid",
                "profile",
                "roles"
            ],
            "claims": [
                {
                    "name": "iss",
                    "value": "https://localhost:9443/oauth2/token"
                },
                {
                    "name": "client_id",
                    "value": "1u31N7of6gCNR9FqkG1neSlsF_Qa"
                },
                {
                    "name": "aut",
                    "value": "APPLICATION_USER"
                },
                {
                    "name": "expires_in",
                    "value": 3600
                },
                {
                    "name": "aud",
                    "value": [
                        "1u31N7of6gCNR9FqkG1neSlsF_Qa"
                    ]
                },
                {
                    "name": "subject_type",
                    "value": "public"
                },
                {
                    "name": "sub",
                    "value": "e204849c-4ec2-41f1-8ff7-ec1ebff02821"
                }
            ]
        },
        "refreshToken": {
            "claims": {
                {
                    "name": "expires_in",
                    "value": 86400
                }
            }
        }
    },
    "allowedOperations": [
        {
            "op": "add",
            "paths": [
                "/accessToken/claims/",
                "/accessToken/scopes/",
                "/accessToken/claims/aud/"
            ]
        },
        {
            "op": "remove",
            "paths": [
                "/accessToken/scopes/",
                "/accessToken/claims/aud/"
            ]
        },
        {
            "op": "replace",
            "paths": [
                "/accessToken/scopes/",
                "/accessToken/claims/aud/",
                "/accessToken/claims/expires_in",
                "/refreshToken/claims/expires_in"
            ]
        }
    ]
}
```

### Expected Response from External Service:

When {{product_name}} invokes your external service as part of the pre-issue access token action, it expects a response that adheres to the defined [API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/api-contract/) here.

This response plays a crucial role in determining how the access token is ultimately issued or modified. Here’s a breakdown of the expected response:

The response can have three possible states: <code>SUCCESS</code>, <code>FAILED</code>and <code>ERROR</code>.

<code>SUCCESS</code>: Indicates that the request was processed successfully, including any state changes or modifications that need to be applied.

<code>FAILED</code>: Represents a selective failure within the token flow due to validation logic or business rules enforced by your external service. A <code>400 (Client Error)</code> response is returned to the application, incorporating the failure message provided by your external service. It is your responsibility to supply an OAuth 2.0-compliant failure message when extending the flow.

<code>ERROR</code>: Indicates a processing failure, typically caused by server-side issues. A <code>500 (Server Error)</code> response is returned to the application.

#### Response for SUCCESS state:

When the external service responds with a 200 status code and a <code>SUCCESS</code> state, it indicates that the request was processed correctly and that any requested modifications to the access token or associated data have been completed. The response should include details about these modifications, typically in the form of an <code>operations</code> object that outlines the changes made to the token's claims, scopes, or other relevant attributes.

Http Status Code: <code>200</code>

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>actionStatus</td>
<td><p>Indicates the outcome of the request. For a successful operation, this should be set to <code>SUCCESS</code>.</p></td>
</tr>
</tr>
<tr class="even">
<td>operations</td>
<td><p>Define an array of operations that needs to be performed on the <code>event.accessToken</code> in the request. These operations must adhere to the [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902) modification format.</code>.</p></td>
</tr>
</tbody>
</table>

!!! tip
    Refer the [sample responses for successful access token updates]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/sample-success-responses/) to learn how to construct success responses for different scenarios.

#### Response for FAILED state:

When the external service returns a 200 OK status code with a <code>FAILED</code> state, it means the service has intentionally opted to prevent access token issuance. This decision is based on specific validation logic or business rules defined by your application's requirements.

The response body must be a JSON object containing the following properties:

Http Status Code: <code>200</code>

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>actionStatus</td>
<td><p>Indicates the outcome of the request. For a failed operation, this should be set to <code>FAILED</code>.</p></td>
</tr>
</tr>
<tr class="even">
<td>failureReason</td>
<td><p>Provides the reason for failing to issue an access token. This value will be mapped to the error field in the response returned from the /oauth2/token endpoint.</code>.</p></td>
</tr>
<tr class="odd">
<td>failureDescription</td>
<td><p>Offers a detailed explanation of the failure. This value will be mapped to the error_description field in the <code>/oauth2/token</code> endpoint response.</p></td>
</tr>
</tbody>
</table>

Below is an example of a failed response due to invalid scopes in the access token request.

Response from external service:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "FAILED",
  "failureReason": "invalid_scope",
  "failureDescription": "Scope platinum_state is invalid"
}
```

This will result in the following error response being sent to the application that initiated the token request.

Error response to the application:
```http
HTTP/1.1 400 
Content-Type: application/json

{
  "error": "invalid_scope",
  "error_description": "Scope platinum_state is invalid"
}
```

#### Response for ERROR state:

When the external service responds with an <code>ERROR</code> state, it can return an HTTP status code of 400, 401, or 500, indicating either a validation failure or an issue processing the request. 

Http Status Code: <code>400</code>, <code>401</code> or <code>500</code>

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>actionStatus</td>
<td><p>Indicates the outcome of the request. For an error operation, this should be set to <code>ERROR</code>.</p></td>
</tr>
</tr>
<tr class="even">
<td>errorMessage</td>
<td><p>Describes the cause of the error.</code>.</p></td>
</tr>
<tr class="odd">
<td>errorDescription</td>
<td><p>A detailed description of the error.</code>.</p></td>
</tr>
</tbody>
</table>

If the external service returns an error response (either defined or undefined) or fails to respond entirely, it will be treated as an error in executing the action. In any of these cases, the application that initiated the token request will receive a 500 Internal Server Error.

Below is an example of an error response returned by the service implementing the pre issue access token action.

Response from external service:
```http
HTTP/1.1 500
Content-Type: application/json

{
  "actionStatus": "ERROR",
  "errorMessage": "Server error",
  "errorDescription": "Error while processing request."
}
```

This will result in the following error response being sent to the application that initiated the token request.

Error response to the application:
```http
HTTP/1.1 500 
Content-Type: application/json

{
  "error":”server_error",
  "error_description": "Internal Server Error."
}

```

!!! note
    Currently, the <code>errorMessage</code> or <code>errorDescription</code> from the external service’s <code>ERROR</code> response is not directly included in the error response sent back to the application.
