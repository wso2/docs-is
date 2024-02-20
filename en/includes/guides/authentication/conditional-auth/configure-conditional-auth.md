# Configure conditional authentication

Given below are the high-level steps for enabling conditional authentication in your application.

## Prerequisites

[Register your application]({{base_path}}/guides/authentication/add-login-to-apps/) on the WSO2 Identity Server Console.

{{jdk_version_message}}

## Enable conditional authentication

{% include "../../fragments/manage-app/conditional-auth/configure-conditional-auth.md" %}

!!! note "Enable conditional authentication using the Visual Editor"
    Conditional authentication is enabled by default in the Visual Editor.

## Add conditional authentication script

There are two ways to add a conditional authentication script:

- Use a [predefined template]({{base_path}}/guides/authentication/conditional-auth/#script-templates).
- Write a [new conditional auth script]({{base_path}}/guides/authentication/conditional-auth/write-your-first-script/).

{% if product_name == 'Asgardeo' %}

## Add a secret to the script
Secrets securely store values associated with external APIs. These secret values are used in conditional authentication scripts when {{ product_name }} is required to interact with an external API (service endpoint) during the authentication process. You can securely store these secret values on the {{ product_name }} Console and retrieve them whenever required for `callChoreo()` conditional authentication function.

### Create a new secret

To add a new secret:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select your application and go to the **Login Flow** tab .

3. Add a new secret from your preferred editor:

    ---
    === "Classic Editor"
        Enable conditional authentication and click the key icon above the script to create a new secret.

        ![Add secret to script]({{base_path}}/assets/img/guides/secret/add-secret-to-script.png){: style="display: block; margin: 0;"}

    === "Visual Editor"
        Switch to the **Visual Editor** tab, expand the **Script Editor** and click **Add Secret**.

        ![Add secret to script using the visual editor]({{base_path}}//assets/img/guides/secret/add-secret-to-script-using-visual-editor.png){: width="600" style="display: block; margin: 0;"}

    ---

4. Click **Create new secret** from the drop-down menu.

5. Enter the following details:

    ![Create secret in {{ product_name }}]({{base_path}}/assets/img/guides/secret/create-a-secret.png){: width="450" style="display: block; margin: 0;"}

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Secret Name</td>
            <td>A meaningful name for the secret. This name is not changeable.</td>
        </tr>
        <tr>
            <td>Secret Value</td>
            <td>You can enter the secret value that is <code>1</code> to <code>2048</code> bits in length.</td>
        </tr>
        <tr>
            <td>Secret Description</td>
            <td>A short description for the secret.</td>
        </tr>
    </table>

6. Click **Finish** to complete the creation.

### Delete an existing secret

To delete an existing secret:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select your application and go to the **Login Flow** tab .

3. Delete the secret by using your preferred editor:

    ---
    === "Classic Editor"
        Enable conditional authentication and click the key icon above the script to delete a secret.

        ![Add secret to script]({{base_path}}/assets/img/guides/secret/add-secret-to-script.png)

    === "Visual Editor"
        Switch to the **Visual Editor** tab, expand the **Script Editor** and click **Add Secret**.

        ![Add secret to script using the visual editor]({{base_path}}/assets/img/guides/secret/add-secret-to-script-using-visual-editor.png){: width="600" style="display: block; margin: 0;"}

    ---

4. Click the trash icon next to the secret you wish to delete.

5. Select the checkbox and confirm your action.

{% endif %}