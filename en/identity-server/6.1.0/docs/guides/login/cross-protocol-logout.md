# Configure Cross-Protocol Logout

This page guides you through enabling cross-protocol logout across different protocols such as SAML and OpenID Connect in WSO2 Identity Server.

## Register the service providers

You need to register the two sample applications as service providers in WSO2 Identity Server.

### Pickup Dispatch (SAML)

Follow the steps given below to register a SAML application as a service provider in WSO2 IS.

1.  Log in to the management console (`https://<IS_HOST>:<PORT>/carbon`) using admin/admin credentials. 

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

### Pickup Manager (OIDC)

Follow the steps given below to register an OIDC application as a service provider in WSO2 IS.

1. Access the management console (`https://<IS_HOST>:<PORT>/carbon`).

2. Navigate to **Main**>**Identity**>**Service Providers** and click **Add**.

3. Enter **pickup-manager** in the **Service Provider Name** text box,
    and click **Register**.

4. In the **Inbound Authentication Configuration** section, click
    **Configure** under the **OAuth/OpenID Connect Configuration** section.
    
5. Enter the following value as the **Callback URL**: `http://localhost.com:8080/pickup-manager/oauth2client`

    !!! Tip
        The callback URL is the service provider URL to which the authorization codes are sent. Upon successful authentication, the browser should be redirected to this URL. 

6. Click **Add**. Note the **OAuth Client Key** and **Client Secret** that is displayed. You will need these values later on when deploying the sample application.

    !!! Tip
        For more information on the advanced configurations
        refer, [Advanced OAuth/OpenID Connect Configurations]({{base_path}}/guides/login/oauth-app-config-advanced).

5.  Click **Register** to save the changes.

## Set up the Pickup Manager sample

Let's configure the Pickup Manager (OIDC) application to connect with WSO2 IS.

1. Download the [pickup-manager.war](https://github.com/wso2/samples-is/releases/download/v4.5.2/pickup-manager.war) sample.

2. Extract the `pickup-manager.war` file and open the `manager.properties` file located in the `<EXTRACT>/WEB-INF/classes` folder.

3. Replace the `consumerKey` and `consumerSecret` values with the OAuth Client Key and Client Secret values that were generated for the newly created service provider.

    ![pickup-key-secret-2]({{base_path}}/assets/img/fragments/pickup-key-secret-2.png)

## Deploy the samples

Next, deploy the sample web apps on a web container.

1.  Download Apache Tomcat 8.x from
[here](https://tomcat.apache.org/download-80.cgi) and install. Tomcat
server installation location will be referred as `<TOMCAT_HOME>` later
in this guide.      
    
    !!! Info
        It is recommended that you use a hostname that is not `localhost` to avoid browser errors. Modify the `/etc/hosts` entry in your machine to reflect this. Note that `wso2is.local` is used in this documentation as an example, but you must modify this when configuring the authenticators or connectors with this sample application.

4.  To deploy the two applications:

    1.  Copy the extracted and modified OIDC `pickup-manager` application folder to the `<TOMCAT_HOME>/webapps` folder.

    2.  Download the [saml2-web-app-pickup-dispatch.com.war](https://github.com/wso2/samples-is/releases/download/v4.5.2/saml2-web-app-pickup-dispatch.com.war) sample and copy it to the `<TOMCAT_HOME>/apache-tomcat-<version>/webapps` folder.

----

## Try it

Once you have configured all your applications, access them in separate tabs in your browser. When you logout from one application, it should log you out from all the configured applications.

1. Access `http://wso2is.local:8080/saml2-web-app-pickup-dispatch.com` on your browser and click **Login**.

2. You will be redirected to the login page of WSO2 IS. Log in using your WSO2 IS credentials (`admin`/`admin`). Provide the required consent. You will be redirected to the Pickup Dispatch application home page.

3. Now, if you access `http://wso2is.local:8080/pickup-manager` and click **Login**, you can see that user has been automatically logged in to this application without being prompted for user credentials.

4. Click **Admin** on the top-right corner and click **Logout** to log out of the OIDC Pickup Manager application. 

5. Switch to the SAML Pickup Dispatch app on your browser. You will see that you have been logged out of the SAML application as well. 

You have successfully tried out cross-protocol logout between a SAML application and an OIDC application.

----

!!! info "Related topics"
    - [Guide: Single Sign-On]({{base_path}}/guides/login/enable-single-sign-on)
    - [Guide: SAML Front-Channel Logout]({{base_path}}/guides/login/saml-front-channel-logout)
    - [Guide: SAML Back-Channel Logout]({{base_path}}/guides/login/saml-back-channel-logout)
    - [Guide: OpenID Connect Back-Channel Logout]({{base_path}}/guides/login/oidc-backchannel-logout)
    - [Guide: OpenID Connect Logout URL Redirection]({{base_path}}/guides/login/oidc-logout-url-redirection)
    <!--- - [Concept: Cross-Protocol Logout](TODO:insert-link-to-concept)-->