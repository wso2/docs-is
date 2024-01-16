# Manage roles

A role is essentially a collection of permissions, also represented as scopes. Utilizing roles provides a more efficient means of managing permissions by allowing the addition, removal, and adjustment of permissions collectively, rather than assigning permissions to individual users.

Roles play a crucial role in controlling access to functionality within APIs and applications. Typically, application developers define roles tailored to the specific requirements of an application, enabling seamless access control.
In scenarios involving multiple applications sharing common login, registration, and authorization requirements, such as omnichannel applications with both web and mobile components, there is a requirement to use the same set of roles across the multiple applications.
{{ product_name }} addresses this need by supporting the creation of roles at:

  - application level
  - organization level

Users and groups can be assigned to roles, providing a versatile approach to access management. When a user group is assigned to a role, the role's permissions automatically apply to all users within that group. Additionally, a user or group can be assigned to multiple roles.

{{ product_name }} facilitates the retrieval of application-associated roles that a user belongs to. This information is included as a user attribute in the authentication response, such as JWT access tokens or ID tokens.

## Create a role

To create a role and assign permissions to it:

1. On the {{ product_name }} Console, go to **User Management** > **Roles**.
2. Click **New Role** and provide the following details.
    
    - **Role Name:** A unique name to identify the role with in the selected role audience.

3. Select the role using audience as either role needs to be used by single application or multiple applications.
    
    **Select the role audience:** 

     - `Application`: Choose this option if the role is meant to use exclusively within a single application.
     - `Organization`: Choose this option if the role is intended for use across multiple applications.
    - **Assigned application:** If selecting the Application audience, pick the specific application to associate with the role.
    
    !!! note
        Applications can determine whether they consume roles exclusive to that application or roles defined to use by multiple applications. 
        Ensure that you choose an application configured to use roles defined at the application level. You can modify the allowed role audience in the application configuration if needed.
   
    ![create new role]({{base_path}}/assets/img/guides/roles/create-role.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! warning
        Selected role audience cannot be modified later.

4. Click **Next**.
5. Select the API from which you want to assign permissions(scopes), then select the permissions(scopes) to add to the role.
   
    !!! note
        - If you have selected `Applciation` audience, you can select permissions from only the [APIs authorized to the selected application]({{base_path}}/guides/api-authorization/#authorize-the-api-resources-for-an-app).
        - If you have selected `Organization` audience, you can select permissions from management and organization APIs of {{ product_name }}, and [registered business specific APIs]({{base_path}}/guides/api-authorization/#register-an-api-resource).

    ![Assign permission on role creation]({{base_path}}/assets/img/guides/roles/assign-permissions-to-role-on-creation.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

6. Click **Finish**.

## Assign users to a role

To assign users to a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Select the role to which you wish to assign users.
3. Click **Edit** and navigate to **Users**.

    ![Assign users to role]({{base_path}}/assets/img/guides/roles/assign-users-to-role.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Assign User** and select users to add to the role.
5. Click **Update**.

## Assign user groups to a role

To assign user groups to a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Select the role to which you wish to assign user groups.
3. Click **Edit** and navigate to **Groups**.

    ![Assign user groups to role]({{base_path}}/assets/img/guides/roles/assign-usergroups-to-role.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Select user groups to add to the role from dropdown under **Local Groups**.
5. Click **Update**.

## Assign identity provider groups to a role

### Prerequisites

To get started, you need to have

 - an [identity provider(IdP)]({{base_path}}/guides/authentication/enterprise-login/) registered in {{ product_name }}.
 - configured [groups for IdP]({{base_path}}/guides/authentication/#add-groups-to-connections).
 - added this IdP to the sign-in flow of the application to which the role associated with.

To assign identity provider groups of an identity provider to a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Select the role to which you wish to assign IdP groups.
3. Click **Edit** and navigate to **Groups**.

    ![Assign IdP groups to role]({{base_path}}/assets/img/guides/roles/assign-idpgroups-to-role.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Select the IdP under **External Groups** and select the groups from the dropdown.
5. Click **Update**.

## Remove users from a role

To remove users from a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Select the role from which you wish to remove users.
3. Click **Edit** and navigate to **Users**.
4. Click the cross icon next to username of the users who wants to remove from the role.

    ![Remove users from role]({{base_path}}/assets/img/guides/roles/remove-users-from-role.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. They will be added to **Removing users** section.
6. Click **Update**.

## Remove user groups from a role

To remove user groups from a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Select the role from which you wish to remove user groups.
3. Click **Edit** and navigate to **Groups**.
4. Click the cross icon next to group name of the groups under **Local Groups** which wants to remove from the role.

    ![Remove user groups from role]({{base_path}}/assets/img/guides/roles/remove-usergroups-from-role.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. They will be added to **Removing groups** section.
6. Click **Update**.

## Remove identity provider groups from a role

To remove IdP groups from a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Select the role from which you wish to remove IdP groups.
3. Click **Edit** and navigate to **Groups**.
4. Click the cross icon next to group name of the groups under **External Groups** which wants to remove from the role.

    ![Remove IdP groups from role]({{base_path}}/assets/img/guides/roles/remove-idpgroups-from-role.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. They will be added to **Removing groups** section.
6. Click **Update**.

## Edit permissions of a role

To edit the permissions of a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Select the role you wish to edit the permissions.
3. Click **Edit** and navigate to **Permissions**.
4. You can add/remove APIs and add/remove permissions(scopes).

    !!!info
        - To add new APIs:
            - search in **Select API Resource** and select the API. 
            - select the checkbox next to the added API to select all permissions(scopes).
            - select permissions(scopes) from the dropdown of API if you need to select few permissions(scopes).
        - To remove an API:
            - click the cross icon next to the API name.
        - To add new permissions(scopes) to an assigned API:
            - select permissions(scopes) from the dropdown of the selected API.
        - To remove permissions(scopes) from an assigned API:
            - click the cross icon next to the permission(scope) name listed under the selected API.

    ![Update permissions of a role]({{base_path}}/assets/img/guides/roles/update-permissions-of-role.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Update**.

## Delete a role

To delete a role:

1. On the {{ product_name }} Console, go to **User Management > Roles**.
2. Click the trash icon next to the role you wish to delete.
3. Select the checkbox and confirm your action.

If the selected role's audience is:

 - `Application` - Deleting the role will also delete its association with the respective application.
 - `Organization` - If the role is linked to one or more applications, the deletion process will fail.

## Associate roles to an application

!!! note
    If you create a role with the `Application` audience, the role will be associated to the selected application during role creation. That role can't be associated with any other application.
    This section describes how to associate a role in organization audience to an application.

To associate a role in organization audience to an application:

1. On the {{ product_name }} Console, go to **Applications**.
2. Select the application to which you wish to associate the role.
3. Click **Edit** and navigate to **Roles** tab.
4. Select **Organization** as Role Audience, and select the roles from the dropdown.
   
    !!! warning
        If you have previously selected `application` as the allowed audience for associating roles in this application, and now switching to `organization` audience,
        the application roles currently associated with the application will be permanently deleted.

    ![Associate organization audience roles to app]({{base_path}}/assets/img/guides/roles/associate-org-audience-roles-to-app.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Update**.
