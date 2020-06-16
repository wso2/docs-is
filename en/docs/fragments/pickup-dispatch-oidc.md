
{!fragments/deploying-sample-apps.md!}

### Register a service provider

1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Click **Service Providers >Add**. 

3. Enter "pickup-dispatch" as the **Service Provider Name**.
 
4. Click **Register**.
    
5. Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

6. Click **Configure.**   

7. Select the relevant grant types that you wish to try out from the **Allowed Grant Types** list. 
        
8.  Enter `http://wso2is.local:8080/pickup-dispatch/oauth2client` as the **Callback Url**.
    
    !!! tip
        For more information on `Callback Url` field and other advanced configurations
        refer, [Advanced OpenID Connect Configurations](../../guides/login/oauth-app-config-advanced)
        
9.  Click **Add**. Note that the **OAuth Client Key** and **Client Secret** get generated. You will need these values later on when deploying the sample application.

10.  Click the **Register** button to finish creating the service provider.

### Download the sample

To be able to deploy a WSO2 Identity Server sample, you need to download
it onto your machine first.

Follow the instructions below to download the sample from GitHub.

1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).

2. [Download](https://github.com/wso2/samples-is/releases/download/ v4.3.0/pickup-dispatch.war) the `pickup-dispatch.war` file from the latest release assets.

### Deploy the sample web app

Next, deploy the sample web app on a web container.

1. Extract the `pickup-dispatch.war` file and open the `dispatch.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

2. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated for the newly created service provider.

    ![pickup-key-secret](../assets/img/fragments/pickup-key-secret.png)

3. Next, copy the extracted and modified `pickup-dispatch` folder to the `<TOMCAT_HOME>/webapps` folder.