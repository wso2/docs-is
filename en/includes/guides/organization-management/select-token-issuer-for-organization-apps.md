# Select token issuer for an organization application

When you create an application in your organization, you can choose whether it uses the root organization's token issuer or your organization's own. The right choice depends on what the application does and who it serves. The root token issuer option is available only if the root organization has permitted child organizations to use it.

- **Select the root organization's token issuer** when the child organization's application needs to call APIs provided by the root organization. In this scenario, the root organization acts as the token issuer and grants access to its APIs. The child organization manages the application.

- **Select the organization's own token issuer** when the child organization provides applications directly to its own end users, such as its customers or partners. In this scenario, the child organization acts as an independent identity provider. It manages both the application and issues tokens, without relying on the root organization's identity infrastructure.

## Control root token issuer access for child organizations

As a root organization administrator, you control whether child organizations can use the root organization's token issuer. By default, child organizations can use the root token issuer in their applications.

To configure this:

1. In the root organization, go to **Login & Registration**.
2. Under **Organization Settings**, select **Issuer Usage Scope**.

    ![Issuer Usage Scope Organization Setting]({{base_path}}/assets/img/guides/organization/issuer-usage-scope/issuer-usage-scope-config.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Select `Do not allow the issuer to be used in any organizations` to block child organizations from using the root token issuer.

    ![Issuer Usage Scope Configuration Page]({{base_path}}/assets/img/guides/organization/issuer-usage-scope/issuer-usage-scope-config-page.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Set the token issuer for an application

As an organization administrator, you can select the token issuer when creating a new application or update it for an existing one.

### For a new application

1. On the {{ product_name }} Console, go to **Organizations** and switch to your desired organization.

2. In the organization, go to **Applications**.

    ![Organization Application Create]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-create.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Add Application** and use either the **Standard-Based Application** or **M2M Application** template to create your application.

    ![Organization Application Templates]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-templates.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter a name in the **Name** field and select the required issuer from the **Token Issuer** dropdown.

    ![Organization Application Creation with Issuer]({{base_path}}/assets/img/guides/applications/organization-applications/organization-app-creation-with-issuer-selection.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Create** to create the application.

### For an existing application

1. On the {{ product_name }} Console, switch to the desired organization and go to **Applications**.

2. Select the application you want to update and click the edit icon.

3. Go to the **Protocol** tab and select the required issuer from the **Token Issuer** dropdown.

    ![Organization Application Editing with Issuer]({{base_path}}/assets/img/guides/applications/organization-applications/org-app-issuer-selection-update.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.
