# Invite Users

Administrators can invite new users by sending an invitation to the user's email. This allows the user to set a password and to verify the account details created by the administrator.

## Set up notifications

WSO2 IS should first be configured to send email notifications to users. Apply the following configurations:

-   [Configure the email sender]({{base_path}}/deploy/configure-email-sending) of WSO2 IS.

    !!! tip 
        The email template used to send this email notification is the **AskPassword** template.

        You can edit and customize the email template. For more information
        on how to do this, see [Customizing Automated Emails]({{base_path}}/guides/tenants/customize-automated-mails).

-   If you have migrated from a previous WSO2 IS version, ensure that
the `IdentityMgtEventListener` with the ` orderId=50 ` is set to
**false** and that the Identity Listeners with ` orderId=95 ` and `orderId=97 ` are set to **true** in the `<IS_HOME>/repository/conf/deployment.toml ` file.
    
    !!! Note 
        If there are no such entries for the `event.default_listener.xxx` in the `deployment.toml` file, you can skip this configuration.
    
    ``` toml
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

## Enable the invitation flow

You can enable user registration by invitation in WSO2 IS using the following methods:

### Use the Management Console

!!! info "Before you begin"
    If you are adding users via the Management Console, to
    enable "Ask password" option in the
    Management Console, the following property needs to be added to the `
    <IS_HOME>/repository/conf/deployment-toml` file.

    ``` toml
    [identity_mgt.user_onboarding]
    ask_password_from_user= true
    ```

1.  Sign in to the Management Console.
2.  Go to **Identity Providers** > **Resident** and expand **User Onboarding**.
3.  Expand **Ask Password** and configure the following values:

    ![Resident idp ask password]({{base_path}}/assets/img/fragments/resident-idp-ask-password-configs.png)

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Enable User Email Verification</td>
            <td>If selected, a verification notification will be triggered during user creation.</td>
        </tr>
        <tr>
            <td>Ask password code expiry time</td>
            <td>
                The time duration for which the invitation email will be valid in minutes. For infinite validity, set the value to <code>-1</code>.
            </td>
        </tr>
    </table>

### Use the configuration file
    
You can also enable the invitation flow via the server configuration file.

Add the following configurations to the `deployment.toml` file (stored in the `<IS_HOME>/repository/conf/` folder).

``` toml
[identity_mgt.user_onboarding]
enable_email_verification = true
verification_email_validity = "1440"
lock_on_creation=true
[identity_mgt] 
email_sender= "internal"
[identity_mgt.user_onboarding]
ask_password_email_validity = "1440"
password_generator = "org.wso2.carbon.user.mgt.common.DefaultPasswordGenerator"
```

!!! info "Configure Ask Password for tenants" 
    These properties can be enabled for each tenant at tenant creation by
    adding the corresponding configuration to the `<IS_HOME>/repository/conf/deployment.toml` file.

    Optionally, you can sign in to the Management Console as a tenant
    admin and change the **Resident IDP** configurations accordingly to enable this feature for a specific tenant.

### Use the SCIM2 API

You can use both the **Ask Password** and **Verify Email** features when creating a user using SCIM 2.0. See the [SCIM 2.0 API documentation]({{base_path}}/apis/scim2-rest-apis) for details on using this API.

!!! info "Before you begin"
    If you are adding users via the SCIM 2.0 REST API, note that WSO2 IS sets a random value for the password if the `askPassword` claim is present in the request.

    If you want to disable setting a random value and instead keep the `password` that is sent in the request, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ``` toml
    [identity_mgt.user_onboarding]
    disable_random_value_for_credentials= true
    ```
    
-   Set the **askPassword** attribute under the`
urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema to
true in the SCIM 2.0 user create request. 

    ```java
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{askPassword:"true"}
    ```
        
    !!! Example "A sample curl command is given below:"
        ``` bash
        curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Smith","givenName":"Paul"},"userName":"Paul","password":"password","emails":[{"primary":true,"value":"paul@somemail.com"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{askPassword:"true"}}'}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
        ```
    
-   Set the **verifyEmail** attribute under the`urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema to true in the SCIM2 user create request. 

    ```java
    "urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{verifyEmail:"true"}
    ```
        
    !!! Example "A sample curl command is given below:"
        ``` java
        curl -v -k --user admin:admin --data '{"schemas":[],"name":{"familyName":"Smith","givenName":"Peter"},"userName":"Peter","password":"password","emails":[{"primary":true,"value":"peter@somemail.com"}],"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User":{verifyEmail:"true"}}'}}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users
        ```

## Send invitation to user

Follow the steps below to invite a user.

1.  Log in to the WSO2 Identity Server Management Console using administrator credentials (`admin:admin`).

2.  Go to **Main** > **Identity** > **Users and Roles** and click **Add** to open the **Add Users and Roles** page.

3.  Click **Add New User** and specify the required details as explained below.

    ![add-a-new-user]({{base_path}}/assets/img/fragments/add-a-new-user.png)

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Domain</td>
            <td>
                <p>The user store in which the user details should be created. You can select an exisitng user store from the list.</p>
                <b>Default Value</b>: PRIMARY
                <p>Learn more about <a href="{{base_path}}/deploy/configure-user-stores/">user stores in WSO2 IS</a>.</p>
            </td>
        </tr>
        <tr>
            <td>Username</td>
            <td>
                The username that should be used to sign in.
            </td>
        </tr>
        <tr>
            <td>Ask password from user</td>
            <td>
               This options allows you to specify the email address to which you want the invitation to be emails.
            </td>
        </tr>
        <tr>
            <td>Email Address</td>
            <td>
               <p>The email address of the user to which the invitation should be sent.</p>
               <p>This field is only available when <b>Ask password from user</b> is selected.</p>
               <p><b>Note</b>: If you are using special characters such as <code>$</code> in your email address, see <a href="{{base_path}}/guides/tenants/add-email-special-characters">Configuring Emails with Special Characters</a>.</p>
            </td>
        </tr>
    </table>

5.  Click **Finish** to send the email.  

WSO2 IS sends an email to the provided email address. The email contains a redirect URL that directs the user to a screen to provide their own password.

!!! info "Related topics"
    - [Guide: Email Templates]({{base_path}}/guides/tenants/customize-automated-mails/)
    - [Guide: Admin Creation Workflow]({{base_path}}/admin-creation-workflow) 
    - [Guide: User Self Registration Workflow]({{base_path}}/self-registration-workflow)
    - [Guide: Just in Time User Provisioning Workflow]({{base_path}}/jit-workflow)
    - [Guide: Bulk Import Users]({{base_path}}/bulk-import-users)
    - [Guide: Outbound Provisioning]({{base_path}}/outbound-provisioning)
    <!--- [Concept: Ask Password and Email Verification](TODO:insert-link-to-concept) --->

   
