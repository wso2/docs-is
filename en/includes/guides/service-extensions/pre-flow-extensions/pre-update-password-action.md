# Pre-update password action

The pre-update password action in {{product_name}} lets you validate a password during password update flows. You can integrate it with credential intelligence services (like HaveIBeenPwned or SpyCloud) to detect compromised passwords or to compare passwords with allowed or disallowed lists.

The {{product_name}} triggers this action during the following flows involving password updates.

- Self-Service Password Reset: An end-user clicks "forgot password" and goes through the password recovery process.
- Profile Update: An end-user updates their password through a self-service portal like the MyAccount application.
- Admin-Initiated Password Reset: An administrator forces a password reset, and the end-user subsequently resets their password.
- Admin-Initiated User Invitation: An administrator invites a new user to register by resetting the password. The user then sets a new password as part of the registration flow.
- Direct Admin Update: An administrator directly updates a user's password.

!!! note
     Currently, only the root organization can apply this action, and the {{product_name}} triggers it during any of the flows listed earlier.

## How pre-update password action works

When you configure a pre-update password action with your external service endpoint, {{product_name}} calls your service and waits for a response whenever a password update action triggers. Upon receiving the response, {{product_name}} either returns a client error, server error, or executes based on the response.

The [pre-update password API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-update-password-action/api-contract/) defines the request and response structures that your service must follow.

### Request from {{product_name}}

The request from {{product_name}} includes following in the JSON request payload:

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
<td><p>Defines the triggering action as <code>PRE_UPDATE_PASSWORD</code> for this case.</p></td>
</tr>
<tr class="odd">
<td>event</td>
<td><p>Contains context information relevant to password update flow. Refer <a href="#event">event</a> section for details.</p> </p></td>
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
<tr class="even">
<td>event.tenant</td>
<td><p>This property identifies the tenant (root organization) handling the password update request.</p>
<tr class="odd">
<td>event.user</td>
<td><p>This property contains information about the user associated with the password update.</p>
<table>
<tbody>
<tr>
<td>id</td>
<td><p>The unique numeric identifier of the user associated with the password update.</p>
</td>
</tr>
<tr>
<td>claims</td>
<td>
<p>Includes the user attribute values configured for sharing with the external service during the password update flow. These attributes represent claims using the WSO2 claim dialect: <code>http://wso2.org/claims</code>.</p>
<p>For example,</p>
<p>

```json
[
  {
    "uri": "http://wso2.org/claims/identity/accountLocked",
    "value": "false"
  },
  {
    "uri": "http://wso2.org/claims/username",
    "value": "bob@aol.com"
  },
  {
    "uri": "http://wso2.org/claims/verifiedEmailAddresses",
    "value": [
      "bob@work.example.com"
    ]
  },
  {
    "uri": "http://wso2.org/claims/emailAddresses",
    "value": [
      "bob@work.example.com",
      "bob@personal.example.com"
    ]
  }
]
```

</p>
</td>
</tr>
<tr>
<td>groups</td>
<td>
<p>
Indicates the user groups to which the user belongs.
The <code>event.user</code> context includes the <code>groups</code> attribute only when the pre-update password action configuration contains the <code>http://wso2.org/claims/groups</code> attribute for sharing with the external service.
</p>
</td>
</tr>
<tr>
<td>updatingCredential</td>
<td>
<p>The user's new password, provided either as a hashed value or in plain text, depending on the pre-update password action configuration. This JSON object includes the password, the format used to share it (hashed or plain text), and the hashing algorithm if used.</p>
<p>For example,</p>
<p>

```json
{
  "type": "PASSWORD",
  "format": "HASH",
  "value": "cHRSHCjvmT",
  "additionalData": {
    "algorithm": "SHA256"
  }
}
```

</p>
<p>The pre-update password action configuration can enforce encryption of the <code>updatingCredential</code> object by providing a public certificate. The {{product_name}} uses this certificate to encrypt the object with asymmetric encryption and shares it as a <a href="https://datatracker.ietf.org/doc/html/rfc7516">JWE</a>.</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr class="even">
<td>event.userStore</td>
<td><p>This property indicates the user store that manages the user's data.</p>
</td>
</tr>
<tr class="odd">
<td>event.initiatorType</td>
<td><p>This property indicates whether an administrator, a user, or an application initiated the password update. Refer <a href="#initatorType-and-action">initiatorType and action properties in request</a> section for details.</p>
</td>
</tr>
<tr class="even">
<td>event.action</td>
<td><p>This property indicates whether a password reset flow, update flow, or an invite flow initiated the password update. Refer <a href="#initatorType-and-action">initiatorType and action properties in request</a> section for details.</p>
</td>
</tr>
</tbody>
</table>

#### <code>initiatorType</code> and <code>action</code> properties in request

<a name="initatorType-and-action"></a>

The <code>initiatorType</code> and the <code>action</code> property in combination denotes the flow that triggers a password update.

The following shows how the <code>initiatorType</code> and <code>action</code> properties differ based on the flow.

<table>
<thead>
<tr class="header">
<th>Flow</th>
<th>Value of <code>initiatorType</code></th>
<th>Value of <code>action</code></th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="even">
<td>User initiated password update</td>
<td>USER</td>
<td>UPDATE</td>
<td><p>This occurs when a user updates their password directly through their profile settings in MyAccount app or via
{% if product_name == "WSO2 Identity Server"%}
<a href="{{base_path}}/apis/scim2-me-rest-apis/">SCIM 2.0 Me API</a>
{% elif product_name == "Asgardeo" %}
<a href="{{base_path}}/apis/scim2-me/">SCIM 2.0 Me API</a>
{% endif %}.
</p>
</tr>
<tr class="odd">
<td>User initiated password reset</td>
<td>USER</td>
<td>RESET</td>
<td><p>This occurs when a user has forgotten their password and initiates a reset flow to regain access to their account.
</p>
</tr>
<tr class="even">
<td>Admin initiated password update</td>
<td>ADMIN</td>
<td>UPDATE</td>
<td><p>This occurs when an administrator updates a user's password directly via console or <a href="{{base_path}}/apis/scim2/scim2-users-rest-api">SCIM 2.0 Users API</a>.
</p>
</tr>
<tr class="even">
<td>Admin initiated password reset</td>
<td>ADMIN</td>
<td>RESET</td>
<td><p>This occurs when an administrator initiates a forced password reset and the user resets the password via that request.
</p>
</tr>
<tr class="even">
<td>Admin initiated user invite to set password</td>
<td>ADMIN</td>
<td>INVITE</td>
<td><p>This occurs when an administrator invites a new user to join the system, prompting the user to set their password.
</p>
</tr>
<tr class="even">
<td>Application initiated password update</td>
<td>APPLICATION</td>
<td>UPDATE</td>
<td><p>This occurs when an application with appropriate permissions automatically updates a user's password, often as part of an automated user provisioning process or integration with external identity management systems via <a href="{{base_path}}/apis/scim2/scim2-users-rest-api">SCIM 2.0 Users API</a>.</p>
</tr>
</tbody>
</table>

#### Example request from {{product_name}}

This example illustrates a request sent to an external service configured as a pre-update password action, triggered when a user updates their password.

```http
POST /password-update-action HTTP/1.1
Host: localhost
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/json

{
  "actionType": "PRE_UPDATE_PASSWORD",
  "event": {
    "tenant": {
      "id": "1",
      "name": "example.com"
    },
    "user": {
      "id": "8eebb941-51e1-4d13-9d5a-81da190383ae",
      "claims": [
        {
          "uri": "http://wso2.org/claims/username",
          "value": "bob@aol.com"
        },
        {
          "uri": "http://wso2.org/claims/emailAddresses",
          "value": [
            "bob@work.example.com",
            "bob@personal.example.com"
          ]
        }
        ],
        "groups": [
          "employee",
          "manager"
        ],
      "updatingCredential": {
        "type": "PASSWORD",
        "format": "HASH",
        "value": "h3bxCOJHqx4rMjBCwEnCZkB8gfutQb3h6N/Bu2b9Jn4=",
        "additionalData": {
          "algorithm": "SHA256"
        }
      }
    },
    "userStore": {
      "id": "UFJJTUFSWQ==",
      "name": "PRIMARY"
    },
    "initiatorType": "USER",
    "action": "UPDATE"
  }
}
```

### Expected response from external service

When {{product_name}} invokes your external service as part of the pre-password update action, it expects a response that adheres to the defined [API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-update-password-action/api-contract/) here.

This response plays a crucial role in determining whether to permit the password update.
Here’s a breakdown of the expected response:

The response can have three possible states: <code>SUCCESS</code>, <code>FAILED</code>and <code>ERROR</code>.

<code>SUCCESS</code>: Indicates successful request processing and permits the password update.

<code>FAILED</code>: Represents a selective failure within the password update flow due to password validation logic or business rules enforced by your external service. The application receives a <code>400 (Client Error)</code> response that includes the failure message from your external service.

<code>ERROR</code>: Indicates a processing failure, typically caused by server-side issues. The application receives a <code>500 (Server Error)</code> response.

#### Response for SUCCESS state

When the external service responds with a 200 status code and a SUCCESS state, it indicates that the request completed successfully and permits the password update.

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
<td><p>Indicates the outcome of the request. To permit the password update, set this to <code>SUCCESS</code>.</p></td>
</tr>
</tr>
</tbody>
</table>

The following shows an example of a success response from a password update request.

Response from external service:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "SUCCESS"
}
```

#### Response for FAILED state

When the external service returns a 200 OK status code with a <code>FAILED</code> state, it means the service has intentionally opted to reject the password update. This decision follows specific validation logic or business rules defined by your application.

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
<td><p>Indicates the outcome of the request. For a failed operation, set this to <code>FAILED</code>.</p></td>
</tr>
</tr>
<tr class="even">
<td>failureReason</td>
<td><p>Provides the reason for failing to update the password. This value currently doesn't map to the SCIM API response.</p></td>
</tr>
<tr class="odd">
<td>failureDescription</td>
<td><p>Offers a detailed explanation of the failure. This value maps to the <code>detail</code> field in the error response of the SCIM API.</p></td>
</tr>
</tbody>
</table>

The following shows an example of a failed response due to a validation of compromised passwords.

Response from external service:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "FAILED",
  "failureReason": "Compromised password",
  "failureDescription": "The provided password is compromised. Provide something different."
}
```

This results in the following error response sent to the application that initiated the password update request over the SCIM API.

Error response to the application:

```http
HTTP/1.1 400 
Content-Type: application/json

{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:Error"
    ],
    "scimType": "invalidValue",
    "detail": "The provided password is compromised. Provide something different.",
    "status": "400"
}
```

Following error response returned to the application that initiated the password update request through the forgot password, forced reset, or user invitation flow using the password reset API.

Error response to the application:

```http
HTTP/1.1 400 
Content-Type: application/json

{
    "code": "20067",
    "message": "invalid_format",
    "description": "Invalid password format.",
    "traceId": "c6389827-8fee-4235-928f-96295d192181"
}
```

#### Response for ERROR state

When the external service returns an <code>ERROR</code> state, it sends a 400, 401, or 500 HTTP status code indicating validation failure or processing issues.

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
<td><p>Indicates the request outcome. Set this to <code>ERROR</code> for an error operation.</p></td>
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

If the external service returns an error response (either defined or undefined) or fails to respond entirely, the {{product_name}} treats it as an error in executing the action. In any of these cases, the application that initiated the password update request will receive a 500 Internal Server Error.

The following shows an example of an error response returned by the service implementing the pre-update password action.

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

This results in the following error response sent to the application that initiated the password update request over SCIM API.

Error response to the application:

```http
HTTP/1.1 500 
Content-Type: application/json

{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:Error"
    ],
    "detail": "Error while updating attributes of user: A***n",
    "status": "500"
}
```

!!! tip
    Use the [pre-update password extension samples](https://github.com/asgardeo-samples/asgardeo-service-extension-samples/tree/main/pre-update-password-extension-samples) to understand how to check passwords against a compromised password list and how to handle the response appropriately.

!!! note
    Currently, the <code>errorMessage</code> or <code>errorDescription</code> from the external service’s <code>ERROR</code> response doesn't directly include in the error response sent back to the application.

## Conditional invocation of pre-update password action

Pre-update password actions trigger conditionally based on configurable rule criteria. The rule configuration currently supports the following field:

- Flow: The specific user password updating flows in the product.
  - Admin initiated password reset
  - Admin initiated password update
  - Admin initiated user invite to set password
  - Application initiated password update
  - User initiated password reset
  - User initiated password update

The rule field supports the following operators:

- equals
- not equals

You can specify exact values for the field, such as an Admin initiated password update.
Combine rules using logical AND/OR operators to control precisely when the pre-update password action triggers.

![pre-update-password-rule-configuration]({{base_path}}/assets/img/guides/actions/pre-update-password-rule-configuration-in-ui.png){: width="650" style="display: block; margin: 0; border: 0px;"}

This rule configuration translates logically to:

- The flow should equals to <code>Admin initiated password reset</code> or <code>Admin initiated password update</code> to trigger the pre-update password action.
