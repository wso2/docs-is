# Understanding actions

Actions allow you to customize specific flows of {{product_name}} by integrating custom code hosted in an external web service. When {{product_name}} initiates a flow, it calls an endpoint provided by the web service and executes the custom code synchronously, as part of the flow. This flexibility enables you to extend and modify a flow's behavior to meet your unique requirements.

## Explore action types

The capabilities of an action are determined by its execution point within the {{product_name}} runtime.

{{product_name}} defines several types of actions, each tailored to customize a specific flow within the product. While all action types use the same general syntax for requests and responses exchanged between {{product_name}} and the external web service, they differ in the specifics of the JSON objects involved. When implementing your external service, you must develop your code according to the REST API contract associated with the type of action you are using. The following flows support customization with custom code.

!!! note
    Currently, the product supports only the <code>pre issue access token</code> trigger. The other action types listed below are planned for inclusion by early December 2024.

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
<td>Early November 2024</td>
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
<td>Early December 2024</td>
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
<td>Early November 2024</td>
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
<td>Early December 2024</td>
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

{% if product_name == "WSO2 Identity Server" %}
!!! note
    Refer to [Fine-tune HTTP client connections]({{base_path}}/guides/customize/actions/setting-up-actions/#configuring-http-client-connections) for details on adjusting timeouts, connection pooling, and retries.
{%endif %}

Requests will not be retried if the external service responds with HTTP status codes 200 (OK), 400 (Bad Request), 401 (Unauthorized), or any other codes not listed above as retry scenarios.

### Troubleshooting

You can use diagnostic logs to capture detailed information during the troubleshooting process. Log captures requests sent from the Identity Server to your external action service, track the responses received, and include status and context data for response handling.

Below is an example of a diagnostic log generated during the pre-issue access token action flow, while sending the request initiated in the identity server to the external endpoint.

{% if product_name == "WSO2 Identity Server" %}
```json
{
  "logId": "582befe9-6114-4362-8fd4-05496e639fb8",
  "recordedAt": {
    "seconds": 1729488306,
    "nanos": 479103000
  },
  "requestId": "d9b5f323-79cb-4a9e-9d84-f83ab7056122",
  "resultStatus": "SUCCESS",
  "resultMessage": "Call external service endpoint https://myextension.com for Pre Issue Access Token action.",
  "actionId": "process-action-request",
  "componentId": "action-execution",
  "configurations": {
    "action id": "0ab318c4-af38-4190-ae41-75f35ecdf7b6",
    "action type": "Pre Issue Access Token",
    "action endpoint": "https://myextension.com",
    "action endpoint authentication type": "BASIC"
  },
  "logDetailLevel": "APPLICATION"
}
```
{%else %}

![Asgardeo logs]({{base_path}}/assets/img/guides/actions/action-diagnostics-logs-in-ui.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{%endif %}

The following table gives an explanation to each property included in the diagnostic log event.

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>logId</td>
<td>
<p>Unique ID for each log event.</p>
</td>
</tr>
<tr class="even">
<td>recordedAt</td>
<td><p>Timestamp of log event occurrence.</p></td>
</tr>
<tr class="odd">
<td>requestId</td>
<td><p>Unique ID to correlate the log event to a specific request.</p></td>
</tr>
<tr class="even">
<td>resultStatus</td>
<td><p>Status of the log event. Either ‘Success’ or ‘Failed’.</p></td>
</tr>
<tr class="odd">
<td>resultMessage</td>
<td><p>Description of the log event.</p></td>
</tr>
<tr class="even">
<td>actionId</td>
<td><p>ID to identify a specific log event.</p></td>
</tr>
<tr class="odd">
<td>componentId</td>
<td><p>ID to identify the component where the log event was carried out.</p></td>
</tr>
<tr class="even">
<td>configurations</td>
<td><p>System specific context data relevant to the log event.</p></td>
</tr>
<tr class="odd">
<td>input</td>
<td><p>Parameters given by the user which are applicable during the log event.</p></td>
</tr>
</tbody>
</table>

{% if product_name == "WSO2 Identity Server" %}

To enable diagnostic logs in system configurations, you may add the following configurations to the `deployment.toml` file located in the `<IS_HOME>/repository/conf` directory.

```toml
[server]
diagnostic_log_mode = "full"
```

!!!note
    `[server]` is already defined in the `deployment.toml` file. So you just need to add the value.

Additionally, you may use system debug logs to capture similar context information mentioned above. You can enable it component wise by following the steps described [here.]({{base_path}}/deploy/monitor/monitor-logs/#enable-logs-for-a-component)

For an example, your configuration should look like below.

```
logger.org-wso2-carbon-identity-action-execution.name=org.wso2.carbon.identity.action.execution
logger.org-wso2-carbon-identity-action-execution.level=DEBUG

loggers = org-wso2-carbon-identity-action-execution
```

!!!note
    It is highly recommended to disable both diagnostic logs and system debug logs once troubleshooting is completed as it may expose sensitive information included in responses and requests.

{%else %}
You may view the diagnostics logs under the logs tab in Asgardeo. [Refer here]({{base_path}}/guides/asgardeo-logs/diagnostic-logs/) to learn more about diagnostic logs in Asgardeo.
{%endif %}
