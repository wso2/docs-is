# Configuring Amazon Authenticator

This page provides instructions on how to configure the Amazon
authenticator and the WSO2 Identity Server using a sample app to
demonstrate authentication. You can find more information in the
following sections.

To know more about the WSO2 Identity Server versions supported by this
connector, see the [WSO2
store](https://store.wso2.com/store/assets/isconnector/details/462ce8e9-8274-496c-a1c3-8aa40168bb1b)
.

-   [Step 1 - Configure the Amazon
    App](#ConfiguringAmazonAuthenticator-Step1-ConfiguretheAmazonApp)
-   [Step 2 - Deploy travelocity.com sample
    app](#ConfiguringAmazonAuthenticator-Step2-Deploytravelocity.comsampleapp)
-   [Step 3 - Configure the identity provider
    (IdP)](#ConfiguringAmazonAuthenticator-Step3-Configuretheidentityprovider(IdP))
-   [Step 4 - Configure the service
    provider](#ConfiguringAmazonAuthenticator-Step4-Configuretheserviceprovider)
-   [Step 5 - Configure
    claims](#ConfiguringAmazonAuthenticator-Step5-Configureclaims)
-   [Step 6 - Configure requested claims for
    travelocity.com](#ConfiguringAmazonAuthenticator-Step6-Configurerequestedclaimsfortravelocity.com)
-   [Step 7 - Test the
    sample](#ConfiguringAmazonAuthenticator-Step7-Testthesample)

### Step 1 - Configure the Amazon App

1.  Place the authenticator .jar file into the
    `           <IS_HOME>/repository/components/dropins          `
    directory. You can download the .jar (
    `           org.wso2.carbon.extension.identity.authenticator.amazon.connector-1.x.x.jar          `
    ) file from [wso2
    store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22amazon%22)
    .

    !!! note
    
        If you want to upgrade the Amazon Authenticator (.jar) in your
        existing IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

2.  Navigate to <http://login.amazon.com/> , click **App Console.**

3.  Click **Sign in to App Console** and sign in.

4.  Click **Register new application** to register a new app. For more
    information, see [Amazon Services
    documentation](http://login.amazon.com/website).

5.  Enter the following information and click **Save**.

    1.  **Name -** AmazonWSO2

    2.  **Description -** An app to test authentication using Amazon
    3.  **Privacy Notice URL -** The privacy policy URL for your
        application. Ex: <http://wso2.com/privacy-policy>

    ![](attachments/49092381/76748460.png){width="800"}  
    You have now finished configuring Amazon.

6.  Expand the **Web Settings** section. Copy the **Client ID** and
    **Client Secret,** you will need these values when configuring the
    identity provider.
7.  Click **Edit** and enter the redirect URL as
    <https://localhost:9443/commonauth> in the window that appears and
    save it.  
    ![](attachments/49092381/76748466.png){width="616"}

### Step 2 - Deploy travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario. See [deploying travelocity.com sample
app](_Deploying_the_Sample_App_).

### Step 3 - Configure the identity provider (IdP)

Now you must configure the WSO2 Identity Server by [adding a new
identity
provider](https://docs.wso2.com/display/IS530/Configuring+an+Identity+Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](https://docs.wso2.com/display/IS530/Running+the+Product).
2.  Log in to the [Management
    Console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    as an administrator.
3.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
4.  Give a suitable name for **Identity Provider Name** (e.g., Amazon)
    and click **Register**.

5.  Navigate to the **Amazon Configurations** under ****Federated
    Authenticators****
    -   In IS 5.1.0 or 5.2.0, go to **AmazonAuthenticator
        Configuration** under **Federated Authenticators**.
    -   In IS 5.3.0, go to **Amazon Configuration** under **Federated
        Authenticators**.

6.  Enter the IdP related details.  
    -   **Client Id** : Enter the [client
        ID](#ConfiguringAmazonAuthenticator-clientID) of the app that
        you created in Amazon.

    -   **Client Secret** : Enter the [client
        secret](#ConfiguringAmazonAuthenticator-clientID) of the app
        that you created in Amazon.
    -   **Callback URL** : Service Provider's URL where the code needs
        to be sent (e.g., https://localhost:9443/commonauth )
    -   Select both checkboxes **Enable** and **Default** to enable the
        Amazon Authenticator and to make it the default authenticator.

        -   [**IS 5.3.0**](#7955f4c7cdf8449db5dd8f0ccc6bfce2)
        -   [**IS 5.1.0/IS 5.2.0**](#2a00a4664741430ca8cf6a84fd08e8fc)

        ![](attachments/49092381/76748472.png){width="800"}

        ![](attachments/49092381/49226486.png){width="700" height="842"}

7.  Click **Update**.

You have now added the identity provider.

### Step 4 - Configure the service provider

The next step is to configure the service provider based on the WSO2
Identity Server version that you are working on.

-   [Configuring a service provider with IS 5.3.0
    upwards](#ConfiguringAmazonAuthenticator-ConfiguringaserviceproviderwithIS5.3.0upwards)
-   [Configuring a service provider with IS 5.1.0 or IS
    5.2.0](#ConfiguringAmazonAuthenticator-ConfiguringaserviceproviderwithIS5.1.0orIS5.2.0)

#### Configuring a service provider with IS 5.3.0 upwards

1.  Return to the management console.
2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.
3.  As you are using travelocity as the sample, enter travelocity.com in
    the **Service Provider Name** text box and click **Register**.
4.  In the **Inbound Authentication Configuration** section, click
    **SAML2 Web SSO** **Configuration** , and then click **Configure**.
5.  Add the service provider details as follows:  
    1.  **Select Mode** : Manual Configuration  
        For more information on the SAML2 Web Single-Sign-On
        Configuration methods, see [Configuring SAML2 Web
        Single-Sign-On](https://docs.wso2.com/display/IS530/Configuring+SAML2+Web+Single-Sign-On)
        in the WSO2 IS 5.3.0 guide.
    2.  **Issuer** : travelocity.com
    3.  **Assertion Consumer URL** : Enter
        http://localhost:8080/travelocity.com/home.jsp and click **Add**
        .
    4.  Select the following check-boxes:
        -   **Enable Response Signing**.
        -   **Enable Single Logout**.
        -   **Enable Attribute Profile**.
        -   **Include Attributes in the Response Always**.

        ![](attachments/49092381/76748599.png){width="800"}
6.  Click **Register** to save the changes. Now you will be sent back to
    the **Service Providers** page.
7.  Go to the **Local and Outbound Authentication Configuration**
    section.
8.  Configure the Local and Outbound Authentication for Amazon.  
    For more information, see [Configuring Local and Outbound
    Authentication for a Service
    Provider](https://docs.wso2.com/display/IS530/Configuring+Local+and+Outbound+Authentication+for+a+Service+Provider)
    in the WSO2 IS 5.3.0 guide.  
    1.  Click on the **Federated Authentication** radio button.
    2.  Select the identity provider you created from the drop-down list
        under **Federated Authentication**.
    3.  Select the following options:
        -   Use tenant domain in local subject identifier.

        -   Use user store domain in local subject identifier.

    ![](attachments/49092381/76748602.png){width="800"}
9.  Click **Update** to save the changes.

#### Configuring a service provider with IS 5.1.0 or IS 5.2.0

1.  Return to the management console.
2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.
3.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register**.
4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.  
    ![](https://lh6.googleusercontent.com/qsYmfJRbhzqeKB_WHare-nLYmSL3DItCUqx3627JsK8aF0AibTUNO-s4DyG5Zx_bp0wfH_10Ap6dJ2ngKNYBtlgOCHZBSoKqhNbVac0DEWZ49C4Gpej3mzFoQpP2Z6XFP6iYkUCf){width="700"}
5.  Now set the configuration as follows:  
    1.  **Issuer** : travelocity.com
    2.  **Assertion Consumer URL** :
        http://localhost:8080/travelocity.com/home.jsp
6.  Select the following check-boxes:
    1.  **Enable Response Signing**.
    2.  **Enable Single Logout**.
    3.  **Enable Attribute Profile**.
    4.  **Include Attributes in the Response Always**.
7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.
8.  Go to the **Local and Outbound Authentication Configuration**
    section.
9.  Select the identity provider you created from the drop-down list
    under **Federated Authentication**.  
    ![](attachments/49091441/49224551.png){width="500"}
10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Step 5 - Configure claims

Add a new claim mapping for various user attributes related to Amazon
based on the WSO2 Identity Server version that you are working on.

-   [Configuring claims with IS 5.3.0
    upwards](#ConfiguringAmazonAuthenticator-ConfiguringclaimswithIS5.3.0upwards)
-   [Configuring claims with IS 5.1.0 or IS
    5.2.0](#ConfiguringAmazonAuthenticator-ConfiguringclaimswithIS5.1.0orIS5.2.0)

#### Configuring claims with IS 5.3.0 upwards

For more information, see [Adding Claim
Mapping](https://docs.wso2.com/display/IS530/Adding+Claim+Mapping) in
WSO2 IS guide.

1.  Sign in to the [Management
    Console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add Claim Dialect** to create the Amazon authenticator
    specific claim dialect.
4.  Specify the Dialect URI as http://wso2.org/amazon/claims and click
    **Add** to create the claim dialect.
5.  Map a new external claim to an existing local claim dialect.  
    You need to map at least one claim under this new dialect.
    Therefore, let's map the claim for the Amazon user ID.
    ![](attachments/49092381/76748608.png){width="704"}
    1.  In the **Main** menu, click **Add** under **Claims**.
    2.  Click **Add External Claim** to add a new claim to the Amazon
        claim dialect.
    3.  Select the Dialect URI as - http://wso2.org/amazon/claims
    4.  Enter the External Claim URI based on the following claim
        mapping information.
    5.  Select the Mapped Local Claim based on the following claim
        mapping information.  
        Claim mapping for ID **  
        **

        |                    |                                        |
        |--------------------|----------------------------------------|
        | Dialect URI        | http://wso2.org/amazon/claims          |
        | External Claim URI | http://wso2.org/amazon/claims/user\_id |
        | Mapped Local Claim | http://wso2.org/claims/username        |

    6.  Click **Add** to add the new external claim.

6.  Similarly, you can create claims for all the public information of
    the Amazon user by repeating step 5 with the following claim mapping
    information.

    -   Claim mapping for email

        |                    |                                     |
        |--------------------|-------------------------------------|
        | Dialect URI        | http://wso2.org/amazon/claims       |
        | External Claim URI | http://wso2.org/amazon/claims/email |
        | Mapped Local Claim | http://wso2.org/claims/emailaddress |

    -   Claim mapping for name

        |                    |                                    |
        |--------------------|------------------------------------|
        | Dialect URI        | http://wso2.org/amazon/claims      |
        | External Claim URI | http://wso2.org/amazon/claims/name |
        | Mapped Local Claim | http://wso2.org/claims/givenname   |

7.  Click **Update**.

#### Configuring claims with IS 5.1.0 or IS 5.2.0

1.  Sign into the [Management
    Console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add New Claim Dialect** to create the Amazon authenticator
    specific claim dialect.
    ![](attachments/49092381/57749018.png){height="250"}

    -   Use the Dialect Uri as -
        `            http://wso2.org/amazon/claims           `
    -   Enter the values for mandatory fields. It will create the claim
        for the given user field under the Amazon claim dialect.

        |                      |                                        |
        |----------------------|----------------------------------------|
        | Display Name         | User ID                                |
        | Description          | Claim to user ID                       |
        | Mapped Attribute     | uid                                    |
        | Claim URL            | http://wso2.org/amazon/claims/user\_id |
        | Supported by Default | selected                               |

4.  Click Add New Claim.
5.  Select the **Dialect** from the dropdown provided and enter the
    required information.
6.  Add the following claims under the dialect
    **http://wso2.org/amazon/claims**.

    |                      |                                     |
    |:---------------------|:------------------------------------|
    | Display Name         | Email Address                       |
    | Description          | Claim to Email Address              |
    | Mapped Attribute     | mail                                |
    | Claim URL            | http://wso2.org/amazon/claims/email |
    | Supported by Default | selected                            |

    |                      |                                    |
    |:---------------------|:-----------------------------------|
    | Display Name         | Name                               |
    | Description          | Claim to Name                      |
    | Mapped Attribute     | givenName                          |
    | Claim URL            | http://wso2.org/amazon/claims/name |
    | Supported by Default | selected                           |

Similarly, you can create the claims for all the public information of
the Amazon user.

![](attachments/49092381/57749022.png){height="250"}

### Step 6 - Configure requested claims for travelocity.com

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Service Providers**.
2.  Click **Edit** to edit the [travelocity.com](http://travelocity.com)
    service provider.
3.  Expand the **Claim Configuration** section.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as indicated in the image below.

    -   [**IS 5.3.0**](#c60e0335cf484ab987fa2583cab2df11)
    -   [**IS 5.1.0/IS 5.2.0**](#6872e6d4197944208101b224d4ff8fe1)

    Select the Mandatory Claim checkbox for all the claim URIs that you
    added.

    ![](attachments/49092381/76748622.png){height="250"}

    You should add the claims you mapped in the Identity Provider claim
    configuration and select the Claim URI.

    ![](attachments/49092381/57749030.png){height="250"}

5.  Select the Subject Claim URI as
    <http://wso2.org/claims/emailaddress> to define the authenticated
    user identifier that will return with the authentication response to
    the service provider.

6.  Click **Update** to save your service provider changes.

### Step 7 - Test the sample

1.  To test the sample, go to the following URL:  
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
    .  
    E.g., <http://localhost:8080/travelocity.com>
2.  Click the link to log in with SAML from WSO2 Identity Server. You
    can use either the Rediect Biniding or the Post Binding option.  
    ![](attachments/49092381/76748627.png){width="600"}
3.  You are redirected to the Amazon login page. Enter your Amazon
    credentials.  
    ![](attachments/49092381/57749032.png){width="308"}
4.  Allow user to authenticate and click **Continue**.  
    ![](attachments/49092381/57749033.png){width="571"}
5.  You are taken to the home page of the travelocity.com app.  
    ![](attachments/49092381/57749034.png){width="700"}

1254

510

960

1296

434
