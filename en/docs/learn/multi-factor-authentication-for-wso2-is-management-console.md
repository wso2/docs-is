# Configuring Multi-factor Authentication for WSO2 Identity Server's Management Console

1.  Start WSO2 Identity Server and sign in to the Management Console.
2.  On the **Main** tab, click **Service Providers > Add**. 
3.  Enter a `service provider name` and click **Register**.  As the service provider is for the WSO2 Identity Server itself, in this tutorial the service provider is referred to as `self`.  
    ![configure-mfa-for-is](../assets/img/using-wso2-identity-server/configure-mfa-for-is.png)
4.  Under **Inbound Authentication Configuration** section, expand **SAML2 Web SSO Configuration** and click **Configure**.
5.  Select **Manual Configuration** and enter the following details and click **Register**.  
    1.  **Issuer**: `carbonServer`
    2.  **Assertion Consumer URLs**: `https://localhost:9443/acs`
    3.  **Enable Response Signing**: `true`

        !!! Tip 
           
            When configuring single-sign-on for Management Console, "Issuer" value of the SAML request is defaulted to **carbonServer** as mentioned above.
            You can change this value by adding following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.
            ```toml
                [admin_console.authenticator.saml_sso_authenticator]
                service_provider_id = "CustomCarbonServerIssuer"
            ```
    
    
    ![enable-response-signing](../assets/img/using-wso2-identity-server/enable-response-signing.png)

6.  Expand **Local and Outbound Authentication Configuration** and select **Advanced Configuration** to configure MFA. There are two types of MFA that you can configure here.
    -   **Multi-option authentication**
        -   This can be configured by clicking **Add Authenticator**. 
        -   Clicking this again will enable you to create another authentication option. 
        -   These can be either local or federated authenticators.
    -   **Multi-step authentication**
        -   This is configured by clicking **Add Authentication Step**. 
        -   Clicking this again will enable you to create another authentication step.
        -   These can be either local or federated authenticators.

    ![add-auth-step](../assets/img/using-wso2-identity-server/add-auth-step.png)

7.  To add a **Local Authenticator**, click **Add Authenticator**.
    -   You can choose the type of authenticator using the dropdown.
    -   Clicking **Add Authenticator** again will enable you to add a second local authenticator and configure multi-option authentication using two local authenticators. 
    -   Alternatively, you can click **Add Authentication Step** and configure a **Local Authenticator** in one step by selecting the local authenticator from the dropdown and clicking **Add Authenticator**. You can do the same for the second step.  
      
    As an example for this scenario, basic and fido are used as the two authenticators. Basic authentication allows you to authenticate users from the enterprise user store while FIDO authenticates you  externally.

    !!! tip
    
        If you are adding FIDO as an authenticator, see [Multi-factor Authentication using FIDO](../../learn/multi-factor-authentication-using-fido) for more information and follow the instructions given in the topic to configure it.
    

    ![mfa-using-fido](../assets/img/using-wso2-identity-server/mfa-using-fido.png)

8.  Select **Use subject identifier from this step**, **Use attributes from this step** or both. In the case of multiple steps, you can have only one step as the subject step and one as the
    attribute step.
9.  Click the **Update**.
10.  This navigates you to the previous screen with your newly configured authentication steps. Click **Update** again to save changes.
11. Shutdown WSO2 Identity Server and open the `deployment.toml` file in the `<IS_HOME>/repository/conf/` folder.
12. Enable the `admin_console.authenticator.saml_sso_authenticator` as follows.

    ``` toml
    [admin_console.authenticator.saml_sso_authenticator]
    enable=true
    ```

13. Set the value of `priority` to 1.

    ``` toml
    [admin_console.authenticator.saml_sso_authenticator]
    priority="1"
    ```

14. Set `assertion_consumer_service_url` and `identity_provider_sso_service_url`.

    ``` toml
    [admin_console.authenticator.saml_sso_authenticator]
    assertion_consumer_service_url = "https://localhost:9443/acs"
    identity_provider_sso_service_url = "https://localhost:9443/samlsso"
    ```
    
15. Save and close the `deployment.toml` file.


## Try it out

1.  Start WSO2 Identity Server.
2.  Access the `https://localhost:9443/` URL. Note that you will be prompted for extra steps of authentication depending on the authentication options and steps you added above.

You have now successfully configured MFA for the WSO2 Identity Server Management Console.
