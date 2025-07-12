# Custom authentication

Custom authentication allows you to extend the authentication functionality of {{product_name}} by implementing a custom authentication service. This provides greater flexibility in handling diverse authentication requirements beyond the built-in authenticators.

## Types of authenticators

In {{product_name}}, authenticators identify and verify users. You can use different types for specific authentication needs:

- **Identification Authenticators:**

    These authenticators identify the user. Successful execution of this authenticator means the system manages the user either within {{product_name}} as an internal user or by the external system as a federated user.

      - **Internal User Identification Authenticators:**
        Authenticate users against the internal user stores (e.g., basic authentication with username and password).
      - **External(Federated) User Identification Authenticators:**
        Delegate authentication to external systems like social login providers (e.g., Google, Facebook).

- **Verification Authenticators:**

    These authenticators provide extra security by verifying the authenticated identity. They often use multi-factor authentication (MFA) to confirm the user’s identity (for example 2FA with a one-time password).

{{product_name}} includes built-in (system-defined) authenticators for both <code>Identification</code> and <code>Verification</code> types. Custom authenticators (user-defined) let you address specific requirements not met by system-defined authenticators. You can write custom authenticators for both <code>Identification</code> and <code>Verification</code> types.

## How custom authentication service extension works

When you configure and add a custom authenticator to an application's login flow, the following execution sequence occurs:

1. When a user attempts to log in to an application, the application sends a login request to {{product_name}}.
2. If the user isn't already authenticated, {{product_name}} presents the login page with the available authentication options configured for that application.
At the relevant login step, if the user selects a custom authenticator, {{product_name}} invokes the corresponding authentication service endpoint. This request includes the <code>flowId</code>, a unique identifier used to track the authentication flow.
3. The custom authentication service processes the request and either:
    - Authenticates the user directly and returns the response to {{product_name}}.
    - If required inputs (for example user identifier, PIN) are missing, redirect the user to a designated URL where they can provide the necessary information. This URL is part of your custom authenticator's implementation..
4. When your service requests a redirect, {{product_name}} forwards the user to the provided URL.
5. The user directly interacts with the custom authentication service and authenticates.
6. Once authenticated, the external service redirects the user back to {{product_name}}, including the assigned <code>flowId</code> in the request.
7. {{product_name}} calls the custom authentication service endpoint again,  with the <code>flowId</code>, to verify authentication completion.
8. The custom authentication service responds with the final authentication outcome, indicating whether authentication was successful or failed.

The following diagram illustrates the detailed authentication flow.

![how-custom-authentication-work]({{base_path}}/assets/img/guides/actions/how-custom-authenticator-service-work.png){: width="850" style="display: block; margin: 0; border: 0;"}

The [custom authentication API contract]({{base_path}}/references/service-extensions/in-flow-extensions/custom-authentication/api-contract) defines the request and response structures that your service must follow.

The request and response structure between {{product_name}} and the external service varies based on the authenticator's invocation step and authentication type (for example external, internal, 2FA).

!!! tip
    Utilize the [sample custom authentication service](https://github.com/asgardeo-samples/asgardeo-service-extension-samples/tree/main/custom-authentication-service-samples/pin-based-authentication-service-express) to experiment with custom authentication, understand its workflow, and familiarize yourself with the required request-response format for seamless implementation.

## Configuring a custom authenticator

This guide provides a step-by-step approach to configure a custom authenticator in {{product_name}} to integrate your use case with unique authentication logic.

### Prerequisites

Ensure that you have:

- Access to the {{product_name}} console.
- Ability to create a web service or endpoint accessible to {{product_name}}.

### Set up the external service

Your external web service should do the following to integrate as a custom authenticator.

!!! tip
    Use the [sample custom authentication service](https://github.com/asgardeo-samples/asgardeo-service-extension-samples/tree/main/custom-authentication-service-samples/pin-based-authentication-service-express) to experiment with custom authentication, understand its workflow, and familiarize yourself with the required request-response format for seamless implementation.

1. Expose an endpoint that accepts HTTP POST requests with JSON payloads. This endpoint should be deployed in a server accessible to {{product_name}}.

2. To ensure successful integration, your external web service needs to adhere to the [REST API contract]({{base_path}}/references/service-extensions/in-flow-extensions/custom-authentication/api-contract), including correctly handling requests and responses. Refer to [How custom authentication service extension works](#how-custom-authentication-service-extension-works) for an explanation of the invocation flow and [Custom authentication API deep dive](#custom-authentication-api-deep-dive) for detailed API contract information.

3. Choose an authenticator type for your service:
    - External (Federated) User Authentication: Authenticate and provision federated users.
    - Internal User Authentication: Authenticate user accounts stored within the organization’s connected user stores.
    - 2FA Authentication: Provide an extra verification step during authentication flow.

    For more details, refer to [Types of authenticators](#types-of-authenticators).

4. Use one of the following methods to secure the communication between your external service and {{product_name}}:
    - Basic Authentication: Use HTTP Basic authentication to secure the endpoint.
    - OAuth 2.0 Bearer Tokens: Use OAuth 2.0 for token-based authentication.
    - API Key Header: Secure the endpoint using an API key sent in the request header.

    !!! tip
        During the development phase, you may choose to invoke your external service without security for testing purposes. Always secure your service before deploying it in a production environment.

### Configure the custom authenticator in {{product_name}}

Follow the steps below to configure a custom authenticator.

1. Select **CustomAuthenticator** and click **Create**.

    ![select-custom-authenticator-template-in-ui]({{base_path}}/assets/img/guides/actions/select-custom-authenticator-template-in-ui.png){: width="650" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. In the setup wizard, choose the appropriate authentication type and click **Next**. Refer to [Types of authenticators](#types-of-authenticators) for further clarification.

    ![select-custom-authenticator-type-in-ui]({{base_path}}/assets/img/guides/actions/select-custom-authenticator-type-in-ui.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Under **General Settings**, specify an **identifier** for your authenticator and a **display name** that appears on login pages.

4. In the **Configuration** section, fill in the following details and click **Finish**:

    - **Endpoint**: Provide the URL of the web service endpoint you created.
    - **Authentication**: Choose the authentication method required to invoke your endpoint and configure its properties accordingly.

        !!! note

                  Once added, these authentication secret values will not be displayed again. You will only be able to reset them.

        - Basic - Provide a username and password.
        - Bearer - Provide a bearer token.
        - API Key - Provide the header name and the value.
        - No Authentication - No authentication (recommended only for testing purposes).

5. If you select **External (Federated) User Authentication**, configure [JIT-User Provisioning]({{base_path}}/guides/authentication/jit-user-provisioning) according to your requirements. Additionally, review and set up [role assignments for user groups]({{base_path}}/guides/users/manage-roles/#assign-external-groups-to-a-role) to ensure seamless integration.

### Add to an application login flow

Follow the steps below to integrate the custom authenticator into your application's login flow:

1. Open the {{product_name}} Console and navigate to **Applications**.

2. Select the application you want to enable authentication using the custom authenticator.

3. Go to the **Login Flow** tab of the application.

4. Click **Add Sign-In Option** in the step where you want to add the authenticator.

    ![click-signin-option-in-ui]({{base_path}}/assets/img/guides/actions/click-signin-option-in-ui.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Select the authenticator you configured and click **Add** to engage the authenticator in the flow.

    !!! note
            You can include **External and Internal User Authentication** type authenticators at any stage of the login flow. In contrast, **2FA Authentication** type authenticators are only allowed from the second step onwards.

6. Click **Update** to save your changes.

### Test your custom authenticator

Follow the steps below to try out the created custom authenticator.

1. Start an authentication request from the application where you've configured your custom authenticator. This will trigger the login flow in {{product_name}}.

2. Observe the {{product_name}} login page. Your custom authenticator should now appear as an available option for the user to select.

3. Select your custom authenticator. Check your external authentication service for the incoming request from {{product_name}}. This request will be in JSON format.

4. Examine the captured JSON request payload. Verify that it matches the expected structure and includes necessary parameters like <code>actionType</code>, <code>flowId</code>, and the <code>event</code> object. The specific payload format will vary depending on the step where {{product_name}} invokes the authenticator. Refer to the <a href="#request-from-product">Request from {{product_name}}</a> section for detailed information on request payload semantics and examples.

5. For initial testing, consider having your external service return a simple, predefined response (for example a <code>SUCCESS</code> response). This allows you to verify that {{product_name}} receives and processes the response correctly.

6. Once you've verified basic connectivity and response handling, test with a variety of responses:
    - <code>INCOMPLETE</code>: To ensure {{product_name}} correctly redirects the user for further input.
    - <code>SUCCESS</code>: With user data and claims to ensure proper user provisioning and session creation in {{product_name}}.
    - <code>FAILED</code>: With different <code>failureReason</code> and <code>failureDescription</code> values to see how {{product_name}} handles and displays error messages.
    - <code>ERROR</code>: To test {{product_name}}'s behavior when your service encounters server-side errors.

7. After your service responds, check how {{product_name}} handles that response. Verify that:
    - The authentication flow proceeds as expected based on the response.
    - Users are correctly redirected, authenticated, or shown error messages.
    - User data (claims, groups) is correctly processed in {{product_name}}.
    Refer to [Expected Response from External Service](#expected-response-from-external-service) for detailed expected response semantics and examples for different response types.

### Troubleshoot issues

The following are some troubleshooting steps that you may take to resolve issues.

1. Ensure that your external service is up and running and that there are no connectivity issues.
2. Confirm that the request and response payloads conform to the expected formats as defined by the [REST API contract]({{base_path}}/references/service-extensions/in-flow-extensions/custom-authentication/api-contract).
3. Use diagnostic logs to capture detailed information during the troubleshooting process. For more information refer to the [troubleshooting guide here]({{base_path}}/guides/service-extensions/understanding-service-extensions/#troubleshooting).

## Custom authentication API deep dive

This section delves into the specifics of the custom authentication API, providing a detailed look at the requests {{product_name}} sends to your external authentication service and the responses it expects. Understanding these interactions is crucial for successfully implementing and integrating your custom authenticator.

### Request from {{product_name}}

<a name="request-from-product"></a>

The request from {{product_name}} includes following in the JSON request payload:

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>actionType</td>
<td><p>Specifies the action that {{product_name}} triggers. In this case, the value is <code>AUTHENTICATE</code>.</p></td>
</tr>
<tr class="even">
<td>flowId</td>
<td><p>A unique correlation identifier, used to track the login flow throughout all requests and responses.</p></td>
</tr>
</tr>
{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0" ) %}
<tr class="odd">
<td>requestId</td>
<td>
<p>A unique correlation identifier that associates with the authentication request received by {{product_name}}.</p>
{% if product_name == "WSO2 Identity Server" %}
<p>
<i>The property appears in the request payload only when you enable <a href="{{base_path}}/deploy/monitor/work-with-product-observability">product observability</a>.</i>
</p>
{%endif %}
</td>
</tr>
{%endif %}
<tr class="even">
<td>allowedOperations</td>
<td>
<p>Allow redirection.
for example

```json
"allowedOperations": [
    {
      "op": "redirect"
    }
  ]
```

</p></td>
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
</tr>
<tr class="odd">
<td>event.tenant</td>
<td><p>This property shows the tenant (root organization) that handles the authentication request.</p>
<tr class="even">
<td>event.user</td>
<td>
<p>Contains details of the user currently authenticated in the flow. If the authenticator executes in the first step of login, this property is unavailable.</p>
<table>
<tbody>
<tr>
<td>id</td>
<td>The unique numeric identifier of the user.</td>
</tr>
<tr>
<td>userIdentitySource</td>
<td>Denotes the source managing the user’s identity (<code>LOCAL</code> for internally managed user identities in userstores, <code>FEDERATED</code> for external identity providers).</td>
</tr>
<tr>
<td>sub</td>
<td>Subject identifier of the authenticating user.</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr class="odd">
<td>event.userStore</td>
<td><p>This property indicates the user store that manages the currently authenticated user's identity or profile. </p>
</td>
</tr>
<tr class="even">
<td>event.organization</td>
<td><p>This property refers to the organization to which the authenticating user is trying to log into. Organizations represent partners/enterprise customers in Business-to-Business (B2B) use cases.</p>
</td>
</tr>
<tr class="odd">
<td>currentStepIndex</td>
<td><p>Shows the current authentication step where the system calls the authenticator.</p>
</td>
</tr>
<tr class="even">
<td>authenticatedSteps</td>
<td>
<p>Lists the authenticators executed in each step up to the current step.</p>
<p>
for example

```json
"authenticatedSteps": [
    {
      "index": 1,
      "name": "BasicAuthenticator"
    }
  ]
```

</p>
</td>
</tr>
</tbody>
</table>

#### Example requests from {{product_name}}

The following examples show requests sent from {{product_name}} to external services. Each example highlights a different authentication type.

**Request for a custom authenticator engaged in the first step**:

```http
POST authservice/api/authenticate HTTP/1.1
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/json

{
  "actionType": "AUTHENTICATION",
  "flowId": "75919d4d-026b-4b7b-87e1-3f32986f6d97",
  "requestId": "20250709T163958Z-159c6956d75ltm28hC1SINpsqs00000000p00000000009s4",
  "event": {
    "request": {},
    "tenant": {
      "id": "12",
      "name": "example.com"
    },
    "application": {
      "id": "634f9b10-5fb9-49e3-96cd-43ccaa92564c",
      "name": "example.app"
    },
    "currentStepIndex": 1
  },
  "allowedOperations": [
    {
      "op": "redirect"
    }
  ]
}
```

**Request for a custom authenticator in the second or later step**:

```http
POST authservice/api/authenticate HTTP/1.1
Authorization: Basic czZCaGRSa3F0MzpnWDFmQmF0M2JW
Content-Type: application/json

{
  "actionType": "AUTHENTICATION",
  "flowId": "8f5f25a8-1fb7-4c93-9e86-2c328beac833",
  "requestId": "20250709T163958Z-159c6956d75ltm28hC1SINpsqs00000000p00000000009s4",
  "event": {
    "request": {},
    "tenant": {
      "id": "12",
      "name": "example.com"
    },
    "user": {
      "id": "afb93858-18c8-4c65-9d08-86609d4eeee3",
      "userIdentitySource": "FEDERATED",
      "sub": "johd@aol.com"
    },
    "userStore": {},
    "application": {
      "id": "57c3a037-571f-4597-97e8-91a3bb1042d7",
      "name": "example.app"
    },
    "currentStepIndex": 1
  },
  "allowedOperations": [
    {
      "op": "redirect"
    }
  ]
}
```

### Expected Response from external service

When {{product_name}} invokes your external authentication service, it expects a response that adheres to the defined [API contract]({{base_path}}/references/service-extensions/in-flow-extensions/custom-authentication/api-contract).

This response determines the authentication status and the authenticated user from your custom authenticator.

Here’s a breakdown of the expected response:

The response can have four possible states:  <code>INCOMPLETE</code>, <code>SUCCESS</code>, <code>FAILED</code> and <code>ERROR</code>.

<code>INCOMPLETE</code>: Insufficient input to complete authentication. The service needs more input and must redirect the user to a specified endpoint for further interaction.

<code>SUCCESS</code>: The authentication request was successfully processed, and your service authenticated the user.

<code>FAILED</code>: Authentication failed due to credential validation errors or other business rules defined by the external service. The application receives an error response formatted as per the authentication protocol, including the failure message from the external service.

<code>ERROR</code>: A processing failure occurred due to server-side issues. The application receives a server error response generated by {{product_name}}, indicating an internal system failure.

#### Response for INCOMPLETE state

When the external authentication service returns a <code>200</code> status code with an <code>INCOMPLETE</code> state, authentication doesn't complete. {{product_name}} redirects the user to the endpoint specified in the response to continue the authentication process.

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
<td><p>Represents the outcome of the request. For incomplete authentication, this should be <code>INCOMPLETE</code>.</p></td>
</tr>
</tr>
<tr class="even">
<td>operations</td>
<td><p>This operation redirects the user. Use it to send the user to another endpoint.</p></td>
</tr>
</tbody>
</table>

Below is an example of an incomplete response at custom authentication.

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
    "actionStatus": "INCOMPLETE",
    "operations": [
      {
        "op": "redirect",
        "url": "https://pinauth.com/pin-entry
        }
    ]
}
```

This response prompts {{product_name}} to redirect the user to the specified **url**, allowing them to complete the authentication process with the external service.

#### Response for SUCCESS state

When the external service responds with a <code>200</code> status code and a <code>SUCCESS</code> state, it means the service successfully processed the request and authenticated the user.

The expected response format varies based on the authentication type implemented by the external service.

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
<td><p>Represents the outcome of the request. For successful authentication of any type, this property applies. The value should be <code>SUCCESS</code>.</p></td>
</tr>
</tr>
<tr class="even">
<td>data.user</td>
<td><p>Required if the authentication type is <strong>External (Federated) User Authentication</strong> or <strong>Internal User Authentication</strong>, which function as identification authenticators. The validation process differs based on the type.

For <strong>2FA Authentication</strong>, the authentication process only verifies an already authenticated user and doesn't use this property.
</p></td>
</tr>
</tbody>
</table>

**Response from an external service implementing External (Federated) User Authentication**:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "SUCCESS",
  "data": {
    "user": {
      "id": "9f1ab106-ce85-46b1-8f41-6a071b54eb56",
      "claims": [
        {
          "uri": "http://wso2.org/claims/username",
          "value": "johnd"
        },
        {
          "uri": "http://wso2.org/claims/emailaddress",
          "value": "johnd@gmail.com"
        }
      ],
      "groups": [
        "gold-tier"
      ]
    }
  }
}
```

When an external identity provider (IdP) authenticates a user, it sends the user's profile information to {{product_name}} as <code>claims</code>.
These claims can include any standard claim available in the WSO2 claim dialect: <code>http://wso2.org/claims</code>.

The <code>groups</code> attribute indicates the user groups to which the user belongs within the external IdP.

Since you handle this user as an external user, configure [JIT-User Provisioning]({{base_path}}/guides/authentication/jit-user-provisioning) to automatically create a corresponding user account in {{product_name}}. Additionally, set up [role assignments for external user groups]({{base_path}}/guides/users/manage-roles/#assign-external-groups-to-a-role) included in the response.

**Response from an external service implementing Internal User Authentication**:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "SUCCESS",
  "data": {
    "user": {
      "id": "9f1ab106-ce85-46b1-8f41-6a071b54eb56",
      "claims": [
        {
          "uri": "http://wso2.org/claims/username",
          "value": "emily"
        },
        {
          "uri": "http://wso2.org/claims/emailaddress",
          "value": "emily@aol.com"
        }
      ],
      "userStore": {
        "id": "UFJJTUFSWQ==",
        "name": "PRIMARY"
      }
    }
  }
}
```

Here, the <code>claims</code> represent the attributes the internal user uses to authenticate.
In this scenario, {{product_name}} verifies the existence of a user with the provided <code>id</code> within its internal user stores. If your external service includes the <code>http://wso2.org/claims/username</code> claim in the response, the username value must match the username associated with the given <code>id</code> in the internal user store.
The <code>claims</code> payload can include any claim defined in the <code>http://wso2.org/claims</code> dialect.

**Response from an external service implementing 2FA Authentication**:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
   "actionStatus": "SUCCESS"
}
```

For 2FA authenticators, the system completes user identification in a preceding authentication step. These authenticators only verify the existing identity and report a <code>SUCCESS</code> or <code>FAILED</code> status.

#### Response for FAILED state

When the external service returns a <code>200</code> status code with a <code>FAILED</code> state, it means the authentication has failed.

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
<td><p>Provides the reason for failing to authenticate the user. The application receives this value in the error response.</p></td>
</tr>
<tr class="odd">
<td>failureDescription</td>
<td><p>Offers a detailed explanation of the failure. The application receives this value in the error response.</p></td>
</tr>
</tbody>
</table>

Below is an example of a failed response due to invalid credentials.

Response from external service:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "FAILED",
  "failureReason": "auth-failed",
  "failureDescription": "Unable to find user for given credentials"
}
```

The application implementing OIDC receives the following error response after it initiates the login request.

Error response to the application:

```http
HTTP/1.1 400 
Content-Type: application/json

{
  "error": "auth-failed",
  "error_description": "Unable to find user for given credentials"
}
```

#### Response for ERROR state

When the external service responds with an <code>ERROR</code> state, it can return an HTTP status code of <code>400</code>, <code>401</code>, or <code>500</code>, indicating either a validation failure or an issue processing the request.

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

If the external service returns an error response (either defined or undefined) or fails to respond entirely, the system marks authentication as an error. In any of these cases, the application that initiated the login request receives an error state.

Below is an example of an error response returned by the service implementing the authenticator.

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

!!! note
    Currently, the <code>errorMessage</code> or <code>errorDescription</code> from the external service’s <code>ERROR</code> response isn't directly included in the error response sent back to the application.
