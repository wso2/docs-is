# Configuring Github Authenticator

!!! warning
    
    For latest instructions on how to configuring the Github authenticator,
    see Github Authenticator [Github
    repository](https://github.com/wso2-extensions/identity-outbound-auth-github/tree/master/docs)
    .
    

This page provides instructions on how to configure the Github
authenticator and Identity Server using a sample app. You can find more
information in the following sections.

Github Authenticator  is supported by Identity Server 5.1.0 upwards.

-   [Deploying Github
    artifacts](#ConfiguringGithubAuthenticator-DeployingGithubartifactsDeployingGithubartifacts)
-   [Configuring the Github
    App](#ConfiguringGithubAuthenticator-ConfiguringtheGithubAppConfiguringtheGithubApp)
-   [Deploying travelocity.com sample
    app](#ConfiguringGithubAuthenticator-Deployingtravelocity.comsampleappDeployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringGithubAuthenticator-ConfiguringtheidentityproviderConfiguringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringGithubAuthenticator-ConfiguringtheserviceproviderConfiguringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringGithubAuthenticator-TestingthesampleTestingthesample)

### Deploying Github artifacts

-   Download the artifacts for this authenticator from [the
    store](https://store.wso2.com/store/assets/isconnector/details/bfed96a9-0d79-4770-9c55-22378d3a2812)
    .

-   Place the org.wso2.carbon.identity.authenticator.github-1.0.0.jar
    file into the
    `           <IS_HOME>/repository/components/dropins          `
    directory.

    !!! note
    
        If you want to upgrade the Github Authenticator (.jar) in your
        existing IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

### Configuring the Github App

1.  Go to <https://www.github.com/>, and create a github account.
2.  Register your app at <https://github.com/settings/applications/new>
    .  
    ![](attachments/49774670/49971235.png){width="600"}
3.  Use `          https://localhost:9443/commonauth         ` as the
    authorization callback URL when you register the client.
4.  Now you can get the clientId and clientSecret of your created app.  
    ![](attachments/49774670/49971238.png){width="600" height="655"}

### Deploying travelocity.com sample app

The next step is to [deploy the sample app](_Deploying_the_Sample_App_)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding an [identity
provider](https://docs.wso2.com/identity-server/Adding+and+Configuring+an+Identity+Provider)
and [service
provider](https://docs.wso2.com/identity-server/Adding+and+Configuring+a+Service+Provider)
.

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](https://docs.wso2.com/identity-server/Adding+and+Configuring+an+Identity+Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).

2.  Run the [WSO2 Identity
    Server](https://docs.wso2.com/identity-server/Running+the+Product).
3.  Log in to the [management
    console](https://docs.wso2.com/identity-server/Getting+Started+with+the+Management+Console)
    as an administrator.
4.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
5.  Give a suitable name for **Identity Provider Name**.  
    ![](attachments/49774670/49971239.png){width="600" height="561"}
6.  Navigate to **Github Configuration** under **Federated
    Authenticators**.

7.  Enter the values as given in the above figure.

    -   **Client Id** : Client Id for your app.
    -   **Client Secret** : Client Secret for your app.
    -   **Scope** : Scope of the authorize token. For information on
        available scopes, see
        [Scopes](https://developer.github.com/apps/building-oauth-apps/scopes-for-oauth-apps/)
        .
    -   **Callback URL** : Service Provider's URL where code needs to be
        sent .

8.  Select both checkboxes to **Enable** the Github authenticator and
    make it the **Default**.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    here to see descriptions about configuration property values

    <table style="width:100%;">
    <colgroup>
    <col style="width: 7%" />
    <col style="width: 83%" />
    <col style="width: 9%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Property</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable</td>
    <td>Selecting this option enables github to be used as an authenticator for users provisioned to the Identity Server.</td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td>Default</td>
    <td>Selecting the Default checkbox signifies that github is the main/default form of authentication. This removes the selection made for any other Default checkboxes for other authenticators.</td>
    <td>Selected</td>
    </tr>
    <tr class="odd">
    <td>ClientID</td>
    <td>This is the username from the github application</td>
    <td>8437ce9b8cfdf282c92b</td>
    </tr>
    <tr class="even">
    <td>Client Secret</td>
    <td>This is the password from the github application. Click the Show button to view the value you enter.</td>
    <td>7219bb5e92f4287cb5134b73760e039e55d235d</td>
    </tr>
    <tr class="odd">
    <td>Scope</td>
    <td>Scope of the authorize token. For information on available scopes, see <a href="https://developer.github.com/apps/building-oauth-apps/scopes-for-oauth-apps/">Scopes</a> .</td>
    <td><br />
    </td>
    </tr>
    <tr class="even">
    <td>Callback URL</td>
    <td><div class="content-wrapper">
    <p>This is the URL to which the browser should be redirected after the authentication is successful. The URL should be specified in the following format:<br />
    <code>                   https://&lt;HOST_NAME&gt;:&lt;PORT&gt;/acs                  </code></p>
    </div></td>
    <td><code>                 https://localhost:9443/commonauth                </code></td>
    </tr>
    </tbody>
    </table>

9.  Click **Register**.

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
        `             http://localhost:8080/travelocity.com/home.jsp            `

6.  Select the following check-boxes:
    1.  **Enable Response Signing**.

    2.  **Enable Single Logout**.

    3.  **Enable Attribute Profile**.

    4.  **Include Attributes in the Response Always**.

    ![](attachments/49774670/85361222.png){width="900"}
7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.

8.  Navigate to the **Local and Outbound Authentication Configuration**
    section.

9.  Select the identity provider you created from the drop-down list
    under **Federated Authentication**.

    ![](attachments/49774670/49971240.png){width="600" height="396"}

10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp          `
    . E.g., `           http://localhost:8080/travelocity.com          `

2.  Login with SAML from the WSO2 Identity Server.

    ![](attachments/49774670/85361224.jpeg){width="500"}

3.  Enter your Github credentials in the prompted login page of Github.
    Once you log in successfully you will be taken to the home page of
    the travelocity.com app.
