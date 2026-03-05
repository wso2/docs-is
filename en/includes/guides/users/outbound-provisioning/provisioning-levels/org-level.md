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

## Enable outbound provisioning for the organization

Once you complete the creation of the outbound provisioning connection, you must enable it for the entire organization.

To enable organization-wide outbound provisioning in {{product_name}}:

1. On the {{product_name}} Console, go to **Login & Registration**.

2. Under **Provisioning Settings**, click **Outbound Provisioning Configuration** and click **New Provisioner**.

3. Select the connection in which you have configured outbound provisioning as the **Connection** and the relevant outbound connector as the **Provisioning Connector**.

    {% if product_name == "Asgardeo" or is_version > "7.2.0" %}
    ![Configure the org-wide outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/set-provisioning-connection-org-wise.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% else %}
    ![Configure the resident identity outbound provisioner]({{base_path}}/assets/img/guides/outbound-provisioning/configure-resident-idp.png){: width="700" style="border: 0.3px solid lightgrey;"}
    {% endif %}

4. Optionally, enable any of the following options.
    {% if product_name == "WSO2 Identity Server" %}
    | Option | Description |
    |---|---|
    | **Blocking** | Makes the user onboarding process synchronous with the outbound provisioning process. {{product_name}} waits for the response from the external system before proceeding with the user creation. |
    | **JIT Outbound**{% if is_version == "7.0.0" %} (Update level 7.0.0.73+){% endif %} | Enables outbound provisioning for JIT provisioned users during authentication. |

    {% else %}
    | Option | Description |
    |---|---|
    | **JIT Outbound** | Enables outbound provisioning for JIT provisioned users during authentication. |
    {% endif %}

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
        Onboarding a user with any of the above methods automatically triggers outbound provisioning to the external system.

2. [Delete the user]({{base_path}}/guides/users/manage-users/#delete-a-user). The user will be removed from the external system.
