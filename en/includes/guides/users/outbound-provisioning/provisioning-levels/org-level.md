# Enable organization-level outbound provisioning

Organization-level outbound provisioning lets you provision a user in an outbound connector when,

<ul>
    <li>a user is provisioned in {{product_name}} over an API.</li>
    <li>an administrator onboards a user from the {{product_name}} Console.</li>
    <li>a user self signs up from a {{product_name}} login page.</li>
    <li>a user is JIT provisioned in {{product_name}}.</li>
</ul>

Follow the guides below to learn how to configure outbound provisioning at the organization level.

## Configure a connection

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

5. Switch on the toggle to enable the configured outbound connector.

    ![Enable outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/enable-outbound-provisioner.png){: width="700" style="border: 0.3px solid lightgrey;"}

6. Click **Update** to save the changes.

## Configure the resident application

Follow the steps below to configure the resident application in {{product_name}} to enable outbound provisioning.

1. On the {{product_name}} Console, click **Login & Registration**.

2. Go to **Provisioning Settings** > **Outbound Provisioning Configuration** and click **New Provisioner**.

3. Select the connection in which you have configured outbound provisioning as the **Connection** and the relevant outbound connector as the **Provisioning Connector**.

    !!! note
        You can select **Blocking** to make the user onboarding process synchronous with the outbound provisioning process. If selected, {{product_name}} waits for the response from the outbound connector before proceeding with the user creation.

        {% if product_name == "WSO2 Identity Server" and is_version != "7.0.0" %}
        You can select **JIT Outbound** to enable outbound provisioning for JIT provisioned users during authentication.
        {% else %}
        If you are on an update level that is greater than or equal to 7.0.0.73, you can select **JIT Outbound** to enable outbound provisioning for JIT provisioned users during authentication.
        {% endif %}

    ![Configure the resident identity outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/configure-resident-idp.png){: width="700" style="border: 0.3px solid lightgrey;"}

5. Click **Finish**.

## Try it out

1. On the {{product_name}} Console, do one of the following.
    <ul>
    <li>Use a <a href="{{base_path}}/apis/organization-apis/org-user-mgt/#tag/Users-Endpoint/operation/createUser">SCIM API</a> to create a user.</li>
    <li><a href="{{base_path}}/guides/users/manage-users/#onboard-single-user">Create a user from the Console</a></li>
    <li><a href="{{base_path}}/guides/account-configurations/user-onboarding/self-registration/">Enable self-registration</a> and let a user self-register to {{product_name}}.</li>
    <li><a href="{{base_path}}/guides/authentication/jit-user-provisioning/">Enable JIT-provisioning</a> and let a user login with an external identity provider.</li>
    </ul>

    !!! note
        Onboarding a user with any of the above methods automatically triggers outbound provisioning in the configured outbound connector.

2. [Delete the user]({{base_path}}/guides/users/manage-users/#delete-a-user). The user will be removed from the outbound connector.



