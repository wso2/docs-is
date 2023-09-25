# Configure the self-service portal for users

Users in your organization can access self-service features from the **My Account**<Badge text="preview" type="warn"/> self-service portal in {{ product_name }}. See the complete list of [self-service capabilities](../../guides/user-self-service/).

!!! warning
    The **My Account** portal is in <Badge text="preview " type="warn" vertical="middle" /> mode. We are working on adding more features to enhance the experience of the user.

## Access My Account portal

The URL for the **My Account** portal is as follows:

```bash
https://myaccount.asgardeo.io/t/{organization_name}
```

For example, if your organization name is **bifrost**, the URL is as follows:

```bash  
https://myaccount.asgardeo.io/t/bifrost
```

## Enable/Disable My Account portal

Follow the steps given below to grant/deny access to the My Account portal for users in your organization.

1. On the {{ product_name }} Console, go to **Applications**, and you will see the My Account portal listed as the first application.

    ![My Account application in the list](../../assets/img/guides/organization/self-service/myaccount/application-list.png)

2. Click the settings icon to open the **My Account** configuration page.
3. Switch the toggle to enable or disable the My Account portal for your organization.

!!! warning
    The My Account portal is in preview mode, and it is recommended to disable it when your organization goes into production. When the My Account portal is disabled, users in your organization will not be able to access self-service features via the My Account portal.

## Enable 2FA for the My Account portal

Follow the steps below to configure Two-Factor Authentication (2FA) for the My Account portal of your organization.

1. In the {{ product_name }} Console, go to **Self-Service Portal**.
2. Click **Configure** to open the **My Account** page.
3. Select the 2FA options that you need to configure for the My Account Portal.

    !!! note
        The SMS OTP authentication option will only be enabled when your organization's SMS OTP connection is set up. If you have not already set up the SMS OTP connection, see the instructions on [setting up the SMS OTP connection](../../guides/authentication/mfa/add-smsotp-login/#set-up-sms-otp).

    ![Configure 2FA options for My Account portal](../../assets/img/guides/organization/self-service/myaccount/configure-2fa-for-myaccount.png)
4. Click **Update** to apply configuration changes.

## Enable TOTP enrollment during login
Administrators of the organization can enable TOTP enrollment during login for the My Account portal.

To enable TOTP enrollment during login:

1. On the {{ product_name }} Console, go to **Self-Service Portal**.
2. Click **Configure** to open the **My Account** page.
3. Select **Enable TOTP**.
4. Select **Allow TOTP enrollment during login**.
    ![Enable TOTP enrollment during login](../../assets/img/guides/organization/self-service/myaccount/enable-totp-enrollment-during-login.png)

    !!! note "Disable TOTP enrollment during login"
        If you do not want to enable TOTP enrollment during login, keep the option unchecked. At user login, if the users have not enrolled the TOTP authenticator, they will be instructed to contact the organization admin for assistance.

5. Click **Update** to save the configurations.

## Enable backup codes for login
My Account portal users can use backup codes to log in to applications when they cannot obtain the required MFA codes.

To enable backup codes for My Account portal login:

!!! note Before you begin
    To enable backup codes, you need to enable at least one 2FA option for the login flow.

1. On the {{ product_name }} Console, go to **Self-Service Portal**.
2. Click **Configure** to open the **My Account** page.
3. Select **Enable Backup Codes**.
4. Click **Update** to save the configurations.