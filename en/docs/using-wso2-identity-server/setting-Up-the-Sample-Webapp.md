# Setting Up the Sample Webapp

**Configuring OAuth for WSO2 Playground**

Before you begin, you must first configure OAuth for a service provider
to use this sample.

1.  Add a new service provider.
    1.  Sign in. Enter your username and password to log on to the
        [Management
        Console](../../setup/getting-started-with-the-management-console) .
    2.  Navigate to the **Main** menu to access the **Identity** menu.
        Click **Add** under **Service Providers**.
    3.  Fill in the **Service Provider Name** and provide a brief
        **Description** of the service provider. Only **Service Provider
        Name** is a required field.
    4.  Click **Register** to add the new service provider.
2.  Expand the **Inbound Authentication Configuration** section and
    [configure OAuth/OpenID
    Connect.](_Configuring_OAuth2-OpenID_Connect_Single-Sign-On_)

    !!! note You can use the following **Callback URL** when configuring
        OAuth for WSO2 Playground:
        `                         http://wso2is.local:8080/playground2/oauth2client                       `

To obtain and configure the Playground sample, follow the steps below.

1.  You can check out the repository of the OAuth 2.0 sample from
    GitHub. Follow the instructions [here](../../using-wso2-identity-server/downloading-a-sample) to
    checkout the folder. We refer `           <SAMPLE_HOME>          `
    as the modules/samples folder inside the folder where the product-is
    repository is checked out.

2.  Open a terminal window and add the following entry to the
    `           /etc/hosts          ` file of your machine to configure
    the hostname.

    Why is this step needed?

    Some browsers do not allow you to create cookies for a naked
    hostname, such as `            localhost           ` . Cookies are
    required when working with SSO . Therefore, to ensure that the SSO
    capabilities work as expected in this tutorial, you need to
    configure the `            etc/host           ` file as explained in
    this step.

    The `            etc/host           ` file is a read-only file.
    Therefore, you won't be able to edit it by opening the file via a
    text editor. To avoid this, edit the file using the terminal
    commands.  
    For example, use the following command if you are working on a
    Mac/Linux environment.

    ``` java
    sudo nano /etc/hosts
    ```

    ``` bash
        127.0.0.1       wso2is.local
    ```

3.  Navigate to `           <SAMPLE_HOME>/oauth2/playground2          `
    directory via the terminal and build the sample using the following
    command. You must have Apache Maven installed to do this (see
    [Installation Prerequisites](_Installation_Prerequisites_) for the
    appropriate version to use).

    ``` java
        mvn clean install
    ```

4.  After successfully building the sample, a .
    `           war          ` file named **playground2** can be found
    inside the
    `           <SAMPLE_HOME>/oauth2/playground2/target          `
    folder. Deploy this sample web app on a web container, such as
    Apache Tomcat server.

    !!! note
    
        Since this sample is written based on Servlet 3.0 it needs to be
        deployed on Tomcat 7.x.
    

    Use the following steps to deploy the web app in the web container:

    1.  Stop the Apache Tomcat server if it is already running.
    2.  Copy the `            playground2.war           ` file to the
        `            <TOMCAT_HOME>/webapps           ` folder.
    3.  Start the Apache Tomcat server.

5.  Make sure to update `           param-value          ` parameter in
    the `           WEB-INF/web.xml          ` file with the server URL
    of the Identity Server if required.  
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

6.  Update **`            param-value           `** parameter with
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
    `           http://wso2is.local:8080/playground2/          `  
    By default Tomcat runs on port 8080. If you have configured it to
    run on a different port make sure to update the URL and access the
    playground application.  
    You are directed to the landing page of the sample application.
    Click on **Import Photos** and the following page appears.  
    ![](attachments/103329944/103329945.png){width="750" height="410"}

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

-   [Authorization Code Grant](_Try_Authorization_Code_Grant_)
-   [Client Credentials Grant](_Try_Client_Credentials_Grant_)
-   [Implicit Grant](_Try_Implicit_Grant_)
-   [Try Password/Resource Owner Grant](_Try_Password_Grant_)
