# Remote Log Publishing

Remote Log Publishing enables organizations to securely transmit and store both audit and diagnostic logs in an external server. This capability ensures that critical log data is preserved in a secure location while remaining accessible for analysis and compliance auditing.

## Configure Remote Log Publishing

Follow these steps to set up remote log publishing:

1. On the Asgardeo Console, navigate to **Logs**.
2. Click on the **Configure** button in **Remote Log Publishing**.
3. You will see two sections for configuring remote publishers:
    * Diagnostic Logs Publisher
    * Audit Logs Publisher

!!! warning
    - Configuration updates may take up to 15 minutes to propagate to the server.
    - There can be a delay of up to 5 minutes in log publishing after an event occurs.

For each publisher, you can configure the following settings:

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
        <th>Example Value</th>
    </tr>
    <tr>
        <td>Destination URL</td>
        <td>The URL of the remote log server where logs will be published.</td>
        <td><code>https://logserver.example.com/store</code></td>
    </tr>
    <tr>
        <td>Log publish interval</td>
        <td>The time interval in minutes between log publishing attempts. Must be at least 15 minutes.</td>
        <td><code>15</code></td>
    </tr>
    <tr>
        <td>Connection timeout</td>
        <td>The timeout in milliseconds for connecting to the remote server. Timeout should be between 1000 and 60000.</td>
        <td><code>1000</code></td>
    </tr>
    <tr>
        <td>Verify the hostname</td>
        <td>When enabled, verifies the remote server's hostname against its SSL certificate.</td>
        <td>False</td>
    </tr>
    <tr>
        <td>Remote server username</td>
        <td>The username for basic authentication with the remote server.</td>
        <td><code>username</code></td>
    </tr>
    <tr>
        <td>Remote server password</td>
        <td>The password for basic authentication with the remote server.</td>
        <td><code>password</code></td>
    </tr>
</table>

After configuring the settings:

1. Click **Update** to save your configuration.
2. Use the **Test** button to verify the connection with your remote server using the saved configuration. This will publish logs for last 15 minutes.

!!! tip
    - Configure both publishers separately if you want to store audit and diagnostic logs in different locations.
    - Ensure secure transmission by using HTTPS URLs for your destination servers.
    - Test the publisher configuration after setup to verify connectivity.
    - If you encounter issues, check your network connectivity and verify the remote server credentials.