# Session Management with Playground

This topic documents instructions on how to test the OpenID Connect
session management feature with the WSO2 Playground sample application
as the Relying Party (RP) with WSO2 Identity Server as the OpenID
Connect Provider (OP). See [Configuring OpenID Connect Single
Logout](https://docs.wso2.com/display/IS530/Configuring+OpenID+Connect+Single+Logout)
for more information.

Relying Party (RP) and OpenID Provider (OP) definitions in this context
is as follows,

**Relying Parties (RPs)** - OAuth 2.0 Clients using OpenID Connect

**OpenID Providers (OPs)** - OAuth 2.0 Authentication Servers
implementing OpenID Connect

### Prerequisites

1.  In order to test the OpenID Connect session management feature, you
    need to have a relying party (RP) implementation. You can use either
    of the following options for this:  
    -   The example pseudo-code for the RP iframe provided in the
        official specification.
    -   The WSO2 Identity Server Playground sample application. Expand
        the section below to set up.

        ![](images/icons/grey_arrow_down.png){.expand-control-image}
        Setting up the sample

        **Setting Up the Sample Webapp**

        To obtain and configure the Playground sample, follow the steps
        below.
        1.  You can check out the repository of the OAuth 2.0 sample
            from GitHub. Follow the instructions
            [here](https://docs.wso2.com/display/IS580/Downloading+a+Sample)
            to checkout the folder. We refer
            `                    <SAMPLE_HOME>                   ` as
            the modules/samples folder inside the folder where the
            product-is repository is checked out.

        2.  Open a terminal window and add the following entry to the
            `                    /etc/hosts                   ` file of
            your machine to configure the hostname.

            Why is this step needed?

            Some browsers do not allow you to create cookies for a naked
            hostname, such as
            `                     localhost                    ` .
            Cookies are required when working with SSO . Therefore, to
            ensure that the SSO capabilities work as expected in this
            tutorial, you need to configure the
            `                     etc/host                    ` file as
            explained in this step.

            The `                     etc/host                    ` file
            is a read-only file. Therefore, you won't be able to edit it
            by opening the file via a text editor. To avoid this, edit
            the file using the terminal commands.  
            For example, use the following command if you are working on
            a Mac/Linux environment.

            ``` java
            sudo nano /etc/hosts
            ```

            ``` bash
                        127.0.0.1      wso2is.local
            ```

        3.  Navigate to
            `                    <SAMPLE_HOME>/oauth2/playground2                   `
            directory via the terminal and build the sample using the
            following command. You must have Apache Maven installed to
            do this (see [Installation
            Prerequisites](https://docs.wso2.com/display/IS580/Installation+Prerequisites)
            for the appropriate version to use).

            ``` java
                        mvn clean install
            ```

        4.  After successfully building the sample, a .
            `                    war                   ` file named
            **playground2** can be found inside the
            `                    <SAMPLE_HOME>/oauth2/playground2/target                   `
            folder. Deploy this sample web app on a web container, such
            as Apache Tomcat server.

            !!! note
            
                        Since this sample is written based on Servlet 3.0 it needs
                        to be deployed on Tomcat 7.x.
            

            Use the following steps to deploy the web app in the web
            container:

            1.  Stop the Apache Tomcat server if it is already running.
            2.  Copy the
                `                     playground2.war                    `
                file to the
                `                     <TOMCAT_HOME>/webapps                    `
                folder.
            3.  Start the Apache Tomcat server.

        5.  Make sure to update
            `                    param-value                   `
            parameter in the
            `                    WEB-INF/web.xml                   `
            file with the server URL of the Identity Server if
            required.  
            Make sure to enter the port the application is running on,
            in the URL. If you have started the Identity Server with a
            port off set, then the respective port needs to be
            configured here.

            ``` java
            <init-param>
                 <description>serverUrl</description>
                 <param-name>serverUrl</param-name>
                 <param-value>https://localhost:9443/services/</param-value>
            </init-param>
            ```

            Note that localhost is the server that hosts WSO2 Identity
            Server and 9443 is the default SSL port of it. In order to
            access the admin services you should have the values in step
            5 and 6. Since playground application is accessing the admin
            service OAuth2TokenValidationService, you should have the
            correct serverUrl,username and password as described in step
            5 and 6.

        6.  Update
            **`                     param-value                    `**
            parameter with credentials of an admin user if required.

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
            `                    http://wso2is.local:8080/playground2/                   `  
            By default Tomcat runs on port 8080. If you have configured
            it to run on a different port make sure to update the URL
            and access the playground application.  
            You are directed to the landing page of the sample
            application. Click on **Import Photos** and the following
            page appears.  
            ![]( ../assets/img/103329944/103329945.png){width="750"
            height="410"}

        !!! note
                Are you getting the error that is given below?
        
                **Error**
        
                ``` java
                        javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
                ```
        
                The sample applications do not have a keystore in them.
                Therefore, after changing the tomcat hostname you might get this
                error because the public key of the WSO2 Identity Server does
                not exist in the Java certificate store. For more information on
                the steps you need to follow to overcome the error, see
                [FAQ](https://docs.wso2.com/display/IS530/FAQ#FAQ-WhydoIgetthejavax.net.ssl.SSLHandshakeExceptionwhenrunningthesamples?)
                .
        

2.  Deploy two relying party applications. To do this, make a copy of
    the playground2.war file that was generated when you set up the
    sample webapp, and rename it as " **playground3.war** ".

    Navigate to the following URLs to check both were deployed properly.
    You will be able to see the following screen.

    -   `             http://wso2is.local:8080/playground2/            `
    -   `                           http://wso2is.local:8080/playground3/                          /            `

    ![]( ../assets/img/103329986/103330000.png) 

### Registering the relying party applications

1.  Start the IS server and log into the management console.
2.  [Add a new service
    provider](https://docs.wso2.com/display/IS530/Adding+and+Configuring+a+Service+Provider#AddingandConfiguringaServiceProvider-ConfiguringaServiceProvider-Addingaserviceprovider)
    named "playground2" and click **Register**.  
    ![]( ../assets/img/103329986/103329999.png) 
3.  Expand the **Inbound Authentication Configuration** section and then
    the **OAuth/OpenID Connect Configuration** and click
    **Configure.**  
    For more information, see [Configuring OAuth2-OpenID
    Connect](https://docs.wso2.com/display/IS530/Configuring+OAuth2-OpenID+Connect+Single-Sign-On)
    .
4.  Expand the **Local & Outbound Authentication Configuration** section
    and select **Use tenant domain in local subject identifier** to sign
    the ID token with the user's tenant domain.

    ![]( ../assets/img/103329986/103329988.png) 

    !!! note
    
        **Alternatively,** to sign the ID token with the service provider's
        tenant domain, open the `           identity.xml          ` file
        found in the
        `           <IS_HOME>/conf/repository/identity          ` folder and
        set the following property to true.
    
        ``` java
        <!-- Sign the ID Token with Service Provider Tenant Private Key-->
        <SignJWTWithSPKey>true</SignJWTWithSPKey>
        ```
    

5.  Enter
    `                       http://wso2is.local:8080/playground2/oauth2client                     `
    as the callback URL and click **Add**.  
    ![]( ../assets/img/103329986/103329987.png) 

    !!! note
    
        At this point, you will see the **client key** and **client secret**
        .
    
        ![]( ../assets/img/103329986/103329989.png) 
    
        Note these values as you will need them later in this process.
    

6.  Repeat steps 1- 4 and register a service provider named as
    "playground3".

### Testing session management with WSO2 Playground

1.  Access the following URL **:**
    `          http://wso2is.local:8080/playground2/         ` and click
    on **Import Photos**.
2.  Enter the following values and click **Authorize**.  
    -   **Authorization Grant Type:** Authorization Code (with this
        sample you can only test OIDC for the Authorization Code flow)
    -   **Client Id:** Enter the client ID (OAuth Client Key under
        Registering the relying Application, step 4) of the registered
        playground2 application
    -   **Scope:** `            openid           `
    -   **Callback URL:**
        `            http://wso2is.local:8080/playground2/oauth2client           `
    -   **Authorize Endpoint:**
        `            https://localhost:9443/oauth2/authorize           `
    -   **Logout Endpoint:**
        `            https://localhost:9443/oidc/logout           `
    -   **Session Iframe Endpoint:**
        `            https://localhost:9443/oidc/checksession?client_id=<clientID of playground2 application>           `

    ![]( ../assets/img/103329986/103329990.png) 
3.  Log in with the user credentials and click **Approve Always** at the
    consent page.

    In order to enable single logout (SLO) you must use the **Approve
    Always** option. If this is not done, the passive request will not
    work, and without passive requests, the SLO protocol will not work. 
    Do this to avoid errors during execution.

    ![]( ../assets/img/103329986/103329996.png) 

4.  Once it is successfully authenticated, the OpenIDConnect
    Provider(OP) will redirect back to the client application with the
    authorization code and the session state. You can see this in the
    logs of the console, as seen below.
5.  Enter the following values and click **Get Access Token** to receive
    the ID token and access token.  
    -   **Callback URL:**
        `                         http://wso2is.local:8080/playground2/oauth2client                       `
    -   **Access Token Endpoint:**
        `                         https://localhost:9443/oauth2/token                       `
    -   **Client Secret:** Enter the client secret of playground2
        application

    ![]( ../assets/img/103329986/103329991.png){height="250"}
6.  You will receive the access token. You can also enter the **UserInfo
    Endpoint** as
    `                     https://localhost:9443/oauth2/userinfo?schema=openid                   `
    to use the received access token to obtain user claims if needed.  
    ![]( ../assets/img/103329986/103329994.png) 
7.  Access the following URL on a separate window of the browser, and
    click on **Import Photos:**
    `          http://wso2is.local:8080/playground3/         `
8.  Repeat steps 7-9 to invoke the **playground3** application.

9.  Once you receive the authorization code for the playground3 app,
    open the browser console of the playground2 app. You will see that
    the RP iframe of playground2 has initiated a passive authentication
    request as the session state changed. Since the response has been
    received, the app will update it’s session state value and keep
    polling the OP iframe again.

    ![]( ../assets/img/103329986/103329993.png) 

10. Go back to the browser window of the playground3 app, and click
    **Logout**. Click **Approve** when prompted for consent.
11. Go back to the browser window of the playground2 app. You will see
    that the home page has loaded. If you check the console logs, you
    will note that the the playground2 app’s RP iframe has initiated a
    passive authentication request and has received an error since the
    end user session has ended. This means the app has successfully
    handled this as a single logout scenario.  
    ![]( ../assets/img/103329986/103329992.png) 

How to keep the user session live in Identity Server

In WSO2 Identity Server, you can use an authorization endpoint to
increase the session idle time.

To do this, add an iframe to the service provider application which
sends a `          prompt=none         ` call to the OAuth2
authorization endpoint after each iteration of n minutes and refreshes
the user session at the server end. A sample iframe is shown below.

``` xml
<iframe id="refresh_iframe" src="#" style="width:0;height:0;border:0; border:none;"></iframe><script>setInterval(function(){document.getElementById('refresh_iframe').src
="https://localhost:9443/oauth2/authorize prompt=none&scope=openid&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fplayground2%2Fprompt-none callback.jsp&client_id=7x72byIYC40dlCuu6bovOTdK2MMa";},300000);</script>
```

!!! tip
    
    Redirect to a logout URL after RP-initiated logout
    
    You can specify a logout URL so that the application redirects to a
    particular page after the RP sends the OpenID Connect logout request.
    For more information on how to configure the redirect logout, see
    [OpenID Connect Logout URL
    Redirection](../../learn/openid-connectLogout_URL_Redirection).
    
