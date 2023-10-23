# Configure Shibboleth IdP as a Trusted Identity Provider

You can configure a SAML2 SSO web application with the WSO2 Identity
Server. In this scenario, users authenticate to the Identity Server by
providing their username and password. These credentials must be
authenticated with the enterprise user store that is deployed with the
Identity Server, making it such that only users that exist in the
enterprise user store can access the web application.

??? note "Click here for more information on enterprise users and how they can be managed effectively by the WSO2 Identity Server."
	An enterprise user is a user that has complex user attributes and
	permissions that encompass the entire enterprise. Enterprise user
	management is a complex process as it usually involves thousands of
	users accessing multiple resources, with common information used by
	multiple applications, such as usernames, telephone numbers, and system
	roles and privileges. This complexity is typically fragmented across the
	enterprise, contributing to data that is not relevant to some
	applications, inconsistent, and difficult to manage. The security aspect
	is also important as misuse can be detrimental to an enterprise. For
	example, if a user leaves the enterprise or changes roles, that user's
	permissions should be updated immediately to protect unlawful access. In
	a large enterprise, with user credentials distributed over multiple user
	stores, it may be complicated to make instant changes. Additionally,
	passwords may be compromised if users have multiple passwords to keep
	track of and write them down. Also low strength passwords may be
	susceptible to attacks and the security of the enterprise could be
	compromised.

	The WSO2 Identity Server solves the problems posed by a complex
	enterprise identity system by acting as a management tool. The Identity
	Server enables you to effectively manage the identity of the enterprise
	user, such that all user credentials and permissions can be stored by
	and accessed from the enterprise user store whenever there is an
	authentication or authorization request. The Identity Server can be
	configured for federation or single sign-on to manage access, and can
	also be configured with the underlying enterprise user store.

	![managing-enterprise-customers-in-wso2-is]({{base_path}}/assets/img/guides/managing-enterprise-customers-in-wso2-is.png)

Consider a scenario where the web application must also be accessed by
the users from some other partner organization in addition to the users
in the enterprise user store. This partner organization has their user
accounts stored in an LDAP server. The partner organization cannot
expose this LDAP server to the WSO2 Identity Server as a user store due
to security reasons. However, this partner organization has a
[Shibboleth identity
provider](https://wiki.shibboleth.net/confluence/#all-updates) that is
connected to their LDAP server. Shibboleth is one of the most widely
used and popular SAML2 identity providers. In the scenario, Shibboleth
supports SAML2 SSO and it authenticates users in the partner
organization against the LDAP server. Therefore, users from partner
organizations who wish to log in to the web application are redirected
to Shibboleth IdP and are authenticated with their own LDAP server.

With Identity Server, you can configure multiple federated identity
providers that users can be authenticated against. In this scenario,
users from the enterprise can be authenticated with the enterprise user
store and users from the partner organization can be authenticated using
Shibboleth IdP.

!!! note
    
    In this sample we have used Shibboleth version 2.0 . To find
    configuration for latest Shibboleth version refer
    <https://wiki.shibboleth.net/confluence/display/IDP30/Home>.

![authenticating-using-enterprise-userstore-and-shibolethidp]({{base_path}}/assets/img/guides/authenticating-using-enterprise-userstore-and-shibolethidp.png)

The following sections provide instructions on how to configure this
scenario.

---

## Configure Shibboleth as a SAML2 identity provider

1.  Click
    [here](http://shibboleth.net/downloads/identity-provider/latest/) to
    download latest version of Shibboleth IdP.
2.  Once you have downloaded the file, extract it into your local file
    system.
3.  Go to `           <SHIBBOLETH_HOME>/bin          ` directory and run
    the `           install.sh          ` script (run
    `           install.bat          ` if you are on Windows). This
    would install Shibboleth into the given location in your file
    system. You would be promoted with few questions as in following.

    !!! note
    
        If you do not provide a fully qualified host name during
        installation, an error may occur. Basically, it should exactly match
        the format suggested by Shibboleth, i.e.,
        [idp.example.org](http://idp.example.org) (there is a regex pattern
        in the build.xml file. You can modify it as per your requirements).
    

    The installation path that you provide will be referred to as
    `           <SHIBBOLETH_IDP_HOME>          ` . Also, this
    installation would create a keystore that can be found in the
    `           <SHIBBOLETH_IDP_HOME>/credentials          ` directory
    and a .war file that can be found in the
    `           <SHIBBOLETH_IDP_HOME>/war          ` directory.

4.  Configure a user store with Shibboleth. You can use an LDAP-based
    existing user store for this. To do this, open the
    `           login.config          ` file that is found in the
    `           <SHIBBOLETH_IDP_HOME>/conf          ` directory and
    configure your LDAP user store details. The following is a sample
    configuration for an LDAP user store.

    ``` java
    ShibUserPassAuth {
    edu.vt.middleware.ldap.jaas.LdapLoginModule required
    ldapUrl="ldap://localhost:10389"
    bindDn="uid=admin,ou=system"
    bindCredential="secret"
    baseDn="ou=users,ou=system"
    ssl="false"
    userFilter="uid={0}"
    ;
    };
    ```

5.  Enable the username/password login handler in the
    `          <SHIBBOLETH_IDP_HOME>/conf/handler.xml         ` file.
6.  Configure logging level from the
    `           <SHIBBOLETH_IDP_HOME>/conf/logging.xml          ` file.
    All the logs files would be saved in the
    `           <SHIBBOLETH_IDP_HOME>/logs          ` directory. This
    may be helpful when troubleshooting any issues.

7.  Deploy the idp.war file in a web application server. This example
    illustrates this using Apache Tomcat. To do this, copy the
    `           <SHIBBOLETH_IDP_HOME>/war/idp.war          ` file into
    the `           <TOMCAT_HOME>/webapps          ` directory.

8.  Enable HTTPS in Apache Tomcat. To do this, locate the
    `           <TOMCAT_HOME>/conf/server.xml          ` file and
    configure the HTTPS connector. The following is a sample
    configuration of how to do this.

    ``` xml
	<Connector port="8443"
	 protocol="org.apache.coyote.http11.Http11Protocol"
	 SSLImplementation="edu.internet2.middleware.security.tomcat6.DelegateToApplicationJSSEImplementation"
	 scheme="https"
	 SSLEnabled="true"
	 clientAuth="false"
	 keystoreFile="/home/asela/idp/shibboleth/credentials/idp.jks"
	 keystorePass="password" />
    ```

9.  Start the Apache Tomcat server.

10. Check the status of the server by using the following:  
    `                       https://localhost:8443/idp/status                     `

Now you have successfully configured the Shibboleth, however, there are
some additional steps that may important for you. By default, Shibboleth
adds Transient ID as the NameID in the `         subject        `
element of the SAML Assertion. The Transient ID attribute definition
exposes a randomly generated, short-lived, opaque identifier that can
later be mapped back to the user by a transient principal connector.
However, if you want to add the login name into the SAML Assertion, you
need to do the following configuration.

1.  To configure the principal Id as the NameID in the SAML Assertion,
    do the following.
    1.  Comment out the following default configuration in the
        `             <SHIBBOLETH_IDP_HOME>/conf/attribute-resolver.xml            `
        file.

        ``` xml
		<!--resolver:AttributeDefinition id="transientId" xsi:type="ad:TransientId"><resolver:AttributeEncoder xsi:type="enc:SAML1StringNameIdentifier" nameFormat="urn:mace:shibboleth:1.0:nameIdentifier"/>
		<resolver:AttributeEncoder xsi:type="enc:SAML2StringNameID" nameFormat="urn:oasis:names:tc:SAML:2.0:nameidformat:transient"/>
		</resolver:AttributeDefinition-->
        ```

    2.  Add the following configurations to replace the above commented
        out configurations.

        ``` xml
		<resolver:AttributeDefinition id="principalId" xsi:type="PrincipalName" xmlns="urn:mace:shibboleth:2.0:resolver:ad"><resolver:AttributeEncoder xsi:type="SAML2StringNameID" xmlns="urn:mace:shibboleth:2.0:attribute:encoder" nameFormat="urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified" />
		</resolver:AttributeDefinition>
        ```

2.  To configure a new policy for the principal Id, do the following.
    1.  Comment out the following default configuration in the
        `             <SHIBBOLETH_IDP_HOME>/conf/attribute-filter.xml            `
        file.

        ``` xml
		<!--afp:AttributeFilterPolicy id="releaseTransientIdToAnyone"><afp:PolicyRequirementRule xsi:type="basic:ANY"/>
		<afp:AttributeRule attributeID="transientId">
		<afp:PermitValueRule xsi:type="basic:ANY"/>
		</afp:AttributeRule>
		</afp:AttributeFilterPolicy-->
        ```

    2.  Add the following configurations to replace the above commented
        out configurations.

        ``` xml
		<afp:AttributeFilterPolicy id="releasePrincipalIdToAnyone"><afp:PolicyRequirementRule xsi:type="basic:ANY"/>
		<afp:AttributeRule attributeID="principalId">
		<afp:PermitValueRule xsi:type="basic:ANY"/>
		</afp:AttributeRule>
		</afp:AttributeFilterPolicy>
        ```

---

## Configure Identity Server as SP in Shibboleth

Now that you have configured Shibboleth as a SAML2 identity provider,
configure the Identity Server as a service provider in Shibboleth.

1.  Configure SAML2 metadata for the Identity Server. The Identity
    Server acts as a service provider for Shibboleth, so we must
    configure service provider metadata for the Identity Server. The
    Identity Server still does not support a metadata profile and you
    cannot download the metadata, so you must create the file by hand.

    1.  Create a file called wso2is.xml inside the
        `             <SHIBBOLETH_IDP_HOME>/metadata            `
        directory.

    2.  The following is the service provider metadata file content for
        the Identity Server. Add this content into the wso2is.xml file
        you created.

        ``` xml
		<EntityDescriptor entityID="wso2is" xmlns="urn:oasis:names:tc:SAML:2.0:metadata">
			<SPSSODescriptor protocolSupportEnumeration="urn:oasis:names:tc:SAML:2.0:protocol">
				<NameIDFormat>urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified</NameIDFormat>
				<AssertionConsumerService index="1" Binding="urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST" Location="https://localhost:9443/commonauth" />
			</SPSSODescriptor>
		</EntityDescriptor>
        ```

        !!! tip
        
            Here the location value would be as follows:
        
            `	https://{Identity Server Hostname} : {Port}/commonauth	`
        

2.  Configure a new relying party for Identity Sever. This basically
    involves adding a new relying party under the
    `           RelyingPartyGroup          ` element in the
    `           <SHIBBOLETH_IDP_HOME>/conf/relying-party.xml          `
    file. The configuration is as follows.

    ``` xml
    <RelyingParty id="wso2is" provider="https://idp.example.org/idp/shibboleth" defaultSigningCredentialRef="IdPCredential" defaultAuthenticationMethod="urn:oasis:names:tc:SAML:2.0:ac:classes:PasswordProtectedTransport">
        <rp:ProfileConfiguration xsi:type="saml:SAML2SSOProfile" signResponses="always" signAssertions="always" encryptAssertions="never" encryptNameIds="never"/>
    </rp:RelyingParty>
    ```

    !!! tip
    
        This configuration mentions that you must sign the SAML
        assertion and response.
    

3.  Configure the new metadata configuration file under the
    `           MetadataProvider          ` element in the
    `           <SHIBBOLETH_IDP_HOME>/conf/relying-party.xml          `
    file.

    ``` xml
    <metadata:MetadataProvider id="wso2isMD" xsi:type="FilesystemMetadataProvider" xmlns="urn:mace:shibboleth:2.0:metadata" metadataFile="/home/asela/idp/shibboleth/metadata/wso2is.xml" maintainExpiredMetadata="true"/>
    ```

    !!! tip
    
        This configuration points to the new metadata
        configuration file that you created for the Identity Server.
    
---

## Configure Shibboleth as an identity provider

You must configure Shibboleth as a SAML2 SSO federated identity provider
in the Identity Server.

1.  [Download](http://wso2.com/products/identity-server/) and
    [install]({{base_path}}/deploy/get-started/install/)
    the WSO2 Identity Server.
    
2.  [Start WSO2 Identity Server]({{base_path}}/deploy/get-started/run-the-product).

3.  Log in to WSO2 Identity Server [management
    console]({{base_path}}/deploy/get-started/get-started-with-the-management-console).
    
4.  Register new federated identity provider in the Identity Server.

    1. Log in to the Management Console using admin/admin credentials. 

    2. Click **Identity Providers >Add**.

    ![add-identity-provider]({{base_path}}/assets/img/fragments/add-identity-provider.png)

    3. Enter an **Identity Provider Name**, **Display Name**, and **Description**.

    ![registering-new-federated-idp]({{base_path}}/assets/img/guides/registering-new-federated-idp.png)  
   
    Note the following when configuring this.
    -   You need provide a name for identity provider configuration. We
        have used Shibboleth-IDP in this example.
    -   You need to upload the public certificate of Shibboleth. The
        `            <SHIBBOLETH_IDP_HOME>/credentials/idp.crt           `
        file is the public certificate required here. This is needed for
        signature validation of the SAML response and assertion.
        
5.  Expand the **Federated Authenticators** section and the **SAML2 Web
    SSO Configuration** section.  
    ![federated-authenticators-in-saml2-sso-config]({{base_path}}/assets/img/guides/federated-authenticators-in-saml2-sso-config.png) 
    Note the following when configuring this.

    <table>
    <colgroup>
    <col style="width: 33%" />
    <col style="width: 33%" />
    <col style="width: 33%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable SAML2 Web SSO</td>
    <td>Selecting this ensures that SAML2 SSO is enabled for authentication purposes. You can also set this as the default means of authentication by selecting the <strong>Default</strong> checkbox.</td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td>Identity Provider Entity Id</td>
    <td><p>This value must be the entity Id of the Shibboleth identity provider. You can obtain this value from the <code>                &lt;SHIBBOLETH_IDP_HOME&gt;/metadata/idp-metadata.xml               </code> file. There is an attribute called <code>                entityID               </code> that specifies this.</p></td>
    <td><a href="https://idp.example.org/idp/shibboleth">https://idp.example.org/idp/shibboleth</a></td>
    </tr>
    <tr class="odd">
    <td>Service Provider Entity Id</td>
    <td><p>This must be the Identity Server’s Entity Id. You can use the value that you configured in the <code>                &lt;SHIBBOLETH_IDP_HOME&gt;/metadata/wso2is.xml               </code> metadata file.</p></td>
    <td>wso2is</td>
    </tr>
    <tr class="even">
    <td>SSO URL</td>
    <td>This is the Shibboleth identity provider URL. You can obtain this value from the <code>               &lt;SHIBBOLETH_IDP_HOME&gt;/metadata/idp-metadata.xml              </code> file. This is necessary to configure as you can use HTTP-Redirect binding to send the SAML authentication request from the Identity Server to Shibboleth. This should be in the following format: <code>               https://{Shibboleth Hostname}:{Port}/idp/profile/SAML2/Redirect/SSO              </code></td>
    <td><p>https://localhost :8443/idp/profile/SAML2/Redirect/SSO</p></td>
    </tr>
    <tr class="odd">
    <td>Enable Assertion Signing</td>
    <td>This is selected to verify the SAML assertion.</td>
    <td>Selected</td>
    </tr>
    </tbody>
    </table>

    The other configurations all have default values.

6.  Click **Register**. Now you have configured Shibboleth as an
    identity provider.

---

## Configure travelocity as the service provider

Now that you have configured Shibboleth as the identity provider, you
can configure the travelocity web application as the service provider in
the Identity Server. This way, the Shibboleth identity provider acts as
a federated identity provider for travelocity.

There are two ways that you can configure the Shibboleth identity
provider as a federated identity provider.

1.  Configure the Shibboleth identity provider for federated
    authentication for the web application. Once this is configured, the
    users are redirected to the Shibboleth identity provider login page
    via the Identity Server when they try to access the web application.
    In this scenario, only the users who can be authenticated via the
    Shibboleth identity provider, can log in to the web application.
    
2.  You can configure multi-option authentication using the **Advanced
    Configuration** in the **Local and Inbound Authentication** section.
    Here you can configure one authentication step that involves two
    options for authentication. One is basic authentication that allows
    authentication of users from the enterprise user store, and the
    other option is to use Shibboleth-IDP. Once you configure this,
    users who are accessing the web application are provided with a
    login page with both options. Therefore users from Shibboleth-IDP
    and enterprise user store can both log in to the same web
    application.

To configure the service provider, do the following.

{!./includes/deploy-travelocity.md !}

### Configure the service provider

!!! note "Important"

    SAML2 POST Binding requires CORS configurations. Before configuring the service provider, add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file to allow HTTP POST requests. 

    ```toml
    [cors]
    allow_generic_http_requests = true
    allow_any_origin = false
    allowed_origins = [
        "http://localhost:8080"
    ]
    allow_subdomains = false
    supported_methods = [
        "GET",
        "POST",
        "HEAD",
        "OPTIONS"
    ]
    support_any_header = true
    supported_headers = []
    exposed_headers = []
    supports_credentials = true
    max_age = 3600
    tag_requests = false
    ```

The next step is to configure the service provider.

1.  Return to the WSO2 IS management console.

2.  Navigate to **Main**>**Identity**>**Service Providers** and click **Add**.

3.  Enter **travelocity.com** in the **Service Provider Name** text box,
    and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

    1.  Now set the configurations as follows:

        1.  **Issuer** : `               travelocity.com              `

        2.  **Assertion Consumer URL** :
            `                               http://wso2is.local:8080/travelocity.com/home.jsp                        `  
            Click Yes, in the message that appears.

    2.  Select the following check-boxes:
        1.  **Enable Response Signing**

        2.  **Enable Single Logout**

        3.  **Enable Attribute Profile**

        4.  **Include Attributes in the Response Always**  
        
        5.  **Enable Signature Validation in Authentication Requests and Logout Requests**
            

    ![edit-service-provider]({{base_path}}/assets/img/fragments/edit-service-provider-configs.png)
    
    !!! tip
        For more information on the advanced configurations
        see, [Configuring SAML2 WEB Single-Sign-On]({{base_path}}/guides/identity-federation/configure-saml-2.0-web-sso).

5.  Click **Register** to save the changes.  
    Now you are sent back to the Service Providers page.

6.  Expand the **Local and Inbound Authentication** section and do one of the following configurations.
    1.  Configure Shibboleth as a **Federated Authentication** mechanism
        by selecting the identity provider you configured from the
        dropdown.  
        ![configure-shibboleth-as-a-federated-authenticator]({{base_path}}/assets/img/guides/configure-shibboleth-as-a-federated-authenticator.png)
        
    2.  Select **Advanced Configuration** and configure multiple options
        for authentication within the same authentication step. Select
        **Username & Password** under **Local Authenticators** for authenticating
        users against the enterprise user store and select
        **Shibboleth-IDP** under **Federated Authenticators**.  
        ![multiple-options-for-authentication]({{base_path}}/assets/img/guides/multiple-options-for-authentication.png)
        
7.  Click **Update** to update the details for your service provider.

---

## Test the scenario

1.  Access `travelocity.com` sample from `
    http://wso2is.local:8080/travelocity.com `.
    
2.  You should see the following login page if you configured
    multi-option authentication.  
    ![login-page-with-multioption-authentication]({{base_path}}/assets/img/guides/login-page-with-multioption-authentication.png)
