# Passwordless authentication using FIDO2

WSO2 Identity Server supports passwordless authentication using FIDO2, which is a phishing-proof 
passwordless authentication protocol developed as a joint effort between the FIDO Alliance and 
the World Wide Web Consortium (W3C). 


The three major enablers of the FIDO2 flow are;

1. The FIDO2 Authenticator (biometrics, mobile devices or FIDO2 security keys)
2. The client or browser that operates as a mediator
3. The WebAuthn Relying Party (WSO2 Identity Server)

<br>
    
??? info "Does your browser support your FIDO devices?"
    
    The <https://demo.yubico.com/webauthn-technical/registration> site can be used to check the browser
    support for FIDO devices.
    
!!! tip "Before you Begin"
    WSO2 Identity Server uses the WebAuthn API to enable FIDO-based passwordless authentication. 
    The WebAuthn API is supported from the following browser versions onwards:
    
    -   Chrome(CHROME 67) 
    -   Firefox (FIREFOX 60)
    -   Edge (EDGE 17723)

    Follow the steps given below to define the set of origin URLs where the WSO2 Identity Server my account will be hosted (e.g., `https://localhost:9443`):

    1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.
    2. Add the following configuration.
        ```toml
        [fido.trusted]
        origins=["https://localhost:9443"]
        ``` 
        

## Configuring passwordless authentication using FIDO2
 
### Setting up the FIDO2 device
To associate a FIDO2 device with the user account, refer [Add security device](../learn/user-portal.md#add-security-device).

### Configuring FIDO as an authenticator
1.  Sign in to the [Management Console](../../setup/getting-started-with-the-management-console). 
2.  To create a new Service Provider:
    1.  On the **Main** menu, click **Identity > Service Providers > Add**. 
    2.  Enter a name and a brief description of the service provider. 
    3.  Click **Register**. 

    !!! info 
        For more information on creating a service provider, see [Adding and Configuring a Service Provider](../../learn/adding-and-configuring-a-service-provider).


3.  In the **Local & Outbound Authentication Configuration** section, select **Local Authentication** and from the dropdown select **fido**. To enable passwordless authentication, the fido authenticator alone is sufficient.

    !!! info 
        For more information on configuring the local and outbound
        authentication configuration, see [Configuring Local and Outbound
        Authentication for a Service
        Provider](../../learn/configuring-local-and-outbound-authentication-for-a-service-provider)
        .

    ![local-outbound-auth-config](../assets/img/learn/local-outbound-auth-config-fido2.png)


4.  Click **Update**.
