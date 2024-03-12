# Manage application roles

An application role is a way of limiting access for users to access API resources of your application.

You can create roles for an application, assign permissions to your application roles and assign [user groups in Asgardeo]({{base_path}}/guides/users/manage-groups/) to those roles.

!!! note
    See [API authorization]({{base_path}}/guides/api-authorization/) to learn how to create permissions for an API resource.

## Create an application role

To create an application role and assign permissions to it:

1. On the Asgardeo Console, go to **Applications**.

2. Select the relevant application and go to its **Roles** tab.

3. Click **+ New Role**.

4. Enter a **Role Name** and click **Next**.

5. Select the permissions you wish to assign for the newly created application role.

    !!! note
        Roles are application-specific but not resource specific. You can add permissions from multiple API resources to a single role.

    ![Map API permissions to the created application role]({{base_path}}/assets/img/guides/api-authorization/map-permissions-to-role.png)

6. Click **Save** to add the new application role.

    ![Create application roles]({{base_path}}/assets/img/guides/api-authorization/create-roles.png)

## Assign a user group to an application role

When you assign a user group to an application role, you grant the group members permissions, as defined in the role, to access API resources of the application. To do so,

1. On the Asgardeo Console, go to **User Management** > **Roles**.

2. Expand the relevant application and click `+` on the role you wish to assign a group.

3. On the **Groups** tab, click **+ Assign Group**.

4. Select the group which should be assigned to the selected application role.

5. Click **Assign**.

## Assign an external group to an application role

You can also assign an external group from a connection and grant the group members permissions, as defined in the role, to access API resources of the application.

!!! note "Before you begin"

    - You should [register, configure, and create groups for a connection]({{base_path}}/guides/authentication/#manage-connections).
    - You should add this connection to the sign-in flow of the application to which the application roles belong.

To do so,

1. On the Asgardeo Console, go to **Roles**.

2. Expand the application and click `+` on the role you wish to assign to the group.

3. Go to the **External Groups** tab and expand the connection from which to wish to get the group.

4. Select the group which should be assigned to the selected application role.

5. Click **Assign Group** to complete the role to group assigning.

## Delete an application role

To delete an application role:

1. On the Asgardeo Console, go to **Applications**.

2. Select the application to which the role belongs and go to its **Roles** tab.

3. Click on the trash icon next to the role you wish to delete.

4. Select the checkbox and confirm your action.