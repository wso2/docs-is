# Product-Level Security Guidelines for Production Deployment

This section provides the list of product-level security guidelines that are recommended for your production environment.

## Security updates

Apply all the security patches relevant to your WSO2 Identity Server version. 

If your WSO2 Identity Server product version is supported by WSO2 Update Manager (WUM), you need to use WUM to get the latest fixes.
    <ul>
        <li>If your WSO2 Identity Server is listed as a WUM-supported product <a href="http://wso2.com/update/">here</a>, follow the instructions in <a href="https://docs.wso2.com/display/updates/Getting+Started">Getting Started with WUM</a>.</li>
        <li><p>If you are using an older WSO2 Identity Server version that is not WUM-supported, download the security patches that are relevant to your version from the <a href="http://wso2.com/security-patch-releases/">WSO2 Security Patch Release</a> page and manually apply them to your system. For instructions, see <a href="../../administer/wso2-patch-application-process">WSO2 Patch Application Process</a>.</p></li>
    </ul>

!!! note

    WSO2 releases security patch notifications monthly via the **Support Portal** and on the **[WSO2 Security Patch Releases](http://wso2.com/security-patch-releases)** page. 

    -   For highly critical issues, patches are issued immediately to **customers**. 

    -   The WSO2 Security Patch Release page has all the security patches for the latest product versions—WSO2 does not issue patches publicly for older product versions. **Community users** are encouraged to use the latest product version to receive all the security fixes.

 
## Default keystores

Change the default key stores and create new keys for all the cryptographic operations. WSO2 products by default come with a self-signed SSL key. Since these keys are public, it is recommended to configure your own keys for security purposes. Consider the following guidelines when creating the keystores:

-   Select a key size of at least 2048 bits.

-   Use an SHA256 certificate.

-   Make sure that WSO2 default certificates do not exist in any of the keystores in your production environment. For example, be sure to delete the default public certificate in the default trust store that is shipped with the product.


!!! info

    For more information, see [Recommendations for using keystores](../../administer/using-asymmetric-encryption#recommendations-for-setting-up-keystores-in-wso2-products) and [Creating New Keystores](../../administer/creating-new-keystores).


## Passwords in config files

WSO2 Identity Server uses a tool called Secure Vault to encrypt the plain-text passwords in configuration files. For instructions, see [Securing Passwords in Configuration Files](../../setup/encrypting-passwords-with-cipher-tool).


## Default ports

All the default ports that are used by WSO2 Identity Server are listed in <a href="../../references/default-ports-of-wso2-products">Default Ports of WSO2 Identity Server</a>, e.g., the default HTTPS port is 9443 and the HTTP port is 9763. For instructions on changing default ports, see <a href="../../references/default-ports-of-wso2-products#changing-the-default-port-offset">Changing the default port offset</a>.

## Access to external systems

### Read-only access

If your WSO2 Identity Server is connecting to an external user store, such as Microsoft Active Directory, for the purpose of reading and retrieving user information, make sure to enable read-only access to that user store. For instructions, see <a href="../../setup/configuring-user-stores">Configuring User Stores</a>.

### TLS

To ensure adequate network-level protection, all connections from your WSO2 Identity Server to external databases, userstores (LDAP), or other services should be over TLS. Therefore, make sure to use **TLS-enabled external systems**.

### Priviledged users

When connecting WSO2 Identity Server to external databases or user stores (LDAP), make sure to go through a user who does not have permission to change the data store's schema.

!!! warning

    As all permissions are generally granted to the root user, do NOT use the root user of the data store.

## HTTPS security

To have strong transport-level security, use TLS 1.2 and disable SSL, TLS 1.0, and 1.1. 

The TLS protocol and ciphers are configured for an HTTP connector using the `SSLEnabled` element in the `deployment.toml` file in the `<IS_HOME>/repository/conf/` directory. For instructions, see <a href="../../setup/configuring-transport-level-security">Configuring Transport-Level Security</a>. 

!!! note 
    <ul>
        <li>When deciding on the TLS protocol, consider the compatibility with existing client applications. Imposing maximum security might cause functional problems with client applications.</li>
        <li>Apply ciphers with 256 bits key length if you have applied the Unlimited strength policy. Note that Unlimited strength policy is recommended.</li>
        <li>Also, consider the following factors when deciding on the ciphers:
            <ul>
                <li>DES/3DES are deprecated and should not be used.</li>
                <li>MD5 should not be used, due to known collision attacks.</li>
                <li>RC4 should not be used, due to crypto-analytical attacks.</li>
                <li>DSS is limited to a small 1024 bit key size.</li>
                <li>Cipher-suites that do not provide Perfect Forward Secrecy/ Forward Secrecy (PFS/FS).</li>
                <li>GCM based ciphers are recommended over CBC ciphers.</li>
            </ul>
        </li>
    </ul>

## HTTP response

When sending HTTP responses, by default, WSO2 Identity Server passes `WSO2 Carbon Server` as the **server value** in HTTP headers. This means that information about WSO2 Identity Server stack will be exposed through HTTP responses. 

It is recommended to change this by configuring the server name in the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory. For instructions, see <a href="../../setup/configuring-transport-level-security">Configuring Transport Level Security</a>.

## HSTS

For products based on Carbon 4.4.11 or later versions, HTTP Strict Transport Security (HSTS) is disabled for the applications with which WSO2 Identity Server is shipped by default. This is because HSTS validation can interrupt the development processes by validating signatures of self-signed certificates.


Make sure to enable  (HSTS) for all the applications that are deployed in your WSO2 Identity Server. This includes Management Console and any other web applications. For instructions, see <a href="../../administer/enabling-hsts">Enabling HTTP Strict Transport Security (HSTS) Headers</a>.


## Browser cache

If there are dynamic pages in your application with sensitive information, you need to prevent browser caching. This can be done by making sure that the applications deployed in your server will return the relevant HTTP response headers.

!!! tip 

    By default, cache prevention headers are enabled for the applications with which the product is shipped by default. Therefore, you need to manually enable cache prevention headers only for all the new applications that you deploy in your server. For instructions, see <a href="../../setup/preventing-browser-caching">Preventing browser caching</a>. 


## Ephemeral Diffie-Hellman Key size

Before starting the server: 

1. Open the product startup script in the `<IS_HOME>/bin` directory.

    ``` bash tab="Linux/Mac OS"
    wso2server.sh
    ```

    ```bash tab="Windows"
    wso2server.bat
    ```

2. Add the following with the other Java properties.

    ``` java
    -Djdk.tls.ephemeralDHKeySize=2048 \
    ```

## Client-initiated renegotiation

Before starting the server:

1. Open the product startup script in the `<IS_HOME>/bin` directory.

    ``` bash tab="Linux/Mac OS"
    wso2server.sh
    ```

    ```bash tab="Windows"
    wso2server.bat
    ```

2. Add the following with the other Java properties.


    ``` java 
    -Djdk.tls.rejectClientInitiatedRenegotiation=true \
    ```
                <div class="code panel pdl" style="border-width: 1px;">
                <div class="codeContent panelContent pdl">
                <div class="sourceCode" id="cb2" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb2-1" title="1">-Djdk.<span class="fu">tls</span>.<span class="fu">rejectClientInitiatedRenegotiation</span>=<span class="kw">true</span> \</a></code></pre></div>
                </div>
                </div>  


## HostName verification


To enable hostname verification: 


1. Open the product startup script in the `<IS_HOME>/bin` directory.

    ``` bash tab="Linux/Mac OS"
    wso2server.sh
    ```

    ```bash tab="Windows"
    wso2server.bat
    ```

2. For products with the **Carbon version 4.4.17 or later**, set the `hostnameVerifier` property to `Strict`.

    ```java 
    -Dhttpclient.hostnameVerifier=Strict \
    ``` 

3. For products with the **Carbon version prior to 4.4.17**, set the `ignoreHostnameVerification` property to `false`.

    ``` java
    -Dorg.wso2.ignoreHostnameVerification=false \
    ```

!!! info 

    For more information, see <a href="../../administer/enabling-hostname-verification">Enabling HostName Verification</a>.

## XSS protection

By default, XSS attacks are prevented in the latest WSO2 Identity Server versions. This is due to output encoding of the displaying values. 


## JSESSIONID length

If required, increase the `session ID length` by changing the `sessionIDLength` attribute of the session manager in the `context.xml` file in the `<IS_HOME>/repository/conf/tomcat` directory as shown below. The default value is `16 bytes`.

``` java
<Manager className="org.wso2.carbon.webapp.mgt.CarbonTomcatSessionManager" sessionIdLength="16"></Manager>
```

## Admin credentials

By default, WSO2 Identity Server has the Administrator account configured. The default user name and password of the administrator account are `admin`. 

To change the administrator credentials:

1. Sign in to the Management Console with the admin credentials.

2. Under the **Main** menu, click **Configure > Identity > User and Roles > Users**.

3. Click **List**.

4. Click **Change Password** option that is relevant to the admin user and change the password.

!!! info

    For more informatoin, see <a href="../../learn/changing-a-password">Changing a Password</a>.


## Access to Management Console


Majority of the users only need to sign in to the connected service providers via WSO2 Identity Server. Such users should not have permissions to sign in to the Management Console.

Make sure that the permission for signing in to the Management Console is granted only to the users that need to use the Management Console. Instead of granting all permission to one administrator, distribute the responsibilities among multiple administrators by assigning different permissions. For instructions, see <a href="../../learn/configuring-users-roles-and-permissions">Configuring Users, Roles and Permissions</a>.

## Log rotation and monitoring

Ensure that you have a relevant log rotation scheme to manage logs. Log4J properties for WSO2 Identity Server can be configured in the `log4j.properties` file in the `<IS_HOME>/repository/conf` file. 

To roll the `wso2carbon.log` based on the size, use the following configurations:

```java 
log4j.appender.CARBON_LOGFILE=org.apache.log4j.RollingFileAppender
log4j.appender.CARBON_LOGFILE=${carbon.home}/repository/logs/${instance.log}/wso2carbon${instance.log}.log
log4j.appender.CARBON_LOGFILE.MaxFileSize=1000KB
log4j.appender.CARBON_LOGFILE.MaxBackupIndex=10
```

!!! info 

    For information on configuring logging details, see <a href="../../setup/monitoring-logs/">Monitoring Logs</a>.


## Log forging

Log forging can be prevented by appending a UUID to the log message. 

!!! info

    For more information on configuring the `log4j.properties` file, see <a href="../../setup/monitoring-logs/">Monitoring Logs</a>.


## JVM parameters

- The recommended JDK versions are JDK 1.8 and 11. For more information, see <a href="../../setup/installation-prerequisites">installation pre-requisites</a>. 

    ```java  tab="Example" 
    -Xms512m -Xmx2048m 
    ```

- To run the JVM with 2 GB (-Xmx2048m), you should ideally have about 4 GB of memory on the physical machine. 

## Mutual SSL

If mutual SSL is enabled, [enable intermediate certificate validation](../../develop/authenticating-and-authorizing-rest-apis/#configure-intermediate-certificate-validation) as well to make sure that only certificates signed by the issuers mentioned in the **IntermediateCertValidation** configuration are allowed to be used during mutual SSL authentication.

If mutual SSL authentication capabilities are not required, you can [disable it](../../administer/enabling-mutual-ssl/#enabling-mutual-ssl-in-the-wso2-is).

## Configuring client authentication

Client authentication is used to identify the application or the client that is making the request. 
The web applications provided out-of-the-box use a set of default credentials to authenticate with WSO2 Identity Server REST APIs that are marked as **secure** under the 'ResourceAccessControl' tag of the the`<IS_HOME>/repository/conf/identity/identity.xml` file. 

Follow the steps below to change the default credentials.

1.  Shut the server down in case you have already started it. 

2.  Add the following configuration changes to the `<IS_HOME>/repository/conf/deployment.toml` file.
    
    -   Add the `app_password` property and enter a preferred password as the value.
      
        ``` toml
        [identity.auth_framework.endpoint] 
        app_password="<value of preferred password>"
        ```  
        
    -   Add the `hash` property and enter the SHA-256 hash value of the `app_password` as the property value.

        ``` toml
        [account_recovery.endpoint.auth]
        hash="<SHA-256 hash of the newly added app_password property value>"
        ``` 
        
    - If the `authenticationendpoint` web app is hosted externally, do the following:

            a.  Open the `EndpointConfig.properties` file found in the root of the `authenticationendpoint` folder. 

            b.   Change the `app.password` property value to the value added as `app_password` in the `deployment.toml` file. 

            c.   Do the same changes to the `EndpointConfig.properties` file located in the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes` directory.

    - If the `accountrecoveryendpoint` web app is hosted externally, do the following:

            a.   Open the `RecoveryEndpointConfig. properties` file found in the root of the `accountrecoveryendpoint` folder. 

            b.   Change the `app.password` property value to the value added as `app_password` in the `deployment.toml` file. 

            c.   Do the same changes to the `RecoveryEndpointConfig.properties` file located in the `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes` directory.
    
3.  Once these changes are configured, restart the server with,
    
    - Linux/Unix : sh wso2server.sh
    - Windows : wso2server.bat
