# Configuring LinkedIn Authenticator

The LinkedIn authenticator is configured as a federated authenticator in
WSO2 Identity Server to authenticate LinkedIn users to log in to your
organization’s applications. LinkedIn is one of the popular social media
networks which helps to build up a professional relationship with the
people all around the world. The diagram below illustrates the flow of
the LinkedIn federated authenticator.

![](../../assets/img/50507096/76746227.png)


This page provides instructions on how to configure the LinkedIn
authenticator and the WSO2 Identity Server using a sample app to
demonstrate authentication.You can find more information in the
following sections.

!!! info 
    This is tested for the LinkedIn API version 1.0. LinkedIn Authenticator is supported by Identity Server 5.1.0 upwards.

!!! info
    To download the authenticator, go to
    [https://store.wso2.com/store/assets/isconnector/LinkedIn](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22LinkedIn%22)


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
        instructions.](../../develop/upgrading-an-authenticator)
    

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
        ![](../../assets/img/50507126/76748920.png) 
3.  Enter the Authorized Redirect URL in the following format and click
    **Add**. 
    `                     https://{hostname}:{port}/commonauth                     `
    The default redirect URL in WSO2 Identity Server is -
    <https://localhost:9443/commonauth>
4.  Click **Update**.  
    You have now finished configuring LinkedIn. Copy the **Client ID**
    and **Client Secret** from the resulting page.  
    ![](../../assets/img/50507126/50685689.png) 

### Step 2 - Deploy the travelocity.com sample app

The next step is to deploy the travelocity.com sample app in order to
use it in this scenario.

To configure this, see [deploying travelocity.com sample
app](../../develop/deploying-the-sample-app).

### Step 3 - Configure the identity provider (IdP)

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](../../learn/adding-and-configuring-an-identity-provider).

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](../../setup/running-the-product).
2.  Log in to the [Management
    Console](../../setup/getting-started-with-the-management-console)
    as an administrator.
3.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
4.  Enter a suitable name as the **Identity Provider Name** (e.g.,
    LinkedIn).  
    As our resident Identity Provider is WSO2 IS, the Alias will appear
    as follows - https://(host-name):(port)/oauth2/token
5.  **Optionally**, you can add the LinkedIn public certificate by
    uploading it. 
    ** You can do this by clicking the **Browse** button next to the
    **Identity Provider Public Certificate** field, and uploading the
    file from your local directory. Some browsers let us download the
    public certificate. If not you can skip this step.

    !!! note
        In cryptography, a **public** **key** **certificate**, also known
        as a **digital** **certificate** or **identity** **certificate**,
        is an electronic document used to prove the ownership of a
        **public** **key**.

6.  Navigate to the **LinkedIn Authenticator** **Configurations** under
    **Federated Authenticators**.  
    
    -   **IS 5.3.0**
        ![](../../assets/img/50507126/76748968.png) 

    -   **IS 5.1.0/IS 5.2.0**
        ![](../../assets/img/50507126/57737954.png) 
    
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

#### Configuring a service provider with IS 5.3.0 upwards

1.  Return to the management console.

2.  In the **Service Providers** section under the **Main** tab, click **Add**.

3.  As you are using travelocity as the sample, enter [travelocity.com](http://travelocity.com) in the **Service Provider Name** text box and       click **Register**.

4.  In the **Inbound Authentication Configuration** section, click **SAML2 Web SSO** **Configuration**, and then click **Configure**.

5.  Add the service provider details as follows:  

    1.  **Select Mode** : Manual Configuration  
        For more information on the SAML2 Web Single-Sign-On Configuration
        methods, see [Configuring SAML2 Web
        Single-Sign-On](https://docs.wso2.com/display/IS530/Configuring+SAML2+Web+Single-Sign-On)
        in the WSO2 IS 5.3.0 guide.

    2.  **Issuer** : [travelocity.com](http://travelocity.com)

    3.  **Assertion Consumer URL** : Enter <http://localhost:8080/travelocity.com/home.jsp> and click **Add**.

    4.  Select the following check-boxes:
        -   **Enable Response Signing**.
        -   **Enable Single Logout**.
        -   **Enable Attribute Profile**.
        -   **Include Attributes in the Response Always**.

        ![](../../assets/img/50507126/76748957.png) 

6.  Click **Register** to save the changes. Now you will be sent back to the **Service Providers** page.

7.  Go to the **Local and Outbound Authentication Configuration** section.

8.  Configure the Local and Outbound Authentication for LinkedIn. For more information, see [Configuring Local and Outbound Authentication
for a Service Provider](https://docs.wso2.com/display/IS530/Configuring+Local+and+Outbound+Authentication+for+a+Service+Provider)
in the WSO2 IS 5.3.0 guide.  
    1.  Click on the **Federated Authentication** radio button.
    2.  Select the identity provider you created from the drop-down list
        under **Federated Authentication**.
    3.  Select the following options:
        -   Use tenant domain in local subject identifier.
        -   Use user store domain in local subject identifier.

9.  Click **Update** to save the changes.  
    ![](../../assets/img/50507126/76748972.png) 

#### Configuring a service provider with IS 5.1.0 or IS 5.2.0

1.  Return to the management console.
2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.
3.  Since you are using travelocity as the sample, enter travelocity.com
    in the **Service Provider Name** text box and click **Register**.
4.  In the **Inbound Authentication Configuration** section, click
    **Configure** under the **SAML2 Web SSO Configuration** section.  
5.  Now set the configuration as follows:  
    -   **Issuer** : travelocity.com
    -   **Assertion Consumer URL** : http://localhost:8080/travelocity.com/home.jsp
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
    ![](../../assets/img/50507126/50685694.png) 
10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

### Step 5 - Configure claims

Add a new claim mapping for various user attributes related to LinkedIn
based on the WSO2 Identity Server version that you are working on.

#### Configuring claims with IS 5.3.0 upwards

For more information, see [Adding Claim Mapping](../../learn/adding-claim-mapping) in
WSO2 IS guide.

1.  Sign in to the [Management
    Console](../../setup/getting-started-with-the-management-console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add Claim Dialect** to create the LinkedIn authenticator
    specific claim dialect.
4.  Specify the Dialect URI as follows:
    `          http://wso2.org/linkedin/claims         `
5.  Click **Add** to create the claim dialect.  
    ![](../../assets/img/50507126/76748975.png) 
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
        Claim mapping for last name 

        |                    |                                          |
        |--------------------|------------------------------------------|
        | Dialect URI        | http://wso2.org/linkedin/claims          |
        | External Claim URI | http://wso2.org/linkedin/claims/lastName |
        | Mapped Local Claim | http://wso2.org/claims/lastname          |

    6.  Click **Add** to add the new external claim.  
        ![](../../assets/img/50507126/76748979.png) 

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
    Console](../../setup/getting-started-with-the-management-console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add New Claim Dialect** to create the Linkedin authenticator
    specific claim dialect.

    Use the Dialect Uri as follows:
    `           http://wso2.org/linkedin/claims          `  
    ![](../../assets/img/50507126/76748975.png) 

4.  Click [Add New
    Claim](../../learn/adding-claim-mapping).
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

    ![](../../assets/img/50507126/57749001.png)

### Step 6 - Configure requested claims for travelocity.com

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Service Providers**.
2.  Click **Edit** to edit the travelocity.com service provider.
3.  Go to **Claim Configuration**.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as follows.

    Select the Mandatory Claim checkbox for all the claim URIs that you
    added.

    -    **IS 5.3.0**
        ![](../../assets/img/50507126/76748980.png) 

    -    **IS 5.1.0/IS 5.2.0**
        ![](../../assets/img/50507126/57749003.png) 

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
    ![](../../assets/img/50507126/76748991.png) 
3.  You are redirected to the LinkedIn sign in page. Enter your LinkedIn
    credentials.  
    ![](../../assets/img/50507126/57749004.png) 
4.  Authenticate the user by clicking **Allow access**.  
    You are taken to the home page of the travelocity.com app  
    ![](../../assets/img/50507126/57749005.png) 