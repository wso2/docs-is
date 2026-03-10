# Enable HTTP Strict Transport Security (HSTS) Headers

Enable HTTP Strict Transport Security (HSTS) headers for the applications deployed in your server, to confirm that the relevant headers are present in the HTTP response. HSTS is not enabled for applications in the WSO2 Identity Server by default.

!!! note
    HSTS should not be enabled in development environments because transport security validations can interrupt the development processes by validating signatures of self-signed certificates.

## Enable for console

To enable HSTS for the WSO2 Identity Server Console, update the `web.xml` file located at
`<IS_HOME>/repository/deployment/server/webapps/console/WEB-INF` and add the following filter configuration:

```xml
<!-- Tomcat HTTP header security filter -->
<filter>
    <filter-name>HttpHeaderSecurityFilter</filter-name>
    <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class>
    <init-param>
        <param-name>hstsMaxAgeSeconds</param-name>
        <param-value>15768000</param-value>
    </init-param>
</filter>

<filter-mapping>
    <filter-name>HttpHeaderSecurityFilter</filter-name>
    <url-pattern>*</url-pattern>
</filter-mapping>
```

This configuration explicitly enables HSTS for the Console application.

## Enable for other web applications

To enable HSTS for other web applications deployed in WSO2 Identity Server, update the respective `web.xml` file under
`<IS_HOME>/repository/deployment/server/webapps/<WEBAPP_NAME>/WEB-INF`.

Add the same filter configuration used for the Console:

```xml
<filter>
    <filter-name>HttpHeaderSecurityFilter</filter-name>        
    <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class>
    <init-param>
        <param-name>hstsMaxAgeSeconds</param-name>
        <param-value>15768000</param-value>
    </init-param>
</filter>

<filter-mapping>     
    <filter-name>HttpHeaderSecurityFilter</filter-name>     
    <url-pattern>*</url-pattern>
</filter-mapping>
```

This configuration applies HSTS consistently across specified web applications running on WSO2 Identity Server.

<!--## Enable for Jaggery applications

For Jaggery applications, the `HttpHeaderSecurityFilter` element should be configured in the `<IS_HOME>/repository/deployment/server/jaggeryapps/jaggery.conf` file. This filter configuration is applicable to the /dashboard jaggery applications in this location.

To enable HSTS for a Jaggery application, change the default filter configuration as shown below.

Given below is the default filter configuration.

```
"params" : [{"name" : "hstsEnabled", "value" : "false"}]
```

This is the filter configuration after enabling HSTS.

```
"params" : [{"name" : "hstsMaxAgeSeconds", "value" : "15768000"}]
```

!!! note
    Returning HTTP security headers could also be achieved by configuring the headers from the `Proxy/LB` configuration.

-->
