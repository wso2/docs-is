# Configure Facebook as a Federated Authenticator

This page guides you through configuring Facebook as a federated authenticator in WSO2 Identity Server. 

---

This guide assumes you have your own applications. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/fb-as-federated-authenticator-sample" target="_blank" rel="nofollow noopener">Try it with the sample</a>

---

!!! tip "Before you begin"
	
	1.	[Install](https://wso2.com/identity-and-access-management/install/) WSO2 Identity Server.
	
	2.	Navigate to `<IS_HOME>/bin` and run the product using one of the following commands. For more information, see [Running the product](insert-link).

		```java tab="Windows"
		wso2server.bat
		```

		```java tab="Linux/MacOS"
		wso2server.sh
		```

Follow the steps given below to configure WSO2 Identity Server to authenticate users using their Facebook credentials.

## Create a Facebook app

!!! note 
	You can skip this section if you have already registered your application on Facebook. 

1. Go to <https://developers.facebook.com/> and log in using your Facebook credentials.

2. Click on **Create App**.

3. Enter a **Display Name** and your **Contact Email**.

4.  Click on **Create App ID**.

5. Complete the security check and click **Submit**. 

6. Click **Set up** under Facebook Login.

7. Select **Website** as the platform for the app used in this sample.

8. Enter `https://localhost:9443/` as the **Site URL** and click **Save**.

9.  You can configure the **Client OAuth Settings** on the window that
    appears.  

    1.  Set **Client OAuth Login** to **Yes**.  
        
    2.  Set **Web OAuth Login** to **Yes**.  
        
    3.  Enter  ` https://localhost:9443/commonauth.  ` as the value for **Valid OAuth redirect URIs**. 

10. Click **Save Changes**.

11. Click on **Settings > Basic.** You can see the **App ID** and **App
    Secret** as shown in the image below. Click **Show** to view the
    **App Secret**.

12. Click **Settings** on the left menu and navigate to the **Basic** tab. 

13. Add the **App Domains**.

14. Click **Save Changes**.

Now you have finished configuring Facebook as an Identity Provider.

!!! info "About accessing the app"

	The app is not available to general public yet. To make to app available
	to every Facebook user, you have to submit the app for review. After a
	review, Facebook makes the app available to every Facebook user. You can
	find more information on the review process by clicking on **App
	Review** in the left navigation menu of your app's dashboard.

	The review process may take some time, so for the purposes of this
	sample, you can specify some Facebook users as Developers or Testers.
	Only the users specified here can use this app to log in with Facebook
	until the app goes public. To do this, click on **Roles** in the left
	navigation menu of the dashboard and specify the required Facebook users
	as Developers or Testers.

	![submit-fb-app-for-review](../../assets/img/samples/add-app-roles.png)

---

## Configure the identity provider 
	
(insert-link-from-admin-portal)

---

## Configure the service provider 
	
(insert-link-from-admin-portal)

---

## Configure claim mappings and requested claims

(insert-link-from-admin-portal)

---

You have successfully configured facebook as your federated authenticator. Now, when you try to login to your application, it should redirect to the Facebook login page. On successful authentication with your Facebook credentials, you will be able to access your application. 

---

!!! info "Related Topics"
	-   For more information on how to configure an
		identity provider, see [Configuring an Identity Provider](insert-link).
	-   See the following topics for samples of configuring Facebook for
		federated authentication:
		-   [Logging in to your application via WSO2 Identity Server using Facebook Credentials](../../samples/fb-as-federated-authenticator-sample)
		-   [Logging in to Salesforce with Facebook](insert-link)
