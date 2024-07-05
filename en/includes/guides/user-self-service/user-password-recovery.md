# Password recovery for users

Users can recover a forgotten password from an application sign-in page by following the steps below.

## Prerequisites

Administrators should [enable password recovery]({{base_path}}/guides/account-configurations/account-recovery/password-recovery/) for users in the organization.

## Recover a forgotten password

!!! note
    Users onboarded from a read-only remote user store are not able to recover their passwords through the My Account portal.

To reset the password, the user should follow these steps.

1. Go to a login page via a business application or the [My Account portal]({{base_path}}/guides/user-self-service/customer-self-service-portal/).

    ![Recover your password]({{base_path}}/assets/img/guides/organization/self-service/customer/recover-your-password.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **Forgot password?**

3. Recovery method selection.

    !!! info
        The email and mobile claims being set is a **prerequisite** for email link and SMS OTP options respectively.

    - If only the email link recovery option is enabled for the tenant. Enter your username and click **Send Reset Link**.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-email-only.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        An email notification is sent to your email address.

    - If only the SMS OTP recovery option is enabled for the tenant. Enter your username and click **Send SMS OTP**.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-sms-only.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        An OTP code will be sent to the mobile number added to your user profile.

    - If multiple options are enabled for the tenant. Enter your username, select the preferred recovery method and click
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-multi-option.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        A link to the email or an OTP code to the mobile number in your profile will be sent depending on the selected recovery method.

4. Confirm password reset request.
    - If the **Email Link** option was chosen in the previous step, open the email you received and click **Reset Password**.
        ![Reset password email]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - If SMS OTP option was chosen in the previous step, enter the OTP code sent to your mobile and click **Continue**.
        ![Reset password SMS OTP]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-sms-otp.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Enter new password and **Proceed**.

!!! note
    If the user is already signed in to the My Account portal, the password can be reset from there. Learn how to [change password from the My Account portal]({{base_path}}/guides/user-self-service/change-password).

## Check password recovery email
Users can also check the email address and mobile number to which their password recovery information is sent.

1. In the My Account portal, navigate to **Security** > **Account Recovery**.

    ![Account recovery in {{ product_name }} MyAccount]({{base_path}}/assets/img/guides/users/account-recovery.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click the eye icon of the relevant row, to check the recovery email address or the recovery mobile.

3. Click **Done**.