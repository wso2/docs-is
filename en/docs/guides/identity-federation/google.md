# Configure Google as a Federated Authenticator

This page guides you through configuring Google as a federated authenticator in WSO2 Identity Server. 

---

This guide assumes you have your own application. If you wish to try out this flow with a sample application, click the button below. 

<a class="samplebtn_a" href="../../../quick-starts/google-as-federated-authenticator-sample"   rel="nofollow noopener">Try it with the sample</a>

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

	![more-controls-saml-apps](../../../assets/img/samples/saml-app.png)
	

5.  Click on the 
    ![more-controls-icon](../../../assets/img/samples/more-controls.png) icon found at
    the bottom-right of the page.
6.  Click **SETUP MY OWN CUSTOM APP**  
    ![setup-my-own-custom-app](../../../assets/img/samples/set-up-my-own-app.png)
    
7.  Click **Download** next to the **IDP Metadata** field to download
    the Google identity provider metadata.  
    A `          GoogleIDPMetadata.xml         ` file is downloaded on
    to your machine.  
    
    ![idp-metadata](../../../assets/img/samples/download-idp-metadata.png)
    
8.  Click **Next** and enter an **Application Name** and **Description**
    for your application. This is the name and description that your
    users will see.  
    You can also upload an image of your logo.
9.  Click **Next** and enter the app details
10. Click **Next** and then click **Finish**.
11. Once the application is configured, click **Edit Service** and
    change the **Service Status** to **ON**. You can turn on the
    service for everyone or for some users only.

---

## Configure Google as a SAML IdP in WSO2 IS

1.  Log in to the management console (`https://<IS_HOST>:<PORT>/carbon`) using admin/admin credentials.
2.  Click **Add** under **Identity Providers** on the **Main** tab.
3.  Enter "GoogleIdP" as the identity provider name and expand
    **Federated Authenticators\>SAML2 Web SSO Configuration**.
4.  Select **Enable SAML2 Web SSO** and enter "wso2is1" as the **Service
    Provider Entity ID**.

    !!! info 
		The **Service Provider Entity ID** value should be equal to the
		value you entered as the Entity ID when configuring Google.

5.  Select **Metadata File Configuration** as the **Mode** and upload
    the `          GoogleIDPMetadata         `.xml file you downloaded
    earlier.  
    ![metadata-file-config](../../../assets/img/guides/metadata-file-config.png)
    
6.  Click **Register** to save the identity provider configurations.
7.  Once the IdP is registered, it is listed under Identity
    Providers. Click **Edit** and expand **Federated
    Authenticators\>SAML2 Web SSO Configuration**.  
    ![idp-list](../../../assets/img/guides/idp-list.png)
    
8.  Select **Enable Logout** and enter "
    https://accounts.google.com/logout" as the Logout URL.
    ![enter-the-logout-url](../../../assets/img/guides/enter-the-logout-url.png)
    
9. Click **Update** to save the changes.

---

## Configure the service provider

{! fragments/register-a-service-provider.md !}

5.  Expand the **Inbound Authentication Configuration** and the **SAML2
    Web SSO Configuration**, and click **Configure**.
6.  In the form that appears, fill out the following configuration
    details required for single sign-on. 
    
    !!! info
        For more details about attributes in the following configuration, refer [SAML2 Web SSO Configuration](../../../guides/login/webapp-saml/).  
    
    See the following table for details.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Value</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Issuer</td>
    <td><div class="content-wrapper">
    <p><code>                 google.com                </code></p>
    </div></td>
    <td>This is the <code>               &lt;saml:Issuer&gt;              </code> element that contains the unique identifier of the service provider.</td>
    </tr>
    <tr class="even">
    <td>Assertion Consumer URL</td>
    <td><pre><code>https://google.com/a/&lt;ENTER_YOUR_DOMAIN&gt;/acs</code></pre>
    <code>              </code></td>
    <td>This is the URL to which the browser should be redirected to after the authentication is successful. This is the Assertion Consumer Service (ACS) URL of the service provider. The identity provider redirects the SAML2 response to this ACS URL. However, if the SAML2 request is signed and SAML2 request contains the ACS URL, the Identity Server will honor the ACS URL of the SAML2 request.</td>
    </tr>
    <tr class="odd">
    <td>NameID Format</td>
    <td>The default value can be used here.</td>
    <td>This defines the name identifier formats supported by the identity provider. The service provider and identity provider usually communicate with each other regarding a specific subject. That subject should be identified through a Name-Identifier (NameID), which should be in some format so that it is easy for the other party to identify it based on the format. Name identifiers are used to provide information regarding a user.</td>
    </tr>
    <tr class="even">
    <td>Certificate Alias</td>
    <td>wso2carbon</td>
    <td>Select the <strong>Certificate Alias</strong> from the drop-down. This is used to validate the signature of SAML2 requests and is used to generate encryption. Basically, the service provider’s certificate must be selected here. Note that this can also be the Identity Server tenant's public certificate in a scenario where you are doing a tenant-specific configuration.</td>
    </tr>
    <tr class="odd">
    <td>Enable Response Signing</td>
    <td>Selected</td>
    <td><p>Select <strong>Enable Response Signing</strong> to sign the SAML2 responses returned after the authentication process.</p></td>
    </tr>
    <tr class="even">
    <td>Enable Attribute Profile</td>
    <td>Selected</td>
    <td>Select <strong>Enable Attribute Profile</strong> to enable this and add a claim by entering the claim link and clicking the <strong>Add Claim</strong> button. The Identity Server provides support for a basic attribute profile where the identity provider can include the user’s attributes aof the attribute statement.</td>
    </tr>
    <tr class="odd">
    <td>Include Attributes in the Response Always</td>
    <td>Selected</td>
    <td>Once you select the checkbox to <strong>Include Attributes in the Response Always</strong> , the identity provider always includes the attribute values related to the selected claims in the SAML attribute statement.</td>
    </tr>
    </tbody>
    </table>

7.  Click **Register** to save your configurations.

---

You have successfully configured Google as your federated authenticator. Now, when you try to login to your application, it should redirect to the Google login page. On successful authentication with your Google credentials, you will be able to access your application. 

!!! info "Related topics" 
    - [Concepts: Introduction to Identity Federation](../../../references/concepts/identity-federation/)