# Hosting Authentication and Recovery Endpoints on a Different Server

The authenticationendpoint contains the authentication URLs used in
authentication flow. By default the authenticationendpoint webapp is
shipped embeded to the WSO2 Identity Server and get hosted in the server
itself. You may choose to host it on a separate server for the purpose of having custom theming and
branding. This section describes how you can host the authentication
endpoint on a different server outside the WSO2 Identity Server (e.g.,
in a different Tomcat Server).

## Moving the authenticationendpoint from WSO2IS and hosting it on a separate web server

!!! tip "Before you begin"
    
    First, get a copy of
    `         <IS_HOME>/repository/deployment/server/webapps        `
    `         /authenticationendpoint        ` as a backup.
    In this document `<WebApp_HOME>` is referred to the webapplication deployment location of the external webapp container.
    
1.  Copy the
    `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint`
    directory to the `<WebApp_HOME>`. Now you have the all the content
    of the existing `authenticationendpoint` in the
    `<WebApp_HOME>/authenticationendpoint` location.
    
    !!! Note 
        Addition to the services available in the
        `authenticationendpoint` , for its full functionality,
        `authenticationendpoint` uses set of library services running in the
        WSo2 Identity Server. As you decouple the web-application from the
        Identity Server,you need to include those supporting services in the
        external webapp container. Steps 2 to 7 describe the library
        services that you need to copy.
    
2.  Copy the following .jar files from the
  `<IS_HOME>/repository/components/plugins/` directory to the
  `<WebApp_HOME>/authenticationendpoint/WEB-INF/lib` directory.

    !!! abstract "`<IS_HOME>/repository/components/plugins/`"
        ```java
        abdera_*.jar
        ant_*.jar
        axiom_*.jar
        axis2_*.jar
        bcprov-jdk15on_*.jar
        commons-cli_*.jar
        commons-collections_*.jar
        commons-dbcp_*.jar
        commons-fileupload_*.jar
        commons-httpclient_*.jar
        commons-io_*.jar
        commons-lang_*.jar
        commons-pool_*.jar
        compass_*.jar
        encoder_*.jar
        com.google.gson_*.jar
        hazelcast_*.jar
        httpclient_*.jar
        httpcore_*.jar
        javax.cache.wso2_*.jar
        jdbc-pool_*.wso2v2.jar
        joda-time_*.jar
        json_*.jar
        neethi_*.jar
        opensaml_*.jar
        org.eclipse.equinox.http.helper_*.jar
        org.wso2.carbon.base_*.jar
        org.eclipse.osgi_*.jar
        org.eclipse.osgi.services_*.jar
        org.wso2.carbon.base_*.jar
        org.wso2.carbon.core_*.jar
        org.wso2.carbon.crypto.api_*.jar
        org.wso2.carbon.database.utils_*.jar
        org.wso2.carbon.identity.application.common_*.jar
        org.wso2.carbon.identity.base_*.jar
        org.wso2.carbon.identity.template.mgt_*.jar
        org.wso2.carbon.logging_*.jar
        org.wso2.carbon.queuing_*.jar
        org.wso2.carbon.registry.api_*.jar
        cp $IS_HOME/repository/components/org.wso2.carbon.registry.core_*.jar
        org.wso2.carbon.securevault_*.jar
        org.wso2.carbon.user.api_*.jar
        org.wso2.carbon.user.core_*.jar
        org.wso2.carbon.utils_*.jar
        org.wso2.securevault_*.jar
        rampart-core_*.jar
        slf4j.api_*.jar
        tomcat-catalina-ha_*.jar
        tomcat-servlet-api_*.jar
        wsdl4j_*.jar
        XmlSchema_*.jar
        org.wso2.carbon.ui_*.jar
        org.wso2.carbon.identity.application.authentication.endpoint.util_*.jar
        org.wso2.carbon.identity.core_*.jar
        org.wso2.carbon.identity.user.registration.stub_*.jar
        jettison_*.jar
        ```
    
3.  Copy the following .jar files from the
    `<IS_HOME>/lib/runtimes/cxf3/` directory to the
    `<WebApp_HOME>/authenticationendpoint/WEB-INF/lib` directory.

    !!! abstract "`<IS_HOME>/lib/runtimes/cxf3/`"
        ```java 
        javax.ws.rs-api-*.jar
        cxf-core-*.jar
        cxf-rt-frontend-jaxrs-*.jar
        cxf-rt-rs-client-*.jar
        cxf-rt-rs-extension-providers-*.jar
        cxf-rt-rs-extension-search-*.jar
        cxf-rt-rs-service-description-*.jar
        cxf-rt-transports-http-*.jar
        ```


4.  Copy the following .jar files from the `<IS_HOME>/bin/` directory to
    the `<WebApp_HOME>/authenticationendpoint/WEB-INF/lib` directory.

    !!! abstract "`<IS_HOME>/bin/`"
        ```java 
        org.wso2.carbon.bootstrap-*.jar
        tomcat-juli-*.jar
        ```


5.  Copy the following .jar file from the `<IS_HOME>/lib/` directory to
    the `<WebApp_HOME>/authenticationendpoint/WEB-INF/lib` directory.
    
    !!! abstract "`<IS_HOME>/lib/`"
        ```java
        xercesImpl-*.jar
        ```
    
6.  Copy the following .jar files from the `<IS_HOME>/lib/endorsed/`
    directory to the `<WebApp_HOME>/authenticationendpoint/WEB-INF/lib`
    directory. 
    
    !!! abstract "`<IS_HOME>/lib/endorsed/`"
        ```java
        xercesImpl-*.jargeronimo-jta_*.jar
        stax2-api-*.jar
        woodstox-core-asl-*.jar
        ```
    
7.  Copy the following .jar files from the
    `<IS_HOME>/repository/components/tools/forget-me/lib/` directory to
    the `<WebApp_HOME>/authenticationendpoint/WEB-INF/lib` directory.

    !!! abstract "`<IS_HOME>/lib/endor<IS_HOME>/repository/components/tools/forget-me/lib/`"
        ```java
        lib/log4j-*.jar
        ```

    !!! note 
        Now you have completed moving required services to the
        external web-app container. Then you need to add necessary
        configurations for the externalized endpoint to communicate with
        WSO2 Identity Server and vice versa.

8.  Uncomment following section in `
    <WebApp_HOME>/authenticationendpoint/WEB-INF/web.xml ` and point to
    identity server URLs.
    
    !!! abstract "`<WebApp_HOME>/authenticationendpoint/WEB-INF/web.xml`"
            ```xml 
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

9.  Set the following configuration in
    `<IS_HOME>/repository/conf/identity/deployment.toml ` file.

    ```toml
    [authentication.endpoints] 
    login_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/login.do"
    retry_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/retry.do"
    request_missing_claims_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/claims.do"
    ```
    !!! note 
        In above configurations `$WEB_SERVER_HOST` refers to the
        hostname of the external webapp container and `$WEB_SERVER_PORT`
        refers to the corresponding port.

10. Change the following configuration in `
    <IS_HOME>/repository/conf/identity/identity.xml ` file to point to the
    authentication endpoint hosted outside the wso2 server.

    !!! abstract "`<IS_HOME>/repository/conf/deployment.toml`"        
        ```toml
        [authentication.endpoints] 
        login_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/login.do"
        retry_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/retry.do"
        request_missing_claims_url="https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/claims.do"
        
        [oauth.endpoints]
        oauth2_consent_page= "https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_authz.do"
        oauth2_error_page= "https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_error.do"
        oidc_consent_page= "https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_consent.do"
        oidc_logout_consent_page= "https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_logout_consent.do"
        oidc_logout_page= "https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_logout.do"
    
        [saml.endpoints] 
        logout= "https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/samlsso_logout.do"
        notification= "https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/samlsso_notification.do"
    
        [passive_sts.endpoints] 
        retry= "https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/retry.do"
        ```

11. Import the public certificate of the identity server to the `javaca
    certs` (or web-serverstruststore) of the JVM that the
    `authenticationendpoint` is running.

    !!! abstract "`export`' the WSO2 Identity Server's public key and `import` to wepbapp server's trust-store"
        
        ```xml 
        keytool -export -keystore $IS_HOME/repository/resources/security/wso2carbon.jks -alias wso2carbon -file wso2carbon.cer 
        ```
            
        ```xml
        keytool -import -alias wso2carbon -keystore  $WEB_APP_TRUSTSTORE -file wso2carbon.cer
        ```

7.  Import the public certificate of the Web\_server’s keystore to the
    Identity Server truststore.

    !!! abstract "`export`' the wepbapp server's public key and `import` to WSO2 Identity Server's trust-store"
        
        ```xml 
        keytool -export -keystore $WEB_APP_KEYSTORE -alias wso2carbon -file webserver.cer
        ```
            
        ```xml
        keytool -import -alias <alias> -keystore  $IS_HOME/repository/resources/security/client-trustore.jks -file webserver.cer
        ```

## Moving the accountrecoveryendpoint from WSO2IS and hosting it on a separate web server

This is an additional improvement which enables hosting
`accountrecoveryendpoint` also on a separate web server.

!!! tip "Before you begin"
    
    First, get a copy of
    `         <IS_HOME>/repository/deployment/server/webapps        `
    `         /authenticationendpoint        ` as a backup.
    
1.  Get a copy of `
    <IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint.
    ` to ` <WebApp_HOME>/ `.

    !!! Note 
        Addition to the services available in the
        `authenticationendpoint` , for its full functionality,
        `authenticationendpoint` also uses set of library services running
        in the WSo2 Identity Server. As you decouple the web-application
        from the Identity Server,you need to include those supporting
        services in the external webapp container. Steps 2 to 3 describe the
        library services that you need to copy.
    
2.  Copy the following .jar files from the
  `<IS_HOME>/repository/components/plugins/` directory to the
  `<WebApp_HOME>/authenticationendpoint/WEB-INF/lib` directory.

    !!! abstract "`<IS_HOME>/repository/components/plugins/`"
        ```java
        commons-lang_*.jar 
        encoder_*.jar 
        com.google.gson_*.jar 
        httpclient_*.jar 
        httpcore_*1.jar 
        json_*.jar 
        org.wso2.carbon.identity.mgt.stub_*.jar 
        org.wso2.carbon.identity.user.registration.stub_*.jar 
        org.wso2.carbon.base_*.jar 
        org.wso2.carbon.identity.base_*.jar 
        org.wso2.carbon.ui_*.jar 
        org.wso2.carbon.identity.application.authentication.endpoint.util_*.jar 
        org.wso2.carbon.identity.core_*.jar 
        org.wso2.carbon.utils_*.jar 
        org.wso2.carbon.user.core_*.jar 
        org.wso2.carbon.user.api_*.jar 
        org.wso2.carbon.logging_*.jar 
        axis2_*.jar 
        opensaml_*.jar 
        jettison_*.jar 
        neethi_*.jar 
        wsdl4j_*.jar 
        org.apache.commons.commons-codec_*.jar 
        commons-collections_*.jar 
        org.wso2.carbon.identity.mgt_*.jar 
        org.wso2.carbon.tomcat.ext_*.jar 
        ```
    
3.  Copy the following .jar files from the
    `<IS_HOME>/lib/runtimes/cxf3/` directory to the
    `<WebApp_HOME>/authenticationendpoint/WEB-INF/lib` directory.

    !!! abstract "`<IS_HOME>/lib/runtimes/cxf3/`"
        ```java 
        avax.ws.rs-api-*.jar 
        cxf-core-*.jar 
        cxf-rt-frontend-jaxrs-*.jar 
        cxf-rt-rs-client-*.jar 
        cxf-rt-rs-extension-providers-*.jar 
        cxf-rt-rs-extension-search-*.jar 
        cxf-rt-rs-service-description-*.jar 
        cxf-rt-transports-http-*.jar 
        jackson-annotations-*.jar 
        jackson-core-*.jar 
        jackson-databind-*.jar 
        jackson-jaxrs-base-*.jar 
        jackson-jaxrs-json-provider-*.jar 
        jackson-module-jaxb-annotations-*.jar
        ```
        
4.  In `
    <WebApp_HOME>/accountrecoveryendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties
    ` file, uncomment and change it to identity server.

    ``` xml
    identity.server.service.contextURL=https://localhost:9443/services/
    ```

5.  Uncomment and change the user portal reference in `
    <WebApp_HOME>/accountrecoveryendpoint/WEB-INF/web.xml `

    ``` xml
    <context-param>
            <param-name>UserPortalUrl</param-name>
            <param-value>https://localhost:9443/dashboard/index.jag</param-value>
    </context-param>
    ```
    
    !!! Tip 
        "Make sure the WebApp container server (of endpoint apps) is running with SSL enabled."

## Running the sample

1.  Download and install WSO2 IS and apache-tomcat into your local
    machine. Let’s consider IS installation as
    `           <IS_HOME>          ` and tomcat installation as
    `           <TOMCAT_HOME>          `
    
    
    !!! Warning "Make sure the Tomcat server (of endpoint apps) is running with SSL enabled."
    
        To enable the https connector, add the following to
        `           catalina.sh          ` when starting the tomcat server. Make sure to replace `$WEBSERVER_TRUSTORE` and `$password` accordingly.
    
        ```xml
        JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.keyStore=$WEB_SERVER_KEYSTORE -Djavax.net.ssl.keyStorePassword=$password"
        JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$WEBSERVER_TRUSTORE -Djavax.net.ssl.trustStorePassword=$password"
        ```
   

2.  Get the sample setup scripts
    [setup-accountrecovery-endpoint.sh](https://github.com/wso2/samples-is/blob/04d8f36728db3545ea497cb1d69ca26405a8b4c5/host-endpoints-externally/setup-accountrecovery-endpoint.sh)
    and
    [setup-authentication-endpoint.sh](https://github.com/wso2/samples-is/blob/04d8f36728db3545ea497cb1d69ca26405a8b4c5/host-endpoints-externally/setup-authentication-endpoint.sh) from
    [this location](https://github.com/wso2/samples-is/tree/04d8f36728db3545ea497cb1d69ca26405a8b4c5/host-endpoints-externally).

3.  Open ` <TOMCAT_HOME>/conf/server.xml ` file and enable the https
    connector on 8443 port.
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
        need to import tomcat keystore’s public cert in to:
    
        `           <          `
        `           IS_HOME>/repository/resources/security/client-truststore.jks          `
        and, public cert of `           <          `
        `           IS_HOME>/repository/resources/security/wso2carbon.jks          `
        into tomcat’s truststore.
    

4.  Open `           <TOMCAT_HOME>/bin/catalina.sh          ` and add
    following JAVA\_OPTS.

    ``` xml
    JAVA_OPTS="$JAVA_OPTS --Djavax.net.ssl.keyStore=$IS_HOME/repository/resources/security/wso2carbon.jks -Djavax.net.ssl.keyStorePassword=wso2carbon"
    JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$IS_HOME/repository/resources/security/client-truststore.jks -Djavax.net.ssl.trustStorePassword=wso2carbon"
    ```

5.  Run
    [setup-authentication-endpoint.sh](https://github.com/wso2/samples-is/blob/04d8f36728db3545ea497cb1d69ca26405a8b4c5/host-endpoints-externally/setup-authentication-endpoint.sh)
    obtained from `step 2` and follow the instructions.

6.  Once the script is complete, then the authentication endpoint is set
    up in the given `          <TOMCAT_HOME>/webapps         ` location.

7.  Uncomment following section in
    `           <TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml          `
    file and point to identity server URLs.

    ``` xml
        ...  
        <context-param>
                <param-name>IdentityManagementEndpointContextURL</param-name>
        <param-value>https://localhost:9443/accountrecoveryendpoint</param-value>
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

8.  Change the following configuration in `
    <IS_HOME>/repository/conf/deployment.toml ` file to point to the
    authentication endpoint hosted outside the wso2 server.

    ```toml
    [authentication.endpoints] 
    login_url="https://localhost:8443/authenticationendpoint/login.do"
    retry_url="https://localhost:8443/authenticationendpoint/retry.do"
    request_missing_claims_url="https://localhost:8443/authenticationendpoint/claims.do"
    
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
    
9. Start both Identity Server and tomcat and access `
   https://localhost:9443/dashboard ` . Now you can see that the
   authentication is redirected to: `
   https://localhost:8443/authenticationendpoint/login.do `

    Now let’s take out account recovery endpoint into the external
    Tomcat server as well.

10. Run [setup-accountrecovery-endpoint.sh](https://github.com/wso2/samples-is/blob/04d8f36728db3545ea497cb1d69ca26405a8b4c5/host-endpoints-externally/setup-accountrecovery-endpoint.sh)
     obtained from [step 2](#step2) and
    follow the instructions.

11. Change the following section in `
    <TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml `
    file and point to ` IdentityManagementEndpointContextURL `
    into tomcat URL.
    
    ``` xml
    ... 
    <context-param>
            <param-name>IdentityManagementEndpointContextURL</param-name>
    <param-value>https://localhost:8443/accountrecoveryendpoint</param-value>
        </context-param>
    ...
    ```

12. In `
   <TOMCAT_HOME>/accountrecoveryendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties
   ` file, uncomment and change it to identity server.

    ``` xml
    identity.server.service.contextURL=https://localhost:9443/services/
    ```

13. Uncomment and change the user portal reference in `
    <TOMCAT_HOME>/account ` ` recovery ` ` endpoint/WEB-INF/web.xml `

    ``` xml
    ...
        <context-param>
            <param-name>UserPortalUrl</param-name>
            <param-value>https://localhost:9443/dashboard/index.jag</param-value>
        </context-param>
    ...
    ```
