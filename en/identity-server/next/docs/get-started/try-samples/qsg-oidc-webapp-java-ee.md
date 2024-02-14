# Sample OIDC Java EE web app

By following this guide, you will be able to deploy a Java EE web application locally and secure it with OpenID Connect.

## Prerequisites

- **Apache tomcat 9.x or 8.x**

    If you don't have it, install [Apache tomcat](https://tomcat.apache.org/tomcat-9.0-doc/setup.html){target="_blank"}.

- **A user account in the {{ product_name }}**

    If you don't already have one, create a user account in the {{ product_name }}.

## Register the app

Follow the steps given below to register the sample Java EE web application in {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Traditional Web Application**:

    ![Select app type in the WSO2 Ifentity Server]({{base_path}}/assets/img/guides/applications/select-app-type.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enter the following details:

    ![Create a new web app]({{base_path}}/assets/img/guides/applications/create-new-oidc-web-app.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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

4. Click **Create** to complete the registration.

5. Go to the **Protocol** tab and take note of the **Client ID** and the **Client secret**. You will need them to configure the application later.

    ![Client ID and client secret]({{base_path}}/assets/img/guides/applications/client-secret-oidc.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! tip
    To provide a better experience for the user, it is recommended to configure an access URL for the application. You can set an access URL from the **General** tab of the application. (For this sample application, the access URL is <code>https://localhost:8080/oidc-sample-app</code>).

    The access URL is used,

    - in the application catalog and discovery flows.
    - to redirect the user back to the application in the following scenarios.
        - if the login page times out
        - after a password reset
        - after the self sign-up verification
    - to re-initiate the login flow if the login flow fails.

## Download the sample

Click the button below to download the sample. You can also choose to view the source before doing so.

<div class="centered-container">
  <div class="border-text">
    <img src="{{base_path}}/assets/img/logo/java-logo.svg" alt="OIDC" width=50><br>
    <a href="https://github.com/asgardeo/asgardeo-tomcat-oidc-agent/releases/latest/download/oidc-sample-app.war" target="_blank">Download sample</a>
  </div>

  <div class="border-text">
    <img src="{{base_path}}/assets/img/logo/github-logo.svg" alt="Github" width=50><br>
    <a href="https://github.com/asgardeo/asgardeo-tomcat-oidc-agent/tree/master/io.asgardeo.tomcat.oidc.sample" target="_blank">View source</a>
  </div>
</div>

## Configure the sample

Follow the steps given below to configure the sample app.

1. Move the  **war** file that you downloaded to the `{TOMCAT_HOME}/webapps` folder where `{TOMCAT_HOME}` is the home directory of your Tomcat server.
  
2. Open a terminal, navigate to the `{TOMCAT_HOME}/bin` folder, and start the Tomcat server using the following command:

    ```bash 
    sh catalina.sh start
    ```

    !!! note
        This will extract the contents of the **war** file. </br>
        If your Tomcat server is set to auto-deploy applications, you can skip this step.

3. Go to the `{TOMCAT_HOME}/webapps/oidc-sample-app/WEB-INF/classes` folder and open the `oidc-sample-app.properties` file in a text editor.
4. Update the following in the `oidc-sample-app.properties` file:

    ``` json
    consumerKey={client ID}
    consumerSecret={client secret}
    scope=openid,address,email,profile

    callBackURL=http://localhost:8080/oidc-sample-app/oauth2client
    trustedAudience=http://localhost:8080/oidc-sample-app      

    issuer=https://localhost:9443/oauth2/token
    authorizeEndpoint=https://localhost:9443/oauth2/authorize
    logoutEndpoint=https://localhost:9443/oidc/logout
    tokenEndpoint=https://localhost:9443/oauth2/token
    jwksEndpoint=https://localhost:9443/oauth2/jwks
    #sessionIFrameEndpoint=https://localhost:9443/oidc/checksession

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
            Issuer endpoint of the {{ product_name }} used for id token validation:
            <code>https://localhost:9443/oauth2/token</code>
        </td>
      </tr>
      <tr>
        <td>
            <code>authorizeEndpoint</code>
        </td>
        <td>The authorization endpoint of the {{ product_name }}:
            <code>https://localhost:9443/oauth2/authorize</code>
        </td>
      </tr>
      <tr>
        <td>
          <code>logoutEndpoint</code>
        </td>
        <td>The logout endpoint of the {{ product_name }}:
          <code>https://localhost:9443/oidc/logout</code>
        </td>
      </tr>
      <tr>
          <td>
            <code>tokenEndpoint</code>
          </td>
          <td>The token endpoint of the {{ product_name }}:
            <code>https://localhost:9443/oauth2/token</code>
          </td>
      </tr>
      <tr>
        <td>
            <code>jwksEndpoint</code>
        </td>
        <td>The jwks endpoint of the {{ product_name }}:
            <code>https://localhost:9443/oauth2/jwks</code>
        </td>
    </tr>
    </table>

5. On your terminal, navigate to the `{TOMCAT_HOME}/bin` folder and run the following commands to restart the Tomcat server for the configurations to take effect:

    ```bash 
    sh catalina.sh stop
    sh catalina.sh start
    ```

## Run the sample

Follow the steps given below to run the sample.

1. Access the application using the following URL: `http://localhost:8080/oidc-sample-app/index.html`.

2. Click **Login**. You will be redirected to the {{ product_name }} login page.

    ![WSO2 Identity Server sign in page]({{base_path}}/assets/img/guides/applications/sign-in-is.png){: width="350" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enter the credentials of your user account and click **Sign In**.
