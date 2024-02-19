# Enable organization-level outbound provisioning

Organization-level outbound provisioning lets you provision a user to an outbound connector at the time a user onboards to your organization through self-signup or when an administrator creates a user account through the Console.

Follow the guides below to learn how to configure outbound provisioning at the organization level.

1. Create an outbound connector. To do so,

    1. On the {{ product_name }} Console, click **Connections** and click **New Connection**.

    2. Click **Create Connection** and select **Custom Connector**.

    3. Provide a name and a description for the connector and click **Finish**.

    4. On the **Outbound provisioning** tab of the created connection, select **New Connector**.

    5. Configure the outbound connector of your choice and click **Finish**.

        !!! note
            {{product_name}} supports the following outbound connectors. Learn how to configure the connector of your choice by following the relevant guide.
            <ul>
                <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google">Google</a></li>
                <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce">Salesforce</a></li>
                <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2">SCIM2</a></li>
            </ul>

    5. Switch on the toggle to enable the configured outbound connector.

        ![Enable outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/enable-outbound-provisioner.png){: width="700" style="border: 0.3px solid lightgrey;"}

    6. Click **Update** to save the changes.

    !!! note
        Any outbound connector that you have configured and enabled for IdP-level outbound provisioning will also be  available for [organization-level]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level) provisioning.

2. Configure the resident application. To do so,

    1. On the {{product_name}} Console, click **Login & Registration**.

    2. Go to **Provisioning Settings** > **Outbound Provisioning Configuration** and click **New Provisioner**.

    3. Select the connection in which you have configured outbound provisioning as the **Connection** and the relevant outbound connector as the **Provisioning Connector**.

        !!! note
            You can select **Blocking** to make the user onboarding process synchronous with the outbound provisioning process. If selected, {{product_name}} waits for the response from the external IdP before proceeding with the user creation.

        ![Configure the resident identity outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/configure-resident-idp.png){: width="700" style="border: 0.3px solid lightgrey;"}

    5. Click **Finish**.

