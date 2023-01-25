# Configure Google as a Federated Authenticator

This page guides you through configuring Google as a federated authenticator in WSO2 Identity Server. 

## Set up a Google app

1. Go to the [Google Developer console](https://console.developers.google.com/apis/credentials), create a new project, or select an existing project.

2. If the **APIs & services** page isn't already open, do the following:

    1. Open the navigation menu and click **View all products**.
       ![View all products on the Google console]({{base_path}}/assets/img/samples/google-view-all-products.png)

    2. Under **Management**, click **APIs & Services**.
       ![Select APIs & Services]({{base_path}}/assets/img/samples/google-apis-and-services.png)

3. Go to the **Credentials** page, click **Create Credentials**, and select **Oauth client ID**.

    ![Select APIs & Services]({{base_path}}/assets/img/samples/google-oauth-client-id.png)

4. Configure your consent screen by clicking **Configure Consent Screen** and return to **Create OAuth client ID** screen once you are done.


    !!! info
        For more information, see [User Consent](https://support.google.com/googleapi/answer/6158849#userconsent&zippy=%2Cuser-consent)

5. Select the **Web application** as the application type.
6. Provide a name for your app and the following URL as the **Authorized Redirect URI** of the application: 

    ```
    https://<IS_HOST>:<IS_PORT>/commonauth
    ```
7. Take note of the **client ID** and **client secret** generated for the application.

---

{!./includes/register-an-identity-provider.md !}

4.  Go to **Google Configuration** under **Federated Authenticators**.
5.  Select the checkbox **Enable**.

6.  Configure the **Client ID** and **Client Secret** that were received after creating the Google application client.
    
7.  Configure the **Callback URL** as `https://<IS_HOST>:<IS_PORT>/commonauth`

8.  To be able to use Google One Tap, select the **Enable One Tap** checkbox.

    !!! Note "Using the Console app of WSO2 IS "
        
        By default, Google One Tap is enabled for all tenants. If you want to restrict this option to selected tenants, add the following configuration to the `deployment.toml`.
    
        ``` bash
        [console.ui]
        google_one_tap_enabled_tenants = [“carbon.super”,”t.com”]
        ```
    
9.  Click on **Register** to add the Google IdP.

    ![Google-IdP]({{base_path}}/assets/img/samples/google-idp.png)

---

## Register a service provider

{!./includes/register-a-service-provider.md !}

5. In the **Inbound Authentication Configuration** section, click
   **Configure** under the **OAuth/OpenIDConnect Configuration** section and
   set the configurations as required.

6. Configure the Callback URL of the sample application (**http://localhost.com:8080/pickup-dispatch/oauth2client**).

    ![configuring-OAuth-Callback-URL]({{base_path}}/assets/img/guides/oauth-callback-url.png)

7. Keep the other configurations as default and click on **Add**

8. Click **Register**. Now you will be sent back to the **Service Providers** page.
9. Take a copy of the **OAuth Client Key** and the **OAuth Client Secret** for later usages

    ![OAuth-id-secret]({{base_path}}/assets/img/guides/oauth-id-secret.png)


9. Go to the **Local and Outbound Authentication Configuration**
   section.

10. For **Authentication Type**, select the **Federated Authentication** radio button and select the
    Identity Provider you created from the dropdown list under
    **Federated Authentication**.  
    ![identity-provider-in-federated-authentication]({{base_path}}/assets/img/guides/identity-provider-in-federated-authentication.png)

11. Click **Update** to save the changes.

---

## Try it out

You have successfully configured Google as your federated authenticator. Now, when you try to log in to your application, it should redirect to the Google login page. On successful authentication with your Google credentials, you will be able to access your application. 

### Set up the sample app

- Download Apache Tomcat 9.x from
[here](https://tomcat.apache.org/download-90.cgi) and install. Tomcat
server installation location will be referred to as `<TOMCAT_HOME>` later
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

4. Restart the Tomcat server.

### Sign in with Google 

1. To test the sample, go to the following URL: `http://<TOMCAT_HOST>:<TOMCAT_PORT>/pickup-dispatch`.<br/>
For example. `http://localhost.com:8080/pickup-dispatch`

    ![Pickup-dispatch application]({{base_path}}/assets/img/samples/pickup-dispatch-login.png)

2. Click **Login**. 

    You are redirected to the Google login page.

3.  If you don't have **Google One Tap** enabled, you need to click **Sign in with Google**.
  
    ![Google login page]({{base_path}}/assets/img/samples/sign-in-google.png)

4. Select your preferred Google account and sign in using your Google credentials. 

You are redirected to the Pickup sample homepage.

### Sign in with Google One Tap

Google One Tap is a personalized authentication feature provided by Google as a trending federated authentication option. When a browser has an authenticated google session, a personalized sign-in/sign-up button will appear instead of a conventional Google sign-in button. Note that this feature applies to One Tap-supported web applications.

!!! Note "Supported Browsers"
    Google One Tap supports for following browsers only.
        
    -   Chrome   
    -   Firefox   
    -   Opera

<!--

2. Add the login page domain as the **Authorized Javascript Origins** at the relevant Google Client at Google CLI.

    ```
    https://<IS_HOST>:<IS_PORT>
    ```
   
    ![Google One Tap origins]({{base_path}}/assets/img/samples/google-onetap-js-origins-url.png)

3. Keep the following configuration empty to enable Google One Tap for all tenants or add the specific tenant name to enable only for that tenant.

     ``` bash
        [console.ui]
        google_one_tap_enabled_tenants = [“carbon.super”,”t.com”]
     ```
   
4. When a tenant is eligible for Google One Tap, **Google One Tap** toggle will be available in Google authenticator settings at Asgardeo developer portal. By enabling this toggle button, users will see a personalized Google sign-in button with Google profile information on the login page.

   ![Google One Tap toggle]({{base_path}}/assets/img/samples/google-onetap-toggle.png)

-->

When Google One Tap is enabled, the conventional Google sign-in button will not be available on the login page. However, the application user can close the One Tap personalized button and re-enable the conventional Google Sign-in button as shown below.

![Google One Tap login]({{base_path}}/assets/img/samples/google-onetap-login.png)

Note that closing the One Tap personalized login button will go through a cool-down mechanism to enable it again which is defined by Google. That is, when you close the Google One-Tap login window, it will take 2 hours to enable it again unless cookies are cleared.

!!! info "Related topics" 
    [Concepts: Introduction to Identity Federation]({{base_path}}/references/concepts/identity-federation/)
