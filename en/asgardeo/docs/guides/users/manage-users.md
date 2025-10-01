# Manage users

This guide walks you through the process of managing a user account. An owner or an administrator can manage user accounts.

## Onboard users

{{product_name}} provides multiple ways to onboard users to your organization. You can add users individually or in bulk using a CSV file. You can also allow users to self-register.

To learn more about onboarding users, see [Onboard users]({{base_path}}/guides/users/onboard-users/).

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
                "realm": "DEFAULT"
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

To disable a user account you can use either the Console or the SCIM API.

=== "Use the Console"

    !!! note "Enable account disabling"

        Account disabling is not an option available for a users' accounts by default. If you wish to enable this option for your organization, refer to [account disabling]({{base_path}}/guides/account-configurations/account-disabling/).

    1. On the {{product_name}} Console, go to **User Management** > **Users** and select the user.
    2. In the **Danger Zone**, turn the **Disable user** toggle on to disable the user's profile. Turn it off to enable it.

        ![Disable User Account]({{base_path}}/assets/img/guides/users/user-account-disable.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    3. Select the checkbox to confirm your action.
    4. Click **Confirm**.

    When a user account is disabled, the following message will be displayed in the user's profile.

    ![Account disable reason]({{base_path}}/assets/img/guides/users/account-disable-text.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

=== "Use the API"

    You can use {{ product_name }}'s [SCIM API]({{base_path}}/apis/scim2/scim2-users-rest-api/#tag/Users-Endpoint/operation/patchUser) to disable user accounts. To do so,

    1. [Get an access token]({{base_path}}/apis/#oauth-based-authentication) with the `internal_user_mgt_update` scope.

    2. Use the obtained access token to execute the following cURL.

        !!! note

            Replace `<user_id>` with the ID of the user you want to disable, and `<access_token>` with the access token you obtained in step 1.

        ``` curl
        curl --location --request PATCH 'https://api.asgardeo.io/t/{organization_name}/o/scim2/Users/<user-id>' \
        --header 'Content-Type: application/json' \
        --header 'Authorization: Bearer <access_token>' \
        --data '{
        "schemas": [
            "urn:ietf:params:scim:api:messages:2.0:PatchOp",
            "urn:scim:wso2:schema"
        ],
        "Operations": [
            {
                    "op": "replace",
                    "value": {
                        "urn:scim:wso2:schema": {
                            "accountDisabled": false
                        }
                    }
            }
        ]
        }'
        ```

        After you successfully execute the cURL, the user profile gets disabled.

## Delete a user
A user account can be deleted by administrators. Once an account is deleted, the action is irreversible.

To delete a user account:

1. On the {{ product_name }} Console, go to **User Management** > **Users** and select the user.
2. Click **Delete User** at the bottom of the user's profile.

    ![Lock user]({{base_path}}/assets/img/guides/users/delete-user.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enable the checkbox to confirm your action.
4. Click **Confirm**.

## Filter users

Administrators can filter users based on their account status from the {{ product_name }} Console.

To filter users by account status:

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click the **Account Status** dropdown and select the relevant filter criteria:

    - **Locked**: Filters users with locked accounts.
    - **Disabled**: Filters users with deactivated accounts.
    - **Pending password reset**: Filters users for whom the administrator has initiated a forced password reset, but the users haven't yet reset their passwords.
    - **Pending initial password setup**: Filters users an administrator invited to set their own password during initial account creation but who haven't done so yet.
    - **Pending email verification**: Filters users who haven't yet verified their primary email addresses.
    - **Pending mobile verification**: Filters users who haven't yet verified their primary mobile numbers.

        ![Filter users by account status]({{base_path}}/assets/img/guides/users/filter-users-by-account-status.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}