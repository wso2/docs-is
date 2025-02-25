# About this Release

{{product_name}} 7.1.0 is the latest release, succeeding WSO2 Identity Server 7.0.0, with enhanced features, improvements, and fixes.

## What's new in this release?

WSO2 Identity Server 7.1.0 introduces a range of new features and enhancements:

### AI-powered enhancements

WSO2 Identity Server 7.1.0 introduces **AI LoginFlow** and **AI Branding**, bringing automation and intelligence to identity and access management. These features simplify authentication sequence configuration and branding customization through natural language-driven inputs, reducing manual effort and minimizing errors. By leveraging AI, administrators can create seamless, adaptive authentication experiences with greater efficiency.

- **AI LoginFlow** - AI LoginFlow lets administrators define authentication flows using natural language, simplifying complex configurations and reducing setup effort. Learn more about [AI LoginFlow]({{base_path}}/guides/authentication/login-flow-ai/).

- **AI Branding** - AI Branding allows administrators to customize login pages using natural language, making it easy to create designs that match their organization's identity. Learn more about [AI Branding]({{base_path}}/guides/branding/branding-ai/).

### Authentication and authorization

- **Push Notification-Based Authentication** – Enables passwordless authentication by allowing users to approve login requests via push notifications on their mobile devices. This improves security and reduces reliance on passwords and OTPs. Learn more about [Push Notification-Based Authentication]({{base_path}}/guides/authentication/mfa/add-push-auth-login/).

- **User Impersonation** – Allows authorized administrators or support personnel to access user accounts securely for troubleshooting and customer support without requiring the user's credentials. Learn more about [User Impersonation]({{base_path}}/guides/authorization/user-impersonation/).

- **OAuth 2.0 Rich Authorization Requests** –  Adds support for the OAuth 2.0 Rich Authorization Requests (RFC 9396) specification, allowing more granular authorization beyond traditional scopes. The `authorization_details` field is now supported in authorization requests, token requests, and introspection responses. Supported authorization details types are discoverable via the `.well-known` metadata endpoint, and additional types can be integrated using Java extensions.

- **PKCE Support in OIDC Federated Login** –  Enhances security in the OIDC federated login flow by introducing Proof Key for Code Exchange (PKCE). This prevents authorization code interception attacks by securing backchannel communication during authentication.

### B2B identity and access management

- **Create OAuth 2.0 Applications directly within Organizations** – WSO2 Identity Server now supports creating OAuth2 applications directly within organizations using the application management API. To complement this, role management capability is also extended to organizations. Additionally, API resources registered at the root organization level are now inherited by organizations. Learn more about [creating applications in organizations]({{base_path}}/guides/organization-management/organization-applications/).

- **Update and Resolve Shared User Profiles Across Organization Hierarchies** –  WSO2 Identity Server 7.1.0 improves the management of shared user profiles across multiple organizations. Previously, shared users had a single profile that couldn't be customized per organization. Now, administrators can update and resolve shared user profile attributes based on the organization hierarchy, providing greater flexibility and control over user data at different organizational levels. Learn more about [shared user profiles]({{base_path}}/guides/organization-management/share-user-profiles/).

- **B2B Organization Filtering & Discovery Improvements** – WSO2 Identity Server now supports organization filtering using meta attributes, expanding beyond standard filters like name, ID, and parent organization. This enhancement enables more precise and flexible organization searches, improving management and discovery across complex organizational structures. Learn more about [searching for organizations]({{base_path}}/guides/organization-management/manage-organizations/#search-an-organization).

- **Support for `login_hint` Parameter in Organization Discovery** - WSO2 Identity Server now supports using the `login_hint` query parameter as an organization discovery hint in B2B scenarios. When a user’s email is provided in the `login_hint`, the system can automatically route them to their organization’s login page, streamlining authentication. Learn more about it in [email-domain based organization discovery]({{base_path}}/guides/organization-management/email-domain-based-organization-discovery/).


### Security & Compliance

- **AES-256 Support for Data Encryption** - WSO2 Identity Server now supports AES-128, AES-192, and AES-256 encryption algorithms for internal data encryption. This enhancement provides greater flexibility in selecting encryption strength based on security and compliance requirements. Learn more in [symmetric encryption]({{base_path}}/deploy/security/symmetric-encryption/).

- **AES Encryption & Key Rotation Support for Cipher Tool** - WSO2 Identity Server now supports AES-based symmetric encryption in Secure Vault, complementing the existing keystore-based asymmetric encryption. Encryption is performed using an AES secret stored in the internal keystore, enhancing security and flexibility. Additionally, Cipher Tool now supports key rotation, enabling seamless transitions between symmetric and asymmetric encryption or updating keys within the same encryption mode. Learn more about [encrypting passwords with the Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/).

- **Post-Quantum TLS Support** - WSO2 Identity Server now supports the X25519MLKEM768 hybrid key exchange mechanism, enabling post-quantum TLS (Transport Layer Security). This enhancement strengthens encryption resilience against emerging quantum computing threats, ensuring long-term security for sensitive communications. Learn more about [configuring post-quantum TLS]({{base_path}}/deploy/security/configure-post-quantum-tls/).

- **Rule-Based Password Expiration** - WSO2 Identity Server now supports rule-based password expiration, allowing administrators to define custom expiration policies based on user roles and groups. This feature provides flexibility in enforcing or bypassing password expiration based on specific conditions, ensuring better alignment with organizational security requirements. Additionally, rule prioritization helps resolve conflicts and streamline password management. Learn more about [rule-based password expiration]({{base_path}}/guides/account-configurations/login-security/password-validation/#rule-based-password-expiration).

- **On-Demand Silent Password Migration** - WSO2 Identity Server now supports on-demand silent password migration, enabling seamless password migration from an existing system without user disruption. During login, user credentials are verified against the existing system, and passwords are securely migrated to the Identity Server. This process leverages a conditional authentication script and external REST services to authenticate users and transfer credentials without requiring additional user action. Learn more about [on-demand silent password migration]({{base_path}}/guides/users/migrate-users/migrate-passwords/).

- **Support for Attribute-Wise Uniqueness Validation Configuration** - WSO2 Identity Server now supports attribute-wise uniqueness validation configuration, allowing administrators to define uniqueness constraints for attributes directly within the General tab. A new dropdown menu provides three options:
    - *None* – No uniqueness validation.
    - *Within User Store* – Ensures uniqueness within a specific user store.
    - *Across User Stores* – Enforces uniqueness across all user stores.

    Learn more about [configuring unique attributes]({{base_path}}/guides/users/attributes/configure-unique-attributes/).


### User experience and customization

- **Application-specific branding** - WSO2 Identity Server now supports application-specific branding, allowing businesses to customize branding for individual applications directly through the Console. Previously, branding was limited to the organization level, making it challenging to manage distinct branding across multiple applications. With this enhancement, enterprises can deliver a personalized user experience by defining unique branding for each application's login portal and user interface. In B2B scenarios, if an application lacks specific branding, it will inherit branding from the organization, parent organization, or default to WSO2 Identity Server branding, ensuring both flexibility and consistency. Learn more about it in [Configure UI branding]({{base_path}}/guides/branding/configure-ui-branding/).

- **Right-to-Left (RTL) Language Support** - WSO2 Identity Server now supports Right-to-Left (RTL) language rendering in login and recovery portals, enhancing accessibility for users of languages such as Arabic, Hebrew, and Persian. This improvement ensures that text alignment, layouts, and UI elements adapt seamlessly to RTL scripts, providing an optimized and intuitive user experience. Learn more about [RTL language support]({{base_path}}/guides/branding/localization/#right-to-left-rtl-language-support).

- **Support for Multiple Email Addresses & Phone Numbers Per User** - WSO2 Identity Server now supports multiple email addresses and phone numbers per user, allowing users to register multiple contact points in their profiles. Users can designate a primary email and phone number, which will be used for notifications and OTPs. If verification is enabled, only verified contact details can be set as primary, ensuring security and reliability in communication. Learn more about [assigning multiple email address and mobile numbers]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user).

- **Distinct Attribute Profiles for Different User Flows** - WSO2 Identity Server now supports distinct attribute profiles for different user flows, allowing administrators to define how attributes are displayed and managed across various scenarios. Administrators can configure attributes to be `visible`, `required`, or `read-only` for:

    - *Administrator Console* – Control which attributes are accessible to administrators.
    - *End-User Profile* – Define how attributes appear in the My Account portal.
    - *Self-Registration* – Customize attribute fields for new user sign-ups.
     
    Learn more about it in [configuring attributes]({{base_path}}/guides/users/attributes/manage-attributes/#configure-attributes).

### Identity Verification & Risk-Based Authentication

- **iProov as an MFA Option** - WSO2 Identity Server now supports iProov as a Multifactor Authentication (MFA) option, enabling seamless integration of secure facial biometrics into your authentication flows.

- **Sift fraud detection** - WSO2 Identity Server now supports Sift fraud detection integration, enabling real-time detection and prevention of fraudulent logins. By leveraging Sift’s risk scoring capabilities within the conditional authentication framework, organizations can enhance security without compromising user experience.

- **Username recovery support for sms channel** - WSO2 Identity Server now extends username recovery support to the SMS channel, in addition to the previously supported email-based recovery. Administrators can now enable or disable recovery channels based on organizational preferences and offer users a choice between SMS and email for username recovery.

### Additional enhancements

- **Seamless Third-Party SSO Integration with Ready-to-Use Templates** - WSO2 Identity Server now includes built-in support for third-party Single Sign-On (SSO) configurations, streamlining the integration process with popular enterprise applications. This enhancement introduces ready-to-use SSO templates, similar to our existing application templates, reducing manual configuration and providing step-by-step guidance for vendor-side setup. With this release, administrators can seamlessly integrate Identity Server with leading service providers using the following pre-configured SSO templates:

    - Google Workspace
    - Microsoft 365
    - Salesforce
    - Zoom
    - Slack

- **SMS Template Management UI** - WSO2 Identity Server now introduces a dedicated Email Template Management UI, enabling administrators to easily create, customize, and localize email templates for user notifications.


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


