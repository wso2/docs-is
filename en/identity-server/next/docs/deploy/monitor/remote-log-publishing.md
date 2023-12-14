# Remote Log Publishing

The Remote Log Publishing feature in {{ product_name }} allows organizations to securely transmit and store audit and carbon logs on an external server. This capability ensures that critical log data is not only preserved in a secure location but also remains readily accessible for thorough analysis and compliance auditing.

## Setting Up Remote Audit Log Publishing

### Prerequisites
- Ensure that the WSO2 Identity Server is up and running.
- Have access to an external log storage solution that is reachable over the network.

Follow the steps below to configure remote log publishing to an external system:

1. On the {{ product_name }} Console, go to **Server**.
2. Click **Remote Log Publishing**.
3. Select Audit Logs or Carbon Logs as per your requirement.
3. Enter the following details of the remote log publisher and click **Update**:

![Remote Log Publishing Configuration]({{base_path}}/assets/img/setup/monitor/remote-log-publishing-config.png){: width="600" style="border: 0.3px solid lightgrey;"}

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
        <th>Example Value</th>
    </tr>
    <tr>
        <td>Destination URL</td>
        <td>The URL of the remote log server.</td>
        <td><code>https://logserver.example.com/store</code></td>
    </tr>
    <tr>
        <td>Connection Timeout</td>
        <td>The timeout in milliseconds for connecting to the remote server.</td>
        <td><code>2000</code></td>
    </tr>
    <tr>
        <td>Verify Hostname</td>
        <td>Whether to verify the remote server's hostname against its SSL certificate.</td>
        <td><code>true</code> or <code>false</code></td>
    </tr>
    <tr>
        <td>Remote Server Username</td>
        <td>The username for basic authentication with the remote server.</td>
        <td><code>admin</code></td>
    </tr>
    <tr>
        <td>Remote Server Password</td>
        <td>The password for basic authentication with the remote server.</td>
        <td><code>admin_password</code></td>
    </tr>
    <tr>
        <td>Keystore Location</td>
        <td>The file path to the keystore for SSL connections.</td>
        <td><code>/etc/identity/keystore.jks</code></td>
    </tr>
    <tr>
        <td>Keystore Password</td>
        <td>The password for the keystore.</td>
        <td><code>keystore_password</code></td>
    </tr>
    <tr>
        <td>Truststore Location</td>
        <td>The file path to the truststore for SSL connections.</td>
        <td><code>/etc/identity/truststore.jks</code></td>
    </tr>
    <tr>
        <td>Truststore Password</td>
        <td>The password for the truststore.</td>
        <td><code>truststore_password</code></td>
    </tr>
</table>  


### Verifying Configuration

After the configurations are set, generate test log events to ensure that the logs are being successfully published to the external system.

## Security Considerations

Secure the transmission of logs by utilizing HTTPS and other security mechanisms to protect the data in transit.

## Troubleshooting

If any issues arise with remote log publishing, check the network connectivity, verify the configurations, and ensure the external log service is operational.
