{% set product_name = "WSO2 Identity Server" %}

# Administration of organizations

The following guides explain how to manage the administration tasks of organizations.

## Implement an administration portal

Commonly B2B business providers expose administrative functions to administrators of organizations through a separate administration portal in the B2B application.

The administration portal of your application should use [{{ product_name }}'s organization APIs]({{base_path}}/apis/organization-apis/) to perform administrative operations.

!!! note
    To access management APIs in {{ product_name }}, you need to register an application an authorize {{ product_name }} management APIs. Learn how to [authorize APIs to an application]({{base_path}}/guides/api-authorization/) in {{ product_name }}.

The following are some of the features that your administration portal should contain.

### Manage users

The organization administrator should be able to onboard new users (administrators and consumers) to the organization. The identities of these users are stored in the default {{ product_name }} user store.

The identity and access management requirements of these users will be managed by {{ product_name }}.

The administration portal in your application should use the [user management - SCIM2 API]({{base_path}}/apis/organization-apis/org-user-mgt/#/) to manage users.
Also, you should use [group management - SCIM2 API]({{base_path}}/apis/organization-apis/org-group-mgt/#/) and [role management - SCIM2 API]({{base_path}}/apis/organization-apis/org-role-mgt/#/) to manage users' groups and roles.

### Onboard identity providers

An organization may have an external identity provider (IdP) to manage the user identities of its employees and customers. Such an IdP may be already being used for the following purposes:

- Authenticating user logins to various applications.
- Branding the login interfaces to suit the organization.
- Enabling custom login experiences to different user groups.

The organization administrator can onboard such corporate IdPs to the organization in {{ product_name }} as a connection. These IdPs can then be set as a login option in your application.

The administration portal in your application should use the [identity provider API]({{base_path}}/apis/organization-apis/org-idp-mgt/#/) to manage external IdPs.

### Define application login flows

Organization administrators should be able to customize the login flows of the application to suit business needs.

For example, the administrator should be able to define the number of authentication steps that the application login flow needs and what login options should be available for each step.

The administration portal in your application should use the [application management API]({{base_path}}/apis/organization-apis/org-application-mgt/#/) to manage application login flows.

### Extend administration tasks

Explore the [organization APIs]({{base_path}}/apis/organization-apis/) of {{ product_name }} that are available for you to enable all the required administration capabilities from your administration portal.

!!! note
    See the instructions on [enabling SSO]({{base_path}}/guides/organization-management/try-a-b2b-use-case/) to try out a B2B organization login use case.
