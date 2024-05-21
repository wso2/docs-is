{% if product_name == 'Asgardeo' %}
=== "Classic Editor"
    To add group-based adaptive MFA using the classic editor:

    1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

    2. Turn on **Conditional Authentication** by switching the toggle on.

    3. Select the **Adaptive MFA > Group-Based** template.

=== "Visual Editor"
    To add group-based adaptive MFA using the visual editor:

    1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **Adaptive MFA**.

    2. Click **+ ADD** next to **Group-Based** to add the group-based adaptive MFA script.

        ![Group-based adaptive MFA with visual editor]({{base_path}}/assets/img/guides/conditional-auth/group-based-adaptive-mfa-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    3. Click **Confirm** to replace any existing script with the selected predefined script.

---
{% else %}
1. Go to **Predefined Flows** > **Conditional Login Flows**.

2. Click **Adaptive MFA** > **Group-Based** > **ADD**.

    <!--![Configuring group-based adaptive MFA with visual editor]({{base_path}}/assets/img/guides/conditional-auth/group-based-adaptive-mfa-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}-->

3. Click **Confirm** to replace any existing script with the selected predefined script.


{% endif %}
