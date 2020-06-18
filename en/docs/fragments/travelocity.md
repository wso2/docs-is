
{!fragments/deploying-sample-apps.md!}

### Register a service provider

1.  Log in to the [Developer portal](insertlink) using admin/admin credentials. 

2.  Select **Applications** from the left panel. 

3.  Enter a **Name** and optionally, a **Description**.

4.  Click **Next**. 

5.  Enter the value of the issuer as **travelocity.com**. 

6.  Enter the assertion URL as `http://wso2is.local:8080/travelocity.com/home.jsp`. 

7.  Check your configurations and click **Finish**. 

8.  Navigate to the **Access** tab of your application. 

9.  Enable **Sign SAML responses** in the **Assertion/Response Signing** section. 

10. Enable **Single Logout Profile**. 

11. Enable **attribute profile** and enable **Always include attributes in response**. 

12. Select **Enable request signature validation** in the **Request validation** section. 

13. Click **Update**. 

### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. Download the `travelocity.com.war` file from the latest release assets.


### Deploy the sample web app

Next, deploy the sample web app on a web container.

1. Extract the `travelocity.com.war` file and open the `travelocity.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

2.  Configure the following property with the hostname (`wso2is.local`) that you configured above. 

    ``` 
    #The URL of the SAML 2.0 Assertion Consumer
    SAML2.AssertionConsumerURL=http://wso2is.local:8080/travelocity.com/home.jsp
    ```

3. Next, copy the extracted and modified `travelocity.com.war` folder to the `<TOMCAT_HOME>/webapps` folder.

4.  Start the Tomcat server. 