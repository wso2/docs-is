{% set product_name = "WSO2 Identity Server" %}
{% set product_domain = "wso2is.example.com" %}
{% set product_url_format = "https://wso2is.example.com" %}
{% set localhost_warning_note =
        '!!! warning "Restrictions with Sign in with Apple on Localhost"

            The `Sign in with Apple` feature cannot be configured with `localhost` (or `127.0.0.1`). Attempting this setup results in an "invalid domain" error from Apple\'s configuration step. For testing, use a real or DNS-resolvable domain name. For local development, domain mappings in the `etc/hosts` file can be utilized.'
%}
{% include "../../../../../../includes/guides/authentication/social-login/add-apple-login.md" %}