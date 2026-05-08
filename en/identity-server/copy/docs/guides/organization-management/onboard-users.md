{% set console_host_name = "localhost:9443" %}
{% set host_name = "localhost:9443" %}
{% set console_path = "/console" %}
{% set default_userstore = "PRIMARY" %}
{% set root_organization_path_param = "{root_organization_handle}" %}
{% set organization_path_param = "{root_organization_handle}" %}

{% include "../../../../../includes/guides/organization-management/onboard-users.md" %}
