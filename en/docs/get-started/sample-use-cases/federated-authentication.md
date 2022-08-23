# Federated Authentication

Follow the instructions given here to try out federated authentication.

## Problem scenario

**Pickup** works with a team of external consultants. However, it is a hassle to keep adding and maintaining their accounts in the employee database as these consultants are temporary and employed on a rolling basis. 

Therefore, **Pickup** decides to use the identity federation
capability of WSO2 Identity Server. This allows external consultants to use
their existing Google account credentials to sign in to **Pickup** applications.

## Prerequisites

[Install WSO2 Identity Server]({{base_path}}/get-started/sample-use-cases/set-up/) and start the server.

## Set up a Google OAuth 2.0 application

Follow these instructions to register an OAuth 2.0 application in Google.

1. Go to the [Google Developer console](https://console.developers.google.com/apis/credentials), create a new project or select an existing project.

2. If the **APIs & services** page isn't already open, do the following:

    1. Open the navigation menu and click **View all products**.
       ![View all products on the Google console]({{base_path}}/assets/img/samples/google-view-all-products.png)

    2. Under **Management**, click **APIs & Services**.
       ![Select APIs & Services]({{base_path}}/assets/img/samples/google-apis-and-services.png)

3. Go to the **Credentials** page, click **Create Credentials**, and select **OAuth client ID**.

    ![Select APIs & Services]({{base_path}}/assets/img/samples/google-oauth-client-id.png)

4. Configure your consent screen by clicking **Configure Consent Screen** and return to **Create OAuth client ID** screen once you are done.


    !!! info
        For more information, see [User Consent](https://support.google.com/googleapi/answer/6158849#userconsent&zippy=%2Cuser-consent)

5. Select **Web application** as the application type.
6. Provide a name for your application and specify the following URL as the **Authorized Redirect URI** of the application: 

    ``` bash
    https://localhost.com:9443/commonauth`
    ```
    
7. Note the `API key` and `secret` for later use.

    ![API credentials]({{base_path}}/assets/img/get-started/create-client-id.png)

    !!! tip
        To avoid getting the following error message, add `localhost.com`  to the authorized domains list.

        ```
        If Invalid Redirect: domain must be added to the authorized domains list before submitting.
        ```

        ![Authorized domains list]({{base_path}}/assets/img/get-started/authorized-domains-list.png)

## Run the sample scenario

Let's run the sample applications **Pickup-Dispatch** and **Pickup-Manager**.

1.  Follow the instructions on [setting up the samples]({{base_path}}/get-started/sample-use-cases/sample-scenario/#set-up-the-sample-apps).

    !!! info
        A message appears to pick a scenario.

    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png)

2.  Enter `4` as the scenario number at the command prompt to run the federated authentication scenario.
    
3.  Enter `y` to confirm that you have already completed the following steps.

    <img src="{{base_path}}/assets/img/get-started/qsg-configure-federated-auth.png" width="600" alt="QSG configure federated authentication"/>

4.  Enter the `client-id` and `secret` of the Google application when prompted.

    !!! info
        Note that a message with the user and application details appears.

    <img src="{{base_path}}/assets/img/get-started/qsg-configure-federated-auth-3.png" width="600" alt="QSG user and application details"/>

## Try it out

Let's access the **Pickup-Dispatch** application and proceed to sign in.
    
1.  Copy the `http://localhost:8080/saml2-web-app-pickup-dispatch.com` URL to your web browser to access the **Pickup-Dispatch** application.

2.  Click **Login** to access the authentication page.

    ![Pickup Dispatch application login]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-login.png)  
    
    !!! info
        You are directed to the Google login page.

3.  Enter your Google `username` and `password` and click **Sign In**.

    !!! info
        After successful authentication, the **User Consent** form of the **Pickup-Dispatch** application appears.

4.  Select the attributes you agree to share with the **Pickup-Dispatch** application and click **Continue**.

    ![Consent page]({{base_path}}/assets/img/get-started/qsg-sso-consent.png)

    !!! note
        Obtaining user consent is a fundamental requirement of the General Data Protection Regulation (GDPR). WSO2 Identity Server facilitates this through its **Consent Management** features. To learn more about GDPR and how WSO2 Identity Server handles consent, see [Consent Management]({{base_path}}/references/concepts/consent-management/).

     Note that the **Pickup-Dispatch** application home screen appears.

     ![Pickup Dispatch home screen]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-home.png)
    
You have successfully signed in to the **Pickup-Dispatch** application as an external consultant using your Google credentials.

## What's next?

To try out other scenarios, navigate back to the command-line where you ran the quickstart sample and enter `y` to clean the setup.
    
![QSG cleanup]({{base_path}}/assets/img/get-started/qsg-sso-cleanup.png)

---
