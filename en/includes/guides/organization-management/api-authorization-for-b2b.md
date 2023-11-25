# API authorization for sub organizations
{{ product_name }} allows organizations to authorize user access to an application's API resources based on the API permissions, application roles, and groups assigned to the users. See [API authorization]({{base_path}}/guides/api-authorization/) for more information.

API resources are created and authorized for applications on the root organization. If the application consuming the API resources is shared with the sub organization, all application-specific configurations of API resources are inherited by the sub organization.

![The relationship between terms]({{base_path}}/assets/img/guides/api-authorization/b2b-api-authorization.png){: width="700" style="display: block; margin: 0 auto;"}

## Prerequisites
You need to configure your API resources on the root organization

1. [Register an API resource]({{base_path}}/guides/api-authorization/#register-an-api-resource)
2. [Authorize the API resource to an app]({{base_path}}/guides/api-authorization/#authorize-the-api-resources-for-an-app)
3. [Create application roles]({{base_path}}/guides/api-authorization/#create-application-roles)

## Assign sub organization user groups to application roles

!!! note "Application roles of a sub organization"
    The shared application will inherit the permission to role assignments from the application of the root organization.

    ![Application roles inherited from the root organization]({{base_path}}/assets/img/guides/api-authorization/b2b-inherited-application-roles.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    Role-to-group assigning should be done separately for the sub organization, as the sub organization does not inherit the groups from the root organization.

Application roles are application-specific and inherited from the root organization's application.

You do not have permission to create new application roles, but you can assign these application roles to your sub organization groups.

sub organizations maintain the following three types of groups, and you can assign your application roles to any of these groups.
- [Groups](#assign-user-groups-to-application-roles) - A collection of sub organization users.
- [External Groups](#assign-external-groups-to-application-roles) - These groups are federated from connections on the sub organization. For example, groups federated from the Google connection.
- [Invited User Groups](#assign-invited-user-groups-to-application-roles) - These are the user groups invited from the root organization to the sub organization.

### Assign user groups to application roles
To assign application roles to user groups of the sub organization:

1. On the {{ product_name }} Console, [switch to the organization]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-suborganizations).
2. Go to **User Management** > **Roles** > **Application Roles** and click **Configure**.
3. Expand the shared application and click `+` on the application role you wish to assign to a group.
4. Go to Groups and click **+ Assign Groups**.
5. Select the group which should be assigned to the selected application role,
6. Click **Assign** to complete the role to group assigning.


### Assign external groups to application roles

To assign application roles to External Groups:

!!! note "Before you begin"
    To get started,

    - You should [register, configure, and create groups for a connection]({{base_path}}/guides/authentication/#manage-connections) in your sub organization.
    - You should add this connection to the sign-in flow of the application to which the application roles belong.

1. On the {{ product_name }} Console, [switch to the organization]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-suborganizations).
2. Go to **User Management** > **Roles** > **Application Roles** and click **Configure**.
3. Expand the fragmented application and click `+` on the application role you wish to assign to a group.
4. Go to the **External groups** tab and expand the connection from which you select groups.
5. Select the group which should be assigned to the selected application role.
6. Click **Assign Group** to complete the role to group assigning.

### Assign invited user groups to application roles

{{ product_name }} provides support for inviting users from the parent organization to manage sub organization operations. Currently, this invitation flow can be implemented using API calls.

To invite a root organization's user group and assign it to a role:

1. [Create a group in the root organization]({{base_path}}/guides/users/manage-groups/#onboard-a-group) and [assign the users]({{base_path}}/guides/users/manage-groups/#assign-users-to-groups) that should be invited.

2. [Get the required access tokens]({{base_path}}/apis/organization-management/authentication/) to call the API.

3. Use the access token and the sub organization ID obtained after executing step 2 and execute the following cURL:
    ``` bash
    curl --location --request PATCH 'https://api.authz-dv.cloudservices.wso2.com/o/<sub-org-id>/applications/<shared-app-id>/roles/<role-name>/cross-org-group-mapping' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer <access-token>' \
    --data '{
        "added_groups": [
            {
                "name": "<userstore>/<group-name-in-root-org>",
                "organization": "<root-org-id>"
            }
        ],
        "removed_groups": []
    }'
    ```
    Replace the following variables in the above request.

    <table>
        <tr>
            <th>Request Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><code>sub-org-id</code></td>
            <td>The organization ID of the sub organization you are inviting the user group to.</td>
        </tr>
        <tr>
            <td><code>shared-app-id</code></td>
            <td>The application ID of the shared application in the sub organization.</td>
        </tr>
        <tr>
            <td><code>role-name</code></td>
            <td>The role name of the sub organization to which you wish to assign the invited user group.</td>
        </tr>
        <tr>
            <td><code>access-token</code></td>
            <td>The access token obtained for the sub organization.</td>
        </tr>
        <tr>
            <td><code>userstore</code></td>
            <td>The user store to which the user group belongs. The primary user store of {{ product_name }} is <code>DEFAULT</code>.</td>
        </tr>
        <tr>
            <td><code>group-name-in-root-org</code></td>
            <td>The name of the user group you wish to invite to the sub organization.</td>
        </tr>
        <tr>
            <td><code>root-org-id</code></td>
            <td>The organization ID of the root organization.</td>
        </tr>
    </table>

Once the above cURL is executed successfully, the application role of the sub organization will be assigned to the invited user group from the sub organization.

To view the group-to-role assignment:

1. On the {{ product_name }} Console, [switch to the organization]({{base_path}}/guides/organization-management/manage-organizations/#switch-between-suborganizations).
2. Go to **User Management** > **Roles** > **Application Roles** and click **Configure**.
3. Expand the shared application and click `+` on the application role to which you assigned the invited user group.
4. Go to the **Invited User Groups** tab. You will now see the invited user group assigned to the application role.

## Try it out

Follow the steps given below to try out the RBAC flow:

!!! note
    Note that we are using {{ product_name }}'s [B2B Guardio insurance application]({{base_path}}/guides/organization-management/try-a-b2b-use-case/) for this scenario.

To request scopes for the user:

1. Add the new scopes to the `APIScope` parameter of the `config.js` file of the sample application. You need to request these new scopes in addition to the OIDC scopes of your application.

    To get the scopes:
    
    1. On the {{ product_name }} Console, switch to the root organization.
    2. Go to **Applications** and select your application.
    3. Copy the scopes listed at the end of the **API Authorization** section

        ![Additional scopes to access the API resource]({{base_path}}/assets/img/guides/api-authorization/additional-scopes.png){: width="700" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! tip
            When you add scopes to the configuration file, add them as comma-separated values.

2. Access the application URL.
3. Try to log in as a user with a group and permission to access the API resource.

    Upon successful login, you will see the permission/scopes allowed for the user on the user consent page.

4. Click **Allow**. You will now be redirected to the application.
    You will be able to see the assigned permissions on the `allowedScopes` parameter of the authentication response.

!!! note "If you are switching organizations"
    If the user switches the organization to another sub organization, the scopes will be updated according to the roles assigned to the user in the switched organization.
