# Add Email OTP login

Email OTP is a form of passwordless authentication. It allows users to log in by providing a one-time passcode sent to their email instead of entering a password.

## Prerequisites
- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) in {{ product_name }}.

{{ admin_login_note}}

{{ configure_email_sender }}

## Enable Email OTP login for an app

{% include "../../../guides/fragments/add-login/passwordless-login/add-email-otp-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, enter your username and press **Continue**.

    ![Sign In with email OTP in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/email-otp/email-otp-login-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

    You will be redirected to the below email OTP page.

    ![Email OTP submit page]({{base_path}}/assets/img/guides/passwordless/email-otp/email-otp-submit-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

4. Check your inbox for the email containing the one-time passcode. The email reads as follows.

    ![Email OTP email]({{base_path}}/assets/img/guides/passwordless/email-otp/email-otp-email.png){: width="400" style="border: 0.3px solid lightgrey;"}

5. Enter the received passcode in the email OTP page and click on **Continue**.
