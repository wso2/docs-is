# Enable application-level outbound provisioning

Application-level outbound provisioning lets you provision a user to an external system when they interact with a specific application. When configured, application-level provisioning takes priority over the [organization-level configuration]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level) for that application. If an application does not have its own outbound provisioning configuration, the organization-level configuration is used as the fallback.

Follow the guides below to learn how to configure outbound provisioning at the application level.

## Create a provisioning connection

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
To start provisioning users, you must first create a provisioning connection and configure an outbound connector.

1. On the {{ product_name }} Console, go to **Connections** and click **New Connection**.
2. Click **Create Connection** and select **Outbound Provisioning Connection**.

    ![Create an outbound provisioning connection]({{base_path}}/assets/img/guides/outbound-provisioning/create-connection.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select a provisioning connector (e.g., Salesforce, Google, or SCIM2).

    ![Select a provisioning connector]({{base_path}}/assets/img/guides/outbound-provisioning/select-connector-type.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Provide the required properties for the selected connector and click **Finish**.

    ![Provide required properties]({{base_path}}/assets/img/guides/outbound-provisioning/required-properties.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. On the **Outbound Provisioning** tab of the created connection, configure the required settings, such as the **Authentication Method**.

    ![Configure authentication method]({{base_path}}/assets/img/guides/outbound-provisioning/authentication-method.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Switch on the toggle to enable the configured outbound connector.

7. Click **Update** to save the changes.

!!! note "Group-based outbound provisioning"
    You can also configure the connector to provision users based on their assigned groups. For more information, see [Group-based outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/group-based-provisioning).
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

## Configure the application

Once you complete the creation of the outbound provisioning connection, you must enable it for an application.

To configure an application in {{product_name}}:

1. On the {{product_name}} Console, go to **Applications**.

2. Select your application from the list and navigate to its **Provisioning** tab.

3. Under **Outbound Provisioning Configuration**, click **New Provisioner**.

    {% if product_name == "Asgardeo" or is_version > "7.2.0" %}
    ![Configure application-level outbound provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/application-wise.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% else %}
    ![Configure application-level outbound provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/configure-idp-level-provisioning.png){: width="700" style="border: 0.3px solid lightgrey;"}
    {% endif %}

4. Select the connection in which you have configured outbound provisioning as the **Connection** and the relevant outbound connector as the **Provisioning Connector**.

    !!! note "Provisioning modes"
        - **Blocking**: Select this to make the user onboarding process synchronous with the outbound provisioning process. If selected, {{product_name}} waits for the response from the outbound connector before proceeding with the user creation.
        - **JIT Outbound**: Select this to enable outbound provisioning for JIT-provisioned users during authentication.

5. Click **Add**.

## Try it out

1. Navigate to the application URL.

2. Click **Login** to open the {{product_name}} login page.

3. Sign in to your application.

    !!! note
        Signing in to the application triggers outbound provisioning to the external system.
