---
breadcrumb: false
---

# Java EE sample web app with OIDC

By following this guide, you will be able to deploy a Java EE web application locally and secure it with OpenID Connect.

## Prerequisites

- **Apache tomcat 9.x or 8.x**

  If you don't have it, install [Apache tomcat](https://tomcat.apache.org/tomcat-9.0-doc/setup.html).

- **A user account in Asgardeo**

  If you don't already have one, [create a user account]({{base_path}}/get-started/create-asgardeo-account/#create-a-user) in Asgardeo.

## Register the app

Follow the steps given below to register the sample Java EE web application in Asgardeo.

1. On the [Asgardeo Console](https://console.asgardeo.io/login), go to **Applications**.

2. Click **New Application** and select **Traditional Web Application**:

    ![Select app type in Asgardeo]({{base_path}}/assets/img/guides/applications/select-app-type.png)

3. Enter the following details:

    ![Create a new web app]({{base_path}}/assets/img/guides/applications/create-new-web-app.png)

    <table>
        <tr>
            <td>Name</td>
            <td>Give a unique name to identify your application.</td>
        </tr>
        <tr>
            <td>Protocol</td>
            <td>Select <b>OpenID Connect</b>.</td>
        </tr>
        <tr>
            <td>Authorized redirect URLs</td>
            <td>
                The URL to which the user is redirected after a successful login. Use the following URL for this sample app:
                <p><code>http://localhost:8080/oidc-sample-app/oauth2client</code></p>
            </td>
        </tr>
    </table>

4. Click **Register** to complete the registration.

5. Go to the **Protocol** tab and take note of the **Client ID** and **Client secret**. You will need them to configure the application later.

    ![Client ID and client secret]({{base_path}}/assets/img/guides/applications/client-secret-oidc.png)

!!! note
    To provide a better experience for the user, **it is recommended to configure an access URL** for the application. You can set an access URL for the application from the General tab. (For this sample application, the access URL is <code>https://localhost:8080/oidc-sample-app</code>).

??? note "Why do we recommend this?"
    - It will be used in the application catalog and discovery flows.
    - We will use it to redirect the user back to the application in the following scenarios.
        - If the login page times out
        - After a password reset
        - After self sign-up verification
    - If the login flow is failed, we will provide an option for the user to re-initiate the login flow using this URL.

## Download the sample

Click the button below to download the sample. You can also choose to view the source before doing so.

<Button
    buttonType='grey-outlined-icon'
    displayType='inline-button'
    buttonText='Download sample'
    startIconPath='images/technologies/java-logo.svg'
    endIconPath='icons/downloadIcon.svg'
    externalLink='https://github.com/asgardeo/asgardeo-tomcat-oidc-agent/releases/latest/download/oidc-sample-app.war'
    v-bind:openInNewTab='true'
/>
<Button
    buttonType='grey-outlined-icon'
    displayType='inline-button'
    buttonText='View source'
    endIconPath='images/technologies/github-logo.svg'
    externalLink='https://github.com/asgardeo/asgardeo-tomcat-oidc-agent/tree/master/io.asgardeo.tomcat.oidc.sample'
    v-bind:openInNewTab='true'
/>

## Configure the sample

Follow the steps given below to configure the sample app.

1. Move the  **war** file that you downloaded to the `<TOMCAT_HOME>/webapps` folder where `<TOMCAT_HOME>` is the home directory of your Tomcat server.
  
2. Open a terminal, navigate to the `<TOMCAT_HOME>/bin` folder, and start the Tomcat server using the following command:

    !!! note
      This will extract the contents of the **war** file. </br>
      If your Tomcat server is set to auto-deploy applications, you can skip this step.

  ```shell script 
  sh catalina.sh start
  ```

3. Go to the `<TOMCAT_HOME>/webapps/oidc-sample-app/WEB-INF/classes` folder and open the `oidc-sample-app.properties` file in a text editor.
4. Update the following in the `oidc-sample-app.properties` file:

    !!! note
      Replace <code>{organization_name}</code> with the name of your organization and apply the client ID and client secret that was generated when you registered the application in Asgardeo.

    ``` 
    consumerKey=<client ID>
    consumerSecret=<client secret>
    scope=openid,address,email,profile

    callBackURL=http://localhost:8080/oidc-sample-app/oauth2client
    trustedAudience=http://localhost:8080/oidc-sample-app      

    issuer=https://api.asgardeo.io/t/{organization_name}/oauth2/token
    authorizeEndpoint=https://api.asgardeo.io/t/{organization_name}/oauth2/authorize
    logoutEndpoint=https://api.asgardeo.io/t/{organization_name}/oidc/logout
    tokenEndpoint=https://api.asgardeo.io/t/{organization_name}/oauth2/token
    jwksEndpoint=https://api.asgardeo.io/t/{organization_name}/oauth2/jwks
    #sessionIFrameEndpoint=https://api.asgardeo.io/t/{organization_name}/oidc/checksession

    skipURIs=/oidc-sample-app/index.html
    indexPage=index.html
    logoutURL=logout 
    errorPage=error.jsp
    ```
     <table>
      <tr>
         <th>Configuration</th>
         <th>Description</th>
      </tr>
      <tr>
        <td>
            <code>consumerKey</code>
        </td>
        <td>
            The client id of the registered application.
        </td>
      </tr>
      <tr>
        <td>
            <code>consumerSecret</code>
        </td>
        <td>The client secret of the registered application.</td>
      </tr>
      <tr>
        <td>
            <code>scope</code>
        </td>
        <td>
            <p>The list of OIDC scopes that are used for requesting user information. You can add OIDC scopes such as <code>profile</code> and <code>email</code> in a comma-separated list as follows: </p>
            <code>scope=openid,address,email,profile</code>
        </td>
      </tr>
      <tr>
        <td>
            <code>issuer</code>
        </td>
        <td>
            Issuer endpoint of Asgardeo used for id token validation:
            <code>https://api.asgardeo.io/t/{organization_name}/oauth2/token</code>
        </td>
      </tr>
      <tr>
        <td>
            <code>authorizeEndpoint</code>
        </td>
        <td>The authorization endpoint of your Asgardeo organization:
            <code>https://api.asgardeo.io/t/{organization_name}/oauth2/authorize</code>
        </td>
      </tr>
      <tr>
        <td>
          <code>logoutEndpoint</code>
        </td>
        <td>The logout endpoint of your Asgardeo organization:
          <code>https://api.asgardeo.io/t/{organization_name}/oidc/logout</code>
        </td>
      </tr>
      <tr>
          <td>
            <code>tokenEndpoint</code>
          </td>
          <td>The token endpoint of your Asgardeo organization:
            <code>https://api.asgardeo.io/t/{organization_name}/oauth2/token</code>
          </td>
      </tr>
      <tr>
        <td>
            <code>jwksEndpoint</code>
        </td>
        <td>The jwks endpoint of your Asgardeo organization:
            <code>https://api.asgardeo.io/t/{organization_name}/oauth2/jwks</code>
        </td>
    </tr>
    </table>

5. On your terminal, navigate to the `<TOMCAT_HOME>/bin>` folder and run the following commands to restart the Tomcat server for the configurations to take effect:

    ```shell script 
    sh catalina.sh stop
    sh catalina.sh start
    ```
## Run the sample

Follow the steps given below to run the sample.

1. Access the application using the following URL: `http://localhost:8080/oidc-sample-app/index.html`.

    ![Java OIDC app login]({{base_path}}/assets/img/guides/applications/java-oidc-login.jpg)

2. Click **Login**. You will be redirected to the Asgardeo login page.

   ![Asgardeo Sign in page]({{base_path}}/assets/img/guides/applications/sign-in-asgardeo.png)

4. Enter the credentials of your user account and click **Sign In**.

    !!! note "Extend your login session"
        By default, the user login session is active for only `15 minutes`. You can extend the session to `14 days` by selecting the **Remember me on this computer** option provided at the login screen of your application.