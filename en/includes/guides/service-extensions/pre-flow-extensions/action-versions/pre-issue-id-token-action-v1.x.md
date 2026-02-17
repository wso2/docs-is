The following API contract defines the request and response structures that your service must adhere to.

- [pre-issue id token API contract v1.0]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-issue-id-token-action/pre-issue-id-token-action-v1.0)

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
<td>flowId</td>
<td><p>A unique identifier that associates with the token issuing flow in {{product_name}}.</p></td>
</tr>
<tr class="even">
<td>requestId</td>
<td><p>A unique correlation identifier that associates with the token request received by {{product_name}}.</p></td>
</tr>
<tr class="odd">
<td>actionType</td>
<td><p>Specifies the action. In this case, <code>PRE_ISSUE_ID_TOKEN</code> triggers the pre-issue ID token flow.</p></td>
</tr>
<tr class="even">
<td>event</td>
<td><p>Contains context information relevant to the ID token issuance flow. Refer <a href="#event">event</a> section for details.</p></td>
</tr>
<tr class="odd">
<td>allowedOperations</td>
<td><p>Specifies the operations your external service can perform on the ID token claims. Refer <a href="#allowed-operations">allowedOperations</a> section for details.</p></td>
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
<p>This property encapsulates the details of the ID token request, including parameters and headers. It provides the following specific properties.</p>
<table>
<tbody>
<tr>
<td>grantType</td>
<td>The OAuth2 grant type used for the token request, such as `authorization_code`, `password`, `refresh_token`, `organization_switch` or `urn:ietf:params:oauth:grant-type:device_code`.</td>
</tr>
<tr>
<td>responseType</td>
<td>The OIDC response type requested by the client in the hybrid flow, such as `code id_token token`, or `code id_token`.</td>
</tr>
<tr>
<td>clientId</td>
<td>The unique identifier of the client (application) requesting the ID token.</td>
</tr>
<tr>
<td>scopes</td>
<td>The scopes present in the incoming token request (OAuth2/OIDC hybrid flow). The <code>openid</code> scope must present to get an ID token. OIDC scopes control the user attributes requested in the ID token (for example, <code>profile</code> for profile-related claims and <code>address</code> for address-related claims). Other OAuth2 scopes appear here because they associate with permissions on the access token issued with the ID token.</td>
</tr>
<tr>
<td>additionalHeaders</td>
<td>Any additional HTTP headers included in the ID token request. These may contain custom information or metadata that the client has sent.</td>
</tr>
<tr>
<td>additionalParams</td>
<td>Any additional parameters included in the ID token request. These may contain custom parameters defined by the client or necessary for specific flows.</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr class="even">
<td>event.tenant</td>
<td><p>This property represents the tenant that processes the token request.</p></td>
</tr>
<tr class="odd">
<td>event.user</td>
<td><p>This property contains information about the authenticated user associated with the token request.</p>
<table>
<tbody>
<tr>
<td>id</td>
<td>The unique identifier of the user.</td>
</tr>
<tr>
<td>organization</td>
<td>The organization to which the user belongs.</td>
</tr>
<tr>
<td>userType</td>
<td><code>LOCAL</code> indicates a user in {{product_name}} organization. <code>FEDERATED</code> indicates a user authenticated via a federated identity provider.</td>
</tr>
<tr>
<td>federatedIdP</td>
<td>The name of the federated identity provider used to authenticate the user. This applies only for the `FEDERATED` users.</td>
</tr>
<tr>
<td>accessingOrganization</td>
<td>The organization that the user intends to access. This applies only for the `organization_switch` grant type.</td>
</tr>
</tbody>
</table>
</td>
</tr>
<tr class="even">
<td>event.organization</td>
<td><p>This property refers to the organization context which issues the id token.</p></td>
</tr>
<tr class="odd">
<td>event.userStore</td>
<td><p>This property indicates the user store that manages the user's data.</p></td>
</tr>
<tr class="even">
<td>event.idToken</td>
<td><p>This property shows the ID token that {{product_name}} will issue. It contains claims that your external service can add, replace, or remove within the limits defined by <code>allowedOperations</code>.</p>
<table>
<tbody>
<tr>
<td>claims</td>
<td><p>This property contains both standard ID token claims and any OpenID Connect (OIDC) claims that you request to include in the ID token.</p>
<p>Standard claims:</p>
<table>
<tbody>
<tr>
<td>iss</td>
<td>The issuer of the token, which denotes the tenant of {{product_name}} that acts as the authorization server.</td>
</tr>
<tr>
<td>at_hash</td>
<td>The hash of the access token value. Used when {{product_name}} issues the ID token together with an access token.</td>
</tr>
<tr>
<td>c_hash</td>
<td>The hash of the authorization code value. Used when {{product_name}} issues the ID token in the authorization code flow.</td>
</tr>
<tr>
<td>s_hash</td>
<td>The hash of the state value. Used when the state parameter present in the authentication request.</td>
</tr>
<tr>
<td>sid</td>
<td>The session ID claim. Identifies the session at the identity provider.</td>
</tr>
<tr>
<td>expires_in</td>
<td>The validity period (in seconds) of the ID token.</td>
</tr>
<tr>
<td>realm</td>
<td>The realm (tenant or organization context) associated with the token.</td>
</tr>
<tr>
<td>tenant</td>
<td>The tenant identifier.</td>
</tr>
<tr>
<td>userstore</td>
<td>The user store identifier.</td>
</tr>
<tr>
<td>isk</td>
<td>The identity provider session key.</td>
</tr>
<tr>
<td>sub</td>
<td>The subject identifier for the token, typically representing the user.</td>
</tr>
<tr>
<td>aud</td>
<td>The audience for the token.</td>
</tr>
<tr>
<td>exp</td>
<td>The token's expiry time (Unix timestamp).</td>
</tr>
<tr>
<td>iat</td>
<td>The time when {{product_name}} issues the token (Unix timestamp).</td>
</tr>
<tr>
<td>auth_time</td>
<td>The time at which the user authenticated (Unix timestamp).</td>
</tr>
<tr>
<td>nonce</td>
<td>The nonce value. Used to associate the ID token with the client session and to mitigate replay attacks.</td>
</tr>
<tr>
<td>acr</td>
<td>The authentication context class reference. Specifies the authentication context used.</td>
</tr>
<tr>
<td>amr</td>
<td>The authentication methods references. Lists the authentication methods used.</td>
</tr>
<tr>
<td>azp</td>
<td>The authorized party for the token. The client that requested the token.</td>
</tr>
</tbody>
</table>
<p>OIDC claims:</p>
OIDC claims include any additional user claims that the application configures for the ID token. These claims follow the OIDC standard and include user profile information such as email, given_name, or custom claims specific to the application.
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>

#### allowedOperations

<a name="allowed-operations"></a>

The <code>allowedOperations</code> property in the context of the pre-issue id token action defines the set of operations that your external service can perform on the ID token's claims. This property specifically relates to the <code>event.idToken</code> property and outlines which attributes let your external service add extra properties, replace values, or remove attributes. The <code>allowedOperations</code> use JSON Patch modification semantics.

Your external service can change claims related to authorization decisions, such as audience (aud), ID token validity (expires_in). These claims typically associate with the resource server and influence how access gets granted.

But other standard ID token claims, such as the issuer (iss), represent the authorization server and play a critical role in token validation. The action doesn't allow modification of these properties. Use application and organization-level configurations to change these properties and their behaviors.

Additionally, your external service can change any OIDC claims incorporated into the ID token.

The following example shows an allowedOperations object in a request formatted as a JSON payload:

```json
{
  "allowedOperations": [
    {
      "op": "add",
      "paths": [
        "/idToken/claims/",
        "/idToken/claims/aud/"
      ]
    },
    {
      "op": "replace",
      "paths": [
        "/idToken/claims/updated_at",
        "/idToken/claims/given_name",
        "/idToken/claims/family_name",
        "/idToken/claims/username",
        "/idToken/claims/aud/",
        "/idToken/claims/expires_in"
      ]
    },
    {
      "op": "remove",
      "paths": [
        "/idToken/claims/updated_at",
        "/idToken/claims/given_name",
        "/idToken/claims/family_name",
        "/idToken/claims/username",
        "/idToken/claims/aud/"
      ]
    }
  ]
}
```

#### Example request from {{product_name}}

The following shows a sample request payload for a pre-issue ID token action. This example uses placeholder values instead of personal and sensitive data.

```http
POST / HTTP/1.1
Host: your-service.example.com
Content-Type: application/json

{
  "flowId": "Ec1wMjmiG8",
  "requestId": "20260216T154100Z-r1cd497db865scbfhC1SG17gy000000010zg000000009hap",
  "actionType": "PRE_ISSUE_ID_TOKEN",
  "event": {
    "request": {
      "additionalHeaders": [
        { "name": "Host", "value": ["api.asgardeo.io"] }
      ],
      "clientId": "1u31N7of6gCNR9FqkG1neSlsF_Qa",
      "grantType": "password",
      "scopes": ["address", "openid", "profile"]
    },
    "tenant": {
      "id": "15913",
      "name": "example.com"
    },
    "organization": {
      "id": "24a3cfbc-25bf-4e11-9c0e-4122605a9541",
      "name": "example.com",
      "orgHandle": "example.com",
      "depth": 0
    },
    "user": {
      "id": "e204849c-4ec2-41f1-8ff7-ec1ebff02821",
      "organization": {
        "id": "24a3cfbc-25bf-4e11-9c0e-4122605a9541",
        "name": "example.com",
        "orgHandle": "example.com",
        "depth": 0
      },
      "userType": "LOCAL"
    },
    "userStore": {
      "id": "REVGQVVMVA==",
      "name": "DEFAULT"
    },
    "idToken": {
      "claims": [
        {
          "name": "iss",
          "value": "https://api.asgardeo.io/t/example.com/oauth2/token"
        },
        {
          "name": "sub",
          "value": "e204849c-4ec2-41f1-8ff7-ec1ebff02821"
        },
        {
          "name": "azp",
          "value": "1u31N7of6gCNR9FqkG1neSlsF_Qa"
        },
        {
          "name": "aud",
          "value": ["1u31N7of6gCNR9FqkG1neSlsF_Qa"]
        },
        {
          "name": "auth_time",
          "value": 1769344213
        },
        {
          "name": "amr",
          "value": ["BasicAuthenticator"]
        },
        {
          "name": "expires_in",
          "value": 3600
        },
        {
          "name": "given_name",
          "value": "Alex"
        },
        {
          "name": "family_name",
          "value": "Smith"
        },
        {
          "name": "email",
          "value": "alex.smith@example.com"
        }
      ]
    }
  },
  "allowedOperations": [
    {
      "op": "add",
      "paths": [
        "/idToken/claims/",
        "/idToken/claims/aud/"
      ]
    },
    {
      "op": "replace",
      "paths": [
        "/idToken/claims/aud/",
        "/idToken/claims/expires_in",
        "/idToken/claims/given_name",
        "/idToken/claims/family_name",
        "/idToken/claims/email"
      ]
    },
    {
      "op": "remove",
      "paths": [
        "/idToken/claims/aud/",
        "/idToken/claims/given_name",
        "/idToken/claims/family_name",
        "/idToken/claims/email"
      ]
    }
  ]
}
```

### Expected response from external service

When {{product_name}} invokes your external service as part of the pre-issue ID token action, it expects a response that adheres to the defined API contract.

The response can have three possible states: <code>SUCCESS</code>, <code>FAILED</code>, and <code>ERROR</code>.

- **SUCCESS**: Your external service processed the request successfully and requested modifications to the ID token. {{product_name}} applies the operations and continues the flow.
- **FAILED**: Your service intentionally prevents ID token issuance (e.g., validation or business rules). {{product_name}} returns a <code>400 (Bad Request)</code> to the client with the failure details you provide.
- **ERROR**: A processing or server error in your service. {{product_name}} returns a <code>500 (Server Error)</code> response to the client.

#### Response for SUCCESS state

HTTP status code: <code>200</code>

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
<tr class="even">
<td>operations</td>
<td><p>Array of operations to apply to the ID token claims. These operations must follow the <a href="https://datatracker.ietf.org/doc/html/rfc6902">JSON Patch</a> modification format. Each operation must use <code>op</code> (add, replace, remove), <code>path</code> (from allowedOperations), and for add/replace, <code>value</code>.
</tr>
</tbody>
</table>

Example success response with an added custom claim:

```json
{
  "actionStatus": "SUCCESS",
  "operations": [
    {
      "op": "add",
      "path": "/idToken/claims/-",
      "value": {
        "name": "customSID",
        "value": "12345"
      }
    }
  ]
}
```

!!! tip
    See [sample success responses for pre-issue id token action]({{base_path}}/references/service-extensions/pre-flow-extensions/pre-issue-id-token-action/sample-success-responses/) for more examples, including adding or replacing audience, replacing expires_in, and removing claims.

#### Response for FAILED state

HTTP status code: <code>200</code>

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
<td>Indicates the outcome of the request. For a failed operation, set this value to <code>FAILED</code>.</td>
</tr>
<tr class="even">
<td>failureReason</td>
<td><p>Reason for failing to issue the ID token (e.g., OAuth2 error code). {{product_name}} maps this value to the <code>error</code> field in the response from the <code>/oauth2/token</code> endpoint.</p></td>
</tr>
<tr class="odd">
<td>failureDescription</td>
<td>Offers a detailed explanation of the failure. {{product_name}} maps this value to the <code>error_description</code> field in the <code>/oauth2/token</code> endpoint response.</td>
</tr>
</tbody>
</table>

When the external service returns a <code>200 OK</code> status code with a <code>FAILED</code> state, {{product_name}} maps the failure to an error response and returns it to the application that initiated the token request.

Example response from the external service:

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "actionStatus": "FAILED",
  "failureReason": "invalid_scope",
  "failureDescription": "Scope platinum_state is invalid"
}
```

The application that initiated the token request receives the following error response:

```http
HTTP/1.1 400
Content-Type: application/json

{
  "error": "invalid_scope",
  "error_description": "Scope platinum_state is invalid"
}
```

#### Response for ERROR state

When the external service returns an <code>ERROR</code> state (with HTTP status <code>400</code>, <code>401</code>, or <code>500</code>) or fails to respond entirely, {{product_name}} treats it as an error in executing the action. The application that initiated the token request receives an error response (for example, <code>500 Internal Server Error</code>).

HTTP status code from external service: <code>400</code>, <code>401</code>, or <code>500</code>

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
<td>Indicates the outcome of the request. Set this value to <code>ERROR</code> for an error operation.</td>
</tr>
<tr class="even">
<td>errorMessage</td>
<td><p>The cause of the error.</p></td>
</tr>
<tr class="odd">
<td>errorDescription</td>
<td><p>A detailed description of the error.</p></td>
</tr>
</tbody>
</table>

Example response from the external service:

```http
HTTP/1.1 500
Content-Type: application/json

{
  "actionStatus": "ERROR",
  "errorMessage": "server_error",
  "errorDescription": "Failed to process the response"
}
```

Error response to the application:

```http
HTTP/1.1 500
Content-Type: application/json

{
  "error": "server_error",
  "error_description": "Internal Server Error."
}
```

!!! note
    The <code>errorMessage</code> and <code>errorDescription</code> from the external service's <code>ERROR</code> response doesn't directly include in the error response sent back to the application.

!!! note
    In the OIDC hybrid flow, both <code>FAILED</code> and <code>ERROR</code> responses from your external service treated as server errors.

### Authentication

Configure the authentication scheme when registering the action in {{product_name}}. The following screenshot shows the Authentication configuration panel where you can select the authentication scheme and provide credentials (for example, `username` and `password` for Basic authentication).

![pre-issue-id-token-action-authentication]({{base_path}}/assets/img/guides/actions/pre-issue-id-token-action-authentication-in-ui.png)

- **Basic**: HTTP Basic authentication.
- **Bearer**: OAuth 2.0 Bearer token in the <code>Authorization</code> header.
- **API Key**: API key in a header; you can define the header name (for example, <code>X-API-Key</code>).

## Conditional invocation of pre-issue id token action

Pre-issue ID token actions can trigger conditionally based on configurable execution rules. You can define when the action should run by building conditions in the **Execution Rule** configuration.

The rule configuration supports the following fields:

- **Application**: The specific application that requests the ID token.
- **Grant Type**: The grant type used during the token issuance process (for example, authorization code, password, refresh token).

Each rule field supports the following operators:

- equals
- not equals

You can combine conditions using logical **AND** and **OR** operators. The system uses `AND` to combine conditions in the same group and uses `OR` to combine separate groups. This approach gives you precise control over when to invoke the pre-issue id token action.

![pre-issue-id-token-action-execution-rule]({{base_path}}/assets/img/guides/actions/pre-issue-id-token-action-execution-rule-in-ui.png)

The example above shows an execution rule with two groups: one where the application equals **TestApp**, and another where the grant type equals **authorization code**. The action runs when the runtime meets either condition. You can add more conditions within a group using **+ And**, or add another group using **+ Or**.
