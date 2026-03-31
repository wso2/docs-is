# Product-level security guidelines for production deployment

This section provides the list of product-level security guidelines that are recommended for your production environment.

## Security updates

Apply all the security patches relevant to your WSO2 Identity Server version. For more information, see [instructions to get WSO2 updates]({{base_path}}/deploy/get-started/get-wso2-updates/).

## Server configuration

### Keystores

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

### Passwords in configuration files

WSO2 Identity Server uses a tool called Secure Vault to encrypt the plain-text passwords in configuration files. For instructions, see [Encrypt Passwords with the Cipher Tool]({{base_path}}/deploy/security/encrypt-passwords-with-cipher-tool).

### Default ports

All the default ports that are used by WSO2 Identity Server are listed in [Default Ports of WSO2 Identity Server]({{base_path}}/references/default-ports/), e.g., the default HTTPS port is 9443 and the HTTP port is 9763.
For instructions on changing default ports, see [Change the default port offset]({{base_path}}/references/default-ports#change-the-offset-for-default-ports).

## Network and transport security

### TLS protocol and cipher suites

To have strong transport-level security, use **TLS 1.3** (recommended) or at minimum **TLS 1.2**, and disable SSL, TLS 1.0, and 1.1.

{% if is_version > "7.2.0" %}
A set of secure cipher suites is enabled by default. If you need to customize them, use the [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/#server=tomcat&version=9.0.58&config=intermediate&guideline=5.6) to select a suitable list for your environment.
{% else %}
Use the [Mozilla SSL Configuration Generator](https://ssl-config.mozilla.org/#server=tomcat&version=9.0.58&config=intermediate&guideline=5.6) to get an up-to-date list of recommended cipher suites for Tomcat.
{% endif %}

!!! note
    When deciding on TLS protocol and ciphers, consider compatibility with existing client applications. Imposing maximum security might cause functional problems with older clients.

For configuration instructions, see [Configure Transport-Level Security]({{base_path}}/deploy/security/configure-transport-level-security).

### HTTP response headers

When sending HTTP responses, by default, WSO2 Identity Server passes `WSO2 Carbon Server` as the **server value** in HTTP headers. This exposes information about the WSO2 Identity Server stack.

It is recommended to change this by configuring the server name. For instructions, see [Configure Transport Level Security]({{base_path}}/deploy/security/configure-transport-level-security).

### HTTP Strict Transport Security (HSTS)

HSTS is disabled by default to avoid interrupting development workflows that rely on self-signed certificates.

Make sure to enable HSTS for all the applications that are deployed in WSO2 Identity Server. This includes the WSO2 Identity Server Console and any other web applications. For instructions, see [Enable HTTP Strict Transport Security (HSTS) Headers]({{base_path}}/deploy/security/enable-hsts).

### Browser cache

If there are dynamic pages in your application with sensitive information, you need to prevent browser caching. This can be done by making sure that the applications deployed in your server will return the relevant HTTP response headers.

!!! tip
    By default, cache prevention headers are enabled for the applications shipped with the product. You need to manually enable cache prevention headers only for new applications you deploy on your server. For instructions, see [Prevent browser caching]({{base_path}}/deploy/security/prevent-browser-caching).

### Client-initiated renegotiation

Disable client-initiated TLS renegotiation to prevent denial-of-service attacks that exploit the high asymmetry of renegotiation costs.

Before starting the server, open the product startup script in the `<IS_HOME>/bin` directory and add the following JVM property:

=== "Linux/macOS"
    ``` bash
    wso2server.sh
    ```

=== "Windows"
    ```bash
    wso2server.bat
    ```

``` java
-Djdk.tls.rejectClientInitiatedRenegotiation=true \
```

### Hostname verification

Enable strict hostname verification to ensure the server validates the hostname in TLS certificates against the target host. This is configured as a JVM startup property.

For instructions, see [Enable HostName Verification]({{base_path}}/deploy/enable-hostname-verification).

## External system connections

### Read-only access

If your WSO2 Identity Server connects to an external user store, such as Microsoft Active Directory, to read and retrieve user information, enable read-only access to that user store. For instructions, see [Configure Userstores]({{base_path}}/guides/users/user-stores/).

### TLS

To ensure adequate network-level protection, all connections from your WSO2 Identity Server to external databases, userstores (LDAP), or other services should be over TLS. Therefore, make sure to use **TLS-enabled external systems**.

### Privileged users

When connecting WSO2 Identity Server to external databases or userstores (LDAP), make sure to go through a user who does not have permission to change the data store's schema.

!!! warning
    As all permissions are generally granted to the root user, do not use the root user of the data store.

## Access control

### Admin credentials

[Update the default password]({{base_path}}/guides/user-self-service/change-password/) of the administrator account. By default, WSO2 Identity Server has the Administrator account configured.

<!-- TODO !!! info
    For more information, see <a href="{{base_path}}/guides/password-mgt/forced-password-reset/">Forced Password Reset</a>. -->

### Console access

The majority of users only need to sign in to connected service providers via WSO2 Identity Server. Such users should not have permission to sign in to the WSO2 Identity Server Console.

Make sure that the permission for signing in to the WSO2 Identity Server Console is granted only to users that need to use the Console. Instead of granting all permissions to one administrator, distribute the responsibilities among multiple administrators by assigning different permissions. For instructions, see [Manage User Roles]({{base_path}}/guides/users/manage-roles/).

### API invocation

Do not use the super admin or any high-privileged user credentials when invoking WSO2 Identity Server REST APIs. Instead, create a user with the least privileges required to invoke the API and use that user's credentials.

### Client authentication

Client authentication is used to identify the application or the client that is making the request. The web applications provided out of the box use a set of default credentials to authenticate with WSO2 Identity Server REST APIs that are marked as **secure** under the `ResourceAccessControl` tag of the `<IS_HOME>/repository/conf/identity/identity.xml` file.

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

    - If the `authenticationendpoint` web app is hosted externally, open the `EndpointConfig.properties` file in the root of the `authenticationendpoint` folder and update the `app.password` property. Repeat for `<IS_HOME>/repository/deployment/server/webapps/authenticationendpoint/WEB-INF/classes/EndpointConfig.properties`.

    - If the `accountrecoveryendpoint` web app is hosted externally, open the `RecoveryEndpointConfig.properties` file in the root of the `accountrecoveryendpoint` folder and update the `app.password` property. Repeat for `<IS_HOME>/repository/deployment/server/webapps/accountrecoveryendpoint/WEB-INF/classes/RecoveryEndpointConfig.properties`.

3. Restart the server.

### Mutual SSL

If mutual SSL is enabled, [enable intermediate certificate validation]({{base_path}}/apis/#certificate-based-authentication) as well to make sure that only certificates signed by the issuers mentioned in the **IntermediateCertValidation** configuration are allowed to be used during mutual SSL authentication. For instructions on enabling mutual SSL, see [Enable Mutual SSL]({{base_path}}/deploy/security/enable-mutual-ssl/).

If mutual SSL authentication capabilities are not required, you can disable it.

## Application security

### XSS protection

By default, XSS attacks are prevented in the latest WSO2 Identity Server versions. This is due to the output encoding of the displaying values.

### Session ID length

If required, increase the session ID length to reduce the risk of session ID prediction. The default value is 16 bytes. To change it, update the `sessionIdLength` attribute of the session manager in `<IS_HOME>/repository/conf/tomcat/context.xml`:

``` xml
<Manager className="org.wso2.carbon.webapp.mgt.CarbonTomcatSessionManager" sessionIdLength="16"></Manager>
```

### Callback URL validation

For the scenarios listed below, you can define a regular expression to validate the callback URL. The default configuration allows any callback URL. Note that if you are using these scenarios, it is highly recommended to define the regular expression that validates and only allows access to specific callback URLs.

- [Password Recovery]({{base_path}}/guides/account-configurations/account-recovery/password-recovery/)
<!-- TODO - [Username Recovery]({{base_path}}/guides/identity-lifecycles/recover-username/#enable-username-recovery)-->
- [Self User Registration]({{base_path}}/guides/account-configurations/user-onboarding/self-registration/)
<!-- TODO - [Lite User Registration]({{base_path}}/guides/identity-lifecycles/lite-user-registration) -->

### Sensitive data in query parameters

{% if is_version != "7.0.0" %}

{{product_name}} rejects `username`, `password`, and `client_secret` parameters passed in the request URL query string. This enforcement applies to token endpoints and other relevant APIs, preventing this sensitive data from appearing in server access logs.

You can override this default behavior and configure a custom list of parameters that {{product_name}} rejects when clients send them as query parameters. To do so, open the `<IS_HOME>/repository/conf/deployment.toml` file and under `[oauth]`, configure the `restricted_query_parameters` property.

For example, the following configuration prevents requests that include `client_secret` as a query parameter and allows all other parameters.

```toml
[oauth]
restricted_query_parameters=["client_secret"]
```

{% else %}

By default, {{product_name}} accepts sensitive user credentials (such as `username`, `password`, `client_secret`) as form parameters in the request body when calling token endpoints. However, a misconfigured application can send these sensitive parameters as part of the URL's query string and expose this data in server access logs.

To mitigate this security risk, configure {{product_name}} to reject requests that contain sensitive data in query parameters. To do so, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

```toml
[request_parameters]
allow_sensitive_data_in_url=false
```

When set to `false`, the server will reject such requests with an HTTP 400 Bad Request error.

!!! info

    This feature is available from **7.0.0.50** onwards. See the instructions on [updating WSO2 products](https://updates.docs.wso2.com/en/latest/). It is recommended to apply this configuration as part of your secure production deployment.

{% endif %}

## Logging and monitoring

### Log rotation

Ensure that you have a relevant log rotation scheme to manage logs. For information on configuring logging and log rotation, see [Monitor Logs]({{base_path}}/deploy/monitor/monitor-logs/).

### Log forging

Log forging can be prevented by appending a UUID to the log message. For more information on configuring the log4j2 properties, see [Monitor Logs]({{base_path}}/deploy/monitor/monitor-logs/).
