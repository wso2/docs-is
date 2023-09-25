# APIs - Overview

This is the REST API documentation for Asgardeo.

## APIs in Asgardeo

Asgardeo exposes a set of APIs, which allows you to manage various organization settings and application settings programmatically using the APIs. This is an alternative to using the Asgardeo Console.

Some of these APIs are used for management purposes and they have special [authentication](#authentication) requirements. The management APIs in Asgardeo are as follows:

- [Email templates API](../apis/email-template.md)
- [User management API (SCIM2)](../../apis/scim2/)
  - ```me``` endpoint
  - ```users``` endpoint
  - ```group``` endpoint
  - ```bulk``` endpoint
  - ```resource type``` endpoint
  - ```service provider config``` endpoint
- [User session management API](../../apis/session/)
- [User session extension API](../../apis/extend-sessions/)
- [Event configuration management API](../../apis/event-configuration/)
- [Identity Governance API](../../apis/identity-governance/)
- [Suborganization APIs](../../apis/organization-management/)

## Authentication

You need an access token to invoke APIs in Asgardeo. If you are an administrator or developer who has access to the Asgardeo Console, you can generate the required access tokens.

The process of obtaining access tokens is different for management APIs and other APIs of Asgardeo.

!!! note
  Learn how to:
  
  - [get access tokens for management APIs](../../apis/authentication/).
  - [get access tokens for other APIs](../../guides/authentication/oidc/implement-auth-code/).
  - [get access tokens for suborganization APIs](../../apis/organization-management/authentication/).
