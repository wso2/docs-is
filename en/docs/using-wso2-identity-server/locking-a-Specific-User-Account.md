# Locking a Specific User Account

An administrative user can lock and unlock a particular user's account
through the management console or using the AdminService. Follow the
instructions given in the following sections to set this up.  
  

-   [Configure WSO2 IS for account
    locking](#LockingaSpecificUserAccount-ConfigureWSO2ISforaccountlocking)
-   [Enable claims for account
    locking](#LockingaSpecificUserAccount-Enableclaimsforaccountlocking)
-   [Lock a specific user
    account](#LockingaSpecificUserAccount-Lockaspecificuseraccount)
-   [Configure email notifications for account
    locking](#LockingaSpecificUserAccount-Configureemailnotificationsforaccountlocking)

### Configure WSO2 IS for account locking

If you have not already configured WSO2 identity Server (WSO2 IS) for
account locking, expand the section below for instructions.

![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
for instructions

1.  Ensure that the "
    `              IdentityMgtEventListener             ` " with the
    `              orderId=50             ` is set to **false** and
    the " `              IdentityMgtEventListener             `
    " with the `              orderId=95             ` is set to
    **true** in the
    `              <IS_HOME>/repository/conf/identity/identity.xml             `
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
        `              <IS_HOME>/repository/conf/identity/identity-event.properties             `
        file are applied at the time of WSO2 Identity Server startup.
    
        Once you start the server, any consecutive changes that you do in
        the
        `              <IS_HOME>/repository/conf/identity/identity-event.properties             `
        file, will not be picked up.
    

2.  Start the Identity Server and log into the management console using
    your tenant credentials.

    !!! tip
    
        **Alternatively**, you can also use the
        `                             IdentityGovernanceAdminService                           `
        SOAP service to do this instead of using the management console UI.
        See [Calling Admin
        Services](https://docs.wso2.com/display/IS580/Calling+Admin+Services)
        for more information on how to invoke this SOAP service. If you are
        using the SOAP service to configure this, you do not need to follow
        the steps given below this note.
    

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
                and
                Permissions](https://docs.wso2.com/display/IS580/Configuring+Roles+and+Permissions)
                .
            
                Although the **Internal/system** role is configured by default in
                WSO2 Identity Server, you can delete the role if necessary. To allow
                users with the **Internal/system** role to bypass account locking,
                you need to ensure that the role exists in WSO2 Identity Server.
            

6.  To enable account locking for other tenants, log out and repeat the
    steps given above from [step 2](#LockingaSpecificUserAccount-step2)
    onwards.

!!! note
    
    The user accounts that are assigned with the
    `         Internal/system        ` user role cannot be locked.
    

### Enable claims for account locking

1.  Navigate to **Claims\>List** on the **Configure** menu and select
    the
    [http://wso2.org/claims](https://localhost:9443/carbon/claim-mgt/claim-view.jsp?store=Internal&dialect=http%3A%2F%2Fwso2.org%2Fclaims)
    claim dialect.  
    For more information about claims, see [Claim
    Management](_Claim_Management_).
2.  Select the Account Locked claim and click **Edit**.  
    ![](attachments/103330598/103330600.png){width="565"}
3.  Select the **Supported by Default** check box and click **Update**
    .  
    This is done to make the "Account Locked" status appear in the
    user's profile.  
    ![](attachments/103330598/103330603.png){width="629"}

### Lock a specific user account

Once you have configured account locking as instructed above, you can
use one of the following methods to lock a user account.

-   [Using the management
    console](#LockingaSpecificUserAccount-Usingthemanagementconsole)
-   [Using the
    AdminService](#LockingaSpecificUserAccount-UsingtheAdminService)

###### Using the management console

An administrative user can lock a user account by editing the user’s
profile in the management console.

1.  Navigate to **Users and Roles\>List\>Users** on the **Main** menu
    and click on **User Profile** of the user you want to lock.
2.  If it is the first time this particular account is being locked, a
    text box will appear in front of the **Account Locked** field as
    seen below.  
    To lock the account, type true in the text box and click **Update**
    .  
    ![Screen Shot 2016-01-10 at 9.44.40
    PM.png](https://lh3.googleusercontent.com/PUMmennYtR_THlha5l5rG4sC1rm65vnZPu7tY-Mg-Pb8nZtegWgfvBJ3y9b99Fi9JE2Hkzfq654XO5vSvP1zyWFUzHfsd0ydI_MmG4maErNbB8qAASWfAsad5hr4I9L96nYIWgVT){width="370"
    height="368"}

!!! note
    
    If it is not the first time you are locking this user account, there
    will be a check box instead of the text box (as shown above) in front of
    the **Account Locked** field. Select the check box to lock the account
    or deselect it to unlock the account and click **Update**.
    

###### Using the AdminService

An administrative user (with the permission level
/permission/admin/configure/security/usermgt/users ) can lock a user
account using the `         RemoteUserStoreManagerService        ` . You
can use the `         setUserClaimValues        ` operation to achieve
this. The following request is a sample SOAP request that can be sent to
the `         RemoteUserStoreManagerService        ` to lock a user
account.

**Lock Account SOAP Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://common.mgt.user.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:setUserClaimValues>
         <!--Optional:-->
         <ser:userName>test</ser:userName>
         <!--Zero or more repetitions:-->
         <ser:claims>
            <!--Optional:-->
            <xsd:claimURI>http://wso2.org/claims/identity/accountLocked</xsd:claimURI>
            <!--Optional:-->
            <xsd:value>true</xsd:value>
         </ser:claims>
         <!--Optional:-->
         <ser:profileName>default</ser:profileName>
      </ser:setUserClaimValues>
   </soapenv:Body>
</soapenv:Envelope>
```

###### Unlocking a user account using the admin service

Similarly, you can use the `         setUserClaimValues        `
operation `         RemoteUserStoreManagerService        ` AdminService
to unlock a locked user account. The following request is a sample SOAP
request that can be sent to the
`         RemoteUserStoreManagerService        ` to unlock a user
account.

**Unlock Account SOAP Request**

``` xml
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://service.ws.um.carbon.wso2.org" xmlns:xsd="http://common.mgt.user.carbon.wso2.org/xsd">
   <soapenv:Header/>
   <soapenv:Body>
      <ser:setUserClaimValues>
         <!--Optional:-->
         <ser:userName>test</ser:userName>
         <!--Zero or more repetitions:-->
         <ser:claims>
            <!--Optional:-->
            <xsd:claimURI>http://wso2.org/claims/identity/accountLocked</xsd:claimURI>
            <!--Optional:-->
            <xsd:value>false</xsd:value>
         </ser:claims>
         <!--Optional:-->
         <ser:profileName>default</ser:profileName>
      </ser:setUserClaimValues>
   </soapenv:Body>
</soapenv:Envelope>
```

### Configure email notifications for account locking

Once you have configured WSO2 Identity Server for user account locking,
you can also configure the WSO2 IS to email to the user's email address
when the user account is locked. To configure this, follow the steps
below.

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
    

  
