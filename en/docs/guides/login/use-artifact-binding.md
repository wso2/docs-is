# Use SAML 2.0 Artifact Binding

This page guides you through enabling [SAML2 artifact binding]({{base_path}}/references/concepts/authentication/saml2-artifact-binding/) with WSO2 Identity Server. 

Generally, SAML authentication requests and assertion data is sent through the browser using POST or Http Redirect binding. If you do not want to expose the entire message to the browser, you can use artifact binding instead. 

## Register a service provider

1.  Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`) using admin/admin credentials. 

2.  Navigate to **Main** > **Identity** > **Service Providers** and click **Add**.

3.  Enter `saml2-web-app-pickup-dispatch` in the **Service Provider Name** text box,
    and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

    1.  Now set the configuration as follows:

        1.  **Issuer** : `saml2-web-app-pickup-dispatch.com`

        2.  **Assertion Consumer URL** :  ` http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp `                       
        
        Click **Yes**, in the message that appears.

    2.  Select the following check-boxes:
        1.  **Enable Response Signing**

        2.  **Enable Single Logout**

        3.  **Enable Attribute Profile**

        4.  **Include Attributes in the Response Always**  
        
        5.  **Enable Signature Validation in Authentication Requests and Logout Requests**
    
5.  Click **Register** to save the changes.

!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations]({{base_path}}/guides/login/saml-app-config-advanced). 

---

{!./includes/artifact-binding-settings.md!}

----


## Try it

### Set up the sample

- Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.      

- It is recommended that you use a hostname that is not
`          localhost         ` to avoid browser errors. Modify the
`          /etc/hosts         ` entry in your machine to reflect this.
Note that `          wso2is.local         ` is used in
this documentation as an example, but you must modify this when
configuring the authenticators or connectors with this sample
application.

-   [Download](https://github.com/wso2/samples-is/releases/download/v4.5.2/saml2-web-app-pickup-dispatch.com.war) the `saml2-web-app-pickup-dispatch.com.war` file from the latest release assets.

### Configure CORS

{!./includes/cors-config.md!}

### Deploy the sample

Deploy this sample web app on a web container.

1.  Copy the `saml2-web-app-pickup-dispatch.com.war` file into the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder. 

2.  Start the Tomcat server.

### Try artifact binding

1.  Access the application application URL: <http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com>.

2.  You will be redirected to the login page of WSO2 IS. Log in using your WSO2 IS credentials (admin/admin). Provide the required consent.
You will be redirected to the Pickup Dispatch application home page.

3.  You can use a SAML tracer add-on with your browser to view the SAML2 response artifact for the SSO authentication request. The code block  below shows an example response.

    ``` java
    HTTP/1.1 302 Object Moved
    Date: 21 Jan 2004 07:00:49 GMT
    Location: https://application.com/ACS/URL?
    SAMLart=AAQAADWNEw5VT47wcO4zX%2FiEzMmFQvGknDfws2ZtqSGdkNSbsW1cmVR0bzU%3D&RelayState=0043bfc1bc45110dae17004005b13a2b
    Content-Type: text/html; charset=iso-8859-1
    ```

You have successfully set up SAML artifact binding. See the sections below for more information on resolving SAML 2.0 artifacts and configuring an artifact expiration time.

-----

!!! info "Related topics"
    - [Concept: SAML2 Artifact Binding]({{base_path}}/references/concepts/authentication/saml2-artifact-binding/)
    - [Guide: Enable Login for a SAML Application]({{base_path}}/guides/login/webapp-saml)

