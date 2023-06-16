# Registering an identity verification provider

WSO2 Identity Server allows you to add identity verification providers (IDVP) and specify various details that help you link the identity verification provider to the WSO2 Identity Server. 
To properly configure the IDVPs, you must specify all information required to perform identity verification.

This guide walks you through adding and configuring identity verification providers based on your requirements.

!!! note
Adding and configuring an IDVP can be performed by administrators only.

## Register an identity verification provider

To add a new identity verification provider.

1. On WSO2 Identity Server Console, go to **Develop > Identity Verification Providers**

2. Click **New Identity Verification Provider**.  
   ![add-idvp]({{base_path}}/assets/img/guides/add-idvp-screen.png)

3. Add Identity verification provider's name and configurations and then click **Next**.
   ![add-idvp-config]({{base_path}}/assets/img/guides/add-idvp-config.png)

4. Then map the required local attributes to the attributes from the identity verification provider. 
   ![add-idvp-attribute-mapping]({{base_path}}/assets/img/guides/add-idvp-attribute-mapping.png)

5. Click **Finish** to add the Identity Verification Provider.

