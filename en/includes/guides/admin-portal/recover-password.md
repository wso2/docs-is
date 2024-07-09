# Recover your password

If you are an owner or an administrator in an {{ product_name }} organization, you can recover a forgotten password by following the instructions on the {{ product_name }} sign-in page.

To recover your password:

1. Go to the sign-in page via the [My Account Portal]({{base_path}}/guides/{{ myacc_doc_url }}/#access-my-account-portal).

    ![Recover your password]({{base_path}}/assets/img/guides/organization/self-service/customer/recover-your-password.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **Forgot password?**.
3. Recovery method selection.

    !!! info
        The email and mobile claims being set is a **prerequisite** for email link and SMS OTP options respectively.

    - If only the email link recovery option is enabled for the tenant. Enter your username and click **Send Reset Link**.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-email-only.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        An email notification is sent to your email address.

    - If only the SMS OTP recovery option is enabled for the tenant. Enter your username and click **Send SMS OTP**.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-sms-only.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        An OTP code will be sent to the mobile number added to your user profile.

    - If multiple options are enabled for the tenant. Enter your username, select the preferred recovery method and click
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-multi-option.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        A link to the email or an OTP code to the mobile number in your profile will be sent depending on the selected recovery method.

4. Confirm password reset request.
    - If the **Email Link** option was chosen in the previous step, open the email you received and click **Reset Password**.
        ![Reset password email]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - If SMS OTP option was chosen in the previous step, enter the OTP code sent to your mobile and click **Continue**.
        ![Reset password SMS OTP]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-sms-otp.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Enter new password and **Proceed**.

Now you have reset your password and can sign in using your new password.
