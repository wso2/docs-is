# Manage users

This guide walks you through the process of managing a user account. An owner or an administrator can manage user accounts.

## Onboard users
There are three ways to onboard a user:

- The user can self-register via the My Account portal or the login page of an application if self-registration is enabled in the organization. Learn how to [configure self-registration]({{base_path}}/guides/user-accounts/configure-self-registration/).
- An administrator can onboard users from an on-premise user store by [connecting a remote user store to {{ product_name }}]({{base_path}}/guides/users/user-stores/configure-a-user-store/).

    !!! note
        If the remote user store access type is read-only, you cannot update the user profiles of users onboarded from this read-only user store.

- An administrator can onboard users from the {{ product_name }} Console.

Let's look at how administrators can onboard users from the {{ product_name }} Console.

### Onboard a single user

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click  **Add User** > **Single User** and provide the following details:

    ![Add user]({{base_path}}/assets/img/guides/users/add-user-form.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - **Email (Username):** A unique email address to identify the user.
    - **First Name:** First name of the user. You can add/change this later.
    - **Last Name:** Last name of the user. You can add/change this later.

    !!! note

        - A username is always unique to the organization and you can't change the username once it is created.
        - Instead of using the email as the username, you can [configure the username]({{base_path}}/guides/user-accounts/account-login/username-validation/) to be an alphanumeric. Then, you will be asked to enter an alphanumeric username between the configured minimum and maximum lengths.
        - The existing users who have already registered with their email address as the username can continue to use it to access applications, instead of having to create a new username.

3. You can either request the user to set the password or set one on the user's behalf.

    - **Invite user to set their own password:**

        - **Invite via email:** If this option is selected, an email with a confirmation link will be sent to the provided email (username). The user can use the confirmation link to set up a new password.

        - **Invite offline:** If this option is selected, the administrator will receive an invite link at the end of user registration. This link can be shared with the user.

    - **Set a password for the user:**
            If this option is selected, the administrator can set a password for the user. The user can change this password from the [My Account Portal]({{base_path}}/guides/user-self-service/customer-self-service-portal/).

4. Add the user to a group in the next step. You will not see this option if you haven't created any groups in {{ product_name }}.
5. Click **Finish**.

    !!! note
        If you have selected **Invite offline** or decided to **set a password for the user**, you can copy the corresponding information at the **Summary** page of the wizard and share with the user.

### Onboard multiple users

In addition to adding a single user, you can onboard multiple users at once, either manually or by using a CSV file. This is especially useful for large organizations that seek efficiency.

![Add multiple users]({{base_path}}/assets/img/guides/users/add-multiple-users-form.png)

!!! note
    Importing multiple users is only supported for the Asgardeo-provided **DEFAULT** user store.

#### Add multiple users manually

1. On the Asgardeo Console, go to **User Management** > **Users**.
2. Click **Add User** > **Multiple Users**.
3. Switch to the **Manual** tab.
4. Enter the email addresses of the users you want to invite. Press **Enter** after each email to add it to the list.
5. Under Groups, select the group(s) from the dropdown to which users will be added during the import.
6. Click **Add** to send out the invitations.

An email with a confirmation link will be sent to the provided email addresses, allowing the users to set their own passwords.

#### Add multiple users using a CSV file

1. On the Asgardeo Console, go to **User Management** > **Users**.
2. Click **Add User** > **Multiple Users**.
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
A user can be assigned to different [groups]({{base_path}}/guides/users/manage-groups/) in the organization. Groups can be used to restrict the user's access to resources.

To assign users to groups:

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click **Edit** for the user.
3. Go to **Groups** and assign groups.

    !!! note
        The **Groups** tab for a user account will only appear after you create one or more groups in the organization. Learn how to [create a group]({{base_path}}/guides/users/manage-groups/#create-new-group)

    ![Add user]({{base_path}}/assets/img/guides/users/assign-groups-to-users.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Manage user profiles

A user profile consists of attributes that represent the details of the user such as username, email address, contact information, other custom attributes, etc.

!!! note
    Administrators in the organization can configure the list of attributes that should be available in a user profile. See [Manage attributes]({{base_path}}/guides/users/attributes/manage-attributes/) for details.

### View profile details

Administrators can view the user profile of any user as follows:

1. On the {{ product_name }} Console, go to **User Management** > **Users**.

    !!! note
        If you have connected a remote user store, and want to filter the users in your remote user store, select your user store from the drop-down menu.

2. Select the user to view the profile.

    ![view-user-profile]({{base_path}}/assets/img/guides/users/view-user-profile.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

### Update the profile

An administrator can update the profile of a user via the {{ product_name }} Console.

To update the user profile:

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Find the user's account and click **Edit**.
3. Update the information on the user profile.

    ![update-user-profile]({{base_path}}/assets/img/guides/users/update-user-profile.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save.

## Resend password setup link/code

If a user is pending to set up an initial password or is required to reset their password through an admin-initiated password reset, and the previously sent link or code has expired, an administrator can resend the link or code.

To resend the link/code:

1. Click the `Resend` link available in the warning message displayed at the top of the user's profile.

    ![Resend link]({{base_path}}/assets/img/guides/users/resend-password-setup-link.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

Alternatively, administrators can use the resend-code API to resend the link or code as shown below. 

!!! abstract ""

    === "Request format"

        ```curl
        curl -X 'POST' \
        'https://api.asgardeo.io/t/{organization_name}/api/identity/user/v1.0/resend-code' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer <access_token>' \
        -H 'Content-Type: application/json' \
        -d '{
            "user": {
                "username": "<username>",
                "realm": "<realm>"
            },
            "properties": [
                {
                    "key": "RecoveryScenario",
                    "value": "<recovery_scenario>"
                }
            ]
            }'
        ```
    === "Sample request"

        ```curl
        curl -X 'POST' \
        'https://api.asgardeo.io/t/{organization_name}/api/identity/user/v1.0/resend-code' \
        -H 'accept: application/json' \
        -H 'Authorization: Bearer <access_token>' \
        -H 'Content-Type: application/json' \
        -d '{
            "user": {
                "username": "jane",
                "realm": "PRIMARY"
            },
            "properties": [
                {
                    "key": "RecoveryScenario",
                    "value": "ASK_PASSWORD"
                }
            ]
            }'
        ```
    
    The recovery scenario should be specified in the properties parameter of the API request body, as follows:

    - `ASK_PASSWORD`: When the user is pending to set up an initial password using the setup link.
    - `ADMIN_FORCED_PASSWORD_RESET_VIA_EMAIL_LINK`: When the user is pending an admin-forced password reset via an email link.
    - `ADMIN_FORCED_PASSWORD_RESET_VIA_OTP`: When the user is pending an admin-forced password reset via an OTP sent through email.

    Ensure that the username provided is without the user store domain prefix, and the realm parameter specifies the relevant user store domain name.

    ---
    **Response**
    ```
    "HTTP/1.1 201 Created"
    ```


## Set a user's password

Administrators can set a user's password if the user is unable to set the password via the initial setup email link shared during user creation.

To set the password:

1. Click **Set password** at the bottom of the user's profile.

    ![Set password button]({{base_path}}/assets/img/guides/users/set-password.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Type the new password.

    ![Set password]({{base_path}}/assets/img/guides/users/set-password-modal.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Set Password**.

    !!! note
        Once the administrator set the password, the user's account will get unlocked.

## Reset the user's password

Administrators can reset a user's password or initiate the password reset process from the {{ product_name }} Console.

To reset the password:

1. Click **Reset password** at the bottom of the user's profile.

    ![Reset User Password]({{base_path}}/assets/img/guides/users/reset-password.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Select a method to reset the user password:

    - **Invite user to set their own password:**
        If this option is selected, a password reset request can be sent to the user via email. The user can then use the instructions in the email to reset the password.

    - **Set a temporary password for the user:**
        If this option is selected, the owner or an administrator can set a temporary password for the user.

        !!! note
            If the user is in pending admin forced password reset, once the admin resets the password, 
            the account will get unlocked.

    ![Reset password]({{base_path}}/assets/img/guides/users/reset-password-of-user.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Reset Password**.

**Using the API**

You can also use Asgardeo's [SCIM API]({{base_path}}/apis/scim2/#tag/Users-Endpoint/operation/patchUser) to initiate the admin initiated password recovery flow.

1. [Get an access token]({{base_path}}/apis/authentication/#get-an-access-token) with the `internal_user_mgt_update` scope.

2. Use the obtained access token to execute the following cURL.

    ``` curl
    curl --location --request PATCH 'https://api.asgardeo.io/t/<org_name>/scim2/Users/ <user_id>' \
    --header 'Content-Type: application/json' \
    --header 'Authorization: Bearer <access_token>' \
    --data '{
       "schemas": [
          "urn:ietf:params:scim:api:messages:2.0:PatchOp",
          "urn:scim:wso2:schema"
       ],
       "Operations": [
          {
                "op": "add",
                "value": {
                   "urn:scim:wso2:schema": {
                      "forcePasswordReset": true
                   }
                }
          }
       ]
    }'
    ```

Upon successful execution of the cURL the user will recieve an email to reset their password.

## Lock a user account

To temporarily prevent a user from logging into applications or the self-service My Account portal, you can lock their account.

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
    
    Account disabling is not an option available for a user's account by default. If you wish to enable this option for your organization, refer to [account disabling]({{base_path}}/guides/account-configurations/account-disabling/).

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

1. On the {{ product_name }} Console, go to **User Management** > **Users** and select the user.
2. Click **Delete User** at the bottom of the user's profile.

    ![Lock user]({{base_path}}/assets/img/guides/users/delete-user.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enable the checkbox to confirm your action.
4. Click **Confirm**.
