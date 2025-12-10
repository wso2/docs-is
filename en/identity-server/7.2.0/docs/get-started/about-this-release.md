# About this release

WSO2 Identity Server 7.2.0 is the latest release, succeeding WSO2 Identity Server 7.1.0, with enhanced features, improvements, and fixes.

## What's new in this release ?

WSO2 Identity Server 7.2.0 introduces a range of new features and enhancements:

### Introducing Flow Builder: Build tailored user registration and management flows

WSO2 Identity Server introduces a major upgrade to how you define registration and user management flows in the Console. You can now design custom, multi-step flows with complete flexibility using the new Flow Builder.

Your toolbox includes:

- **Widgets**: Drag-and-drop building blocks for common authentication scenarios like username/password login, social login, password OTP, and more.

- **Steps**: Group widgets into steps to create multi-step logical sections in your flows.

- **Components**: Add atomic UI elements like text to explain steps, input fields to collect data, and buttons to trigger actions.

With these building blocks, you can create flexible, secure, and user-friendly flows that precisely match your organization’s requirements.

The flow builder supports the following use cases:

- **Self-registration** - Design custom self-registration flows with multiple steps, conditional logic, and data collection.

- **Password recovery** - Create tailored password recovery experiences with identity verification and secure reset options.

- **Invited user registration**  - Build invitation-based registration flows that collect necessary information and set up user accounts.

Learn more about [Flows]({{base_path}}/guides/flows/).

### AI agent identity management

WSO2 Identity Server now provides first-class identity management for AI agents, enabling organizations to manage them securely and at scale. Each AI agent is assigned a unique identity with attributes, credentials, and metadata, allowing auditing, lifecycle management, and trusted operation within the organization.

This feature includes comprehensive credential management with multiple authentication methods, role-based access control (RBAC) to enforce least-privilege operation, and detailed logging to monitor agent activity. It helps organizations support regulatory compliance, conduct forensic investigations, detect unusual behavior, and reduce security risks by enforcing strict access boundaries for AI agents.

Learn more about [identity management for AI agents]({{base_path}}/guides/agentic-ai/ai-agents/).

### End-to-end authorization support for MCP servers and clients

WSO2 Identity Server now provides enhanced standards-based authorization within the Model Context Protocol (MCP). MCP clients can be registered as applications using a preconfigured template that follows the recommended MCP identity configurations.

MCP servers can also be registered as protected resources, enabling granular access control over the servers and their associated tools. Organizations can define specific permissions for MCP tools and resources, authorize MCP client applications to access them, and grant user access through Role-Based Access Control (RBAC).

These capabilities streamline MCP integrations, ensure consistent authorization rules, and ensure that only authorized clients and users can access the required resources.

Learn more about [MCP clients]({{base_path}}/guides/applications/register-mcp-client-app/) and [MCP servers]({{base_path}}/guides/authorization/mcp-server-authorization/).

### Webhook event publishing

WSO2 Identity Server now supports publishing key identity events to external systems through webhooks. Administrators can configure endpoints and select which event types such as login, registration, credential updates, token activity, session activity, or account management, should be delivered.

Event payloads include contextual properties, such as `initiatorType`, `action`, and `credentialType`, to help downstream systems process events accurately.
This capability enables real-time integrations, improves automation, and allows organizations to build event-driven extensions on top of WSO2 Identity Server with simple configurations.

Learn more about [webhooks]({{base_path}}/guides/webhooks/understanding-webhooks/).

### Support for granular role sharing with B2B applications

WSO2 Identity Server now lets admins control which roles are shared when delegating applications to organizations. Previously, application sharing automatically granted all associated roles, which could lead to over-permissive access.

With this update, admins can choose from three role-sharing modes:

- Share all roles with all organizations – The previous “everything shared” model.

- Share a common set of roles with all organizations – Select a single set of roles to be shared everywhere.

- Share different roles with each organization – Customize role sharing for each organization for maximum flexibility.

This feature is available for both Console and general applications. The “Shared Access” settings provide a tailored UI, integrating role selection directly into the sharing workflow. Admins can quickly see which roles are shared where and adjust them instantly while preserving the organizational hierarchy.

This enhancement empowers administrators, B2B customers, and security teams to enforce least-privilege access, improve governance, and prevent unintended role propagation across complex organizational structures.

Learn more about role sharing in the [sharing applications]({{base_path}}/guides/organization-management/share-applications/) documentation.

### Organizations inherit login and registration settings

Organizations now inherit login and registration configurations from their parent organization. Customizations at the top of the hierarchy cascade down to all organizations, while system defaults apply if no customizations exist.

Organizations can override inherited values and revert them at any time.

Learn more about the [inheritance of login and registration settings]({{base_path}}/guides/organization-management/inheritance-in-organizations/login-registration-inheritance/).

### Organizations inherit attributes and OIDC scopes

All attributes and attribute dialects available at the root organization level are now automatically available in organizations. Custom attributes no longer need to be explicitly shared with organizations via a B2B SaaS application.

OIDC scopes now inherit customizations from parent organizations, making it easier to manage and maintain consistent configurations.

Learn more about the inheritance of [attributes]({{base_path}}/guides/organization-management/inheritance-in-organizations/attribute-inheritance/) and [OIDC scopes]({{base_path}}/guides/organization-management/inheritance-in-organizations/oidc-scope-inheritance/).

### Unified the naming convention for root organizations and organizations

Naming conventions for root and organizations are now unified, delivering consistency and stronger branding across B2B applications.

Key Highlights:

- Organization handle for organizations

    Organizations now have an Organization Handle, a human-readable, unique, and immutable identifier, similar to the root organization domain. This makes organization discovery effortless in B2B applications and allows users to reference organizations reliably.

- Editable display name for root organizations

    Root organizations now support an editable Display Name, mirroring what’s available for organizations. The display name can be used in emails, notifications, and branding to provide a cohesive and recognizable identity. Organizations can update it anytime to adapt their presence as business needs evolve.

Learn more about [organization handles]({{base_path}}/guides/organization-management/manage-organizations/#create-an-organization) and [root organization display names]({{base_path}}/guides/multitenancy/manage-tenants).

### Manage federated associations with a dedicated bulk API

The new Federated User Association Bulk API allows admins to create or delete multiple federated user associations in a single request. This reduces manual effort, simplifies workflows, and ensures a more seamless experience when managing large numbers of federated identities across partner organizations.

Learn more about the [federated user association bulk API]({{base_path}}/apis/organization-apis/org-association-rest-api/#tag/admin/paths/~1federated-associations~1bulk/post).

### Enhanced language and locale support for My Account & Console

Previously, My Account and Console supported only a limited set of languages. With this release, users can add or remove locales to customize the applications in their preferred languages, providing greater flexibility and improved localization.

Learn more about [adding and removing locales]({{base_path}}/guides/branding/localization/#add-or-remove-locales).

### Custom page editor for end-user portals

Previously, customizing the user interface beyond basic logos and themes required coding and redeployment, making advanced personalization cumbersome.

With this update, administrators can fully tailor end-user pages directly from the in-Console editor using custom HTML, CSS, and JavaScript. This enhancement enables organizations to deliver a seamless, engaging, and consistent brand experience across login and self-service pages, while maintaining full control with minimal effort.

Learn more about [custom layouts]({{base_path}}/guides/branding/customize-layouts-with-editor/).

### Seamless user impersonation for business applications

WSO2 Identity Server now allows initiating user impersonation without modifying business applications. Previously, impersonation required source code changes in an impersonation-authorized client. With this update, impersonation can be started directly from the Console, enabling seamless Single Sign-On (SSO) to any authorized business application.

Learn more about [user impersonation]({{base_path}}/guides/authorization/user-impersonation/).

### Support for advanced data types in simple attributes

WSO2 Identity Server now supports rich data types for custom user attributes. Previously, attributes were limited to basic text values, restricting how administrators could model and validate data.

With this enhancement, administrators can define attributes using a variety of data types that better match the semantics of their data.

- **Text**: Plain string values.

- **Options**: Predefined label–value pairs selectable via dropdowns, radios, or checkboxes.

- **Integer**: Whole numbers.

- **Decimal**: Numeric values with decimals.

- **Boolean**: True/false values represented as toggles or checkboxes.

- **DateTime**: Date and time values.

- **Object**: Structured attributes composed of multiple sub-attributes.

This flexibility improves data integrity and automatically renders the most appropriate input format for each attribute, enhancing both administrative control and the end-user experience.

Learn more about [data type support for attributes]({{base_path}}/guides/users/attributes/manage-attributes/#:~:text=Attribute%20Data%20Types.).

### Support for data types and input formats in user attributes

WSO2 Identity Server now allows administrators to configure both data types and input formats for custom user attributes. Previously, all attributes were rendered as simple text inputs, limiting flexibility and user experience.

Supported data types include:

- **Text**: Plain string values.

- **Options**: Predefined label–value pairs selectable via dropdowns, radios, or checkboxes.

- **Boolean**: True/false values represented as toggles or checkboxes.

- **Integer**: Whole numbers.

- **Decimal**: Numeric values with decimals.

Based on the selected type and whether the attribute is multi-valued, the system dynamically renders the most suitable input format, such as text/number inputs, dropdowns, radio groups, multi-select dropdowns, checkbox groups, or toggles.

This flexibility improves data integrity, simplifies form interactions, and ensures the attribute management UI aligns with the semantics of the data, enhancing both administrative control and the end-user experience.

Learn more about [input type support for user attributes]({{base_path}}/guides/users/attributes/manage-attributes/ ).

### Workflow approval for user operations

WSO2 Identity Server now introduces a revamped workflow-based approval framework designed to support long-running approval workflows for critical user management operations such as adding or deleting users, creating roles, and updating users within a role.

This new implementation enables organizations to design multi-step approval chains, where approvers can be assigned based on roles or groups, reflecting their permission levels and responsibilities. Administrators can configure these workflows through the Console, while users can review and act on approval requests seamlessly from the My Account portal.

This enhancement provides stronger governance, ensures compliance, and adds a new layer of security and oversight for high-impact identity operations.

!!! note

    The new workflow feature is a complete reimplementation of the previous version and is not backward compatible with existing workflow configurations. To leverage the new long-running approval capabilities, you must redefine existing workflows using the updated model.

Learn more about [workflows]({{base_path}}/guides/workflows/).

### Email OTP-based verification when onboarding users

You can now trigger email verification when creating a user through the SCIM API using the verifyEmail=true claim. With the new configuration, the verification email can be sent as an OTP instead of a link, giving you more flexibility during user onboarding.

Learn more about [adding users with email verification]({{base_path}}/guides/users/manage-users/#add-users-with-email-verification).

### Support for OTP-based user invite flow

During admin-initiated user onboarding, you can now send the end-user an email OTP or an SMS OTP to begin the process.

Previously, onboarding began only with an email link. With this update, the OTP can serve as a temporary password and be submitted with the username on the login page, after which the user is redirected to complete the onboarding flow.

Learn more about [onboarding users]({{base_path}}/guides/account-configurations/user-onboarding/invite-user-to-set-password/).

### Support for OTP-based admin-forced password reset

WSO2 Identity Server now extends the admin-forced password reset capability to support both Email OTP and SMS OTP methods. Previously, forced resets were limited to the email link option.

With this enhancement, administrators can enforce stronger and more flexible recovery mechanisms, and users can securely reset their passwords through the channel most convenient for them. This update strengthens password recovery flows while maintaining security and usability.

Learn more about [admin-forced password reset]({{base_path}}/guides/account-configurations/account-recovery/admin-initiated-password-reset/).

### OAuth-based authentication support for email providers

The Email Provider template now supports OAuth-based authentication for SMTP servers. In addition to the existing Basic authentication, you can now configure SMTP using client credentials, meeting modern authentication standards.

This update ensures compatibility with Microsoft Exchange Online, ahead of the planned retirement of Basic authentication (SMTP AUTH) in April 2026, helping maintain uninterrupted email delivery and compliance with current security best practices.

Learn more about [configuring email providers]({{base_path}}/guides/notification-channels/configure-email-provider/).

### Pre-configured React and Next.js application templates

WSO2 Identity Server now provides ready-to-use templates for React and Next.js applications.

These templates simplify application onboarding by including preconfigured authentication and authorization settings, reducing the need for manual setup.

Learn more about registering a [React app]({{base_path}}/guides/applications/register-react-app/) and a [Next.js]({{base_path}}/guides/applications/register-nextjs-app/) app.

### Automate user attribute verification with pre-update actions

WSO2 Identity Server now supports configuring a pre-update profile action to verify user attributes during profile updates. This action allows you to automate data verification, save changes, or send notifications to updated contact details.

The following profile update flows can trigger this action:

- **Self-service profile update**: When an end user modifies their profile through a portal such as the My Account application.

- **Administrator-initiated profile update**: When an administrator updates a user’s profile through a portal such as the Console application.

You can also configure conditional rules so the action is triggered only for specific flows or attribute updates.

Learn more about the [pre-update profile action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-update-profile-action/).

### Support configuring actions for B2B organizations

WSO2 Identity Server now supports configuring actions (service extensions) in organizations, providing greater flexibility for B2B reseller scenarios.

Currently supported actions include:

- **Pre-update password**: Validates the new password against configured policies before the update is applied.

- **Pre-update profile**: Verify user attributes during profile update processes.

Learn more about [service extensions]({{base_path}}/guides/organization-management/service-extensions/service-extensions/).

### OpenTelemetry-based LDAP operation tracing

WSO2 Identity Server introduces OpenTelemetry-based tracing for LDAP operations such as search, bind, and modifyAttributes. Previously, even though database calls were traced, LDAP interactions were not visible in tracing tools like Datadog.

This feature gives full visibility into LDAP activity, making it easier to track and troubleshoot authentication and user management workflows.

Admins can enable tracing via a configuration toggle, gaining rich telemetry without affecting existing LDAP logic. This improves troubleshooting and performance insights in complex identity deployments

Learn more about [OpenTelemetry-based LDAP tracing]({{base_path}}/deploy/monitor/work-with-product-observability/#opentelemetry-based-tracing-in-wso2-identity-server).

## Improvements

WSO2 Identity Server 7.2.0 improves a number of existing features to enhance your experience.

### Out-of-the-box support for Demonstrating Proof of Possession (DPoP)

WSO2 Identity Server now provides out-of-the-box support for Demonstrating Proof of Possession (DPoP) (RFC 9449). DPoP binds an access token to the client’s private key, requiring the client to include a signed DPoP proof in the request header to prove possession.

This ensures that only the legitimate client holding the corresponding private key can use the access token, enhancing security by preventing token misuse and replay attacks across all OAuth 2.0 grant types. Previously, DPoP support was available only through a connector; starting from IS 7.2.0, it can be configured directly.

Learn more about [DPoP]({{base_path}}/references/token-binding/dpop/).

### Out-of-the-box support for post-quantum TLS

WSO2 Identity Server now supports the X25519MLKEM768 hybrid key exchange out-of-the-box for both inbound and outbound TLS 1.3 connections. This strengthens TLS connections by combining proven classical cryptography with protection against emerging quantum threats.

Support for inbound communication using a separate script has been available since version 7.0. With version 7.2, the same level of security is now extended to outbound connections. It can be enabled through a configuration, without requiring any external scripts or additional setup tools.

Learn more about [encryption for outbound communications]({{base_path}}/deploy/security/configure-post-quantum-tls/).

### Unicode character support for user attributes

WSO2 Identity Server now provides out-of-the-box support for Unicode characters in user attributes. User attributes such as names, addresses, and custom claims can now include characters from multiple languages seamlessly.

Prior to WSO2 Identity Server 7.2.0, Unicode support was limited for MySQL and MS SQL databases. Starting from this release, Unicode is supported across all supported database types.

!!! note

    Usernames cannot use Unicode characters in MySQL and MS SQL databases.

Learn more about enabling unicode support for [MS SQL]({{base_path}}/deploy/configure/databases/carbon-database/change-to-mssql/).

### Operation-wise access control in SCIM bulk API

WSO2 Identity Server now allows fine-grained access control for each operation in the SCIM2 bulk API.

Previously, the `internal_bulk_resource_create` scope was required to perform any operation on the bulk endpoint. Starting with WSO2 Identity Server 7.2, each operation in a bulk request executes only if the corresponding operation-specific scope is available.

For backward compatibility, the API still supports the `internal_bulk_resource_create` scope and allows performing all operations through the bulk endpoint.

Learn more about the [SCIM bulk API]({{base_path}}/apis/scim2/scim2-batch-operations/#scopepermission-required-for-batch-operations).

### Pre-update password extension support for user registration

WSO2 Identity Server now supports executing pre-update password action during user registration. With this enhancement, organizations can plug in custom password validation logic whenever a user sets or updates a password. This ensures consistent enforcement of password policies across all password operations in the WSO2 Identity Server, including user onboarding and password changes.

Learn more about [pre-update password extension]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-update-password-action/#pre-update-password-action).

### Support attribute sharing in pre-update password extension

WSO2 Identity Server now allows pre-update password extensions (action) to be configured with additional user attributes that can be shared with external services.

This enhancement enables extension developers to pass user-specific information, such as username, NIC, or department, to external systems when performing password validations.

By supporting attribute sharing, organizations gain greater flexibility to enforce custom password policies that depend on contextual user information.

Learn more about [pre-update password extension]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-update-password-action/#pre-update-password-action).

### Support for configuring headers and parameters in pre-issue access token and custom authentication actions

WSO2 Identity Server now allows extension developers to explicitly configure which request headers and parameters can be shared with pre-issue access token and custom authentication actions. This provides the necessary flexibility for extensions to access required data while maintaining strong security by preventing exposure of sensitive or unnecessary information.

Learn more about these changes in the [pre-issue access token]({{base_path}}/guides/service-extensions/pre-flow-extensions/setting-up-actions/#:~:text=Allowed%20headers%3A%20Add%20the%20request%20headers%20you%20want,you%20want%20to%20send%20to%20your%20external%20service) and [custom authentication]({{base_path}}/guides/service-extensions/in-flow-extensions/custom-authentication/#:~:text=If%20you%20want%20to%20send%20extra%20HTTP%20request%20headers%20or%20extra%20parameters%20to%20your%20external%20service%2C%20you%20can%20add%20them%20in%20Allowed%20headers%20and%20Allowed%20parameters%20under%20the%20Settings%20tab%20in%20custom%20authenticator%20configuration) documentation.

### Enhanced organization search in console with nested hierarchy support

WSO2 Identity Server Console now supports searching across the entire organization hierarchy. Previously, searches were limited to immediate child organizations. With this enhancement, you can easily locate and manage organizations at any depth within your hierarchy.

Learn more about [organization search]({{base_path}}/guides/organization-management/manage-organizations/#search-an-organization).

### Protocol-specific keystores for root organizations

WSO2 Identity Server now offers more flexibility in keystore management. In addition to customizing the SAML keystore, you can now set up separate keystores for OAuth, WS-Trust, and WS-Fed.

By default, the server continues to use the primary and tenant keystores for signing and encryption. With this update, organizations can assign dedicated keystores for each protocol, improving security and simplifying compliance management.

Keystores can be configured for all tenants or specifically for the super tenant through deployment settings.

Learn more about [configuring protocol-specific keystores]({{base_path}}/deploy/security/keystores/configure-custom-keystores/).

### User account management enhancements

WSO2 Identity Server now makes managing user accounts more efficient with improvements to verification, password setup, and recovery workflows. These enhancements address common challenges such as pending verifications, expired password setup emails, locked accounts, and unverified user profiles.

Key Highlights:

- **Filter users by pending verification states**: Administrators can quickly segment users by states such as pending password reset, pending initial password setup, pending email or mobile verification, locked accounts, and disabled accounts.

- **Resend or set passwords directly**: Administrators can resend expired password setup or reset emails, or directly set a user’s password, ensuring smoother onboarding and recovery.

- **Notify users of unverified accounts in MyAccount**: The My Account portal displays clear prompts for unverified accounts, with options for users to resend verification links and complete the process independently.

These updates simplify administrative workflows while empowering end users to complete verification, onboarding, and recovery seamlessly.

Learn more about:

- [Filtering users]({{base_path}}/guides/users/manage-users/#filter-users).
- [Resending password set up links]({{base_path}}/guides/users/manage-users/#resend-password-setup-linkcode).
- [Resending account verification emails]({{base_path}}/guides/account-configurations/user-onboarding/self-registration/#resend-account-verification-email).
- [Displaying banner in the My Account portal]({{base_path}}/guides/user-self-service/self-register/).

### Support for email OTP-based password recovery

WSO2 Identity Server now provides enhanced flexibility in password recovery. In addition to Email link and SMS OTP methods, users can recover their accounts using Email OTP, expanding the available recovery options.

This allows organizations to offer a method that best fits their security and usability needs. Users who may not have access to SMS or prefer not to use recovery links can securely regain account access via a one-time password sent directly to their email.

Learn more about [configuring password recovery options]({{base_path}}/guides/account-configurations/account-recovery/password-recovery/).

### Granular application discoverability in My Account

WSO2 Identity Server now gives administrators enhanced control over application discoverability in the My Account portal. Previously, any application marked as discoverable was visible to all users in the organization.

With this update, administrators can assign specific user groups as discoverable groups, ensuring that applications are visible only to intended audiences. This allows for a more tailored and convenient experience for users.

If no groups are assigned, applications marked as discoverable will continue to be visible to all users in the organization.

Learn more about [discoverable applications]({{base_path}}/guides/applications/#make-an-application-discoverable).

### Enhanced account linking with configurable user attributes for federated–local user association

WSO2 Identity Server now offers enhanced control over how federated accounts are matched and linked to local identities.

You can define **up to two attribute mappings** between a federated identity provider and WSO2 Identity Server. These mappings determine how a local user account is identified when a federated user logs in. Once a match is found, the federated identity is automatically linked to the corresponding local account, ensuring a seamless login experience.

Learn more about [linking accounts]({{base_path}}/guides/authentication/jit-user-provisioning/).

### Conditional Authentication: Functions for retrieving users and managing associations

WSO2 Identity Server introduces two new JavaScript functions for conditional authentication, designed to make user management more flexible and intuitive.

- `getUsersWithClaimValues` – Retrieves multiple users based on specific claim values, enabling more precise user-related actions in authentication scripts.

- `removeAssociatedLocalUser` – Removes local user associations from federated accounts, simplifying account linking and unlinking scenarios.

Learn more about these [conditional authentication functions]({{base_path}}/references/conditional-auth/api-reference/#conditional-authentication-api-reference).

## Deprecated features

In WSO2 Identity Server 7.2.0, we have deprecated several features to enhance security, streamline operations, and improve overall usability. These deprecations align with our commitment to maintaining a robust and future-ready platform. Below is a list of deprecated features along with recommended actions for users.

Learn more about [WSO2 Identity Server Feature Deprecation]({{base_path}}/references/wso2-identity-server-feature-deprecation/).

### Branding display name

The previous branding display name has been deprecated and replaced with a new, editable root organization display name. This change offers improved consistency and allows for easier customization across the platform.

### Organization ID as tenant domain

Previously, the organization ID served as the tenant domain (organization handle). Going forward, these will be separate values.

**Recommended action**: Update any locations in your B2B applications, such as URLs and query parameters, where the organization ID was previously used as the tenant domain.

### Root organization tenant domain as display name

Previously, the root organization’s tenant domain served as its display name. Going forward, these will be separate values:

- **org_handle** token claim will contain the organization handle (tenant domain).

- **org_name** token claim will contain the new display name.

This separation provides a clear distinction between the organization’s identifier and its display name.

### Legacy user registration and management flows

Previously, WSO2 Identity Server offered built-in flows for user registration and management that provided basic functionality and limited customization options.

These flows are now deprecated and replaced with the new **Flow Builder**, which offers a more flexible and powerful way to design and manage user registration and management journeys.

The deprecated flows include:

- **Legacy self-registration flow**

    Along with this flow, the following related features are also deprecated:

    - Self-registration configurations under the **Login & Registration** tab in the Console.

    - Self-Registration APIs used for building custom registration flows.

- **Legacy password recovery flow**

    Along with this flow, the following related features are also deprecated:

    - Password recovery configurations under the **Login & Registration** tab in the Console.

    - Password recovery APIs under the account recovery V2 APIs.

- **Legacy invited user registration flow**

    Along with this flow, the following related features are also deprecated:

    - Invited user registration APIs.

**Recommended action**: Use the new [Flow Builder](#introducing-flow-builder-build-tailored-user-registration-and-management-flows) to create fully customizable end-user journeys.

## Fixed issues

For a complete list of issues fixed in this release, see [WSO2 Identity Server 7.2.0 - Fixed Issues](https://github.com/wso2/product-is/issues?q=state%3Aclosed%20project%3Awso2%2F117){:target="_blank"}.

## Known issues

For a complete list of open issues related to the WSO2 Identity Server, see [WSO2 Identity Server - Open Issues](https://github.com/wso2/product-is/issues){:target="_blank"}.
