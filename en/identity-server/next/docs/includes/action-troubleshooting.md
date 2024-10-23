
```json
{
  "logId": "582befe9-6114-4362-8fd4-05496e639fb8",
  "recordedAt": {
    "seconds": 1729488306,
    "nanos": 479103000
  },
  "requestId": "d9b5f323-79cb-4a9e-9d84-f83ab7056122",
  "resultStatus": "SUCCESS",
  "resultMessage": "Call external service endpoint https://example.com for Pre Issue Access Token action.",
  "actionId": "process-action-request",
  "componentId": "action-execution",
  "configurations": {
    "action id": "0ab318c4-af38-4190-ae41-75f35ecdf7b6",
    "action type": "Pre Issue Access Token",
    "action endpoint": "https://example.com",
    "action endpoint authentication type": "BASIC"
  },
  "logDetailLevel": "APPLICATION"
}
```

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
<p>Unique ID for each log event</p>
</td>
</tr>
<tr class="even">
<td>recordedAt</td>
<td><p>Timestamp of log event occurrence</p></td>
</tr>
<tr class="odd">
<td>requestId</td>
<td><p>Unique ID to correlate the log event to a specific request</p></td>
</tr>
<tr class="even">
<td>resultStatus</td>
<td><p>Status of the log event. Either ‘Success’ or ‘Failed’</p></td>
</tr>
<tr class="odd">
<td>resultMessage</td>
<td><p>Description of the log event</p></td>
</tr>
<tr class="even">
<td>actionId</td>
<td><p>ID to identify a specific log event</p></td>
</tr>
<tr class="odd">
<td>componentId</td>
<td><p>ID to identify the component where the log event was carried out</p></td>
</tr>
<tr class="even">
<td>configurations</td>
<td><p>System specific context data relevant to the log event </p></td>
</tr>
<tr class="odd">
<td>input</td>
<td><p>Parameters given by the user which are applicable during the log event</p></td>
</tr>
</tbody>
</table>

To enable diagnostic logs in system configurations, you may add the following configurations to the `deployment.toml` file located in the `<IS_HOME>/repository/conf` directory.

```toml
[server]
diagnostic_log_mode = "full"
```

!!!note
    `[server]` is already defined in the `deployment.toml` file. So you just need to add the value.

Additionally, you may use system debug logs to capture similar context information mentioned above. You can enable it component wise by following the steps described [here.]({{base_path}}/deploy/monitor/monitor-logs/#enable-logs-for-a-component)

!!!note
    It is highly recommended to disable both diagnostic logs and system debug logs once troubleshooting is completed as it may expose sensitive information included in reponses and requests.
