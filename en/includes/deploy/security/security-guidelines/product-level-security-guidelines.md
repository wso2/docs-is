# Product-level security guidelines for production deployment

This section provides the list of product-level security guidelines that are recommended for your production environment.

## Security updates

Apply all the security patches relevant to your WSO2 Identity Server version. For more information, see [instructions to get WSO2 updates]({{base_path}}/deploy/get-started/get-wso2-updates/).

## Default keystores

In production, replace the default WSO2 keystores with separate keystores for each purpose (primary signing, internal data encryption, and TLS). The default keystores use publicly known self-signed certificates, making them unsuitable for production deployments.

Follow these guidelines:

- Use three distinct keystores: **primary** (for token signing), **internal** (for encrypting configuration passwords), and **TLS** (for HTTPS connections).

- Select a key size of at least 2048 bits.

- Use a SHA256 certificate.

{% if is_version != "7.0.0" %}
- For the internal keystore, use a **symmetric AES key** (PKCS12 format) for resilience against post-quantum threats.
{% endif %}

- For the TLS keystore, use a CA-signed certificate.

- Remove the default `wso2carbon` certificate from the truststore in production.

- Change the default truststore password from `wso2carbon` (which is publicly known).

!!! info
    For more information, see [Recommendations for setting up keystores]({{base_path}}/deploy/security/keystores/#recommendations-for-setting-up-keystores), [Create New Keystores]({{base_path}}/deploy/security/keystores/create-new-keystores), and [Configure Keystores]({{base_path}}/deploy/security/keystores/configure-keystores).

## Passwords in configuration files

WSO2 Identity Server uses a tool called Secure Vault to encrypt the plain-text passwords in configuration files. For instructions, see [Encrypt Passwords with the Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).

## Default ports

All the default ports that are used by WSO2 Identity Server are listed in [Default Ports of WSO2 Identity Server]({{base_path}}/references/default-ports/), e.g., the default HTTPS port is 9443 and the HTTP port is 9763.
For instructions on changing default ports, see [Change the default port offset]({{base_path}}/references/default-ports#change-the-offset-for-default-ports).

## Access to external systems

### Read-only access
If your WSO2 Identity Server connects to an external user store, such as Microsoft Active Directory, to read and retrieve user information, enable read-only access to that user store. For instructions, see [Configure Userstores]({{base_path}}/guides/users/user-stores/).

### TLS

To ensure adequate network-level protection, all connections from your WSO2 Identity Server to external databases, userstores (LDAP), or other services should be over TLS. Therefore, make sure to use **TLS-enabled external systems**.

### Privileged users

When connecting WSO2 Identity Server to external databases or userstores (LDAP), make sure to go through a user who does not have permission to change the data store's schema.

!!! warning
    As all permissions are generally granted to the root user, do not use the root user of the data store.

## HTTPS security

To have strong transport-level security, use **TLS 1.3** (recommended) or at minimum **TLS 1.2**, and disable SSL, TLS 1.0, and 1.1.

The TLS protocol and ciphers are configured in the `<IS_HOME>/repository/conf/deployment.toml` file. For instructions, refer to [Configure Transport-Level Security]({{base_path}}/deploy/security/configure-transport-level-security).

**Cipher suite recommendations:**

- Use only ciphers with **256-bit key length** (or 128-bit minimum) from authenticated and forward-secret algorithms.
- Prefer **GCM-based ciphers** over CBC ciphers (e.g., `TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384`, `TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384`).
- Ensure ciphers support **Perfect Forward Secrecy (PFS)** using ECDHE or DHE.
- **Avoid** weak or deprecated algorithms: DES/3DES, MD5, SHA1.

!!! tip
    For an up-to-date list of secure cipher suites compatible with Tomcat and modern browsers, use the [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/#server=tomcat&version=9.0.58&config=intermediate&guideline=5.6).

!!! note
    When deciding on TLS protocol and ciphers, consider compatibility with existing client applications. Imposing maximum security might cause functional problems with older clients.

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


## Client-initiated renegotiation

Before starting the server,

1. Open the product startup script in the `<IS_HOME>/bin` directory.

    === "Linux/macOS"
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

    === "Linux/macOS"
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

## Access the Console

The majority of the users only need to sign in to the connected service providers via the WSO2 Identity Server. Such users should not have permission to sign in to the WSO2 Identity Server Console.

Make sure that the permission for signing in to the WSO2 Identity Server Console is granted only to the users that need to use the Console. Instead of granting all permission to one administrator, distribute the responsibilities among multiple administrators by assigning different permissions. <!-- TODO For instructions, see <a href="{{base_path}}/guides/identity-lifecycles/manage-roles-overview/">Manage User Roles</a>.-->

## Invoke APIs

Do not use the super admin or any high-privileged user credentials when invoking WSO2 Identity Server REST APIs. Instead, create a user with the least privileges required to invoke the API and use that user's credentials.

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

{% if is_version > "7.2.0" %}
- The recommended JDK version is JDK 21. For more information, see <a href="{{base_path}}/deploy/get-started/install/#prerequisites">Prerequisites</a>.
{% else %}
- The recommended JDK versions are JDK 11 and 17. For more information, see <a href="{{base_path}}/deploy/get-started/install/#prerequisites">Prerequisites</a>.
{% endif %}

- To run the JVM with 2 GB (-Xmx2048m), you should ideally have about 4 GB of memory on the physical machine.
    ```java
    -Xms512m -Xmx2048m 
    ```

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

## WebappAdmin service

The `WebappAdmin` SOAP service allows users with administrative privileges to upload web applications (WAR files) and deploy them to the server's webapps directory, making them accessible over the internet. This service is disabled by default.

!!! warning "Security risk when enabling WebappAdmin"
    Enabling the `WebappAdmin` service carries security risk. Once enabled, any user with administrative privileges can deploy arbitrary web applications to the server. A malicious administrator could exploit this to upload a harmful web application.

## Prevent accepting sensitive data as query parameters in API requests

{% if is_version != "7.0.0" %}

{{product_name}} rejects `username`, `password`, and `client_secret` parameters passed in the request URL query string. This enforcement applies to token endpoints and other relevant APIs, preventing this sensitive data from appearing in server access logs.

You can override this default behavior and configure a custom list of parameters that {{product_name}} rejects when clients send them as query parameters.  To do so, open the `<IS_HOME>/repository/conf/deployment.toml` file and under `[oauth]`, configure the `restricted_query_parameters` property.

For example, the following configuration prevents requests that include `client_secret` as a query parameter and allows all other parameters.
```
[oauth]
restricted_query_parameters=["client_secret"]
```

{% else %}

By default, {{product_name}} accepts sensitive user credentials (such as `username`, `password`, `client_secret`) as form parameters in the request body when calling token endpoints. However, a misconfigured application can send these sensitive parameters as part of the URL's query string and expose this data in server access logs.

To mitigate this security risk, you can configure {{product_name}} to reject requests that contain sensitive data in query parameters of specific endpoints. To do so, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

```
[request_parameters]
allow_sensitive_data_in_url=false
```

When set to `false`, the server will reject requests with sensitive data with an HTTP 400 Bad Request error.

!!! info

    This feature is available from **7.0.0.50** onwards. See the instructions on [updating WSO2 products](https://updates.docs.wso2.com/en/latest/). It is recommended to apply this configuration as part of your secure production deployment.

{% endif %}