# Organization APIs

This is the REST API documentation for organizations in Asgardeo.

## APIs in Asgardeo

Asgardeo exposes a set of APIs, allowing you to manage various organization settings and application settings programmatically. This is an alternative to using the Asgardeo Console.

Some of these APIs are used for organization management purposes, and they have special [authentication](#authentication) requirements. The management APIs of organization in Asgardeo are as follows:

- [Organization user management (SCIM2) API]({{base_path}}/apis/organization-apis/scim2/)

- [Organization application management API]({{base_path}}/apis/organization-apis/org-application-management)

- [Organization identity provider management API]({{base_path}}/apis/organization-apis/org-idp/)

- [Organization level organization management API]({{base_path}}/apis/organization-apis/org-management)

!!! warning
    You need a paid Asgardeo subscription to use organization level organization management feature. If you don't already have one, view the available [subscription plans](https://wso2.com/asgardeo/pricing/){:target="_blank"} and contact the Asgardeo sales team.

- [Idle account identification API]({{base_path}}/apis/organization-apis/org-idle-account-identification)
  

## Authentication

You need an access token to invoke APIs in organizations of Asgardeo. You can generate the required access tokens if you are an administrator or developer with access to the Asgardeo Console.

!!! note
    Learn how to [get access tokens for organization management APIs]({{base_path}}/apis/organization-apis/authentication/).
