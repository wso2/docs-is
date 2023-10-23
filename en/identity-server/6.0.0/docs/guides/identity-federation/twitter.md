# Configure Twitter as a Federated Authenticator

This page guides you through configuring Twitter as a federated authenticator in WSO2 Identity Server.

## Set up a Twitter app

!!! note 
	You can skip this section if you have already registered your application on Twitter. 

1. Log in to <https://developer.twitter.com/> using your Twitter credentials. 

2. Click **Create  project** and set up your project.
    
    ![Create Twittter project]({{base_path}}/assets/img/samples/twitter-dashboard.png)

3. In **App Set Up**, follow the steps given below.

    1. Select your preferred **App Environment**.
       ![Set Twittter app_env]({{base_path}}/assets/img/samples/twitter-app-env.png) 

    2. Set an **App Name**.
       ![Set Twittter app_name]({{base_path}}/assets/img/samples/twitter-app-name.png) 

    3. Take note of the **client ID** and **client secret** of the application.
       ![Set Twittter app_name]({{base_path}}/assets/img/samples/twitter-key-token.png)

4. Click **App Settings** at the bottom of the page.

5. Click **Set up** under **User Authentication Settings**.

    ![Setup_user_authentication]({{base_path}}/assets/img/samples/twitter-user-auth-setup.png)

    1. Fill in the user authentication details with the following values.

         - Enabled **OAuth 2.0**
         - Type of app - **Web app**
         - Callback URI / Redirect URL - `https://localhost:9443/commonauth`
         - Website URL - `http://localhost.com:8080/pickup-dispatch/home.jsp`
         ![Setup_user_authentication]({{base_path}}/assets/img/samples/twitter-auth-config.png)

    2. Click **Save**.
    3. The OAuth client key and secret presented by Twitter **is not** required in this flow. 

You have now set up your Twitter application.

---

{!./includes/register-an-identity-provider.md !}

4.  Expand **Twitter Configuration** under **Federated Authenticators**
    .
    ![twitter-config-federated-auth.png]({{base_path}}/assets/img/guides/twitter-config-federated-auth.png)
    Fill in the following fields details according to the application created above.

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
    <td>Enable</td>
    <td>This option enables Twitter to be used as an authenticator for user provisioned to the WSO2 Identity Server.</td>
    <td>Checked</td>
    </tr>
    <tr class="even">
    <td>Default</td>
    <td>This options sets the Twitter to be used as the default authentication mechanism. If you have already selected any other Identity Provider as the default federated authenticator, selecting this option deselects it.</td>
    <td>Checked</td>
    </tr>
    <tr class="odd">
    <td>API Key</td>
    <td>This is the <code>               consumer key              </code> generated at the Twitter application registration.</td>
    <td><code>               wuerRmdgwlqX0oE1WNDdsh17o              </code></td>
    </tr>
    <tr class="even">
    <td>API Secret</td>
    <td>This is the <code>               consumer secret              </code> generated at the Twitter application registration.</td>
    <td><div class="row">
    <code>                771tqnkpcbRyTBSCRQvVud1x8j1uQlCDpNZo3hRG0s4cEtsFky               </code>
    </div></td>
    </tr>
    <tr class="odd">
    <td>Callback URL</td>
    <td><p>This is the Callback URL you entered at the Twitter application registration. This is the URL to which the browser should be redirected after the authentication is successful.</p>
    <p>URL format: <code>                https://&lt;host-name&gt;:&lt;port&gt;/acs               </code></p>
    <p>The acs indicates the Assertion Consumer Service URL of the WSO2 Identity Server endpoint that accepts the responses sent by Twitter.</p></td>
    <td><code>                               https://wso2.com:9443/commonauth                             </code></td>
    </tr>
    </tbody>
    </table>

5.  Click **Register**.

---

## Configure the service provider

{!./includes/register-a-service-provider.md !}

4. In the **Inbound Authentication Configuration** section, click
   **Configure** under the **OAuth/OpenIDConnect Configuration** section and
   set the configurations as required.

5. Configure the Callback URL of the sample application (`http://localhost.com:8080/pickup-dispatch/oauth2client`).

   ![configuring-OAuth-Callback-URL]({{base_path}}/assets/img/guides/oauth-callback-url.png)

6. Keep the other configurations as default and click **Add**

7. Click **Register**. Now you will be sent back to the **Service Providers** page.
8. Take a copy of the **OAuth Client Key** and the **OAuth Client Secret** for later usages

   ![OAuth-id-secret]({{base_path}}/assets/img/guides/oauth-id-secret.png)


9. Go to the **Local and Outbound Authentication Configuration**
   section.

10. For **Authentication Type**, select **Federated Authentication**  and select the
    Identity Provider you created from the dropdown list under
    **Federated Authentication**.  
    ![identity-provider-in-federated-authentication]({{base_path}}/assets/img/guides/identity-provider-in-federated-authentication.png)

11. Click **Update** to save the changes.

You have now added and configured the service provider.

---

## Try it

You have successfully configured Twitter as your federated authenticator. Now, when you try to log in to your application, it should redirect to the Twitter login page. On successful authentication with your Twitter credentials, you will be able to access your application.

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

4. Restart the Tomcat server.

### Log in

1. To test the sample, go to the following URL: `http://<TOMCAT_HOST>:<TOMCAT_PORT>/pickup-dispatch`.<br/>
   For example. `http://localhost.com:8080/pickup-dispatch`

   ![Pickup-dispatch application]({{base_path}}/assets/img/samples/pickup-dispatch-login.png)

2. Click the **LOGIN** button.

3. You are redirected to the Twitter Login page. Enter your Twitter credentials and you will be taken to the home page of the pickup-dispatch app.


!!! info "Related topics" 

    - [Concepts: Introduction to Identity Federation]({{base_path}}/references/concepts/identity-federation/)