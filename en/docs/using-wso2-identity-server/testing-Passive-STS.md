# Testing Passive STS

This topic lists out the steps required to configure and execute testing
of Identity Server's Passive STS.

### Prerequisites

-   WSO2 Identity Server - This can be downloaded from the [WSO2
    Identity Server product
    page](http://wso2.com/products/identity-server/) and installed by
    following the instructions in the [Installing the
    Product](../../setup/installing-the-product) topic.
-   Apache Tomcat 6/7 - To deploy the sample web application. This can
    be downloaded from the [Apache Tomcat
    website](http://tomcat.apache.org/).
-   Passive STS Sample - This can be downloaded from the GitHub
    repository by following the instructions in the [Downloading a
    Sample](../../using-wso2-identity-server/downloading-a-sample) topic.

### Configuring the sample

Do the following configuration changes to the
`         <SAMPLE_HOME>/passive-sts/passive-sts-client/PassiveSTSSampleApp/src/main/webapp/WEB-INF/web.xml        `
file.

1.  Specify `           idpUrl          ` as the URL of Identity
    Server's Passive STS. The following is an example.

    ``` xml
    <init-param>
                <param-name>idpUrl</param-name>
                <param-value>https://localhost:9443/passivests</param-value>
    </init-param> 
    ```

2.  Specify the `           replyURL          ` as the URL of the web
    app. The following specifies
    `           PassiveSTSSampleApp          ` as the web app.

    ``` xml
        <init-param>
                    <param-name>replyUrl</param-name>
                    <param-value>http://localhost:8080/PassiveSTSSampleApp/index.jsp</param-value>
        </init-param>
    ```

3.  Specify the `           realm          ` . This should be a unique
    identifier for the web app as seen in the example below.

    ``` xml
        <init-param>
                    <param-name>realm</param-name>
                    <param-value>PassiveSTSSampleApp</param-value>
        </init-param> 
    ```

4.  For tenant user logins, specify the
    `           tenantDomain          ` .

    ``` xml
        <init-param>
                    <param-name>requestParams</param-name>
                    <param-value>tenantDomain=tenant4.com</param-value>
        </init-param>
    ```

### Configuring Identity Server

1.  [Log in to the Identity Server](_Running_the_Product_) and go to
    **Service Providers\>Add** in the **Main** menu in the [management
    console](../../setup/getting-started-with-the-management-console).
2.  Enter a unique name for the service provider and click **Register.**
    The following form appears.  

    ![]( ../../assets/img/103329901/103329902.png)

3.  Expand the **Inbound Authentication Configuration\>**
    **WS-Federation (Passive) Configuration** section and provide the
    following values. See [Configuring WS-Federation
    (Passive)](Configuring-Inbound-Authentication-for-a-Service-Provider_103329773.html#ConfiguringInboundAuthenticationforaServiceProvider-WS-Federation(Passive))
    for more information.  
      
    -   **Passive STS Realm** - Provide the same realm name given to the
        web app
    -   **Passive STS WReply URL** - Provide the URL of the web app
4.  Click **update.**

### Deploying the sample on Apache Tomcat

1.  Download [Apache Tomcat](http://tomcat.apache.org/) and extract the
    `          .zip         ` file into your directory, if you have not
    already done so.
2.  Build the sample's `           .war          ` file by navigating
    inside the `           <SAMPLE_HOME>          ` directory where the
    `           pom.xml          ` file is located and running the
    following command

    ``` java
        mvn clean install
    ```

3.  Copy the `          PassiveSTSSampleApp.war         ` file located
    in the
    `          <SAMPLE_HOME>/passive-sts/passive-sts-client/PassiveSTSSampleApp/target         `
    directory and paste a copy of it in the
    `          <Tomcat_Home>/webapps         ` directory.
4.  Navigate inside the \[ `          Tomcat_Home/bin]         `
    directory in the command line and run
    `          sh catalina.sh run         ` command to start the server.
5.  On your browser,access the following link:
    1.  -   to get a SAML 1.1 token:
            http://localhost:8080/PassiveSTSSampleApp/index.jsp
        -   to get a SAML 2.0 token:
            http://localhost:8080/PassiveSTSSampleApp?samlv=2-0

6.  Enter user credentials and you will be redirected to the IS Passive
    STS Service.
