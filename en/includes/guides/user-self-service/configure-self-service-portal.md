# Configure the self-service portal

Users and administrators in your organization can manage their accounts and information by accessing the **My Account portal**, a self-service portal offered by {{product_name}}.

## Access the My Account portal

Users can access the My Account portal using the following link - {{my_account_link}}

!!! note

    If you have [shared the My Account portal with organization users]({{base_path}}/guides/organization-management/share-applications/#share-the-my-account-portal), they may access the organization-specific My Account Portal using the following link:

    ``` bash
    {{my_account_org_link}}
    ```



Listed below are self-service features that are available for the user in the **My Account portal**.

- [Update profile information]({{base_path}}/guides/user-self-service/update-profile-info/)
- [Change password]({{base_path}}/guides/user-self-service/change-password/)
- [View and revoke consents given to applications]({{base_path}}/guides/user-self-service/manage-consents/)
- [Enroll TOTP]({{base_path}}/guides/user-self-service/enable-totp/)
- [Manage backup codes]({{base_path}}/guides/user-self-service/manage-backup-codes/)
- [Manage linked social accounts]({{base_path}}/guides/user-self-service/manage-linked-accounts/)
- [Export profile information]({{base_path}}/guides/user-self-service/export-profile-information/)
- [View and revoke login sessions]({{base_path}}/guides/user-self-service/manage-login-sessions/)
- [Manage password recovery]({{base_path}}/guides/user-self-service/user-password-recovery/)
- [Discover and maintain applications]({{base_path}}/guides/user-self-service/discover-applications/)
- [Register passkeys]({{base_path}}/guides/user-self-service/register-passkey/)

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0")%}
## Enable/Disable the My Account portal

Follow the steps given below to manage access to the My Account portal for users in your organization.

1. On the {{product_name}} Console, go to **Applications** and locate the My Account application at the top.

2. Click the settings icon to enter the **My Account** configuration page.

3. In the **Danger Zone**, under **Disable application**, switch the toggle on to disable the My Account portal or off to enable it for users.

    ![Disable my account application]({{base_path}}/assets/img/guides/users/disable-my-account-application.png)
{% endif %}

## Configure the My Account portal login flow

Just like any other appliaction registered in {{product_name}}, you can customize the login flow of the My Account portal.

To do so,

1. On the {{product_name}} Console, go to **Applications** and locate the My Account application at the top.

2. Click the settings icon to enter the **My Account** configuration page.

3. Go to the **Login Flow** tab and customize the login flow.

    !!! note
        Explore the authentication options offered by {{product_name}} in the [Authentication]({{base_path}}/guides/authentication/) section.

4. Click **Update** to save the changes.