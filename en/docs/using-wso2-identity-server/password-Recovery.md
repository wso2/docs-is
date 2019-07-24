# Password Recovery

This section guides you through setting up password recovery for users
to recover a lost or forgotten password. There are two methods of
password recovery:

-   [Recovery using
    notifications](#PasswordRecovery-Recoveryusingnotifications)
-   [Recovery using challenge
    questions](#PasswordRecovery-Recoveryusingchallengequestions)

!!! warning
    
    From 5.3.0 onwards there is a new implementation for identity management
    features. The steps given below in this document follows the new
    implemenation which is the **recommended approach** for password
    recovery.
    
    Alternatively, to see steps on how to enable this identity management
    feature using the **old implementation**, see [Password Recovery
    documentation in WSO2 IS
    5.2.0](https://docs.wso2.com/display/IS520/Password+Recovery). The old
    implementation has been retained within the WSO2 IS pack for backward
    compatitbility and can still be used if required.
    

### Recovery using notifications

WSO2 Identity Server supports password recovery using email-based
notifications. The flow of this method is as follows:

-   The user initiates the password recovery flow by clicking on "Forgot
    Password" at the point of login.
-   The user enters the username and selects **Recovery with Email**.
-   An email is sent to the user with a URL which directs the user to a
    screen where he/she can enter a new password.

Follow the steps given below to set up and try out password recovery
with email notification.

!!! tip
    
    Before you begin
    
    Ensure that the " `         IdentityMgtEventListener        ` " with the
    `         orderId=50        ` is set to **false** and that the Identity
    Listeners with `         orderId=95        ` and
    `         orderId=97        ` are set to **true** in the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file.
    
    ``` java
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.mgt.IdentityMgtEventListener" orderId="50" enable="false"/>
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.governance.listener.IdentityMgtEventListener" orderId="95" enable="true" />
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.governance.listener.IdentityStoreEventListener" orderId="97" enable="true">
```


1.  Configure the following email settings in the \<
    `           IS_HOME>/repository/conf/output-event-adapters.xml          `
    file.  
    The email address configured here is the email account that will be
    used to send password recovery email notifications to users.

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
    
        **Tip:** The email template used to send this email notification is
        the **PasswordReset** template.
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated
        Emails](https://docs.wso2.com/display/IS530/Customizing+Automated+Emails)
        .
    

2.  Start the WSO2 Identity Server and log in to the management console.
3.  Click on **Resident** found under the **Identity Providers** section
    on the **Main** tab of the management console.
4.  Expand the **Account Management Policies** tab, then the **Account
    Recovery** tab and select the **Enable Notification Based Password
    Recovery** checkbox.  
    For more information on the fields seen on this screen, see [Account
    Recovery REST
    API](https://docs.wso2.com/display/IS530/apidocs/account-recovery/#configuring-rest-api)
    .

    ![](https://lh4.googleusercontent.com/KXX9XYm9-1oIkjzkN3uMVQ-xN-AFaq7hBClKhmXghkmfyMu4EDFiXALHplPCc70w-35usCT7vvgGosDEWN652L75g12nyu3-GYZSGm2f-j8hhSZrXyP9hD4SiT866nkpuMNKFVrd){width="740"
    height="307"}

    To enable password recovery with reCaptcha verification, select the
    **Enable reCaptcha for Password Recovery** checkbox. For more
    information, see [C onfiguring reCaptcha for Password
    Recovery](https://docs.wso2.com/display/IS580/Configuring+reCaptcha+for+Password+Recovery)
    .

5.  To enable sending a confirmation email to the user's registered
    email address after the password reset, select the **Notify when
    Recovery Success** checkbox.

    !!! tip
    
        **Tip:** The email template used to send the confirmation email
        notification is the **passwordResetSuccess** template.
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated
        Emails](https://docs.wso2.com/display/IS530/Customizing+Automated+Emails)
        .
    

!!! note
    
    If you are using a Google mail account, note that Google has restricted
    third-party apps and less secure apps from sending emails by default.
    Therefore, you need to configure your account to disable this
    restriction, as WSO2 IS acts as a third-party application when sending
    emails to confirm user registrations or notification for password reset
    WSO2 IS.
    
    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
    for more information.
    
    Follow the steps given below to enable your Google mail account to
    provide access to third-party applications.
    
    1.  Navigate to <https://myaccount.google.com/security> .
    2.  Click **Signing in to Google** on the left menu and make sure that
        the **2-step Verification** is disabled or off.  
        ![](../../assets/img//103330558/103330570.png) 
    3.  Click **Connected apps and sites** on the left menu and enable
        **Allow less secure apps**.  
        ![](../../assets/img//103330558/103330571.png) 
    

### Try out recovery using notification

1.  [Create a user using the management
    console](https://docs.wso2.com/display/IS530/Configuring+Users#ConfiguringUsers-Creatinganewuserusingthemanagementconsole)
    . Ensure that the user has login permissions.
2.  Edit the user profile and enter an email address for the user. The
    email notification for password recovery is sent to the email
    address given.
3.  Access the WSO2 Identity Server dashboard using the following link:
    `          https://localhost:<port_number>/dashboard         ` .
4.  Click the **Forgot Password** link.
5.  Enter the user's username and select **Recover with Emai** l. Click
    **Submit**.  
    ![](../../assets/img//103330558/103330573.png) 

    !!! note
    
        In case you have enabled password recovery with reCaptcha
        verification, enter the required fields as specified above and
        select the recaptcha checkbox as well.
    
        ![](https://lh5.googleusercontent.com/2QBn7ZH8J5g4kjh7YLiDDRdVfXaubeg6wfVrFhqh9AJQu6jLUDRQZWqnKARXvDwzDJ6_l75lkmqhIwp_5keheMwox10XaZ9byw1-mlfpnXefN45B-vRdR3P5sY2Q2F9_ioYORvxl) 
    

6.  An email notification is sent to the user's email address. Click on
    the **Reset Password** button given on the email.  
    ![](../../assets/img//103330558/103330574.png) 
7.  Enter a new password and click **Submit**.  
    ![](../../assets/img//103330558/103330559.png) 

!!! tip
    
    For information on the REST APIs for password recovery, see [the swagger
    docs on Account Recovery REST
    APIs](https://docs.wso2.com/display/IS530/apidocs/account-recovery/).
    

### Recovery using challenge questions

The WSO2 Identity Server provides an alternative means of recovering
passwords. This is by using challenge questions. If users forget their
password, they can recover it by answering challenge questions that were
set up for their accounts.

Before setting this up, you must configure the required claims for this
feature. To do this, do the following.

1.  Enter your username and password to log on to the [Management
    Console](https://docs.wso2.com/display/IS540/Getting+Started+with+the+Management+Console)
    .
2.  Click on **Resident** found under the **Identity Providers** section
    on the **Main** tab of the Management Console.
3.  Expand the **Account Management Policies** tab, then the **Account
    Recovery** tab and select the **Enable the Security Questions Based
    Password Recovery** checkbox.
4.  Configure the required number of questions in the **Number of
    Questions Required for Password Recovery**.  
    Optionally, select the **Notify when Questions Based Recovery
    Starts** checkbox to send an email notification to the user when the
    question based recovery starts.

    !!! note
    
        You can also select the **Enable reCaptcha for Password Recovery**
        checkbox to enable password recovery with reCaptcha verification.
        For more information, see Configuring reCaptcha for Password
        Recovery.
    
        ![](https://lh4.googleusercontent.com/L7Vfnx547Wi4FQswNfxO-dhbsuS7aXbzBbG5b2E0VUSh8K36J07WNrtHpIO-Sqx4BTjnSa0Ljb9mLi0ByGg9awiVj7IZKMrcwAqQBD3AiIvCc9SgknM30KmvNm_7O7UGMaWywBoY) 
    

You can set up challenge questions for users in one of the following
ways:

-   [Using the management
    console](#PasswordRecovery-Usingthemanagementconsole)
-   [Using the end user
    dashboard](#PasswordRecovery-Usingtheenduserdashboard)

#### Using the management console

To set up challenge questions or to manage the questions with different
locales (languages), see [Managing Challenge
Questions](_Managing_Challenge_Questions_).

#### Using the end user dashboard

To try this out, first create a user in the Identity Server.

1.  On the **Main** tab in the Management Console, click **Add** under
    **Users and Roles**.  
2.  Click **Users**. This link is only visible to users with the Admin
    role.  
3.  Click **Add New User**.  
    ![](../../assets/img//103330558/103330567.png) 

4.  Log out of the Identity Server.
5.  The URL for accessing dashboard is the following if the hostname is
    localhost and the Identity Server is running on port 9443:
    <https://localhost:9443/dashboard/> . Click this link to access the
    dashboard and log in using the credentials of the user you just
    created.  
    ![](../../assets/img//103330558/103330566.png)   
6.  Click the **View Details** button under the **Account Recovery**
    section in the end user dashboard.  
    ![](../../assets/img//103330558/103330565.png) 
7.  Set challenge questions for the user account. There are two sets of
    challenge questions by default. You can pick one question for each
    set and give an answer for the question.  
    ![](../../assets/img//103330558/103330564.png)   
8.  Click **Update**.
9.  Sign out of the dashboard and click **Forgot Password** on the login
    screen.  
    ![](../../assets/img//50514066/57747161.png) 
10. Enter the username and select **Recover with Security Questions**.
    Click **Submit**.

    !!! tip
    
        **Tip** : If you have configured WSO2 IS to use email address as the
        username, enter the username in the format of "john@
        [foo.com](http://foo.com) ". If the user is in the super tenant,
        this is in the format of "john@ [foo.com](http://foo.com)
        @carbon.super". If the user is in the tenant
        [bar.com](http://bar.com), the format you must enter is "john@
        [foo.com](http://foo.com) @ [bar.com](http://bar.com) ".
    

    ![](../../assets/img//50514066/57747162.png) 

    !!! note
    
        In case you have enabled password recovery with reCaptcha
        verification, enter the required fields as specified above and
        select the recaptcha checkbox as well.
    
        ![](https://lh3.googleusercontent.com/cDKsCGD5sa3R0MmEKOUd8wsysrEO_lCAdY1ETIzxgJ04xR1s7PzqmVgIyftst1Y_M002KwJDIk-LY7xXyIE2Bqi8b8nlB3z7o8S_TAMku54G97Xg2Es0a-qVeQnDDD4H78oGQt1A)   
    

      

11. Enter the answers to the challenge questions and click **Submit**
    .  
    ![](../../assets/img//50514066/57747166.png) 
12. Enter a new password and click **Submit**. You will receive a
    notification of successful password reset.  

![](../../assets/img//50514066/57747167.png) 

![](../../assets/img//50514066/57747168.png) 

  

!!! tip
    
    For information on the REST APIs for password recovery using challenge
    questions, see [the swagger docs on Account Recovery REST
    APIs](https://docs.wso2.com/display/IS530/apidocs/account-recovery/).
    

**Related Links**

-   To set up reCaptcha for password recovery with secret questions, see
    [Configuring Google reCaptcha for Security-Question Based Password
    Recovery](_Configuring_Google_reCaptcha_for_Security-Question_Based_Password_Recovery_)
    .
-   By default, the claim values of the identity claims used in this
    feature are stored in the JDBC datasource configured in the
    `            identity.xml           ` file. See [Configuring
    Claims](https://docs.wso2.com/display/IS540/Configuring+Claims) for
    more information on how to store the claim values in the user store.

  

  
