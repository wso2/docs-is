# Configure conditional authentication

Given below are the high-level steps for enabling conditional authentication in your applications.

!!! note
    {% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}
    - **ECMAScript Compliance**: Adaptive scripts currently comply with ECMAScript 2022 (ES13). 
    {% endif %}
    - **Limitations**: Adaptive scripts do not support loops, `Log.warn` logs, or stringifying Java objects using 
    `JSON.stringify()`.

## Prerequisites

[Register your application]({{base_path}}/guides/authentication/add-login-to-apps/) on the {{product_name}} Console.


{% if product_name == "WSO2 Identity Server" and is_version == "7.0.0" %}
!!! warning "Before you proceed (only for JDK 17)"

    If your system operates on JDK 17, refer to [Enable adaptive authentication]({{base_path}}/deploy/enable-adaptive-authentication/) to deploy WSO2 Identity Server with conditional authentication.
{% endif %}

## Enable conditional authentication

{% include "../../fragments/manage-app/conditional-auth/configure-conditional-auth.md" %}

## Add conditional authentication script

There are two ways to add a conditional authentication script:

- Use a [predefined template]({{base_path}}/guides/authentication/conditional-auth/#script-templates).
- Write a [new conditional auth script]({{base_path}}/guides/authentication/conditional-auth/write-your-first-script/).

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

!!! warning "Before you proceed"

    When working with conditional authentication scripts, <b>never log secrets</b> or <b>sensitive information</b> within your authentication flows.

{% endif %}

## Add a secret to the script
Secrets securely store values associated with external APIs. These secret values are used in conditional authentication scripts when {{ product_name }} is required to interact with an external API (service endpoint) during the authentication process.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

You can securely store these secret values on the {{ product_name }} Console and retrieve them whenever required for conditional authentication script.

{% else %}

You can securely store these secret values on the {{ product_name }} Console and retrieve them whenever required for `callChoreo()` conditional authentication function.

{% endif %}



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

        ![Add secret to script using the visual editor]({{base_path}}/assets/img/guides/secret/add-secret-to-script-using-visual-editor.png){: width="600" style="display: block; margin: 0;"}

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
            <td>A meaningful name for the secret. This name is not changeable and will be used in the script to reference the secret.</td>
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

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version != "7.0.0") %}

### Use secret in the script

You may refer to the previously added secrets in your conditional authentication scripts using the `secrets.{secret name}` syntax. For example, to retrieve a secret value, you may use:

```angular2html
var secretValue = secrets.secretName;
```

This allows you to securely access secret values within your authentication scripts, enhancing the security and flexibility of your authentication process.

{% endif %}

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
