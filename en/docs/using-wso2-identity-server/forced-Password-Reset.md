# Forced Password Reset

The WSO2 Identity Server allows authorized administrative persons to
trigger a password reset for a given user account. This may be required
for the following situations:

1.  1.  The user forgets the credentials and makes a request to the
        administrator for a password reset
    2.  Credentials may get exposed to outsiders hence, the user needs
        to reset the password and lock the account, till then that no
        one else can log in.

In such situations, the user has the option of contacting the admin and
based on the validity of the request, the admin can force a password
reset for the user account. Once it is initiated, at the point of login,
the b asic authenticator processes the login request and prompts the
corresponding dialogs or error messages based on account status.

The below steps describe how you can configure WSO2 Identity Server
for forced password reset:

1.  Open the `          output-event-adapters.xml         ` file found
    in the `          <IS_HOME>/repository/conf         ` directory.
2.  Configure the relevant property values for the email server that you
    need to configure for this service under the
    `           <adapterConfig type="email">          ` tag.

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

    !!! tip
    
        **Tip:** The email template used to send this email notification is
        the **AdminForcedPasswordReset** template for password recovery via
        recovery email, and the **AdminForcedPasswordResetWithOTP** template
        for password recovery via OTP (one-time password).
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated
        Emails](_Customizing_Automated_Emails_).
    

3.  Start the Identity Server and log in to the management console with
    admin credentials.
4.  Create a new user with the username "tom" and update his user
    profile with a valid email address and other information.
5.  Create a new role called "test role" with login permissions and
    assign it to the new user, "tom".

    !!! tip
    
        **Tip** : You can verify this by logging in to the
        [dashboard](https://localhost:9443/dashboard) as Tom. The log in
        attempt should be successful. Log out and log back in with admin
        credentials.
    

6.  Click on **Resident** under **Identity Providers** found in the
    **Main** tab.

7.  Expand the **Account Management Policies** tab.

8.  Expand the **Password Reset** tab. You will see the following
    options for forced password reset:

    -   [Password Reset via Recovery
        Email](#ForcedPasswordReset-PasswordResetviaRecoveryEmail)
    -   [Password Reset via
        OTP](#ForcedPasswordReset-PasswordResetviaOTP)
    -   [Offline Password
        Reset](#ForcedPasswordReset-OfflinePasswordReset)

    ![]( ../../assets/img/103330582/103330584.png) 

#### Password Reset via Recovery Email

Enabling this option will send an email to the user with the
corresponding information. The email template for this option can be
configured in the email-admin-config.xml file found in the
`         [IS_HOME]/repository/conf/email/        ` directory under the
`         AdminForcedPasswordReset        ` tag. Follow the steps below
to see a sample of how this works.

1.  Configure the properties mentioned above, start the Identity Server
    and navigate to the relevant interface.
2.  Select **Enable Password Reset via Recovery Email** from the three
    options listed, and click **Update**.
3.  Once the option is selected, admin users can force a password reset
    flow by updating the
    `                     http://wso2.org/claims/identity/adminForcedPasswordReset                   `
    claim to 'true' for the relevant users. To do this, follow the steps
    below:
    1.  Discover the [UserProfileMgtService admin
        service](https://localhost:9443/services/UserProfileMgtService?wsdl)
        . For information on how to do this, see [Calling Admin
        Services](https://docs.wso2.com/display/IS530/Calling+Admin+Services)
        .
    2.  Create a new [SOAP-UI](https://www.soapui.org/) project by
        importing above the WSDL:
        <https://localhost:9443/services/UserProfileMgtService?wsdl> .

    3.  Use the `             setUserProfile            ` method to send
        a SOAP request to update the
        `                           http://wso2.org/claims/identity/adminForcedPasswordReset                         `
        claim of the project.

        **Sample SOAP Request**

        ``` java
        <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.profile.user.identity.carbon.wso2.org" xmlns:xsd="http://mgt.profile.user.identity.carbon.wso2.org/xsd">
            <soapenv:Header/>
            <soapenv:Body>
                <mgt:setUserProfile>
                    <mgt:username>tom</mgt:username>
                    <mgt:profile>
                        <xsd:fieldValues>
                            <xsd:claimUri>http://wso2.org/claims/identity/adminForcedPasswordReset</xsd:claimUri>
                            <xsd:fieldValue>true</xsd:fieldValue>
                        </xsd:fieldValues>
                        <xsd:profileName>default</xsd:profileName>
                    </mgt:profile>
                </mgt:setUserProfile>
            </soapenv:Body>
        </soapenv:Envelope>
        ```

    4.  Add new a new basic authorization from the SOAP-UI request
        window and enter valid credentials to authenticate with the
        identity server.  
        ![]( ../../assets/img/103330582/103330583.png)

4.  Log out of the [dashboard](https://localhost:9443/dashboard) and
    attempt to log in as the user you created above, "Tom". The login
    attempt will fail and a password reset will be prompted in the form
    of an error message saying "Login failed! Please recheck the
    username and password and try again".
5.  Log in to the email account you provided in Tom's user profile. You
    will see a new email with a password reset request.
6.  Follow the link provided in the email to reset the password. You can
    now log in to the [dashboard](https://localhost:9443/dashboard)
    successfully as Tom using the new password.

#### Password Reset via OTP

Enabling this option will send an email to the user with a one time
password that the user can use to log in once to the account after
which, the user will be prompted to set a new password. The email
template for this option can be configured in the
`         email-admin-config.        ` xml file found in the
`         [IS_HOME]/repository/conf/email/        ` directory under the
`         AdminForcedPasswordResetWithOTP        ` tag.

1.  Configure the properties mentioned above, start the IS server and
    navigate to the relevant interface.
2.  Select **Enable Password Reset via OTP** from the three options
    listed, and click **Update**.
3.  Once the option is selected, admin users can force a password reset
    flow by updating the
    `                     http://wso2.org/claims/identity/adminForcedPasswordReset                   `
    claim to **true** for the relevant users. To do this, follow the
    steps below:
    1.  Discover the [UserProfileMgtService admin
        service](https://localhost:9443/services/UserProfileMgtService?wsdl)
        . For information on how to do this, see [Calling Admin
        Services](https://docs.wso2.com/display/IS530/Calling+Admin+Services)
        .
    2.  Create a new [SOAP-UI](https://www.soapui.org/) project by
        importing above the WSDL:
        <https://localhost:9443/services/UserProfileMgtService?wsdl> .

    3.  Use the `             setUserProfile            ` method to send
        a soap request to update the
        `                           http://wso2.org/claims/identity/adminForcedPasswordReset                         `
        claim of the project.

        **Sample SOAP Request**

        ``` java
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.profile.user.identity.carbon.wso2.org" xmlns:xsd="http://mgt.profile.user.identity.carbon.wso2.org/xsd">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <mgt:setUserProfile>
                            <mgt:username>tom</mgt:username>
                            <mgt:profile>
                                <xsd:fieldValues>
                                    <xsd:claimUri>http://wso2.org/claims/identity/adminForcedPasswordReset</xsd:claimUri>
                                    <xsd:fieldValue>true</xsd:fieldValue>
                                </xsd:fieldValues>
                                <xsd:profileName>default</xsd:profileName>
                            </mgt:profile>
                        </mgt:setUserProfile>
                    </soapenv:Body>
                </soapenv:Envelope>
        ```

    4.  Add new a new basic authorization from the SOAP-UI request
        window and enter valid credentials to authenticate with the
        identity server.  
        ![]( ../../assets/img/103330582/103330583.png)

4.  Log out of the [dashboard](https://localhost:9443/dashboard) and
    attempt to login again as the user you created above, "Tom". The
    login attempt will fail and a password reset will be prompted in the
    form of an error message saying "Login failed! Please recheck the
    username and password and try again".
5.  Log in to the email account you provided in Tom's user profile. You
    will see a new email with an OTP (one time password) provided to log
    in to the account.
6.  Use the OTP provided in the email to log in as Tom. You will be
    redirected to the password reset UI where you are prompted to set a
    new password. Enter the relevant details to set a new password.
7.  You can now log in to the
    [dashboard](https://localhost:9443/dashboard) successfully as Tom
    using the new password.

#### Offline Password Reset

1.  Configure the properties mentioned above, start the identity server
    and navigate to the relevant interface.
2.  Select **Enable Password Reset Offline** from the three options
    listed, and click **Update**.
3.  Click on **List** under **Claims** found in the **Main** tab and
    select http://wso2.org/claims .
4.  Select the **One Time Password** claim, click **Edit** and select
    the **Supported by Default** checkbox. Click **Update** to save
    changes.
5.  Navigate to **Users and Roles\>List\>Users** and check the user
    profile of the user you created above (Tom). You will see that the
    value for the **One Time Password** field is empty.
6.  Next, admin users can force a password reset flow by updating the
    `                     http://wso2.org/claims/identity/adminForcedPasswordReset                   `
    claim to **true** for the relevant users. To do this, follow the
    steps below:
    1.  Discover the [UserProfileMgtService admin
        service](https://localhost:9443/services/UserProfileMgtService?wsdl)
        . For information on how to do this, see [Calling Admin
        Services](https://docs.wso2.com/display/IS530/Calling+Admin+Services)
        .
    2.  Create a new [SOAP-UI](https://www.soapui.org/) project by
        importing above the WSDL:
        <https://localhost:9443/services/UserProfileMgtService?wsdl> .

    3.  Use the `             setUserProfile            ` method to send
        a soap request to update the
        `                           http://wso2.org/claims/identity/adminForcedPasswordReset                         `
        claim of the project.

        **Sample SOAP Request**

        ``` java
                <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:mgt="http://mgt.profile.user.identity.carbon.wso2.org" xmlns:xsd="http://mgt.profile.user.identity.carbon.wso2.org/xsd">
                    <soapenv:Header/>
                    <soapenv:Body>
                        <mgt:setUserProfile>
                            <mgt:username>tom</mgt:username>
                            <mgt:profile>
                                <xsd:fieldValues>
                                    <xsd:claimUri>http://wso2.org/claims/identity/adminForcedPasswordReset</xsd:claimUri>
                                    <xsd:fieldValue>true</xsd:fieldValue>
                                </xsd:fieldValues>
                                <xsd:profileName>default</xsd:profileName>
                            </mgt:profile>
                        </mgt:setUserProfile>
                    </soapenv:Body>
                </soapenv:Envelope>
        ```

    4.  Add new a new basic authorization from the SOAP-UI request
        window and enter valid credentials to authenticate with the
        identity server.  
        ![]( ../../assets/img/103330582/103330583.png)

7.  Log out of the [dashboard](https://localhost:9443/dashboard) and
    attempt to log in again as the user you created above, "Tom". The
    log in attempt will fail.
8.  Log in again to the management console as the admin user and check
    Tom's user profile. You will see that there is now a code value in
    the **One Time Password** field.
9.  Copy the code and use it as Tom's password to log in to the
    [dashboard](https://localhost:9443/dashboard).
10. You will be redirected to the password reset UI where you are
    prompted to set a new password. Enter the relevant details to set a
    new password.
11. You can now log in to the
    [dashboard](https://localhost:9443/dashboard) successfully as Tom
    using the new password.

In order to force a user to change the password after some specific time
period, please refer " [Configuring Password Policy
Authenticator](https://docs.wso2.com/display/ISCONNECTORS/Configuring+Password+Policy+Authenticator)
" documentation.

**Related Links**

By default, the claim values of the identity claims used in this feature
are stored in the JDBC datasource configured in the
`           identity.xml          ` file. See [Configuring
Claims](https://docs.wso2.com/display/IS540/Configuring+Claims) for more
information on how to store the claim values in the user store.
