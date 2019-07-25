# Configuring Mobile Connect as a Federated Authenticator

This topic provides instructions on how to configure the Mobile Connect
as a federated authenticator with WSO2 Identity Server. This scenario is
illustrated using a sample application.

Before you begin

Look through the following prior to configuring the Mobile Connect
authenticator.

-   For a high-level overview of Mobile Connect and its use cases with
    WSO2 Identity Server, see [Mobile Connect
    Authenticator](_Mobile_Connect_Authenticator_).
-   Download the WSO2 Identity Server from [the WSO2 Identity Server
    product page](http://wso2.com/products/identity-server/) and extract
    the .zip file. That folder is referred to as
    `            <IS_HOME>           ` in this topic.

-   Ensure that you have Apache Maven installed if you want to build
    this authenticator from the source.
-   You can also follow the [webinar conducted on this
    topic](http://wso2.com/library/webinars/2016/11/securing-access-to-saas-apps-with-gsma-mobile-connect/)
    .

The following are the various sections available in this topic.

-   [Deploying the Mobile Connect
    authenticator](#ConfiguringMobileConnectasaFederatedAuthenticator-DeployingtheMobileConnectauthenticator)
-   [Configuring Mobile
    Connect](#ConfiguringMobileConnectasaFederatedAuthenticator-ConfiguringMobileConnect)
-   [Deploying the sample
    application](#ConfiguringMobileConnectasaFederatedAuthenticator-Deployingthesampleapplication)
-   [Configuring the Identity
    Server](#ConfiguringMobileConnectasaFederatedAuthenticator-ConfiguringtheIdentityServer)
-   [Testing the federated authentication
    flow](#ConfiguringMobileConnectasaFederatedAuthenticator-Testingthefederatedauthenticationflow)
-   [Configuring the Identity Server as multi-step
    authenticator](#ConfiguringMobileConnectasaFederatedAuthenticator-ConfiguringtheIdentityServerasmulti-stepauthenticator)

Let's get started.

### Deploying the Mobile Connect authenticator

There are two ways to deploy the Mobile Connect authenticator.

-   [**Download it from the store**](#c9526bdfdc9e45a8b01dd92fca2f8024)
-   [**Build it from the source**](#bddc5958075d4b04bb3daf15d400d58a)

1.  The authenticator and the artifacts associated with it can be
    downloaded from the [WSO2 connector and authenticator
    store](https://store.wso2.com/store/assets/isconnector/details/b46b10c0-a52a-40fa-9fcf-00f7a1e0c345)
    .
2.  Copy the .jar file (
    `             org.wso2.carbon.extension.identity.authenticator.mobileconnect.connector-1.0.0.jar            `
    ) that you downloaded into the
    `             <IS_HOME>/repository/components/dropins            `
    directory.
3.  Copy the .war file (
    `             mobileconnectauthenticationendpoint.war            ` )
    into the
    `             <IS_HOME>/repository/deployment/server/webapps            `
    directory. This can be located inside the
    `             other_artifacats.zip            ` archive downloaded
    from the store.

1.  Download or clone the code from github using the link:
    <https://github.com/wso2-extensions/identity-outbound-auth-oidc-mobileconnect>
2.  Navigate to the folder you clones and build the code using the
    following command.

    ``` java
    mvn clean install
    ```

3.  Locate the
    `             org.wso2.carbon.extension.identity.authenticator.mobileconnect.connector-1.0.0-SNAPSHOT.jar            `
    file in the
    `             identity-outbound-auth-oidc-mobileconnect/component/authenticator/target/            `
    directory. Copy this .jar file into the
    `             <IS_HOME>/repository/components/dropins            `
    directory.
4.  Locate the
    `             mobileconnectauthenticationendpoint.war            `
    file in the
    `             identity-outbound-auth-oidc-mobileconnect/component/authentication-endpoint/target/            `
    directory. Copy this .war file into the
    `             <IS_HOME>/repository/deployment/server/webapps            `
    directory.

### Configuring Mobile Connect

To make this scenario works, you need to create a developer account in
Mobile Connect and use it to integrate with the WSO2 Identity Server.

1.  Navigate to
    <https://developer.mobileconnect.io/#overlay=user/register>, enter
    your name and email and click **Register** to register your Mobile
    Connect developer account. You will receive an email that includes a
    link that enables you to access your account.
2.  When you click the link, you are directed to a Mobile Connect page
    that requests a mobile number. Enter a relevant mobile number here.
    You will receive a confirmation from your mobile service provider.
    Now that this is configured, you can log in using your mobile phone.
3.  Once you log in, click **My Apps** from the left menu and click
    **Add Application**.  
    ![](attachments/72423834/72426246.png){height="250"}
4.  Fill in the required information to create an application and click
    **Create**.  
    ![](attachments/72423834/72426475.png){height="250"}  
    Fill in the following details.
    -   **Name** : Travelocity (any name you prefer)

    -   **URL** : localhost:8080/travelocity.com/index.jsp (any URL that
        describes your application)

    -   **Description** : Any description that provides information
        about the application

    -   **Redirect URI** : https://localhost:9443/commonauth

5.  Click **My Operators** and click **Accept Terms and Conditions for
    all operators**.  
    ![](attachments/72423834/72427944.png) 

6.  Go to **My Account** and click **My Test Numbers**. Add the test
    numbers and sandbox operators and click **Update**.  
    ![](attachments/72423834/72427946.png) 

### Deploying the sample application

Checkout the travelocity code and build the app as mentioned
[here](https://docs.wso2.com/display/IS530/Configuring+Single+Sign-On#ConfiguringSingleSign-On-ConfiguringtheSSOwebapplication){.markup--anchor
.markup--p-anchor} or download travelocity.com.war file from
[here](https://drive.google.com/file/d/0B3vvUbeVZ38wVDRQQ2V2YU05dEE/view?usp=sharing)
.

Use the following steps to deploy the web app in the web container:

1.  Stop the Apache Tomcat server if it is already running.
2.  Copy the travelocity.com.war file to the apache-tomcat/webapps
    folder.
3.  Start the Apache Tomcat server.

### Configuring the Identity Server

The configurations to be done in the WSO2 Identity Server involve
configuring different functionality. These are listed as follows.

-   [Configuring Mobile Connect authenticator
    parameters](#ConfiguringMobileConnectasaFederatedAuthenticator-ConfiguringMobileConnectauthenticatorparameters)
-   [Configuring the identity
    provider](#ConfiguringMobileConnectasaFederatedAuthenticator-Configuringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringMobileConnectasaFederatedAuthenticator-Configuringtheserviceprovider)
-   [Testing the on-net
    flow](#ConfiguringMobileConnectasaFederatedAuthenticator-Testingtheon-netflow)
-   [Testing the off-net
    flow](#ConfiguringMobileConnectasaFederatedAuthenticator-Testingtheoff-netflow)

#### Configuring Mobile Connect authenticator parameters

This configuration empowers the Identity Server to enable certain
parameters specific to Mobice Connect in the UI.

1.  Go to `          <IS_HOME>/repository/conf/identity         `
    directory and open the
    `                     application-authentication.xml                   `
    file.
2.  Insert the following code snippet inside the
    `           <AuthenticatorConfigs>          ` tag.

    ``` xml
        <AuthenticatorConfig name=”MobileConnectAuthenticator” enabled=”true”>
           <Parameter name=”MCAuthenticationEndpointURL”>mobileconnectauthenticationendpoint/mobileconnect.jsp</Parameter>
           <Parameter name=”MCDiscoveryAPIURL”>https://discover.mobileconnect.io/gsma/v2/discovery/</Parameter>
        </AuthenticatorConfig>
    ```

#### Configuring the identity provider

In this scenario, the identity provider is Mobile Connect, as you are
authenticating the user using the mobile. To make this work, you must
add Mobile Connect as an identity provider using the configuration
available in the Identity Server.

1.  Log in to the Management Console as an administrator. In the
    **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
2.  Under the Basic Information section of the form, fill in the
    following details.
    -   **Identity Provider Name** : Mobile Connect (or any suitable
        name)

    -   **Display Name** : Mobile Connect (or any suitable name)

    -   **Alias** : https://localhost:9443/oauth2/token

3.  Click and expand the **Federated Authenticators** section of the
    form and click and expand the **Mobile Connect Configurations**
    section. This section is available to you after configuring the
    Mobile Connect authenticator parameters.  
    ![](attachments/72423834/72428054.png)  
    In this section, configure the following.  

    | Field                              | Configuration | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
    |------------------------------------|---------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
    | Enable                             | Selected      | Ensure that this checkbox is selected to enable the authenticator.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
    | Mobile Connect Authentication Type | on-net        | There are two possible configuration values here. In **off-net** authentication, during the federated authentication process, the Identity Server provides a UI requesting users to provide their mobile number and carries out the authentication process. In **on-net** authentication, the Mobile Connect servers identify the internet connection being used and identifies the MNO automatically. If it fails to identify this, Mobile Connect provide one of their UIs and obtain the necessary details.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
    | Mobile Connect Key                 | xxxxxxxxxxxx  | Enter the key value provided by Mobile Connect when you create the application.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
    | Mobile Connect Secret              | xxxxxxxxxxxx  | Enter the secret value provided by Mobile Connect when you create the application.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
    | Mobile Connect Scope               | openid        | You can add multiple values with a space in between (e.g., **openid profile** ) *.*                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
    | Mobile Connect ACR Values          | 2             | The Level of Assurance required by the client for the use case can be used here. Default value is **2**. The values accespted here are **2** and **3**. According to the OpenID Connect specification, **acr\_values** is an optional parameter. However, in the Mobile Connect specification it is a mandatory parameter. The **acr\_values** parameter in the Mobile Connect request is an indication of what authentication methods to be used by the identity provider. The authentication methods to be used are linked to the level-of-assurance (LOA) values passed in the **acr\_values ** parameter *.* The level-of-assurance, as defined by the by [ISO/IEC 29115 standard](https://www.oasis-open.org/committees/download.php/44751/285-17Attach1.pdf), describes the degree of confidence in the processes leading up to and including an authentication. It provides assurance that the entity claiming a particular identity, is the entity to which that identity was assigned. During a Mobile Connect authentication request, the service provider specifies the degree of confidence that is required in the returned (asserted) identity, via the **acr\_values ** parameter *.* |

      

4.  Click **Register** to add the identity provider.

#### Configuring the service provider

The service provider is represented by a sample application called
travelocity. This section involves adding a representation of this
service provider to the Identity Server.

1.  Log in to the WSO2 Identity Server management console as an
    administrator. In the **Service Providers** section under the
    **Main** tab of the management console, click **Add**.
2.  Add the **Service Provider Name** and click Register . In this
    instance, you can use **travelocity** as the name as it is the name
    of the sample application.
3.  Navigate to the **Inbound Authentication Configuration** section of
    the form and click **Configure** under the **SAML2 Web SSO
    Configuration** section.  
4.  Do the following configurations and click **Register** to save your
    changes.  
    -   **Issuer** : travelocity
    -   **Assertion Consumer URLs** :
        http://localhost:8080/travelocity.com/home.jsp
    -   Select the following checkboxes:

        -   **Enable Response Signing**.

        -   **Enable Single Logout**.

        -   **Enable Attribute Profile**.

        -   **Include Attributes in the Response Always**

    See the following screen for a sample of how this configuration
    looks like.  
    ![](attachments/72423834/72436884.png)
5.  Navigate to the **Local and Outbound Authentication Configuration**
    section. Select the **Federated Authentication** radio button and
    select **Mobile Connect** from the dropdown list.  
    ![](attachments/72423834/72436900.png) 
6.  Click **Update** to save your changes.

### Testing the federated authentication flow

The steps to test this flow vary depending on whether you have
configured an on-net or off-net flow.

#### Testing the on-net flow

1.  Navigate to the following URL:
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/                     travelocity.com/index.jsp                   `
    and click the link to log in with SAML using the WSO2 Identity
    Server.  
    ![](attachments/72423834/80723064.png) 
2.  If you are on the web application you are redirected to the
    <https://discover.mobileconnect.io/gsma/v2/discovery/> endpoint
    application and you must provide the mobile number there. If you are
    in the mobile application, you will not see this page and you will
    be redirected to the page in step 3.  
    ![](attachments/72423834/80723069.png)
3.  Once you click **Next** you are redirected to the Mobile Connect
    Authorization Page, which is one of the network operators page you
    are registered with.  
    ![](attachments/72423834/80723070.png)  
4.  When the authorization page appears, you are asked to confirm your
    identity via your mobile phone.  
    ![](attachments/72423834/80723071.png)  
5.  Once you confirm your identity via the mobile device, you are taken
    to the home page of the travelocity sample application.  

#### Testing the off-net flow

1.  Navigate to the following URL:
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
    and click the link to log in with SAML using the WSO2 Identity
    Server.  
    ![](attachments/72423834/80723064.png) 
2.  You are redirected to the Mobile Connect authentication endpoint web
    application. Here you need to provide the mobile number.  
    ![](attachments/72423834/80723065.png)
3.  Once you provide the mobile number and click on **Mobile Connect
    Log-in**, you are redirected to the Authorization Page as in the
    on-net scenario and there is a popup to confirm your identity. Once
    you confirm your identity via the mobile device, you are taken to
    the home page of the travelocity sample application.  

  

### Configuring the Identity Server as multi-step authenticator

In order to configure the WSO2 Identity Server as multi-step
authenticator, you do not need to do any configuration changes in the
identity provider configuration since you have already configured this
in the above flow. However, in addition to the changes done previously,
you need to do a few changes to the service provider configuration. The
following are the changes you need make in the service provider
configuration to configure the identity server as a multi-step
authenticator.

1.  Configure the first 4 steps in the [Configuring the service
    provider](#ConfiguringMobileConnectasaFederatedAuthenticator-Configuringtheserviceprovider)
    section of this document and expand the **Local & Outbound
    Authentication** **Configuration** section as described in step 5.
    Select the **Advanced Configuration** option.  
    ![](attachments/72423834/80723084.png)
2.  Here you can use the basic authentication and mobile authentication
    as authentication steps (this can vary depending on your scenario
    and these are used for as a demonstration). You can add two steps by
    clicking **Add Authentication Step**.  
    ![](attachments/72423834/80723096.png)  
3.  In step 1, add a basic authenticator to demonstrate this scenario.
    Select this from the drop-down under **Local Authenticators**.
    Click **Add Authenticator** to add the basic authenticator.
    Similarly, for step 2, add Mobile Connect as the federated
    authenticator by selecting it from the dropdown and clicking **Add
    Authenticator**.  
    ![](attachments/72423834/80723120.png)  
    !!! tip
    
        **Tip** : You can add multiple steps and multiple authenticators.
        For example, if you have configured Facebook as an authenticator,
        you can select the basic authenticator as the first step, Mobile
        Connect as the second step, and Facebook as the third step.
    

      

4.  Click **Update**, the service provider is updated with the
    multi-step authentication option.  
