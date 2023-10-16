{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set product_url_sample = "https://api.asgardeo.io/t/bifrost" %}
{% set username = "DEFAULT/Alica@gmail.com@bifrost" %}
{% include "../../../../../includes/guides/authentication/oidc/token-validation-resource-server.md" %}