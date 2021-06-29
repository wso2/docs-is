1.  Log in to the Management Console (`https://<IS_HOST>:<PORT>/carbon`).

2.  Click **Resident** under **Identity Providers** on **Main** > **Identity** and expand the **User Onboarding** tab.

3.  Expand **Ask Password** and configure the **Ask password code expiry time** field. 

4.  Also, select **Enable User Email Verification**. Click **Update** to save changes.
                
    ![Resident idp ask password](../../../assets/img/fragments/resident-idp-ask-password-configs.png) 
    
    You can also configure the above configurations via the configuration
    files. 
    

    ??? note "Click to see how to configure this through the configuration files" 
        <a name="file-based-config"></a>
        Make sure the following configuration is added
        to the ` <IS_HOME>/repository/conf/deployment.toml ` file to set the
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

5.  Additionally, if you are adding users via the management console, to
    enable "Ask password" option in the
    Management Console the following property needs to be added to the `
    <IS_HOME>/repository/conf/deployment-toml` file.

    ``` toml
    [identity_mgt.user_onboarding]
    ask_password_from_user= true
    ```

6.  Enable the email sending configurations of the WSO2 Identity Server
    as explained here.
    
    {! fragments/configure-email-sending.md !}

    !!! tip 
        The email template used to send this email notification is
        the **AskPassword** template.
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated Emails](../../../guides/tenants/customize-automated-mails).


Follow the steps below to test the account creation using the password option.

{! fragments/add-new-user.md !}

4.  Fill in the form:

    1.  Select the userstore where you want to create this user account
        from the drop-down as the **Domain**.  
        This includes the list of userstores you configured. See
        [Configuring userstores](../../../deploy/configure-user-stores/) for more
        information.
    2.  Enter a unique **User Name** that is used by the user to log in.

    3.  Allow users to enter their own password by selecting the **Ask
        password from user** option.

    4.  Enter a valid **Email Address** and click **Finish**.

        !!! tip "Using special characters in the email address"

                If you are using special characters such as `$` in your email address, see [Configuring Emails with Special Characters](../../../guides/tenants/add-email-special-characters). 

5.  The Identity Server sends an email to the email address provided.
    The email contains a redirect URL that directs the users to a screen
    where they must provide their own password.