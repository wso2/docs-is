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

    !!! note    
        This document is explained using the Salesforce lightning theme. If
        you are using the classic theme, click **Switch to Lightning Experience** on the top panel. 

        ![lighteninig-experience](../../assets/img/guides/switch-to-lightening.png)

        You will be navigated to the lightening theme of Salesforce.

        ![welcome-to-lightening.png](../../assets/img/guides/welcome-to-lightening.png) 

4.  Once you are logged in, create a new domain and access it. To do
    this, do the following steps.  
    1.  Search for **My Domain** in the search bar that is on the left
        navigation panel.  
        ![my-domain](../../assets/img/guides/my-domain-salesforce.png)

    2.  Click **My Domain**.
    3.  On the page that appears, come up with a name for your domain.
        You can check if the domain is available by clicking the **Check
        Availability** button.
		
		!!! info 
			For the page given below to load on your browser, make sure that
			the Salesforce cookies are not blocked.

        ![sales-force-cookies](../../assets/img/guides/domain-available-salesforce.png)

    4.  If the domain is available, click **Register Domain** to register your new
        domain.

    5.  The verification might take a few minutes. On successful verification, you will proceed to step 3 where you can test your login. 

    6. Click **Log in**.

5.  On the left navigation menu, search for **Single Sign-On Settings** and click on it.
    
6.  On the page that appears, click **Edit** and then select the **SAML
    Enabled** check box to enable federated single sign-on using SAML.  
    ![saml-enabled](../../assets/img/guides/enable-saml-salesforce.png)
    
7.  Click **Save**.

8.  Click **New** under **SAML Single Sign-On Settings**. The following
    screen appears.  
    ![saml-sso-setting](../../assets/img/guides/saml-sso-salesforce.png)
    
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
	<p>To create the Identity Provider Certificate, open the terminal, traverse to the <code><\IS_HOME>/repository/resources/security/ </code>directory. 
	Next, execute the following command.
	<div class="code panel pdl" style="border-width: 1px;">
	<div class="codeContent panelContent pdl">
	<pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence">
	<code>keytool -export -alias wso2carbon -file wso2.crt -keystore wso2carbon.jks -storepass wso2carbon</code></pre></div></div>
	<p>Once this command is run, the <code>wso2.crt</code> file is generated and can be found in the <code> <\IS_HOME>/repository/resources/security/</code> directory.
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
    ![authentication-service-sso](../../assets/img/guides/auth-config-salesforce.png)
    
13. Click **Save**.

----

## Configure email address as the username

For details on configuring WSO2 Identity Server to use an email address as the username, refer [Using Email Address as the Username](TODO:insert-link).

-----

## Configure the service provider

Follow the steps given below to configure salesforce as a service
provider in WSO2 IS.

1.  Sign in. Enter your username and password to log on to the
    [Developer Portal](https://localhost:9443/developer-portal).
      
    You can login using the user name, **admin@wso2.com** and password, **admin** for the first time. 
    
2.  Select **Applications** from the left hand side panel. 

3. Click on **New Application**.

    ![add-sp-salesforce.png](../../assets/img/guides/add-sp-salesforce.png)

4. Click on **SAML Web Application**.
    
3.  Fill in the **Name** and optionally, provide a brief
    **Description** of the application.  

    ![service-provider-name](../../assets/img/guides/create-saml-app-salesforce.png)
    
4.  Click **Next**.

5. Enter the **Issuer** as `https://saml.salesforce.com`. 

6. Enter the **assertion consumer URL**. This can be obtained from Salesforce. 

    !!! note "Obtaining the assertion consumer URL from Salesforce"
        1.  Navigate to **Identity > Single Sign-On Settings** from the left hand side panel. 
        2.  Click on the name of the SAML SSO component created. 
        3.  Note down the login URL. 

7.   Click **Next**. 

8. Check your configurations and click **Finish**. 

9. Navigate to the **Access** tab of your newly created application. 

10. Enable **Sign SAML responses** under the **Assertion/Response Signing** section. 

11. Select **Enable** and **Always include attributes in the response** in the **Attribute Profile** section. 

12. Click **Update**. 

-----

## Test the configurations

Do the following steps to test out the configurations for a new user in
Salesforce and the Identity Server.

1.  Create a user in WSO2 IS.  

    {! fragments/create-users.md !}
        
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
			![single-sign-on-setting](../../assets/img/guides/single-sign-on-setting.png)
			
		6.  Copy the URL that is defined for **Login URL** to access
			Salesforce.  
			![login-url-for-salesforce](../../assets/img/guides/login-url-for-salesforce.png)

4.  Log in using the new credentials of the user you just created. You
    are then redirected back to Salesforce.
    
----


## Troubleshooting guidelines

Additional troubleshooting information regarding any Salesforce side SSO
failures can be retrieved by using Salesforce SAML Assertion Validator.
Further information regarding the steps are available
[here](https://developer.salesforce.com/docs/atlas.en-us.sso.meta/sso/sso_saml_validation_errors.htm#!).

----

!!! info "Related Topics"
    - [Concept: Identity Federation](TODO:insert-link-to-concept)