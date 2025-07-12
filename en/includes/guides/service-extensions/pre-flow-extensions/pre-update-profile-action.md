# Pre-update profile action

The pre-update profile action in {{product_name}} lets you verify user attributes during profile update processes. This action helps you automate verification of updated data, save changes, or send notifications to updated contact details.

The following profile update flows trigger this action:

- Self-Service Profile Update: When an end-user modifies their profile through a self-service portal like the My Account application.
- Administrator-Initiated Profile Update: When an administrator updates a user's profile through a user management portal, such as the Console application.

!!! note
     Currently, you can configure this action only at the root organization level.

## How pre-update profile action works

Configure a pre-update profile action with your external service endpoint.
{{product_name}} calls your service and waits for a response whenever a profile update action starts.
Upon receiving the response, {{product_name}} returns a client error, server error, or executes based on the response.

The [pre-update profile API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-update-profile-action/api-contract/) defines the request and response structures that your service must use.

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
<p>A unique correlation identifier that associates with the profile update request received by {{product_name}}.</p>
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
<td><p>Triggers the action, which in this case is <code>PRE_UPDATE_PROFILE</code>.</p></td>
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
<td><p>This property shows the tenant (root organization) where {{product_name}} processes the profile update request.</p>
</tr>
<tr class="even">
<td>event.user</td>
<td><p>This property contains information about the user whose profile gets update.</p>
<table>
<tbody>
<tr>
<td>id</td>
<td><p>The unique numeric identifier of the user whose profile gets update.</p>
</td>
</tr>
<tr>
<td>claims</td>
<td>
<p>Includes the user attributes you configure to share with the external service during profile update flow. These attributes appear as claims using the WSO2 claim dialect: <code>http://wso2.org/claims</code>.</p>
<p>for example</p>
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
<p>If you share any updating claims in the profile update request with the service, the claim's <code>updatingValue</code> property includes the updating value.</p>
</td>
</tr>
<tr>
<td>groups</td>
<td>
<p>
Indicates the user groups to which the user belongs.
The groups attribute only appears in the <code>event.user</code> context when you configure the <code>http://wso2.org/claims/groups</code> attribute to share with the service in the pre-update profile action configuration.
</p>
</td>
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
<td>event.initiatorType</td>
<td><p>This property shows who initiates the profile update: administrator, user, or application.</p>
</td>
</tr>
<tr class="odd">
<td>event.action</td>
<td><p>This property shows if the profile update starts through an update flow. Right now, it only has the value <code>UPDATE</code>.</p>
</td>
</tr>
</tbody>
</table>

#### Example request from {{product_name}}

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

### Expected response from external service

When {{product_name}} invokes your external service as part of the pre-update profile action, it expects a response that adheres to the defined [API contract]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-update-profile-action/api-contract/) here.

This response lets {{product_name}} decide whether to allow the profile update.
Here’s a breakdown of the expected response:

The response can have three possible states: <code>SUCCESS</code>, <code>FAILED</code>and <code>ERROR</code>.

<code>SUCCESS</code>: The service processes the request and allows the profile update.

<code>FAILED</code>: Represents a selective failure within the profile update flow due to attribute validation logic or business rules enforced by your external service. The application receives a <code>400 (Client Error)</code> response, which includes the failure message provided by your external service. You must provide a SCIM API compliant failure message when extending the flow if you expect SCIM compliance.

<code>ERROR</code>: Indicates a processing failure in your external service, typically caused by server-side issues. The application receives a <code>500 (Server Error)</code> response.

#### Response for SUCCESS state

When the external service responds with a 200 status code and a SUCCESS state, it means the service processed the request and allowed the profile update.

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
<td><p>Indicates the outcome of the request. Set this to <code>SUCCESS</code> for an allowed profile update.</p></td>
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

#### Response for FAILED state

When the external service returns a 200 OK status code with a <code>FAILED</code> state, it means the service has intentionally opted to reject the profile update. Your external service makes this decision using specific validation logic or business rules.

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
<td><p>Indicates the outcome of the request. Set this to <code>FAILED</code> for a failed operation.</p></td>
</tr>
</tr>
<tr class="even">
<td>failureReason</td>
<td><p>Provides the reason for failing to update the profile. {{product_name}} maps this value to the <code>scimType</code> field in error response of the SCIM API.</p></td>
</tr>
<tr class="odd">
<td>failureDescription</td>
<td><p>Offers a detailed explanation of the failure. {{product_name}} maps this value to the <code>detail</code> field in error response of the SCIM API.</p></td>
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

The application that initiates the profile update request over SCIM API receives the following error response.

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
<td><p>Indicates the outcome of the request. Set this to <code>ERROR</code> for an error operation.</p></td>
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

If the external service returns an error response (either defined or undefined) or fails to respond entirely, {{product_name}} marks the action as an error. In any of these cases, the application that initiated the profile update request receives a 500 Internal Server Error.

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

The application that initiates the profile update request over SCIM API receives the following error response.

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
    Currently, the <code>errorMessage</code> or <code>errorDescription</code> from the external service’s <code>ERROR</code> response isn't directly included in the error response sent back to the application.

## Conditional invocation of pre-update profile action

Pre-update profile actions can be conditionally triggered based on configurable rule criteria. The rule configuration currently supports the following fields:

- Flow: The specific product flow where a user updates their profile. The following list shows applicable flows.
      - Admin initiated profile update
      - User initiated profile update
      - Application initiated profile update

- Claim: The specific user claim that's getting updated.

The rule field supports the following operators:

- equals
- not equals

You can specify exact values for each field, such as an Admin initiated profile update or particular user claim that's getting updated.

Combine rules using logical AND/OR operators. This approach gives you flexible and precise control over when a pre-update profile action triggers.

![pre-update-profile-rule-configuration]({{base_path}}/assets/img/guides/actions/pre-update-profile-rule-configuration-in-ui.png){: width="650" style="display: block; margin: 0; border: 0px;"}

The above rule configuration translates logically to:

- The flow is Admin initiated profile update *and* the claim is Country, *or*
- The claim is First Name
