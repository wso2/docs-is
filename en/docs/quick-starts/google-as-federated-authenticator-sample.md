# Log into a Sample Application using Google

This page guides you through using Google as a federated authenticator and logging into a sample application. Here, we use a **sample application** called Pickup. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/federation/google"   rel="nofollow noopener">I have my own application</a>

----


!!! tip " Before you begin"  
    [Create a Google domain](https://www.bettercloud.com/monitor/the-academy/create-google-apps-domain-three-easy-steps/).

---

## Set up Google as a SAML IdP

1.  Access the Google Admin console by navigating to this URL:
    <https://admin.google.com/>.
2.  Log in using your administrator account.
3.  Click **Admin Console**.
4.  Click **Apps** > **SAML apps** from the left hand panel.
	
	!!! info 
		If you do not see the Apps button on the home page, click **More
		Controls** at the bottom of the page.   

	![more-controls-saml-apps](../../assets/img/samples/saml-app.png)
	

5.  Click on the 
    ![more-controls-icon](../../assets/img/samples/more-controls.png) icon found at
    the bottom-right of the page.
6.  Click **SETUP MY OWN CUSTOM APP**  
    ![setup-my-own-custom-app](../../assets/img/samples/set-up-my-own-app.png)
    
7.  Click **Download** next to the **IDP Metadata** field to download
    the Google identity provider metadata.  
    A `          GoogleIDPMetadata.xml         ` file is downloaded on
    to your machine.  
    
    ![idp-metadata](../../assets/img/samples/download-idp-metadata.png)
    
8.  Click **Next** and enter an **Application Name** and **Description**
    for your application. This is the name and description that your
    users will see.  
    You can also upload an image of your logo.
9.  Click **Next** and enter the following details.

    !!! info 
		In this tutorial, the **Start URL** configured below is the homepage
		URL the WSO2 IS sample application, Pickup.

    1.  **ACS URL:**
        `                         https://localhost:9443/commonauth                       `
    2.  **Entity ID:** `            wso2is1           `
    3.  **Start URL** :
        `                         http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp                       `
    4.  **Name ID Format:** `            EMAIL           `
        `                       `
        ![start-url](../../assets/img/samples/sp-details-google.png)

10. Click **Next** and then click **Finish**.
11. Once the application is configured, click **Edit Service** and
    change the **Service Status** to **ON**. You can turn on the
    service for everyone or for some users only.

---

## Configure Google as a SAML IdP in WSO2 IS

(insert-admin-portal-link)

---

## Deploy the Sample App

{! fragments/pickup-dispatch-saml.md !} 

---

## Try it out

1.  Access the Pickup sample application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>
2.  Click **Login**. You are redirected to the Google login page.  
    ![google-login-page](../../assets/img/samples/sign-in-google.png)
    
3.  Sign in using your Google credentials. You are redirected to the
    Pickup sample homepage.
4.  On a new tab on your browser, access the following URL:
    <https://mail.google.com>.

    !!! info 
    	You are automatically logged in to your Gmail using single sign-on (SSO).
