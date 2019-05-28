# Configuring TOTP Authenticator

This topic provides instructions on how to configure the TOTP
authenticator and the Identity Server to integrate using a sample app.
See the following sections for more information.

TOTP Authenticator is supported with WSO2 Identity Server versions
5.1.0, 5.2.0, 5.3.0, 5.4.0, 5.4.1, 5.5.0 and 5.6.0.

-   [Configuring user
    claims](#ConfiguringTOTPAuthenticator-ConfiguringUserClaimsConfiguringuserclaims)
-   [Deploying TOTP
    artifacts](#ConfiguringTOTPAuthenticator-DeployingTOTPartifactsDeployingTOTPartifacts)
-   [Deploying travelocity.com sample
    app](#ConfiguringTOTPAuthenticator-Deployingtravelocity.comsampleappDeployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringTOTPAuthenticator-ConfiguringtheidentityproviderConfiguringtheidentityprovider)
-   [Configuring the Identity Server to send
    email](#ConfiguringTOTPAuthenticator-ConfiguringIdentityServertosendemailConfiguringtheIdentityServertosendemail)
-   [Configuring the service
    provider](#ConfiguringTOTPAuthenticator-ConfiguringtheserviceproviderConfiguringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringTOTPAuthenticator-TestingthesampleTestingthesample)
-   [Refreshing the secret
    key](#ConfiguringTOTPAuthenticator-RefreshingtheSecretKeyRefreshingthesecretkey)

### Configuring user claims

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and
    [run it](https://docs.wso2.com/identity-server/Running+the+Product)
    .
2.  Sign in to the [Management
    Console](https://docs.wso2.com/identity-server/Getting+Started+with+the+Management+Console)
    by entering your username and password.
3.  In the **Main** menu, click **Add** under **Claims** .
4.  Click [Add Local
    Claim](https://docs.wso2.com/identity-server/Adding+Claim+Mapping) .
    This displays the **Add Local Claim** screen.

    !!! note
    
        Note
    
        If you are using WSO2 Identity Server version 5.1.0 or 5.2.0, click
        **Add New Claim.** This displays the **Add New Claim** screen. On
        the **Add New Claim** screen, select
        `                                       http://wso2.org/claims                                    `
        as the **Dialect.**
    

5.  Specify the following claim details in the appropriate fields:

    |                      |                                           |
    |----------------------|-------------------------------------------|
    | Claim URI            | http://wso2.org/claims/identity/secretkey |
    | Display Name         | Secret Key                                |
    | Description          | Claim to store the secret key             |
    | Mapped Attribute     | State or province name                    |
    | Supported by Default | selected                                  |

    ![](attachments/50502913/75106756.png){width="751" height="485"}

### Deploying TOTP artifacts

!!! note
    
    Note
    
    If you are using WSO2 Identity Server 5.6.0, you can skip steps 1 to 3
    in the following section because
    `          totpauthenticationendpoint.war         ` and
    `          org.wso2.carbon.extension.identity.authenticator.totp.connector-x.x.x.jar         `
    files are already packaged in the appropriate directories in the product
    distribution.
    

1.  Download the required TOTP artifacts from [WSO2
    Store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22totp%22)
    .

    !!! note
    
        If you are using WSO2 Identity Server version 5.5.0 or older, follow
        the steps below to manually add the
        `            commons-codec_1.4.0.wso2v1.jar           ` file to WSO2
        Identity Server:
    
        1.  Create a directory with the name of the patch (for example,
            patch001) in the
            `             <IS_HOME>/repository/components/patches            `
            directory.
        2.  Copy the
            `             commons-codec_1.4.0.wso2v1.jar            ` file
            from the downloaded `             other_artifacts            `
            directory to the directory that you created in the above step.
    

2.  Place the `           totpauthenticationendpoint.war          ` file
    into the
    `           <IS_HOME>/repository/deployment/server/webapps          `
    directory.
3.  Place the
    `            org.wso2.carbon.extension.identity.authenticator.totp.connector-x.x.x.jar           `
    into the
    `            <IS_HOME>/repository/components/dropins           `
    directory.

    !!! note
    
        If you want to upgrade the TOTP Authenticator that is available in
        your existing WSO2 Identity Server distribution, see the [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

4.  Add the following configuration
    `            <IS_HOME>/repository/conf/identity/application-authentication.xml           `
    file under the \< `            AuthenticatorConfigs           ` \>
    section.

    ``` xml
    <AuthenticatorConfig name="totp" enabled="true">
                <Parameter name="encodingMethod">Base32</Parameter>
                <Parameter name="timeStepSize">30</Parameter>
                <Parameter name="windowSize">3</Parameter>
                <Parameter name="authenticationMandatory">true</Parameter>
                <Parameter name="enrolUserInAuthenticationFlow">true</Parameter>
                <Parameter name="usecase">local</Parameter>
                <Parameter name="secondaryUserstore">primary</Parameter>
                <Parameter name="TOTPAuthenticationEndpointURL">totpauthenticationendpoint/totp.jsp</Parameter>
                <Parameter name="TOTPAuthenticationEndpointErrorPage">totpauthenticationendpoint/totpError.jsp</Parameter>
                <Parameter name="TOTPAuthenticationEndpointEnableTOTPPage">totpauthenticationendpoint/enableTOTP.jsp</Parameter>
                <Parameter name="Issuer">WSO2</Parameter>
                <Parameter name="UseCommonIssuer">true</Parameter>
            </AuthenticatorConfig>
    ```

    The following table describes the definition of the parameters and
    the various values you can configure for federated authentication.

    <table style="width:87%;">
    <colgroup>
    <col style="width: 28%" />
    <col style="width: 58%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>                usecase               </code></td>
    <td><div class="content-wrapper">
    <p>This field can take one of the following values: <code>                                     local                                   </code> , <code>                                     association                                   </code> , <code>                                     userAttribute                                   </code> , <code>                                     subjectUri                                   </code> . If you do not specify any <code>                  usecase                 </code> , the default value is <code>                  local                 </code> .</p>
    !!! tip
        <p>If you have chosen <code>                  userAttribute                 </code> as the <code>                  usecase,                 </code> add the following parmeter to specify the user attribute.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;<span class="bu">Parameter</span> name=<span class="st">&quot;userAttribute&quot;</span>&gt;http:<span class="co">//wso2.org/foursquare/claims/email&lt;/Parameter&gt;</span></a></code></pre></div>
        </div>
        </div>
    </div></td>
    </tr>
    <tr class="even">
    <td><pre><code>encodingMethod</code></pre></td>
    <td><p>The encoding method which is used to generate the TOTP.</p></td>
    </tr>
    <tr class="odd">
    <td><pre><code>authenticationMandatory</code></pre></td>
    <td>If this value is true, the TOTP authentication will be enforced as a second step.</td>
    </tr>
    <tr class="even">
    <td><pre><code>timeStepSize</code></pre></td>
    <td><p>The time step size, which is used to validate the TOTP.</p></td>
    </tr>
    <tr class="odd">
    <td><pre><code>windowSize</code></pre></td>
    <td>The window size, which is used to validate the TOTP.</td>
    </tr>
    <tr class="even">
    <td><pre><code>enrolUserInAuthenticationFlow</code></pre></td>
    <td>If this value is true, it will ask the user to enable the TOTP authenticator in the authentication flow.</td>
    </tr>
    <tr class="odd">
    <td><pre><code>secondaryUserstore</code></pre></td>
    <td><p>The user store configuration is maintained per tenant as comma separated values. For example, <code>                 &lt;Parameter name="secondaryUserstore"&gt;jdbc, abc, xyz&lt;/Parameter&gt;.                </code></p></td>
    </tr>
    <tr class="even">
    <td><pre><code>TOTPAuthenticationEndpointURL</code></pre></td>
    <td><div class="content-wrapper">
    <p>This is the endpoint of the UI which is used to gather the TOTP.</p>
    </div></td>
    </tr>
    <tr class="odd">
    <td><pre><code>TOTPAuthenticationEndpointErrorPage</code></pre></td>
    <td>This is the endpoint of the error page.</td>
    </tr>
    <tr class="even">
    <td><pre><code>TOTPAuthenticationEndpointEnableTOTPPage</code></pre></td>
    <td>This is the endpoint of the TOTPauthenticator enrollment page.</td>
    </tr>
    <tr class="odd">
    <td><pre><code>Issuer</code></pre></td>
    <td>This is the issuer name which will be shown the Mobile Application. If not configured, tenant domain will be shown.</td>
    </tr>
    <tr class="even">
    <td><pre><code>UseCommonIssuer</code></pre></td>
    <td>If true, the issuer name defined in application-authentication.xml will be used as the issuer for all the tenants.</td>
    </tr>
    </tbody>
    </table>

5.  Place the authenticator parameters as above into the
    `            <IS_HOME>/repository/conf/identity/application-authentication.xml           `
    file.  An admin can activate the feature to enable the TOTP
    authenticator in the authentication flow by changing the
    `            enrolUserInAuthenticationFlow           ` values (
    `            true           ` or `            false           ` ).

    1.  If you specify that the user can enable TOTP in the
        authentication flow (
        `             <Parameter name="enrolUserInAuthenticationFlow">true</Parameter>            `
        ) and the TOTP is not enabled to the user's profile, you will be
        asked to enable TOTP in the in the authentication flow. If you
        don't enable it at this stage, the TOTP error page appears.
    2.  If you specify that the user can't enable TOTP in the
        authentication flow (
        `             <Parameter name="enrolUserInAuthenticationFlow">false</Parameter>            `
        ) and the TOTP is not enabled to the user's profile , the TOTP
        error page appears .

6.  Replace the
    `           <IS_HOME>/repository/deployment/server/jaggeryapps/portal/gadgets/user_profile          `
    file with the corresponding user-profile provided under
    `           other_artifacts/user_profiles/          ` .  

    -   Use 5.1.0/user\_profile if you are using WSO2 Identity
        Server 5.1.0.  
    -   Use 5.2.0/user\_profile if you are using WSO2 Identity
        Server 5.2.0.  
    -   Use 5.2.0/wum\_update/user\_profile if you are using WSO2
        Identity Server 5.2.0 wum updated pack.  
    -   Use 5.3.0/user\_profile if you are using WSO2 Identity
        Server 5.3.0.

    !!! note
    
        This step must be done since the user\_profile that is shipped with
        the WSO2 Identity Server does not support TOTP out-of-the-box. Due
        to some changes in the Identity Server framework for each product
        release version, a different user profile is required for different
        versions. However, if you are using WSO2 Identity Server 5.4.0
        upwards, then you do not need to replace the user\_profile since
        WSO2 Identity Server has corresponding user\_profile required
        out-of-the-box.
    

    Comment the `             <module ref="addressing"/>            `
    module from the
    `             <IS_HOME>/repository/conf/axis2/axis2.xml            `
    file.

7.  If you use the secondary user store, enter all the user store values
    for the particular tenant as comma separated values. Make this
    configuration change in the
    `            <IS_HOME>/repository/conf/identity/application-authentication.xml           `
    file under the `            AuthenticatorConfigs           ` section
    . For example,
    `            <Parameter name="secondaryUserstore"> jdbc, abc, xyz</Parameter>           `
    .

The user store configuration is maintained per tenant:

-   If you use a **super tenant,** put all the above parameter values
    (mentioned in step 4) into the
    `            <IS_HOME>/repository/conf/identity/application-authentication.xml           `
    file under the `            AuthenticatorConfigs           `
    section.

<!-- -->

-   If you use a **tenant** , upload the same XML file (
    `            application-authentication.xml           ` ) into a
    specific registry location (
    `            /_system/governance/totp)           ` . Create the
    collection named `            totp           ` , add the resource
    and upload the
    `            application-authentication.xml           ` file into
    the registry) . While doing the authentication, first it checks
    whether there is an XML file uploaded to the registry. If that is
    so, it reads it from the registry but does not take the local file.
    If there is no file in the registry, then it only takes the property
    values from the local file. This is how the user store configuration
    is maintained per tenant. You can use the registry or local file to
    get the property values.

###  Deploying travelocity.com sample app

The next step is to [deploy the sample app](_Deploying_the_Sample_App_)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by configuring resident identity provider and service provider.

### Configuring the identity provider

Now you have to configure WSO2 Identity Server.

1.  [Restart](https://docs.wso2.com/identity-server/Running+the+Product)
    WSO2 Identity Server.
2.  Log in to the [management
    console](https://docs.wso2.com/identity-server/Getting+Started+with+the+Management+Console)
    as an administrator.
3.  Login to the [end user
    dashboard](https://docs.wso2.com/identity-server/Using+the+End+User+Dashboard)
    and go to **My Profile** by clicking **View details** .  
    ![](attachments/50502913/50680097.png){width="700"}
4.  Update your email address (this email address is used to send the
    token).
5.  To enable TOTP, select the **Enable TOTP** checkbox.  
    ![](attachments/50502913/68687830.png){width="800"}
6.  If you want to use the Google Authenticator Application to generate
    the one-time passwords (tokens), click on **Scan QR Code** to scan
    the QR-Code using the Google Authenticator mobile app.  

You have now configured TOTP.

Obtaining the QR code without using the end user dashboard

If you need to obtain the QR code without using the end user dashboard,
you can call an Admin Service that does this. The following is the Admin
Service used to obtain the QR code.

``` java
https://localhost:9443/services/TOTPAdminService?wsdl
```

The QR code URL can be retrieved using the
`           initTOTP          ` method in the
`           TOTPAdminService          ` .

The following is a sample cURL command that invokes the
TOTPAdminService.

``` java
curl -i -X POST -H 'Content-Type: application/x-www-form-urlencoded' -H 'Authorization:Basic YWRtaW46YWRtaW4=' https://localhost:9443/services/TOTPAdminService/initTOTP -k -d 'username=testuser@carbon.super'
```

The following is a sample response that is obtained.

``` java
<ns:initTOTPResponse xmlns:ns="http://services.totp.authenticator.application.identity.carbon.wso2.org"><ns:return>b3RwYXV0aDovL3RvdHAvY2FyYm9uLnN1cGVyOmR1c2hhbmk/c2VjcmV0PUJGR0RFUllPU1ZSR0s3&#xd;
TE0maXNzdWVyPWNhcmJvbi5zdXBlcg==&#xd;
</ns:return></ns:initTOTPResponse>
```

The Secret Key can be retrieved using the retrieveSecretKeymethod in the
`           TOTPAdminService          ` .

The following is a sample cURL command that invokes the
TOTPAdminService.

``` java
curl -i -X POST -H 'Content-Type: application/x-www-form-urlencoded'  -H 'Authorization:Basic YWRtaW46YWRtaW4=' https://localhost:9443/services/TOTPAdminService/retrieveSecretKey -k -d 'username=testuser@carbon.super'
```

The following is a sample response that is obtained.

``` java
<ns:retrieveSecretKeyResponse xmlns:ns="http://services.totp.authenticator.application.identity.carbon.wso2.org"><ns:return>4AAC2HEG7COGHQYI</ns:return></ns:retrieveSecretKeyResponse>
```

###  Configuring the Identity Server to send email

1.  Configure the
    `            <IS_HOME>/repository/conf/axis2/axis2.xml           `
    to send an email notification. Enable the
    `            mailto           ` transport sender by adding the
    following configuration. Replace your sender email credentials (
    `            USER_NAME           ` ,
    `            PASSWORD           ` , and
    `            SENDER'S_MAIL           ` ) in the configuration.

    **SMTP Transport Sender**

    ``` xml
        <transportSender name="mailto" class="org.apache.axis2.transport.mail.MailTransportSender">
            <parameter name="mail.smtp.host">smtp.gmail.com</parameter>
            <parameter name="mail.smtp.port">587</parameter>
            <parameter name="mail.smtp.starttls.enable">true</parameter>
            <parameter name="mail.smtp.auth">true</parameter>
            <parameter name="mail.smtp.user">{USER_NAME}</parameter>
            <parameter name="mail.smtp.password">{PASSWORD}</parameter>
            <parameter name="mail.smtp.from">{SENDER'S_MAIL}</parameter>
        </transportSender>
    ```

2.  Add the email template that must be sent to the user when they
    generate the token in the
    `            <IS_HOME>/repository/conf/email/email-admin-config.xml           `
    file as follows.  

    **Email Template**

    ``` xml
        <configuration type="totp" display="TOTP" locale="en_US">
            <targetEpr></targetEpr>
            <subject>WSO2 Carbon - Time-Based One Time Password</subject>
            <body>
        Hi {{ user.claim.givenname}},
        Please use the token {totp-token} as the password for your login.
            </body>
            <footer>
        Best Regards,
        WSO2 Identity Server Team
        http://www.wso2.com
            </footer>
            <redirectPath></redirectPath>
        </configuration>  
    ```

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console.

2.  In the **Service Providers** section under the **Main** tab, click
    **Add** .

3.  Since you are using travelocityas the sample, enter travelocity.com
    in the **Service Provider Name** text box.

4.  Enable " **SaaS Application** " if you want to open up the
    application for all the users of all the tenants and click
    **Register.**

5.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

6.  Now set the configuration as follows:

    1.  **Issuer** : travelocity.com

    2.  **Assertion Consumer URL** :
        http://localhost:8080/travelocity.com/home.jsp

7.  Selectthefollowingcheck-boxes:
    1.  **Enable Response Signing** .

    2.  **Enable Single Logout** .

    3.  **Enable Attribute Profile** .

    4.  **Include Attributes in the Response Always** .  
        ![](attachments/50502913/50680092.png){width="700"}

8.  Click **Update** to save the changes. Now you are sent back to the
    **Service Providers** page.

9.  Go to the **Local and Outbound Authentication Configuration**
    section.

10. Select the **Advanced** configuration radio button option.

11. Add basic or federated authentication as the first step and TOTP
    authentication as the second step and click **Update** to save the
    changes.The first step may be local authenticator (basic) or a
    federated authenticator (e.g., Facebook, Twitter, etc.)

    1.  Select the local authenticator in the first step then select the
        local authenticator (e.g., basic) from the drop-down.

    2.  Select the federated authenticator in the first step, then
        select federated authenticator (e.g., Twitter) from the
        drop-down.

    3.  Configure the following parameter in the
        `              <IS_HOME>/repository/conf/identity/application-authentication.xml             `
        file under the
        `              <AuthenticatorConfig name="totp" enabled="true">             `
        section.

        ``` xml
                <Parameter name="usecase">userAttribute</Parameter> 
        ```

        The following table includes the definition of the parameter and
        the various values you can choose.

        <table>
        <thead>
        <tr class="header">
        <th>Value</th>
        <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd">
        <td><code>                  usecase                 </code></td>
        <td><p>This field can take one of the following values: <code>                                       local                                     </code> , <code>                                       association                                     </code> , <code>                                       userAttribute                                     </code> , and <code>                                       subjectUri                                     </code> . If you do not specify any usecase, the default value is <code>                   local                  </code> .</p></td>
        </tr>
        <tr class="even">
        <td><code>                  local                 </code></td>
        <td><p>This is based on the federated username. This is the default. You must set the federated username in the local user store. Basically, the federated username must be the same as the local username.</p></td>
        </tr>
        <tr class="odd">
        <td><code>                  association                 </code></td>
        <td><p>Federated username must be associated with the local account in advance in the Dashboard. So local username is retrieved from the association.To associate the user, Login to the <a href="https://docs.wso2.com/identity-server/Using+the+End+User+Dashboard">end user dashboard</a> and go to <strong>Associated Account</strong> by clicking <strong>View details</strong> .</p></td>
        </tr>
        <tr class="even">
        <td><code>                  userAttribute                 </code></td>
        <td><div class="content-wrapper">
        <p>The name of the federated authenticator's user attribute. That is, the local username which is contained in a federated user's attribute. When using this, add the following parameter under the <code>                    &lt;AuthenticatorConfig name="                    totp                    " enabled="true"&gt;                   </code> section in the <code>                    &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                   </code> file and put the value (e.g., email, screen_name, id, etc.).</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;userAttribute&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a></code></pre></div>
        </div>
        </div>
        <p>If you use OpenID Connect supported authenticators such as LinkedIn, Foursquare, etc., or in the case of multiple social login options as the first step and TOTP as second step, you need to add similar configuration for the specific authenticator in the <code>                    &lt;IS_HOME&gt;/repository/conf/identity/application-authentication.xml                   </code> file under the &lt; <code>                    AuthenticatorConfigs                   </code> &gt; section as follows (the following shows the configuration for Foursquare, LinkedIn and Facebook authenticator respectively).</p>
        <p>Inside the <code>                    AuthenticatorConfig                   </code> (i.e., Foursquare), add the specific <code>                    userAttribute                   </code> with a prefix of the (current step) authenticator name (i.e.,totp-userAttribute).</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb2-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;Foursquare&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
        <a class="sourceLine" id="cb2-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;totp-userAttribute&quot;</span><span class="kw">&gt;</span>http://wso2.org/foursquare/claims/email<span class="kw">&lt;/Parameter&gt;</span></a>
        <a class="sourceLine" id="cb2-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
        </div>
        </div>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb3-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;LinkedIn&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
        <a class="sourceLine" id="cb3-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;totp-userAttribute&quot;</span><span class="kw">&gt;</span>http://wso2.org/linkedin/claims/emailAddress<span class="kw">&lt;/Parameter&gt;</span></a>
        <a class="sourceLine" id="cb3-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
        </div>
        </div>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb4" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb4-1" title="1"><span class="kw">&lt;AuthenticatorConfig</span><span class="ot"> name=</span><span class="st">&quot;FacebookAuthenticator&quot;</span><span class="ot"> enabled=</span><span class="st">&quot;true&quot;</span><span class="kw">&gt;</span></a>
        <a class="sourceLine" id="cb4-2" title="2">    <span class="kw">&lt;Parameter</span><span class="ot"> name=</span><span class="st">&quot;totp-userAttribute&quot;</span><span class="kw">&gt;</span>email<span class="kw">&lt;/Parameter&gt;</span></a>
        <a class="sourceLine" id="cb4-3" title="3"><span class="kw">&lt;/AuthenticatorConfig&gt;</span></a></code></pre></div>
        </div>
        </div>
        <p>Likewise, you can add the AuthenticatorConfig for Amazon, Google, Twitter and Instagram with relevant values.</p>
        </div></td>
        </tr>
        <tr class="odd">
        <td><code>                  subjectUri                 </code></td>
        <td><p>When configuring the federated authenticator, select the attribute in the subject identifier under the service provider section in UI, this is used as the username of the TOTP authenticator.</p></td>
        </tr>
        </tbody>
        </table>

        The configuration in the
        `              <IS_HOME>/repository/conf/identity/application-authentication.xml             `
        file under the `              AuthenticatorConfigs             `
        section will look like the following.

        **Parameter Values**

        ``` xml
                <AuthenticatorConfig name="totp" enabled="true">
                    <Parameter name="encodingMethod">Base32</Parameter>
                    <Parameter name="timeStepSize">30</Parameter>
                    <Parameter name="windowSize">3</Parameter>
                    <Parameter name="authenticationMandatory">true</Parameter>
                    <Parameter name="enrolUserInAuthenticationFlow">true</Parameter>
                    <Parameter name="usecase">userAttribute</Parameter>
                    <Parameter name="userAttribute">http://wso2.org/foursquare/claims/email</Parameter>
                    <Parameter name="secondaryUserstore">primary</Parameter>
                    <Parameter name="TOTPAuthenticationEndpointURL">https://localhost:9443/totpauthenticationendpoint/totp.jsp</Parameter>
                    <Parameter name="TOTPAuthenticationEndpointErrorPage">https://localhost:9443/totpauthenticationendpoint/totpError.jsp</Parameter>
                    <Parameter name="TOTPAuthenticationEndpointEnableTOTPPage">https://localhost:9443/totpauthenticationendpoint/enableTOTP.jsp</Parameter>
                </AuthenticatorConfig>
        ```

!!! tip
    
    **Tip** : This is done to configure multi-factor authentication. See
    [Multi-factor
    Authentication](https://docs.wso2.com/identity-server/Multi-factor+Authentication+using+FIDO)
    for more information.
    

You have now added and configured the service provider.

### Testing the sample

1.  To test the sample, go to the following URL:
    `            http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp.           `
    For example, this looks like
    [http://localhost:8080/travelocity.com.  
    ](http://localhost:8080/travelocity.com)

2.  Click the link to log in with SAML from the WSO2 Identity Server.  
    ![](attachments/50502913/50680094.png){width="700"}

3.  The basic authentication page is visible. Use your username and
    password to log in.  
    ![](attachments/50502913/57737748.png)
4.  If the TOTP is not enabled toin the user's profile and the user is
    allowed to enable the TOTP in the authentication flow, this page
    will appear. You can scan either continue or cancel.  
    ![](attachments/50502913/68688464.png){width="303"}
5.  If you want to enrolthe user, click on the link to show the QR code.
    Scan the displayed QR code using the mobile application and
    continue. ![](attachments/50502913/68688462.png){width="303"}
6.  You are redirected to the TOTP authentication page. Enter the
    verification code from your Google Authenticator Mobile Application
    to authenticate. Alternatively, you can generate the verification
    code by clicking on **Get a Verification Code** " and use the code
    that is sent to your email address.  
    ![](attachments/50502913/68687856.png){width="307"}
7.  If your verification is successful, you are taken to the home page
    of the travelocity.com app.

    ![](attachments/50502913/50680172.png){width="700"}

### Refreshing the secret key

You can refresh the secret key by selecting the **Refresh Secret Key**
checkbox in the dashboard. However, you must re-scan the QR code to sync
the new secret key with your Google Authenticator mobile app.

![](attachments/50502913/57737750.png)
