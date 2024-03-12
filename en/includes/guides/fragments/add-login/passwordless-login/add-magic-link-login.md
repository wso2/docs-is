Follow the steps given below to add **Magic link** login to the login flow of your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add magic link login.

3. Go to the **Login Flow** tab of the application and add magic link login as follows:

    {% if product_name == 'Asgardeo' %}
    === "Visual Editor"
        To add passwordless login with magic link using the Visual Editor:

        1. Go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

        2. Select **Magic Link**.

        3. Click **Confirm** to add passwordless login with Magick Link to the sign-in flow.

            ![Configuring magic link login in Asgardeo using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/magic-link/add-magic-link-login-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}


    === "Classic Editor"
        To add passwordless login with magic link using the Classic Editor:

        - Select **Add Magic Link login** from the list if you haven't already built a login flow for the application.

            ![Configuring magic link login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/magic-link/add-magic-link-login.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

        - If you already have a login flow, click **Add authentication**, select **Magic Link** and click **Add** in the first authentication step.

            ![Customize the login flow]({{base_path}}/assets/img/guides/passwordless/magic-link/add-magic-link-login-step.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---
    {% else %}
    1. Go to **Predefined Flows** > **Basic Flows** > **Add Passwordless login**.

    2. Select **Magic Link**.

    3. Click **Confirm** to add passwordless login with magic link to the sign-in flow.

        ![Configuring magic link login in {{product_name}} using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/magic-link/add-magic-link-login.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% endif %}

4. Click **Update** to save your changes.