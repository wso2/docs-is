# Self-Registration and Account Confirmation

WSO2 Identity Server (WSO2 IS) supports self-registration to allow users
set up their account and receive email confirmation when the account is
created.

When a user self-registers, the self-registration process creates the
user account and locks the account until the user confirms account
ownership via the confirmation mail that WSO2 IS sends.

If a user does not confirm account ownership before the specified expiry
period, the user account is locked assuming that the expired account is
not owned by the creator. If necessary, the system administrator can
delete such accounts to manage resources better.

The following sections walk you through configuring and trying out
self-registration.

-   [Configuring
    self-registration](#Self-RegistrationandAccountConfirmation-Configuringself-registration)
-   [Configuring self-registration consent
    purposes](#Self-RegistrationandAccountConfirmation-SelfRegConsentConfiguringself-registrationconsentpurposes)
-   [Try out
    self-registration](#Self-RegistrationandAccountConfirmation-Tryoutself-registration)

!!! warning
    
    From WSO2 IS 5.3.0 onwards there is a new implementation for identity
    management features. The steps given below in this document follows the
    new implementation, which is the **recommended approach** for self
    registration.
    
    Alternatively, to see the steps on how to enable this identity
    management feature using the **old implementation**, see [Self Sign Up
    and Account Confirmation documentation in WSO2 IS
    5.2.0](_Self-Registration_and_Account_Confirmation_). The old
    implementation has been retained within the WSO2 IS pack for backward
    compatibility and can still be used if required.
    
    
    Before you begin
    
    Ensure that the " `         IdentityMgtEventListener        ` " with the
    `         orderId=50        ` is set to **false** and that the Identity
    Listeners with `         orderId=95        ` and
    `         orderId=97        ` are set to **true** in the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file.
    
    ``` java
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.mgt.IdentityMgtEventListener" orderId="50" enable="false"/>
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.governance.listener.IdentityMgtEventListener" orderId="95" enable="true" />
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.governance.listener.IdentityStoreEventListener" orderId="97" enable="true">
```


###  Configuring self-registration

Follow the steps given below to register users for the super tenant,
which is `         carbon.super        ` .

1.  Configure the following email settings in the \<
    `           IS_HOME>/repository/conf/output-event-adapters.xml          `
    file.

    |                                                   |                                                |
    |---------------------------------------------------|------------------------------------------------|
    | `               mail.smtp.from              `     | Provide the email address of the SMTP account. |
    | `               mail.smtp.user              `     | Provide the username of the SMTP account.      |
    | `               mail.smtp.password              ` | Provide the password of the SMTP account.      |

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
        the **AccountConfirmation** template.
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated
        Emails](_Customizing_Automated_Emails_).
    

2.  [Start WSO2
    IS](Running-the-Product_103328959.html#RunningtheProduct-Startingtheserver)
    and [log in to the management
    console](Running-the-Product_103328959.html#RunningtheProduct-AccessingtheManagementConsole)
    : `          https://<IS_HOST>:<IS_PORT>/carbon         `  
    If you started WSO2 IS previously, make sure to stop it and start it
    again for the email settings to get updated in the pack.
3.  Navigate to **Main** tab \> **Identity Providers** \> **Resident**
    and expand the **Account Management Policie** s section.
4.  Expand the **User Self Registration** section and configure the
    following properties as required.

    <table>
    <thead>
    <tr class="header">
    <th>Field</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr class="odd">
    <td>Enable Self User Registration</td>
    <td>Select to enable self registration.</td>
    </tr>
    <tr class="even">
    <td>Enable Account Lock On Creation Enabled</td>
    <td>Select to enable account locking during self registration.</td>
    </tr>
    <tr class="odd">
    <td>Enable Notification Internally Management</td>
    <td>Select if you want the notification handling to be managed by the WSO2 Identity Server. If the client application handles notification sending already, unselect it. This check only applies if Security Question Based Password Recovery is enabled.</td>
    </tr>
    <tr class="even">
    <td>Enable reCaptcha</td>
    <td>Select to enable reCaptcha for self-registration. See <a href="_Configuring_Google_reCaptcha_for_Security-Question_Based_Password_Recovery_">Configuring Google reCaptcha for Security-Question Based Password Recovery</a> for more information.</td>
    </tr>
    <tr class="odd">
    <td>User self registration code expiry time</td>
    <td><div class="content-wrapper">
    <p>Set the number of minutes for which the verification code should be valid. The verification code that is provided to the user to initiate the self sign-up flow will be invalid after the time specified here has elapsed.</p>
    !!! note
        <p>Alternatively, you can configure the expiry time in the <code>                 identity.xml                </code> configuration file.</p>
        <div class="code panel pdl" style="border-width: 1px;">
        <div class="codeContent panelContent pdl">
        <div class="sourceCode" id="cb1" data-syntaxhighlighter-params="brush: java; gutter: false; theme: Confluence" data-theme="Confluence" style="brush: java; gutter: false; theme: Confluence"><pre class="sourceCode java"><code class="sourceCode java"><a class="sourceLine" id="cb1-1" title="1">&lt;SelfRegistration&gt;</a>
        <a class="sourceLine" id="cb1-2" title="2">    &lt;VerificationCode&gt;</a>
        <a class="sourceLine" id="cb1-3" title="3">        &lt;ExpiryTime&gt;<span class="dv">1440</span>&lt;/ExpiryTime&gt;</a>
        <a class="sourceLine" id="cb1-4" title="4">    &lt;/VerificationCode&gt;</a>
        <a class="sourceLine" id="cb1-5" title="5">&lt;/SelfRegistration&gt;</a></code></pre></div>
        </div>
        </div>
    </div></td>
    </tr>
    </tbody>
    </table>

    ![]( ../../assets/img/103330519/103330525.png) 

5.  Expand the **Login Policies** tab, then the **Account Locking** tab
    and select **Account Lock Enabled**.  
    This allows the account to be locked until the user confirms the
    account. Once the user activates the account through the email
    received, the account is unlocked. For more information about
    account locking, see [Account
    Locking](_Account_Locking_by_Failed_Login_Attempts_).

    ![]( ../../assets/img/103330519/103330524.png) 

Now you have set up self registration. Next let's see how you can
configure self-registration consent purposes via the management console
of WSO2 Identity Server.

!!! tip
    
    For information on the REST APIs for self-registration, see
    [Self-Registration Using REST APIs](_Using_the_Self_Sign-Up_REST_APIs_)
    .
    

###  Configuring self-registration consent purposes

Follow the instructions below to configure self-registration consent
purposes and appropriate user attributes:

1.  Start WSO2 Identity Server and access the management console via
    `                       https://localhost:9443/carbon/                     `
    .

2.  Click the **Main** tab, go to **Identity** -\> **Identity
    Providers** and then click **Resident**. This displays the
    **Resident Identity Provider** screen.  
    Expand the **Account Management Policies** section, and then expand
    the **User Self Registration** section. Under **User Self
    Registration** you will see Manage self-sign-up purposes.

3.  Click to configure self-registration consent purposes and user
    attributes.  
    ![]( ../../assets/img/103330519/103330520.png)   
    This displays the **Consent Purposes** screen that allows you to add
    consent purposes.

4.  Click **Add New Purpose**. This displays the **Add New Purpose**
    screen.

5.  Specify appropriate values for the **Purpose** and **Description**
    fields, and then click **Add PII Category** to add a user attribute
    required to obtain consent for the specified purpose.

    !!! tip
    
        Tip
    
        You can add one or more user attributes to obtain consent for a
        particular purpose.
    

    ![]( ../../assets/img/103330519/103330521.png) 

6.  If you want consent on a specific user attribute to be mandatory,
    select the **Mandatory** check box for that attribute.

    !!! tip
    
        Tip
    
        -   When you configure purposes for self-registration, the
            attributes that you specify for a particular purposes are the
            only attributes for which users are prompted to provide consent.
        -   If a user attribute is set as **Mandatory**, a user has to
            provide consent for the attribute to proceed with
            self-registration.
        -   If a user does not provide consent for any of the non-mandatory
            attributes, WSO2 Identity Server will not store those
            attributes.
    

7.  Click **Finish**. This displays details related to the purpose and
    user attributes you added.

8.  Depending on your requirement, you can either add another new
    purpose and related user attributes, or click **Finish** if you have
    added all the purposes you want.

9.  Click **Update**.

Now you have configured required self-registration purposes and user
attributes for which you require user consent.

Next, you can try out self-registration.

### Try out self-registration

1.  Access the [WSO2 Identity Server
    dashboard](https://localhost:9443/dashboard/).
2.  Click the **Register Now?** link and then enter the new user's
    username.

    Register Users for a Tenant

    If you want to self-register to a specific tenant, you need to
    provide the **Username** in the following format:
    `            <USERNAME>@<TENAND_DOMAIN>           `

    For example, if you have a tenant domain as
    `           foo.com          `, the username needs to be
    `           kim@foo.com          `

    ![]( ../../assets/img/103330519/103330522.png) 

3.  Fill in the user details, provide consent to share the requested
    information and then click **Register**.

4.  Once the user has registered, first you receive an account lock
    email because the account is locked until you confirm the account
    and then you receive an account confirmation email.

5.  Click **Confirm Registration** in the email or copy the link in the
    email to your browser to confirm the account.  
    Once you confirm the account, the account is unlocked and an email
    is sent.

**Want to resend the confirmation email?**

Follow the steps given below to resend the confirmation email.

1.  Access the [WSO2 Identity Server
    dashboard](https://localhost:9443/dashboard/) and try to login with
    the user you just registered.  
    The user account should not be activated for the user, which means
    you should not have confirmed the account.

2.  Click on the **Re-send** link to resend the email.  
    ![]( ../../assets/img/103330519/103330523.png) 

!!! tip
    
    **Tip:** The email template used to resend the confirmation email
    notification is the **ResendAccountConfirmation** template.
    
    You can edit and customize the email template. For more information on
    how to do this, see [Customizing Automated
    Emails](_Customizing_Automated_Emails_).
    

## Related Links

By default, the claim values of the identity claims used in this feature
are stored in the JDBC datasource configured in the
`         identity.xml        ` file. See [Configuring
Claims](_Configuring_Claims_) for more information on how to store the
claim values in the user store.
