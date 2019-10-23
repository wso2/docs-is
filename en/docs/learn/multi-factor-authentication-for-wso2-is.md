# Configuring Multi-factor Authentication for WSO2 Identity Server

This section describes multi-factor authentication (MFA) and guides you on how to enable MFA for the WSO2 Identity Server Management Console. By default, WSO2 Identity Server is shipped with username-and-password-based authentication. You can further strengthen the security of this authentication by adding an additional authentication step to authenticate with basic authentication, FIDO, TOTP, etc.

## About MFA

### Shortcomings in traditional authentication
Due to increasing digital crimes and internet fraud in the world, people are highly concerned about the topic of online security. It is obvious that traditional user Id and password is not enough to
secure the authentication. Processing speeds of CPUs have increased, so brute force attacks are a reality and dictionary attacks have become a common threat. GPGPU password cracking and rainbow tables have provided similar advantages to attackers.

### Benefits of MFA
MFA creates a layered defence and makes it more difficult for an unauthorized person to access a target such as a physical location, computing device, web service, network, or database. If one factor is compromised or broken, the attacker still has at least one more barriers to breach before successfully breaking into the target.


### Authentication factors
Authentication factors in MFA relies on two or more independent credentials of the three categories.    

-   **Knowledge factors**: Things only the user knows, such as passwords.  

-   **Possession factors**: Things only the user has, such as ATM cards.  

-   **Inherence factors**: Things only the user is, such as a fingerprint.  

With a combination of two or more factors from the above three, the user is authenticated. 

!!! example
    When withdrawing money with an ATM card; the card is the possession factor and the PIN is the knowledge factor.   

### MFA with WSO2 Identity Server

WSO2 Identity Server allows configuring multi-step authentication where you can define an authentication chain containing different authenticators in different steps. This chain can also be converted to a multi-factor authentication chain by adding different factors of authentication to each step. For example, you can configure user name-password-based authentication as the first factor (knowledge factors) and then FIDO authentication as the second factor (possession factors).

![mfa-with-is](../assets/img/using-wso2-identity-server/mfa-with-is.png)

WSO2 Identity Server has comprehensive support for MFA, with authenticators available for **SMSOTP, FIDO, MEPin** and more.

!!! info 
    For a complete list of readily available authenticators, click [here](https://store.wso2.com/store/assets/isconnector/list).

!!! note    
    There are certain second-factor authenticators that should be followed by a Knowledge factors authenticators to figure out the user first, e.g., when you configure FIDO authenticator, it should not be  onfigured as the first step. Instead, it should be followed by a first factor authenticator. 


## Configuring MFA

### MFA with local authenticators

1.  Start WSO2 Identity Server and sign in to the Management Console.
2.  On the **Main** tab, click **Service Providers > Add**. 
3.  Enter a `service provider name` and click **Register**.  As the service provider is for the WSO2 Identity Server itself, in this tutorial the service provider is referred to as `self`.  
    ![configure-mfa-for-is](../assets/img/using-wso2-identity-server/configure-mfa-for-is.png)
4.  Under **Inbound Authentication Configuration** section, expand **SAML2 Web SSO Configuration** and click **Configure**.
5.  Select **Manual Configuration** and enter the following details and click **Register**.  
    1.  **Issuer**: `carbonServer`
    2.  **Assertion Consumer URLs**: `https://localhost:9443/acs`
    3.  **Enable Response Signing**: `true`

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

14. Save and close the `deployment.toml` file.

### MFA with federated authenticators

WSO2 Identity Server enables configuring MFA in the following ways when a federated identity provider (IdP) is configured as the first factor. 

-   Configuring MFA based on the claims that are provided by the locally provisioned/associated user of the federated IdP in the first factor. (Recommended)   

-   Configuring the second factor based on the claims that are provided by the federated IdP in the first factor. (Not recommended)    

!!! warning

    When the second factor is based on a claim that is provided by a federated IdP in the first step, if the federated IdP gets compromised, the execution of the second MFA step will be solely dependent on the claims that are provided by the compromised federated IdP. Hence, the second MFA step that is based on a locally provisioned/associated federated user is recommended as it will act as a guard step when the federated IdP get compromised, as the claims that are used for MFA are dependant on the locally provisioned/associated user rather than claims provided by the compromised federated IdP.


## Try it out

1.  Start WSO2 Identity Server.
2.  Access the `https://localhost:9443/` URL. Note that you will be prompted for extra steps of authentication depending on the authentication options and steps you added above.

You have now successfully configured MFA for the WSO2 Identity Server Management Console.
