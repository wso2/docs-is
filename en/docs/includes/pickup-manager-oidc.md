
<!--
{!./includes/deploying-sample-apps.md!}
-   Download the sample from GitHub.

    1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

    2. [Download](https://github.com/wso2/samples-is/releases/download/v4.5.2/pickup-manager.war) the `pickup-manager.war` file from the latest release assets.

### Deploy the sample web app

Next, deploy the sample web app on a web container.

1. Extract the `pickup-manager.war` file and open the `manager.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

2. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated for the newly created service provider.

    ![pickup-key-secret-2](../../../../assets/img/fragments/pickup-key-secret-2.png)

3. Next, copy the extracted and modified `pickup-manager` folder to the `<TOMCAT_HOME>/webapps` folder.

### Register a service provider

1. Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2. Navigate to **Main**>**Identity**>**Service Providers** and click **Add**.

3. Enter **pickup-manager** in the **Service Provider Name** text box,
    and click **Register**.

4. In the **Inbound Authentication Configuration** section, click
    **Configure** under the **OAuth/OpenID Connect Configuration** section.
    
5. Enter the following value as the **Callback URL**: `http://localhost.com:8080/pickup-manager/oauth2client`

    !!! Tip
        The callback URL is the service provider URL to which the authorization codes are sent. Upon successful authentication, the browser should be redirected to this URL. 

6. Click **Add**. Note the **OAuth Client Key** and **Client Secret** that is displayed. You will need these values later on when deploying the sample application.

    !!! Tip
        For more information on the advanced configurations
        refer, [Advanced OAuth/OpenID Connect Configurations](../../../../guides/login/oauth-app-config-advanced).

5.  Click **Register** to save the changes.
-->