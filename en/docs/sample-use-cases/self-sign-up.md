## Self Sign-up

### Problem Scenario

Cameron realizes that allowing the new employees to self sign-up to Pickup web applications will speed up
the onboarding process. As a result Cameron sets self sign-up up for Pickup HR
using WSO2 Identity Server.

### Configure self sign-up

Follow the steps below to configure self sign-up for Pickup Dispatch and
Pickup Manager applications using WSO2 Identity Server.

1.  Enable the email sending configurations of the WSO2 Identity Server
    as explained [here](../../deploy/configure-email-sending/).

2.  Restart WSO2 Identity Server.

    ``` java
    Linux   --> sh wso2server.sh
    Windows --> wso2server.bat
    ```

3.  Navigate to `<IS_SAMPLE_DISTR>/IS-QSG/bin` and execute either
    of the following commands to start the Quick Start samples.

    ``` java
    Linux   --> sudo sh qsg.sh run
    Windows --> sudo qsg.bat run
    ```

4.  <a name="qsg-step1"></a> Enter `5` as the scenario number at the
    command prompt.

    ![List of scenarios in QSG](../../assets/img/get-started/qsg-configure-sso.png)

    A prompt appears to choose the user sign-up approach.

    -   **Enable self user registration (without any config)** : This
        enables self sign-up without having to do additional
        configurations. Once registered, the user receives an email to
        the provided email address.
    -   **Enable account lock on creation** : This locks the user
        account during user registration. The user can only sign in to
        the application after clicking the verification link sent to the
        user-provided email address. A confirmation mail is sent to the
        user but user account is locked until the user confirms the
        account by clicking on the account confirmation mail sent by
        WSO2 Identity Server.

    <img src="../../assets/img/get-started/qsg-configure-self-sign-up.png" width="600" alt="Self sign-up approaches"/>
    
2.  Enter `number` that matches with the approach you would like to try.

    <img src="../../assets/img/get-started/qsg-configure-self-sign-up-2.png" width="600" alt="QSG configure self sign-up"/>

3.  Enter the `http://localhost.com:8080/pickup-dispatch` URL on a web browser to access the Pickup Dispatch application.

4.  Click **Login**.
  
    ![Pickup Dispatch application login](../../assets/img/get-started/qsg-sso-dispatch-login.png)
    
5.  Click **Create Account**.

    ![QSG self sign-up register](../../assets/img/get-started/qsg-self-sign-up-register.png)

6.  Enter a `username` for your user
    account and click **Proceed to Self Register**.

    ![QSG self sign-up username](../../assets/img/get-started/qsg-self-sign-up-username.png)
    
    !!! note
    
        If you want a user to self register for a specific tenant, provide
        the `username` in the following format: `<USERNAME>@<TENAND_DOMAIN>`.
    

7.  Provide the user profile details,
    agree to the **Privacy Policy**, and click **Register**.
      
    ![QSG self sign-up new account](../../assets/img/get-started/qsg-self-sign-up-new-account.png)

    A confirmation message appears.

    ![QSG self-sign-up confirmation](../../assets/img/get-started/qsg-self-sign-up-confirmation.png)

8.  Click **Close**.

    1.  If you selected **Enable User Registration (without any
        config)** at [step 1](#qsg-step1), navigate back
        to the Pickup Dispatch application and sign in using the new
        user credentials.

    2.  If you selected **Account Lock on Creation** at [step
        1](#qsg-step1), access your email account to
        view the account registration confirmation mail.

        1.  Click **Confirm Registration** in the email or copy the link
            in the email to your browser and confirm the account
            creation.

            The account gets unlocked and an email is sent.

        2.  Navigate back to the Pickup Dispatch application and sign in
            using the new user credentials.

        ![WSO2 Identity Server sign in page](../../assets/img/get-started/qsg-sso-login-credentials.png)

        Note that the Pickup Dispatch home screen appears.

        ![Pickup Dispatch home screen](../../assets/img/get-started/qsg-sso-dispatch-home.png)

        You have just self-signed up to a Pickup web
        application.

9.  Next, in order to try out other scenarios, navigate back to the
    command prompt where you ran the Quick Start sample and enter `y` to clean the setup.
    
    ![QSG cleanup](../../assets/img/get-started/qsg-sso-cleanup.png)

