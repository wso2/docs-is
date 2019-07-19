# Securing Carbon Applications

When you work with WSO2 products, you may host multiple applications
(Web applications and Jaggery applications) and expose them to external
users. The **management console**, which is shipped with every WSO2
product is also an application that is deployed in the Carbon server.
Before you expose the applications to the external network, be sure to
configure the security settings for all your applications.

See the following topics for instructions:

-   [Enabling HTTPS access to the management
    console](#SecuringCarbonApplications-https_accessEnablingHTTPSaccesstothemanagementconsole)
-   [Enabling HTTP access to the management
    console](#SecuringCarbonApplications-EnablingHTTPaccesstothemanagementconsole)
-   [Starting the server without the management
    console](#SecuringCarbonApplications-without_uiStartingtheserverwithoutthemanagementconsole)
-   [Enabling role-based permissions for the management
    console](#SecuringCarbonApplications-Enablingrole-basedpermissionsforthemanagementconsole)
-   [Restricting access to Carbon
    applications](#SecuringCarbonApplications-restrict_accessRestrictingaccesstoCarbonapplications)
    -   [For the management console
        only](#SecuringCarbonApplications-Forthemanagementconsoleonly)
    -   [For jaggery Apps
        only](#SecuringCarbonApplications-ForjaggeryAppsonly)
    -   [For all web
        applications](#SecuringCarbonApplications-Forallwebapplications)
    -   [For web application
        servlets](#SecuringCarbonApplications-Forwebapplicationservlets)
-   [Enabling HTTP Strict Transport Security (HSTS)
    Headers](#SecuringCarbonApplications-EnablingHTTPStrictTransportSecurity(HSTS)Headers)
    -   [For the management
        console](#SecuringCarbonApplications-Forthemanagementconsole)
    -   [For web
        applications](#SecuringCarbonApplications-Forwebapplications)
    -   [For Jaggery
        applications](#SecuringCarbonApplications-ForJaggeryapplications)
-   [Preventing browser
    caching](#SecuringCarbonApplications-Preventingbrowsercaching)
    -   [For the management
        console](#SecuringCarbonApplications-Forthemanagementconsole.1)
    -   [For web
        applications](#SecuringCarbonApplications-Forwebapplications.1)
    -   [For Jaggery
        applications](#SecuringCarbonApplications-ForJaggeryapplications.1)

### Enabling HTTPS access to the management console

All WSO2 products expose the management console through the
default HTTPS transport, which is configured in the
`         catalina-server.xml        ` file (stored in the
`         <PRODUCT_HOME>/repository/conf/tomcat        ` directory).
This transport must be properly configured in this file for the
management console to be accessible.

See [HTTPS Servlet Transport](_HTTPS_Servlet_Transport_) for
instructions.

### Enabling HTTP access to the management console

If you are exposing the management console to a secure network, you may
sometimes allow HTTP access to the management console. Note that HTTPS
access is enabled by default. You can follow the steps given below to
enable HTTP access to the management console:

1.  See [HTTP Servlet Transport](_HTTP_Servlet_Transport_) and make sure
    that the HTTP transport connector is configured for your product.
    Note that 9763 is the default port that will be used.
2.  Open the `           carbon.          ` xml file stored in the
    `           <PRODUCT_HOME>/repository/conf          ` directory and
    uncomment the following element:  

    ``` java
    <EnableHTTPAdminConsole>true</EnableHTTPAdminConsole>
    ```

3.  Disable secure cookies for the management console. To do this, open
    the `           web.xml          ` file from the
    `           <PRODUCT_HOME>/repository/conf/tomcat/carbon/WEB-INF          `
    directory and set the `           <secure>          ` property to
    `           false          ` .  

    ``` java
        <session-config> 
          <cookie-config> 
              <secure>false</secure> 
          </cookie-config> 
        </session-config>
    ```

You can now start the product server and access the management console
through HTTP. Use the following URL:
[http://localhost:\<port\>/carbon/admin/login.jsp](http://localhost:9763/carbon/admin/login.jsp)
, where `         <port>        ` corresponds to the [HTTP port
configured](_HTTP_Servlet_Transport_) for the server. The default HTTP
port for all WSO2 servers is **9763**. However, this may change if a
port offset is applied to your server as explained
[here](_Changing_the_Default_Ports_).

### Starting the server without the management console

If you want to provide access to the production environment without
allowing any user group (including admin) to log into the management
console, execute the following command:

``` java
sh <PRODUCT_HOME>/bin/wso2server.sh -DworkerNode
```

If you want to check any additional options available to be used with
the startup commands, type `         -help        ` after the command,
such as: `         sh <PRODUCT_HOME>/bin/wso2server.sh -help.        `

### Enabling role-based permissions for the management console

You can grant management console access to selected users by
[configuring role-based permissions](_Role-based_Permissions_).

### Restricting access to Carbon applications

When hosting your products in production, it's imperative that you
restrict the access to the management console from the external network.
Additionally, you may also need to restrict access to other
applications. Accessing Carbon applications in your server (including
the management console) can be restricted to selected IP addresses. You
can use the Tomcat servlet filter (
`         org.apache.catalina.filters.RemoteAddrFilter        ` ) for
the purpose of restricting access.

**Note** that you can either restrict access to the management console
exclusively, or you can restrict access to all web applications in your
server (which includes the management console) at the same time.  

#### For the management console only

If you want only selected IP addresses to be able to access the
management console, add the required IP addresses to the
`         <PRODUCT_HOME>/repository/conf/tomcat/carbon/META-INF/context.xml        `
file as follows:

``` java
<Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="<IP-address-01>|<IP-address-02>|<IP-address-03>"/>
```

The `         RemoteAddrValve        ` Tomcat valve defined in this file
will only apply to the Carbon management console and, thereby, all
outside requests to the management console will be blocked.

#### For jaggery Apps only

If you want only selected IP addresses to be able to access the jaggery
apps like publisher, store, admin portal which resides in WSO2 API
Manager, go
to  \<PRODUCT\_HOME\>/repository/deployment/server/jaggeryapps/\<jaggeryapp-name\>/jaggery.conf file
and add the configuration as follows.

``` java
{
   "name":"Remote Address Filter",
   "class":"org.apache.catalina.filters.RemoteAddrFilter",
   "params":[
       {"name" : "allow", "value" : "localhost|127\.\d+\.\d+\.\d+|::1|0:0:0:0:0:0:0:1|your IP added here"}
    ]
}
{ "name":"Remote Address Filter", "url":"*" }
```

The value of the "allow" key that we defined in this file will apply to
the publisher/store/admin portal as the the particular jagger.conf file
you add this configuration and, thereby, all outside requests to the
publisher/store/admin portal will be blocked.

#### For all web applications

To control access to all web applications deployed in your server
(including the management console), add the IP addresses to the
`         <PRODUCT_HOME>/repository/conf/context.        ` xml file as
follows:  

``` java
<Valve className="org.apache.catalina.valves.RemoteAddrValve" allow="<IP-address-01>|<IP-address-02>|<IP-address-03>"/>
```

The `         RemoteAddrValve        ` Tomcat valve defined in this file
will apply to each web application hosted on the Carbon server.
Therefore, all outside requests to any web application will be blocked.

#### For web application servlets

You can also restrict access to particular servlets in a web application
by adding a Remote Address Filter to the `         web.xml        ` file
(stored in the `         <PRODUCT_HOME>/repository/conf/tomcat/        `
directory), and by mapping that filter to the servlet URL. In the Remote
Address Filter that you add, you can specify the IP addresses that
should be allowed to access the servlet.

  
The following example `         web.xml        ` file illustrates how
access to the `         login.jsp        ` of the management console (
`         /carbon/admin/login.jsp        ` ) is granted only to one IP
address:  

``` java
<filter>
    <filter-name>Remote Address Filter</filter-name>
    <filter-class>org.apache.catalina.filters.RemoteAddrFilter</filter-class>
        <init-param>
            <param-name>allow</param-name>
            <param-value>127.0.01</param-value>
        </init-param>
</filter>

<filter-mapping>
    <filter-name>Remote Address Filter</filter-name>
    <url-pattern>/carbon/admin/login.jsp</url-pattern>
</filter-mapping>
```

  

### Enabling HTTP Strict Transport Security (HSTS) Headers

Enable "HTTP Strict Transport Security headers" (HSTS) for the
applications deployed in your server, to confirm that the relevant
headers are present in the HTTP response. HSTS is not enabled for
applications in WSO2 products by default.

!!! note
    
    Note that HSTS should not be enabled in **development environments**
    because transport security validations can interrupt the development
    processes by validating signatures of self-signed certificates.
    

#### For the management console

If the `         HttpHeaderSecurityFilter        ` element is available
in the web.xml file (stored in the
`         <         PRODUCT_HOME>        `
`         /repository/conf/tomcat/carbon/WEB-INF/        ` directory) as
shown below, it implies that security headers are by default configured
for the management consoles of all of your profiles. However, in a
production deployment, ‘Strict-Transport-Security’ needs to be
explicitly enabled by replacing the default
`         <init-param>        ` values of the
`         HttpHeaderSecurityFilter        ` filter.

Shown below is the default filter configuration.

``` java
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

``` java
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

#### For web applications

Similar to the management console, check whether the
`         HttpHeaderSecurityFilter        ` (stored in the
`         <PRODUCT_HOME>        `
`         /repository/deployment/server/webapps/        ` directory) is
available in the web.xml file of that particular web application. If the
filter is available, enable HSTS as shown below.

  

``` java
<filter>
    <filter-name>HttpHeaderSecurityFilter</filter-name>        
    <filter-class>org.apache.catalina.filters.HttpHeaderSecurityFilter</filter-class> 
</filter>
<filter-mapping>     
    <filter-name>HttpHeaderSecurityFilter</filter-name>     
    <url-pattern>*</url-pattern> 
</filter-mapping>
```

  

#### For Jaggery applications

For Jaggery applications, the
`         HttpHeaderSecurityFilter        ` element should be configured
in the `         jaggery.conf        ` file (stored in the
`         <PRODUCT_HOME>        `
`         /repository/deployment/server/jaggeryapps/        `
directory). This filter configuration is applicable to the /dashboard
jaggery applications in this location. To enable H STS for a Jaggery
application, change the default filter configuration as shown below.

The default filter configuration:

``` java
 "params" : [{"name" : "hstsEnabled", "value" : "false"}]
```

The filter configuration after enabling HSTS:

``` java
"params" : [{"name" : "hstsMaxAgeSeconds", "value" : "15768000"}]
```

!!! note
    
    **NOTE:** Returning HTTP security headers could also be achieved by
    configuring those headers from the Proxy/LB configuration.
    

### Preventing browser caching

If there are dynamic pages in your application, which also include
sensitive information, you need to prevent caching. This can be done by
making sure that the applications return the following HTTP security
headers in HTTP responses.

  

Expires:0  
Pragma:no-cache  
Cache-Control:no-store, no-cache, must-revalidate

The following topics explain how you can configure these security
headers for different types of applications used in WSO2 products.

##### For the management console

You can enable these headers for the management console by adding the
following configuration to the `         web.xml        ` file (stored
in the
`         <PRODUCT_HOME>/repository/conf/tomcat/carbon/WEB-INF/        `
directory ).

  

``` java
<filter> 
    <filter-name>URLBasedCachePreventionFilter</filter-name> 
    <filter-class>org.wso2.carbon.ui.filters.cache.URLBasedCachePreventionFilter</filter-class>
</filter>
<filter-mapping> 
    <filter-name>URLBasedCachePreventionFilter</filter-name> 
    <url-pattern>*.jsp</url-pattern>
</filter-mapping>
```

##### For web applications

If your web application (stored in the
`          <PRODUCT_HOME>/repository/deployment/server/webapps/         `
directory) serves dynamic pages/content, then make sure that either
`          URLBasedCachePreventionFilter         ` or
`          ContentTypeBasedCachePreventionFilter         ` is available
in the `          web.xml         ` file of the particular application.

Note that the applications that are included in the
`          /         ` webapps directory by default in a WSO2 product do
not serve sensitive content that requires cache prevention. However, if
you are adding any new applications, you need to be mindful of this
requirement.

##### For Jaggery applications

For Jaggery-based applications (stored in the
`         <PRODUCT_HOME>/repository/deployment/server/jaggeryapps/        `
directory), either `         URLBasedCachePreventionFilter        ` or
`         ContentTypeBasedCachePreventionFilter        ` should be
available in the `         jaggery.conf        ` file as shown below.

  

``` java
"filters":
[{"name": "ContentTypeBasedCachePreventionFilter","class": "org.wso2.carbon.ui.filters.cache.ContentTypeBasedCachePreventionFilter","params": 
 [{"name":"patterns","value":"text/html\",application/json\",plain/text"},{"name" : "filterAction","value":"enforce"},  {"name":"httpHeaders","value": "Cache-Control: no-store, no-cache, must-revalidate, private"}]        
}],
```
