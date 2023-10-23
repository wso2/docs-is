# Logging in to Workday using the Identity Server

The following topics guide you through configuring Workday and the WSO2
Identity Server (IS) to enable logging into Workday through the WSO2 IS.


### Prerequisites

1.  A [Workday](http://www.workday.com/) administrator account.

2.  The WSO2 extracted public certificate (wso2carbon.jks).

    ??? note "See here for instructions on extracting and printing the public certificate"

		Extract and Print the public certificate

		1.  Open a terminal window and navigate to the
			`               <IS_HOME>/repository/resources/security/              `
			directory.
			
		2.  Run the following keytool command to extract the public
			certificate from the
			`                wso2carbon.jks               ` file, located in
			the directory mentioned above. The keystore password is wso2carbon.
			``` java
			keytool -export -alias wso2carbon -file key.crt -keystore wso2carbon.jks
			```

		!!! warning
			In a production environment you must **not** use the default `                wso2carbon.jks               ` which comes with the WSO2 Identity Server.


		3.  Run the following command to print the extracted public
			certificate.
			``` java
			openssl x509 -text -inform DER -in key.crt 
			```
			You will receive a response similar to the example below.
			``` java
            -----BEGIN CERTIFICATE-----
            MIICNTCCAZ6gAwIBAgIES343gjANBgkqhkiG9w0BAQUFADBVMQswCQYDVQQGEwJV
            UzELMAkGA1UECAwCQ0ExFjAUBgNVBAcMDU1vdW50YWluIFZpZXcxDTALBgNVBAoM
            BFdTTzIxEjAQBgNVBAMMCWxvY2FsaG9zdDAeFw0xMDAyMTkwNzAyMjZaFw0zNTAy
            MTMwNzAyMjZaMFUxCzAJBgNVBAYTAlVTMQswCQYDVQQIDAJDQTEWMBQGA1UEBwwN
            TW91bnRhaW4gVmlldzENMAsGA1UECgwEV1NPMjESMBAGA1UEAwwJbG9jYWxob3N0
            MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTousMzO
            M4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe
            0hseUdN5HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXn
            RS4HrKGJTzxaCcU7OQIDAQABoxIwEDAOBgNVHQ8BAf8EBAMCBPAwDQYJKoZIhvcN
            AQEFBQADgYEAW5wPR7cr1LAdq+IrR44iQlRG5ITCZXY9hI0PygLP2rHANh+PYfTm
            xbuOnykNGyhM6FjFLbW2uZHQTY1jMrPprjOrmyK5sjJRO4d1DeGHT/YnIjs9JogR
            Kv4XHECwLtIVdAbIdWHEtVZJyMSktcyysFcvuhPQK8Qc/E/Wq8uHSCo=
            -----END CERTIFICATE-----	
			```

### Configuring Workday

1.  Login to the Workday account as an administrator.
2.  Open the **Edit Tenant Setup** and click **Security**.
3.  Select the **Enable SAML Authentication** checkbox.  
    <!-- ![enable-saml-authentication]({{base_path}}/assets/img/tutorials/enable-saml-authentication.png) -->
4.  Enter the identity provider name and the issuer as follows.  
    -   **Identity Provider Name:** wso2\_is
    -   **Issuer:** localhost

    !!! note
    	The issuer name **must** be equal to the issuer value that
        comes with the SAML Response from the identity provider.

    <!-- ![identity-provider-and-issuer]({{base_path}}/assets/img/tutorials/identity-provider-and-issuer.png) -->

5.  Add the public certificate of the Identity Provider (which you
    extracted as a prerequisite)

6.  Click on create and insert Name, Valid To, Valid from, and the
    certificate in the interface that appears.  
    
    !!! info
		You can get the certificate's info and validate it
		[here](https://www.sslshopper.com/certificate-decoder.html).

7.  Enable the Workday initiated logout as seen below.

8.  Set the following environments.

    <!-- ![workday-environments]({{base_path}}/assets/img/tutorials/workday-environments.png) -->
    
9.  Generate a private key pair if you do not already have one. This
    certificate will be used inside the WSO2 IS to validate the incoming
    authentication and logout requests from Workday.

    <!-- ![private-key-pair]({{base_path}}/assets/img/tutorials/private-key-pair.png) -->

    !!! tip
        You can import a certificate to the WSO2 trust store using
        the following command (pw: wso2carbon).
    
        ``` java
        keytool -import -alias workday -file workday.crt -keystore client-truststore.jks
    	```

    	Restart WSO2 Identity Server after the certificate import.


10. Enter the following details and click **OK**. Finally, click
    **Done**.
    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p>Service Provider ID</p>
    <div class="admonition note">
    <p>The Service provider ID <strong>must</strong> start with <a href="http://www.workday.com/">http://www.workday.com/</a>.</p></div>
    <td><a href="http://www.workday.com/">http://www.workday.com/</a> test_app</td>
    </tr>
    <tr class="even">
    <td>Enable SP initiated SAML authentication</td>
    <td>Checked (enabled)</td>
    </tr>
    <tr class="odd">
    <td>IdP SSO Service URL</td>
    <td><a href="https://localhost:9443/samlsso">https://localhost:9443/samlsso</a></td>
    </tr>
    <tr class="even">
    <td><p>Sign SP-initiated Authentication Request</p>
    <div class="admonition note">
        <p>Enable this to sign the login request</p></div>
    <td>Checked (enabled)</td>
    </tr>
    <tr class="odd">
    <td><p>Do Not Deflate SP-initiated Authentication Request</p>
    <div class="admonition note">
        <p>Select this checkbox to disable deflating of requests</p></div>
    <td>Checked</td>
    </tr>
    <tr class="even">
    <td>Authentication Request Signature Method</td>
    <td>SHA1</td>
    </tr>
    </tbody>
    </table>

### Configuring WSO2 IS

1.  Start the IS server and log in to the management console.
2.  Navigate to **Service Providers\>Add** under the **Main** menu and
    add a new service provider.
3.  Expand the **Inbound Authentication Configuration** section, then
    the **SAML2 Web SSO Configuration** Section and click **Configure**.
    
4.  In the form that appears, fill out the following configuration
    details required for single sign-on and click **Register**.  
    <!-- ![sso-register]({{base_path}}/assets/img/tutorials/sso-register.png)  -->
    See the following table for the details.

    <table>
    <colgroup>
    <col style="width: 33%" />
    <col style="width: 33%" />
    <col style="width: 33%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Sample Value</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Issuer</td>
    <td>https://workday.com/test_app</td>
    <td>This is the <code>                &lt;saml:Issuer&gt;               </code> element that contains the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider. Ensure that this value is equal to the <strong>Service Provider ID</strong> set in the Workday configuration.</td>
    </tr>
    <tr class="even">
    <td>Assertion Consumer URL</td>
    <td><a href="https://www.workday.com/your.tenant/login-saml.flex">https://www.workday.com/your.tenant/login-saml.flex</a></td>
    <td><p>This is the URL to which the browser should be redirected to after the authentication is successful. This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this ACS URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honour the ACS URL of the SAML2 request.</p>
    <div class="admonition tip">
    <p class="admonition-title">Tip</p>
        <p>The ACS URL must be in the following format: https://www.myworkday.com/&lt;Your workday tenant name&gt;/ login-saml.flex</p></div>
    </tr>
    <tr class="odd">
    <td>NameID Format</td>
    <td>The default value can be used here.</td>
    <td>This defines the name identifier formats supported by the identity provider. The service provider and identity provider usually communicate with each other regarding a specific subject. That subject should be identified through a Name-Identifier (NameID) , which should be in some format so that It is easy for the other party to identify it based on the format. Name identifiers are used to provide information regarding a user.</td>
    </tr>
    <tr class="even">
    <td>Certificate Alias</td>
    <td>wso2carbon.cert</td>
    <td>Select the public certificate alias of the service provider (See step 8 of the Workday configuration) from the dropdown. This is used to validate the signature of SAML2 requests and is used to generate encryption. Basically, the service provider’s certificate must be selected here. Note that this can also be the Identity Server tenant's public certificate in a scenario where you are doing a tenant-specific configuration.</td>
    </tr>
    <tr class="odd">
    <td>Enable Response Signing</td>
    <td>Selected</td>
    <td><p>Select <strong>Enable Response Signing</strong> to sign the SAML2 Responses returned after the authentication process.</p></td>
    </tr>
    <tr class="even">
    <td>Enable Signature Validation in Authentication Requests and Logout Requests</td>
    <td>Selected</td>
    <td><p>This specifies whether the identity provider must validate the signature of the SAML2 authentication request and the SAML2 logout request that are sent by the service provider.</p></td>
    </tr>
    <tr class="odd">
    <td>Enable Single Logout</td>
    <td>Selected</td>
    <td><p>Select <strong>Enable Single Logout</strong> so that all sessions are terminated once the user signs out from one server. If single logout is enabled, the identity provider sends logout requests to all service providers. Basically, the identity provider acts according to the single logout profile. If the service provider supports a different URL for logout, you can enter a <strong>SLO Response URL</strong> and <strong>SLO Request URL</strong> for logging out. These URLs indicate where the request and response should go to. If you do not specify this URL, the identity provider uses the Assertion Consumer Service (ACS) URL.</p>
    <div class="admonition tip">
    <p class="admonition-title">Tip</p>
        <p>The single logout URL must be in the following format: https://www.myworkday.com/&lt;Your workday tenant name&gt;/logout-saml.flex</p></div>
    </tr>
    </tbody>
    </table>

5.  Click **Update** to save.
6.  Access the ACS URL from your browser to log in to Workday using the
    WSO2 Identity Server: https://www.myworkday.com/ \<Your workday
    tenant name\> /login-saml2.flex.

!!! info 
	To change the Issuer value that comes with SAML response through the
	Identity server, do the following:

	1.  Log in to the management console and click **Resident** under
		**Identity Providers** on the **Main** menu.
	
	2.  Expand the **Inbound Authentication Configuration** section and then
		the **SAML2 Web SSO Configuration** section.
	
	3.  Change the value of the **Identity Provider Entity ID** to the
		required Issuer value and click **Update.**  
		<!-- ![identity-provider-entity-id]({{base_path}}/assets/img/tutorials/identity-provider-entity-id.png) -->
