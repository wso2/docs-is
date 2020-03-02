## Configure STS for the client app

1. Expand **Inbound Authentication Configuration > WS-Trust Security Token Service Configuration** and click **Configure**.

2. Enter the **Endpoint Address** and the **Certificate Alias**. 

    - The **Endpoint Address** is the trusted relying party's endpoint address, which is the endpoint address of the Security Token Service. The endpoint must be used as the service URL to which the token gets delivered by the STS client.

    - The **Certificate Alias** is the name given to the CA certificate that is imported to the keystore.  

        ![configure-sts](../../../assets/img/fragments/configure-sts.png)

3. Click **Update** to save the changes. 