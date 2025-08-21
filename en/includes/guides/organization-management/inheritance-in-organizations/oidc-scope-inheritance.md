# OpenID Connect scopes inheritance

In {{product_name}}, child organizations inherit OpenID Connect scopes from the root organization, ensuring consistency across the organization hierarchy.

## How it works

Inheritance for OIDC scopes works as follows.

- Child organizations inherit both the system-defined and custom OIDC scopes from the root organization.

- Only the root organization can create custom OIDC scopes.

Organization administrators can view inherited OIDC scopes from the {{product_name}} Console by going to **User Attributes & Stores** > **User Attributes** > **OpenID Connect** and selecting **Scopes**.

## Configure OIDC scopes at the root organization

Root organization administrators can create OIDC scopes at the root organization. Follow the [Manage OIDC Scopes]({{base_path}}/guides/users/attributes/manage-scopes) guide to learn more.
