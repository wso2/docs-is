{% set scim_schema_for_wso2_custom_claims = "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User" %}
{% set host_name = "localhost:9443" %}
{% set organization_path_param = ""  %}
{% set scim2_api_path = "scim2-rest-apis"  %}
{% include "../../../../../includes/guides/user-accounts/configure-self-registration.md" %}