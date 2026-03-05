# Create a provisioning connection

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
To start provisioning users, you must first create a provisioning connection and configure an outbound connector.

1. On the {{ product_name }} Console, go to **Connections** and click **New Connection**.

2. Click **Create Connection** and select **Outbound Provisioning Connection**.

    ![Create an outbound provisioning connection]({{base_path}}/assets/img/guides/outbound-provisioning/create-connection.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select a provisioning connector (e.g., Salesforce, Google, or SCIM2).

    ![Select a provisioning connector]({{base_path}}/assets/img/guides/outbound-provisioning/select-connector-type.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Provide the required properties for the selected connector and click **Finish**.

    !!! note
        Learn about the required properties for each connector:
        <ul>
        <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google">Google</a></li>
        <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce">Salesforce</a></li>
        <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2">SCIM2</a></li>
        </ul>

{% else %}
Follow the steps below to create a custom connection and configure an outbound connector in it.

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

6. Switch on the toggle to enable the configured outbound connector.

    ![Enable outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/enable-outbound-provisioner.png){: width="700" style="border: 0.3px solid lightgrey;"}

7. Click **Update** to save the changes.
{% endif %}
