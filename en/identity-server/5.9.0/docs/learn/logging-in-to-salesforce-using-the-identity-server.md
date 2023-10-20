# Logging in to Salesforce using the Identity Server

This topic provides instructions on how to log into
[Salesforce](https://developer.salesforce.com/) using your WSO2 Identity
Server credentials.

!!! tip "Before you begin!"
    When you log into Salesforce, you normally use an email address. So, to
    integrate this with the Identity Server, you need to configure WSO2 IS
    to enable users to log in using their email addresses.
    
    ??? note "Click here to get the steps on how configure the email address as the username."
    
    	!!! warning
			Configuring the email address as the username in an **already running
			Identity Server** is not the production recommended way. Therefore,
			**make sure to configure it before you begin working with WSO2 IS**.
        
			
		1.  Open the <IS_HOME>/repository/conf/deployment.toml file and add the following configuration.

			```xml
			[tenant_mgt]
			enable_email_domain=true
			```

		2.  Open the ` <IS_HOME>/repository/conf/claim-config.xml `
			file and configure the `               AttributeID              `
			property as mail for the
			`                               http://wso2.org/claims/username                             `
			claim URI as shown below. 

			!!! warning
				This file is checked only when WSO2 IS is starting for the first
				time. Therefore, if you haven't configured this property at the time
				of starting up the server for the first time, you will get errors at
				the start up.

			``` java
			<Claim>
			   <ClaimURI>http://wso2.org/claims/username</ClaimURI>
			   <DisplayName>Username</DisplayName>
			   <AttributeID>mail</AttributeID>
			   <Description>Username</Description>
			</Claim>
			```

		3.  Open the ` <IS_HOME>/repository/conf/identity/identity-mgt.properties `
			file and set the following property to
			`               true              `.

			!!! info 
				This step is required due to a known issue that prevents the
				confirmation codes from being removed after they are used when email
				usernames are enabled. This occurs because the '@' character and
				some special characters are not allowed in the registry. To
				overcome this issue, enable hashed usernames when saving the
				confirmation codes by configuring the properties below.

			``` xml
			UserInfoRecovery.UseHashedUserNames=true
			```

			Optionally, you can also configure the following property to
			determine which hash algorithm to use.

			``` xml
			UserInfoRecovery.UsernameHashAlg=SHA-1
			```

		4.  Configure the following set of parameters in the user store
			configuration, depending on the type of user store you are connected
			to (LDAP/Active Directory/ JDBC).
			<table border="1">
			<thead>
			<tr class="header">
			<th>Parameter</th>
			<th>Description</th>
			</tr>
			</thead>
			<tbody>
			<tr class="odd">
			<td><p><code> user_name_attribute </code></p>
			<p><br />
			</p></td>
			<td><div class="content-wrapper">
			<p>Set the mail attribute of the user. <strong>LDAP/Active Directory only</strong></p>
			<div class="code panel pdl" style="border-width: 1px;">
			<div class="codeContent panelContent pdl">
			<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">
			<code>[user_store]<br>user_name_attribute  =  "mail"</code></pre>
			</div>
			</div>
			</div></td>
			</tr>
			<tr class="even">
			<td><code>                   user_name_search_filter                  </code></td>
			<td><div class="content-wrapper">
			<p>Use the mail attribute of the user instead of <code>                     cn                    </code> or <code>                     uid                    </code>. <strong>LDAP/Active Directory only</strong></p>
			<div class="code panel pdl" style="border-width: 1px;">
			<div class="codeContent panelContent pdl">
			<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">
			<code>[user_store]<br>user_name_search_filter  =  "(&amp;(objectClass=person)(uid=?))"</code></pre>
			</div>
			</div>
			</div></td>
			</tr>
			<tr class="odd">
			<td><code>                   user_name_list_filter                  </code></td>
			<td><div class="content-wrapper">
			<p>Use the mail attribute of the user. <strong>LDAP/Active Directory only</strong></p>
			<div class="code panel pdl" style="border-width: 1px;">
			<div class="codeContent panelContent pdl">
			<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">
			<code>[user_store]<br>user_name_list_filter  =  "(&amp;(objectClass=identityPerson)(mail=*)))"</code></pre>
			</div>
			</div>
			</div></td>
			</tr>
			<tr class="odd">
			<td><code>					username_javas_cript_regex			</code></td>
			<td><div class="content-wrapper">
			<p>Change this property that is under the relevant user store manager tag as follows. This property allows you to add special characters like "@" in the username.</p>
			<div class="code panel pdl" style="border-width: 1px;">
			<div class="codeContent panelContent pdl">
			<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">

			<code>[user_store]<br>username_javas_cript_regex = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}\$"</code></pre>
			</div>
			</div>
			</div></td>
			</tr>
			<tr class="even">
			<td><code>					username_java_regex				</code></td>
			<td><div class="content-wrapper">
			<p>This is a regular expression to validate usernames. By default, strings have a length of 5 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
			<div class="code panel pdl" style="border-width: 1px;">
			<div class="codeContent panelContent pdl">
			<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">
			<code>[user_store]<br>username_java_regex = "^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$"</code></pre>
			</div>
			</div>
			</div></td>
			</tr>
			
			<tr class="odd">
			<td>						Realm configurations			</td>
			<td><div class="content-wrapper">
			<p>The <code>                     [super_admin]                    </code> username must use the email attribute of the admin user.</p>
			<div class="code panel pdl" style="border-width: 1px;">
			<div class="codeContent panelContent pdl">
			<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">
			<code>[admin_user]<br>username="admin@wso2.com"<br>password="admin"</code></pre>
			<div class="admonition note">
			<p class="admonition-title">Note</p>
			<p>Before this configuration, the user having the username admin and password admin was considered the super administrator. The super administrator user cannot be deleted.</p>
			<p>After this configuration, the user having the username admin@wso2.com is considered the super administrator. The user having the username admin is considered as a normal administrator.</p>
			<img src="../../assets/img/tutorials/realm-config.png" width="1200">
			</div>
			<div class="admonition tip">
			<p class="admonition-title">Tip</p>
			<p>If you changed the password of the admin user to something other than 'admin', start the WSO2 IS server using the -Dsetup parameter as shown in the command below.</p>
			<p><code>	sh wso2server.sh -Dsetup	</code></p>
			</div>
			</div>
			</div>
			</div>
			</tr>
			</tbody>
			</table>

			!!! info 
				With these configuration users can log in to super tenant with both
				email user name ( *[bob@gmal.com](mailto:bob@wso2.com)* ) or
				non-email user names (alice). But for tenant only email user names
				allowed (tod@ [gmail.com](http://gmail.com) @
				[wso2.com](http://wso2.com) )

			!!! note
				You can configure email user name without enabling
				**`                EnableEmailUserName               `** property,
				then users can login to both super tenant and tenant using email and
				non-email user names. But super tenant users should always use
				***@carbon.super*** at the end of user names.
	

		5.  Restart the server.

		!!! info "Related Topics"

			For more information on how to configure primary and secondary user
			stores, see [Configuring User
			Stores](../../setup/configuring-user-stores).


Let's get started!

## Configuring Salesforce

1.  Sign up as a Salesforce developer if you don't have an account. If
    you already have an account, move on to step 2 and log in to
    Salesforce.
    1.  Fill out the relevant information found in the following URL:
        <https://developer.salesforce.com/signup>
    2.  Click **Sign me up**.
    3.  You will receive a security token by email to confirm your new
        account. If you did not receive the email successfully, you will
        be able to reset it by following the steps given
        [here](https://help.salesforce.com/apex/HTViewHelpDoc?id=user_security_token.htm&language=en_US).
		
2.  Log in with your new credentials as a Salesforce developer. Do this
    by clicking the **Login** link in the top right hand side of
    [https://login.salesforce.com/](https://login.salesforce.com/?lt=de).

    !!! note
        This document is explained using the Salesforce lightning theme. If
        you are using the classic theme, follow the steps given below to
        switch to the lightning theme.

        ??? note "Click here to find the steps on how to switch from the classic to the lightning theme."
			1.  Click your username to expand the drop down.
			2.  Click **Switch to Lightning Experience**.  
				![switch-to-lightening-experience](../assets/img/tutorials/switch-to-lightening-experience.png)
			3.  Click the settings icon on the top-right-hand corner, and click
				**Set Up**.  
				![switch-from-classic](../assets/img/tutorials/switch-from-classic.png)
	
			Now you are navigated to the lightening theme of Salesforce.
    

3.  Click **Allow** to enable Salesforce to access your basic
    information.
4.  Once you are logged in, create a new domain and access it. To do
    this, do the following steps.  
    1.  Search for My Domain in the search bar that is on the left
        navigation panel.  
        ![my-domain](../assets/img/tutorials/my-domain.png)
    2.  Click **My Domain**.
    3.  In the page that appears, come up with a name for your domain.
        You can check if the domain is available by clicking the **Check
        Availability** button.
		
		!!! info 
			For the page given below to load on your browser, make sure that
			the Salesforce cookies are not blocked.

        ![sales-force-cookies](../assets/img/tutorials/sales-force-cookies.png)

    4.  If the domain is available, select **I agree to Terms and
        Conditions** and click **Register Domain** to register your new
        domain.

    5.  Once the domain is registered to your account, click the **Click
        here to login** button to test this out.

5.  On the left navigation menu, search for **Single Sign-On Settings**
    , and click it.
    
6.  In the page that appears, click **Edit** and then select the **SAML
    Enabled** check box to enable federated single sign-on using SAML.  
    ![saml-enabled](../assets/img/tutorials/saml-enabled.png)
    
7.  Click **Save** to save this configuration change.

8.  Click **New** under **SAML Single Sign-On Settings**. The following
    screen appears.  
    ![saml-sso-setting](../assets/img/tutorials/saml-sso-setting.png)
    
    Ensure that you configure the following properties.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Name</td>
    <td>SSO</td>
    </tr>
    <tr class="even">
    <td>API Name</td>
    <td>SSO</td>
    </tr>
    <tr class="odd">
    <td>Issuer</td>
    <td><code>               localhost              </code></td>
    </tr>
    <tr class="even">
	<a name = "entity-id"></a>
    <td>Entity Id</td>
    <td><code>                               https://saml.salesforce.com                             </code></td>
    </tr>
    <tr class="odd">
    <td>Identity Provider Certificate</td>
    <td><div class="content-wrapper">
    <p><code>                 wso2.crt                </code></p>
    <div class="admonition note">
	<p class="admonition-title">Note</p>
	<p>To create the Identity Provider Certificate, open your Command Line interface, traverse to the <code><IS_HOME>/repository/resources/security/ </code>directory. 
	Next you must execute the following command.
	<div class="code panel pdl" style="border-width: 1px;">
	<div class="codeContent panelContent pdl">
	<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">
	<code>keytool -export -alias wso2carbon -file wso2.crt -keystore wso2carbon.jks -storepass wso2carbon</code></pre></div></div>
	<p>Once this command is run, the wso2.crt file is generated and can be found in the <code> <IS_HOME>/repository/resources/security/</code> directory.
	 Click Choose File and navigate to this location in order to obtain and upload this file.
	</div>
    </div></td>
    </tr>
    <tr class="even">
    <td>Request Signing Certificate</td>
    <td>Default Certificate</td>
    </tr>
    <tr class="odd">
    <td>Request Signature Method</td>
    <td>RSA-SHA1</td>
    </tr>
    <tr class="even">
    <td>Assertion Decryption Certificate</td>
    <td>Assertion not encrypted</td>
    </tr>
    <tr class="odd">
    <td>SAML Identity Type</td>
    <td><p>Assertion contains User's salesforce.com username</p></td>
    </tr>
    <tr class="even">
    <td>SAML Identity Location</td>
    <td><p>Identity is in the NameIdentifier element of the Subject statement</p></td>
    </tr>
    <tr class="odd">
    <td>Service Provider Initiated Request Binding</td>
    <td>HTTP POST</td>
    </tr>
    <tr class="even">
    <td>Identity Provider Login URL</td>
    <td><code>                               https://localhost:9443/samlsso                             </code></td>
    </tr>
    <tr class="odd">
    <td>Custom Logout URL</td>
    <td><code>                               https://localhost:9443/samlsso                             </code></td>
    </tr>
    <tr class="even">
    <td>Custom Error URL</td>
    <td>Leave blank</td>
    </tr>
    <tr class="odd">
    <td>User Provisioning Enabled</td>
    <td>Leave blank</td>
    </tr>
    </tbody>
    </table>

    Click **Save** to save your configurations.

9.  Go to **Custom Settings** in the left navigation pane and click **My
    Domain**.
    
10. Click **Deploy to Users**. Click **Ok** to the confirmation message
    that appears.
    
11. In the page that appears, you must configure the **Authentication
    Configuration** section. Scroll down to this section and click
    **Edit**.
    
12. Under **Authentication Service**, select **SSO** instead of **Login
    Page**.  
    ![authentication-service-sso](../assets/img/tutorials/authentication-service-sso.png)
    
13. Click **Save**.

## Configuring the service provider

Follow the steps given below to configure salesforce as a service
provider in WSO2 IS.

1.  Sign in. Enter your username and password to log on to the
    [Management Console](../../setup/getting-started-with-the-management-console).
      
    The default username and password of the administrator is both
    **admin**.
    
2.  Navigate to the **Main** menu to access the **Identity** menu. Click
    **Add** under **Service Providers**.
    
3.  Fill in the **Service Provider Name** and provide a brief
    **Description** of the service provider. Only **Service Provider
    Name** is a required field and we use Salesforce as the name for
    this example.  
    ![service-provider-name](../assets/img/tutorials/service-provider-name.png)
    
4.  Click **Register**.

5.  Expand the **Inbound Authentication Configuration** and the **SAML2
    Web SSO Configuration** and click **Configure**.
    
6.  In the form that appears, fill out the following configuration
    details required for single sign-on. For more details about
    attributes in the following configuration refer [SAML2 Web SSO
    Configuration](../../learn/configuring-inbound-authentication-for-a-service-provider#configuring-inbound-authentication-with-saml2-web-sso)
.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Value</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Issuer</td>
    <td><code>                                 https://saml.salesforce.com                               </code></td>
    <td>This is the <code>                &lt;saml:Issuer&gt;               </code> element that contains the unique identifier of the service provider. This is <a href="#entity-id">the same value</a> you entered as the Entity-ID when creating the salesforce application. This is also the issuer value specified in the SAML Authentication Request issued by the service provider. When configuring single-sign-on across Carbon servers, ensure that this value is equal to the service_provider_id value mentioned in the <code> deployment.toml </code> file of the relying party Carbon server.</td>
    </tr>
    <tr class="even">
    <td>Assertion Consumer URL</td>
    <td nowrap>
    <details class="note" open="">
    <summary>Click here and follow the steps to get the Assertion Consumer URL.</summary>
    <p>Follow the steps given below to get the Salesforce URL:</p>
    <ol>
    <li>Login to the Salesforce developer account: <a href="https://login.salesforce.com/?lt=de">https://login.salesforce.com/</a>.</li>
    <li>Search for My Domain in the search bar that is on the left navigation panel.</li>
    <li><p>Click My Domain and you are navigated to the domain you created under the section <a href="../../learn/logging-in-to-salesforce-using-the-identity-server#configuring-salesforce">Configuring Salesforce</a>.</p></li>
    <li>Click <strong>Edit</strong> under Authentication Configurations and you are navigated to a new page having the following URl: <code>                     https://&lt;DOMAIN_NAME&gt;/domainname/EditLogin.apexp                    </code></li>
    <li>On the left navigation menu, search for <strong>Single Sign-On Settings</strong> , and click it.</li>
    <li>Click on the name of the Single Sign-On Setting you created. In this use case click <strong>SSO</strong></br>. <img src="../../assets/img/tutorials/Click-sso-setting-name.png" /></li>
    <li>Copy the URL that is defined for Login URL to access Salesforce.</br> <img src="../../assets/img/tutorials/login-url-to-access-salesforce.png" /></li>
    </ol>
    </td>
    <td width="40%">This is the URL to which the browser should be redirected to after the authentication is successful. This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this ACS URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request. In this case, you must use your Salesforce login URL. In Salesforce, click <strong>Security Controls</strong> on your left menu and then click <strong>Single Sign-On Settings</strong>. In the page that appears, click on the SSO settings that you created to view the details. Use the <strong>Salesforce Login URL</strong> listed there for this value.</td>
    </tr>
    <tr class="odd">
    <td>NameID Format</td>
    <td>The default value can be used here.</td>
    <td>This defines the name identifier formats supported by the identity provider. The service provider and identity provider usually communicate with each other regarding a specific subject. That subject should be identified through a Name-Identifier (NameID) , which should be in some format so that It is easy for the other party to identify it based on the format. Name identifiers are used to provide information regarding a user.</td>
    </tr>
    <tr class="even">
    <td>Enable Response Signing</td>
    <td>Selected</td>
    <td><p>Select <strong>Enable Response Signing</strong> to sign the SAML2 Responses returned after the authentication process.</p></td>
    </tr>
    <tr class="odd">
    <td>Enable Attribute Profile</td>
    <td>Selected</td>
    <td>Select <strong>Enable Attribute Profile</strong> to enable this and add a claim by entering the claim link and clicking the <strong>Add Claim</strong> button. The Identity Server provides support for a basic attribute profile where the identity provider can include the user’s attributes in the SAML Assertions as part of the attribute statement. Once you select the check box to <strong>Include Attributes in the Response Always</strong> , the identity provider always includes the attribute values related to the selected claims in the SAML attribute statement.</td>
    </tr>
    </tbody>
    </table>

7.  Click **Update** to save your configurations.

## Testing the configurations

Do the following steps to test out the configurations for a new user in
Salesforce and the Identity Server.

1.  Create a user in WSO2 IS.  
    1.  Once you log in to the Identity Server, navigate to the **Main**
        menu in the Management Console, click **Add** under **Users and
        Roles**.
    2.  Click **Users**. This link is only visible to users with the
        Admin role.
    3.  Click **Add New User**.  When adding a new user, use an email
        address as the username.  
        Since it is not mandatory to assign a role to a user in this
        tutorial, click **Finish**.
        
2.  Create a user in Salesforce. This user should have the same
    email address as the user in WSO2 IS  
    1.  Log in to the Salesforce developer account:
        [https://login.salesforce.com/](https://login.salesforce.com/?lt=de).
    2.  On the left navigation pane, under **ADMINISTRATION**, click
        **Users** under **Users**.
    3.  On the page that appears, click the **New User** button to
        create a new user.
    4.  Create a user with the same username as the one you created in
        the Identity Server. Click **Save** to save your changes. An
        email will be sent to the email address you provided for the
        user.

        !!! note
        
			This is mainly for testing purposes. In a real
			business scenario, you would be more likely to use Just-In-Time
			(JIT) provisioning to provision a user to Salesforce.
        

3.  Access your Salesforce login URL on an incognito or private browser.
	
	!!! info 
		The salesforce login URL is unique to your Salesforce application.
		Follow the steps given below to get this URL:

		1.  Search for My Domain in the search bar that is on the left
			navigation panel.
			
		2.  Click My Domain and you are navigated to the domain you created
			under the section [Configuring
			Salesforce](#configuring-salesforce).

		3.  Click **Edit** under Authentication Configurations and you are
			navigated to a new page having the following URl:
			`              https://<DOMAIN_NAME>/domainname/EditLogin.apexp             `
			
		4.  On the left navigation menu, expand **Security Controls**, and
			click, **Single Sign-On Settings**.
			
		5.  Click on the name of the Single Sign-On Setting you created. In
			this use case click **SSO**.  
			![single-sign-on-setting](../assets/img/tutorials/single-sign-on-setting.png)
			
		6.  Copy the URL that is defined for Login URL to access
			Salesforce.  
			![login-url-for-salesforce](../assets/img/tutorials/login-url-for-salesforce.png)

4.  Log in using the new credentials of the user you just created. You
    are then redirected back to Salesforce.


### Troubleshooting guidelines

Additional troubleshooting information regarding any Salesforce side SSO
failures can be retrieved by using Salesforce SAML Assertion Validator.
Further information regarding the steps are available
[here](https://developer.salesforce.com/docs/atlas.en-us.sso.meta/sso/sso_saml_validation_errors.htm#!)
.
