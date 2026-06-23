# Manage {{product_name}} Console access

The {{product_name}} Console is a pivotal point for managing identity and access within your organization. It provides a comprehensive interface for configuring and managing users, groups, roles, and various identity services. To ensure a secure and efficient management process, it is crucial to configure access to the console appropriately. This section outlines the steps to access the console and how to manage access based on user roles.

{{wso2_is_console_access_note}}

## Configure Console login

Just like any other application registered in {{product_name}}, you can customize the login flow of the Console using any configured connection.

!!! note
    Learn about the connections supported in {{product_name}} and how to configure them in the [Authentication]({{base_path}}/guides/authentication) section.

To customize login for the Console,

1. Sign in to the {{product_name}} Console and click **Console Settings**.

2. Go to the **Login Flow** tab and configure the login flow from your preferred editor:

    === "Classic Editor"
        - Click **Add Authentication** on a step, select a connection from the list and click **Add**. You can add multiple connections to the same step.

            ![Configure the Console login flow using the classic editor]({{base_path}}/assets/img/guides/organization/console/login-flow-classic.png){: width:"600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        - Click the **+** icon on the login flow if you wish to add an additional authentication step and repeat the above.

        - Turn on the **Conditional Authentication** toggle if you wish to customize authentication using a script.

            !!! note
                Refer to [**Add conditional authentication**]({{base_path}}/guides/authentication/conditional-auth/) to learn more about conditional authentication scripts.

    === "Visual Editor"

        - Switch to the **Visual Editor** tab.
        
        - Click **Add Sign In Option**, select a connection from the list and click **Add**. You can add multiple authentication methods to the same step. (Alternatively, go to **Predefined Flows** > **Basic Flows** to quickly add a login flow.)

            ![Configure the Console login flow using the Visual Editor]({{base_path}}/assets/img/guides/organization/console/login-flow-visual.png){: width:"600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
        
        - Click the **+** icon on the login flow if you wish to add an additional authentication step and repeat the above.

        - Turn on the **Conditional Authentication** toggle if you wish to customize authentication using a script.

            !!! note
                Refer to [Add conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) to learn more about conditional authentication scripts.

3. Click **Update** to save the changes.

## Manage Console roles

Roles are a collection of permissions. You can create roles and assign users and groups to them so that they gain limited access to Console features. Follow the sections below to learn about managing Console roles.

### Console role permissions

When you create a Console role, you grant it access to one or more **Console components** — features such as **Applications**, **Connections**, **Users**, **Groups**, and **Roles**. You assign these permissions at two levels:

<table>
    <tr>
        <td><b>Tenant Permissions</b></td>
        <td>The permissions the role has for the root organization.</td>
    </tr>
    <tr>
        <td><b>Organization Permissions</b></td>
        <td>The permissions the role has for the child organizations.</td>
    </tr>
</table>

#### Permission levels

By default, you can assign each Console component one of the following permission levels:

<table>
    <tr>
        <td><b>View</b></td>
        <td>Assigns read permissions for the component.</td>
    </tr>
    <tr>
        <td><b>Edit</b></td>
        <td>Assigns read, create, update, and delete permissions for the component.</td>
    </tr>
</table>

!!! note

    Selecting **View** or **Edit** for a given Console component assigns the role several scopes pertaining to it. For example, if you select **Applications** and assign the **View** permission, the role is assigned the following scopes.

    ![Scopes assigned for a given permission for a Console component]({{base_path}}/assets/img/guides/organization/console/console-role-permissions.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

#### Granular console permissions

By default, Console roles use the combined **View** and **Edit** permission model described above, where **Edit** grants **Create**, **Update**, and **Delete** access together.

You can optionally enable a more granular permission model that lets you assign **Create**, **Update**, and **Delete** permissions independently for each Console component. This is controlled by the `use_granular_console_permissions` setting, which is `false` by default. Enable it only when you need this level of control over Console permissions. To do so, add the following configuration to the `deployment.toml` file and restart the server.

```toml
[console_settings]
use_granular_console_permissions = true
```

Once enabled, you can assign each Console component the following permission levels:

<table>
    <tr>
        <td><b>View</b></td>
        <td>Assigns read permissions for the component.</td>
    </tr>
    <tr>
        <td><b>Create</b></td>
        <td>Assigns read and create permissions for the component.</td>
    </tr>
    <tr>
        <td><b>Update</b></td>
        <td>Assigns read and update permissions for the component.</td>
    </tr>
    <tr>
        <td><b>Delete</b></td>
        <td>Assigns read and delete permissions for the component.</td>
    </tr>
</table>

![Granular console permissions]({{base_path}}/assets/img/guides/organization/console/granular-console-role-permissions.png)

!!! note
    **View** is required whenever **Create**, **Update**, or **Delete** is selected for a component, and it cannot be turned off while any of those write permissions remain active.

!!! note "Compatibility with existing roles"
    Console roles created earlier with the combined **Edit** permission continue to work when the granular model is enabled. **Edit** grants **Create**, **Update**, and **Delete** together.

### Create a role

!!! warning "Important"
    Roles created here are roles for the Console application which are solely for the purpose of limiting features of the Console. You can define organization level roles and roles for other applications in **User Management** > **Roles**. Refer to [Manage roles]({{base_path}}/guides/users/manage-roles) to learn more.

To create a role for the Console,

1. Sign in to the {{product_name}} Console as an administrator and click **Console Settings**.

2. Select the **Roles** tab and click **New Role**.

3. Provide the following details for the role.

    ![Create a role for the Console]({{base_path}}/assets/img/guides/organization/console/create-console-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Add** to save the role.

### Assign users/groups to a role

To assign a user or a group to a role,

1. On the {{product_name}} Console, click **Console Settings**.

2. Go to the **Roles** tab and select the role you wish to assign.

3. Do one of the following:

    - To assign a user:

        - Go to the **Users** tab and click **Assign Users**

        - Choose a user store and select the relevant user.

            ![assign a user to a role]({{base_path}}/assets/img/guides/organization/console/assign-console-role-to-user.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        - Click **Update** to assign the user.


    - To assign a group:

        - Go to the **Groups** tab.

        - Select a relevant local group.

            ![assign a group to a role]({{base_path}}/assets/img/guides/organization/console/assign-console-role-to-group.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        - Click **Update** to assign the group.

### Delete a role

To delete a role:

1. On the WSO2 Identity Server Console, go to **Console Settings** > **Roles**.

2. Click the trash icon next to the role you wish to delete.

3. Select the checkbox and confirm your action.


## Manage administrators

Users who are assigned to one or more Console roles created [above](#create-a-role), are listed under the **Administrators** tab in **Console Settings**. For instructions on managing administrators, refer to [manage administrators]({{base_path}}/guides/users/manage-administrators/).


