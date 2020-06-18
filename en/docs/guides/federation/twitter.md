# Configure Twitter as a Federated Authenticator

This page guides you through configuring Twitter as a federated authenticator in WSO2 Identity Server. 

---

This guide assumes you have your own applications. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/twitter-as-federated-authenticator-sample"   rel="nofollow noopener">Try it with the sample</a>

---

## Set up a Twitter app

!!! note 
	You can skip this section if you have already registered your application on Twitter. 

1. Login to <https://developer.twitter.com/> using your Twitter credentials. 

2. Click on the downwards arrow adjecent to your profile icon and select **Apps**. '

3. Click on **Create an app**.
    
    ![create-twittter-app](../../assets/img/samples/create-app-twitter.png)

4. Fill in the relevant application details. 

5. Click  **Create**.

6. Move to the next tab, **keys and tokens**. 

7. Click on the **Generate** button adjacent to **Access token & access token secret**. 

8. Make note of the Access token and Access token secret that appears next. 

9. Move to the next tab, **Permissions**. 

10. Select **Read and write** as the Access Permission. 

---

## Configure Twitter as an IdP in WSO2 IS 

(insert-link)

---

## Configure the service provider

(insert-admin-portal-link)

---

You have successfully configured Twitter as your federated authenticator. Now, when you try to login to your application, it should redirect to the Twitter login page. On successful authentication with your Twitter credentials, you will be able to access your application. 