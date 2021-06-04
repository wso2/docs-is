# Introduction to SAML

## What is SAML?

SAML stands for Security Assertion Markup Language, which is an XML-based data format for exchanging authentication and authorization data between an identity provider and a service provider. The most important requirement that SAML addresses is web browser single sign-on (SSO). Three main roles are defined in SAML specification.

1. **The principal:** This is typically the user who tries to access a protected resource or service of a service provider.

2. **The identity provider:** An identity provider (IdP) is responsible for authenticating users and issuing assertions which include authentication/authorization decisions and user attributes.

3. **The service provider:** A service provider(SP) consumes the assertions issued by the identity provider and provides services to the principals.
The main use case scenario covered by SAML is the principal (the user) requesting access to resource or service from the service provider. Then the service provider uses SAML to communicate with the identity provider and obtain an identity assertion. The service provider makes the access control decision, depending on this assertion.

SAML 2.0 is the latest version of SAML, which uses security tokens containing assertions to pass information about a user between an identity provider and a service provider.

---

## The flow

In a web browser-based SSO system, the flow can be triggered by the user, either by attempting to access a service at the service provider or by directly accessing the identity provider itself.

- If the user accesses a service at a service provider:

    1. The service provider determines which identity provider to use (given that there are multiple identity providers). The SAML identity provider [discovery profile](http://docs.oasis-open.org/security/saml/Post2.0/sstc-saml-idp-discovery.pdf) is used to do this.

    2. The service provider generates a SAML message and then redirects the web browser to the identity provider along with the message.

    3. The identity provider authenticates the user.

    4. The identity provider generates a SAML message and then redirects the web browser back to the service provider.

    5. The service provider processes the SAML message and decides to grant or deny access to the user.

- If the user accesses the identity provider directly, only steps c, d, and e of the flow are executed. 

The message must contain an element that uniquely identifies the service provider who created the message. Optionally, the message may contain elements such as Issuer, NameIDPolicy, etc. For more information regarding the message, see the [SAML Core Specification](https://www.oasis-open.org/committees/download.php/35711/sstc-saml-core-errata-2.0-wd-06-diff.pdf).


!!! info "Related topics"
    - [Article: Introduction to SAML 2.0 ](https://wso2.com/library/articles/2014/02/introduction-to-security-assertion-markup-language-2.0/)
    - [Guide: Enable Login for a SAML Application](../../../../guides/login/webapp-saml)
    - [Demo: SAML Authentication](../../../../quick-starts/webapp-saml-sample)
    - [Guide: Enable Single Sign-On for a SAML Application](../../../../guides/login/sso-for-saml)
    - [Demo: Single Sign-On for a SAML Application](../../../../quick-starts/sso-for-saml-apps)