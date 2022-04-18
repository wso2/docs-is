Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

2. Make sure **Code** is selected from the **Allowed Grant Types** list.
        
3. Enter the **Callback Url**.

    !!! tip
        The **Callback Url** is the exact location in the service provider's application to which an access token will 
        be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

4. Select **PKCE Mandatory** in order to enable PKCE. 

    ![enable-pkce](../../assets/img/guides/enable-pkce.png)
           
5. Click **Add**. 

    !!! note
        - Note the generated **OAuth Client Key** and **OAuth Client Secret**. You will need these values later on when sending 
        the requesting the code and the access token.
        
        - To configure more advanced configurations, see [OAuth/OpenID Connect Configurations](../../../guides/login/oauth-app-config-advanced).
