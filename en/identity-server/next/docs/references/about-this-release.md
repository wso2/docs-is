# About this Release

WSO2 Identity Server 7.0.0 is the latest WSO2 Identity Server (WSO2 IS) release and is the successor of WSO2 Identity Server 6.1.0.

## What's new in this release?

WSO2 Identity Server 7.0.0 introduces a range of new features and enhancements:

- **Refreshing Look and Feel for the Console UI**

    The console has received a major upgrade with our brand-new, lightning-fast [Oxygen UI](https://wso2.github.io/oxygen-ui/){:target="_blank"}! The beta console UI, accessible via `https://<hostname>:<port>/console`, introduced in version 5.11.0, is now available for production usage for administrative and developer tasks.

    With this upgrade, concepts such as service providers, identity providers, inbound/outbound authentication, previously utilized in the Carbon-based management console, have evolved into 'applications' and 'connections', respectively. WSO2 Identity Server 7.0.0 introduces application templates for Single Page Applications (SPAs), web applications with server-side rendering, mobile applications, and machine-to-machine (M2M) applications. It also offers a variety of authentication options, including social login, multi-factor authentication (MFA), passwordless authentication, etc., which can be selected from the available connections.

    [Learn more]({{base_path}}/guides/your-is/manage-console-access/)

- **Productized Support for B2B CIAM Use Cases**

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

For a complete list of open issues related to the WSO2 Identity Server, see [WSO2 IS - Open Issues](https://github.com/wso2/product-is/issues){:target="_blank"}.
