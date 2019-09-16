# Multi-factor Authentication for WSO2 IS

This topic describes multi-factor authentication (MFA) and guides you on
how to enable MFA for the WSO2 Identity Server management console. By
default, WSO2 Identity Server is shipped with username/password based
authentication. You can further strengthen the security of this
authentication by adding an additional authentication step to
authenticate with basic authentication, FIDO, TOTP etc.

### About multi-factor authentication

Due to increasing digital crimes and internet fraud in the world, people
are highly concerned about the topic of online security. And it is
obvious that traditional user ID and password login is not enough to
secure the authentication. Processing speeds of CPUs have increased, so
brute force attacks are a reality and dictionary attacks have become a
common threat. GPGPU password cracking and rainbow tables have provided
similar advantages to attackers.

Multi-factor Authentication (MFA) creates a layered defence and makes it
more difficult for an unauthorized person to access a target such as a
physical location, computing device, web service, network or a database.
If one factor is compromised or broken, the attacker still has at least
one more barrier to breach before successfully breaking into the target.

Authentication factors in MFA relies on two or more independent
credentials of the three categories.

-   Knowledge factors - Things only the user knows, such as passwords
-   Possession factors - Things only the user has, such as ATM cards
-   Inherence factors - Things only the user is, such as a fingerprint

With a combination of two or more factors from the above three, the user
is authenticated. A basic example is when withdrawing money with an ATM
card; the card is the possession factor and the pin number is the
knowledge factor.

  

### MFA with WSO2 Identity Server

WSO2 Identity Server allows configuring multi-step authentication where
you can define an authentication chain containing different
authenticators in different steps. This chain can also be converted to a
multi-factor authentication chain by adding different factors of
authentication to each step. For example, you can configure
User-ID/Password authentication as the first factor (knowledge factors)
and then FIDO authentication as the second factor (possession factors).

![mfa-with-is](../../assets/img/using-wso2-identity-server/mfa-with-is.png)

WSO2 Identity Server has comprehensive support for multi-factor
authentication, with authenticators available for **SMSOTP, FIDO,
MEPin** and more.

!!! info 
    For a complete list of readily available authenticators, click
    [here](https://store.wso2.com/store/assets/isconnector/list).

!!! note
    
    There are some 2nd factor authenticators which should be followed by a
    Knowledge factors authenticators to figure out the user first. Ex: When
    you configure FIDO authenticator, it should not be configured as the 1st
    step. Instead, it should be followed by a 1st factor authenticator.


### Configuring multi-factor authentication for WSO2 Identity Server

1.  Start the WSO2 IS server and login to the management console.
2.  Click **Add** under **Service Providers** on the **Main** tab. Enter
    a service provider name and click **Register**.  
    Since the service provider is for the WSO2 Identity Server itself,
    in this tutorial the service provider is referred to as 'self'.  
    ![configure-mfa-for-is](../../assets/img/using-wso2-identity-server/configure-mfa-for-is.png)
3.  Expand **Inbound Authentication Configuration\>SAML2 Web SSO
    Configuration** and click **Configure**.
4.  Select **Manual Configuration** and enter the following details.
    Click **Register**.  
    1.  I **ssuer -** carbonServer
    2.  **Assertion Consumer URLs -** https://localhost:9443/acs
    3.  **Enable Response Signing -** true

    ![enable-response-signing](../../assets/img/using-wso2-identity-server/enable-response-signing.png)

5.  Expand **Local and Outbound Authentication Configuration** and
    select **Advanced Configuration** to configure multi-factor
    authentication.  
    There are two types of multi-factor authentication that you can
    configure here.
    -   **Multi-option authentication** : This can be configured by
        clicking **Add Authenticator**. Clicking this again will enable
        you to create another authentication option. These can be either
        local or federated authenticators.
    -   **Multi-step authentication** : This is configured by clicking
        **Add Authentication Step**. Clicking this again will enable
        you to create another authentication step. These can be either
        local or federated authenticators.

    ![add-auth-step](../../assets/img/using-wso2-identity-server/add-auth-step.png)

6.  Click **Add Authenticator** to add a **Local Authenticator**. You
    can choose the type of authenticator using the dropdown. Clicking
    **Add Authenticator** again will enable you to add a second local
    authenticator and configure multi-option authentication using two
    local authenticators. Alternatively, you can click **Add
    Authentication Step** and configure a **Local Authenticator** in one
    step by selecting the local authenticator from the dropdown and
    clicking **Add Authenticator**. You can do the same for the second
    step.  
      
    As an example for this scenario, basic and fido are used as the two
    authenticators. Basic authentication allows you to authenticate
    users from the enterprise user store while FIDO authenticates you
    externally.

    !!! tip
    
        If you are adding FIDO as an authenticator, see [Multi-factor
        Authentication using FIDO](../../learn/multi-factor-authentication-using-fido)
        for more information and follow the instructions given in the topic
        to configure it.
    

    ![mfa-using-fido](../../assets/img/using-wso2-identity-server/mfa-using-fido.png)

7.  Select **Use subject identifier from this step**, **Use** a
    **ttributes from this step** or both. In the case of multiple steps,
    you can have only one step as the subject step and one as the
    attribute step.
8.  Click the **Update** button.
9.  This navigates you to the previous screen with your newly configured
    authentication steps. Click **Update** again to save changes.
10. Shutdown WSO2 IS and open the
    `          deployment.toml         ` file found in the
    `          <IS_HOME>/repository/conf/         ` folder.
11. Enable the `           SAML2SSOAuthenticator          ` as follows.

    ``` xml
    [admin_console.authenticator.saml_sso_authenticator]
    enable=true
    ```

12. Set the value of `    priority  ` to 1.

    ``` java
        [admin_console.authenticator.saml_sso_authenticator]
        priority="1"
    ```

13. Save and close the `           deployment.toml          ` file.

### Try it out

1.  Start the WSO2 IS and navigate to the following URL:
    https://localhost:9443/ .
2.  You will now be prompted for extra steps of authentication depending
    on the authentication options and steps you added above.

You have successfully configured multi-factor authentication for the
WSO2 Identity Server management console.
