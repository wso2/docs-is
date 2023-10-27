# Manage users

This guide walks you through the process of managing a user account. An owner or an administrator can manage user accounts.

## Onboard a user
There are three ways to onboard a user:

- The user can self-register via the My Account portal or the login page of an application if self-registration is enabled in the organization. Learn how to [configure self-registration]({{base_path}}/guides/user-accounts/configure-self-registration/).
- An administrator can onboard users from an on-premise user store by [connecting a remote user store to {{ product_name }}]({{base_path}}/guides/users/user-stores/configure-a-user-store/).

    !!! note
        If the remote user store access type is read-only, you cannot update the user profiles of users onboarded from this read-only user store.

- An administrator can onboard users from the {{ product_name }} Console.

Let's look at how administrators can onboard users from the {{ product_name }} Console.

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click  **Add User** and provide the following details:

    ![Add user]({{base_path}}/assets/img/guides/users/add-user-form.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

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

## Assign groups
A user can be assigned to different [groups]({{base_path}}/guides/users/manage-groups/) in the organization. Groups can be used to restrict the user's access to resources.

To assign users to groups:

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click **Edit** for the user.
3. Go to **Groups** and assign groups.

    !!! note
        The **Groups** tab for a user account will only appear after you create one or more groups in the organization. Learn how to [create a group]({{base_path}}/guides/users/manage-groups/#create-new-group)

    ![Add user]({{base_path}}/assets/img/guides/users/assign-groups-to-users.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

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

    ![view-user-profile]({{base_path}}/assets/img/guides/users/view-user-profile.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

### Update the profile

An administrator can update the profile of a user via the {{ product_name }} Console.

To update the user profile:

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Find the user's account and click **Edit**.
3. Update the information on the user profile.

    ![update-user-profile]({{base_path}}/assets/img/guides/users/update-user-profile.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Update** to save.

## Reset the user's password

Administrators can reset a user's password or initiate the password reset process from the {{ product_name }} Console.

To reset the password:

1. Click **Reset password** at the bottom of the user's profile.
  
    ![Reset User Password]({{base_path}}/assets/img/guides/users/reset-password.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

2. Select a method to reset the user password:

    - **Invite user to set their own password:**  
        If this option is selected, a password reset request can be sent to the user via email. The user can then use the instructions in the email to reset the password.  

    - **Set a temporary password for the user:**  
        If this option is selected, the owner or an administrator can set a temporary password for the user.

    ![Reset password]({{base_path}}/assets/img/guides/users/reset-password-of-user.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

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

When you lock a user's account, the user will no longer be able to access any applications or the My Account portal.

To lock a user account:

1. On the {{ product_name }} Console, go to **User Management** > **Users** and select the user.
2. Enable the **Lock user** toggle at the bottom of the user's profile.
  
    ![Lock user]({{base_path}}/assets/img/guides/users/lock-user.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Enable the checkbox to confirm your action.
4. Click **Confirm**.

!!! note
    You can unlock the user account again using the **Lock user** toggle explained above.

## Delete a user
A user account can be deleted by administrators. Once an account is deleted, the action is irreversible.

To delete a user account:

1. On the {{ product_name }} Console, go to **User Management** > **Users** and select the user.
2. Click **Delete User** at the bottom of the user's profile.

    ![Lock user]({{base_path}}/assets/img/guides/users/delete-user.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Enable the checkbox to confirm your action.
4. Click **Confirm**.
