# Configuring Outbound Provisioning 

Provisioning is the process of creating, maintaining, and deleting digital identities (accounts) for users of a system(s) and linking appropriate rights to identities in the form of rules and roles. 

This section of the tutorial demonstrates configuring Salesforce as the identity provider to provision users from WSO2 Identity Server. This means that once this is configured, new users that are added to WSO2 Identity Server are added to Salesforce as well. 

## Scenario

Pickup is a cab company that is expanding and is about to hire a new sales team. The drivers employed at Pickup use an application called **Pickup Dispatch** to manage their taxi orders and daily operations. Pickup maintains its employee user accounts using WSO2 Identity Server and has already set up outbound provisioning between WSO2 Identity Server and Pickup Dispatch for the drivers. The new sales team will need to access **Pickup Dispatch** as well but they will also need to use a **Salesforce** application to manage their daily sales activities.

Pickup now needs to set up outbound provisioning between WSO2 IS and the **Salesforce** application so that whenever a new sales team member is hired and the user account is added to WSO2 IS, the user will be automatically provisioned to **Pickup Dispatch** as well as **Salesforce**.


## Set up Salesforce

1. Log in to [Salesforce Developer](https://login.salesforce.com/)

    !!! info
        If you do not have a Salesforce account, [sign up for Salesforce](https://developer.salesforce.com/signup).

2. Click **Platform Tools > Apps > App Manager**. 

3. Click **New Connected App** found on the top-right corner of the screen. This connected app will be the Salesforce application to which WSO2 IS users are provisioned to. 


4. Fill the relevant fields.
    - Connected App Name: Give a suitable name for the connected app (e.g., `WSO2ISProvisioning`).
    - API Name: This should be the same as the `Connected App Name` (e.g., `WSO2ISProvisioning`).
    - Contact Email: Enter a valid email address.
    - Enable OAuth Settings: Select the checkbox.
    - Callback URL: https://login.salesforce.com/services/oauth2/token
    - Selected OAuth Scopes: Select **Full Access (Full)** under **Available OAuth Scopes** and click **Add**. 
   
    ![salesforce-add-connected-app](../assets/img/learn/salesforce-add-connected-app.png)<a name="step5"></a>
      

5. Click **Save > Continue** to save the connected app. 

    !!! note
        Note the Consumer Key, Consumer Secret, and Callback URL that appears as you will need it later on in the tutorial. 
        <a name="step7"></a>

6. Next, connect the connected app to the profile that you are going to use. This profile will be used to add users from WSO2 Identity Server to Salesforce.
    1.  Click **Administration > Users > Profiles**.
    2.  Click **Edit** next to **Chatter Free User**. 
    3.  Select the connected app you created under **Connected App Access** and click **Save**. 

    !!! note
        Note the profile address URL of the Chatter Free User as you will need it later on in the tutorial. It should look similar to the following.
        
        ```xml
        https://ap16.lightning.force.com/lightning/setup/EnhancedProfiles/page?address=%2F00e2w0000018evW
        ```


7. Get the public certificate for Salesforce:
    1. Click **Settings > Security > Certificate and Key Management**. 
    2. Click **Create Self-Signed Certificate**. 
    3. Specify the `Label` and `Unique Name` for the certificate. 
    4. Click **Save** and then click **Download Certificate**.
        
## Set up WSO2 Identity Server

1. [Download WSO2 Identity Server](https://wso2.com/identity-and-access-management/).

2. Since Salesforce usually uses an email address as the user name, configure WSO2 IS to use email address as the user name as well.
   
    !!! info
        For instructions on how to do this, see [Using Email Address as the Username](../../learn/using-email-address-as-the-username).

3. Start the server and log in to the [WSO2 Identity Server Management Console](https://localhost:9443/carbon) using the admin credentials configured in the `deployment.toml` file under `[super_admin]`. 

4. Click **Identity Providers > Add**. 

5. Enter an **Identity Provider Name** such as "Salesforce.com".

6. Select **Upload IDP certificate** and upload the certificate that you downloaded in [step 7](#step7) when setting up Salesforce.

    !!! note
        Ensure that the certificate is in `.pem` format. 

7. Expand **Claim Configuration > Basic Claim Configuration** and select **Define Custom Claim Dialect**. 

8. Click **Add Claim Mapping** and add the following claim mappings. 

    | **Identity Provider Claim URI**        | **Local Claim URI**                                |
    |------------------------------------|-------------------------------------------------|
    | Alias                              | http://wso2.org/claims/givenname                |
    | Email                              | http://wso2.org/claims/emailaddress             |
    | EmailEncodingKey                   | http://wso2.org/claims/otherphone               |
    | LanguageLocaleKey                  | http://wso2.org/claims/dob                      |
    | LastName                           | http://wso2.org/claims/lastname                 |
    | LocaleSidKey                       | http://wso2.org/claims/primaryChallengeQuestion |
    | ProfileId                          | http://wso2.org/claims/role                     |
    | TimeZoneSidKey                     | http://wso2.org/claims/challengeQuestion1       |
    | UserPermissionsCallCenterAutoLogin | http://wso2.org/claims/telephone                |
    | UserPermissionsMarketingUser       | http://wso2.org/claims/mobile                   |
    | UserPermissionsOfflineUser         | http://wso2.org/claims/country                  |
    | Username                           | http://wso2.org/claims/emailaddress             |

9. Expand **Advanced Claim Configuration** and add the values for each of these claims one by one. 

    | **Identity Provider Claim URI**       | **Value**               |
    |------------------------------------|---------------------|
    | Alias                              | User                |
    | Email                              | user@wso2.com       |
    | EmailEncodingKey                   | UTF-8               |
    | LanguageLocaleKey                  | en_US               |
    | LastName                           | Jackson             |
    | LocaleSidKey                       | en_US               |
    | ProfileId                          | 2F00e6F000003nIYI   |
    | TimeZoneSidKey                     | America/Los_Angeles |
    | UserPermissionsCallCenterAutoLogin | false               |
    | UserPermissionsMarketingUser       | false               |
    | UserPermissionsOfflineUser         | false               |
    | Username                           | user@wso2.com       |

10. Expand **Outbound Provisioning Connectors > Salesforce Provisioning Connector**. Fill the relevant fields. 
    1. Select **Enable Connector** to enable Salesforce provisioning.
    2. Enter the **API version**. This refers to the Salesforce API version you are using. Follow the steps below to get the API version.
       
        ??? note "Get API version: Click to expand"
            1. Log in to [Salesforce](https://login.salesforce.com).
            2. Search for "API" on the Quick Find search box and click **API** on the search results. 
            3. Generate any of the WSDLs to see the API version. On the top of the WSDL you will see text similar to the following from which you can get the Salesforce API version. 
            ``` xml
            Salesforce.com Enterprise Web Services API Version 45.0
            ```

            4. Enter this value as the **API Version** in WSO2 Identity Server in the following format: "V<version number>".
               <br/>For example `v45.0`.

    3. Create a Salesforce domain if you do not already have one and enter the **Domain Name**. Follow the steps given below to create one. Make sure that you add the `https://` prefix to the **Domain Name** as shown in the example given below. 

        ```xml
        https://wso2-dev-ed.my.salesforce.com
        ```

        ??? note "Create Salesforce domain: Click to expand"
            1. Log in to [Salesforce](https://login.salesforce.com).
            2. Search for "My Domain" on the Quick Find search box found on the left navigation panel and click **My Domain**.
            3. Enter a name for your domain. You can check if the domain name is available by clicking **Check Availability**. 
            4. Click **Register** to register your new domain. Your domain name will be similar to the following: `wso2-dev-ed.my.salesforce.com`.
            5. Once the domain is registered, Salesforce will take 2 minutes to test it. Once this is done, click **Click here to Login** to test it out yourself. 
    
    4. Enter the **Client ID**. This value is the **Consumer Key** you received in [step 5](#step5) when setting up Salesforce. 

    5. Enter the **Client Secret**. This value is the **Consumer Secret** you received in [step 5](#step5) when setting up Salesforce and it must be entered along with the security token (i.e, this would be entered in the following format: `<password><securitytoken`>). Follow the steps below to get the security token.
       
        ??? note "Get security token: Click to expand"
            1. Log in to [Salesforce](https://login.salesforce.com).
            2. Click on your avatar icon on the top-right corner of the screen and click **Settings**. You are directed to the **Personal Information** page. 
            3. On the left navigation panel click **Reset My Security Token**. 
            4. Click **Reset Security Token**. An email will be sent to the email address which you used to register for Salesforce. 


    6. Click **Register** to register the identity provider. 

    ## Configuring WSO2 IS as the resident service provider

    For outbound provisioning, WSO2 Identity Server acts as the service provider. Follow the steps below to configure the resident service provider.

    1. On the Management Console, click **Identity > Service Providers > Resident**.
    2. Expand **Outbound Provisioning Configuration** on the screen that appears.
    3. Select the identity provider you set up in the previous section from the dropdown list and click the (+) icon.
    4. Click **Update**. 

    You have now successfully set up WSO2 Identity Server and Salesforce for outbound provisioning. This means that if you add a user to WSO2 IS via the Management Console, the user should also appear in Salesforce. Follow the steps given in the next section to try this out. 

    ## Try it out

    1. On the Management Console, click **Users and Roles > Add** and click **Add New User**. 
    2. Enter a user name in email address format (e.g., user@wso2.com) and a password. 
    3. Assign a role to the user and click **Finish**.
    4. Log in to [Salesforce](https://login.salesforce.com/).
    5. On the left navigation panel, expand **Users** and click **Users**. You will see that the user you created in WSO2 IS has also been created in Salesforce. 


