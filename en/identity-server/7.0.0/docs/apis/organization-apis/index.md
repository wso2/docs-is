# Organization APIs

This is the REST API documentation for APIs that are consumed by the B2B SaaS applications for organization-level operations.

## APIs in {{ product_name }}

{{ product_name }} exposes a set of APIs, allowing you to manage various organization settings and application settings programmatically. This is an alternative to using the {{ product_name }} Console.

Some of these APIs are used for organization management purposes, and they have special [authentication](#authentication) requirements. The management APIs of organization in {{ product_name }} are as follows:

- [Organization user management API (SCIM2)]({{base_path}}/apis/organization-apis/org-user-mgt/)

- [Organization group management API (SCIM2)]({{base_path}}/apis/organization-apis/org-group-mgt/)

- [Organization roles management API (SCIM2)]({{base_path}}/apis/organization-apis/org-role-mgt/)

- [Organization application management API]({{base_path}}/apis/organization-apis/org-application-mgt/)

- [Organization identity provider management API]({{base_path}}/apis/organization-apis/org-idp-mgt/)

- [Organization level organization management API]({{base_path}}/apis/organization-apis/org-organization-mgt/)

## Authentication

You need an access token to invoke APIs in organizations of {{ product_name }}. You can generate the required access tokens if you are an administrator or developer with access to the {{ product_name }} Console.

!!! note
    Learn how to [get access tokens for organization APIs]({{base_path}}/apis/organization-apis/authentication/).
