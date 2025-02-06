{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set issuer_name = "api.asgardeo.io/t/{organization_name}" %}
{% set my_account_host_path = "https://myaccount.asgardeo.io/t/{organization_name}" %}
{% include "../../../../../includes/guides/authentication/sso-integrations/add-google-workspace-template.md" %}