# Single Sign-On

Follow the instructions given here to try out single sign-on.

## Problem scenario

When the number of applications that are used in **Pickup** increases, the
employees have to maintain more credentials. This is not scalable.

Therefore, **Pickup** decides to use single sign-on (SSO) to overcome this situation.
With SSO, when a user signs in to one application, that
user is automatically signed in to other applications, eliminating
the need to maintain multiple credentials.

<!-- ![QSG SSO scenario]({{base_path}}/assets/img/get-started/qsg-sso-scenario.png)
 -->
<!-- ![QSG SSO scenario2]({{base_path}}/assets/img/get-started/qsg-sso-scenario2.png) -->

## Prerequisites

Follow the [quick setup]({{base_path}}/get-started/sample-use-cases/set-up/) instructions to install and start the WSO2 Identity Server.

## Try SSO with SAML 2.0

If the two applications are using SAML 2.0 as their authentication
protocol, follow the steps below.

### Run the sample scenario

First, let's set up and run the sample applications.

1.  Follow the instructions on [setting up the samples]({{base_path}}/get-started/sample-use-cases/sample-scenario/#set-up-the-sample-apps).

    !!! info
        A message appears to pick a scenario.
    
    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png) 


2.  Enter `1` as the scenario number at the command prompt.

    !!! info
    
        Running scenario 1 does the following:

        1.  Creates the two users, Cameron and Alex.
        2.  Creates and assigns the user role of Manager to Cameron.
        3.  Creates service providers for Pickup Dispatch and Pickup Manager.
        4.  Configures SAML2 web SSO for **Pickup-Dispatch** and **Pickup-Manager** applications.
        
    Note that a message with the user and web application details appears.
          
    ![User and web application details]({{base_path}}/assets/img/get-started/qsg-sso-configure-saml-2.png)
    
### Try it out

1.  Copy `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com` to your browser to access the **Pickup-Dispatch** application.

2.  Click **Login** to access the authentication page.
  
    ![Pickup Dispatch application login]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-login.png)
    
3.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Senior Manager --> Username: cameron | Password: cameron123
    Junior Manager --> Username: alex    | Password: alex123
    ```

    ![WSO2 Identity Server sign in page]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

4.  Select the attributes you agree to share with the **Pickup-Dispatch** application and click
    **Continue**.

    ![Consent page]({{base_path}}/assets/img/get-started/qsg-sso-consent.png)

    !!! note
    
        Obtaining user consent is a fundamental requirement of the General Data Protection Regulation (GDPR). WSO2 Identity Server facilitates this through its **Consent Management** features. 
        To learn more about GDPR and how WSO2 Identity Server handles consent, see [Consent Management]({{base_path}}/references/concepts/consent-management/).

    Note that the **Pickup-Dispatch** application home screen appears.

    ![Pickup Dispatch home screen]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-home.png)

5.  Similarly, copy `http://localhost.com:8080/saml2-web-app-pickup-manager.com` to your browser to access the **Pickup-Manager** application.

6.  Click **Login** to access the application.
  
    ![Pickup Manager login page]({{base_path}}/assets/img/get-started/qsg-sso-manager-login.png)

Note that the **Pickup-Manager** application opens without having to enter the user credentials again.
    
![Pickup Manager home screen]({{base_path}}/assets/img/get-started/qsg-sso-manager-home.png)

## Try SSO with OIDC

Follow the steps below to try out the scenario where the two applications use OIDC as their authentication
protocol:

### Run the sample scenario

First, let's set up and run the sample applications.

1.  Follow the instructions on [setting up the samples]({{base_path}}/sample-use-cases/sample-scenario/#set-up-the-sample-apps).

    !!! info
        A message appears to pick a scenario.
    
    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png) 

2.  Enter `2` as the scenario number at the command prompt.
     
    !!! info
        Note that a message with the user and application details appears.

    <img src="{{base_path}}/assets/img/get-started/qsg-configure-sso-2.png" width="600" alt="QSG user and web application details"/>

### Try it out

Let's access both **Pickup-Dispatch** and **Pickup-Manager** applications and proceed to sign in.

1.  Copy `http://localhost.com:8080/pickup-dispatch` to your web browser to access the Pickup Dispatch application.

2.  Click **Login** to access the authentication page.
  
    ![Pickup Dispatch application login]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-login.png)
    
3.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Senior Manager --> Username: cameron | Password: cameron123
    Junior Manager --> Username: alex    | Password: alex123
    ```

    ![WSO2 Identity Server sign in page]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

4.  Select the attributes you agree to share with the **Pickup-Dispatch** application and click **Continue**.

    ![Consent page]({{base_path}}/assets/img/get-started/qsg-sso-consent.png)

    !!! note
        Obtaining user consent is a fundamental requirement of the General Data Protection Regulation (GDPR). WSO2 Identity Server facilitates this through its **Consent Management** features. 
        To learn more about GDPR and how WSO2 Identity Server handles consent, see [Consent Management]({{base_path}}/references/concepts/consent-management/).
    

    Note that the **Pickup-Dispatch** application home screen appears.

    ![Pickup Dispatch home screen]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-home.png)

5.  Similarly, copy `http://localhost:8080/pickup-manager`
    to a browser to access the **Pickup Manager** application. 
    
    !!! info
        Notice that the **Pickup-Manager** application opens without having to enter the user credentials.  
      
    ![Pickup Manager home screen]({{base_path}}/assets/img/get-started/qsg-sso-manager-home.png)
     
You have set up SSO and your employees only have to provide credentials once to access both **Pickup-Dispatch** and **Pickup-Manager** applications.

## What's next?

To try out other scenarios, navigate back to the command-line where you ran the quickstart sample and enter `y` to clean the setup.
    
![QSG cleanup]({{base_path}}/assets/img/get-started/qsg-sso-cleanup.png)
    
