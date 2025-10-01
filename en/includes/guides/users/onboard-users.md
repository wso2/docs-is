# Onboard users

You can use one of the following methods to onboard users to your organization in {{ product_name }}:

- The user can self-register via the My Account portal or the login page of an application if self-registration is enabled in the organization. Learn how to [configure self-registration]({{base_path}}/guides/account-configurations/user-onboarding/self-registration/).
  
- An administrator can onboard users from a secondary user store by [configuring a secondary user store in {{product_name}}]({{base_path}}/guides/users/user-stores/configure-secondary-user-stores/).

    !!! note
        If the secondary user store access type is read-only, you cannot update the user profiles of users onboarded from this read-only user store.

- An administrator can onboard users from the {{product_name}} Console.

Let's look at how administrators can onboard users from the {{ product_name }} Console.

## Onboard single user

1. On the {{ product_name }} Console, go to **User Management** > **Users**.
2. Click **Add User** button and select **Single User** option and provide the user's details.

    ![Add user]({{base_path}}/assets/img/guides/users/add-user-form.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        - The user's username is always unique to the organization and you can't change the username once it is created.
        - Optionally, you can [configure email address as the username]({{base_path}}/guides/users/attributes/enable-email-as-username/). Then, the user must enter the email address when logging in.

    !!! tip "Add additional fields to the user onboarding form"
        The default form requests for basic information of the user. If you wish to include additional details, such as the user's phone number, address, and other custom attributes, you need to make these attributes available in the **Administrator Console**. Learn how to do so in [attribute configurations]({{base_path}}/guides/users/attributes/manage-attributes/#configure-attributes).

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

## Onboard multiple users

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

{% if product_name == "WSO2 Identity Server" %}

!!! Info
    The default limit for maximum number of users that can be added per request using a CSV file is set to 100. To modify this limit, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```
    [console.bulk_user_import]
    user_limit = 50
    ```
{% endif %}

1. On the {{ product_name }} Console, go to **User Management** > **Users**.

2. Click on the **Add User** button and select **Multiple Users** option.

3. Switch to the **File Based** tab.

4. Click **Upload CSV File** or drag and drop a CSV file into the designated area.

5. Ensure your CSV file is formatted correctly, with headers that correspond to user attributes. These attributes must be mapped to local attributes.
    - A sample CSV file format would include: `username, givenname, emailaddress, groups`
    - For example:

      ```csv
      username,givenname,emailaddress,groups
      user1,john,john@test.com,group1|group2
      user2,jake,jake@test.com,group2
      user3,jane,jane@test.com,group1
      ```

6. Click **Import** to add the users to the system.

7. An email with a confirmation link will be sent to the provided email addresses, allowing the users to set their own passwords.

## Onboard users with email verification

During user onboarding, you can enforce email verification to confirm the provided email address. This improves security and ensures the accuracy of user data. Follow these steps to add users with email verification.

1. Run the following cURL command to enable email verification.

    !!! abstract ""

            curl -X 'PATCH' \
            '{{base_url}}/api/server/v1/identity-governance/VXNlciBPbmJvYXJkaW5n/connectors/    dXNlci1lbWFpbC12ZXJpZmljYXRpb24' \
            -H 'Authorization: Bearer <access_token>' \
            -H 'Content-Type: application/json' \
            -d '{
                "operation": "UPDATE",
                "properties": [
                    {
                        "name": "EmailVerification.Enable",
                        "value": true
                    }
                ]
            }'

2. (Optional) By default, {{product_name}} sends a link to the user's registered email. You can change this to a one-time code (OTP).

    !!! abstract ""

            curl -X 'PATCH' \
            '{{base_url}}/api/server/v1/identity-governance/VXNlciBPbmJvYXJkaW5n/connectors/    dXNlci1lbWFpbC12ZXJpZmljYXRpb24' \
            -H 'Authorization: Bearer <access_token>' \
            -H 'Content-Type: application/json' \
            -d '{
                "operation": "UPDATE",
                "properties": [
                    {
                        "name": "EmailVerification.OTP",
                        "value": true
                    }
                ]
            }'

3. You can now create a user with email verification enabled.

    !!! abstract ""

        === "Request format"

            ```curl
            curl -X 'POST' \
            '{{base_url}}/scim2/Users' \
            -H 'Authorization: Bearer <access_token>' \
            -H 'Content-Type: application/json' \
            -d '{
                "userName": "<USERNAME>",
                "emails": [
                    {
                        "primary": true,
                        "value": "<EMAIL>"
                    }
                ],
                "password": "<PASSWORD>",
                "urn:scim:wso2:schema": {
                    "verifyEmail": "true"
                }
            }'
            ```
        === "Sample request"

            ```
            curl -X 'POST' \
            '{{base_url}}/scim2/Users' \
            -H 'Authorization: Bearer <access_token>' \
            -H 'Content-Type: application/json' \
            -d '{
                "userName": "DEFAULT/bob",
                "emails": [
                    {
                        "primary": true,
                        "value": "bob@gmail.com"
                    }
                ],
                "password": "P@ssw0rd",
                "urn:scim:wso2:schema": {
                    "verifyEmail": "true"
                }
            }'
            ```

        ---
        **Response**

        ```
        "HTTP/1.1 201 Created"
        ```

4. (Optional) The following curl command resends the verification code to the user's email if the user didn't receive it the first time or the code expired.

    !!! abstract ""

        === "Request format"

            ```curl
            curl -X 'POST' \
            '{{base_url}}/api/identity/user/v1.0/resend-code' \
            -H 'accept: application/json' \
            -H 'Authorization: Bearer <access_token>' \
            -H 'Content-Type: application/json' \
            -d '{
                "user": {
                    "username": "<username>",
                    "realm": "DEFAULT"
                },
                "properties": [
                    {
                        "key": "RecoveryScenario",
                        "value": "EMAIL_VERIFICATION_OTP"
                    }
                ]
            }'
            ```
        === "Sample request"

            ```
            curl -X 'POST' \
            '{{base_url}}/api/identity/user/v1.0/resend-code' \
            -H 'accept: application/json' \
            -H 'Authorization: Bearer <access_token>' \
            -H 'Content-Type: application/json' \
            -d '{
                "user": {
                    "username": "bob@gmail.com",
                    "realm": "DEFAULT"
                },
                "properties": [
                    {
                        "key": "RecoveryScenario",
                        "value": "EMAIL_VERIFICATION_OTP"
                    }
                ]
            }'
            ```

        ---
        **Response**
        ```
        "HTTP/1.1 201 Created"
        ```

5. If you selected the confirmation link option, use can click the link to verify. If you configured OTP, validate it by submitting the OTP using the following API.

    !!! abstract ""

        === "Request format"

            ```curl
            curl -X 'POST' \
            '{{base_url}}/api/identity/user/v1.0/validate-code' \
            -H 'Authorization: Bearer <access_token>' \
            -H 'Content-Type: application/json' \
            -d '{
                "code": "<CODE>"
            }'
            ```
        === "Sample request"

            ```
            curl -X 'POST' \
            '{{base_url}}/api/identity/user/v1.0/validate-code' \
            -H 'Authorization: Bearer <access_token>' \
            -H 'Content-Type: application/json' \
            -d '{
                "code": "c1KLdm"
            }'
            ```

        ---
        **Response**
        ```
        "HTTP/1.1 202 Accepted"
        ```
