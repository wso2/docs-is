# Understanding actions

Actions allow you to customize specific flows of {{product_name}} by integrating custom code hosted in an external web service. When {{product_name}} initiates a flow, it calls an endpoint provided by the web service and executes the custom code synchronously, as part of the flow. This flexibility enables you to extend and modify a flow's behavior to meet your unique requirements.

## Explore action types

The capabilities of an action are determined by its execution point within the {{product_name}} runtime.

{{product_name}} defines several types of actions, each tailored to customize a specific flow within the product. While all action types use the same general syntax for requests and responses exchanged between {{product_name}} and the external web service, they differ in the specifics of the JSON objects involved. When implementing your external service, you must develop your code according to the REST API contract associated with the type of action you are using. The following flows support customization with custom code.

!!! note
    Currently, the product supports only the <code>pre issue access token</code> trigger. The other action types listed below are planned for inclusion by September 2024.

<table>
<thead>
<tr class="header">
<th>Flow</th>
<th>Trigger</th>
<th>Availability</th>
<th>Example use cases</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>Login</td>
<td>Authenticate</td>
<td>September 2024</td>
<td>
<ul>
<li><p>Call an external service to authenticate the user.</p></li>
<li><p>Make access decisions based on a risk factor reading obtained from a third party risk engine, or data/grants read from an external service (elevate access, suspend, etc).</p></li>
<li><p>Prompt for additional inputs required by business systems to verify access.</p></li>
</ul>
</td>
</tr>
<tr class="even">
<td>Token management</td>
<td>Pre issue access token</td>
<td>Early access (beta)</td>
<td>
<ul>
<li><p>Prevent tokens from being issued based on policy or change permissions, scopes.</p></li>
<li><p>Add custom claims to access tokens.</p></li>
<li><p>Change the access token and refresh token validity based on a rule.</p></li>
</ul>
</td>
</tr>
<tr class="odd">
<td>Registration</td>
<td>Pre registration</td>
<td>September 2024</td>
<td>
<ul>
<li><p>Deny registration by location.</p></li>
<li><p>Set additional data in the user profile.</p></li>
<li><p>Initiate an external service to trigger a verification such as an approval, biometrics, allowed lists, etc.</p></li>
<li><p>Verify for sanctioned countries, initiate screening processes.</p></li>
</ul>
</td>
</tr>
<tr class="even">
<td>Password update</td>
<td>Pre password update</td>
<td>September 2024</td>
<td>
<ul>
<li><p>Challenge with an additional verification factor before allowing to update password.</p></li>
<li><p>Integrate with credential intelligence services to verify the security of password, or check against allowed lists.</p></li>
</ul>
</td>
</tr>
<tr class="odd">
<td>Profile update</td>
<td>Pre profile update</td>
<td>September 2024</td>
<td>
<ul>
<li><p>Challenge with an additional verification factor before allowing to update sensitive attributes.</p></li>
<li><p>Redirect to a third party service for verification.</p></li>
<li><p>Verify for sanctioned countries, initiate screening processes.</p></li>
</ul>
</td>
</tr>
</tbody>
</table>

## How actions work

Each type of action is executed at a specific extension point within a particular runtime flow of {{product_name}}. When an action is triggered, {{product_name}} calls your external service and waits for a response. Upon receiving the response, {{product_name}} performs any specified operations and continues with the flow.

The following diagram illustrates the sequence of these steps:

![how-actions-work]({{base_path}}/assets/img/guides/actions/how-actions-work.png){: width="650" style="display: block; margin: 0; border: 0px;"}

### Request from {{product_name}} 

{{product_name}} sends an HTTPS POST request to your external web service with a JSON payload that includes data relevant to the flow that triggered the action. The request consists of the following components:

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
        <td>
        <p>A unique correlation identifier for the flow (e.g., a login process involving input collection, authentication, and two-factor authentication) initiated and executed by {{product_name}}.
        <div class="admonition note">
            <p class="admonition-title">note</p>
            Currently, not all actions incorporate a flowId. The presence of a flowId depends on the type of action and the executed flow.
        </div>
        </p>
</td>
</tr>
<tr class="even">
<td>requestId</td>
<td><p>A unique correlation identifier that associates the request received by {{product_name}}.</p></td>
</tr>
<tr class="odd">
<td>actionType</td>
<td><p>Indicates the execution point within the {{product_name}} runtime where your external service is called. Refer to <a href="#explore-action-types">Explore Action Types</a> for a list of supported trigger points.</p></td>
</tr>
<tr class="even">
<td>event</td>
<td><p>Contains context information necessary for your external service to perform state or flow-changing operations. The structure of the event data depends on the type of action.</p></td>
</tr>
<tr class="odd">
<td>allowedOperations</td>
<td><p>Specifies which elements within the event data can be modified. For a given JSON resource in the <code>event</code>, you may add fields, replace values, or remove fields. Additionally, your external service may have the option to redirect based on the flow.</p></td>
</tr>
</tbody>
</table>

### Responses {{product_name}} expects

Your service must handle the action by responding to the request from WSO2 Identity Server. The JSON payload of your response may include different action statuses and can contain an operations object to indicate state or flow changes. The specifics of these statuses and operations depend on the action type.

### Time out and retry

When WSO2 Identity Server calls an external service, it enforces a default read timeout of five seconds and a connection timeout of two seconds. WSO2 Identity Server will attempt at most one retry for the following HTTP status codes received from your service:

<table>
<thead>
<tr class="header">
<th>Status code</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>500</td>
<td>
<p>Internal Server Error.
If the error response includes an acceptable payload, it is treated as an error state that must be addressed by responding back to the client or as a flow breaker. Otherwise, requests will be retried.
</p>
</td>
</tr>
<tr class="even">
<td>502</td>
<td><p>Bad Gateway.</p></td>
</tr>
<tr class="odd">
<td>503</td>
<td><p>Service Unavailable.</p></td>
</tr>
<tr class="even">
<td>504</td>
<td><p>Gateway Timeout.</p></td>
</tr>
</tbody>
</table>

!!! note
    Refer to [Configuring HTTP Client Connections]({{base_path}}/guides/customize/actions/setting-up-actions/#configuring-http-client-connections) to adjust timeouts, connection pooling, and retries in deployment.toml for optimal performance.

Requests will not be retried if the external service responds with HTTP status codes 200 (OK), 400 (Bad Request), 401 (Unauthorized), or any other codes not listed above as retry scenarios.

### Troubleshooting

!!! note
    Troubleshooting logs are not yet incorporated but are planned for inclusion by end August 2024.


