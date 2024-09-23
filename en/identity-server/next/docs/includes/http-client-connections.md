## Fine tune HTTP Client Connections

You can configure the HTTP connection settings in the deployment.toml file located in `<IS_HOME>/repository/conf/` to fine-tune connections initiated by WSO2 Identity Server to external services implementing actions.

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
<p>Configures the maximum time (in milliseconds) the server will wait for a response from the external service</p>
</td>
</tr>
<tr class="even">
<td>http_client.request_timeout</td>
<td><p>Configures the time (in milliseconds) to wait for obtaining a connection from the connection pool</p></td>
</tr>
<tr class="odd">
<td>http_client.connection_timeout</td>
<td><p>Configures the timeout (in milliseconds) for establishing a connection to the external service</p></td>
</tr>
<tr class="even">
<td>http_client.connection_pool_size</td>
<td><p>Configures the size of the HTTP connection pool used for outbound requests</p></td>
</tr>
<tr class="odd">
<td>http_client.retry_count</td>
<td><p>Determines the number of retry attempts are made in case of connection failures. <a href="{{base_path}}/guides/customize/actions/understanding-actions/#time-out-and-retry">Explore more for allowed status codes</a> where retries can happen</p></td>
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
