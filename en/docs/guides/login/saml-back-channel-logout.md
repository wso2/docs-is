# Configure SAML 2.0 Back-Channel Logout

This page guides you through [SAML 2.0 back-channel logout](../../../references/concepts/authentication/saml-back-channel/) for applications with WSO2 Identity Server. This will ensure that the user is logged out from all configured applications with a single logout request via one of the applications.

!!! note
    Make sure you have a service provider configured in WSO2 Identity Server for every application that you are going 
    to try out this feature for. 

---

## Scenario

The user is required to log in to two different applications. For convenience and security, the user should be logged out of both the applications when the user attempts to log out from either one of them. 

---

## Deploy the Pickup Dispatch webapp 

{! fragments/pickup-dispatch-saml.md !}

---

## Deploy the Pickup Manager webapp 

{! fragments/pickup-manager-saml.md !}

---

## Try it

Once you have configured all your applications, access them on separate tabs in your browser. When you log out from one of the applications, it should log you out from all the other configured applications.

1.  Access the Pickup Dispatch application, `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/index.jsp`.

2.  Log in using admin/admin credentials. 

    ![Pickup Dispatch home page](../../assets/img/samples/pickup-dispatch.png)

3.  Access the Pickup Manager application, `http://localhost.com:8080/saml2-web-app-pickup-manager.com/index.jsp`.

4.  Log in using admin/admin credentials. 

    ![Pickup Manager home page](../../assets/img/samples/pickup-manager.png)

5.  Now log out of the Pickup Dispatch application. 

6.  You can see that you have been logged out of the Pickup Manager application as well. 

    ![Logout message](../../assets/img/samples/backchannel-logout.png) 

---

!!! info "Related topics"
    -   [Concept: SAML 2.0 back-channel logout](../../../references/concepts/authentication/saml-back-channel/)