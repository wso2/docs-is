# Configuring Foursquare Authenticator

This page provides instructions on how to configure Foursquare
authenticator and Identity Server for using a sample app. You can find
more information in following sections.

This is tested with the Foursquare API version 2. Foursquare
Authenticator is supported by Identity Server 5.1.0 upwards.

-   [Configuring the Foursquare
    App](#ConfiguringFoursquareAuthenticator-ConfiguringtheFoursquareApp)
-   [Deploying travelocity.com sample
    app](#ConfiguringFoursquareAuthenticator-Deployingtravelocity.comsampleappDeployingtravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringFoursquareAuthenticator-ConfiguringtheidentityproviderConfiguringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringFoursquareAuthenticator-ConfiguringtheserviceproviderConfiguringtheserviceprovider)
-   [Configuring
    claims](#ConfiguringFoursquareAuthenticator-Configuringclaims)
-   [Configuring requested claims for
    travelocity.com](#ConfiguringFoursquareAuthenticator-Configuringrequestedclaimsfortravelocity.com)
-   [Testing the
    sample](#ConfiguringFoursquareAuthenticator-TestingthesampleTestingthesample)

### Configuring the Foursquare App

1.  Place the authenticator .jar file (
    `           org.wso2.carbon.extension.identity.authenticator.foursquare.connector-1.x.x.jar          `
    ) into the
    `           <IS_HOME>/repository/components/dropins          `
    directory. You can download the .jar file from the [WSO2
    Store](https://store.wso2.com/store/assets/isconnector/list?q=%22_default%22%3A%22foursquare%22)
    .

    !!! note
    
        If you want to upgrade the Foursquare Authenticator in your existing
        IS pack, please refer [upgrade
        instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

2.  Go to <https://foursquare.com/> and login with your Foursquare
    account.

    !!! tip
    
        If you do not have a Foursquare account, create an account by
        clicking **Sign Up** or sign in with your Facebook credentials.
    

3.  Go to <https://developer.foursquare.com/> and click **Log-in**. You
    can create a new app in the **My Apps** section by clicking **Create
    a New App**.  
    ![](attachments/49088044/76747590.png) 

      

4.  Enter the following in the window that appears:

    -   **App name** - TravelocityApp

    -   **Application Url** - http://localhost:8080/travelocity.com

    -   **Redirect URL** as  https://localhost:9443/commonauth  
        ![](attachments/49088044/76744023.png) 

5.  You can select **Create App without Verifying** link at the end in
    order to try out the authenticator.  
    ![](attachments/49088044/76744027.png) 

6.  Save your changes.  
    This takes you to the app Dashboard where you can find the Client Id
    and Client Secret as shown in the image below.  
    ![](attachments/49088044/76744028.png) 

Now you have finished configuring Foursquare as an identity provider.

### Deploying travelocity.com sample app

The next step is to [deploy the sample
app](https://docs.wso2.com/display/ISCONNECTORS/Deploying+the+Sample+App)
in order to use it in this scenario.

Once this is done, the next step is to configure the WSO2 Identity
Server by adding a [service
provider](https://docs.wso2.com/display/IS510/Configuring+a+Service+Provider)
and [identity
provider.](https://docs.wso2.com/display/IS510/Configuring+an+Identity+Provider)

### Configuring the identity provider

Now you have to configure WSO2 Identity Server by [adding a new identity
provider](https://docs.wso2.com/display/IS510/Configuring+an+Identity+Provider)
.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](https://docs.wso2.com/display/IS510/Running+the+Product).
2.  Log in to the [management
    console](https://docs.wso2.com/display/IS510/Getting+Started+with+the+Management+Console)
    as an administrator.
3.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add**.
4.  Give a suitable name for **Identity Provider Name** (e.g.,
    foursquare).  
    Refer [Adding and Configuring an Identity
    Provider](https://docs.wso2.com/display/IS530/Adding+and+Configuring+an+Identity+Provider)
    for more information related to the identity provider configuration.
5.  Go to **Foursquare Configuration** under **Federated
    Authenticators**.  
    ![](attachments/49088044/49221977.png) 

6.  Enter the IdP related details.

    -   **Client Id** : [Client
        Id](#ConfiguringFoursquareAuthenticator-clientID) for the app
        that you created in Foursquare.
    -   **Client Secret** : [Client
        Secret](#ConfiguringFoursquareAuthenticator-clientID) for for
        the app that you created in Foursquare.
    -   **Callback URL** : Service Provider's URL where code needs to be
        sent. Example: https://localhost:9443/commonauth
    -   **Profile Version** : The appropriate pass date can be added for
        versioning field
        <https://developer.foursquare.com/overview/versioning> OR the
        version of your foursquare account can be added from the API
        explorer
        <https://developer.foursquare.com/docs/explore#req=users/self>
        .  
        Example: 20171114 from
        https://api.foursquare.com/v2/users/self?oauth\_token=xxx&v=20171114

7.  Select both checkboxes **Enable** and **Default** to enable the
    Foursquare Authenticator and make it the default.

8.  Click **Register**.

You have now added the identity provider.

### Configuring the service provider

The next step is to configure the service provider based on the WSO2
Identity Server version that you are working on.

-   [Configuring a service provider with IS 5.3.0
    upwards](#ConfiguringFoursquareAuthenticator-ConfiguringaserviceproviderwithIS5.3.0upwards)
-   [Configuring a service provider with IS 5.1.0 or IS
    5.2.0](#ConfiguringFoursquareAuthenticator-ConfiguringaserviceproviderwithIS5.1.0orIS5.2.0)

#### Configuring a service provider with IS 5.3.0 upwards

1.  Return to the management console.

2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.

3.  As you are using travelocity as the sample, enter travelocity.com in
    the **Service Provider Name** text box.

4.  Configure the SAML2 Web SSO Configuration details.  
    For more information on theSAML2 Web Single-Sign-On Configuration
    methods, see [Configuring SAML2 Web
    Single-Sign-On](https://docs.wso2.com/display/IS530/Configuring+SAML2+Web+Single-Sign-On)
    .  
    1.  In the **Inbound Authentication Configuration** section, click
        **SAML2 Web SSO Configuration**, and then click
        ****Configure****.

        ![](attachments/49088044/76747573.png) 

    2.  Now set the configuration as follows:

        1.  **Select Mode** : Manual Configuration

        2.  **Issuer** : travelocity.com

        3.  **Assertion Consumer URL** : Enter the Assertion Consumer
            URL as <http://localhost:8080/travelocity.com/home.jsp> and
            click **Add**.

    3.  Select the following check-boxes:
        1.  **Enable Response Signing**

        2.  **Enable Single Logout**

        3.  **Enable Attribute Profile**

        4.  **Include Attributes in the Response Always**

5.  Click **Register** to save the changes. Now you will be sent back to
    the **Service Providers** page.

6.  Click **Edit** to edit the travelocity.com service provider.

7.  Configure the Local and Outbound Authentication for Foursquare.  
    For more information, see [Configuring Local and Outbound
    Authentication for a Service
    Provider](../../using-wso2-identity-server/configuring-local-and-outbound-authentication-for-a-service-provider)
    in the WSO2 IS 5.3.0 guide.

    1.  Go to the **Local and Outbound Authentication Configuration**
        section.

    2.  Select the identity provider you created from the dropdown list
        under **Federated Authentication**.  
        ![](attachments/49088044/76747587.png) 

    3.  Ensure that the **Federated Authentication** radio button is
        selected.

8.  Click **Update** to save the changes.

#### Configuring a service provider with IS 5.1.0 or IS 5.2.0

1.  Return to the management console.

2.  In the **Service Providers** section under the **Main** tab, click
    **Add**.

3.  As you are using travelocity as the sample, enter travelocity.com in
    the **Service Provider Name** text box and click **Register**.

4.  In the **Inbound Authentication Configuration** section, click
    **SAML2 Web SSO Configuration**, and then click ****Configure****.

    ![](attachments/49088044/49221980.png) 

5.  Now set the configuration as follows:

    1.  **Issuer** : travelocity.com

    2.  **Assertion Consumer URL** :
        http://localhost:8080/travelocity.com/home.jsp

6.  Select the following check-boxes:
    1.  **Enable Response Signing**

    2.  **Enable Single Logout**

    3.  **Enable Attribute Profile**

    4.  **Include Attributes in the Response Always**

7.  Click **Register** to save the changes. Now you will be sent back to
    the **Service Providers** page.

8.  Go to the **Local and Outbound Authentication Configuration**
    section.

9.  Select the identity provider you created from the dropdown list
    under **Federated Authentication**.

10. Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.

You have now added and configured the service provider.

### Configuring claims

[Add a new claim
mapping](https://docs.wso2.com/display/IS530/Adding+Claim+Mapping) for
various user attributes related to Foursquare based on the WSO2 Identity
Server version that you are working on.

-   [Configuring claims with IS 5.3.0
    upwards](#ConfiguringFoursquareAuthenticator-ConfiguringclaimswithIS5.3.0upwards)
-   [Configuring claims with IS 5.1.0 or IS
    5.2.0](#ConfiguringFoursquareAuthenticator-ConfiguringclaimswithIS5.1.0orIS5.2.0)

#### Configuring claims with IS 5.3.0 upwards

1.  Sign in to the [Management
    Console](../../setup/getting-started-with-the-management-console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add Claim Dialect** to create the Foursquare authenticator
    specific claim dialect.

4.  Specify the Dialect URI as <http://wso2.org/foursquare/claims> and
    click **Add** to create the claim dialect.

5.  Map a new external claim to an existing local claim dialect.  
    You need to map at least one claim under this new claim dialect.
    Therefore, let's map the claim for the Foursquare user ID.  
    1.  In the **Main** menu, click **Add** under **Claims**.
    2.  Click **Add External Claim** to add a new claim to the
        Foursquare claim dialect.

    3.  Select the **Dialect URI** as -
        <http://wso2.org/foursquare/claims>
    4.  Enter the **External Claim URI** based on the following claim
        mapping information.
    5.  Select the **Mapped Local Claim** based on the following claim
        mapping information.

        Claim mapping for ID **  
        **

        |                    |                                      |
        |--------------------|--------------------------------------|
        | Dialect URI        | http://wso2.org/foursquare/claims    |
        | External Claim URI | http://wso2.org/foursquare/claims/id |
        | Mapped Local Claim | http://wso2.org/claims/username      |

    6.  Click **Add** to add the new external claim.

6.  Similarly, you can create claims for all the public information of
    the Foursquare user by repeating step 5 with the following claim
    mapping information.

    -   Claim mapping for email

        |                    |                                         |
        |--------------------|-----------------------------------------|
        | Dialect URI        | http://wso2.org/foursquare/claims       |
        | External Claim URI | http://wso2.org/foursquare/claims/email |
        | Mapped Local Claim | http://wso2.org/claims/emailaddress     |

    -   Claim mapping for first name

        |                    |                                             |
        |--------------------|---------------------------------------------|
        | Dialect URI        | http://wso2.org/foursquare/claims           |
        | External Claim URI | http://wso2.org/foursquare/claims/firstName |
        | Mapped Local Claim | http://wso2.org/claims/givenname            |

    -   Claim mapping for last name

        |                    |                                            |
        |--------------------|--------------------------------------------|
        | Dialect URI        | http://wso2.org/foursquare/claims          |
        | External Claim URI | http://wso2.org/foursquare/claims/lastName |
        | Mapped Local Claim | http://wso2.org/claims/lastname            |

    -   Claim mapping for gender

        |                    |                                          |
        |--------------------|------------------------------------------|
        | Dialect URI        | http://wso2.org/foursquare/claims        |
        | External Claim URI | http://wso2.org/foursquare/claims/gender |
        | Mapped Local Claim | http://wso2.org/claims/gender            |

    -   Claim mapping for home city

        |                    |                                            |
        |--------------------|--------------------------------------------|
        | Dialect URI        | http://wso2.org/foursquare/claims          |
        | External Claim URI | http://wso2.org/foursquare/claims/homeCity |
        | Mapped Local Claim | http://wso2.org/claims/location            |

    -   Claim mapping for canonical URL

        |                    |                                                |
        |--------------------|------------------------------------------------|
        | Dialect URI        | http://wso2.org/foursquare/claims              |
        | External Claim URI | http://wso2.org/foursquare/claims/canonicalUrl |
        | Mapped Local Claim | http://wso2.org/claims/url                     |

7.  The next step is to configure claims in the Identity Server and map
    them with Foursquare.

    1.  In the **Identity** section under the **Main** tab, click
        **List** under **Identity Providers**.
    2.  Click **Edit** to edit the Foursquare identity provider you
        created.
    3.  Under **Claim Configuration**, go to **Basic Claim
        Configuration**.  
        ![](attachments/49088044/76747747.png) 
    4.  Select the **Define Custom Claim Dialect** option under **Select
        Claim mapping Dialect**.
    5.  Click **Add Claim Mapping** to add custom claim mappings as
        follows.

        | Identity Provider URI                          | Local Claim URI                     |
        |------------------------------------------------|-------------------------------------|
        | http://wso2.org/foursquare/claims/id           | http://wso2.org/claims/username     |
        | http://wso2.org/foursquare/claims/email        | http://wso2.org/claims/emailaddress |
        | http://wso2.org/foursquare/claims/firstName    | http://wso2.org/claims/givenname    |
        | http://wso2.org/foursquare/claims/lastName     | http://wso2.org/claims/lastname     |
        | http://wso2.org/foursquare/claims/gender       | http://wso2.org/claims/gender       |
        | http://wso2.org/foursquare/claims/homeCity     | http://wso2.org/claims/location     |
        | http://wso2.org/foursquare/claims/canonicalUrl | http://wso2.org/claims/url          |

    6.  Select the User ID Claim URI as
        - http://wso2.org/foursquare/claims/id

    7.  Click **Update**.

#### Configuring claims with IS 5.1.0 or IS 5.2.0

1.  Sign into the [Management
    Console](https://docs.wso2.com/display/IS510/Getting+Started+with+the+Management+Console)
    by entering your username and password.
2.  In the **Main** menu, click **Add** under **Claims**.
3.  Click **Add New Claim Dialect** to create the Foursquare
    authenticator specific claim dialect.
    ![](attachments/49088044/57749020.png){height="250"}  
    Specify the Dialect Uri as <http://wso2.org/foursquare/claims> and
    create claims. It is required to create at least one claim under
    this new dialect. Therefore, create the claim for the Foursquare
    user ID while creating the claim dialect. Enter the following values
    the form.

    |                      |                                      |
    |----------------------|--------------------------------------|
    | Display Name         | User ID                              |
    | Description          | Claim to user ID                     |
    | Mapped Attribute     | uid                                  |
    | Claim URL            | http://wso2.org/foursquare/claims/id |
    | Supported by Default | selected                             |

4.  Click **Add** to add the new claim.
5.  Similarly, you can create claims for all the public information of
    the Foursquare user. Add the following claims under the dialect
    **http://wso2.org/foursquare/claims**

    |                      |                                         |
    |:---------------------|:----------------------------------------|
    | Display Name         | Email Address                           |
    | Description          | Claim to email address                  |
    | Mapped Attribute     | mail                                    |
    | Claim URL            | http://wso2.org/foursquare/claims/email |
    | Supported by Default | selected                                |

    |                      |                                             |
    |:---------------------|:--------------------------------------------|
    | Display Name         | First Name                                  |
    | Description          | Claimtofirstname                            |
    | Mapped Attribute     | givenName                                   |
    | Claim URL            | http://wso2.org/foursquare/claims/firstName |
    | Supported by Default | selected                                    |

    |                      |                                            |
    |:---------------------|:-------------------------------------------|
    | Display Name         | LastName                                   |
    | Description          | Claim to last name                         |
    | Mapped Attribute     | sn                                         |
    | Claim URL            | http://wso2.org/foursquare/claims/lastName |
    | Supported by Default | selected                                   |

    <table>
    <colgroup>
    <col style="width: 50%" />
    <col style="width: 50%" />
    </colgroup>
    <tbody>
    <tr class="odd">
    <td>Display Name</td>
    <td>Gender</td>
    </tr>
    <tr class="even">
    <td>Description</td>
    <td>Claim to the gender of the user</td>
    </tr>
    <tr class="odd">
    <td>Mapped Attribute</td>
    <td><p>gender</p></td>
    </tr>
    <tr class="even">
    <td>Claim URL</td>
    <td>http://wso2.org/foursquare/claims/gender</td>
    </tr>
    <tr class="odd">
    <td>Supported by Default</td>
    <td>selected</td>
    </tr>
    </tbody>
    </table>

    |                      |                                            |
    |----------------------|--------------------------------------------|
    | Display Name         | Home City                                  |
    | Description          | Claim to Home city                         |
    | Mapped Attribute     | locality                                   |
    | Claim URL            | http://wso2.org/foursquare/claims/homeCity |
    | Supported by Default | selected                                   |

    |                      |                                                |
    |----------------------|------------------------------------------------|
    | Display Name         | Canonical Url                                  |
    | Description          | Claim to the canonical Url                     |
    | Mapped Attribute     | url                                            |
    | Claim URL            | http://wso2.org/foursquare/claims/canonicalUrl |
    | Supported by Default | selected                                       |

    ![](attachments/49088044/57749023.png){height="250"}

6.  The next step is to configure claims in the Identity Server and map
    them with Foursquare.

    1.  In the **Identity** section under the **Main** tab, click
        **List** under **Identity Providers**.
    2.  Click **Edit** to edit the foursquare identity provider you
        created.
    3.  Under **Claim Configuration**, go to **Basic Claim
        Configuration**.
    4.  Select the **Define Custom Claim Dialect** option under **Select
        Claim mapping Dialect**.
    5.  Click **Add Claim Mapping** to add custom claim mappings as
        follows.
    6.  Select the User ID Claim URI as -
        <http://wso2.org/foursquare/claims/id>

    7.  Click **Update**.  
        ![](attachments/49088044/61669807.png){height="400"}

#### Local claim mapping

Navigate to the **Main** menu, and click **Add** under **Claims** in the
Management Console. The list of claims appear. Click the
<http://wso2.org/claims> claim, and thereafter click **email**. This
shows you that by default, the local claim
**http://wso2.org/claims/emailaddress** is created with the map
attribute **mail.**

-   [**IS 5.3.0**](#9952824b428a4bfe8461ed0ee2ce46c4)
-   [**IS 5.1.0/IS 5.2.0**](#d1c18575f9984094ae75bd8ada1e81fa)

![](attachments/49088044/76747781.png){height="250"}

![](attachments/49088044/57749027.png){height="250"}

In the configuration, **http://wso2.org/foursquare/claims/email** is
mapped to the **mail** attribute in the Foursquare claim, and
**http://wso2.org/claims/emailAddress** is mapped to the **mail**
attribute in WSO2 local claim.

**  
Creating a new local claim to map it with the Foursquare claim**  
You can create the local claim **http://wso2.org/claims/id** with the
map attribute **uid** as follows:

-   [**IS 5.3.0**](#966c70f11de54c1fa4920dcca8562087)
-   [**IS 5.1.0/IS 5.2.0**](#3de64f7cd8ec43adb35d62c388f14e83)

1.  In the **Main** menu, click **Add** under **Claims**.
2.  Click **Add Local Claim** to create a new local claim.

3.  Specify the following:

    -   **Claim URI** - <http://wso2.org/claims/id>

    -   **Display Name** - ID

    -   **Description** - Identifier
    -   **Mapped Attribute (s)** - uid
    -   **Supported by Default** - Select this option.  
        ![](attachments/49088044/76747798.png) 

4.  Click **Add**.

1.  In the **Main** menu, click **Add** under **Claims**.
2.  Click **Add New Claim Dialect** to create the wso2.org specific
    claim dialect.

    ![](attachments/49088044/57749026.png){height="250"}

3.  Click **Add**.

###  Configuring requested claims for travelocity.com

1.  In the **Identity** section under the **Main** tab, click **List**
    under **Service Providers**.
2.  Click **Edit** to edit the travelocity.com service provider.
3.  Expand the **Claim Configuration** section.
4.  Click on **Add Claim URI** under **Requested Claims** to add the
    requested claims as indicated in the image below. Here you must add
    the claims you mapped in the Identity Provider claim configuration.

    -   [**IS 5.3.0**](#60f10e1b28fc4aa6b1c6003302c0c34b)
    -   [**IS 5.1.0/IS 5.2.0**](#a0cfc3dd8fae4fc3ad1c3c46a1b710a3)

    Select the Mandatory Claim checkbox for all the claim URIs that you
    added.

    ![](attachments/49088044/112364021.png) 

    ![](attachments/49088044/57749029.png) 

5.  Select the Subject Claim URI as http://wso2.org/claims/emailaddress
    to define the authenticated user identifier that will return with
    the authentication response to the service provider.

6.  Click **Update** to save your service provider changes.

### Testing the sample

1.  To test the sample, go to the following URL:  
    `           http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp                     `
    E.g., <http://localhost:8080/travelocity.com>

2.  Click the link to log in with SAML from WSO2 Identity Server. You
    can use either the redirect binding or the post binding option.  
    ![](attachments/49088044/76748625.png) 
3.  You are redirected to the Foursquare Login page. Enter your
    Foursquare credentials and you will be taken to the home page of the
    travelocity.com app.  
    ![](attachments/49088044/76747861.png) 
