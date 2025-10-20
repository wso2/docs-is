#### Configuring HTTP Client Timeout and Retry Settings

To configure the timeout periods and retry counts for HTTP client connections initiated by WSO2 Identity Server to external services, add the following configurations to the `deployment.toml` file located in the `<IS_HOME>/repository/conf/` directory:

<table>
<thead>
<tr class="header">
<th>Property</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>http_client.read_timeout</td>
<td>
<p>The maximum time (in milliseconds) the server will wait for a response from the external service.</p>
</td>
</tr>
<tr class="even">
<td>http_client.request_timeout</td>
<td><p>The maximum time (in milliseconds) the server will wait to obtain a connection from the connection pool.</p></td>
</tr>
<tr class="odd">
<td>http_client.connection_timeout</td>
<td><p>The maximum time (in milliseconds) the server will wait to establish a connection to the external service.</p></td>
</tr>
<tr class="even">
<td>http_client.connection_pool_size</td>
<td><p>The size of the HTTP connection pool used for outbound requests.</p></td>
</tr>
<tr class="odd">
<td>http_client.retry_count</td>
<td><p>Number of retry attempts made in case of a failure. Refer to the <a href="{{base_path}}/guides/service-extensions/understanding-service-extensions/#time-out-and-retry">list of http codes</a> that trigger retries.</p></td>
</tr>
</tbody>
</table>

Sample configuration is as follows:

```toml
[actions]
http_client.read_timeout = 6000
http_client.request_timeout = 3000
http_client.connection_timeout = 3000
http_client.connection_pool_size = 10
http_client.retry_count = 1

```
