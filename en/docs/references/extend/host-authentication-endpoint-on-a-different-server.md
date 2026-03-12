# Host Authentication Endpoint on a Different Server

The authentication endpoint contains the authentication URLs used in the authentication flow. You can use the default authentication endpoint webapp that is hosted on the WSO2 Identity Server itself or host it on a separate server. You may want to host it separately for the purpose of having custom theming and branding.

The following topics describe how you can host the authentication endpoint on a different server outside the WSO2 Identity Server  (e.g., in a different Tomcat Server).

## Set up the servers

First, let's set up the Tomcat server to host the authentication portal in your WSO2 Identity Server.

1. Download and install WSO2 Identity Server and Apache Tomcat on your local machine.

    !!! info
        Let’s consider the WSO2 Identity Server installation as `<IS_HOME>` and the Tomcat installation as `<TOMCAT_HOME>`.

2.  Download the [setup-authentication-endpoint.sh](https://github.com/wso2/samples-is/blob/master/host-endpoints-externally/setup-authentication-endpoint.sh) script add it to the folder containing the WSO2 IS distribution.

3. Execute the following command to run the script:

    ```bash
    sh setup-authentication-endpoint.sh
    ```

4. When prompted,

    1. First enter the path to your WSO2-IS installation (`<IS_HOME>`)
    2. Then enter the path to your Tomcat server’s webapps folder (`<TOMCAT_HOME>/webapps`)

    !!! note "Copy the `authentication endpoint`"
        When the Tomcat Server runs on a separate VM, we can not copy the `authentication endpoint` directly since the IS is in a different machine. So we need to first copy the authentication endpoint to a local directory using the script and then manually copy it to the Tomcat server VM’s webapps location.

        1. Execute the step 3.
        2. When prompted to enter the path to your WSO2 Identity Server installation, enter it as mentioned in the step 3.
        3. When prompted to enter the path to your Tomcat server’s webapps folder, enter a folder location of your local machine.
        4. After completing the script, the `authentication endpoint` will copy to the given folder location.
        5. Then manually copy the `authentication endpoint` to the Tomcat server VM’s webapps location.

This extracts the authentication portal web app from the given WSO2 Identity Server distribution and adds it to the `webapps` folder of your Tomcat server with the libraries needed for it to be externally hosted.

## Configure the Tomcat server

Now, let's configure the Tomcat server.

1. Open the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml` file, uncomment the following section, and update the configurations with the WSO2 Identity Server URLs.

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
    <context-param>
        <param-name>AuthenticationRESTEndpointURL</param-name>
        <param-value>https://localhost:9443/api/identity/auth/v1.1/</param-value>
    </context-param>
    ```

2. Open the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file and configure the identity server origin URL as follows:
    
    ```xml
    identity.server.origin=https://localhost:9443
    ```

3.  Open the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties` file and uncomment the following line:

    ```xml
    identity.server.service.contextURL=https://localhost:9443
    ```
            
4. Configure the keystores.

    !!! info
        The relevant certificates should be added to the corresponding keystores to properly run the authentication portal. In this tutorial, we are hosting the portal on a local server. Therefore, let's use the same keystore and truststore that is in the WSO2 Identity Server instance for this portal.

    1. Import the public certificate of WSO2 Identity Server to the `javaca certs` (or web-server's truststore) of the JVM where the authentication endpoint is running.

        !!! Info
            Be sure to replace the following placeholders:

            - `$IS_HOME`: The path to your WSO2 Identity Server distribution.
            - `$WEB_APP_TRUSTSTORE`: Go to the **authenticationendpoint** web app deployed in the Tomcat server and get the path to its truststore.

        ``` bash
        keytool -export -keystore $IS_HOME/repository/resources/security/wso2carbon.jks -alias wso2carbon -file wso2carbon.cer
        keytool -import -alias wso2carbon -keystore  $WEB_APP_TRUSTSTORE -file wso2carbon.cer
        ```

    2. Import the public certificate of the web server’s keystore to the WSO2 Identity Server truststore.

        !!! Info
            Be sure to replace the following placeholders:
            
            - `$IS_HOME`: The path to your WSO2 Identity Server distribution.
            - `$WEB_APP_KEYSTORE`: Go to the **authenticationendpoint** web app deployed in the Tomcat server and get the path to its keystore.

        ``` bash
        keytool -export -keystore $WEB_APP_KEYSTORE -alias wso2carbon -file webserver.cer
        keytool -import -alias <alias> -keystore  $IS_HOME/repository/resources/security/client-truststore.jks -file webserver.cer
        ```

5. Open the `<TOMCAT_HOME>/conf/server.xml` file and enable the HTTPS connector on the 8443 port.

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
        keystoreFile=$WEB_APP_KEYSTORE
        keystorePass="wso2carbon"
        truststoreFile=$WEB_APP_TRUSTSTORE 
        truststorePass="wso2carbon"
    />
    ```

    To obtain values for the parameter:
    - $WEB_APP_KEYSTORE: Go to the authenticationendpoint web app deployed in the Tomcat server and get the path to its keystore.
    - $WEB_APP_TRUSTSTORE: Go to the authenticationendpoint web app deployed in the Tomcat server and get the path to its truststore.

6. Open the `<TOMCAT_HOME>/bin/catalina.sh` file and add the following `JAVA_OPTS`:

    !!! Info
        Be sure to replace `$IS_HOME` with the path to your WSO2 Identity Server distribution.

    ``` xml
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.keyStore=$IS_HOME/repository/resources/security/wso2carbon.jks -Djavax.net.ssl.keyStorePassword=wso2carbon"
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$IS_HOME/repository/resources/security/client-truststore.jks -Djavax.net.ssl.trustStorePassword=wso2carbon"
    ```

7. Go to the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file and change the configurations pointing to the correct location inside the `<TOMCAT_HOME>` folder.

    ``` xml
    client.keyStore=$WEB_APP_KEYSTORE
    client.trustStore=$WEB_APP_TRUSTSTORE
    ```

## Integrate the portal with WSO2 Identity Server

To integrate the portal to the WSO2 Identity Server, add the following configs to the `IS_HOME/repository/conf/deployment.toml` file.

- Add authentication endpoint configurations
    ```toml
    [authentication.endpoints]
    login_url="https://localhost:8443/authenticationendpoint/login.do"
    retry_url="https://localhost:8443/authenticationendpoint/retry.do"
    request_missing_claims_url="https://localhost:8443/authenticationendpoint/claims.do"
    ```

- Add application protocol endpoint configurations
    ```toml
    [oauth.endpoints]
    oauth2_consent_page= "https://localhost:8443/authenticationendpoint/oauth2_authz.do"
    oauth2_error_page= "https://localhost:8443/authenticationendpoint/oauth2_error.do"
    oidc_consent_page= "https://localhost:8443/authenticationendpoint/oauth2_consent.do"
    oidc_logout_consent_page= "https://localhost:8443/authenticationendpoint/oauth2_logout_consent.do"
    oidc_logout_page= "https://localhost:8443/authenticationendpoint/oauth2_logout.do"

    [saml.endpoints]
    logout= "https://localhost:8443/authenticationendpoint/samlsso_logout.do"
    notification= "https://localhost:8443/authenticationendpoint/samlsso_notification.do"
    [passive_sts.endpoints]
    retry= "https://localhost:8443/authenticationendpoint/retry.do"
    ```

- Add [CORS]({{base_path}}/deploy/configure-cors/#configuring-cors-during-deployment) configurations
    ```toml
    [cors]
    allow_generic_http_requests = true
    allow_any_origin = false
    allowed_origins = [
        "https://localhost:8443"
    ]
    allow_subdomains = true
    supported_methods = [
        "GET",
        "POST",
        "HEAD",
        "OPTIONS"
    ]
    support_any_header = true
    supported_headers = []
    exposed_headers = []
    supports_credentials = true
    max_age = 3600
    tag_requests = false
    ```

Restart the WSO2 Identity server to apply the changes added to the `deployment.toml` file.

## Start the servers

Start both WSO2 Identity Server and Tomcat servers and access `https://<IS_HOST>:<IS_PORT>/myaccount`. You will now see that the authentication is redirected to the external URL.