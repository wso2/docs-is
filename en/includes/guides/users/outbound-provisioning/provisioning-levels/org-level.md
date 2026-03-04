# Enable organization-level outbound provisioning

Organization-level outbound provisioning allows you to provision users to an external system when:

- a user is provisioned in {{product_name}} over an API.
- an administrator onboards a user from the {{product_name}} Console.
- a user self-signs up from a {{product_name}} login page.
- a user is JIT provisioned in {{product_name}}.

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
!!! note
    Organization-level provisioning serves as the default configuration for all applications. If [application-level outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/application-level) is configured for a specific application, it takes priority over this configuration for that application.
{% endif %}

Follow the guides below to learn how to configure outbound provisioning at the organization level.

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
    You can also configure outbound provisioning based on assigned groups. For more information, see [Group-based outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/group-based-provisioning).
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

## Configure the resident application

Once you complete the creation of the outbound provisioning connection, you must enable it for the entire organization via the resident application.

To configure the resident application in {{product_name}}:

1. On the {{product_name}} Console, go to **Login & Registration**.

2. Under **Provisioning Settings**, click **Outbound Provisioning Configuration** and click **New Provisioner**.

    {% if product_name == "Asgardeo" or is_version > "7.2.0" %}
    ![Configure the resident identity outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/set-provisioning-connection-org-wise.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% endif %}

3. Select the connection in which you have configured outbound provisioning as the **Connection** and the relevant outbound connector as the **Provisioning Connector**.

    !!! note "Provisioning modes"
        - **Blocking**: Select this to make the user onboarding process synchronous with the outbound provisioning process. If selected, {{product_name}} waits for the response from the external system before proceeding with the user creation.
        {% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
        - **JIT Outbound**: Select this to enable outbound provisioning for JIT provisioned users during authentication.
        {% else %}
        - **JIT Outbound** (Update level 7.0.0.73+): Select this to enable outbound provisioning for JIT provisioned users during authentication.
        {% endif %}

    {% if product_name == "Asgardeo" or is_version > "7.2.0" %}
    ![View configured provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/configured-one.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% else %}
    ![Configure the resident identity outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/configure-resident-idp.png){: width="700" style="border: 0.3px solid lightgrey;"}
    {% endif %}

4. Click **Finish**.

## Try it out

1. On the {{product_name}} Console, do one of the following.
    <ul>
    <li>Use a <a href="{{base_path}}/apis/organization-apis/org-user-mgt/#tag/Users-Endpoint/operation/createUser">SCIM API</a> to create a user.</li>
    <li><a href="{{base_path}}/guides/users/manage-users/#onboard-single-user">Create a user from the Console</a></li>
    <li><a href="{{base_path}}/guides/account-configurations/user-onboarding/self-registration/">Enable self-registration</a> and let a user self-register to {{product_name}}.</li>
    <li><a href="{{base_path}}/guides/authentication/jit-user-provisioning/">Enable JIT-provisioning</a> and let a user login with an external identity provider.</li>
    </ul>

    !!! note
        Onboarding a user with any of the above methods automatically triggers outbound provisioning to the external system.

2. [Delete the user]({{base_path}}/guides/users/manage-users/#delete-a-user). The user will be removed from the external system.
