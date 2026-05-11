# Set up outbound provisioning

{% if product_name == "Asgardeo" or is_version > "7.2.0" %}
To start provisioning users, you must first create a provisioning connection and configure an outbound connector, then enable it at the organization or application level.

## Step 1: Create a provisioning connection

1. On the {{ product_name }} Console, go to **Connections** and click **New Connection**.

2. Click **Create Connection** and select **Outbound Provisioning Connection**.

    ![Create an outbound provisioning connection]({{base_path}}/assets/img/guides/outbound-provisioning/create-connection.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select a provisioning connector (e.g., {% if product_name == "Asgardeo" %}SCIM2{% else %}Salesforce, Google, or SCIM2{% endif %}).

    ![Select a provisioning connector]({{base_path}}/assets/img/guides/outbound-provisioning/select-connector-type.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Provide the required properties for the selected connector and click **Finish**.

    !!! note
        Learn about the required properties for each connector:
        <ul>
        {% if product_name != "Asgardeo" %}<li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/google">Google</a></li>
        <li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/salesforce">Salesforce</a></li>
        {% endif %}<li><a href="{{base_path}}/guides/users/outbound-provisioning/outbound-connectors/scim2">SCIM2</a></li>
        </ul>

## Step 2: Enable outbound provisioning

Once the connection is created, enable outbound provisioning at the required level. Organization-level provisioning acts as the default for all applications, while application-level provisioning applies only to a specific application and overrides the organization-level configuration for that application.

=== "Organization-level"

    Organization-level outbound provisioning acts as the default provisioner for all applications. Users are automatically provisioned to the external system when:

    - a user is provisioned in {{product_name}} over an API.
    - an administrator onboards a user from the {{product_name}} Console.
    - a user self-signs up from a {{product_name}} sign-in page.
    - a user is JIT (Just-In-Time) provisioned in {{product_name}}.

    To enable organization-level outbound provisioning in {{product_name}}:

    1. On the {{product_name}} Console, go to **Login & Registration**.

    2. Under **Provisioning Settings**, click **Outbound Provisioning Configuration** and click **New Provisioner**.

    3. Select the connection in which you have configured outbound provisioning as the **Connection** and the relevant outbound connector as the **Provisioning Connector**.

        ![Configure the org-wide outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/set-provisioning-connection-org-wise.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. Enable any of the following.

        {% if product_name == "WSO2 Identity Server" %}
        | Option | Description |
        |---|---|
        | **Blocking** | Makes the user onboarding process synchronous with the outbound provisioning process. {{product_name}} waits for the response from the external system before proceeding with the user creation. |
        | **JIT Outbound** | Enables outbound provisioning for JIT provisioned users during authentication. |
        {% else %}
        | Option | Description |
        |---|---|
        | **JIT Outbound** | Enables outbound provisioning for JIT provisioned users during authentication. |
        {% endif %}

    5. Click **Finish**.

    ### Try it out

    1. On the {{product_name}} Console, do one of the following.
        <ul>
        <li>Use a <a href="{{base_path}}/apis/organization-apis/org-user-mgt/#tag/Users-Endpoint/operation/createUser">SCIM API</a> to create a user.</li>
        <li><a href="{{base_path}}/guides/users/manage-users/#onboard-single-user">Create a user from the Console</a></li>
        <li><a href="{{base_path}}/guides/account-configurations/user-onboarding/self-registration/">Enable self-registration</a> and let a user self-register to {{product_name}}.</li>
        <li><a href="{{base_path}}/guides/authentication/jit-user-provisioning/">Enable JIT-provisioning</a> and let a user sign in with an external identity provider.</li>
        </ul>

        !!! note
            Onboarding a user with any of the above methods automatically triggers outbound provisioning to the external system.

    2. [Delete the user]({{base_path}}/guides/users/manage-users/#delete-a-user). The user will be removed from the external system.

=== "Application-level"

    Application-level outbound provisioning is specific to an individual application. If an application does not have its own outbound provisioner configured, it defaults to the organization-level configuration.

    To configure an application in {{product_name}}:

    1. On the {{product_name}} Console, go to **Applications**.

    2. Select your application from the list and navigate to its **Provisioning** tab.

    3. Under **Outbound Provisioning Configuration**, click **New Provisioner**.

        ![Configure application-level outbound provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/set-provisioning-connection-application-wise.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. Select the connection in which you have configured outbound provisioning as the **Connection** and the relevant outbound connector as the **Provisioning Connector**.

    5. Optionally, enable any of the following options.

        {% if product_name == "WSO2 Identity Server" %}
        | Option | Description |
        |---|---|
        | **Blocking** | Makes the user onboarding process synchronous with the outbound provisioning process. {{product_name}} waits for the response from the outbound connector before proceeding with the user creation. |
        | **JIT Outbound** | Enables outbound provisioning for JIT-provisioned users during authentication. |
        {% else %}
        | Option | Description |
        |---|---|
        | **JIT Outbound** | Enables outbound provisioning for JIT-provisioned users during authentication. |
        {% endif %}

    6. Click **Add**.

    ### Try it out

    Application-level outbound provisioning is triggered when a user is provisioned through the application. This can happen in the following ways:

    - **JIT provisioning**: Configure [JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/) for the application. When a user signs in through a federated identity provider, the user is JIT provisioned in {{product_name}}, which triggers outbound provisioning to the external system.

    - **User creation via API**: Use a [SCIM API]({{base_path}}/apis/organization-apis/org-user-mgt/#tag/Users-Endpoint/operation/createUser) with an access token obtained for the application to create a user. This triggers outbound provisioning to the external system.

{% else %}

Follow the steps below to create a custom connection, configure an outbound connector, and enable outbound provisioning for your organization.

## Step 1: Create a provisioning connection

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

## Step 2: Enable outbound provisioning for the organization

Organization-level outbound provisioning allows you to provision users to an external system when:

- a user is provisioned in {{product_name}} over an API.
- an administrator onboards a user from the {{product_name}} Console.
- a user self-signs up from a {{product_name}} sign-in page.
- a user is JIT (Just-In-Time) provisioned in {{product_name}}.

To enable organization-level outbound provisioning in {{product_name}}:

1. On the {{product_name}} Console, go to **Login & Registration**.

2. Under **Provisioning Settings**, click **Outbound Provisioning Configuration** and click **New Provisioner**.

3. Select the connection in which you have configured outbound provisioning as the **Connection** and the relevant outbound connector as the **Provisioning Connector**.

    ![Configure the resident identity outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/configure-resident-idp.png){: width="700" style="border: 0.3px solid lightgrey;"}

4. Enable any of the following.

    | Option | Description |
    |---|---|
    | **Blocking** | Makes the user onboarding process synchronous with the outbound provisioning process. {{product_name}} waits for the response from the external system before proceeding with the user creation. |
    | **JIT Outbound**{% if is_version == "7.0.0" %} (Update level 7.0.0.73+){% endif %} | Enables outbound provisioning for JIT provisioned users during authentication. |

5. Click **Finish**.

## Try it out

1. On the {{product_name}} Console, do one of the following.
    <ul>
    <li>Use a <a href="{{base_path}}/apis/organization-apis/org-user-mgt/#tag/Users-Endpoint/operation/createUser">SCIM API</a> to create a user.</li>
    <li><a href="{{base_path}}/guides/users/manage-users/#onboard-single-user">Create a user from the Console</a></li>
    <li><a href="{{base_path}}/guides/account-configurations/user-onboarding/self-registration/">Enable self-registration</a> and let a user self-register to {{product_name}}.</li>
    <li><a href="{{base_path}}/guides/authentication/jit-user-provisioning/">Enable JIT-provisioning</a> and let a user sign in with an external identity provider.</li>
    </ul>

    !!! note
        Onboarding a user with any of the above methods automatically triggers outbound provisioning to the external system.

2. [Delete the user]({{base_path}}/guides/users/manage-users/#delete-a-user). The user will be removed from the external system.

{% endif %}
