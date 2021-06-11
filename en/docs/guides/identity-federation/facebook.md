# Configure Facebook as a Federated Authenticator

This page guides you through configuring Facebook as a federated authenticator in WSO2 Identity Server. 

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/fb-as-federated-authenticator-sample"   rel="nofollow noopener">Try it with the sample</a>

---

Follow the steps given below to configure WSO2 Identity Server to authenticate users using their Facebook credentials.

## Create a Facebook app

!!! note 
	You can skip this section if you have already registered your application on Facebook. 

1. Go to <https://developers.facebook.com/> and log in using your Facebook credentials.

2. Click on **My Apps**.

3. Click on **Create App**.

4. Choose what you need your app to do. 

5. Enter a **Display Name** and your **Contact Email**.

6. Choose your **App Purpose**.

7. Click **Create App**.

8. Complete the security check and click **Submit**. 

9. Click **Set up** under Facebook Login.

7. Select **Web** as the platform for the app used.

8. Enter the **Site URL** and click **Save**. Click **Continue**.

9. You will see the basic version of the Facebook SDK for JavaScript. Replace {your-app-id} with the App ID and {api-version} with the required values.

10. Click **Next** on **Check Login Status** and **Add the Facebook Login Button**. 

12. Click **Facebook Login** > **Settings** on the left menu. 

13. Ensure that **Client OAuth Login** and **Web OAuth Login** are enabled. 

14. Enter `https://localhost:9443/commonauth` as the value for **Valid OAuth redirect URIs**.

14. Click **Save Changes**.

15. Click on **Settings** > **Basic**. You can see the **App ID** and **App Secret**. Click **Show** to view the **App Secret**.

17. Add the **App Domains**.

18. Click **Save Changes**.

Now you have finished configuring Facebook as an Identity Provider.

{! fragments/fb-review.md !}

---

## Configure the identity provider 

{! fragments/register-an-identity-provider.md !}
    
4.  Go to **Facebook Configuration** under **Federated Authenticators**.

5.  Enter the following values in the form that appears:
    <table style="fixed width">
    <col width="0">
    <col width="70">
    <col width="10">
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Client Id</td>
    <td><div class="content-wrapper">
    <p>This refers to the App ID you received from the Facebook app you created.</p>
	<div class="admonition note">
	<p class="admonition-title">Don't know the client ID? See more information</p>
	<p><ol>
    <li>Go to <a href="https://developers.facebook.com/">https://developers.facebook.com/</a> and log in using your Facebook credentials.</li>
    <li>Click on your app from the <strong>My Apps</strong> drop-down list.<br />
    You are navigated to the <strong>Dashboard</strong> of the application. Note down the App ID and the App secret.</li>
    </ol>
    <p><img src="../../../assets/img/guides/fb-app-on-dashboard.png"/></p>.</p>
    </div>    
    </td>
    <td><div class="content-wrapper">
    <p>&lt;Application ID of the Facebook App&gt;</p>
    <p><br />
    </p>
    </div></td>
    </tr>
    <tr class="even">
    <td>Client Secret</td>
    <td>This refers to the App Secret you received from the Facebook app you created.</td>
    <td>&lt;App Secret of the Facebook App&gt;</td>
    </tr>
    <tr class="odd">
    <td>Scope</td>
    <td>Defines the permission to access particular information from a Facebook profile. See the <a href="https://developers.facebook.com/docs/facebook-login/permissions">Permissions Reference</a> for a list of the different permission groups in Facebook APIs.</td>
    <td>email</td>
    </tr>
    <tr class="even">
    <td>User Information Fields</td>
    <td>These are the claims related to the user account on Facebook. WSO2 Identity Server requests these fields from Facebook when a user is authenticated with Facebook through the IS. See <a href="https://developers.facebook.com/docs/facebook-login/permissions#reference-public_profile">public_profile permission</a> for more information about these fields.</td>
    <td>id,name,gender,email,first_name,last_name,age_range,link</td>
    </tr>
    <tr class="odd">
    <td>Callback Url</td>
    <td>This is the URL to which the browser should be redirected after the authentication is successful. This should be the commonauth endpoint of Identity server.</td>
    <td><a href="https://localhost:9443/commonauth">https://localhost:9443/commonauth</a></td>
    </tr>
    </tbody>
    </table>

    ![facebook-configuration](../../../assets/img/guides/facebook-configuration.png)

6.  Select both checkboxes to **Enable Facebook Authenticator** and make
    it the **Default**.

7.  Click **Register**.

You have now added the identity provider.

---

## Configure the service provider 

{! fragments/register-a-service-provider.md !}
    
4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section and
    set the configurations as required.

    1.  Enter the values for **Issuer** and **Assertion Consumer URL**.

    2.  Select the following check-boxes:

        1.	Enable Response Signing

        2.	Enable Single Logout

        3.	Enable Attribute Profile

        4.	Include Attributes in the Response Always

    ![configuring-sp-fields](../../../assets/img/guides/configuring-sp-fields.png)
    
5.  Click **Register**. Now you will be sent back to the **Service
    Providers** page.

6.  Go to the **Local and Outbound Authentication Configuration**
    section.

7.  For **Authentication Type**, select the **Federated Authentication** radio button and select the
    Identity Provider you created from the dropdown list under
    **Federated Authentication**.  
    ![identity-provider-in-federated-authentication](../../../assets/img/guides/identity-provider-in-federated-authentication.png)

8.  Click **Update** to save the changes.

You have now added and configured the service provider.

!!! note
    The default client-truststore.jks found in the
    `         <IS_HOME>/repository/resources/security/        ` directory
    contains the Facebook certificate by default.
    

!!! infor "Related topics"

	For more information on SSO, see [Single Sign-On](../../../guides/login/enable-single-sign-on/).

---

## Configure claim mappings and requested claims

All the basic information of a user/application is stored in the form of
claims. But for the same information, different Identity Providers(IdP)
have different claims. Therefore, there should be a proper mechanism to
map those claims within Identity Providers.

Here, we are authenticating the service provider application using
facebook IDP. Therefore we need to map FaceBook claims with our WSO2 IDP
claims.

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Identity Providers**.
    
2.  Click **Edit** to edit the facebook identity provider you created.

3.  Under **Claim Configuration**, go to **Basic Claim Configuration**.
    
4.  Select the **Define Custom Claim Dialect** option under **Select
    Claim mapping Dialect**.
    
5.  Click **Add Claim Mapping.** The following screen will be
    displayed.  
    ![add-claim-mapping-for-facebook](../../../assets/img/guides/add-claim-mapping-for-facebook.png)
    
6.  Now add custom claim mappings as follows.  
    ![custom-claim-mapping](../../../assets/img/guides/custom-claim-mapping.png)
    
7.  You can retrieve all the public information of the user and the
    email address. The following are some common attribute names.

    -	id  
    -	email  
    -	name  
    -	first\_name  
    -	last\_name  
    -	link  
    -	gender  
    -	locale  
    -	age\_range

    More information is available from the following link:
    <https://developers.facebook.com/docs/facebook-login/permissions/v2.0>

    You can map these attributes to any **Local Claim URI** that is
    suitable.

8.  From the receiving claims, you can select one claim as the user
    identifier for that particular identity provider. You can configure
    this through **User ID Claim URI** (e.g., email).
9.  Click **Update** to save changes.


---

You have successfully configured facebook as your federated authenticator. Now, when you try to log in to your application, it should redirect to the Facebook login page. On successful authentication with your Facebook credentials, you will be able to access your application. 



!!! info "Related topics"
	-   See the following topics for samples of configuring Facebook for
		federated authentication:
		-   [Concepts: Introduction to Identity Federation](../../../references/concepts/identity-federation/)
