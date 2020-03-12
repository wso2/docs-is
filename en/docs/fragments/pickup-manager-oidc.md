
{!fragments/deploying-sample-apps.md!}

### Register a service provider

1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Click **Service Providers >Add** and enter "pickup-dispatch" as the **Service Provider Name** and click **Register**.
    
3.  Expand the **Inbound Authentication Configuration** section and then the **OAuth/OpenID Connect Configuration** and click
    **Configure.**   

4. Select the relevant grant types that you wish to try out from the **Allowed Grant Types** list. 
        
5.  Enter `http://wso2is.local:8080/pickup-manager/oauth2client` as the **Callback Url**.
    
    !!! tip
        For more information on `Callback Url` field and other advanced configurations
        refer, [Advanced OpenID Connect Configurations](../../guides/authentication/oauth-app-config-advanced)
        
6.  Click **Add**. Note that the **OAuth Client Key** and **Client Secret** get generated. You will need these values later on when deploying the sample application.

7.  Click the **Register** button to finish creating the service provider.

### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. [Download](https://github.com/wso2/samples-is/releases/download/v4.1.0/pickup-manager.war) the `pickup-manager.war` file from the latest release assets.


### Deploy the sample web app

Next, deploy the sample web app on a web container.

1. Extract the `pickup-manager.war` file and open the `manager.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

2. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated for the newly created service provider.

    ![pickup-key-secret-2](../assets/img/fragments/pickup-key-secret-2.png)

3. Next, copy the extracted and modified `pickup-manager` folder to the `<TOMCAT_HOME>/webapps` folder.