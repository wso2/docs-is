# Duo security

The following guide explains how you can use Duo security for secure login.

## Overview

[Duo Security](https://duo.com/){: target="_blank"} provides Multi-Factor Authentication (MFA) by adding a second verification step, such as push notifications or SMS OTP alongside passwords. It helps prevent unauthorized access when attackers use compromised passwords.

In {{product_name}}, you can configure Duo as a connection and seamlessly add it to your application's login flow to add an extra layer of protection.

## Set up

The following guide explains how you can install and set up Duo Security in WSO2 Identity Server.

### Prerequisites

Make sure you configure the following in the Duo Security dashboard and get the necessary credentials.

- Add a **Web SDK** app and get its client ID and secret.  
  See [Duo Security docs](https://duo.com/docs/protecting-applications#add-an-application){: target="_blank" } for details.

- (Optional) To verify users’ mobile numbers, integrate the Duo Admin API:  
    - Create an Admin API app and get its integration key and secret.  
    - Grant it **Grant resource - Read** permission to access user and device info.

    See [Duo Admin API docs](https://duo.com/docs/adminapi#overview){: target="_blank" } for details.

### Step 1: Install the Duo Security connector

Follow the steps below to install Duo Security in {{product_name}}.

1. Download the project artifacts from the {{product_name}} [connector store](https://store.wso2.com/connector/identity-outbound-auth-duo){: target="_blank"}.

2. Copy the following artifacts into the relevant directories in {{product_name}}:

      - Copy the `org.wso2.carbon.extension.identity.authenticator.duo.connector-4.x.x.jar` file into the `<IS_HOME>/repository/components/dropins` directory.

      - Copy the `is-7.0.0/template/duo` directory and paste it in the `<IS_HOME>/repository/resources/identity/extensions/connections` directory. *If migrating from a previous {{product_name}} version, read the note at the end of the section to select the right template for you*.

      - Copy the `is-7.0.0/images/duo` directory and paste it in the `<IS_HOME>/repository/deployment/server/webapps/console/resources/connections/assets/images` directory.

3. To enable the Duo Security authenticator, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [authentication.authenticator.DuoAuthenticator]
    name="DuoAuthenticator"
    enable=true
    ```

4. Restart {{product_name}}.

!!! note "[Important] Migrating from a previous {{product_name}} version?"

    If you are migrating to {{product_name}} 7.0.0 from a previous version, note the following changes to the Duo Security connector.

    - **Change in user identifier** - In previous versions, Duo enrollment used the username as the unique identifier. Starting from 7.0.0, the user ID is used instead. As a result, users who enrolled using their username must re-enroll to continue using Duo with {{product_name}}.

         If you prefer to keep the old behavior, add the following configuration to your `<IS_HOME>/repository/conf/deployment.toml` file.

         ```toml
         [authentication.authenticator.DuoAuthenticator.parameters]
         EnableUsernameAsDuoIdentifier=true
         ```

    - **Change in username formatting options** - Since the new template uses user IDs, it no longer supports the following properties:

        - Disable User Store – controls whether to append the user store domain to the username.

        - Disable Tenant Domain – controls whether to append the tenant domain to the username.

        If you enable the old behavior (`EnableUsernameAsDuoIdentifier=true`), these options are still relevant. In this case,

        -  when deploying artifacts, make sure to use the content from the `migration-is-7.0.0/template/duo` directory instead of `is-7.0.0/template/duo`.
        - Ensure correct values are set for **Disable User Store** and **Disable Tenant Domain** in the template.

### Step 2: Configure connector options

Configure the settings below to use Duo Security connector for these specific use cases.

- **Verify mobile numbers during Duo login**: To verify that the mobile number registered in {{product_name}} matches the one registered in Duo, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [authentication.authenticator.DuoAuthenticator.parameters]
    EnableMobileVerification=true
    ```

    !!! note "Mobile number format"

        For successful validation, mobile numbers in {{product_name}} should use the same format in Duo i.e., country code + phone number (e.g., +9477****).

- **Use Duo as the second factor when using a federated identity provider as the first factor**: Add the following configurations to the `<IS_HOME>/repository/conf/deployment.toml` file. 

    ```toml
    [authentication.authenticator.DuoAuthenticator.parameters]
    usecase="association"
    sendDuoToFederatedMobileAttribute=true
    federatedMobileNumberAttributeKey="http://wso2.org/claims/mobile"
    secondaryUserstore="primary"
    ```

    - `sendDuoToFederatedMobileAttribute` - If set to **true**, Duo will receive the mobile number attribute from the external identity provider.

    - `federatedMobileNumberAttributeKey` - If `sendDuoToFederatedMobileAttribute` set to **true**, you must provide the mobile number attribute key received from the external identity provider.

    - `usecase` - You must specify how {{product_name}} determines the local username to use during MFA with Duo. This can take **local**, **association**, **userAttribute** or **subjectUri**:

        ??? note "Learn more about these values"

            <table>
            <tr>
               <td>local</td>
               <td>The default value for <code>usecase</code>. If set to local, username coming from the external identity provider should exactly match the username in the local user store.</td>
            </tr>
            <tr>
            <td>association</td>
            <td>If set to <b>association</b>, {{product_name}} looks up a predetermined association set up in users' profiles. To associate the external account with a local account, log into the End User Dashboard and go to <strong>Associated Account</strong> by clicking <strong>View details</strong></td>
            </tr>
            <tr>
            <td>userAttribute</td>
            <td>
            If set to <b>userAttribute</b>, {{product_name}} retrieves the username directly from the claims returned by the external identity provider. To define which attributes to use, add the following configuration to the <code>&lt;IS_HOME&gt;/repository/conf/deployment.toml</code> file. </br></br>

            In Duo authenticator configurations, specify which attribute of the federated identity provider works as the user's identifier.

            <pre><code>
            [authentication.authenticator.DuoAuthenticator]
            userAttribute = "mobile"
            </code></pre>

            If you use Open ID Connect-supported authenticators such as LinkedIn, Foursquare, etc., for each authenticator, specify which claim to use as email address and mobile numbers. For example,

            Facebook

            <pre><code>
               [authentication.authenticator.facebook.parameters]
               EmailOTP-userAttribute = "mobile"
               federatedEmailAttributeKey = "mobile"
               </code></pre>

            Foursquare

            <pre><code>      
            [[authentication.custom_authenticator]]
            name= "Foursquare"
            [authentication.custom_authenticator.parameters]
            EmailOTP-userAttribute = "http://wso2.org/foursquare/claims/mobile"
            federatedEmailAttributeKey = "http://wso2.org/foursquare/claims/mobile"
            </code></pre>
            </td>
            </tr>
            <tr>
               <td>subjectUri</td>
               <td> If set to <b>subjectUri</b>, {{product_name}} retrieves the username directly from the subject identifier.</td>
            </tr>
            </table>

    - `secondaryUserstore` - The user store configuration is maintained per tenant as comma separated values. For example, <Parameter name="secondaryUserstore">jdbc, abc, and xyz</Parameter>.

### Step 3:  Configure the Duo connection

Now that you have installed the Duo connector, follow the steps below to register Duo as a connection in {{product_name}}.

1. Log in to the [Console Application](https://is.docs.wso2.com/en/next/get-started/quick-set-up/#access-the-console) as an administrator.

2. Go to **Connections**  >  **New Connection** and select Duo from the listed templates.

3. Enter the client ID, client secret and the API hostname that you received from Duo and click **Create**.

      ![Dup template]({{base_path}}/assets/img/connectors/duo/duo-template.png)

4. In the Duo connection you created, go to its **Settings** tab.

5. If you enabled mobile number verification when setting Duo, enter the **Admin Integration Key** and the **Admin Secret Key** and click **Update**.

      ![Duo settings]({{base_path}}/assets/img/connectors/duo/duo-settings.png)

!!! note "Migrating from a previous {{product_name}} version?"

    In the older Duo template, **Disable User Store** and **Disable Tenant Domain** options dictate whether to append the user store name and/or the tenant domain respectively to the username to ensure uniqueness throughout your {{product_name}} environment. Make sure you correctly set these values.

    As the new template uses the user ID as the unique identifier, these options are unnecessary.

## Usage

You can now start using the Duo connection in the login flow of applications. To do so,

!!! note "Before you begin"

    Register an application in {{product_name}}. Refer to [applications]({{base_path}}/guides/applications/) for instructions.

1. On the {{product_name}} Console, go to **Applications** and select your application.

2. Go to its **Login Flow** tab. You will see the application's existing login flow.

3. Click on the **+** icon to add another step to the login flow.

4. Click **+ Add Sign In Option**, select the configured Duo connection from the list and click **Add**.

      ![Login flow with Duo]({{base_path}}/assets/img/connectors/duo/duo-login-flow.png)

5. Click **Update** to save the changes.

## Test

The next step is to deploy the sample React SPA in order to use it in this scenario.
To do this, see the topic on [Sample React SPA](https://is.docs.wso2.com/en/next/get-started/try-samples/qsg-spa-react).

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