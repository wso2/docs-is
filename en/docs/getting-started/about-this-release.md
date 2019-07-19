# About this release

### What is new in this release

WSO2 Identity Server (WSO2 IS) version **5.8.0** is the successor of
version **5.7.0,** and contains the following new features and
enhancements:

-   Support for [OpenID Connect backchannel
    logout](../../using-wso2-identity-server/openid-connect-single-logout).
-   Support for [SAML frontchannel
    logout](../../tutorials/configuring-SAML-2.0-Web-SSO/).
-   Improvements for [product
    observability](../../using-wso2-identity-server/working-with-product-observability).
-   Support for [X509 certificate-based
    authentication](../../connectors/configuring-x509-authenticator-with-ssl-termination)
    for passing the client certificate in the request header from the
    proxy over SSL tunneling.
-   Support for [issuing access tokens per token
    request](../../using-wso2-identity-server/issuing-new-tokens-per-request).
-   Support for [configuring a JWKS endpoint for a OAuth or OIDC based
    service provider](../../using-wso2-identity-server/private-key-jwt-client-authentication-for-oidc).
-   Support for [configuring SAML metadata validity period for the
    resident identity provider](../../using-wso2-identity-server/adding-and-configuring-an-identity-provider/#exporting-saml2-metadata-of-the-resident-idP)
-   Includes [OAuth transaction logs](../../using-wso2-identity-server/oauth-transaction-logs) for
    token generation and introspection.
-   Supports recaptcha for [password recovery](../../using-wso2-identity-server/configuring-reCaptcha-for-password-recovery) and
    [username recovery](../../using-wso2-identity-server/configuring-reCaptcha-for-username-recovery).

### What has changed in this release

The design architecture of the current data publishers in WSO2 Identity
Server (i.e. the `         analyticsSessionDataPublisher        `,
`         analyticsLoginDataPublisher        ` and
`         AuthenticationAuditLogger        ` ) have been deprecated and
changed in this release.The new implementation consists of event
handlers that subscribe to authentication events.

For more information, see [Migrating Data
Publishers](../../using-wso2-identity-server/migrating-data-publishers).

### Compatible versions

For information on the Carbon platform version and Carbon Kernel version
of WSO2 IS 5.8.0, see the [Release
Matrix](https://wso2.com/products/carbon/release-matrix/).

All WSO2 products that are based on a specific Carbon Kernel version are
expected to be compatible with each other. If you come across any
compatibility issue, [contact team WSO2](https://wso2.com/contact/).

### Fixed issues

For a complete list of improvements and bug fixes available with this
release, see WSO2 IS 5.8.0 - Fixed Issues.

### Known issues

-   For a complete list of open issues related to the WSO2 Identity
    Server runtime, see [WSO2 IS Runtime - Open
    Issues](https://github.com/wso2/product-is/issues).
-   For a complete list of open issues related to the WSO2 Identity
    Server analytics, see [WSO2 IS Analytics - Open
    Issues](https://github.com/wso2/analytics-is/issues)
