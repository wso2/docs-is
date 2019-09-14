# Configuring MePIN Authenticator

This topic provides instructions on how to configure the MePIN app and
the Identity Server to integrate using a sample app.

This is tested for the MePIN API version 3.0.

See the following sections for more information.

-   [Configuring the MePIN
    app](#ConfiguringMePINAuthenticator-ConfiguringtheMePINapp)
-   [Deploying travelocity.com sample
    app](#ConfiguringMePINAuthenticator-Deployingtravelocity.comsampleapp)
-   [Deploying MePIN
    artifacts](#ConfiguringMePINAuthenticator-DeployingMePINartifacts)
-   [Configuring the identity
    provider](#ConfiguringMePINAuthenticator-Configuringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringMePINAuthenticator-Configuringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringMePINAuthenticator-Testingthesample)

### Configuring the MePIN app

1.  Install
    [Android](https://play.google.com/store/apps/details?id=com.mepin.android3)
    or [IOS](https://itunes.apple.com/app/id1062845220) application on
    your mobile device.
2.  Log in to [MePIN developer
    portal](https://developer.mepin.com/welcome) using your app.
3.  Get your application identifier and credentials.

    1.  Edit your organization.
    2.  Create an application by providing the app name and domain name
        and get the appId / clientId.
    3.  Create credentials (username and password).  

4.  Contact MePin support to activate the application identifier.

### Deploying MePIN artifacts

1.  Place the mepinauthenticationendpoint.war file into the
    `           <IS_HOME>/repository/deployment/server/webapps          `
    directory.
2.  Place the org.wso2.carbon.identity.authenticator.mepin-2.0.0.jar
    file into the
    `            <IS_HOME>/repository/components/dropins           `
    directory.

    !!! note
    
        If you want to upgrade the MePIN Authenticator in your existing IS
        pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

3.  Add the following configurations in the
    `            <IS_HOME>/repository/conf/identity/application-authentication.xml           `
    file under the `            <AuthenticatorConfigs>           `
    section.

    ``` xml
    <AuthenticatorConfig name="MePINAuthenticator" enabled="true">
              <Parameter name="MepinAuthenticationEndpointURL">https://localhost:9443/mepinauthenticationendpoint/mepin.jsp</Parameter>
              <Parameter name="MepinAuthenticationEndpointErrorPage">https://localhost:9443/mepinauthenticationendpoint/mepinError.jsp</Parameter>
              <Parameter name="MepinEnableByUserClaim">false</Parameter>
              <Parameter name="MepinMandatory">true</Parameter>
              <Parameter name="usecase">association</Parameter>
              <Parameter name="secondaryUserstore">primary</Parameter>
    </AuthenticatorConfig>
    ```

    The following table includes the definition of the parameters and
    the various values you can configure.

    <table>
    <thead>
    <tr class="header">
    <th>Value</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><pre><code>MepinAuthenticationEndpointURL</code></pre></td>
    <td>The mepin page which shows in the flows such as link with mepin and login with mepin.</td>
    </tr>
    <tr class="even">
    <td><pre><code>MepinAuthenticationEndpointErrorPage</code></pre></td>
    <td>The mepin error page will be shown if there is issue in the authentication flow.</td>
    </tr>
    <tr class="odd">
    <td><pre><code>MepinEnableByUserClaim</code></pre></td>
    <td>This field makes it possible to disable the 'Mepin disabling by user' functionality. The value can be <code>                true               </code> or <code>                false               </code> . If the value is <code>                true               </code>, user can enable and disable the Mepin according to admin selection ( <code>                                 MepinMandatory                </code> parameter value).</td>
    </tr>
    <tr class="even">
    <td><pre><code>MepinMandatory</code></pre></td>
    <td>If the value is <code>                true               </code>, the second step will be enabled by the admin. The user cannot be authenticated without Mepin authentication. This parameter is used for both super tenant and tenant in the configuration. The value can be <code>                true               </code> or <code>                false.               </code></td>
    </tr>
    <tr class="odd">
    <td><code>                usecase               </code></td>
    <td>This field can take one of the following values: <code>                local               </code>, <code>                association               </code>, <code>                userAttribute               </code>, <code>                subjectUri               </code> . If you do not specify any <code>                usecase               </code>, the default value is <code>                local               </code> . See below for more details.</td>
    </tr>
    <tr class="even">
    <td><pre><code>secondaryUserstore</code></pre></td>
    <td><p>The user store configuration is maintained per tenant as comma separated values. For example, <code>                 &lt;Parameter name="secondaryUserstore"&gt;jdbc, abc, xyz&lt;/Parameter&gt;.                </code><br />
    </p></td>
    </tr>
    </tbody>
    </table>

    An admin can change the priority of the Mepin authenticator by
    changing the `            MepinMandatory           ` value (
    `            true           ` or `            false           ` ).

    -   If Admin specify that Mepin is mandatory (
        `             <Parameter name="MepinMandatory">true</Parameter>            `
       , then you must enable Mepin in the user’s profile by adding
        claim value true in order to authenticate the user. If this is
        not done, the Mepin error page appears.
    -   If Admin specify that Mepin is optional (
        `             <Parameter name="MepinMandatory">false</Parameter>            `
        and you enable Mepin in the user's profile, then the
        authenticator will allow the user to login with Mepin
        authentication as a second step (multi-step authentication). If
        Admin specify that Mepin is optional and you do not enable Mepin
        in the user's profile, the Mepin authenticator will proceed to
        log the user in as the first step (basic authentication).

    The first step may be local authenticator (basic) or a federated
    authenticator (e.g., Facebook, Twitter, etc.). In federated
    authenticator support in first step, the following parameters are
    used according to the scenario.

             <Parameter name="usecase">association</Parameter>
             <Parameter name="secondaryUserstore">jdbc</Parameter>

        usecase value can be local, association, userAttribute or subjectUri.

    <table>
    <tbody>
    <tr class="odd">
    <td><code>                local               </code></td>
    <td><p>This is based on the federated username. This is the default. You must set the federated username in the local userstore. Basically, the federated username must be the same as the local username.</p></td>
    </tr>
    <tr class="even">
    <td><code>                association               </code></td>
    <td><p>The federated username must be associated with the local account in advance in the Dashboard. So the local username is retrieved from the association. To associate the user, log into the <a href="https://docs.wso2.com/identity-server/Using%20the%20End%20User%20Dashboard">end user dashboard</a> and go to <strong>Associated Account</strong> by clicking <strong>View details</strong> .</p></td>
    </tr>
    <tr class="odd">
    <td><code>                userAttribute               </code></td>
    <td><div class="content-wrapper">
    <p>The name of the  federated authenticator's user attribute. That is, the local user name which is contained in a federated user's attribute. When using this, add the following parameter under the <code>                  &lt;AuthenticatorConfig name="MePINAuthenticator" enabled="true"&gt;                 </code> section in the <code>                  &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                 </code> file and put the value (e.g., email, screen_name, id, etc.).</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;userAttribute&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>If you use, OpenID Connect supported authenticators such as LinkedIn, Foursquare, etc., or in the case of multiple social login options as the first step and Mepin as second step, you need to add similar configuration for the specific authenticator in the <code>                  &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                 </code> file under the &lt; <code>                  AuthenticatorConfigs                 </code> &gt; section as follows (the following shows the configuration for Foursquare,LinkedIn and Facebook authenticator respectively).</p>
    <p>Inside the <code>                  AuthenticatorConfig                 </code> (i.e., Foursquare), add the specific <code>                  userAttribute                 </code> with a prefix of the (current step) authenticator name (i.e., MePINAuthenticator-userAttribute).</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;Foursquare&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb2-2" title="2">       <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;MePINAuthenticator-userAttribute&quot;</span><span class="kw">&gt;</span>http://wso2.org/foursquare/claims/email<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb2-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;LinkedIn&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb3-2" title="2">   <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;MePINAuthenticator-userAttribute&quot;</span><span class="kw">&gt;</span>http://wso2.org/linkedin/claims/emailAddress<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb3-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;FacebookAuthenticator&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
    <a class="sourceLine" id="cb4-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;MePINAuthenticator-userAttribute&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a>
    <a class="sourceLine" id="cb4-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
    </div>
    </div>
    <p>Likewise, you can add the AuthenticatorConfig for Amazon,Google,Twitter and Instagram with relevant values.</p>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>                subjectUri               </code></td>
    <td><p>When configuring the federated authenticator, select the attribute in the subject identifier under the service provider section in UI, this is used as the username of the Mepin authenticator.</p></td>
    </tr>
    </tbody>
    </table>

    If you use the secondary userstore, enter all the userstore values
    for the particular tenant as comma separated values.

    The user store configuration is maintained per tenant:

    -   If you use a **super tenant,** put all the parameter values into
        the
        `              <IS_HOME>/repository/conf/identity/application-authentication.xml             `
        file under the `              AuthenticatorConfigs             `
        section.

    <!-- -->

    -   If you use a **tenant**, upload the same XML file (
        `              application-authentication.xml             ` )
        into a specific registry location (
        `              /_system/governance/MePINAuthenticator)             `
        . Create the collection named `              Mepin             `
       , add the resource and upload the
        `              application-authentication.xml             ` file
        into the registry). While doing the authentication, first it
        checks whether there is an XML file uploaded to the registry. If
        that is so, it reads it from the registry but does not take the
        local file. If there is no file in the registry, then it only
        takes the property values from the local file. This is how the
        userstore configuration is maintained per tenant. You can use
        the registry or local file to get the property values.

    4. Add the user claim
    [http://wso2.org/claims/identity/mepin](http://wso2.org/claims/identity/mepinid)
    [id](http://wso2.org/claims/identity/mepinid) [. This is a mandatory
    claim in Mepin authentication. The claim configuration shows under
    **Configuring User Claim**
    section.](http://wso2.org/claims/identity/mepinid)

### Deploying travelocity.com sample app

The next step is to [deploy the sample app](Deploying-the-Sample-App)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding an [identity
provider](http://docs.wso2.com/identity-server/Configuring%2520an%2520Identity%2520Provider)
and [service
provider](http://docs.wso2.com/identity-server/Working+with+the+Service+Provider)
.

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](http://docs.wso2.com/identity-server/Configuring%2520an%2520Identity%2520Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](http://docs.wso2.com/identity-server/Running%2520the%2520Product)
    .
2.  Log in to the [management
    console](http://docs.wso2.com/identity-server/Getting%20Started%20with%20the%20Management%20Console)
    as an administrator.
3.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
4.  Give a suitable name as the **Identity Provider Name**.  
      
    ![](attachments/48283197/49222048.png) 
5.  Go to MePIN Configuration under Federated Authenticators .

6.  Enter the values as given in the above figure.

    -   **Username** : The username that you have generated from MePIN
        Developer Portal.
    -   **Password** : The password that you have generated from MePIN
        Developer Portal.
    -   **Application Id** : The application id that you have received
        from MePIN Developer Portal.
    -   **Callback URL** : Service Provider's URL where the transaction
        status callback is sent when the user has reacted to the push
        notification.
    -   **Client Id** : The Service Provider's pre-configured
        application-specific identifier.
    -   **Confirmation Policy** : The method required from the end user
        to confirm the transaction (e.g., tap, pin, swipe, fp).
    -   **Expiry Time** : Expiry time in seconds.
    -   **Header** : Header message to be displayed by the MePIN Device
        App.
    -   **Message** : Message to be displayed once the App is launched.
    -   **Short Message** : Short message to display for push
        notifications.

7.  Select both checkboxes to **Enable** MePIN Authenticator and make it
    the **Default**.

8.  Click **Register**.

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the Service Providers section under the Main tab, click Add.

3.  Since you are using travelocity as the sample, enter travelocity.com
    in the Service Provider Name text box and click Register .

4.  In the Inbound Authentication Configuration section, click Configure
    under the SAML2 Web SSO Configuration section.
    ![](attachments/48283197/48220892.png) 

5.  Now set the configuration as follows:

    1.  **Issuer** : travelocity.com

    2.  **Assertion Consumer URL** :
        <http://localhost:8080/travelocity.com/home.jsp>

6.  Select the following check-boxes:
    1.  **Enable Response Signing**.

    2.  **Enable Single Logout**.

    3.  **Enable Attribute Profile**.

    4.  **Include Attributes in the Response Always**.  
          
        ![](attachments/48283197/49222047.png) 

7.  Click **Update** to save the changes. Now you will be sent back to
    the Service Providers page.

8.  Go to **Local and Outbound Authentication Configuration** section.

9.  Select the **Advanced** configuration radio button option.

10. Using the available drop-down list, add the **basic** authentication
    as the first step and MePIN authentication as the second step and
    click **Update** to save the changes.  
    ![](attachments/48283197/48221108.png) 

You have now added and configured the service provider.

### Configuring User Claim

1.  On the **Main** tab in the Management Console, click **List** under
    **Users and Roles**.  
2.  Click **Users**. This link is only visible to users with the Admin
    role.
3.  From the list of users that appear in the resulting page, identify
    the user whose attributes you want to modify and click **User
    Profile**.
4.  In the **Main** menu, click **Add** under **Claims**.
5.  Click [Add New
    Claim](http://docs.wso2.com/identity-server/Adding+Claim+Mapping).
6.  Select the **Dialect** from the drop down provided and enter the
    required information.
7.  Add the user claim <http://wso2.org/claims/identity/mepinid> as
    following under ' http://wso2.org/claims' . This claim is mandatory
    for mepin authentication.  
    ![](attachments/48283197/61053762.png)   
8.  Add the user claim
    [http://wso2.org/claims/identity/mepin\_disabled](http://wso2.org/claims/identity/emailotp_disabled)
    as following under ' http://wso2.org/claims' .  
      
    ![](attachments/48283197/61053763.png) 

### Testing the sample

1.  To test the sample, go to the following URL:
    `            http://<TOMCAT_HOST>:<TOMCAT_PORT>/                         travelocity.com/index.jsp                       `
    E.g: [http://localhost:8080/travelocity.com  
    ](http://localhost:8080/travelocity.com)

2.  Click the link to log in with SAML from WSO2 Identity Server.

    ![](attachments/48283197/48220894.png) 

3.  The basic authentication page appears. Use your username and
    password to log in.  
    ![](attachments/48283197/57007838.png)
4.  I f you are enrolling for the first time, then you are directed to
    MePIN authentication page as shown below.  
    ![](attachments/48283197/57007836.png)
5.  Once you hit the Link MePIN button, you will be shown a MePIN login
    dialogue. Enter there your app’s nickname and get a random access
    code. Enter or scan the given access code to your app and finally
    confirm the linking.  
    ![](attachments/48283197/57007837.png)
6.  If the linking succeeds, you will be taken to the home page of the
    travelocity.com app. After that, your MePIN app has been linked to
    the service and can be used for secure login.  
    ![](attachments/48283197/57007839.png) 
7.  If you are already linked, you will be directed to MePIN
    authentication page like below. You need to click "Login with
    MePIN".  
    ![](attachments/48283197/57007840.png)  
8.  Once you confirmed the login through your app, you will be taken to
    the home page of the travelocity.com app.
    -   For the confirmation policy - swipe you will be prompted to
        confirm as follows  
        ![](attachments/48283197/48220946.png) 
    -   For the confirmation policy - tap you will be prompted to
        confirm as follows  
        ![](attachments/48283197/51252037.png) 

-   -   For the confirmation policy - pin you will be prompted to
        confirm as follows  
        ![](attachments/48283197/51252038.png) 
    -   For the confirmation policy - fingerprint you will be prompted
        to confirm as follows  
        ![](attachments/48283197/51252039.png) 

  
