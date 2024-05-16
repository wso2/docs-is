# API authorization for organizations
{{ product_name }} allows organizations to authorize user access to an application's API resources based on the API permissions, roles, and groups assigned to the users. See [API authorization]({{base_path}}/guides/api-authorization/) for more information.

API resources are created and authorized for applications on the organization (root). If the application consuming the API resources is shared with the organization, all application-specific configurations of API resources are inherited by the organization.

{% if product_name == "Asgardeo" %}
![The relationship between terms]({{base_path}}/assets/img/guides/authorization/api-authorization/b2b-api-authorization.png){: width="700" style="display: block; margin: 0;"}
{% else %}
![The relationship between terms]({{base_path}}/assets/img/guides/authorization/api-authorization/b2b-api-authorization.png){: width="700" style="display: block; margin: 0;"}
{% endif %}

## Prerequisites
You need to configure your API resources on the organization (root)

1. [Register an API resource]({{base_path}}/guides/api-authorization/#register-an-api-resource)
2. [Authorize the API resource to an app]({{base_path}}/guides/api-authorization/#authorize-the-api-resources-for-an-app)
3. [Create roles and associate to application]({{base_path}}/guides/api-authorization/#associate-roles-to-the-application)

Organizations have roles associated with their shared applications. Shared roles of organizations inherit the permission assignment to the role from the organization (root).

!!! note "Roles of an organization"
    The shared roles in organizations will inherit the permission to role assignments from the organization (root).
    Users and group assignment to the roles should be done separately for the organization, as the organization does not inherit the users or groups from the organization (root).
    {% if product_name == "Asgardeo" %}
    ![Roles inherited from the organization (root)]({{base_path}}/assets/img/guides/authorization/api-authorization/b2b-inherited-roles.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% else %}
    ![Roles inherited from the organization (root)]({{base_path}}/assets/img/guides/authorization/api-authorization/b2b-inherited-roles.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% endif %}
    Organization administrators cannot create new roles, modify the name or permissions of the shared roles, or delete the shared roles, but you can assign these roles to your organization users and groups.

## Assign organization users to roles
To assign roles to users of the organization:

1. On the {{ product_name }} Console, [switch to the organization]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-organizations).
2. Go to **User Management** > **Roles**.
3. Select the role you wish to assign to a user and click **Edit**.
4. Go to Users and click **Assign Users**.
5. Select the user who should be assigned to the selected role.
6. Click **Update** to complete the role-to-user assignment.

## Assign organization groups to roles

Organizations maintain the following types of groups, and you can assign your application roles to any of these groups.

- [Groups](#assign-user-groups-to-roles) - A collection of organization users.
- [Federated IdP Groups](#assign-federated-idp-groups-to-roles) - These groups are federated from connections in the organization. For example, groups federated from the Google connection.

### Assign user groups to roles

To assign roles to user groups of the organization:

1. On the {{ product_name }} Console, [switch to the organization]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-organizations).
2. Go to **User Management** > **Roles**.
3. Select the role you wish to assign to a group and click **Edit**.
4. Go to Groups and click **Assign Groups**.
5. Select the group which should be assigned to the selected role.
6. Click **Update** to complete the role to group assignment.

### Assign federated IdP groups to roles
To assign roles to federated IdP groups:

!!! note "Before you begin"
    To get started,

    - You should [register, configure, and create groups for a connection]({{base_path}}/guides/authentication/#manage-connections) in your organization.
    - You should add this connection to the sign-in flow of the application to which the roles are associated.

1. On the {{ product_name }} Console, [switch to the organization]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-organizations).
2. Go to **User Management** > **Roles**.
3. Select the role you wish to assign to a group and click **Edit**.
4. Select the federated IdP from which you select groups.
5. Select the group which should be assigned to the selected role.
6. Click **Update** to complete the role to group assignment.

## Try it out

Follow the steps given below to try out the RBAC flow:

!!! note
    Note that we are using {{ product_name }}'s [B2B Guardio insurance application]({{base_path}}/guides/organization-management/try-a-b2b-use-case/) for this scenario.

To request scopes for the user:

1. Add the new scopes to the `APIScope` parameter of the `config.js` file of the sample application. You need to request these new scopes in addition to the OIDC scopes of your application.

    To get the scopes:

    1. On the {{ product_name }} Console, log in to the organization(root).
    2. Go to **Applications** and select your application.
    3. Copy the scopes listed at the end of the **API Authorization** section

        {% if product_name == "Asgardeo" %}
        ![Additional scopes to access the API resource]({{base_path}}/assets/img/guides/authorization/api-authorization/additional-scopes.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
        {% else %}
        ![Additional scopes to access the API resource]({{base_path}}/assets/img/guides/authorization/api-authorization/additional-scopes.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
        {% endif %}

    !!! tip
        When you add scopes to the configuration file, add them as comma-separated values.

2. Access the application URL.
3. Try to log in as a user with a group and permission to access the API resource.

    If you have disabled `Skip login consent` in your application's settings, upon successful login, you will see the permission (scopes) allowed for the user on the user consent page.
    Click **Allow**. You will now be redirected to the application.

4. You will be able to see the assigned permissions on the `allowedScopes` parameter of the authentication response.

!!! note "If you are switching organizations"
    If the user switches organization to another organization, the scopes will be updated according to the roles assigned to the user in the switched organization.
