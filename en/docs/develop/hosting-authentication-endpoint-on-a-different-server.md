# Hosting Authentication Endpoint on a Different Server

The authentication endpoint contains the authentication URLs used in authentication flow. You can use the default authenticationendpoint webapp that is hosted on WSO2 Identity Server itself, or choose to host it on a separate server. You may want to host it separately for the purpose of having custom theming and branding. 

This section describes how you can host the authentication endpoint on a different server outside the WSO2 Identity Server  (e.g., in a different Tomcat
Server).

## Moving the authenticationendpoint from WSO2IS and hosting it on a separate web server

!!! tip "Before you begin"
    First, get a copy of the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint` folder to `<WEBAPP_HOME>/`. 
    
1.  Copy the following .jar files from the `<IS_HOME>/repository/components/plugins/` directory to the `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/lib` directory.

    ```
    cp $IS_HOME/repository/components/plugins/abdera_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/ant_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/axiom_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/axis2_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/bcprov-jdk15on_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-cli_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-collections_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-dbcp_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-fileupload_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-httpclient_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-io_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-lang_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-pool_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/compass_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/encoder_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/com.google.gson_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/hazelcast_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/httpclient_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/httpcore_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/javax.cache.wso2_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/jdbc-pool_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/joda-time_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/json_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/jstl_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/neethi_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/opensaml_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.eclipse.equinox.http.helper_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.eclipse.osgi_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.base_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.eclipse.osgi_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.eclipse.osgi.services_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.base_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.crypto.api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.database.utils_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.application.common_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.base_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.template.mgt_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.queuing_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.registry.api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.registry.core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.securevault_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.user.api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.user.core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.utils_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.securevault_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/rampart-core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/slf4j.api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/tomcat-catalina-ha_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/tomcat-servlet-api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/wsdl4j_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/XmlSchema_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.ui_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.application.authentication.endpoint.util_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.user.registration.stub_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.mgt.stub_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.mgt_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.mgt.ui_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.oauth_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/features/org.wso2.carbon.identity.application.authentication.framework.server_*/runtimes/cxf3/org.wso2.carbon.identity.application.authentication.endpoint.util-*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/jettison_*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/javax.ws.rs-api-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-core-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-frontend-jaxrs-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-rs-client-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-rs-extension-providers-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-rs-extension-search-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-rs-service-description-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-transports-http-*.jar $WEB_APP_LIB
    cp $IS_HOME/bin/org.wso2.carbon.bootstrap-*.jar $WEB_APP_LIB
    cp $IS_HOME/bin/tomcat-juli-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/xercesImpl-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/geronimo-jta_*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/stax2-api-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/woodstox-core-asl-*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/tools/forget-me/lib/log4j-*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/tools/forget-me/lib/pax-logging-api-*.jar $WEB_APP_LIB
    ```

2.  Copy the following .jar files from the `IS_HOME>/lib/runtimes/cxf/` directory to the `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/lib`
    directory.  
    -   `javax.ws.rs-`
        api `-2.0-m10.jar`
    -   cxf `-bundle-2.7.16.wso2v1.jar`
    -   neethi `-3.0.3.jar`
    -   `wsdl4j-1.6.3.jar`
3.  Uncomment following section in `<WEBAPP_HOME>/authenticationendpoint/WEB-INF/web.xml` and point to identity server URLs.

    ``` xml
    ...   
    <context-param>
           <param-name>IdentityManagementEndpointContextURL</param-name>
    <param-value>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/accountrecoveryendpoint</param-value>
       </context-param>
        <context-param>
           <param-name>AccountRecoveryRESTEndpointURL</param-name>
         <param-value>https://localhost:9443/t/tenant-domain/api/identity/user/v0.9/</param-value>
       </context-param>
    ...
        <context-param>
            <param-name>IdentityServerEndpointContextURL</param-name>
            <param-value>https://localhost:9443</param-value>
        </context-param>
    ...
    ```

4.  Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml tab="Format"
    [authentication.endpoints] 
    login_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/login.do"
    retry_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/retry.do"
    request_missing_claims_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/claims.do"
    ```

    ```toml tab="Sample"
    [authentication.endpoints]
    login_url = "https://localhost.com:8443/authenticationendpoint/login.do"
    retry_url = "https://localhost.com.com:8443/authenticationendpoint/retry.do"
    request_missing_claims_url = "https://localhost.com:8443//authenticationendpoint/claims.do"
    ```

5.  Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file to point to the authentication endpoint hosted outside the WSO2 server.

    ``` toml
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

6.  Import the public certificate of the identity server to the javaca certs (or web-serverstruststore) of the JVM that the authenticationendpoint is running.

    ``` 
    keytool -export -keystore $IS_HOME/repository/resources/security/wso2carbon.jks -alias wso2carbon -file wso2carbon.cer
    ```

    ``` 
    keytool -import -alias wso2carbon -keystore  $WEB_APP_TRUSTSTORE -file wso2carbon.cer
    ```

7.  Import the public certificate of the Web\_server’s keystore to the Identity Server truststore.

    ``` 
    keytool -export -keystore $WEB_APP_KEYSTORE -alias wso2carbon -file webserver.cer
    ```

    ``` 
    keytool -import -alias <alias> -keystore  $IS_HOME/repository/resources/security/client-trustore.jks -file webserver.cer
    ```

## Moving the accountrecoveryendpoint from WSO2IS and hosting it on a separate web server

This is an additional improvement which enables hosting `accountrecoveryendpoint.war` also on a separate web server.

!!! tip "Before you begin"
    Get a copy of `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint` folder to `<WEBAPP_HOME>/`.
    

1.  Open the `<WEBAPP_HOME>/accountrecoveryendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties` file, uncomment the following config, and change it to `identity server`.

    ``` xml
    identity.server.service.contextURL=https://localhost:9443/services/
    ```

2.  Uncomment and change the user portal reference in `<WEBAPP_HOME>/accountrecoveryendpoint/WEB-INF/web.xml`.

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
    
    ```
    cp $IS_HOME/repository/components/plugins/abdera_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/ant_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/axiom_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/axis2_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/bcprov-jdk15on_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-cli_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-collections_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-dbcp_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-fileupload_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-httpclient_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-io_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-lang_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/commons-pool_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/compass_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/encoder_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/com.google.gson_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/hazelcast_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/httpclient_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/httpcore_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/javax.cache.wso2_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/jdbc-pool_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/joda-time_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/json_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/jstl_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/neethi_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/opensaml_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.eclipse.equinox.http.helper_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.eclipse.osgi_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.base_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.eclipse.osgi_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.eclipse.osgi.services_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.base_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.crypto.api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.database.utils_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.application.common_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.base_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.template.mgt_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.queuing_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.registry.api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.registry.core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.securevault_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.user.api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.user.core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.utils_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.securevault_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/rampart-core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/slf4j.api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/tomcat-catalina-ha_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/tomcat-servlet-api_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/wsdl4j_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/XmlSchema_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.ui_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.application.authentication.endpoint.util_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.core_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.user.registration.stub_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.mgt.stub_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.mgt_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.mgt.ui_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.oauth_*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/features/org.wso2.carbon.identity.application.authentication.framework.server_*/runtimes/cxf3/org.wso2.carbon.identity.application.authentication.endpoint.util-*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/plugins/jettison_*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/javax.ws.rs-api-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-core-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-frontend-jaxrs-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-rs-client-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-rs-extension-providers-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-rs-extension-search-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-rs-service-description-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/runtimes/cxf3/cxf-rt-transports-http-*.jar $WEB_APP_LIB
    cp $IS_HOME/bin/org.wso2.carbon.bootstrap-*.jar $WEB_APP_LIB
    cp $IS_HOME/bin/tomcat-juli-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/xercesImpl-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/geronimo-jta_*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/stax2-api-*.jar $WEB_APP_LIB
    cp $IS_HOME/lib/woodstox-core-asl-*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/tools/forget-me/lib/log4j-*.jar $WEB_APP_LIB
    cp $IS_HOME/repository/components/tools/forget-me/lib/pax-logging-api-*.jar $WEB_APP_LIB
    ```

    !!! note
        Make sure the WebApp container server (of endpoint apps) is running with SSL enabled.
    
        e.g., if tomcat enabled the https connector, add the following to `catalina.sh` .
    
        ``` java
        JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.keyStore=$WEB_SERVER_KEYSTORE -Djavax.net.ssl.keyStorePassword=$password"
        JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$WEBSERVER_TRUSTORE -Djavax.net.ssl.trustStorePassword=$password"
        ```
    

## Running the sample

1.  Download and install WSO2 IS and apache-tomcat into your local machine. Let’s consider IS installation as `<IS_HOME>` and tomcat installation as
    `<TOMCAT_HOME>`

2.  Get the sample setup scripts from the following location:
    `https://github.com/wso2/samples-is/blob/master/host-endpoints-externally`.

3.  Open `<TOMCAT_HOME>/conf/server.xml` file and enable the https connector on 8443 port.

    ``` xml
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11NioProtocol"
              maxThreads="150" SSLEnabled="true" scheme="https" secure="true"
              clientAuth="want" sslProtocol="TLS"
              sslEnabledProtocols="TLSv1,TLSv1.1,TLSv1.2"      keystoreFile="$IS_HOME/repository/resources/security/wso2carbon.jks"
    keystorePass="wso2carbon" truststoreFile="$IS_HOME/repository/resources/security/client-truststore.jks" truststorePass="wso2carbon"/>
    ```

    !!! note
        For this sample, we configured the same keystore and truststore in
        WSO2IS as the keystore and truststore in tomcat. In an actual
        environment, you may create a new keystore and truststore for tomcat
        and point to it. When using separate keystores and truststores, you
        need to import tomcat keystore’s public cert in to: `<IS_HOME>/repository/resources/security/client-truststore.jks` and, public cert of `<IS_HOME>/repository/resources/security/wso2carbon.jks` into tomcat’s truststore.
    

4.  Open `<TOMCAT_HOME>/bin/catalina.sh` and add following JAVA\_OPTS.

    ``` xml
    JAVA_OPTS="$JAVA_OPTS --Djavax.net.ssl.keyStore=$IS_HOME/repository/resources/security/wso2carbon.jks -Djavax.net.ssl.keyStorePassword=wso2carbon"
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$IS_HOME/repository/resources/security/client-truststore.jks -Djavax.net.ssl.trustStorePassword=wso2carbon"
    ```

5.  Run `setup-authentication.sh` obtained from [step 2](#HostingAuthenticationEndpointonaDifferentServer-step2) and follow the instructions.

6.  Once the script is complete, then the authentication endpoint is set up in the given `<TOMCAT_HOME>/webapps` location.

7.  Uncomment following section in `<TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml` file and point to identity server URLs.

    ``` xml
    …...   
    <context-param>
            <param-name>IdentityManagementEndpointContextURL</param-name>
    <param-value>https://localhost:9443/accountrecoveryendpoint</param-value>
        </context-param>
        <context-param>
            <param-name>AuthenticationRESTEndpointURL</param-name>
            <param-value>https://localhost:9443/api/identity/auth/v1.1/</param-value>
        </context-param>
    …..
        <context-param>
            <param-name>IdentityServerEndpointContextURL</param-name>
            <param-value>https://localhost:9443</param-value>
        </context-param>
    …...
    ```

8.  Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [authentication.endpoints] 
    login_url="https://localhost:8443/authenticationendpoint/login.do"
    retry_url="https://localhost:8443/authenticationendpoint/retry.do"
    request_missing_claims_url="https://localhost:8443/authenticationendpoint/claims.do"
    ```

9.  Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file to point to the authentication endpoint hosted outside the WSO2 server.

    ``` toml
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

10. Start both Identity Server and tomcat and access `https://localhost:9443/dashboard`. Now you can see that the authentication is redirected to: `https://localhost:8443/authenticationendpoint/login.do`

    Now let’s take out account recovery endpoint into the external
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

13. Open the `<TOMCAT_HOME>/accountrecoveryendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties` file, uncomment the following config, and change it to `identity server`.

    ``` xml
    identity.server.service.contextURL=https://localhost:9443/services/
    ```

14. Uncomment and change the user portal reference in the `<TOMCAT_HOME>/accountrecoveryendpoint/WEB-INF/web.xml` file.

    ``` xml
    …
    <context-param>
        <param-name>UserPortalUrl</param-name>
        <param-value>https://localhost:9443/user-portal</param-value>
    </context-param>
    ...
    ```
