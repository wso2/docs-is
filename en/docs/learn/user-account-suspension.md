# User Account Suspension

The WSO2 Identity Server allows you to set up account suspension to lock
accounts that have been idle for a pre-configured amount of time.

Prior to account suspension, set up the notification system to send a
warning notification to the user announcing that the account will be
suspended. For instance, if a user has not logged in to his/her account
for 90 days, the user can be notified that his account will be suspended
within the next 7 days if there continues to be no activity, after
which, the account will be suspended.

!!! note
    
    Once an account is suspended, only an administrative user can
    unlock the account.
    

#### Setting up account suspension notifications

The notification module is a scheduled task that runs daily. It fetches
users from the user store that are idle and eligible to receive a
warning notification based on the last logged-in time. The scheduled
task that checks for idle accounts is common to all tenants.

!!! tip "Before you begin"
    
    Ensure that the identity listener with the
    `         priority=50        ` is set to **false** and that the "
    identity listener with the
    `         priority=95        ` is set to **true** by adding the following configuration in the
    `         <IS_HOME>/repository/conf/deployment.toml        ` file.
    
    ``` java
    [event.default_listener.identity_mgt]
    priority= "50"
    enable = false
    [event.default_listener.governance_identity_mgt]
    priority= "95" 
    enable = true
    ```

1.  Enable notifications for account suspension by setting the following
    property to true in the `<IS_HOME>/repository/conf/deployment.toml` file.

    ``` toml
    [identity_mgt]
    inactive_account_suspention.enable_account_suspension = true
    ```

2.  To define the start time of the scheduled task, configure the
    following property in the `<IS_HOME>/repository/conf/deployment.toml`
    file. The task runs daily at the trigger time that you configure
    here.

    !!! Tip 
        Set the value in hh:<zero-width-space>mm:<zero-width-space>ss format. If you set it in the
        wrong format or do not set a value, the default value, which is
        20:00:00, applies.

    ``` toml
    [identity_mgt]
    inactive_account_suspension.trigger_notifications_at = "20:00:00"
    ```

3.  Add the following property under all the relevant userstores that
    you are using in the user-mgt.xml file.

    **LDAP Userstore**

    ``` toml
    [user_store]
    notification_receivers_retrieval_class = "org.wso2.carbon.identity.account.suspension.notification.task.ldap.LDAPNotificationReceiversRetrieval"
    ```

    **JDBC Userstore**

    ``` toml
    [user_store]
    notification_receivers_retrieval_class = "org.wso2.carbon.identity.account.suspension.notification.task.jdbc.JDBCNotificationReceiversRetrieval"
    ```

4.  Optionally, you can configure the following email properties to
    receive email notifications in `<IS_HOME>/repository/conf/deployment.toml`

    ``` toml
    [output_adapter]
    email.from_address = "abcd@gmail.com"
    email.username = "abcd"
    email.password = "xxxx"
    email.hostname = "smtp.gmail.com"
    email.port = 587
    email.enable_start_tls = true
    email.enable_authentication = true
    ```

    !!! tip
    
        You can customize the emails that are sent to the user by editing
        the pre-configured email templates.
    
        -   The email template used to send an email when the account has
            been idle for some time is the **idleAccountReminder** template.
        -   The template used to send an email when the account has been
            locked is the **AccountLock** template.
    
        For more information on how to edit and customize the email
        templates, see [Customizing Automated
        Emails](../../learn/customizing-automated-emails).
    

#### Configuring account suspension settings

1.  Start the WSO2 IS and log into the management console using your
    tenant credentials.
2.  Click **Resident** under **Identity Providers** found in the
    **Main** tab. Expand the **Login Policies** tab.
3.  Expand the **Account Locking** tab and select the **Account Lock
    Enabled** checkbox. Click **Update** to save changes.  
    ![account-lock-enabled](../assets/img/using-wso2-identity-server/account-lock-enabled.png)
    
4.  Expand the **Account Management Policies** tab.

5.  Expand the **Lock Idle Accounts** tab and select **Enable**. Fill
    in the following fields and click **Update**.

    | Field              | Description                                                                                                                                                                                                                                                                                                                                                                                   | Sample Value |
    |--------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
    | Lock Account After | This specifies the total number of days after which the account will be locked. In this case, if the account is idle for 90 days, it will be locked.                                                                                                                                                                                                                                          | 90           |
    | Alert User in      | This specifies the number of days (in a comma separated list) after which the user is sent a warning notification informing him/her that the account is about to be locked. In this case, the user will receive multiple notifications, one notification after 30 days, the next after 45 days etc. Finally if it reaches 90 days with no activity from the user, the account will be locked. | 30,45,60,75  |

    ![account-management-policies](../assets/img/using-wso2-identity-server/account-management-policies.png)

!!! tip "Troubleshooting Tips"
    
    If you want to troubleshoot this feature, add the following property to
    the `log4j2.properties` file found in the `<IS_HOME>/repository/conf/` folder to receive DEBUG
    logs.
    
    ``` properties
    logger.account-suspension-notification-task.name = org.wso2.carbon.identity.account.suspension.notification.task
    logger.account-suspension-notification-task.level = DEBUG
    ```


!!! info "Related Links"
    See [Configuring
    Claims](../../learn/configuring-claims) for more
    information on how to store the claim values in the user store.
