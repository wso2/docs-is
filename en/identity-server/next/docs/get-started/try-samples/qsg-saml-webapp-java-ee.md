# Sample SAML Java EE web app

By following this guide, you will be able to deploy a Java EE web application locally and secure it with SAML.

## Prerequisites

- **Apache tomcat 9.x or 8.x**

    If you don't have it, install [Apache tomcat](https://tomcat.apache.org/tomcat-9.0-doc/setup.html){target="_blank"}.

- **A user account in the {{ product_name }}**

    If you don't already have one, create a user account in the {{ product_name }}.

## Register the app

Follow these steps given below to register the sample Java EE web application in the {{ product_name }}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Click **New Application** and select **Traditional Web Application**.

    ![Select app type in {{ product_name }}]({{base_path}}/assets/img/guides/applications/select-app-type.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enter the following details:

    ![Create a new SAML app]({{base_path}}/assets/img/guides/applications/create-new-saml-web-app.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
      <tr>
          <td>Name</td>
          <td>
            Give a unique name to identify your application.
            <p>e.g.:<code>sample-app</code></p>
          </td>
      </tr>
      <tr>
          <td>Protocol</td>
          <td>Select <b>SAML</b>.</td>
      </tr>
      <tr>
          <td>Configruation type</td>
          <td>Select <b>Manual</b> (Learn more about [SAML configuration types]({{base_path}}/guides/applications/register-saml-web-app/))</td>
      </tr>
    <tr>
      <td>Issuer</td>
      <td>
        Add a unique identifier for the application. This should be used in the SAML authentication request sent from the client. You can't change the issuer after the app is registered.
        <p>e.g.:<code>sample-issuer</code></p>
      </td>
    </tr>
    <tr>
      <td>Assertion consumer service URLs</td>
      <td>
        The URL to which the user is redirected after login and logout. Use the following URL for this sample app:
        <p><code>http://localhost:8080/sample-app/home.jsp</code></p>
      </td>
    </tr>
    </table>
5. Click **Create** to complete the registration.

!!! tip
    To provide a better experience for the user, it is recommended to configure an access URL for the application. You can set an access URL from the **General** tab of the application. (For this sample application, the access URL is <code>https://localhost:8080/sample-app</code>).

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
    <a href="https://github.com/asgardeo/asgardeo-tomcat-saml-agent/releases/latest/download/sample-app.war" target="_blank">Download sample</a>
  </div>

  <div class="border-text">
    <img src="{{base_path}}/assets/img/logo/github-logo.svg" alt="Github" width=50><br>
    <a href="https://github.com/asgardeo/asgardeo-tomcat-saml-agent/tree/master/io.asgardeo.tomcat.saml.agent.sample" target="_blank">View source</a>
  </div>
</div>

## Configure the sample

Follow the steps given below to configure the sample app.

1. Move the  **war** file that you downloaded to the `{TOMCAT_HOME}/webapps` folder where `{TOMCAT_HOME}` is the root of your Tomcat server.
  
2. Open a terminal, navigate to the `{TOMCAT_HOME}/bin` folder, and start the Tomcat server using the following command:

    !!! note
        This will extract the contents of the **war** file. </br>
      If your Tomcat server is set to auto-deploy applications, you can skip this step.

    ```bash 
    sh catalina.sh start
    ```

3. Go to the `{TOMCAT_HOME}/webapps/sample-app/WEB-INF/classes` folder and open the `sample-app.properties` file in a text editor.

4. Update the following in the `sample-app.properties` file:

    !!! note

        - Update the **SAML2.IdPEntityId** parameter with the {{ product_name }} issuer, which is `localhost`.
        - **SAML2.SPEntityId** should match the issuer name entered when registering the application in the {{ product_name }}.

    ```saml
    SAML2.AssertionConsumerURL=http://localhost:8080/sample-app/home.jsp
    SAML2.SPEntityId=sample-issuer
    SAML2.IdPEntityId=localhost
    SAML2.IdPURL=https://localhost:9443/samlsso
    SAML2SSOURL=samlsso
    EnableSAML2SSOLogin=true
    SAML2.EnableSLO=true
    SAML2.SLOURL=logout
    SkipURIs=/sample-app/index.html
    IndexPage=index.html
    ErrorPage=/error.jsp
    SAML2.EnableResponseSigning=false
    SAML2.EnableAssertionSigning=false
    SAML2.EnableAssertionEncryption=false
    SAML2.EnableRequestSigning=true
    SAML2.IsPassiveAuthn=false
    IdPPublicCert={public_cert_of_identity-server}
    KeyStorePassword=wso2carbon
    PrivateKeyAlias=wso2carbon
    IdPPublicCertAlias=wso2carbon
    PrivateKeyPassword=wso2carbon
    ```
    <table>
      <thead>
        <tr>
         <th>Configuration</th>
         <th>Description</th>
      </tr>
      </thead>
      <tbody>
        <tr>
         <td><code>SAML2.AssertionConsumerURL</code></td>
         <td>
          The URL to which the user is redirected after login and logout.
         </td>
        </tr>
        <tr>
         <td><code>SAML2.SPEntityId</code></td>
         <td>
            The SAML issuer that is used when registering your application with the {{ product_name }}.
          </td>
        </tr>
        <tr>
         <td><code>SAML2.IdPEntityId</code></td>
         <td>
            The issuer name of the {{ product_name }}.
            <p><code>localhost</code></p>
         </td>
        </tr>
        <tr>
          <td><code>SAML2.IdPURL</code></td>
          <td>
            The endpoint of the {{ product_name }} to which login and logout requests should be sent:
            <p><code>https://localhost:9443/samlsso</code></p>
          </td>
        </tr>
        <tr>
           <td><code>IdPPublicCert</code></td>
           <td>This specifies the public certificate of the {{ product_name }}. You can obtain the public certificate from the Console. See [how to get SAML configurations from the {{ product_name }} Console]({{base_path}}/guides/authentication/saml/discover-saml-configs).</td>
        </tr>
        <tr>
          <td><code>skipURIs</code></td>
          <td>Defines the web pages in your application that should not be secured and does not require authentication.</td>
        </tr>
      </tbody>
    </table>

    ??? note "Other properties"

        <table>
          <thead>
            <tr>
            <th>Configuration</th>
            <th>Description</th>
            </tr>
        </thead>
          <tbody>
            <tr>
              <td>
                <code>EnableSAML2SSOLogin</code>
              </td>
              <td>
                Specifies whether single sign-on is enabled for this application.
              </td>
            </tr>
            <tr>
              <td>
              <code> SAML2.EnableSLO</code>
              </td>
              <td>
                Specifies whether logout is enabled for this application.
              </td>
            </tr>
            <tr>
              <td>
                <code>SAML2.EnableResponseSigning</code>
              </td>
              <td>
                If this configuration is set to <code>true</code>, the application validates the signature in the SAML response. You also need to [enable response signing from {{ product_name }}]({{base_path}}/references/app-settings/saml-settings-for-app/#response-signing).
                If this configuration is set to <code>false</code>, the application does not mandate response signing from {{ product_name }}.
              </td>
          </tr>
          <tr>
            <td>
            <code>SAML2.EnableAssertionSigning</code>
            </td>
            <td>
              If this configuration is set to <code>true</code>, the application validates the signature in the SAML assertion. You also need to [enable response signing from {{ product_name }}]({{base_path}}/references/app-settings/saml-settings-for-app/#response-signing).
              If this configuration is set to <code>false</code>, the application does not mandate response signing from {{ product_name }}.
            </td>
          </tr>
          <tr>
            <td>
              <code>SAML2.EnableAssertionEncryption</code>
            </td>
            <td>
              If this configuration is set to <code>true</code>, the application expects an encrypted SAML assertion. You also need to [enable encryption for SAML assertions]({{base_path}}/references/app-settings/saml-settings-for-app/) from {{ product_name }}.
            </td>
          </tr>
          <tr>
            <td>
              <code>SAML2.EnableRequestSigning</code>
            </td>
            <td>
              If this configuration is set to <code>true</code>, {{ product_name }} validates the SAML authentication request and logout request. You also need to [enable request signing]({{base_path}}/references/app-settings/saml-settings-for-app/) from {{ product_name }}.
            </td>
          </tr>
          <tr>
            <td>
              <code>SAML2.IsPassiveAuthn</code>
            </td>
            <td>
              Specifies whether to enable passive authentication.
            </td>
          </tr>
          <tr>
            <td>
              <code>KeyStorePassword</code>
            </td>
            <td>
              Keystore password of your application.
            </td>
          </tr>
          <tr>
            <td>
              <code>PrivateKeyAlias</code>
            </td>
            <td>
              Private key alias of your application.
            </td>
          </tr>
          <tr>
            <td>
              <code>PrivateKeyPassword</code>
            </td>
            <td>
              Password of the private key of your application.
            </td>
          </tr>
          </tbody>
        </table>

5. In the `{TOMCAT_HOME}/bin` folder, run the following commands to restart the Tomcat server for the configurations to take effect:

    ```bash 
    sh catalina.sh stop
    sh catalina.sh start
    ```

## Run the sample

Follow the steps given below to run the sample.

1. Access the application using the following URL: `http://localhost:8080/sample-app/index.html`.

2. Click **Login**. You will be redirected to the {{ product_name }} login page.

    ![{{ product_name }} sign in page]({{base_path}}/assets/img/guides/applications/sign-in-is.png){: width="350" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Enter credentials of your user account and click **Sign In**.

    !!! note "Extend your login session"
        By default, the user login session is active for only `15 minutes`. You can extend the session to `14 days` by selecting the **Remember me on this computer** option provided at the login screen of your application.