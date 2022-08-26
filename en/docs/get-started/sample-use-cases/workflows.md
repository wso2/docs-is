# Workflows

Follow the instructions given here to try out workflows.

## Problem scenario

After Cameron sets up self registration for Pickup web applications,
Rowan is concerned about security. Rowan prefers to review and
approve new user accounts before granting access to the Pickup web
applications.

Cameron realizes the possibility of creating a workflow using WSO2 Identity Server
and granting role-based authorization, so that each account registration
will be subject to approval.

Let's use the command-line to check out the workflow functionality.

In this workflow, whenever a new user account is created, it
creates a task for a junior manager (Alex) to approve/reject the account
creation. Upon the approval of a junior manager, a task
will be created for the senior manager (Cameron) to approve/reject
the account creation.

## Prerequisites

Follow the [quick setup]({{base_path}}/get-started/sample-use-cases/set-up/) instructions to install and start the WSO2 Identity Server.

## Run the sample scenario

First, let's set up and run the sample applications.

1.  Follow the instructions on [setting up the samples]({{base_path}}/get-started/sample-use-cases/sample-scenario/#set-up-the-sample-apps).

    !!! info
        A message appears to pick a scenario.

    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png)

2.  Enter `6` as the scenario number at the command prompt.

    Note that a message with the user and web application details
    appears.

    ![qsg-configure-a-workflow]({{base_path}}/assets/img/get-started/qsg-configure-a-workflow.png)

## Try it out

1.  Enter the
    [http://localhost.com:8080/pickup-dispatch](http://localhost.com:8080/saml2-web-app-pickup-dispatch.com)
    URL on a web browser to access the Pickup Dispatch application.

2.  Click **Log in**.  
    ![qsg-sso-dispatch-login]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-login.png)
4.  Click **Register Now**.

    ![qsg-sso-login-credentials]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

5.  Enter a `username` for your user
    account and click **Proceed to Self Register**.

    ![qsg-self-sign-up-username]({{base_path}}/assets/img/get-started/qsg-self-sign-up-username.png)

    !!! note

        If you want a user to self register for a specific tenant, provide
        the `username` in the following format: `<USERNAME>@<TENAND_DOMAIN>` .


6.  Provide the `user profile details`,
    agree to the **Privacy Policy**, and click **Register**.  
    ![qsg-self-sign-up-new-account]({{base_path}}/assets/img/get-started/qsg-self-sign-up-new-account.png)

    Even though a new user account is created successfully, it is in
    disabled state. To enable the user, you need to sign in to the WSO2
    user portal and approve the pending workflow requests.

7.  Enter the
    [http://localhost:9443/myaccount](http://localhost:9443/myaccount)
    URL on a web browser to access the **WSO2 My Account Portal**.  
    ![qsg-sso-login-credentials]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

8.  Enter the following credentials to sign in as Alex and click **Sign
    In**.

    ``` java
    Username: alex    | Password: alex123
    ```

9. Click **Operations**.  

10. Click **Show more** under **Pending approvals**.

    ![qsg-user-portal-tasks]({{base_path}}/assets/img/get-started/qsg-user-portal-tasks.png)

11. Click **Approve** to approve the user account creation.

    ![qsg-workflow-approve-task]({{base_path}}/assets/img/get-started/qsg-workflow-approve-task.png)

12. Click **Sign out** to sign out of WSO2 User Portal as Alex.  
    ![qsg-sign-out]({{base_path}}/assets/img/get-started/qsg-sign-out.png)

13. Enter the following credentials to sign in as Cameron and click
    **Sign In**.

    ``` java
        Username: cameron    | Password: cameron123
    ```

14. Click **Show more** under **Pending approvals**.

    ![qsg-user-portal-tasks]({{base_path}}/assets/img/get-started/qsg-user-portal-tasks.png)

15. Click **Approve** to approve the user account creation.

    ![qsg-workflow-approve-task-2]({{base_path}}/assets/img/get-started/qsg-workflow-approve-task-2.png)

16. Navigate back to the Pickup Dispatch application and sign in using
    the new user credentials.

    ![qsg-sso-login-credentials]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

    Select the attributes that you wish to share with Pickup Dispatch
    and click **Continue**.

    ![qsg-workflow-consent]({{base_path}}/assets/img/get-started/qsg-sso-consent.png)

    !!! note
        Obtaining the user consent is one of the fundamental requirements of
        GDPR regulation. WSO2 Identity Server facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent Management](../../learn/consent-management).

    Note that the Pickup Dispatch home screen appears.

    ![qsg-sso-dispatch-home]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-home.png)

----------------
This concludes the Quick Start Guide!

You have set up WSO2 Identity Server and gone through the basic use cases of the
product. For more advanced use cases, check our
[Basic Tutorials](../../learn/tutorials).