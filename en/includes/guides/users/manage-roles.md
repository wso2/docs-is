# Manage roles

A role is a collection of permissions, also represented as a scope. It is a convenient way of managing permissions as roles facilitate the addition, removal and updating of permissions collectively, rather than individually managing permissions for each user. Roles play a crucial role in controlling access to APIs and applications.

In {{product_name}}, developers can define two types of roles based on the audience.

- **Application level** - Roles tailored to the the specific requirements of an application.

- **Organization level** - For scenarios involving multiple applications sharing common login, registration, and authorization requirements. For example, omnichannel applications with both web and mobile components where there is a requirement to use the same set of roles across multiple applications.

You can assign users and groups to one or many roles. When a group is assigned to a role, all group members inherit the permissions of the role.

!!! note
    {{product_name}} facilitates sending application role information of a user as a user attribute in authentication responses such as JWT tokens and ID tokens. Learn more about [OIDC flows]({{base_path}}/guides/authentication/oidc/).

## Create a role

To create a role and assign permissions to it:

1. On the {{ product_name }} Console, go to **User Management** > **Roles**.

2. Click **New Role** and provide a name to uniquely identify the role by the audience you select in the step below.

3. Select the role audience. Choose,

     - **Application**: if the role is meant for a single application. From the dropdown below, pick the specific application to associate with the role.

     - **Organization**: if the role is intended for multiple applications.

    !!! warning
        Selected role audience cannot be modified later.

    !!! note
        Applications can be configured to consume either application or organization roles. Learn how to [associate roles to an application](#associate-roles-to-an-application).

    ![create new role]({{base_path}}/assets/img/guides/roles/create-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Next**.

5. Select the API for which you wish to assign permissions and select the permissions(scopes) from the dropdown.

    - If you selected the **Applciation** audience, select permissions from the [APIs authorized for the selected application]({{base_path}}/guides/api-authorization/#authorize-the-api-resources-for-an-app).

    - If you selected the **Organization** audience, select permissions from the management and organization APIs of {{ product_name }}, and [registered business specific APIs]({{base_path}}/guides/api-authorization/#register-an-api-resource).

    ![Assign permission on role creation]({{base_path}}/assets/img/guides/roles/assign-permissions-to-role-on-creation.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Click **Finish**.

## Assign users to a role

To assign users to a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Select the role to which you wish to assign users.
3. Click **Edit** and navigate to **Users**.

    ![Assign users to role]({{base_path}}/assets/img/guides/roles/assign-users-to-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Assign User** and select users to add to the role.
5. Click **Update**.

## Assign groups to a role

To assign groups to a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.

2. Select the role to which you wish to assign user groups.

3. Click **Edit** and navigate to **Groups**.

    ![Assign user groups to role]({{base_path}}/assets/img/guides/roles/assign-usergroups-to-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Select the groups you wish to add from the dropdown under **Local Groups**.

5. Click **Update**.

## Assign external groups to a role

You can assign groups of an external Identity Provider (IdP) to an application role by following the steps below.

!!! note "Prerequisites"

    - Register an IdP in {{ product_name }} and add the IdP to the sign-in flow of the application. Refer to [Add Standard-based login]({{base_path}}/guides/authentication/standard-based-login/) to learn more.
    
    - [Configure groups for the IdP]({{base_path}}/guides/authentication/#add-groups-to-connections).

To assign external groups to an application role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.

2. Select the role to which you wish to assign IdP groups.

3. Click the **Edit** icon and navigate to the **Groups** tab.

    ![Assign IdP groups to role]({{base_path}}/assets/img/guides/roles/assign-idpgroups-to-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Select the relevant IdP under **External Groups** and select the groups from the dropdown.

5. Click **Update**.

## Remove users from a role

To remove users from a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.

2. Select the role from which you wish to remove users.

3. Click **Edit** and navigate to **Users**.

4. Click the cross icon next to username of the users who wants to remove from the role.

    ![Remove users from role]({{base_path}}/assets/img/guides/roles/remove-users-from-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. They will be added to **Removing users** section.

6. Click **Update**.

## Remove groups from a role

To remove user groups from a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.

2. Select the role from which you wish to remove user groups.

3. Click **Edit** and navigate to **Groups**.

4. Click the cross icon next to group name of the groups under **Local Groups** which wants to remove from the role.

    ![Remove user groups from role]({{base_path}}/assets/img/guides/roles/remove-usergroups-from-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. They will be added to **Removing groups** section.
6. Click **Update**.

## Remove external groups from a role

To remove external groups from a role:

1. On the {{ product_name }} Console, go to **User Management** > **Roles**.

2. Select the role from which you wish to remove external groups.

3. Click the **Edit** icon and navigate to the **Groups** tab.

4. Under **External Groups**, click the **X** icon next to the group name you wish to remove.

    !!! note
        The removed groups will be displayed in the **Removing groups** section.

    ![Remove IdP groups from role]({{base_path}}/assets/img/guides/roles/remove-idpgroups-from-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

6. Click **Update**.

## Edit permissions of a role

To edit the permissions of a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.

2. Select the role you wish to edit the permissions.

3. Click **Edit** and navigate to the **Permissions** tab.

4. Make the following changes as necessary.

    - **Add a new API**:
        - select the API by searching for it in **Select API Resource**.

        - select the checkbox next to the API to select all permissions or select limited permissions from the dropdown.

    - **Remove an API**:
        - click the cross icon next to the API name.

    - **Add new permissions to a selected API**:
        - select permissions from the dropdown of the selected API.

    - **Remove permissions from a selected API**:
        - click the **X** icon next to the permission listed under the API.

    ![Update permissions of a role]({{base_path}}/assets/img/guides/roles/update-permissions-of-role.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update**.

## Delete a role

If you wish to delete,

- an **Application** role, deleting the role will also delete its association with the respective application.

- an **Organization** role, be sure to remove any associations it has to applications before deleting the role.

    !!! note
        Learn more about [associating roles to an application](#associate-roles-to-an-application).

To delete a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.

2. Click the trash icon next to the role you wish to delete.

3. Select the checkbox and confirm your action.


## Associate roles to an application

Roles created for an **Application** audience are only associated with the selected application. {{product_name}} also allows you to associate organization roles to an application.

!!! warning "Before you proceed"
    If you have previously associated application roles to an application, switching the audience to `organization`, permanently deletes the application roles associated to the application.

To associate organization roles to an application:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to associate the organization role.

3. Click **Edit** and navigate to the **Roles** tab.

4. Select **Organization** as the **Role Audience**, and select the roles from the dropdown.

    ![Associate organization audience roles to app]({{base_path}}/assets/img/guides/roles/associate-org-audience-roles-to-app.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update**.
