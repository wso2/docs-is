# Suborganization Management APIs

This is the REST API documentation for suborganizations in Asgardeo.

## APIs in Asgardeo

Asgardeo exposes a set of APIs, allowing you to manage various suborganization settings and application settings programmatically. This is an alternative to using the Asgardeo Console.

Some of these APIs are used for organization management purposes, and they have special [authentication](#authentication) requirements. The management APIs of suborganization in Asgardeo are as follows:

- [Suborganization user management API (SCIM2)](../../apis/organization-management/org-scim2/)
  
    - ```users``` endpoint
    - ```group``` endpoint

- [Suborganization application management API](../../apis/organization-management/org-application-management)

- [Suborganization identity provider management API](../../apis/organization-management/org-idp/)

- [Suborganization role management API](../../apis/organization-management/organization-role-management)

- [Suborganization level organization management API](../../apis/organization-management/org-management)

- [Idle account identification API](../../apis/organization-management/org-idle-account-identification.md)
  
!!! warning
    You need a paid Asgardeo subscription to use this feature. If you don’t already have one, view the available [subscription plans](https://wso2.com/asgardeo/pricing/) and contact the Asgardeo sales team.

## Authentication

You need an access token to invoke APIs in suborganizations of Asgardeo. You can generate the required access tokens if you are an administrator or developer with access to the Asgardeo Console.

!!! note
    Learn how to [get access tokens for suborganization management APIs](../../apis/organization-management/authentication/).
