# Forced Password Reset 

The WSO2 Identity Server allows authorized administrative persons to
trigger a password reset for a given user account. This may be required
for the following situations:

1.  The user forgets the credentials and makes a request to the
    administrator for a password reset.
    
2.  Credentials may get exposed to outsiders. Hence, the user needs to reset the password and lock the account, till then so that no
    one else can log in.

In such situations, the user has the option of contacting the admin and
based on the validity of the request, the admin can force a password
reset for the user account. Once it is initiated, at the point of login,
the basic authenticator processes the login request and prompts the
corresponding dialogs or error messages based on account status.

---

## Prerequisites

**Create a user**

{!fragments/create-user-for-recovery-flows.md!}

**Configure the email adapter to send emails**

!!! note
    This step is not required for [Offline Password Reset](../../../guides/password-mgt/forced-password-reset/#offline-password-reset).
    
{!fragments/configure-email-sending.md!}

!!! tip
        The email template used to send this email notification is
        the **AdminForcedPasswordReset** template for password recovery via
        recovery email, and the **AdminForcedPasswordResetWithOTP** template
        for password recovery via OTP (one-time password).
    
        You can edit and customize the email template. For more information
        on how to do this, see see [Customize Automated Emails](../../../guides/tenants/customize-automated-mails).

---

## Configure forced password reset feature

1. Log in to the WSO2 Identity Server Management Console (`https://<IS_HOST>:<PORT>/carbon`) using administrator credentials (`admin:admin`).
 
6. Navigate to **Main** > **Identity** > **Identity Providers** and click on **Resident**.

7. Expand the **Account Management** tab.

8. Expand the **Password Reset** tab. You will see the following options for forced password reset:

   ![forced-password-reset](../../assets/img/guides/forced-password-reset-options.png) 
    
---

## Password Reset via Recovery Email

Enabling this option will send an email to the user with the
corresponding information. 

!!! tip
    The email template for this option is `AdminForcedPasswordReset`. 

Follow the steps below to see how this works.

1.  Select **Enable password reset via recovery e-mail** from the three
    options listed, and click **Update**.
    
    !!! tip
        If you wish to enable this feature for all tenants by default, add the following configuration to the 
        `<IS_HOME>/repository/conf/deployment.toml` file and restart the server.
    
        ```toml
        [identity_mgt.password_reset_by_admin]
        enable_emailed_link_based_reset= true
        ```
    
2.  Once the option is selected, admin users can force a password reset
    flow by updating the `http://wso2.org/claims/identity/adminForcedPasswordReset` claim to
    **true** for the relevant users. To do this, follow the steps
    explained later in this page under [Invoke Admin Force Password Reset](#invoke-admin-force-password-reset).
    
3.  Attempt to log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application as the user you created above. 
    The login attempt will fail and a password reset will be prompted in the form
    of an error message saying "Login failed! Please recheck the
    username and password and try again".
    
5.  Log in to the email account you provided in user profile of the created user. You
    will see a new email with a password reset request.
    
6.  Follow the link provided in the email to reset the password. You can
    now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application
    successfully using the new password.

---

## Password Reset via OTP

Enabling this option will send an email to the user with a one time
password that the user can use to log in once to the account after
which, the user will be prompted to set a new password.

!!! tip
    The email template for this option is `AdminForcedPasswordResetWithOTP`.
    
1.  Select **Enable password reset via OTP** from the three options listed, and click **Update**.
    
2.  Once the option is selected, admin users can force a password reset
    flow by updating the
    `                     http://wso2.org/claims/identity/adminForcedPasswordReset                   `
    claim to **true** for the relevant users. To do this, follow the steps
    explained later in this page under [Invoke Admin Force Password Reset](#invoke-admin-force-password-reset).
    
3.  Attempt to log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application as the user you created above. The
    login attempt will fail and a password reset will be prompted in the
    form of an error message saying "Login failed! Please recheck the
    username and password and try again".
    
4.  Log in to the email account you provided in user profile of the created user. You
    will see a new email with an OTP (one time password) provided to log
    in to the account.
    
5.  Use the OTP provided in the email to log in as the user you created above. You will be
    redirected to the password reset UI where you are prompted to set a
    new password. Enter the relevant details to set a new password.
    
6.  You can now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application successfully as the user you created using the 
    new password.
    
---

## Offline Password Reset

1.  Select **Enable Password Reset Offline** from the three options
    listed, and click **Update**.
    
2.  Click on **List** under **Claims** found in the **Main** > **Identity** tab and
    select **http://wso2.org/claims**.
    
3.  Select the **One Time Password** claim, click **Edit** and select
    the **Supported by Default** checkbox. Click **Update** to save
    changes.
    
4.  Navigate to **Users and Roles** > **List** > **Users** and check the user
    profile of the user you created above. You will see that the
    value for the **One Time Password** field is empty.
    
5.  Next, admin users can force a password reset flow by updating the
    `                     http://wso2.org/claims/identity/adminForcedPasswordReset                   `
    claim to **true** for the relevant users. To do this, follow the steps
    explained later in this page under [Invoke Admin Force Password Reset](#invoke-admin-force-password-reset).
    
6.  Attempt to log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application as the user you created above. The
    log in attempt will fail.
    
7.  Log in again to the Management Console (`https://<IS_HOST>:<PORT>/carbon`) as the admin user and check
    user profile of the user you created above. You will see that there is now a code value in
    the **One Time Password** field.
    
8.  Copy the code and use it as the password of the user you created above to log in to the
    the My Account (`https://<HOST>:<PORT>/myaccount`) application.
    
9. You will be redirected to the password reset UI where you are
    prompted to set a new password. Enter the relevant details to set a
    new password.
    
10. You can now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application successfully as the user you created above using the 
    new password.
 
---

## Invoke Admin Force Password Reset

### Using SCIM 2.0 API
    
Use the following SCIM 2.0 request to trigger a password reset.
    
Set the **forcePasswordReset** attribute under the `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema as
**true** in the SCIM2 user create request. 

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
    
!!! Example "A sample curl command is given below:" 

    ``` java 
    curl -v -k --user admin:admin -X PATCH -d '{"schemas":["urn:ietf:params:scim:api:messages:2.0:PatchOp","urn:ietf:params:scim:schemas:extension:enterprise:2.0:User"], "Operations": [ {"op": "add","value": {"urn:ietf:params:scim:schemas:extension:enterprise:2.0:User": {"forcePasswordReset": true}}}]}' --header "Content-Type:application/json" https://localhost:9443/scim2/Users/c02857fd-2a51-427f-bf25-a9f76b85659d
    ```
---

### Using SOAP Based admin services

1.  Discover the `UserProfileMgtService` admin service. For information on how to do this, see [Call Admin Services](../../../apis/call-admin-services/).
2.  Create a new [SOAP-UI](https://www.soapui.org/) project by importing the WSDL:
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
        in the above SOAP request.
    
4.  Add a new basic authorization from the SOAP-UI request
    window and enter valid credentials to authenticate with the
    identity server.  
    
    ![add-basic-authorization](../../assets/img/guides/add-basic-authorization.png)
    
    !!! Info 
        To try the scenario for a tenant user, provide the
        credentials of a tenant administer in the authentication step.
            
<!--- !!! info 
    In order to force a user to change the password after a specific time
    period, refer [Configuring Password Policy Authenticator](TODO:insert-link). -->


!!! info "Related Links"
    See [Configuring Claims](../../../guides/dialects/configure-claims) for more
    information on how to store the claim values in the user store.
