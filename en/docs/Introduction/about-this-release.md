# About this release

### What is new in this release

WSO2 Identity Server (WSO2 IS) version **5.8.0** is the successor of
version **5.7.0,** and contains the following new features and
enhancements:

-   Support for [OpenID Connect backchannel
    logout](_OpenID_Connect_Single_Logout_) .
-   Support for [SAML frontchannel
    logout](_Configuring_SAML2_Web_Single-Sign-On_) .
-   Improvements for [product
    observability](_Working_with_Product_Observability_) .
-   Support for [X509 certificate-based
    authentication](https://docs.wso2.com/display/ISCONNECTORS/Configuring+X509+Authenticator+with+SSL+Termination)
    for passing the client certificate in the request header from the
    proxy over SSL tunneling.
-   Support for i [ssuing access tokens per token
    request](_Issuing_New_Tokens_Per_Request_) .
-   Support for [configuring a JWKS endpoint for a OAuth or OIDC based
    service provider](_Private_Key_JWT_Client_Authentication_for_OIDC_)
    .
-   Support for [configuring SAML metadata validity period for the
    resident identity
    provider](Adding-and-Configuring-an-Identity-Provider_103329675.html#AddingandConfiguringanIdentityProvider-ExportingSAML2metadataoftheresidentIdP)
    .
-   Includes [OAuth transaction logs](_OAuth_Transaction_Logs_) for
    token generation and introspection.

-   Supports recaptcha for [password
    recovery](_Configuring_reCaptcha_for_Password_Recovery_) and
    [username recovery](_Configuring_reCaptcha_for_Username_Recovery_) .

### What has changed in this release

The design architecture of the current data publishers in WSO2 Identity
Server (i.e. the `         analyticsSessionDataPublisher        ` ,
`         analyticsLoginDataPublisher        ` and
`         AuthenticationAuditLogger        ` ) have been deprecated and
changed in this release.The new implementation consists of event
handlers that subscribe to authentication events.

For more information, see [Migrating Data
Publishers](_Migrating_Data_Publishers_) .

### Compatible versions

For information on the Carbon platform version and Carbon Kernel version
of WSO2 IS 5.8.0, see the [Release
Matrix](https://wso2.com/products/carbon/release-matrix/) .

All WSO2 products that are based on a specific Carbon Kernel version are
expected to be compatible with each other. If you come across any
compatibility issue, [contact team WSO2](https://wso2.com/contact/) .

### Fixed issues

For a complete list of improvements and bug fixes available with this
release, see WSO2 IS 5.8.0 - Fixed Issues.

### Known issues

-   For a complete list of open issues related to the WSO2 Identity
    Server runtime, see [WSO2 IS Runtime - Open
    Issues](https://github.com/wso2/product-is/issues) .
-   For a complete list of open issues related to the WSO2 Identity
    Server analytics, see [WSO2 IS Analytics - Open
    Issues](https://github.com/wso2/analytics-is/issues)
