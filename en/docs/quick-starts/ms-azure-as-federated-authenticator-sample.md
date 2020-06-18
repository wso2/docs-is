# Log into a Sample Application using Microsoft Azure

This page guides you through using Microsoft Azure as a federated authenticator and logging into a sample application. Here, we use a **sample application** called Pickup. 

---

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/federation/microsoft-azure"   rel="nofollow noopener">I have my own application</a>

---

!!! tip "Before you begin"
    
    Create an account in [Microsoft](https://login.microsoftonline.com/) if you do not have one already.
    

## Set up an app in Microsoft Azure

1. Login to <https://portal.azure.com/#home> using your Microsoft credentials. 

2. Select **App registrations** listed under **Azure services**. 

    ![azure-services](../../assets/img/samples/azure-services.png)

3. Click on **Register an application**.
    
    ![create-azure-app](../../assets/img/samples/register-azure.png)

4. Fill in the application details with the following values. 

    - App name - Pickup
    - Redirect URI - https://localhost:9443/commonauth
    
    ![fill-azure](../../assets/img/samples/azure-registered.png)

5. Make note of the **Application (client) ID** that appears in the Overview section. 

    ![app-id](../../assets/img/samples/app-id.png)

6. Select **certificates and secrets** from the left handside panel. 

7. Click on **New client secret** and give a description. 

    ![client-secret](../../assets/img/samples/azure-client-secret.png)

8. Click **Add**.

9. Make note of the client secret value. 

10. Log out of the Microsoft console. 

---

## Configure Microsoft Azure as an IdP in WSO2 IS 

(insert-link)

---

## Deploy the Sample App

{! fragments/pickup-dispatch-saml.md !}

---

## Try it out

1.  Access the Pickup sample application URL:
    <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com>
2.  Click **Login**. You are redirected to the Twitter login page. Once you have entered your credentials, you need to consent to the sample app accessing information. 

3. Click **yes**. 
    ![twitter-login-page](../../assets/img/samples/consent-azure.png)
    
3.  Click **Continue**. 
4.  On a new tab on your browser, access the following URL:
    <https://login.microsoftonline.com/>.

    !!! info 
    	You are automatically logged in to your Microsoft Azure account using single sign-on (SSO).