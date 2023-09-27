# Configure username validation

Your {{ product_name }} organization could allow a user to log in with a custom alphanumeric username instead of an email address.

Follow the steps given below to change the username type for the users.

1. On the {{ product_name }} Console, go to **Organizational Settings** > **Account Login**.
2. Click **Configure** to open the **Username Validation** page.
3. Select **Alphanumeric** and configure the minimum and maximum length for a username.
4. Click **Update** to save the changes.

![Configure username validation]({{base_path}}/assets/img/guides/organization/account-login/username-validation/configure-username-validation.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

!!! warning
    If you select **Alphanumeric** as the username type, and not make the **Email** attribute mandatory for users, the following features will not be available for users who do not configure an email address.

    - Email Notifications
    - Password recovery
    - Authentication with Magic Link, Email OTP

    Learn how to [update attribute properties]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes).
