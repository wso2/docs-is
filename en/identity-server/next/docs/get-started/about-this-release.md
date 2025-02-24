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

### Additional enhancements











<!-- - **Productized Support for B2B CIAM Use Cases**

    WSO2 Identity Server now enables secure access for your B2B business customers with flexible organization management capabilities. B2B CIAM is the identity foundation that helps organizations that work with business customers, franchises, distributors and suppliers get their apps and services to market quickly and securely.

    **Key Highlights:**
  
    - Onboard enterprise IDP, or invite users to register at organizations
    - Configure varied login options for organizations
    - Hierarchical organization management
    - Delegated administration
    - Different branding for organizations
    - Resolve organization at login as the user inputs the organization name, based on the user’s email domain mapped for a particular organization or based on a query or path parameter in the URL
  
    [Learn more]({{base_path}}/guides/organization-management/)

- **Authentication API for App-Native Authentication**

    This release introduces an API-based authentication capability, allowing developers to implement complete authentication workflows within their applications, focusing on enhanced user experience.
  
    **Key Highlights:**
  
    - A flexible API containing all necessary details to render UIs inside the application itself
    - Support for handling authentication orchestration logic at the WSO2 Identity Server  without taking that overhead to the application (e.g: Based on the device the user logs in to the app, prompt the second factor)
    - APIs based on OAuth 2.0/Open ID Connect standards, requiring no browser support
    - Ensures identity and proof of possession of the client in handling authentication credentials

    [Learn more]({{base_path}}/guides/authentication/add-application-native-login/)

- **OAuth 2.0 Specifications**

    WSO2 Identity Server now supports the following OAuth 2.0 specifications, designed for protecting APIs exposing high-value and sensitive data:
  
    - [JWT Secured Authorization Response Mode](https://openid.net/specs/oauth-v2-jarm.html){:target="_blank"}
    - [Pushed Authorization Requests](https://www.rfc-editor.org/rfc/rfc9126.html){:target="_blank"}

- **Compliance with FAPI 1.0 Profiles**

    WSO2 IS is now compliant with FAPI 1.0 [Baseline](https://openid.net/specs/openid-financial-api-part-1-1_0.html){:target="_blank"} and [Advanced](https://openid.net/specs/openid-financial-api-part-2-1_0.html){:target="_blank"} profiles, ensuring secure and compliant financial services operations.

    **Key Highlights:**
  
    - Create FAPI compliant applications from DCR. This validates FAPI enforcements a FAPI compliant application should have like Software Statement Assertions(SSA) validation that ensures the third party is trusted with the regulatory body of the region
    - Support for certificate bound access tokens.
    - Support for pairwise subject identifiers
    - Enforcing request object validations for FAPI compliance
        - Mandate sending a request object in the authorization request passed via the request or request_uri parameter.
        - Mandatory request object parameter validations (scope, redirect_uri, nonce)
        - Request object signing algorithm restriction (PS256, ES256)
    - Mandate PKCE for PAR
    - Enforce nbf & exp claim validations
    - Enforcing FAPI allowed client authentication methods and signature algorithms

- **First-Class Support for Securing API Resources**

    Comprehensive support for API Authorization via RBAC is now available, allowing easy representation, subscription, and role-based access control for API resources.

    **Key Highlights:**
  
    - Easily represent API Resources and scopes associated with your applications.
    - Seamlessly subscribe API Resources to applications.
    - Define roles collecting API scopes.
    - Enable RBAC when authorizing APIs.
    - Role assignment for users and groups connected from various sources (from user stores, from external IdPs)
    - Role-Based scope validation during token issuing.

    [Learn more]({{base_path}}/guides/authorization/api-authorization/api-authorization/)

- **Command line utility to manage Identity Server configurations in CI/CD workflows**

    Efficiently manage WSO2 Identity Server configurations across CI/CD workflows with a command-line utility, designed to promote configurations from development to higher environments seamlessly.
  
    [Learn more]({{base_path}}/deploy/promote-configurations/)

- **FIPS 140-2 Compliance**

    WSO2 Identity Server is now FIPS compliant.FIPS (Federal Information Processing Standard) is a standard created by the National Institute of Standards and Technology’s (NIST’s) Computer Security Division. FIPS established a data security and computer system standard that organizations must adhere to per the Federal Information Security Management Act of 2002 (FISMA). Compliance in the Identity Server helps your deployment to be compliant and certified for FIPS.

    [Learn more]({{base_path}}/deploy/enable-fips-for-is/)

- **HYPR for Passwordless and Biometric Authentication**

    WSO2 Identity Server now offers the HYPR connector as an authentication option for applications, enabling passwordless and biometric authentication to enhance security and user experience. It is available as a IS 7.0.0 compatible connector in the [connector store](https://store.wso2.com/store/assets/isconnector/details/9fae98d3-26a6-4b1f-a356-f58b08d060ed){:target="_blank"}.
  
    [Learn more](https://github.com/wso2-extensions/identity-outbound-auth-hypr){:target="_blank"}

- **Branding and i18n Support**

    Easily brand and localize end-user facing UIs and email templates for a consistent and unified user experience.
  
    [Learn more]({{base_path}}/guides/branding/)

- **Email and SMS OTP for Passwordless Login**

    Enhanced email and SMS OTP authentication options are now available for passwordless login, with a simplified configuration process.

    **Key Highlights:**
  
    - This release contains a new implementation of email and SMS OTP authenticators, removing the requirement to configure an identity provider and simplifying the configurations.
    - New implementation also enables using email and SMS OTP as passwordless login options
    - Previous implementations of email and SMS OTP authenticators are now deprecated.

    [Learn more]({{base_path}}/guides/authentication/passwordless-login/)

- **Idle Account Identification API**

    An API is now available to identify and manage idle user accounts, supporting notifications, locks, or deletions based on inactivity.
  
    [Learn more]({{base_path}}/apis/idle-accounts-identification-rest-api/)

- **Client-Id for OIDC RP-Initiated Logout**

    Support for sending the `client_id` to perform the logout request, providing flexibility in logout requests for relying parties.

    [Learn more]({{base_path}}/guides/authentication/oidc/add-logout/)

- **Email Magic Link Login from Different Browsers**

    The email magic link authenticator now supports logging in from a different browser, enhancing flexibility and user experience.
  
    [Learn more]({{base_path}}/guides/authentication/passwordless-login/add-passwordless-login-with-magic-link/)

## What has changed in this release?

If you are moving to WSO2 Identity Server 7.0.0 from a previous version, note that several capabilities that existed previously are now improved in WSO2 IS 7.0.0.

Learn more about [upgrading to WSO2 IS 7.0.0]({{base_path}}/deploy/upgrade/upgrade-wso2-is/) for details.

## Deprecated features

In the latest release of WSO2 Identity Server 7.0.0, we have deprecated several features to streamline operations, enhance security, and improve the user experience. These changes are part of our ongoing efforts to keep our platform robust and forward-compatible. Below, you will find details on the deprecated features and the recommended actions for users. Learn more about [WSO2 Identity Server Feature Deprecation]({{base_path}}/references/wso2-identity-server-feature-deprecation/).

- **Management Console**

    The Management Console has been deprecated in favor of the new Console UI, which offers a refreshed look and feel.

    It is now only available for a subset of features which are still not available in the new console. This includes XACML policy administration and editor, workflow configurations, key store management, registry configurations, tenant management, consent purpose management, and function libraries.
  
    **Recommendation**: Transition to the new [Console UI]({{base_path}}/guides/your-is/manage-console-access/) for all functionality other than what’s made default available in the carbon-based management console.

- **Identity Provider Based Email and SMS OTP Implementation**

    To simplify configurations, the previous implementation is deprecated in favor of new Email and SMS OTP authenticators.
  
    **Recommendation**: Adopt the new [Email]({{base_path}}/guides/authentication/mfa/add-emailotp-login/) and [SMS OTP]({{base_path}}/guides/authentication/mfa/add-smsotp-login/) implementation.

- **Password Expiry Connector**

    An in-built password expiry feature at the organization level now replaces the need for a separate authenticator in the login flow.
  
    **Recommendation**: Utilize the in-built [password expiry]({{base_path}}/guides/account-configurations/login-security/password-validation/) feature.

- **Userstore Level Password Patterns**

    Managing password patterns at the userstore level has been deprecated due to its complexity, moving to a tenant-level configuration.
  
    **Recommendation**: Implement tenant-level [password patterns]({{base_path}}/guides/account-configurations/login-security/password-validation/).

- **Account recovery with challenge questions**

    With the trend in the industry in moving away from the challenge question based account recovery use cases, this feature is deprecated and removed from the default distribution as a connector.

    **Recommendation**: Move to stronger account recovery options. The product capability is made available as a connector in the [connector store](https://store.wso2.com/store/assets/isconnector/details/1f79b51f-acae-4365-83ab-a2f1a6b690f9){:target="_blank"} for use during the transition.

- **Lite User Registration**

    This feature is deprecated as it does not align with the primary purpose of creating user accounts in the WSO2 Identity Server.

- **Idle Account Notification and Suspension**

    This feature is recommended to be managed with an external scheduler due to its complexity in a multi-node setup.
  
    **Recommendation**: Integrate with an external scheduler like [Azure Logic Apps](https://learn.microsoft.com/en-us/azure/logic-apps/concepts-schedule-automated-recurring-tasks-workflows){:target="_blank"} or [Choreo scheduled integration](https://wso2.com/choreo/docs/develop-components/develop-integrations/develop-a-scheduled-task/){:target="_blank"}.

- **User Account Recovery v1 API**

    Deprecated in favor of a more user-friendly v2 API.
  
    **Recommendation**: Use [User Account Recovery v2 API]({{base_path}}/apis/user-account-recovery-v2-rest-api/).

- **Consent Purpose Management and Prompting Consents at Sign-Up**

    The consent management purpose which can be attached at sign up is an incomplete implementation. We are moving out from providing this capability and planning to improve the product to provide OOTB capability to update marketing systems or consent and preference management systems on consent collected at registration. For example, collect ToS, privacy policy, and any marketing-related consents at registration and update respective systems that manage consent policies and challenge back to the user to collect consents if new policy versions are rolled out.
    
    WSO2 Identity Server will keep supporting consent management requirements in the following scenarios where a user will interact with a third-party application and will improve in associated use cases towards the direction of [open data ecosystems](https://openid.net/final-version-of-open-banking-and-open-data-ready-to-cross-borders-whitepaper-published/){:target="_blank"}.
    
    - In requirements where the user is sharing PII with third-party apps
    - In requirements where the user has to knowingly authorize third-party apps to access his/her data based on OAuth 2.0 scopes defined.

- **SaaS Application Configuration**

    Deprecated due to the introduction of productized B2B capabilities.
  
    **Recommendation**: Leverage productized [B2B capabilities]({{base_path}}/guides/organization-management/).

- **Request Path Authentication**

    Deprecated in favor of API-based authentication.
  
    **Recommendation**: Implement [app-native authentication]({{base_path}}/guides/authentication/add-application-native-login/) through the Authentication API.

- **Multiple Inbound Protocols in a Single Application**

    Only a single inbound authentication protocol configuration is supported going forward.
  
    **Recommendation**: Use multiple applications for different protocols.

- **Multiple Authenticators in a Single Connection**

    Deprecated in favor of a single authenticator configuration per connection.
  
    **Recommendation**: Employ multiple connections for different authenticator configurations.

- **Product Profile Support**

    "is", "worker", and "workflow" profiles are deprecated.
  
    **Recommendation**: Default to the standard product profile.

- **Unused Claim Dialects**

    Below claim dialects are now deprecated and removed from the product. However they will continue to be available in the already created tenants if you are migrating from a previous release.
      
    - Attribute Exchange Schema 
    - eIDAS

- **scim2/Roles API**

    We have enhanced the permission assignment of roles to include permissions of both Identity Server system APIs and business application APIs which are denoted as scopes.

    Further, In the prior versions of Identity Server, role management was limited to the organization level. In this release, roles can be created for both application-level and organization-level purposes.

    **Recommendation**: Use [scim2/v2/Roles API]({{base_path}}/apis/roles-v2-rest-api/).

- **Authentication Endpoint URL Branding**

    Deprecated in favor of using a load balancer for URL rewriting.
  
    **Recommendation**: Use a load balancer to rewrite the URL.

- **Configuration to Control Request Parameters to the Authentication Endpoint**

    The configuration `[authentication.endpoint.query_params]` which is used to control the request parameters going to the authentication endpoint previously is now deprecated.
  
    **Recommendation**: Use `[authentication.endpoint.redirect_params]` configuration.

- **Microprofile JWT 1.0**

    This specification focused on providing role-based access control for microservices which is now deprecated in favor of API Authorization via RBAC capabilities.
  
    **Recommendation**: Adopt [API Authorization]({{base_path}}/guides/authorization/api-authorization/api-authorization/) via RBAC.

## Fixed issues

For a complete list of issues fixed in this release, see [WSO2 IS 7.0.0 - Fixed Issues](https://github.com/wso2/product-is/issues?q=label%3AFixed%2F7.0.0+is%3Aclosed){:target="_blank"}.

## Known issues

For a complete list of open issues related to the WSO2 Identity Server, see [WSO2 IS - Open Issues](https://github.com/wso2/product-is/issues){:target="_blank"}. -->
