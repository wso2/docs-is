# Prevent Browser Caching

If there are dynamic pages in your application, which also include sensitive information, you need to prevent caching. This can be done by making sure that the applications return the following HTTP security headers in HTTP responses.

```
Expires:0
Pragma:no-cache
Cache-Control:no-store, no-cache, must-revalidate
```

The following sections explain how you can configure these security headers to prevent caching in different types of applications used in the WSO2 Identity Server.

## Prevent for console application

The console application is stored at `<IS_HOME>/repository/deployment/server/webapps/` directory, and serves dynamic pages/content make sure that either `URLBasedCachePreventionFilter` or `ContentTypeBasedCachePreventionFilter` is available in the `web.xml` file of the particular application.

## Prevent for web applications

If your web application stored in the `<IS_HOME>/repository/deployment/server/webapps/` directory, serves dynamic pages/content make sure that either `URLBasedCachePreventionFilter` or `ContentTypeBasedCachePreventionFilter` is available in the `web.xml` file of the particular application.

Note that the applications that are included in the `/webapps` directory by default in WSO2 Identity Server do not serve sensitive content that requires cache prevention. However, if you are adding a new application, you need to be mindful of this requirement.


<!--## Prevent for Jaggery applications

For Jaggery-based applications stored in the `<IS_HOME>/repository/deployment/server/jaggeryapps/` directory), either `URLBasedCachePreventionFilter` or `ContentTypeBasedCachePreventionFilter` should be available in the `jaggery.conf` file as shown below.

```
"filters":
[{"name": "ContentTypeBasedCachePreventionFilter","class": "org.wso2.carbon.ui.filters.cache.ContentTypeBasedCachePreventionFilter","params":
 [{"name":"patterns","value":"text/html\",application/json\",plain/text"},{"name" : "filterAction","value":"enforce"},  {"name":"httpHeaders","value": "Cache-Control: no-store, no-cache, must-revalidate, private"}]        
}],
```
-->
