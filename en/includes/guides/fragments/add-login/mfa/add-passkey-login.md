Follow the steps given below to enable **Passkey** login for your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add Passkey.

3. Go to the **Login Flow** tab of the application and add Passkey from your preferred editor:

    {% if product_name == 'Asgardeo' %}
    === "Classic Editor"
        - If you haven't already built a login flow for your application, select **Start with default configuration** to build one.

            ![Configuring basic login in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/passkey/add-basic-login-using-classic-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        - Add a second step to the login flow and add **Passkey** as the authenticator.

            ![Configuring passkey as the second factor]({{base_path}}/assets/img/guides/mfa/passkey/add-passkey-using-classic-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add Passkey as a second-factor authenticator using the Visual Editor:

        1. Switch to the **Visual Editor** tab.

        2. Click **+** to add a second step to the login flow.

        3. Click **Add Sign In Option**, select **Passkey** and click **Add**.

        3. Click **Confirm** to add login with passkey to the sign-in flow.

            ![Configuring passkey login in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/passkey/add-passkey-using-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---
    {% else %}
    1. Click **+** to add a second step to the login flow.

    2. Click **Add Sign In Option**, select **Passkey** and click **Add**.

    3. Click **Confirm** to add login with passkey to the sign-in flow.

        ![Configuring passkey login in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/passkey/add-passkey-using-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    {% endif %}

4. Click **Update** to save your changes.