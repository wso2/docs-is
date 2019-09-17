# Account Locking by Failed Login Attempts

WSO2 Identity Server can be configured to lock a user account when a
number of consecutive failed login attempts are exceeded. First, you
need to configure WSO2 Identity Server for user account locking and
disabling. The following section explain how to configure this.

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
    

1.  Ensure that the identity listener
    with the `            priority=50           ` is set to **false**
    and the identity listener with the `            priority=95           ` is set to **true**
    in the
    `            <IS_HOME>/repository/conf/deployment.toml           `
    file by adding the following configuration.  

    !!! info 
        This is already configured this way by default. You can skip this
        step if you have not changed this configuration previously.

    ??? note "Click to see the code block"

        ``` xml
        [event.default_listener.identity_mgt]
        priority= "50"
        enable = false
        [event.default_listener.governance_identity_mgt]
        priority= "95"
        enable = true
        ```
    
2.  <a name= "failedloginattempts"></a> Start the Identity Server and log into the management console using
    your tenant credentials.

    !!! tip
    
        **Alternatively**, you can also use the
        `                         IdentityGovernanceAdminService                       `
        SOAP service to do this instead of using the management console UI.
        See [Calling Admin Services](../../develop/calling-admin-services) for more
        information on how to invoke this SOAP service. If you are using the
        SOAP service to configure this, you do not need to follow the steps
        given below this note.
    

3.  Click **Resident** under **Identity Providers** found in the
    **Main** tab.
4.  Expand the **Login Policies** tab.
5.  Expand the **Account Locking** tab and select the **Account Lock
    Enabled** checkbox. Click **Update** to save changes.  
    ![account-lock-enabled](../../assets/img/using-wso2-identity-server/account-lock-enabled.png) 

    !!! tip
    
        If a user is assigned the **Internal/system** role, the user can
        bypass account locking even if the user exceeds the specified number
        of **Maximum Failed Login Attempts**.
    
        !!! note
                WSO2 Identity Server has the **Internal/system** role configured by
                default. But generally a new user is not assigned the
                **Internal/system** role by default. Required roles can be assigned
                to a user depending on the set of permission a user needs to have.
                For more information on roles and permission, see [Configuring Roles
                and Permissions](../../learn/configuring-roles-and-permissions).
                
                Although the **Internal/system** role is configured by default in
                WSO2 Identity Server, you can delete the role if necessary. To allow
                users with the **Internal/system** role to bypass account locking,
                you need to ensure that the role exists in WSO2 Identity Server.
            

6.  To enable account locking for other tenants, log out and repeat the
    steps given above from [step
    2](#failedloginattempts) onwards.

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
<td>
 <div class="content-wrapper">
 <p>
   This indicates the number of consecutive attempts that a user can try to log in without the account getting locked. If the value you specify is 2, the account gets locked if the login attempt fails twice.</p>
<div class="admonition tip">
<p class="admonition-title">Tip</p>
Add the following configuration to the <code> &lt;IS_HOME&gt;/repository/conf/deployment.toml </code> file to 
configure the <strong>Maximum Failed Login Attempts</strong> property by default for all the tenants at tenant creation. 
<div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" 
    data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[identity_mgt.account_locking]<br>allowed_failed_attempts=5</code></pre>
    </div>
  </div>
 </div>
 </div>
</td>
<tr class="even">
<td><p>Lock Timeout Increment Factor</p></td>
<td><div class="content-wrapper">
<p>This indicates how much the account unlock timeout is incremented by after each failed login attempt. For example, according to the values configured in the above screen, when a user exceeds the specified limit of 4 <strong>Maximum Failed Login Attempts</strong>, the account is locked for 10 minutes. This account unlock timeout is calculated as follows.</p>
<p>Account unlock timeout = Configured <strong>Account Unlock Time</strong> * ( <strong>Lock Timeout Increment Factor</strong> ^ failed login attempt cycles)</p>
<p>i.e.,10 minutes = 5 * ( 2 ^ 1 )</p>
<div class="admonition tip">
<p class="admonition-title">Tip</p>
Add the following configuration to the <code> &lt;IS_HOME&gt;/repository/conf/deployment.toml </code> file to 
configure the <strong>Lock Timeout Increment Factor</strong> property by default for all the tenants at tenant creation. 
<div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" 
    data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[identity_mgt.account_locking]<br>auto_unlock_time_increment_ratio=2</code></pre>
    </div></div>
    </div>
</div>
</div>
<p>If the user attempts to log in with invalid credentials again after the wait time has elapsed and the account is unlocked, the number of login attempt cycles is now 2 and the wait time is 20 minutes.</p>
</div></td>
</tr>
<tr class="odd">
<td><p>Account Unlock Time</p></td>
<td>
  <div class="content-wrapper">
    <p>The time specified here is in minutes. According to the values in the screenshot above, the account is locked for 5 minutes after the user's second failed attempt and authentication can be attempted once this time has passed.</p>
<div class="admonition tip">
<p class="admonition-title">Tip</p>
Add the following configuration to the <code> &lt;IS_HOME&gt;/repository/conf/deployment.toml </code> file to 
configure the <strong>Account Unlock Time</strong> property by default for all the tenants at tenant creation. 
<div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" 
    data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[identity_mgt.account_locking]<br>auto_unlock_after=5</code></pre>
    </div>
  </div>
 </div>
 </div>
</td>
</tr>
<tr class="even">
<td><p>Account Lock Enabled</p></td>
<td>
<div class="content-wrapper">
<p>This enables locking the account when authentication fails.</p>
<div class="admonition tip">
<p class="admonition-title">Tip</p>
Add the following configuration to the <code> &lt;IS_HOME&gt;/repository/conf/deployment.toml </code> file to 
<strong>Enable</strong> Account lock on failed login by default for all the tenants at tenant creation. 
<div class="code panel pdl" style="border-width: 1px;">
    <div class="codeContent panelContent pdl">
    <pre class="html/xml" data-syntaxhighlighter-params="brush: html/xml; gutter: false; theme: Confluence" 
    data-theme="Confluence" style="brush: html/xml; gutter: false; theme: Confluence"><code>[identity_mgt.account_locking]<br>enable_account_locking=true</code></pre>
    </div>
  </div>
 </div>
</div>
</td>
</tr>
</tbody>
</table>

If you want to configure different settings for another tenant, log out
and follow the same steps to configure these properties for the other
tenants.

!!! note "Configuring WSO2 IS for automatic account unlock"
      
    A user account locked by failed login attempts can be unlocked 
    by setting the <strong>Account Unlock Time</strong> period.
    
    If the lock time is set to 0, the account has to be unlocked by an admin
    user. For more information about this, see [Account locking for a
    particular user](../../learn/locking-a-specific-user-account).
    

### Sending email notifications for account locking

Once you have configured WSO2 Identity Server for account locking by
failed login attempts, you can also configure the WSO2 IS to send an
email to the user's email address when the user account is locked due to
failed login attempts. To configure this, follow the steps below.

1.  Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to configure the email server.

   ```
   [output_adapter.email]
   from_address= "wso2iamtest@gmail.com"
   username= "wso2iamtest"
   password= "Wso2@iam70"
   hostname= smtp.gmail.com
   port= 587
   enable_start_tls= true
   enable_authentication= true
   ```

2.  Restart the Server.

    !!! tip
    
        The email template used to send the email notification for
        account locking is the **AccountLock** template and the template
        used for account disabling is the **AccountDisable** template. You
        can edit and customize the email template. For more information on
        how to do this, see [Customizing Automated
        Emails](../../learn/customizing-automated-emails).
    
