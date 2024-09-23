{% set host_name = "api.asgardeo.io" %}
{% set organization_path_param = "/t/<root_organization_name>"  %}
{% set login_hint_note = "!!! note
            - Here, you can directly go to your organization's login page bypassing `Sign In With SSO` page by having the following query parameters in the login request. This will trigger a prompt for the user to input their password directly, streamlining the authentication process.
                - `login_hint`: The email address of the user.
                - `fidp`: If app contains any other B2C login options, use this parameter to specify the organization SSO login option (`organizationSSO`).
            - Sample authorization request for OIDC app:
            ```curl
            https://api.asgardeo.io/t/<root_organization_name>/oauth2/authorize?client_id=<client_id>&redirect_uri=<redirect_url>&scope=<scopes>&response_type=code&login_hint=<user_email>&fidp=OrganizationSSO
            ```
            - Sample authorization request for SAML app:
            ```curl
            https://api.asgardeo.io/t/<root_organization_name>/samlsso?spEntityID=<app_entity_id>&login_hint=<user_email>&fidp=OrganizationSSO
            ```" %}
{% include "../../../../includes/guides/organization-management/email-domain-based-organization-discovery.md" %}
