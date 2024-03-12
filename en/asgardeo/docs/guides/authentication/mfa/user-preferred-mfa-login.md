{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set patch_me_path = "apis/scim2/#tag/Me-Endpoint/operation/patchUserMe" %}
{% set scim_schema_for_wso2_custom_claims = "urn:scim:wso2:schema" %}
{% include "../../../../../includes/guides/authentication/mfa/user-preferred-mfa-login.md" %}