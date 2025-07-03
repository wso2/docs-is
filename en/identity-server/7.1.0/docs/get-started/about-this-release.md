# About this Release

{{product_name}} 7.1.0 is the latest release, succeeding WSO2 Identity Server 7.0.0, with enhanced features, improvements, and fixes.

## What's new in this release?

WSO2 Identity Server 7.1.0 introduces a range of new features and enhancements:

- **Push Notification-Based Authentication**

    WSO2 Identity Server now supports Push Notification-Based Authentication, enabling a faster and more secure login experience. Instead of manually entering passwords or one-time codes, users can authenticate by approving a push notification on their mobile device.

    This feature enhances security by reducing reliance on passwords and SMS-based OTPs, which are vulnerable to phishing and interception. Organizations can seamlessly integrate push authentication into existing authentication flows, improving user experience while strengthening protection against unauthorized access.

    Learn more about [push notification-based authentication]({{base_path}}/guides/authentication/mfa/add-push-auth-login/).

- **AI-powered development**

    WSO2 Identity Server 7.1.0 introduces **AI LoginFlow** and **AI Branding**, bringing automation and intelligence to identity and access management. Previously, administrators had to manually configure authentication sequences and customize login pages, a process that was often time-consuming and prone to errors. With AI LoginFlow and AI Branding, WSO2 Identity Server 7.1.0 leverages AI-driven natural language inputs to simplify these tasks, reducing manual effort while minimizing configuration errors. These features enhance both user and administrator experiences by streamlining authentication setup and branding customization.

    - **AI LoginFlow** - Lets administrators define authentication flows using natural language, simplifying complex configurations and reducing setup effort. Learn more about [AI LoginFlow]({{base_path}}/guides/authentication/login-flow-ai/).

    - **AI Branding** - Allows administrators to customize login pages using natural language, making it easy to create designs that match their organization's identity. Learn more about [AI Branding]({{base_path}}/guides/branding/branding-ai/).

- **Custom Authentication Service Extension**
    
    Administrators can now extend authentication capabilities by implementing custom authentication services. This enhancement offers greater flexibility in addressing diverse authentication requirements beyond the built-in authenticators.

- **Pre-Issue Access Token Service Extension** 
    
    Supports executing custom logic before issuing an access token, providing greater flexibility in the OAuth2 token issuance process. This enhancement allows administrators to,
    
    - Add, modify, or remove scopes.
    - Add, modify, or remove audience values. 
    - Modify or remove user attributes incorporated into the access token.
    - Add custom claims (only string, number, boolean, and string type arrays are allowed).
    - Update the validity period of the access token.

    By integrating this functionality, organizations can enforce additional security checks or customize token contents to align with specific requirements.
    
    Learn more about the [pre-issue access token action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-issue-access-token-action/).

- **Pre-update password service extension**

    Enables password validation during various password update flows. This can be achieved by integrating with credential intelligence services (such as `Have I Been Pwned` or `SpyCloud`) to check for compromised passwords or by enforcing allowed/disallowed password policies. This action is triggered in the following password update flows:

    - Self-Service Password Reset – The user initiates a password reset via the "Forgot Password" option and completes the recovery process.
    - Profile Update – The user updates their password through a self-service portal, such as the My Account application.
    - Admin-Initiated Password Reset – An administrator forces a password reset, requiring the user to set a new password.
    - Admin-Initiated User Invitation – An administrator invites a new user by resetting the password. The user then sets a new password as part of the registration flow.
    - Direct Admin Update – An administrator directly updates a user's password.

    Learn more about [pre-update password action]({{base_path}}/guides/service-extensions/pre-flow-extensions/pre-update-password-action/).

- **User Impersonation**

    User impersonation allows authorized personnel, such as support staff, to temporarily access another user's account without requiring their login credentials. This capability is crucial for troubleshooting, testing, and resolving user-reported issues efficiently.

    Business users can report issues through various channels, such as support tickets or direct communication with the support desk. Support personnel can then impersonate the affected user to investigate the reported issue, understand the actual flow, and gather additional information for further troubleshooting.

    Administrators can enable user impersonation within the same organization to streamline issue resolution and enhance support processes.
    
    Learn more about [user impersonation]({{base_path}}/guides/authorization/user-impersonation/).

- **Enhanced security and cryptographic capabilities**

    - **Post-Quantum TLS Support** 

        WSO2 Identity Server now supports the X25519MLKEM768 hybrid key exchange mechanism, enhancing TLS (Transport Layer Security) security against quantum computing threats.

        This feature integrates X25519MLKEM768, a hybrid key exchange algorithm that combines the classical X25519 elliptic curve key exchange with ML-KEM-768 (Kyber-768), a post-quantum cryptographic algorithm. By supporting this mechanism, WSO2 Identity Server can establish secure TLS connections with clients that implement X25519MLKEM768, ensuring resilience against both classical and quantum-based attacks.

        Learn more about [configuring post-quantum TLS]({{base_path}}/deploy/security/configure-post-quantum-tls/).

    - **AES-256 Support for Data Encryption**

        WSO2 Identity Server now supports AES-128, AES-192, and AES-256 encryption algorithms for internal data encryption. This enhancement provides greater flexibility in selecting encryption strength based on security and compliance requirements. 
    
        Learn more in [symmetric encryption]({{base_path}}/deploy/security/symmetric-encryption/).

    - **AES Encryption & Key Rotation Support for Cipher Tool** 

        WSO2 Identity Server now supports AES-based symmetric encryption in Secure Vault, complementing the existing keystore-based asymmetric encryption. Encryption is performed using an AES secret stored in the internal keystore, enhancing security and flexibility.
    
        Additionally, Cipher Tool now supports key rotation, enabling seamless transitions between symmetric and asymmetric encryption or updating keys within the same encryption mode.
    
        Learn more about [encrypting passwords with the Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool/).

- **OAuth 2.0 Rich Authorization Requests**

    Adds support for the OAuth 2.0 Rich Authorization Requests (RFC 9396) specification, allowing more granular authorization beyond traditional scopes. The `authorization_details` field is now supported in authorization requests, token requests, and introspection responses. Supported authorization details types are discoverable via the `.well-known` metadata endpoint, and additional types can be integrated using Java extensions.

    Learn more about [rich authorization requests]({{base_path}}/guides/authorization/rich-authorization-requests/#configuring-your-application-for-rar)

- **iProov as an MFA Option** 
    
    WSO2 Identity Server now supports iProov as a Multifactor Authentication (MFA) option, enabling seamless integration of secure facial biometrics into your authentication flows.
    
    Learn more about the [iProov connector](https://store.wso2.com/connector/identity-outbound-auth-iproov){: target="_blank"} in the [documentation](https://github.com/wso2-extensions/identity-outbound-auth-iproov/blob/main/docs/config.md){: target="_blank"}.

- **Sift fraud detection** 

    WSO2 Identity Server now supports Sift fraud detection integration, enabling real-time detection and prevention of fraudulent logins. By leveraging Sift’s risk scoring capabilities within the conditional authentication framework, organizations can enhance security without compromising user experience.
    
    Learn more about the [Sift connector](https://store.wso2.com/connector/identity-fraud-detection-sift){: target="_blank"} in the [documentation](https://github.com/wso2-extensions/identity-fraud-detection-sift/blob/main/docs/config.md){: target="_blank"}.

- **Onfido Identity Verification**

    WSO2 Identity Server now supports Onfido identity verification, enabling organizations to validate user identities in real time using trusted legal documents, such as passports, driving license and national IDs. By leveraging Onfido’s advanced document verification technology, organizations can enhance fraud prevention and ensure regulatory compliance.

    Learn more about the [Onfido connector](https://store.wso2.com/connector/identity-verification-onfido){: target="_blank"} in the [documentation](https://github.com/wso2-extensions/identity-verification-onfido/blob/main/docs/config.md){: target="_blank"}.

- **Secret Management for Conditional Authentication Scripts**

    Administrators can now securely store secrets in the WSO2 Identity Server Console and reference them when needed in conditional authentication scripts. Previously stored secrets can be accessed in authentication scripts using the secrets.{secret_name} syntax. For example:

    ```js
    var secretValue = secrets.secretName;
    ```

    This feature enhances the security and flexibility of authentication workflows by allowing sensitive values to be managed securely within scripts.
    
    Learn more about [secrets]({{base_path}}/guides/authentication/conditional-auth/configure-conditional-auth/#add-a-secret-to-the-script).


- **Enhanced organization management capabilities**

    - **B2B Organization Filtering & Discovery Improvements**

        Supports organization filtering using meta attributes, expanding beyond standard filters like name, ID, and parent organization. This enhancement enables more precise and flexible organization searches, improving management and discovery across complex organizational structures.
    
        Learn more about [searching for organizations]({{base_path}}/guides/organization-management/manage-organizations/#search-an-organization).


    - **Multiple Secondary User Store Configuration for Child Organizations**

        Extends support for configuring secondary user stores to child organizations, in addition to the previously supported root organizations. With this enhancement, each organization in a hierarchical structure can have its own dedicated user store, enabling independent management of users and groups.
    
        Learn more about it in [onboarding users]({{base_path}}/guides/organization-management/onboard-users/#onboard-users-from-a-secondary-user-store) documentation.

    - **Create OAuth 2.0 Applications directly within Organizations**

        Supports creating OAuth2 applications directly within organizations using the application management API. To complement this, role management capability is also extended to organizations. Additionally, API resources registered at the root organization level are now inherited by organizations.
    
        Learn more about [creating applications in organizations]({{base_path}}/guides/organization-management/organization-applications/).

    - **Email Domain-Based Organization Discovery for Self-Registration**

        Supports email domain-based organization discovery for self-registration. When enabled, users can enter an email address with a domain associated with a specific organization. The system then automatically identifies the corresponding organization, allowing users to seamlessly self-register within it.
    
        Learn more about [email domain based organization discovery]({{base_path}}/guides/organization-management/email-domain-based-organization-discovery/).

    - **Support for `login_hint` Parameter in Organization Discovery**
    
        Supports using the `login_hint` query parameter as an organization discovery hint in B2B scenarios. When a user’s email is provided in the `login_hint`, the system can automatically route them to their organization’s login page, streamlining authentication.
    
        Learn more about it in [email-domain based organization discovery]({{base_path}}/guides/organization-management/email-domain-based-organization-discovery/).

    - **Email and SMS Template Inheritance with Override Capability for Child Organizations**

        Introduces enhanced functionality for managing email and SMS templates across organizations. This feature enables child organizations to inherit email and SMS templates from a parent or ancestor organization while allowing them to override specific content as needed. This ensures that child organizations can maintain unique communication while preserving a consistent base template defined at the parent level.
    
        Learn more about it in [email branding]({{base_path}}/guides/branding/customize-email-templates/) and [SMS branding]({{base_path}}/guides/branding/customize-sms-templates/).

    - **Update and Resolve Shared User Profiles Across Organization Hierarchies**
    
        Improves the management of shared user profiles across multiple organizations. Previously, shared users had a single profile that couldn't be customized per organization. Now, administrators can update and resolve shared user profile attributes based on the organization hierarchy, providing greater flexibility and control over user data at different organizational levels.

        Learn more about [shared user profiles]({{base_path}}/guides/organization-management/share-user-profiles/).

    - **Share Users Across Organization Hierarchy with Role Assignment**

        Introduces the ability to share users across an organization hierarchy with role assignment. This feature allows administrators to share user profiles from a parent organization to child organizations while assigning specific roles during the process. Multiple sharing policies are now supported, providing greater flexibility. Administrators can choose to share users with all existing and future child organizations or selectively share users with specific organizations as needed. This enhancement simplifies user management by enabling centralized control over user roles and access across the organization hierarchy, improving both efficiency and security.
    
        Learn more about the [User Sharing API]({{base_path}}/apis/organization-user-share-rest-api/).

- **Application-specific branding**
    
    Supports application-specific branding, allowing businesses to customize branding for individual applications directly through the Console. Previously, branding was limited to the organization level, making it challenging to manage distinct branding across multiple applications. With this enhancement, enterprises can deliver a personalized user experience by defining unique branding for each application's login portal and user interface. In B2B scenarios, if an application lacks specific branding, it will inherit branding from the organization, parent organization, or default to WSO2 Identity Server branding, ensuring both flexibility and consistency.
    
    Learn more about it in [Configure UI branding]({{base_path}}/guides/branding/configure-ui-branding/).

- **Right-to-Left (RTL) Language Support**

    WSO2 Identity Server now supports Right-to-Left (RTL) language rendering in login and account recovery portals, enhancing accessibility for users of Arabic, Hebrew, Persian, and other RTL languages.

    This update ensures a seamless experience by automatically adapting UI components to RTL layouts, improving usability for users in the Middle East, North Africa, and other RTL language regions. By making authentication experiences more inclusive and user-friendly, this enhancement strengthens WSO2 Identity Server’s global reach.
    
    Learn more about [RTL language support]({{base_path}}/guides/branding/localization/#right-to-left-rtl-language-support).

- **Rule-Based Password Expiration**
    
    Supports rule-based password expiration, allowing administrators to define custom expiration policies based on user roles and groups. This feature provides flexibility in enforcing or bypassing password expiration based on specific conditions, ensuring better alignment with organizational security requirements. Additionally, rule prioritization helps resolve conflicts and streamline password management.
    
    Learn more about [rule-based password expiration]({{base_path}}/guides/account-configurations/login-security/password-validation/#rule-based-password-expiration).

- **Support for preservation of uniqueness of Attributes on Profile Creation and Updates**
    
    Supports attribute-wise uniqueness validation configuration, allowing administrators to define uniqueness constraints for attributes directly within the General tab. A new dropdown menu provides three options:
    - *None* – No uniqueness validation.
    - *Within User Store* – Ensures uniqueness within a specific user store.
    - *Across User Stores* – Enforces uniqueness across all user stores.

    Learn more about [configuring unique attributes]({{base_path}}/guides/users/attributes/configure-unique-attributes/).

- **Username recovery enhancements**

    - **Username recovery support for SMS channel**

        Extends username recovery support to the SMS channel, in addition to the previously supported email-based recovery. Administrators can now enable or disable recovery channels based on organizational preferences and offer users a choice between SMS and email for username recovery.
    
        Learn more about it in [Username recovery]({{base_path}}/guides/account-configurations/account-recovery/username-recovery/).

    - **Username Recovery When Email Address Is Not Unique**

        Supports username recovery even when the provided email address is associated with multiple user accounts. Previously, username recovery was only possible when the provided attributes uniquely identified a user. With this enhancement, users with non-unique email addresses can still recover their usernames. Administrators can enable or disable this behavior based on organizational requirements.
    
        Learn more about it in [Username recovery]({{base_path}}/guides/account-configurations/account-recovery/username-recovery/).

- **On-Demand Silent Password Migration**

    Supports on-demand silent password migration, enabling seamless password migration from an existing system without user disruption. During login, user credentials are verified against the existing system, and passwords are securely migrated to the Identity Server. This process leverages a conditional authentication script and external REST services to authenticate users and transfer credentials without requiring additional user action. 
    
    Learn more about [on-demand silent password migration]({{base_path}}/guides/users/migrate-users/migrate-passwords/).

- **Notification Template Management API**

    WSO2 Identity Server now supports managing both Email and SMS notification templates through the Notification Template Management API. Previously, API support was limited to email templates, but with this update, organizations can manage both email and SMS templates seamlessly using the same API, improving flexibility and consistency in notification management.

    Learn more about the [notification template management API]({{base_path}}/apis/notification-templates/).

- **Certificate Validation Management API**

    WSO2 Identity Server introduces the Certificate Validation Management API to eliminate registry dependencies for managing X.509 authenticator validators and certificate configurations. This new RESTful API enables seamless management of certificate validation configurations, improving flexibility and ease of integration.

    Learn more about the [Certificate Validation Management REST API]({{base_path}}/apis/certificate-validation-management-rest-api/).

- **Seamless Third-Party SSO Integration with Ready-to-Use Templates**

    Adds built-in support for third-party Single Sign-On (SSO) configurations, streamlining the integration process with popular enterprise applications. This enhancement introduces ready-to-use SSO templates, similar to our existing application templates, reducing manual configuration and providing step-by-step guidance for vendor-side setup. With this release, administrators can seamlessly integrate Identity Server with leading service providers using the following pre-configured SSO templates:

    - Google Workspace
    - Microsoft 365
    - Salesforce
    - Zoom
    - Slack

    Learn more about [SSO integrations]({{base_path}}/guides/authentication/sso-integrations/).

- **SMS Template Management UI**
    
    Introduces a dedicated SMS Template Management UI, allowing administrators to create, customize, and localize SMS notifications to align with their organization's branding and communication needs. This enhancement enables per-tenant customization through the management console or APIs, ensuring a more personalized and engaging user experience.

    Learn more about [customizing SMS templates]({{base_path}}/guides/branding/customize-sms-templates/).

- **Java 21 runtime support**

    WSO2 Identity Server 7.1.0 is now compatible with Java 21 runtime compatibility and BouncyCastle keystore integration, enhancing security and performance. Java 21, the latest LTS version, ensures long-term support and stability, while replacing the JDK keystore with BouncyCastle strengthens cryptographic operations. Extensive performance testing confirms improved efficiency with JDK 21 compared to JDK 11, delivering a more optimized runtime environment.

- **Tenant management UI**
    
    The new Tenant Management UI in WSO2 Identity Server 7.1.0 simplifies multi-tenancy administration, providing a more efficient management experience. By default, the server is configured with a single root organization, `carbon.super`. With the necessary permissions, administrators can now create and manage multiple root organizations, maintaining isolated user bases within a single server or cluster. This capability is now accessible through the new Console, simplifying tenant management.

    Learn more about [tenant management]({{base_path}}/guides/multitenancy/manage-tenants/).

- **JWT Access Token Attributes Configuration**
    
    With this enhancement, user attributes configured in the **User Attributes** section will no longer be automatically included as access token attributes. Instead, the **Access Token** section now provides an option to explicitly select which attributes should be included in the token. The selected attributes will be added to the JWT access token without requiring explicit requests. This change applies only to newly created applications by default. For existing applications, the updated behavior can be enabled by updating the application settings.
    
    Learn more about it in [OIDC configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token).

- **Support for Multiple Email Addresses & Phone Numbers Per User**

    Supports multiple email addresses and phone numbers per user, allowing users to register multiple contact points in their profiles. Users can designate a primary email and phone number, which will be used for notifications and OTPs. If verification is enabled, only verified contact details can be set as primary, ensuring security and reliability in communication.
    
    Learn more about [assigning multiple email address and mobile numbers]({{base_path}}/guides/users/attributes/manage-attributes/#assign-multiple-email-addresses-and-mobile-numbers-to-a-user).

## Deprecated features

In WSO2 Identity Server 7.1.0, we have deprecated several features to enhance security, streamline operations, and improve overall usability. These deprecations align with our commitment to maintaining a robust and future-ready platform. Below is a list of deprecated features along with recommended actions for users. Learn more about [WSO2 Identity Server Feature Deprecation]({{base_path}}/references/wso2-identity-server-feature-deprecation/).

- **Password Expiring User Identification Rest API**
    
    With the introduction of rule-based password expiration, administrators can now define password expiration rules based on user roles and groups, offering more granular control over password policies. As part of this enhancement, As part of this enhancement, the Password Expiring User Identification REST API has been deprecated and WSO2 Identity Server now exposes the `passwordExpiryTime` attribute directly through the SCIM2/Users API.

    **Recommended action** - Use the SCIM2 API to retrieve password expiration details directly via the `passwordExpiryTime` attribute.

- **Built-in support for XACML**
    
    WSO2 Identity Server has extracted out as a connector built-in XACML support.
    
    **Recommended action** - If you still require XACML functionality, you can integrate the [XACML connector](https://store.wso2.com/connector/identity-application-authz-xacml){: target="_blank"} into {{product_name}}. Learn more about it in the [documentation](https://github.com/wso2-extensions/identity-application-authz-xacml/blob/master/README.md){: target="_blank"}.
         
- **loginContext API**
    
    The loginContext API, previously used to check for valid sessions, has been deprecated in WSO2 Identity Server 7.1.

    **Recommended action** - To check for an active session, use the `/api/identity/auth/v1.1/data/` API instead.

- **Email template management API V1 & V2**

    The Email Template Management API, previously used to manage organization and application-level email templates, has been deprecated.

    **Recommended action** - Use the Notification Templates API instead. Learn more about the [notification template management API]({{base_path}}/apis/notification-templates/).


- **LDAP-based multi-attribute login**
    
    WSO2 Identity Server 7.1 has deprecated the LDAP-based multi-attribute login feature.

    **Recommedned action** - If you need to enable multi-attribute login, follow instructions in [multi-attribute login]({{base_path}}/guides/authentication/multi-attribute-login/) to set it up with {{product_name}} 7.1.0.

- **Carbon Registry**

    With WSO2 Identity Server 7.1, the Carbon Registry, previously used as a data repository, has been deprecated. Registry dependencies have been removed from the WSO2 Identity Server, and the registry core is planned for removal in a future release, streamlining the system and reducing legacy components.

- **Carbon Security Manager**

    The Carbon Security Manager, which was based on the Java Security Manager, has been deprecated in WSO2 Identity Server 7.1.0. This change follows the deprecation of the Java Security Manager in Java 17 and its planned removal in future Java versions.

## Deprecated configurations

- **use_client_id_as_sub_claim_for_app_tokens & remove_username_from_introspection_response_for_app_tokens**

    These configurations were introduced in Identity Server 7.0 to ensure backward compatibility for the following features:
        1. Setting the sub attribute of an application token as the client ID
            - Previous Behavior: The sub attribute was set to the application owner's UUID.
        2. Excluding the username from the introspection response for application tokens
            - Previous Behavior: The introspection response included the username.

    With Identity Server 7.1, these configurations will be deprecated, as backward compatibility is now handled through the application versioning feature. Any application version higher than v0.0.0 will behave as if both configurations are set to true.

## Deprecated and retired connectors

??? note "Deprecated connectors"

    - Github


??? note "Retired connectors"

    - JWT SSO Inbound Authenticator
    - Nuxeo
    - SAML Authenticator
    - SCIM 2.0 Inbound Provisioning Connector
    - Mobile Connect
    - Pinterest Authenticator
    - FIDO Authenticator
    - X509
    - SCIM Provisioning Connector
    - Salesforce Provisioning Connector
    - SPML Provisioning Connector
    - Google Provisioning Connector
    - Inwebo
    - RSA
    - Passive-STS Federated Authenticator
    - OpenID Connect Authenticator
    - Yahoo Authenticator
    - Google Authenticator
    - Facebook Authenticator
    - JWT
    - Token2
    - Basecamp
    - Foursquare
    - Twitter
    - MailChimp
    - Office365
    - MePIN
    - Dropbox
    - Yammer
    - EmailOTP
    - Bitly
    - SMSOTP
    - TOTP

## Fixed issues

For a complete list of issues fixed in this release, see [WSO2 IS 7.1.0 - Fixed Issues](https://github.com/wso2/product-is/issues?q=state%3Aclosed%20project%3Awso2%2F113){:target="_blank"}.

## Known issues

For a complete list of open issues related to the WSO2 Identity Server, see [WSO2 IS - Open Issues](https://github.com/wso2/product-is/issues){:target="_blank"}.


