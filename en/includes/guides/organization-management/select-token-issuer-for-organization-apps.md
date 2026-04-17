# Select token issuer for an organization application

On {{ product_name }}, organization administrators can configure the token issuer for organization applications. You can choose either the root organization’s token issuer or the organization’s own token issuer.

## Control token issuer selection for child organizations

Root organization administrators can decide whether the child organizations can use root organization's token issuer. Administrators can control this by using the **Issuer Usage Scope** organization setting.

![Issuer Usage Scope Organization Setting]({{base_path}}/assets/img/guides/organization/issuer-usage-scope/issuer-usage-scope-config.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

![Issuer Usage Scope Configuration Page]({{base_path}}/assets/img/guides/organization/issuer-usage-scope/issuer-usage-scope-config-page.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

By default, the root organization's token issuer can be used in the child organization applications. Root organization administrators can select `Do not allow the issuer to be used in any organizations` to prevent child organizations from using the root organization's token issuer.

Organization administrators can select the token issuer based on the use case for which the organization application is used. The following sections describe when to use each issuer.

## Select root organization's token issuer

When an organization acts as a consumer of APIs provided by the API provider, administrators can use the root organization's token issuer for organization applications. In this scenario, the application is managed in the child organization by its administrators.

## Select organization's own token issuer

When an organization provides custom-tailored applications for the customers/partners, organization administrators can use the organization's own token issuer for their applications. In this scenario the application is managed in the child organization and the identity provider is also the child organization.

## Set the token issuer when creating an application

To create an application with a specific token issuer,

1. On the {{ product_name }} Console, go to **Organizations** and switch to your desired organization.

2. In the organization, go to **Applications**.

    ![Organization Application Create]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-create.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Add Application** and use either the **Standard-Based Application** or **M2M Application** template to create your application.

    ![Organization Application Templates]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-templates.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Enter a name in the **Name** field and select the required issuer from the **Token Issuer** dropdown.

    ![Organization Application Creation with Issuer]({{base_path}}/assets/img/guides/applications/organization-applications/organization-app-creation-with-issuer-selection.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Create** to create the application.

## Update the token issuer for an existing application

To update the token issuer for an existing application,

1. On the {{ product_name }} Console, switch to the desired organization and go to **Applications**.

2. Select the application you want to update and click the edit icon.

3. Go to the **Protocol** tab and select the required issuer from the **Token Issuer** dropdown.

    ![Organization Application Editing with Issuer]({{base_path}}/assets/img/guides/applications/organization-applications/org-app-issuer-selection-update.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.
