{% if product_name == "WSO2 Identity Server" %}
{% set base_url = "localhost:9443" %}
{% else %}
{% set base_url = "https://api.asgardeo.io/t/{organization-name}" %}
{% endif %}

{% include "../../../../../includes/references/token-binding/dpop.md" %}