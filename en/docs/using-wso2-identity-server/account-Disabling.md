# Account Disabling

WSO2 Identity Server (WSO2 IS) enables an administrative user to disable
a user account by configuring this feature in the WSO2 Identity Server
and editing the user profile of the account. You can also disable
(switch-off) the account disabling feature so that administrative users
do not have permission to disable users.

-   [Configuring WSO2 IS for account
    disabling](#AccountDisabling-ConfiguringWSO2ISforaccountdisabling)
-   [Disable an account](#AccountDisabling-Disableanaccount)
-   [Sending email notifications for account
    disabling](#AccountDisabling-Sendingemailnotificationsforaccountdisabling)

### Configuring WSO2 IS for account disabling

But first, you need to configure WSO2 Identity Server for user account
locking and disabling. Follow the below steps to do this configuration.

1.  Start the Identity Server and log into the management console using
    your tenant credentials.
2.  Click **Resident** under **Identity Providers** found in the
    **Main** tab.
3.  Expand the **Login Policies** tab.
4.  Expand the **Account Disabling** tab and select the **Enable Account
    Disabling** checkbox. Click **Update** to save changes.  
    ![]( ../../assets/img/103330604/119113135.png) 

    !!! tip
    
        Disable the account disabling feature
    
        To disable the account disabling option, unselect the **Enable
        Account Disabling** in each of the tenants that you wish to disable
        this option for.
    
        Alternatively, disable this feature for all tenants by doing the
        following.
    
        1.  Open the `             identity-event.properties            `
            file found in the
            `             <IS_HOME>/repository/conf/identity            `
            folder.
    
        2.  Set the following property to **false** to disable account
            disabling. This will remove the account disabling option from
            all tenants.
    
            ``` java
                    account.disable.handler.enable=false
        ```


5.  Next, enable account locking. Expand the **Login Policies** tab.
6.  Expand the **Account Locking** tab and select the **Account Lock
    Enabled** checkbox. Click **Update** to save changes.  
    ![]( ../../assets/img/103330604/119113139.png) 

    !!! tip
    
        Tip
    
        If a user is assigned the **Internal/system** role, the user can
        bypass account locking even if the user exceeds the specified number
        of **Maximum Failed Login Attempts**.
    
        ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
        here to see more information
    
        WSO2 Identity Server has the **Internal/system** role configured by
        default. But generally a new user is not assigned the
        **Internal/syste** m role by default. Required roles can be assigned
        to a user depending on the set of permission a user needs to have.
        For more information on roles and permission, see [Configuring Roles
        and Permissions](_Configuring_Roles_and_Permissions_).
    
        Although the **Internal/system** role is configured by default in
        WSO2 Identity Server, you can delete the role if necessary. To allow
        users with the **Internal/system** role to bypass account locking,
        you need to ensure that the role exists in WSO2 Identity Server.
    

7.  To enable account locking and disabling for other tenants, log out
    and repeat the steps given above from [step
    2](#AccountDisabling-step2) onwards.

### Disable an account

Follow the steps below to disable a user account through the WSO2 IS
management console.

1.  Navigate to **Main\>Claims\>List** and click on '
    http://wso2.org/claims '.

2.  Edit the **Account Disabled** claim. See [Editing Claim
    Mapping](_Editing_Claim_Mapping_) for more information on how to do
    this.

3.  Tick the checkbox **Supported by Default** and click **Update.**  
    ![]( ../../assets/img/103330604/103330606.png) 
4.  Navigate to **Main\>Users and Roles\>List\>Users** and click on
    **User Profile** of the user account that you want to disable.
5.  Tick the **Account Disabled** checkbox and click **Update**.

!!! tip
    
    **Alternatively,** instead of using the management console, you can also
    enable/disable the user account using the
    `         setUserClaimValues()        ` method in the
    `                   RemoteUserStoreManagerService                 `
    after you have configured WSO2 IS for account disabling.
    

### Sending email notifications for account disabling

Once you have configured WSO2 Identity Server for account disabling, you
can also configure the WSO2 IS to send an email to the user's email
address when the user account is disabled. To configure this, follow the
steps below.  

1.  Open the `           output-event-adapters.xml          ` file found
    in the `           <IS_HOME>/repository/conf          ` directory.
2.  Configure the relevant property values for the email server under
    the `            <adapterConfig type="email">           ` tag .

    ``` xml
    <adapterConfig type="email">
        <!-- Comment mail.smtp.user and mail.smtp.password properties to support connecting SMTP servers which use trust
        based authentication rather username/password authentication -->
        <property key="mail.smtp.from">abcd@gmail.com</property>
        <property key="mail.smtp.user">abcd</property>
        <property key="mail.smtp.password">xxxx</property>
        <property key="mail.smtp.host">smtp.gmail.com</property>
        <property key="mail.smtp.port">587</property>
        <property key="mail.smtp.starttls.enable">true</property>
        <property key="mail.smtp.auth">true</property>
        <!-- Thread Pool Related Properties -->
        <property key="minThread">8</property>
        <property key="maxThread">100</property>
        <property key="keepAliveTimeInMillis">20000</property>
        <property key="jobQueueSize">10000</property>
    </adapterConfig>
    ```

3.  Restart the Server.

    !!! tip
    
        **Tip:** The email template used to send the email notification for
        account locking is the **AccountLock** template and the template
        used for account disabling is the **AccountDisable** template. You
        can edit and customize the email template. For more information on
        how to do this, see [Customizing Automated
        Emails](https://docs.wso2.com/display/IS580/Customizing+Automated+Emails)
        .
    
