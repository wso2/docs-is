{% set scim_schema_for_wso2_custom_claims = "urn:scim:wso2:schema" %}
{% set host_name = "api.asgardeo.io" %}
{% set organization_path_param = "/t/<organization_name>"  %}
{% set scim2_api_path = "scim2"  %}
{% include "../../../../includes/guides/user-accounts/configure-self-registration.md" %}