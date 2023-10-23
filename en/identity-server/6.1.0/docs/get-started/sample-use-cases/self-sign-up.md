# Self Sign-Up

Follow the instructions given here to try out user self sign-up.

## Problem Scenario

Cameron realizes that allowing new employees to self sign-up to the Pickup web applications can speed up
the onboarding process. As a result, Cameron sets self sign-up for Pickup HR
using WSO2 Identity Server.

## Prerequisites

Before you begin, do the following:

1.  [Install WSO2 Identity Server]({{base_path}}/get-started/sample-use-cases/set-up/).
2.  [Enable the email sending configurations]({{base_path}}/deploy/configure-email-sending) of WSO2 IS.
3.  Restart the WSO2 IS.

## Run the sample scenario

First, let's set up and run the sample applications.

1.  Follow the instructions on [setting up the samples]({{base_path}}/get-started/sample-use-cases/sample-scenario/#set-up-the-sample-apps).

    !!! info
        A message appears to pick a scenario.
    
    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png)

2.  Enter `5` as the scenario number at the command prompt.

    A prompt appears to choose the user sign-up approach.

    <table>
        <tr>
            <th>**Enable self user registration (without any config)**</th>
            <td>
                This enables self sign-up without having to do additional configurations. Once registered, the user receives an email to the provided email address.
            </td>
        </tr>
        <tr>
            <th>**Enable account lock on creation**</th>
            <td>
                This locks the user account during user registration. The user can only sign in to the application after clicking the verification link sent to the user-provided email address. A confirmation mail is sent to the user but the user account is locked until the user confirms the account by clicking on the account confirmation mail sent by WSO2 Identity Server.
            </td>
        </tr>
    </table>

    <img src="{{base_path}}/assets/img/get-started/qsg-configure-self-sign-up.png" width="600" alt="Self sign-up approaches"/>
    
3.  Enter the `number` that matches the approach you would like to try.

    <img src="{{base_path}}/assets/img/get-started/qsg-configure-self-sign-up-2.png" width="600" alt="QSG configure self sign-up"/>

## Try it out

Follow the instructions given below to complete self-registration and to log in.

### Self-register

Let's access the **Pickup-Dispatch** application and self-register as a new user.

1.  Copy the `http://localhost.com:8080/pickup-dispatch` URL on a web browser to access the Pickup Dispatch application.

2.  Click **Login** to access the authentication page.
  
    ![Pickup Dispatch application login]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-login.png)
    
3.  Click **Create Account** to start the self sign-up process.

    ![QSG self sign-up register]({{base_path}}/assets/img/get-started/qsg-self-sign-up-register.png)

4.  Enter a `username` for your user account and click **Proceed to Self Register**.

    ![QSG self sign-up username]({{base_path}}/assets/img/get-started/qsg-self-sign-up-username.png)
    
    !!! note
        If you want a user to self register for a specific tenant, provide
        the `username` in the following format: `<USERNAME>@<TENAND_DOMAIN>`.

5.  Provide the user profile details, agree to the **Privacy Policy**, and click **Register**.
      
    ![QSG self sign-up new account]({{base_path}}/assets/img/get-started/qsg-self-sign-up-new-account.png)

    A confirmation message appears.

    ![QSG self-sign-up confirmation]({{base_path}}/assets/img/get-started/qsg-self-sign-up-confirmation.png)

8.  Click **Close** to complete the registration.

### Log in

To try login with your new user account, follow the instructions given below as applicable.

-   If you selected **Enable User Registration (without any
    config)** during [sample setup](#Run the sample scenario), go back to the **Pickup-Dispatch** application and sign in using the new user credentials.

-   If you selected **Account Lock on Creation** during [sample setup](#Run the sample scenario), access your email  account to view the account registration confirmation mail.

    1.  Access your email and click **Confirm Registration** in the email or copy the link
        in the email to your browser and confirm the account creation.

        !!! info
            The account gets unlocked and an email is sent.

    2.  Go back to the **Pickup-Dispatch** application and sign in using the new user credentials.

        ![WSO2 Identity Server sign in page]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

        Note that the **Pickup-Dispatch** application home screen appears.

        ![Pickup Dispatch home screen]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-home.png)

You have successfully self-signed up to the **Pickup-Dispatch** web application.

## What's next?

To try out other scenarios, navigate back to the command-line where you ran the quickstart sample and enter `y` to clean the setup.
    
![QSG cleanup]({{base_path}}/assets/img/get-started/qsg-sso-cleanup.png)

