!!! note "Before you begin"
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

1. On the {{ product_name }} Console, go to **Applications**.
2. Select your application, go to the **Login Flow** tab and add X login from your preferred editor:

    {% if product_name == "Asgardeo" %}
    === "Classic Editor"
        To add X login using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.
    
        2. Click **Add Authentication** on the step, select your X connection, and click **Add**.

            ![Add X login in {{product_name}}]({{base_path}}/assets/img/guides/idp/x-idp/add-x-federation-with-basic.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add X login using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.
    
        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your X connection.

            ![Add Google login in {{product_name}} using the Visual Editor]({{base_path}}/assets/img/guides/idp/x-idp/add-x-login-with-visual-editor.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---
    {% else %}
    1. Click **Add Sign In Option** to add a new authenticator to the first step.

    2. Select the Twitter connection.

    3. Click **Confirm** to add login with X to the sign-in flow.

        ![Configuring X login in {{product_name}} using the Visual Editor]({{base_path}}/assets/img/guides/idp/x-idp/add-x-login-with-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% endif %}

    {% include "../recommendation.md" %}

3. Click **Update** to save your changes.