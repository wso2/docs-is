{% set product_name = "WSO2 Identity Server" %}
{% set product_url_format = "https://localhost:9443/t/{tenant-domain}" %}
{% set patch_me_path = "apis/scim2-me-rest-apis/#tag/Me-Endpoint/operation/patchUserMe" %}
{% set scim_schema_for_wso2_custom_claims = "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User" %}
{% include "../../../../../../includes/guides/authentication/mfa/user-preferred-mfa-login.md" %}