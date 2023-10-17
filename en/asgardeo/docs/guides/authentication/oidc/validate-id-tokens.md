{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set product_url_sample = "https://api.asgardeo.io/t/bifrost" %}
{% set org_name = "bifrost" %}
{% include "../../../../../includes/guides/authentication/oidc/validate-id-tokens.md" %}