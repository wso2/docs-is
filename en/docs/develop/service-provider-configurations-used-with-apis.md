# Service Provider Configurations used with APIs

This section guides you through the configurations you can include in a
service provider application. See [Calling Admin
Services](../../develop/calling-admin-services) to enable the admin service.

-   [Configuring SAML2 web
    SSO](#ServiceProviderConfigurationsusedwithAPIs-ConfiguringSAML2webSSO)
-   [Configuring OAuth/OpenID
    Connect](#ServiceProviderConfigurationsusedwithAPIs-ConfiguringOAuth/OpenIDConnect)
-   [Configuring WS-Trust Security Token
    service](#ServiceProviderConfigurationsusedwithAPIs-ConfiguringWS-TrustSecurityTokenservice)
-   [Configuring WS-Federation
    (passive)](#ServiceProviderConfigurationsusedwithAPIs-ConfiguringWS-Federation(passive))

### Configuring SAML2 web SSO

Permission Level: `         /permission/admin/manage        `

To add a Service Provider with SAML2 Web SSO capability, you have to
first add SAML2 Web SSO configuration. This is done through the
`         IdentitySAMLSSOConfigService        ` exposed at
`         https://<IS_HOST>:<IS_PORT>/services/IdentitySAMLSSOConfigService?wsdl        `
. Replace the tag \<IS\_HOST\>:\<IS\_PORT\> with the relevant host and
port number, for example,
<https://localhost:9443/services/IdentitySAMLSSOConfigService?wsdl> .

#### Input parameters

<table>
<colgroup>
<col style="width: 11%" />
<col style="width: 6%" />
<col style="width: 81%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>issuer</td>
<td>String</td>
<td>Specify the <strong>Issuer</strong> . This is the <code>             &lt;saml:Issuer&gt;            </code> element that contains the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider. When configuring single-sign-on across Carbon servers, ensure that this value is equal to the <strong>ServiceProviderID</strong> value mentioned in the <code>             &lt;IS_HOME&gt;/repository/conf/security/authenticators.xml            </code> file of the relying party Carbon server.</td>
</tr>
<tr class="even">
<td>assertionConsumerUrls</td>
<td>String</td>
<td>Specify the <strong>Assertion Consumer URLs</strong> . This is the URL to which the browser should be redirected to after the authentication is successful. This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this ACS URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request. It should have this format: https://(host-name):(port)/acs . You can add multiple assertion consumer URLs by repeating assertionConsumerUrls element.</td>
</tr>
<tr class="odd">
<td>defaultAssertionConsumerUrl</td>
<td>String</td>
<td><div class="content-wrapper">
<p>Since there can be multiple assertion consumer URLs, you must define a <strong>Default Assertion Consumer URL</strong> in case you are unable to retrieve it from the authentication request.</p>
!!! tip
    <p><strong>Tip</strong> : In a service provider initiated single sign-on setup, the following needs to be considered.</p>
    <ul>
    <li>If no ACS URL is given in the &lt; <code>                AuthnRequest               </code> &gt;, the Identity Server sends the response to the default ACS URL of the service provider (whether the request is signed or not).</li>
    <li>If the ACS URL in &lt; <code>                AuthnRequest               </code> &gt; matches with one of the registered URLs, the Identity Server sends the response to the matched one.</li>
    <li>If the ACS URL in &lt; <code>                AuthnRequest               </code> &gt; does not match any of the registered ACS URLs and if the request is signed, the Identity Server sends the response to the ACS URL in the request only if the signature is valid. Alternatively, the &lt; <code>                AuthnRequest               </code> &gt; is rejected.</li>
    </ul>
    <p>In an identity provider initiated single sign-on setup, the following needs to be considered.</p>
    <ul>
    <li>If the “acs” query parameter is not present in the request, the Identity Server sends the response to default ACS URL of the service provider.</li>
    <li>If the "acs” parameter is present and the value of that parameter matches with any of the registered ACS URLs of the service provider, then the Identity Server sends the response to the matched one.</li>
    </ul>
</div></td>
</tr>
<tr class="even">
<td>nameIDFormat</td>
<td>String</td>
<td><div class="content-wrapper">
<p>Specify the <strong>NameID format</strong> . This defines the name identifier formats supported by the identity provider. The service provider and identity provider usually communicate with each other regarding a specific subject. That subject should be identified through a Name-Identifier (NameID), which should be in some format so that It is easy for the other party to identify it based on the format. Name identifiers are used to provide information regarding a user.</p>
<div>
<p>About NameID formats</p>
<p>For SSO interactions, you can use the following types of NameID formats.</p>
<ul>
<li><code>                                   urn:oasis:names:tc:SAML:2.0:nameid-format:persistent                                 </code></li>
<li><code>                                   urn:oasis:names:tc:SAML:2.0:nameid-format:transient                                 </code></li>
<li><code>                                   urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress                                 </code></li>
<li><code>                                   urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified                                 </code></li>
<li><code>                                   urn:oasis:names:tc:SAML:1.1:nameid-format:X509SubjectName                                 </code></li>
<li><code>                                   urn:oasis:names:tc:SAML:1.1:nameid-format:WindowsDomainQualifiedName                                 </code></li>
<li><code>                                   urn:oasis:names:tc:SAML:2.0:nameid-format:kerberos                                 </code></li>
<li><code>                                   urn:oasis:names:tc:SAML:2.0:nameid-format:entity                                 </code></li>
</ul>
<p>This specifies the name identifier format that the Identity Server wants to receive in the subject of an assertion from a particular identity provider. The following is the default format used by the identity provider.</p>
<ul>
<li><code>                                   urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress                                 </code></li>
</ul>
</div>
</div></td>
</tr>
<tr class="odd">
<td>certAlias</td>
<td>String</td>
<td><p>This is used to validate the signature of SAML2 requests and is used to generate encryption. Basically, the service provider’s certificate must be mentioned here. Note that this can also be the Identity Server tenant's public certificate in a scenario where you are doing a tenant-specific configuration.</p></td>
</tr>
<tr class="even">
<td>signingAlgorithmURI</td>
<td>String</td>
<td><div class="content-wrapper">
<p>Specifies the ‘SignatureMethod’ algorithm to be used in the ‘Signature’ element in POST binding. The default value can be configured in the <code>               &lt;IS_HOME&gt;/repository/conf/identity.xml              </code> file, in the <code>               SSOService              </code> element with <code>               SAMLDefaultSigningAlgorithmURI              </code> tag. If it is not provided the default algorithm is RSA­SHA 1 - ' <code>                               http://www.w3.org/2000/09/xmldsig#rsa­sha1                             </code> ’.</p>
<div id="expander-161181687" class="expand-container">
<div id="expander-control-161181687" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to expand for more information on signature algorithms.
</div>
<div id="expander-content-161181687" class="expand-content">
<p>The following table provides the list of signature algorithms available and their respective URI.</p>
<div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Signature algorithm name</th>
<th>Signature algorithm URI</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>DSA with SHA1</td>
<td><a href="http://www.w3.org/2000/09/xmldsig#dsasha1">http://www.w3.org/2000/09/xmldsig#dsasha1</a></td>
</tr>
<tr class="even">
<td>ECDSA with SHA1</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#ecdsasha1">http://www.w3.org/2001/04/xmldsigmore#ecdsasha1</a></td>
</tr>
<tr class="odd">
<td>ECDSA with SHA256</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#ecdsasha256">http://www.w3.org/2001/04/xmldsigmore#ecdsasha256</a></td>
</tr>
<tr class="even">
<td>ECDSA with SHA384</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#ecdsasha384">http://www.w3.org/2001/04/xmldsigmore#ecdsasha384</a></td>
</tr>
<tr class="odd">
<td>ECDSA with SHA512</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#ecdsasha512">http://www.w3.org/2001/04/xmldsigmore#ecdsasha512</a></td>
</tr>
<tr class="even">
<td>RSA with MD5</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#rsamd5">http://www.w3.org/2001/04/xmldsigmore#rsamd5</a></td>
</tr>
<tr class="odd">
<td>RSA with RIPEMD160</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#rsaripemd160">http://www.w3.org/2001/04/xmldsigmore#rsaripemd160</a></td>
</tr>
<tr class="even">
<td>RSA with SHA1</td>
<td><a href="http://www.w3.org/2000/09/xmldsig#rsasha1">http://www.w3.org/2000/09/xmldsig#rsasha1</a></td>
</tr>
<tr class="odd">
<td>RSA with SHA256</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#rsasha256">http://www.w3.org/2001/04/xmldsigmore#rsasha256</a></td>
</tr>
<tr class="even">
<td>RSA with SHA384</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#rsasha384">http://www.w3.org/2001/04/xmldsigmore#rsasha384</a></td>
</tr>
<tr class="odd">
<td>RSA with SHA512</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#rsasha512">http://www.w3.org/2001/04/xmldsigmore#rsasha512</a></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="odd">
<td>digestAlgorithmURI</td>
<td>String</td>
<td><div class="content-wrapper">
<p>Specifies the ‘DigestMethod’ algorithm to be used in the ‘Signature’ element in POST binding. The default value can be configured in the <code>               &lt;IS_HOME&gt;/repository/conf/identity.xml              </code> file, in the <code>               SSOService              </code> element with <code>               SAMLDefaultDigestAlgorithmURI              </code> tag. If it is not provided the default algorithm is SHA 1 - ‘ <code>                               http://www.w3.org/2000/09/xmldsig#sha1                             </code> ’.</p>
<div id="expander-1850114258" class="expand-container">
<div id="expander-control-1850114258" class="expand-control">
<img src="images/icons/grey_arrow_down.png" class="expand-control-image" /> Click here to expand for more information on digest algorithms.
</div>
<div id="expander-content-1850114258" class="expand-content">
<p>The following table provides the list of digest algorithms available and their respective URI.</p>
<div class="table-wrap">
<table>
<thead>
<tr class="header">
<th>Digest algorithm name</th>
<th>Digest algorithm URI</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td>MD5</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#md5">http://www.w3.org/2001/04/xmldsigmore#md5</a></td>
</tr>
<tr class="even">
<td>RIPEMD160</td>
<td><a href="http://www.w3.org/2001/04/xmlenc#ripemd160">http://www.w3.org/2001/04/xmlenc#ripemd160</a></td>
</tr>
<tr class="odd">
<td>SHA1</td>
<td><a href="http://www.w3.org/2000/09/xmldsig#sha1">http://www.w3.org/2000/09/xmldsig#sha1</a></td>
</tr>
<tr class="even">
<td>SHA256</td>
<td><a href="http://www.w3.org/2001/04/xmlenc#sha256">http://www.w3.org/2001/04/xmlenc#sha256</a></td>
</tr>
<tr class="odd">
<td>SHA384</td>
<td><a href="http://www.w3.org/2001/04/xmldsigmore#sha384">http://www.w3.org/2001/04/xmldsigmore#sha384</a></td>
</tr>
<tr class="even">
<td>SHA512</td>
<td><a href="http://www.w3.org/2001/04/xmlenc#sha512">http://www.w3.org/2001/04/xmlenc#sha512</a></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>
</div></td>
</tr>
<tr class="even">
<td>doSignResponse</td>
<td>Boolean</td>
<td>Set true to sign the SAML2 Responses returned after the authentication process.</td>
</tr>
<tr class="odd">
<td>doValidateSignatureInRequests</td>
<td>Boolean</td>
<td>Set true to specifies whether the identity provider must validate the signature of the SAML2 authentication request and the SAML2 logout request that is sent by the service provider.</td>
</tr>
<tr class="even">
<td>doEnableEncryptedAssertion</td>
<td>Boolean</td>
<td>Set true if you wish to encrypt the assertion.</td>
</tr>
<tr class="odd">
<td>doSignAssertions</td>
<td>Boolean</td>
<td>Set this value to 'TRUE' or keep the value as empty since a valid assertion should be signed.</td>
</tr>
<tr class="even">
<td>doSingleLogout</td>
<td>Boolean</td>
<td>Set true if you want to terminate all sessions once the user signs out from one service provider. If single logout is enabled, the identity provider sends logout requests to all service providers. Basically, the identity provider acts according to the single logout profile. If the service provider supports a different URL for logout, you need to specify them using <strong>sloResponseURL</strong> and <strong>sloRequestURL</strong> parameters. These URLs indicate where the request and response should go to. If you do not specify this URL, the identity provider uses the Assertion Consumer Service (ACS) URL.</td>
</tr>
<tr class="odd">
<td>enableAttributeProfile</td>
<td>Boolean</td>
<td>The Identity Server provides support for a basic attribute profile where the identity provider can include the user’s attributes in the SAML Assertions as part of the attribute statement. Ste true to enable this profile. If you set true to <strong>enableAttributesByDefault</strong> parameter, the identity provider always includes the attribute values related to the requested claims in the SAML attribute statement.</td>
</tr>
<tr class="even">
<td>requestedAudiences</td>
<td>String</td>
<td>You can specify the audiences using this parameter.</td>
</tr>
<tr class="odd">
<td>requestedRecipients</td>
<td>String</td>
<td>You can specify the recipients using this parameter.</td>
</tr>
<tr class="even">
<td>idPInitSSOEnabled</td>
<td>Boolean</td>
<td>Set true to enable IdP initiated SSO profile for the service provider.</td>
</tr>
<tr class="odd">
<td>idPInitSLOEnabled</td>
<td>Boolean</td>
<td>Set true to enable IdP initiated SLO profile for the service provider.</td>
</tr>
<tr class="even">
<td>assertionQueryRequestProfileEnabled</td>
<td>Boolean</td>
<td>Set true to enable Assertion Query Request Profile to query assertions that are persisted to the database when you log in to the service provider application. For more information, see <a href="https://docs.wso2.com/display/IS530/Querying+SAML+Assertions">Querying SAML Assertions</a> .</td>
</tr>
</tbody>
</table>

#### Request:

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.saml.sso.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:addRPServiceProvider>
         <!--Optional:-->
         <xsd:spDto>
            <!--Zero or more repetitions:-->
            <xsd1:assertionConsumerUrls>?</xsd1:assertionConsumerUrls>
            <!--Optional:-->
            <xsd1:assertionQueryRequestProfileEnabled>?</xsd1:assertionQueryRequestProfileEnabled>
            <!--Optional:-->
            <xsd1:attributeConsumingServiceIndex>?</xsd1:attributeConsumingServiceIndex>
            <!--Optional:-->
            <xsd1:certAlias>?</xsd1:certAlias>
            <!--Optional:-->
            <xsd1:defaultAssertionConsumerUrl>?</xsd1:defaultAssertionConsumerUrl>
            <!--Optional:-->
            <xsd1:digestAlgorithmURI>?</xsd1:digestAlgorithmURI>
            <!--Optional:-->
            <xsd1:doEnableEncryptedAssertion>?</xsd1:doEnableEncryptedAssertion>
            <!--Optional:-->
            <xsd1:doSignAssertions>?</xsd1:doSignAssertions>
            <!--Optional:-->
            <xsd1:doSignResponse>?</xsd1:doSignResponse>
            <!--Optional:-->
            <xsd1:doSingleLogout>?</xsd1:doSingleLogout>
            <!--Optional:-->
            <xsd1:doValidateSignatureInRequests>?</xsd1:doValidateSignatureInRequests>
            <!--Optional:-->
            <xsd1:enableAttributeProfile>?</xsd1:enableAttributeProfile>
            <!--Optional:-->
            <xsd1:enableAttributesByDefault>?</xsd1:enableAttributesByDefault>
            <!--Optional:-->
            <xsd1:idPInitSLOEnabled>?</xsd1:idPInitSLOEnabled>
            <!--Optional:-->
            <xsd1:idPInitSSOEnabled>?</xsd1:idPInitSSOEnabled>
            <!--Zero or more repetitions:-->
            <xsd1:idpInitSLOReturnToURLs>?</xsd1:idpInitSLOReturnToURLs>
            <!--Optional:-->
            <xsd1:issuer>?</xsd1:issuer>
            <!--Optional:-->
            <xsd1:nameIDFormat>?</xsd1:nameIDFormat>
            <!--Optional:-->
            <xsd1:nameIdClaimUri>?</xsd1:nameIdClaimUri>
            <!--Zero or more repetitions:-->
            <xsd1:requestedAudiences>?</xsd1:requestedAudiences>
            <!--Zero or more repetitions:-->
            <xsd1:requestedRecipients>?</xsd1:requestedRecipients>
            <!--Optional:-->
            <xsd1:signingAlgorithmURI>?</xsd1:signingAlgorithmURI>
            <!--Optional:-->
            <xsd1:sloRequestURL>?</xsd1:sloRequestURL>
            <!--Optional:-->
            <xsd1:sloResponseURL>?</xsd1:sloResponseURL>
         </xsd:spDto>
      </xsd:addRPServiceProvider>
   </soapenv:Body>
</soapenv:Envelope>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.saml.sso.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:addRPServiceProvider>
         <!--Optional:-->
         <xsd:spDto>
            <!--Zero or more repetitions:-->
            <xsd1:assertionConsumerUrls>http://localhost:8080/travelocity.com/home.jsp</xsd1:assertionConsumerUrls>
            <!--Optional:-->
            <xsd1:assertionQueryRequestProfileEnabled>false</xsd1:assertionQueryRequestProfileEnabled>
            <!--Optional:-->
            <xsd1:attributeConsumingServiceIndex>1223160755</xsd1:attributeConsumingServiceIndex>
            <!--Optional:-->
            <xsd1:certAlias>wso2carbon</xsd1:certAlias>
            <!--Optional:-->
            <xsd1:defaultAssertionConsumerUrl>http://localhost:8080/travelocity.com/home.jsp</xsd1:defaultAssertionConsumerUrl>
            <!--Optional:-->
            <xsd1:digestAlgorithmURI>http://www.w3.org/2000/09/xmldsig#sha1</xsd1:digestAlgorithmURI>
            <!--Optional:-->
            <xsd1:doEnableEncryptedAssertion>true</xsd1:doEnableEncryptedAssertion>
            <!--Optional:-->
            <xsd1:doSignAssertions>true</xsd1:doSignAssertions>
            <!--Optional:-->
            <xsd1:doSignResponse>true</xsd1:doSignResponse>
            <!--Optional:-->
            <xsd1:doSingleLogout>true</xsd1:doSingleLogout>
            <!--Optional:-->
            <xsd1:doValidateSignatureInRequests>true</xsd1:doValidateSignatureInRequests>
            <!--Optional:-->
            <xsd1:enableAttributeProfile>true</xsd1:enableAttributeProfile>
            <!--Optional:-->
            <xsd1:enableAttributesByDefault>true</xsd1:enableAttributesByDefault>
            <!--Optional:-->
            <xsd1:idPInitSLOEnabled>true</xsd1:idPInitSLOEnabled>
            <!--Optional:-->
            <xsd1:idPInitSSOEnabled>true</xsd1:idPInitSSOEnabled>
            <!--Zero or more repetitions:-->
            <xsd1:idpInitSLOReturnToURLs>http://localhost:8090/travelocity.com/home.jsp</xsd1:idpInitSLOReturnToURLs>
            <!--Optional:-->
            <xsd1:issuer>travelocity.com</xsd1:issuer>
            <!--Optional:-->
            <xsd1:nameIDFormat>urn/oasis/names/tc/SAML/1.1/nameid-format/emailAddress</xsd1:nameIDFormat>
            <!--Zero or more repetitions:-->
            <xsd1:requestedAudiences>https://localhost:9443/oauth2/token</xsd1:requestedAudiences>
            <!--Zero or more repetitions:-->
            <xsd1:requestedRecipients>https://localhost:9443/oauth2/token</xsd1:requestedRecipients>
            <!--Optional:-->
            <xsd1:signingAlgorithmURI>http://www.w3.org/2000/09/xmldsig#rsa-sha1</xsd1:signingAlgorithmURI>
            <!--Optional:-->
            <xsd1:sloRequestURL></xsd1:sloRequestURL>
            <!--Optional:-->
            <xsd1:sloResponseURL></xsd1:sloResponseURL>
         </xsd:spDto>
      </xsd:addRPServiceProvider>
   </soapenv:Body>
</soapenv:Envelope>
```

#### ** Response:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:createApplicationResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:createApplicationResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

  
Once the SAML SSO configuration is added, the issuer details need to be
included in inbound authentication configurations of the service
provider.

  

| Parameter       | Type   | Description                                                                                                                                                                                 |
|-----------------|--------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| inboundAuthKey  | String | Specify the issuer here, which is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider. |
| inboundAuthType | String | For SAML 2.0, authentication type should be ‘samlsso’                                                                                                                                       |

| Property Name          | Property Value                                                                                                                                 |
|------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| attrConsumServiceIndex | This is the consumer service index.  The service provider should send this in the SAML request to get attributes of the authenticated subject. |

``` xml
<xsd1:inboundAuthenticationConfig>
    <!--Zero or more repetitions:-->
    <xsd1:inboundAuthenticationRequestConfigs>
        <!--Optional:-->
        <xsd1:inboundAuthKey>travelocity.com</xsd1:inboundAuthKey>
        <!--Optional:-->
        <xsd1:inboundAuthType>samlsso</xsd1:inboundAuthType>
        <!--Zero or more repetitions:-->
        <xsd1:properties>
            <!--Optional:-->
            <xsd1:name>attrConsumServiceIndex</xsd1:name>
            <!--Optional:-->
            <xsd1:value>202240762</xsd1:value>
        </xsd1:properties>
    </xsd1:inboundAuthenticationRequestConfigs>
</xsd1:inboundAuthenticationConfig>
```

###  Configuring OAuth/OpenID Connect

Permission Level: `           /admin/manage/identity          `

To add a Service Provider with OAuth capability, add an OAuth
application through the `           OAuthAdminService          ` exposed
at
`           https://<IS_HOST>:<IS_PORT>/services/OAuthAdminService          `
`           ?wsdl.          ` Replace the tag \<IS\_HOST\>:\<IS\_PORT\>
with the relevant host and port number, for example,
<https://localhost:9443/services/OAuthAdminService?wsdl> .

#### Input parameters

Parameter

Type

Description

**OAuthVersion**

String

Specify the Oauth version using this parameter. Accepted values are
'OAuth-1.0a' and 'OAuth-2.0'. If you set **OAuth Version** as
**OAuth-1.0a,** there is no need to fill the **grantTypes** parameter.
This is because this version of OAuth does not support grant types.

**applicationName**

String

Service provider name

**applicationAccessTokenExpiryTime**

String

Specify the time the application access token needs to expire. The value
needs to be specified in milliseconds.

**callbackUrl**

  

This is the exact location in the service provider's application where
an access token would be sent. This is a required field and it is
important to configure, as it is imperative that the service provider
receives the access token. This is necessary for security purposes to
ensure that the token is not compromised.

Configure multiple callback URLs

From IS 5.2.0 onwards, regex-based consumer URLs are supported when
defining the callback URL. This enables you to configure multiple
callback URLs for one application.  
For example, if you have two service providers that use the same
application, you can now define a regex pattern which will work for both
callback URLs instead of having to configure two different applications
for the two service providers. Assume the two callback URLs for your two
service providers are as follows:

-   <https://myapp.com/callback>
-   <https://testapp:8000/callback>

To configure the callback URL to work for **both** of these URLs, set it
using a regex pattern as follows:

``` java
regexp=(https://myapp.com/callback|https://testapp:8000/callback)
```

!!! note
    
    You must have the prefix ' **regexp=** ' before your regex pattern. To
    define a normal URL, you can specify the callback URL without this
    prefix.
    

**grantTypes**

String

  

**Allowed Grant Types - The following are the grant types that are used
to get the access token:**

**Code**

Entering the username and password required at the service provider will
result in a code being generated. This code can be used to obtain the
access token. For more information on this grant type, see this
[Authorization Code
specification](https://tools.ietf.org/html/rfc6749#section-4.1).

**Implicit**

This is similar to the code grant type, but instead of generating a
code, this directly provides the access token. For more information on
this grant type, see this [Implicit Grant
specification](https://tools.ietf.org/html/rfc6749#section-4.2).

**Password**

This authenticates the user using the password provided and the access
token is provided. For more information on this grant type, see this
[Resource Owner Password Credentials Grant
specification](https://tools.ietf.org/html/rfc6749#section-4.3).

**Client Credential**

This is the grant type for the client key and client secret. If these
two items are provided correctly by the service provider, the access
token is sent. For more information on this grant type, see this [Client
Credentials
specification.](https://tools.ietf.org/html/rfc6749#section-4.4)

**Refresh Token**

This will enable the user to obtain an access token by using the refresh
token once the originally provided access token is used up. For more
information on this grant type, see this [Refresh Token
specification](https://tools.ietf.org/html/rfc6749#section-1.5).

**SAML**

This uses SAML assertion to obtain the access token. For more
information on this grant type, see this [SAML2 Bearer
specification](https://tools.ietf.org/id/draft-ietf-oauth-saml2-bearer-23.txt)
.

**IWA-NTLM**

This is similar to the password grant type, but it is specific to
Microsoft Windows users.

**urn:ietf:params:oauth: grant-type:jwt-bearer**

This is a custom grant type. It uses a JWT token to obtain the access
token. For more information about this grant type, see this [JWT
specification](https://tools.ietf.org/html/rfc7523).

**oauthConsumerKey**

String

This the consumer key of the OAuth application. If you keep this empty,
Identity server will generate a consumer key.

**oauthConsumerSecret**

String

This the consumer secret of the OAuth application. If you keep this
empty, Identity server will generate a consumer secret.

**pkceMandatory**

Boolean

Set true if you are using the **Code** grant type. PKCE is a recommended
security measure used to mitigate a code interception attack. See
[Mitigating Authorization Code Interception
Attacks](https://docs.wso2.com/display/IS530/Mitigating+Authorization+Code+Interception+Attacks)
for more information.

**pkceSupportPlain**

Boolean

Set true if you are using PKCE.

**refreshTokenExpiryTime**

String

Specify the time the refresh token needs to expire. The value needs to
be specified in milliseconds.

**userAccessTokenExpiryTime**

String

Specify the time the user's access token needs to expire. The value
needs to be specified in milliseconds.

#### Request:

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.oauth.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:registerOAuthApplicationData>
         <!--Optional:-->
         <xsd:application>
            <!--Optional:-->
            <xsd1:OAuthVersion>?</xsd1:OAuthVersion>
            <!--Optional:-->
            <xsd1:applicationAccessTokenExpiryTime>?</xsd1:applicationAccessTokenExpiryTime>
            <!--Optional:-->
            <xsd1:applicationName>?</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:callbackUrl>?</xsd1:callbackUrl>
            <!--Optional:-->
            <xsd1:grantTypes>?</xsd1:grantTypes>
            <!--Optional:-->
            <xsd1:oauthConsumerKey>?</xsd1:oauthConsumerKey>
            <!--Optional:-->
            <xsd1:oauthConsumerSecret>?</xsd1:oauthConsumerSecret>
            <!--Optional:-->
            <xsd1:pkceMandatory>?</xsd1:pkceMandatory>
            <!--Optional:-->
            <xsd1:pkceSupportPlain>?</xsd1:pkceSupportPlain>
            <!--Optional:-->
            <xsd1:refreshTokenExpiryTime>?</xsd1:refreshTokenExpiryTime>
            <!--Optional:-->
            <xsd1:userAccessTokenExpiryTime>?</xsd1:userAccessTokenExpiryTime>
         </xsd:application>
      </xsd:registerOAuthApplicationData>
   </soapenv:Body>
</soapenv:Envelope>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd" xmlns:xsd1="http://dto.oauth.identity.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:registerOAuthApplicationData>
         <!--Optional:-->
         <xsd:application>
            <!--Optional:-->
            <xsd1:OAuthVersion>OAuth-2.0</xsd1:OAuthVersion>
            <!--Optional:-->
            <xsd1:applicationAccessTokenExpiryTime>3600</xsd1:applicationAccessTokenExpiryTime>
            <!--Optional:-->
            <xsd1:applicationName>playground</xsd1:applicationName>
            <!--Optional:-->
            <xsd1:callbackUrl>http://localhost:8080/playground2/oauth2client</xsd1:callbackUrl>
            <!--Optional:-->
            <xsd1:grantTypes>refresh_token urn:ietf:params:oauth:grant-type:saml2-bearer implicit password client_credentials iwa:ntlm authorization_code</xsd1:grantTypes>
            <!--Optional:-->
            <xsd1:pkceMandatory>false</xsd1:pkceMandatory>
            <!--Optional:-->
            <xsd1:pkceSupportPlain>true</xsd1:pkceSupportPlain>
            <!--Optional:-->
            <xsd1:refreshTokenExpiryTime>84000</xsd1:refreshTokenExpiryTime>
            <!--Optional:-->
            <xsd1:userAccessTokenExpiryTime>3600</xsd1:userAccessTokenExpiryTime>
         </xsd:application>
      </xsd:registerOAuthApplicationData>
   </soapenv:Body>
</soapenv:Envelope>
```

#### ** Response:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:registerOAuthApplicationDataResponse xmlns:ns="http://org.apache.axis2/xsd">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:registerOAuthApplicationDataResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

  

Once OAuth application is created, you can retrieve the OAuth consumer
key and OAuth consumer secret by calling
`            getOAuthApplicationDataByAppName           ` service
method.

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsd="http://org.apache.axis2/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <xsd:getOAuthApplicationDataByAppName>
         <!--Optional:-->
         <xsd:appName>playground</xsd:appName>
      </xsd:getOAuthApplicationDataByAppName>
   </soapenv:Body>
</soapenv:Envelope>
```

  
Once the OAuth configuration is added, the OAuth consumer key/secret
details need to be included in inbound authentication configurations of
the service provider.

  

  

| Parameter       | Type   | Description                                       |
|-----------------|--------|---------------------------------------------------|
| inboundAuthKey  | String | OAuth Client Key                                  |
| inboundAuthType | String | For OAuth, authentication type should be ‘oauth2' |

| Property Name       | Property Value      |
|---------------------|---------------------|
| oauthConsumerSecret | OAuth client secret |

``` xml
<xsd1:inboundAuthenticationConfig>
    <!--Zero or more repetitions:-->
    <xsd1:inboundAuthenticationRequestConfigs>
        <!--Optional:-->
        <xsd1:inboundAuthKey>li6JMbjW6WDMKTWsRnGcjp5zcGhi</xsd1:inboundAuthKey>
        <!--Optional:-->
        <xsd1:inboundAuthType>oauth2</xsd1:inboundAuthType>
        <!--Zero or more repetitions:-->
        <xsd1:properties>
            <!--Optional:-->
            <xsd1:name>oauthConsumerSecret</xsd1:name>
            <!--Optional:-->
            <xsd1:value>NMB3EAfxh4YvSTqbb3iMkongAHjW</xsd1:value>
        </xsd1:properties>
    </xsd1:inboundAuthenticationRequestConfigs>
</xsd1:inboundAuthenticationConfig>
```

  

### Configuring WS-Trust Security Token service

Permission Level: `          /admin/manage/identity         `

To configure a service provider with the WS-Trust Security Token Service
(STS), add a trusted service through the
`          STSAdminService         ` exposed at
`          https://<IS_HOST>:<IS_PORT>/services/STSAdminService?wsdl.         `
Replace the tag `          <IS_HOST>:<IS_PORT>         ` with the
relevant host and port number, for example,
<https://localhost:9443/services/STSAdminService?wsdl> .

#### Input parameters

<table style="width:100%;">
<colgroup>
<col style="width: 13%" />
<col style="width: 7%" />
<col style="width: 78%" />
</colgroup>
<thead>
<tr class="header">
<th>Parameter</th>
<th>Type</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><strong>serviceAddress</strong></td>
<td>String</td>
<td><p>Specify the endpoint address or the trusted relying party.</p></td>
</tr>
<tr class="even">
<td><strong>certAlias</strong></td>
<td>String</td>
<td>Specify the certificate alias of the imported public certificate of the trusted relying party.</td>
</tr>
</tbody>
</table>

#### Request:

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.sts.security.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:addTrustedService>
         <!--Optional:-->
         <ser:serviceAddress>?</ser:serviceAddress>
         <!--Optional:-->
         <ser:certAlias>?</ser:certAlias>
      </ser:addTrustedService>
   </soapenv:Body>
</soapenv:Envelope>
```

![](images/icons/grey_arrow_down.png){.expand-control-image} Sample
Request...

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.sts.security.carbon.wso2.org">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:addTrustedService>
         <!--Optional:-->
         <ser:serviceAddress>https://www.example.com/sts</ser:serviceAddress>
         <!--Optional:-->
         <ser:certAlias>wso2carbon</ser:certAlias>
      </ser:addTrustedService>
   </soapenv:Body>
</soapenv:Envelope>
```

#### ** Response:**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Body>
      <ns:addTrustedServiceResponse xmlns:ns="http://service.sts.security.carbon.wso2.org">
         <ns:return xsi:nil="true" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"/>
      </ns:addTrustedServiceResponse>
   </soapenv:Body>
</soapenv:Envelope>
```

  

Once the trusted service is registered, the service address needs to be
included in inbound authentication configurations of the service
provider.

  

| Parameter       | Type   | Description                                                                      |
|-----------------|--------|----------------------------------------------------------------------------------|
| inboundAuthKey  | String | The endpoint address of the trusted relying party.                               |
| inboundAuthType | String | For WS-Trust Security Token Service, the authentication type should be ‘wstrust’ |

``` xml
<xsd1:inboundAuthenticationConfig>
    <!--Zero or more repetitions:-->
    <xsd1:inboundAuthenticationRequestConfigs>
        <!--Optional:-->
        <xsd1:inboundAuthKey>https://www.example.com/sts</xsd1:inboundAuthKey>
        <!--Optional:-->
        <xsd1:inboundAuthType>wstrust</xsd1:inboundAuthType>
    </xsd1:inboundAuthenticationRequestConfigs>
</xsd1:inboundAuthenticationConfig>
```

### Configuring WS-Federation (passive)

To configure a service provider with the WS-Federation (passive), you
only need to include following parameters in inbound authentication
configurations of the service provider.

  

<table>
<thead>
<tr class="header">
<th><p>Parameter</p></th>
<th><p>Type</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p><code>                inboundAuthKey               </code></p></td>
<td><p>String</p></td>
<td><p>Passive STS realm identifier</p></td>
</tr>
<tr class="even">
<td><p><code>                inboundAuthType               </code></p></td>
<td><p>String</p></td>
<td><p>For Passive STS configuration, the authentication type should be ‘passivests’.</p></td>
</tr>
<tr class="odd">
<td><code>               passiveSTSWReply              </code></td>
<td>String</td>
<td>Provide the URL of the web app.<br />
For example: <code>               https://localhost:8080/PassiveSTSSampleApp/index.jsp              </code></td>
</tr>
</tbody>
</table>

``` xml
<xsd1:inboundAuthenticationConfig>
    <!--Zero or more repetitions:-->
    <xsd1:inboundAuthenticationRequestConfigs>
        <!--Optional:-->
        <xsd1:inboundAuthKey>TestSP</xsd1:inboundAuthKey>
        <!--Optional:-->
        <xsd1:inboundAuthType>passivests</xsd1:inboundAuthType>
            <xsd1:properties>
                <xsd1:name>passiveSTSWReply</name>
                <xsd1:value>{url}</value>
            </xsd1:properties>
    </xsd1:inboundAuthenticationRequestConfigs>
</xsd1:inboundAuthenticationConfig>
```

**Related Links**

-   See [Using APIs](Using-APIs) for key APIs relevant for Developers
-   See [Permissions Required to Invoke Admin
    Services](../../references/permissions-required-to-invoke-admin-services) for a
    list of the operations that can be performed with different
    permission levels
-   The following article guides you through transforming existing
    SOAP-based services into REST services in WSO2 Identity Server:
    [Exposing WSO2 Identity Server Admin Services the REST
    Way](http://wso2.com/library/articles/2016/10/article-exposing-wso2-identity-server-admin-services-the-rest-way/#step2)
    .
