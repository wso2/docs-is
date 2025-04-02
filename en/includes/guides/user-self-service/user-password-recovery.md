# Password recovery for users

Users may recover a forgotten password from an application sign-in page by following the steps below.

!!! note "Before you begin"

    Administrators should [enable password recovery]({{base_path}}/guides/account-configurations/account-recovery/password-recovery/) for users of the organization.

## Recover a forgotten password

!!! warning
    Users that onboard from a read-only remote user store are not able to recover their passwords through the My Account portal.

To reset the password, the user should follow these steps.

1. Go to a login page via a business application or the [My Account portal]({{base_path}}/guides/user-self-service/customer-self-service-portal/).

    ![Recover your password]({{base_path}}/assets/img/guides/organization/self-service/customer/recover-your-password.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click **Forgot password?**

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0" ) %}

3. Follow one of the following methods based on the password recovery option configured for your organization.

    === "Email link"

        Enter your username and click **Send Reset Link**. An email notification will be sent to your email address.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-email-only.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0") %}

    === "Email OTP"

        Enter your username and click **Send Email OTP**. An OTP code will be sent to your registered email address.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-email-otp.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    
    {% endif %}

    === "SMS OTP"

        Enter your username and click **Send SMS OTP**. An OTP code will be sent to your registered mobile number.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-sms-only.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        {% if product_name == "WSO2 Identity Server" and is_version > "7.1.0" %}
        - Setting an email address is required for email link and email OTP recovery methods, while setting a mobile number is required for SMS OTP recovery.
        {% else %}
        - Setting your email address and mobile number is mandatory to use the email link and SMS OTP recovery methods respectively.
        {% endif %}

        - If the organization has configured multiple options for password recovery, select your preferred method and click **Proceed**.


4. Confirm password reset request.

    === "Email link"

        Open the email you received and click **Reset Password**.
        ![Reset password email]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    

    {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0") %}

    === "Email OTP"

        Enter the OTP code sent to your email and click **Continue**.
        ![Reset password email OTP]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-email-otp.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    {% endif %}

    === "SMS OTP" 

        Enter the OTP code sent to your mobile and click **Continue**.
        ![Reset password SMS OTP]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-sms-otp.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% else %}
3. Enter your username and click **Send Reset Link**. An email notification will be sent to your email address.
        ![Forgot your password]({{base_path}}/assets/img/guides/organization/self-service/customer/password-recovery-option-email-only.png){: width="300" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Open the email you received and click **Reset Password**.
        ![Reset password email]({{base_path}}/assets/img/guides/organization/self-service/customer/reset-password-email.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

{% endif %}

5. Enter new password and click **Proceed**.

!!! note
    If the user is already signed in to the My Account portal, the password can be reset from there. Learn how to [change password from the My Account portal]({{base_path}}/guides/user-self-service/change-password).

## Check password recovery email
Users can also check the email address and mobile number to which their password recovery information is sent.

1. In the My Account portal, navigate to **Security** > **Account Recovery**.

    ![Account recovery in {{ product_name }} MyAccount]({{base_path}}/assets/img/guides/users/account-recovery.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Click the eye icon of the relevant row, to check the recovery email address or the recovery mobile.

3. Click **Done**.