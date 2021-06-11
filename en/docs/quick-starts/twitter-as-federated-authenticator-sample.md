# Log in to a Sample Application using Twitter

This page guides you through using Twitter as a federated authenticator and logging in to a sample application. Here, we use a sample application called Pickup Dispatch. 

----

If you have your own application, click the button below.

<a class="samplebtn_a" href="../../guides/identity-federation/twitter"   rel="nofollow noopener">I have my own application</a>

----

!!! tip "Before you begin"
    
    Create an account in [Twitter](https://twitter.com) if you do not have one already.

---

## Set up a Twitter app

1. Login to <https://developer.twitter.com/> using your Twitter credentials. 

2. Click on the downwards arrow adjecent to your profile icon and select **Apps**.

3. Click on **Create an app**.
    
    ![create-twittter-app](../../../assets/img/samples/create-app-twitter.png)

4. Fill in the application details with the following values. 

    - App name - Pickup-Dispatch-Application
    - Application description - A sample app which can be accessed via twitter
    - Website URL - `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp`
    - Select **Enable sign in with Twitter**
    - Callback URLs - `https://localhost:9443/commonauth`
    - Tell us how this app will be used - This is a test app used to verify logging into a sample application, using Twitter as a federated authenticator

5. Click  **Create**.

    ![app-created-twitter.png](../../../assets/img/samples/app-created-twitter.png)

6. Move to the next tab, **keys and tokens**. 

7. Click on the **Generate** button adjacent to **Access token & access token secret**. 

    ![create-access-token](../../../assets/img/samples/create-access-token.png)

8. Make note of the Access token and Access token secret that appears next. 

    ![note-tokens](../../../assets/img/samples/note-tokens.png)

9. Move to the next tab, **Permissions**. 

10. Select **Read and write** as the Access Permission. 

---

## Configure Twitter as an IdP in WSO2 IS 

1.  Access the Management Console (`https://<IS_HOST>:<PORT>/carbon`). 
1.  Navigate to the **Identity Provider** section under **Main \> Identity**.
2.  Click **Add**.
3.  Provide values for the following fields under **Basic Information** section.

4.  Expand **Twitter Configuration** under **Federated Authenticators**.

    ![twitter-config-federated-auth.png](../../../assets/img/samples/twitter-config-federated-auth.png)
    
    Fill in the following fields details according to the application
    [registered in Twitter](http://docs.inboundnow.com/guide/create-twitter-application/):

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
    <p>The acs indicates the Assertion Consumer URL of the WSO2 Identity Server endpoint that accepts the responses sent by Twitter.</p></td>
    <td><code>                               https://&lt;IS_HOST&gt:&ltPORT&gt/commonauth                             </code></td>
    </tr>
    </tbody>
    </table>

5.  Click **Register**.

---

## Deploy the Sample App

{! fragments/pickup-dispatch-saml.md !}

---

## Try it out

1.  Access the Pickup sample application URL:
    `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com`
2.  Click **Login**. You are redirected to the Twitter login page.  
    ![twitter-login-page](../../../assets/img/samples/consent-twitter.png)
    
3.  Click **Continue**. 
4.  On a new tab on your browser, access the following URL:
    <https://twitter.com/home>.

    !!! info 
    	You are automatically logged in to your Gmail using single sign-on (SSO).
