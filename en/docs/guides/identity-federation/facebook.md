# Configure Facebook as a Federated Authenticator

This page guides you through configuring Facebook as a federated authenticator in WSO2 Identity Server.

Follow the steps given below to configure WSO2 Identity Server to authenticate users using their Facebook credentials.

## Create a Facebook app

!!! note 
	You can skip this section if you have already registered your application on Facebook. 

1. Go to <https://developers.facebook.com/> and log in using your Facebook credentials.

2. Click on **Create App**.

	![Create app](../../assets/img/samples/create-app.png)

3. Enter a **Display Name** and your **Contact Email**.

4.  Click on **Create App ID**.

	![Create app ID](../../assets/img/samples/register-app-fb.png)

5. Complete the security check and click **Submit**. 

6. Click **Set up** under Facebook Login.

	![Setup fb](../../assets/img/samples/facebook-login.png)

7. Select **Website** as the platform for the app used in this sample.

8. Enter `https://<IS_HOST>:<IS_PORT>/` as the **Site URL** and click **Save**.

	![Enter site URL](../../assets/img/samples/enter-url.png)

9.  You can configure the **Client OAuth Settings** on the window that
    appears.
      
    ![Client OAuth settings](../../assets/img/samples/client-oauth-settings.png)

    1.  Set **Client OAuth Login** to **Yes**.  
        
    2.  Set **Web OAuth Login** to **Yes**.  
        
    3.  Enter  ` https://<IS_HOST>:<IS_PORT>/commonauth.  ` as the value for **Valid OAuth redirect URIs**. 

10. Click **Save Changes**.

11. Click on **Settings** > **Basic.** You can see the **App ID** and **App
    Secret** as shown in the image below. Click **Show** to view the
    **App Secret**.

12. Click **Settings** on the left menu and navigate to the **Basic** tab. 

13. Add the **App Domains** as shown below. 

	![App basic details](../../assets/img/samples/details-basic.png)

13. Click **Save Changes**.

Now you have finished configuring Facebook as an Identity Provider.

{! fragments/fb-review.md !}

---

{! fragments/register-an-identity-provider.md !}
    
4.  Go to **Facebook Configuration** under **Federated Authenticators**.

5.  Enter the following values in the form that appears:
    <table style="fixed width">
    <col width="0">
    <col width="70">
    <col width="10">
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Client Id</td>
    <td><div class="content-wrapper">
    <p>This refers to the App ID you received from the Facebook app you created.</p>
	<div class="admonition note">
	<p class="admonition-title">Don't know the client ID? See more information</p>
	<p><ol>
    <li>Go to <a href="https://developers.facebook.com/">https://developers.facebook.com/</a> and log in using your Facebook credentials.</li>
    <li>Click on your app from the <strong>My Apps</strong> drop-down list.<br />
    You are navigated to the <strong>Dashboard</strong> of the application. Note down the App ID and the App secret.</li>
    </ol>
    <p><img src="../../../assets/img/guides/fb-app-on-dashboard.png"/></p>.</p>
    </div>    
    </td>
    <td><div class="content-wrapper">
    <p>&lt;Application ID of the Facebook App&gt;</p>
    <p><br />
    </p>
    </div></td>
    </tr>
    <tr class="even">
    <td>Client Secret</td>
    <td>This refers to the App Secret you received from the Facebook app you created.</td>
    <td>&lt;App Secret of the Facebook App&gt;</td>
    </tr>
    <tr class="odd">
    <td>Scope</td>
    <td>Defines the permission to access particular information from a Facebook profile. See the <a href="https://developers.facebook.com/docs/facebook-login/permissions">Permissions Reference</a> for a list of the different permission groups in Facebook APIs.</td>
    <td>email</td>
    </tr>
    <tr class="even">
    <td>User Information Fields</td>
    <td>These are the claims related to the user account on Facebook. WSO2 Identity Server requests these fields from Facebook when a user is authenticated with Facebook through the IS. See <a href="https://developers.facebook.com/docs/facebook-login/permissions#reference-public_profile">public_profile permission</a> for more information about these fields.</td>
    <td>id,name,gender,email,first_name,last_name,age_range,link</td>
    </tr>
    <tr class="odd">
    <td>Callback Url</td>
    <td>This is the URL to which the browser should be redirected after the authentication is successful. This should be the commonauth endpoint of Identity server.</td>
    <td><a href="https://localhost:9443/commonauth">https://localhost:9443/commonauth</a></td>
    </tr>
    </tbody>
    </table>

    ![facebook-configuration](../../../assets/img/guides/facebook-configuration.png)

6.  Select both checkboxes to **Enable Facebook Authenticator** and make
    it the **Default**.

7.  Click **Register**.

You have now added the identity provider.

---

## Configure the service provider 

{! fragments/register-a-service-provider.md !}
    
4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section and
    set the configurations as required.

    1.  Enter the values for **Issuer** and **Assertion Consumer URL**.

    2.  Select the following check-boxes:

        1.	Enable Response Signing

        2.	Enable Single Logout

        3.	Enable Attribute Profile

        4.	Include Attributes in the Response Always

    ![configuring-sp-fields](../../../assets/img/guides/configuring-sp-fields.png)
    
5.  Click **Register**. Now you will be sent back to the **Service
    Providers** page.

6.  Go to the **Local and Outbound Authentication Configuration**
    section.

7.  For **Authentication Type**, select the **Federated Authentication** radio button and select the
    Identity Provider you created from the dropdown list under
    **Federated Authentication**.  
    ![identity-provider-in-federated-authentication](../../../assets/img/guides/identity-provider-in-federated-authentication.png)

8.  Click **Update** to save the changes.

You have now added and configured the service provider.

!!! note
    The default client-truststore.jks found in the
    `         <IS_HOME>/repository/resources/security/        ` directory
    contains the Facebook certificate by default.
    

!!! info "Related topics"

	For more information on SSO, see [Single Sign-On](../../../guides/login/enable-single-sign-on/).

---

## Configure claim mapping

### Enable FB claims for WSO2 IS

All the basic information of a user/application is stored in the form of
claims. But for the same information, different Identity Providers(IdP)
have different claims. Therefore, there should be a proper mechanism to
map those claims within Identity Providers.

Here, we are authenticating the service provider application using
facebook IDP. Therefore we need to map FaceBook claims with our WSO2 IDP
claims.

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Identity Providers**.
    
2.  Click **Edit** to edit the facebook identity provider you created.

3.  Under **Claim Configuration**, go to **Basic Claim Configuration**.
    
4.  Select the **Define Custom Claim Dialect** option under **Select
    Claim mapping Dialect**.
    
5.  Click **Add Claim Mapping.** The following screen will be
    displayed.  
    ![add-claim-mapping-for-facebook](../../../assets/img/guides/add-claim-mapping-for-facebook.png)
    
6.  Now add custom claim mappings as follows.  
    ![custom-claim-mapping](../../../assets/img/guides/custom-claim-mapping.png)
    
7.  You can retrieve all the public information of the user and the
    email address. The following are some common attribute names.

    -	id  
    -	email  
    -	name  
    -	first\_name  
    -	last\_name  
    -	link  
    -	gender  
    -	locale  
    -	age\_range

    More information is available from the following link:
    <https://developers.facebook.com/docs/facebook-login/permissions/v2.0>

    You can map these attributes to any **Local Claim URI** that is
    suitable.

8.  From the receiving claims, you can select one claim as the user
    identifier for that particular identity provider. You can configure
    this through **User ID Claim URI** (e.g., email).
9.  Click **Update** to save changes.

### Enable claims for service provider (optional)

Generally, the service providers need some information from the Identity
Provider side after the authentication process in order to provide their
service. To help this process we need to configure the necessary claims
on the service provider side.

For that follow the below steps:

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Service Providers**.
2.  Click **Edit** to edit the travelocity.com service provider.
3.  Go to **Claim Configuration**.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as follows. Here you should add the claims you
    mapped in the Identity Provider claim configuration. Select the
    **Mandatory Claim** checkbox for any claims that are mandatory.

    !!! info "Do only,"

		If the service provider needs any claims to be used after
		authentication process, the SP can request those claims from IDP as
		" **Requested Claims**".

    ![Add requested claims](../../assets/img/fragments/add-requested-claims.png)

	!!! info 
		Here, the claims which are marked as **mandatory** are requested by
		the service provider from the identity provider. If they are not
		available, the user will be redirected to a different page to
		request those mandatory claim values from the user as they are
		mandatory.

5.  **Subject Claim URI** is the unique claim which we can use to
    identify a service provider. Therefore, select a suitable claim for
    the **Subject Claim URI** such that it will become a unique
    identifier for the service provider.

6.  Click **Update** to save changes.

---

## Try it

You have successfully configured facebook as your federated authenticator. Now, when you try to log in to your application, it should redirect to the Facebook login page. On successful authentication with your Facebook credentials, you will be able to access your application.

### Set up the sample app

- Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.      

- It is recommended that you use a hostname that is not
`          localhost         ` to avoid browser errors. Modify the
`          /etc/hosts         ` entry in your machine to reflect this.
Note that `          wso2is.local         ` is used in
this documentation as an example, but you must modify this when
configuring the authenticators or connectors with this sample
application.

- Download the sample from GitHub.

    1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).
    2. Download the `travelocity.com.war` file from the latest release assets.

### Configure CORS

{!fragments/cors-config.md!}

### Deploy the sample app

Deploy this sample web app on a web container.

1.  Copy the `travelocity.com.war`file into the `webapps` folder. For
    example, ` <TOMCAT_HOME>/apache-tomcat-<version>/webapps`
    
2.  Open a terminal window and add the following entry to the
    `/etc/hosts` file of your machine to configure
    the hostname.

    ``` bash
    127.0.0.1   wso2is.local
    127.0.0.1   localhost.com
    ```

    !!!info "Why is this step needed?"
		Some browsers do not allow you to create cookies for a naked
		hostname, such as `            localhost           `. Cookies are
		required when working with SSO . Therefore, to ensure that the SSO
		capabilities work as expected in this tutorial, you need to
		configure the `            etc/host           ` file as explained in
		this step.

		The `            etc/host           ` file is a read-only file.
		Therefore, you won't be able to edit it by opening the file via a
		text editor. Instead, edit the file using the terminal commands.  
		For example, use the following command if you are working on a
		Mac/Linux environment.

		``` java
		sudo nano /etc/hosts
		```
		
3.  Open the `travelocity.properties` file found in the `
    <TOMCAT_HOME>/webapps/travelocity.com/WEB-INF/classes ` directory
    and configure the following property with the hostname ( `
    wso2is.local ` ) that you configured above.

    ``` text
    #The URL of the SAML 2.0 Assertion Consumer
    SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp
    ```
    
4.  Restart the Tomcat server.

To check the sample application, navigate to
`http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp`
on your browser.

For example,
`http://wso2is.local:8080/travelocity.com/index.jsp`

!!! tip
    
    If you wish to change properties like the issuer ID, consumer
    URL, and IdP URL, you can edit the **travelocity.properties** file found
    in the `         travelocity.com/WEB-INF/classes        ` directory.
    Also if the service provider is configured in a tenant you can use
    "QueryParams" property to send the tenant domain.For example,
    "QueryParams=tenantDomain=wso2.com".
    
    This sample uses the following default values.
    
    | Properties                                                                                                                                                                          | Description                                                        |
    |-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------|
    | `             SAML2.SPEntityId=travelocity.com                         `                                                                                                            | A unique identifier for this SAML 2.0 Service Provider application |
    | `              SAML2.AssertionConsumerURL=                                             http://wso2is.local:8080/travelocity.com/home.jsp                                          ` | The URL of the SAML 2.0 Assertion Consumer                         |
    | `              SAML2.IdPURL=                                             https://localhost:9443/samlsso                                          `                                  | The URL of the SAML 2.0 Identity Provider                          |
    | `             SAML2.IsPassiveAuthn=true                         `                                                                                                                   | Set this to send SAML2 passive authentication requests             |
    
    If you edit the `travelocity.properties` file, restart the
    Apache Tomcat server for the changes to take effect.

### Log in

1. To test the sample, go to the following URL: `http://<IS_HOST>:<IS_PORT>/travelocity.com`.

	![Travelocity application](../../assets/img/samples/travelocity-fb.png)

2. Click the link to log in with SAML from WSO2 Identity Server.

3. You are redirected to the Facebook Login page. Enter your Facebook credentials and you will be taken to the home page of the Travelocity app.

!!! info "Related topics"
	-   See the following topics for samples of configuring Facebook for
		federated authentication:
		-   [Concepts: Introduction to Identity Federation](../../../references/concepts/identity-federation/)
