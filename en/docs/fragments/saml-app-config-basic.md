## Basic SAML Configurations 

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > SAML2 Web SSO Configuration** and click **Configure**.

2. Enter the **Issuer** and **Assertion Consumer URL**. Click **Add**. 

     - The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
     
     - The **Assertion Consumer URL** is the Assertion Consumer Service (ACS) URL of the service provider. This URL should be the URL of the page to which the browser is redirected to after successful authentication.
    
!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations](../../../guides/login/saml-app-config-advanced). 

