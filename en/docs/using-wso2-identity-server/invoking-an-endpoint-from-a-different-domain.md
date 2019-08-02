# Invoking an Endpoint from a Different Domain

This topic provides instructions on invoking an endpoint in an OAuth2
.war file from the JavaScript of a web application that is located in a
different domain than the WSO2 Identity Server domain.

!!! tip    
    This is relevant for any REST endpoint in WSO2 Identity Server.
    

When attempting this, you will typically see a "No
'Access-Control-Allow-Origin' header that is present on the requested
resource. Therefore, your web application is not allowed access. The
issue occurs as the script on your page is running from a specific
domain and would try to request the resource via an
`         XmlHttpRequest        ` or `         XDomainRequest        `
from a different domain as this is a cross-origin request.

In order to get rid of this issue, you must enable this by sending the
following CORS (Cross-Origin Resource Sharing) header using a custom
filter.

``` java
Access-Control-Allow-Origin: http://example.com
```

In the above example,
`                   http://example.com                 ` is the domain
name of the location of the page where that script is hosted.

### Invoking the UserInfo endpoint through JavaScript

There are two possible solutions to apply the CORS header.

1.  Customizing `           OpenIDConnectUserEndpoint.java          ` as
    indicated below and replacing the oauth2.war file. Introduce the
    following header to the `           getUserClaims()          `
    method. By applying this filter, it allows to invoke
    `           OpenIDConnectUserEndpoint          ` from the '
    `                       http://example.com                     ` '
    domain. If you add a '\*' instead of '
    `                       http://example.com                     ` ',
    it allows you to invoke this endpoint from any domain. However, this
    approach leads to some security risks.

    ``` java
    respBuilder.header("Access-Control-Allow-origin", 'http://example.com')
    ```

    !!! tip
        Customizing the endpoint to allow cross origin communication and replacing the .war is not actually recommended.
    

2.  Applying a [CORS
    filter](http://software.dzhuvinov.com/cors-filter.html). A CORS
    filter is already used in the OAuth web application of the WSO2
    Identity Server and you can do the following configuration changes
    to the web.xml file located in the
    `           <PRODUCT_HOME>/repository/deployment/server/webapps/oauth2/WEB-INF          `
    directory in order to add above mentioned header. Enable the CORS
    filter for the OAuth web application by adding the filter
    configuration to the web.xml file as indicated below.

    ``` java
    <filter>
        <filter-name>CORS</filter-name>
        <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
        <init-param>
            <param-name>cors.allowOrigin</param-name>
            <param-value>http://example.com</param-value>
        </init-param>
    </filter>


    <filter-mapping>
        <filter-name>CORS</filter-name>
        <url-pattern>/example.html</url-pattern>
    </filter-mapping>
    ```

    For configuration details of a CORS filter, see
    [here](http://software.dzhuvinov.com/cors-filter.html).

    !!! tip    
        You can provide whitespace-separated list of origins that
        the CORS filter must allow like
        `           cors.allowOrigin          ` . However, you must make
        sure not to use wildcards like \* since it allows any origin and it
        may lead to some security vulnerabilities.
    

The dependency is already included in the oauth2.war. Thus, it is not
necessary to separately add it to the pom.xml file. However, if you are
using another endpoint you need to add the dependency as shown below.

### Applying CORS filter to another web application

1.  Add the following module to the dependencies section of the pom.xml
    file.

    ``` xml
    <dependency>
        <groupId>com.thetransactioncompany.wso2</groupId>
        <artifactId>cors-filter</artifactId>
        <version>1.7.0.wso2v1</version>
    </dependency>
    ```

2.  Enable the CORS filter for the web application by adding the filter
    configuration to the web.xml in the
    `          <SAMPLE_WEB_APP>/src/main/webapp/WEB-INF         `
    directory as mentioned above in the second approach.
