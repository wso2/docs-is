# Enable HTTP Strict Transport Security (HSTS) headers

Enable HTTP Strict Transport Security (HSTS) headers for the applications deployed in your server, to confirm that the relevant headers are present in the HTTP response. HSTS is not enabled for applications in the WSO2 Identity Server by default.

!!! note
    HSTS should not be enabled in development environments because transport security validations can interrupt the development processes by validating signatures of self-signed certificates.

## Enable for web applications

If the `HttpHeaderSecurityFilter` element is available in the `web.xml` file of the particular web application available at `<IS_HOME>/repository/deployment/server/webapps/` directory, it implies that security headers are by default configured for the web application. If the filter is available, enable HSTS as shown below.

Following is the default filter configuration.

```
<!-- Tomcat http header security filter -->

<filter>
    <filter-name>HttpHeaderSecurityFilter</filter-name>
    <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class>
    <init-param>
        <param-name>hstsEnabled</param-name>
        <param-value>true</param-value>
    </init-param>
    <init-param>
        <param-name>hstsMaxAgeSeconds</param-name>
        <param-value>15768000</param-value>
    </init-param>
</filter>
```

For the `accountrecoveryendpoint` and `authenticationendpoint` web applications, direct modification of the `web.xml` file to enable HSTS is not supported. Instead, configure the settings through the `deployment.toml` file located in `<IS_HOME>/repository/conf` directory. Example configurations are as follows:

For `accountrecoveryendpoint`:

```toml
[[accountrecoveryendpoint.tomcat.http_header_security_filter.parameters]]
name = "param-name"
value = "param-value"
```

For `authenticationendpoint`:

```toml
[[authenticationendpoint.tomcat.http_header_security_filter.parameters]]
name = "param-name"
value = "param-value"
```

## Enable for console

To enable HSTS for the WSO2 Identity Server Console, configure the web.xml file of the console application located at <IS_HOME>/repository/deployment/server/webapps/console/WEB-INF directory as shown:

```
<!-- Tomcat http header security filter -->

<filter>
    <filter-name>HttpHeaderSecurityFilter</filter-name>
    <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class>
    <init-param>
        <param-name>hstsEnabled</param-name>
        <param-value>true</param-value>
    </init-param>
    <init-param>
        <param-name>hstsMaxAgeSeconds</param-name>
        <param-value>15768000</param-value>
    </init-param>
</filter>
```

## Additional configurations

You may configure the following additional parameters in the `web.xml` file to further customize the HSTS settings:

<table>
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Default value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>hstsEnabled</code></td>
            <td>Set the HSTS header (Strict-Transport-Security) to the response.</td>
            <td><code>true</code></td>
        </tr>
        <tr>
            <td><code>hstsMaxAgeSeconds</code></td>
            <td>Max age value that should be used in the HSTS header.</td>
            <td><code>0</code></td>
        </tr>
        <tr>
            <td><code>hstsIncludeSubDomains</code></td>
            <td>Set the includeSubDomains parameter in the HSTS header.</td>
            <td><code>false</code></td>
        </tr>
        <tr>
            <td><code>hstsPreload</code></td>
            <td>Set the preload parameter in the HSTS header.</td>
            <td><code>false</code></td>
        </tr>
        <tr>
            <td><code>antiClickJackingEnabled</code></td>
            <td>Set the anticlick-jacking header (X-Frame-Options) to the response.</td>
            <td><code>true</code></td>
        </tr>
        <tr>
            <td><code>antiClickJackingOption</code></td>
            <td>Anticlick-jacking header value. Must be one of DENY, SAMEORIGIN, ALLOW-FROM</td>
            <td><code>DENY</code></td>
        </tr>
        <tr>
            <td><code>antiClickJackingUri</code></td>
            <td>Allowed URI for anticlick-jacking. Applicable only when ALLOW-FROM is used for antiClickJackingOption.</td>
            <td><code>Empty string</code></td>
        </tr>
        <tr>
            <td><code>blockContentTypeSniffingEnabled</code></td>
            <td>Set the content type sniffing block header (X-Content-Type-Options) to the response.</td>
            <td><code>true</code></td>
        </tr>
        <tr>
            <td><code>xssProtectionEnabled</code></td>
            <td>Set the browser cross-site scripting filter protection header (X-XSS-Protection: 1; mode=block) to the response.<br>Note: This setting is deprecated in tomcat.</td>
            <td><code>false</code></td>
        </tr>
    </tbody>
</table>

Additionally, the following configuration can be used to configure the applicable URL format of the HSTS filter. By default, all the URLs of the web application are allowed for the filter.

```xml
<filter-mapping>
    <filter-name>HttpHeaderSecurityFilter</filter-name>
    <url-pattern>*</url-pattern>
</filter-mapping>
```

For `accountrecoveryendpoint`:

```toml
[accountrecoveryendpoint.tomcat.http_header_security_filter]
url_pattern = "*"
```

For `authenticationendpoint`:

```toml
[authenticationendpoint.tomcat.http_header_security_filter]
url_pattern = "*"
```

!!! note
    Configuring HTTP security headers can also be achieved through the `Proxy/LB` configuration, providing an alternative approach for environments where modifying individual application configurations is not preferred.