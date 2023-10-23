# Enable Single Sign-On for a SAML Web Application

This page guides you through configuring [single sign-on authentication]({{base_path}}/references/concepts/single-sign-on) between two SAML web applications. This is demonstrated using two sample applications called Pickup Dispatch and Pickup Manager.

## Scenario

Pickup is a cab company that has two SAML web applications called pickup-dispatch and pickup-manager. Both applications use WSO2 Identity Server (IS) as the identity provider. When SSO is configured for both these applications, an employee is only required to provide their credentials to the first application and the user will be automatically logged in to the second application.

![SAML SSO scenario]({{base_path}}/assets/img/samples/saml-sso-scenario-diagram.png)

Follow the steps below to deploy two sample applications and see how this works. 

----

## Register the service providers

You need to register the two sample applications as service providers in WSO2 Identity Server.

### Pickup Dipatch

1.  Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`) using admin/admin credentials. 

2.  Navigate to **Main** > **Identity** > **Service Providers** and click **Add**.

3.  Enter `saml2-web-app-pickup-dispatch` in the **Service Provider Name** text box,
    and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

    1.  Now set the configuration as follows:

        -   **Issuer**: `saml2-web-app-pickup-dispatch.com`
        -   **Assertion Consumer URL**:  `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp`                       
        
        Click **Yes**, in the message that appears.

    2.  Select the following checkboxes:

        -   **Enable Response Signing**
        -   **Enable Single Logout**
        -   **Enable Attribute Profile**
        -   **Include Attributes in the Response Always**
        -   **Enable Signature Validation in Authentication Requests and Logout Requests**
    
    !!! tip
        For more information on the advanced configurations, see [Advanced SAML Configurations]({{base_path}}/guides/login/saml-app-config-advanced/).

5.  Click **Register** to save the changes.  

### Pickup Manager

1.  Access the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Navigate to **Main** > **Identity** > **Service Providers** and click **Add**.

3.  Enter `saml2-web-app-pickup-manager` in the **Service Provider Name** text box,
    and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.

    1.  Now, set the configuration as follows:

        -   **Issuer** : `               saml2-web-app-pickup-manager.com             `

        -   **Assertion Consumer URL** :
            `                               http://localhost.com:8080/saml2-web-app-pickup-manager.com/home.jsp`                        
                 
            Click **Yes**, in the message that appears.

    2.  Select the following check-boxes:
        -   **Enable Response Signing**
        -   **Enable Single Logout**
        -   **Enable Attribute Profile**
        -   **Include Attributes in the Response Always** 
        -   **Enable Signature Validation in Authentication Requests and Logout Requests**          
    
    !!! tip
        For more information on the advanced configurations
        refer, [Advanced SAML Configurations]({{base_path}}/guides/login/saml-app-config-advanced).

5.  Click **Register** to save the changes. 

## (Optional) Configure claims

Additionally, you can also configure claims for the service providers.

1. On the **Main** menu of the management console, click **Service Providers**>**List**, and **Edit** the "pickup-dispatch" service provider.

2. Expand the **Claim Configuration** section in the service provider form.

3. You can select the claims that must be sent to the service provider. Select **Use Local Claim Dialect** and click **Add Claim URI**.

4. Add the following claims as **Requested Claims**. 
	1. http://wso2.org/claims/fullname
	2. http://wso2.org/claims/emailaddress

5. Select `http://wso2.org/claims/fullname` as the **Subject claim URI** and click **Update** to save the service provider configurations. 

    ![Service provider claim configurations]({{base_path}}/assets/img/samples/dispatch-configure-claims.png)

6. Now, logout of the **Pickup Dispatch** and **Pickup Manager** applications.

7. Access `http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com` on your browser and click **Login**.

8. Note that the user is now prompted for consent to share the **Email Address** claim value with the sample application.  

    ![Pickup Dispatch email consent]({{base_path}}/assets/img/samples/dispatch-email-consent.png)

Now you have successfully configured additional claims for your service provider.

## Deploy the samples

1.  Download Apache Tomcat 8.x from [here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.
        
    !!! Info
        It is recommended that you use a hostname that is not `localhost` to avoid browser errors. Modify the `/etc/hosts` entry in your machine to reflect this. Note that `wso2is.local` is used in this documentation as an example, but you must modify this when configuring the authenticators or connectors with this sample application.

2.  Download the following samples:
    -   [saml2-web-app-pickup-manager.com.war](https://github.com/wso2/samples-is/releases/download/v4.5.2/saml2-web-app-pickup-manager.com.war)
    -   [saml2-web-app-pickup-dispatch.com.war](https://github.com/wso2/samples-is/releases/download/v4.5.2/saml2-web-app-pickup-dispatch.com.war)

3.  Copy the downloaded `saml2-web-app-pickup-dispatch.com.war` and `saml2-web-app-pickup-manager.com.war` files into the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder. 

4.  Start the Tomcat server.

You are now ready to try out SAML SSO with the Pickup Dispatch and Pickup Manager sample web applications.

## Configure CORS

{!./includes/cors-config.md!}

## Try it

1. Navigate to `http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com` on your browser and click **Login**.

    ![Pickup Dispatch login]({{base_path}}/assets/img/samples/dispatch-login.png)

2. You will be redirected to the login page of WSO2 IS. Log in using your WSO2 IS credentials (admin/admin). Provide the required consent.
You will be redirected to the Pickup Dispatch application home page.

3. Now, if you navigate to `http://wso2is.local:8080/saml2-web-app-pickup-manager.com` and click **Login**, you can see that the user has been automatically logged in to this application without being prompted for user credentials.

You have successfully configured SAML single sign-on for two web applications using WSO2 IS as the identity provider. 

----

!!! info "Related topics"
    - [Concept: Single Sign-On]({{base_path}}/references/concepts/single-sign-on)
    - [Guide: SAML Front-Channel Logout]({{base_path}}/guides/login/saml-front-channel-logout)
    - [Guide: SAML Back-Channel Logout]({{base_path}}/guides/login/saml-back-channel-logout)