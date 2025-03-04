{% set product_name = "WSO2 Identity Server" %}

{% set my_account_link = "<code>https://{host_name}:{port}/myaccount</code>

For example, if using the default settings, the link to your My Account portal is,

<code>https://localhost:9443/myaccount</code>" %}


{% set my_account_org_link = "https://localhost:9443/t/carbon.super/o/{organization-id}/myaccount" %}


{% include "../../../../../includes/guides/user-self-service/configure-self-service-portal.md" %}