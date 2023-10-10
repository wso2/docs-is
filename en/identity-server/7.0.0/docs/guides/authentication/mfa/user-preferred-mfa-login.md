{% set product_name = "WSO2 Identity Server" %}
{% set product_url_format = "https://localhost:9443" %}
{% set patch_user_path = "apis/scim2-rest-apis/#tag/Users-Endpoint/operation/patchUser" %}
{% include "../../../../../../includes/guides/authentication/mfa/user-preferred-mfa-login.md" %}