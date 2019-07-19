# Configuring LinkedIn Authenticator

This page provides instructions on how to configure the LinkedIn
authenticator and the WSO2 Identity Server using a sample app to
demonstrate authentication.You can find more information in the
following sections.

This is tested for the LinkedIn API version 1.0. LinkedIn Authenticator
 is supported by Identity Server 5.1.0 upwards.

-   [Step 1 - Configure the LinkedIn
    App](#ConfiguringLinkedInAuthenticator-Step1-ConfiguretheLinkedInApp)
-   [Step 2 - Deploy the travelocity.com sample
    app](#ConfiguringLinkedInAuthenticator-Step2-Deploythetravelocity.comsampleapp)
-   [Step 3 - Configure the identity provider
    (IdP)](#ConfiguringLinkedInAuthenticator-Step3-Configuretheidentityprovider(IdP))
-   [Step 4 - Configure the service
    provider](#ConfiguringLinkedInAuthenticator-Step4-Configuretheserviceprovider)
-   [Step 5 - Configure
    claims](#ConfiguringLinkedInAuthenticator-Step5-Configureclaims)
-   [Step 6 - Configure requested claims for
    travelocity.com](#ConfiguringLinkedInAuthenticator-Step6-Configurerequestedclaimsfortravelocity.com)
-   [Step 7 - Test the
    sample](#ConfiguringLinkedInAuthenticator-Step7-Testthesample)

### Step 1 - Configure the LinkedIn App

1.  Place the authenticator .jar file into the
    `           <IS_HOME>/repository/components/dropins          `
    directory. You can download the .jar file (
    `           org.wso2.carbon.extension.identity.authenticator.linkedin.connector-1.x.x          `
    ) from the [WSO2
    Store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22LinkedIn%22)
    . Next restart the WSO2 IS server.

    !!! note
    
        If you want to upgrade the LinkedIn (.jar) in your existing IS pack,
        please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

2.  Create a new app as described in the [LinkedIn Services
    documentation](https://developer.linkedin.com/docs/oauth2).
    1.  Navigate to the following URL:  
        <https://www.linkedin.com/developer/apps/new>
    2.  Enter the required details.
        -   Enter your company details.
        -   Upload an image that you wish to use at the company logo.
        -   Select the checkbox to agree to the LinkedIn terms and
            conditions.
    3.  Click **Submit**. You will redirect to a page with **Client
        ID** and **Client Secret** as shown in point 5.  
        ![](attachments/50507126/76748920.png){width="600"}
3.  Enter the Authorized Redirect URL in the following format and click
    **Add**. **  
    **
    `                     https://{hostname}:{port}/commonauth                     `
    The default redirect URL in WSO2 Identity Server is -
    <https://localhost:9443/commonauth>
4.  Click **Update**.  
    You have now finished configuring LinkedIn. Copy the **Client ID**
    and **Client Secret** from the resulting page.  
    ![](attachments/50507126/50685689.png){width="550"}

### Step 2 - Deploy the travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario.

To configure this, see [deploying travelocity.com sample
app](_Deploying_the_Sample_App_).

### Step 3 - Configure the identity provider (IdP)

Now you have to configure WSO2 Identity Server by [adding a new identity
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
4.  Enter a suitable name as the **Identity Provider Name** (e.g.,
    LinkedIn).  
    As our resident Identity Provider is WSO2 IS, the Alias will appear
    as follows - https://(host-name):(port)/oauth2/token
5.  **Optionally** , you can add the LinkedIn public certificate by
    uploading it. **  
    ** You can do this by clicking the **Browse** button next to the
    **Identity Provider Public Certificate** field, and uploading the
    file from your local directory. Some browsers let us download the
    public certificate. If not you can skip this step.

    !!! note
    
        In cryptography, a **public** **key** **certificate** , also known
        as a **digital** **certificate** or **identity** **certificate** ,
        is an electronic document used to prove the ownership of a
        **public** **key**.
    

6.  Navigate to the **LinkedIn Authenticator** **Configurations** under
    ****Federated Authenticators.  
    ****

    -   [**IS 5.3.0**](#38b513b8fa1d430fbaf06fbd5d393554)
    -   [**IS 5.1.0/IS 5.2.0**](#8fe59de24be84e3abc17d57cbe85c877)

    ![](attachments/50507126/76748968.png){width="800"}

    ![](attachments/50507126/57737954.png){width="800"}

7.  Enter the IdP related details as follows:

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    <th>Sample Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable</td>
    <td>Selecting this option enables LinkedIn to be used as an authenticator for users provisioned to the Identity Server.</td>
    <td>Selected</td>
    </tr>
    <tr class="even">
    <td>Default</td>
    <td>Selecting the Default checkbox signifies that LinkedIn is the main/default form of authentication. This removes the selection made for any other Default checkboxes for other authenticators.</td>
    <td>Selected</td>
    </tr>
    <tr class="odd">
    <td>Client Id</td>
    <td>This is a unique public identifier for apps which is usually given as a 32-character hex string. Enter the <a href="#ConfiguringLinkedInAuthenticator-clientID">client ID</a> of the app that you created in LinkedIn.</td>
    <td>81b05d91toz66e</td>
    </tr>
    <tr class="even">
    <td>Client Secret</td>
    <td>This is a secret known only to the application and the authorization server. Enter the <a href="#ConfiguringLinkedInAuthenticator-clientID">client ID</a> of the app that you created in LinkedIn.</td>
    <td>otYR21HMW1PchfwZ</td>
    </tr>
    <tr class="odd">
    <td>Callback URL</td>
    <td>This is the URL to which the browser should be redirected after the authentication is successful. It should have this format:<br />
    <code>               https://(host-name):(port)/commonauth              </code></td>
    <td>https://localhost:9443/commonauth</td>
    </tr>
    </tbody>
    </table>

8.  Click **Register**.

You have now added the identity provider.

### Step 4 - Configure the service provider

The next step is to configure the service provider based on the WSO2
Identity Server version that you are working on.

-   [Configuring a service provider with IS 5.3.0
    upwards](#ConfiguringLinkedInAuthenticator-ConfiguringaserviceproviderwithIS5.3.0upwards)
-   [Configuring a service provider with IS 5.1.0 or IS
    5.2.0](#ConfiguringLinkedInAuthenticator-ConfiguringaserviceproviderwithIS5.1.0orIS5.2.0)

#### Configuring a service provider with IS 5.3.0 upwards

Return to the management console.

In the **Service Providers** section under the **Main** tab, click
**Add**.

As you are using travelocity as the sample, enter
[travelocity.com](http://travelocity.com) in the **Service Provider
Name** text box and click **Register**.

In the **Inbound Authentication Configuration** section, click **SAML2
Web SSO** **Configuration** , and then click **Configure**.

Add the service provider details as follows:  

**Select Mode** : Manual Configuration  
For more information on the SAML2 Web Single-Sign-On Configuration
methods, see [Configuring SAML2 Web
Single-Sign-On](https://docs.wso2.com/display/IS530/Configuring+SAML2+Web+Single-Sign-On)
in the WSO2 IS 5.3.0 guide.

**Issuer** : [travelocity.com](http://travelocity.com)

**Assertion Consumer URL** : Enter
<http://localhost:8080/travelocity.com/home.jsp> and click **Add**.

Select the following check-boxes:

-   **Enable Response Signing**.
-   **Enable Single Logout**.
-   **Enable Attribute Profile**.
-   **Include Attributes in the Response Always**.

![](attachments/50507126/76748957.png){width="800"}

Click **Register** to save the changes. Now you will be sent back to the
**Service Providers** page.

Go to the **Local and Outbound Authentication Configuration** section.

Configure the Local and Outbound Authentication for LinkedIn.  
For more information, see [Configuring Local and Outbound Authentication
for a Service
Provider](https://docs.wso2.com/display/IS530/Configuring+Local+and+Outbound+Authentication+for+a+Service+Provider)
in the WSO2 IS 5.3.0 guide.  

1.  Click on the **Federated Authentication** radio button.
2.  Select the identity provider you created from the drop-down list
    under **Federated Authentication**.
3.  Select the following options:
    -   Use tenant domain in local subject identifier.

    -   Use user store domain in local subject identifier.

Click **Update** to save the changes.  
![](attachments/50507126/76748972.png){width="800"}

#### Configuring a service provider with IS 5.1.0 or IS 5.2.0

1.  Return to the management console.
2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.
3.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register**.
4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.  
    ![](https://lh6.googleusercontent.com/qsYmfJRbhzqeKB_WHare-nLYmSL3DItCUqx3627JsK8aF0AibTUNO-s4DyG5Zx_bp0wfH_10Ap6dJ2ngKNYBtlgOCHZBSoKqhNbVac0DEWZ49C4Gpej3mzFoQpP2Z6XFP6iYkUCf){width="500"}
5.  Now set the configuration as follows:  
    -   **Issuer** : travelocity.com
    -   **Assertion Consumer URL** :
        http://localhost:8080/travelocity.com/home.jsp
6.  Select the following check-boxes:
    -   **Enable Response Signing**.
    -   **Enable Single Logout**.
    -   **Enable Attribute Profile**.
    -   **Include Attributes in the Response Always**.
7.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.
8.  Go to the **Local and Outbound Authentication Configuration**
    section.
9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.  
    ![](attachments/50507126/50685694.png){width="500"}
10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

### Step 5 - Configure claims

Add a new claim mapping for various user attributes related to LinkedIn
based on the WSO2 Identity Server version that you are working on.

-   [Configuring claims with IS 5.3.0
    upwards](#ConfiguringLinkedInAuthenticator-ConfiguringclaimswithIS5.3.0upwards)
-   [Configuring claims with IS 5.1.0 or IS
    5.2.0](#ConfiguringLinkedInAuthenticator-ConfiguringclaimswithIS5.1.0orIS5.2.0)

#### Configuring claims with IS 5.3.0 upwards

For more information, see [Adding Claim
Mapping](https://docs.wso2.com/display/IS530/Adding+Claim+Mapping) in
WSO2 IS guide.

1.  Sign in to the [Management
    Console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add Claim Dialect** to create the LinkedIn authenticator
    specific claim dialect.
4.  Specify the Dialect URI as follows:
    `          http://wso2.org/linkedin/claims         `
5.  Click **Add** to create the claim dialect.  
    ![](attachments/50507126/76748975.png){width="400"}
6.  Map a new external claim to an existing local claim dialect.  
    You need to map at least one claim under this new dialect.
    Therefore, let's map the claim for last name.
    1.  In the **Main** menu, click **Add** under **Claims**.
    2.  Click **Add External Claim** to add a new claim to the LinkedIn
        claim dialect.
    3.  Select the Dialect URI as - http://wso2.org/linkedin/claims
    4.  Enter the External Claim URI based on the following claim
        mapping information.
    5.  Select the Mapped Local Claim based on the following claim
        mapping information.  
        Claim mapping for last name **  
        **

        |                    |                                          |
        |--------------------|------------------------------------------|
        | Dialect URI        | http://wso2.org/linkedin/claims          |
        | External Claim URI | http://wso2.org/linkedin/claims/lastName |
        | Mapped Local Claim | http://wso2.org/claims/lastname          |

    6.  Click **Add** to add the new external claim.  
        ![](attachments/50507126/76748979.png){width="500"}

7.  Similarly, you can create claims for all the public information of
    the LinkedIn user by repeating step 6 with the following claim
    mapping information.

    -   Claim mapping for first name

        |                    |                                           |
        |--------------------|-------------------------------------------|
        | Dialect URI        | http://wso2.org/linkedin/claims           |
        | External Claim URI | http://wso2.org/linkedin/claims/firstName |
        | Mapped Local Claim | http://wso2.org/claims/givenname          |

    -   Claim mapping for email

        |                    |                                              |
        |--------------------|----------------------------------------------|
        | Dialect URI        | http://wso2.org/linkedin/claims              |
        | External Claim URI | http://wso2.org/linkedin/claims/emailAddress |
        | Mapped Local Claim | http://wso2.org/claims/emailaddress          |

    -   Claim mapping for industry

        |                    |                                          |
        |--------------------|------------------------------------------|
        | Dialect URI        | http://wso2.org/linkedin/claims          |
        | External Claim URI | http://wso2.org/linkedin/claims/industry |
        | Mapped Local Claim | http://wso2.org/claims/organization      |

    -   Claim mapping for headline

        |                    |                                          |
        |--------------------|------------------------------------------|
        | Dialect URI        | http://wso2.org/linkedin/claims          |
        | External Claim URI | http://wso2.org/linkedin/claims/headline |
        | Mapped Local Claim | http://wso2.org/claims/title             |

8.  Click **Update**.

#### Configuring claims with IS 5.1.0 or IS 5.2.0

1.  Sign into the [Management
    Console](https://docs.wso2.com/display/IS530/Getting+Started+with+the+Management+Console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add New Claim Dialect** to create the Linkedin authenticator
    specific claim dialect.

    Use the Dialect Uri as follows:
    `           http://wso2.org/linkedin/claims          `  
    ![](attachments/50507126/76748975.png){width="400"}

4.  Click [Add New
    Claim](https://docs.wso2.com/display/IS530/Adding+Claim+Mapping).
5.  Select the **Dialect** from the dropdown provided and enter the
    required information. You must add the following claims under the
    dialect <http://wso2.org/linkedin/claims>

    |                      |                                          |
    |:---------------------|:-----------------------------------------|
    | Display Name         | LastName                                 |
    | Description          | Claim to the last name                   |
    | Mapped Attribute     | sn                                       |
    | Claim URL            | http://wso2.org/linkedin/claims/lastName |
    | Supported by Default | selected                                 |

    |                      |                                           |
    |:---------------------|:------------------------------------------|
    | Display Name         | First Name                                |
    | Description          | Claim to the first name                   |
    | Mapped Attribute     | givenName                                 |
    | Claim URL            | http://wso2.org/linkedin/claims/firstName |
    | Supported by Default | selected                                  |

    |                      |                                              |
    |:---------------------|:---------------------------------------------|
    | Display Name         | Email Address                                |
    | Description          | Claim to email address                       |
    | Mapped Attribute     | mail                                         |
    | Claim URL            | http://wso2.org/linkedin/claims/emailAddress |
    | Supported by Default | selected                                     |

    |                      |                                          |
    |:---------------------|:-----------------------------------------|
    | Display Name         | Industry                                 |
    | Description          | Claim to industry                        |
    | Mapped Attribute     | organizationName                         |
    | Claim URL            | http://wso2.org/linkedin/claims/industry |
    | Supported by Default | selected                                 |

    |                      |                                          |
    |:---------------------|:-----------------------------------------|
    | Display Name         | Headline                                 |
    | Description          | Claim to the headline of the user        |
    | Mapped Attribute     | title                                    |
    | Claim URL            | http://wso2.org/linkedin/claims/headline |
    | Supported by Default | selected                                 |

    Likewise, you can create the claims for all the public information
    of the LinkedIn user.

    ![](attachments/50507126/57749001.png){height="250"}

### Step 6 - Configure requested claims for travelocity.com

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Service Providers**.
2.  Click **Edit** to edit the travelocity.com service provider.
3.  Go to **Claim Configuration**.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as follows.

    -   [**IS 5.3.0**](#b3c29b8e4ab64260b995c28bfd899aa5)
    -   [**IS 5.1.0/IS 5.2.0**](#5847f6ea9d364048b1c32d5bd5a147d0)

    Select the Mandatory Claim checkbox for all the claim URIs that you
    added.

    ![](attachments/50507126/76748980.png){width="800"}

    You should add the claims you mapped in the Identity Provider claim
    configuration and select the Claim URI.

    ![](attachments/50507126/57749003.png){width="700"}

5.  Select the Subject Claim URI as
    <http://wso2.org/claims/emailaddress> to define the authenticated
    user identifier that will return with the authentication response to
    the service provider.

6.  Click **Update** to save your service provider changes.

### Step 7 - Test the sample

1.  To test the sample, go to the following URL:  
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/                     travelocity.com/index.jsp                   `  
    E.g., <http://localhost:8080/travelocity.com>
2.  Click the link to log in with SAML from WSO2 Identity Server. You
    can use either the Rediect Biniding or the Post Binding option.  
    ![](attachments/50507126/76748991.png){width="600"}
3.  You are redirected to the LinkedIn sign in page. Enter your LinkedIn
    credentials.  
    ![](attachments/50507126/57749004.png){width="300"}
4.  Authenticate the user by clicking **Allow access**.  
    You are taken to the home page of the travelocity.com app  
    ![](attachments/50507126/57749005.png){width="700"}

30

850

516

517

963

1524

1778

1782
