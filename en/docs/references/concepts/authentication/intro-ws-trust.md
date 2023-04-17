# WS-Trust
WS-Trust specifies protocol mechanisms for requesting, issuing, renewing, validating, and canceling security tokens independent of the application type.

STS is a service model defined by WS-Trust specifications. The issuance, validation, renewal, and exchange of security tokens in STS are based on the WS-Trust protocol.

## Security Token Service

The **Security Token Service** (STS) component of WSO2 Carbon enables you to configure the generic STS to issue claim-based security tokens.

A claim-based security token is a common way for applications to acquire and authenticate the identity information they need about users:
- in their organization
- in other organizations
- on the Internet

This Security Token Service is capable of issuing SAML 1.1 and SAML 2.0 tokens as recommended in WS-Trust and SAML Web Service Token Profile specifications. Both SAML 1.1 and SAML 2.0 token types are supported by default.

The issued token type is decided based on the type of token defined in the RST (Request Security Token), and the token is issued through the RSTR (Request Security Token Response).

<!-- The WSDL of this service can be accessed by clicking the URL having the format: `         https://(hostname):(port)/services/wso2carbon-sts?wsdl        `. For instance, with the default configuration, the URL is
[https://localhost:9443/services/wso2carbon-sts?wsdl](https://localhost:9443/services/wso2carbon-sts?wsdl). -->


<!-- With Holder-Of-Key, both Symmetric and Asymmetric key types are supported. You can obtain tokens containing claims that hold certain information about the subject. These claims can be extracted from the profiles or through custom claim callbacks which can be registered at the Carbon runtime. -->

---

### Entities of STS

STS has the following three entities involved in the process.

1. **Service provider** - This is the application that the user needs to access. This entity is also known as the relying party, as it relies on tokens issued by the STS to grant the services it provides.
2. **Service requester** - This is the user who needs to access a resource/service from the service provider.
3. **Security Token Service** - This is the component that issues the security token to service requesters.


### How STS work

The following diagram explains how STS flow works.

![Security Token Service work flow]({{base_path}}/assets/img/concepts/sts-work-flow.png)

### Subject confirmation

Subject confirmation methods specify how a relying party (or the end service) can ensure that the legitimate subject brings a particular security token issued by a Security Token Service (STS).

This help to prove the relationship between the subject and the security token.

Without subject confirmation, an intruder can get the token from the wire and send any request. As a result, the relying party may trust an illegitimate third party.

Currently, the following subject confirmation methods are supported:

- **Bearer Confirmation method**:
    - This is actually not a confirmation method as subject confirmation is not really needed. The relying party simply trusts whoever brings the token.
- **Holder of Key (HoK) confirmation method**:
    - STS includes the client's public key inside the security token and signs it.
    - Before sending the token, the client itself signs the request.
    - When the relying party (service provider) receives the token, it first validates the STS signature and then validates the client's signature with the public key embedded inside the token.
- **Sender-Vouches confirmation method**:
    - Rather than authenticating with the STS, the client authenticates with an intermediary service.
    - The intermediary gets the security token from the STS and signs the request before sending it to the relying party.
    - The relying party trusts both the intermediary and the STS. So, it validates both of them.

<!-- ## Related Topics
See Configuring WS-Trust Security Token Service to configure WS-Trust in WSO2 Identity Server. -->
