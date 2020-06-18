## Basic SAML Configurations 

1. Expand **Inbound Authentication Configuration > SAML Configuration** and click **Configure**.

2. Enter the **Issuer** and **Assertion Consumer URL**. Click **Add**. 

     - The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
     
     - The **Assertion Consumer URL** is the Assertion Consumer Service (ACS) URL of the service provider. This URL should be the URL of the page to which the browser is redirected to after successful authentication.
    
3. To configure more advanced configurations, see [SAML Configurations](../../login/saml-app-config-advanced). 
