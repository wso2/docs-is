{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set patch_user_path = "apis/scim2/#tag/Groups-Endpoint/operation/patchGroup" %}
{% include "../../../../../includes/guides/authentication/mfa/user-preferred-mfa-login.md" %}