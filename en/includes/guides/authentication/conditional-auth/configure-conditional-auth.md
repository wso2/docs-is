# Configure conditional authentication

Given below are the high-level steps for enabling [conditional authentication]({{base_path}}/index.md) in your application.

## Enable conditional authentication

<CommonGuide guide='guides/fragments/manage-app/conditional-auth/configure-conditional-auth.md'/>
{% include "../../fragments/manage-app/conditional-auth/configure-conditional-auth.md" %}

## Add conditional authentication script

There are two ways to add a conditional authentication script:

- Use a [predefined template]({{base_path}}/guides/authentication/conditional-auth/#script-templates).
- Write a [new conditional auth script]({{base_path}}/guides/authentication/conditional-auth/write-your-first-script/).

## Add a secret to the script
Secrets securely store values associated with external APIs. These secret values are used in conditional authentication scripts when {{ product_name }} is required to interact with an external API (service endpoint) during the authentication process. You can securely store these secret values on the {{ product_name }} Console and retrieve them whenever required for conditional authentication.

### Create a new secret

1. Enable conditional authentication and click the key icon above the script to create a new secret.

    ![Add secret to script]({{base_path}}/assets/img/guides/secret/add-secret-to-script.png)

2. Click **Create new secret** from the drop-down menu.

3. Enter the following details:

    ![Create secret in {{ product_name }}]({{base_path}}/assets/img/guides/secret/create-a-secret.png){: width="600"}

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

4. Click **Finish** to complete the creation.

### Delete an existing secret

1. Enable conditional authentication and click the key icon above the script to delete a secret. ![Add secret to script]({{base_path}}/assets/img/guides/secret/add-secret-to-script.png)

2. Click the trash icon next to the secret you wish to delete.

3. Select the checkbox and confirm your action.