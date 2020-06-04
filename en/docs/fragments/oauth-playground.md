

{!fragments/deploying-sample-apps.md!}

----

## Register a service provider

1. Log in to the [Management Console](insertlink) using admin/admin credentials. 

2. Click **Service Providers > Add** and enter "playground2" as the **Service Provider Name** and click **Register**.
		<img name='add-playground-sp' src='../../assets/img/samples/add-playground-sp.png' class='img-zoomable'/>
    
3.  Expand **Inbound Authentication Configuration** and then **OAuth/OpenID Connect Configuration**. 

4. Click **Configure.**   

5. Select the relevant grant types that you wish to try out from the **Allowed Grant Types** list. 
        
6.  Enter `http://wso2is.local:8080/playground2/oauth2client` as the **Callback Url**.
    
	<img name='configure-playground-sp' src='../../assets/img/fragments/configure-playground-sp.png' class='img-zoomable'/>

    !!! tip
        For more information on `Callback Url` and other advanced configurations
        refer, [Advanced OpenID Connect Configurations](../../guides/login/oauth-app-config-advanced)
        
7.  Click **Add**. Note the **OAuth Client Key** and **Client Secret** that get generated. You will need these values later on when deploying the sample application.

8.  Click **Register**.

{!fragments/deploy-playground.md!}




