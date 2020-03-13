# Advanced SAML Configurations 

This page lists out all the advanced configurations related to SAML authentication. 

----

#### Issuer 

This is the `<saml:Issuer>` element that contains the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.

----

#### Service Provider Qualifier

This value is needed only if you have to configure multiple SAML SSO inbound authentication configurations for the same Issuer value. When a Service Provider Qualifier is defined here, it will be appended to the end of the **Issuer** value when registering the SAML SP in the Identity Server.

For example, if you specify "saml-pickup-dispatch.com" as the **Issuer** and "sp1" as the **Service Provider Qualifier**, the configuration will be registered in IS as `saml-pickup-dispatch.com:urn:sp:qualifier:sp1`.

You can configure a number of SAML SPs with the same Issuer and different Service Provider Qualifiers.

When a Service Provider Qualifier is defined, the issuer of the SAML SSO authentication request is the value specified as the Issuer in the configuration (e.g., "saml-pickup-dispatch.com"). The service provider qualifier value should be sent as a query parameter, `spQualifier` with the HTTP request in the following format.

```
https://{host-name}:{Port}/samlsso?spQualifier={Service Provider Qualifier}
```

----

#### Assertion Consumer URLs

The identity provider redirects the SAML2 response to this ACS URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request. 

It should have this format:

```
https://(host-name):(port)/acs
```

You can add multiple assertion consumer URLs for the service provider by entering the URL and clicking the **Add** button.

----

#### Default Assertion Consumer URL

Since there can be multiple assertion consumer URLs, you must define a **Default Assertion Consumer URL** in case you are unable to retrieve it from the authentication request.


!!! tip
     In a service provider initiated single sign-on setup, the following needs to be considered.

     - If no ACS URL is given in the `< AuthnRequest >` , the Identity Server sends the response to the default ACS URL of the service provider (whether the request is signed or not).

     - If the ACS URL in `< AuthnRequest >` matches with one of the registered URLs, the Identity Server sends the response to the matched one.

     - If the ACS URL in `< AuthnRequest >` does not match any of the registered ACS URLs and if the request is signed, the Identity Server sends the response to the ACS URL in the request only if the signature is valid. Alternatively, the `< AuthnRequest >` is rejected.

     In an identity provider initiated single sign-on setup, the following needs to be considered.

     - If the “acs” query parameter is not present in the request, the Identity Server sends the response to default ACS URL of the service provider.

     - If the "acs” parameter is present and the value of that parameter matches with any of the registered ACS URLs of the service provider, then the Identity Server sends the response to the matched one.

----

#### NameID format

Specify the **NameID** format. This defines the name identifier formats supported by the identity provider. The service provider and identity provider usually communicate with each other regarding a specific subject. That subject should be identified through a Name-Identifier (NameID) , which should be in some format so that it is easy for the other party to identify it based on the format. Name identifiers are used to provide information regarding a user.

!!! tip
     For SSO interactions, you can use the following types of NameID formats.

     - urn:oasis:names:<zero-space-width>tc:SAML:2.0:nameid-format:persistent
     - urn:oasis:names:<zero-space-width>tc:SAML:2.0:nameid-format:transient
     - urn:oasis:names:<zero-space-width>tc:SAML:1.1:nameid-format:emailAddress
     - urn:oasis:names:<zero-space-width>tc:SAML:1.1:nameid-format:unspecified
     - urn:oasis:names:<zero-space-width>tc:SAML:1.1:nameid-format:X509SubjectName
     - urn:oasis:names:<zero-space-width>tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName
     - urn:oasis:names:<zero-space-width>tc:SAML:2.0:nameid-format:kerberos
     - urn:oasis:names:<zero-space-width>tc:SAML:2.0:nameid-format:entity

     This specifies the name identifier format that the Identity Server wants to receive in the subject of an assertion from a particular identity provider. The following is the default format used by the identity provider.

     - urn:oasis:names:<zero-space-width>tc:SAML:1.1:nameid-format:emailAddress

----

#### Certificate Alias

Select the **Certificate Alias** from the dropdown. This is used to validate the signature of SAML2 requests and is used to generate encryption. Basically the service provider’s certificate must be selected here. Note that this can also be the Identity Server tenant's public certificate in a scenario where you are doing a tenant specific configuration.

!!! tip 
     From WSO2 IS 5.5.0 onwards, the `.pem` certificate can be updated via the Service Provider screen in the management console UI using the Application Certificate field. If the certificate has been entered in the Application Certifiate field, the system will use the certificate given there and override the certificate alias field.

     However, if the Application Certificate field has been left blank, the certificate specified in Certificate Alias will be used.

----

#### Response Signing Algorithm

Specifies the ‘SignatureMethod’ algorithm to be used in the ‘Signature’ element in POST binding. The default value can be configured through the `<IS_HOME>/repository/deployment.toml` file by adding the following config.

```toml
[saml]
signing_alg="signing algorithm"
```

If it is not provided the default algorithm is RSA­SHA 1, at URI 'http://www.w3.org/2000/09/xmldsig#rsa­sha1'.

----

#### Response Digest Algorithm

Specifies the ‘DigestMethod’ algorithm to be used in the ‘Signature’ element in POST binding. The default value can be configured in the `<IS_HOME>/repository/conf/deployment.toml` file by adding the following config.

```toml
[saml]
digest_alg="digest algorithm"
```

If it is not provided the default algorithm is SHA 1, at URI 'http://www.w3.org/2000/09/xmldsig#sha1'.

----

#### Assertion Encryption Algorithm

The algorithm that the SAML2 assertion is encrypted. The default value can be configured in the `<IS_HOME>/repository/conf/deployment.toml` file by adding the following config.

```toml
[saml]
assertion_encryption_alg="assertion encryption algorithm"
```

The default is `http://www.w3.org/2001/04/xmlenc#aes256-cbc` . 

----

#### Key Encryption Algorithm

The algorithm that the SAML2 key is encrypted. The default value can be configured in the `<IS_HOME>/repository/deployment.toml` file by adding the following config.

```toml
[saml]
key_encryption_alg="key encryption algorithm"
```

The default algorithm is `http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p`. 

----

#### Enable Response Signing

Select **Enable Response Signing** to sign the SAML2 Responses returned after the authentication process.

----

#### Enable Signature Validation in Authentication Requests and Logout Requests

Select **Enable Signature Validation in Authentication Requests and Logout Requests** if you need this functionality configured. This specifies whether the identity provider must validate the signature of the SAML2 authentication request and the SAML2 logout request that are sent by the service provider.

----

#### Enable Assertion Encryption

Enable **Assertion Encryption**, if you wish to encrypt the assertion.

-----

#### Enable Single Logout

Select **Enable Single Logout** so that all sessions are terminated once the user signs out from one server. If single logout is enabled, the identity provider sends logout requests to all service providers. Basically, the identity provider acts according to the single logout profile. If the service provider supports a different URL for logout, you can enter a SLO Response URL and SLO Request URL for logging out. These URLs indicate where the request and response should go to. If you do not specify this URL, the identity provider uses the Assertion Consumer Service (ACS) URL.

WSO2 Identity Server supports both **SAML Back-Channel Logout** and **SAML Front-Channel Logout** methods. By default, when you select **Enable Single Logout**, the Back-Channel Logout is enabled . In order to enable **SAML Front-Channel Logout**, you can either select **Front-Channel Logout (HTTP Redirect Binding)** or **Front-Channel Logout (HTTP POST Binding)** .

----

#### Enable Attribute Profile

Select **Enable Attribute Profile** to enable this and add a claim by entering the claim link and clicking the **Add Claim** button. The Identity Server provides support for a basic attribute profile where the identity provider can include the user’s attributes in the SAML Assertions as part of the attribute statement. 

Once you select the checkbox to **Include Attributes in the Response Always**, the identity provider always includes the attribute values related to the selected claims in the SAML attribute statement.

-----

#### Enable Audience Restriction

Select **Enable Audience Restriction** to restrict the audience. You may add audience members using the **Audience** text box and clicking the **Add** button.

-----

#### Enable Recipient Validation

Select this if you require validation from the recipient of the response.

-----

#### Enable IdP Initiated SSO

Select the **Enable IdP Initiated SSO** checkbox to enable this functionality. When this is enabled, the service provider is not required to send the SAML2 request.

-----

#### Enable IdP Initiated SLO

Select the **Enable IdP Initiated SLO** checkbox to enable this functionality. You must specify the URL.

----

#### Enable Assertion Query Request Profile

Select the **Enable Assertion Query Request Profile** checkbox to query assertions that are persisted to the database when you login to the service provider application. For more information, see [Querying SAML Assertions](insertlink) .

----

#### Enable SAML2 Artifact Binding

This is to define SAML2 artifact binding is enabled or not so that WSO2 Identity Server responds to each SAML SSO authentication request with an artifact. For more information, see [Configuring SAML 2.0 Artifact Binding](insertlink).

----

#### IdP Entity ID Alias

This value can override the value of Identity Provider Entity ID specified under SAML SSO Inbound Authentication configuration in Resident IdP. The Identity Provider Entity ID is used as the issuer of the SAML responses generated from IS. 

By default, all the SAML responses issued by IS will have the issuer value similar to the Identity Provider Entity ID in Resident IdP’s SAML SSO inbound authentication configuration. However, if you want that value to be unique for your SAML SP configuration, you can specify the value here, so that the IdP Entity ID will be overridden with this **IdP Entity ID Alias** value.

In the Pickup Dispatch sample SP, this value can be set by modifying `SAML2.IdPEntityId` value mentioned in the `<SAMPLE_HOME>/WEB-INF/classes/sso.properties` file, so that it reflects the value of the **IdP Entity ID Alias** you define in the SAML SP configuration.