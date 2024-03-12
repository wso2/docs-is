Follow the steps given below to add **SMS OTP** login to the login flow of your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add SMS OTP login.

3. Go to the **Login Flow** tab of the application and add SMS OTP login as follows:

    {% if product_name == 'Asgardeo' %}
    === "Visual Editor"
        To add passwordless login with SMS OTP using the Visual Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

        2. Select **SMS OTP**.

        3. Click **Confirm** to add passwordless login with SMS OTP to the sign-in flow.

            ![Configuring SMS OTP login in Asgardeo using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/sms-otp/add-sms-otp-login-step-with-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


    === "Classic Editor"
        - If you haven't already built a login flow for your application, select **Add SMS OTP login** to build one.

            ![Configuring SMS OTP login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/sms-otp/add-sms-otp-login.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        - If you have an already built login flow, add the **SMS OTP** authenticator as the first authentication step.
        
            ![Customize the login flow]({{base_path}}/assets/img/guides/passwordless/sms-otp/add-sms-otp-login-step.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---

    {% else %}

    1. Go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

    2. Select **SMS OTP**.

    3. Click **Confirm** to add passwordless login with SMS OTP to the sign-in flow.

        ![Configuring magic link login in {{product_name}} using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/sms-otp/add-sms-otp-login-step-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% endif %}

4. Click **Update** to save your changes.



