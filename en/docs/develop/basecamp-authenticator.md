# Basecamp Authenticator

The Basecamp authenticator is configured as a federated authenticator in
WSO2 Identity Server to authenticate Basecamp users to log in to your
organization’s applications.

![](../../assets/img/49092836/76746249.png) 

!!! info 
    To download the authenticator and other artifacts, go to
    [https://store.wso2.com/store/assets/isconnector/basecamp](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22basecamp%22).

This page provides instructions on how to configure the Basecamp
authenticator and Identity Server using a sample app. You can find more
information in the following sections.

!!! info 
    This is tested with the product Basecamp 2. Basecamp Authenticator is
    supported by Identity Server 5.1.0 upwards.

### Deploying Basecamp artifacts

-   Place the authenticator .jar
    file (org.wso2.carbon.identity.authenticator.basecamp-1.0.0.jar) into
    the `           <IS_HOME>/repository/components/dropins          `
    directory.

    !!! note
        If you want to upgrade the Basecamp Authenticator (.jar) in your
        existing IS pack, please refer [upgrade
        instructions.](../../develop/upgrading-an-authenticator)
    

    !!! info "Need to do this configuration"
        If you are using WSO2 Identity Server 5.5.0, be sure to disable
        consent management for single-sign-on (SSO) authentication. To
        disable consent management for SSO authentication, go to the
        `            <IS_HOME>/repository/conf/identity/identity.xml           `
        file, and set the
        `            EnableSSOConsentManagement           ` parameter to
        `            false           ` .

        ``` java
        <Consent>
            <!--Specify whether consent management should be enabled for SSO authentication -->
            <EnableSSOConsentManagement>false</EnableSSOConsentManagement>
        </Consent>
        ```

        If you do not disable consent management for SSO authentication, you
        will get an error when you try to configure the authenticator with
        WSO2 Identity Server 5.5.0.

### Configuring the Basecamp App

1.  Create a basecamp account using the following URL:
    <https://www.basecamp.com/> .
2.  Log in to [integrate.37signals.com](https://integrate.37signals.com/) to
    register an app. Then you will be redirected to the page like below.
    Select Basecamp 2 under integration.  
    ![](../../assets/img/49092838/57759606.jpg)   
3.  Us e <https://localhost:9443/commonauth> as the redirect URL when
    you register the client.
4.  Now you can get clientId and clientSecret of your created app.  

### Deploying travelocity.com sample app

The next step is to [deploy the sample app](../../develop/deploying-the-sample-app)
in order to use it in this scenario.

Once this is done, you can configure the WSO2 Identity Server by adding
an [identity
provider](../../learn/adding-and-configuring-an-identity-provider)
and [service
provider](../../learn/adding-and-configuring-a-service-provider)
.

### Configuring the identity provider

Now you can configure WSO2 Identity Server by [adding a new identity
provider](../../learn/adding-and-configuring-an-identity-provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).
2.  Go to <https://basecamp.com> in your browser, and then click the
    HTTPS trust icon on the address bar (e.g., the padlock next to the
    URL) to download the certificate.

3.  Import that certificate into the IS client keystore.  
    `           keytool -importcert -file <certificate file> -keystore <IS_HOME>/repository/resources/security/client-truststore.jks -alias "Basecamp"          `
 
    !!! info 
        The default password of the client-truststore.jks is "wso2carbon"

4.  Run the [WSO2 Identity
    Server](../../setup/running-the-product).
5.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
6.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
7.  Give a suitable name for **Identity Provider Name**.  
      
    ![](../../assets/img/49092838/51252027.png) 
8.  Navigate to **Basecamp Configuration** under **Federated
    Authenticators**.

9.  Enter the values as given in the above figure.

    -   **Client Id** : Client Id for your app.
    -   **Client Secret** : Client Secret for your app.
    -   **Callback URL** : Service Provider's URL where code needs to be
        sent .

10. Select both checkboxes to **Enable** the Basecamp authenticator and
    make it the **Default**.

11. Click **Register**.

??? note "Click here to see descriptions about configuration property values"
    <table style="width:100%;">
    <colgroup>
    <col style="width: 6%" />
    <col style="width: 83%" />
    <col style="width: 9%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Property</th>
    <th>Description</th>
    <th>Sample values</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable</td>
    <td>Selecting this option enables Basecamp to be used as an authenticator for users provisioned to the Identity Server.</td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td>Default</td>
    <td>Selecting the Default checkbox signifies that Basecamp is the main/default form of authentication. This removes the selection made for any other Default checkboxes for other authenticators.</td>
    <td>Selected</td>
    </tr>
    <tr class="odd">
    <td>Client ID</td>
    <td>This is the username from the Basecamp application</td>
    <td>8437ce9b8cfdf282c92b</td>
    </tr>
    <tr class="even">
    <td>Client Secret</td>
    <td>This is the password from the Basecamp application. Click the Show button to view the value you enter.</td>
    <td>7219bb5e92f4287cb5134b73760e039e55d235d</td>
    </tr>
    <tr class="odd">
    <td>Callback URL</td>
    <td>This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: https://(host-name):(port)/acs .</td>
    <td><a href="https://localhost:9443/commonauth">https://localhost:9443/commonauth</a></td>
    </tr>
    </tbody>
    </table>

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Service Providers** section, click **Add** under the
    **Main** tab.

3.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

5.  Now set the configuration as follows:

    1.  **Issuer** : travelocity.com

    2.  **Assertion Consumer URL** :
        <http://localhost:8080/travelocity.com/home.jsp>

6.  Select the following check-boxes:
    1.  **Enable Response Signing**.

    2.  **Enable Single Logout**.

    3.  **Enable Attribute Profile**.

    4.  **Include Attributes in the Response Always**.  
        ![](../../assets/img/49092838/103332609.png)

7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.

8.  Navigate to the **Local and Outbound Authentication Configuration**
    section.

9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.

    ![](../../assets/img/49092838/49227070.png) 

10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com                     `
    E.g., <http://localhost:8080/travelocity.com>

2.  Log in with SAML from the WSO2 Identity Server.

    ![](../../assets/img/49092838/103332635.png) 

3.  Enter your Basecamp credentials in the prompted login page of
    Basecamp. Once you login successfully you will be taken to the home
    page of the travelocity.com app.

