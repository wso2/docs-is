# Configuring RSA SecurID Authenticator

The RSA SecurID authenticator allows you to authenticate users using RSA
SecurID through WSO2 Identity Server. RSA SecurID is a two-factor
authentication mechanism is based on the time and self-generated tokens.
This allows the user to log into a system with software tokens and
hardware tokens like keyfobs. The authentication codes at fixed interval
using a built-in clock and the card’s factory-encoded random key.

This page provides instructions on how to configure the RSA SecurID
authenticator and the WSO2 Identity Server using a sample app to
demonstrate authentication. You can find more information in the
following sections.

### Configuring the RSA Authentication Manager

RSA Authentication Manager 8.1 supports a VMware virtual appliance,
Hyper-V virtual appliance, and the hardware appliance. The same
functionality is provided by each type of appliance. See [the setup and
configuration guide for RSA Authentication Manager
8.1](https://www.emc.com/collateral/15-min-guide/h12284-am8-setup-config-guide.pdf)
for more information on setting this up.

Once you complete all the required configurations you can access the
following consoles using the credentials that you provided in the
configuration.

-   Security Console: https://\<Fully Qualified Domain Name\>/sc
-   Operational Console: https://\<Fully Qualified Domain Name\>/oc
-   Self Service Console: https://\<Fully Qualified Domain Name\>/ssc

### Configuring the NTP Server on RSA Authentication Manager operational console

The NTP server is responsible for time. Set up your NTP server for your
region and make sure the time setting is accurate. To set the time,
follow the steps below.

1.  Log in to the RSA Authentication Manager Operational Console
    (https://\<Fully Qualified Domain Name\>/oc) with your operation
    console credentials. This was set when you performed the RSA
    Authentication Manager configurations.
2.  Navigate to the **Administration** menu and select **Date and Time**
    .
3.  Set up your regional NTP server as shown in the following screen,
    but do this for your region.  
    ![](../../assets/img/52528427/56987871.png) 

  

### Adding a user to the internal database of RSA Authentication Manager

To enroll the user into the RSA Authentication Manager, you must log
into the security console (https://\<Fully Qualified Domain Name\>/oc)
with your security console credentials. See the following video for more
information on how to do this.

[Video Guide: Add user to the Internal
Database](https://youtu.be/zYG7REyAdmY?list=PL69kuTXA1IasAousLJVVK1qItFJVALlJc)

### Importing token records

Token records are unique records used to identify each token in RSA. To
activate a token record you must import the token record. See the
following video, which guides you through the steps on how to import the
token records to the RSA Authentication Manager Security Console.

[Video Guide: Import Token
Records](https://youtu.be/zqIRMIxUwXg?list=PL69kuTXA1IasAousLJVVK1qItFJVALlJc)

### Assigning the token to the user

Once the token records are imported and the users are added, you are
able to assign either software tokens or hardware tokens to the users.
See the following video, which guides you through the process of
assigning a token to the registered user.

[Video Guide: Assign Tokens to
Users](https://youtu.be/0TF5Jv5av0o?list=PL69kuTXA1IasAousLJVVK1qItFJVALlJc)

### Self-enrollment of users and setting or resetting the PIN

The RSA Self-service Console provides the option to create/reset the
password for users using their RSA user ID and their tokens. If the
users log in for the first time, they must log in to the RSA
Self-service Console and create a PIN for themselves.

RSA Self-Service Console URL:
https://\<FQDN-of-RSA-Authentication-Manager\>/ssc

### Configuring the RSA custom agent

If you are want to configure an RSA Authentication custom agent, you
must generate the RSA Authentication Manager configuration file. See the
following video for instructions on how to generate the configuration
file.

[Video Guide: Generate the Authentication Manager Configuration
File](https://youtu.be/O09jpBCMwKE?list=PL69kuTXA1IasAousLJVVK1qItFJVALlJc&t=54)  

1.  Once you have generated the Authentication Manager configuration
    file, create a file called rsa.properties and add the following
    configurations to it. You must set the paths of each of the required
    files in this configuration.  
    ``` java
    RSA_AGENT_HOST=<agent host IP> 
    RSA_CONFIG_READ_INTERVAL=600 
    SDCONF_TYPE=FILE 
    SDCONF_LOC=<path/to/server/configuration/file/sdconf.rec> 
    SDSTATUS_TYPE=FILE 
    SDSTATUS_LOC=<path/to/server/status/file/JAStatus.1> 
    SDOPTS_TYPE=FILE 
    SDOPTS_LOC=<path/to/server/opetions/file/sdopts.rec> 
    SDNDSCRT_TYPE=FILE 
    SDNDSCRT_LOC=<path/to/node/secret/file/securid> 
    RSA_LOG_TO_CONSOLE=NO 
    RSA_LOG_TO_FILE=YES 
    RSA_LOG_FILE=<path/to/event/logger/file/rsa_api.log> 
    RSA_LOG_LEVEL=INFO 
    RSA_ENABLE_DEBUG=NO 
    RSA_DEBUG_TO_CONSOLE=YES 
    RSA_DEBUG_TO_FILE=NO 
    RSA_DEBUG_FILE=rsa_api_debug.log 
    RSA_DEBUG_ENTRY=YES 
    RSA_DEBUG_EXIT=YES 
    RSA_DEBUG_FLOW=YES 
    RSA_DEBUG_NORMAL=YES 
    RSA_DEBUG_LOCATION=NO
    ```

2.  Set the file path of the rsa.properties file you created in the
    `           <IS_HOME>/repository/conf/identity/application-authentication.xml          `
    file as follows.

    ``` xml
        <AuthenticatorConfig name="RSASecurId" enabled="true">
            <Parameter name="RSASECURIDAuthenticationEndpointURL">securidauthenticationendpoint/login.jsp</Parameter>
            <Parameter name="RSASECURIDPropertyFile">C:\securidConf\rsa.properties</Parameter>
        </AuthenticatorConfig>
    ```

### Deploying RSA SecurID Authenticator artifacts

The artifacts can be obtained from the store for this authenticator .

1.  P lace the `          securidauthenticationendpoint.war         `
    file into the
    `          <IS_HOME>/repository/deployment/server/webapps         `
    directory.
2.  Place the
    [`            org.wso2.carbon.extension.identity.authenticator.securid.connector-1.0.1.jar           `]
    (https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22rsa%22)
    file into the
    `           <IS_HOME>/repository/components/          `
    `           dropins          ` directory.  

    !!! note
        If you want to upgrade the RSA SecurID Authenticator in your
        existing IS pack, please refer [upgrade
        instructions.](../../develop/upgrading-an-authenticator)
    

3.  Obtain the `          authapi.jar         ` and
    `          cryptoj.jar         ` from RSA or RSA Support, and place
    the .jar files in the
    `          <IS_HOME>/repository/components/lib         ` directory.

### Add a claim mapping for RSA user id

1.  Navigate to the **Identity** section under the **Main** tab of the
    [management
    console](../../setup/getting-started-with-the-management-console)
    and click **Add** under the http://wso2.org/claims claims dialect.
2.  Add a new claim for RSA user id.  
    ![](../../assets/img/52528427/52757012.png) 


### Deploying travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario.

See [deploying travelocity.com sample app](../../develop/deploying-the-sample-app)
for instructions on how to do this.

### Configuring the service provider

The next step is to configure the service provider.

1.  Return to the management console. In the **Service Providers**
    section under the **Main** tab, click **Add**.
2.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register**.
3.  Now set the configuration as follows:  
    ![](../../assets/img/52528427/57004462.png)  
    Do the following configurations.  
    -   **Issuer** : travelocity.com  
    -   **Assertion Consumer URL** :
        <http://localhost:8080/travelocity.com/home.jsp>

      
    Select the following check-boxes:  
    -   **Enable Response Signing**.
    -   **Enable Single Logout**.
    -   **Enable Attribute Profile**.
    -   **Include Attributes in the Response Always**.

4.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.
5.  Go to the **Local and Outbound Authentication Configuration**
    section.
6.  Select the **Advanced** configuration radio button option.
7.  Add the basic authentication as the first step and RSASecurID
    authentication as the second step and click **Update** to save the
    changes.  

### Testing the sample

To test the sample you need to add the RSA user ID in the WSO2 Identity
Server claim.

1.  Go to the following URL:
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/                     travelocity.com/index.jsp                              `
    E.g. <http://localhost:8080/travelocity.com>  
    ![](../../assets/img/49092381/49226489.png) 
2.  Click the link to log in with SAML from WSO2 Identity Server. The
    basic authentication page appears. Use your WSO2 Identity Server
    credentials to log in.  
    ![](../../assets/img/52528427/57004469.png)
3.  If the basic authentication succeeds, you are directed to RSA
    SecurID authentication page.  
    ![](../../assets/img/52528427/57004467.png)
4.  Enter the PIN and TOKEN, where TOKEN is shown in the keyfobs or in
    your mobile device RSA applications.  
    ![](../../assets/img/52528427/52757625.png) 
5.  If the authentication is successful, you are redirected to the home
    page of travelocity.com app  
    ![](../../assets/img/52528427/52757626.png) 