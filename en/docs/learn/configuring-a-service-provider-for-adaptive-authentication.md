# Configuring a Service Provider for Adaptive Authentication

Adaptive authentication enables an identity provider to prompt
multi-factor authentication steps based on a user's risk profile or user
behavior, i.e., the authentication adapts to the situation or the user during the authentication process.

!!! Tip "Example" 
    For instance, high-risk logins such as a user
    attempting to log in from an unusual location causes the adaptive
    authentication mechanism to prompt an extra authentication in order to
    increase security.

For more information on adaptive authentication with WSO2 IS, see
[Adaptive Authentication](../../learn/adaptive-authentication).

This tutorial guides you through setting up a sample application to try
out adaptive authentication and configuring it as a service provider in
WSO2 IS.


### Step 01: Set Up the Samples

Follow the steps below to set up the sample application to try out
adaptive authentication using a sample application.

1.  PickUp sample web application (SAML).
    1.  [Deploy and configure `saml2-web-app-pickup-dispatch`](../../learn/deploying-the-sample-app/#deploying-the-saml2-web-app-pickup-dispatch-webapp)
    sample application.

    2.  Access the PickUp application URL at
        <http://localhost:8080/saml2-web-app-pickup-dispatch.com>

        Note that a login screen appears.
        
        ![saml2-pickup-dispath-login](../assets/img/tutorials/saml2-pickup-dispatch-login.png)

2.  Deploy the sample authenticator dependency and web application in
    WSO2 IS.

    1.  Download the [org.wso2.carbon.identity.sample.extension.authenticators-5.9.0.jar](../../assets/attachments/org.wso2.carbon.identity.sample.extension.authenticators-5.9.0.jar) file and paste it inside the
        `              <IS_HOME>/repository/components/dropins             ` directory.
        
        !!! Note 
            The 
            `org.wso2.carbon.identity.sample.extension.authenticators-5.9.0.jar`
            contains implementation of the sample authenticators (Demo
            HardwareKey authenticator, Demo Fingerprint authenticator, Demo
            FaceID authenticator) used in this tutorial.
            
    2.  Download the
        [sample-auth.war](https://github.com/wso2/samples-is/releases/download/v4.1.0/sample-auth.war)
        file and paste it inside the `
        <IS_HOME>/repository/deployment/server/webapps ` folder.  
        
        !!! Note 
            This `sample-auth.war ` file contains the WEB UI for
            the sample authenticators used in this tutorial.
            
    3.  Start the WSO2 IS server and test whether all the samples are
        configured successfully.

        1.  Sign in to the WSO2 IS Management Console with one of the
            following URLs using `                admin               `
            as the **username** and **password**.

            ``` java
            For HTTP  --> http://<HTTP_HOST>:9776/carbon
            For HTTPS --> https://<HTTPS_HOST>:9443/carbon
            ```

        2.  On the **Main** tab, click **Service Providers &gt; Add**
            .  
            ![Add Service Providers](../assets/img/tutorials/add-service-providers.png)
        3.  Enter `               test              ` as the **Service
            Provider Name** and click **Register.**  
            ![Register New Service Provider](../assets/img/tutorials/add-new-sp-1.png)
        4.  Expand the **Local and Outbound Configuration** section.  
            The following authenticators should be available in the
            local authenticators list.

            -   Demo Fingerprint Authenticator
            -   Demo Hardware-Key Authenticator
            -   Demo Face ID Authenticator

            ![Demo Authenticators](../assets/img/tutorials/demo-authenticators.png)

            Remain in the Management Console.

        !!! note
        
                These Demo Authenticators are provided as a way of learning and
                experimenting the adaptive authentication templates in realtime.
                These authenticators perform no real function and should not be
                used for any production or QA purposes.
        

### Step 02: Configure the Service Provider

In this step, let's configure a service provider for the sample
application by setting up inbound authentication.

!!! info
    This tutorial guides you through setting up a service provider for a
    SAML application. To configure a service provider with other protocols
    such as OAuth and WS-Federation, see [Configuring Inbound Authentication
    for a Service Provider](../../learn/configuring-inbound-authentication-for-a-service-provider).

!!! Warning "Before you proceed" 
    In the previous step, you have deployed and
    [registered the `saml2-web-app-pickup-dispatch.com` webapp](../../learn/deploying-the-sample-app/#configuring-the-service-provider_2).
    If you complete that you can skip steps 1 to 4 below and directly jump
    to step 5.
            
1.  On the **Main** tab, click **Service Providers &gt; Add** and add a
    new service provider called ` saml2-web-app-pickup-dispatch.com ` .

    For more information about configuring a service provider, see
    [Adding and Configuring a Service
    Provider](../../learn/adding-and-configuring-a-service-provider).

2.  Expand the **Inbound Authentication configuration&gt; SAML2 Web SSO
    configuration** section, and click **Configure**.  
    ![Configure a Service Provider](../assets/img/tutorials/configure-saml-sso.png)
3.  Fill in the following fields.  
    -   **Issuer:**
        `             saml2-web-app-pickup-dispatch.com            `
    -   **Assertion Consumer URL:**
        `             http://localhost.com:8080/saml2-web-app-pickup-dispatch.com/consumer            `
4.  Leave the rest of the default configurations as it is and click
    **Register**.  
    ![Register a New Service Provider](../assets/img/tutorials/registering-a-service-provider.png)
5.  Expand **Local and Outbound Authentication Configuration** and click
    **Advanced Configuration**.  
    ![Advanced Authentication Configuration](../assets/img/tutorials/advanced-auth-config.png)
6.  You can add authentication steps or use a template to configure
    adaptive authentication depending on your requirement. For example,
    add Demo HardwareKey Authenticator.  
    ![Adaptive Authentication Templates](../assets/img/tutorials/adaptive-auth-templates.png)
7.  Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file. 

   ``` toml
   [[resource.access_control]]
   context = "/sample-auth(.*)"
   secure = false
   http_method = "all"
   ```    
8. Restart the server   

## What's Next?

Now that you have set up the service provider, the sample application,
and the demo authenticators, you can try out the [scenarios](../../learn/adaptive-authentication-scenarios)
that use pre-defined templates for different adaptive authentication use
cases.
