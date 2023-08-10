# Add MFA with Email OTP

Email OTP is a One-Time Password (OTP) sent to the user's verified email address, which the user must submit during login (as an additional authentication step). This password is typically valid for a very short period of time.

During Email OTP authentication, the user is required to access the verified email account within a short time span to get the OTP. This prevents unauthorized users from accessing the OTP, and thereby adds an extra layer of security to the authentication process.

Follow the instructions given below to configure Multi-Factor Authentication (MFA) using Email OTP.

## Prerequisites
To get started, you need to [register an application]({{base_path}}/guides/applications/register-sp/) in Identity Server. You can register your own application or use one of the [sample applications]({{base_path}}/guides/adaptive-auth/adaptive-auth-overview/#set-up-the-sample) provided.

!!! info
        - You can use Email OTP for multi-factor authentication only if a previous authentication step is configured with **username and password** or another factor that can validate user credentials.

## Set up Email OTP
Identity Server has some default settings for email OTP, which are sufficient for most cases. If required, you can change the default settings as explained below.

To update the default Email OTP settings:

1. On the Console, go to **Connections** and select **Email OTP**.
2. Update the following parameters in the **Settings** tab:

    ![Setup email OTP]({{base_path}}/assets/img/guides/setup-email-otp.png)

    | Parameter                           | Description                                                                                                                                                                                                   |
    |-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Email OTP expiry time               | Specifies the expiry time of the OTP. The generated OTP will not be valid after this expiry time.                                                                                                             |
    | Use only numeric characters for OTP | Specifies whether to use only numeric characters in the OTP. If this is selected, the generated OTP contains only digits (0-9). If this option is not selected, the OTP will contain alphanumeric characters. |
    | Email OTP length                    | Specifies the number of characters allowed in the OTP.                                                                                                                                                        |

3. Once you update the Email OTP settings, click **Update**.

## Enable Email OTP for an app
To enable Email OTP for MFA, you need to add **Email OTP** in the authentication flow of the application.

Follow the steps given below.

1. On the Console, go to **Applications**. 
2. Select the application to which you wish to add Email OTP. 
3. Go to the **Sign-in Method** tab of the application and:

    * If you don't have a customized login flow, you can click **Add Email OTP as a second factor**.

        ![Add Email OTP authenticator]({{base_path}}/assets/img/guides/add-email-otp-authenticator.png)

        This opens the customized login flow with TOTP as a second-factor authenticator:

    * If you have an already customized login flow, you can add a second step and add TOTP as the authenticator.

        ![Customize the login flow]({{base_path}}/assets/img/guides/view-totp-authenticator.png)

    !!! info Enable backup codes
            Once the Email OTP authenticator is added, select **Enable backup codes**. This allows users to use their backup codes to log in to the application when they cannot obtain the required MFA codes.
            
            ![Enable backup codes for email otp authenticator]({{base_path}}/assets/img/guides/enable-backup-codes.png)
    
            Learn more about <a :href="$withBase('/guides/user-self-service/manage-backup-codes/')">configuring backup codes for business users</a>.

4. Click **Update** to save your changes.

## How it works

When Email OTP is enabled in the login flow of your application, the application user will be prompted with the Email OTP authentication step once the first authentication step is completed. Given below are the high-level steps that follow:

1. Identity Server sends the OTP to the user's verified email address.
2. Identity Server prompts the user to enter the OTP code.
   <img alt="Authenticate with email OTP" src="{{base_path}}/assets/img/guides/enter-email-otp.png" width="300"/>
3. If required, the user can request to resend the OTP. The new OTP invalidates the previously sent OTP.
4. The user enters the OTP and clicks **Continue**.
5. If the authentication is successful, the user can access the application.
