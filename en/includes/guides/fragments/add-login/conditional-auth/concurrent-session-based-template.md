{% if product_name == "Asgardeo" %}
=== "Classic Editor"
    To add concurrent session management-based access control using the classic editor:

    1. Click **Start with default configuration** to define the login flow starting with the `username and password` login.

    2. Turn on **Conditional Authentication** by switching the toggle on.

    3. Select the **User** > **Concurrent Session Management Template** template.

=== "Visual Editor"
    To add concurrent session management-based access control using the visual editor:

    1. Switch to the **Visual Editor** tab, and expand **Predefined Flows** > **Conditional Login Flows** > **User**.

    2. Click **+ ADD** next to **Concurrent Session Management Template** to add the user-age-based access control script.

        ![Session-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/session-based-access-control.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    3. Click **Confirm** to replace any existing script with the selected predefined script.

---
{% else %}

1. Go to **Predefined Flows** > **Conditional Login Flows**.

2. Click **Access Control** > **Session-Based** > **ADD**.

    <!--![Session-based access control with visual editor]({{base_path}}/assets/img/guides/conditional-auth/session-based-access-control.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}-->

3. Click **Confirm** to replace any existing script with the selected predefined script.

{% endif %}