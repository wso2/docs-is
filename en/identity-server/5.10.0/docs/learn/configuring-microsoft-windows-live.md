# Configuring Microsoft Windows Live

Microsoft Windows Live can be used as a federated authenticator in the
Identity Server. Do the following to configure the Identity Server to
authenticate users using their Microsoft Live user accounts.

!!! tip "Before you begin"
    
    1.  [Register an application on Windows
        Live](https://msdn.microsoft.com/en-us/library/hh826541.aspx).
    2.  Sign in to the WSO2 Identity Server [Management
        Console](../../setup/getting-started-with-the-management-console)
        at `          https://<Server Host>:9443/carbon         ` using your
        `          username         ` and `          password         ` .
    

1.  To navigate to the federated authenticators configuration section,
    do the following.
    1.  Sign in. Enter your username and password to log on to the
        [Management
        Console](../../setup/getting-started-with-the-management-console).
        
    2.  Navigate to the **Main** menu to access the **Identity** menu.
        Click **Add** under **Identity Providers**.  
        For more information, see [Adding and Configuring an Identity
        Provider](../../learn/adding-and-configuring-an-identity-provider).
        
    3.  Fill in the details in the **Basic Information** section.

2.  Expand the **Federated Authenticators** link.

3.  Expand the **Microsoft (Hotmail, MSN, Live) Configuration** form.  
    ![microsoft-configuration](../assets/img/tutorials/microsoft-configuration.png)
    
4.  Fill in the following fields where relevant.  
    Prior to configuring, you need to have an application created in
    Windows live. See [Configuring your
    app](https://msdn.microsoft.com/en-us/library/hh826541.aspx) to
    create an application in Windows Live.

    | Field         | Description                                                                                                                                                                                                                | Sample value                                                                                                                                                     |
    |---------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Enable        | Selecting this option enables Microsoft to be used as an authenticator for users provisioned to the Identity Server.                                                                                                       | Selected                                                                                                                                                         |
    | Default       | Selecting the **Default** check box signifies that Microsoft is the main/default form of authentication. This removes the selection made for any other **Default** checkboxes for other authenticators.                    | Selected                                                                                                                                                         |
    | Client Secret | This is the password from the Microsoft Live application. Click the **Show** button to view the value you enter.                                                                                                           | 12ffb4dfb2fed67a00846b42126991f8                                                                                                                                 |
    | Callback URL  | This is the URL to which the browser should be redirected after the authentication is successful. It should have this format: `                               https://(host-name):(port)/acs                             ` | [https://localhost:9443/commonauth](https://www.google.com/url?q=https%3A%2F%2Flocalhost%3A9443%2Fcommonauth&sa=D&sntz=1&usg=AFQjCNG7dB10sZ-F07Du9Q5fT-mVDMfobg) |
    | Client Id     | This is the username from the Microsoft Live application.                                                                                                                                                                  | 1421263438188909                                                                                                                                                 |

!!! info "Related Topics"

	-   Identity Federation is part of the process of configuring an
		identity provider. For more information on how to configure an
		identity provider, see [Configuring an Identity
		Provider.](../../learn/adding-and-configuring-an-identity-provider)
