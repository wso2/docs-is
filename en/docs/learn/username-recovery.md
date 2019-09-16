# Username Recovery

The user account recovery feature implemented in the WSO2 Identity
Server helps to recover the username of the account if the user has
forgotten it. This recovery process is also secured with
captcha verification.

The service caller can define any number of claims that should be used
in the user details verification. The first claim can be the email
address and others can be the required attributes in the user
registration such as first name or last name. This is helpful to search
for a user if the system accepts multiple accounts with the same email
address. Upon the successful verification of the user details, the user
account ID is sent to the user by email.For this to be possible, the
user needs to fill the details in their respective user profile such as
email, first name, last name and any other required attributes.

The instructions below guide you through setting up username recovery
with the WSO2 IS.

!!! warning
    
    From 5.3.0 onwards there is a new implementation for identity management
    features. The steps given below in this document follows the new
    implemenation, which is the **recommended approach** for username
    recovery.
    
    Alternatively, to see steps on how to enable this identity management
    feature using the **old implementation**, see [Username Recovery
    documentation in WSO2 IS
    5.2.0](https://docs.wso2.com/display/IS520/Username+Recovery). The old
    implementation has been retained within the WSO2 IS pack for backward
    compatitbility and can still be used if required.
    
    
!!! tip "Before you begin"
    
    Ensure that the identity listener  with the
    `         priority=50        ` is set to **false** and that the Identity
    Listeners with `         priority=95        ` and
    `         priority=97        ` are set to **true** by adding the following configuration in the
    `         <IS_HOME>/repository/conf/deployment.toml       ` file.
    
    ``` java
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


1.  Configure the following email settings in the <
    `           IS_HOME>/repository/conf/output-event-adapters.xml          `
    file. The email address configured here is the email account that
    will be used to send password recovery email notifications to users.

    ``` java
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

    !!! tip
    
        The email template used to send this email notification is
        the **AccountIdRecovery** template.
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated
        Emails](../../learn/customizing-automated-emails).
    

2.  Start the WSO2 IS server and login to the management console.

3.  Click on **Resident** found under the **Identity Providers** section
    on the **Main** tab of the management console.
4.  Expand the **Account Management Policies** tab, then the **Account
    Recovery** tab.

5.  Select the **Enable Username Recovery** checkbox and the **Enable
    Notification Internally Management** checkbox.  
    For more information on the fields seen on this screen, see [Account
    Recovery REST
    API](https://docs.wso2.com/display/IS580/apidocs/account-recovery)
    .  
    ![account-recovery](../../assets/img/using-wso2-identity-server/account-recovery.png) 

    !!! info   
        To enable username recovery with reCaptcha verification, select the
        **Enable reCaptcha for Username Recovery** checkbox. For more
        information, see Configuring reCaptcha for Username recovery.

6.  To enable sending a confirmation email to the user's registered
    email address after the password reset, select the **Notify when
    Recovery Success** checkbox.

    !!! note
    
        If you are using a Google mail account, note that Google has
        restricted third-party apps and less secure apps from sending emails
        by default. Therefore, you need to configure your account to disable
        this restriction, as WSO2 IS acts as a third-party application when
        sending emails to confirm user registrations or notification for
        password reset WSO2 IS.
    
        ??? note "Click here for more information."
    
            Follow the steps given below to enable your Google mail account to
            provide access to third-party applications.
        
            1.  Navigate to <https://myaccount.google.com/security>.
            2.  Click **Signing in to Google** on the left menu and make sure
                that the **2-step Verification** is disabled or off.  
                ![signing-into-google](../../assets/img/using-wso2-identity-server/signing-into-google.png)
            3.  Click **Connected apps and sites** on the left menu and enable
                **Allow less secure apps**.  
                ![connected-apps-and-sites](../../assets/img/using-wso2-identity-server/connected-apps-and-sites.png)
    

### Try out username recovery

1.  [Create a user using the management
    console](../../learn/configuring-users#creating-a-new-user-using-the-management-console)
    . Ensure that the user has login permissions.
2.  Edit the user profile and enter an email address for the user. The
    email notification for password recovery is sent to the email
    address given here.
3.  Access the [WSO2 Identity Server dashboard](https://localhost:9443/dashboard/).
4.  Click the **Forgot Username** link.
5.  Enter the required fields and click **Submit**.  
    ![enter-fields-dashboard](../../assets/img/using-wso2-identity-server/enter-fields-dashboard.png) 

    !!! note
    
        In case you have enabled username recovery with reCaptcha
        verification, enter the required fields as specified above and
        select the recaptcha checkbox as well.
    
        ![recover-username](../../assets/img/using-wso2-identity-server/recover-username.png) 

6.  An email notification is sent to the user's email address with the
    recovered username.  
    ![email-notification](../../assets/img/using-wso2-identity-server/email-notification.png) 

!!! tip "Related Links" 
    
    -   For information on the REST APIs for username recovery, see [the
        swagger docs on Account Recovery REST
        APIs](https://docs.wso2.com/display/IS580/apidocs/account-recovery).
    -   See [Configuring
        Claims](../../learn/configuring-claims) for more information on how to store
        the claim values in the user store.
    
