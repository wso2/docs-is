# Enable application-level outbound provisioning

Application-level outbound provisioning lets you provision a user to an external system when they interact with a specific application. When configured, application-level provisioning takes priority over the [organization-level configuration]({{base_path}}/guides/users/outbound-provisioning/provisioning-levels/org-level) for that application. If an application does not have its own outbound provisioning configuration, the organization-level configuration is used as the fallback.

## Configure the application

Once you complete the creation of the outbound provisioning connection, you must enable it for an application.

To configure an application in {{product_name}}:

1. On the {{product_name}} Console, go to **Applications**.

2. Select your application from the list and navigate to its **Provisioning** tab.

3. Under **Outbound Provisioning Configuration**, click **New Provisioner**.

    {% if product_name == "Asgardeo" or is_version > "7.2.0" %}
    ![Configure application-level outbound provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/set-provisioning-connection-application-wise.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% else %}
    ![Configure application-level outbound provisioning]({{base_path}}/assets/img/guides/outbound-provisioning/configure-idp-level-provisioning.png){: width="700" style="border: 0.3px solid lightgrey;"}
    {% endif %}

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

## Try it out

Application-level outbound provisioning is triggered when a user is provisioned through the application. This can happen in the following ways:

- **JIT provisioning**: Configure [JIT user provisioning]({{base_path}}/guides/authentication/jit-user-provisioning/) for the application. When a user logs in through a federated identity provider, the user is JIT provisioned in {{product_name}}, which triggers outbound provisioning to the external system.

- **User creation via API**: Use a [SCIM API]({{base_path}}/apis/organization-apis/org-user-mgt/#tag/Users-Endpoint/operation/createUser) with an access token obtained for the application to create a user. This triggers outbound provisioning to the external system.
