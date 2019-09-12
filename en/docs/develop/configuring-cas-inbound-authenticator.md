# Configuring CAS Inbound Authenticator

This topic provides instructions on how to configure the CAS inbound
authenticator and the WSO2 Identity Server and demonstrates this
integration using a sample app (cas-client-webapp).

This procedure was tested using Java 8. The current version of the CAS
Inbound authenticator is not supported with a tenant user. CAS Version
1.0.2 Inbound Authenticator is supported by WSO2 Identity Server
versions 5.2.0 and CAS Version 2.0.1 Inbound Authenticator is supported
by WSO2 Identity Server versions 5.3.0.

!!! note
    
    If you are using CAS authenticator version 2.0.2, go to the [v2.0.2
    tag](https://github.com/wso2-extensions/identity-inbound-auth-cas/tree/v2.0.2/docs)
    of the identity-outbound-auth-cas GitHub repository to view the
    documentation
    

  

See the following sections for more information on configuring this
integration.

-   [Prerequisites](#ConfiguringCASInboundAuthenticator-Prerequisites)
-   [Configuring
    cas-client-webapp](#ConfiguringCASInboundAuthenticator-Configuringcas-client-webapp)
-   [Deploying CAS
    artifacts](#ConfiguringCASInboundAuthenticator-DeployingCASartifacts)
-   [Configuring the service
    provider](#ConfiguringCASInboundAuthenticator-Configuringtheserviceprovider)
-   [Testing the
    sample](#ConfiguringCASInboundAuthenticator-TestingthesampleTestingthesample)

### **Prerequisites**

-   Download WSO2 Identity Server from the [WSO2 Identity Server product
    page](http://wso2.com/products/identity-server) and install it by
    following the instructions in the [Installing the
    Product](https://docs.wso2.com/display/IS520/Installing+the+Product)
    topic.

-   Download the sample CAS client webapp (cas-client-webapp.war) from
    <https://github.com/wso2-docs/IS/tree/master/IS-Connector-Artifacts/CAS>

-   Download the CAS Version 1.0.2 Inbound Authenticator JAR from [the
    store for this
    authenticator](https://store.wso2.com/store/assets/isconnector/details/593aac68-3139-425c-b9ca-f66a65a0917a)
    and CAS Version 2.0.1 Inbound Authenticator JAR from [the store for
    this
    authenticator](https://store.wso2.com/store/assets/isconnector/details/593aac68-3139-425c-b9ca-f66a65a0917a)
    .

    !!! note
    
        If you want to upgrade the CAS Inbound Authenticator (.jar) in your
        existing IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

-   The CAS login URL is required if you want to use it in your own app.
    It must be: `          https://<IS_IP>:9443/         `
    `          identity/cas/login         `

### **Configuring cas-client-webapp**

1.  **Generate Keystore** to enable 'https' request in your web
    container (e.g., Tomcat).
    1.  Use the following "keytool" command inside the
        "web-container/bin" (e.g.,
        `             <TOMCAT_HOME/bin>            ` ) directory to
        create a keystore with the self-signed certificate. During the
        keystore creation process, you need to assign a password and
        fill in the certificate’s details.  
        `             keytool -genkey -alias localhost -keyalg RSA -keystore "PATH_TO_CREATE_KEYSTORE/KEYSTORE_NAME".            `

        !!! tip
        
                **Tip** : Here `             localhost            ` is the same
                name as the machine's hostname.
        

    2.  Add the following connector in the
        `             server.xml            ` file in your web-container
        (e.g., `             <TOMCAT_HOME>/conf/server.xml            `
        )

        ``` xml
        <Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
                maxThreads="150" scheme="https" secure="true"
                clientAuth="false" sslProtocol="TLS"
                keystoreFile="PATH_TO_CREATED_KEYSTORE/KEYSTORE_NAME"
                keystorePass="KEYSTORE_PASSWORD" />
        ```

        !!! tip
        
                **Tip** : KEYSTORE\_PASSWORD is the password you assigned to
                your keystore via the "keytool" command.
        

2.  To establish the trust between cas-client-webapp and CAS-Server (
    WSO2 IS ), take the following steps:
    1.  Go to the
        `            <IS_HOME>/repository/resources/security/           `
        directory and execute the following command to create a
        certificate file for the wso2carbon JKS.  
        `            keytool -export -alias wso2carbon -file wso2.crt -keystore wso2carbon.jks -storepass wso2carbon           `
    2.  Inside the above directory use the following command to import
        the CAS server certificate ( `            wso2.crt           ` )
        into the system truststore of the CAS client. You will be
        prompted for the keystore password, which is by default changeit
        .  
        `            keytool -import -alias wso2carbon -file wso2.crt -keystore PATH-TO-jre/lib/security/cacerts           `

### **Deploying CAS artifacts**

1.  P lace the `          cas-client-webapp.war         ` file into the
    webapps directory of the web-container (e.g.,
    `          <TOMCAT_HOME>/webapps         ` ).
2.  Place the
    `          org.wso2.carbon.identity.sso.cas-1.0.2.jar         ` file
    (for Identity Server 5.3.0, use the
    `          cas-2.0.1.jar         ` file instead as described in the
    note below) into the
    `          <IS_HOME>/repository/components/dropins         `
    directory and restart the Identity Server.

!!! note
    
    **If you are using WSO2 Identity Server 5.3.0, make sure to take the WUM
    updated product since this feature needs some core fixes done to the
    product.  
    **
    

  

### Configuring the service provider

Now, you are ready to configure WSO2 Identity Server by adding a new
service provider .

1.  [Run WSO2 Identity
    Server](https://docs.wso2.com/display/IS530/Running+the+Product).
2.  Log in to the [management
    console](../../setup/getting-started-with-the-management-console)
    as an administrator.
3.  In the **Identity** section under the **Main** tab, click **Add**
    under **Service Providers**.

4.  Enter **cas-client-webapp** in the **Service Provider Name** text
    box and click **Register**.  
    ![](attachments/57005726/57008598.png) 

5.  In the **Inbound Authentication Configuration** section, click **CAS
    Configuration**.

6.  Configure the **Service Url** :
    [https://localhost:8443/cas-client-webapp/](https://localhost:8080/cas-sample-java-webapp/)  
    ![](attachments/57005726/68710333.png) 

    Service URL refers to the URL of the application that the client is
    trying to access.

      

7.  Go to **Claim Configuration** and click **Define Custom Claim
    Dialect** to add the requested claims. (This is required to show
    requested claims as user attributes in the cas-client-webapp;
    otherwise, no attributes will be shown.) Add the **Service Provider
    Claim** name that corresponds to the **Local Claim** URI and mark it
    as **Requested Claim**.  
    ![](attachments/57005726/72418344.png) 

8.  Click **Update** to save the changes. Now you have configured the
    service provider.  

### Testing the sample

1.  To test the sample, navigate to
    `          https://[server-address]/cas-client-webapp/         ` in
    your browser (i.e., go to the following URL:
    <https://localhost:8443/cas-client-webapp/> ).
2.  The basic authentication page appears. Use your IS username and
    password.  
    ![](attachments/57005726/57737891.png)   
3.  If you have successfully logged in, you will see the following CAS
    Home page of cas-client-webapp with the authenticated user and user
    attributes.  
    ![](attachments/57005726/57739209.png)   
      

**  
**
