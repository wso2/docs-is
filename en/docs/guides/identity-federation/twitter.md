# Configure Twitter as a Federated Authenticator

This page guides you through configuring Twitter as a federated authenticator in WSO2 Identity Server.

## Set up a Twitter app

!!! note 
	You can skip this section if you have already registered your application on Twitter. 

1. Login to <https://developer.twitter.com/> using your Twitter credentials. 

2. Click on the downwards arrow adjecent to your profile icon and select **Apps**.

3. Click on **Create an app**.
    
    ![Create Twittter app](../../assets/img/samples/create-app-twitter.png)

4. Fill in the application details with the following values. 

    - App name - Pickup-Dispatch-Application
    - Application description - A sample app which can be accessed via twitter
    - Website URL - `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp`
    - Select **Enable sign in with Twitter**
    - Callback URLs - `https://localhost:9443/commonauth`
    - Tell us how this app will be used - This is a test app used to verify logging into a sample application, using Twitter as a federated authenticator

5. Click  **Create**.

    ![App details](../../assets/img/samples/app-created-twitter.png)

6. Move to the next tab, **keys and tokens**. 

7. Click on the **Generate** button adjacent to **Access token & access token secret**. 

    ![Create access token](../../assets/img/samples/create-access-token.png)

8. Make note of the Access token and Access token secret that appears next. 

    ![Access token and access token secret](../../assets/img/samples/note-tokens.png)

9. Move to the next tab, **Permissions**. 

10. Select **Read and write** as the Access Permission.

---

{! fragments/register-an-identity-provider.md !}

4.  Expand **Twitter Configuration** under **Federated Authenticators**
    .
    ![twitter-config-federated-auth.png](../../../assets/img/guides/twitter-config-federated-auth.png)
    Fill in the following fields details according to the application
    [registered in the Twitter](http://docs.inboundnow.com/guide/create-twitter-application/):

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable</td>
    <td>This option enables Twitter to be used as an authenticator for user provisioned to the WSO2 Identity Server.</td>
    <td>Checked</td>
    </tr>
    <tr class="even">
    <td>Default</td>
    <td>This options sets the Twitter to be used as the default authentication mechanism. If you have already selected any other Identity Provider as the default federated authenticator, selecting this option deselects it.</td>
    <td>Checked</td>
    </tr>
    <tr class="odd">
    <td>API Key</td>
    <td>This is the <code>               consumer key              </code> generated at the Twitter application registration.</td>
    <td><code>               wuerRmdgwlqX0oE1WNDdsh17o              </code></td>
    </tr>
    <tr class="even">
    <td>API Secret</td>
    <td>This is the <code>               consumer secret              </code> generated at the Twitter application registration.</td>
    <td><div class="row">
    <code>                771tqnkpcbRyTBSCRQvVud1x8j1uQlCDpNZo3hRG0s4cEtsFky               </code>
    </div></td>
    </tr>
    <tr class="odd">
    <td>Callback URL</td>
    <td><p>This is the Callback URL you entered at the Twitter application registration. This is the URL to which the browser should be redirected after the authentication is successful.</p>
    <p>URL format: <code>                https://&lt;host-name&gt;:&lt;port&gt;/acs               </code></p>
    <p>The acs indicates the Assertion Consumer Service URL of the WSO2 Identity Server endpoint that accepts the responses sent by Twitter.</p></td>
    <td><code>                               https://wso2.com:9443/commonauth                             </code></td>
    </tr>
    </tbody>
    </table>

5.  Click **Register**.

---

## Configure the service provider

{! fragments/register-a-service-provider.md !}

5.  Expand the **Inbound Authentication Configuration** and the **SAML2
    Web SSO Configuration**, and click **Configure**.
6.  In the form that appears, fill out the following configuration
    details required for single sign-on. For more details about
    attributes in the following configuration refer [SAML2 Web SSO Configuration](../../../guides/login/webapp-saml/)
   .  
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
    <p><code>                 developer.twitter.com                </code></p>
    </div></td>
    <td>This is the <code>               &lt;saml:Issuer&gt;              </code> element that contains the unique identifier of the service provider.</td>
    </tr>
    <tr class="even">
    <td>Assertion Consumer URL</td>
    <td><pre><code>https://developer.twitter.com/a/&lt;ENTER_YOUR_DOMAIN&gt;/acs</code></pre>
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
    <td><p>Select <strong>Enable Response Signing</strong> to sign the SAML2 Responses returned after the authentication process.</p></td>
    </tr>
    <tr class="even">
    <td>Enable Attribute Profile</td>
    <td>Selected</td>
    <td>Select <strong>Enable Attribute Profile</strong> to enable this and add a claim by entering the claim link and clicking the <strong>Add Claim</strong> button. The Identity Server provides support for a basic attribute profile where the identity provider can include the user’s attributes in the SAML Assertions as part of the attribute statement.</td>
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

## Try it

You have successfully configured Twitter as your federated authenticator. Now, when you try to login to your application, it should redirect to the Twitter login page. On successful authentication with your Twitter credentials, you will be able to access your application. 

### Set up the sample app

- Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.      

- It is recommended that you use a hostname that is not
`          localhost         ` to avoid browser errors. Modify the
`          /etc/hosts         ` entry in your machine to reflect this.
Note that `          wso2is.local         ` is used in
this documentation as an example, but you must modify this when
configuring the authenticators or connectors with this sample
application.

- Download the sample from GitHub.
    1. Navigate to [WSO2 Identity Server Samples](https://github.com/wso2/samples-is/releases).
    2. [Download](https://github.com/wso2/samples-is/releases/download/v4.3.0/saml2-web-app-pickup-dispatch.com.war) the `saml2-web-app-pickup-dispatch.com.war` file from the latest release assets.

### Configure CORS

{!fragments/cors-config.md!}

### Deploy the sample app

Deploy this sample web app on a web container.

1.  Copy the `saml2-web-app-pickup-dispatch.com.war` file into the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder. 

2.  Start the Tomcat server.

### Log in

1.  Access the Pickup sample application URL:
    `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`
2.  Click **Login**. You are redirected to the Twitter login page.
  
    ![Twitter login page](../../assets/img/samples/consent-twitter.png)
    
3.  Click **Continue**. 
4.  On a new tab on your browser, access the following URL:
    <https://twitter.com/home>.

    !!! info 
    	You are automatically logged in to your Gmail using single sign-on (SSO).

!!! info "Related topics" 
    - [Concepts: Introduction to Identity Federation](../../../references/concepts/identity-federation/)