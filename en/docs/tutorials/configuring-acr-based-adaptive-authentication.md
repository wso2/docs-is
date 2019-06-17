# Configuring ACR-Based Adaptive Authentication

This scenario demonstrates Authentication-Context-Reference-based
(ACR-based) adaptive authentication in WSO2 Identity Server using sample
authenticators. The instructions below guide you through specifying
authentication steps based on the authentication context value used when
logging in.

Follow the instructions given in the sections below to set this up.

!!! tip "Before you begin"
    
    -   [Download](https://tomcat.apache.org/download-80.cgi) and
        [install](https://tomcat.apache.org/download-80.cgi) Apache Tomcat
        version 7.\*.\* or 8.\*.\*
    
    -   Open the `           /etc/hosts          ` file, add the following
        entry, and restart your computer.
    
        ``` xml
            127.0.0.1       wso2is.local
    ```

    To avoid any IP address conflicts, be sure that this is the only
    entry for this IP address in the /etc/hosts file.


	-   Set up the OAuth2 Playground sample application for adaptive
		authentication. For instructions on how to do this, see [Setting Up
		the Sample Webapp](/using-wso2-identity-server/setting-up-the-sample-webapp).
	-   For more information about adaptive authentication with WSO2
		Identity Server, see [Adaptive Authentication](/tutorials/adaptive-authentication).


### Configuring the service provider

1.  Start the WSO2 IS server.
2.  Navigate to **Service Providers\>Add** in the **Main** menu of the
    management console and add a new service provider called
    "playground2".
3.  Expand the **Inbound Authentication Configuration\>OAuth/OpenID
    Connect Configuration** section and click **Configure**.  
4.  Enter the following URL as the **Callback Url**:
    <http://wso2is.local:8080/playground2/oauth2client>.  
    ![callback-url](/assets/img/tutorials/callback-url.png)
5.  Leave the rest of the default configurations as it is and click
    **Register**. You will see the generated client key and client
    secret.  
    ![client-key-secret](/assets/img/tutorials/client-key-secret.png)
6.  Expand **Local and Outbound Configuration** and click **Advanced
    Configuration**.
7.  Click on **Templates** on the right side of the **Script Based
    Conditional Authentication** field and then click **ACR-Based**.  
    ![acr-based-template-config](/assets/img/tutorials/acr-based-template-config.png)
8.  Click **Ok** . The authentication script and authentication steps
    are configured.

9.  The authentication steps that are added are
    `          totp         ` and `          fido         ` . However,
    these are authentication steps that you would normally use in
    production. To try out this scenario sample authenticators with the
    sample application, delete the `          totp         ` and
    `          fido         ` authenticators and add the following demo
    authenticators instead.   
    
    1.  Click **Delete** to remove the `            totp           `
        authenticator from Step 2 (the second authentication step).  
        ![delete-totp-authenticator](/assets/img/tutorials/delete-totp-authenticator.png)
    2.  Select **Demo Hardware Key Authenticator** and click **Add**.  
        ![demo-hardware-key-authenticator](/assets/img/tutorials/demo-hardware-key-authenticator.png)
    3.  Click **Delete** to remove the `            fido           `
        authenticator from Step 3.  
        ![remove-fido-authenticator](/assets/img/tutorials/remove-fido-authenticator.png)
    4.  Select **Demo FaceID Authenticator** and click **Add**.  
        ![demo-face-id-authenticator](/assets/img/tutorials/demo-face-id-authenticator.png)
        
10. Click **Update**.


!!! info
	The authentication script prompts authentication steps based on the acr
	values as follows.
	
	-   'acr1' - step 1 (basic authentication)
	-   'acr2' - step 1 and 2 (basic authentication and demo hardware key
		authenticator)
	-   'acr3' - step 1 and 3 (basic authentication and demo faceID
		authenticator)

### Trying out the scenario

1.  Access the following sample Playground application URL:
    <http://wso2is.local:8080/playground2/index.jsp> .  
2.  Click **Import Photos**.  

    ![import-photos](/assets/img/tutorials/import-photos.png)
    
3.  Enter the client ID of the OAuth service provider application you
    registered above and enter 'acr2' as the **Authentication Context
    Class** value.  
    Leave the rest of the configurations as they are.  
    ![authentication-context-class](/assets/img/tutorials/authentication-context-class.png)
4.  You are now prompted for basic authentication. Sign in with a user's
    credentials or use the admin/admin credentials to log in.  
    ![acr-based-basic-authentication](/assets/img/tutorials/acr-based-basic-authentication.png)
5.  Since the ACR value entered was 'acr2', you are now also prompted
    for hardware key authentication as per the authentication script.

    !!! tip
    
        You can re-try this flow using the ACR value 'acr3'. Note that you
        are then prompted for step 1 and 3 (basic authentication and Demo
        FaceID authentication).
    
    ![basic-and-demo-faceid-authentication](/assets/img/tutorials/basic-and-demo-faceid-authentication.png)

6.  Provide the required consent.  

    ![consent](/assets/img/tutorials/consent.png)	
    
7.  You are now successfully logged in to the application. You can click
    the **Logout** button to log out and try this flow with different
    ACR values.  
    ![login-successful-acr-based](/assets/img/tutorials/login-successful-acr-based.png)
