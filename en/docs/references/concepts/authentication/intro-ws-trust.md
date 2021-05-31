# WS-Trust

The **Security Token Service** component of WSO2 Carbon enables you to
configure the generic STS to issue claim-based security tokens. A
claim-based security token is a common way for applications to acquire
and authenticate the identity information they need about users inside
their organization, in other organizations, and on the Internet. This
Security Token Service is capable of issuing SAML 1.1 and SAML 2.0
tokens as recommended in WS-Trust and SAML Web Service Token Profile
specifications.

<!-- The WSDL of this service can be accessed by clicking the URL having the
format:
`         https://(hostname):(port)/services/wso2carbon-sts?wsdl        `. For instance, with the default configuration, the URL is
[https://localhost:9443/services/wso2carbon-sts?wsdl](https://localhost:9443/services/wso2carbon-sts?wsdl). -->

Both SAML 1.1 and SAML 2.0 token types are supported by default. The
issued token type is decided based on the type of token defined in the
RST (Request Security Token). Currently, the Bearer Subject Confirmation
and Holder-Of-Key subject confirmation methods, which are explained
below, are supported. With Holder-Of-Key, both Symmetric and Asymmetric
key types are supported. You can obtain tokens containing claims that
hold certain information about the subject. These claims can be
extracted from the profiles or through custom claim callbacks which can
be registered to the Carbon runtime.

---

## Understanding different confirmation methods

Subject confirmation methods are how a relying party (or the end
service) can make sure that a particular security token issued by a
Security Token Service (STS), is brought by the legitimate subject. If
this is not done, a third party can take the token from the wire and
send any request it wants including that token. As a result, the relying
party may trust that illegitimate third party.

The following are the three methods of confirmation.

-   **Bearer**: This is actually not a confirmation method as subject
    confirmation is not really needed. The relying party simply trusts
    whoever brings the token.
-   **Holder of Key (HoK)**:
    -   STS includes the public key of the client inside the security
        token and signs it.
    -   Before sending the token, the client itself signs the request.
    -   When the relying party receives the token, it first validates
        the STS signature and then validates the client's signature with
        the public key embedded inside the token.
-   **Sender Vouches**:
    -   Rather than authenticating with the STS, the client
        authenticates with an intermediate service.
    -   The intermediary gets the security token from the STS and signs
        the request before sending it to the relying party.
    -   The relying party trusts both the intermediary and the STS. So,
        it validates both of them.
