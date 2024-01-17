# APIs - Overview

This is the REST API documentation for Asgardeo.

## APIs in Asgardeo

Asgardeo exposes a set of APIs, which allows you to manage various organization settings and application settings programmatically using the APIs. This is an alternative to using the Asgardeo Console.

Some of these APIs are used for management purposes and they have special [authentication](#authentication) requirements. The management APIs in Asgardeo are as follows:

- [Application management API]({{base_path}}/apis/application-management/)
- [OAuth 2 DCR API]({{base_path}}/apis/oauth-dcr/)
- [Identity provider management API]({{base_path}}/apis/idp/)
- [User management API (SCIM2)]({{base_path}}/apis/scim2/)

    - ```me``` endpoint
    - ```users``` endpoint
    - ```group``` endpoint
    - ```bulk``` endpoint
    - ```resource type``` endpoint
    - ```service provider config``` endpoint

- [Email templates API]({{base_path}}/apis/email-template/)
- [Identity Governance API]({{base_path}}/apis/identity-governance/)
- [User session management API]({{base_path}}/apis/session/)
- [User session extension API]({{base_path}}/apis/extend-sessions/)
- [Event configuration management API]({{base_path}}/apis/event-configuration/)
- Self-service APIs

    - [TOTP API]({{base_path}}/apis/register-mfa/totp/)
    - [Backup codes API]({{base_path}}/apis/register-mfa/backup-code/)
    - [Password recovery API]({{base_path}}/apis/register-mfa/password-recovery/)
    - [Export user information API]({{base_path}}/apis/register-mfa/export-user-info/)

- [Export admin information API]({{base_path}}/apis/administrators/export-admin-info/)
- [Consent management API]({{base_path}}/apis/extend-sessions/)
- [Validation API]({{base_path}}/apis/validation/)
- [Idle account identification API]({{base_path}}/apis/idle-account-identification/)
- [Organization APIs]({{base_path}}/apis/organization-apis/)

## Authentication

You need an access token to invoke APIs in Asgardeo. If you are an administrator or developer who has access to the Asgardeo Console, you can generate the required access tokens.

The process of obtaining access tokens is different for management APIs and other APIs of Asgardeo.

!!! note
    Learn how to:
  
    - [get access tokens for management APIs]({{base_path}}/apis/authentication/).
    - [get access tokens for other APIs]({{base_path}}/guides/authentication/oidc/implement-auth-code/).
    - [get access tokens for suborganization APIs]({{base_path}}/apis/organization-management/authentication/).
