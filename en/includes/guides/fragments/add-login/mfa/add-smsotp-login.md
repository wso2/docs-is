To enable SMS OTP for MFA, you need to add **SMS OTP** in the authentication flow of the application.

Follow the steps given below.

1. On the {{ product_name }} Console, go to **Applications**.
2. Select the application to which you wish to add SMS OTP.
3. Go to the **Login Flow** tab of the application and add the SMS OTP authenticator from your preferred editor:

    {% if product_name == 'Asgardeo' %}
    === "Visual Editor"
        To add SMS OTP as a second-factor authenticator using the Visual Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Basic Flows** > **Add Multi-factor login**.

        2. Select **Username + Password -> SMS OTP**.

        3. Click **Confirm** to add SMS OTP as a second factor to the sign-in flow.

            ![Configuring SMS OTP authenticator in Asgardeo using the visual editor]({{base_path}}/assets/img/guides/mfa/smsotp/add-sms-otp-authenticator-using-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
        
        4. Select **Enable backup codes** if you wish to allow users to use backup codes to log in to the application. Learn more about [configuring backup codes for users]({{base_path}}/guides/user-self-service/manage-backup-codes/).

    === "Classic Editor"
        - If you don't have a customized login flow, you can click **Add SMS OTP as a second factor**.

            ![Add SMS OTP authenticator]({{base_path}}/assets/img/guides/mfa/smsotp/add-sms-otp-authenticator.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        This opens the customized login flow with SMS OTP as a second-factor authenticator:

        - If you have an already customized login flow, you can add a second step and add SMS OTP as the authenticator.

            ![Customize the login flow]({{base_path}}/assets/img/guides/mfa/smsotp/view-sms-otp-authenticator.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
        
        - Select **Enable backup codes** if you wish to allow users to use backup codes to log in to the application. Learn more about [configuring backup codes for users]({{base_path}}/guides/user-self-service/manage-backup-codes/).

    {% else %}
    1. Go to **Predefined Flows** > **Add Multi-factor Login**.

    2. Select **Username + Password -> SMS OTP**.

    3. Click **Confirm** to add passwordless login with email OTP to the sign-in flow.

          ![Configuring SMS OTP authenticator in {{product_name}} using the visual editor]({{base_path}}/assets/img/guides/mfa/smsotp/add-sms-otp-authenticator-using-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. Select **Enable backup codes** if you wish to allow users to use backup codes to log in to the application. Learn more about [configuring backup codes for users]({{base_path}}/guides/user-self-service/manage-backup-codes/).
    {% endif %}

4. Click **Update** to save your changes.