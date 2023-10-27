# Manage users

This guide walks you through how you can manage user accounts as an administrator.

## Onboard a user
There are three ways to onboard a user:

- The user can self-register via the My Account portal or the login page of an application if self-registration is enabled in the organization. Learn how to [configure self-registration]({{base_path}}/guides/user-accounts/configure-self-registration/).
- An administrator can onboard users from an on-premise user store by [connecting a remote user store to WSO2 Identity Server]({{base_path}}/guides/users/user-stores/configure-a-user-store/).

    !!! note
        If the remote user store access type is read-only, you cannot update the user profiles of users onboarded from this read-only user store.

- An administrator can onboard users from the WSO2 Identity Server Console.

Let's look at how administrators can onboard users from the WSO2 Identity Server Console.

1. On the WSO2 Identity Server Console, go to **User Management** > **Users**.
2. Click  **Add User** and provide the following details:

    ![Add user]({{base_path}}/assets/img/guides/users/add-user-form.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    !!! note

        - A username is always unique to the organization and you can't change the username once it is created.
        - Instead of using a username to login, you can [configure the email address as the login identifier]({{base_path}}/guides/user-accounts/account-login/username-validation/). Then, you will be asked to enter the email address when logging in.
        - The user can change the password set by the administrator from the [My Account Portal]({{base_path}}/guides/user-self-service/customer-self-service-portal/).

4. Click **Next**.
5. Add the user to a group, if necessary, and click **Next**.
6. Assign the user a role, if necessary, and click **Next**.
5. Review the summary and click **Finish**.

## Assign groups
Groups are useful when you wish to assign a certain permission level to multiple users. A user can be a member of multiple groups in the organization. Learn how to [manage groups]({{base_path}}/guides/users/manage-groups/).

To assign users to groups:

1. On the WSO2 Identity Server Console, go to **User Management** > **Users**.
2. Click **Edit** for the user.
3. Go to the **Groups** tab and click **+ Assign Group**.
4. Select the relevant groups and click **Save**.

    ![Add user]({{base_path}}/assets/img/guides/users/assign-groups-to-users.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

## Manage user profiles

A user profile consists of attributes that represent the details of the user such as username, email address, contact information, other custom attributes, etc.

!!! note
    Administrators can configure the list of attributes that should be available in the user profile. See [Manage attributes]({{base_path}}/guides/users/attributes/manage-attributes/) for details.

### View profile details

Administrators can view the user profile of any user as follows:

1. On the WSO2 Identity Server Console, go to **User Management** > **Users**.

    !!! note
        If you have connected a remote user store, and want to filter the users in your remote user store, select your user store from the drop-down menu.

2. Select the user to view the profile.

    ![view-user-profile]({{base_path}}/assets/img/guides/users/view-user-profile.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

### Update the profile

An administrator can update the profile of a user via the WSO2 Identity Server Console.

To update the user profile:

1. On the WSO2 Identity Server Console, go to **User Management** > **Users**.

2. Find the user's account and click **Edit**.

3. Update the information on the user profile.

4. Click **Update** to save.

## Reset the user's password

Administrators can reset a user's password or initiate the password reset process from the WSO2 Identity Server Console.

To reset the password:

1. Click **Reset password** at the top of the user's profile.

2. Select a method to reset the user password:

    - **Set a new password for the user:**  
        If this option is selected, the owner or an administrator can set a new password for the user.

    - **Invite user to reset the password:**  
        If this option is selected, a password reset request can be sent to the user using one of the password recovery methods you have enabled for the organization.

        !!! note
            Enable the relevant password recovery methods by navigating to **Login & Registration** > **Account Management** > **Password Reset**.

    ![Reset password]({{base_path}}/assets/img/guides/users/reset-password-of-user.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Click **Reset Password**.

**Using the API**

You can also use Asgardeo's [SCIM API]({{base_apth}}/apis/scim2/#tag/Users-Endpoint/operation/patchUser) to initiate the admin initiated password recovery flow.

1. [Get an access token]({{base_path}}/apis/authentication/#get-an-access-token) with the `internal_user_mgt_update` scope.

2. Use the obtained access token to execute the following cURL.

    ``` curl
    curl --location --request PATCH 'https://localhost:9443/scim2/Users/<user_id>' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <access_token>' \
    --data '{
       "schemas": [
          "urn:ietf:params:scim:api:messages:2.0:PatchOp",
          "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"
       ],
       "Operations": [
          {
                "op": "add",
                "value": {
                   "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {
                      "forcePasswordReset": true
                   }
                }
          }
       ]
    }'
    ```

Upon successful execution of the cURL the user will recieve an email to reset their password.

## Lock a user account

When you lock a user's account, the user will no longer be able to access any applications or the My Account portal.

To lock a user account:

1. On the WSO2 Identity Server Console, go to **User Management** > **Users** and select the user.
2. Enable the **Lock user** toggle at the bottom of the user's profile.
  
    ![Lock user]({{base_path}}/assets/img/guides/users/lock-user.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Select the checkbox to confirm your action.
4. Click **Confirm**.

!!! note
    You can unlock a user account by switching the **Lock user** toggle off.

## Delete a user
A user account can be deleted by administrators. Once an account is deleted, the action is irreversible.

To delete a user account:

1. On the WSO2 Identity Server Console, go to **User Management** > **Users** and select the user.
2. Click **Delete User** at the bottom of the user's profile.

    ![Lock user]({{base_path}}/assets/img/guides/users/delete-user.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Select the checkbox to confirm your action.
4. Click **Confirm**.
