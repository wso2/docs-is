{% set product_name = "Asgardeo" %}

{% set my_account_link = "<code>https://myaccount.asgardeo.io/t/{organization_name}</code>

For example, if your organization name is bifrost, the link to your My Account portal is <code>https://myaccount.asgardeo.io/t/bifrost</code>" %}

{% set my_account_org_link = "https://myaccount.asgardeo.io/t/{root-organization_name}/o/{child-organization-id}" %}

{% include "../../../../includes/guides/user-self-service/configure-self-service-portal.md" %}