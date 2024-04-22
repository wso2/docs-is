{% if product_name == 'Asgardeo' %}
=== "Visual Editor"
    To add the adaptive script using the Visual Editor:

    1. Switch to the **Visual Editor** tab and go to **Predefined Flows** > **Conditional Login Flows** > **Passkey Enrollment**.

    2. Click the **ADD** button corresponding to the **Passkey Progressive Enrollment** template.

    3. Click **Confirm** to replace any existing script with the selected predefined script.

        ![Add adaptive script with Visual Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-script-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    
    4. Enable the **Conditional Authentication** toggle located at the bottom of the editor.

=== "Classic Editor"
    To add the adaptive script using the Classic Editor:

    1. Enable the **Conditional Authentication** toggle located at the bottom of the editor.

    2. In the **Templates** section, go to **Passkey Enrollment** and click the **+** sign corresponding to the **Passkey Progressive Enrollment** template.
        
    3. Click **Confirm** to add the script.

        ![Add adaptive script with Classic Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-script-with-classic-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
---
{% else %}
1. Go to **Predefined Flows** > **Conditional Login Flows**.

2. Click **Passkey Enrollment** > **Passkey Progressive Enrollment** > **ADD**.

    <!--![Add adaptive script with Visual Editor]({{base_path}}/assets/img/guides/passwordless/passkey/add-script-with-visual-editor.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}-->

3. Click **Confirm** to replace any existing script with the selected predefined script.

4. Enable the **Conditional Authentication** toggle located at the bottom of the editor.

{% endif %}