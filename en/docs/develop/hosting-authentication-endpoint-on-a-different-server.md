# Hosting Authentication Endpoint on a Different Server

The authenticationendpoint contains the authentication URLs used in
authentication flow. You can either host
the authenticationendpoint webapp on the WSO2 Identity Server, or choose
to host it on a separate server. You may want to host it separately for
the purpose of having custom theming and branding. This section
describes how you can host the authentication endpoint on a different
server outside the WSO2 Identity Server  (e.g., in a different Tomcat
Server).

-   [Moving the authenticationendpoint from WSO2IS and hosting it on a
    separate web
    server](#HostingAuthenticationEndpointonaDifferentServer-MovingtheauthenticationendpointfromWSO2ISandhostingitonaseparatewebserver)
-   [Moving the accountrecoveryendpoint from WSO2IS and hosting it on a
    separate web
    server](#HostingAuthenticationEndpointonaDifferentServer-MovingtheaccountrecoveryendpointfromWSO2ISandhostingitonaseparatewebserver)
-   [Running the
    sample](#HostingAuthenticationEndpointonaDifferentServer-Runningthesample)

## Moving the authenticationendpoint from WSO2IS and hosting it on a separate web server

!!! tip "Before you begin"
    First, get a copy of the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint.war` file to `<WEBAPP_HOME>/` and unzip it. Make sure to get the `authenticationendpoint.war` after the WUM update and NOT the extracted `authenticationendpoint.war` in the `<IS_HOME>/repository/deployment/server/webapps/` folder.
    

1.  Copy the following .jar files from the
    `           <IS_HOME>/repository/components/plugins/          `
    directory to the
    `           <WebApp_HOME>/authenticationendpoint/WEB-INF/lib          `
    directory.

    -   org.wso2.carbon.base_4.4.11.jar

    -   org.wso2.carbon.identity.base_5.7.5.jar

    -   org.wso2.carbon.ui_4.4.11.jar

    -   org.wso2.carbon.identity.application.authentication.endpoint.util_5.7.5.jar

    -   org.wso2.carbon.identity.core_5.7.5.jar

    -   httpcore_4.3.3.wso2v1.jar

    -   org.wso2.carbon.identity.user.registration.stub_5.7.5.jar 

    -   axis2_1.6.1.wso2v20.jar

    -   org.wso2.carbon.user.api_4.4.11.jar

    -   opensaml_2.6.4.wso2v3.jar

    -   org.wso2.carbon.utils_4.4.11.jar

    -   jettison_1.3.4.wso2v1.jar

    -   org.wso2.carbon.user.core_4.4.11.jar

2.  Copy the following .jar files from the \<
    `          IS_HOME>/lib/runtimes/cxf/         ` directory to the
    `          <WebApp_HOME>/authenticationendpoint/WEB-INF/lib         `
    directory.  
    -   `                         javax.ws                        .rs-           `
        api `            -2.0-m10.jar           `
    -   cxf `            -bundle-2.7.16.wso2v1.jar           `
    -   neethi `            -3.0.3.jar           `
    -   `            wsdl4j-1.6.3.jar           `
3.  Uncomment following section in
    `           <WebApp_HOME>/authenticationendpoint/WEB-INF/web.xml          `
    and point to identity server URLs.

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

4.  Change the following configuration in
    `           <IS_HOME>/repository/conf/identity/application-authentication.xml          `
    file

    ``` xml
        <AuthenticationEndpointURL>/authenticationendpoint/login.do</AuthenticationEndpointURL>
        <AuthenticationEndpointRetryURL>/authenticationendpoint/retry.do</AuthenticationEndpointRetryURL>
        <AuthenticationEndpointMissingClaimsURL>/authenticationendpoint/claims.do</AuthenticationEndpointMissingClaimsURL>
    ```

    as follows:

    ``` xml
        <AuthenticationEndpointURL>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/login.do</AuthenticationEndpointURL>
        <AuthenticationEndpointRetryURL>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/retry.do</AuthenticationEndpointRetryURL>
        <AuthenticationEndpointMissingClaimsURL>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/claims.do</AuthenticationEndpointMissingClaimsURL>
    ```

    You will need to add AuthenticationEndpointMissingClaimsURL
    configuration, as it is not already available in this configuration
    file.

5.  Change the following configuration in
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    file to point to the authentication endpoint hosted outside the wso2
    server.

    ``` xml
        ...
        <OpenID>
            ...
            <OpenIDLoginUrl>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/openid_login.do</OpenIDLoginUrl>
            ...
        </OpenID>
        ...
        <OAuth>
            ...
            <OAuth2ConsentPage>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_authz.do</OAuth2ConsentPage>
            <OAuth2ErrorPage>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_error.do</OAuth2ErrorPage>
            <OIDCConsentPage>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_consent.do</OIDCConsentPage>
            <OIDCLogoutConsentPage>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_logout_consent.do</OIDCLogoutConsentPage>
            <OIDCLogoutPage>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/oauth2_logout.do</OIDCLogoutPage>
            ...
        </OAuth>
        ...
        <SSOService>
            ...  
            <DefaultLogoutEndpoint>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/samlsso_logout.do</DefaultLogoutEndpoint>
            <NotificationEndpoint>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/samlsso_notification.do</NotificationEndpoint>
            ...
        </SSOService>
        ...
        <PassiveSTS>
            ...
           <RetryURL>https://$WEB_SERVER_HOST:$WEB_SERVER_PORT/authenticationendpoint/retry.do</RetryUR>
            ...
        <PassiveSTS>
        ...
    ```

6.  Import the public certificate of the identity server to
    the javaca certs (or web-serverstruststore) of the JVM that
    the authenticationendpoint is running.

    ``` xml
        keytool -export -keystore $IS_HOME/repository/resources/security/wso2carbon.jks -alias wso2carbon -file wso2carbon.cer
    ```

    ``` xml
        keytool -import -alias wso2carbon -keystore  $WEB_APP_TRUSTSTORE -file wso2carbon.cer
    ```

7.  Import the public certificate of the Web\_server’s keystore to the
    Identity Server truststore.

    ``` xml
        keytool -export -keystore $WEB_APP_KEYSTORE -alias wso2carbon -file webserver.cer
    ```

    ``` xml
        keytool -import -alias <alias> -keystore  $IS_HOME/repository/resources/security/client-trustore.jks -file webserver.cer
    ```

## Moving the accountrecoveryendpoint from WSO2IS and hosting it on a separate web server

This is an additional improvement which enables
hosting accountrecoveryendpoint.war also on a separate web server.

!!! tip "Before you begin"
    Get a copy of
    `         <IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint.war        `
    to `         <WebApp_HOME>/        ` and unzip it. Make sure to get the
    `         accountrecoveryendpoint.war        ` after the WUM update and
    not the extracted `         accountrecoveryendpoint        ` in
    `         <IS_HOME>/repository/deployment/server/webapps/        `
    

1.  In
    `           <WebApp_HOME>/accountrecoveryendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties          `
    file, uncomment and change it to identity server.

    ``` xml
    identity.server.service.contextURL=https://localhost:9443/services/
    ```

2.  Uncomment and change the user portal reference in
    `           <WebApp_HOME>/accountrecoveryendpoint/WEB-INF/web.xml          `

    ``` xml
        <context-param>
                <param-name>UserPortalUrl</param-name>
                <param-value>https://localhost:9443/dashboard/index.jag</param-value>
        </context-param>
    ```

3.  Export the following paths.

    ``` xml
        export WEB_APP_HOME=/Users/userfoo/apache-tomcat-7.0.81/webapps
        export IS_HOME=/Users/userfoo/wso2is-5.6.0
        export WEB_APP_LIB=${WEB_APP_HOME}/accountrecoveryendpoint/WEB-INF/lib/
    ```

    Note: `           WEB_APP_HOME          ` and
    `           IS_HOME          ` paths are given as examples. You may
    have to change them according to your environment.

4.  Copy the following dependencies to
    `           <WebApp_HOME>/authenticationendpoint/WEB-INF/lib          `

    ``` xml
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.base_4.4.11.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.base_5.7.5.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.ui_4.4.11.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.application.authentication.endpoint.util_5.7.5.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.core_5.7.5.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.identity.user.registration.stub_5.7.5.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.utils_4.4.11.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.user.core_4.4.11.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.user.api_4.4.11.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/org.wso2.carbon.logging_4.4.11.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/httpcore_4.3.3.wso2v1.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/axis2_1.6.1.wso2v20.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/opensaml_2.6.4.wso2v3.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/jettison_1.3.4.wso2v1.jar $WEB_APP_LIB
        cp $IS_HOME/lib/runtimes/cxf/javax.ws.rs-api-2.0-m10.jar $WEB_APP_LIB
        cp $IS_HOME/lib/runtimes/cxf/cxf-bundle-2.7.16.wso2v1.jar $WEB_APP_LIB
        cp $IS_HOME/lib/runtimes/cxf/neethi-3.0.3.jar $WEB_APP_LIB
        cp $IS_HOME/lib/runtimes/cxf/wsdl4j-1.6.3.jar $WEB_APP_LIB
        cp $IS_HOME/repository/components/plugins/commons-codec_1.4.0.wso2v1.jar
        cp $IS_HOME/repository/components/plugins/commons-collections_3.2.2.wso2v1.jar
    ```

    !!! note
        Make sure the WebApp container server (of endpoint apps) is
        running with SSL enabled.
    
        e.g., if tomcat enabled the https connector, add the following to
        `           catalina.sh          ` .
    
        ``` xml
            JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.keyStore=$WEB_SERVER_KEYSTORE -Djavax.net.ssl.keyStorePassword=$password"
            JAVA_OPTS="$JAVA_OPTS -Djavax.net.ssl.trustStore=$WEBSERVER_TRUSTORE -Djavax.net.ssl.trustStorePassword=$password"
        ```
    

## Running the sample

1.  Download and install WSO2 IS and apache-tomcat into your local
    machine. Let’s consider IS installation as
    `           <IS_HOME>          ` and tomcat installation as
    `           <TOMCAT_HOME>          `

2.  Get the sample setup scripts from the following location:
    `                     https://github.com/ayshsandu/samples/tree/master/is_samples/is_5.6.0/hosting-endpoints                   `
    .
3.  Open `           <TOMCAT_HOME>/conf/server.xml          ` file and
    enable the https connector on 8443 port.

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

5.  Run `          setup-authentication.sh         ` obtained from [step
    2](#HostingAuthenticationEndpointonaDifferentServer-step2) and
    follow the instructions.
6.  Once the script is complete, then the authentication endpoint is set
    up in the given `          <TOMCAT_HOME>/webapps         ` location.
7.  Uncomment following section in
    `           <TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml          `
    file and point to identity server URLs.

    ``` xml
        …...   
        <context-param>
               <param-name>IdentityManagementEndpointContextURL</param-name>
        <param-value>https://localhost:9443/accountrecoveryendpoint</param-value>
           </context-param>
            <context-param>
               <param-name>AccountRecoveryRESTEndpointURL</param-name>
             <param-value>https://localhost:9443/t/tenant-domain/api/identity/user/v0.9/</param-value>
           </context-param>
        …..
            <context-param>
                <param-name>IdentityServerEndpointContextURL</param-name>
                <param-value>https://localhost:9443</param-value>
            </context-param>
        …...
    ```

8.  Change the following configuration in
    `           <IS_HOME>/repository/conf/identity/application-authentication.xml          `
    file.

    ``` xml
        <AuthenticationEndpointURL>https://localhost:8443/authenticationendpoint/login.do</AuthenticationEndpointURL>
        <AuthenticationEndpointRetryURL>https://localhost:8443/authenticationendpoint/retry.do</AuthenticationEndpointRetryURL>
        <AuthenticationEndpointMissingClaimsURL>https://localhost:8443/authenticationendpoint/claims.do</AuthenticationEndpointMissingClaimsURL>
    ```

9.  Change the following configuration in
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    file to point to the authentication endpoint hosted outside the wso2
    server.

    ``` xml
        ..
        <OpenID>
        ...
        <OpenIDLoginUrl>https://localhost:8443/authenticationendpoint/openid_login.do</OpenIDLoginUrl>
        …
        </OpenID>
        …
        <OAuth>
        ….
        <OAuth2ConsentPage>https://localhost:8443/authenticationendpoint/oauth2_authz.do</OAuth2ConsentPage>
        <OAuth2ErrorPage>https://localhost:8443/authenticationendpoint/oauth2_error.do</OAuth2ErrorPage>
        <OIDCConsentPage>https://localhost:8443/authenticationendpoint/oauth2_consent.do</OIDCConsentPage>
        <OIDCLogoutConsentPage>https://localhost:8443/authenticationendpoint/oauth2_logout_consent.do</OIDCLogoutConsentPage>
        <OIDCLogoutPage>https://localhost:8443/authenticationendpoint/oauth2_logout.do</OIDCLogoutPage>
        ….
        </OAuth>
        ...
        <SSOService>
        ...  <DefaultLogoutEndpoint>https://localhost:8443/authenticationendpoint/samlsso_logout.do</DefaultLogoutEndpoint>
           <NotificationEndpoint>https://localhost:8443/authenticationendpoint/samlsso_notification.do</NotificationEndpoint>
        …
        </SSOService>
        ….
        <PassiveSTS>
        ...
           <RetryURL>https://localhost:8443/authenticationendpoint/retry.do</RetryUR>
        ...
        <PassiveSTS>
        ….
    ```

10. Start both Identity Server and tomcat and access
    `                       https://localhost:9443/dashboard                     `
    . Now you can see that the authentication is redirected to:
    `                       https://localhost:8443/authenticationendpoint/login.do                     `

    Now let’s take out account recovery endpoint into the external
    Tomcat server as well.

11. Run `          setup-accountrecovery.sh         ` obtained from
    [step 2](#HostingAuthenticationEndpointonaDifferentServer-step2) and
    follow the instructions.
12. Change the following section in
    `           <TOMCAT_HOME>/webapps/authenticationendpoint/WEB-INF/web.xml          `
    file and point to
    `           IdentityManagementEndpointContextURL          `
    into tomcat URL.

    ``` xml
        … 
        <context-param>
               <param-name>IdentityManagementEndpointContextURL</param-name>
        <param-value>https://localhost:8443/accountrecoveryendpoint</param-value>
           </context-param>
        …
    ```

13. In
    `           <TOMCAT_HOME>/accountrecoveryendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties          `
    file, uncomment and change it to identity server.

    ``` xml
        identity.server.service.contextURL=https://localhost:9443/services/
    ```

14. Uncomment and change the user portal reference in
    `           <TOMCAT_HOME>/account          `
    `           recovery          `
    `           endpoint/WEB-INF/web.xml          `

    ``` xml
         …
          <context-param>
                <param-name>UserPortalUrl</param-name>
                <param-value>https://localhost:9443/dashboard/index.jag</param-value>
            </context-param>
        ...
    ```
