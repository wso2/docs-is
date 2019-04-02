# Configuring a Service Provider for Adaptive Authentication

Adaptive authentication uses machine learning to enable an identity
provider to prompt multi-factor authentication steps based on a user's
risk profile or user behavior, i.e., the authentication adapts to the
situation or the user during the authentication process. For instance,
high-risk logins such as a user attempting to log in from an unusual
location causes the adaptive authentication mechanism to prompt an extra
authentication in order to increase security.

For more information on adaptive authentication with WSO2 IS, see
[Adaptive Authentication](adaptive-authentication-overview.md) .

This tutorial guides you through setting up a sample application to try
out adaptive authentication and configuring it as a service provider in
WSO2 IS.

!!! tip
    
    **Before you begin** ,
    
    1.  [Download](https://tomcat.apache.org/download-80.cgi) and
        [install](https://tomcat.apache.org/download-80.cgi) Apache Tomcat
        version 8.\*.\* or higher.
    
    2.  Install WSO2 IS version 5.7.0. by downloading the
        [installer](https://wso2.com/identity-and-access-management/install/)
        .
    3.  Open the `            /etc/hosts           ` file, add the following
        entry, and restart your computer.
    
        ```
        127.0.0.1       localhost.com
        ```

    > **Note:** To avoid any IP address conflicts, ensure that this is the only
    entry for this IP address in the `/etc/hosts` file.
    


### Step 01: Set Up the Samples

Follow the steps below to set up the sample application to try out
adaptive authentication using a sample application.

1.  PickUp sample web application (SAML).
    1.  Download the [saml2-web-app-pickup-dispatch.com.war](../../assets/file/tutorials/saml2-web-app-pickup-dispatch.com.war)
        file and paste it inside the
        `              <TOMCAT_HOME>/webapps             ` directory.

    2.  Start the tomcat server and access the PickUp application URL at
        <http://localhost.com:8080/saml2-web-app-pickup-dispatch.com.>

        Note that a login screen appears.
        
        ![saml2-pickup-dispath-login](../../assets/img/tutorials/saml2-pickup-dispath-login.png)

2.  Deploy the sample authenticator dependency and web application in
    WSO2 IS.

    1.  Download the
        `                             org.wso2.carbon.identity.sample.extension.authenticators-5.7.0.jar                           `
        file and paste inside the
        `              <IS_HOME>/repository/components/dropins             `
        directory.

    2.  Download the
        `                           sample-auth.war                         `
        file and paste it inside the
        `             <IS_HOME>/repository/deployment/server/webapps            `
        folder.  
        This `             .war            ` file contains the WEB UI
        for the sample authenticators used in this tutorial.
    3.  Start the WSO2 IS server and test whether all the samples are
        configured successfully.

        1.  Sign in to the WSO2 IS Management Console with one of the
            following URLs using `                admin               `
            as the **username** and **password** .

            ``` java
            For HTTP  --> http://<HTTP_HOST>:9776/carbon
            For HTTPS --> https://<HTTPS_HOST>:9443/carbon
            ```

        2.  On the **Main** tab, click **Service Providers &gt; Add**
            .  
            ![](../../assets/img/tutorials/add-service-providers.png)
        3.  Enter `               test              ` as the **Service
            Provider Name** and click **Register.** **  
            ** ![](../../assets/img/tutorials/add-new-sp-1.png)
        4.  Expand the **Local and Outbound Configuration** section.  
            The following authenticators should be available in the
            local authenticators list.

            -   Demo Fingerprint Authenticator
            -   Demo Hardware-Key Authenticator
            -   Demo Face ID Authenticator

            ![](../../assets/img/tutorials/demo-authenticators.png)

            Remain in the Management Console.

        !!! note
        
                These Demo Authenticators are provided as a way of learning and
                experimenting the adaptive authentication templates in realtime.
                These authenticators perform no real function and should not be
                used for any production or QA purposes.
        

### Step 02: Configure the Service Provider

In this step, let's configure a service provider for the sample
application by setting up inbound authentication.

This tutorial guides you through setting up a service provider for a
SAML application. To configure a service provider with other protocols
such as OAuth and WS-Federation, see [Configuring Inbound Authentication
for a Service
Provider](https://docs.wso2.com/display/IS570/Configuring+Inbound+Authentication+for+a+Service+Provider)
.

1.  On the **Main** tab, click **Service Providers &gt; Add** and add a
    new service provider called
    `            saml2-web-app-dispatch.com           ` .

    For more information about configuring a service provider, see
    [Adding and Configuring a Service
    Provider](https://docs.wso2.com/display/IS570/Adding+and+Configuring+a+Service+Provider)
    .

2.  Expand the **Inbound Authentication configuration&gt; SAML2 Web SSO
    configuration** section, and click **Configure** .  
    ![](../../assets/img/tutorials/configure-saml-sso.png)
3.  Fill in the following fields.  
    -   **Issuer:**
        `             saml2-web-app-pickup-dispatch.com            `
    -   **Assertion Consumer URL:**
        `             http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/consumer            `
4.  Leave the rest of the default configurations as it is and click
    **Register** .  
    ![](../../assets/img/tutorials/register-new-sp.png)
5.  Expand **Local and Outbound Authentication Configuration** and click
    **Advanced Configuration** .  
    ![](../../assets/img/tutorials/advanced-config.png)
6.  You can add authentication steps or use a template to configure
    adaptive authentication depending on your requirement. For example,
    add Demo HardwareKey Authenticator.  
    ![](../../assets/img/tutorials/adaptive-auth-templates.png)

## What's Next?

Now that you have set up the service provider, the sample application,
and the demo authenticators, you can try out the following scenarios
that use pre-defined templates for different adaptive authentication use
cases.
