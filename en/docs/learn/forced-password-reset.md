# Forced Password Reset

The WSO2 Identity Server allows authorized administrative persons to
trigger a password reset for a given user account. This may be required
for the following situations:

1.  The user forgets the credentials and makes a request to the
    administrator for a password reset
2.  Credentials may get exposed to outsiders hence, the user needs to reset the password and lock the account, till then that no
    one else can log in.

In such situations, the user has the option of contacting the admin and
based on the validity of the request, the admin can force a password
reset for the user account. Once it is initiated, at the point of login,
the basic authenticator processes the login request and prompts the
corresponding dialogs or error messages based on account status.

The below steps describe how you can configure WSO2 Identity Server
for forced password reset:

1.  Enable the email sending configurations of the WSO2 Identity Server
    as explained [here](../../setup/configuring-email-sending).

    !!! tip
        The email template used to send this email notification is
        the **AdminForcedPasswordReset** template for password recovery via
        recovery email, and the **AdminForcedPasswordResetWithOTP** template
        for password recovery via OTP (one-time password).
    
        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated
        Emails](../../learn/customizing-automated-emails).
    
2. If you wish to enable this feature for all tenants by default, add the following configureation to the `<IS_HOME>/repository/conf/deployment.toml` file.

    ```toml
    [identity_mgt.password_reset_by_admin]
    enable_emailed_link_based_reset= true
    ```

3.  Start the Identity Server and log in to the management console with
    admin credentials.
    
4.  Create a new user with the username "Alex" and update the user
    profile with a valid email address and other information.
5.  Create a new role called "test role" with login permissions and
    assign it to the new user, "tom".

    !!! tip You can verify this by logging in to the
    [user portal](https://localhost:9443/user-portal) as Tom. The log in
    attempt should be successful. Log out from the portal.
    

6.  Click on **Resident** under **Identity Providers** found in the
    **Main** tab.

7.  Expand the **Account Management Policies** tab.

8.  Expand the **Password Reset** tab. You will see the following
    options for forced password reset:

    ![forced-password-reset](../assets/img/using-wso2-identity-server/forced-password-reset.png) 

## Password Reset via Recovery Email

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
    flow by updating the `
    http://wso2.org/claims/identity/adminForcedPasswordReset ` claim to
    'true' for the relevant users. To do this, follow the steps
    explained later in this page under [Invoke Admin Force Password Reset](#invoke-admin-force-password-reset).
    
4.  Log out of the [user portal](https://localhost:9443/user-portal) and
    attempt to log in as the user you created above, "Tom". The login
    attempt will fail and a password reset will be prompted in the form
    of an error message saying "Login failed! Please recheck the
    username and password and try again".
5.  Log in to the email account you provided in Tom's user profile. You
    will see a new email with a password reset request.
6.  Follow the link provided in the email to reset the password. You can
    now log in to the [user portal](https://localhost:9443/user-portal)
    successfully as Tom using the new password.

## Password Reset via OTP

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
    claim to **true** for the relevant users. To do this, follow the steps
    explained later in this page under [Invoke Admin Force Password Reset](#invoke-admin-force-password-reset).
4.  Log out of the [user portal](https://localhost:9443/user-portal) and
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
    [user portal](https://localhost:9443/user-portal) successfully as Tom
    using the new password.

## Offline Password Reset

1.  Configure the properties mentioned above, start the identity server
    and navigate to the relevant interface.
2.  Select **Enable Password Reset Offline** from the three options
    listed, and click **Update**.
3.  Click on **List** under **Claims** found in the **Main** tab and
    select http://wso2.org/claims.
4.  Select the **One Time Password** claim, click **Edit** and select
    the **Supported by Default** checkbox. Click **Update** to save
    changes.
5.  Navigate to **Users and Roles\>List\>Users** and check the user
    profile of the user you created above (Tom). You will see that the
    value for the **One Time Password** field is empty.
6.  Next, admin users can force a password reset flow by updating the
    `                     http://wso2.org/claims/identity/adminForcedPasswordReset                   `
    claim to **true** for the relevant users. To do this, follow the steps
    explained later in this page under [Invoke Admin Force Password Reset](#invoke-admin-force-password-reset).
7.  Log out of the [user portal](https://localhost:9443/user-portal) and
    attempt to log in again as the user you created above, "Tom". The
    log in attempt will fail.
8.  Log in again to the management console as the admin user and check
    Tom's user profile. You will see that there is now a code value in
    the **One Time Password** field.
9.  Copy the code and use it as Tom's password to log in to the
    [user portal](https://localhost:9443/user-portal).
10. You will be redirected to the password reset UI where you are
    prompted to set a new password. Enter the relevant details to set a
    new password.
11. You can now log in to the
    [user portal](https://localhost:9443/user-portal) successfully as
    Tom using the new password.

## Invoke Admin Force Password Reset

### Using SCIM 2.0 API

1. Login to the Management Console.
2. Add a new external claim by following `main` -> `Claims` -> `Add` ->
   `Add External Claim`.
3. Use following values and add.
    
	| Field              | Value                                                                       |
    |--------------------|-----------------------------------------------------------------------------|
    | Dialect URI*       |urn:ietf:params:scim:schemas:extension:enterprise:2.0:User:forcePasswordReset|
    |External Claim URI* |forcePasswordReset                                                           | 
    |Mapped Local Claim* |http://wso2.org/claims/identity/adminForcedPasswordReset                     |
    
4. Use following SCIM 2.0 Request to trigger a password reset
    
    You need to set the **forcePasswordReset** attribute under the`
    urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema as
    true in the SCIM2 user create request. 
    ```java
    POST https://<host>:<port>/scim2/Users/<users-scim-id>

        {"schemas": 
        ["urn:ietf:params:scim:api:messages:2.0:PatchOp","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"],
         "Operations": [
            {"op": "add",
            "value": {"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {"forcePasswordReset": true}
        }}]
        }
    ```
    
    !!! Example "A sample curl commands is given below:" 
    
        ``` java 
        curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"], "Operations": [ {"op": "add","value": {"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {"forcePasswordReset": true}}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/c02857fd-2a51-427f-bf25-a9f76b85659d
        ```

### Using SOAP Based admin services

1.  Discover the UserProfileMgtService admin service. For information on how to do this, see [Calling Admin
    Services](../../develop/calling-admin-services).
2.  Create a new [SOAP-UI](https://www.soapui.org/) project by
    importing above the WSDL:
    <https://localhost:9443/services/UserProfileMgtService?wsdl>.

3.  Use the `             setUserProfile            ` method to send
    a SOAP request to update the
    `                           http://wso2.org/claims/identity/adminForcedPasswordReset                         `
    claim of the project.

    **Sample SOAP Request**

    ``` xml
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
    
    !!! Info 
        For a user in a secondary user store, you should send
        the username in the format of `<user-store-domain>/<user-name>`
        in above SOAP request.
    
4.  Add new a new basic authorization from the SOAP-UI request
    window and enter valid credentials to authenticate with the
    identity server.  
    ![add-basic-authorization](../assets/img/using-wso2-identity-server/add-basic-authorization.png)
    
    !!! Info 
        To try the scenario for a tenant user, provide the
        credentials of a tenant administer in the authentication step.
            
            
!!! info 
    In order to force a user to change the password after some specific time
    period, please refer " [Configuring Password Policy
    Authenticator](../../develop/password-policy-authenticator)
    " documentation.


!!! info "Related Links"
    See [Configuring Claims](../../learn/configuring-claims) for more
    information on how to store the claim values in the user store.
