# Host Authentication Endpoint on a Different Server

The authentication endpoint contains the authentication URLs used in authentication flow. You can use the default authenticationendpoint webapp that is hosted on WSO2 Identity Server itself, or choose to host it on a separate server. You may want to host it separately for the purpose of having custom theming and branding. 

This section describes how you can host the authentication endpoint on a different server outside WSO2 Identity Server  (e.g., in a different Tomcat
Server).

<!-- ## Move the accountrecoveryendpoint from WSO2IS and host it on a separate web server

This is an additional improvement which enables hosting `accountrecoveryendpoint.war` also on a separate web server.

!!! tip "Before you begin"
    Get a copy of `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint` folder to `<WEBAPP_HOME>/`.
    

1.  Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file. 

    ``` toml
    [identity.auth_framework.endpoint]
    identity_server_service_url="https://$ref{server.hostname}:9443/services"
    ```

2.  Uncomment and change the My Account reference in `<WEBAPP_HOME>/accountrecoveryendpoint/WEB-INF/web.xml`.

    ``` xml
    <context-param>
            <param-name>UserPortalUrl</param-name>
            <param-value>https://localhost:9443/dashboard/index.jag</param-value>
    </context-param>
    ```

3.  Export the following paths.

    ``` 
    export WEB_APP_HOME=/Users/userfoo/<TOMCAT_HOME>/webapps
    export IS_HOME=/Users/userfoo/wso2is-5.6.0
    export WEB_APP_LIB=${WEB_APP_HOME}/accountrecoveryendpoint/WEB-INF/lib/
    ```

    Note: `WEB_APP_HOME` and
    `IS_HOME` paths are given as examples. You may
    have to change them according to your environment.

4.  Copy the following dependencies to  `<WEBAPP_HOME>/accountrecoveryendpoint/WEB-INF/lib`
    
    ``` xml
    - abdera_*.jar 
    - ant_*.jar 
    - axiom_*.jar 
    - axis2_*.jar 
    - bcprov-jdk15on_*.jar 
    - commons-cli_*.jar 
    - commons-collections_*.jar 
    - commons-dbcp_*.jar 
    - commons-fileupload_*.jar 
    - commons-httpclient_*.jar 
    - commons-io_*.jar 
    - commons-lang_*.jar 
    - commons-pool_*.jar 
    - compass_*.jar 
    - encoder_*.jar 
    - com.google.gson_*.jar 
    - hazelcast_*.jar 
    - httpclient_*.jar 
    - httpcore_*.jar 
    - javax.cache.wso2_*.jar 
    - jdbc-pool_*.jar 
    - joda-time_*.jar 
    - json_*.jar 
    - jstl_*.jar 
    - neethi_*.jar 
    - opensaml_*.jar 
    - org.eclipse.equinox.http.helper_*.jar 
    - org.eclipse.osgi_*.jar 
    - org.wso2.carbon.base_*.jar 
    - org.eclipse.osgi_*.jar 
    - org.eclipse.osgi.services_*.jar 
    - org.wso2.carbon.base_*.jar 
    - org.wso2.carbon.core_*.jar 
    - org.wso2.carbon.crypto.api_*.jar 
    - org.wso2.carbon.database.utils_*.jar 
    - org.wso2.carbon.identity.application.common_*.jar 
    - org.wso2.carbon.identity.base_*.jar 
    - org.wso2.carbon.identity.template.mgt_*.jar 
    - org.wso2.carbon.queuing_*.jar 
    - org.wso2.carbon.registry.api_*.jar 
    - org.wso2.carbon.registry.core_*.jar 
    - org.wso2.carbon.securevault_*.jar 
    - org.wso2.carbon.user.api_*.jar 
    - org.wso2.carbon.user.core_*.jar 
    - org.wso2.carbon.utils_*.jar 
    - org.wso2.securevault_*.jar 
    - rampart-core_*.jar 
    - slf4j.api_*.jar 
    - tomcat-catalina-ha_*.jar 
    - tomcat-servlet-api_*.jar 
    - wsdl4j_*.jar 
    - XmlSchema_*.jar 
    - org.wso2.carbon.ui_*.jar 
    - org.wso2.carbon.identity.application.authentication.endpoint.util_*.jar 
    - org.wso2.carbon.identity.core_*.jar 
    - org.wso2.carbon.identity.user.registration.stub_*.jar 
    - org.wso2.carbon.identity.mgt.stub_*.jar 
    - org.wso2.carbon.identity.mgt_*.jar 
    - org.wso2.carbon.identity.mgt.ui_*.jar 
    - org.wso2.carbon.identity.oauth_*.jar 
    - org.wso2.carbon.identity.application.authentication.endpoint.util-*.jar 
    - jettison_*.jar 
    - javax.ws.rs-api-*.jar 
    - cxf-core-*.jar 
    - cxf-rt-frontend-jaxrs-*.jar 
    - cxf-rt-rs-client-*.jar 
    - cxf-rt-rs-extension-providers-*.jar 
    - cxf-rt-rs-extension-search-*.jar 
    - cxf-rt-rs-service-description-*.jar 
    - cxf-rt-transports-http-*.jar 
    - org.wso2.carbon.bootstrap-*.jar 
    - tomcat-juli-*.jar 
    - xercesImpl-*.jar 
    - geronimo-jta_*.jar 
    - stax2-api-*.jar 
    - woodstox-core-asl-*.jar 
    - log4j-*.jar 
    - pax-logging-api-*.jar 
    ```

    !!! note
        Make sure the WebApp container server (of endpoint apps) is running with SSL enabled.
    
        e.g., if tomcat enabled the https connector, add the following to `catalina.sh` .
    
        ``` java
        JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.keyStore=$WEB_SERVER_KEYSTORE -Djavax.net.ssl.keyStorePassword=$password"
        JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$WEBSERVER_TRUSTORE -Djavax.net.ssl.trustStorePassword=$password"
        ```
    
---

-->

1.  Download and install WSO2 IS and apache-tomcat into your local machine. Let’s consider IS installation as `<IS_HOME>` and tomcat installation as
    `<TOMCAT_HOME>`.

2.  Open the `<TOMCAT_HOME>/conf/server.xml` file and enable the https connector on 8443 port.

    ``` xml
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
        WSO2IS as the keystore and truststore in tomcat. In an actual
        environment, you may create a new keystore and truststore for tomcat
        and point to it. When using separate keystores and truststores, you
        need to import tomcat keystore’s public cert in to: `<IS_HOME>/repository/resources/security/client-truststore.jks` and, public cert of `<IS_HOME>/repository/resources/security/wso2carbon.jks` into tomcat’s truststore.
    

3.  Open `<TOMCAT_HOME>/bin/catalina.sh` and add the following JAVA\_OPTS.

    ``` xml
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.keyStore=$IS_HOME/repository/resources/security/wso2carbon.jks -Djavax.net.ssl.keyStorePassword=wso2carbon"
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$IS_HOME/repository/resources/security/client-truststore.jks -Djavax.net.ssl.trustStorePassword=wso2carbon"
    ```

4.  Execute the script, [setup-authentication-endpoint.sh](https://github.com/wso2/samples-is/blob/master/host-endpoints-externally/setup-authentication-endpoint.sh) 
    by providing the path of WSO2 IS and the web root of the external server to copy the authentication endpoint 
    web application and the required jars from the IS pack to the web root directory of the external server.
    Once the script is complete, then the authentication endpoint is set up in the given `<TOMCAT_HOME>/webapps` location.

5.  Uncomment the following section in the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml` file and point to the identity server URLs.

    ```
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
    
6. Configure the identity server origin URL as mentioned below in the `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties` file.
    
    ```
    identity.server.origin=https://localhost:9443
    ```
    
    !!! note
        If necessary, update the paths of the keystore and truststore as well in the same file.
        
7.  Add the configuration given below in the `<IS_HOME>/repository/conf/deployment.toml` file by replacing the 
    `<WEB_SERVER_HOST>` and `<WEB_SERVER_PORT>` placeholders with appropriate values of the external server.

    ```
    [authentication.endpoints]
    login_url="https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/login.do"
    retry_url="https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/retry.do"
    request_missing_claims_url="https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/claims.do"
    
    [oauth.endpoints]
    oauth2_consent_page= "https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/oauth2_authz.do"
    oauth2_error_page= "https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/oauth2_error.do"
    oidc_consent_page= "https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/oauth2_consent.do"
    oidc_logout_consent_page= "https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/oauth2_logout_consent.do"
    oidc_logout_page= "https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/oauth2_logout.do"
    
    [saml.endpoints]
    logout= "https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/samlsso_logout.do"
    notification= "https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/samlsso_notification.do"
    
    [passive_sts.endpoints]
    retry= "https://<WEB_SERVER_HOST>:<WEB_SERVER_PORT>/authenticationendpoint/retry.do"
    ```

8.  Import the public certificate of the identity server to the javaca certs (or web-server's truststore) of the JVM that the authentication endpoint is running.

    ``` 
    keytool -export -keystore $IS_HOME/repository/resources/security/wso2carbon.jks -alias wso2carbon -file wso2carbon.cer
    ```

    ``` 
    keytool -import -alias wso2carbon -keystore  $WEB_APP_TRUSTSTORE -file wso2carbon.cer
    ```

9.  Import the public certificate of the web server’s keystore to the Identity Server truststore.

    ``` 
    keytool -export -keystore $WEB_APP_KEYSTORE -alias wso2carbon -file webserver.cer
    ```

    ``` 
    keytool -import -alias <alias> -keystore  $IS_HOME/repository/resources/security/client-trustore.jks -file webserver.cer
    ```
    
10. Start both Identity Server and tomcat and access `https://<IS_HOST>:<IS_PORT>/myaccount`. Now you can see that the 
    authentication is redirected to the external URL.

<!--    Now let’s take out account recovery endpoint into the external
    Tomcat server as well.

11. Run `setup-accountrecovery.sh` obtained from [step 2](#HostingAuthenticationEndpointonaDifferentServer-step2) and follow the instructions.

12. Change the following section in `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml` file and point to `IdentityManagementEndpointContextURL` into tomcat URL.

    ``` xml
    … 
    <context-param>
            <param-name>IdentityManagementEndpointContextURL</param-name>
    <param-value>https://localhost:8443/accountrecoveryendpoint</param-value>
        </context-param>
    …
    ```

13. Uncomment and change the My Account reference in the `<TOMCAT_HOME>/accountrecoveryendpoint/WEB-INF/web.xml` file.

    ``` xml
    …
    <context-param>
        <param-name>MyAccountUrl</param-name>
        <param-value>https://localhost:9443/myaccount</param-value>
    </context-param>
    ...
    ```

14. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file. 

    ``` toml
    [identity.auth_framework.endpoint]
    identity_server_service_url="https://$ref{server.hostname}:9443/services"
    ```
    
-->
