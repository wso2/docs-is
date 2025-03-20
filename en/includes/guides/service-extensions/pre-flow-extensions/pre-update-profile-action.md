# Pre-update profile action

The pre-update profile action in {{product_name}} allows you to the validate user attributes during profile update processes. This action enables you to implement use cases such as automated verification of updated data (e.g., cross-referencing with passport or driving license information), persisting changes, or triggering notifications to updated contact details.

This action is triggered during the following profile update flows:

- Self-Service Profile Update: When an end-user modifies their profile through a self-service portal like the My Account application.
- Administrator-Initiated Profile Update: When an administrator updates a user's profile through a user management portal, such as the Console application.

!!! note
     Currently, this action can only be applied at the root organization level and is invoked for any of the flows mentioned above.

## How pre-update profile action works

When a pre-update profile action is configured with your external service endpoint, {{product_name}} will call your service and wait for a response whenever a profile update action is triggered. Upon receiving the response, {{product_name}} will either return a client error, server error or execute based on the response received.


The [pre-update profile API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-update-profile-action/api-contract/) defines the request and response structures that your service must implement.

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
<td><p>Specifies the action being triggered, which in this case is <code>PRE_UPDATE_PROFILE</code>.</p></td>
</tr>
<tr class="odd">
<td>event</td>
<td><p>Contains context information relevant to profile update flow. Refer <a href="#event">event</a> section for details.</p> </p></td>
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
<td>event.request</td>
<td><p>This property contains the details of the profile update request. Currently, it includes the list of attributes that the user is updating.</p>
</tr>
<tr class="odd">
<td>event.tenant</td>
<td><p>This property represents the tenant (root organization) under which the profile update request is being processed.</p>
</tr>
<tr class="even">
<td>event.user</td>
<td><p>This property contains information about the user whose profile is being updated.</p>
<table>
<tbody>
<tr>
<td>id</td>
<td><p>The unique numeric identifier of the user whose profile is being updated.</p>
</td>
</tr>
<tr>
<td>claims</td>
<td>
<p>Includes the user attributes that are configured to be shared with the external service during profile update flow. These attributes are represented as claims and represented with the WSO2 claim dialect: <code>http://wso2.org/claims</code>.</p>
<p>e.g.,</p>
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
      "bob@work.example.com"
    ],
    "updatingValue": [
      "bob@work.example.com",
      "bob@personal.example.com"
    ]
  }
]
```
</p>
<p>If any updating claims in the profile update request are configured to be shared with the service, the value updating will be included under the claim's <code>updatingValue</code> property.</p>
</td>
</tr>
<tr>
<td>groups</td>
<td>
<p>
Indicates the user groups to which the user belongs. 
The groups attribute is only included in the <code>event.user</code> context if the <code>http://wso2.org/claims/groups</code> attribute is configured to be shared with the service implementing action, in the pre-update profile action configuration.
</p>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr class="odd">
<td>event.userStore</td>
<td><p>This property indicates the user store in which the user's data is being managed.</p>
</td>
</tr>
<tr class="even">
<td>event.initiatorType</td>
<td><p>This property indicates whether the profile update was initiated by an administrator, a user, or an application.</p>
</td>
</tr>
<tr class="odd">
<td>event.action</td>
<td><p>This property shows if the profile update started through an update flow. Right now, it only has the value <code>UPDATE</code> which means the profile update is done using a standard profile update flow.</p>
</td>
</tr>
</tbody>
</table>

#### Example request from {{product_name}}:

This example illustrates a request sent to an external service configured as a pre-update profile action, triggered when an administrator updates the user’s profile.

```http
POST /profile-update-action HTTP/1.1
Host: localhost
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/json


{
  "actionType": "PRE_UPDATE_PROFILE",
  "event": {
    "request": {
      "claims": [
       {
          "uri": "http://wso2.org/claims/emailAddresses",
          "value": [
            "emily@aol.com",
            "emily@gmail.com",
          ]
        },
        {
          "uri": "http://wso2.org/claims/mobileNumbers",
          "value": [
            "1234566234",
            "1234566235",
            "1234566236"
          ]
        },
        {
          "uri": "http://wso2.org/claims/emailaddress",
          "value": "emily@gmail.com"
        }
      ]
    },
    "tenant": {
      "id": "12402",
      "name": "bar.com"
    },
    "user": {
      "id": "ab49e1b8-2d1b-424d-b136-debdca67bfcc",
      "claims": [
        {
          "uri": "http://wso2.org/claims/emailAddresses",
          "value": [
            "emily@aol.com"
          ],
          "updatingValue": [
            "emily@aol.com",
            "emily@gmail.com",

          ]
        },
        {
          "uri": "http://wso2.org/claims/mobileNumbers",
          "value": [
            "1234566234",
            "1234566235",
          ],
          "updatingValue": [
            "1234566234",
            "1234566235",
            "1234566236"
          ]
        },
        {
          "uri": "http://wso2.org/claims/identity/accountState",
          "value": "UNLOCKED"
        },
        {
          "uri": "http://wso2.org/claims/emailaddress",
          "value": "emily@aol.com",
          "updatingValue": "emily@gmail.com"
        },
      ],
      "groups": [
        "gold-tier"
      ]
    },
    "userStore": {
      "id": "REVGQVVMVA==",
      "name": "DEFAULT"
    },
    "initiatorType": "ADMIN",
    "action": "UPDATE"
  }
}
```

### Expected Response from External Service:

When {{product_name}} invokes your external service as part of the pre-update profile action, it expects a response that adheres to the defined [API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-update-profile-action/api-contract/) here.

This response plays a crucial role in determining whether profile update is allowed or not.
Here’s a breakdown of the expected response:

The response can have three possible states: <code>SUCCESS</code>, <code>FAILED</code>and <code>ERROR</code>.

<code>SUCCESS</code>: Indicates that the request was processed successfully, and profile update is allowed.

<code>FAILED</code>: Represents a selective failure within the profile update flow due to attribute validation logic or business rules enforced by your external service. A <code>400 (Client Error)</code> response is returned to the application, incorporating the failure message provided by your external service. It is your responsibility to provide a SCIM API compliant failure message when extending the flow if you expect SCIM compliance.
 

<code>ERROR</code>: Indicates a processing failure, typically caused by server-side issues. A <code>500 (Server Error)</code> response is returned to the application.


#### Response for SUCCESS state:

When the external service responds with a 200 status code and a SUCCESS state, it indicates that the request was processed correctly and profile update is allowed. 

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
<td><p>Indicates the outcome of the request. For an allowed profile update, this should be set to <code>SUCCESS</code>.</p></td>
</tr>
</tr>
</tbody>
</table>

Below is an example of a success response at a profile update request.

Response from external service:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "SUCCESS",
}
```

#### Response for FAILED state:

When the external service returns a 200 OK status code with a <code>FAILED</code> state, it means the service has intentionally opted to reject the profile update. This decision is based on specific validation logic or business rules defined by your application's requirements.

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
<td><p>Provides the reason for failing to update the profile. This value is mapped to the <code>scimType</code> field in error response of the SCIM API.</p></td>
</tr>
<tr class="odd">
<td>failureDescription</td>
<td><p>Offers a detailed explanation of the failure. This value is mapped to the <code>detail</code> field in error response of the SCIM API.</p></td>
</tr>
</tbody>
</table>

Below is an example of a failed response due to a validation of invalid attributes.

Response from external service:
```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "FAILED",
  "failureReason": "invalid_input",
  "failureDescription": "Provided user attributes are invalid."
}
```

This will result in the following error response being sent to the application that initiated the profile update request over SCIM API.

Error response to the application:
```http
HTTP/1.1 400 
Content-Type: application/json

{
    "schemas": [
        "urn:ietf:params:scim:api:messages:2.0:Error"
    ],
    "scimType": "invalid_input",
    "detail": "Provided user attributes are invalid.",
    "status": "400"
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

If the external service returns an error response (either defined or undefined) or fails to respond entirely, it will be treated as an error in executing the action. In any of these cases, the application that initiated the profile update request will receive a 500 Internal Server Error.

Below is an example of an error response returned by the service implementing the pre-update profile action.

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

This will result in the following error response being sent to the application that initiated the profile update request over SCIM API.

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
