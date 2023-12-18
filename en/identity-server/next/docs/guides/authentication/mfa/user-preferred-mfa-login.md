{% set product_name = "WSO2 Identity Server" %}
{% set product_url_format = "https://localhost:9443/t/{tenant-domain}" %}
{% set patch_me_path = "apis/scim2-rest-apis/#tag/Me-Endpoint/operation/patchUserMe" %}
{% include "../../../../../../includes/guides/authentication/mfa/user-preferred-mfa-login.md" %}