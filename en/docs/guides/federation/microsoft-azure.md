# Configure Microsoft Azure as a Federated Authenticator

This page guides you through configuring Microsoft Azure as a federated authenticator in WSO2 Identity Server. 

---

This guide assumes you have your own applications. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/ms-azure-as-federated-authenticator-sample"   rel="nofollow noopener">Try it with the sample</a>

---

## Set up an app in Microsoft Azure

!!! note
    You can skip this section if you have already registered your application on Microsoft Azure. 

1. Login to <https://portal.azure.com/#home> using your Microsoft credentials. 

2. Select **App registrations** listed under **Azure services**. 

    ![azure-services](../../assets/img/samples/azure-services.png)

3. Click on **Register an application**.
    
    ![create-azure-app](../../assets/img/samples/register-azure.png)

4. Fill in the application details with the relevant values. 

5. Make note of the **Application (client) ID** that appears in the Overview section. 

6. Select **certificates and secrets** from the left handside panel. 

7. Click on **New client secret** and give a description. 

8. Click **Add**.

9. Make note of the client secret value. 

10. Log out of the Microsoft console. 

---

## Configure Microsoft Azure as an IdP in WSO2 IS 

(insert-link)

---

## Configure the service provider

(insert-admin-portal-link)

---

You have successfully configured Microsoft Azure as your federated authenticator. Now, when you try to login to your application, it should redirect to the Microsoft login page. On successful authentication with your Microsoft credentials, you will be able to access your application. 