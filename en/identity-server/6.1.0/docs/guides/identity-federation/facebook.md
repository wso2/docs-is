# Configure Facebook as a Federated Authenticator

This page guides you through configuring Facebook as a federated authenticator in WSO2 Identity Server.

Follow the steps given below to configure WSO2 Identity Server to authenticate users using their Facebook credentials.

## Create a Facebook app

!!! note 
	You can skip this section if you have already registered your application on Facebook. 

1. Log in to the [Facebook developer portal](https://developers.facebook.com/apps) and click **Create App**.

    ![Create app]({{base_path}}/assets/img/samples/create-fb-app.png)

2. Select **Consumer** as the app type and click **Next**

    ![Select app type]({{base_path}}/assets/img/samples/fb-app-type.png)

3. Provide **Display Name** and click **Create App** to create an application.

    ![App info]({{base_path}}/assets/img/samples/fb-app-info.png)

4. Under **Add products to your app**, click **Set up** on the **Facebook Login** card.

    ![Setup fb]({{base_path}}/assets/img/samples/add-fb-login.png)

5. Select **Web** type.

6. Enter `https://<IS_HOST>:<IS_PORT>/` as the **Site URL** and click **Save**.

    ![Enter site URL]({{base_path}}/assets/img/samples/enter-url.png)

7. On the left panel, under **Facebook Login**, go to **Settings**.

8. You can configure the **Client OAuth Settings** on the window that
    appears.
      
    ![Client OAuth settings]({{base_path}}/assets/img/samples/client-oauth-settings.png)

    1.  Set **Client OAuth Login** to **Yes**.  
        
    2.  Set **Web OAuth Login** to **Yes**.  
        
    3.  Enter  ` https://<IS_HOST>:<IS_PORT>/commonauth.  ` as the value for **Valid OAuth redirect URIs**. 

9. Click **Save Changes**.

10. On the main panel, go to **Settings > Basic** and take note of the **App ID** and **App Secret**.

    ![App basic details]({{base_path}}/assets/img/samples/app-id-secret-from-facebook.png)


Now you have finished configuring Facebook as an Identity Provider.

!!!	info "About accessing the app"
	The app is not available to the general public yet. To make the app available
	to every Facebook user, you have to submit the app for review. After a
	review, Facebook makes the app available to every Facebook user. You can
	find more information on the review process by clicking on **App
	Review** in the left navigation menu of your app's dashboard.

	The review process may take some time, so for the purposes of this
	sample, you can specify some Facebook users as Developers or Testers.
	Only the users specified here can use this app to log in with Facebook
	until the app goes public. To do this, click on **Roles** in the left
	navigation menu of the dashboard and specify the required Facebook users
	as Developers or Testers.
	
	![submit-fb-app-for-review]({{base_path}}/assets/img/samples/add-app-roles.png)

---

{!./includes/register-an-identity-provider.md !}
    
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
    <p><img src="{{base_path}}/assets/img/guides/fb-app-on-dashboard.png"/></p>.</p>
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

    ![facebook-configuration]({{base_path}}/assets/img/guides/facebook-configuration.png)

6.  Select both checkboxes to **Enable Facebook Authenticator** and make
    it the **Default**.

7.  Click **Register**.

You have now added the identity provider.

---

## Configure the service provider 

{!./includes/register-a-service-provider.md !}
    
4. In the **Inbound Authentication Configuration** section, click
    **Configure** under the **OAuth/OpenIDConnect Configuration** section and
    set the configurations as required.

5. Configure the Callback URL of the sample application (**http://localhost.com:8080/pickup-dispatch/oauth2client**).

    ![configuring-OAuth-Callback-URL]({{base_path}}/assets/img/guides/oauth-callback-url.png)
    
6. Keep the other configurations as default and click on **Add**

7. Click **Register**. Now you will be sent back to the **Service Providers** page.
8. Take a copy of the **OAuth Client Key** and the **OAuth Client Secret** for later usages

    ![OAuth-id-secret]({{base_path}}/assets/img/guides/oauth-id-secret.png)


9. Go to the **Local and Outbound Authentication Configuration**
    section.

10. For **Authentication Type**, select the **Federated Authentication** radio button and select the
     Identity Provider you created from the dropdown list under
     **Federated Authentication**.  
     ![identity-provider-in-federated-authentication]({{base_path}}/assets/img/guides/identity-provider-in-federated-authentication.png)

11. Click **Update** to save the changes.

You have now added and configured the service provider.

!!! note
    The default client-truststore.jks found in the
    `         <IS_HOME>/repository/resources/security/        ` directory
    contains the Facebook certificate by default.
    

!!! info "Related topics"

	For more information on SSO, see [Single Sign-On]({{base_path}}/guides/login/enable-single-sign-on/).

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
    ![add-claim-mapping-for-facebook]({{base_path}}/assets/img/guides/add-claim-mapping-for-facebook.png)
    
6.  Now add custom claim mappings as follows.  
    ![custom-claim-mapping]({{base_path}}/assets/img/guides/custom-claim-mapping.png)
    
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
2.  Click **Edit** to edit the service provider created previously.
3.  Go to **Claim Configuration**.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as follows. Here you should add the claims you
    mapped in the Identity Provider claim configuration. Select the
    **Mandatory Claim** checkbox for any claims that are mandatory.

    !!! info "Do only,"

		If the service provider needs any claims to be used after
		authentication process, the SP can request those claims from IDP as
		" **Requested Claims**".

    ![Add requested claims]({{base_path}}/assets/img/fragments/add-requested-claims.png)

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

- Download Apache Tomcat 9.x from
[here](https://tomcat.apache.org/download-90.cgi) and install. Tomcat
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
    2. Download the `pickup-dispatch.war` file from the latest release assets.

### Deploy the sample app

Deploy this sample web app on a web container.

1. Copy the `pickup-dispatch.war`file into the `webapps` folder. For
    example, ` <TOMCAT_HOME>/apache-tomcat-<version>/webapps`
    
2. Open a terminal window and add the following entry to the
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
		
3. Open the `dispatch.properties` file found in the `
    <TOMCAT_HOME>/webapps/pickup-dispatch/WEB-INF/classes ` directory
    and edit the **consumerKey** and **consumerSecret** with the values obtained from the **OAuth configuration**.
    
5. Restart the Tomcat server.

### Log in

1. To test the sample, go to the following URL: `http://<TOMCAT_HOST>:<TOMCAT_PORT>/pickup-dispatch`.<br/>
   For example. `http://localhost.com:8080/pickup-dispatch`

	![Pickup-dispatch application]({{base_path}}/assets/img/samples/pickup-dispatch-login.png)

2. Click the **LOGIN** button.

3. You are redirected to the Facebook Login page. Enter your Facebook credentials and you will be taken to the home page of the pickup-dispatch app.

!!! info "Related topics"
	-   See the following topics for samples of configuring Facebook for
		federated authentication:
		-   [Concepts: Introduction to Identity Federation]({{base_path}}/references/concepts/identity-federation/)
