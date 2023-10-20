# Log in to Salesforce using the Identity Server

This page guides you through using WSO2 Identity  Server to log in to Salesforce. 

----

## Configure Salesforce

1.  Sign up as a Salesforce developer.
    1.  Fill out the relevant information found in the following URL:
        <https://developer.salesforce.com/signup>
    2.  Click **Sign me up**.
    3.  Click **Allow** to enable Salesforce to access your basic
    information. This message pops up only when you log in to Salesforce
    for the first time.
    4. You will be navigated to the lightening theme of Salesforce.
    
       ![welcome-to-lightening.png]({{base_path}}/assets/img/guides/welcome-to-lightening.png)
       
    !!! note    
        This document is explained using the Salesforce lightning theme. If
        you are using the classic theme, click **Switch to Lightning Experience** on the top panel. 

        ![lighteninig-experience]({{base_path}}/assets/img/guides/switch-to-lightening.png)

2.  Once you are logged in, create a new domain and access it. To do
    this, do the following steps.  
    1.  Search for **My Domain** in the search bar that is on the left
        navigation panel.  
        ![my-domain]({{base_path}}/assets/img/guides/my-domain-salesforce.png)

    2.  Click **My Domain**.
    3.  On the page that appears, come up with a name for your domain.
        You can check if the domain is available by clicking the **Check
        Availability** button.
		
		!!! info 
			For the page given below to load on your browser, make sure that
			the Salesforce cookies are not blocked.

        ![sales-force-cookies]({{base_path}}/assets/img/guides/domain-available-salesforce.png)

    4.  If the domain is available, click **Register Domain** to register your new
        domain.

    5.  The verification might take a few minutes. On successful verification, you will proceed to step 3 where you can test your login. 

    6. Click **Log in**.

5.  On the left navigation menu, search for **Single Sign-On Settings** and click on it.
    
6.  On the page that appears, click **Edit** and then select the **SAML
    Enabled** check box to enable federated single sign-on using SAML.  
    ![saml-enabled]({{base_path}}/assets/img/guides/enable-saml-salesforce.png)
    
7.  Click **Save**.

8.  Click **New** under **SAML Single Sign-On Settings**. The following
    screen appears.  
    ![saml-sso-setting]({{base_path}}/assets/img/guides/saml-sso-salesforce.png)
    
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
	<p>To create the Identity Provider Certificate, open the terminal, traverse to the `<IS_HOME>/repository/resources/security` directory. 
	Next, execute the following command.
	<div class="code panel pdl" style="border-width: 1px;">
	<div class="codeContent panelContent pdl">
	<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">
	<code>keytool -export -alias wso2carbon -file wso2.crt -keystore wso2carbon.jks -storepass wso2carbon</code></pre></div></div>
	<p>Once this command is run, the <code>wso2.crt</code> file is generated and can be found in the `<IS_HOME>/repository/resources/security` directory.
	 Click <b>Choose File</b> and navigate to this location in order to obtain and upload this file.
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
    <td><p>Assertion contains user's salesforce username</p></td>
    </tr>
    <tr class="even">
    <td>SAML Identity Location</td>
    <td><p>Identity is in the <code>NameIdentifier</code> element of the Subject statement</p></td>
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

9.  Navigate to **Company Settings** in the left navigation pane and click **My Domain**.
    
10. Click **Deploy to Users**. Click **Ok** to the confirmation message
    that appears.
    
11. On the page that appears, you must configure the **Authentication Configuration** section. Scroll down to this section and click
    **Edit**.
    
12. Under **Authentication Service**, select **SSO** instead of **Login
    Page**.  
    ![authentication-service-sso]({{base_path}}/assets/img/guides/auth-config-salesforce.png)
    
13. Click **Save**.

----

## Configure Email Address as the Username

!!! warning
    Configuring the email address as the username in an **already running
    Identity Server** is not the production recommended way. Therefore,
    **make sure to configure it before you begin working with WSO2 IS**.
    

1.  Log in to the Management Console and click **Claims > List > http://wso2.org/claims**.
   
2. Click the **Edit** link corresponding to the **Username** claim and configure the `Mapped Attribute` property to `mail`.

    ![email-as-username-attribute-mapping]({{base_path}}/assets/img/guides/email-as-username-attribute-mapping.png)
    
3. Click **Update** to save the changes.

4.  Open the `<IS_HOME>/repository/conf/deployment.toml` file.

5.  Add the following configuration to enable email authentication.

    ``` toml
    [tenant_mgt]
    enable_email_domain= true
    ```
    
6. Configure the following set of parameters in the userstore
    configuration, depending on the type of userstore you are connected
    to (LDAP/Active Directory/ JDBC).
    <table>
    <thead>
    <tr class="header">
    <th>Parameter</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><p><code>                UserNameAttribute               </code></p>
    <p><br />
    </p></td>
    <td><div class="content-wrapper">
    <p>Set the mail attribute of the user. <strong>LDAP/Active Directory only</strong></p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>user_name_attribute = &quot;mail&quot;</code></pre>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UserNameSearchFilter              </code></td>
    <td><div class="content-wrapper">
    <p>Use the mail attribute of the user instead of <code>                 cn                </code> or <code>                 uid                </code> . <strong>LDAP/Active Directory only</strong> <br/>For example:</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"> In LDAP,<code>[user_store]<br>user_name_search_filter = `"(&amp;(objectClass=person)(mail=?))"`</code> <br> In Active Directory, <code>[user_store]<br>user_name_search_filter = `"(&amp;(objectClass=user)(mail=?))"`</pre></code>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>               UserNameListFilter              </code></td>
    <td><div class="content-wrapper">
    <p>Use the mail attribute of the user if <strong>necessary. LDAP/Active Directory only</strong> <br/>For example:</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"> In LDAP,<code>[user_store]<br>user_name_list_filter = `"(&amp;(objectClass=person)(!(sn=Service)))"`</code> <br> In Active Directory, <code>[user_store]<br>user_name_list_filter = `"(&amp;(objectClass=user)(!(sn=Service)))"`</code>
    </pre>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>               UsernameJavaScriptRegEx              </code></td>
    <td><div class="content-wrapper">
    <p>Change this property that is under the relevant userstore manager tag as follows. This property allows you to add special characters like "@" in the username.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>username_java_script_regex = &apos;^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$&apos;</code></pre></div>
    </div>
    </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><code>          UsernameJavaRegEx           </code></td>
    <td><div class="content-wrapper">
    <p>This is a regular expression to validate usernames. By default, strings have a length of 5 to 30. Only non-empty characters are allowed. You can provide ranges of alphabets, numbers and also ranges of ASCII values in the RegEx properties.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[user_store]<br>username_java_regex = &apos;^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}&apos;</code></pre></div>
    </div>
    </div>
    </td>
    </tr>
    <tr class="even">
    <td>Realm configurations</td>
    <td><div class="content-wrapper">
    <p>The username must use the email attribute of the admin user.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[super_admin]<br>username = &quot;admin@wso2.com&quot;<br>password = &quot;admin&quot;</code></pre>
    </div>
    </div>
    <div class="admonition note">
    <p class="admonition-title">Note</p>
    <p>Before this configuration, the user having the username <strong>admin</strong> and password <strong>admin</strong> was considered the super administrator. The super administrator user cannot be deleted.</p>
    <p>After this configuration, the user having the username <strong><code>                  admin@wso2.com                 </code></strong> is considered the super administrator. The user having the username admin is considered as a normal administrator.<br />
    <img src="{{base_path}}/assets/img/guides/super-admin.png" width="600" /></p></div>
    </div></td>
    </tr>
    </tbody>
    </table>

    !!! info 
        - With these configuration users can log in to super tenant with both
        email username (**`alex@gmail.com`**) or
        non-email usernames (`larry`). However, for tenants, only email usernames are allowed. (**`tod@gmail.com@wso2.com`**). 
        - You can configure email username without enabling the **`enable_email_domain`** property (step 5). Then users can log in to both the super tenant and the tenant using email and non-email usernames. However, super tenant users should always use
        ***@carbon.super*** at the end of usernames.

7.  Restart the server.

-----

## Create the service provider

{!./includes/register-a-service-provider.md!}

---

### SAML Configurations

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > SAML Configuration** and click **Configure**.

2. Enter the **Issuer** as `https://saml.salesforce.com`.

    !!! note 
        The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
        
3. Enter **Assertion Consumer URL** and click **Add**. 
    
    !!! note
        The **Assertion Consumer URL** is the URL of the page to which the browser is redirected to after successful authentication.
        To obtain the **Assertion Consumer URL** from Salesforce, follow the below provided steps. <br>
        1. Navigate to **Identity > Single Sign-On Settings** from the left hand side panel.  <br>
        2. Click on the name of the SAML SSO component created.  <br>
        3. Note down the login URL. 

9. Select **Enable Response Signing** to sign the SAML2 Responses returned after the authentication process.

10. Select **Enable Attribute Profile** and **Include Attributes in the Response Always** so that the the identity provider 
    will always include the attribute values related to the selected claims in the SAML2 attribute statement.

12. Click **Register**. 

!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations]({{base_path}}/guides/login/saml-app-config-advanced). 

-----

## Test the configurations

Do the following steps to test out the configurations for a new user in
Salesforce and the Identity Server.

1.  Create a user in WSO2 IS. 
 
    {!./includes/create-user-email-username.md!}
        
2.  Create a user in Salesforce. This user should have the same
    email address as the user in WSO2 IS  
    1.  Log in to the Salesforce developer account:
        [https://login.salesforce.com/](https://login.salesforce.com/?lt=de).
    2.  On the left navigation pane, under **ADMINISTRATION**, click
        **Users** under **Users**.
    3.  On the page that appears, click the **New User** button to
        create a new user.
    4.  Create a user with the same username as the one you created in
        WSO2 Identity Server. Click **Save** to save your changes. An
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

		1.  Search for **My Domain** in the search bar that is on the left
			navigation panel.
			
		2.  Click **My Domain** and you are navigated to the domain you created
			under the section, [Configure
			Salesforce](#configure-salesforce).

		3.  Click **Edit** under Authentication Configurations and you are
			navigated to a new page having the following URl:
			`              https://<DOMAIN_NAME>/domainname/EditLogin.apexp             `. 
			
		4.  On the left navigation menu, expand **Security Controls**, and
			click, **Single Sign-On Settings**.
			
		5.  Click on the name of the created **Single Sign-On Setting**. For this example, click **SSO**.  
			![single-sign-on-setting]({{base_path}}/assets/img/guides/single-sign-on-setting.png)
			
		6.  Copy the URL that is defined for **Login URL** to access
			Salesforce.  
			![login-url-for-salesforce]({{base_path}}/assets/img/guides/login-url-for-salesforce.png)

4.  Log in using the new credentials of the user you just created. You
    are then redirected back to Salesforce.
    
----


## Troubleshooting guidelines

Additional troubleshooting information regarding any Salesforce side SSO
failures can be retrieved by using Salesforce SAML Assertion Validator.
Further information regarding the steps are available
[here](https://developer.salesforce.com/docs/atlas.en-us.sso.meta/sso/sso_saml_validation_errors.htm#!).

!!! info "Related topics"
    - [Concept: Identity Federation]({{base_path}}/references/concepts/identity-federation/)