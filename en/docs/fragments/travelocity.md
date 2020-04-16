
{!fragments/deploying-sample-apps.md!}

### Register a service provider

1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Click **Service Providers > Add**.

3. Enter "travelocity.com" as the **Service Provider Name**.

4. Click **Register**.
    
5. Expand **Inbound Authentication Configuration** section and then **SAML2 Web SSO Configuration**. 

6. Click **Configure.**   

7. Enter the following configurations:
    1.  **Issuer** : travelocity.com

    2.  **Assertion Consumer URL** : http://wso2is.local:8080/travelocity.com/home.jsp                    
        Click **Yes**, in the message that appears.

        !!! tip
            For more information on these fields and other advanced configurations, see [Advanced SAML Configurations](../../guides/authentication/saml-app-config-advanced)

8. Select the following checkboxes:
    - **Enable Attribute Profile**
    - **Include Attributes in the Response Always**

9. Click **Register** to save the changes. Now you are sent back to the **Service Providers** page.

### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. [Download](https://github.com/wso2/samples-is/releases/download/v4.3.0/travelocity.com.war) the `travelocity.com.war` file from the latest release assets.


### Deploy the sample web app

Next, deploy the sample web app on a web container.

1. Extract the `travelocity.com.war` file and open the `travelocity.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

2.  Configure the following property with the hostname (`wso2is.local`) that you configured above. 

    ``` 
    #The URL of the SAML 2.0 Assertion Consumer
    SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp
    ```

3. Next, copy the extracted and modified `travelocity.com.war` folder to the `<TOMCAT_HOME>/webapps` folder.