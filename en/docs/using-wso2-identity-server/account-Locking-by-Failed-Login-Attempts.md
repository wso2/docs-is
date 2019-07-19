# Account Locking by Failed Login Attempts

WSO2 Identity Server can be configured to lock a user account when a
number of consecutive failed login attempts are exceeded. First, you
need to configure WSO2 Identity Server for user account locking and
disabling. The following section explain how to configure this.

-   [Configuring WSO2 IS for account
    locking](#AccountLockingbyFailedLoginAttempts-ConfiguringWSO2ISforaccountlocking)
-   [Sending email notifications for account
    locking](#AccountLockingbyFailedLoginAttempts-Sendingemailnotificationsforaccountlocking)

### Configuring WSO2 IS for account locking

!!! warning
    
    The instructions given on this page follow the **recommended approach**
    for account locking and account disabling in WSO2 Identity Server, which
    is to use the governance `         identity.mgt        ` listener.
    
    Prior to the WSO2 IS 5.2.0 release, account locking and account
    disabling was configured in a different way. If you require
    documentation with regard to the old method for backward compatibility,
    see the [WSO2 IS 5.2.0
    documentation](https://docs.wso2.com/display/IS520/User+Account+Locking+and+Account+Disabling)
    .
    

1.  Ensure that the " `            IdentityMgtEventListener           `
    " with the `            orderId=50           ` is set to **false**
    and the " `            IdentityMgtEventListener           `
    " with the `            orderId=95           ` is set to **true**
    in the
    `            <IS_HOME>/repository/conf/identity/identity.xml           `
    file.  

    This is already configured this way by default. You can skip this
    step if you have not changed this configuration previously.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    to see the code block

    ``` xml
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.mgt.IdentityMgtEventListener" orderId="50" enable="false"/>
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.governance.listener.IdentityMgtEventListener" orderId="95" enable="true" />
    ```

    !!! tip
    
        Tip
    
        The properties that you configure in the
        `            <IS_HOME>/repository/conf/identity/identity-event.properties           `
        file are applied at the time of WSO2 Identity Server startup.
    
        Once you start the server, any consecutive changes that you do in
        the
        `            <IS_HOME>/repository/conf/identity/identity-event.properties           `
        file, will not be picked up.
    

2.  Start the Identity Server and log into the management console using
    your tenant credentials.

    !!! tip
    
        **Alternatively** , you can also use the
        `                         IdentityGovernanceAdminService                       `
        SOAP service to do this instead of using the management console UI.
        See [Calling Admin Services](_Calling_Admin_Services_) for more
        information on how to invoke this SOAP service. If you are using the
        SOAP service to configure this, you do not need to follow the steps
        given below this note.
    

3.  Click **Resident** under **Identity Providers** found in the
    **Main** tab.
4.  Expand the **Login Policies** tab.
5.  Expand the **Account Locking** tab and select the **Account Lock
    Enabled** checkbox. Click **Update** to save changes.  
    ![](attachments/103330596/103330597.png){width="566" height="250"}

    !!! tip
    
        Tip
    
        If a user is assigned the **Internal/system** role, the user can
        bypass account locking even if the user exceeds the specified number
        of **Maximum Failed Login Attempts**.
    
        !!! note
            
                Note
            
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
            

6.  To enable account locking for other tenants, log out and repeat the
    steps given above from [step
    2](#AccountLockingbyFailedLoginAttempts-step2) onwards.

The following table describes the configuration properties and
descriptions you need to configure:

<table>
<thead>
<tr class="header">
<th><p>Configuration</p></th>
<th><p>Description</p></th>
</tr>
</thead>
<tbody>
<tr class="odd">
<td><p>Maximum Failed Login Attempts</p></td>
<td>This indicates the number of consecutive attempts that a user can try to log in without the account getting locked. If the value you specify is 2, the account gets locked if the login attempt fails twice.</td>
</tr>
<tr class="even">
<td><p>Lock Timeout Increment Factor</p></td>
<td><div class="content-wrapper">
<p>This indicates how much the account unlock timeout is incremented by after each failed login attempt. For example, according to the values configured in the above screen, when a user exceeds the specified limit of 4 <strong>Maximum Failed Login Attempts</strong> , the account is locked for 10 minutes. This account unlock timeout is calculated as follows.</p>
<div class="panel" style="border-width: 1px;">
<div class="panelContent">
<p>Account unlock timeout = Configured <strong>Account Unlock Time</strong> * ( <strong>Lock Timeout Increment Factor</strong> ^ failed login attempt cycles)</p>
<p>i.e.,</p>
<p>10 minutes = 5 * ( 2 ^ 1 )</p>
!!! tip
    <p>Tip</p>
    <p>If you want to configure the <strong>Lock Timeout Increment Factor</strong> property via the file based configuration, the parameter you need to configure is <code>                 account.lock.handler.login.fail.timeout.ratio                </code> found in the <code>                 &lt;IS_HOME&gt;/repository/conf/identity/identity-event.properties                </code> file.</p>
</div>
</div>
<p>If the user attempts to log in with invalid credentials again after the wait time has elapsed and the account is unlocked, the number of login attempt cycles is now 2 and the wait time is 20 minutes.</p>
</div></td>
</tr>
<tr class="odd">
<td><p>Account Unlock Time</p></td>
<td><p>The time specified here is in minutes. According to the values in the screenshot above, the account is locked for 5 minutes after the user's second failed attempt and authentication can be attempted once this time has passed.</p></td>
</tr>
<tr class="even">
<td><p>Account Lock Enabled</p></td>
<td><p>This enables locking the account when authentication fails.</p></td>
</tr>
</tbody>
</table>

If you want to configure different settings for another tenant, log out
and follow the same steps to configure these properties for the other
tenants.

!!! note
    
    Configuring WSO2 IS for automatic account unlock
    
    The WSO2 Identity Server can be configured to automatically unlock a
    user account after a certain period of time. A user account locked by
    failed login attempts can be unlocked by setting a lock timeout period.
    
    Configure the `         Authentication.Policy.Account.Lock.Time        `
    property in the `        `
    `         <IS_HOME>/repository/conf/identity/identity-mgt.properties        `
    file . As mentioned in the above table, the value refers to the number
    of minutes that the account is locked for, after which, authentication
    can be attempted again.
    
    ``` bash
    Authentication.Policy.Account.Lock.Time=5 
    ```
    
    If the lock time is set to 0, the account has to be unlocked by an admin
    user. For more information about this, see [Account locking for a
    particular user](_Locking_a_Specific_User_Account_).
    

### Sending email notifications for account locking

Once you have configured WSO2 Identity Server for account locking by
failed login attempts, you can also configure the WSO2 IS to send an
email to the user's email address when the user account is locked due to
failed login attempts. To configure this, follow the steps below.

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
        Emails](_Customizing_Automated_Emails_).
    
