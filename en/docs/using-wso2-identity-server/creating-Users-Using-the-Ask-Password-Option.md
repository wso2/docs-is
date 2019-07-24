# Creating Users Using the Ask Password Option

This section is about the user creation flow which allows users to
decide their own passwords. This process is initiated by the
administrator when selecting **Ask password from user** during the user
creation process. This is different from the default flow, in which the
administrator decides the passwords for users. Using the **Ask
Password** option is the standard method for user management as the
administrator does not have to remember and specify passwords when
creating an account for a user. When selecting this option, the
administrator must enter an **Email Address**. The Identity Server
sends an email to this address that provides the users with a
redirection URL. This directs the users to a screen where they can
provide the password for the account that was newly created for them by
the administrator.

!!! warning
    
    Warning!
    
    Note the following before you begin:
    
    From 5.3.0 onwards there is a new implementation for identity management
    features. The steps given below in this document follows the new
    implementation, which is the **recommended approach** for creating users
    using the ask password option.
    
    Alternatively, to see steps on how to enable this identity management
    feature using the **old implementation**, see [Creating Users using the
    Ask Password Option documentation in WSO2 IS
    5.2.0](https://docs.wso2.com/display/IS520/Creating+Users+using+the+Ask+Password+Option)
    . The old implementation has been retained within the WSO2 IS pack for
    backward compatibility and can still be used if required.
    

Follow the instructions given below to configure this feature.

!!! tip
    
    Before you begin
    
    Ensure that the " `         IdentityMgtEventListener        ` " with the
    `         orderId=50        ` is set to **false.** This is the listener
    for the old implementation of identity management prior to 5.3.0.
    
    Ensure that the new Identity Listeners with
    `         orderId=95        ` and `         orderId=97        ` are set
    to **true** in the
    `         <IS_HOME>/repository/conf/identity/identity.xml        ` file.
    
    By default, the properties are configured as shown below. Therefore, if
    you have not changed the default configurations, you can skip this step.
    
    ``` java
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.mgt.IdentityMgtEventListener" orderId="50" enable="false"/>
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.governance.listener.IdentityMgtEventListener" orderId="95" enable="true" />
    <EventListener type="org.wso2.carbon.user.core.listener.UserOperationEventListener" name="org.wso2.carbon.identity.governance.listener.IdentityStoreEventListener" orderId="97" enable="true">
```


Follow the steps given below to configure WSO2 IS to enable the ask
password feature:

1.  Make sure the following configuration is set (uncommented) in the
    `           <IS_HOME>/repository/conf/identity/identity.xml          `
    file under `           <EmailVerification>          ` element below
    `           <Server>          ` element to set the redirection URL
    valid time period in **minutes**.  
    The redirection link that is provided to the user to set the
    password is invalid after the time specified here has elapsed.

    ``` java
    <Server xmlns="http://wso2.org/projects/carbon/carbon.xml">
    ...
        <EmailVerification>
            <Enable>false</Enable>
            <ExpiryTime>1440</ExpiryTime>
            <LockOnCreation>true</LockOnCreation>
            <Notification>
                <InternallyManage>true</InternallyManage>
            </Notification>
            <AskPassword>
                <ExpiryTime>1440</ExpiryTime>
                <PasswordGenerator>org.wso2.carbon.user.mgt.common.DefaultPasswordGenerator</PasswordGenerator>
            </AskPassword>
        </EmailVerification>
    ...
    </Server>
    ```

      

    You can also configure the expiry time through the Management
    Console.

    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
    to see how to configure this through the management console

    1.  Start the Identity Server and log in to the Management Console.

    2.  Click **Resident** under **Identity Providers** on the **Main**
        tab and expand the **Account Management Policies** tab.

    3.  Expand the **User Onboarding** tab and configure the **Ask
        password code expiry time** field. Click **Update** to save
        changes.

2.  Optionally, if you are adding users via the management console, the
    **EnableAskPasswordAdminUI** property value needs to be added to the
    `           <IS_HOME>/repository/conf/identity/          `
    `           identity.xml          ` file.

    ``` java
        <EnableAskPasswordAdminUI>true</EnableAskPasswordAdminUI>
    ```

3.  Configure the email settings in the
    `           <IS_HOME>/repository/conf/output-event-adapters.xml          `
    file.

    <table>
    <tbody>
    <tr class="odd">
    <td><code>               mail.smtp.from              </code></td>
    <td>Provide the email address of the SMTP account.<br />
    Example: <code>               abcd@gmail.com              </code></td>
    </tr>
    <tr class="even">
    <td><code>               mail.smtp.user              </code></td>
    <td>Provide the username of the SMTP account.<br />
    Example: <code>               abcd              </code></td>
    </tr>
    <tr class="odd">
    <td><code>               mail.smtp.password              </code></td>
    <td>Provide the password of the SMTP account.</td>
    </tr>
    </tbody>
    </table>

      

    ``` xml
        <adapterConfig type="email">
            <!-- Comment mail.smtp.user and mail.smtp.password properties to support connecting SMTP servers which use trust
                based authentication rather username/password authentication -->
            <property key="mail.smtp.from">{EMAIL_ID}</property>
            <property key="mail.smtp.user">{USERNAME}</property>
            <property key="mail.smtp.password">{PASSWORD}</property>
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

      
    !!! note
    
        If you are using a Google mail account, note that Google has
        restricted third-party apps and less secure apps from sending emails
        by default. Therefore, you need to configure your account to disable
        this restriction, as WSO2 IS acts as a third-party application when
        sending emails to confirm user registrations or notification for
        password reset WSO2 IS.
    
        ![](images/icons/grey_arrow_down.png){.expand-control-image} Click
        here for more information.
    
        Follow the steps given below to enable your Google mail account to
        provide access to third-party applications.
    
        1.  Navigate to <https://myaccount.google.com/security> .
        2.  Click **Signing in to Google** on the left menu and make sure
            that the **2-step Verification** is disabled or off.  
            ![](../../assets/img//103330534/103330540.png){width="600"
            height="279"}
        3.  Click **Connected apps and sites** on the left menu and enable
            **Allow less secure apps**.  
            ![](../../assets/img//103330534/103330535.png){width="597"
            height="171"}
    
    
        **Tip:** The email template used to send this email notification is
        the **AskPassword** template.
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated
        Emails](_Customizing_Automated_Emails_).
    

4.  Start the Identity Server and log in to the **Management Console**.

5.  In the **Main** tab, click, under **Identity Providers**, click
    **Resident** and expand the **Account Management Policies** tab.
6.  Expand the **User Onboarding** tab and select **Enable User Email
    Verification**. Click **Update** to save changes.

    The `            EmailVerification           ` property can be
    enabled for each tenant at tenant creation by adding the following
    configuration to the
    `            <IS_HOME>/repository/conf/identity/identity.xml           `
    file as seen below.

    ``` xml
    <EmailVerification>
            <Enable>true</Enable>
            <LockOnCreation>true</LockOnCreation>
            <Notification>
                <InternallyManage>true</InternallyManage>
            </Notification>
        </EmailVerification>
    ```

### Try it out

You can use one of the following methods to creating a user using the
ask password option.

!!! note
    
    ![](images/icons/grey_arrow_down.png){.expand-control-image} Click here
    for more information If you want to enter any of the !\#$%&'\*+-=?^\_
    special characters in the email address.
    
    1.  Go to management console click the **Main** tab **\> Claims \>
        List**.
    
    2.  Click **http://wso2.org/claims**.
    
    3.  Expand the **Email** claim and click **Edit**.
    
    4.  Add the characters you need out of the
        `             !#$%&'*+-=?^_            ` special characters to the
        Regular Expression.  
        Example:
    
        <table>
        <colgroup>
        <col style="width: 49%" />
        <col style="width: 50%" />
        </colgroup>
        <tbody>
        <tr class="odd">
        <td>Adding the # character to the regex email pattern.</td>
        <td><code>                 ^([a-zA-Z0-9_\.\-#])+\@(([a-zA-Z0-9#\-])+\.)+([a-zA-Z0-9#]{2,4})+$                </code></td>
        </tr>
        <tr class="even">
        <td>Adding the $ character to the regex email pattern.<br />
        Make sure to use the appropriate escape characters, such as \\, when using the $ character.</td>
        <td><code>                 ^([a-zA-Z0-9_\.\-\\$])+\@(([a-zA-Z0-9\\$\-])+\.)+([a-zA-Z0-9\\$]{2,4})+$                </code></td>
        </tr>
        </tbody>
        </table>
    
    Now, follow the steps given below to add a new user.
    

-   [Management
    console](#CreatingUsersUsingtheAskPasswordOption-Managementconsole)
-   [SCIM 2.0](#CreatingUsersUsingtheAskPasswordOption-SCIM2.0)

#### Management console

Do the following steps to test the account creation using the password
option.

1.  Start the WSO2 Identity Server.

2.  On the Main tab in the **Management Console**, click **Add** under
    Users and Roles.

3.  Click **Add new User.**

    **![](../../assets/img//103330534/103330536.png){width="400"
    height="323"}**

    !!! note
    
        If you are using the $ character in the email address, make sure to
        use appropriate escape characters, such as /.  
        Example: `           abc\$def@gmail.com          `
    

4.  Fill in the form:

    1.  Select the user store where you want to create this user account
        from the drop-down as the **Domain**.  
        This includes the list of user stores you configured. See
        [Configuring User Stores](_Configuring_User_Stores_) for more
        information.
    2.  Enter a unique **User Name** that is used by the user to log in.

    3.  Allow users to enter their own password by selecting the **Ask
        password from user** option.

    4.  Enter a valid **Email Address** and click **Finish**.

5.  The Identity Server sends an email to the email address provided.
    The email contains a redirect URL that directs the users to a screen
    where they must provide their own password.

#### SCIM 2.0

!!! tip
    
    Before you begin!
    
    Follow the steps given in the [Configuring SCIM 2.0 Provisioning
    Connector
    Documentation](https://docs.wso2.com/display/ISCONNECTORS/Configuring+SCIM+2.0+Provisioning+Connector)
    to configure WSO2 IS with SCIM 2.0.
    

1.  Set the `           user-schema-extension-enabled          `
    property in the
    `           <IS_HOME>/repository/conf/identity/charon-config.xml          `
    file to `           true          ` .

    ``` java
    <Property name="user-schema-extension-enabled">true</Property>
    ```

2.  Now you can use the ask password features using SCIM 2.0. A sample
    curl commands is given below:

    ``` java
        curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Smith","givenName":"Paul"},"userName":"Paul","password":"password","emails":[{"primary":true,"value":"dewmi123455@gmail.com"}],"EnterpriseUser":{askPassword:"true"}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
    ```

**Related Links**

-   For information on how to edit an existing email template, see
    [Email Templates](_Email_Templates_).
-   By default, the claim values of the identity claims used in this
    feature are stored in the JDBC datasource configured in the
    `            identity.xml           ` file. See [Configuring
    Claims](_Configuring_Claims_) for more information on how to store
    the claim values in the user store.
