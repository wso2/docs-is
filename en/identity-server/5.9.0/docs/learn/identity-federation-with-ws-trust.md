# Identity Federation with WS-Trust

The **Security Token Service** component of WSO2 Carbon enables you to
configure the generic STS to issue claim-based security tokens. A
claim-based security token is a common way for applications to acquire
and authenticate the identity information they need about users inside
their organization, in other organizations, and on the Internet. This
Security Token Service is capable of issuing SAML 1.1 and SAML 2.0
tokens as recommended in WS-Trust and SAML Web Service Token Profile
specifications.

The WSDL of this service can be accessed by clicking this URL:
`         https://(hostname):(port)/services/wso2carbon-sts?wsdl        `
. For instance, with the default configuration, the URL is
`                   https://localhost:9443/services/wso2carbon-sts?wsdl                 `
.

Both SAML 1.1 and SAML 2.0 token types are supported by default. The
issued token type is decided based on the type of token defined in the
RST (Request Security Token). Currently, the Bearer Subject Confirmation
and Holder-Of-Key subject confirmation methods are both supported. With
Holder-Of-Key, both Symmetric and Asymmetric key types are
supported. You can obtain tokens containing claims that hold certain
information about the subject. These claims can be extracted from the
profiles or through custom claim callbacks which can be registered to
the Carbon runtime.

See [Configuring WS-Trust Security Token
Service](../../learn/configuring-ws-trust-security-token-service) for more details
on how to implement the Security Token Service with WS-Trust using the
resident identity provider and a service provider.

Please see the following pages to learn more information about the
Security Token Service:

-   [Configuring STS for Obtaining Tokens with Holder-Of-Key Subject
    Confirmation](../../learn/configuring-sts-for-obtaining-tokens-with-holder-of-key-subject-confirmation)
-   [Accessing Claim Aware Services using STS Secured with
    Non-repudiation](../../learn/accessing-claim-aware-services-using-sts-secured-with-non-repudiation)
-   [Requesting and Renewing Received SAML2 Bearer Type
    Tokens](../../learn/requesting-and-renewing-received-saml2-bearer-type-tokens)
