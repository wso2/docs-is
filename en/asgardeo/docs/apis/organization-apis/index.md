# Organization APIs

This is the REST API documentation for organizations in WSO2 Identity Platform.

## APIs in WSO2 Identity Platform

WSO2 Identity Platform exposes a set of APIs, allowing you to manage various organization settings and application settings programmatically. This is an alternative to using the WSO2 Identity Platform Console.

Some of these APIs are used for organization management purposes, and they have special [authentication](#authentication) requirements. The management APIs of organization in WSO2 Identity Platform are as follows:

- [Organization user management (SCIM2) API]({{base_path}}/apis/organization-apis/scim2/)

- [Organization application management API]({{base_path}}/apis/organization-apis/org-application-management)

- [Organization identity provider management API]({{base_path}}/apis/organization-apis/org-idp/)

- [Organization level organization management API]({{base_path}}/apis/organization-apis/org-management)

!!! warning
    You need a paid WSO2 Identity Platform subscription to use organization level organization management feature. If you don't already have one, view the available [subscription plans](https://wso2.com/identity-platform/pricing/){:target="_blank"} and contact the WSO2 Identity Platform sales team.

- [Idle account identification API]({{base_path}}/apis/organization-apis/org-idle-account-identification)
  

## Authentication

You need an access token to invoke APIs in organizations of WSO2 Identity Platform. You can generate the required access tokens if you are an administrator or developer with access to the WSO2 Identity Platform Console.

!!! note
    Learn how to [get access tokens for organization management APIs]({{base_path}}/apis/organization-apis/authentication/).
