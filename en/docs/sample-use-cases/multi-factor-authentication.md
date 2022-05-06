# Multi-factor authentication

Follow the instructions given here to to try out multi-factor authentication.

## Problem scenario

Cameron wants to enhance the security standards by introducing another level of authentication. As a result, Cameron decides to use Multi-factor Authentication (MFA) in WSO2 Identity Server using the following factors:
    
- **First factor** : password
- **Second factor** : HARDWARE KEY

Let's use the command-line to check the MFA functionality.

## Configure multi-factor authentication

First deploy the sample authenticator dependency and web application in
    WSO2 Identity Server.

1.  Stop the Identity Server if already running.
2.  Download the [sample-auth.war](https://github.com/wso2/samples-is/releases/download/v4.3.0/sample-auth.war) file 
and paste it inside the `<IS_HOME>/repository/deployment/server/webapps` folder.  

    This `.war` file contains the WEB UI for the sample authenticators used in this tutorial.

3.  Add the following configurations to the `deployment.toml` file in the `<IS_HOME>/repository/conf` directory and restart the server.

       ```toml
       [resource.access_control]
       context = "(.*)/sample-auth/(.*)"
       secure = false
       http_method = "all" 
       ```
       
4.  Start the Identity Server.

Follow the steps below to configure MFA on the Pickup Dispatch and
Pickup Manager applications where HARDWARE KEY is the second authentication
factor.

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

1.  Navigate back to the `<IS_SAMPLE_DISTR>/IS-QSG/bin` using the command-line and
    execute either of the following commands to start the Quick Start
    samples.
    
    ``` java
    Linux   --> sudo sh qsg.sh run
    Windows --> sudo qsg.bat run
    ``` 

1.  Enter `3` as the scenario number at the command prompt.
  
    ![List of scenarios in QSG](../../assets/img/get-started/qsg-configure-sso.png)
    
2.  Enter `y` to confirm that you have already done the following steps.

    ![QSG commandline continue](../../assets/img/get-started/qsg-configure-setup.png)
    
5.  Enter the `http://localhost:8080/saml2-web-app-pickup-dispatch.com` URL on a web browser to access the Pickup Dispatch application.

6.  Click **Login**.
  
    ![Pickup Dispatch application login](../../assets/img/get-started/qsg-sso-dispatch-login.png)
    
7.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Manager  --> Username: cameron | Password: cameron123
    Employee --> Username: alex    | Password: alex123 
    ```

    ![WSO2 Identity Server sign in page](../../assets/img/get-started/qsg-sso-login-credentials.png)

    The HARDWARE KEY login page appears as HARDWARE KEY is the second
    authentication factor.

8.  Enter the DEMO key that appears in the browser and click **Sign In**.

    ![Enter the hardware key](../../assets/img/get-started/hardware-key.png)

    After successful authentication, the **User Consents** form of the Pickup
    Dispatch application appears.

9.  Select the attributes that you want to share with Pickup Dispatch and click
    **Continue**.

    ![Consent page](../../assets/img/get-started/qsg-sso-consent.png)      

    !!! note
    
        Obtaining user consent is one of the fundamental requirements of the
        GDPR regulation. WSO2 Identity Server facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent Management](../../references/concepts/consent-management/).

10. Note that the Pickup Dispatch home screen appears.

    ![Pickup Dispatch home screen](../../assets/img/get-started/qsg-sso-dispatch-home.png)

11. To try out other scenarios, navigate back to where you ran the Quick
    Start sample on the command-line and enter `y` to clean the setup.
    
    ![QSG cleanup](../../assets/img/get-started/qsg-sso-cleanup.png)
