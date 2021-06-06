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

	![create-app](../../../assets/img/samples/create-app.png)

3. Enter a **Display Name** and your **Contact Email**.

4.  Click on **Create App ID**.

	![register-app-fb](../../../assets/img/samples/register-app-fb.png)

5. Complete the security check and click **Submit**. 

6. Click **Set up** under Facebook Login.

	![setup-fb](../../../assets/img/samples/facebook-login.png)

7. Select **Website** as the platform for the app used in this sample.

8. Enter `https://<IS_HOST>:<IS_PORT>/` as the **Site URL** and click **Save**.

	![enter-url](../../../assets/img/samples/enter-url.png)

9.  You can configure the **Client OAuth Settings** on the window that
    appears.  
    ![client-oauth-setting](../../../assets/img/samples/client-oauth-settings.png)

    1.  Set **Client OAuth Login** to **Yes**.  
        
    2.  Set **Web OAuth Login** to **Yes**.  
        
    3.  Enter  ` https://<IS_HOST>:<IS_PORT>/commonauth.  ` as the value for **Valid OAuth redirect URIs**. 

10. Click **Save Changes**.

11. Click on **Settings > Basic.** You can see the **App ID** and **App
    Secret** as shown in the image below. Click **Show** to view the
    **App Secret**.

12. Click **Settings** on the left menu and navigate to the **Basic** tab. 

13. Add the **App Domains** as shown below. 

	![details-basic](../../../assets/img/samples/details-basic.png)

13. Click **Save Changes**.

Now you have finished configuring Facebook as an Identity Provider.

{! fragments/fb-review.md !}

---

## Configure the identity provider 
	
{! fragments/register-an-identity-povider.md !}

{! fragments/idp-facebook.md !}

---

## Deploy the Sample App

{! fragments/travelocity.md !}

---

## Configure claim mappings and requested claims

{! fragments/fb-claim-mapping.md !}

---

## Test it out

1. To test the sample, go to the following URL: `http://<IS_HOST>:<IS_PORT>/travelocity.com`.

	![travelocity-app](../../../assets/img/samples/travelocity-fb.png)

2. Click the link to log in with SAML from WSO2 Identity Server.

3. You are redirected to the Facebook Login page. Enter your Facebook credentials and you will be taken to the home page of the travelocity app.

!!! info "Related topics"
	-   [Logging in to your application via Identity Server using Facebook Credentials](../../../guides/identity-federation/facebook)

