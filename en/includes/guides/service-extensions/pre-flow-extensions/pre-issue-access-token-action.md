# Pre-issue access token action

The pre-issue access token action in {{product_name}} lets you execute custom logic before issuing an access token.

{{product_name}} triggers this action during the OAuth2 token issuance process. You can change the access token or add checks before issuing the token using the action.

You can use this functionality to:

- Add, change, or remove scopes.
- Add, change, or remove audience values.
- Change or remove user attributes incorporated into the access token.
- Add custom claims. You can use string, number, boolean, and string type arrays.
- Update the validity period of the access token.

When your external service modifies an access token, {{product_name}} saves the changes as transactional data for the token's active period.
In later flows, {{product_name}} provides the updated access token to applications, resource servers, and any actions.
For example, when your service modifies an access token during the authorization code flow, {{product_name}} uses the same updated access token in the refresh token flow.

!!! note
    Currently, this action applies only at the root organization level and is available only for <code>JWT</code> tokens.
    It supports the following grant types: <code>authorization code</code>, <code>client credentials</code>, <code>password</code>, and <code>refresh token</code>.

## How pre-issue access token action works

Configure a pre-issue access token action with your external service endpoint.
{{product_name}} calls your service and waits for a response whenever a token request arrives.
Upon receiving the response, {{product_name}} applies any modifications to the access token as specified in the response and then continues with the flow.

The [pre-issue access token API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/api-contract/) defines the request and response structures that your service must follow.

### Request from {{product_name}}

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0" ) %}
<tr class="odd">
<td>requestId</td>
<td>
<p>A unique correlation identifier that associates with the token request received by {{product_name}}.</p>
{% if product_name == "WSO2 Identity Server"%}
<p>
<i>The property appears in the request payload only when you enable <a href="{{base_path}}/deploy/monitor/work-with-product-observability">product observability</a>.</i>
</p>
{%endif %}
</td>
</tr>
</tr>
{%endif %}
<tr class="even">
<td>actionType</td>
<td><p>Specifies the action. In this case, <code>PRE_ISSUE_ACCESS_TOKEN</code> triggers the pre-issue access token flow.</p></td>
</tr>
<tr class="odd">
<td>event</td>
<td><p>Contains context information relevant to access token issue flow. Refer <a href="#event">event</a> section for details.</p> </p></td>
</tr>
<tr class="even">
<td>allowedOperations</td>
<td><p>Specifies the objects within the event data that your external service can change. Refer <a href="#allowed-operations">allowedOperations</a> section for details.</p></td>
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
<td>The unique identifier of the client (application) that's requesting the access token.</td>
</tr>
<tr>
<td>grantType</td>
<td>OAuth2 grant used for the token request, such as authorization code, client credentials, password, or refresh token.</td>
</tr>
<tr>
<td>scopes</td>
<td>The scopes requested by the client, which define the permissions associated with the access token. Scopes determine what resources the access token will grant access to.</td>
</tr>
<tr>
<td>additionalHeaders</td>
<td>Extra HTTP headers in the access token request. These may contain custom information or metadata sent by the client.
Sensitive headers like ‘Authorization’ and ‘Cookie’ don't appear in the request.</td>
</tr>
<tr>
<td>additionalParams</td>
<td>Extra parameters in the access token request. These may contain custom information or metadata sent by the client.
Sensitive parameters like client secret, username, and password don't appear.</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tr>
<tr class="even">
<td>event.tenant</td>
<td><p>This property shows the root organization (tenant) where {{product_name}} processes the token request.</p>
<tr class="odd">  
<td>event.organization</td>  
<td><p>This property represents the organization which is issuing the access token.</p>
<tr class="even">
<td>event.user</td>
<td><p>This property contains information about the authenticated user associated with the token request.</p>
<table>  
<tbody>  
<tr>  
<td>organization</td>  
<td>This property represents the organization in which the user authenticated successfully.</td>  
</tr>  
</tbody>  
</table>
</td>
</tr>
<tr class="odd">
<td>event.userStore</td>
<td><p>This property indicates the user store that manages the user's data.</p>
</td>
</tr>
<tr class="even">
<td>event.accessToken</td>
<td><p>This property shows the access token that {{product_name}} will issue. It contains claims and scopes. Your external service can change these using logic in the pre-issue access token action.
</p>
<table>
<tbody>
<tr>
<td>claims</td>
<td><p>This property is an array that contains both standard access token claims and any OpenID Connect (OIDC) claims configured to include in the access token.</p>
<p>Standard claims:</p>
<table>
<tbody>
<tr>
<td>sub</td>
<td>The subject identifier for the token, typically representing the user. In M2M apps that use client credentials this represents the application.</td>
</tr>
<tr>
<td>iss</td>
<td>The issuer of the token, which is the tenant of {{product_name}} that act as the authorization server.</td>
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
<p><code>APPLICATION</code>: The token authorizes an application.
<code>APPLICATION_USER</code>: The token authorizes a user.</p>
</td>
</tr>
<tr>
<td>expires_in</td>
<td>The duration (in seconds) for which the token is valid.</td>
</tr>
<tr>
<td>binding_type</td>
<td>Indicates the <a href="{{base_path}}/references/token-binding/">binding type</a> associated with the token, if applicable.</td>
</tr>
<tr>
<td>binding_ref</td>
<td>A reference identifier for the binding, if applicable.</td>
</tr>
<tr>
<td>subject_type</td>
<td>Indicates the subject type (public or pairwise) per OIDC specifications.
</td>
</tr>
</tbody>
</table>
<p>OIDC claims are any extra claims configured in the application to include in the access token. These claims follow the OIDC standard and may include user profile information such as email, given-name, or custom claims specific to the application.</p>
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

The allowedOperations property in the context of the pre-issue access token action defines the set of operations that your external service can perform on the access token's claims and on certain claims of the refresh token. This property specifically relates to the <code>event.accessToken</code> and <code>event.refreshToken</code> properties and outlines which attributes let your external service add extra properties, replace values, or remove attributes. The <code>allowedOperations</code> use JSON Patch modification semantics.

In the context of the pre-issue access token action, your external service can change certain claims related to authorization decisions, such as audience (aud), access token validity (expires_in), and scopes (scopes). These claims typically associate with the resource server and influence how access gets granted.

But other standard access token claims, such as the issuer (iss) and token bindings (binding_type), represent the authorization server and play a critical role in authorization decisions. These properties aren't allowed for modification through the action. Use application and organization-level configurations to change these properties and their behaviors.

Additionally, your external service can change any OIDC claims incorporated into the access token.

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

#### Example request from {{product_name}}

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
                ]
            },
            "clientId": "1u31N7of6gCNR9FqkG1neSlsF_Qa",
            "grantType": "authorization_code"
        },
        "tenant": {
            "id": "-1234",
            "name": "carbon.super"
        },
        "organization": {
            "id": "f2604b90-e2e5-4a6c-bc83-0f942e34d20d",
            "name": "carbon.super"
        },
        "user": {
            "id": "e204849c-4ec2-41f1-8ff7-ec1ebff02821",
            "organization": {
                "id": "f2604b90-e2e5-4a6c-bc83-0f942e34d20d",
                "name": "carbon.super"
            }
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

### Expected response from external service

When {{product_name}} invokes your external service as part of the pre-issue access token action, it expects a response that adheres to the defined [API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/api-contract/) here.

This response plays a crucial role in determining how {{product_name}} issues or modifies the access token. Here’s a breakdown of the expected response:

The response can have three possible states: <code>SUCCESS</code>, <code>FAILED</code>and <code>ERROR</code>.

<code>SUCCESS</code>: Indicates that your external service processes the request successfully and for {{product_name}} to apply any required state changes or modifications.

<code>FAILED</code>: Represents a selective failure within the token flow due to validation logic or business rules enforced by your external service. {{product_name}} returns a <code>400 (Client Error)</code> response to the application, incorporating the failure message provided by your external service. You must supply an OAuth 2.0-compliant failure message when extending the flow.

<code>ERROR</code>: Indicates a processing failure in your external service, typically caused by server-side issues. {{product_name}} returns a <code>500 (Server Error)</code> response to the application.

#### Response for SUCCESS state

When the external service responds with a 200 status code and a <code>SUCCESS</code> state, it means the service processes the request correctly and completes any requested modifications to the access token or associated data. The response should include details about these modifications, typically in the form of an <code>operations</code> object that outlines the changes made to the token's claims, scopes, or other relevant attributes.

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
<td><p>Indicates the outcome of the request. Set this value to <code>SUCCESS</code> for a successful operation.</p></td>
</tr>
</tr>
<tr class="even">
<td>operations</td>
<td><p>Define an array of operations that your external service performs on the <code>event.accessToken</code> in the request. These operations must follow the [JSON Patch](https://datatracker.ietf.org/doc/html/rfc6902) modification format.</code>.</p></td>
</tr>
</tbody>
</table>

!!! tip
    Refer the [sample responses for successful access token updates]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-issue-access-token-action/sample-success-responses/) to learn how to construct success responses for different scenarios.

#### Response for FAILED state

When the external service returns a 200 OK status code with a <code>FAILED</code> state, it means the service has intentionally opted to prevent access token issuance. The service makes this decision using specific validation logic or business rules defined by your application's requirements.

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
<td><p>Indicates the outcome of the request. For a failed operation, set this value to <code>FAILED</code>.</p></td>
</tr>
</tr>
<tr class="even">
<td>failureReason</td>
<td><p>Provides the reason for failing to issue an access token. {{product_name}} maps this value to the error field in the response from the /oauth2/token endpoint.</code>.</p></td>
</tr>
<tr class="odd">
<td>failureDescription</td>
<td><p>Offers a detailed explanation of the failure. {{product_name}} maps this value to the error_description field in the <code>/oauth2/token</code> endpoint response.</p></td>
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

The application that initiates the token request receives the following error response.

Error response to the application:

```http
HTTP/1.1 400 
Content-Type: application/json

{
  "error": "invalid_scope",
  "error_description": "Scope platinum_state is invalid"
}
```

#### Response for ERROR state

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
<td><p>Indicates the outcome of the request. Set this value to <code>ERROR</code> for an error operation.</p></td>
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

If the external service returns an error response (either defined or undefined) or fails to respond entirely, {{product_name}} treats this as an error in executing the action. In any of these cases, the application that initiated the token request receives a 500 Internal Server Error.

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

The application that initiates the token request receives the following error response.

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
    Currently, the <code>errorMessage</code> or <code>errorDescription</code> from the external service’s <code>ERROR</code> response isn't directly included in the error response sent back to the application.

## Conditional invocation of pre-issue access token action

Pre-issue access token actions can be conditionally triggered based on configurable rule criteria. The rule configuration currently supports the following fields:

- Application: The specific application that requests the access token.
- Grant Type: The grant type used during the token issuance process.

Each rule field supports the following operators:

- equals
- not equals

You can specify exact values for these fields, such as a specific application associated with a tenant or a particular grant type.
You can also combine rules using logical AND and OR operators.
This approach gives you flexible and precise control over when to invoke a pre-issue access token action.

![pre-issue-access-token-rule-configuration]({{base_path}}/assets/img/guides/actions/pre-issue-access-token-rule-configuration-in-ui.png){: width="650" style="display: block; margin: 0; border: 0px;"}

The above rule configuration translates logically to:

- The application is Test App *and* the grant type is client_credentials, *or*
- The application is Test App, regardless of the grant type.
