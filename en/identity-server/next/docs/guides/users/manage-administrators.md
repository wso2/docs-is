# Manage administrators

This guide walks you through the steps of managing an administrator account. If you are the owner or an existing administrator in the organization, you can add new administrators or delete existing administrator accounts.

!!! note
    You cannot manage the user profiles of other administrators or update their passwords from the WSO2 Identity Server Console. Administrators must [manage their own profiles and passwords]({{base_path}}/guides/your-is/is-self-service/#change-password) using the **My Account** portal.

## Add an administrator

Administrators of your organization can follow the steps below to add another administrator:

1. On the WSO2 Identity Server Console, go to **Organizational Settings** > **Administrators**.

2. Click **Add Administrator** and provide the required details.

    ![Add administrator user]({{base_path}}/assets/img/guides/users/add-administrator.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Click **Next** to view the summary and click **Finish**.

    !!! note
        Once created, an administrator will be assigned the admin role and be made a member of the admin group.

## Assign admin privileges to users

You can assign admin privileges to existing users by following the instructions given below.

1. On the WSO2 Identity Server Console, go to **User Management** > **Users**.

2. Click **Edit** next to the releveant user.

3. Go to the **Roles** tab and click **Edit**.

4. Select the **admin** role and click **Save**.

## Delete an administrator

!!! warning Before you begin
    Note the following:

    - If the administrator you delete is a user with admin privileges, you will only be revoking the administrator privileges from the user. Deleting this administrator does not delete the user account.
    - If the administrator is not a user, you will be deleting the user account from the organization. This action is irreversible.

To delete an administrator:

1. On the WSO2 Identity Server Console, click **Organizational Settings** > **Administrators**.
2. Click **Delete** for the administrator you want to remove.
3. Select the checkbox to confirm your action.
4. Click **Confirm**.
