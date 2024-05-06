# Configure username validation

Your {{ product_name }} organization could allow a user to log in with a custom alphanumeric username instead of an email address.

Follow the steps given below to change the username type for the users.

1. On the {{ product_name }} Console, go to **Login & Registration**.
2. Under **Login Identifier**, click on **Username Validation**
3. Select **Custom** and configure the minimum and maximum length for a username.

    !!! info "Use special characters in usernames"
        {{ product_name }} allows the use of the following special characters for custom usernames: `! @ # $ & ' + \ = ^ . { | } ~ -`

        To enable the usage of special characters uncheck the **Restrict to alphanumeric (a-z, A-Z, 0-9)** checkbox.

        ![Configure username validation]({{base_path}}/assets/img/guides/organization/account-login/username-validation/configure-username-validation.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

!!! warning
    If you select **Custom** as the username type, and not make the **Email** attribute mandatory for users, the following features will not be available for users who do not configure an email address.

    - Email Notifications
    - Password recovery
    - Authentication with Magic Link, Email OTP

    Learn how to [update attribute properties]({{base_path}}/guides/users/attributes/manage-attributes/#update-attributes).
