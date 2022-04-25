### Problem scenario

When the number of applications that are used in Pickup increases, the
employees have to maintain more credentials. This is not scalable.
Cameron decides to use single sign-on (SSO) to overcome this situation.
With SSO, when a user signs in to one application, that
user is automatically signed in to other applications, eliminating
the need to maintain multiple credentials.

<!-- ![QSG SSO scenario](../../assets/img/get-started/qsg-sso-scenario.png)
 -->


<!-- ![QSG SSO scenario2](../../assets/img/get-started/qsg-sso-scenario2.png) -->


### Configure SSO with SAML 2.0

If the two applications are using SAML 2.0 as their authentication
protocol, follow the steps below:

1.  Enter `1` as the scenario number at the
    command prompt to:

    1.  Create the two users, Cameron and Alex.
    2.  Create and assign the user role Manager to Cameron.
    3.  Create service providers for Pickup Dispatch and Pickup Manager.
    4.  Configure SAML2 web SSO for Pickup Dispatch and Pickup
        Manager.
          
        ![List of scenarios in QSG](../../assets/img/get-started/qsg-configure-sso.png)
        
    5.  Note that a message with the user and web application details
        appears.
          
        ![User and web application details](../../assets/img/get-started/qsg-sso-configure-saml-2.png)


    !!! note
        You can also perform the above using the WSO2 Identity Server Management Console.
        For more information, see [Create Users](../../guides/identity-lifecycles/onboard-overview), [Create Roles](../../guides/identity-lifecycles/add-user-roles/), and [Configure Web Application for SSO](../../guides/login/sso-for-saml/).
    

2.  Go to the URL
    `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com` using
    a web browser to access the Pickup Dispatch application.

3.  Click **Login**.
  
    ![Pickup Dispatch application login](../../assets/img/get-started/qsg-sso-dispatch-login.png)
    
4.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Senior Manager --> Username: cameron | Password: cameron123
    Junior Manager --> Username: alex    | Password: alex123
    ```

    ![WSO2 Identity Server sign in page](../../assets/img/get-started/qsg-sso-login-credentials.png)

5.  Select the attributes that you want to share with Pickup Dispatch and click
    **Continue**.

    ![Consent page](../../assets/img/get-started/qsg-sso-consent.png)

    !!! note
    
        Obtaining the user consent is one of the fundamental requirements of
        the GDPR regulation. WSO2 Identity Server facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent
        Management](../../references/concepts/consent-management/).

    Note that the Pickup Dispatch home screen appears.

    ![Pickup Dispatch home screen](../../assets/img/get-started/qsg-sso-dispatch-home.png)

6.  Similarly, go to the URL
    `http://localhost.com:8080/saml2-web-app-pickup-manager.com` using
    your browser to access the Pickup Manager application.

7.  Click **Login**.
  
    ![Pickup Manager login page](../../assets/img/get-started/qsg-sso-manager-login.png)

8.  Note that the Pickup Manager application opens without having to
    enter the user credentials again.
    
    ![Pickup Manager home screen](../../assets/img/get-started/qsg-sso-manager-home.png)

9.  To try out other scenarios, navigate back to where you ran the Quick
    Start sample on the command-line and enter `y` to clean the setup.
      
    ![QSG cleanup](../../assets/img/get-started/qsg-sso-cleanup.png)

### Configure SSO with OIDC

If the two applications are using OIDC as their authentication protocol,
follow the steps below:

1.  Enter `2` as the scenario number at the command prompt.

    1.  Create the two users: Cameron and Alex.
    2.  Create and assign the user role Manager to Cameron.
    3.  Create service providers for Pickup Dispatch and Pickup Manager.
    4.  Configure SAML2 web SSO for Pickup Dispatch and Pickup Manager.

        ![List of scenarios in QSG](../../assets/img/get-started/qsg-configure-sso.png) 
     
    Note that a message with the user and web application details
    appears.

    <img src="../../assets/img/get-started/qsg-configure-sso-2.png" width="600" alt="QSG user and web application details"/>

2.  Enter `http://localhost.com:8080/pickup-dispatch` on a web browser to access the Pickup Dispatch application.

3.  Click **Login**.
  
    ![Pickup Dispatch application login](../../assets/img/get-started/qsg-sso-dispatch-login.png)
    
4.  Enter either of the following credentials to sign in to the
    application.

    ``` java
    Senior Manager --> Username: cameron | Password: cameron123
    Junior Manager --> Username: alex    | Password: alex123
    ```

    ![WSO2 Identity Server sign in page](../../assets/img/get-started/qsg-sso-login-credentials.png)

5.  Select the approval type that you wish provide and the attributes
    that you wish to share with the application and click **Continue**.
      
    ![Consent page](../../assets/img/get-started/qsg-oidc-consent.png)

    !!! note
        Obtaining the user consent is one of the fundamental requirements of
        GDPR regulation. WSO2 Identity Server facilitates this through its **Consent
        Management** features. To know more about GDPR and how WSO2 Identity Server
        handles consent, see [Consent
        Management](../../references/concepts/consent-management/).
    

    Note that the Pickup Dispatch home screen appears.

    ![Pickup Dispatch home screen](../../assets/img/get-started/qsg-sso-dispatch-home.png)

6.  Similarly, enter `http://localhost:8080/pickup-manager`
    on a browser to access the Pickup Manager application. Notice that
    the Pickup Manager application opens without having to enter the
    user credentials.  
      
    ![Pickup Manager home screen](../../assets/img/get-started/qsg-sso-manager-home.png)
     
    You have set up SSO and your employees are happy with their
    experience as they only have to provide credentials once in order to
    access both Pickup Dispatch and Pickup Manager.

7.  Next, in order to try out other scenarios, navigate back to the
    command prompt where you ran the Quick Start sample and enter
    `y` to clean the setup.
      
    ![QSG cleanup](../../assets/img/get-started/qsg-sso-cleanup.png)
    