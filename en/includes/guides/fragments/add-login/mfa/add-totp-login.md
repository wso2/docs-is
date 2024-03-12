Follow the steps given below to enable **TOTP** as the second factor in the login flow of your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application for which TOTP needs to be added.

3. Go to the **Login Flow** tab of the application and add the TOTP authenticator as follows:

    {% if product_name == 'Asgardeo' %}
    === "Classic Editor"
        - If you don't have a customized login flow, you can click **Add TOTP as a second factor**.

            ![Configuring TOTP authenticator in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/totp/add-totp-authenticator.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

            This opens the customized login flow with TOTP as a second-factor authenticator:

        - If you have an already customized login flow, you can add a second step and add TOTP as the authenticator.
            
            ![Customize the login flow]({{base_path}}/assets/img/guides/mfa/totp/view-totp-authenticator.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add TOTP as a second-factor authenticator using the Visual Editor:

        1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Basic Flows** > **Add Multi-factor login**.

        2. Select `Username + Password -> TOTP`.

        3. Click **Confirm** to add TOTP as a second factor to the sign-in flow.

            ![Configuring TOTP authenticator in Asgardeo using the visual editor]({{base_path}}/assets/img/guides/mfa/totp/add-totp-authenticator-using-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---
    {% else %}
    1. Go to **Predefined Flows** > **Add Multi-factor Login**.

    2. Select **Username + Password -> TOTP**.

    3. Click **Confirm** to add passwordless login with email OTP to the sign-in flow.

          ![Configuring TOTP authenticator in Asgardeo using the visual editor]({{base_path}}/assets/img/guides/mfa/totp/add-totp-authenticator-using-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    4. Select **Enable backup codes** if you wish to allow users to use backup codes to log in to the application. Learn more about [configuring backup codes for users]({{base_path}}/guides/user-self-service/manage-backup-codes/).
    {% endif %}

4. Click **Update** to save your changes.