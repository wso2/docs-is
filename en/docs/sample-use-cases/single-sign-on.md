# Single Sign-On

Follow the instructions given here to to try out single sign-on.

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

[Install WSO2 Identity Server]({{base_Path}}/sample-use-cases/set-up/) and start the server.

## Try SSO with SAML 2.0

If the two applications are using SAML 2.0 as their authentication
protocol, follow the steps below.

### Run the sample scenario

First, let's set up and run the sample applictions.

1.  Follow the instructions on [setting up the samples]({{base_path}}/sample-scenario/#set-up-the-sample-apps).

    !!! info
        A message appears to pick a scenario.
    
    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png) 


2.  Enter `1` as the scenario number at the command prompt.
          
    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png)

    !!! info
    
        The following set up is created:

        1.  Create the two users, Cameron and Alex.
        2.  Create and assign the user role Manager to Cameron.
        3.  Create service providers for Pickup Dispatch and Pickup Manager.
        4.  Configure SAML2 web SSO for Pickup Dispatch and Pickup Manager.
        
Note that a message with the user and web application details appears.
          
![User and web application details]({{base_path}}/assets/img/get-started/qsg-sso-configure-saml-2.png)
    
### Try it out

1.  Copy `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com` to your browser to access the Pickup Dispatch application.

2.  Click **Login** to access the authentation page.
  
    ![Pickup Dispatch application login]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-login.png)
    
3.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Senior Manager --> Username: cameron | Password: cameron123
    Junior Manager --> Username: alex    | Password: alex123
    ```

    ![WSO2 Identity Server sign in page]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

4.  Select the attributes that you want to share with Pickup Dispatch and click
    **Continue**.

    ![Consent page]({{base_path}}/assets/img/get-started/qsg-sso-consent.png)

    !!! note
    
        Obtaining the user consent is one of the fundamental requirements of
        the GDPR regulation. WSO2 Identity Server facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent
        Management]({{base_path}}/references/concepts/consent-management/).

    Note that the Pickup Dispatch home screen appears.

    ![Pickup Dispatch home screen]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-home.png)

5.  Similarly, copy `http://localhost.com:8080/saml2-web-app-pickup-manager.com` to your browser to access the Pickup Manager application.

6.  Click **Login** to access the application.
  
    ![Pickup Manager login page]({{base_path}}/assets/img/get-started/qsg-sso-manager-login.png)

Note that the Pickup Manager application opens without having to enter the user credentials again.
    
![Pickup Manager home screen]({{base_path}}/assets/img/get-started/qsg-sso-manager-home.png)

## Try SSO with OIDC

If the two applications are using OIDC as their authentication
protocol, follow the steps below:

### Run the sample scenario

First, let's set up and run the sample applictions.

1.  Follow the instructions on [setting up the samples]({{base_path}}/sample-scenario/#set-up-the-sample-apps).

    !!! info
        A message appears to pick a scenario.
    
    ![List of scenarios in QSG]({{base_path}}/assets/img/get-started/qsg-configure-sso.png) 

2.  Enter `2` as the scenario number at the command prompt.
     
    !!! info
        Note that a message with the user and application details appear.

    <img src="{{base_path}}/assets/img/get-started/qsg-configure-sso-2.png" width="600" alt="QSG user and web application details"/>

### Try it out

Let's access both the **Pickup-Dispatch** and **Pickup-Manager** applications and try login.

1.  Copy `http://localhost.com:8080/pickup-dispatch` to your web browser to access the Pickup Dispatch application.

2.  Click **Login** to access the authentation page.
  
    ![Pickup Dispatch application login]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-login.png)
    
3.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Senior Manager --> Username: cameron | Password: cameron123
    Junior Manager --> Username: alex    | Password: alex123
    ```

    ![WSO2 Identity Server sign in page]({{base_path}}/assets/img/get-started/qsg-sso-login-credentials.png)

4.  Select the attributes that you wish to share with **Pickup Dispatch**
    and click **Continue**.

    ![Consent page]({{base_path}}/assets/img/get-started/qsg-sso-consent.png)

    !!! note
        Obtaining user consent is one of the fundamental requirements of
        GDPR regulations. WSO2 Identity Server facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent Management]({{base_path}}/references/concepts/consent-management/).
    

    Note that the Pickup Dispatch home screen appears.

    ![Pickup Dispatch home screen]({{base_path}}/assets/img/get-started/qsg-sso-dispatch-home.png)

5.  Similarly, copy `http://localhost:8080/pickup-manager`
    to a browser to access the **Pickup Manager** application. 
    
    !!! info
        Notice that the Pickup Manager application opens without having to enter the
    user credentials.  
      
    ![Pickup Manager home screen]({{base_path}}/assets/img/get-started/qsg-sso-manager-home.png)
     
You have set up SSO and your employees only have to provide credentials once in order to access both **Pickup Dispatch** and **Pickup Manager** applications.

## What's next?

To try out other scenarios, navigate back to where you ran the quickstart sample on the command-line and enter `y` to clean the setup.
    
![QSG cleanup]({{base_path}}/assets/img/get-started/qsg-sso-cleanup.png)
    