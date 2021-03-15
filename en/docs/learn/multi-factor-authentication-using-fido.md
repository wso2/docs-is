# Configuring Multi-factor Authentication using FIDO

This section provides details on Fast IDentity Online (FIDO) and instructions on how to configure multi-factor authentication (MFA) in WSO2 Identity Server using FIDO.

!!! info 
    For information on MFA concepts, see [About MFA](../../learn/multi-factor-authentication). 

??? info "Does your browser support your FIDO devices?"
    
    The <https://demo.yubico.com/webauthn-technical/registration> site can be used to check the browser
    support for FIDO devices.
    
!!! tip "Before you Begin"
    Certain changes made to the chrome u2f extension are causing the FIDO device to not register properly as an authentication factor. Additionally, Firefox no longer supports the u2f extension. WSO2 Identity Server resolves this by using the WebAuthn API to enable FIDO-based authentication. The WebAuthn API is already supported by the following browser versions:
    
    -   Chrome(CHROME 67) 
    -   Firefox (FIREFOX 60)
    -   Edge (EDGE 17723)

    To define the set of origin URLs where the WSO2 Identity Server **My Account** will be hosted (e.g., `https://localhost:9443`):

    1. Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory.
    2. Add the following configuration.
        ```toml
        [fido.trusted]
        origins=["https://localhost:9443"]
        ``` 
                                                                                                                                                         
## About FIDO

FIDO attempts to change the nature of authentication by developing specifications that define an open, scalable, interoperable set of mechanisms that supplant reliance on passwords to securely authenticate users of online services. In short, FIDO Universal Second Factor (FIDO U2F) can make it easy for you to authenticate users while also ensuring that security is enhanced. 

FIDO provides two user experiences to address a wide range of use cases and deployment scenarios. FIDO protocols are based on public key cryptography and are strongly resistant to phishing.

![fido](../assets/img/using-wso2-identity-server/fido.png)

### UAF 

Universal Authentication Framework (UAF) involves a passwordless experience with the following key processes:

-   The user carries the client device with the UAF stack installed. 
-   The user presents a local biometric or PIN.
-   The website can choose whether to retain the password.

### U2F 

U2F focuses on the second factor experience and has the following key processes:

-   The user carries the U2F device with built-in support in web
    browsers.
-   The user presents the U2F device.
-   The website can simplify the password (for example, it can be
    simplified to a 4-digit PIN).

U2F tokens provide cryptographic assertions that can be verified by relying parties. Typically, the relying party is a web server, and the cryptographic assertions are used as the second factor (in addition to passwords) during user authentication. U2F tokens are typically small special-purpose devices and FIDO Client is a web browser that communicates between the token and relying party.

#### Operations

The following are the two main operations that take place when using FIDO U2F.

1.  **Registration**: Upon registration, a device gives the server its attestation certificate. This certificate can be (optionally) used to verify the authenticity of the device.
2.  **Authentication**: The authentication operation proves possession of a previously-registered keypair to the relying party.

#### Phases

Both the registration and authentication operations consist of three **phases** depicted in the following figure.

![u2f-protocol-operations](../assets/img/using-wso2-identity-server/u2f-protocol-operations.png)

1.  **Setup**: In this phase, the FIDO Client contacts the relying party and obtains a challenge. Using the challenge (and possibly other data obtained from the relying party and/or prepared by the FIDO Client itself), the FIDO Client prepares a request message for the U2F Token.
2.  **Processing**: In this phase, the FIDO Client sends the request message to the token, and the token performs some cryptographic operations on the message, creating a response message. This response message is sent to the FIDO Client. 
3.  **Verification** : In this phase, the FIDO Client transmits the token's response message, along with other data necessary for the relying party to verify the token response, to the relying party.     The relying party then processes the token response and verifies its accuracy. A correct registration response will cause the relying party to register a new public key for a user, while a correct authentication response will cause the relying party to accept that the client is in possession of the corresponding private key.

#### Authentication flow

The following depicts the FIDO U2F-based authentication process.

![u2f-process-flow](../assets/img/using-wso2-identity-server/u2f-process-flow.png) 

!!! info 
    For information on FIDO alliance, see [What is FIDO](https://fidoalliance.org/about/what-is-fido/). 


## Configuring MFA using FIDO

The instructions in this section enable you to successfully set up MFA using the WSO2 Identity Server.

!!! warning
    
    FIDO authenticator can be configured only after a local authenticator is configured in the previous steps. It cannot be configured as the first step or if federated authenticator set the subject identifier.
    
    
!!! tip "Before you begin"
    
    If you are using a reverse proxy enabled setup, configure the relevant server URL as the `AppID`.
    
    ``` toml
    [authentication.authenticator.fido.parameters]
    app_id="https://hostname"
    ```


### Setting up an account for MFA
To associate a FIDO device with the user account, refer [Add security device](../learn/user-portal.md#add-security-device).
  

### Configuring FIDO U2F as an authenticator

1.  Sign in to the [Management Console](../../setup/getting-started-with-the-management-console). 
2.  To create a new Service Provider:
    1.  On the **Main** menu, click **Identity > Service Providers > Add**. 
    2.  Enter a name and a brief description of the service provider. 
    3.  Click **Register**. 

    !!! info 
        For more information on creating a service provider, see [Adding and Configuring a Service Provider](../../learn/adding-and-configuring-a-service-provider).


3.  In the **Local & Outbound Authentication Configuration** section, select **Advanced Configuration**.

    !!! info 
        For more information on configuring the local and outbound
        authentication configuration, see [Configuring Local and Outbound
        Authentication for a Service
        Provider](../../learn/configuring-local-and-outbound-authentication-for-a-service-provider)
        .

    ![local-outbound-auth-config](../assets/img/using-wso2-identity-server/local-outbound-auth-config.png)

4.  Under **Local Authenticators** section, click **Add Authentication Step**.  
    ![add-local-authenticator](../assets/img/using-wso2-identity-server/add-local-authenticator.png)
5.  Select **Use subject identifier from this step** and **Use attributes from this step** options.
6.  To add FIDO as the second-step authenticator, click **Add Authentication step** and add **FIDO** authenticator from **Local Authenticators** section. 
    ![add-fido-authenticator](../assets/img/using-wso2-identity-server/add-fido-authenticator.png)
7.  Click the **Update**. Note that you will be redirected to the previous screen with the newly configured authentication steps.
