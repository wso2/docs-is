# Configuring STS for Obtaining Tokens with Holder-Of-Key Subject Confirmation

In this scenario, STS generates a Holder-Of-Key subject confirmation (symmetric key) and encrypts it with the public key of the relying party. This is included in the subject confirmation section of the SAML token, which is validated by the relying party. For this to work, the relying party's endpoint address and the corresponding public certificates needs to be registered.

Follow the instructions below to configure STS for obtaining tokens with Holder-Of-Key subject confirmation (Symmetric Key).

1. On the Management Console of WSO2 Identity Server, go to **Service Providers** and click **Add**.
2. Add a **Service Provider Name** and click **Register**.
3. Expand **Inbound Authentication Configuration** > **WS-Trust Security Token Service Configuration** and click **Configure**.
4. Enter the trusted relying party and upload the public certificate of the trusted relying party (against its endpoint).
    The relying party accepts security tokens from WSO2 Identity Server.

    The tokens issued are encrypted using the public key of the trusted relying party. Accordingly, even the client that obtains the token to send to the RP has no visibility to the included token.  
    Example: Enter the endpoint address of the service that you are running.  

    ![add-new-trusted-service]({{base_path}}/assets/img/guides/ws-trust-sts-config.png)

6. Click **Apply**.

A new trusted service is added to the service provider.

You can delete any trusted service by clicking on the associated **Delete** link.