{!fragments/deploying-sample-apps.md!}

### Register a service provider

1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Click **Service Providers > Add** and enter "pickup-dispatch" as the **Service Provider Name** and click **Register**.
    
3. Expand **Inbound Authentication Configuration** section and then **SAML2 Web SSO Configuration**. 

4. Click **Configure.**   

5. Enter the following configurations:
    1.  **Issuer** : saml2-web-app-pickup-manager.com

    2.  **Assertion Consumer URL** : http://wso2is.local:8080/saml2-web-app-pickup-manager.com/home.jsp                    
        Click **Yes**, in the message that appears.

        !!! tip
            For more information on these fields and other advanced configurations
            refer, [Advanced SAML Configurations](../../guides/login/saml-app-config-advanced)

6. Click **Register** to save the changes. Now you are sent back to the Service Providers page.

### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. [Download](https://github.com/wso2/samples-is/releases/download/v4.1.0/saml2-web-app-pickup-manager.com.war) the `saml2-web-app-pickup-manager.com.war` file from the latest release assets.

### Deploy the sample web app

Next, deploy the sample web app on a web container.

1.  Copy the `saml2-web-app-pickup-manager.com.war` file into the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder. 

2.  Start the Tomcat server.


