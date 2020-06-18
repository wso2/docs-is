# Configure SAML 2.0 Back-Channel Logout 

This page guides you through configuring [SAML 2.0 back-channel logout](TODO:insert-link-to-concept). This is demonstrated using two sample applications, **Pickup Dispatch** and **Pickup Manager**.

----
If you have your own application, click the button below.

<a class="samplebtn_a" href="../../../guides/login/saml-back-channel-logout"   rel="nofollow noopener">I have my own application</a>

----

## Scenario

The user is required to log in to two different applications. For convenience and security, the user should be logged out of both the applications when the user attempts to log out from either one of them. 

---

## Deploy the Pickup Dispatch webapp 

{! fragments/pickup-dispatch-saml.md !}

---

## Deploy the Pickup Manager webapp 

{! fragments/pickup-manager-saml.md !}

---

## Try it out

1.  Access the Pickup Dispatch application, <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/index.jsp>.

2.  Log in using admin/admin credentials. 

    ![pickup-dispatch](../../../assets/img/samples/pickup-dispatch.png)

3.  Access the Pickup Manager application, <http://localhost.com:8080/saml2-web-app-pickup-manager.com/index.jsp>.

4.  Log in using admin/admin credentials. 

    ![pickup-manager](../../../assets/img/samples/pickup-manager.png)

5.  Now log out of the Pickup Dispatch application. 

6.  You can see that you have been logged out of the Pickup Manager application as well. 

    ![backchannel-logout](../../../assets/img/samples/backchannel-logout.png)
    
---

!!! info "Related Topics"
    -   [Concept: Configuring SAML Back-Channel Logout](TODO:insert-link-to-concept)
    -   [Guide: Configure SAML 2.0 Back-Channel Logout](../../../guides/login/saml-back-channel-logout)
