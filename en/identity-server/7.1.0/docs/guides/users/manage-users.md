# Manage users

This guide walks you through how you can manage user accounts as an administrator.

## Onboard users
There are three ways to onboard a user:

- The user can self-register via the My Account portal or the login page of an application if self-registration is enabled in the organization. Learn how to [configure self-registration]({{base_path}}/guides/account-configurations/user-onboarding/self-registration/).
- An administrator can onboard users from a secondary user store by [configuring a secondary user store in WSO2 Identity Server]({{base_path}}/guides/users/user-stores/configure-secondary-user-stores/).

    !!! note
        If the secondary user store access type is read-only, you cannot update the user profiles of users onboarded from this read-only user store.

- An administrator can onboard users from the WSO2 Identity Server Console.

Let's look at how administrators can onboard users from the {{ product_name }} Console.

### Onboard single user

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click **Add User** button and select **Single User** option and provide the following details:

    ![Add user]({{base_path}}/assets/img/guides/users/add-user-form.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
           - A username is always unique to the organization and you can't change the username once it is created.
           - Instead of using a username to login, you can [configure email address as the username]({{base_path}}/guides/users/attributes/enable-email-as-username/). Then, you will be asked to enter the email address when logging in.
           - The user can change the password set by the administrator from the [My Account Portal]({{base_path}}/guides/user-self-service/customer-self-service-portal/).

3. You can either request the user to set the password or set one on the user's behalf.

    - **Invite user to set their own password:**

        - **Invite via email:** If this option is selected, an email with a confirmation link will be sent to the provided email address. The user can use this link to set up a new password.

            !!! note
                  You need to enable the **Invite user to set password** feature if you haven't done so already to use this option. Learn how to [configure invite user to set password]({{base_path}}/guides/account-configurations/user-onboarding/invite-user-to-set-password/).

        - **Invite offline:** If this option is selected, the administrator will receive an invitation link at the end of the user registration process. This link can then be shared with the user.

    - **Set a password for the user:** If this option is selected, the administrator can set a password for the user. The user will have the option to change this password from the [My Account Portal]({{base_path}}/guides/user-self-service/customer-self-service-portal/).

4. Add the user to a group in the next step. You will not see this option if you haven't created any groups in {{ product_name }}.
5. Review the summary and click **Finish**.

    !!! note
        If you have selected **Invite offline** or decided to **set a password for the user**, you can copy the corresponding information at the **Summary** page of the wizard and share with the user.

### Onboard multiple users

In addition to adding a single user, you can onboard multiple users at once, either manually or by using a CSV file. This is especially useful for large organizations where bulk operations can save time and reduce the effort of adding users one by one.

!!! note
    You need to enable the **Invite user to set password** feature if you haven't done so already to add multiple users. Learn how to [configure invite user to set password]({{base_path}}/guides/account-configurations/user-onboarding/invite-user-to-set-password/).

![Add multiple users]({{base_path}}/assets/img/guides/users/add-multiple-users-form.png){: width="800" style="display: block; margin: 0; border: 0.1px solid lightgrey;"}

#### Add multiple users manually

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click on the **Add User** button and select **Multiple Users** option.
3. Switch to the **Manual** tab.
4. Enter the email addresses of the users you want to invite. Press **Enter** after each email to add it to the list.
5. Specify the groups for the users by entering the group names. Press **Enter** after each group to add it to the list.
6. Click **Add** to send out the invitations.
7. An email with a confirmation link will be sent to the provided email addresses, allowing the users to set their own passwords.

#### Add multiple users using a CSV file

!!! Info
    The default limit for maximum number of users that can be added per request using a CSV file is set to 100. To modify this limit, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```
    [console.bulk_user_import]
    user_limit = 50
    ```

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click on the **Add User** button and select **Multiple Users** option.
3. Switch to the **File Based** tab.
4. Click **Upload CSV File** or drag and drop a CSV file into the designated area.
5. Ensure your CSV file is formatted correctly, with headers that correspond to user attributes. These attributes must be mapped to local attributes.
    - A sample CSV file format would include: `username, givenname, emailaddress, groups`
    - For example:
      ```
      username,givenname,emailaddress,groups
      user1,john,john@test.com,group1|group2
      user2,jake,jake@test.com,group2
      user3,jane,jane@test.com,group1
      ```
6. Click **Import** to add the users to the system.
7. An email with a confirmation link will be sent to the provided email addresses, allowing the users to set their own passwords.


## Assign groups
Groups are useful when you wish to assign a certain permission level to multiple users. A user can be a member of multiple groups in the organization. Learn how to [manage groups]({{base_path}}/guides/users/manage-groups/).

To assign users to groups:

1. On the WSO2 Identity Server Console, go to **User Management** > **Users**.
2. Click **Edit** for the user.
3. Go to the **Groups** tab and click **+ Assign Group**.
4. Select the relevant groups and click **Save**.

    ![Add user]({{base_path}}/assets/img/guides/users/assign-groups-to-users.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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

    ![view-user-profile]({{base_path}}/assets/img/guides/users/view-user-profile.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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

1. Click **Reset password** at the bottom of the user's profile.

2. Select a method to reset the user password:

    - **Set a new password for the user:**
        If this option is selected, the owner or an administrator can set a new password for the user.

    - **Invite user to reset the password:**
        If this option is selected, a password reset request can be sent to the user using one of the password recovery methods you have enabled for the organization.

        !!! note
            Enable the relevant password recovery methods by navigating to **Login & Registration** > **Password Recovery**.

        ![Reset password]({{base_path}}/assets/img/guides/users/reset-password-of-user.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Reset Password**.

**Using the API**

You can also use WSO2 Identity Server's [SCIM API]({{base_path}}/apis/scim2-users-rest-apis/#tag/Users-Endpoint/operation/patchUser) to initiate the admin initiated password recovery flow.

1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_user_mgt_update` scope.

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

Upon successful execution of the cURL the user will receive an email to reset their password.

## Lock a user account

To temporarily prevent a user from logging into applications or the self-service My Account portal, you can lock the user's account.

To lock a user account:

1. On the {{product_name}} Console, go to **User Management** > **Users** and select the user.
2. In the **Danger Zone**, turn the **Lock user** toggle on to lock the user's profile. Turn it off to unlock it.

    ![Lock user]({{base_path}}/assets/img/guides/users/lock-user.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select the checkbox to confirm your action.
4. Click **Confirm**.

!!! note
    When a user account is locked, the reason for the account lock will be displayed in the user's profile.

![Account lock reason]({{base_path}}/assets/img/guides/users/lock-user-profile.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Disable a user account

Disabling a user's account prevents users from logging into applications or to the self-service My Account portal. It is intended to be a long-term and a more permanent measure than locking a user's account. Therefore, if you simply wish to restrict a user's access temporarily, it is recommended to use [account locking](#lock-a-user-account).

!!! note "Enable account disabling"
    
    Account disabling is not an option available for a users' accounts by default. If you wish to enable this option for your organization, refer to [account disabling]({{base_path}}/guides/account-configurations/account-disabling/).

To disable a user account,

1. On the {{product_name}} Console, go to **User Management** > **Users** and select the user.
2. In the **Danger Zone**, turn the **Disable user** toggle on to disable the user's profile. Turn it off to enable it.

    ![Disable User Account]({{base_path}}/assets/img/guides/users/user-account-disable.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select the checkbox to confirm your action.
4. Click **Confirm**.

!!! note
    When a user account is disabled, the follwing message will be displayed in the user's profile.

![Account disable reason]({{base_path}}/assets/img/guides/users/account-disable-text.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Delete a user
A user account can be deleted by administrators. Once an account is deleted, the action is irreversible.

To delete a user account:

1. On the WSO2 Identity Server Console, go to **User Management** > **Users** and select the user.
2. Click **Delete User** at the bottom of the user's profile.

    ![Lock user]({{base_path}}/assets/img/guides/users/delete-user.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select the checkbox to confirm your action.
4. Click **Confirm**.
