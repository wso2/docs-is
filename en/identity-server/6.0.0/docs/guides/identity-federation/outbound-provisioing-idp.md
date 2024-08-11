# Introduction

You can configure the WSO2 Identity Server to provision users to external applications.

See the [Identity Server Architecture]({{base_path}}/references/architecture/architecture) for more information on how this process
fits into the overall picture.

## Prerequisites
You need to [register an identity provider]({{base_path}}/guides/identity-federation/add-idp) on the Identity Server.

## Configure outbound provisioning connectors

To configure outbound provisioning connectors:

1. On WSO2 Identity Server Management Console, go to **Main > Identity > Identity Providers** section.
2. Click **List**, select the identity provider you want to enable Outbound provisioning on, and click on the corresponding **Edit** link.
3. Expand **Outbound Provisioning Connectors**, and select the connector that you would like to configure. Following are outbound provisioning connectors available.

    1. [Google outbound provisioining connector](#configure-google-provisioning)
    2. [Salesforce outbound provisioining connector](#configure-salesforce-provisioning)
    3. [SCIM 1.1 outbound provisioining connector](#configure-scim-provisioning)
    4. [SCIM 2.0 outbound provisioning connector](#configure-scim-provisioning)

### Configure Google provisioning

To configure Google outbound provisioning:

1. Expand **Google Provisioning Configuration** section.
  ![google-provisioning]({{base_path}}/assets/img/guides/google-provisioning.png)
2. Fill in the following fields where relevant. The table contains all the configurations that can be done for Google outbound provisioning.

    | Field | Description | Sample Value  |
    |-------|-------------|---------------|
    | Enable Connector| Select this to enable identity provisioning through Salesforce.| Selected|
    | Google Domain| The name of the Google domain used to provision users.| `mygoogledomain.com`|
    | Primary Email| Claim URI which will be used to retrieve the primary email address for the account to be created. This must be a claim that is available and local in the Identity Server.| `http://wso2.org/claims/emailaddress`|
    | Given Name| The Claim URI used to retrieve the given name attribute for the user. This must be a claim that is available and local in the Identity Server.| `http://wso2.org/claims/givenname`|
    | Family Name| Claim URI which will be used to retrieve the family name attribute for the user. This must be a claim that is available and local in the Identity Server.| `http://wso2.org/claims/lastname`|
    | Service Account Email| This email is used for authentication purposes.| `d343s86gf@developer.gserviceaccount.com`|
    | Private Key| Browse and attach the private key from your local machine. This is the PKCS12 private key generated at the service account creation| <uploaded_file>|
    | Administrator's Email| This is the email of the administrator who owns the service account in the Google Domain specified. Provisioning takes place using this email.| `om@mygoogledomain.com`|
    | Application Name| This is the name of the application which is used to represent the Google connector.|`Domain`|
    | Google Outbound Provisioning pattern| This pattern is used to build the user ID of the Google domain. A combination of attributes UD (User Domain), UN (Username), TD (Tenant Domain), and IDP (Identity Provider) can be used to construct a valid pattern.| `{UD, UN, TD, IDP}`|
    | Google Provisioning Separator| This is used to separate the values you configure in the Google Outbound Provisioning pattern.|`_`|

4. Select **Enable Connector** to enable identity provisioning from Goolgle.
5. Click **Update** to save the configurations.

    ??? note "Google Outbound Provisioning pattern"
        By using **Google Outbound Provisioning pattern** you differentiate the following scenarios:

          - If there are several tenants and you must configure Google outbound provisioning for the same Google domain in those tenants.
          - If there are several user stores and you must configure the specific user store that needs to be provisioned.
          - If there are multiple identity providers configured for the same Google domain.

### Configure Salesforce provisioning

This configuration involves setting up the Identity Server to send
provisioning requests to Salesforce.

1. Expand the **Salesforce Provisioning Configuration** form.  
    ![salesforce-provisioning]({{base_path}}/assets/img/guides/salesforce-provisioning.png)
2. Fill in the following fields where relevant. The table contains all the configurations that can be done for Salesforce outbound provisioning.

    | Field | Description | Sample Value  |
    |-------|-------------|---------------|
    | Enable Connector| Select this to enable identity provisioning through Salesforce.| Selected|
    | API version| This is the version of the Salesforce API that is used for provisioning. | `v32.0`|
    | Domain Name| The name of the Salesforce domain used to provision users.| `https://identityprovisioning-dev-ed.my.salesforce.com/`|
    | Client ID| This is the username of the client you are using to access Salesforce. This Consumer Key value is obtained when configuring Salesforce.| `3MVG8123wefw763na2452683KJNsvrgKBwe4gyksKJ22f3g45`|
    | Client Secret| This is the password of the client you are using to access Salesforce. This Consumer Secret value is obtained when configuring Salesforce.|`<password>`|
    | Username| This is the Salesforce username.| `samuel@wso2.com`|
    | Password| This is the Salesforce password and must be entered along with the security token.| <password><security_token>|
    | OAuth2 Token Endpoint| OAuth token endpoint URL of Salesforce.| `https://login.salesforce.com/services/oauth2/token`|
    | Provisioning Pattern| This pattern is used to build the user id of the Salesforce domain. A combination of attributes UD (User Domain), UN (Username), TD (Tenant Domain), and IDP (Identity Provider) can be used to construct a valid pattern.| `{UD, UN, TD, IDP}`|
    | Provisioning Separator| This is used to separate the values you configure in the Salesforce Outbound Provisioning pattern.| `_`|
    | Provisioning Domain| The user name of Salesforce is an email address. Here you can configure a specific domain name the username should have.| `yahoo.com`|

3. Select **Enable Connector** to enable identity provisioning from Salesforce.
4. Click **Update** to save the configurations.

    ??? note "Salesforce Outbound Provisioning pattern"
        By using **Sales Outbound Provisioning pattern** you differentiate the following scenarios:

          - If there are several tenants and you must configure Salesforce outbound provisioning for the same Salesforce domain in those tenants.
          - If there are several user stores and you must configure the specific user store that needs to be provisioned.
          - If there are multiple identity providers configured for the same Salesforce domain.


    ??? note "Obtain Salesforce version"
        To obtain this:

        1. Log into <a href="https://developer.salesforce.com/signup">https://developer.salesforce.com/</a>.
        2. Click **Setup** .
        3. On the left navigation pane, click **API** under **Develop**. 
        4. Generate one of the APIs to check the version.


    ??? Note "Create a salesforce domain"
        To create a salesforce domain:

        1. Log in to <a href="https://developer.salesforce.com/signup">https://developer.salesforce.com/</a>.
        2. Click **Setup**.
        3. On the left navigation pane, click **My Domain** under **Domain Management**.
        4. Enter a Domain. Make sure you enter the domain with an HTTPS prefix to resemble a URL.


    ??? note "Claim configuration for Salesforce"
        The following claims must be configured when configuring Salesforce for outbound provisioning.

          -   Email
          -   EmailEncodingKey
          -   LanguageLocaleKey
          -   LastName
          -   LocaleSidKey
          -   ProfileId
          -   TimeZoneSidKey
          -   Username
          -   UserPermissionsCallCenterAutoLogin
          -   UserPermissionsMarketingUser
          -   UserPermissionsOfflineUser

  See [outbound provisioning with Salesforce]({{base_path}}/guides/identity-lifecycles/outbound-provisioning-with-salesforce) for more information on how this is configured from end to end.

### Configure SCIM provisioning

This configuration involves setting up the Identity Server to send
provisioning requests to an external application that supports SCIM 1.1 or SCIM 2.0.

1. Expand **SCIM 1.1 Provisioning Configuration** section or **SCIM 2.0 Provisioning Configuration** section as required.
    ![scim-provisioning]({{base_path}}/assets/img/guides/scim-provisioning.png)
2. Enter the required fields. The table contains all the configurations that can be done for both SCIM 1.1 and SCIM 2.0 outbound provisioning.

    | Field                        | Description                                                                                                                                                                                                                                                                                               | Sample value                            |
    |------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|
    | Enable Connector             | Selecting this enables identity provisioning through SCIM.                                                                                                                                                                                                                                                | Selected                                |
    | Username                     | This is the username of the SCIM application.                                                                                                                                                                                                                                                             | `Admin`                                   |
    | Password                     | This is the password of the SCIM application.                                                                                                                                                                                                                                                             | `\<password\>`                            |
    | User Endpoint                | This is the SCIM endpoint of the users.                                                                                                                                                                                                                                                                   | For SCIM 1.1: `https://localhost:9443/wso2/scim/Users` </br> For SCIM 2.0: `https://localhost:9443/scim2/Users`  |
    | Group Endpoint               | This is the SCIM endpoint of the groups.                                                                                                                                                                                                                                                                  | For SCIM 1.1: `https://localhost:9443/wso2/scim/Groups` </br> For SCIM 2.0: `https://localhost:9443/scim2/Groups`  |
    | User Store Domain            | This is the user store that users are created. You can specify any user store connected to your identity provider.                                                                                                                                                                                        | Domain                                  |
    | Enable Password Provisioning | This is to specify whether to send a default password or the password sent in the SCIM request, to the server where it gets provisioned. In a scenario where the Identity Server is used as a proxy, and sending the password to some other server is not appropriate, the default password can be sent. | Selected                                |
    | Default Password             | The default password that must be sent.                                                                                                                                                                                                                                                                   | `\<password\>`                            |

4. Select **Enable Connector** to enable identity provisioning from SCIM.
5. Click **Update** to save the configurations.

See [outbound provisioning with SCIM]({{base_path}}/guides/identity-lifecycles/outbound-provisioning-with-scim) for more information on how this works in a typical scenario.

<!-- ## Configure SPML provisioning

The Service Provisioning Markup Language (SPML) is the open standard for
the integration and interoperation of service provisioning requests. The
goal of SPML is to allow organizations to securely and quickly set up
user interfaces for Web services and applications, by letting enterprise
platforms such as Web portals, application servers, and service centers
generate provisioning requests within and across organizations

This configuration involves setting up the Identity Server to send
provisioning requests to an external application that supports SPML. See
[Outbound Provisioning with SPML]({{base_path}}/learn/outbound-provisioning-with-spml) for
more information on how this works in a typical scenario.

1. On WSO2 Identity Server Management Console, go to **Main > Identity > Identity Providers** section.
2. Click **List**, select the identity provider you want to enable outbound provisioning on, and click on the corresponding **Edit** link.
3. Expand the **SPML Provisioning Configuration** form.  
    ![spml-provisioning]({{base_path}}/assets/img/guides/spml-provisioning.png)
4. Fill in the following fields where relevant.

    | Field            | Description                                                                                                                                 | Sample value                        |
    |------------------|---------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------|
    | Enable Connector | Selecting this enables identity provisioning through SPML.                                                                                  | Selected                            |
    | Username         | This is the username of the SPML application.                                                                                               | Configadmin                         |
    | Password         | This is the password of the SPML application.                                                                                               | \<password\>                        |
    | SPML Endpoint    | This is the SPML endpoint URL.                                                                                                              | http://localhost:9847/servelet/spml |
    | SPML ObjectClass | The ObjectClass for SPML. This value is required as it links with the ObjectClass in SPML that is used to provide data from the user store. | spml2person                         |
-->

!!! info "Custom Connectors"
    In addition to this, you can also create [custom connectors]({{base_path}}/references/extend/provisioning/write-an-outbound-provisioning-connector) that are added to the list of outbound provisioning connectors once created.