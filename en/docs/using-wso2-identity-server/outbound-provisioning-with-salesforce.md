# Outbound Provisioning with Salesforce

The WSO2 Identity Server (WSO2 IS) has the ability to provision users
into different domains like Salesforce, Google, Facebook, etc., using
its [identity provisioning framework](../../getting-started/provisioning-architecture).

This topic provides instructions on how to configure Salesforce as the
Identity Provider to provision users from WSO2 Identity Server. The
service provider in this scenario is WSO2 Identity Server. When WSO2 IS
is the service provider, it is configured as the resident Service
Provider. Therefore, after completing this tutorial you can see the
users you add using WSO2 Identity Server being created in Salesforce
too.

### Configuring Salesforce

1.  Sign up as a Salesforce developer.
    1.  Fill out the relevant information found in the following URL:
        [https://developer.salesforce.com/signup  
        ](https://developer.salesforce.com/signup)
    2.  Click **Sign me up**.
    3.  You will receive a security token by email to confirm your new
        account. If you did not receive the email, you can reset it by
        following the steps given
        [here](https://help.salesforce.com/apex/HTViewHelpDoc?id=user_security_token.htm&language=en_US)
        .
2.  Log in with your new credentials as a Salesforce developer:
    <https://login.salesforce.com/>

    !!! note    
        This document is explained using the Salesforce lightning theme. If
        you are using the classic theme, follow the steps given below to
        switch to the lightning theme:
    
        ??? note "Click here to find the steps on how to switch from the classic to the lightning theme."
    
            1.  Click your username to expand the drop down.
            2.  Click **Switch to Lightning Experience**.  
                ![lighteninig-experience](../../assets/img/using-wso2-identity-server/lighteninig-experience.png)
            3.  Click the settings icon on the top-right-hand corner, and click
                **Set Up**.  
                ![setup-lightening](../../assets/img/using-wso2-identity-server/setup-lightening.png) 
        
            Now you are navigated to the lightening theme of Salesforce.
    

3.  Click **Allow** to enable Salesforce to access your basic
    information. This message pops up only when you log in to Salesforce
    for the first time.
4.  Once you are logged in, add a connected app. Follow instructions
    below on how to do this. Click
    [here](https://help.salesforce.com/apex/HTViewHelpDoc?id=connected_app_create.htm)
    for a more information.

    !!! info "Why is the Connected App required?"

        The Salesforce provisioning connector in WSO2 Identity Server sends
        data to Salesforce via the Salesforce REST APIs. These APIs are
        OAuth protected. Therefore, when sending data to Salesforce using
        these REST APIs, the Client ID and Client Secret needs to be sent to
        Salesforce for Salesforce to authorize the respective REST API call.
        This can be achieved by creating a Connected App, which uses the
        standard OAuth 2.0 protocol for authentication. Once the application
        is created the client ID and client secret that is unique to the
        application is shared with you. You need to configure the Identity
        Provider in WSO2 Identity Server with these values to successfully
        configure outbound provisioning with Salesforce.

    1.  Expand **Apps** and click **App Manager**.  
        ![app-manager](../../assets/img/using-wso2-identity-server/app-manager.png) 
    2.  In the window that appears, click **New** **Connected Apps**
        that is on the top right corner.
    3.  Fill in the form that appears with relevant details.  
        The following table describes the form labels in detail.

        <table>
        <thead>
        <tr class="header">
        <th>Form Label</th>
        <th>Description</th>
        </tr>
        </thead>
        <tbody>
        <tr class="odd">
        <td>Connected App Name</td>
        <td>The name of the connected app. For example, IdentityServerProvisioning.</td>
        </tr>
        <tr class="even">
        <td>API Name</td>
        <td>Enter the API name used when referring to your app from a program. The API name should match the name of the connected app. This defaults to a version of the name without spaces. Only letters, numbers, and underscores are allowed, so you must edit the default name if the original app name contains any other characters.</td>
        </tr>
        <tr class="odd">
        <td>Contact Email</td>
        <td>The email address used by the connected app.</td>
        </tr>
        <tr class="even">
        <td>Enable OAuth Settings</td>
        <td>This section controls how your app communicates with Salesforce. Select the checkbox to enable OAuth settings to configure authentication settings.</td>
        </tr>
        <tr class="odd">
        <td>Callback URL</td>
        <td>The <strong>Callback URL</strong> is used for redirection. This is typically the URL that a user’s browser is redirected to after successful authentication. Use the following value here: <code>                 https://login.salesforce.com/services/oauth2/token                </code></td>
        </tr>
        <tr class="even">
        <td>Selected OAuth Scopes</td>
        <td><div class="content-wrapper">
        <p>Choose <strong>Full access (full)</strong> from the <strong>Available OAuth Scopes</strong> and click the button under <strong>Add</strong> . This gives the necessary permissions when accessing this App.</p>
        <div>
        <div class="user-content-block">
        <p>These scopes refer to permissions the user gives to the connected app while it is running. The OAuth token name is in parentheses.<br />
        Full access (full) allows access to the logged-in user’s data, and encompasses all other scopes. Full doesn’t return a refresh token. You must explicitly request the refresh_token scope to get one.</p>
        </div>
        </div>
        </div></td>
        </tr>
        </tbody>
        </table>

        ![new-connected-app](../../assets/img/using-wso2-identity-server/new-connected-app.png) 

    4.  Click **Save** **\> Continue** to add the connected app.

5.  <a name ="step5"></a>The resulting screen displays key information that you will need to
    configure the Identity Server to Salesforce.  
    Make a note of the following details as you need them in upcoming
    configurations.

    1.  Consumer Key
    2.  Consumer Secret (Click the **Click to reveal** link to view the
        consumer secret)
    3.  Callback URL

    !!! info
        **Consumer Key** : A value used by the consumer to identify itself
        to Salesforce. Referred to as client\_id in OAuth 2.0.

        **Consumer Secret** : A secret used by the consumer to establish
        ownership of the consumer key. Referred to as client\_secret in
        OAuth 2.0.

    ![consumer-secret](../../assets/img/using-wso2-identity-server/consumer-secret.png) 

6.  Add your connected app to the profile you are going to use. This is
    necessary as this profile is used when you add users in to
    Salesforce from the Identity Server.

    !!! note
    
        Allow from 2-10 minutes for your changes to take effect on the
        server before using the connected app.
    

    1.  Expand **Users** and click **Profiles**. A list of existing
        profiles can be viewed.  
        ![user-profiles](../../assets/img/using-wso2-identity-server/user-profiles.png) 

    2.  As an example, if you use the profile “Chatter Free User”, click
        **Edit** and select the connected app you created to configure
        with the Identity Server using the provided checkbox.  
        Example:  
        ![select-connected-app](../../assets/img/using-wso2-identity-server/select-connected-app.png) 

    3.  Click **Save**. Make a note of the profile ID (or address URL)
        of the Chatter Free User profile.

        !!! tip
        
                **Tip:** Copy the URL and decode it using a URL decoder. You get
                an output similar to what is shown below:  
                `             https://wso2-is-sso-dev-ed.lightning.force.com/one/one.app#/setup/page?nodeId=EnhancedProfiles&address=/                           00e90000001aV2o                          ?isdtp=p1&a:t=1509949702148            `
        
                In this case `             00e90000001aV2o            ` is your
                profile ID.
        

7.  <a name="public"></a>Get the public certificate for Salesforce. Do the following in order
    to achieve this.

    !!! info 
        For more information on generating the certificate, see the [Salesforce
        documentation](https://help.salesforce.com/articleView?id=security_keys_creating.htm&type=0).

    1.  In the left navigation pane, Expand **Security** and click
        **Certificate and Key Management** or you can search for
        Certificate and Key Management in the Quick Find search box.  
        ![certificate-and-key-management](../../assets/img/using-wso2-identity-server/certificate-and-key-management.png) 
    2.  Click **Create Self-Signed Certificate**.
    3.  Enter the **Label** and a **Unique Name** and click **Save**.
        The certificate is generated.  
        ![self-signed-certificate](../../assets/img/using-wso2-identity-server/self-signed-certificate.png) 
    4.  Click the **Download Certificate** button to download the
        certificate.

### Configuring the Identity Server to use email address as the username

Provisioning is the process of coordinating the creation of user
accounts, e-mail authorizations in the form of rules and roles, and
other tasks such as provisioning of resources associated with enabling
new users.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/) and [run
    it](../../setup/running-the-product).
2.  Log in to the [Management
    Console](../../setup/getting-started-with-the-management-console) as an
    administrator.
3.  When you log into Salesforce, you normally use an email address. So,
    to integrate this with the Identity Server, you need to configure
    WSO2 IS to enable users to log in using their email addresses. In
    order to do that, follow the steps found in the [Using Email Address
    as the Username](../../using-wso2-identity-server/using-email-address-as-the-username) topic.
4.  Restart the Identity Server.

Now that you are done with configuring the email address for use in
authentication, configure the identity provider and the service
provider.


### Configuring Salesforce as the Identity Provider

This section includes steps on how to register Salesforce as an Identity
Provider.

1.  Start the WSO2 Identity Server if it is not started up already and
    log in using the email you configured in the realm as instructed
    above in step 3 of **Configuring the Identity Server**.
2.  On the Management Console, click on **Add** under **Identity
    Providers**.
3.  In the form that appears, provide a name for your identity provider
    by filling in the **Identity Provider Name**. You can use
    "Salesforce.com" as an example, but this can be any name you choose.
    See [Configuring an Identity
    Provider](../../using-wso2-identity-server/adding-and-configuring-an-identity-provider) for
    information on registering and configuring an identity provider.
4.  Upload the Salesforce public certificate that you generated and
    saved in [step 7 under Configuring
    Salesforce](outbound-provisioning-with-salesforce#public)
    .  
    Do this by clicking the **Choose File** button next to **Identity
    Provider Public Certificate**.

    !!! info "Why is the certificate needed?"

        The Identity Provider's public certificate is used for SSL
        communication, to verify the signed data that comes from the
        Identity Provider and to send encrypted data to the Identity
        Provider.

    ![idp-public-certificate](../../assets/img/using-wso2-identity-server/idp-public-certificate.png) 

5.  Expand the **Claim Configuration** section of the form, followed by
    the **Basic Claim Configuration** section, and select **Define
    Custom Claim Dialect**.

    !!! info 
        We are adding a claim map in order to provision the users claim
        values to salesforce when outbound provisioning users to salesforce
        via WSO2 Identity Server. Here, the **Identity Provider Claim URI**
        is the claim URI in Salesforce, which maps local claim URI in WSO2
        Identity Server. Read more about [Claim
        Management](../../using-wso2-identity-server/claim-management).

        For more information on configuring advanced claims, see
        [Configuring Claims for an Identity
        Provider](../../using-wso2-identity-server/configuring-claims-for-an-identity-provider#configuring-advanced-claims)
        .

6.  Click **Add Claim Mapping** and add the following claims.  
    Local claims in WSO2 IS are unique URIs. These are mapped to the
    [attributes required by salesforce to create a new
    profile](https://help.salesforce.com/articleView?id=000007571&language=en_US&type=1)
    . Therefore, in this step you are mapping the attributes required by
    Salesforce to a unique URI. Now, when creating a new profile/user
    WSO2 IS sends these values to the correct attribute of Salesforce.

    | Identity Provider Claim URI        | Local Claim URI                                                                |
    |------------------------------------|--------------------------------------------------------------------------------|
    | Alias                              | `               http://wso2.org/claims/givenname              `                |
    | Email                              | `               http://wso2.org/claims/emailaddress              `             |
    | EmailEncodingKey                   | `               http://wso2.org/claims/otherphone              `               |
    | LanguageLocaleKey                  | `               http://wso2.org/claims/dob              `                      |
    | LastName                           | `               http://wso2.org/claims/lastname              `                 |
    | LocaleSidKey                       | `               http://wso2.org/claims/primaryChallengeQuestion              ` |
    | ProfileId                          | `               http://wso2.org/claims/role              `                     |
    | TimeZoneSidKey                     | `               http://wso2.org/claims/challengeQuestion1              `       |
    | UserPermissionsCallCenterAutoLogin | `               http://wso2.org/claims/telephone              `                |
    | UserPermissionsMarketingUser       | `               http://wso2.org/claims/mobile              `                   |
    | UserPermissionsOfflineUser         | `               http://wso2.org/claims/country              `                  |
    | Username                           | `               http://wso2.org/claims/emailaddress              `             |

    ![add-claim-mapping](../../assets/img/using-wso2-identity-server/add-claim-mapping.png) 

7.  Expand the **Advanced Claim Configuration** section.
8.  Select the Claim URI you added from the **Provisioning Claim
    Filter** dropdown and click **Add Claim**.  
    ![provisioning-claim-filter](../../assets/img/using-wso2-identity-server/provisioning-claim-filter.png) 
9.  For each Claim URI, enter a default value as shown in the following
    table. The default values are used when creating the role in
    Salesforce.  
    For example, the alias, email, profile ID and all the values listed
    below are [shown when a user is
    created](outbound-provisioning-with-salesforce#usershown).  
    These are sample values to help you understand better about claim
    URI and its value types.
    <table>
    <thead>
    <tr class="header">
    <th>Claim URI</th>
    <th>Default Value</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Alias</td>
    <td><code>               Samuel              </code></td>
    </tr>
    <tr class="even">
    <td>Email</td>
    <td><code>               samuel@wso2.com              </code></td>
    </tr>
    <tr class="odd">
    <td>EmailEncodingKey</td>
    <td><code>               UTF-8              </code></td>
    </tr>
    <tr class="even">
    <td>LanguageLocaleKey</td>
    <td><code>               en_US              </code></td>
    </tr>
    <tr class="odd">
    <td>LastName</td>
    <td><code>               Gnaniah              </code></td>
    </tr>
    <tr class="even">
    <td>LocaleSidKey</td>
    <td><code>               en_US              </code></td>
    </tr>
    <tr class="odd">
    <td>ProfileId</td>
    <td><div class="content-wrapper">
    <p><code>                 00e90000001aV2o                                 </code> The users that are added using WSO2 Identity Server are added to this profile in Salesforce. For more information on the context of profiles in Salesforce, see the <a href="http://www.salesforcetutorial.com/working-profiles-salesforce/">Salesforce tutorial</a> .</p>
    <div class="admonition tip">
    <p class="admonition-title">Tip</p>
    <p>The <strong>ProfileId</strong> value refers to the ID of the profile you created in Salesforce (step 6 of Configuring Salesforce). If it is the Chatter Free User profile you created, navigate to the profile in Salesforce to find the profile ID. You can do this by clicking <strong>Profiles</strong> under <strong>Manage Users</strong> in Salesforce and clicking Chatter Free User.</p>
        <p>Copy the URL and decode it using a URL decoder. You get an output similar to what is shown below:<br />
        <code>                 https://wso2-is-sso-dev-ed.lightning.force.com/one/one.app#/setup/page?nodeId=EnhancedProfiles&amp;address=/                                   00e90000001aV2o                                  ?isdtp=p1&amp;a:t=1509949702148                </code></p>
        <p>In this case 00e90000001aV2o is your profile ID. Similarly, enter your Profile ID.</p></div>
    </div></td>
    </tr>
    <tr class="even">
    <td>TimeZoneSidKey</td>
    <td><code>               America/Los_Angeles              </code></td>
    </tr>
    <tr class="odd">
    <td>UserPermissionsCallCenterAutoLogin</td>
    <td><code>               false              </code></td>
    </tr>
    <tr class="even">
    <td>UserPermissionsMarketingUser</td>
    <td><code>               false              </code></td>
    </tr>
    <tr class="odd">
    <td>UserPermissionsOfflineUser</td>
    <td><code>               false              </code></td>
    </tr>
    <tr class="even">
    <td>Username</td>
    <td><code>               samuel@wso2.com              </code></td>
    </tr>
    </tbody>
    </table>

    ![advanced-claim-config](../../assets/img/using-wso2-identity-server/advanced-claim-config.png) 

10. Expand the **Outbound Provisioning Connectors** section followed by
    the **Salesforce Provisioning Configuration** section.
11. Do the following configurations for Salesforce provisioning. For
    more information on any of these fields, see [Configuring Salesforce
    provisioning](../../using-wso2-identity-server/configuring-outbound-provisioning-connectors-for-an-identity-provider#configuring-salesforce-provisioning)
    .
    1.  Select **Enable Connector** to enable the Salesforce connector.
    2.  Enter the **API version**. This is the version of the API you
        are using in Salesforce.  
        Follow the steps given below to get the API version:  
        1.  To obtain this, log into <https://login.salesforce.com>.
        2.  Search for **API** in the Quick Find search box and click
            API.
        3.  Generate any one of the WSDL's to check the version. You are
            navigated to page with XML syntaxes.
        4.  On the top it will mention as "
            `              Salesforce.com Enterprise Web Services API Version <VERSION>             `
            ".  For example:
            `              Salesforce.com Enterprise Web Services API Version 41.0             `
        5.  Enter this value for the API version in the following
            format: `              v<VERSION_NUMBER>             ` . For
            example: `              v41.0             ` .
    3.  Enter the **Domain**. If you do not have a Salesforce domain,
        you need to create a domain by logging into
        [https://login.salesforce.com](https://login.salesforce.com/).

        ??? note "Click here for more information on creating the domain on Salesforce."

            1.  Search for My Domain in the search bar that is on the left
                navigation panel.  
                ![my-domain](../../assets/img/using-wso2-identity-server/my-domain.png) 
            2.  Click **My Domain**.
            3.  In the page that appears, come up with a name for your
                domain. You can check if the domain is available by clicking
                the **Check Availability** button.
                !!! info 
                    For the page given below to load on your browser, make sure
                    that the Salesforce cookies are not blocked.
                ![check-domain-availability](../../assets/img/using-wso2-identity-server/check-domain-availability.png)

            4.  If the domain is available, select **I agree to Terms and
                Conditions** and click **Register Domain** to register your
                new domain.

            5.  Once the domain is registered to your account, click the
                **Click here to login** button to test this out.

        !!! info 
            1.  Search for **My Domain** using the Quick Find search box and
                click **My Domain**.  
                You see the domain as follows: Your domain name is
                `                               <DOMAIN>-dev-ed.my.salesforce.com                             `
            2.  Make sure you enter the domain with an HTTPS prefix so that
                it resembles a URL:
                `               https://<DOMAIN>-dev-ed.my.salesforce.com              `
                .

    4.  Enter the **Client ID**. This is the Consumer Key obtained in
        [step 5 when configuring
        Salesforce](outbound-provisioning-with-salesforce#step5)
        .

        ??? note "Did not save the details? Click here for more information on getting the details."

            1.  Search for **App Manager** using the Quick Find search box
                and click **App Manager**.
            2.  Click the expand button for your Connected App and click
                **View**.  
                ![view-connected-app](../../assets/img/using-wso2-identity-server/view-connected-app.png) 
            3.  You are navigated to the page that has the Client ID and
                Client Secret of the app under **API (Enable OAuth
                Settings)**.

    5.  Enter the **Client Secret**. This is the Consumer Secret
        obtained in [step 5 when configuring
        Salesforce](outbound-provisioning-with-salesforce#step5)
        .
    6.  Enter the **Username**. This is the Salesforce username.
    7.  Enter the **Password**. This is the Salesforce password and
        must be entered along with the security token. So you would
        enter this in the following format:
        `             <password><security_token            ` \>  
        For example, if your password is
        `             testpassword            ` and your security token
        is `             37f37f4433123            `, the value you
        would enter here is
        `             testpassword37f37f4433123            `.

        ??? tip "Where can I get the security token?"
            1.  Log in to Salesforce: <https://login.salesforce.com/>
            2.  Click on your avatar and click My Settings. You are
                navigated to the Personal Information page.  
                ![salesforce-personal-info](../../assets/img/using-wso2-identity-server/salesforce-personal-info.png) 
            3.  On the left navigation, click **Reset My Security Token**
                .  
                ![reset-security-token](../../assets/img/using-wso2-identity-server/reset-security-token.png) 
            4.  Click **Reset Security Token**.  
                An email is sent to you with the new security token. Check
                the email of the email address you configured for
                Salesforce.  
                ![new-security-token](../../assets/img/using-wso2-identity-server/new-security-token.png) 
        

12. Click **Register**.

### Configuring WSO2 IS as the resident Service Provider

For this scenario, WSO2 Identity Server acts as the service provider, so
we need to add it as a resident service provider. For more information
on the resident service provider, see [Configuring a resident service
provider](../../using-wso2-identity-server/adding-and-configuring-a-service-provider#configuring-a-resident-service-provider)
.

1.  In the **Main** menu under the **Identity** section, click
    **Resident** under **Service Providers**.
2.  Expand the **Outbound Provisioning Configuration** in the screen
    that appears.
3.  Select the identity provider you configured from the drop down and
    click the (+).  
    ![idp-dropdown](../../assets/img/using-wso2-identity-server/idp-dropdown.png) 

    !!! info 
        If you enable **Blocking**, Identity Server will wait for the
        response from the Identity Provider to continue.

        If you enable **Enable Rules** and **Blocking,** will block the
        provisioning till the rule completely evaluate and get the response
        back to the WSO2 IDP. Afterwards, you need to enable the XACML
        policy. For more information, see [Rule Based
        Provisioning](../../using-wso2-identity-server/rule-based-provisioning)

4.  Click **Update**.

### Working with users

The next step is to check if Salesforce is configured properly with the
Identity Server. If you add a user to the Identity Server via the
management console, this user should also appear in Salesforce.

1.  On the **Main** tab in the Management Console, click **Add** under
    **Users and Roles**.
2.  Click **Add New User**.
3.  Enter the username in the form of an email and enter the password.
    
    !!! note
        Later on, if you want to update the user details, you
        won't be able to update the email address.

4.  Assign a role to the user.  
    ![role-assigning](../../assets/img/using-wso2-identity-server/role-assigning.png) 
5.  Click **Finish**.
6.  <a name="usershown"></a>In Salesforce, log into <https://login.salesforce.com/> .  
    On the left navigation pane, expand **Users** and click **Users**.
    You will see that the user you created in the Identity Server has
    been added to Salesforce as well.  
    ![salesforce-user-addition](../../assets/img/using-wso2-identity-server/salesforce-user-addition.png) 

**Adding a user using SCIM.**

You can also add users to Salesforce using SCIM.  If you use SCIM you
must do the following.

1.  In the **Main** menu under the **Identity** section, click
    **Resident** under **Identity Providers**.
2.  Expand the **Inbound Provisioning Configuration** in the screen that
    appears.  
    ![expand-inbound-provisioning](../../assets/img/using-wso2-identity-server/expand-inbound-provisioning.png) 
3.  Select the correct SCIM user endpoint and use it in the cURL
    command.  
    The following is a sample cURL command to add users.

    ``` java
    curl -v -k --header "Content-Type:application/json" --user samuel@wso2.com:password --data '{"schemas":     ["urn:scim:schemas:core:1.0"],"userName":"samuel@wso2.com","password":"test25","name":{"familyName":"Gnaniah"},"emails":     ["samuel@wso2.com"],"entitlements":     [{"value":"00e90000001aV2o","display":"ChatterFreeUser"}]}' https://localhost:9443/wso2/scim/Users  
    ```
