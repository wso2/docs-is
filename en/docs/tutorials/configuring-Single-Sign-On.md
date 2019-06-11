# Configuring Single Sign-On

Single sign-on is a key feature of the WSO2 Identity Server that enables
users to access multiple applications using the same set of credentials.
Additionally, the user can access all these applications without having
to log into each application individually. For instance, if users log
into application A, they would automatically have access to application
B as well for the duration of that session without having to re-enter
their credentials.

The profile specification for Security Assertion Markup Language 2.0
(SAML 2.0) defines single sign-on based on a web browser. This topic
provides instructions on how to use the sample available in the WSO2
Identity Server to configure SSO using SAML 2.0 with a sample service
provider.

!!! Info
	  You can find more information regarding the SAML2 and SAML2 Web Browser
	  SSO Profile in the
	  [saml-core](https://docs.oasis-open.org/security/saml/v2.0/saml-core-2.0-os.pdf)
	  specification and the
	  [saml-profile](https://docs.oasis-open.org/security/saml/v2.0/saml-profiles-2.0-	  os.pdf)
	  specification.

!!! Note

    Before you begin!

    -   To ensure you get the full understanding of this tutorial, the
        sample Travelocity application is used in this use case. Therefore,
        make sure to [download the samples](/using-wso2-identity-server/downloading-a-sample) before
        you begin.
    -   [Download Tomcat 7.x](https://tomcat.apache.org/download-70.cgi).
        The  samples are written on Servlet 3.0. Therefore, they need to be
        deployed on Tomcat 7.x.
    -   Install Apache Maven. For more information, see [Installation
        Prerequisites](/installation-guide/installation-prerequisites) .


### Configuring the SSO web application

To obtain and configure the single sign-on Travelocity sample, follow
the steps below.

1.  Add the following entry to the `            /etc/hosts           `
    file of your machine to configure the hostname.
    ``` bash
      127.0.0.1  wso2is.local
    ```

    ??? Info "For more information, click to expand"

    	  Some browsers do not allow creating cookies for a naked hostname,
    	  such as `             localhost            ` . Cookies are required
    	  when working with SSO. Therefore, to ensure that the SSO
    	  capabilities work as expected in this tutorial, you need to
    	  configure the `             etc/host            ` file as explained
    	  in this step.

    	  The `             etc/host            ` file is a read-only file.
    	  Therefore, you won't be able to edit it by opening the file via a
    	  text editor. To avoid this, edit the file using the terminal
    	  commands.  
    	  For example, use the following command if you are working on a
    	  Mac/Linux environment.

   	     ``` java
    	    sudo nano /etc/hosts
   	     ```


2.  Open the `            travelocity.properties           ` file found
    in the
    `            is-samples/modules/samples/sso/sso-agent-sample/src/main/resources           `
    directory of the samples folder you just checked out. Configure the
    following property with the hostname (
    `            wso2is.local           ` ) that you configured above.

    ``` text
     #The URL of the SAML 2.0 Assertion Consumer
     SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp
    ```

3.  In your terminal, navigate to
    `            is-samples/modules/samples/sso/sso-agent-sample           `
    folder and build the sample using the following command. You must
    have Apache Maven installed to do this

    ``` java
      mvn clean install
    ```

4.  After successfully building the sample, a
    `            .war           ` file named **travelocity.com** can be
    found inside the
    `            is-samples/sso/sso-agent-sample/           `
    `            target           ` directory. Deploy this sample web
    app on a web container. To do this, use the Apache Tomcat server.

    !!! info

        Since this sample is written based on Servlet 3.0 it needs to be
        deployed on [Tomcat 7.x](https://tomcat.apache.org/download-70.cgi)
        .


    Use the following steps to deploy the web app in the web container:

    1.  Stop the Apache Tomcat server if it is already running.
    2.  Copy the
        `                           travelocity.com.war                         `
        file to the `             <TOMCAT_HOME>/webapps            `
        directory.
    3.  Start the Apache Tomcat server.

!!! Note

    If you wish to change properties like the issuer ID, consumer URL, and
    IdP URL, you can edit the **travelocity.properties** file found in the
    `          travelocity.com/WEB-INF/classes         ` directory. If the
    service provider is configured in a tenant you can use the
    `          QueryParams         ` property to send the tenant domain.
    For  example, `          QueryParams=tenantDomain=wso2.com         ` .

    This sample uses the following default values.

    | Properties                                                                                                  | Description                                                         |
    |-------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
    | `              SAML2.SPEntityId=travelocity.com             `                                               | A unique identifier for this SAML 2.0 Service Provider application. |
    | `               SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp              ` | The URL of the SAML 2.0 Assertion Consumer.                         |
    | `               SAML2.IdPURL=https://localhost:9443/samlsso              `                                  | The URL of the SAML 2.0 Identity Provider.                          |

    If you edit the
    `                     travelocity.properties                   ` file,
    you must restart the Apache Tomcat server for the changes to take
    effect.


Now the web application is successfully deployed on a web container.

### Configuring the service provider

The next step is to configure **travelocity.com** as the service
provider. The following steps instruct you on how to do this.

1.  Sign in to the WSO2 Identity Server [Management
    Console](/installation-guide/getting-started-with-the-management-console) using
    default administrator credentials (the username and password are
    both `          admin         ` ). If you need to create the service
    provider in a tenant space, you need to login with tenants user.
2.  On the **Main** menu, click **Identity \> Service Providers \> Add**
    .
3.  Enter `          travelocity.com         ` as the value for the
    **Service Provider Name** field and click **Register** .
4.  The **Service Providers** screen appears. Copy the content in the
    .pem file of your service provider application certificate and paste
    it as the value for **Application Certificate** . In WSO2 IS
    versions prior to WSO2 IS 5.5.0, the certificates were stored in the
    keystore file. From 5.5.0 onwards, the certificate is stored in the
    database and can be directly added via the management console using
    the **Application Certificate** field.

    !!! info

        If the **Application Certificate** field is left blank, WSO2 
        Identity server is backward compatible and follows
        the previous implementation to locate the certificates in the
        keystore.  
        This means that in the SAML SSO flow, the certificate alias
        mentioned in SAML inbound authentication configuration is used if
        the Application Certificate field is left blank.

        For more information on Application Certificate and its usage, click
    	[here](/using-wso2-identity-server/adding-and-configuring-a-service-		provider/#app-cert).

5.  Expand the **Inbound Authentication Configuration** section and then
    expand **SAML2 Web SSO Configuration** .

6.  Click **Configure** .

7.  Select **Manual Configuration** and register the new service
    provider by providing the following values.  
    ![](/assets/img/tutorials/register-new-service-provider-manual-config.png)

    ??? Info "Click here for more information on each attribute"
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
	         <td><strong>Issuer</strong></td>
	         <td>
	            <div class="content-wrapper">
	               <p>This is the entity ID for the SAML2 service provider</p>
	               <div>
	                  <p>This value should be same as the <code>                      SAML2.SPEntityId                     </code> value specified inside the <code>                      travelocity.com/WEB-INF/classes/travelocity.properties                     </code> file.</p>
	               </div>
	            </div>
	         </td>
	         <td><code>                   travelocity.com                  </code></td>
	      </tr>
	      <tr class="even">
	         <td><strong>Assertion Consumer URLs</strong></td>
	         <td>
	            <div class="content-wrapper">
	               <p>This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this ACS URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request.</p>
	               <div>
	                  <p>This value should be same as the <code>                      SAML2.AssertionConsumerURL                     </code> value mentioned inside the <code>                      travelocity.com/WEB-INF/classes/travelocity.properties                     </code> file.</p>
	               </div>
	            </div>
	         </td>
	         <td>Enter this value: <code>                   http://wso2is.local:8080/travelocity.com/home.jsp                  </code> and click <strong>Add</strong> .</td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Default Assertion Consumer URL</strong></td>
	         <td>This must be the same value defined above. If you have defined multiple <strong>Assertion Consumer URLs</strong> , this value must be the same as the <code>                   SAML2.AssertionConsumerURL                  </code> value mentioned inside the <code>                   travelocity.com/WEB-INF/classes/travelocity.properties                  </code> file as that is the default.</td>
	         <td><br />
	         </td>
	      </tr>
	      <tr class="even">
	         <td><strong>NameID format</strong></td>
	         <td>The service provider and identity provider usually communicate with each other regarding a specific subject. That subject should be identified through a Name-Identifier (NameID) , which should be in some format so that It is easy for the other party to identify it based on the format. There are some formats that are defined by SAML2 specification. Enter the default value of this format ( <code>                   urn:oasis:names:<zero-width space>tc:SAML:1.1:nameid-format:emailAddress                  </code> )</td>
	         <td><code>                   urn:oasis:names:<zero-width space>tc:SAML:1.1:nameid-format:emailAddress                  </code></td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Certificate Alias</strong></td>
	         <td>
	            <div class="content-wrapper">
	               <p>This is used to validate the signature of SAML2 requests and is used to generate encryption.</p>
	               !!! tip
	               <p>From WSO2 IS 5.5.0 onwards, the .pem certificate can be updated via the Service Provider screen in the management console UI using the <strong>Application Certificate</strong> field. If the certificate has been entered in the Application Certifiate field, the system will use the certificate given there and override the certificate alias field.</p>
	               <p>However, if the Application Certificate field has been left blank, the certificate specified in <strong>Certificate Alias</strong> will be used.</p>
	            </div>
	         </td>
	         <td>
	            <p>Select <code>                    wso2carbon                   </code></p>
	            <p><code>                    In a tenant : Select the Certificate Alias with tenant domain name                                       </code></p>
	         </td>
	      </tr>
	      <tr class="even">
	         <td><strong>Response Signing Algorithm</strong></td>
	         <td>Specifies the ‘SignatureMethod’ algorithm to be used in the ‘Signature’ element in POST binding.<br />
	            <br />
	            The default value can be configured by adding the following property to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder. If it is not provided, the default algorithm is RSA­SHA 1, at URI  <code>                   http://www.w3.org/2000/09/xmldsig#rsasha1                  </code> .
```
[saml] 
signing_alg= 
```
	         </td>
	         <td><code>                   http://www.w3.org/2000/09/xmldsig#rsasha1                  </code></td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Response Digest Algorithm</strong></td>
	         <td>Specifies the ‘DigestMethod’ algorithm to be used in the ‘Signature’ element in POST binding.<br />
	            <br />
	            The default value can be configured by adding the following property to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder. If it is not provided the default algorithm is SHA 1, at URI <code>                   http://www.w3.org/2000/09/xmldsig#sha1                  </code> .
```
[saml] 
digest_alg= 
```
	         </td>
	         <td><code>                   http://www.w3.org/2000/09/xmldsig#sha1                  </code></td>
	      </tr>
	      <tr class="even">
	         <td><strong>Assertion Encryption Algorithm</strong></td>
	         <td>The algorithm that the SAML2 assertion is encrypted.<br />
	            <br />
	            The default value can be configured by adding the following property to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder. If it is not provided the default algorithm is <code>                   aes256-cbc                  </code> , at URI <code>                   http://www.w3.org/2001/04/xmlenc#aes256-cbc                  </code> .
```
[saml] 
assertion_encryption_alg= 
```
	         </td>
	         <td><code>                   http://www.w3.org/2001/04/xmlenc#aes256-cbc                  </code></td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Key Encryption Algorithm</strong></td>
	         <td>The algorithm that the SAML2 key is encrypted.  The default value can be configured by adding the following property to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder. If it is not provided the default algorithm is <code>                   rsa-oaep-mgf1                  </code> , at URI <code>                   http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p                  </code> .
```
[saml] 
key_encryption_alg= 
```
</td>
	         <td><code>                   http://www.w3.org/2001/04/xmlenc#rsa-oaep-mgf1p                  </code></td>
	      </tr>
	      <tr class="even">
	         <td><strong>Enable Response Signing</strong></td>
	         <td>
	            <p>This is used to sign the SAML2 Responses returned after the authentication process is complete.</p>
	            <p><br />
	            </p>
	         </td>
	         <td>Set as true by selecting the checkbox</td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Enable Signature Validation in Authentication Requests and Logout Requests</strong></td>
	         <td>This specifies whether the identity provider must validate the signature of the SAML2 authentication request and the SAML2 logout request that are sent by the service provider.</td>
	         <td>Leave unchecked for travelocity sample</td>
	      </tr>
	      <tr class="even">
	         <td><strong>Enable Assertion Encryption</strong></td>
	         <td>This defines whether the SAML2 assertion must be encrypted or not. <strong></strong></td>
	         <td>Leave unchecked for travelocity sample</td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Enable Single Logout</strong></td>
	         <td>Enable this to ensure that all sessions are terminated once the user signs out from one server.</td>
	         <td>Set this as true by selecting the checkbox</td>
	      </tr>
	      <tr class="even">
	         <td><strong>SLO Response URL</strong></td>
	         <td>If the service provider has a different endpoint which accepts single logout response other than the assertion consumer URL, you can provide that endpoint value here.</td>
	         <td><br />
	         </td>
	      </tr>
	      <tr class="odd">
	         <td><strong>SLO Request URL</strong></td>
	         <td>If the service provider has a different endpoint which accepts single logout requests from the identity server other than the assertion consumer URL, you can provide that endpoint value here.</td>
	         <td><br />
	         </td>
	      </tr>
	      <tr class="even">
	         <td><strong>Logout Method</strong></td>
	         <td>
	            <p>SAML single logout is supported by both SAML Back-Channel Logout and SAML Front-Channel Logout methods. By default, when you select <strong>Enable Single Logout,</strong> it will enable Back-Channel Logout . In order to enable SAML Front-Channel Logout, you can either select <strong>Front-Channel Logout (HTTP Redirect Binding)</strong> or <strong>Front-Channel Logout (HTTP POST Binding)</strong> .</p>
	         </td>
	         <td>Select <strong>Back-Channel Logout</strong> for travelocity sample</td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Enable Attribute Profile</strong></td>
	         <td>The Identity Server supports a basic attribute profile where the identity provider can include the user’s attributes in the SAML Assertions as an attribute statement. You can define the claims that must be included under service provider claim configurations. Also, once you select the “Include Attributes in the Response Always” checkbox, the identity provider always includes the attribute values related to selected claims in the SAML Attribute statement.</td>
	         <td>Leave unchecked for travelocity sample</td>
	      </tr>
	      <tr class="even">
	         <td><strong>Enable Audience Restriction</strong></td>
	         <td>You can define multiple audiences in the SAML Assertion. Configured audiences would be added into the SAML2 Assertion.</td>
	         <td>Leave unchecked for travelocity sample</td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Enable Recipent Validation</strong></td>
	         <td>Select this if you require validation from the recipient of the response.</td>
	         <td>Leave unchecked for travelocity sample</td>
	      </tr>
	      <tr class="even">
	         <td><strong>Enable IdP Initiated SSO</strong></td>
	         <td>
	            <div class="content-wrapper">
	               <p>Depending on your application flow you can choose whether to enable IdP initiated SSO. The IdP initiated SSO profile enables to start an authentication flow by sending a GET request to the Identity server with the following format.</p>
	               <code>                    https://{Hostname}:{Port}/samlsso?spEntityID={SAML2 SSO Issuer name}                   </code> !!! note
	               <p>If your SAML2 SSO issuer has been configured in any other separate tenant other than super tenant, then you need to append the <em><strong>tenantDomain</strong></em> parameter as well.</p>
	               <p>If the tenant domain is <code>                     soasecurity.org                    </code> , the GET request would be as follows: <code>                     https://localhost:9443/samlsso?spEntityID=travelocity.com&amp;tenantDomain=soasecurity.org                    </code></p>
	               <p><br />
	               </p>
	            </div>
	         </td>
	         <td>
	            <p>Leave unchecked for travelocity sample</p>
	         </td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Enable IdP initiated SLO</strong></td>
	         <td>
	            <div class="content-wrapper">
	               <p>The Identity Server facilitates IdP initiated SAML2 single logout requests. This is useful if the application can not manage the session index received with the SAML response and still wants to perform log out. The following parameters can be used with the IdP initiated SLO request:</p>
	               <ul>
	                  <li><strong>slo</strong> (mandatory parameter) - Must have the value <code>                      true                     </code> to mark the request as an IdP initiated log out request</li>
	                  <li><strong>spEntityID</strong> (optional) - Value of the parameter should be the SAML issuer name as in the <strong>Issuer</strong> field in the SAML service provider configuration UI.</li>
	                  <li>
	                     <p><strong>returnTo</strong> (optional) - Value of the parameter should be the URL that the user needs to be redirected to after the logout.</p>
	                     <p>!!! note</p>
	                     <p>If this parameter is present in the request, the <strong>spEntityID</strong> parameter must also be present.<br />
	                        Since this needs to be a trusted location, the value that comes with the request must match with one of the assertion consumer URLs or <strong>returnTo</strong> ULRs of the service provider.
	                     </p>
	                     <p>Example of a <strong>returnTo</strong> URL: <code>                       https://wso2is.local:8080/avs.com/slo                      </code></p>
	               </ul>
	            </div>
	         </td>
	         <td>Leave unchecked for travelocity sample</td>
	      </tr>
	      <tr class="even">
	         <td><strong>Enable Assertion Query Request Profile</strong></td>
	         <td>Enable Assertion Query Request Profile can used for query assertions following SAML2.0 specification. This can query assertions that are persisted to the database when you login to the service provider application. For more information, see <a href="/tutorials/querying-saml-asssertions">Querying SAML Assertions</a> .</td>
	         <td>Leave unchecked for travelocity sample</td>
	      </tr>
	      <tr class="odd">
	         <td><strong>Enable SAML2 Artifact Binding</strong></td>
	         <td>This is to define SAML2 artifact binding is enabled or not so that WSO2 Identity Server responds to each SAML SSO authentication request with an artifact. For more information, see <a href="/tutorials/configuring-saml-2.0-artifact-binding">Configuring SAML 2.0 Artifact Binding</a> .</td>
	         <td>Unselected</td>
	      </tr>
	   </tbody>
	</table>

!!! Note
		To add the correct tenant domain with the username as the
		subject identifier in tenant mode,

		Expand the **Local & Outbound Authentication Configuration** section
		and do the following.

		-   Select **Use tenant domain in local subject identifier**
		    to append the tenant domain to the local subject identifier.
		-   Select **Use user store domain in local subject identifier**
		    to append the user store domain that the user resides in the
		    local subject identifier.  
		    ![local-and-outbound-config](/assets/img/tutorials/local-and-outbound-config.png)

		    For **super tenant mode** , this step is not required and the two
		    options mentioned above should remain disabled by default.

### Configuring claims

1. Configure claims for the service provider. To do this, do the
   following.

    !!! Info
        For more information on configuring this, see
        [Configuring Claims for a Service
        Provider](/using-wso2-identity-server/configuring-claims-for-a-service-provider).
1. Expand the **Claim Configuration** section in the service provider form.
2. You can select the claims that must be sent to the service provider. If you just want to send them as claim URIs, select **Use Local Claim Dialect** .
3. Alternatively, if you want to define new claim URIs for the
        attributes that are sent, you can define any values for them and
        map these values with the claim URIs local to WSO2.  

        For example, if you want to set the email address of the user as
        `            http://serviceprovider.org/claims/emailaddress           `
        claim URI, you can define it here and map it in to
        `            http://wso2.org/claims/emailaddress           ` .
        To specify this, select the **Define Custom Claim Dialect**
        option and click **Add Claim URI** . Enter the **Service
        Provider Claim** URIs and select the matching local claim from
        the drop down. You can also mark them as a **Requested Claim**
        or a **Mandatory Claim** .

        For more information, see
        [Configuring Claims for a Service
        Provider](/using-wso2-identity-server/configuring-claims-for-a-service-provider) .  
        ![configure-sso-claims](/assets/img/tutorials/configure-sso-claims.png)

2.  Configure outbound authentication as **Default** authentication
    type. This specifies that the identity provider authenticates the
    users with the username/password by validating with the identity
    provider's user store.

3.  After providing the above information, click **Register** .

After successfully registering the service provider, log out from
management console. The next step is to run the sample.

### Running the sample

1.  Visit `          http://wso2is.local:8080/travelocity.com         `
    . You are directed to the following page:  
    ![travelocity-login](/assets/img/tutorials/travelocity-login.png)
2.  Since you need to use SAML2 for this sample, click the first link,
    i.e., **Click here to login with SAML from Identity Server** . You
    are redirected to the Identity Server for authentication.
3.  Enter the default admin credentials (admin/admin).
4.  Once you have provided the correct credentials, you are redirected
    to the consent request screen for approval.

    !!! Note

        This screen will appear at this point if WSO2 Identity
        Server has all the mandatory claim values of the user in the system.
        If not, the user will be redirected to the relevant screen and
        prompted to provide the missing mandatory claim values before
        providing consent.

        For more information about user consent in the SSO authentication
        flow, see [Consent Management with
        Single-Sign-On](/using-wso2-identity-server/consent-management-with-single-sign-on).


    ![travelocity-user-consent](/assets/img/tutorials/travelocity-user-consent.png)

5.  Select the claims that you consent to share with the Travelocity
    application and click **Approve** . You have to provide consent for
    all the mandatory claims at a minimum to complete authentication.

6.  After providing consent, you are redirected to the Travelocity
    application home page.

!!! note

    1.  To view the SAML request and response, add the following
        debug log to the `           log4j.properties          ` file found
        inside `           <PRODUCT_HOME>/repository/conf          ` .

        ``` java
        log4j.logger.org.wso2.carbon.identity=DEBUG
        ```

    2.  Since single log out is enabled, if you click the logout button in
        the travelocity.com home page, you will successfully log out.

!!! Info "Related Topics"
	   To configure single sign on with different standards or protocols,see the following topics:

	   * [Configuring Single Sign-On](/tutorials/configuring-single-sign-on)

	   * [SAML 2.0 Web SSO](/tutorials/saml-2.0-web-sso)

	   * [WS-Trust](/tutorials/ws-trust)

	   * [WS-Federation](/tutorials/ws-federation)

           * [Integrated Windows Authentication](/tutorials/integrated-windows-authentication)

           * [OAuth2-OpenID Connect](tutorials/oauth2-openid-connect)
	  
	   To set up reCaptcha for single sign on, see the following page:

	   * [Configuring reCaptcha for Single Sign On](/tutorials/configuring-recaptcha-for-single-sign-on).

	  To configure single sign on for Microsoft Sharepoint web applications with the WSO2 Identity Server, see the following article:

	   * [\[Tutorial\] SSO for Microsoft Sharepoint Web Applications with
		        WSO2 Identity
		        Server](http://wso2.com/library/tutorials/2015/05/tutorial-sso-for-microsoft-sharepoint-web-applications-with-wso2-identity-server/)
