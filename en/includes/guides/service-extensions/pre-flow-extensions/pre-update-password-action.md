# Pre-update password action

The pre-update password action in {{product_name}} allows you to validate a password during various password update flows. This can be achieved by integrating with credential intelligence services (like haveibeenpwned or SpyCloud) to check for compromised passwords or by comparing passwords against allowed or disallowed lists.

This action is triggered during following flows that incorporate password updates.

- Self-Service Password Reset: An end-user clicks "forgot password" and goes through the password recovery process.
- Profile Update: An end-user updates their password through a self-service portal like the My Account application.
- Admin-Initiated Password Reset: An administrator forces a password reset, and the end-user subsequently resets their password.
- Admin-Initiated User Invitation: An administrator invites a new user to register by resetting the password. The user then sets a new password as part of the registration flow.
- Direct Admin Update: An administrator directly updates a user's password.

!!! note
     Currently, this action can only be applied at the root organization level and is invoked for any of the flows mentioned above.

## How pre-update password action works

When a pre-update password action is configured with your external service endpoint, {{product_name}} will call your service and wait for a response whenever a password update action is triggered. Upon receiving the response, {{product_name}} will either return a client error, server error or execute based on the response received.

The [pre-update password API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-update-password-action/api-contract/) defines the request and response structures that your service must implement.

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
<tr class="even">
<td>actionType</td>
<td><p>Specifies the action being triggered, which in this case is <code>PRE_UPDATE_PASSWORD</code>.</p></td>
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
<td><p>This property represents the tenant (root organization) under which the password update request is being processed.</p>
<tr class="odd">
<td>event.user</td>
<td><p>This property contains information about the user whose password is being updated.</p>
<table>
<tbody>
<tr>
<td>id</td>
<td><p>The unique numeric identifier of the user whose password is being updated.</p>
</td>
</tr>
<tr>
<td>updatingCredential</td>
<td>
<p>The user's new password, provided either as a hashed value or in plain text, depending on how the pre-update password action is configured. This is a JSON object that includes the password, the format in which the password is shared (hashed or plain text), and additional data that includes the algorithm used if the password is hashed.</p>
<p>e.g.,</p>
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
<p>If the pre-update password action configuration is set to encrypt the password payload, the above object will be encrypted with the public certificate uploaded with asymmetric encryption and will be shared as a <a href="https://datatracker.ietf.org/doc/html/rfc7516">JWE</a>.</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr class="even">
<td>event.userStore</td>
<td><p>This property indicates the user store in which the user's data is being managed.</p>
</td>
</tr>
<tr class="odd">
<td>event.initiatorType</td>
<td><p>This property indicates whether the password update was initiated by an administrator, a user, or an application. Refer <a href="#initatorType-and-action">initiatorType and action properties in request</a> section for details.</p>
</td>
</tr>
<tr class="even">
<td>event.action</td>
<td><p>This property indicates whether the password update was initiated over a password reset flow, update flow, or an invite flow. Refer <a href="#initatorType-and-action">initiatorType and action properties in request</a> section for details.</p>
</td>
</tr>
</tbody>
</table>

#### <code>initiatorType</code> and <code>action</code> properties in request
<a name="initatorType-and-action"></a>

The <code>initiatorType</code> and the <code>action</code> property in combination will denote the flow for which a password update is triggered.

Following is how the <code>initiatorType</code> and <code>action</code> property will differ based on the flow.

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
<td><p>This occurs when a user updates their password directly through their profile settings in my account app or via 
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
<td><p>This occurs when an administrator invites a new user to join the system, where the user is then prompted to set their password.
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

#### Example request from {{product_name}}:

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

### Expected Response from External Service:

When {{product_name}} invokes your external service as part of the pre-password update action, it expects a response that adheres to the defined [API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-update-password-action/api-contract/) here.

This response plays a crucial role in determining whether password update is allowed or not.
Here’s a breakdown of the expected response:

The response can have three possible states: <code>SUCCESS</code>, <code>FAILED</code>and <code>ERROR</code>.

<code>SUCCESS</code>: Indicates that the request was processed successfully, and password update is allowed.

<code>FAILED</code>: Represents a selective failure within the password update flow due to password validation logic or business rules enforced by your external service. A <code>400 (Client Error)</code> response is returned to the application, incorporating the failure message provided by your external service. 

<code>ERROR</code>: Indicates a processing failure, typically caused by server-side issues. A <code>500 (Server Error)</code> response is returned to the application.


#### Response for SUCCESS state:

When the external service responds with a 200 status code and a SUCCESS state, it indicates that the request was processed correctly and password update is allowed. 

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
<td><p>Indicates the outcome of the request. For an allowed password update, this should be set to <code>SUCCESS</code>.</p></td>
</tr>
</tr>
</tbody>
</table>

Below is an example of a success response at a password update request.

Response from external service:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "SUCCESS",
}
```

#### Response for FAILED state:

When the external service returns a 200 OK status code with a <code>FAILED</code> state, it means the service has intentionally opted to reject the password update. This decision is based on specific validation logic or business rules defined by your application's requirements.

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
<td><p>Provides the reason for failing to update the password. This value is not currently mapped to the SCIM API response.</code>.</p></td>
</tr>
<tr class="odd">
<td>failureDescription</td>
<td><p>Offers a detailed explanation of the failure. This value will be mapped to the detail field in error response of the SCIM API.</p></td>
</tr>
</tbody>
</table>

Below is an example of a failed response due to a validation of compromised passwords.

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

This will result in the following error response being sent to the application that initiated a password update request over SCIM API.

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

And this will result in following error response being sent to the application that initiated a password update request via the forgot password, forced password reset, or user invitation flow using the password reset API.

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

If the external service returns an error response (either defined or undefined) or fails to respond entirely, it will be treated as an error in executing the action. In any of these cases, the application that initiated the password update request will receive a 500 Internal Server Error.

Below is an example of an error response returned by the service implementing the pre-update password action.

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

This will result in the following error response being sent to the application that initiated the password update request over SCIM API.

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

!!! note
    Currently, the <code>errorMessage</code> or <code>errorDescription</code> from the external service’s <code>ERROR</code> response is not directly included in the error response sent back to the application.
