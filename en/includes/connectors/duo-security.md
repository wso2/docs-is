# Duo security

The following guide explains how you can use Duo security for secure login.

## Overview

[Duo Security](https://duo.com/){: target="_blank"} provides Multi-Factor Authentication (MFA) by adding a second verification step, such as push notifications or SMS OTP alongside passwords. It helps prevent unauthorized access when attackers use compromised passwords.

In {{product_name}}, you can configure Duo as a connection and seamlessly add it to your application's login flow to add an extra layer of protection.

## Set up

The following guide explains how you can install and set up Duo Security in WSO2 Identity Server.

### Prerequisites

- Add a **Web SDK** app in your Duo Security dashboard and get its client ID and secret.  
  See [Duo Security docs](https://duo.com/docs/protecting-applications#add-an-application){: target="_blank" } for details.

- (Optional) To verify users’ mobile numbers, integrate the Duo Admin API:  
    - Create an Admin API app and get its integration key and secret.  
    - Grant it **Grant resource - Read** permission to access user and device info.

    See [Duo Admin API docs](https://duo.com/docs/adminapi#overview){: target="_blank" } for more information.

### Step 1: (Optional) Add the 

## Step 1: Install the Duo connector
### Deploying Duo Security artifacts

If you are migrating to IS 7.0.0 from a previous version, please go through the [Migration Guide](#migration-guide) before proceeding with the following steps.

To download the authenticator and artifacts, go to the [WSO2 store](https://store.wso2.com/connector/identity-outbound-auth-duo).

1. Place the `org.wso2.carbon.extension.identity.authenticator.duo.connector-4.x.x.jar` file into the `<IS_HOME>/repository/components/dropins` directory.

2. From the artifacts, copy the `is-7.0.0/template/duo` directory and paste it in the `<IS_HOME>/repository/resources/identity/extensions/connections` directory.

3. Copy the `is-7.0.0/images/duo` directory and paste it in the `<IS_HOME>/repository/deployment/server/webapps/console/resources/connections/assets/images` directory.

4. To enable the Duo Security authenticator, add the following configuration to the
   `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [authentication.authenticator.DuoAuthenticator]
    name="DuoAuthenticator"
    enable=true
    ```
5. If you are migrating to IS 7.0.0 from a previous version, add the following configuration to the
   `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [authentication.authenticator.DuoAuthenticator.parameters]
    EnableUsernameAsDuoIdentifier=true
    ```
    
6. Optionally, to verify the user store user's mobile number with the same user's mobile number in Duo Security, add the following configuration to the
   `<IS_HOME>/repository/conf/deployment.toml` file. This verification requires the Admin API credentials that we configured above.

    ```toml
    [authentication.authenticator.DuoAuthenticator.parameters]
    EnableMobileVerification=true
    ```
>> NOTE : When you update the mobile claim in user profile , use the same format of mobile number with country code as you registered in the DUO site. (i.e +9477*******)

7. Optionally, if Duo authenticator is configured as the second factor in multi-factor authentication where a federated identity provider is configured as the first step, the following properties should be configured.
    ```toml
    [authentication.authenticator.DuoAuthenticator.parameters]
    usecase="association"
    sendDuoToFederatedMobileAttribute=true
    federatedMobileNumberAttributeKey="http://wso2.org/claims/mobile"
    secondaryUserstore="primary"
    ```

- `sendDuoToFederatedMobileAttribute` - This specifies whether the mobile number claim should be taken from the claims provided by the Identity Provider.
- `federatedMobileNumberAttributeKey` - This specifies the value of the mobile claim provided by the Identity Provider. This property must be configured if the `sendDuoToFederatedMobileAttribute` is `true`.
- `usecase` - This field can take one of the following values: local, association, userAttribute, subjectUri. If you do not specify any usecase, the default value is local.
- `secondaryUserstore` - The user store configuration is maintained per tenant as comma separated values. For example, <Parameter name="secondaryUserstore">jdbc, abc, and xyz</Parameter>.

  The usecase value can be `local`, `association`,
  `             userAttribute            ` or
  `             subjectUri            ` .

    <table>
    <tbody>
    <tr class="odd">
    <td><code>                 local                </code></td>
    <td><p>This is based on the federated username. This is the default value. You must set the federated username in the localuserstore. Basically, the federated username must be the same as the local username.</p></td>
    </tr>
    <tr class="even">
    <td><code>                 association                </code></td>
    <td><p>The federated username must be associated with the local account in advance in the Dashboard. So the local username is retrieved from the association. To associate the user, log into the end user dashboard and go to <strong>Associated Account</strong> by clicking <strong>View details</strong> .</p></td>
    </tr>
    <tr class="odd">
    <td><code>                 userAttribute                </code></td>
    <td><div class="content-wrapper">
    <p>The name of the  federatedauthenticator's user attribute. That is,the local user namewhich is contained in a federated user's attribute. When using this, add the following parameter under the <code>                   authentication.authenticator.DuoAuthenticator                  </code> section in the <code>                   &lt;IS_HOME&gt;/repository/conf/deployment.toml                  </code> file and put the value (e.g., email, screen_name, id, etc.).</p>
    <div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><p class="kw">[authentication.authenticator.DuoAuthenticator]</p><span class="st">userAttribute</span><span class="kw">&#61;</span>&quot;mobile&quot;</a></code></pre></div>
    </div>
    </div>
    <p>If you use, OpenID Connect supported authenticators such as LinkedIn, Foursquare, etc., or in the case of multiple social login options as the first step and Duo as second step, you need to add similar configuration for the specific authenticator in the <code>                   &lt;IS_HOME&gt;/repository/conf/deployment.toml </code> file under the corresponding authenticator's configuration section section as follows (the following shows the configuration for Facebook and Foursquare  authenticator respectively).</p>
    <p><b>Facebook</b></p>
          <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">                
     [authentication.authenticator.facebook.parameters]
     EmailOTP-userAttribute = "mobile"
     federatedEmailAttributeKey = "mobile"
         </span></a></code></pre></div>                    
     <p><b>Foursquare</b></p>
          <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: xml; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: xml; gutter: false; theme: Confluence"><pre class="sourceCode xml"><code class="sourceCode xml"><a class="sourceLine" id="cb1-1" title="1"><span class="kw">               
     [[authentication.custom_authenticator]]
     name= "Foursquare"
     [authentication.custom_authenticator.parameters]
     EmailOTP-userAttribute = "http://wso2.org/foursquare/claims/mobile"
     federatedEmailAttributeKey = "http://wso2.org/foursquare/claims/mobile"
      </span></a></code></pre></div>                               
    <p>Likewise, you can add the AuthenticatorConfig for Amazon, Google, Twitterand Instagram with relevant values.</p>
    </div></td>
    </tr>
    <tr class="even">
    <td><code>                 subjectUri                </code></td>
    <td><p>When configuring the federated authenticator, select the attribute in the subject identifier under the service provider section in UI, this is used as the username of the Duo authenticator.</p></td>
    </tr>
    </tbody>
    </table>

### Migration Guide
If you are migrating to IS 7.0.0 from a previous version, you need to consider the following points.

Prior to IS 7.0.0, the username was used as the unique identifier when enrolling users in Duo. Since IS 7.0.0, the user ID is used instead of the username for user enrolment.
Users who are already enrolled in Duo will have to go through the enrolment process again because the new identifier will be used for the first time.
If you wish to preserve the previous behaviour, you can set the `EnableUsernameAsDuoIdentifier` parameter to `true` in the `deployment.toml` file.
```toml
[authentication.authenticator.DuoAuthenticator.parameters]
EnableUsernameAsDuoIdentifier=true
```

Further, two properties (Disable User Store and Disable Tenant Domain) were used to append the user store domain and tenant domain to the username in the previous versions.
In IS 7.0.0, the new Duo template does not include these properties since the username is not used for the Duo identifier. 
If you wish to add them to the template, make sure to use the content from the `migration-is-7.0.0/template/duo` directory when deploying the Duo Security artifacts.
Also make sure that the correct values are set for the two properties.

### Configuring the Duo connection
Now you have to configure WSO2 Identity Server by adding adding it as a new connection.
1. Log in to the [Console Application ](https://is.docs.wso2.com/en/next/get-started/quick-set-up/#access-the-console) as an administrator.
2. Navigate to **Connections**  >  **+ New Connection** and select Duo from the listed templates.
3. Enter the client ID, client secret and the API hostname obtained from the above steps and create the connection.
   ![alt text](images/duo-template.png)
6. Navigate to the **Settings** tab in the newly created Duo connection. If mobile number verification was enbaled, add the **Admin Integration Key** and the **Admin Secret Key**.

   ![alt text](images/duo-settings.png)
7. If you are migrating to IS 7.0.0 from a previous version, make sure the values set for **Disable User Store** and **Disable Tenant Domain** are correct.
   >> NOTE :  Disable User Store Domain and Disable Tenant Domain are optional configurations. If you want to strip off both user store domain and tenant domain from user name, configure both as true. Otherwise, keep the fields empty.


### Deploying the sample React SPA

The next step is to deploy the sample React SPA in order to use it in this scenario.
To do this, see the topic on [Sample React SPA](https://is.docs.wso2.com/en/next/get-started/try-samples/qsg-spa-react).

### Configuring Duo as MFA
The next step is to add Duo as an MFA option to the login flow of the application.
1. Navigate to the **Login Flow** tab in the sample application. Username and Password will be added as the default login method.
2. Click on the **+** icon to add a new step to the login flow. Then, click on the **+ Add Sign In Option** button in step 2.
3. Select the Duo connection from the authenticator list and click **Add**. Update the changes by clicking the **Update** button.

   ![alt text](images/duo-login-flow.png)

### Testing the sample

1.  Navigate to the landing page of the sample application. Click the **Login** button.

    ![alt text](images/sample-app.png)
2. The basic authentication page appears. Log in using your username and password.

   <img src="images/duobasic.png" width="50%">
3. You are directed to the Duo Security authentication page.

   <img src="images/duo5.png" width="50%">

> >    NOTE : If you haven't installed the Duo app in your mobile, you
> >    will be guided to install and set-up the application at this
> >    step.

5. If your verification is successful, you will be logged into the app.