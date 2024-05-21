# Self-service for owners and administrators

If you are an owner or an administrator in an {{ product_name }} organization, go to the [My Account portal](https://myaccount.asgardeo.io){:target="_blank"} to easily access and self-manage your information from anywhere.

You can perform the following activities on this portal:
- Update profile information
- Change password
- View linked social accounts
- View and revoke active sessions

## Access My Account portal

{{my_account_url_note}}

You can also switch to My Account from the {{ product_name }}. Click your profile icon as shown below and select **My Account**.

![Switch to MyAccount from Console]({{base_path}}/assets/img/guides/organization/self-service/myaccount/switch-to-myaccount.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

You are now automatically signed in to the portal.

## Update profile information

The user details displayed in your profile corresponds to the default attributes that are enabled for the organization.

To update your profile information via My Account:

1. Sign in to the My Account portal.
2. Click **Personal Info** to see the profile information.

   ![Update user profile from MyAccount]({{base_path}}/assets/img/guides/organization/self-service/myaccount/update-profile-info.png)

3. If required, update the editable information.

## Change password

{% include "../fragments/self-service/change-password.md" %}

## Manage linked social accounts

{% include "../fragments/self-service/manage-linked-social-accounts.md" %}

## Export profile information

{% include "../fragments/self-service/export-profile-information.md" %}

    ??? note "Sample JSON file"
        
        This is a sample of the exported `json` file with an admin user's profile information.

        ``` json
        {
            "user_profile": {
                "accountState": "UNLOCKED",
                "emailVerified": "true",
                "country": "SriLanka",
                "givenname": "firstname",
                "created": "2021-04-07T15:07:58.001440Z",
                "modified": "2023-04-25T04:31:05.838894Z",
                "emailaddress": "tom@wso2.com",
                "userid": "36d2dd61-6e58-4b54-bfbe-f8621236c88b",
                "username": "tom@wso2.com",
                "lastname": "Jerry"
            },
            "linked_accounts": [
                {
                    "connection": "Google",
                    "connectionId": "xxxx",
                    "linkedAccountId": "xxxx",
                    "isExternalConnection": true
                }
            ]
        }
        ```

## Manage login sessions

{% include "../fragments/self-service/manage-login-sessions.md" %}

## Enroll TOTP for {{ product_name }} users

If you, as an administrator or an organization owner, want to register an authenticator app for generating OTP values, you can configure it via the My Account portal.

### Initial setup

Follow the steps given below to set up an authenticator app using My Account.

1. In your My Account portal, go to **Security > Additional Authentication**.

    ![Add MFA from {{ product_name }} MyAccount]({{base_path}}/assets/img/guides/mfa/totp/add-mfa-via-myaccount.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click the **+** icon and scan the prompted QR code using an authenticator application.

    ![SCAN QR code in {{ product_name }} MyAccount]({{base_path}}/assets/img/guides/mfa/totp/scan-qr-code-via-myaccount.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enter the TOTP code obtained after scanning the QR code and click **Verify**.

    ![QR code verified]({{base_path}}/assets/img/guides/mfa/totp/verification-message-qr-code-via-myaccount.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


### Regenerate the QR code

If you deleted the scanned QR from the authenticator app, follow the steps below to reconfigure it.

1. In your My Account portal, go to **Security > Additional Authentication**.

2. Click the eye icon (view) next to the authenticator app.

    ![Add MFA from {{ product_name }} MyAccount]({{base_path}}/assets/img/guides/mfa/totp/regenerate-mfa-via-myaccount.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Regenerate** to generate a new QR code.

    ![Regenerate QR code in {{ product_name }} MyAccount]({{base_path}}/assets/img/guides/mfa/totp/regenerate-qr-codes.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enter the TOTP code obtained after scanning the QR code and click **Verify**.

    ![SCAN QR code in {{ product_name }} MyAccount]({{base_path}}/assets/img/guides/mfa/totp/verify-qr-code-via-myaccount.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Configure backup codes

When you have enabled at least one additional authentication method in the **Additional Authentication** section, authentication using backup codes will be available as a recovery option for MFA. Users can use these backup codes to log in when they cannot obtain the required MFA codes.

### Enable backup codes

!!! note "Before you begin"
    You need to configure at least one additional authenticator from the My Account portal. See more information on [configuring the authenticator app](#initial-setup).

To enable backup codes:

1. On the My Account portal, go to **Security** > **Additional Authentication** > **Recovery Options**.
2. Click `+` to add backup codes.
    You will see a popup window with ten backup codes. Each backup code can be used only once.

    ![QR backup codes]({{base_path}}/assets/img/guides/mfa/backup-codes/backup-codes-via-myaccount.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Download Codes** or **Copy Codes** and save the copied or downloaded backup codes securely, as the codes will only be shown once.
4. After saving the backup codes, click **Close**.

!!! note
    The backup code configurations will not be applied to your active sessions by default, therefore it is recommended to terminate your active sessions.

### Regenerate backup codes

In case you have lost these backup codes or have used them all, follow the steps below to generate a new set of backup codes.

1. On the My Account portal, go to **Security** > **Additional Authentication** > **Recovery Options**.
2. Click on the refresh icon to regenerate the backup codes.

    ![Regenerate backup codes]({{base_path}}/assets/img/guides/mfa/backup-codes/regenerate-backup-codes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. On the confirmation window, click **Regenerate** to confirm your action.
    You will see a popup window with ten backup codes. Each backup code can be used only once.

    ![QR backup codes]({{base_path}}/assets/img/guides/mfa/backup-codes/backup-codes-via-myaccount.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Download Codes** or **Copy Codes** and save the copied or downloaded backup codes securely, as the codes will only be shown once.
5. After saving the backup codes, click **Close**.

!!! note
    The backup code configurations will not be applied to your active sessions by default, therefore it is recommended to terminate your active sessions.

### Remove backup codes
To remove the backup codes:

1. On the My Account portal, go to **Security** > **Additional Authentication** > **Recovery Options**.
2. Click on the trash icon to remove the existing backup codes.

    ![Remove backup codes]({{base_path}}/assets/img/guides/mfa/backup-codes/remove-backup-codes.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. On the confirmation window, click **Remove** to confirm your action.

!!! note
    The backup code configurations will not be applied to your active sessions by default, therefore it is recommended to terminate your active sessions.
