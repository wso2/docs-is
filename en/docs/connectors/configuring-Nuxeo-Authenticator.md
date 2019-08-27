# Configuring Nuxeo Authenticator

The topics in this page provide instructions on how to configure the
Nuxeo authenticator with WSO2 Identity Server. Here, a sample
application is used to demonstrate the integration.  

Note

-   Nuxeo Authenticator is supported with WSO2 Identity Server 5.5.0.
-   Configuring the Nuxeo authenticator is tested with Nuxeo Server
    version 10.1.

Follow the instructions in the topics below to configure the Nuxeo
authenticator with WSO2 Identity Server:

-   [Deploying Nuxeo
    artifacts](#ConfiguringNuxeoAuthenticator-DeployingNuxeoartifactsDeployingNuxeoartifacts)
-   [Configuring the Nuxeo
    application](#ConfiguringNuxeoAuthenticator-ConfiguringtheNuxeoAppConfiguringtheNuxeoapplication)
-   [Deploying the travelocity.com sample
    app](#ConfiguringNuxeoAuthenticator-Deployingtravelocity.comsampleappDeployingthetravelocity.comsampleapp)
-   [Configuring the identity
    provider](#ConfiguringNuxeoAuthenticator-ConfiguringtheidentityproviderConfiguringtheidentityprovider)
-   [Configuring the service
    provider](#ConfiguringNuxeoAuthenticator-ConfiguringtheserviceproviderConfiguringtheserviceprovider)
-   [Configuring
    claims](#ConfiguringNuxeoAuthenticator-ConfiguringclaimsConfiguringclaims)
-   [Configuring requested claims for
    travelocity.com](#ConfiguringNuxeoAuthenticator-TestingthesampleConfiguringrequestedclaimsfortravelocity.com)
-   [Testing the
    sample](#ConfiguringNuxeoAuthenticator-TestingthesampleTestingthesample)

### Deploying Nuxeo artifacts

-   Download the artifacts for this authenticator from [the
    store](https://store.wso2.com/store/assets/isconnector/details/c7003ffb-18a1-48ed-9a99-6274796fa978)
    .
-   Copy the downloaded
    `          org.wso2.carbon.identity.authenticator.nuxeo-x.x.x.jar         `
    file to the
    `          <IS_HOME>/repository/components/dropins         `
    directory.

!!! note
    
    If you want to upgrade the Nuxeo Authenticator (.jar) that is packaged
    with your existing WSO2 IS distribution to the latest, see [upgrade
    instructions.](https://docs.wso2.com/display/ISCONNECTORS/Authenticator+Upgrade+Instructions)
    

### Configuring the Nuxeo application

1.  Go to <https://www.nuxeo.com/downloads/>, download the server
    and unzip the archive. The path to the sever will be referred to as
    `          <NUEXO_HOME>         ` throughout this page.
2.  Navigate to the `           <NUEXO_HOME>/bin          ` directory
    and use the following command to install the JSF UI add-on:

    ``` java
    ./nuxeoctl mp-install nuxeo-jsf-ui
    ```

3.  Start the Nuxeo server using the commands given below:

    ``` java
        $ chmod +x ./nuxeoctl
        $ ./nuxeoctl start
    ```

    !!! note
    
        After the first time server start, follow the consequence
        instructions in the nuxeo console to setup the nuxeo server.
    

4.  Once the server starts, follow the steps below to setup the nuxeo
    server.  
    1.  Go to <http://localhost:8080/nuxeo/jsf> and sign in with
        Administrator/Administrator credentials.
    2.  Click **Admin**, then click **Cloud Services**, and then click
        the **Consumers** tab.
    3.  Click **Add** under the **OAuth2 Clients** section.
    4.  Specify values for the **Name**, **Client ID**, **Client
        Secret**, and **Redirect URI**. You can use
        <https://localhost:9443/commonauth> as the **Redirect URI**.
    5.  Click **Create**.  
        ![](attachments/92526518/92534118.png) 

  

Now you have configured the Nuxeo application .

Next let's deploy the the [travelocity.com](http://travelocity.com/)
sample app so that it can be used in this scenario.

### Deploying the [travelocity.com](http://travelocity.com) sample app

To download and deploy the travelocity sample application, follow the
instructions in [deploying travelocity.com sample
app](https://docs.wso2.com/display/ISCONNECTORS/Deploying+the+Sample+App)
.

!!! note
    
    If you are running the Nuxeo server and apache tomcat on the same port
    (eg: 8080), be sure to change the port that you run apache tomcat.
    
    Follow the steps below to change the port on which apache tomcat runs:
    
    1.  Navigate to the `           <TOMCAT_HOME>/conf/server.xml          `
        file and change the values of
        `           Connector port,           Server port          `
        parameters.
    
        ``` text
        <Server port="8005" shutdown="SHUTDOWN">
    
    
        <Connector port="8080" protocol="HTTP/1.1"
            connectionTimeout="20000"
               redirectPort="8443" />
    
    
        <Connector port="8009" protocol="AJP/1.3" redirectPort="8443" />
        ```
    
    2.  Navigate to the
        `           <TOMCAT_HOME>/webapps/travelocity.com/WEB-INF/classes/travelocity.properties          `
        file and change the port in the URL of the SAML 2.0 assertion
        consumer.
    
        ``` text
            #The URL of the SAML 2.0 Assertion Consumer
            SAML2.AssertionConsumerURL=http://localhost:8080/travelocity.com/home.jsp
        ```
    

### Configuring the identity provider

Follow the steps below to add a new identity provider via the management
console of WSO2 Identity Server.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).
2.  Run the [WSO2 Identity
    Server](https://docs.wso2.com/identity-server/Running+the+Product).
3.  Log in to the [management
    console](https://docs.wso2.com/identity-server/Getting+Started+with+the+Management+Console)
    as an administrator.
4.  In the **Identity Providers** section under the **Main** tab of the
    management console, click **Add.**
5.  Specify an appropriate name as the **Identity Provider Name**.  
    ![](attachments/92526518/112363883.png) 
6.  Expand the **Federated Authenticators** section, and then expand the
    **Nuxeo Configuration** section.
7.  Select **Enable** to enable the Nuxeo authenticator for the identity
    provider.
8.  Select **Default** to set Nuxeo as the default authenticator for the
    identity provider.
9.  Specify appropriate values for the following fields depending on
    the  
    1.  Select both checkboxes to **Enable** the Nuxeo authenticator and
        make it the **Default**.
    2.  **Client Id** **:** The client Id of the Nuxeo application you
        created.

    3.  **Client Secret** **:** The client secret of the Nuxeo
        application you created.

    4.  **Callback URL** **:** The service provider's URL where code
        needs to be sent. <https://localhost:9443/commonauth>

    5.  **Nuxeo Server URL** **:** The Nuxeo server URL.
        [http://localhost:8080](http://localhost:8080/)

          

        ![](images/icons/grey_arrow_down.png){.expand-control-image}
        Click here to see detailed descriptions for each configuration
        property

        <table>
        <thead>
        <tr class="header">
        <th>Property</th>
        <th>Description</th>
        <th>Sample Value</th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd">
        <td>Enable</td>
        <td>Select this to enable the Nuxeo to be used as an authenticator to provision users to the Identity Server.</td>
        <td>Selected</td>
        </tr>
        <tr class="even">
        <td>Default</td>
        <td>Selecting the Default checkbox signifies that github is the main/default form of authentication. This removes the selection made for any other Default checkboxes for other authenticators.</td>
        <td>Selected</td>
        </tr>
        <tr class="odd">
        <td>ClientID</td>
        <td>This is the Client Id from the Nuxeo App</td>
        <td>clientApp</td>
        </tr>
        <tr class="even">
        <td>Client Secret</td>
        <td>This is the Client Secret from the Nuxeo App. Click the Show button to view the value you enter.</td>
        <td>clientsecret</td>
        </tr>
        <tr class="odd">
        <td>Callback URL</td>
        <td>This is the URL to which the browser should be redirected after the authentication is successful. The URL should be specified in the following format:<br />
        <code>                    https://&lt;HOST_NAME&gt;:&lt;PORT&gt;/acs                   </code></td>
        <td>https://localhost:9443/commonauth</td>
        </tr>
        <tr class="even">
        <td>Nuxeo server URL</td>
        <td>The Nuxeo server URL.</td>
        <td><a href="http://localhost:8080/">http://localhost:8080</a></td>
        </tr>
        </tbody>
        </table>

10. Click **Register**.

Now that you have added the identity provider. Next, let's configure the
service provider.

### Configuring the service provider

Follow the steps below to configure the service provider.

1.  On the WSO2 IS management console, click **Add** under **Service
    Providers**.
2.  Since you are using travelocity as the sample, enter
    [travelocity.com](http://travelocity.com/) as the **Service Provider
    Name**.
3.  Click **Register**.
4.  Expand the **Inbound Authentication Configuration** section, then
    expand the **SAML2 Web SSO Configuration** section, and then click
    **Configure**.
5.  Specify values as follows:
    1.  **Issuer** : [travelocity.com](http://travelocity.com)
    2.  **Assertion Consumer URL** :
        <http://localhost:8181/travelocity.com/home.jsp>
    3.  Select the following:  
        -   **Enable Response Signing**
        -   **Enable Single Logout**
        -   **Enable Attribute Profile.**
        -   **Include Attributes in the Response Always**
6.  Click **Update** to save the changes. Now you will be sent back to
    the **Service Providers** page.  
7.  Expand the **Local and Outbound Authentication Configuration**
    section.

8.  From the drop-down list under **Federated Authentication**, select
    the identity provider you created.

9.  Ensure that the **Federated Authentication** radio button is
    selected and click **Update** to save the changes.  

Now you have added the service provider. Next, let's configure claims.

### Configuring claims

Follow the steps below to configure claims. For more information on
configuring claims, see [Adding Claim
Mapping](../../using-the-identity-server/adding-claim-mapping) in
the WSO2 IS documentation.

1.  Sign in to the [Management
    Console](../../setup/getting-started-with-the-management-console)
    with your username and password.
2.  On the **Main** menu, click **Add** under **Claims**.

3.  Click **Add Claim Dialect** to create the Nuxeo authenticator
    specific claim dialect.

4.  Specify the Dialect URI as
    `                       http://wso2.org/nuxeo/claims                     `
    .

5.  Click **Add** to create the claim dialect.

6.  Map the new external claim to an existing local claim dialect. Be
    sure to map at least one claim under the new dialect. Here, let's
    map the claim for the last name.

    1.  On the **Main** menu, click **Add** under **Claims**.

    2.  Click **Add External Claim** to add a new claim to the Nuxeo
        claim dialect.

    3.  Select the Dialect URI as
        `                           http://wso2.org/nuxeo/claims                         `
        .

    4.  Enter the **External Claim URI** based on the following claim
        mapping information.

    5.  Select the **Mapped Local Claim** based on the following claim
        mapping information.

        Claim mapping for last name

        |                        |                                                                                                             |
        |------------------------|-------------------------------------------------------------------------------------------------------------|
        | **Dialect URI**        | `                                   http://wso2.org/nuxeo/claims                                 `          |
        | **External Claim URI** | `                                   http://wso2.org/nuxeo/claims/lastName                                 ` |
        | **Mapped Local Claim** | `                                   http://wso2.org/claims/lastname                                 `       |

    6.  Click **Add** to add the new external claim.

7.  Similarly, repeat step 6 for the following claim mappings to create
    claims for all the public information of the Nuxeo user.

    Claim mapping for the first name:

    |                        |                                        |
    |------------------------|----------------------------------------|
    | **Dialect URI**        | http://wso2.org/nuxeo/claims           |
    | **External Claim URI** | http://wso2.org/nuxeo/claims/firstName |
    | **Mapped Local Claim** | http://wso2.org/claims/givenname       |

    Claim mapping for the email:

    |                        |                                     |
    |------------------------|-------------------------------------|
    | **Dialect URI**        | http://wso2.org/nuxeo/claims        |
    | **External Claim URI** | http://wso2.org/nuxeo/claims/email  |
    | **Mapped Local Claim** | http://wso2.org/claims/emailaddress |

    Claim mapping for groups:

    |                        |                                     |
    |------------------------|-------------------------------------|
    | **Dialect URI**        | http://wso2.org/nuxeo/claims        |
    | **External Claim URI** | http://wso2.org/nuxeo/claims/groups |
    | **Mapped Local Claim** | http://wso2.org/claims/role         |

    Claim mapping for user id:

    |                        |                                 |
    |------------------------|---------------------------------|
    | **Dialect URI**        | http://wso2.org/nuxeo/claims    |
    | **External Claim URI** | http://wso2.org/nuxeo/claims/id |
    | **Mapped Local Claim** | http://wso2.org/claims/userid   |

    Claim mapping for extended group:

    |                        |                                             |
    |------------------------|---------------------------------------------|
    | **Dialect URI**        | http://wso2.org/nuxeo/claims                |
    | **External Claim URI** | http://wso2.org/nuxeo/claims/extendedGroups |
    | **Mapped Local Claim** | http://wso2.org/claims/group                |

    Claim mapping for user name:

    |                        |                                       |
    |------------------------|---------------------------------------|
    | **Dialect URI**        | http://wso2.org/nuxeo/claims          |
    | **External Claim URI** | http://wso2.org/nuxeo/claims/username |
    | **Mapped Local Claim** | http://wso2.org/claims/username       |

    Claim mapping for entity type:

    |                        |                                          |
    |------------------------|------------------------------------------|
    | **Dialect URI**        | http://wso2.org/nuxeo/claims             |
    | **External Claim URI** | http://wso2.org/nuxeo/claims/entity-type |
    | **Mapped Local Claim** | http://wso2.org/claims/userType          |

8.  Click **Update**.

### Configuring requested claims for travelocity.com

1.  On the Main tab of the management console, click **List** under
    **Service Providers**.

2.  Click **Edit** to edit the [travelocity.com](http://travelocity.com)
    service provider.

3.  Expand the **Claim Configuration** section.

4.  Click **Add Claim URI** under **Requested Claims** and add the
    requested claims as follows:

    ![](attachments/92526518/92534139.png) 

5.  Select the **Subject Claim** URI as
    `                       http://wso2.org/claims/username                     `
    to define the authenticated user identifier that will return with
    the authentication response to the service provider.

6.  Click **Update**. This saves the service provider changes.

### Testing the sample

1.  To test the sample, go to
    `          http://<TOMCAT_HOST>:<TOMCAT_PORT>/travelocity.com/index.jsp         `
    . For example, <http://localhost:8181/travelocity.com> .
2.  Click the appropriate link to log in with SAML from WSO2 Identity
    Server.  
    ![](attachments/92526518/92526852.png)   
3.  Enter your Nuxeo credentials in the log in prompt of Nuxeo. Once you
    log in successfully you will be taken to the homepage of the t
    `          ravelocity.com         ` application.  

Now that you understand how to use Nuxeo as a federated authenticator
with WSO2 Identity Server, you can configure the Nuxeo authenticator as
required to authenticate Nuxeo users to log in to your organization’s
applications.

  
