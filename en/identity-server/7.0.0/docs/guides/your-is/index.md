{% set product_name = "WSO2 Identity Server" %}
{% set path = "your-is/is-self-service" %}
{% set root_organization_creation_flow =
"When you start the WSO2 Identity Server, an organization get created by default. It functions as the **organization (root)** in your WSO2 Identity Server."
%}

{% set resource_management_in_multiple_root_orgs =
""
%}

{% set root_org_owner_characteristic =
"- The admin user configured under realm configuration in `<IS-HOME>/repository/conf/user-mgt.xml` is the owner of the organization (root)."
%}

{% include "../../../../../includes/guides/admin-portal/index.md" %}