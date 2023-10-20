# Enabling HTTP Strict Transport Security (HSTS) Headers

Enable HTTP Strict Transport Security headers (HSTS) for the applications deployed in your server, to confirm that the relevant headers are present in the HTTP response. HSTS is not enabled for applications in WSO2 Identity Server by default. 

!!! note 

	HSTS should not be enabled in development environments because transport security validations can interrupt the development processes by validating signatures of self-signed certificates. 


## Enable for Management Console 

If the `HttpHeaderSecurityFilter` element is available in the `web.xml` file (stored in the `<IS_HOME>/repository/conf/tomcat/carbon/WEB-INF/` directory) as shown below, it implies that security headers are by default configured for the management consoles of all of your profiles. However, in a production deployment, Strict-Transport-Security needs to be explicitly enabled by replacing the default <init-param> values of the HttpHeaderSecurityFilter filter.

Following is the default filter configuration..

```
<!-- Tomcat http header security filter -->
<filter>
        <filter-name>HttpHeaderSecurityFilter</filter-name>
        <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class>
        <init-param>
            <param-name>hstsEnabled</param-name>
            <param-value>false</param-value>
        </init-param>
</filter>
```

Shown below is how you should explicitly enable HSTS.

```
<!-- Tomcat http header security filter -->
 
<filter>
        <filter-name>HttpHeaderSecurityFilter</filter-name>
        <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class>
        <init-param>
            <param-name>hstsMaxAgeSeconds</param-name>
            <param-value>15768000</param-value>
        </init-param>
</filter>
```

## Enable for web applications

Similar to the management console, check whether the `HttpHeaderSecurityFilter` that is sstored in the `<IS_HOME>/repository/deployment/server/webapps/` directory that is available in the `web.xml` file of that particular web application. If the filter is available, enable HSTS as shown below.

```
<filter>
    <filter-name>HttpHeaderSecurityFilter</filter-name>        
    <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class>
</filter>
<filter-mapping>     
    <filter-name>HttpHeaderSecurityFilter</filter-name>     
    <url-pattern>*</url-pattern>
</filter-mapping>
```

## Enable for Jaggery applications

For Jaggery applications, the `HttpHeaderSecurityFilter` element should be configured in the jaggery.conf file (stored in the `<IS_HOME>/repository/deployment/server/jaggeryapps/` directory. This filter configuration is applicable to the /dashboard jaggery applications in this location. To enable HSTS for a Jaggery application, change the default filter configuration as shown below.

The default filter configuration:

```
"params" : [{"name" : "hstsEnabled", "value" : "false"}]
```

The filter configuration after enabling HSTS:

```
"params" : [{"name" : "hstsMaxAgeSeconds", "value" : "15768000"}]
```

!!! note

	Returning HTTP security headers could also be achieved by configuring those headers from the Proxy/LB configuration.


