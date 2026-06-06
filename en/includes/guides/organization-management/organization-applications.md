# Create an application in an organization

Organization administrators can create and mange applications directly within their organizations. These applications can access and consume the organization’s API resources. To create an application, it must meet the following conditions:

- Use OAuth2.
{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}

- Use only the following grant types: authorization code, client credentials, password, and refresh token.

- Use a standard-based application or an M2M application template.

{% else %}

- Use only the following grant types: client credentials, password and refresh token.

{% endif %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}

!!! note

    By default, applications created within an organization use the root organization's token issuer. As an organization administrator, you can change this behavior and configure an application to use either the root organization's token issuer or your organization’s own token issuer.

    For more information on the use cases to select the token issuer, see [Selecting the appropriate token issuer for organization applications]({{base_path}}/guides/organization-management/select-token-issuer-for-organization-apps).

You can use either the Console or the API to create an application in an organization.

=== "Using the Console"

    To create an application,

    1. On the {{ product_name }} Console, go to **Organizations** and switch to your desired organization.

    2. In the organization, go to **Applications**.

        ![Organization Application Create]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-create.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    3. Click **Add Application** and use either the **Standard-Based Application** or **M2M Application** template to create your application.

    ![Organization Application Templates]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-templates.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

=== "Using the API"

    To create an application,
    
    1. Get a bearer token with the `internal_org_application_mgt_create` scope. Learn more about [accessing organization APIs]({{base_path}}/apis/organization-apis/authentication/)
    
    2. Use the [Application management REST API]({{base_path}}/apis/organization-apis/organization-application-mgt/#tag/Applications/operation/createApplication) to create an application in an organization.

{% else %}

To create an application,

1. Get a bearer token with the `internal_org_application_mgt_create` scope. Learn more about [accessing organization APIs]({{base_path}}/apis/organization-apis/authentication/).

2. Use the [Application management REST API]({{base_path}}/apis/organization-apis/organization-application-mgt/#tag/Applications/operation/createApplication) to create an application in an organization.

{% endif %}

## Edit an application

You can find the created applications in the **Application** section of your organization's Console. You can use the Console to make the following changes to these applications.

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0" ) %}

- Protocol level configurations
- User attributes related configurations
- Login Flow configurations
- API Authorization for organization application
- Role management for organization application
- Advanced configurations

{% else %}

- Protocol level configurations
- User attributes related configurations
- API Authorization for organization application
- Role management for organization application

{% endif %}

![Organization Application Edit]({{base_path}}/assets/img/guides/applications/organization-applications/organization-application-edit.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
