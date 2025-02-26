# Remote Log Publishing

The Remote Log Publishing feature in {{ product_name }} allows organizations to securely transmit and store [audit logs]({{base_path}}/deploy/monitor/monitor-logs/) in an external server. This capability ensures that critical log data is not only preserved in a secure location but also remains readily accessible for thorough analysis and compliance auditing.

## Set up

!!! note "Before you begin"

    - Ensure that the WSO2 Identity Server is up and running.
    - Have access to an external log storage solution that is reachable over the network.

Follow the steps below to configure remote log publishing to an external system:

1. On the {{ product_name }} Console, click the **Root Organization** dropdown at the top and click **Manage Root Organizations**.
2. Click on the gear icon to enter the system settings.

3. Enter the following details in the **Remote Log Publishing** tab and click **Update**:

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
            <td>Connection timeout</td>
            <td>The timeout in milliseconds for connecting to the remote server.</td>
            <td><code>2000</code></td>
        </tr>
        <tr>
            <td>Verify the hostname</td>
            <td>Select to verify the remote server's hostname against its SSL certificate.</td>
            <td><code>true</code> or <code>false</code></td>
        </tr>
        <tr>
            <td>Remote server username</td>
            <td>The username for basic authentication with the remote server.</td>
            <td><code>admin</code></td>
        </tr>
        <tr>
            <td>Remote server password</td>
            <td>The password for basic authentication with the remote server.</td>
            <td><code>admin_password</code></td>
        </tr>
        <tr>
            <td>Keystore location</td>
            <td>The file path to the keystore for SSL connections.</td>
            <td><code>/etc/identity/keystore.jks</code></td>
        </tr>
        <tr>
            <td>Keystore password</td>
            <td>The password for the keystore.</td>
            <td><code>keystore_password</code></td>
        </tr>
        <tr>
            <td>Truststore location</td>
            <td>The file path to the truststore for SSL connections.</td>
            <td><code>/etc/identity/truststore.jks</code></td>
        </tr>
        <tr>
            <td>Truststore password</td>
            <td>The password for the truststore.</td>
            <td><code>truststore_password</code></td>
        </tr>
    </table>  

!!! tip

    - After the configurations are set, generate test log events to ensure that the logs are being successfully published to the external system.

    - Secure the transmission of logs by utilizing HTTPS and other security mechanisms to protect the data in transit.

    - If any issues arise with remote log publishing, check the network connectivity, verify the configurations, and ensure the external log service is operational.
