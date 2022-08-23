# Multi-Factor Authentication

Follow the instructions given here to try out multi-factor authentication.

## Problem scenario

**Pickup** wants to enhance the security standards by introducing a second level of authentication when users sign in to applications. Multi-factor authentication (MFA) is enabled in WSO2 Identity Server using the following factors:
    
- **First factor**: username/password
- **Second factor**: HARDWARE KEY

Let's use the command-line to check the MFA functionality.

## Prerequisites

Before you begin, do the following:

1.  [Install WSO2 Identity Server]({{base_path}}/get-started/sample-use-cases/set-up/).
2.  Deploy the sample authenticator dependency and its web application in WSO2 Identity Server.

    1.  Stop the Identity Server if already running.
    2.  Download the [org.wso2.carbon.identity.sample.extension.authenticator.jar](https://maven.wso2.org/nexus/content/groups/wso2-public/org/wso2/samples/is/org.wso2.carbon.identity.sample.extension.authenticators/4.5.0/org.wso2.carbon.identity.sample.extension.authenticators-4.5.0.jar) file and copy it to the `<IS_HOME>/repository/components/dropins` folder.
    3.  Download the [sample-auth.war](https://github.com/wso2/samples-is/releases/download/v4.5.0/sample-auth.war) file and copy it to the `<IS_HOME>/repository/deployment/server/webapps` folder.  

        !!! info
            This `.war` file contains the WEB UI for the sample authenticators used in this tutorial.

    3.  Open the `deployment.toml` file in the `<IS_HOME>/repository/conf` folder and add the following configuration:

        ```toml
        [[resource.access_control]]
        context = "(.*)/sample-auth/(.*)"
        secure = false
        http_method = "all" 
        ```
       
3.  Start WSO2 Identity Server.

## Run the sample scenario

Let's run the sample applications **Pickup-Dispatch** and **Pickup-Manager**.

1.  Follow the instructions on [setting up the samples]({{base_path}}/get-started/sample-use-cases/sample-scenario/#set-up-the-sample-apps).

    !!! info
        A message appears to pick a scenario.

2.  Enter `3` as the scenario number at the command prompt.
  
    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png)
    
3.  Enter `y` to confirm that you have already done the following steps.

    ![QSG commandline continue]({{base_path}}/assets/img/get-started/qsg-configure-setup.png)

## Try it out

Let's access the **Pickup-Dispatch** application and proceed to sign in.
    
1.  Copy the `http://localhost:8080/saml2-web-app-pickup-dispatch.com` URL to your web browser to access the **Pickup-Dispatch** application.

2.  Click **Log in** to access the first authentication step provided by WSO2 Identity Server.
  
    ![Pickup Dispatch application login]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-login.png)
    
3.  Enter either of the following credentials to sign in to the
    application:

    ``` bash
    Manager  --> Username: cameron | Password: cameron123
    Employee --> Username: alex    | Password: alex123 
    ```

    ![WSO2 Identity Server sign in page]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

    !!! info
        The HARDWARE KEY login page appears as HARDWARE KEY is the second authentication factor.

4.  Enter the DEMO key that appears in the browser and click **Sign In**.

    ![Enter the hardware key]({{base_path}}/assets/img/get-started/hardware-key.png)

    !!! info
        After successful authentication, the **User Consent** page of the **Pickup-Dispatch** application appears.

5.  Select the attributes you agree to share with the **Pickup-Dispatch** application and click
    **Continue**.

    ![Consent page]({{base_path}}/assets/img/get-started/qsg-sso-consent.png)      

    !!! note
        Obtaining user consent is a fundamental requirement of the General Data Protection Regulation (GDPR). WSO2 Identity Server facilitates this through its **Consent Management** features. To learn more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent Management]({{base_path}}/references/concepts/consent-management/).

     Note that the **Pickup-Dispatch** application home screen appears.

     ![Pickup Dispatch home screen]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-home.png)

## What's next?

To try out other scenarios, navigate back to the command-line where you ran the quickstart sample and enter `y` to clean the setup.
    
![QSG cleanup]({{base_path}}/assets/img/get-started/qsg-sso-cleanup.png)
