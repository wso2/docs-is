# Configuring Inbound Authentication for a Service Provider

The inbound authenticator component of WSO2 Identity Server identifies
and parses all the incoming authentication requests and builds the
corresponding response. A given inbound authenticator has two parts:

-   Request Processor
-   Response Builder

For each protocol supported by WSO2 Identity Server, there should be an
inbound authenticator. WSO2 Identity Server includes inbound
authenticators for SAML 2.0, OpenID Connect, OAuth 2.0, Kerberos KDC,
WS-Trust STS, and WS-Federation (passive). The responsibility of the
SAML 2.0 request processor is to accept a SAML request from a service
provider, validate the SAML request, and build a common object model
that is understood by the authentication framework and handover the
request to it. The responsibility of the SAML response builder is to
accept a common object model from the authentication framework and build
a SAML response out of it.

Both the request processors and the response builders are
protocol-aware, while the authentication framework is not coupled to any
protocol. For more information on the inbound authentication flow, see
[Architecture](_Architecture_).

Let's learn how to configure inbound authentication for a service
provider.

!!! tip
    
    **Before you begin**
    
    To register a service provider:
    
    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
    to learn the instructions
    
    1.  Sign in to the [Management
        Console](https://docs.wso2.com/display/IS580/Getting+Started+with+the+Management+Console)
        .
    2.  On the **Main** menu, click **Identity \> Service Providers \> Add**
        .  
        ![](../../assets/img//103329740/112392337.png) 
    
    3.  Fill in the **Service Provider Name** and provide a brief
        **Description** of the service provider. Only **Service Provider
        Name** is a required field.  
        ![](../../assets/img//103329740/112392335.png) 
    
    4.  Click **Register** to add the new service provider.
    
        !!! note
            
                When a service provider is created, it is assigned to a
                "APPLICATION" role (for instance, if you add Travelocity as the
                service provider, then the role will look like
                "Application/travelocity"). Users who wish to manage the created
                service provider should have this application role assigned. See
                [Configuring
                Roles](https://docs.wso2.com/display/IS540/Configuring+Roles+and+Permissions)
                for guidance on how to do this
            

5.  The **Service Providers** screen appears. Paste the application's
    certificate to the **Application Certificate** field.

    **When is this certificate used**

    This certificate is used to validate the signatures of the signed
    requests from the application (service provider) to WSO2 IS.
    Therefore, the certificate is used for the following scenarios:

    -   [Configuring single
        sign-on](https://docs.wso2.com/display/IS580/Configuring+Single+Sign-On#ConfiguringSingleSign-On-Configuringtheserviceprovider) -
        the certificate is used to validate the signature of the SAML2
        authentication requests and the SAML2 logout requests that are
        sent by the service provider.
    -   [Passing OIDC authentication request
        parameters](https://docs.wso2.com/display/IS580/Passing+OIDC+Authentication+Request+Parameters+in+a+Request+Object) -
        the certificate is used to:
        -   Encrypt the `                  id_token                 `
            sent to the service provider in the OIDC Authentication
            Response.
        -   Validate the signed
            `                  Request                 `
            `                  Object                 ` sent in the
            OAuth2/OIDC Authorization Request.

    **Format of the certificate**

    WSO2 IS expects the certificate to be in PEM format.

    PEM is a Base64 encoded format, therefore contains ASCII character
    and easier to deal with rather than a binary encoded certificate.

    **How to obtain the PEM encoded certificate**

    The PEM content of a certificate in a JKS file, can be obtained by
    following the steps below:

    1\. Export the certificate from the keystone. The exported certificate
    will be in binary format.

    ``` java
    keytool -export -keystore <keystore-path> -alias <alias-of-the-certificate> -file <path-of-the-expected-certificate-file>

    e.g. keytool -export -keystore wso2carbon.jks -alias wso2carbon -file wso2carbon.crt
    ```

    2\. Convert the above binary encoded certificate to a PEM encoded
    certificate

    ``` java
        openssl x509 -inform der -in <path-of-binary-certificate> -out <path-of-expected-pem-content>
    
        e.g. openssl x509 -inform der -in wso2carbon.crt -out wso2carbon.pem
    ```

      

    !!! note
    
        You can paste the public certificate in to the given text area or
        upload file in **PEM** format. If the **Application Certificate**
        field is left blank, WSO2 IS is backward compatible and follows
        the previous implementation to locate the certificates in the
        keystore.  
        This means that if it is a SAML SSO flow, the certificate alias
        mentioned in SAML inbound authentication configuration is used when
        the certificate is not updated via the management console. If it is
        an OIDC request object signature validation, the certficate will be
        retrived from default keystore, aliase to consumer key of the auth
        application.
    

    ![](../../assets/img//103329740/103329741.png) 

6.  Select if the service provider is a **SaaS Application** or not
    using the **Saas Application** checkbox. The **SaaS Application**
    configuration defines which users you want to be able to log into
    your web application.

    !!! tip
    
        By default, the **SaaS Application** check box is disabled, which
        means the web application is not shared among tenants so only users
        in the current tenant (the one you use to define the service
        provider) will be allowed to log into the web
        application. Alternatively, if you enabled the **SaaS Application**
        check box, that means this web application is shared among tenants
        so users from any tenant will be allowed to log into the web
        application. For example, if there are three tenants, namely TA, TB
        and TC and the service provider is registered and configured only in
        TA.
    
        -   If the **SaaS Application** configuration is disabled, only
            users in TA are able to log into the web application.
    
        -   If the **SaaS Application** configuration is enabled, all TA,
            TB, TC users are able to log into the web application.
    
        -   For more information on creating and managing tenants, see
            [Creating and Managing
            Tenants](https://docs.wso2.com/display/IS580/Creating+and+Managing+Tenants)
            .
    

    
    Removed Feature!
    
    OpenID 2.0 has been removed from the base product in WSO2 Identity
    Server version 5.3.0 onwards as it is now an obsolete specification and
    has been superseded by OpenID Connect. Alternatively, we recommend that
    you use [OpenID Connect](_OAuth2-OpenID_Connect_).
    

You can configure inbound authentication in following ways:

-   [Configuring inbound authentication with SAML2 Web
    SSO](#ConfiguringInboundAuthenticationforaServiceProvider-SAML-SSOConfiguringinboundauthenticationwithSAML2WebSSO)
-   [Configuring inbound authentication with OAuth/OpenID
    Connect](#ConfiguringInboundAuthenticationforaServiceProvider-OauthOpenIDConfiguringinboundauthenticationwithOAuth/OpenIDConnect)
-   [Configuring inbound authentication with
    WS-Federation](#ConfiguringInboundAuthenticationforaServiceProvider-WS-Federation(Passive)ConfiguringinboundauthenticationwithWS-Federation)
-   [Configuring inbound authentication with WS-Trest Security Token
    Service](#ConfiguringInboundAuthenticationforaServiceProvider-ConfiguringinboundauthenticationwithWS-TrestSecurityTokenService)

### Configuring inbound authentication with SAML2 Web SSO

![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
to learn the instructions

To configure SAML2 Web SSO:

1.  Expand the **SAML2 Web SSO Configuration** and click **Configure**.
2.  Select one of the following modes:  
    -   [Manual
        configuration](#ConfiguringInboundAuthenticationforaServiceProvider-Manualconfiguration)
    -   [Metadata file
        configuration](#ConfiguringInboundAuthenticationforaServiceProvider-Metadatafileconfiguration)
    -   [URL
        configuration](#ConfiguringInboundAuthenticationforaServiceProvider-URLconfiguration)

Metadata and URL configuration

When configuring a service provider (SP) or a federated identity
provider (Federated IdP), the user is required to enter configuration
data to facilitate exchanging authentication and authorization data
between entities in a standard way. Apart from manual entering of
configuration data, WSO2 IS allows you to upload configuration data
using a metadata XML file or refer to a metadata XML file located in a
predetermined URL. These two methods of uploading configuration data
enable faster entry of configuration data because it allows the user to
use the same metadata xml file for multiple instances of entity
configuration. In addition to SAML metadata upload, WSO2 IS also
supports SAML metadata download for the resident identity provider.

#### Manual configuration

1.  Select **Manual Configuration** and enter the required details as
    giveb below. ![](../../assets/img//103330801/112392421.png) 

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Issuer</strong></td>
    <td>Specify the <strong>Issuer</strong> . This is the <code>                  &lt;saml:Issuer&gt;                 </code> element that contains the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider. When configuring single-sign-on across Carbon servers, ensure that this value is equal to the <strong>ServiceProviderID</strong> value mentioned in the <code>                  &lt;IS_HOME&gt;/repository/conf/security/authenticators.xml                 </code> file of the relying party Carbon server.</td>
    <td><code>                  travelocity.com                 </code></td>
    </tr>
    <tr class="even">
    <td><strong>Assertion Consumer URLs</strong></td>
    <td>Specify the <strong>Assertion Consumer URLs</strong> . This is the URL to which the browser should be redirected to after the authentication is successful. This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this ACS URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request. It should have this format: https://(host-name):(port)/acs . You can add multiple assertion consumer URLs for the service provider by entering the URL and clicking the <strong>Add</strong> button.</td>
    <td><code>                                     http://wso2is.local:8080/travelocity.com/home.jsp                                   </code></td>
    </tr>
    <tr class="odd">
    <td><strong>Default Assertion Consumer URL</strong></td>
    <td><div class="content-wrapper">
    <p>Since there can be multiple assertion consumer URLs, you must define a <strong>Default Assertion Consumer URL</strong> in case you are unable to retrieve it from the authentication request.</p>
    !!! tip
        <p><strong>Tip</strong> : In a service provider initiated single sign-on setup, the following needs to be considered.</p>
        <ul>
        <li>If no ACS URL is given in the &lt; <code>                     AuthnRequest                    </code> &gt;, the Identity Server sends the response to the default ACS URL of the service provider (whether the request is signed or not).</li>
        <li>If the ACS URL in &lt; <code>                     AuthnRequest                    </code> &gt; matches with one of the registered URLs, the Identity Server sends the response to the matched one.</li>
        <li>If the ACS URL in &lt; <code>                     AuthnRequest                    </code> &gt; does not match any of the registered ACS URLs and if the request is signed, the Identity Server sends the response to the ACS URL in the request only if the signature is valid. Alternatively, the &lt; <code>                     AuthnRequest                    </code> &gt; is rejected.</li>
        </ul>
        <p>In an identity provider initiated single sign-on setup, the following needs to be considered.</p>
        <ul>
        <li>If the “acs” query parameter is not present in the request, the Identity Server sends the response to default ACS URL of the service provider.</li>
        <li>If the "acs” parameter is present and the value of that parameter matches with any of the registered ACS URLs of the service provider, then the Identity Server sends the response to the matched one.</li>
        </ul>
    </div></td>
    <td><code>                                                         http://wso2is.local:8080/travelocity.com/home.jsp                                                      </code></td>
    </tr>
    <tr class="even">
    <td><strong>NameID format</strong></td>
    <td><div class="content-wrapper">
    <p>Specify the <strong>NameID format</strong> . This defines the name identifier formats supported by the identity provider. The service provider and identity provider usually communicate with each other regarding a specific subject. That subject should be identified through a Name-Identifier (NameID), which should be in some format so that It is easy for the other party to identify it based on the format. Name identifiers are used to provide information regarding a user.</p>
    <div>
    <p>About NameID formats</p>
    <p>For SSO interactions, you can use the following types of NameID formats.</p>
    <ul>
    <li><code>                      urn:oasis:names:tc:SAML:2.0:nameid-format:persistent                                           </code></li>
    <li><code>                      urn:oasis:names:tc:SAML:2.0:nameid-format:transient                                           </code></li>
    <li><code>                      urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress                                           </code></li>
    <li><code>                      urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified                                           </code></li>
    <li><code>                      urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName                                           </code></li>
    <li><code>                      urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName                                           </code></li>
    <li><code>                      urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos                                           </code></li>
    <li><code>                      urn:oasis:names:tc:SAML:2.0:nameid-format:entity                                           </code></li>
    </ul>
    <p>This specifies the name identifier format that the Identity Server wants to receive in the subject of an assertion from a particular identity provider. The following is the default format used by the identity provider.</p>
    <ul>
    <li><code>                      urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress                                           </code></li>
    </ul>
    </div>
    </div></td>
    <td><p><code>                   urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress                  </code></p></td>
    </tr>
    <tr class="odd">
    <td><strong>Certificate Alias</strong></td>
    <td><div class="content-wrapper">
    <p>Select the <strong>Certificate Alias</strong> from the dropdown. This is used to validate the signature of SAML2 requests and is used to generate encryption. Basically the service provider’s certificate must be selected here. Note that this can also be the Identity Server tenant's public certificate in a scenario where you are doing a tenant specific configuration.</p>
    !!! tip
        <p>From WSO2 IS 5.5.0 onwards, the .pem certificate can be updated via the Service Provider screen in the management console UI using the <strong>Application Certificate</strong> field. If the certificate has been entered in the Application Certifiate field, the system will use the certificate given there and override the certificate alias field.</p>
        <p>However, if the Application Certificate field has been left blank, the certificate specified in <strong>Certificate Alias</strong> will be used.</p>
    </div></td>
    <td><code>                  wso2carbon                 </code></td>
    </tr>
    <tr class="even">
    <td><strong>Response Signing Algorithm</strong></td>
    <td><p>Specifies the ‘SignatureMethod’ algorithm to be used in the ‘Signature’ element in POST binding. The default value can be configured in the <code>                   &lt;IS_HOME&gt;/repository/conf/identity.xml                  </code> file, in the <code>                   SSOService                  </code> element with <code>                   SAMLDefaultSigningAlgorithmURI                  </code> tag. If it is not provided the default algorithm is RSA­SHA 1, at URI ‘ http://www.w3.org/2000/09/xmldsig#rsa­sha1 ' .</p></td>
    <td>http://www.w3.org/2000/09/xmldsig#rsa­sha1</td>
    </tr>
    <tr class="odd">
    <td><strong>Response Digest Algorithm</strong></td>
    <td><p>Specifies the ‘DigestMethod’ algorithm to be used in the ‘Signature’ element in POST binding. The default value can be configured in the <code>                   &lt;IS_HOME&gt;/repository/conf/identity.xml                  </code> file, in the <code>                   SSOService                  </code> element with <code>                   SAMLDefaultDigestAlgorithmURI                  </code> tag. If it is not provided the default algorithm is SHA 1, at URI ‘ http://www.w3.org/2000/09/xmldsig#sha1 ’ .</p></td>
    <td><code>                                                         http://www.w3.org/2000/09/xmldsig#sha1                                                      </code></td>
    </tr>
    <tr class="even">
    <td><strong>Assertion Encryption Algorithm</strong></td>
    <td>The algorithm that the SAML2 assertion is encrypted. The default value can be configured in the <code>                  &lt;IS_HOME&gt;/repository/conf/identity.xml                 </code> file, in the <code>                  SSOService                 </code> element with <code>                  SAMLDefaultAssertionEncryptionAlgorithm URI                 </code> tag. The default is <code>                                                         http://www.w3.org/2001/04/xmlenc#aes256-cbc                                                      </code> .</td>
    <td><code>                  www.w3.org/2001/04/xmlenc#aes256-cbc                 </code></td>
    </tr>
    <tr class="odd">
    <td><strong>Key Encryption Algorithm</strong></td>
    <td>The algorithm that the SAML2 key is encrypted. The default value can be configured in the <code>                  &lt;IS_HOME&gt;/repository/conf/identity.xml                 </code> file, in the <code>                  SSOService                 </code> element with <code>                  SAMLDefaultKeyEncryptionAlgorithm                 </code> URI tag. The default algorithm is <code>                                                         http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p                                                      </code></td>
    <td><code>                  www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p                 </code></td>
    </tr>
    <tr class="even">
    <td><strong>Enable Response Signing</strong></td>
    <td>Select <strong>Enable Response Signing</strong> to sign the SAML2 Responses returned after the authentication process.</td>
    <td>Selected</td>
    </tr>
    <tr class="odd">
    <td><strong>Enable Signature Validation in Authentication Requests and Logout Requests</strong></td>
    <td>Select <strong>Enable Signature Validation in Authentication Requests and Logout Requests</strong> if you need this functionality configured. This specifies whether the identity provider must validate the signature of the SAML2 authentication request and the SAML2 logout request that are sent by the service provider.</td>
    <td>Unselected</td>
    </tr>
    <tr class="even">
    <td><strong>Enable Assertion Encryption</strong></td>
    <td>Enable <strong>Assertion Encryption</strong>, if you wish to encrypt the assertion.</td>
    <td>Unselected</td>
    </tr>
    <tr class="odd">
    <td><strong>Enable Single Logout</strong></td>
    <td><p>Select <strong>Enable Single Logout</strong> so that all sessions are terminated once the user signs out from one server. If single logout is enabled, the identity provider sends logout requests to all service providers. Basically, the identity provider acts according to the single logout profile. If the service provider supports a different URL for logout, you can enter a <strong>SLO Response URL</strong> and <strong>SLO Request URL</strong> for logging out. These URLs indicate where the request and response should go to. If you do not specify this URL, the identity provider uses the Assertion Consumer Service (ACS) URL.<br />
    WSO2 Identity Server supports both SAML Back-Channel Logout and SAML Front-Channel Logout methods. By default, when you select <strong>Enable Single Logout</strong> the Back-Channel Logout is enabled . In order to enable SAML Front-Channel Logout, you can either select <strong>Front-Channel Logout (HTTP Redirect Binding)</strong> or <strong>Front-Channel Logout (HTTP POST Binding).</strong></p></td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td><strong>Enable Attribute Profile</strong></td>
    <td>Select <strong>Enable Attribute Profile</strong> to enable this and add a claim by entering the claim link and clicking the <strong>Add Claim</strong> button. The Identity Server provides support for a basic attribute profile where the identity provider can include the user’s attributes in the SAML Assertions as part of the attribute statement. Once you select the checkbox to <strong>Include Attributes in the Response Always</strong>, the identity provider always includes the attribute values related to the selected claims in the SAML attribute statement.</td>
    <td>Unselected</td>
    </tr>
    <tr class="odd">
    <td><strong>Enable Audience Restriction</strong></td>
    <td>Select <strong>Enable Audience Restriction</strong> to restrict the audience. You may add audience members using the <strong>Audience</strong> text box and clicking the <strong>Add</strong> button.</td>
    <td>Unselected</td>
    </tr>
    <tr class="even">
    <td><strong>Enable Recipient Validation</strong></td>
    <td>Select this if you require validation from the recipient of the response.</td>
    <td>Unselected</td>
    </tr>
    <tr class="odd">
    <td><strong>Enable IdP Initiated SSO</strong></td>
    <td>Select the <strong>Enable IdP Initiated SSO</strong> checkbox to enable this functionality. When this is enabled, the service provider is not required to send the SAML2 request.</td>
    <td>Unselected</td>
    </tr>
    <tr class="even">
    <td><strong>Enable IdP Initiated SLO</strong></td>
    <td>Select the <strong>Enable IdP Initiated SLO</strong> checkbox to enable this functionality. You must specify the URL.</td>
    <td>Unselected</td>
    </tr>
    <tr class="odd">
    <td><strong>Enable Assertion Query Request Profile</strong></td>
    <td>Select the Enable Assertion Query Request Profile checkbox to query assertions that are persisted to the database when you login to the service provider application. For more information, see <a href="https://docs.wso2.com/display/IS530/Querying+SAML+Assertions">Querying SAML Assertions</a> .</td>
    <td>Unselected</td>
    </tr>
    <tr class="even">
    <td><strong>Enable SAML2 Artifact Binding</strong></td>
    <td>This is to define SAML2 artifact binding is enabled or not so that WSO2 Identity Server responds to each SAML SSO authentication request with an artifact. For more information, see <a href="https://docs.wso2.com/display/IS580/Configuring+SAML+2.0+Artifact+Binding">Configuring SAML 2.0 Artifact Binding</a> .</td>
    <td>Unselected</td>
    </tr>
    </tbody>
    </table>

2.  Click **Register**.

#### Metadata file configuration

This option allows you to provide the configuration data required for
configuring SAML2, by uploading a metadata .xml file instead of having
to manually enter the values. This enables faster entry of configuration
data and allows the user to use the same metadata XML file for multiple
instances of entity configuration.

1.  Select **Metadata File Configuration.**  
    **![](../../assets/img//103330801/112392408.png)   
    **
2.  Click **Choose File**, and select the
    `             .xml            ` file containing the metadata for the
    service provider SAML configuration.
3.  Click **Upload**.

    !!! tip
    
        From WSO2 Identity Server 5.5.0 onwards, the certificate can be
        added via the Service Providers screen in the management console UI
        using the **Application Certificate** field. This means that
        certificates can now be directly added along with the service
        provider instead of having to import the certificate to the keystore
        and referring to it using the Certificate Alias field.
    
        Therefore, when uploading a metadata file, the **Application
        Certificate** field in the Service Providers screen will
        automatically display the certificate that is embedded in the
        metatdata file. You can update or edit the certificate by editing
        the content within the Application Certificate field and uploading
        the metadata file again will override the existing certificate.
    

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to view a sample of the metadata configuration file

    **Service provider metadata file**

    ``` java
    <?xml version="1.0"?>
    <md:EntityDescriptor xmlns:md="urn:oasis:names:tc:SAML:2.0:metadata" validUntil="2018-07-25T04:49:17Z" cacheDuration="PT604800S" entityID="travelocity.com">
      <md:SPSSODescriptor AuthnRequestsSigned="false" WantAssertionsSigned="false" protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
        <md:KeyDescriptor use="signing">
          <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:X509Data>
              <ds:X509Certificate>MIIC+jCCAmOgAwIBAgIJAParOnPwEkKjMA0GCSqGSIb3DQEBBQUAMIGKMQswCQYDVQQGEwJMSzEQMA4GA1UECBMHV2VzdGVybjEQMA4GA1UEBxMHQ29sb21ibzEWMBQGA1UEChMNU29mdHdhcmUgVmlldzERMA8GA1UECxMIVHJhaW5pbmcxLDAqBgNVBAMTI1NvZnR3YXJlIFZpZXcgQ2VydGlmaWNhdGUgQXV0aG9yaXR5MB4XDTEwMDcxMDA2MzMwM1oXDTI0MDMxODA2MzMwM1owdjELMAkGA1UEBhMCTEsxEDAOBgNVBAgTB1dlc3Rlcm4xEDAOBgNVBAcTB0NvbG9tYm8xFjAUBgNVBAoTDVNvZnR3YXJlIFZpZXcxETAPBgNVBAsTCFRyYWluaW5nMRgwFgYDVQQDEw9NeSBUZXN0IFNlcnZpY2UwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAN6bi0llFz+R+93nLLK5BmnuF48tbODpMBH7yGZ1/ESVUZoYm0GaPzg/ai3rX3r8BEr4TUrhhpKUKBpFxZvb2q+yREIeDEkDbHJuyVdS6hvtfa89WMJtwc7gwYYkY8AoVJ94gU54GP2B6XyNpgDTXPd0d3aH/Zt669xGAVoe/0iPAgMBAAGjezB5MAkGA1UdEwQCMAAwHQYDVR0OBBYEFNAwSamhuJSwXG0SJnWdIVF1PkW9MB8GA1UdIwQYMBaAFNa3YmhDO7BOwbUqmYU1k/U6p/UUMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTANBgkqhkiG9w0BAQUFAAOBgQBwwC5H+U0a+ps4tDCicHQfC2SXRTgF7PlAu2rLfmJ7jyoDX+lFEoWDUoE5qkTpMjsR1q/+2j9eTyi9xGj5sby4yFvmXf8jS5L6zMkkezSb6QAvtSHcLfefKeidq6NDBJ8DhWHi/zvC9YbT0KkCToEgvCTBpRZgdSFxTJcUksqoFA==</ds:X509Certificate>
            </ds:X509Data>
          </ds:KeyInfo>
        </md:KeyDescriptor>
        <md:KeyDescriptor use="encryption">
          <ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">
            <ds:X509Data>
              <ds:X509Certificate>MIIC+jCCAmOgAwIBAgIJAParOnPwEkKjMA0GCSqGSIb3DQEBBQUAMIGKMQswCQYDVQQGEwJMSzEQMA4GA1UECBMHV2VzdGVybjEQMA4GA1UEBxMHQ29sb21ibzEWMBQGA1UEChMNU29mdHdhcmUgVmlldzERMA8GA1UECxMIVHJhaW5pbmcxLDAqBgNVBAMTI1NvZnR3YXJlIFZpZXcgQ2VydGlmaWNhdGUgQXV0aG9yaXR5MB4XDTEwMDcxMDA2MzMwM1oXDTI0MDMxODA2MzMwM1owdjELMAkGA1UEBhMCTEsxEDAOBgNVBAgTB1dlc3Rlcm4xEDAOBgNVBAcTB0NvbG9tYm8xFjAUBgNVBAoTDVNvZnR3YXJlIFZpZXcxETAPBgNVBAsTCFRyYWluaW5nMRgwFgYDVQQDEw9NeSBUZXN0IFNlcnZpY2UwgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAN6bi0llFz+R+93nLLK5BmnuF48tbODpMBH7yGZ1/ESVUZoYm0GaPzg/ai3rX3r8BEr4TUrhhpKUKBpFxZvb2q+yREIeDEkDbHJuyVdS6hvtfa89WMJtwc7gwYYkY8AoVJ94gU54GP2B6XyNpgDTXPd0d3aH/Zt669xGAVoe/0iPAgMBAAGjezB5MAkGA1UdEwQCMAAwHQYDVR0OBBYEFNAwSamhuJSwXG0SJnWdIVF1PkW9MB8GA1UdIwQYMBaAFNa3YmhDO7BOwbUqmYU1k/U6p/UUMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTANBgkqhkiG9w0BAQUFAAOBgQBwwC5H+U0a+ps4tDCicHQfC2SXRTgF7PlAu2rLfmJ7jyoDX+lFEoWDUoE5qkTpMjsR1q/+2j9eTyi9xGj5sby4yFvmXf8jS5L6zMkkezSb6QAvtSHcLfefKeidq6NDBJ8DhWHi/zvC9YbT0KkCToEgvCTBpRZgdSFxTJcUksqoFA==</ds:X509Certificate>
            </ds:X509Data>
          </ds:KeyInfo>
        </md:KeyDescriptor>
        <md:NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</md:NameIDFormat>
        <md:AssertionConsumerService Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="http://localhost:8080/travelocity.com/home.jsp" index="1"/>
      </md:SPSSODescriptor>
    </md:EntityDescriptor>
    ```

#### URL configuration

Metadata for a service provider may be published in a well known
location via a URI. This option allows you to provide the configuration
data required for configuring SAML2, by providing a URI (Ex: "
https://spconfigs.com/sample-sp.xml ") instead of having to manually
enter the values. This enables faster entry of configuration data and
allows the user to use the same metadata XML file for multiple instances
of entity configuration.

1.  Select **URL Configuration** and enter the URL containing the
    service provider metadata.  
    ![](../../assets/img//103330801/112392410.png) 
2.  Click **Upload**.

!!! note
    
    Additional configurations
    
    -   ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
        here to expand for more information on signature algorithms.
    
        The following table provides the list of signature algorithms
        available and their respective URI.
    
        | Signature algorithm name | Signature algorithm URI                             |
        |--------------------------|-----------------------------------------------------|
        | DSA with SHA1            | http://www.w3.org/2000/09/xmldsig\#dsasha1          |
        | ECDSA with SHA1          | http://www.w3.org/2001/04/xmldsigmore\#ecdsasha1    |
        | ECDSA with SHA256        | http://www.w3.org/2001/04/xmldsigmore\#ecdsasha256  |
        | ECDSA with SHA384        | http://www.w3.org/2001/04/xmldsigmore\#ecdsasha384  |
        | ECDSA with SHA512        | http://www.w3.org/2001/04/xmldsigmore\#ecdsasha512  |
        | RSA with MD5             | http://www.w3.org/2001/04/xmldsigmore\#rsamd5       |
        | RSA with RIPEMD160       | http://www.w3.org/2001/04/xmldsigmore\#rsaripemd160 |
        | RSA with SHA1            | http://www.w3.org/2000/09/xmldsig\#rsasha1          |
        | RSA with SHA256          | http://www.w3.org/2001/04/xmldsigmore\#rsasha256    |
        | RSA with SHA384          | http://www.w3.org/2001/04/xmldsigmore\#rsasha384    |
        | RSA with SHA512          | http://www.w3.org/2001/04/xmldsigmore\#rsasha512    |
    
    -   ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
        here to expand for more information on digest algorithms.
    
        The following table provides the list of digest algorithms available
        and their respective URI.
    
        | Digest algorithm name | Digest algorithm URI                          |
        |-----------------------|-----------------------------------------------|
        | MD5                   | http://www.w3.org/2001/04/xmldsigmore\#md5    |
        | RIPEMD160             | http://www.w3.org/2001/04/xmlenc\#ripemd160   |
        | SHA1                  | http://www.w3.org/2000/09/xmldsig\#sha1       |
        | SHA256                | http://www.w3.org/2001/04/xmlenc\#sha256      |
        | SHA384                | http://www.w3.org/2001/04/xmldsigmore\#sha384 |
        | SHA512                | http://www.w3.org/2001/04/xmlenc\#sha512      |
    
    -   If you need to sign the SAML response using an authenticated user's
        tenant keystore, please add the following configuration. (By
        default, the response is signed using the certificate that belongs
        to the tenant where the service provider is registered). This
        property must be added if the SAML authenticator version in the WSO2
        Carbon products that you are using is 4.2.2 or higher (
        `              org.wso2.carbon.identity.authenticator.saml2.sso_4.2.2.jar             `
        ).  
          
        Add the
        `              <UseAuthenticatedUserDomainCrypto>             `
        property available in the
        `              <IS_HOME>/repository/conf/identity.xml             `
        file as shown below.
    
        ``` xml
            <SSOService>
            ...
                <UseAuthenticatedUserDomainCrypto>true<UseAuthenticatedUserDomainCrypto>
            </SSOService>
        ```
    

**Related Topics**

See [SAML 2.0 Web
SSO](https://docs.wso2.com/display/IS530/SAML+2.0+Web+SSO) for more
information on SAML2 single-sign-on and see the following topics for
samples of configuring single-sign-on using SAML2.

-   [Configuring Single
    Sign-On](https://docs.wso2.com/display/IS530/Configuring+Single+Sign-On)
-   [Logging in to WSO2 Products via Identity
    Server](https://docs.wso2.com/display/IS520/Logging+in+to+WSO2+Products+via+Identity+Server)
-   [Configuring SAML2 Single-Sign-On Across Different WSO2
    Products](https://docs.wso2.com/display/IS530/Configuring+SAML2+Single-Sign-On+Across+Different+WSO2+Products)

See [Using the SAML2
Toolkit](https://docs.wso2.com/display/IS530/Using+the+SAML2+Toolkit)
for support on debugging issues with SAML2 configurations.

### Configuring inbound authentication with OAuth/OpenID Connect

![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
to learn the instructions

[OAuth 2.0](https://oauth.net/2/) has three main phases. They are;
requesting an Authorization Grant, exchanging the Authorization Grant
for an Access Token and accessing the resources using this Access Token.
[OpenID Connect](http://openid.net/connect/) is another identity layer
on top of OAuth 2.0. OAuth applications can get authentication event
information over the IDToken and can get the extra claims of the
authenticated user from the OpenID Connect UserInfo endpoint.  

To enable OAuth support for your client application, you must first
register your application. Follow the instructions below to add a new
application.  

Let's get started to configure the service provider you created!

1.  Expand the **Inbound Authentication Configuration** section and then
    expand **OAuth/OpenID Connect Configuration.** Click **Configure**.
2.  Fill in the form that appears. For the **Allowed Grant Types** you
    can disable the ones you do not require or wish to block.

    !!! note
    
        The grant type highlighted below is a **custom** grant type. This
        will only appear on the UI if you have [configured the JWT grant
        type](https://docs.wso2.com/display/ISCONNECTORS/Configuring+JWT+Grant+Type)
        . The value specified in the
        `              <GrantTypeName>             ` property of the
        `              identity.xml             ` file when creating the
        custom grant type is the value that will appear on the UI. For more
        information on writing a custom grant type, see [Writing a Custom
        OAuth 2.0 Grant
        Type](https://docs.wso2.com/display/IS580/Writing+a+Custom+OAuth+2.0+Grant+Type)
        .
    

    ![](../../assets/img//103330833/112392519.png) 

    When filling out the **New Application** form, the following details
    should be taken into consideration.

    <table style="width:100%;">
    <colgroup>
    <col style="width: 22%" />
    <col style="width: 77%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Notes</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>OAuth Version</strong></td>
    <td><p>Selecting <strong>OAuth Version</strong> as <strong>1.0a</strong> removes all the configurable <strong>Allowed Grant Types</strong> . This is because this version of OAuth does not support grant types.</p></td>
    </tr>
    <tr class="even">
    <td><div class="content-wrapper">
    <p><strong>Allowed Grant Types</strong></p>
    </div></td>
    <td>The following grant types are used to generate the access token:
    <ul>
    <li><strong>Code</strong> : Entering the username and password required at the service provider will result in a code being generated. This code can be used to obtain the access token. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.1">Authorization Code specification</a> .</li>
    <li><strong>Implicit</strong> : This is similar to the code grant type, but instead of generating a code, this directly provides the access token. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.2">Implicit Grant specification</a> .</li>
    <li><strong>Password</strong> : This authenticates the user using the password provided and the access token is provided. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.3">Resource Owner Password Credentials Grant specification</a> .</li>
    <li><strong>Client Credential</strong> : This is the grant type for the client key and client secret. If these two items are provided correctly by the service provider, the access token is sent. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.4">Client Credentials specification.</a></li>
    <li><strong>Refresh Token</strong> : This will enable the user to obtain an access token by using the refresh token once the originally provided access token is used up. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-1.5">Refresh Token specification</a> .</li>
    <li><strong>SAML2</strong> : This uses SAML assertion to obtain the access token . For more information on this grant type, see this <a href="https://tools.ietf.org/id/draft-ietf-oauth-saml2-bearer-23.txt">SAML2 Bearer specification</a> .</li>
    <li><strong>IWA-NTLM</strong> : This is similar to the password grant type, but it is specific to Microsoft Windows users.</li>
    <li><strong>urn:ietf:params:oauth: grant-type:jwt-bearer</strong> : This is a custom grant type. It uses a JWT token to obtain the access token. For more information about this grant type, see this <a href="https://tools.ietf.org/html/rfc7523">JWT specification</a> .</li>
    </ul></td>
    </tr>
    <tr class="odd">
    <td><strong>Callback Url</strong></td>
    <td><div class="content-wrapper">
    <p>This is the exact location in the service provider's application where an access token would be sent. This is a required field (if the grant type is anything other than 'Code' or 'Implicit') and it is important to configure, as it is imperative that the service provider receives the access token. This is necessary for security purposes to ensure that the token is not compromised.</p>
    <div>
    <p>Configure multiple callback URLs</p>
    <p>From IS 5.2.0 onwards, regex-based consumer URLs are supported when defining the callback URL. This enables you to configure multiple callback URLs for one application by entering a regex pattern as the value for the callback URL field.<br />
    For example, if you have two service providers that use the same application, you can now define a regex pattern which will work for both callback URLs instead of having to configure two different applications for the two service providers. Assume the two callback URLs for your two service providers are as follows:</p>
    <ul>
    <li><code>                                               https://myapp.com/callback                                             </code></li>
    <li><code>                                               https://testapp:8000/callback                                             </code></li>
    </ul>
    <p>To configure the callback URL to work for <strong>both</strong> of these URLs, set it using a regex pattern as follows:<br />
    </p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">regexp=(https:<span class="co">//myapp.com/callback|https://testapp:8000/callback)</span></a></code></pre></div>
    </div>
    </div>
    !!! note
        <p>You must have the prefix ' <strong>regexp=</strong> ' before your regex pattern. To define a normal URL, you can specify the callback URL without this prefix.</p>
    <p>You can also configure a regex pattern that contains dynamic values as seen below.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">regexp=https:<span class="co">//mchcon.clance.local\?id=(.*)</span></a></code></pre></div>
    </div>
    </div>
    </div>
    <br />

    <p><br />
    </p>
    </div></td>
    </tr>
    <tr class="even">
    <td><strong>PKCE Mandatory</strong></td>
    <td>Select this if you are using the <strong>Code</strong> grant type. PKCE is a recommended security measure used to mitigate a code interception attack. See <a href="https://docs.wso2.com/display/IS580/Mitigating+Authorization+Code+Interception+Attacks">Mitigating Authorization Code Interception Attacks</a> for more information.</td>
    </tr>
    <tr class="odd">
    <td><strong>Support PKCE 'Plain' Transform Algorithm</strong></td>
    <td>Select this if you are using PKCE.</td>
    </tr>
    <tr class="even">
    <td><strong>Allow Authentication without the client secret</strong></td>
    <td>This enables authenticating the client without the <code>                  client secret                 </code> .</td>
    </tr>
    <tr class="odd">
    <td><p><strong>User Access Token Expiry Time, Application Access Token Expiry Time, Refresh Token Expiry Time, Id Token Expiry Time</strong></p>
    <p><strong><br />
    </strong></p></td>
    <td>Set the validity period (in seconds) for User Access Token, Application Access Token, Refresh Token, and Id Token.</td>
    </tr>
    <tr class="even">
    <td><strong>Enable Audience Restriction</strong></td>
    <td><div class="content-wrapper">
    <p>Select this to enable audience restrictions for OAuth applications. If necessary, you can add multiple audiences. To add an audience, specify a required <strong>Audience</strong> value and click <strong>Add</strong> . All audience values that you add would be available in the ID token generated for the corresponding application.</p>
    !!! tip
        <p>Before you add an audience, ensure that the following property is set to true in the <code>                    &lt;IS_HOME&gt;/repository/conf/identity/identity.xml                   </code> file.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;EnableAudiences&gt;<span class="kw">true</span>&lt;/EnableAudience&gt;</a></code></pre></div>
        </div>
        </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><strong>Enable Request Object Signature Validation</strong></td>
    <td><p>This is to define whether to only accept signed request objects in an authorization rqeuest or not. For more information, see <a href="https://docs.wso2.com/display/IS580/Enforcing+Signature+Validation+for+Request+Objects">Enforcing Signature Validation for Request Objects</a> .</p></td>
    </tr>
    <tr class="even">
    <td><strong>Enable ID Token Encryption</strong></td>
    <td>This is to define whether to ID token encryption should be enabled or not. For a tutorial on this, see <a href="https://docs.wso2.com/display/IS580/Testing+OIDC+Encrypted+ID+Token+with+IS">Testing OIDC Encrypted ID Token with IS</a> .</td>
    </tr>
    <tr class="odd">
    <td><strong>Enable OIDC Back Channel Logout</strong></td>
    <td>This is to define whether OIDC back channel logout should be enabled or not. For more information, see <a href="https://docs.wso2.com/display/IS580/Configuring+OpenID+Connect+Back-Channel+Logout">Configuring OpenID Connect Back-Channel Logout</a> .</td>
    </tr>
    <tr class="even">
    <td><strong>Scope Validators</strong></td>
    <td>This is to define the scope validation mechanisms. For more information on XACML scope validation, see <a href="https://docs.wso2.com/display/IS580/Validating+the+Scope+of+OAuth+Access+Tokens+using+XACML+Policies">Validating the Scope of OAuth Access Tokens using XACML Policies</a> .</td>
    </tr>
    <tr class="odd">
    <td><strong>Token Issuer</strong></td>
    <td><div class="content-wrapper">
    <p>Select either <strong>JWT</strong> or <strong>Default</strong> as the token issuer for the service provider.</p>
    !!! tip
        <p>Tip</p>
        <ul>
        <li>If you want to enable default token generation for a service provider, select <strong>Default</strong> as the <strong>Token Issuer</strong> . This is the default Token Issuer that is selected when you apply the WUM update.<br />
        When you enable default token generation, the hash value of the token is stored in the ACCESS_TOKEN_HASH column, and the plain text token is stored in the ACCESS_TOKEN column</li>
        <li>If you want to enable JWT token generation for a service provider, select <strong>JWT</strong> as the <strong>Token Issuer</strong> .<br />
        When you enable JWT token generation, the hash value of the JWT is stored in the ACCESS_TOKEN_HASH column, and the full JWT is stored in the ACCESS_TOKEN column.</li>
        </ul>
    </div></td>
    </tr>
    </tbody>
    </table>

3.  Click **Add**. Note that `             client key            ` and
    `             client secret            ` get generated.  
    ![](../../assets/img//103330833/103330840.png) 

    -   **OAuth Client Key** - This is the client key of the service
        provider, which will be checked for authentication by the
        Identity Server before providing the access token.
    -   **OAuth Client Secret** - This is the client secret of the
        service provider, which will be checked for authentication by
        the Identity Server before providing the access token. Click the
        **Show** button to view the exact value of this.
    -   **Actions -**
        -   **Edit:** Click to edit the OAuth/OpenID Connect
            Configurations

        -   **Revoke:** Click to revoke (deactivate) the OAuth
            application. This action revokes all tokens issued for this
            application. In order to activate the application, you have
            to regenerate the consumer secret.

        -   **Regenerate Secret:** Click to regenerate the secret key of
            the OAuth application.

        -   **Delete:** Click to delete the OAuth/OpenID Connect
            Configurations.

    !!! tip
    
        The OAuth client key and client secret are stored in plain text. To
        encrypt the client secret, access token and refresh token, do the
        following:
    
        Open the `              identity.xml             ` file found in the
        `              <IS_HOME>/repository/conf/identity             `
        directory and change the
        `              <TokenPersistenceProcessor>             ` property as
        follows:
    
        ``` xml
            <TokenPersistenceProcessor>org.wso2.carbon.identity.oauth.tokenprocessor.EncryptionDecryptionPersistenceProcessor</TokenPersistenceProcessor>
    ```

    After updating the configuration, make sure to restart the server
    for the changes to be applied on WSO2 IS.


**Related Topics**

See [Configuring OpenID Connect Single
Logout](https://docs.wso2.com/display/IS580/Configuring+OpenID+Connect+Single+Logout)
to configure single logout or session management with OpenID Connect.

See [Delegated Access
Control](https://docs.wso2.com/display/IS580/Delegated+Access+Control)
for more information on working with OAuth2/OpenIDConnect. See the
following topics for samples of configuring delegated access control:

-   [OAuth 2.0 with WSO2
    Playground](https://docs.wso2.com/display/IS580/OAuth+2.0+with+WSO2+Playground)
-   [Setting up a SAML2 Bearer Assertion Profile for OAuth
    2.0](https://docs.wso2.com/display/IS580/Setting+up+a+SAML2+Bearer+Assertion+Profile+for+OAuth+2.0)

### Configuring inbound authentication with WS-Federation

![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
to learn the instructions

To configure WS-Federation SSO:

1.  Expand the **Inbound Authentication Configuration** followed by the
    **WS-Federation (Passive) Configuration** section and provide the
    following values.

    -   **Passive STS Realm** - This should be an unique identifier for
        the web app. Provide the same realm name given to the web app
        you are configuring WS-Federation for.

    -   **Passive STS WReply URL** - Provide the URL of the web app you
        are configuring WS-Federation for.  This endpoint URL will
        handle the token response.

        !!! tip
        
                If you want to configure an expiration time for the security
                token, you need to add the following configuration in the
                `                <IS_HOME>/repository/conf/carbon.xml               `
                file, under the `                <Server>               `
                element:
        
                ``` java
                        <STSTimeToLive>1800000</STSTimeToLive>
        ```

        Here, the expiration time should be specified in milliseconds.


    ![](../../assets/img//103330844/112392543.png) 

2.  Expand the **Claim Configuration** section and map the relevant
    claims. See [Configuring Claims for a Service
    Provider](https://docs.wso2.com/display/IS580/Configuring+Claims+for+a+Service+Provider)
    for more information.
3.  Click **Update** to save changes.

**Related Topics**

-   To test out WSO2 Identity Server's passive security token service
    using a sample, see [Testing Identity Server's Passive
    STS](https://docs.wso2.com/display/IS580/Testing+Passive+STS).

### Configuring inbound authentication with WS-Trest Security Token Service

![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
to learn the instructions

WSO2 Identity Server uses the security token service (STS) as the
[WS-Trust](https://docs.wso2.com/display/IS580/WS-Trust) implementation.
The STS is capable of issuing SAML 1.1 and 2.0 security tokens and has a
SOAP/XML API for token issuance. This API can be secured with the
`           UserNameToken          ` or with any other WS-Security
mechanism as explained below.

#### Securing the Security Token Service

According to the Trust Brokering model defined in the WS-Trust
specification, the users should authenticate themselves to the STS
before obtaining a token. STS may use this authentication information
when constructing the security token. For example, STS may populate the
required claims based on the user name provided by the subject.
Therefore, the STS service needs to be secured.

STS is configured under the **Resident Identity Provider** section of
the WSO2 Identity Server [Management
Console](https://docs.wso2.com/display/IS580/Getting+Started+with+the+Management+Console)
.

To secure the Security Token Service:

1.  On the **Main** tab, click **Identity \> Identity Providers \>
    Resident**.  
    ![](../../assets/img//103330821/112392547.png)   
    The Resident Identity Provider page appears.  
    ![](../../assets/img//103330821/112392548.png) 

2.  Enter the required values as given below.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Home Realm Identifier</strong></td>
    <td>This is the domain name of the identity provider. If you do not enter a value here, when an authentication request comes to WSO2 Identity Server, a user will be prompted to specify a domain. You can enter multiple identifiers as a comma-separated list.</td>
    <td><code>                  localhost                 </code></td>
    </tr>
    <tr class="even">
    <td><strong>Idle Session Time Out</strong></td>
    <td>This is the duration in minutes for which an SSO session can be idle for. If WSO2 Identity Server does not receive any SSO authentication requests for the given duration, a session time out occurs. The default value is <code>                  15                 </code> .</td>
    <td><code>                  15                 </code></td>
    </tr>
    <tr class="odd">
    <td><strong>Remember Me Period</strong></td>
    <td><div class="content-wrapper">
    <p>This is the duration in weeks for which WSO2 Identity Server should remember an SSO session given that the <strong>Remember Me</strong> option is selected in the WSO2 Identity Server login screen.</p>
    <p>The default value is <code>                    2                   </code> weeks.</p>
    </div></td>
    <td><code>                  2                 </code></td>
    </tr>
    </tbody>
    </table>

3.  Under the **Inbound Authentication Configuration** section, click
    **Security Token Service Configuration \> Apply Security Policy**
    .  
    ![](../../assets/img//103330821/112392550.png) 
4.  Select **Yes** in the **Enable Security?** drop down and  select a
    pre-configured security scenario according to your requirements. For
    this tutorial, use **UsernameToken** under the **Basic Scenarios**
    section.  
    ![](../../assets/img//103330821/103330825.png) 

    !!! note
    
        You can find further details about security policy scenarios from
        the **view scenario** option **.**
    
        **![](../../assets/img//103330821/103330822.png) **
    

5.  Click **Next**. The user domain and user group selection appears.

    Next steps may vary as per the security scenario that you have
    chosen under point (5) above. Below is for **UsernameToken**
    scenario **.**

6.  Provide the required details as follows:
    1.  Select **ALL-USER-STORE-DOMAINS**.
    2.  Select the role you created to grant permission to access
        secured service. In this example, the admin role is used **.**
        Next, click **Finish**.

        !!! note
        
                The **Select Domain** drop-down lists many domains. The listed
                **User Groups** can vary depending on the domain selected.
        

        ![](../../assets/img//103330821/112392552.png) 

7.  Click **Finish**.
8.  Click **Ok** on the confirmation dialog window that appears.
9.  Click **Update** to complete the process.

Now STS is configured and secured with a username and password. Only
users with the Admin role can consume the service.

The next step is to add a service provider to consume the STS.

#### Adding a service provider for the STS client

Do the following steps if you are using a Holder of Key **subject
confirmation method**. For more information, see [Configuring STS for
Obtaining Tokens with Holder-Of-Key Subject
Confirmation](https://docs.wso2.com/display/IS580/Configuring+STS+for+Obtaining+Tokens+with+Holder-Of-Key+Subject+Confirmation)
.

The **Subject confirmation methods** define how a relying party (RP),
which is the end service can make sure a particular security token
issued by an STS is brought by the legitimate subject. If this is not
done, a third party can take the token from the wire and send any
request it wants including that token. The RP trusts that illegitimate
party.

1.  Under the **Inbound Authenticatino Configuration** section, click
    **WS-Trust Security Token Service Configuration** **\>**
    **Configure**. The STS Configuration page appears.  
    ![](../../assets/img//103330821/112392555.png) 
2.  Enter the required details as given below.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>Endpoint Address</strong></td>
    <td><div class="content-wrapper">
    <p><br />
    </p>
    <div>
    <p>Enter the trusted relying party's <strong>endpoint address,</strong> which is the <strong></strong> endpoint address of the Security Token Service. For more information, see <a href="https://docs.wso2.com/display/IS580/Broker+Trust+Relationships+with+WSO2+Identity+Server">Broker Trust Relationship with WSO2 Identity Server</a> .</p>
    <p>The endpoint must be used as the service <code>                     URL                    </code> to which the token gets delivered by the STS client. Then select the public certificate imported. Tokens issued are encrypted using the public certificate of the trusted relying party. Therefore, the consumer who obtains this token, to invoke the RP service, will not be able to see the token.</p>
    !!! note
        <p>Make sure to upload the certificate of the relying party to the truststore. For instructions, see <a href="https://docs.wso2.com/display/ADMIN44x/Creating+New+Keystores#CreatingNewKeystores-ca_certificateAddingCA-signedcertificatestokeystores">Adding CA-signed ceritificates to keystores</a> .</p>
    <p><br />
    </p>
    </div>
    <p><br />
    </p>
    </div></td>
    <td><code>                  https://localhost:9444/services/echo                 </code></td>
    </tr>
    <tr class="even">
    <td><strong>Certificate Alias</strong></td>
    <td>This is the alias of the certificate.</td>
    <td><code>                  wso2carbon                 </code></td>
    </tr>
    </tbody>
    </table>

    ![](../../assets/img//103330821/112392557.png) 

3.  Click **Update** to save the changes made to the service provider.

    **Related Topics**

    Run the STS client after configuring the service provider. For
    instructions on trying out a sample STS client, see [Running an STS
    Client](https://docs.wso2.com/display/IS580/Running+an+STS+Client).

  

**Related Topics**

See [Single Sign-On](_Single_Sign-On_) for details on configuring single
sign-on for service provider using inbound authentication. See the
following topics for samples of configuring single sign-on:

-   [Configuring Single Sign-On](_Configuring_Single_Sign-On_)
-   [Logging in to WSO2 Products via the Identity
    Server](_Logging_in_to_WSO2_Products_via_the_Identity_Server_)
