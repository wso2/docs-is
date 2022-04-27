# Enable Login for a SAML Web Application

This page guides you through enabling login for a [SAML](../../../references/concepts/authentication/intro-saml/) web application. 

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
    
    !!! tip
        For more information on the advanced configurations, see [Advanced SAML Configurations](../../guides/login/saml-app-config-advanced/).

5.  Click **Register** to save the changes.

----

## Configure the service provider

### Basic SAML configs 

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > SAML2 Web SSO Configuration** and click **Configure**.

2. Enter the **Issuer**. 

    !!! info
        The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
     
2. Enter the **Assertion Consumer URL** and click **Add**.
    
    !!! info
        The **Assertion Consumer URL** is the Assertion Consumer Service (ACS) URL of the service provider. This URL should be the URL of the page to which the browser is redirected to after successful authentication.

3. Click **Register**.

### Single logout

1. Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`) and click **List** under **Service Providers**. 

2. Click **Edit** to edit the SAML service provider you created.

3. Expand **Inbound Authentication Configuration** and then expand **SAML2 Web SSO Configuration**. Edit the configuration.

4. Select **Enable Single Logout**. For more information, see [SAML Advanced Configurations](../../guides/login/saml-parameters-in-auth-request).

!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations](../../../guides/login/saml-app-config-advanced).

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

-   [Download](https://github.com/wso2/samples-is/releases/download/v4.3.0/saml2-web-app-pickup-dispatch.com.war) the `saml2-web-app-pickup-dispatch.com.war` file from the latest release assets.

### Configure CORS

{!fragments/cors-config.md!}

### Deploy the sample

Deploy this sample web app on a web container.

1.  Copy the `saml2-web-app-pickup-dispatch.com.war` file into the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder. 

2.  Start the Tomcat server.

### Log in

1. Start the Tomcat server and access the following URL on your browser: `http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com`.

	```
	http://<TOMCAT_host>:<TOMCAT_port>/saml2-web-app-pickup-dispatch.com
	```

2. Click **Login**.

3. Log in using your WSO2 Identity Server credentials (e.g., admin/admin). Provide the required consent. You will be redirected to the Pickup Dispatch application home page.

You have successfully configured authentication for a SAML application.

!!! info "Related topics"
    - [Concept: SAML](../../../references/concepts/authentication/intro-saml/)
    - [Quick Start: SAML Authentication](../../../quick-starts/webapp-saml-sample)
    - [Guide: Advanced SAML Configurations](../saml-app-config-advanced)
    - [Guide: SAML Front-Channel Logout](../saml-front-channel-logout)
    - [Guide: SAML Back-Channel Logout](../saml-back-channel-logout)

