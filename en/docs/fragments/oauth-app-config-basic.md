Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

2. Enter the **Callback Url**. 

    !!! note
        The **Callback Url** is the exact location in the service provider's application to which an access token will be sent. This URL should be the URL of the page that the user is redirected to after successful authentication.

3. Click **Add**. Note the **OAuth Client Key** and **OAuth Client Secret** that appear. 

    !!! tip
        To configure more advanced configurations, see [OAuth/OpenID Connect Configurations](../../../guides/login/oauth-app-config-advanced). 
