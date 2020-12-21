# Outbound Provisioning with Google

The WSO2 Identity Server (WSO2 IS) has the ability to provision users
into different domains like Salesforce, Google, Facebook, etc., using
its [identity provisioning
framework](../../get-started/provisioning-architecture)
.

This topic provides instructions on how to configure Google as the
Identity Provider to provision users from WSO2 Identity Server. The
service provider in this scenario is WSO2 Identity Server(WSO2 IS).
When WSO2 Identity Server is the service provider, it is configured as
the resident Service Provider. Therefore, after completing this tutorial
you can see the users you add using WSO2 Identity Server being created
in Google too.

!!! tip "Before you begin!"
    -   You need to have a Google domain. Click
        [here](https://www.bettercloud.com/monitor/the-academy/create-google-apps-domain-three-easy-steps/)
        for more information on creating the domain.
    
---

## Configuring Google

In this section, you are going to create a service account using the
Google domain you created before you started this guide. 


1.  Open the [Google developers console](https://console.developers.google.com/cloud-resource-manager) to create a new project.

    ![create-a-new-project](../assets/img/learn/create-project.png)

2.  Create a new project:

    1.  Click **CREATE PROJECT** on the top of the page.

    2.  Provide a name for your project and click **Create**.

    ![add-project-name](../assets/img/learn/new-project-google.png) 

3.  Search for the project you created and click it.

4.  Create a service account for the project you created.

    1.  Click **IAM and admin \> Service accounts**.

    2.  Click **Create service account** on the top panel.  
        ![create-service-account](../assets/img/learn/service-account.png) 

    3.  Fill in the form to create the service account:

        -   Provide a service account name and click on **Create**.

            ![add-account-name](../assets/img/learn/service-account-name.png)
        
        -   Optionally, assign a role from the list of roles given. 
        -   Click on **Continue**.
        -   Click on **Create Key**.

            ![create-key](../assets/img/learn/create-key.png)

        -   Choose your key type as `P12` and click on **Create**. 

    4.  <a name="create"></a>Click CREATE.  
        The Service account and key created message is displayed and
        the service account's `P12` file is downloaded to your machine.

        ![key-created](../assets/img/learn/key-created.png)
        
        !!! info 
            Remember the location and name of this downloaded file as
            it is required later on in this guide.

5.  Get the Client ID of the service account.
    1.  Click **IAM and admin \> Service accounts**. Choose **Edit** from the action items corresponding to the service account you just created. 
        ![edit-service-account](../assets/img/learn/choose-edit.png) 

    2.  Click on **Show domain-wide delegation**. 
    
    3.  Select **Enable G Suite Domain-wide Delegation**, give a product name of your choice, and click **SAVE**. 

        ![enable-g-suite-domain-wide-delegation](../assets/img/learn/enable-domain-wide-delegation.png)

    4.  <a name="copy"></a>Click **View Client ID** and copy the value for the Client ID.  
        ![copy-client-id](../assets/img/learn/view-client-id.png)

6.  Manage the API client access:
    1.  Go to your domain's admin console via <https://admin.google.com>.
    2.  Click **Security**.

        ![admin-console-security](../assets/img/learn/admin-console-security.png) 

    3.  Click **Advanced settings \> Manage API client access**.
    4.  Fill the following values:
        1.  Paste the [Client ID value you copied previously](#copy)
            as the value for Client Name.
        2.  Enter
            `                             https://www.googleapis.com/auth/admin.directory.user,https://www.googleapis.com/auth/admin.directory.orgunit,https://www.googleapis.com/auth/admin.directory.group                           `
            as the value for scopes.
        3.  Click **Authorize**.

        ![manage-api-client-access](../assets/img/learn/manage-api-client.png) 

7.  Enable Admin SDK.
    1.  Open the [Google developers console](https://console.developers.google.com/cloud-resource-manager).
    2.  Click the menu icon, and click **APIs & Services** > **Dashboards**.
    2.  Click on **Enable APIs AND Services**.  
    3.  Search for Admin SDK and click **Enable**.

        ![admin-sdk](../assets/img/learn/admin-sdk.png)


## Configuring the Identity Server to use email address as the username

Provisioning is the process of coordinating the creation of user
accounts, e-mail authorizations in the form of rules and roles, and
other tasks such as provisioning of resources associated with enabling
new users.

1.  Download the WSO2 Identity Server from
    [here](http://wso2.com/products/identity-server/).
2.  <a name= "email"></a>When you log into Google, you normally use an email address. So, to
    integrate this with the Identity Server, you need to configure WSO2
    IS to enable users to log in using their email addresses. In order
    to do that, follow the steps found in the [Using Email Address as
    the
    Username](../../learn/using-email-address-as-the-username)
    topic.
3.  Restart the Identity Server. Since the username and password of the
    admin user were updated, start the WSO2 IS server using the -Dsetup
    parameter as shown in the command below.

    ``` java
    sh wso2server.sh -Dsetup
    ```

Now that you are done with configuring WSO2 Identity Server to use the
email address, configure the identity provider and the service provider.

---

## Configuring Google as the Identity Provider

This section includes steps on how to register Google as an Identity
Provider.

1.  Start the WSO2 Identity Server if it is not started up already, and
    log in using the email you configured for the realm configurations
    as instructed above in [step 2 of Configuring the Identity Server to
    use the email address as the
    username](../../learn/outbound-provisioning-with-google#email).
2.  On the Management Console, click on **Add** under **Identity
    Providers**.
3.  In the form that appears, provide a name for your identity provider
    by filling in the **Identity Provider Name**, such as Google.com,
    and a description.

    !!! info
        See [Configuring an Identity
        Provider](../../learn/adding-and-configuring-an-identity-provider)
        for more information on registering and configuring an identity
        provider.

4.  Expand the **Outbound Provisioning Connectors** and click
    **Google Provisioning Configuration** section.
5.  Do the following configurations for Google provisioning.

    !!! info 
        For more information on any of these fields, see [Configuring Google
        provisioning](../../learn/configuring-outbound-provisioning-connectors-for-an-identity-provider#configuring-google-provisioning)
.

    1.  Select **Enable Connector** to enable the Google connector.
    2.  Enter your Google domain name.  
        For example, in this guide, mydomain.com is used as the domain
        name.
    3.  Select the claim URI for the Primary Email.  
        For example, use http://wso2.org/claims/emailaddress.
    4.  Select the claim URI for the Given name.  
        For example, use http://wso2.org/claims/givenname.
    5.  Select the claim URI for the family name.  
        For example, use
        `            http://wso2.org/claims/lastname           `.
    6.  Enter your service account ID as the value for the Service
        Account Email.

        ??? note "Can't remember your service account ID?"

            Follow the steps given below:

            1.  Open the [Google developers
                console](https://console.developers.google.com/cloud-resource-manager)
                and click the Menu icon in the top left corner.
            2.  Click **IAM and admin \> Service accounts**.
            3.  Note the service account ID of your service account.

    7.  Attach the private key you downloaded in [step 4.e under
        Configuring Google](../../learn/outbound-provisioning-with-google#create) as
        the **Private Key**.
    8.  Enter the email address you created using your domain before
        starting this tutorial as the Administrator's Email.
    9.  Enter a name for your application in the Application Name field.
        It is used to help you identify requests made by this Google
        client.
    10. Enter **{UD,UN,TD,IDP}** as the value for Google Outbound
        Provisioning Pattern. This pattern is used to build the user id
        of Google domain.
    11. Enter **\_** (the underscore character) as the value for the
        Google Provisioning Separator.

    ![google-prrovisioning-config](../assets/img/using-wso2-identity-server/google-prrovisioning-config.png) 

6.  Click **Register**.

---

## Configuring WSO2 IS as the resident Service Provider

With outbound provisioning, the users you create in one application or
service provider needs to be stored in the Google identity provider you
just created. For this scenario, WSO2 Identity Server acts as the
service provider, so we need to add it as a resident service provider.
For more information on the resident service provider, see [Configuring
a resident service
provider](../../learn/adding-and-configuring-a-service-provider#configuring-a-resident-service-provider)
.

1.  In the **Main** menu under the **Identity** section, click
    **Resident** under **Service Providers**.
2.  Expand the **Outbound Provisioning Configuration** on the screen
    that appears.
3.  Select the Google identity provider you configured from the drop
    down and click the
    ![outbound-provisioning-icon](../assets/img/using-wso2-identity-server/outbound-provisioning-icon.png) button.

    !!! info
        If you enable **Blocking**, Identity Server will wait for the
        response from the Identity Provider to continue.

        If you enable **Enable Rules** and **Blocking,** blocking will block
        the provisioning till the rule completely evaluates and get the
        response back to the WSO2 IdP. Afterwards, you need to enable the
        XACML policy. For more information, see [Rule-Based
        Provisioning](../../learn/rule-based-provisioning)

4.  Click **Update**.

---

## Working with users

The next step is to check if Google is configured properly with the
Identity Server. If you add a user to the Identity Server via the
management console, this user should also appear in Google too.

1.  On the **Main** tab in the Management Console, click **Add** under
    **Users and Roles**.
2.  Click **Add New User**.
3.  Enter the username in the form of an email and enter the password.

    !!! info 
        Later on, if you want to update the user details, you
        won't be able to update the email address.

4.  Assign a role to the user.
5.  Click **Finish**.
6.  In Google, log into admin console of your domain.  
    On the left navigation pane, expand **Users** and click **Users**.
    You will see that the user you created in the Identity Server has
    been added to Google as well.

You have successfully completed the configurations to provision users
from WSO2 IS to Google.

---

## What's next?

-   If you want to JIT provision users from Google to WSO2 Identity
    Server in this use case, see [Configuring Just-In-Time Provisioning
    for an Identity
    Provider](../../learn/configuring-just-in-time-provisioning-for-an-identity-provider)
.
-   You can configure WSO2 IS to outbound provision users only if a
    given XACML rule is met. For more information, see [Rule-Based
    Provisioning](../../learn/rule-based-provisioning).
