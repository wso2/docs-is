# Add Duo login

[Duo](https://duo.com/) is a multi-factor authentication option that offer multiple verification methods such as push notifications, SMS, phone calls, and hardware tokens.

In this guide, you'll learn how to integrate Duo as a second-factor authentication provider for your Asgardeo application.

## Prerequisites

Before you begin, ensure you have the following:

- [Duo Account](https://signup.duo.com/): A Duo administrator account to configure your Duo application.
- [Asgardeo Account](https://asgardeo.io/signup): Access to your Asgardeo console with administrative privileges.

## Configure Duo Security Application

1. Log in to the [Duo Securty admin panel](https://admin.duosecurity.com/login). 
2. Click **Applications** from the left panel and then click the **Protect an Application** button.

    ![Create duo security app]({{base_path}}/assets/img/guides/mfa/duo/add-duo-security-app.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. On the **Protect an Application page**, search for **Web SDK** and click on **Protect**.

    ![Protect web SDK app]({{base_path}}/assets/img/guides/mfa/duo/protect-web-sdk-app.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Save the **Client ID**, **Client secret**, and **API hostname**  as you will need these later.

## Add Duo as a Connection in Asgardeo

Next, you need to register Duo as a connection in Asgardeo. To do so, follow the steps below.

1. Log in to the [Asgardeo Console](https://console.asgardeo.io/) as an adminstrator.
2. Navigate to **Connections** from the left-hand panel 
3. Click **New Connection** and select **Duo** from the listed templates.
4. Provide a Name for the Duo connection (e.g., "Duo Security").
5. Enter the **Client ID**, **Client secret**, and **API hostname**, that you obtained from the Duo Admin Panel.
6. Click **Finish** to save the configuration.

## Enable Duo MFA for an application

The created Duo connection should be added as an MFA option to the login flow of an application. To do so, follow the steps below.

1. On the [Asgardeo Console](https://console.asgardeo.io/), navigate to **Applications**.
2. Select the application for which you want to enable Duo MFA.
3. Go to the **Login Flow** section. Username and Password will be added as the default login method.
4. Click on the **+ icon** to add a new step to the login flow. 
5. Click on the **+ Add Sign In Option** button in step 2.
6. Select the Duo connection from the authenticator list and click **Add**. 
7. Save the changes by clicking the **Update** button.

## Test the Integration

Finally, you need to verify that Duo has been successfully integrated and is functioning correctly as a second-factor authentication method. To do so,

1. Access the sample application and click on **Login** button. 

    ![React sample app login]({{base_path}}/assets/img/guides/mfa/duo/react-sample-app-login.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

2. Once you enter your username and password, you will be redirected to Duo authentication page.

3. Complete the Duo authentication process using the method configured (e.g., push notification, SMS).

    ![Duo push notification]({{base_path}}/assets/img/guides/mfa/duo/duo-push-notification.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    !!! note
        If you haven't installed the Duo app in your mobile, you will be guided to install and set-up the application at this step.

4. If your verification is successful, you will be logged into the app.

You've successfully integrated Duo 2FA into your Asgardeo application. This additional security layer helps protect your users and sensitive data from unauthorized access.