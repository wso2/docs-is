{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set product_url_sample = "https://api.asgardeo.io/t/bifrost" %}
{% set token_endpoint = "https://api.asgardeo.io/t/&lt;organization_name&gt;/oauth2/token" %}

{% include "../../../../includes/references/app-settings/oidc-settings-for-app.md" %}
