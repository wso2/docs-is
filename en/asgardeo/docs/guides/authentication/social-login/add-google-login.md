{% set product_name = "Asgardeo" %}
{% set product_url_format = "https://api.asgardeo.io/t/{organization_name}" %}
{% set product_url_sample = "https://api.asgardeo.io/t/bifrost" %}
{% set authorized_javascript_origin = "`https://accounts.asgardeo.io`" %}
{% set product_name_url = "Follow the above guide to [register Asgardeo on Google]( #register-asgardeo-on-google) as a web application." %}

{% include "../../../../../includes/guides/authentication/social-login/add-google-login.md" %}