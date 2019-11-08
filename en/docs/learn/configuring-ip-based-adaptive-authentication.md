# Configuring IP-Based Adaptive Authentication

This tutorial demonstrates IP-based adaptive authentication with WSO2
Identity Server using sample authenticators. This is useful if you want
to add security for users logging in from external networks or other
geographic locations. Using the IP-based adaptive authentication
template, you can specify network ranges using the ip address so that
users logging in from an external network that is unlisted in the
authentication script, are prompted to perform an additional level of
authentication, while users logging in from the internal configured
network specified on the script can simply provide their
credentials (basic authentication) to access a resource.

Follow the instructions given below:

!!! tip "Before you begin"
    
    -   Set up the service provider and sample application for adaptive
        authentication. For instructions on how to do this, see [Configuring
        a Service Provider for Adaptive
        Authentication](../../learn/configuring-a-service-provider-for-adaptive-authentication).
    -   For more information about adaptive authentication with WSO2 Identity Server, see [Adaptive
        Authentication](../../learn/adaptive-authentication).
    

### Configuring the sample scenario

1.  Log in to the management console.
2.  Navigate to **Service Providers\>List** and click **Edit** on the
    `              saml2-web-app-pickup-dispatch.com             `
    service provider.
3.  Expand the **Local and Outbound Configuration** section and click
    **Advanced Authentication**.
4.  Click on **Templates** on the right side of the **Script Based
    Conditional Authentication** field and then click **IP-Based**. 
     
    ![ip-based-template-config](../assets/img/tutorials/ip-based-template-config.png)
    
5.  Click **Ok**. The authentication script and authentication steps
    are configured. The authentication script prompts the second step of
    authentication for users who log in from an IP address that is not
    included within the network range configured in the script. To try
    out this scenario, enter the IP address of your machine to define it
    as an internal network.

    ``` java
    var corpNetwork = ['192.168.1.0/24', '10.100.0.0/16'];
    ```

6.  The second authentication step that is added is
    `          totp.         ` However, `          totp         ` is an
    authentication step that you would normally use in production. To
    try out this scenario sample authenticators with the sample
    application, delete the `          totp         ` authenticator and
    add the following sample authenticator instead.
    1.  Click **Delete** to remove the `            totp           `
        authenticator from Step 2 (the second authentication step).  
        ![second-step-login-ip-based](../assets/img/tutorials/second-step-login-ip-based.png)
        
    2.  Select **Demo Hardware Key Authenticator** and click **Add**.  
        ![demo-hardware-key-authenticator](../assets/img/tutorials/demo-hardware-key-authenticator.png)
        
7.  Click **Update**.

### Trying out the sample scenario

1.  Create a new user named Alex with login permissions.
2.  Access the following sample PickUp application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com> .
3.  Click **Login** and enter Alex's credentials. Note that you are
    successfully logged in after only the basic authentication step
    because you are logging in from an IP address that is within the
    configured network.
4.  On the management console, navigate to **Service Providers\>List**
    and click **Edit** on the
    [saml2-web-app-pickup-dispatch.com](http://saml2-web-app-pickup-dispatch.com/)
    service provider.
5.  Edit the authentication script in the **Script Based Conditional
    Authentication** field and enter an IP address that is outside your
    network range.

    ``` java
        var corpNetwork = ['192.168.1.0/24', '10.100.0.0/16'];
    ```

6.  Click **Update**.
7.  Access the following sample PickUp application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com> .
8.  Click **Login** and enter Alex's credentials. Note that you are now
    prompted to provide hardware key authentication because you are
    logging in from an IP address that is external to the configured
    network.

    !!! tip
        You can also try this scenario with two different machines
        in different networks to simulate a real world scenario.