# About this release

WSO2 Identity Server 7.3.0 is the latest release, succeeding WSO2 Identity Server 7.2.0, with enhanced features, improvements, and fixes.

## What's new in this release?

WSO2 Identity Server 7.3.0 introduces a range of new features and enhancements:

### Support for OpenID for Verifiable Credential Issuance (OID4VCI)

WSO2 Identity Server now natively supports [OpenID for Verifiable Credential Issuance (OID4VCI)](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html){:target="_blank"}, enabling organizations to issue verifiable credentials to digital wallets using a standardized, OpenID-based protocol.

Key capabilities include:

- Define credential templates that specify credential types, supported claims, and metadata, managed through a dedicated management API and the Console.
- Issue verifiable credentials through the authorization code flow, where the end user authenticates before the wallet retrieves the credential from the credential endpoint using an OAuth 2.0 access token.
- Register digital wallets using a dedicated application template.
- Use existing OAuth 2.0 and OpenID Connect infrastructure for authentication and authorization during credential issuance.

Learn more about [verifiable credentials]({{base_path}}/guides/verifiable-credentials/).

### Client Initiated Backchannel Authentication (CIBA) grant

WSO2 Identity Server now supports the [Client Initiated Backchannel Authentication (CIBA)](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html){:target="_blank"} grant, enabling authentication flows where the device consuming a service is decoupled from the device used for authentication. For example, a user can start a login on a smart TV or kiosk and complete authentication on their mobile phone.

Key capabilities include:

- Enable the CIBA grant type per application from the Console under **Applications** > **Protocol** > **Allowed grant types**.
- Configure the `auth_req_id` expiry time to control how long an authentication request remains valid.
- Deliver the authentication prompt to the user through multiple notification channels:
      - **Email**: Sends an authentication notification to the user's registered email address.
      - **SMS**: Sends an authentication notification to the user's registered mobile number.
      - **External**: Returns an `auth_url` in the backchannel authentication response, delegating notification delivery to the client application.
- Client applications poll the token endpoint using the `auth_req_id` to retrieve access and ID tokens once the user authenticates.

Learn more about [configuring the CIBA grant]({{base_path}}/guides/authentication/configure-ciba-grant/).

### OIDC front-channel logout support

WSO2 Identity Server now supports [OpenID Connect front-channel logout](https://openid.net/specs/openid-connect-frontchannel-1_0.html){:target="_blank"}, a browser-based logout mechanism that ensures all applications sharing a session are notified when a user signs out.

Instead of direct server-to-server communication, WSO2 Identity Server delivers logout messages through the user's browser using iframes. Each participating application receives the logout notification and clears its session state, including cookies and local storage.

Learn more about [front-channel logout]({{base_path}}/guides/authentication/oidc/add-front-channel-logout/).

### Enhanced organization authentication in B2B applications

WSO2 Identity Server introduces a new authentication model for B2B and organization scenarios, delivering an organization-aware sign-in experience with fewer redirects.

Key capabilities include:

- Seamless API-based authentication with fewer redirects, improving the developer experience.
- A direct access path for organization users to access an organization without an organization discovery step.
- Organization discovery support during API-based authentication to resolve the user's organization.
- Single Sign-On (SSO) between organization-level applications and B2B SaaS applications.
- Support for password and client credential grants alongside the authorization code grant and organization switch grant for B2B SaaS applications.

Learn more about [enhanced organization authentication]({{base_path}}/guides/organization-management/organization-login/).

### Share users with organizations through Console

Organization administrators can now share users with child organizations directly from the Console.

When sharing a user, administrators can choose from the following sharing policies:

- Share the user with all current and future organizations.
- Share the user with a selected set of organizations.

Administrators can also assign roles to shared users that apply within the target child organization. Administrators can permit invited administrators to share users with child organizations by assigning them a role with the **Shared User Management** permission in the Console settings.

Learn more about [user sharing]({{base_path}}/guides/users/manage-users/#share-user-with-organizations).

### Selectable token issuer for organization applications

Organizations can now select the token issuer when creating or updating OAuth 2.0 applications from the Console. This enables organizations to function either as independent identity providers for their own applications or to use the root organization as the token issuer for B2B API consumption scenarios.

Key capabilities include:

- **Organization as identity provider**: Organizations can act as their own token issuer, enabling them to issue tokens for custom applications serving their own end users.

- **Granular issuer selection**: Administrators can select the appropriate token issuer, the root organization or the organization during application creation and updates.
  
- **Root-level governance**: Root organizations can control whether organizations are permitted to use the root organization's token issuer. Organizations can use the root issuer only if explicitly granted permission. By default, the root organization's issuer is available to organizations.

These configurations are now fully integrated into the Console.

Learn more about [organization applications]({{base_path}}/guides/organization-management/organization-applications).

### Token exchange for organization applications

WSO2 Identity Server now supports the [Token Exchange](https://www.rfc-editor.org/rfc/rfc8693){:target="_blank"} grant type for applications created in organizations. Applications can exchange tokens issued by any trusted token issuer defined at the organization level.

Key capabilities include:

- **Trusted token issuer support**: Configure and use trusted token issuers at the organization level to enable secure token exchange between systems.

- **Enable implicit user account association**: Automatically link an incoming external token to an existing local user account for both root and child organizations.

- **Define lookup attributes**: Specify up to two attributes in the **Advanced** tab to identify the corresponding local user during token exchange. These attributes must be configured as unique across user stores to ensure accurate user mapping.

Learn more about [token exchange]({{base_path}}/guides/authentication/configure-token-exchange/).

### Selectable storage locations for user attributes

Starting from WSO2 Identity Server 7.3.0, you can store specific user attributes internally within WSO2 Identity Server or in connected user stores. This gives you greater control over data management and residency.

You can configure attribute storage at a global level or customize it for each connected user store, depending on your organization's requirements.

Learn more about [configuring the storage location of attributes]({{base_path}}/guides/users/attributes/user-attributes/configure-attributes/#configure-the-storage-location-of-attributes).

### Notifications for workflow approvers and initiators

WSO2 Identity Server now sends SMS and email notifications to both approvers and initiators when a workflow request is created or resolved.

When a user operation such as adding a user or creating a role triggers a configured workflow, the designated approver receives a notification through the configured channel. After the approver acts, if additional approval steps exist, the next approver receives a notification. If no further steps remain, the initiator is notified of the final outcome.

Administrators can define the notification channels when creating a workflow.

Learn more about [enabling approval notifications]({{base_path}}/guides/workflows/approval-workflows/#configure-notifications).

### Rule-based workflow engagement

From WSO2 Identity Server 7.3.0, you can configure rules for user operations, such as adding a user or creating a role, to control whether an approval workflow triggers when the operation occurs.

This enhancement gives administrators more precise control over workflow configuration, enabling approvals only when specific business conditions are met.

Learn more about [configuring rules for approval workflows]({{base_path}}/guides/workflows/workflow-rules/).

### SCIM outbound provisioning for organizations

WSO2 Identity Server 7.3.0 extends outbound provisioning to support organizations. Organizations can now configure and manage their own outbound provisioning connectors independently.

WSO2 Identity Server also supports application-level outbound provisioning. You can configure provisioning at both the organization level and the application level, enabling you to define organization-wide provisioning rules while customizing behavior for specific applications.

Learn more about [outbound provisioning]({{base_path}}/guides/users/outbound-provisioning/outbound-provisioning-overview/).

### Administrative API for managing end-user enrolled credentials

Administrators can now view and revoke user-enrolled credentials such as passkeys (FIDO2) and push authentication devices through a unified API.

This eliminates the need for manual workarounds when handling lost or compromised devices, enabling faster incident response and improved operational efficiency. Centralized credential management simplifies account recovery and strengthens security oversight.

Learn more about the [end-user credential management REST API]({{base_path}}/apis/organization-apis/end-user-credential-management-rest-api/).

### Organization-level governance for TOTP enrollment during login

WSO2 Identity Server now supports managing TOTP (Time-based One-Time Password) enrollment during user login at the organization level, eliminating the need for per-application configuration.

Key capabilities include:

- **Centralized governance**: Enable or disable TOTP progressive enrollment globally from organization settings. When disabled, users are not prompted to enroll during sign-in, allowing administrators to enforce a consistent default policy across all applications.
- **Application-level flexibility**: Individual applications can still override the organization-level setting using conditional authentication scripts.
- **Organization support**: These policies apply consistently to the root organization and all organizations in the hierarchy.
- **Backward compatibility**: Progressive enrollment is enabled by default, preserving existing behavior for current deployments.

Learn more about [configuring TOTP at the organization level]({{base_path}}/guides/authentication/mfa/add-totp-login/#configure-at-organization-level).

### Improved Sift integration for fraud detection

WSO2 Identity Server now publishes additional event types to Sift at the organization level, enabling more accurate risk score generation during application sign-in flows.

Newly supported event types include:

- **User lifecycle events**: User registration, credential update, profile update, and user verification events.
- **User authentication events**: Login and logout events.

Administrators can also configure which user and network attributes appear in event payloads, aligning with organizational data-sharing and privacy policies.

Learn more about the [Sift connector]({{base_path}}/connectors/sift/overview/).

### Session lifetime limit enforcement

WSO2 Identity Server now supports configuring an absolute session lifetime for user sessions. Once this limit is reached, users are required to re-authenticate, regardless of their activity.

This setting goes beyond standard idle and remember-me timeouts by enforcing a fixed session duration, reducing the risk of prolonged sessions. The feature is disabled by default. Administrators can enable it by setting the session lifetime limit in minutes.

Learn more about [session management]({{base_path}}/guides/account-configurations/login-security/session-management/).

### Amazon SNS support and multiple provider support for push notifications

WSO2 Identity Server now supports Amazon Simple Notification Service (SNS) as a native push notification provider, and introduces multi-provider support for push notification-based authentication.

Key capabilities include:

- **Expanded global coverage with Amazon SNS**: WSO2 Identity Server can now deliver push notifications across six major platforms: Android, iOS (Apple Push Notification service), Amazon Fire OS (ADM), Baidu Cloud Push, Windows Phone (MPNS), and Windows (WNS). This enables organizations to deliver a consistent login experience across a wide range of devices and regions.

- **Multiple provider support**: You can configure multiple push services simultaneously within the same deployment, such as FCM and Amazon SNS. This eliminates single-provider bottlenecks and improves delivery reliability by combining the strengths of different providers.

Learn more about [push notification-based authentication]({{base_path}}/guides/authentication/mfa/add-push-auth-login/).

### Automatic certificate refresh for SAML identity providers using metadata URLs

You can now configure a SAML metadata URL as the certificate source when setting up or updating a SAML federated connection. WSO2 Identity Server automatically retrieves and updates the identity provider certificates from the metadata URL, removing the need for manual certificate updates during key rotations.

This ensures uninterrupted login flows by fully automating certificate management for SAML connections.

Learn more about [adding a SAML identity provider login]({{base_path}}/guides/authentication/standard-based-login/add-saml-idp-login/).

### Pre-issue ID token action

WSO2 Identity Server now supports the Pre-Issue ID Token Action, a pre-flow extension that allows you to execute custom logic just before WSO2 Identity Server issues an OIDC ID token. You can register an external HTTPS service endpoint that WSO2 Identity Server calls synchronously during the ID token issuance flow.

Administrators can use this extension to add, update, or remove ID token claims, adjust token validity periods, and enforce custom validation or business logic before the token reaches the client application.

Learn more about the [pre-issue ID token action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-issue-id-token-action/).

### Enhanced IAM-CTL support for configuration promotion

WSO2 Identity Server now extends support for managing and promoting configuration data using the IAM-CTL tool, a command-line utility for environment promotion, CI/CD automation, and configuration backups.

This release introduces support for OIDC Scopes, Roles, API Resources, Workflows, Notification Channels, Flows, Branding, Actions, Organizations, Account Recovery Configurations, Alternative Login Identifiers, Security Policies, and Notification Settings.

Key capabilities include:

- **Bulk configuration management**: Export and import multiple resource types across environments in a single operation.
- **Keyword mapping and secrets**: Replace environment-specific values using keywords and securely manage sensitive data during import and export.
- **Selective propagation**: Exclude specific resource types or individual resources when promoting configurations.
- **Environment promotion**:  Move configurations across environments such as development, staging, and production.
- **Backup and restore**: Use IAM-CTL as a version-controlled backup solution for your environment-specific configurations.
- **CI/CD integration**: Automate resource promotion as part of deployment pipelines.

Learn more about [promoting configurations across environments]({{base_path}}/deploy/promote-configurations/).

### HTTP-based email provider support

WSO2 Identity Server now supports configuring HTTP-based email providers alongside SMTP, through both the Console and the notification-sender API.

Key capabilities include:

- Configure email publishers using either SMTP or HTTP-based adapters from the Console.
- Manage HTTP-based email publisher settings through the notification-sender API, including endpoint URL, headers, and authentication parameters.
- Use OAuth 2.0 Client Credentials-based authentication for HTTP email providers, enabling dynamic token management and automated token rotation instead of static, long-lived tokens.

Learn more about [configuring email providers]({{base_path}}/guides/notification-channels/configure-email-provider/).

### OAuth client credentials authentication for HTTP-based SMS and email providers

WSO2 Identity Server now supports OAuth 2.0 Client Credentials-based authentication for HTTP-based custom SMS and email providers. Instead of relying on static bearer tokens, administrators can use dynamic token management, reducing the risk of token leakage and enabling automated token rotation.

Administrators can configure custom SMS providers using Client Credentials, Basic Password, API Key, or Bearer Token authentication.

Learn more about [configuring SMS providers]({{base_path}}/guides/notification-channels/configure-sms-provider/).

### Non-persistent JWT tokens

WSO2 Identity Server now supports non-persistent, self-contained JWT access tokens and refresh tokens, reducing dependency on database storage for token management.

This addresses scaling and performance challenges in high-traffic environments where large volumes of active tokens accumulate over time. Administrators can configure persistence settings based on their use case, including an option to skip storing revoked tokens.

Learn more about [optimizing JWT access token persistence]({{base_path}}/deploy/token-persistence/#optimizing-jwt-access-token-persistence).

## Improvements

WSO2 Identity Server 7.3.0 improves these existing features:

### JWE encryption algorithm support for ID tokens

WSO2 Identity Server now supports a broader range of JSON Web Encryption (JWE) key management and content encryption algorithms for ID token encryption. Administrators can configure the desired encryption algorithms per application through the Console or management APIs.

Newly supported algorithms include:

- **Key management**: RSA-OAEP-256, RSA-OAEP-384, RSA-OAEP-512, ECDH-ES+A256KW
- **Content encryption**: A192CBC-HS384

Learn more about [ID token encryption]({{base_path}}/guides/authentication/oidc/id-token-encryption-reference/).

### App-native authentication for device authorization grant

The app-native authentication API now supports the device authorization grant flow. Applications using the device authorization grant can integrate app-native authentication to enable in-app authentication experiences without redirecting users to a browser.

Learn more about [app-native authentication for the device authorization grant]({{base_path}}/references/app-native-authentication/#scenario-8-device-authorization-flow).

### `PROFILE_UPDATE` webhook event

WSO2 Identity Server now publishes a `PROFILE_UPDATE` webhook event when a user's email address or mobile number is verified during a profile update. This event enables downstream systems to react in real time to verified contact detail changes.

Learn more about [webhook events and payloads]({{base_path}}/guides/webhooks/webhook-events-and-payloads/).

### JWT scope claim as array

The `scope` claim in JWT access tokens can now be returned as a JSON array instead of a space-separated string. This aligns with the OAuth 2.0 Token Introspection specification and simplifies scope parsing in resource servers.

This can be configured at two levels:

- **Application level**: Set the `enableJwtScopeAsArray` property via the Application Management API to change the scope format for a specific application.
- **Organization level**: Use the OAuth2 Configuration Management API to apply the array format globally across all applications in the organization.

Learn more about [access token settings]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token).

### Skip session revocation on password update

At the organization level, administrators can now configure WSO2 Identity Server to skip session revocation when a user updates their password. This enables consistent session preservation behavior across applications and user flows.

Key capabilities include:

- **Organization-level configuration**: Control whether user sessions and active tokens are preserved during password updates using organization-specific settings.
- **Dedicated self-service password update API**: A new API (POST /me/change-password) enables password updates while respecting session preservation configurations.
- **Consistent My Account behavior**: Password updates through the My Account portal now follow the configured session preservation policy instead of always terminating the session.
- **Controlled behavior across APIs**: When session preservation is enabled, password updates performed via the Self Password Update API or the SCIM 2.0 Me API using OAuth 2.0 access tokens do not revoke sessions or tokens. Updates performed using Basic Authentication continue to terminate sessions and tokens.

Learn more about [self password update]({{base_path}}/apis/self-password-update-rest-api/) and [session management settings]({{base_path}}/guides/account-configurations/login-security/session-management/#parameters).

### SCIM filtering improvements for users and groups

WSO2 Identity Server now supports Greater Than or Equal (GE) and Less Than or Equal (LE) filter operators for JDBC user stores and the identity database, extending the range-based filtering capabilities that were available for LDAP user stores.

This enables more flexible queries across user attributes, identity claims, roles, and groups, allowing you to perform range-based filtering alongside the existing comparison operators.

### OTP retry and resend limits in adaptive authentication

WSO2 Identity Server now supports configuring limits on OTP retry and resend attempts within a single authentication session using adaptive authentication scripts. This helps prevent misuse while preserving a consistent experience for legitimate users.

Administrators can set the maximum number of times a user can attempt to verify a one-time password or request a new one, helping to mitigate brute-force attacks and reduce unnecessary SMS or email delivery costs. These limits apply across both API-based and redirect-based authentication flows.

Learn more about [OTP retry and resend limits]({{base_path}}/guides/authentication/conditional-auth/otp-retry-resend-limits/).

### Enhanced password expiry reset enforcement

WSO2 Identity Server introduces two key enhancements to password expiry
reset enforcement.

A new **Enforce password expiry for** setting is introduced to control how password expiry enforcement is applied.
This setting becomes available under **Login & Registration** > **Password Validation** when password expiry is
enabled and the password reset enforcement feature is activated via configuration.

- **All application login flows** (default): Preserves the existing behavior.
  Password expiry is enforced for every user in the organization upon login.
  For applications with the Password Reset Enforcer in their login flow,
  enforcement is triggered inline at the configured step and org-wide
  enforcement is skipped for those applications.

- **Selected application login flows**: Password expiry is enforced only for applications where the
  Password Reset Enforcer has been explicitly added to the login flow.

The Password Reset Enforcer now also supports app-native
authentication flows in addition to the existing redirect-based flow.
A new property is introduced in the authentication context to track the
password reset completion status, enabling adaptive authentication scripts
to conditionally control subsequent steps in the flow based on the outcome.

Learn more about the [Password Reset Enforcer connector]({{base_path}}/connectors/password-reset-enforcer/overview/).

## Deprecated features

In WSO2 Identity Server 7.3.0, we have deprecated several features to enhance security, streamline operations, and improve usability. These deprecations align with our commitment to maintaining a robust and future-ready platform. Below is a list of deprecated features along with recommended actions for users.

Learn more about [WSO2 Identity Server feature deprecation]({{base_path}}/references/wso2-identity-server-feature-deprecation/).

### Support for TLS 1.1 and 1.0

TLS 1.0 and TLS 1.1 have known security vulnerabilities (for example, POODLE, BEAST, and CRIME) and have been deprecated across major vendors and browsers. These protocol versions are no longer considered secure and are widely unsupported.

To align with current security standards and Java 21 defaults, {{ product_name }} has deprecated support for TLS 1.0 and TLS 1.1 and enables TLS 1.3 by default. This change improves the security posture, helps prevent downgrade attacks, and ensures compatibility with modern platforms and ecosystem standards.

**Recommended action**: Upgrade to TLS 1.3 and use it for all connections. It provides stronger security, improved performance, and aligns with current industry standards and platform defaults.

### Organization User Share REST API v1
The [Organization User Share REST API v1]({{base_path}}/apis/organization-user-share-rest-api/) has been deprecated and replaced by v2. The v1 API will no longer receive enhancements or non-critical fixes and may be removed in a future release.

**Recommended action**:
Migrate to the [Organization User Share REST API v2]({{base_path}}/apis/organization-user-share-v2-rest-api/) to benefit from improved request and response structures, enhanced validation, and ongoing support.

### Notification Sender REST API v1
The [Notification Sender REST API v1]({{base_path}}/apis/notification-sender-rest-api/) has been deprecated and replaced by the v2 API that provides better scalability, enhanced security, and a simplified configuration model for notification management. The v1 API will no longer receive new enhancements or feature updates and may be removed in a future release.


**Recommended action**: Migrate to the [Notification Sender REST API v2]({{base_path}}/apis/notification-sender-v2-rest-api/) to benefit from improved API design, enhanced extensibility, and ongoing support.


## Fixed issues

For a complete list of issues fixed in this release, see [WSO2 Identity Server 7.3.0 - Fixed Issues](https://github.com/wso2/product-is/issues?q=state%3Aclosed%20project%3Awso2%2F143){:target="_blank"}.

## Known issues

For a complete list of open issues related to the WSO2 Identity Server, see [WSO2 Identity Server - Open Issues](https://github.com/wso2/product-is/issues){:target="_blank"}.
