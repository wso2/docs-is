# Configure SAML 2.0 Web SSO

In a single sign on system there are two roles; Service Providers and
Identity Providers. The important characteristic of a single sign on
system is the pre-defined trust relationship between the service
providers and the identity providers. Service providers trust the
assertions issued by the identity providers and the identity providers
issue assertions based on the results of authentication and
authorization of principles which access services on the service
provider's side.

SAML 2.0 web browser-based single-sign-on profile is defined under the
SAML 2.0 [Profiles specification](http://www.oasis-open.org/committees/download.php/35389/sstc-saml-profiles-errata-2.0-wd-06-diff.pdf). 
In a web browser-based SSO system, the flow can be started by the user
either by attempting to access a service at the service provider, or by
directly accessing the identity provider itself.

## Preliminary Configs

Follow the steps below to navigate to the federated authenticators configuration section.

!!! tip "Before you begin"

	1.	[Run WSO2 Identity Server](../../../deploy/get-started/running-the-product/).

	2.	Sign in to the WSO2 Identity Server [Management Console](../../../deploy/get-started/getting-started-with-the-management-console/) at `https://<SERVER_HOST>:9443/carbon` as an administrator. 	  

   
1.  On the **Main** menu of the Management Console, click **Identity > Identity Providers > Add**.

	<img src="../../../assets/img/guides/add-identity-provider-menu-item.png" alt="Add Identity Provider menu-item" width="200" style="border:1px solid grey">  
    
2.  Enter a suitable name for the identity provider in the **Identity Provider Name** text box.

	<img src="../../../assets/img/guides/add-identity-provider-screen.png" alt="Add Identity Provider screen" width="700" style="border:1px solid grey"> 

3.	Under the **Federated Authenticators** section, click **SAML2 Web SSO Configuration**.

	<img src="../../../assets/img/guides/saml2-web-sso-configuration-option.png" alt="SAML2 Web SSO Configuration option" width="700" style="border:1px solid grey"> 

4.	Enter the following values as given below.

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
				<td>Enable SAML2 Web SSO</td>
				<td>Selecting this option enables SAML2 Web SSO to be used as an authenticator for users provisioned to the Identity Server.</td>
				<td>Selected</td>
			</tr>
			<tr class="even">
				<td>Default</td>
				<td>Selecting the <strong>Default</strong> checkbox signifies that SAML2 Web SSO is the main/default form of authentication. This removes the selection made for any other <strong>Default</strong> checkboxes for other authenticators.</td>
				<td>Selected</td>
			</tr>
			<tr class="odd">
				<td>Service Provider Entity Id</td>
				<td><p>This is the entity Id of the Identity Server. This can be any value but when you configure a service provider in the external IDP you should give the same value as the Service Provider Entity Id.</p></td>
				<td><p>wso2is</p></td>
			</tr>
			<tr class="even">
				<td>NameID format</td>
				<td><p>This is the NameID format to be used in the SAML request. By default, it has <code>urn:oasis:names\:tc:SAML:1.1:nameid-format:unspecified</code>. But you can change this as per the identity provider.</p></td>
				<td><code>urn:oasis:names\:tc:SAML:1.1:nameid-format:unspecified</code></td>
			</tr>
		</tbody>
	</table>

	You proceed with the subsequent steps based on your preferred configuration mode.

---

### Manual Configs

To configure manually, 

1.	Perform the [preliminary configs](#preliminary-configs).

2.	Enter the required values as given below. 

	<img src="../../../assets/img/guides/saml2-web-sso-configuration-screen.png" alt="SAML2 Web SSO Configuration screen" width="700" style="border:1px solid grey"> 

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
					<td>Select Mode</td>
					<td>Select the mode to decide the input method for SAML configuration. You can have manual configuration or Metadata data configuration where an .xml metadata file is uploaded.</td>
					<td><code>Manual configuration</code></td>
				</tr>
			<tr class="even">
				<td>Identity Provider Entity Id</td>
				<td><div class="content-wrapper">
				<p>This is basically the &lt;Issuer&gt; value of the SAML2 response from the identity provider you are configuring. This value must be a unique string among identity providers inside the same tenant. This information should be taken from the external Identity provider.</p>
				<p>In order to enable the &lt;Issuer&gt; validation in the SAML2 response from the IdP, open the <code> <IS_HOME>/repository/conf/deployment.toml </code> file and add the following configuration.</p>
				<div class="code panel pdl" style="border-width: 1px;">
				<div class="codeContent panelContent pdl">
				<div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence">
				<pre class="sourceCode xml"><code class="sourceCode xml">
				<a class="sourceLine" id="cb1-1" title="1">[authentication.authenticator.saml.parameters] </a>
				<a class="sourceLine" id="cb1-2" title="2">VerifyAsserstionIssuer: true </a>
				</div>
				</div>
				</div></td>
				<td><a href="https://idp.example.org/idp/shibboleth">https://idp.example.org/idp/shibboleth</a></td>
			</tr>
			<tr class="odd">
				<td>SSO URL</td>
				<td>This is the URL that you want to send the SAML request to. This information should be taken from the external Identity provider.</td>
				<td><code>https://localhost:8443/idp/profile/SAML2/Redirect/SSO</code></td>
			</tr>
			<tr>
				<td>ACS URL</td>
				<td>
					<p>This is the identity provider's SAML2 ACS URL.</p>			
				</td>
				<td>If not entered, the default ACS URL will be used.</td>
			</tr>
			<tr class="even">
				<td>Enable Authentication Request Signing</td>
				<td>Selecting this checkbox enables you to sign the authentication request. If this is enabled, you must sign the request using the private key of the identity provider.</td>
				<td>Selected</td>
			</tr>
			<tr class="odd">
				<td>Enable Assertion Encryption</td>
				<td>This is a security feature where you can encrypt the SAML2 Assertions returned after authentication. So basically, the response must be encrypted when this is enabled.</td>
				<td>Selected</td>
			</tr>
			<tr class="even">
				<td>Enable Assertion Signing</td>
				<td><p>Select <strong>Enable Assertion Signing</strong> to sign the SAML2 Assertions returned after the authentication. SAML2 relying party components expect these assertions to be signed by the Identity Server.</p></td>
				<td>Selected</td>
			</tr>
			<tr class="odd">
				<td>Enable Logout</td>
				<td>Select <strong>Enable Single Logout</strong> so that all sessions are terminated once the user signs out from one server.</td>
				<td>Selected</td>
			</tr>
			<tr class="even">
				<td>Logout URL</td>
				<td><div class="content-wrapper">
				If the external IDP support for logout you can select <strong>Enable Logout</strong> . Then you can set the URL of the external IDP, where you need to send the logout request, under <strong>Logout URL.</strong> If you do not set a value for this it will simply return to the <strong>SSO URL</strong> .
				</div></td>
				<td><a href="https://localhost:8443/idp/samlsso/logout">https://localhost:8443/idp/samlsso/logout</a></td>
			</tr>
			<tr class="odd">
				<td>Enable Logout Request Signing</td>
				<td>Selecting this checkbox enables you to sign the logout request.</td>
				<td>Selected</td>
			</tr>
			<tr class="even">
				<td>Enable Authentication Response Signing</td>
				<td><p>Select <strong>Enable Authentication Response Signing</strong> to sign the SAML2 responses returned after the authentication.</p></td>
				<td>Selected</td>
			</tr>
			<tr class="odd">
				<td>Signature Algorithm</td>
				<td><p>Specifies the ‘SignatureMethod’ algorithm to be used in the ‘Signature’ element in POST binding and “SigAlg” HTTP Parameter in REDIRECT binding. The expandable Signature Algorithms table below lists the usable algorithms and their respective URIs that will be sent in the actual SAMLRequest.</p></td>
				<td>Default value: <code>RSA with SHA1</code></td>
			</tr>
			<tr class="even">
				<td>Digest Algorithm</td>
				<td><p>Specifies the ‘DigestMethod’ algorithm to be used in the ‘Signature’ element in POST binding. The Digest Algorithms table below lists the usable algorithms and their respective URIs that will be sent in the actual SAMLRequest.</p></td>
				<td>Default value: <code>SHA1</code></td>
			</tr>
			<tr class="odd">
				<td>Attribute Consuming Service Index</td>
				<td>Specifies the ‘AttributeConsumingServiceIndex’ attribute.</td>
				<td>By default this would be empty, therefore that attribute would not be sent unless filled.</td>
			</tr>
			<tr class="even">
				<td>Enable Force Authentication</td>
				<td>Enable force authentication or decide from the incoming request. This affects ‘ForceAuthn’ attribute.</td>
				<td>Default value: <code>As Per Request</code></td>
			</tr>
			<tr class="odd">
				<td>Include Public Certificate</td>
				<td>Include the public certificate in the request.</td>
				<td>Selected by default</td>
			</tr>
			<tr class="even">
				<td>Include Protocol Binding</td>
				<td>Include ‘ProtocolBinding’ attribute in the request.</td>
				<td>Selected by default</td>
			</tr>
			<tr class="odd">
				<td>Include NameID Policy</td>
				<td>Include ‘NameIDPolicy’ element in the request.</td>
				<td>Selecte d by default</td>
			</tr>
			<tr class="even">
				<td>Include Authentication Context</td>
				<td>Include a new ‘RequestedAuthnContext’ element in the request, or reuse from the incoming request.</td>
				<td>Default value: <code>Yes</code></td>
			</tr>
			<tr class="odd">
				<td>Authentication Context Class</td>
				<td><p>Choose an <a href="https://docs.oasis-open.org/security/saml/v2.0/saml-authn-context-2.0-os.pdf">Authentication Context Class Reference</a> (AuthnContextClassRef) to be included in the requested authentication context from the Identity Server which specifies the authentication context requirements of authentication statements returned in the response. Authentication Context Class table below lists the usable classes and their respective URIs that will be sent in the SAMLRequest from the Identity Server to trusted IdP.</p></td>
				<td>Default value: <code>             PasswordProtectedTransport            </code> .</td>
			</tr>
			<tr class="even">
				<td>Authentication Context Comparison Level</td>
				<td><p>Choose the Requested Authentication Context ‘Comparison’ attribute to be sent which specifies the comparison method used to evaluate the requested context classes or statements.</p>
					<ul>
					<li>If Comparison is set to "exact" or omitted, then the resulting authentication context in the authentication statement MUST be the exact match of at least one of the authentication contexts specified.</li>
					<li>If Comparison is set to "minimum", then the resulting authentication context in the authentication statement MUST be at least as strong (as deemed by the responder) as one of the authentication contexts specified.</li>
					<li>If Comparison is set to "better", then the resulting authentication context in the authentication statement MUST be stronger (as deemed by the responder) than any one of the authentication contexts specified.</li>
					<li>If Comparison is set to "maximum", then the resulting authentication context in the authentication statement MUST be as strong as possible (as deemed by the responder) without exceeding the strength of at least one of the authentication contexts specified.</li>
					</ul>
				</td>
				<td>Default value: <code>Exact</code></td>
			</tr>
			<tr class="odd">
				<td>SAML2 Web SSO User Id Location</td>
				<td>Select whether the User ID is found in 'Name Identifier' or if it is found among claims. If the user ID is found amongthe claims, it can override the <strong>User ID Claim URI</strong> configuration in the <a href="../../learn/configuring-claims-for-an-identity-provider">identity provider claim mapping section</a> .</td>
				<td>User ID found among claims</td>
			</tr>
			<tr class="even">
				<td>HTTP Binding</td>
				<td>Select the HTTP binding details that are relevant for your scenario. This refers to how the request is sent to the identity provider. <strong>HTTP-Redirect</strong> and <strong>HTTP-POST</strong> are standard means of sending the request. If you select <strong>As Per Request</strong> it can handle any type of request.</td>
				<td>HTTP-POST</td>
			</tr>
			<tr class="odd">
				<td>Response Authentication Context Class</td>
				<td>Select <strong>As Per Response</strong> to pass the <code>             AuthnContextClassRef            </code> received from the configured identity provider to the service provider. Select <strong>Default</strong> to pass the default <code>             AuthnContextClassRef            </code> instead.<br />
				<br />
				The <code>             AuthnContextClassRef            </code> specifies how the user has been authenticated by the IdP (e.g. via username/password login, via certificate etc.)</td>
				<td>As Per Response</td>
			</tr>
			<tr class="even">
				<td>Additional Query Parameters</td>
				<td><div class="content-wrapper">
				<p>This is necessary if you are connecting to another Identity Server or application. Sometimes extra parameters are required by this IS or application so these can be specified here. These will be sent along with the SAML request.</p>
				<div class="admonition info">
				<p class="admonition-title">Info</p>
				<p>If you want to send query parameters that need to be updated dynamically with each SAML request, the value needs to be defined within parenthesis.This value should be the key of the query parameter sent in the SAML request URL.<br />
				Example: <code>                locale={lang}               </code></p>
				<p>Multiple parameters can be defined by separation of query parameters using the <code>                &amp;               </code> character.</p>
				<div>
				Example: <code>                locale={lang}&amp;scope=openid email profile               </code>
				</div>
				</div>
				</div></td>
				<td><code>             paramName1=value1            </code></td>
			</tr>
		</tbody>
	</table> 

3.	Click **Register**.

??? note "Information on security algorithms"

	The following table lists out the security algorithms and their
	respective URI.

	| Security algorithm name | Security algorithm URI                                      |
	|-------------------------|-------------------------------------------------------------|
	| DSA with SHA1           | http://www.w3.org/2000/09/xmldsig\#dsa­sha1                 |
	| ECDSA with SHA1         | http://www.w3.org/2001/04/xmldsig­more\#ecdsa­sha1 dsa­sha1 |
	| ECDSA with SHA256       | http://www.w3.org/2001/04/xmldsig­more\#ec dsa­sha256       |
	| ECDSA with SHA384       | http://www.w3.org/2001/04/xmldsig­more\#ec dsa­sha384       |
	| ECDSA with SHA512       | http://www.w3.org/2001/04/xmldsig­more\#ec dsa­sha512       |
	| RSA with MD5            | http://www.w3.org/2001/04/xmldsig­more\#rsa ­md5            |
	| RSA with RIPEMD160      | http://www.w3.org/2001/04/xmldsig­more\#rsa ­ripemd160      |
	| RSA with SHA1           | http://www.w3.org/2000/09/xmldsig\#rsa­sha1                 |
	| RSA with SHA256         | http://www.w3.org/2001/04/xmldsig­more\#rsa ­sha256         |
	| RSA with SHA384         | http://www.w3.org/2001/04/xmldsig­more\#rsa sha384          |
	| RSA with SHA512         | http://www.w3.org/2001/04/xmldsig­more\#rsa ­sha512         |

??? note "Information on digest algorithms"

	The following table lists out the digest algorithms and their respective
	URI.

	| Digest algorithm name | Digest algorithm URI                            |
	|-----------------------|-------------------------------------------------|
	| MD5                   | http://www.w3.org/2001/04/xmldsig­more\#md 5    |
	| RIPEMD160             | http://www.w3.org/2001/04/xmlenc\#ripemd16 0    |
	| SHA1                  | http://www.w3.org/2000/09/xmldsig\#sha1         |
	| SHA256                | http://www.w3.org/2001/04/xmlenc\#sha256        |
	| SHA384                | http://www.w3.org/2001/04/xmldsig­more\#sh a384 |
	| SHA512                | http://www.w3.org/2001/04/xmlenc\#sha512        |

??? note "Information on authentication context classes"

	The following table lists out the authentication context classes and
	their respective URI.

	| Authentication context class name               | Authentication context class URI                                                                                                            |
	|-------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
	| Internet Protocol                               | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:InternetProtocol](http://urnoasisnamestcSAML:2.0:ac:classes:InternetProtocol)                       |
	| Internet Protocol Password                      | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:InternetProtocolPassword](http://urnoasisnamestcSAML:2.0:ac:classes:InternetProtocolPassword)       |
	| Kerberos                                        | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:Kerberos](http://urnoasisnamestcSAML:2.0:ac:classes:Kerberos)                                       |
	| Mobile One Factor Unregistered                  | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:MobileOneFactorUnregistered](http://urnoasisnamestcSAML:2.0:ac:classes:MobileOneFactorUnregistered) |
	| Mobile Two Factor Unregistered                  | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:MobileTwoFactorUnregistered](http://urnoasisnamestcSAML:2.0:ac:classes:MobileTwoFactorUnregistered) |
	| Mobile One Factor Contract                      | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:MobileOneFactorContract](http://urnoasisnamestcSAML:2.0:ac:classes:MobileOneFactorContract)         |
	| Mobile Two Factor Contract                      | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:MobileTwoFactorContract](http://urnoasisnamestcSAML:2.0:ac:classes:MobileTwoFactorContract)         |
	| Password                                        | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:Password](http://urnoasisnamestcSAML:2.0:ac:classes:Password)                                       |
	| Password Protected Transport                    | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:PasswordProtectedTransport](http://urnoasisnamestcSAML:2.0:ac:classes:PasswordProtectedTransport)   |
	| Previous Session                                | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:PreviousSession](http://urnoasisnamestcSAML:2.0:ac:classes:PreviousSession)                         |
	| Public Key X.509                                | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:X509](http://urnoasisnamestcSAML:2.0:ac:classes:X509)                                               |
	| Public Key PGP                                  | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:PGP](http://urnoasisnamestcSAML:2.0:ac:classes:PGP)                                                 |
	| Public Key SPKI                                 | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:SPKI](http://urnoasisnamestcSAML:2.0:ac:classes:SPKI)                                               |
	| Public Key XML Digital Signature                | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:XMLDSig](http://urnoasisnamestcSAML:2.0:ac:classes:XMLDSig)                                         |
	| Smartcard                                       | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:Smartcard](http://urnoasisnamestcSAML:2.0:ac:classes:Smartcard)                                     |
	| Smartcard PKI                                   | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:SmartcardPKI](http://urnoasisnamestcSAML:2.0:ac:classes:SmartcardPKI)                               |
	| Software PKI                                    | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:SoftwarePKI](http://urnoasisnamestcSAML:2.0:ac:classes:SoftwarePKI)                                 |
	| Telephony                                       | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:Telephony](http://urnoasisnamestcSAML:2.0:ac:classes:Telephony)                                     |
	| Telephony (Nomadic)                             | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:NomadTelephony](http://urnoasisnamestcSAML:2.0:ac:classes:NomadTelephony)                           |
	| Telephony (Personalized)                        | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:PersonalTelephony](http://urnoasisnamestcSAML:2.0:ac:classes:PersonalTelephony)                     |
	| Telephony (Authenticated)                       | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:AuthenticatedTelephony](http://urnoasisnamestcSAML:2.0:ac:classes:AuthenticatedTelephony)           |
	| Secure Remote Password                          | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:SecureRemotePassword](http://urnoasisnamestcSAML:2.0:ac:classes:SecureRemotePassword)               |
	| SSL/TLS Certificate­Based Client Authentication | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:TLSClient](http://urnoasisnamestcSAML:2.0:ac:classes:TLSClient)                                     |
	| Time Sync Token                                 | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:TimeSyncToken](http://urnoasisnamestcSAML:2.0:ac:classes:TimeSyncToken)                             |
	| Unspecified                                     | [urn:oasis:names:tc<zero-width-space>:SAML:2.0:ac<zero-width-space>:classes:unspecified](http://urnoasisnamestcSAML:2.0:ac:classes:unspecified)                                 |

---

### File-Based Configs

!!! info "About Metadata upload"

	When configuring a service provider (SP) or federated Identity Provider (Federated IdP), the user is required to enter configuration data to facilitate exchanging authentication and authorization data between entities in a standard way. Apart from manual entering of configuration data, the Identity Server 5.3.0 provides the facility to upload configuration data using a metadata xml file or referring to metadata xml file located in a predetermined URL. These two methods of uploading configuration data enables faster entry of configuration data because it allows the user to use the same metadata xml file for multiple instances of entity configuration. In addition to SAML metadata upload, WSO2 Identity Server also supports SAML metadata download for resident Identity providers using Management Console and URL.

To configure through file upload:

1. Perform the [preliminary configs](#preliminary-configs).

2.	Enter the required values as given below. 

	<img src="../../../assets/img/guides/saml2-web-sso-configuration-file-upload-screen.png" alt="SAML2 Web SSO File Upload Configuration screen" width="700" style="border:1px solid grey"> 


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
				<td>Select Mode</td>
				<td>Select the mode to decide the input method for SAML configuration. You can have manual configuration or Metadata data configuration where an <code>.xml</code> metadata file is uploaded.</td>
				<td><code>Metadata File Configuration</code></td>
			</tr>
			<tr>
				<td>File Location</td>
				<td>This is to upload the IdP metadata file.</td>
				<td>
					<details class="example">
					    <summary>Sample</summary>
					    <p>
					    	<code>
					    		``` java 
								<EntityDescriptor
								xmlns="urn:oasis:names:tc:SAML:2.0:metadata"
								entityID="example.com">
								<IDPSSODescriptor
								WantAuthnRequestsSigned="false"
								protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
								<KeyDescriptor use="signing">
								<KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">
								<X509Data>
								<X509Certificate>
								-----BEGIN CERTIFICATE-----
								MIIC+jCCAmOgAwIBAgIJAParOnPwEkKjMA0GCSqGSIb3DQEBBQUAMIGKMQswCQYD
								VQQGEwJMSzEQMA4GA1UECBMHV2VzdGVybjEQMA4GA1UEBxMHQ29sb21ibzEWMBQG
								A1UEChMNU29mdHdhcmUgVmlldzERMA8GA1UECxMIVHJhaW5pbmcxLDAqBgNVBAMT
								I1NvZnR3YXJlIFZpZXcgQ2VydGlmaWNhdGUgQXV0aG9yaXR5MB4XDTEwMDcxMDA2
								MzMwM1oXDTI0MDMxODA2MzMwM1owdjELMAkGA1UEBhMCTEsxEDAOBgNVBAgTB1dl
								c3Rlcm4xEDAOBgNVBAcTB0NvbG9tYm8xFjAUBgNVBAoTDVNvZnR3YXJlIFZpZXcx
								ETAPBgNVBAsTCFRyYWluaW5nMRgwFgYDVQQDEw9NeSBUZXN0IFNlcnZpY2UwgZ8w
								DQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBAN6bi0llFz+R+93nLLK5BmnuF48tbODp
								MBH7yGZ1/ESVUZoYm0GaPzg/ai3rX3r8BEr4TUrhhpKUKBpFxZvb2q+yREIeDEkD
								bHJuyVdS6hvtfa89WMJtwc7gwYYkY8AoVJ94gU54GP2B6XyNpgDTXPd0d3aH/Zt6
								69xGAVoe/0iPAgMBAAGjezB5MAkGA1UdEwQCMAAwHQYDVR0OBBYEFNAwSamhuJSw
								XG0SJnWdIVF1PkW9MB8GA1UdIwQYMBaAFNa3YmhDO7BOwbUqmYU1k/U6p/UUMCwG
								CWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTANBgkq
								hkiG9w0BAQUFAAOBgQBwwC5H+U0a+ps4tDCicHQfC2SXRTgF7PlAu2rLfmJ7jyoD
								X+lFEoWDUoE5qkTpMjsR1q/+2j9eTyi9xGj5sby4yFvmXf8jS5L6zMkkezSb6QAv
								tSHcLfefKeidq6NDBJ8DhWHi/zvC9YbT0KkCToEgvCTBpRZgdSFxTJcUksqoFA==
								-----END CERTIFICATE-----
								</X509Certificate>
								</X509Data>
								</KeyInfo>
								</KeyDescriptor>
								<KeyDescriptor use="encryption">
								<KeyInfo xmlns="http://www.w3.org/2000/09/xmldsig#">
								<X509Data>
								EwpDYWxpZm9ybmlhMRQwEgYDVQQHEwtTYW50YSBDbGFyYTEeMBwGA1UEChMVU3VuIE1pY3Jvc3lz
								dGVtcyBJbmMuMRowGAYDVQQLExFJZGVudGl0eSBTZXJ2aWNlczEcMBoGA1UEAxMTQ2VydGlmaWNh
								dGUgTWFuYWdlcjAeFw0wNzAzMDcyMjAxMTVaFw0xMDEyMDEyMjAxMTVaMDsxFDASBgNVBAoTC2V4
								YW1wbGUuY29tMSMwIQYDVQQDExpMb2FkQmFsYW5jZXItMy5leGFtcGxlLmNvbTCBnzANBgkqhkiG
								HREEETAPgQ1tYWxsYUBzdW4uY29tMA0GCSqGSIb3DQEBBAUAA0EAEgbmnOz2Rvpj9bludb9lEeVa
								OA46zRiyt4BPlbgIaFyG6P7GWSddMi/14EimQjjDbr4ZfvlEdPJmimHExZY3KQ==
								 </X509Data>
								</KeyInfo>
								</KeyDescriptor>
								<ArtifactResolutionService 
										   isDefault="true"
										   index="0"
										   Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"
										   Location="https://example.com/SAML/Artifact"/>
								<SingleLogoutService
										   Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"
										   Location="https://example.com/SAML/SLO/SOAP"/>
								<SingleLogoutService
										   Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
										   Location="https://example.com/SAML/SLO/Browser"
								 ResponseLocation="https://example.com/SAML/SLO/Response"/>
								<SingleLogoutService
								Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"/>
								<SingleLogoutService
								Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"/>
								<ManageNameIDService
								Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
								ResponseLocation="https://example.com:9443/amserver/IDPMniRedirect/metaAlias/idp"/>
								<ManageNameIDService
								Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"
								Location="https://example.com:9443/amserver/IDPMniSoap/metaAlias/idp"/>
								<NameIDFormat>
								urn:oasis:names:tc:SAML:2.0:nameid-format:persistent
								</NameIDFormat>
								<NameIDFormat>
								urn:oasis:names:tc:SAML:2.0:nameid-format:transient
								</NameIDFormat>
								<SingleSignOnService
								Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect"
								Location="https://example.com:9443/amserver/SSORedirect/metaAlias/idp"/>
								<SingleSignOnService
								Binding="urn:oasis:names:tc:SAML:2.0:bindings:SOAP"
								Location="https://example.example.com:9443/amserver/SSOSoap/metaAlias/idp"/>
								</IDPSSODescriptor>
								</EntityDescriptor>
								```					    		
					    	</code>
					    </p>
					</details>
				</td>
			</tr>
		</tbody>
	</table>  

3.	Click **Register**.

---

## Advanced Configs   


!!! tip "Configure ACL URL in a production environment"
     
    The default assertion consumer URL that is sent with the SAML request
    includes the local domain and default port. In a production environment,
    you may need to change the assertion consumer URL. To do this, follow
    the steps given below:
    
    1.  Open the `<IS_HOME>/repository/conf/deployment.toml` file and add the following configuration.
    2.  Update the assertion consumer URL as
        required.
    
        ``` java
        [authentication.authenticator.saml] 
        enable=true
        SAMLSSOAssertionConsumerUrl="https://localhost:9443/commonauth"
    	```

!!! note "Configuring hostname verification"

	- In previous releases, SAML Single-Logout (SLO) requests for service
	providers were initiated without hostname verification which can impose
	a security risk. From IS 5.2.0 release onwards, certificate validation
	has been enforced and hostname verification is enabled by default. If
	you want to disable the hostname verification, open the `	<IS_HOME>/repository/conf/deployment.toml	` file
	 and add the following configuration.
	 
		``` xml
		[saml.slo] 
		host_name_verification: false
		```
	
	- If the certificate is self-signed, import the service
	provider's public key to the IS client trust store to ensure that the
	SSL handshake in the SLO request is successful. For more information on
	how to do this, see [Managing Keystores with the UI](../../../deploy/security/managing-keystores-with-the-ui) in
	the WSO2 Product Administration Guide.
    

!!! info "Related Topics"
	-   See [Configuring Shibboleth IdP as a Trusted Identity Provider](../../../guides/identity-federation/configure-shibboleth-idp-as-a-trusted-identity-provider)
		for a sample of using SAML2 Web SSO configuration.
