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

!!! tip "Before you begin"
    
    Ensure that the new Identity Listeners with
    `         priority=95        ` and `         priority=97        ` are set
    to **true** by adding the following configuration in the
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


Follow the steps given below to configure WSO2 IS to enable the ask
password feature:

1.  Make sure the following configuration is added to the
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file to set the redirection URL
    valid time period in **minutes**.  
    The redirection link that is provided to the user to set the
    password is invalid after the time specified here has elapsed.

    ``` java
    [identity_mgt.user_onboarding]
    enable_email_verification = false
    verification_email_validity = "1440"
    lock_on_creation=true
    [identity_mgt] 
    email_sender= "internal"
    [identity_mgt.user_onboarding]
    ask_password_email_validity = "1440"
    password_generator = "org.wso2.carbon.user.mgt.common.DefaultPasswordGenerator"
    ```

    You can also configure the expiry time through the Management
    Console.

    ??? note "Click to see how to configure this through the management console"

        1.  Start the Identity Server and log in to the Management Console.

        2.  Click **Resident** under **Identity Providers** on the **Main**
            tab and expand the **Account Management Policies** tab.

        3.  Expand the **User Onboarding** tab and configure the **Ask
            password code expiry time** field. Click **Update** to save
            changes.

2.  Optionally, if you are adding users via the management console, the
    following property needs to be added to the
    `           <IS_HOME>/repository/conf/deployment-toml` file.

    ``` java
    [identity_mgt.user_onboarding]
    ask_password_from_user= true
    ```

3.  Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to configure the email server for this service.

     ``` toml
     [output_adapter.email]
     from_address= "wso2iamtest@gmail.com"
     username= "wso2iamtest"
     password= "Wso2@iam70"
     hostname= smtp.gmail.com
     port= 587
     enable_start_tls= true
     enable_authentication= true
     ```

      
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
        
            1.  Navigate to <https://myaccount.google.com/security> .
            2.  Click **Signing in to Google** on the left menu and make sure
                that the **2-step Verification** is disabled or off.  
                ![google-2-step-verification](../assets/img/using-wso2-identity-server/google-2-step-verification.png)
            3.  Click **Connected apps and sites** on the left menu and enable
                **Allow less secure apps**.  
                ![enabling-less-secure-app](../assets/img/using-wso2-identity-server/enabling-less-secure-app.png)
        
    !!! tip 
        The email template used to send this email notification is
        the **AskPassword** template.
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated
        Emails](../../learn/customizing-automated-emails).
    

4.  Start the Identity Server and log in to the **Management Console**.

5.  In the **Main** tab, click, under **Identity Providers**, click
    **Resident** and expand the **Account Management Policies** tab.
6.  Expand the **User Onboarding** tab and select **Enable User Email
    Verification**. Click **Update** to save changes.

    !!! info 
        The `            enable_email_verification           ` property can be
        enabled for each tenant at tenant creation by adding the following
        configuration to the
        `            <IS_HOME>/repository/conf/deployment.toml         `
        file as seen below.

        ``` xml
        [identity_mgt.user_onboarding]
        enable_email_verification = true
        lock_on_creation= true
        [identity_mgt] 
        email_sender= "internal" 
        ```

### Try it out

You can use one of the following methods to creating a user using the
ask password option.

!!! note
    
    ??? note "Click here for more information If you want to enter any of the !\#$%&'\*+-=?^\_ special characters in the email address"
        1.  Go to management console click the **Main** tab **\> Claims \>
            List**.
        
        2.  Click **http://wso2.org/claims**.
        
        3.  Expand the **Email** claim and click **Edit**.
        
        4.  Add the characters you need out of the
            `             !#$%&'*+-=?^_            ` special characters to the
            Regular Expression.  
            **Example**
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
    console](../../learn/creating-users-using-the-ask-password-option#management-console)
-   [SCIM 2.0](../../learn/creating-users-using-the-ask-password-option#scim-2.0)

#### Management console

Do the following steps to test the account creation using the password
option.

1.  Start the WSO2 Identity Server.

2.  On the Main tab in the **Management Console**, click **Add** under
    Users and Roles.

3.  Click **Add new User.**

    ![add-a-new-user](../assets/img/using-wso2-identity-server/add-a-new-user.png)

    !!! note
    
        If you are using the $ character in the email address, make sure to
        use appropriate escape characters, such as /.  
        Example: `           abc\$def@gmail.com          `
    

4.  Fill in the form:

    1.  Select the user store where you want to create this user account
        from the drop-down as the **Domain**.  
        This includes the list of user stores you configured. See
        [Configuring User Stores](../../learn/configuring-user-stores) for more
        information.
    2.  Enter a unique **User Name** that is used by the user to log in.

    3.  Allow users to enter their own password by selecting the **Ask
        password from user** option.

    4.  Enter a valid **Email Address** and click **Finish**.

5.  The Identity Server sends an email to the email address provided.
    The email contains a redirect URL that directs the users to a screen
    where they must provide their own password.

#### SCIM 2.0

!!! tip "Before you begin!" 
    
    Follow the steps given in the [Configuring SCIM 2.0 Provisioning
    Connector
    Documentation](../../develop/scim-2.0-provisioning-connector)
    to configure WSO2 IS with SCIM 2.0.
    

1.  Add the following configuration to 
    `           <IS_HOME>/repository/conf/deployment.toml          `
    file.

    ``` java
    [scim2] 
    enable_schema_extension="true"
    ```

2.  Now you can use the ask password features using SCIM 2.0. A sample
    curl commands is given below:

    ``` java
        curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Smith","givenName":"Paul"},"userName":"Paul","password":"password","emails":[{"primary":true,"value":"dewmi123455@gmail.com"}],"EnterpriseUser":{askPassword:"true"}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
    ```

!!! info "Related Links"

    -   For information on how to edit an existing email template, see
        [Email Templates](../../learn/customizing-automated-emails).
    -   See [Configuring
        Claims](../../learn/configuring-claims) for more information on how to store
        the claim values in the user store.
