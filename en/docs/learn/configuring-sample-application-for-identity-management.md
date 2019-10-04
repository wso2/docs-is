# Configuring Sample Application for Identity Management

This topic lists out the steps required to configure and run the
password recovery sample web application with the WSO2 Identity
Server. This is a sample implementation which uses SOAP services for
identity management.

### Prerequisites

-   Download [WSO2 Identity Server Product](http://wso2.com/products/identity-server/). For instructions, see [Installing the
    Product](../../setup/installing-the-product).
-   Apache Tomcat 6 - To deploy the sample web application.
-   InfoRecoverySample (located in
    `          /is-samples/modules/samples/identity-mgt/info-recovery-sample         `
    folder) - Follow [these instructions](../../learn/downloading-a-sample) to
    check out the samples folder.

### Configuring the sample

1.  Do the following configuration changes to the
    `          <SAMPLE_HOME>/src/main/webapp/WEB-INF/web.xml         `
    file.
    1.  Specify the `             carbonServerUrl            ` as the
        URL of the Identity Server. The following is an example.

        ``` xml
        <context-param>
            <param-name>carbonServerUrl</param-name>
            <param-value>https://localhost:9443/</param-value>
        </context-param>
        ```

    2.  Specify the credentials to access Identity Server with admin
        privileges for `             accessUsername            ` and
        `             accessPassword            ` . The following is an
        example with the default WSO2 Identity Server credentials
        used.  

        ``` xml
        <context-param>
            <param-name>accessUsername</param-name>
            <param-value>admin</param-value>
        </context-param>

        <context-param>
            <param-name>accessPassword</param-name>
            <param-value>admin</param-value>
        </context-param>
        ```

    3.  Specify the trustStore absolute resource path for
        `             trustStorePath            ` . The following
        example specifies the path to wso2carbon.jks of the Identity
        Server.

        ``` xml
        <context-param>
            <param-name>trustStorePath</param-name>
            <param-value>/wso2carbon.jks</param-value>
        </context-param>
        ```

2.  If you are deploying the sample in Apache Tomcat, enable the SSL
    configuration in the
    `           <TOMCAT_HOME>/conf/server.xml          ` file.

    ``` xml
        <Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true" maxThreads="150" scheme="https" secure="true" clientAuth="false" sslProtocol="TLS" keystoreFile="[IS_HOME]/repository/resources/security/wso2carbon.jks" keystorePass="wso2carbon" />
    ```

    \*
    <sup>\[IS\_HOME\]\ should\ be\ replaced\ with\ the\ correct\ installation\ directory\ for\ identity\ server.</sup>

3.  Configure the email confirmation links and relevant attributes in the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file. Configurations that we need to do are changed based
    on our use case. See the following use cases and find the required
    configurations.

    -   **Recovering accounts using notification or secret question** -
        Refer to the [topic on password recovery with
        notification](../../learn/password-recovery) for a sample email template
        and the attributes needed in the
        `             deployment.toml          ` file.

    -   **Self sign-up and account confirmation** - Refer to the topic
        on Self-Registration and Account Confirmation for a sample email
        template and the attributes needed in the
        `             deployment.toml            ` file.

    -   **Creating Users using the Ask Password Option** - Refer to the
        [topic on Creating Users using the Ask Password
        Option](../../learn/creating-users-using-the-ask-password-option) for a
        sample email template and the attributes needed in the
        `            deployment.toml          ` file.

Email conformation link should point to the identity management
application. By default its pointing to the accountrecoveryendpoint
application, if you have a different application please configure that
URL.

``` java
https://localhost:9443/accountrecoveryendpoint/confirmrecovery.do?confirmation={{confirmation-code}}&amp;userstoredomain={{userstore-domain}}&amp;username={{url:user-name}}&amp;tenantdomain={{tenant-domain}}
```

To run the sample app you can build the sample using Apache Maven.

#### Building the sample using Apache Maven

Before building the sample, ensure that you have followed the
instructions in the configuration steps above.

1.  Build the sample using Apache Maven by navigating to the sample's
    location in the command line and running the following command.

    ``` java
    mvn clean install
    ```
    !!! info 
        When building the sample, the Java source code of the project is
        compiled into class files and packaged into .jar files. The
        dependencies listed in the project are located in bins so that
        Tomcat can find and load them. Once the build process is complete, a
        `            targets           ` folder is created that has the .war
        file.

2.  Copy the .war file that is generated to the
    `          <TOMCAT_HOME>/webapps         ` folder.
3.  Start Apache Tomcat.  
      
