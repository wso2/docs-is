# Configuring MailChimp Authenticator

The MailChimp authenticator allows you to authenticate a user using
MailChimp through the WSO2 Identity Server. MailChimp is an email
marketing service and the trading name of its operator.
MailChimp features and integrations allow you to send marketing emails,
automated messages, and targeted campaigns. Their detailed reports help
you keep improving over time.

![](../../assets/img/49092742/76746257.png) 

This page provides instructions on how to configure the MailChimp
authenticator and Identity Server using a sample app. You can find more
information in the following sections.

!!! info 
    This is tested with the mailChimp API version 2.0. MailChimp
    Authenticator is supported by Identity Server 5.1.0 upwards.

!!! info 
    To download the authenticator and other artifacts, go to
    [https://store.wso2.com/store/assets/isconnector/MailChimp](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22MailChimp%22)

### Deploying MailChimp artifacts

-   Place the authenticator .jar file into the
    `           <IS_HOME>/repository/components/dropins          `
    directory. You can download the mailchimpAuthenticator jar file from
    [wso2
    store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22MailChimp%22)
    .  

    !!! note
        If you want to upgrade the MailChimp Authenticator (.jar) in your
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

### Configuring the MailChimp App

1.  Navigate to <https://login.mailchimp.com/signup> to create account
    for MailChimp. You receive an email to confirm your account and you
    must provide your details before you get started.
2.  Navigate to <https://login.mailchimp.com> and log in using the
    credentials you used to create the account.
3.  Once you have logged in, navigate to your profile and click the
    **Extras** tab.
4.  Click the **Registered Apps** tab next. This is done so that you can
    register an App.
5.  Use  `          https://localhost:9443/commonauth         `
    as redirect URL when you register the client. Here you can use
    127.0.0.1 instead of localhost.  
    ![](../../assets/img/49092781/49226960.png) 
6.  From the app dashboard you can get clientId and clientSecret for
    your created app.  

### Deploying travelocity.com sample app

The next step is to [deploy the sample app](../../develop/deploying-the-sample-app)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding an [identity
provider](../../learn/adding-and-configuring-an-identity-provider) and [service
provider](../../learn/adding-and-configuring-a-service-provider).

!!! info "Need to do this configuration"
    Change the **SAML2.IdPURL** to
    `                     https://127.0.0.1:9443/samlsso                   `
    instead of `          https://localhost:9443/samlsso         ` in
    `          <Tomcat_Home>/webapps/travelocity.com/WEB-INF/classes/travelocity.properties         `

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](../../learn/adding-and-configuring-an-identity-provider).

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).
2.  Run the [WSO2 Identity
    Server](../../setup/running-the-product).
3.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
4.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
5.  Give a suitable name for **Identity Provider Name**.  
    ![](../../assets/img/49092781/56994052.png) 
6.  Navigate to **MailChimp Configuration** under **Federated
    Authenticators**.

7.  Enter the values as given in the above figure.
    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable</td>
    <td>Selecting this option enables MailChimp to be used as an authenticator for users provisioned to WSO2 Identity Server.</td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td>Default</td>
    <td>Selecting the <strong>Default</strong> checkbox signifies that MailChimp is the main/default form of authentication. This removes the selection made for any other Default checkboxes for other authenticators.</td>
    <td>Selected</td>
    </tr>
    <tr class="odd">
    <td>Client Id</td>
    <td>Client Id of your app.</td>
    <td><br />
    </td>
    </tr>
    <tr class="even">
    <td>Client Secret</td>
    <td>Client Secret of your app.</td>
    <td><br />
    </td>
    </tr>
    <tr class="odd">
    <td>Callback URL</td>
    <td>This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: https://(host-name):(port)/acs.</td>
    <td><br />
    </td>
    </tr>
    <tr class="even">
    <td>userInfoEndpoint</td>
    <td><div class="content-wrapper">
    <p>The endpoint to get the user information for MailChimp It should have this format: https://.api.mailchimp.com/2.0/users/profile.</p>
    <div>
    <p>How to get mailChimpInstanceValue</p>
    <p>The URL after sign up will be similiar to the following URL: https://us12.admin.mailchimp.com/account/.</p>
    <p>In the example URL, <code>                  us12                 </code> is the <strong>mailChimpInstanceValue</strong> . Replace the <code>                  &lt;mailChimpInstanceValue&gt;                 </code> tag with the instance value you receive. The userInfoEndpoint for the example URL is https://us12.api.mailchimp.com/2.0/users/profile.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">https:<span class="co">//&lt;mailChimpInstanceValue&gt;.api.mailchimp.com/2.0/users/profile</span></a></code></pre></div>
    </div>
    </div>
    </div>
    </div></td>
    <td><br />
    </td>
    </tr>
    </tbody>
    </table>

8.  Click **Register**.

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
        http://localhost:8080/travelocity.com/home.jsp

6.  Select the following check-boxes:
    1.  **Enable Response Signing**.

    2.  **Enable Single Logout**.

    3.  **Enable Attribute Profile**.

    4.  **Include Attributes in the Response Always**.  
        ![](../../assets/img/49092781/103332418.png)

7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.

8.  Navigate to the **Local and Outbound Authentication Configuration**
    section.

9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.

10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp          `
    . E.g., <http://localhost:8080/travelocity.com>

2.  Click “Login with SAML” to log in with SAML from the WSO2 Identity
    Server.
    ![](../../assets/img/49092781/51251955.png) 

3.  Enter your MailChimp credentials in the prompted login page of
    MailChimp.  
    ![](../../assets/img/49092781/49226963.png)   

4.  Once you login successfully you will be taken to the home page of
    the travelocity.com app.  
    ![](../../assets/img/49092781/51251954.png)   