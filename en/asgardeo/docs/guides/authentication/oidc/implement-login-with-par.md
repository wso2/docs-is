{% set par_endpoint = "https://api.asgardeo.io/t/{organization_name}/oauth2/par" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set product_url_sample = "https://api.asgardeo.io/t/bifrost" %}
{% include "../../../../../includes/guides/authentication/oidc/implement-login-with-par.md" %}