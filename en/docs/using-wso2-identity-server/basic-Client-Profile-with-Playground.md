# Basic Client Profile with Playground

This section demonstrates the WSO2 Identity Server's OpenID Connect
Basic Client Profile implementation with the WSO2 OAuth2 playground
sample.

### Setting up the playground sample

First follow the instructions in the sections below to set up the
playground sample and register it in WSO2 IS. Once you have done so,
complete the user profile by adding user attributes and try out the
scenario.

![](images/icons/grey_arrow_down.png){.expand-control-image} Set up the
WSO2 OAuth2.0 Playground sample

**Configuring OAuth for WSO2 Playground**

Before you begin, you must first configure OAuth for a service provider
to use this sample.

1.  Add a new service provider.
    1.  Sign in. Enter your username and password to log on to the
        [Management
        Console](https://docs.wso2.com/display/IS580/Getting+Started+with+the+Management+Console)
        .
    2.  Navigate to the **Main** menu to access the **Identity** menu.
        Click **Add** under **Service Providers**.
    3.  Fill in the **Service Provider Name** and provide a brief
        **Description** of the service provider. Only **Service Provider
        Name** is a required field.
    4.  Click **Register** to add the new service provider.
2.  Expand the **Inbound Authentication Configuration** section and
    [configure OAuth/OpenID
    Connect.](https://docs.wso2.com/display/IS580/Configuring+OAuth2-OpenID+Connect+Single-Sign-On)

    !!! note You can use the following **Callback URL** when configuring
        OAuth for WSO2 Playground:
        `                               http://wso2is.local:8080/playground2/oauth2client                             `

To obtain and configure the Playground sample, follow the steps below.

1.  You can check out the repository of the OAuth 2.0 sample from
    GitHub. Follow the instructions
    [here](https://docs.wso2.com/display/IS580/Downloading+a+Sample) to
    checkout the folder. We refer
    `              <SAMPLE_HOME>             ` as the modules/samples
    folder inside the folder where the product-is repository is checked
    out.

2.  Open a terminal window and add the following entry to the
    `              /etc/hosts             ` file of your machine to
    configure the hostname.

    Why is this step needed?

    Some browsers do not allow you to create cookies for a naked
    hostname, such as `               localhost              ` . Cookies
    are required when working with SSO . Therefore, to ensure that the
    SSO capabilities work as expected in this tutorial, you need to
    configure the `               etc/host              ` file as
    explained in this step.

    The `               etc/host              ` file is a read-only
    file. Therefore, you won't be able to edit it by opening the file
    via a text editor. To avoid this, edit the file using the terminal
    commands.  
    For example, use the following command if you are working on a
    Mac/Linux environment.

    ``` java
    sudo nano /etc/hosts
    ```

    ``` bash
        127.0.0.1        wso2is.local
    ```

3.  Navigate to
    `              <SAMPLE_HOME>/oauth2/playground2             `
    directory via the terminal and build the sample using the following
    command. You must have Apache Maven installed to do this (see
    [Installation
    Prerequisites](https://docs.wso2.com/display/IS580/Installation+Prerequisites)
    for the appropriate version to use).

    ``` java
        mvn clean install
    ```

4.  After successfully building the sample, a .
    `              war             ` file named **playground2** can be
    found inside the
    `              <SAMPLE_HOME>/oauth2/playground2/target             `
    folder. Deploy this sample web app on a web container, such as
    Apache Tomcat server.

    !!! note
    
        Since this sample is written based on Servlet 3.0 it needs to be
        deployed on Tomcat 7.x.
    

    Use the following steps to deploy the web app in the web container:

    1.  Stop the Apache Tomcat server if it is already running.
    2.  Copy the `               playground2.war              ` file to
        the `               <TOMCAT_HOME>/webapps              ` folder.
    3.  Start the Apache Tomcat server.

5.  Make sure to update `              param-value             `
    parameter in the `              WEB-INF/web.xml             ` file
    with the server URL of the Identity Server if required.  
    Make sure to enter the port the application is running on, in the
    URL. If you have started the Identity Server with a port off set,
    then the respective port needs to be configured here.

    ``` java
    <init-param>
         <description>serverUrl</description>
         <param-name>serverUrl</param-name>
         <param-value>https://localhost:9443/services/</param-value>
    </init-param>
    ```

    Note that localhost is the server that hosts WSO2 Identity Server
    and 9443 is the default SSL port of it. In order to access the admin
    services you should have the values in step 5 and 6. Since
    playground application is accessing the admin service
    OAuth2TokenValidationService, you should have the correct
    serverUrl,username and password as described in step 5 and 6.

6.  Update **`               param-value              `** parameter with
    credentials of an admin user if required.

    ``` java
        <init-param>
             <description>userName</description>
             <param-name>userName</param-name>
             <param-value>admin</param-value>
        </init-param>
        <init-param>
             <description>password</description>
             <param-name>password</param-name>
             <param-value>admin</param-value>
        </init-param>
    ```

7.  Restart Apache Tomcat and access
    `              http://wso2is.local:8080/playground2/             `  
    By default Tomcat runs on port 8080. If you have configured it to
    run on a different port make sure to update the URL and access the
    playground application.  
    You are directed to the landing page of the sample application.
    Click on **Import Photos** and the following page appears.  
    ![]( ../../assets/img/103329944/103329945.png) 

!!! note
    
    Are you getting the error that is given below?
    
    **Error**
    
    ``` java
    javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
    ```
    
    The sample applications do not have a keystore in them. Therefore, after
    changing the tomcat hostname you might get this error because the public
    key of the WSO2 Identity Server does not exist in the Java certificate
    store. For more information on the steps you need to follow to overcome
    the error, see
    [FAQ](https://docs.wso2.com/display/IS530/FAQ#FAQ-WhydoIgetthejavax.net.ssl.SSLHandshakeExceptionwhenrunningthesamples?)
    .
    

This application is used to request access tokens using the four OAuth2
grant types:

-   [Authorization Code
    Grant](https://docs.wso2.com/display/IS580/Try+Authorization+Code+Grant)
-   [Client Credentials
    Grant](https://docs.wso2.com/display/IS580/Try+Client+Credentials+Grant)
-   [Implicit
    Grant](https://docs.wso2.com/display/IS580/Try+Implicit+Grant)
-   [Try Password/Resource Owner
    Grant](https://docs.wso2.com/display/IS580/Try+Password+Grant)

![](images/icons/grey_arrow_down.png){.expand-control-image} Register
the Playground application in WSO2 Identity Server

In order to configure Single-Sign-On (SSO) for OAuth2-OpenID Connect,
you must first [register a service provider for inbound
authentication](_Configuring_Inbound_Authentication_for_a_Service_Provider_)
.

[OAuth 2.0](https://oauth.net/2/) has three main phases. They are;
requesting an Authorization Grant, exchanging the Authorization Grant
for an Access Token and accessing the resources using this Access Token.
[OpenID Connect](http://openid.net/connect/) is another identity layer
on top of OAuth 2.0. OAuth applications can get authentication event
information over the IDToken and can get the extra claims of the
authenticated user from the OpenID Connect UserInfo endpoint.  

To enable OAuth support for your client application, you must first
register your application. Follow the instructions below to add a new
application.  

Let's get started to configure the service provider you created!

1.  Expand the **Inbound Authentication Configuration** section and then
    expand **OAuth/OpenID Connect Configuration.** Click **Configure**.
2.  Fill in the form that appears. For the **Allowed Grant Types** you
    can disable the ones you do not require or wish to block.

    !!! note
    
        The grant type highlighted below is a **custom** grant type. This
        will only appear on the UI if you have [configured the JWT grant
        type](https://docs.wso2.com/display/ISCONNECTORS/Configuring+JWT+Grant+Type)
        . The value specified in the
        `              <GrantTypeName>             ` property of the
        `              identity.xml             ` file when creating the
        custom grant type is the value that will appear on the UI. For more
        information on writing a custom grant type, see [Writing a Custom
        OAuth 2.0 Grant
        Type](https://docs.wso2.com/display/IS580/Writing+a+Custom+OAuth+2.0+Grant+Type)
        .
    

    ![]( ../../assets/img/103330833/112392519.png) 

    When filling out the **New Application** form, the following details
    should be taken into consideration.

    <table style="width:100%;">
    <colgroup>
    <col style="width: 22%" />
    <col style="width: 77%" />
    </colgroup>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Notes</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><strong>OAuth Version</strong></td>
    <td><p>Selecting <strong>OAuth Version</strong> as <strong>1.0a</strong> removes all the configurable <strong>Allowed Grant Types</strong> . This is because this version of OAuth does not support grant types.</p></td>
    </tr>
    <tr class="even">
    <td><div class="content-wrapper">
    <p><strong>Allowed Grant Types</strong></p>
    </div></td>
    <td>The following grant types are used to generate the access token:
    <ul>
    <li><strong>Code</strong> : Entering the username and password required at the service provider will result in a code being generated. This code can be used to obtain the access token. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.1">Authorization Code specification</a> .</li>
    <li><strong>Implicit</strong> : This is similar to the code grant type, but instead of generating a code, this directly provides the access token. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.2">Implicit Grant specification</a> .</li>
    <li><strong>Password</strong> : This authenticates the user using the password provided and the access token is provided. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.3">Resource Owner Password Credentials Grant specification</a> .</li>
    <li><strong>Client Credential</strong> : This is the grant type for the client key and client secret. If these two items are provided correctly by the service provider, the access token is sent. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-4.4">Client Credentials specification.</a></li>
    <li><strong>Refresh Token</strong> : This will enable the user to obtain an access token by using the refresh token once the originally provided access token is used up. For more information on this grant type, see this <a href="https://tools.ietf.org/html/rfc6749#section-1.5">Refresh Token specification</a> .</li>
    <li><strong>SAML2</strong> : This uses SAML assertion to obtain the access token . For more information on this grant type, see this <a href="https://tools.ietf.org/id/draft-ietf-oauth-saml2-bearer-23.txt">SAML2 Bearer specification</a> .</li>
    <li><strong>IWA-NTLM</strong> : This is similar to the password grant type, but it is specific to Microsoft Windows users.</li>
    <li><strong>urn:ietf:params:oauth: grant-type:jwt-bearer</strong> : This is a custom grant type. It uses a JWT token to obtain the access token. For more information about this grant type, see this <a href="https://tools.ietf.org/html/rfc7523">JWT specification</a> .</li>
    </ul></td>
    </tr>
    <tr class="odd">
    <td><strong>Callback Url</strong></td>
    <td><div class="content-wrapper">
    <p>This is the exact location in the service provider's application where an access token would be sent. This is a required field (if the grant type is anything other than 'Code' or 'Implicit') and it is important to configure, as it is imperative that the service provider receives the access token. This is necessary for security purposes to ensure that the token is not compromised.</p>
    <div>
    <p>Configure multiple callback URLs</p>
    <p>From IS 5.2.0 onwards, regex-based consumer URLs are supported when defining the callback URL. This enables you to configure multiple callback URLs for one application by entering a regex pattern as the value for the callback URL field.<br />
    For example, if you have two service providers that use the same application, you can now define a regex pattern which will work for both callback URLs instead of having to configure two different applications for the two service providers. Assume the two callback URLs for your two service providers are as follows:</p>
    <ul>
    <li><code>                                               https://myapp.com/callback                                             </code></li>
    <li><code>                                               https://testapp:8000/callback                                             </code></li>
    </ul>
    <p>To configure the callback URL to work for <strong>both</strong> of these URLs, set it using a regex pattern as follows:<br />
    </p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">regexp=(https:<span class="co">//myapp.com/callback|https://testapp:8000/callback)</span></a></code></pre></div>
    </div>
    </div>
    !!! note
        <p>You must have the prefix ' <strong>regexp=</strong> ' before your regex pattern. To define a normal URL, you can specify the callback URL without this prefix.</p>
    <p>You can also configure a regex pattern that contains dynamic values as seen below.</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">regexp=https:<span class="co">//mchcon.clance.local\?id=(.*)</span></a></code></pre></div>
    </div>
    </div>
    </div>
    <br />

    <p><br />
    </p>
    </div></td>
    </tr>
    <tr class="even">
    <td><strong>PKCE Mandatory</strong></td>
    <td>Select this if you are using the <strong>Code</strong> grant type. PKCE is a recommended security measure used to mitigate a code interception attack. See <a href="https://docs.wso2.com/display/IS580/Mitigating+Authorization+Code+Interception+Attacks">Mitigating Authorization Code Interception Attacks</a> for more information.</td>
    </tr>
    <tr class="odd">
    <td><strong>Support PKCE 'Plain' Transform Algorithm</strong></td>
    <td>Select this if you are using PKCE.</td>
    </tr>
    <tr class="even">
    <td><strong>Allow Authentication without the client secret</strong></td>
    <td>This enables authenticating the client without the <code>                  client secret                 </code> .</td>
    </tr>
    <tr class="odd">
    <td><p><strong>User Access Token Expiry Time, Application Access Token Expiry Time, Refresh Token Expiry Time, Id Token Expiry Time</strong></p>
    <p><strong><br />
    </strong></p></td>
    <td>Set the validity period (in seconds) for User Access Token, Application Access Token, Refresh Token, and Id Token.</td>
    </tr>
    <tr class="even">
    <td><strong>Enable Audience Restriction</strong></td>
    <td><div class="content-wrapper">
    <p>Select this to enable audience restrictions for OAuth applications. If necessary, you can add multiple audiences. To add an audience, specify a required <strong>Audience</strong> value and click <strong>Add</strong> . All audience values that you add would be available in the ID token generated for the corresponding application.</p>
    !!! tip
        <p>Before you add an audience, ensure that the following property is set to true in the <code>                    &lt;IS_HOME&gt;/repository/conf/identity/identity.xml                   </code> file.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb3" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb3-1" title="1">&lt;EnableAudiences&gt;<span class="kw">true</span>&lt;/EnableAudience&gt;</a></code></pre></div>
        </div>
        </div>
    </div></td>
    </tr>
    <tr class="odd">
    <td><strong>Enable Request Object Signature Validation</strong></td>
    <td><p>This is to define whether to only accept signed request objects in an authorization rqeuest or not. For more information, see <a href="https://docs.wso2.com/display/IS580/Enforcing+Signature+Validation+for+Request+Objects">Enforcing Signature Validation for Request Objects</a> .</p></td>
    </tr>
    <tr class="even">
    <td><strong>Enable ID Token Encryption</strong></td>
    <td>This is to define whether to ID token encryption should be enabled or not. For a tutorial on this, see <a href="https://docs.wso2.com/display/IS580/Testing+OIDC+Encrypted+ID+Token+with+IS">Testing OIDC Encrypted ID Token with IS</a> .</td>
    </tr>
    <tr class="odd">
    <td><strong>Enable OIDC Back Channel Logout</strong></td>
    <td>This is to define whether OIDC back channel logout should be enabled or not. For more information, see <a href="https://docs.wso2.com/display/IS580/Configuring+OpenID+Connect+Back-Channel+Logout">Configuring OpenID Connect Back-Channel Logout</a> .</td>
    </tr>
    <tr class="even">
    <td><strong>Scope Validators</strong></td>
    <td>This is to define the scope validation mechanisms. For more information on XACML scope validation, see <a href="https://docs.wso2.com/display/IS580/Validating+the+Scope+of+OAuth+Access+Tokens+using+XACML+Policies">Validating the Scope of OAuth Access Tokens using XACML Policies</a> .</td>
    </tr>
    <tr class="odd">
    <td><strong>Token Issuer</strong></td>
    <td><div class="content-wrapper">
    <p>Select either <strong>JWT</strong> or <strong>Default</strong> as the token issuer for the service provider.</p>
    !!! tip
        <p>Tip</p>
        <ul>
        <li>If you want to enable default token generation for a service provider, select <strong>Default</strong> as the <strong>Token Issuer</strong> . This is the default Token Issuer that is selected when you apply the WUM update.<br />
        When you enable default token generation, the hash value of the token is stored in the ACCESS_TOKEN_HASH column, and the plain text token is stored in the ACCESS_TOKEN column</li>
        <li>If you want to enable JWT token generation for a service provider, select <strong>JWT</strong> as the <strong>Token Issuer</strong> .<br />
        When you enable JWT token generation, the hash value of the JWT is stored in the ACCESS_TOKEN_HASH column, and the full JWT is stored in the ACCESS_TOKEN column.</li>
        </ul>
    </div></td>
    </tr>
    </tbody>
    </table>

3.  Click **Add**. Note that `             client key            ` and
    `             client secret            ` get generated.  
    ![]( ../../assets/img/103330833/103330840.png) 

    -   **OAuth Client Key** - This is the client key of the service
        provider, which will be checked for authentication by the
        Identity Server before providing the access token.
    -   **OAuth Client Secret** - This is the client secret of the
        service provider, which will be checked for authentication by
        the Identity Server before providing the access token. Click the
        **Show** button to view the exact value of this.
    -   **Actions -**
        -   **Edit:** Click to edit the OAuth/OpenID Connect
            Configurations

        -   **Revoke:** Click to revoke (deactivate) the OAuth
            application. This action revokes all tokens issued for this
            application. In order to activate the application, you have
            to regenerate the consumer secret.

        -   **Regenerate Secret:** Click to regenerate the secret key of
            the OAuth application.

        -   **Delete:** Click to delete the OAuth/OpenID Connect
            Configurations.

    !!! tip
    
        The OAuth client key and client secret are stored in plain text. To
        encrypt the client secret, access token and refresh token, do the
        following:
    
        Open the `              identity.xml             ` file found in the
        `              <IS_HOME>/repository/conf/identity             `
        directory and change the
        `              <TokenPersistenceProcessor>             ` property as
        follows:
    
        ``` xml
            <TokenPersistenceProcessor>org.wso2.carbon.identity.oauth.tokenprocessor.EncryptionDecryptionPersistenceProcessor</TokenPersistenceProcessor>
    ```

    After updating the configuration, make sure to restart the server
    for the changes to be applied on WSO2 IS.


**Related Topics**

See [Configuring OpenID Connect Single
Logout](https://docs.wso2.com/display/IS580/Configuring+OpenID+Connect+Single+Logout)
to configure single logout or session management with OpenID Connect.

See [Delegated Access
Control](https://docs.wso2.com/display/IS580/Delegated+Access+Control)
for more information on working with OAuth2/OpenIDConnect. See the
following topics for samples of configuring delegated access control:

-   [OAuth 2.0 with WSO2
    Playground](https://docs.wso2.com/display/IS580/OAuth+2.0+with+WSO2+Playground)
-   [Setting up a SAML2 Bearer Assertion Profile for OAuth
    2.0](https://docs.wso2.com/display/IS580/Setting+up+a+SAML2+Bearer+Assertion+Profile+for+OAuth+2.0)

![](images/icons/grey_arrow_down.png){.expand-control-image} Complete
the user profile

1.  [Create a user](../../using-wso2-identity-server/configuring-users).
2.  Log in as the user you created and go to the
    [dashboard](../../using-wso2-identity-server/using-the-end-user-dashboard).
3.  [Update your
    profile](Configuring-Users_103330327.html#ConfiguringUsers-Updateusers)
    filling the user attributes.

    You can also do this at **Main** \> **List** \> **Users and
    Roles** \> **Users**, then select the user and update the profile.

4.  Click **Update** to save your changes.

------------------------------------------------------------------------

### Try out scenario

1.  Visit the URL
    `                       http://wso2is.local:8080/playground2/oauth2.jsp                     `
    to start the scenario with the sample application.
2.  Enter the following details and click **Authorize**.

    -   **Authorization Grant Type:** Authorization Code
    -   **Client ID:** (the client id received at the application
        registration step in Identity Server)
    -   **Scope:** openid (This scope is a requirement to provide user
        information. Any token without this scope will not be allowed to
        access user information.)
    -   **Callback URL:**
        http://wso2is.local:8080/playground2/oauth2client
    -   **Authorize Endpoint:** https://localhost:9443/oauth2/authorize

    !!! note
    
        **Note:** To try out this scenario with different consent values,
        see step 7.
    

    ![]( ../../assets/img/103330002/103330004.png) 

      

3.  Provide user credentials and sign in with the previously created
    user. **  
    ![]( ../../assets/img/103330002/103330005.png)   
    **
4.  Click **Approve** to provide consent to this action. The screen
    mentions the service provider by name and requests for user consent
    to provide user information to that particular service provider. The
    user can either

    1.  **Deny** to provide information to the service provider.
    2.  **Approve** to provide user profile information to this service
        provider only for this time.
    3.  **Approve Always** to provide approval to share user profile
        information with the service provider even in the future without
        prompting for consent again.

    ![]( ../../assets/img/103330002/103330013.png) 

    !!! tip
    
        **Tip:** After approval is provided, the application receives an
        authorization code issued from WSO2 Identity Server. This
        authorization code can only be used once to get a valid access token
        and has a expiry time that can be configured by editing the
        following property in the
        `            <IS_HOME>/repository/conf/identity/identity.xml           `
        file. The default expiry time is 300 seconds.
    
        ``` xml
            <!-- Default validity period for Authorization Code in seconds -->
                    <AuthorizationCodeDefaultValidityPeriod>300</AuthorizationCodeDefaultValidityPeriod>
    ```


5.  Enter the following details in the form that appears and click **Get
    Access Token**.

    -   **Callback URL:**
        http://wso2is.local:8080/playground2/oauth2client
    -   **Access Token Endpoint:** https://localhost:9443/oauth2/token
    -   **Client Secret:** (client secret received at the application
        registration)

    ![]( ../../assets/img/103330002/103330006.png) 

6.  At this point, the application receives the **Access Token** with
    the id token, which follows the format shown in step 7. Enter the
    UserInfo endpoint of the WSO2 Identity Server, (i.e.,
    `                         https://localhost:9443/oauth2/userinfo?schema=openid                       `
    ), in the form as seen below, to get user information.

    ![]( ../../assets/img/103330002/103330007.png) 

    Since the received access token has the scope
    `            openid           `, the
    `            userinfo           ` endpoint provides the user
    attribute details when the request is made. You receive the
    following response from the Identity Server.

    **Response**

    ``` groovy
    {  
       "scope":"openid",
       "token_type":"Bearer",
       "expires_in":3600,
       "refresh_token":"74d0d7e6d4b3c19484f5135593c2dc88",            "id_token":"eyJhbGciOiJSUzI1NiJ9.eyJhdXRoX3RpbWUiOjE0NTIxNzAxNzYsImV4cCI6MTQ1MjE3Mzc3Niwic3ViIjoidXNlQGNhcmJvbi5zdXBlciIsImF6cCI6IjF5TDFfZnpuekdZdXRYNWdCMDNMNnRYR3lqZ2EiLCJhdF9oYXNoIjoiWWljbDFlNTI5WlhZOE9zVDlvM3ktdyIsImF1ZCI6WyIxeUwxX2Z6bnpHWXV0WDVnQjAzTDZ0WEd5amdhIl0sImlzcyI6Imh0dHBzOlwvXC9sb2NhbGhvc3Q6OTQ0M1wvb2F1dGgyXC90b2tlbiIsImlhdCI6MTQ1MjE3MDE3Nn0.RqAgm0ybe7tQYvQYi7uqEtzWf6wgDv5sJq2UIQRC4OJGjn_fTqftIWerZc7rIMRYXi7jzuHxX_GabUhuj7m1iRzi1wgxbI9yQn825lDVF4Lt9DMUTBfKLk81KIy6uB_ECtyxumoX3372yRgC7R56_L_hAElflgBsclEUwEH9psE",
       "access_token":"f1824ef345f0565ab88a06a51db98d24"
    }
    ```

    The returned ID token carries the user details. It follows the
    following format:
    `            <header>.<body>.<signature>           ` . The decoded
    ID token can be seen below.

    **Decoded ID Token**

    ``` groovy
        {"alg":"RS256"}.
        {  
           "auth_time":1452170176,
           "exp":1452173776,
           "sub":"use@carbon.super",
           "azp":"1yL1_fznzGYutX5gB03L6tXGyjga",
           "at_hash":"Yicl1e529ZXY8OsT9o3y-w",
           "aud":[  
              "1yL1_fznzGYutX5gB03L6tXGyjga"
           ],
           "iss":"https:\/\/localhost:9443\/oauth2\/token",
           "iat":1452170176
        }.<signature value>
         
    ```

    !!! tip
    
        **Tip:** Alternatively, you can get user information by running the
        following cURL command on the terminal.
    
        -   [**cURL Command**](#61e9aad530ab4e2ab06a68418fae8939)
        -   [**Response**](#7440c6f3920f46d8a48409d54e989863)
    
        ``` powershell
            curl -k -H "Authorization: Bearer <Acess_token>" https://localhost:9443/oauth2/userinfo?schema=openid
    ```

    ``` groovy
        {  
           "sub":"admin",
           "email":"admin@wso2.com",
           "website":"https://wso2.com",
           "name":"admin",
           "family_name":"admin",
           "preferred_username":"admin",
           "given_name":"admin",
           "profile":"https://wso2.com",
           "country":"Sri Lanka"
        }
    ```


7.  You can also try out this scenario with different consent values
    {none, login and consent}. To do this, try the following URLs when
    entering the Authorization Endpoint URL in step 2 of the **Try out
    scenario** section.

    <table>
    <thead>
    <tr class="header">
    <th>Authorization Endpoint URL</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td><code>                                                   https://localhost:9443/oauth2/authorize?prompt=none                                                </code></td>
    <td>The Identity Server does not display any authentication or consent user interface pages. An error is returned if an end user is not already authenticated or the client does not have pre-configured consent for the requested claims or if there are any other unfulfilled conditions for processing the request.</td>
    </tr>
    <tr class="even">
    <td><code>                                                   https://localhost:9443/oauth2/authorize?prompt=login                                                </code></td>
    <td>Even if the end user is already authenticated, it will prompt the end user for re-authentication.</td>
    </tr>
    <tr class="odd">
    <td><code>                                                   https://localhost:9443/oauth2/authorize?prompt=consent                                                </code></td>
    <td>Even if the consent is already given, it will prompt the end user for consent again before returning information to the client.</td>
    </tr>
    <tr class="even">
    <td><code>                                                   https://localhost:9443/oauth2/authorize?prompt                                                 =consent login               </code></td>
    <td><div class="content-wrapper">
    <p>The user will be prompted to login as well as for consent when returning information to the client.</p>
    <div>
    <p>From IS 5.2.0 onwards, you can send multiple prompt parameters (e.g., prompt=consent login) in a format similar to this URL.</p>
    </div>
    </div></td>
    </tr>
    </tbody>
    </table>

    !!! note
    
        **Note:** To skip user consent, you can also edit the following
        property in the
        `            <IS_HOME>/repository/conf/identity/identity.xml           `
        file found under the
        `            <OAuth> <OpenIDConnect>           ` tags. To skip user
        consent, set this property to true.
    
        ``` xml
        <SkipUserConsent>false</SkipUserConsent>
        ```
    
        Note that even if this property is set to true so that it will skip
        user consent, if you use an Authorization Endpoint URL that prompts
        user consent (e.g.,
        `                           https://localhost:9443/oauth2/authorize?prompt=consent                         `
        ), it will still prompt consent from the user.
    
