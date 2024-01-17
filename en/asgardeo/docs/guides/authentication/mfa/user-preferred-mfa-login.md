{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set patch_me_path = "apis/scim2/#tag/Me-Endpoint/operation/patchUserMe" %}
{% include "../../../../../includes/guides/authentication/mfa/user-preferred-mfa-login.md" %}