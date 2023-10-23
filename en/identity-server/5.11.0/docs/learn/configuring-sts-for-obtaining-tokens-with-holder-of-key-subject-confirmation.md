# Configuring STS for Obtaining Tokens with Holder-Of-Key Subject Confirmation

In this scenario, STS generates a Holder-Of-Key subject confirmation
(symmetric key) and encrypts it with the public key of the relying
party. This is included in the subject confirmation section of the SAML
token, which is validated by the relying party. For this the relying
parties endpoint address and the corresponding public certificates needs
to be registered.

Follow the instructions below to configure STS for obtaining tokens with
Holder-Of-Key subject confirmation (Symmetric Key).

1.  Start the WSO2 Identity Server .
2.  Log in as an admin to access the [management
    console](../../setup/getting-started-with-the-management-console).
3.  Follow the steps given below to configure the Holder of Key
    confirmation method.  
    1.  Navigate to the **Service Providers** section by clicking
        **Add** in the **Main** menu under **Service Providers**.
    2.  Add a **Service Provider Name** and **Description** and click
        **Register**.  
        ![add-new-service-provider](../assets/img/tutorials/add-new-service-provider.png)
    3.  In the resulting page, expand the **Inbound Authentication
        Configuration** and the **WS-Trust Security Token Service
        Configuration** sections.
    4.  Click **Configure**.
    5.  Enter the trusted relying party and upload the public
        certificate of the trusted relying party (against its
        end-point).

        The relying party will accept security tokens from the Identity
        Server.

        The tokens issued are encrypted using the public key of the
        trusted relying party. Accordingly, even the client who obtains
        the token to send to the RP has no visibility to the included
        token.  
        Example: Enter the endpoint address of the service that you are
        running.  
        ![configure-sts](../assets/img/tutorials/configure-sts.png)

    6.  Click **Apply**.

4.  A new trusted service is added to the service provider.

You can delete any trusted service by clicking on the associated
**Delete** link.
