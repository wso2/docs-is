{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set product_url_sample = "https://api.asgardeo.io/t/bifrost" %}
{% set jdk_version_message = "" %}
{% include "../../../../../includes/guides/authentication/conditional-auth/configure-conditional-auth.md" %}