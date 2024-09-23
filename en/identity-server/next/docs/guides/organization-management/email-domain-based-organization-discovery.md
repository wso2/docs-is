{% set host_name = "localhost:9443" %}
{% set organization_path_param = ""  %}
{% set login_hint_note = "!!! note
        - You can bypass the `Sign In With SSO` page and go directly to your organization's login page by adding the following query parameters in the login request.
            - `login_hint`: The email address of the user.
            - `fidp`: If app contains any other B2C login options, use this parameter to specify the organization SSO login option (`organizationSSO`).
        - Sample authorization request for OIDC app:
        ```curl
        https://localhost:9443/oauth2/authorize?client_id=<client_id>&redirect_uri=<redirect_url>&scope=<scopes>&response_type=code&login_hint=<user_email>&fidp=OrganizationSSO
        ```
        - Sample authorization request for SAML app:
        ```curl
        https://localhost:9443/samlsso?spEntityID=<app_entity_id>&login_hint=<user_email>&fidp=OrganizationSSO
        ```" %}
{% include "../../../../../includes/guides/organization-management/email-domain-based-organization-discovery.md" %}
