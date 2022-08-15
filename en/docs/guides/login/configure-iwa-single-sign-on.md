# Configure IWA Single-Sign-On

WSO2 Identity Server is capable of running in multiple platforms.
However, the Integrated Windows Authentication (IWA) authenticator is
designed only for the Windows server and enabling theIWA authenticator
may cause conflict with other authenticators. Therefore, the IWA
authenticator is not enabled in WSO2 Identity Server by default but can
be enabled in WSO2 Identity Server with some configurations. For more
information on how IWA is used for single-sign-on, see the [Integrated
Windows Authentication]({{base_path}}/references/concepts/authentication/integrated-windows-authentication-overview) page.

---

## Prerequisites

-   Web Server  
    -   Windows Server 2003 or later
    -   An Active Directory configured in the Windows server
    -   WSO2 Identity Server 5.1.0 or a later version
-   Client
    -   Microsoft Windows Operating System (XP, Vista, 7)
    -   Internet Explorer 7+, Mozilla Firefox, Google Chrome (or any
        other web browser that support IWA)
    -   Following are the steps to configure IWA in WSO2 Identity
        Server.

---

## Configure IWA in WSO2 Identity Server

1.  Download the WSO2 Identity Server from the [product
    page](http://wso2.com/products/identity-server).
2.  Extract the ZIP file in the file system.
3.  Configure WSO2 IS to use Active Directory as the user store.
    See [Configuring Primary User Stores]({{base_path}}/deploy/configure-the-primary-user-store) on how to configure a primary user
    store and then go to Active Directory user store configuration
    section to get Active Directory specific configurations.
4.  Start the WSO2 Identity Server with
    `          <wso2is_home>/bin/wso2server.bat         ` and check
    whether the user store is configured properly before the IWA is
    activated.
5.  Start from this step if you have WSO2 Identity Server already
    configured to use Active Directory.
6.  Stop the WSO2 Identity Server if the server is already running.
7.  Add the following property to the `deployment.toml` file found in the `<IS_HOME>/repository/conf` folder.

    ```toml
    [admin_console.authenticator.iwa_ui_authenticator]
    enable = true
    priority = 5
    ```

    This indicates to the WSO2 Identity Server that "**IWAUIAuthenticator**" is to be enabled with a priority level
    of 5.
8.  Start the WSO2 Identity Server. Now the server is configured to use
    the IWA authenticator.

---

### Usage

Access the WSO2 Identity Server from a client machine (the user should
be logged in to the domain of the server) by entering the WSO2 Identity
Server's URL (e.g., <https://192.168.4.108:9443/carbon> ) from your
client browser. You are logged into the WSO2 Identity Server without
having to enter your password. The following is a part of the server log
when the user is logged with IWA:

![iwa-server-log]({{base_path}}/assets/img/guides/iwa-server-log.png)

Sometimes you may not be logged in automatically and you may be prompted
to enter the username and password. The reason for that could be one of
the following.

-   The browser is either unable to do the IWA authentication or it is
    not configured to use the IWA authentication properly. The web
    server should be added to the trusted websites of the browser.  
    -   For Internet explorer, go to “Tools → Internet Options” and in
        the “security” tab select local intranet.  
        ![configure-iwa-for-browser-1]({{base_path}}/assets/img/guides/configure-iwa-for-browser1.png)
    -   Click the **Sites** button. Then add the URL of WSO2 Identity
        Server there.  
        ![configure-iwa-browser-2]({{base_path}}/assets/img/guides/configure-iwa-browser2.png)
    -   For Firefox, type “ **about:config** ” in the address bar,
        ignore the warning and continue, this displays the advanced
        settings of Firefox. In the search bar, search for the key "
        **network.negotiate-auth.trusted-uris** " and add the WSO2
        Identity Server URL there.  
        ![configure-iwa-browser-3]({{base_path}}/assets/img/guides/configure-iwa-browser3.png)
-   The user may be attempting to access the WSO2 Identity Server from
    outside the domain of the user.
-   The user may not have the sufficient permission within WSO2 Identity
    Server to log in to the system.  



!!! info "Related topics"
    See [Logging in to Salesforce with Integrated Windows
    Authentication](TO-DO:{{base_path}}/learn/logging-in-to-salesforce-with-integrated-windows-authentication)
    for a sample of configuring the IWA authenticator with WSO2 Identity
    Server.
