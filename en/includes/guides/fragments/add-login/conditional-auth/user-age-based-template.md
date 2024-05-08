{% if product_name == "Asgardeo" %}
=== "Classic Editor"
    To add user-age-based access control using the classic editor:

    1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

    2. Turn on **Conditional Authentication** by switching the toggle on.

    3. Select the **Access Control > Age-Based** template.

=== "Visual Editor"
    To add age-based access control using the visual editor:

    1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Access Control**.

    2. Click **+ ADD** next to **User-Age-Based** to add the user-age-based access control script.

        ![Age-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/age-based-access-control-with-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    3. Click **Confirm** to replace any existing script with the selected predefined script.

---
{% else %}
1. Go to **Predefined Flows** > **Conditional Login Flows**.

2. Click **Access Control** > **User-Age-Based** > **ADD**.

    <!--![Age-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/age-based-access-control-with-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}-->

3. Click **Confirm** to replace any existing script with the selected predefined script.

{% endif %}