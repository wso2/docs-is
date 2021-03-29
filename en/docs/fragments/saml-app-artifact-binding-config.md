## SAML Configurations 

1. Expand **Inbound Authentication Configuration > SAML2 Web SSO Configuration** and click **Configure**.

2. Enter the **Issuer**. 

    !!! info
        The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
     
3. Enter the **Assertion Consumer URL** and click **Add**.
    
    !!! info
        The **Assertion Consumer URL** is the Assertion Consumer Service (ACS) URL of the service provider. This URL should be the URL of the page to which the browser is redirected to after successful authentication.

4. Select **Enable SAML2 Artifact Binding**. Once this is enabled, WSO2 Identity Server responds to each SAML SSO authentication request with an artifact.

5. You can also enable signature validation by selecting **Enable Signature Validation in Artifact Resolve Request**. Once this is enabled, WSO2 IS expects to receive signed artifact resolve requests and validates that signature against the service provider certificate.

6. Click **Register**.
    
!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations](../../../guides/login/saml-app-config-advanced). 

