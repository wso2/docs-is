# WSO2 Identity Server - Sample React SPA

This sample application will show case the usage of the of WSO2 Identity Server Javascript SDK and how you can integrate a SPA with Identity Server. The following guide will walk you through how you can try out this sample from the scratch.

## Getting started

First thing we need to do is let WSO2 Identity Server know that we are accessing the server using a external origin (CORS). Add below lines to the **`[wso2-is]/repository/resources/conf/templates/repository/conf/tomcat/web.xml.j2`** in the Identity Server pack.

```xml
<filter>
    <filter-name>CORS</filter-name>
    <filter-class>com.thetransactioncompany.cors.CORSFilter</filter-class>
    <init-param>
        <param-name>cors.allowOrigin</param-name>
        <param-value>https://localhost:3000</param-value>
    </init-param>
    <init-param>
        <param-name>cors.supportedMethods</param-name>
        <param-value>GET, HEAD, POST, DELETE, OPTIONS, PATCH, PUT</param-value>
    </init-param>
    <init-param>
        <param-name>cors.exposedHeaders</param-name>
        <param-value>Location</param-value>
    </init-param>
</filter>

<filter-mapping>
    <filter-name>CORS</filter-name>
    <url-pattern>/*</url-pattern>
    <dispatcher>REQUEST</dispatcher>
    <dispatcher>FORWARD</dispatcher>
</filter-mapping>
```

### Running the sample

1. Download the sample application from [here](https://github.com/wso2-extensions/identity-samples-js/tree/master/identity-authenticate-sample-js-spa).
2. Run `yarn install`
3. Update your configurations in `src/app.js` with WSO2 Identity Server App Register details.

    E.g.

    ```javascript
    const authConfig = {
        ...
        // ClientID generated for the application
        clientID: "uxRd9AqFa3Blp1ASvKYaUizU7pca",
    };
    ```

4. run `yarn start`
5. Visit `http://localhost:3000` on browser

## License

Licenses this source under the Apache License, Version 2.0 ([LICENSE](LICENSE)), You may not use this file except in compliance with the License.
