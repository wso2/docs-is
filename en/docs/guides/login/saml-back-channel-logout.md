# Configure SAML 2.0 Back-Channel Logout

This page guides you through [SAML 2.0 back-channel logout](../../../references/concepts/authentication/saml-back-channel/) for applications with WSO2 Identity Server. This will ensure that the user is logged out from all configured applications with a single logout request via one of the applications. 

---

This guide assumes you have your own applications. If you wish to try out this flow with sample applications, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/saml-back-channel-logout" rel="nofollow noopener">Try it with the sample</a>

---

!!! note
    Make sure you have a service provider configured in WSO2 Identity Server for every application that you are going 
    to try out this feature. 
---

## Register your applications with WSO2 Identity Server

{!fragments/register-a-service-provider.md!}

### SAML Configurations 

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > SAML2 Web SSO Configuration** and click **Configure**.

2. Enter the **Issuer**. 

    !!! info
        The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
       
3. Enter the **Assertion Consumer URL** and click **Add**. 
    
    !!! info 
        The **Assertion Consumer URL** is the Assertion Consumer Service (ACS) URL of the service provider. This URL should be the URL of the page to which the browser is redirected to after successful authentication.
    
4. Select **Enable Single Logout**.

5. Select **Back-Channel Logout** as the **Logout Method**.

6. Click **Register**.

!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations](../../../guides/login/saml-app-config-advanced). 

---

Once you have configured all your applications, access them on separate tabs in your browser. When you log out from one of the applications, it should log you out from all the other configured applications. 

!!! info "Related Topics"
    -   [Concept: SAML 2.0 back-channel logout](../../../references/concepts/authentication/saml-back-channel/)
    -   [Demo: Configure SAML 2.0 Back-Channel Logout](../../../quick-starts/saml-back-channel-logout)
