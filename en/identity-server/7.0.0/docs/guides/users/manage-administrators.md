# Manage administrators

This guide walks you through the steps of managing an administrator account. If you are the owner or an existing administrator in the organization, you can add new administrators or delete existing administrator accounts.

!!! note
    You cannot manage the user profiles of other administrators or update their passwords from the WSO2 Identity Server Console. Administrators must [manage their own profiles and passwords]({{base_path}}/guides/your-is/is-self-service/#change-password) using the **My Account** portal.

## Add an administrator

Administrators of your organization can follow the steps below to add another administrator:

1. On the WSO2 Identity Server Console, go to **User Management** > **Users**.

2. Click **Add User** and provide the required details.

    ![Add administrator user]({{base_path}}/assets/img/guides/users/add-user-form.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Next**.

4. Add the user to the **admin** group and click **Next**.

5. Assign the user **Administrator** role and click **Next**.

6. Review the summary and click **Finish**.

    !!! note
        The created administrator will be listed in the **Console Settings** page under the **Administrators** tab.

        ![Administrator page]({{base_path}}/assets/img/guides/users/administrator-list.png){: width="1000"}

## Assign admin privileges to users

You can assign admin privileges to existing users by following the instructions given below.

1. On the WSO2 Identity Server Console, go to **Console Settings**.

2. Click **Add Administrator**.

3. Select the relevant user as the **username**.

4. Select the **Administrator** role.

5. Click **Add**.

## Delete an administrator

!!! warning Before you begin
    When you delete an administrator, you will only be revoking the administrator privileges from the user. Deleting this administrator does not delete the user account. If you want to delete the user account, see [Delete a user]({{base_path}}/guides/users/manage-users/#delete-a-user).

To delete an administrator:

1. On the WSO2 Identity Server Console, click **Console Settings**.
2. Click **Delete** for the administrator you want to remove.
3. Select the checkbox to confirm your action.
4. Click **Confirm**.
