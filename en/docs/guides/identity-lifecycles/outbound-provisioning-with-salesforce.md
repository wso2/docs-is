# Configure Outbound Provisioning with Salesforce

The WSO2 Identity Server (WSO2 IS) has the ability to provision users
into different domains like Salesforce, Google, Facebook, etc., using
its [identity provisioning framework](../../../references/concepts/provisioning-framework/).

This topic provides instructions on how to configure Salesforce as the
Identity Provider to provision users from WSO2 Identity Server. The
service provider in this scenario is WSO2 Identity Server. When WSO2 IS
is the service provider, it is configured as the resident Service
Provider. Therefore, after completing this tutorial you can see the
users you add using WSO2 Identity Server being created in Salesforce
too.

-----

## Configure Salesforce

1.  Sign up as a Salesforce developer.
    1.  Fill out the relevant information found in the following URL:
        <https://developer.salesforce.com/signup>
    2.  Click **Sign me up**.
    3.  Click **Allow** to enable Salesforce to access your basic
    information. This message pops up only when you log in to Salesforce
    for the first time.

    !!! note    
        This document is explained using the Salesforce lightning theme. If
        you are using the classic theme, click **Switch to Lightning Experience** on the top panel. 

        ![lighteninig-experience](../../../assets/img/guides/switch-to-lightening.png)

        You will be navigated to the lightening theme of Salesforce.

        ![welcome-to-lightening.png](../../../assets/img/guides/welcome-to-lightening.png) 

4.  Once you are logged in, add a connected app. Follow instructions
    below on how to do this. 

    1. Expand the **Apps** options in the left panel and click on **App Manager**. 

    2. Click on **New Connected App**. 

       ![connected-app](../../../assets/img/guides/connected-app.png) 

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
        <p>Choose <strong>Full access (full)</strong> from the <strong>Available OAuth Scopes</strong> and click the button under <strong>Add</strong>. This gives the necessary permissions when accessing this app.</p>
        <div>
        <div class="user-content-block">
        <p>These scopes refer to permissions the user gives to the connected app while it is running. The OAuth token name is in parentheses.<br />
        Full access (full) allows access to the logged-in user’s data, and encompasses all other scopes. Full does not return a refresh token. You must explicitly request the refresh_token scope to get one.</p>
        </div>
        </div>
        </div></td>
        </tr>
        </tbody>
        </table>

        ![new-connected-app](../../../assets/img/guides/fill-connected-app.png) 

    4.  Click **Save** > **Continue** to add the connected app.

5.  <a name ="step5"></a>The resulting screen displays key information that you will need to
    configure WSO2 IS to Salesforce.  
    Make a note of the following details as you need them in upcoming
    configurations.

    1.  Consumer Key
    2.  Consumer Secret (Click the **Click to reveal** link to view the
        consumer secret)
    3.  Callback URL

    !!! info
        **Consumer Key** : A value used by the consumer to identify itself
        to Salesforce. Referred to as `client_id` in OAuth 2.0.
        **Consumer Secret** : A secret used by the consumer to establish
        ownership of the consumer key. Referred to as `client_secret` in
        OAuth 2.0.

    ![consumer-secret](../../../assets/img/guides/connected-app-screen.png) 

6.  <a name="step6"></a>Add your connected app to the profile you are going to use. This is
    necessary as this profile is used when you add users in to
    Salesforce from the Identity Server.

    !!! note
        Allow from 2-10 minutes for your changes to take effect on the
        server before using the connected app.
    
    1.  Expand **Users** in the **Administration** section of the left hand panel and click **Profiles**. A list of existing
        profiles can be viewed.  
        ![user-profiles](../../../assets/img/guides/profiles.png) 

    2.  As an example, if you use the profile “Chatter Free User”, click
        **Edit** and select the connected app you created to configure
        with the Identity Server using the provided checkbox.  
         
        ![select-connected-app](../../../assets/img/guides/example-app.png) 

    3.  Click **Save**. Make a note of the profile ID (or address URL obtained from the address bar in your browser)
        of the Chatter Free User profile.

        !!! tip
            Copy the URL and decode it using a URL decoder like [urldecoder.org]. 

            ![decoder-online](../../../assets/img/guides/decoder-online.png)

        
            In this case `             00e2x000001AT3y            ` is your
            profile ID.
        

7.  <a name="public"></a>Get the public certificate for Salesforce. Do the following in order
    to achieve this.

    !!! info 
        For more information on generating the certificate, see the [Salesforce
        documentation](https://help.salesforce.com/articleView?id=security_keys_creating.htm&type=0).

    1.  In the left navigation panel, Expand **Security** and click
        **Certificate and Key Management** or you can search for
        Certificate and Key Management in the Quick Find search box.  

    2.  Click **Create Self-Signed Certificate**.
    3.  Enter the **Label** and a **Unique Name** and click **Save**.
        The certificate is generated.  
        ![self-signed-certificate](../../../assets/img/guides/add-certificate.png) 
    4.  Click the **Download Certificate** button to download the
        certificate.

---

## Configure email address as the username

Provisioning is the process of coordinating the creation of user
accounts, e-mail authorizations in the form of rules and roles, and
other tasks such as provisioning of resources associated with enabling
new users.

When you log into Salesforce, you normally use an email address. So, to integrate this with the Identity Server, you need to configure WSO2 IS to enable users to log in using their email addresses. In order to do that, follow the steps given below.

{! fragments/enable-email-as-username.md !}

---

## Configure Salesforce as the Identity Provider

1.  Start the WSO2 Identity Server if it is not started up already and
    log in using the email you configured in the realm as instructed in the above section.
2.  On the Management Console, navigate to **Main** > **Identity** > **Identity Providers** > **Add**.
3.  In the form that appears, provide a name for your identity provider
    by filling in the **Identity Provider Name**. You can use
    "Salesforce.com" as an example, but this can be any name you choose.
    
4.  Upload the Salesforce public certificate that you generated and
    saved in [step 5 under Configure Salesforce](#public)
    .  
    Do this by selecting **Upload IDP certificate** and clicking the
    **Choose File** button next to **Identity Provider Public
    Certificate**.

    !!! info "Why is the certificate needed?"

        The Identity Provider's public certificate is used for SSL
        communication, to verify the signed data that comes from the
        Identity Provider and to send encrypted data to the Identity
        Provider.

    ![idp-public-certificate](../../../assets/img/guides/idp-public-certificate.png) 

5.  Expand the **Claim Configuration** section of the form, followed by
    the **Basic Claim Configuration** section, and select **Define
    Custom Claim Dialect**.

    !!! info 
        We are adding a claim map in order to provision the users claim
        values to salesforce when outbound provisioning users to salesforce
        via WSO2 Identity Server. Here, the **Identity Provider Claim URI**
        is the claim URI in Salesforce, which maps local claim URI in WSO2
        Identity Server. Read more about [Claim
        Management](../../../guides/dialects/configure-claims/).

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

    ![add-claim-mapping](../../../assets/img/guides/add-claim-mapping.png) 

7.  Expand the **Advanced Claim Configuration** section.
8.  Select the Claim URI you added from the **Provisioning Claim
    Filter** dropdown and click **Add Claim**.  
    ![provisioning-claim-filter](../../../assets/img/guides/provisioning-claim-filter.png) 
9.  For each Claim URI, enter a default value as shown in the following
    table. The default values are used when creating the role in
    Salesforce.  
    For example, the alias, email, profile ID and all the values listed
    below are shown when a user is
    created.  
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
    <p><code>                 00e90000001aV2o                                 </code> The users that are added using WSO2 Identity Server are added to this profile in Salesforce. For more information on the context of profiles in Salesforce, see the <a href="http://www.salesforcetutorial.com/working-profiles-salesforce/">Salesforce tutorial</a>.</p>
    <div class="admonition tip">
    <p class="admonition-title">Tip</p>
    <p>The <strong>ProfileId</strong> value refers to the ID of the profile you created in Salesforce <a href="#step6">step 6 of Configuring Salesforce</a>. If it is the Chatter Free User profile you created, navigate to the profile in Salesforce to find the profile ID. You can do this by clicking <strong>Profiles</strong> under <strong>Manage Users</strong> in Salesforce and clicking Chatter Free User.</p>
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

    ![advanced-claim-config](../../../assets/img/guides/advanced-claim-config.png) 

10. Expand the **Outbound Provisioning Connectors** section followed by
    the **Salesforce Provisioning Configuration** section.
11. Do the following configurations for Salesforce provisioning. <!--For more information on any of these fields, see [Configuring Salesforce provisioning](../../learn/configuring-outbound-provisioning-connectors-for-an-identity-provider#configuring-salesforce-provisioning).-->
    
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
            format: `              v<VERSION_NUMBER>             `. For
            example: `              v41.0             `.
    3.  Enter the **Domain**. If you do not have a Salesforce domain,
        you need to create a domain by logging into
        [https://login.salesforce.com](https://login.salesforce.com/).

        ??? note "Click here for more information on creating the domain on Salesforce."

            1.  Search for My Domain in the search bar that is on the left
                navigation panel.  
                ![my-domain](../../../assets/img/guides/my-domain.png) 
            2.  Click **My Domain**.
            3.  In the page that appears, come up with a name for your
                domain. You can check if the domain is available by clicking
                the **Check Availability** button.
                !!! info 
                    For the page given below to load on your browser, make sure
                    that the Salesforce cookies are not blocked.
                ![check-domain-availability](../../../assets/img/guides/check-domain-availability.png)

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
        Salesforce](#step5)
.

        ??? note "Did not save the details? Click here for more information on getting the details."

            1.  Search for **App Manager** using the Quick Find search box
                and click **App Manager**.
            2.  Click the expand button for your Connected App and click
                **View**.  
                ![view-connected-app](../../../assets/img/guides/view-connected-app.png) 
            3.  You are navigated to the page that has the Client ID and
                Client Secret of the app under **API (Enable OAuth
                Settings)**.

    5.  Enter the **Client Secret**. This is the Consumer Secret
        obtained in [step 5 when configuring
        Salesforce](#step5)
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
                ![salesforce-personal-info](../../../assets/img/guides/salesforce-personal-info.png) 
            3.  On the left navigation, click **Reset My Security Token**
.  
                ![reset-security-token](../../../assets/img/guides/reset-security-token.png) 
            4.  Click **Reset Security Token**.  
                An email is sent to you with the new security token. Check
                the email of the email address you configured for
                Salesforce.  
                ![new-security-token](../../../assets/img/guides/new-security-token.png) 
        

12. Click **Register**.

---

## Configure WSO2 IS as the resident Service Provider

{! fragments/resident-sp.md !}

---

## Add a user using SCIM.

You can also add users to Salesforce using SCIM.

Select the correct SCIM user endpoint given in **Resident** > **Inbound Provisioning Configuration** and use it in the curl command.  
    The following is a sample cURL command to add users.

```curl
curl -v -k --header "Content-Type:application/json" --user kim@wso2.com:password --data '{"schemas":     ["urn:scim:schemas:core:1.0"],"userName”:”kim@wso2.com","password”:”test123”,”name":{"familyName”:”paul”},”emails":     [“kim@wso2.com"],"entitlements":     [{"value":"00e2x000001AT3y","display":"ChatterFreeUser"}]}' https://localhost:9443/wso2/scim2/Users  
```

You can see that the user has been created in the "Users" section in salesforce.

![salesforce-user](../../../assets/img/guides/salesforce-user.png)

----

!!! info "Related topics"
    - [Concept: Identity Provisioning Framework](../../../references/concepts/provisioning-framework/)
    - [Guide: Configure Just-In-Time Provisioning for an Identity Provider](../jit-workflow/)


