# Product-Level Security Guidelines for Production Deployment

This section provides the list of product-level security guidelines that are recommended for your production environment.

## Security updates

Apply all the security patches relevant to your WSO2 Identity Server version. For more information, see [here]({{base_path}}/deploy/get-started/get-wso2-updates/)

<!--If your WSO2 Identity Server is listed as a WUM-supported product <a href="http://wso2.com/update/">here</a>, follow the instructions in <a href="https://docs.wso2.com/display/updates/Getting+Started">Getting Started with WUM</a>.</li>-->
        
<!--!!! note

    WSO2 releases security patch notifications monthly via the **Support Portal** and on the [WSO2 Security Patch Releases](http://wso2.com/security-patch-releases) page. 

    -   For highly critical issues, patches are issued immediately to **customers**. 

    -   The WSO2 Security Patch Release page has all the security patches for the latest product versions—WSO2 does not issue patches publicly for older product versions. **Community users** are encouraged to use the latest product version to receive all the security fixes.-->

## Default keystores

Change the default keystores and create new keys for all the cryptographic operations. WSO2 Identity Server by default comes with a self-signed SSL key. Since these keys are public, it is recommended to configure your own keys for security purposes. Consider the following guidelines when creating the keystores.

- Select a key size of at least 2048 bits.

- Use a SHA256 certificate.

- Make sure that WSO2 default certificates do not exist in any of the keystores in your production environment. For example, be sure to delete the default public certificate in the default truststore that is shipped with the product.


!!! info
    For more information, see [Recommendations for using keystores]({{base_path}}/deploy/security/asymmetric-encryption/use-asymmetric-encryption##recommendations-for-setting-up-keystores) and [Create New Keystores]({{base_path}}/deploy/security/asymmetric-encryption/create-new-keystores).

## Passwords in config files

WSO2 Identity Server uses a tool called Secure Vault to encrypt the plain-text passwords in configuration files. For instructions, see [Encrypt Passwords with the Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).

## Default ports

All the default ports that are used by WSO2 Identity Server are listed in [Default Ports of WSO2 Identity Server]({{base_path}}/references/default-ports/), e.g., the default HTTPS port is 9443 and the HTTP port is 9763.
For instructions on changing default ports, see [Change the default port offset]({{base_path}}/references/default-ports#change-the-offset-for-default-ports).

## Access to external systems

### Read-only access

If your WSO2 Identity Server is connecting to an external user store, such as Microsoft Active Directory, for the purpose of reading and retrieving user information, make sure to enable read-only access to that user store. For instructions, see <a href="{{base_path}}/guides/users/user-stores/">Configure Userstores</a>.

### TLS

To ensure adequate network-level protection, all connections from your WSO2 Identity Server to external databases, userstores (LDAP), or other services should be over TLS. Therefore, make sure to use **TLS-enabled external systems**.

### Privileged users

When connecting WSO2 Identity Server to external databases or userstores (LDAP), make sure to go through a user who does not have permission to change the data store's schema.

!!! warning
    As all permissions are generally granted to the root user, do not use the root user of the data store.

## HTTPS security

To have strong transport-level security, use TLS 1.2 and disable SSL, TLS 1.0, and 1.1. 

The TLS protocol and ciphers are configured for an HTTP connector using the `SSLEnabled` element in the `<IS_HOME>/repository/conf/deployment.toml` file. For instructions, refer to [Configure Transport-Level Security]({{base_path}}/deploy/security/configure-transport-level-security).

!!! note
    <ul>
        <li>When deciding on the TLS protocol, consider the compatibility with existing client applications. Imposing maximum security might cause functional problems with client applications.</li>
        <li>Apply ciphers with 256 bits key length if you have applied the Unlimited Strength policy. Note that Unlimited Strength policy is recommended.</li>
        <li>Also, consider the following factors when deciding on the ciphers.
            <ul>
                <li>DES/3DES are deprecated and should not be used.</li>
                <li>MD5 should not be used due to known collision attacks.</li>
                <li>RC4 should not be used due to crypto-analytical attacks.</li>
                <li>DSS is limited to a small 1024-bit key size.</li>
                <li>Cipher-suites that do not provide Perfect Forward Secrecy/ Forward Secrecy (PFS/FS).</li>
                <li> GCM-based ciphers are recommended over CBC ciphers.</li>
            </ul>
        </li>
    </ul>

## HTTP response

When sending HTTP responses, by default, WSO2 Identity Server passes `WSO2 Carbon Server` as the **server value** in HTTP headers. This means that information about WSO2 Identity Server stack will be exposed through HTTP responses. 

It is recommended to change this by configuring the server name in the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory. For instructions, see <a href="{{base_path}}/deploy/security/configure-transport-level-security">Configure Transport Level Security</a>.


## HSTS

For products based on Carbon 4.4.11 or later versions, HTTP Strict Transport Security (HSTS) is disabled for the applications with which WSO2 Identity Server is shipped by default. This is because HSTS validation can interrupt the development processes by validating signatures of self-signed certificates.

Make sure to enable HSTS for all the applications that are deployed in WSO2 Identity Server. This includes the WSO2 Identity Server Console and any other web applications. For instructions, see <a href="{{base_path}}/deploy/security/enable-hsts">Enable HTTP Strict Transport Security (HSTS) Headers</a>.


## Browser cache

If there are dynamic pages in your application with sensitive information, you need to prevent browser caching. This can be done by making sure that the applications deployed in your server will return the relevant HTTP response headers.

!!! tip
    By default, cache prevention headers are enabled for the applications with which the product is shipped by default. Therefore, you need to manually enable cache prevention headers only for all the new applications that you deploy on your server. For instructions, see <a href="{{base_path}}/deploy/security/prevent-browser-caching">Prevent browser caching</a>.


## Ephemeral Diffie-Hellman key size

Before starting the server,

1. Open the product startup script in the `<IS_HOME>/bin` directory.

    === "Linux/Mac OS"
        ``` bash
        wso2server.sh
        ```

    === "Windows"
        ```bash
        wso2server.bat
        ```

2. Add the following with the other Java properties.

    ``` java
    -Djdk.tls.ephemeralDHKeySize=2048 \
    ```

## Client-initiated renegotiation

Before starting the server,

1. Open the product startup script in the `<IS_HOME>/bin` directory.

    === "Linux/Mac OS"
        ``` bash
        wso2server.sh
        ```

    === "Windows"
        ```bash
        wso2server.bat
        ```

2. Add the following with the other Java properties.


    ``` java
    -Djdk.tls.rejectClientInitiatedRenegotiation=true \
    ```

## HostName verification

To enable hostname verification,

1. Open the product startup script in the `<IS_HOME>/bin` directory.

    === "Linux/Mac OS"
        ``` bash
        wso2server.sh
        ```

    === "Windows"
        ```bash
        wso2server.bat
        ```

2. For products with the **Carbon version 4.4.17 or later**, set the `hostnameVerifier` property to `Strict`.

    ```java
    -Dhttpclient.hostnameVerifier=Strict \
    ```

3. For products with the **Carbon version before 4.4.17**, set the `ignoreHostnameVerification` property to `false`.

    ``` java
    -Dorg.wso2.ignoreHostnameVerification=false \
    ```

!!! info
    For more information, see <a href="{{base_path}}/deploy/enable-hostname-verification">Enable HostName Verification</a>.


## XSS protection

By default, XSS attacks are prevented in the latest WSO2 Identity Server versions. This is due to the output encoding of the displaying values.

## JSESSIONID length

If required, increase the session ID length by changing the `sessionIDLength` attribute of the session manager in the `context.xml` file in the `<IS_HOME>/repository/conf/tomcat` directory as shown below. The default value is `16 bytes`.

``` java
<Manager className="org.wso2.carbon.webapp.mgt.CarbonTomcatSessionManager" sessionIdLength="16"></Manager>
```

## Admin credentials

[Update the default password]({{base_path}}/guides/user-self-service/change-password/) of the administrator account. By default, WSO2 Identity Server has the Administrator account configured.

<!-- TODO !!! info
    For more information, see <a href="{{base_path}}/guides/password-mgt/forced-password-reset/">Forced Password Reset</a>. -->

## Access to the Console

The majority of the users only need to sign in to the connected service providers via the WSO2 Identity Server. Such users should not have permission to sign in to the WSO2 Identity Server Console.

Make sure that the permission for signing in to the WSO2 Identity Server Console is granted only to the users that need to use the Console. Instead of granting all permission to one administrator, distribute the responsibilities among multiple administrators by assigning different permissions. <!-- TODO For instructions, see <a href="{{base_path}}/guides/identity-lifecycles/manage-roles-overview/">Manage User Roles</a>.-->

## Log rotation and monitoring

Ensure that you have a relevant log rotation scheme to manage logs. Log4J properties for WSO2 Identity Server can be configured in the `log4j2.properties` file in the `<IS_HOME>/repository/conf` folder.

To roll the `wso2carbon.log` based on the size, use the following configurations.

```java
appender.CARBON_LOGFILE.type = RollingFile
appender.CARBON_LOGFILE.fileName = ${sys:carbon.home}/repository/logs/wso2carbon.log
appender.CARBON_LOGFILE.policies.size.size=10MB
appender.CARBON_LOGFILE.strategy.max = 20
```

!!! info
    For information on configuring logging details, see <a href="{{base_path}}/deploy/monitor/monitor-logs/">Monitor Logs</a>.

## Log forging

Log forging can be prevented by appending a UUID to the log message. 

!!! info
    For more information on configuring the `log4j2.properties` file, see <a href="{{base_path}}/deploy/monitor/monitor-logs/">Monitor Logs</a>.

## JVM parameters

- The recommended JDK versions are JDK 1.8 and 11. For more information, see <a href="{{base_path}}/deploy/get-started/install/#prerequisites">Prerequisites</a>. 

    ```java
    -Xms512m -Xmx2048m 
    ```

- To run the JVM with 2 GB (-Xmx2048m), you should ideally have about 4 GB of memory on the physical machine.

## Mutual SSL

If mutual SSL is enabled, [enable intermediate certificate validation]({{base_path}}/apis/#certificate-based-authentication) as well to make sure that only certificates signed by the issuers mentioned in the **IntermediateCertValidation** configuration are allowed to be used during mutual SSL authentication.

If mutual SSL authentication capabilities are not required, you can disable it. <!--(TODO:{{base_path}}/administer/enabling-mutual-ssl/#enabling-mutual-ssl-in-the-wso2-is)-->

## Configure client authentication

Client authentication is used to identify the application or the client that is making the request.
The web applications provided out of the box use a set of default credentials to authenticate with WSO2 Identity Server REST APIs that are marked as **secure** under the `ResourceAccessControl` tag of the `<IS_HOME>/repository/conf/identity/identity.xml` file.

Follow the steps below to change the default credentials.

1. Shut the server down in case you have already started it.

2. Add the following configuration changes to the `<IS_HOME>/repository/conf/deployment.toml` file.

    - Add the `app_password` property and enter a preferred password as the value.

        ``` toml
        [identity.auth_framework.endpoint] 
        app_password="<value of preferred password>"
        ```  

    - Add the `hash` property and enter the SHA-256 hash value of the `app_password` as the property value.

        ``` toml
        [account_recovery.endpoint.auth]
        hash="<SHA-256 hash of the newly added app_password property value>"
        ```

    - If the `authenticationendpoint` web app is hosted externally, follow the instructions given below.

        a. Open the `EndpointConfig.properties` file found in the root of the `authenticationendpoint` folder.

        b. Change the `app.password` property value to the value-added as `app_password` in the `deployment.toml` file.

        c. Do the same changes to the `EndpointConfig.properties` file located in the `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes` directory.

    - If the `accountrecoveryendpoint` web app is hosted externally, follow the instructions given below.

        a. Open the `RecoveryEndpointConfig.properties` file found in the root of the `accountrecoveryendpoint` folder.

        b. Change the `app.password` property value to the value-added as `app_password` in the `deployment.toml` file.

        c. Do the same changes to the `RecoveryEndpointConfig.properties` file located in the `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes` directory.

3. Once these changes are configured, restart the server.

    - Linux/Unix : `sh wso2server.sh`
    - Windows : `wso2server.bat`

## Callback URL Regular Expressions

For the scenarios listed below, you can define a regular expression to validate the callback URL. The default configuration allows any callback URL. Note that if you are using these scenarios, it is highly recommended to define the regular expression that validates and only allows access to specific callback URLs.

- [Password Recovery]({{base_path}}/guides/account-configurations/account-recovery/password-recovery/)
<!-- TODO - [Username Recovery]({{base_path}}/guides/identity-lifecycles/recover-username/#enable-username-recovery)-->
- [Self User Registration]({{base_path}}/guides/account-configurations/user-onboarding/self-registration/)
<!-- TODO - [Lite User Registration]({{base_path}}/guides/identity-lifecycles/lite-user-registration) -->