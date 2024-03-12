!!! note "Before you begin"
    You need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

To enable Microsoft login:

1. On the {{ product_name }} Console, go to **Applications**.
2. Select your application, go to the **Login Flow** tab and add Microsoft login from your preferred editor:

    {% if product_name == "Asgardeo" %}
    === "Classic Editor"
        To add Microsoft login using the Classic Editor:

        1. If you haven't already defined a sign-in flow, click **Start with Default configuration** to get started.

        2. Click **Add Authentication** on the step, select your Microsoft identity provider, and click **Add**.

            ![Add Microsoft login in {{ product_name }}]({{base_path}}//assets/img/guides/idp/microsoft-idp/add-microsoft-with-basic.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To add Microsoft login using the Visual Editor:

        1. Switch to the **Visual Editor** tab, by default the `Username & Password` login flow will be added onto the Visual Editor's workspace.

        2. Click on `+ Add Sign In Option` to add a new authenticator to the same step and select your Microsoft connection.

            ![Add Microsoft login in {{ product_name }} using the Visual Editor]({{base_path}}/assets/img/guides/idp/microsoft-idp/add-microsoft-login-with-visual-editor.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---
    {% else %}
    1. Click **Add Sign In Option** to add a new authenticator to the first step.

    2. Select the Microsoft connection.

    3. Click **Confirm** to add login with Microsoft to the sign-in flow.

        ![Configuring Microsoft login in {{product_name}} using the Visual Editor]({{base_path}}/assets/img/guides/idp/microsoft-idp/add-microsoft-login-with-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% endif %}

    {% include "../recommendation.md" %}

3. Click **Update** to save your changes.