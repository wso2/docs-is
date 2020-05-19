
!!! tip "Before you begin" 
    Download Apache Tomcat 8.x from
    [here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
    server installation location will be referred as `<TOMCAT_HOME>` later
    in this guide.
    
!!! note
    It is recommended that you use a hostname that is not
    `          localhost         ` to avoid browser errors. Modify the
    `          /etc/hosts         ` entry in your machine to reflect this.


1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).
2. [Download](https://github.com/wso2/samples-is/releases/download/v4.3.0/saml2-web-app-pickup-dispatch.com.war) the `saml2-web-app-pickup-dispatch.com.war` file from the
   latest release assets.

3.  Copy the .war file into the `           webapps          `
    folder. For example,
    `           <TOMCAT_HOME>/apache-tomcat-<version>/webapps          `
    .
4.  Start the Tomcat server.

To check the sample application, navigate to
`          http://<TOMCAT_HOST>:<TOMCAT_PORT>/saml2-web-app-pickup-dispatch.com/index.jsp         `
on your browser.

For example,
`                     http://localhost:8080/saml2-web-app-pickup-dispatch.com/index.jsp