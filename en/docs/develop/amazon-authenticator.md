# Amazon Authenticator

The Amazon authenticator is configured as a federated authenticator in
WSO2 Identity Server to authenticate Amazon users to log in to your
organization’s applications. The diagram that is given below illustrates
the flow of the Amazon federated authenticator.

![Amazon authenticator](../../assets/img/connectors/amazon-authenticator.jpeg)

This page provides instructions on how to configure the Amazon
authenticator and WSO2 Identity Server using a sample app to
demonstrate authentication. You can find more information in the
following sections.

!!! info
    To know about the WSO2 Identity Server versions supported by this
    connector, see the [WSO2
    store](https://store.wso2.com/store/assets/isconnector/details/462ce8e9-8274-496c-a1c3-8aa40168bb1b).

!!! tip "Before you begin"
    To download the authenticator, go to
    [https://store.wso2.com/store/assets/isconnector/Amazon](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22amazon%22).

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
    

2.  Navigate to <http://login.amazon.com/>, click **App Console.**

3.  Click **Sign in to App Console** and sign in.

4.  Click **Register new application** to register a new app. For more
    information, see [Amazon Services
    documentation](http://login.amazon.com/website).

5.  Enter the following information and click **Save**.

    1.  **Name -** AmazonWSO2

    2.  **Description -** An app to test authentication using Amazon
    3.  **Privacy Notice URL -** The privacy policy URL for your
        application. Ex: `<http://wso2.com/privacy-policy>`.

        ![Login with Amazon screen](../../assets/img/connectors/login-with-amazon-screen.png)   
    You have now finished configuring Amazon.

6.  Expand the **Web Settings** section. Copy the **Client ID** and
    **Client Secret,** you will need these values when configuring the
    identity provider.
7.  Click **Edit** and enter the redirect URL as
    <https://localhost:9443/commonauth> in the window that appears and
    save it.  
    ![Amazon Settings](../../assets/img/connectors/amazon-settings.png) 

### Step 2 - Deploy travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario. See [deploying travelocity.com sample
app](../../connectors/deploying-the-sample-app).

### Step 3 - Configure the identity provider (IdP)

Now you must configure the WSO2 Identity Server by [adding a new
identity
provider](../../learn/configuring-an-identity-provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](../../setup/running-the-product).
2.  Log in to the [Management
    Console](../../setup/getting-started-with-the-management-console)
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
    -   **Client Id** : Enter the `client
        ID` of the app that
        you created in Amazon.

    -   **Client Secret** : Enter the `client
        secret` of the app
        that you created in Amazon.
    -   **Callback URL** : Service Provider's URL where the code needs
        to be sent (e.g., https://localhost:9443/commonauth )
    -   Select both checkboxes **Enable** and **Default** to enable the
        Amazon Authenticator and to make it the default authenticator.

        ![Add New Identity Provider screen](../../assets/img/connectors/add-new-identity-provider-as-amazon.png) 

7.  Click **Update**.

You have now added the identity provider.

### Step 4 - Configure the service provider

The next step is to configure the service provider.
1.  Return to the management console.

2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.

3.  As you are using travelocity as the sample, enter travelocity.com in
    the **Service Provider Name** text box and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **SAML2 Web SSO** **Configuration**, and then click **Configure**.

5.  Add the service provider details as follows:  

    1.  **Select Mode** : Manual Configuration  
        For more information on the SAML2 Web Single-Sign-On
        Configuration methods, see [Configuring SAML2 Web
        Single-Sign-On](../../tutorials/configuring-saml2-web-single-sign-on).

    2.  **Issuer** : travelocity.com

    3.  **Assertion Consumer URL** : Enter
        http://localhost:8080/travelocity.com/home.jsp and click **Add**.

    4.  Select the following check-boxes:
        -   **Enable Response Signing**.
        -   **Enable Single Logout**.
        -   **Enable Attribute Profile**.
        -   **Include Attributes in the Response Always**.

        ![Register a new service provider screen](../../assets/img/connectors/register-a-service-provider-screen.png) 

6.  Click **Register** to save the changes. Now you will be sent back to
    the **Service Providers** page.

7.  Go to the **Local and Outbound Authentication Configuration**
    section.

8.  Configure the Local and Outbound Authentication for Amazon.  
    For more information, see [Configuring Local and Outbound
    Authentication for a Service
    Provider](../../learn/configuring-local-and-outbound-authentication-for-a-service-provider).  
    
    1.  Click on the **Federated Authentication** radio button.
    
    2.  Select the identity provider you created from the drop-down list
        under **Federated Authentication**.
    
    3.  Select the following options:
        -   Use tenant domain in local subject identifier.
        -   Use user store domain in local subject identifier.
        ![Outbound authentication configs](../../assets/img/connectors/outbound-authentication-configs.png) 

9.  Click **Update** to save the changes.

You have now added and configured the service provider.

### Step 5 - Configure claims 
Add a new claim mapping for various user attributes related to Amazon.

!!! info
    For more information, see [Adding Claim
    Mapping](../../learn/adding-claim-mapping).

1.  Sign in to the [Management
    Console](../../setup/getting-started-with-the-management-console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add Claim Dialect** to create the Amazon authenticator
    specific claim dialect.
4.  Specify the Dialect URI as http://wso2.org/amazon/claims and click
    **Add** to create the claim dialect.
5.  Map a new external claim to an existing local claim dialect.  
    You need to map at least one claim under this new dialect.
    Therefore, let's map the claim for the Amazon user ID.
    ![Add external claim screen](../../assets/img/connectors/add-external-claim-screen.png) 
    1.  In the **Main** menu, click **Add** under **Claims**.
    2.  Click **Add External Claim** to add a new claim to the Amazon
        claim dialect.
    3.  Select the Dialect URI as `http://wso2.org/amazon/claims`.
    4.  Enter the External Claim URI based on the following claim
        mapping information.
    5.  Select the Mapped Local Claim based on the following claim
        mapping information.  
        - **Claim mapping for ID**
            <table>
            <tr>
            <th>Dialect URI</th>
            <td>http://wso2.org/amazon/claims</td>
            </tr>
            <tr>
            <th>External Claim URI</th>
            <td>http://wso2.org/amazon/claims/user\_id</td>
            </tr>
            <tr>
            <th>Mapped Local Claim</th>
            <td>http://wso2.org/claims/username</td>
            </tr>
            </table>

    6.  Click **Add** to add the new external claim.

6.  Similarly, you can create claims for all the public information of
    the Amazon user by repeating step 5 with the following claim mapping
    information.

    - **Claim mapping for email**
        <table>
        <tr>
        <th>Dialect URI</th>
        <td>http://wso2.org/amazon/claims</td>
        </tr>
        <tr>
        <th>External Claim URI</th>
        <td>http://wso2.org/amazon/claims/email</td>
        </tr>
        <tr>
        <th>Mapped Local Claim</th>
        <td>http://wso2.org/claims/emailaddress</td>
        </tr>
        </table>

    -  **Claim mapping for name**
        <table>
        <tr>
        <th>Dialect URI</th>
        <td>http://wso2.org/amazon/claims</td>
        </tr>
        <tr>
        <th>External Claim URI</th>
        <td>http://wso2.org/amazon/claims/name</td>
        </tr>
        <tr>
        <th>Mapped Local Claim</th>
        <td>http://wso2.org/claims/givenname</td>
        </tr>
        </table>

7.  Click **Update**.

### Step 6 - Configure requested claims for travelocity.com

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Service Providers**.
2.  Click **Edit** to edit the [travelocity.com](http://travelocity.com)
    service provider.
3.  Expand the **Claim Configuration** section.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as indicated in the image below.

    Select the Mandatory Claim checkbox for all the claim URIs that you
    added.

    ![Claim configuration](../../assets/img/connectors/claim-configuration.png)

    You should add the claims you mapped in the Identity Provider claim
    configuration and select the Claim URI.

5.  Select the Subject Claim URI as
    `<http://wso2.org/claims/emailaddress>` to define the authenticated
    user identifier that will return with the authentication response to
    the service provider.

6.  Click **Update** to save your service provider changes.

### Step 7 - Test the sample

1.  To test the sample, go to the following URL:  
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
    .  
    E.g., `<http://localhost:8080/travelocity.com>`.
2.  Click the link to log in with SAML from WSO2 Identity Server. You
    can use either the Rediect Biniding or the Post Binding option.  
    ![travelocity home](../../assets/img/connectors/travelocity-home.png) 
3.  You are redirected to the Amazon login page. Enter your Amazon
    credentials.  
    ![Amazon Sign In](../../assets/img/connectors/amazon-sign-in.png) 
4.  Allow user to authenticate and click **Continue**.  
    ![Amazon authentication](../../assets/img/connectors/amazon-authentication.png) 
5.  You are taken to the home page of the travelocity.com app.  
    ![Travelocity](../../assets/img/connectors/travelocity.png) 