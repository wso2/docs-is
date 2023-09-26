# Manage groups

A group is a collection of users who have the same privileges to access resources in an organization.

One user can be assigned to any number of groups. Applications can get details about groups a user belongs to in the authentication response (e.g., ID token) from {{ product_name }} as a user attribute.

!!! note
    [Administrators]({{base_path}}/guides/users/manage-collaborators/) and [users onboarded from remote user stores]({{base_path}}/guides/users/manage-customers/) cannot be assigned to groups from {{ product_name }} Console.

For example, you can create the following user groups: `Admin`, `Manager`, and `Developer`. When one user group is granted access to a resource, it applies to all users in the group.

## Onboard a group
There are two ways to onboard a group:

- An administrator can onboard users from an on-premise user store by [connecting a remote user store to {{ product_name }}]({{base_path}}/guides/users/user-stores/configure-a-user-store/).

    !!! note
        If the remote user store access type is read-only, you cannot update the user groups onboarded from this read-only user store.

- Administrators can add groups via the {{ product_name }} Console.

Let's look at how administrators can onboard groups from the {{ product_name }} Console.

1. On the {{ product_name }} Console, go to **User Management** > **Groups**.
2. Click **New Group** and provide the following details.

    - **Group Name:** A unique name to identify the group.
    - **Add Users:** If you already have existing users, you can search and add them.

    ![create-new-group-form]({{base_path}}/assets/img/guides/groups/create-new-group-form.png)

3. Click **Finish**.

## Assign users to groups
Users can be assigned to groups. Admins can restrict access to resources based on the groups.

To assign users to groups:

1. On the {{ product_name }} Console, go to **User Management** > **Groups**.
2. Select the group to assign the user.
3. Click **Edit** and navigate to **Users**.

    ![add-user-to-group-view]({{base_path}}/assets/img/guides/groups/add-user-to-group-view.png)

4. Click **Assign User** and select users to add to the group.
6. Click **Save**.

## Remove users from groups
[Users]({{base_path}}/guides/users/manage-customers/) can be removed from the assigned groups by administrators.

To remove users from groups:

1. On the {{ product_name }} Console, go to **User Management** > **Groups**.
2. Select the group to remove the user.
3. Click **Edit** and navigate to **Users**.

    ![remove-user-from-group-view]({{base_path}}/assets/img/guides/groups/remove-user-from-group-view.png)

4. Click **Edit** icon.
5. Clear the checkbox for the user(s) you want to remove.
6. Click **Save**.

## Assign groups to application roles

You can assign groups to application roles and grant permission for the group's users to access an API resource. See [manage application roles]({{base_path}}/guides/applications/manage-application-roles/) for more information.

To assign a group to a role:

1. On the {{ product_name }} Console, go to **User Management** > **Groups**.
2. Go to the **Roles** tab and click **+ Assign Roles**.
3. Expand the application to which the required roles belong.
4. Select the application role/s you wish to add to the group.

    ![Assign groups to app roles]({{base_path}}/assets/img/guides/groups/assign-application-roles.png)

5. Click **Save** to assign the group to the selected application role.

## Delete a group
An administrator can delete groups via the {{ product_name }} Console.
To delete a group:

1. On the {{ product_name }} Console, go to **User Management** > **Groups**.
2. Click the trash icon next to the group you wish to delete.
3. Select the checkbox and confirm your action.

## View remote user store groups
Once you connect a remote user store to {{ product_name }}, you can view the onboarded groups and the members of the groups.
To view the onboarded groups:

1. On the {{ product_name }} Console, go to **User Management** >  **Groups**.
2. Select your user store from the drop-down menu.

!!! note
    These groups are read-only. Administrators can only view the group details and the assigned members.
