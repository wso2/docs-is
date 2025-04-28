# About this Release

WSO2 Identity Server 6.0.0 is the latest WSO2 Identity Server (WSO2 IS) release and is the successor of WSO2 Identity Server 5.11.0.

## What's new in this release?

WSO2 IS 6.0.0 contains the following new features and enhancements:

-   **Integration with TypingDNA**

    TypingDNA is a behavioral biometrics vendor and a pioneer in delivering typing biometrics technology as an API for user-friendly authentication to businesses across cybersecurity, finance, education, and retail. The vendor leverages typing biometrics to provide customers with a seamless, user-friendly, risk-based authentication (RBA) experience to enhance security and fraud detection.

    [Learn more]({{base_path}}/guides/adaptive-auth/typingdna-based-adaptive-auth/)

-   **Integration with ELK for identity analytics** 

    Easy integration with ELK to view login and session-related analytics data. 

    [Learn more]({{base_path}}/guides/elk-analytics/elk-analytics/)

-   **Multi-attribute login support** 

    This simplifies user sign-in by allowing users to sign in with their preferred attributes such as email, phone number, or username as the login identifier.

    [Learn more]({{base_path}}/guides/login/multi-attribute-login/)

-   **Device flow support** 

    This expands the range of devices an organization can use within their overall solution by including devices with limited user input capabilities (such as smart TVs which do not have keyboards). With device flow support, users can leverage other devices, such as smartphones, to complete login on a device with limited input.

    [Learn more]({{base_path}}/guides/access-delegation/try-device-flow/)

-   **PBKDF2 hashing for user passwords**

    This is a simple cryptographic key derivation function, which is resistant to brute force attacks. PBKDF2 is recommended by NIST and PBKDF2 is required to achieve FIPS-140 compliance.

    [Learn more]({{base_path}}/deploy/secure-userstore-using-pbkdf2/)

-   **Java 17 Runtime compatibility**

    Java 17 is the latest LTS release of Java. Premier support of Java 11 is supposed to end in September 2023. WSO2 Identity Server 6.0.0 distribution is compatible with Java 17 runtime.

    [Learn more]({{base_path}}/deploy/environment-compatibility/)

-   **Authentication SDKs**

    SDKs allow you to integrate web or single-page applications easily with WSO2 Identity Server and OpenID Connect while adhering to security best practices. The following SDKs are supported:

    - [React SDK]({{base_path}}/sdks/start-integrating-apps/integrate-a-react-app/)
    - [Angular SDK]({{base_path}}/sdks/start-integrating-apps/integrate-an-angular-app/)
    - [JavaScript SDK]({{base_path}}/sdks/start-integrating-apps/integrate-a-js-app/)

-   **Passwordless authentication with Magic Link**

    Magic Link is a form of passwordless authentication. It allows users to log in by clicking a link sent to their email instead of entering a password.

    [Learn more]({{base_path}}/guides/passwordless/magic-link/)

-   **FIDO attestation validations**

    FIDO attestation validations allow you to further validate the FIDO2 authenticator data during the security key registration.

    [Learn more]({{base_path}}/guides/passwordless/fido-attestation/)

-   **Federated IDP Initiated OIDC Back-Channel Logout**

    When it comes to OIDC identity federation in identity server, WSO2 IS acts as a Relying Party (RP) to the federated identity provider. However, currently, there is no mechanism to terminate the sessions and revoke tokens in WSO2 IS (RP) whenever there is a session update on the federated IDP (OP) side. 
    
    The OIDC Back Channel Logout v1.0 spec defines a mechanism for communicating logout requests to all RPs that have established sessions with an OP. This mechanism relies upon direct communication of such requests between OP and RPs bypassing the User-Agent. It imposes new requirements that RPs have a logout endpoint that is reachable by the OP. This feature will enable that capability in WSO2 Identity Server.

    [Learn more]({{base_path}}/guides/login/oidc-federated-idp-initiated-logout/)

-   **Support for rotating symmetric encryption key**

    This is an external tool that re-encrypts internal data after rotation of the configured symmetric data encryption key. You can use this tool to re-encrypt the identity and registry databases and other configuration files as user store configurations. Additionally, the tool can sync end-user data that gets generated in the live system with minimum downtime.

    [Learn more]({{base_path}}/deploy/security/blue-green-data-encryption-keyrotation/)

-   **Remove the dependency on cookies for OIDC flows when extending the IdP session**

    This is a solution to overcome the restrictions (due to third-party cookie limitations by browsers such as Safari) to extend IDP sessions when application and IDP origins differ from each other. This serves as an alternative to passive authentication requests that would no longer work in impacted browsers.

    [Learn more]({{base_path}}/apis/idp-session-extender-endpoint/)
	
-   **Auto login after self-registration**

    In the self-registration flow, the user is asked to re-enter password credentials after the user is verified using email. With this feature, after the user is verified by clicking the verification mail, the user is logged in immediately without having to re-enter credentials.

    [Learn more]({{base_path}}/guides/identity-lifecycles/self-registration-workflow/)

-   **Enhanced login portal and my account**

    Hides UI widgets based on tenant-level account management configuration preferences such as self-registration and account recovery. This dynamically changes the UI elements according to the tenant-level configurations. For example, if self-registration is not enabled for the tenant, the self-registration link is hidden on the login page.

-   **reCAPTCHA v3 and invisible reCAPTCHA v2 support**

    Improved  security against spam and fraudulent activity with an enhanced reCAPTCHA user experience compared to the conventional "I'm not a robot" checkbox.

    [Learn more]({{base_path}}/deploy/configure-recaptcha/)

- **Customized login pages for users**

    Easily personalize login, registration, recovery, and single sign-on interfaces with custom layouts and branding.

    [Learn more]({{base_path}}/references/extend/rebranding/customizable-login-portal/)

## What has changed in this release?

If you are moving to WSO2 Identity Server 6.0.0 from a previous version, note that several capabilities that existed previously are now improved in WSO2 IS 6.0.0.

Learn moe about [upgrading to WSO2 IS 6.0.0]({{base_path}}/deploy/upgrade/upgrade-wso2-is/) for details.

## Beta features

-   **React-based console application** 

    Includes developer and administrator views to manage and maintain the features offered by WSO2 Identity Server. This is an ongoing effort to improve the user experience with the product. 
    
    To try out the React-based console, start WSO2 Identity Server, and access the following URL: `https://localhost:9443/console`.

-   **Tenant-qualified URLs**
    
    Provides the option of switching to tenant-qualified endpoints, which consistently qualifies every URL/endpoint of WSO2 Identity Server with the tenant in a path parameter. This improves flexibility for tenant-wise sharding and branding compared to previous releases.

-   **Managing CORS configurations tenant-wise**

    The CORS configurations can be made at the application level and enforced at the tenant level.

## Removed features

The following features are removed from WSO2 Identity Server 6.0.0.

-   H2 Console
-   Embedded LDAP user store
-   Carbon metrics
-   Yahoo authenticator 
-   Legacy OpenID authentication
-   reCAPTCHA v2 "I'm not a robot" Checkbox
-   Hazelcast DNS based pod discovery in Kubernetes membership scheme

## Deprecated features

The following capabilities are deprecated in WSO2 Identity Server 6.0.0, which means they will be removed in a future release. Learn more about [WSO2 Identity Server Feature Deprecation]({{base_path}}/references/wso2-identity-server-feature-deprecation/).

-   SCIM 1 inbound provisioning 

    **Recommendation**: Use SCIM 2.0 inbound provisioning

-   SCIM 1 outbound provisioning 

    **Recommendation**: Use SCIM 2.0 outbound provisioning 

-   SOAP APIs

    **Recommendation**: Use REST-based APIs

-   Legacy DCR endpoint implementation (/identity/register)

    **Recommendation**: Use /identity/oauth2/dcr/v1.1

## Announcements

The following features currently available out-of-the-box in WSO2 Identity Server will be made available as connectors in the next release. These connectors will be available on demand.
-   Workflow engine 
-   User managed access (UMA)

The on-prem WSO2 Identity Server Analytics solution (based on WSO2 Streaming Processor) will be deprecated with the next immediate WSO2 Identity Server release. In WSO2 IS 6.0.0, ELK-based analytics is introduced as the alternative analytics solution.

## Fixed issues

For a complete list of fixed issues related to this release, see [WSO2 IS Runtime - Fixed Issues](https://github.com/wso2/product-is/milestone/229?closed=1).
	
## Known issues

For a complete list of open issues related to the WSO2 Identity Server runtime, see [WSO2 IS Runtime - Open Issues](https://github.com/wso2/product-is/issues).
