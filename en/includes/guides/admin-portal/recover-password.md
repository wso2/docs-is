# Recover your password

If you are the owner or an administrator of an {{ product_name }} organization, the following guide explains how you can recover a forgotten password.

To recover your password:

1. Go to the sign-in page of the [My Account Portal]({{base_path}}/guides/{{ myacc_doc_url }}/#access-my-account-portal).

    ![Recover your password]({{base_path}}/assets/img/guides/organization/self-service/customer/recover-your-password.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **Forgot password?**.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0" ) %}
3. Follow one of the following methods based on the password recovery option configured for your organization.

    !!! note

        - Setting your email address and mobile number is mandatory to use the email link and SMS OTP recovery methods respectively.

        - If you have configured both options for password recovery, select your preferred method and click **Proceed**.

    - For email link recovery, enter your username and click **Send Reset Link**. An email notification will be sent to your email address.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-email-only.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - For SMS OTP recovery, enter your username and click **Send SMS OTP**. An OTP code will be sent to your registered mobile number.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-sms-only.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% else %}

3. Enter your username and click **Send Reset Link**. An email notification will be sent to your email address.

    ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/forgot-your-password.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0" ) %}
4. Confirm password reset request.
    - If the **Email Link** option was chosen in the previous step, open the email you received and click **Reset Password**.
        ![Reset password email]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    - If SMS OTP option was chosen in the previous step, enter the OTP code sent to your mobile and click **Continue**.
        ![Reset password SMS OTP]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-sms-otp.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% else %}

4. Open the email you received and click **Reset Password**

    ![Reset password email]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

5. Enter new password and **Proceed**.
