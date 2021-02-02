# Prevent Browser Caching

If there are dynamic pages in your application, which also include sensitive information, you need to prevent caching. This can be done by making sure that the applications return the following HTTP security headers in HTTP responses.

```
Expires:0
Pragma:no-cache
Cache-Control:no-store, no-cache, must-revalidate
```

The following topics explain how you can configure these security headers for different types of applications used in WSO2 Identity Server. 

---

## Prevent for management console

You can enable these headers for the management console by adding the following configuration to the `web.xml` file (stored in the `<IS_HOME>/repository/conf/tomcat/carbon/WEB-INF/` directory).

```
<filter>
    <filter-name>URLBasedCachePreventionFilter</filter-name>
    <filter-class>org.wso2.carbon.ui.filters.cache.URLBasedCachePreventionFilter</filter-class>
</filter>
<filter-mapping>
    <filter-name>URLBasedCachePreventionFilter</filter-name>
    <url-pattern>*.jsp</url-pattern>
</filter-mapping>
```

---

## Prevent for web applications

If your web application (stored in the `<IS_HOME>/repository/deployment/server/webapps/` directory) serves dynamic pages/content, then make sure that either `URLBasedCachePreventionFilter` or `ContentTypeBasedCachePreventionFilter` is available in the `web.xml` file of the particular application. 

Note that the applications that are included in the `/webapps` directory by default in a WSO2 product do not serve sensitive content that requires cache prevention. However, if you are adding any new applications, you need to be mindful of this requirement.

---

## Prevent for Jaggery applications

For Jaggery-based applications (stored in the `<IS_HOME>/repository/deployment/server/jaggeryapps/` directory), either `URLBasedCachePreventionFilter` or `ContentTypeBasedCachePreventionFilter` should be available in the `jaggery.conf` file as shown below.


"filters":
[{"name": "ContentTypeBasedCachePreventionFilter","class": "org.wso2.carbon.ui.filters.cache.ContentTypeBasedCachePreventionFilter","params":
 [{"name":"patterns","value":"text/html\",application/json\",plain/text"},{"name" : "filterAction","value":"enforce"},  {"name":"httpHeaders","value": "Cache-Control: no-store, no-cache, must-revalidate, private"}]        
}],
