# Customize Error Pages

WSO2 Identity Server display errors, exceptions, and HTTP status codes in full detail. These are known as verbose error messages. These error messages contain technical details such as stack traces. There may also disclose other sensitive details. Attackers may fingerprint the server, based on the information disclosed in error messages. Alternatively, attackers may attempt to trigger specific error messages to obtain technical information about the server. You can avoid these situations by configuring the server to display generic, non-detailed error messages in Apache Tomcat.

The pages that should be displayed on a certain throwable exception, error or an HTTP status code are specified in the
`<IS_HOME>repository/conf/tomcat/carbon/WEB-INF/web.xml` file. You can customize those error pages as preferred. For example, if you try to access a resource that is not available in the Carbon server (e.g., https://localhost:9443/carbon/abc), you will see the "Error 404 - Not Found" page (be sure to log in as admin to have access to that URL).

You can customize the above error message by following the instructions given below.

1.  [Download and install Apache Maven](https://maven.apache.org/install.html).

2.  [Create a Maven project using your IDE.](https://maven.apache.org/guides/getting-started/index.html#How_do_I_make_my_first_Maven_project)

3.  Create a directory named "resources" inside the `<PROJECT_HOME>/src/main/` directory, and then create another directory named "web" inside it.

    !!! tip    
        `<PROJECT_HOME>` denotes the top-level
        directory of your Maven project.
    

4.  Create a new HTML error page (e.g. `new_error_404.html` file) as shown below. This contains the customized error page.

    ``` xml
    <html>
        <head>
            <meta http-equiv="content-type" content="text/html; charset=ISO-8859-1">
            <title>404 - Error not found</title>
        </head>
        <body>
            <h1>Sorry, this resource is not found.</h1>
        </body>
    </html>
    ```

5.  Add the `new_error_404.html` file inside the `<PROJECT_HOME>/src/main/resources/web` directory.

6.  Add the following property below the `<version>` element in the `<PROJECT_HOME>/pom.xml` file.

    ``` xml
    <packaging>bundle</packaging>
    ```

7.  Add the following configurations inside the `<plugins>` element in the `<PROJECT_HOME>/pom.xml` file.

    ``` xml
    <plugin>
        <groupId>org.apache.felix</groupId>
        <artifactId>maven-bundle-plugin</artifactId>
        <extensions>true</extensions>
        <configuration>
            <instructions>
                <Bundle-SymbolicName>${project.artifactId}</Bundle-SymbolicName>
                <Bundle-Name>${project.artifactId}</Bundle-Name>
                <Import-Package>
                    org.osgi.framework,
                    org.osgi.service.http,
                    org.wso2.carbon.ui,
                    javax.servlet.*;version="2.4.0",
                    *;resolution:=optional
                </Import-Package>
                <Fragment-Host>org.wso2.carbon.ui</Fragment-Host>
                <Carbon-Component>UIBundle</Carbon-Component>
            </instructions>
        </configuration>
    </plugin>
    ```

8.  Add the following configurations inside the `<dependencies>` element in the `<PROJECT_HOME>/pom.xml` file.

    ``` xml
    <dependency>
        <groupId>org.apache.felix</groupId>
        <artifactId>org.apache.felix.framework</artifactId>
        <version>1.0.3</version>
    </dependency>
    ```

9.  Build the Maven project by executing the following command. 

    ```bash 
    mvn clean install           
    ```

10. Once the project is built, copy the JAR file (from the `<PROJECT_HOME>/target/` directory) to the `<IS_HOME>/repository/components/dropins/`
    directory.

11. Change the following configurations in the `<IS_HOME>/repository/conf/tomcat/carbon/WEB-INF/web.xml` file.

    ``` xml
    <error-page>
        <error-code>404</error-code>
        <location>/carbon/new_error_404.html</location>
    </error-page>
    ```

    !!! tip    
        You need to replicate this configuration, and change the values of the `<error-code>` and `<location>` elements accordingly for each
        new HTML error page you add.
    

12. Restart WSO2 Identity Server.

13. Access the following URL again to test the error page you customized: `https://localhost:9443/carbon/abc`.  
    Be sure to log in as admin to have access to the URL.
    
    You will view the new error page with the following content: "Sorry, this resource is not found."
