# Configure SAML 2.0 Back-Channel Logout

This page guides you through [SAML 2.0 back-channel logout]({{base_path}}/references/concepts/authentication/saml-back-channel/) for applications with WSO2 Identity Server. This will ensure that the user is logged out from all configured applications with a single logout request via one of the applications.

---

## Scenario

The user is required to log in to two different applications. For convenience and security, the user should be logged out of both the applications when the user attempts to log out from either one of them. 

---

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
        -   **Assertion Consumer URL**:  ` http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/home.jsp `                       
        
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

        -   **Issuer**: `saml2-web-app-pickup-manager.com`
        -   **Assertion Consumer URL**: `http://localhost.com:8080/saml2-web-app-pickup-manager.com/home.jsp`                        
                 
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

## Deploy the samples

1.  Download Apache Tomcat 8.x from [here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later in this guide.
        
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

---

## Try it

Once you have configured all your applications, access them on separate tabs in your browser. When you log out from one of the applications, it should log you out from all the other configured applications.

1.  Access the Pickup Dispatch application, `http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/index.jsp`.

2.  Log in using admin/admin credentials. 

    ![Pickup Dispatch home page]({{base_path}}/assets/img/samples/pickup-dispatch.png)

3.  Access the Pickup Manager application, `http://localhost.com:8080/saml2-web-app-pickup-manager.com/index.jsp`.

4.  Log in using admin/admin credentials. 

    ![Pickup Manager home page]({{base_path}}/assets/img/samples/pickup-manager.png)

5.  Now log out of the Pickup Dispatch application. 

6.  You can see that you have been logged out of the Pickup Manager application as well. 

    ![Logout message]({{base_path}}/assets/img/samples/backchannel-logout.png) 

---

!!! info "Related topics"
    -   [Concept: SAML 2.0 back-channel logout]({{base_path}}/references/concepts/authentication/saml-back-channel/)