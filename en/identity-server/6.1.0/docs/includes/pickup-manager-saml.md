{!./includes/deploying-sample-apps.md!}

### CORS configuration

{!./includes/cors-config.md!}

### Register a service provider


1.  Access the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Navigate to **Main** > **Identity** > **Service Providers** and click **Add**.

3.  Enter `saml2-web-app-pickup-manager` in the **Service Provider Name** text box,
    and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

    1.  Now set the configuration as follows:

        1.  **Issuer** : `               saml2-web-app-pickup-manager.com             `

        2.  **Assertion Consumer URL** :
            `                               http://localhost.com:8080/saml2-web-app-pickup-manager.com/home.jsp`                        
                 
            Click **Yes**, in the message that appears.

    2.  Select the following check-boxes:
        1.  **Enable Response Signing**

        2.  **Enable Single Logout**

        3.  **Enable Attribute Profile**

        4.  **Include Attributes in the Response Always**  
        
        5.  **Enable Signature Validation in Authentication Requests and Logout Requests**
            
    
    !!! tip
        For more information on the advanced configurations
        refer, [Advanced SAML Configurations](../../../../guides/login/saml-app-config-advanced).

5.  Click **Register** to save the changes.  

### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. [Download](https://github.com/wso2/samples-is/releases/download/v4.5.2/saml2-web-app-pickup-manager.com.war) the `saml2-web-app-pickup-manager.com.war` file from the latest release assets.

### Deploy the sample web app

Next, deploy the sample web app on a web container.

1.  Copy the `saml2-web-app-pickup-manager.com.war` file into the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder. 

2.  Start the Tomcat server.


