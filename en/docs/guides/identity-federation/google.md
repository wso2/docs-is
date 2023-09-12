# Configure Google as a Federated Authenticator

This page guides you through configuring Google as a federated authenticator in WSO2 Identity Server. Note that you can also configure One Tap authentication for sign-in with Google.

## Set up a Google app

First, configure a Google app, which you can use to integrate WSO2 IS.

1. Go to the [Google Developer console](https://console.developers.google.com/apis/credentials), create a new project, or select an existing project.

2. If the **APIs & services** page isn't already open, do the following:

    1. Open the navigation menu and click **View all products**.
       ![View all products on the Google console]({{base_path}}/assets/img/samples/google-view-all-products.png)

    2. Under **Management**, click **APIs & Services**.
       ![Select APIs & Services]({{base_path}}/assets/img/samples/google-apis-and-services.png)

3. Go to the **Credentials** page, click **Create Credentials**, and select **OAuth client ID**.

    ![Select APIs & Services]({{base_path}}/assets/img/samples/google-oauth-client-id.png)

4. On the **Create OAuth client ID** page, first select **Web application** as the **Application type**.

5. Click **Configure Consent Screen** and configure the consent screen.

    !!! info
        For more information, see [User Consent](https://support.google.com/googleapi/answer/6158849#userconsent&zippy=%2Cuser-consent).

5. Return to the **Create OAuth client ID** page and apply the following values.

    <table>
        <tr>
            <th>Authorized JavaScript Origin</th>
            <td>
                <p>Specify the authorized JavaScript origin of your WSO2 IS. Use the following as the authorized javascript origin for your WSO2 IS instance running on localhost:</p>
                <code>https://localhost:9443</code>
            </td>
        </tr>
        <tr>
            <th>Authorized Redirect URI</th>
            <td>
                <p>Specify the endpoint in WSO2 IS to which Google should send responses after the authentication process. Use the following as the authorized redirect URI for your WSO2 IS instance running on localhost:</p>
                <code>https://localhost:9443/commonauth</code>
            </td>
        </tr>
    </table>

6. Click **Create** to generate the OAuth **client ID** and **client secret**.

---

{!./includes/register-an-identity-provider.md !}

4.  Go to **Federated Authenticators** > **Google Configuration** and configure the following parameters.

    ![Google-IdP]({{base_path}}/assets/img/samples/google-idp.png)

    <table>
        <tr>
            <th>Enable</th>
            <td>Select this checkbox to enable federated authentication using this identity provider.</td>
        </tr>
        <tr>
            <th>Client ID</th>
            <td>The client ID that was generated for the Google application.</td>
        </tr>
        <tr>
            <th>Client Secret</th>
            <td>The client secret that was generated for the Google application.</td>
        </tr>
        <tr>
            <th>Callback URL</th>
            <td>
                <p>Enter the following as the callback URL of the application:</p>
                <code>https://localhost:9443/commonauth</code>
            </td>
        </tr>
        <tr>
            <th>Enable One Tap</th>
            <td>
                <p>Select this checkbox to use Google One Tap.</p>
                <p><b>Note:</b> If you are using the Console app of WSO2 IS, note that the <b>Enable One Tap</b> configuration is available for all tenants by default. If you want to restrict this option to selected tenants, add the following configuration to the <code>deployment.toml</code>:</p>
                <div>
                    <code>[console.ui]</code></br>
                    <code>google_one_tap_enabled_tenants = [“carbon.super”,”t.com”]</code>
                </div>
            </td>
        </tr>
    </table>

5.  Click **Register** to add the Google IdP.

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
9. Take a copy of the **OAuth Client Key** and the **OAuth Client Secret** for later usages.

    <img src="{{base_path}}/assets/img/guides/oauth-id-secret.png" alt="OAuth-id-secret" width="500">

10. Go to the **Local and Outbound Authentication Configuration** section.

11. To configure the **Authentication Type**, select **Advanced Configuration**, and then click it.

12. Expand **Step 1** and configure two authenticators for this authentication step:

    - **Local Authenticator**: Select `Username & Password` from the list.
    - **Federated Authenticators**: Select the Google identity provider that you configured for this tutorial.

    ![identity-provider-in-federated-authentication]({{base_path}}/assets/img/guides/identity-provider-in-federated-authentication.png)

13. Click **Update** to return to the service provider configuration page and then click **Update** again to save the changes.

---

## Try it out

You have successfully configured Google as your federated authenticator. Now, when you try to log in to your application, it should redirect to the Google login page. On successful authentication with your Google credentials, you will be able to access your application.

### Set up the sample app

- Download Apache Tomcat 9.x from
[here](https://tomcat.apache.org/download-90.cgi) and install. Tomcat
server installation location will be referred to as `<TOMCAT_HOME>` later
in this guide.      

- It is recommended that you use a hostname that is not
`localhost` to avoid browser errors. Modify the
`/etc/hosts` entry in your machine to reflect this.
Note that `wso2is.local` is used in
this documentation as an example, but you must modify this when
configuring the authenticators or connectors with this sample
application.

- Download the sample from GitHub.
    1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).
    2. Download the `pickup-dispatch.war` file from the latest release assets.

### Deploy the sample app

Deploy this sample web app on a web container.

1. Copy the `pickup-dispatch.war` file into the `webapps` folder. For
   example, ` <TOMCAT_HOME>/apache-tomcat-<version>/webapps`.

2. Open a terminal window and add the following entry to the
   `/etc/hosts` file of your machine to configure
   the hostname.

    ``` bash
    127.0.0.1   wso2is.local
    127.0.0.1   localhost.com
    ```

    !!!info "Why is this step needed?"
        Some browsers do not allow you to create cookies for a naked
        hostname, such as `localhost`. Cookies are
        required when working with SSO . Therefore, to ensure that the SSO
        capabilities work as expected in this tutorial, you need to
        configure the `etc/host` file as explained in
        this step.

        The `etc/host` file is a read-only file.
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

To test the sample:

1.  Go to the following URL on your browser: `http://<TOMCAT_HOST>:<TOMCAT_PORT>/pickup-dispatch`.<br/>
    
    For example, `http://localhost.com:8080/pickup-dispatch`.

    ![Pickup-dispatch application]({{base_path}}/assets/img/samples/pickup-dispatch-login.png)

2.  Click **Login**. 

    You are redirected to the Google login page.

3.  Click **Sign in with Google** to be redirected to the Google sign-in page.

    !!! Note
        If you have **Google One Tap** enabled for your Google IdP, you will be able to skip this step. See the instructions on [signing in with Google One Tap](#sign-in-with-google-one-tap).

    <img src="{{base_path}}/assets/img/samples/sign-in-google.png" alt="Google login page" width="400">
  
4. Select your preferred Google account and sign in with your Google credentials.

You are redirected to the sample application's home page.

### Sign in with Google One Tap

Google One Tap is a personalized authentication feature provided by Google. When a browser has an already authenticated Google session, a personalized sign-in/sign-up button will appear instead of a conventional Google sign-in button. Note that this feature applies to One Tap-supported web applications.

!!! Note "Supported Browsers"
    Google One Tap supports for following browsers only.

    -   Chrome   
    -   Firefox   
    -   Opera

<img src="{{base_path}}/assets/img/samples/google-onetap-login.png" alt="Google One Tap login" width="400">

When Google One Tap is enabled, the conventional Google sign-in button will not be available on the login page. However, the application user can close the One Tap personalized button and re-enable the conventional Google Sign-in button. As defined by Google, when the user closes the Google One Tap option, it will take two hours to enable it again unless cookies are cleared. 

!!! info "Related topics" 
    [Concepts: Introduction to Identity Federation]({{base_path}}/references/concepts/identity-federation/)