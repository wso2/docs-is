{% set product_name = "Asgardeo" %}
{% set path = "your-asgardeo/asgardeo-self-service" %}
{% set root_organization_creation_flow =
"When you [create an account](../../get-started/create-asgardeo-account.md) in Asgardeo, you define your first organization (root), which functions as the root organization or tenant in your Asgardeo subscription. From thereon, you (the account owner) or other delegated administrators can create multiple root organizations via the Asgardeo Console and switch between them."
%}

{% set resource_management_in_multiple_root_orgs =
"- Users or applications created in one organization (root) cannot access the resources of another organization (root) unless they are onboarded to that organization (root)."
%}

{% set root_org_owner_characteristic =
"- The administrator who creates the organization (root) is the owner of the organization (root)."
%}

{% include "../../../../includes/guides/admin-portal/index.md" %}