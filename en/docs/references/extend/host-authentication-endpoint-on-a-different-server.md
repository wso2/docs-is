# Host Authentication Endpoint on a Different Server

The authentication endpoint contains the authentication URLs used in authentication flow. You can use the default authenticationendpoint webapp that is hosted on WSO2 Identity Server itself, or choose to host it on a separate server. You may want to host it separately for the purpose of having custom theming and branding. 

This section describes how you can host the authentication endpoint on a different server outside WSO2 Identity Server  (e.g., in a different Tomcat Server).

## Set up the servers

First, let's set up the Tomcat server to host the authentication portal in your WSO2 Identity Server.

1.  Download and install WSO2 IS and apache-tomcat into your local machine.

    !!! info
        Let’s consider the WSO2 IS installation as `<IS_HOME>` and the Tomcat installation as `<TOMCAT_HOME>`.

2.  Download the [setup-authentication-endpoint.sh](https://github.com/wso2/samples-is/blob/master/host-endpoints-externally/setup-authentication-endpoint.sh) script add it to the folder containing the WSO2 IS distribution.

3.  Execute the following command to run the script:

    ```bash
    sh setup-authentication-endpoint.sh
    ```

4.  When prompted, enter the path to the `webapps` folder of your Tomcat server.

This extracts the authentication portal web app from the given WSO2 IS distribution and adds it to the `webapps` folder of your Tomcat server with the libraries needed for it to be externally hosted.

## Configure the Tomcat server

Now, let's configure the Tomcat server.

1.  Open the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml` file, uncomment the following section, and update the configurations with the WSO2 IS URLs.

    ```xml
    <context-param>
    <param-name>IdentityManagementEndpointContextURL</param-name>
    <param-value>https://localhost:9443/accountrecoveryendpoint</param-value>
    </context-param>
    <context-param>
    <param-name>AccountRecoveryRESTEndpointURL</param-name>
    <param-value>/t/tenant-domain/api/identity/user/v1.0/</param-value>
    </context-param>
    <context-param>
        <param-name>EnableRecoveryEndpoint</param-name>
        <param-value>true</param-value>
    </context-param>
    <context-param>
        <param-name>EnableSelfSignUpEndpoint</param-name>
        <param-value>true</param-value>
    </context-param>
    <!-- *************** End of Account Recovery Endpoint Context URL Configuration ********************** -->
    <!-- *************** Identity Server Endpoint URL Configuration ********************** -->
    <context-param>
        <param-name>IdentityServerEndpointContextURL</param-name>
        <param-value>https://localhost:9443</param-value>
    </context-param>
    ```

2.  Open the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file and configure the Identity Server origin URL as follows:
    
    ```xml
    identity.server.origin=https://localhost:9443
    ```

3.  Open the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties` file and uncomment the following line:

    ```xml
    identity.server.service.contextURL=https://localhost:9443
    ```
            
4.  Configure the keystores.

    !!! info
        The relevant certificates should be added to the corresponding keystores to properly run the authentication portal. In this tutorial, we are hosting the portal in a local server, therefore, let's use the same keystore and truststore that is in the WSO2 IS server for this portal.

    1.  Import the public certificate of WSO2 IS to the `javaca certs` (or web-server's truststore) of the JVM where the authentication endpoint is running.

        ``` bash
        keytool -export -keystore $IS_HOME/repository/resources/security/wso2carbon.jks -alias wso2carbon -file wso2carbon.cer
        keytool -import -alias wso2carbon -keystore  $WEB_APP_TRUSTSTORE -file wso2carbon.cer
        ```

    2.  Import the public certificate of the web server’s keystore to the Identity Server truststore.

        ``` bash
        keytool -export -keystore $WEB_APP_KEYSTORE -alias wso2carbon -file webserver.cer
        keytool -import -alias <alias> -keystore  $IS_HOME/repository/resources/security/client-trustore.jks -file webserver.cer
        ```

5.  Open the `<TOMCAT_HOME>/conf/server.xml` file and enable the HTTPS connector on the 8443 port.

    ```xml
    <Connector 
        port="8443"
        protocol="org.apache.coyote.http11.Http11NioProtocol"
        maxThreads="150"
        SSLEnabled="true"
        scheme="https"
        secure="true"
        clientAuth="want"
        sslProtocol="TLS"
        sslEnabledProtocols="TLSv1,TLSv1.1,TLSv1.2"
        keystoreFile="$IS_HOME/repository/resources/security/wso2carbon.jks"
        keystorePass="wso2carbon"
        truststoreFile="$IS_HOME/repository/resources/security/client-truststore.jks" 
        truststorePass="wso2carbon"
    />
    ```

    !!! note
        For this sample, we configured the same keystore and truststore in
        WSO2 IS as the keystore and truststore in Tomcat. In an actual
        environment, you may create a new keystore and truststore for tomcat
        and point to it. When using separate keystores and truststores, you
        need to import tomcat keystore’s public cert in to: `<IS_HOME>/repository/resources/security/client-truststore.jks` and, public cert of `<IS_HOME>/repository/resources/security/wso2carbon.jks` into tomcat’s truststore.


6.  Open the `<TOMCAT_HOME>/bin/catalina.sh` and add the following `JAVA\_OPTS`:

    !!! Info
        Be sure to replace `$IS_HOME` with the correct path where the WSO2 IS resides to point to the files inside the security folder.

    ``` xml
    JAVA_OPTS="$JAVA_OPTS --Djavax.net.ssl.keyStore=$IS_HOME/repository/resources/security/wso2carbon.jks -Djavax.net.ssl.keyStorePassword=wso2carbon"
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$IS_HOME/repository/resources/security/client-truststore.jks -Djavax.net.ssl.trustStorePassword=wso2carbon"
    ```

7.  Go to the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file and change the configs 
    pointing to the correct location inside the `$IS_HOME/repository/resources/security` folder.

    ``` xml
    client.keyStore=./repository/resources/security/wso2carbon.jks
    client.trustStore=./repository/resources/security/client-truststore.jks
    ```

## Start the servers

Start both WSO2 IS and Tomcat servers and access `https://<IS_HOST>:<IS_PORT>/myaccount`. You will now see that the authentication is redirected to the external URL.
