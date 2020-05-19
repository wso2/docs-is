# Configure Google as a Federated Authenticator

This page guides you through configuring Google as a federated authenticator in WSO2 Identity Server. 

---

This guide assumes you have your own applications. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/google-as-federated-authenticator-sample" target="_blank" rel="nofollow noopener">Try it with the sample</a>

---

!!! tip " Before you begin"  
    1.  [Create a Google domain](https://www.bettercloud.com/monitor/the-academy/create-google-apps-domain-three-easy-steps/).
    2.  [Install](https://wso2.com/identity-and-access-management/install/) WSO2 Identity Server.
	3.  Navigate to `<IS_HOME>/bin` and run the product using one of the following commands. For more information, see [Running the product](insert-link).

		```curl tab="Windows"
		wso2server.bat
		```

		```curl tab="Linux/Mac OS"
		wso2server.sh
		```
---

## Set up Google as a SAML IdP

!!! note
    You can skip this section if you have already registered your application on Google. 

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

## Configure the service provider

(insert-admin-portal-link)

---

You have successfully configured Google as your federated authenticator. Now, when you try to login to your application, it should redirect to the Google login page. On successful authentication with your Google credentials, you will be able to access your application. 
