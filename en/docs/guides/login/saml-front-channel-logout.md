# Configure SAML 2.0 Front Channel Logout

This page guides you through configuring [SAML 2.0 front channel logout](../../../references/concepts/authentication/saml-front-channel/) for applications with WSO2 Identity Server. This will ensure that the user is logged out from all configured applications with a single logout request via one of the applications. 

---

This guide assumes you have your own applications. If you wish to try out this flow with sample applications, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/saml-front-channel-logout" rel="nofollow noopener">Try it with the sample</a>

---

!!! note
    Make sure you have a service provider configured in WSO2 Identity Server for every application that you are going 
    to try out this feature.  

## Register your applications with WSO2 Identity Server

{!fragments/register-a-service-provider.md!}

---
### SAML Configurations 

Make the following changes to the created service provider.

1. Expand **Inbound Authentication Configuration > SAML2 Web SSO Configuration** and click **Configure**.

2. Enter the **Issuer**. 

    !!! info
        The **Issuer** is the unique identifier of the service provider. This is also the issuer value specified in the SAML Authentication Request issued by the service provider.
       
3. Enter the **Assertion Consumer URL** and click **Add**. 
    
    !!! info 
        The **Assertion Consumer URL** is the Assertion Consumer Service (ACS) URL of the service provider. This URL should be the URL of the page to which the browser is redirected to after successful authentication.
    
4. Select **Enable Single Logout**. Enter the **SLO Response URL** and **SLO Request URL**.

5. Select **Front-Channel Logout (HTTP Redirect Binding)** or **Front-Channel Logout (HTTP POST Binding)** as the **Logout Method**.

6. Click **Register**.

!!! tip
     To configure more advanced configurations, see [Advanced SAML Configurations](../../../guides/login/saml-app-config-advanced). 

--- 

Once you have configured all your applications, access them in separate tabs in your browser. When you logout from one application, it should log you out from all the configured applications. 

!!! info "Related topics"
    -   [Concept: SAML 2.0 front channel logout](../../../references/concepts/authentication/saml-front-channel/)
    -   [Demo: Configure SAML 2.0 Front Channel Logout](../../../quick-starts/saml-front-channel-logout)
