
1.  Access the WSO2 IS management console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Navigate to **Main** > **Identity** > **Service Providers** and click **Add**.

3.  Enter **playground2** in the **Service Provider Name** text box, and click **Register**.
        ![](../../../assets/img/fragments/register-sp-playground.png) 
    
4.  Expand the **Inbound Authentication Configuration** section and then
    the **OAuth/OpenID Connect Configuration** and click **Configure.**   
    
5.  Fill in the form that appears. For the Allowed Grant Types, you can disable the ones you do not require or block.
        
    !!! note
        The **custom** grant type will only appear on the UI if you have configured the JWT grant
        type. The value specified as the `name`
        of the `oauth.custom_grant_type` in the `deployment.toml` file when
        creating the custom grant type is the value that will appear on the
        UI. For more information on writing a custom grant type, see
        [Writing a Custom OAuth 2.0 Grant Type](../../../develop/extend/oauth2/write-a-custom-oauth-2.0-grant-type).
        
6.  Fill the `Callback Url` field. 

    Example : `http://wso2is.local:8080/playground2/oauth2client`
    
    ![configure-oauth-oidc](../../../assets/img/fragments/configure-oauth-oidc.png)

    !!! tip
        For more information on other advanced configurations
        refer, [Advanced OpenID Connect](../../../guides/login/oidc-parameters-in-auth-request/)
        
7.  Click **Add**. Note that `client key` and `client secret` get generated.  
    ![generated-key-secret](../../../assets/img/fragments/generated-key-secret.png) 
