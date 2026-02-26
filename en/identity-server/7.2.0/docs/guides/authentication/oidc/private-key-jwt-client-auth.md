{% set product_name = "WSO2 Identity Server" %}
{% set product_url_format = "https://localhost:9443/t/{root_organization_handle}" %}
{% set product_url_sample = "https://localhost:9443" %}
{% set organization_path_param = "{root_organization_handle}" %}
{% include "../../../../../../includes/guides/authentication/oidc/private-key-jwt-client-auth.md" %}
