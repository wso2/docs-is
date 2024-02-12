# Configure outbound provisioning with SCIM2

This guide explains how you can provision users to a SCIM2 application at the time a user is onboarded to {{product_name}}.

## Configure the SCIM2 outbound connector

To register a SCIM2 application as an outbound connector,

1. On the {{ product_name }} Console, click **Connections** and click **New Connection**.

2. Click **Create Connection** and select **Custom Connector**.

3. Provide a name and a description for the connector and click **Finish**.

4. Go to the **Outbound Provisioning** tab of the created connection.

    ![New outbound connector]({{base_path}}/assets/img/guides/outbound-provisioning/new-outbound-connector.png){: width="700" style="border: 0.3px solid lightgrey;"}

3. Select **New Connector** > **SCIM2** and click **Next**.

4. Enter the following details:

    <table>
        <tr>
            <td>Username</td>
            <td>Username used in the SCIM2 application</td>
        </tr>
        <tr>
            <td>Password</td>
            <td>Password used in the SCIM2 application</td>
        </tr>
        <tr>
            <td>User Endpoint</td>
            <td>The SCIM2 user endpoint of the application</br>
            e.g. for {{product_name}} it is <code>https://localhost:9443/scim2/Users</code></td>
        </tr>
        <tr>
            <td>Group Endpoint</td>
            <td>The SCIM2 group endpoint of the application</br>
            e.g. for {{product_name}} it is <code>https://localhost:9443/scim2/Groups</code></td>
        </tr>
        <tr>
            <td>User Store Domain</td>
            <td>The user store to which users will be provisioned.</td>
        </tr>
        <tr>
            <td>Enable Password Provisioning</td>
            <td>Select the checkbox to set a default password for the user with the SCIM2 request and enter the default password.</td>
        </tr>

        Enable Password Provisioning l
    </table>

5. Click **Next**, review the details and click **Register** to add the connector.

6. Under **Outbound Provisioning**, switch on the toggle corresponding to the created connector to enable outbound provisioning.

    ![New outbound connector]({{base_path}}/assets/img/guides/outbound-provisioning/scim/enable-scim-connector.png){: width="700" style="border: 0.3px solid lightgrey;"}

7. Click **Update** to save the changes.
