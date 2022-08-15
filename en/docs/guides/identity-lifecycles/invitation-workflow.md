# Invite new users

This section is about the user on-boarding flows initiated by
administrators from an invitation to the user's email which allow respective end users to decide their own
passwords or verify the accounts created by administrators.

----

## Set up notifications

-   [Enable the email sending configurations]({{base_path}}/deploy/configure-email-sending) of the WSO2 Identity Server.

    !!! tip 
        The email template used to send this email notification is
        the **AskPassword** template.

        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated Emails]({{base_path}}/guides/tenants/customize-automated-mails).

-   If you have migrated from a previous IS version, ensure that
the `IdentityMgtEventListener` with the ` orderId=50 ` is set to
**false** and that the Identity Listeners with ` orderId=95 ` and `orderId=97 ` are set to **true** in the `<IS_HOME>/repository/conf/deployment.toml ` file.
    
    !!! Note 
        If there are no such entries for `event.default_listener.xxx` in `deployment.toml`, you can skip this configuration. 
    
    ``` toml
    [event.default_listener.identity_mgt]
    priority= "50"
    enable = false
    [event.default_listener.governance_identity_mgt]
    priority= "95"
    enable = true
    [event.default_listener.governance_identity_store]
    priority= "97"
    enable = true
    ```

## Enable the invitation flow

### Use the management console

!!! info "Before you begin"
    If you are adding users via the management console, to
    enable "Ask password" option in the
    Management Console the following property needs to be added to the `
    <IS_HOME>/repository/conf/deployment-toml` file.

    ``` toml
    [identity_mgt.user_onboarding]
    ask_password_from_user= true
    ```

1.  Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Click **Resident** under **Identity Providers** on **Main** > **Identity** and expand the **User Onboarding** tab.

3.  Expand **Ask Password** and configure the **Ask password code expiry time** field. 

4.  Also, select **Enable User Email Verification**. Click **Update** to save changes.
                
    ![Resident idp ask password]({{base_path}}/assets/img/fragments/resident-idp-ask-password-configs.png)

### Use the configuration file
    
You can also configure the above configurations via the configuration files.

Make sure the following configuration is added
to the `<IS_HOME>/repository/conf/deployment.toml` file to set the
confirmation URL valid time period in **minutes**.  
The confirmation link that is provided to the user to set the
password is invalid after the time specified here has elapsed.

``` toml
[identity_mgt.user_onboarding]
enable_email_verification = true
verification_email_validity = "1440"
lock_on_creation=true
[identity_mgt] 
email_sender= "internal"
[identity_mgt.user_onboarding]
ask_password_email_validity = "1440"
password_generator = "org.wso2.carbon.user.mgt.common.DefaultPasswordGenerator"
```
    
!!! info "Configure Ask Password Feature for tenants" 
    These properties can be enabled for each tenant at tenant creation by
    adding the corresponding configuration to the `
    <IS_HOME>/repository/conf/deployment.toml` file as explained in the previous section. 
        
    Optionally, you can log in to the Management Console as a tenant
    admin and change the **Resident IDP** configurations accordingly to enable this feature for a specific tenant.

### Use the SCIM2 API

You can use both the **Ask Password** and **Verify Email** features when creating a user using SCIM 2.0.

!!! info "Before you begin"
    If you are adding users via the SCIM2 REST API, note that WSO2 Identity Server sets a   random value for the password if the `askPassword` claim is present in the request.

    If you want to disable setting a random value and instead keep the `password` that is sent in the request, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [identity_mgt.user_onboarding]
    disable_random_value_for_credentials= true
    ```
    
-   Set the **askPassword** attribute under the`
urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema to
true in the SCIM2 user create request. 

    ```java
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{askPassword:"true"}
    ```
        
    !!! Example "A sample curl command is given below:"
        ``` bash
        curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Smith","givenName":"Paul"},"userName":"Paul","password":"password","emails":[{"primary":true,"value":"paul@somemail.com"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{askPassword:"true"}}'}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
        ```
    
-   Set the **verifyEmail** attribute under the`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema to true in the SCIM2 user create request. 

    ```java
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{verifyEmail:"true"}
    ```
        
    !!! Example "A sample curl command is given below:"
        ``` java
        curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Smith","givenName":"Peter"},"userName":"Peter","password":"password","emails":[{"primary":true,"value":"peter@somemail.com"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{verifyEmail:"true"}}'}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
        ```

## Try it out

Follow the steps below to test the account creation using the password option.

1. Log in to the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`).

2. Navigate to **Main** > **Identity** > **Users and Roles** > **Add**.

3.  Click **Add New User**.

    ![add-a-new-user]({{base_path}}/assets/img/fragments/add-a-new-user.png)

4.  Fill in the form:

    1.  Select the userstore where you want to create this user account
        from the drop-down as the **Domain**.  
        This includes the list of userstores you configured. See
        [Configuring userstores]({{base_path}}/deploy/configure-user-stores/) for more
        information.
    2.  Enter a unique **User Name** that is used by the user to log in.

    3.  Allow users to enter their own password by selecting the **Ask
        password from user** option.

    4.  Enter a valid **Email Address** and click **Finish**.

        !!! tip "Using special characters in the email address"

                If you are using special characters such as `$` in your email address, see [Configuring Emails with Special Characters]({{base_path}}/guides/tenants/add-email-special-characters). 

5.  The Identity Server sends an email to the email address provided.
    The email contains a redirect URL that directs the users to a screen
    where they must provide their own password.

!!! info "Related topics"
    - [Guide: Email Templates]({{base_path}}/guides/tenants/customize-automated-mails/)
    - [Guide: Admin Creation Workflow]({{base_path}}/admin-creation-workflow) 
    - [Guide: User Self Registration Workflow]({{base_path}}/self-registration-workflow)
    - [Guide: Just in Time User Provisioning Workflow]({{base_path}}/jit-workflow)
    - [Guide: Bulk Import Users]({{base_path}}/bulk-import-users)
    - [Guide: Outbound Provisioning]({{base_path}}/outbound-provisioning)
    <!--- [Concept: Ask Password and Email Verification](TODO:insert-link-to-concept) --->

   
