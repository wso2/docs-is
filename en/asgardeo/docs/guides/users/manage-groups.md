# Manage groups

A group is a collection of users who have the same privileges to access resources in an organization. One user can be assigned to any number of groups. When one user group is granted access to a resource, it applies to all users in the group.

Applications can get details about groups a user belongs to as a user attribute in the authentication response (e.g., ID token).

## Onboard a group
There are two ways to onboard a group:

- An administrator can onboard users from an on-premise user store by [connecting a remote user store to Asgardeo]({{base_path}}/guides/users/user-stores/configure-a-user-store/).

    !!! note
        If the remote user store access type is read-only, you cannot update the user groups onboarded from this read-only user store.

- Administrators can add groups via the Asgardeo Console.

Let's look at how administrators can onboard groups from the Asgardeo Console.

1. On the Asgardeo Console, go to **User Management** > **Groups**.
2. Click **New Group** and provide the following details.

    - **Group Name:** A unique name to identify the group.
    - **Add Users:** If you already have existing users, you can search and add them to a group.

    ![create-new-group-form]({{base_path}}/assets/img/guides/groups/create-new-group-form.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Click **Finish**.

## Assign users to groups
Users can be assigned to groups. Admins can allow/restrict access to resources based on the groups.

To assign users to groups:

1. On the Asgardeo Console, go to **User Management** > **Groups**.
2. Select the group to assign the user.
3. Click **Edit** and navigate to **Users**.

    ![add-user-to-group-view]({{base_path}}/assets/img/guides/groups/add-user-to-group-view.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Assign User** and select users to add to the group.
6. Click **Save**.

## Remove users from groups
[Users]({{base_path}}/guides/users/manage-customers/) can be removed from the assigned groups by administrators.

To remove users from groups:

1. On the Asgardeo Console, go to **User Management** > **Groups**.
2. Select the group to remove the user.
3. Click the **Edit** icon and navigate to **Users**.

    ![remove-user-from-group-view]({{base_path}}/assets/img/guides/groups/remove-user-from-group-view.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click the **Edit** icon.
5. Unselect the checkbox for the users you wish to remove.
6. Click **Save**.

## Assign groups to application roles

You can assign groups to application roles and grant permission for the group's users to access an API resource. See [manage application roles]({{base_path}}/guides/applications/manage-application-roles/) for more information.

To assign a group to a role:

1. On the Asgardeo Console, go to **User Management** > **Groups**.
2. Go to the **Roles** tab and click **+ Assign Roles**.
3. Expand the application to which the required roles belong.
4. Select the application role/s you wish to add to the group.

    ![Assign groups to app roles]({{base_path}}/assets/img/guides/groups/assign-application-roles.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Save** to assign the group to the selected application role.

## Delete a group
An administrator can delete groups via the Asgardeo Console.
To delete a group:

1. On the Asgardeo Console, go to **User Management** > **Groups**.
2. Click the trash icon next to the group you wish to delete.
3. Select the checkbox and confirm your action.

## View remote user store groups
Once you connect a remote user store to Asgardeo, you can view the onboarded groups and the members of the groups.
To view the onboarded groups:

1. On the Asgardeo Console, go to **User Management** >  **Groups**.
2. Select the preferred user store from the drop-down menu.

!!! note
    Remote groups are read-only in the Asgardeo console. Administrators can only view the group details and its members.