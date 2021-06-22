# Log into a Sample Application using Facebook

This page guides you through using Facebook as a federated authenticator and logging into a sample application. Here, we use a **sample application** called Travelocity. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/identity-federation/facebook/"   rel="nofollow noopener">I have my own application</a>

----

Follow the steps given below to configure WSO2 Identity Server to authenticate users using their Facebook credentials.

## Create a Facebook app

1. Go to <https://developers.facebook.com/> and log in using your Facebook credentials.

2. Click on **Create App**.

	![Create app](../../assets/img/samples/create-app.png)

3. Enter a **Display Name** and your **Contact Email**.

4.  Click on **Create App ID**.

	![Create app ID](../../assets/img/samples/register-app-fb.png)

5. Complete the security check and click **Submit**. 

6. Click **Set up** under Facebook Login.

	![Setup fb](../../assets/img/samples/facebook-login.png)

7. Select **Website** as the platform for the app used in this sample.

8. Enter `https://<IS_HOST>:<IS_PORT>/` as the **Site URL** and click **Save**.

	![Enter site URL](../../assets/img/samples/enter-url.png)

9.  You can configure the **Client OAuth Settings** on the window that
    appears.
      
    ![Client OAuth settings](../../assets/img/samples/client-oauth-settings.png)

    1.  Set **Client OAuth Login** to **Yes**.  
        
    2.  Set **Web OAuth Login** to **Yes**.  
        
    3.  Enter  ` https://<IS_HOST>:<IS_PORT>/commonauth.  ` as the value for **Valid OAuth redirect URIs**. 

10. Click **Save Changes**.

11. Click on **Settings** > **Basic.** You can see the **App ID** and **App
    Secret** as shown in the image below. Click **Show** to view the
    **App Secret**.

12. Click **Settings** on the left menu and navigate to the **Basic** tab. 

13. Add the **App Domains** as shown below. 

	![App basic details](../../assets/img/samples/details-basic.png)

13. Click **Save Changes**.

Now you have finished configuring Facebook as an Identity Provider.

!!!	info "About accessing the app"
	The app is not available to the general public yet. To make the app available
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

{! fragments/register-an-identity-provider.md !}

{! fragments/idp-facebook.md !}

---

## Deploy the sample application

{! fragments/travelocity.md !}

---

## Configure claim mappings and requested claims

{! fragments/fb-claim-mapping.md !}

---

## Test it out

1. To test the sample, go to the following URL: `http://<IS_HOST>:<IS_PORT>/travelocity.com`.

	![Travelocity application](../../assets/img/samples/travelocity-fb.png)

2. Click the link to log in with SAML from WSO2 Identity Server.

3. You are redirected to the Facebook Login page. Enter your Facebook credentials and you will be taken to the home page of the Travelocity app.

!!! info "Related topics"
	-   [Logging in to your application via Identity Server using Facebook Credentials](../../guides/identity-federation/facebook)

