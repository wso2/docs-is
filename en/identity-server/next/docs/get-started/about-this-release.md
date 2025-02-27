# About this Release

{{product_name}} 7.1.0 is the latest release, succeeding WSO2 Identity Server 7.0.0, with enhanced features, improvements, and fixes.

## What's new in this release?

WSO2 Identity Server 7.1.0 introduces a range of new features and enhancements:

### General enhancements

**Java 21 runtime support** - WSO2 Identity Server 7.1.0 is now compatible with Java 21 runtime compatibility and BouncyCastle keystore integration, enhancing security and performance. Java 21, the latest LTS version, ensures long-term support and stability, while replacing the JDK keystore with BouncyCastle strengthens cryptographic operations. Extensive performance testing confirms improved efficiency with JDK 21 compared to JDK 11, delivering a more optimized runtime environment.

**Tenant management UI** -The new Tenant Management UI in WSO2 Identity Server 7.1.0 simplifies multi-tenancy administration, providing a more efficient management experience. By default, the server is configured with a single root organization, `carbon.super`. With the necessary permissions, administrators can now create and manage multiple root organizations, maintaining isolated user bases within a single server or cluster. This capability is now accessible through the new Console, simplifying tenant management.

### AI-powered enhancements

WSO2 Identity Server 7.1.0 introduces **AI LoginFlow** and **AI Branding**, bringing automation and intelligence to identity and access management. These features simplify authentication sequence configuration and branding customization through natural language-driven inputs, reducing manual effort and minimizing errors. By leveraging AI, administrators can create seamless, adaptive authentication experiences with greater efficiency.

- **AI LoginFlow** - Lets administrators define authentication flows using natural language, simplifying complex configurations and reducing setup effort. Learn more about [AI LoginFlow]({{base_path}}/guides/authentication/login-flow-ai/).

- **AI Branding** - Allows administrators to customize login pages using natural language, making it easy to create designs that match their organization's identity. Learn more about [AI Branding]({{base_path}}/guides/branding/branding-ai/).

### Authentication and authorization

- **Push Notification-Based Authentication** – Allows users to approve login requests on their mobile devices for a seamless passwordless experience. This enhancement improves security and reduces reliance on passwords and OTPs. Learn more about [Push Notification-Based Authentication]({{base_path}}/guides/authentication/mfa/add-push-auth-login/).

- **User Impersonation** –  Authorized administrators or support personnel can now access user accounts securely for troubleshooting and customer support without requiring the user's credentials. Learn more about [User Impersonation]({{base_path}}/guides/authorization/user-impersonation/).

- **Custom Authentication Service Extension** - Administrators can now extend authentication capabilities by implementing custom authentication services. This enhancement offers greater flexibility in addressing diverse authentication requirements beyond the built-in authenticators.

- **OAuth 2.0 Rich Authorization Requests** –  Adds support for the OAuth 2.0 Rich Authorization Requests (RFC 9396) specification, allowing more granular authorization beyond traditional scopes. The `authorization_details` field is now supported in authorization requests, token requests, and introspection responses. Supported authorization details types are discoverable via the `.well-known` metadata endpoint, and additional types can be integrated using Java extensions.

- **PKCE Support in OIDC Federated Login** –  Enhances security in the OIDC federated login flow by introducing Proof Key for Code Exchange (PKCE). This prevents authorization code interception attacks by securing backchannel communication during authentication.

- **Seamless Third-Party SSO Integration with Ready-to-Use Templates** - Adds built-in support for third-party Single Sign-On (SSO) configurations, streamlining the integration process with popular enterprise applications. This enhancement introduces ready-to-use SSO templates, similar to our existing application templates, reducing manual configuration and providing step-by-step guidance for vendor-side setup. With this release, administrators can seamlessly integrate Identity Server with leading service providers using the following pre-configured SSO templates:

    - Google Workspace
    - Microsoft 365
    - Salesforce
    - Zoom
    - Slack

    Learn more about [SSO integrations]({{base_path}}/guides/authentication/sso-integrations/).

### OAuth and OpenID Connect

- **Username Attribute Removed from Application Access Token Introspection Response** - The username attribute is no longer included in the introspection response of an application access token. Previously, the introspection response included the username attribute. To align with industry standards, this field has been removed as part of a new enhancement. This change applies to newly created applications by default. For existing applications, the updated behavior can be enabled by updating the application settings. Learn more about it in the [application access token response]({{base_path}}/guides/authentication/oidc/token-validation-resource-server/#application-access-token-response).

- **Updated `sub` Attribute Value for Application Access Tokens** - The `sub` attribute of application access tokens now uses the client ID of the application instead of the application owner's UUID. Previously, the `sub` attribute was set to the UUID of the application owner. With this enhancement, the value has been updated to the client ID to align with industry standards.This change applies only to newly created applications by default. For existing applications, the updated behavior can be enabled by updating the application settings. Learn more about it in [subject attribute]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/#select-an-alternate-subject-attribute).

- **JWT Access Token Attributes Configuration** - Updates the approach to handling JWT access token attributes. With this enhancement, user attributes configured in the **User Attributes** section will no longer be automatically included as access token attributes. Instead, the **Access Token** section now provides an option to explicitly select which attributes should be included in the token. The selected attributes will be added to the JWT access token without requiring explicit requests. This change applies only to newly created applications by default. For existing applications, the updated behavior can be enabled by updating the application settings. Learn more about it in [OIDC configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token).

- **Application-Level JTI Reuse Configuration for Private Key JWT Authentication** - Supports configuring JTI (JSON Web Token ID) reuse at the application level when **Private Key JWT** is used as the client authentication mechanism. Previously, JTI reuse was managed as an organization-level property. With this enhancement, administrators can configure JTI reuse per application, providing greater flexibility and control. By default, applications will inherit the existing organization-level configuration unless explicitly modified. Learn more about [Private key JWT reuse]({{base_path}}/guides/authentication/oidc/private-key-jwt-client-auth/#private-key-jwt-reuse-optional).

- **Application-Level Support for Configuring OIDC Hybrid Flow** - Enables configuring OIDC Hybrid Flow at the application level, offering greater flexibility and control. Previously, hybrid flow configuration was restricted to the server level. With this enhancement, administrators can define the allowed response types for the OIDC hybrid flow directly within each application. For security reasons, the hybrid flow is disabled by default for newly created applications. However, it can be enabled on a per-application basis, allowing administrators to select the required hybrid flow response types as needed. Learn more about the [OIDC hybrid flow]({{base_path}}/guides/authentication/oidc/implement-oidc-hybrid-flow/).

- **Pre-Issue Access Token Service Extension** - Supports executing custom logic before issuing an access token, providing greater flexibility in the OAuth2 token issuance process. This enhancement allows administrators to modify scopes, audience values, and user attributes, add custom claims, and adjust the token’s validity period. By integrating this functionality, organizations can enforce additional security checks or customize token contents to align with specific requirements. Learn more about the [pre-issue access token action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-issue-access-token-action/).

### Adaptive authentication

- **GraalJS as the New Scripting Engine for Adaptive Authentication** - GraalJS is now the default execution engine for adaptive authentication scripts, replacing OpenJDK Nashorn. This upgrade enhances script execution speed and security. GraalJS supports ECMAScript 12 (ES12), introducing significant improvements over the previously supported ES5 in Nashorn. With this enhancement, developers can utilize modern JavaScript features, improving flexibility, performance, and maintainability in adaptive authentication flows.

- **Enhancements to `httpGet` and `httpPost` in Conditional Authentication Scripts** - Enhances the `httpGet` and `httpPost` functions in conditional authentication scripts. With this improvement, users can now invoke APIs secured with various authentication methods, including basic authentication, API key, bearer token, and client credentials grant, with just a few simple steps. By specifying the authentication type, endpoints, and secrets, administrators can seamlessly and securely integrate external APIs into their conditional authentication workflows. Learn more about the [httpGet]({{base_path}}/references/conditional-auth/api-reference/#http-get) and [httpPost]({{base_path}}/references/conditional-auth/api-reference/#http-post) functions.

- **Secret Management for Conditional Authentication Scripts** - Provides a secure way to store and retrieve secret values for use in conditional authentication scripts. Administrators can securely store secrets in the WSO2 Identity Server Console and reference them when needed. Previously stored secrets can be accessed in authentication scripts using the secrets.{secret_name} syntax. For example:

    ```js
    var secretValue = secrets.secretName;
    ```

    This feature enhances the security and flexibility of authentication workflows by allowing sensitive values to be managed securely within scripts. Learn more about [secrets]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/#add-a-secret-to-the-script).

### Risk-Based Authentication

- **iProov as an MFA Option** - Add support for iProov as a Multifactor Authentication (MFA) option, enabling seamless integration of secure facial biometrics into your authentication flows. Learn more about the [iProov connector](https://store.wso2.com/connector/identity-outbound-auth-iproov){: target="_blank"} in the [documentation](https://github.com/wso2-extensions/identity-outbound-auth-iproov/blob/main/docs/config.md){: target="_blank"}

- **Sift fraud detection** - Add support for Sift fraud detection integration, enabling real-time detection and prevention of fraudulent logins. By leveraging Sift’s risk scoring capabilities within the conditional authentication framework, organizations can enhance security without compromising user experience. Learn more about the [Sift connector](https://store.wso2.com/connector/identity-fraud-detection-sift){: target="_blank"} in the [documentation](https://github.com/wso2-extensions/identity-fraud-detection-sift/blob/main/docs/config.md){: target="_blank"}.

### User profiles and attributes

- **Toggle Descriptive Message for Unavailable Usernames in Self-Registration** - Supports toggling the display of a descriptive message when a username is unavailable during the self-registration account verification process. When enabled, users will see a message on the registration page if their selected username is already taken. This option is enabled by default to maintain the previous behavior but can be disabled if needed. Learn more about it in [self-registration]({{base_path}}/guides/account-configurations/user-onboarding/self-registration/#enabledisable-self-registration).

- **Support for Attribute-Wise Uniqueness Validation Configuration** - Supports attribute-wise uniqueness validation configuration, allowing administrators to define uniqueness constraints for attributes directly within the General tab. A new dropdown menu provides three options:
    - *None* – No uniqueness validation.
    - *Within User Store* – Ensures uniqueness within a specific user store.
    - *Across User Stores* – Enforces uniqueness across all user stores.

    Learn more about [configuring unique attributes]({{base_path}}/guides/users/attributes/configure-unique-attributes/).

- **Distinct Attribute Profiles for Different User Flows** - Supports distinct attribute profiles for different user flows, allowing administrators to define how attributes are displayed and managed across various scenarios. Administrators can configure attributes to be `visible`, `required`, or `read-only` for:

    - *Administrator Console* – Control which attributes are accessible to administrators.
    - *End-User Profile* – Define how attributes appear in the My Account portal.
    - *Self-Registration* – Customize attribute fields for new user sign-ups.
     
    Learn more about it in [configuring attributes]({{base_path}}/guides/users/attributes/manage-attributes/#configure-attributes).

- **Username recovery support for SMS channel** - Extends username recovery support to the SMS channel, in addition to the previously supported email-based recovery. Administrators can now enable or disable recovery channels based on organizational preferences and offer users a choice between SMS and email for username recovery. Learn more about it in [Username recovery]({{base_path}}/guides/account-configurations/account-recovery/username-recovery/).

- **Username Recovery When Email Address Is Not Unique** - Supports username recovery even when the provided email address is associated with multiple user accounts. Previously, username recovery was only possible when the provided attributes uniquely identified a user. With this enhancement, users with non-unique email addresses can still recover their usernames. Administrators can enable or disable this behavior based on organizational requirements. Learn more about it in [Username recovery]({{base_path}}/guides/account-configurations/account-recovery/username-recovery/).

- **Support for Multiple Email Addresses & Phone Numbers Per User** - Supports multiple email addresses and phone numbers per user, allowing users to register multiple contact points in their profiles. Users can designate a primary email and phone number, which will be used for notifications and OTPs. If verification is enabled, only verified contact details can be set as primary, ensuring security and reliability in communication. Learn more about [assigning multiple email address and mobile numbers]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user).

### B2B identity and access management

- **Create OAuth 2.0 Applications directly within Organizations** – Supports creating OAuth2 applications directly within organizations using the application management API. To complement this, role management capability is also extended to organizations. Additionally, API resources registered at the root organization level are now inherited by organizations. Learn more about [creating applications in organizations]({{base_path}}/guides/organization-management/organization-applications/).

- **Update and Resolve Shared User Profiles Across Organization Hierarchies** –  Improves the management of shared user profiles across multiple organizations. Previously, shared users had a single profile that couldn't be customized per organization. Now, administrators can update and resolve shared user profile attributes based on the organization hierarchy, providing greater flexibility and control over user data at different organizational levels. Learn more about [shared user profiles]({{base_path}}/guides/organization-management/share-user-profiles/).

- **B2B Organization Filtering & Discovery Improvements** – Supports organization filtering using meta attributes, expanding beyond standard filters like name, ID, and parent organization. This enhancement enables more precise and flexible organization searches, improving management and discovery across complex organizational structures. Learn more about [searching for organizations]({{base_path}}/guides/organization-management/manage-organizations/#search-an-organization).

- **Support for `login_hint` Parameter in Organization Discovery** - Supports using the `login_hint` query parameter as an organization discovery hint in B2B scenarios. When a user’s email is provided in the `login_hint`, the system can automatically route them to their organization’s login page, streamlining authentication. Learn more about it in [email-domain based organization discovery]({{base_path}}/guides/organization-management/email-domain-based-organization-discovery/).

- **Email Domain-Based Organization Discovery for Self-Registration** - Supports email domain-based organization discovery for self-registration. When enabled, users can enter an email address with a domain associated with a specific organization. The system then automatically identifies the corresponding organization, allowing users to seamlessly self-register within it. Learn more about [email domain based organization discovery]({{base_path}}/guides/organization-management/email-domain-based-organization-discovery/).

- **Multiple Secondary User Store Configuration for Child Organizations** - Extends support for configuring secondary user stores to child organizations, in addition to the previously supported root organizations. With this enhancement, each organization in a hierarchical structure can have its own dedicated user store, enabling independent management of users and groups. Learn more about it in [onboarding users]({{base_path}}/guides/organization-management/onboard-users/#onboard-users-from-a-secondary-user-store) documentation.

- **Email and SMS Template Inheritance with Override Capability for Child Organizations** - Introduces enhanced functionality for managing email and SMS templates across organizations. This feature enables child organizations to inherit email and SMS templates from a parent or ancestor organization while allowing them to override specific content as needed. This ensures that child organizations can maintain unique communication while preserving a consistent base template defined at the parent level. Learn more about it in [email branding]({{base_path}}/guides/branding/customize-email-templates/) and [SMS branding]({{base_path}}/guides/branding/customize-sms-templates/).

- **Share Users Across Organization Hierarchy with Role Assignment** - Introduces the ability to share users across an organization hierarchy with role assignment. This feature allows administrators to share user profiles from a parent organization to child organizations while assigning specific roles during the process. Multiple sharing policies are now supported, providing greater flexibility. Administrators can choose to share users with all existing and future child organizations or selectively share users with specific organizations as needed. This enhancement simplifies user management by enabling centralized control over user roles and access across the organization hierarchy, improving both efficiency and security. Learn more about the [User Sharing API]({{base_path}}/apis/organization-user-share-rest-api/).


### Security & Compliance

- **AES-256 Support for Data Encryption** - Supports AES-128, AES-192, and AES-256 encryption algorithms for internal data encryption. This enhancement provides greater flexibility in selecting encryption strength based on security and compliance requirements. Learn more in [symmetric encryption]({{base_path}}/deploy/security/symmetric-encryption/).

- **AES Encryption & Key Rotation Support for Cipher Tool** - Supports AES-based symmetric encryption in Secure Vault, complementing the existing keystore-based asymmetric encryption. Encryption is performed using an AES secret stored in the internal keystore, enhancing security and flexibility. Additionally, Cipher Tool now supports key rotation, enabling seamless transitions between symmetric and asymmetric encryption or updating keys within the same encryption mode. Learn more about [encrypting passwords with the Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/).

- **Post-Quantum TLS Support** - Supports the X25519MLKEM768 hybrid key exchange mechanism, enabling post-quantum TLS (Transport Layer Security). This enhancement strengthens encryption resilience against emerging quantum computing threats, ensuring long-term security for sensitive communications. Learn more about [configuring post-quantum TLS]({{base_path}}/deploy/security/configure-post-quantum-tls/).

- **Rule-Based Password Expiration** - Supports rule-based password expiration, allowing administrators to define custom expiration policies based on user roles and groups. This feature provides flexibility in enforcing or bypassing password expiration based on specific conditions, ensuring better alignment with organizational security requirements. Additionally, rule prioritization helps resolve conflicts and streamline password management. Learn more about [rule-based password expiration]({{base_path}}/guides/account-configurations/login-security/password-validation/#rule-based-password-expiration).

- **On-Demand Silent Password Migration** - Supports on-demand silent password migration, enabling seamless password migration from an existing system without user disruption. During login, user credentials are verified against the existing system, and passwords are securely migrated to the Identity Server. This process leverages a conditional authentication script and external REST services to authenticate users and transfer credentials without requiring additional user action. Learn more about [on-demand silent password migration]({{base_path}}/guides/users/migrate-users/migrate-passwords/).


### User experience and customization

- **Application-specific branding** - Supports application-specific branding, allowing businesses to customize branding for individual applications directly through the Console. Previously, branding was limited to the organization level, making it challenging to manage distinct branding across multiple applications. With this enhancement, enterprises can deliver a personalized user experience by defining unique branding for each application's login portal and user interface. In B2B scenarios, if an application lacks specific branding, it will inherit branding from the organization, parent organization, or default to WSO2 Identity Server branding, ensuring both flexibility and consistency. Learn more about it in [Configure UI branding]({{base_path}}/guides/branding/configure-ui-branding/).

- **SMS Template Management UI** - Introduces a dedicated SMS Template Management UI, allowing administrators to create, customize, and localize SMS notifications to align with their organization's branding and communication needs. This enhancement enables per-tenant customization through the management console or APIs, ensuring a more personalized and engaging user experience.

- **Right-to-Left (RTL) Language Support** - Supports Right-to-Left (RTL) language rendering in login and recovery portals, enhancing accessibility for users of languages such as Arabic, Hebrew, and Persian. This improvement ensures that text alignment, layouts, and UI elements adapt seamlessly to RTL scripts, providing an optimized and intuitive user experience. Learn more about [RTL language support]({{base_path}}/guides/branding/localization/#right-to-left-rtl-language-support).

## Deprecated features

In WSO2 Identity Server 7.1.0, we have deprecated several features to enhance security, streamline operations, and improve overall usability. These deprecations align with our commitment to maintaining a robust and future-ready platform. Below is a list of deprecated features along with recommended actions for users. Learn more about [WSO2 Identity Server Feature Deprecation]({{base_path}}/references/wso2-identity-server-feature-deprecation/).

- **Password Expiring User Identification Rest API** - With the introduction of rule-based password expiration, administrators can now define password expiration rules based on user roles and groups, offering more granular control over password policies. As part of this enhancement, As part of this enhancement, the Password Expiring User Identification REST API has been deprecated and WSO2 Identity Server now exposes the `passwordExpiryTime` attribute directly through the SCIM2/Users API.

    - **Recommended action** - Use the SCIM2 API to retrieve password expiration details directly via the `passwordExpiryTime` attribute.

- **Built-in support for XACML** - WSO2 Identity Server has deprecated built-in XACML support.
    
    - **Recommended action** - If you still require XACML functionality, you can integrate the [XACML connector](https://store.wso2.com/connector/identity-application-authz-xacml){: target="_blank"} into {{product_name}}. Learn more about it in the [documentation](https://github.com/wso2-extensions/identity-application-authz-xacml/blob/master/README.md){: target="_blank"}.
         

## Fixed issues

For a complete list of issues fixed in this release, see [WSO2 IS 7.1.0 - Fixed Issues](https://github.com/wso2/product-is/issues?q=state%3Aclosed%20project%3Awso2%2F113){:target="_blank"}.

## Known issues

For a complete list of open issues related to the WSO2 Identity Server, see [WSO2 IS - Open Issues](https://github.com/wso2/product-is/issues){:target="_blank"}.


