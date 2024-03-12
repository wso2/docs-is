{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set product_url_sample = "https://api.asgardeo.io/t/bifrost" %}
{% set asgardeo_auth_script_warning = 

'    !!! warning "Important"
        As a security measure, Asgardeo does not allow the usage of two consecutive periods (`..`) in authentication scripts.'
%}
{% include "../../../../../includes/guides/authentication/conditional-auth/new-device-based-template.md" %}