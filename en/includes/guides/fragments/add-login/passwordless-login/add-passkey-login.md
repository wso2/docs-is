Follow the steps given below to enable login with passkeys for your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add passkey login.

3. Go to the **Login Flow** tab of the application and add passkey login as follows:

    {% if product_name == 'Asgardeo' %}
    === "Visual Editor"
        To add passwordless login with passkey using the Visual Editor:

        1. Go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

        2. Select **Passkey**.

        3. Click **Confirm** to add passwordless login with passkey to the sign-in flow.

            ![Configuring passkey login in Asgardeo using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-passkey-login-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


    === "Classic Editor"
        To add passwordless login with passkey using the Classic Editor:

        - Select **Add Passkey login** from the list if you haven't already built a login flow for the application.

            ![Configuring Passkey login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/passkey/add-passkey-login.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        - If you already have a login flow, click **Add authentication** > **Passkey** and click **Add** for the first authentication step.

            ![Customize the login flow]({{base_path}}/assets/img/guides/passwordless/passkey/add-passkey-login-step.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---
    {% else %}
    1. Go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

    2. Select **Passkey**.

    3. Click **Confirm** to add passwordless login with passkey to the sign-in flow.

        ![Configuring Passkey login in {{product_name}} using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-passkey-login.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% endif %}

4. Click **Update** to save your changes.