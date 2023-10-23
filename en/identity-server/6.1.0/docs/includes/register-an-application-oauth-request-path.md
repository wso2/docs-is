<!--
## Register a service provider

1. On WSO2 Identity Server Management Console, go to **Main** > **Identity** > **Service Providers** and click **Add**.

2. Enter `playground2` as the **Service Provider Name** text box, and click **Register**.

3. Expand the **Inbound Authentication Configuration > OAuth/OpenID Connect Configuration** and click **Configure**.

4. Fill in the form that appears. By default, all **Allowed Grant Types** are selected; you can disable the grant types that are not required.

    !!! note
        The **custom** grant type will only appear on the UI if you have configured the JWT grant type. The value specified as the `name` of the `oauth.custom_grant_type` in the `deployment.toml` file when creating the custom grant type is the value that will appear on the UI. For more information on writing a custom grant type, see [Write a Custom OAuth 2.0 Grant Type](../../../references/extend/oauth2/write-a-custom-oauth-2.0-grant-type).

5. Enter the **Callback Url** as `http://wso2is.local:8080/playground2/oauth2client`.

    !!! tip
        For more information on other advanced configurations refer, [Advanced OpenID Connect]({{base_path}}./guides/login/oidc-parameters-in-auth-request/).

6. Click **Add**. Note that `client key` and `client secret` are generated.

7. Expand **Request Path Authentication**.

8. Check **OAuth Bearer** from the dropdown. 

9. After all the configurations click **Update**.
-->
