### Supported resource types

IAM-CTL provides support for propagating the following resource types among root organizations:

- Applications
- Identity Providers
- Claims
- User Stores
- API Resources
- OIDC Scopes
- Roles
- Email Templates
- Governance Connectors
- Validation Rules
- Organizations
- Branding
{% if product_name == "Asgardeo" or server_version >= "7.1" %}
- SMS Templates
- Actions
{% endif %}
{% if product_name == "Asgardeo" or server_version >= "7.2" %}
- Email Providers
- SMS Providers
- Workflows
- Flows
{% endif %}
