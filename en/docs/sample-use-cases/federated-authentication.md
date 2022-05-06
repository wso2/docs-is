## Federated authentication

### Problem scenario

Pickup works with a team of external consultants. However, it is a hassle to keep adding and maintaining their accounts in the employee database as these consultants are temporary and employed on a rolling basis. Therefore, Cameron decides to use the identity federation
capability of WSO2 Identity Server. This facilitates the external consultants to use
their already existing Google account credentials to sign in to the
Pickup applications.

### Configure federated authentication

Follow the steps below to configure federated authentication using WSO2 IS

!!! tip "Before you begin"
    
    If you have run any other samples in this Quick Start Guide, navigate
    back to the `<IS_SAMPLE_DISTR>/IS-QSG/bin` using the command-line and
    execute either of the following commands to start the Quick Start
    samples.
    
    ``` java
    Linux   --> sudo sh qsg.sh run
    Windows --> sudo qsg.bat run
    ```

A message appears to pick a scenario.


1.  Enter `4` as the scenario number at the command prompt to:

    1.  Create the two users: Cameron and Alex.
    2.  Create and assign the user role Manager to Cameron.
    3.  Create service providers for Pickup Dispatch and Pickup Manager.
    4.  Configure SAML2 web SSO for Pickup Dispatch and Pickup Manager.

    ![List of scenarios in QSG](../../assets/img/get-started/qsg-configure-sso.png)

2.  Register OAuth 2.0 Application in Google. As the first step, go to
    [Google API Console](https://console.developers.google.com)
    and navigate to the **Credentials** tab from the sidebar. You can
    configure OAuth web application in Google by selecting **OAuth
    Client ID** . You can find more details from
    [here](https://developers.google.com/identity/protocols/OpenIDConnect).
      
    ![Register OAuth 2.0 Application in Google](../../assets/img/get-started/register-oauth2.png)
      
    Select a web application and give it a name (e.g.,
    SampleWebApllication). Enter the Authorized **redirect URI** as
    `https://localhost.com:9443/commonauth`
    (this is the endpoint in WSO2 Identity Server that accepts the
    response sent by Google).  
    
3. Note down the `API key` and `secret` for later use.

    ![API credentials](../../assets/img/get-started/create-client-id.png)

    !!! tip
        In order to avoid getting the following error message, add `localhost.com`  to the authorized domains list.   
        ```
        If Invalid Redirect: domain must be added to the authorized domains list before submitting.
        ```

        ![Authorized domains list](../../assets/img/get-started/authorized-domains-list.png)
    
4.  Enter `y` to confirm that you have
    already registered an app in Google. (See **Prerequisites** tab)

    <img src="../../assets/img/get-started/qsg-configure-federated-auth.png" width="600" alt="QSG configure federated authentication"/>

5.  Enter the client-id and the secret of
    the Google application when prompted.

    Note that a message with the user and application details appears.

    <img src="../../assets/img/get-started/qsg-configure-federated-auth-3.png" width="600" alt="QSG user and application details"/>

6.  Enter the  `http://localhost:8080/saml2-web-app-pickup-dispatch.com`
    URL on a web browser to access the Pickup Dispatch application.

7.  Click **Login**.

    ![Pickup Dispatch application login](../../assets/img/get-started/qsg-sso-dispatch-login.png)  
    
    The Google login page appears.

8.  Enter your Google `username` and `password` and click **Sign In**.

    After a successful authentication, the **User Consents** form of the Pickup
    Dispatch application appears.

9.  Select the attributes that you wish to share with Pickup Dispatch
    and click **Continue**.

    ![Consent page](../../assets/img/get-started/qsg-sso-consent.png)

    !!! note
    
        Obtaining the user consent is one of the fundamental requirements of
        GDPR regulation. WSO2 Identity Server facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent Management](../../references/concepts/consent-management/).

    Note that the Pickup Dispatch home screen appears.

    ![Pickup Dispatch home screen](../../assets/img/get-started/qsg-sso-dispatch-home.png)
    
    You have just signed in to the Pickup Dispatch application
    as an external consultant using your Google credentials.

10.  Next, in order to try out other scenarios, navigate back to the
    command prompt where you ran the Quick Start sample and enter
    `y` to clean the setup.
      
    ![QSG cleanup](../../assets/img/get-started/qsg-sso-cleanup.png)

---