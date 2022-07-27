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

## Set up notifications

[Enable the email sending configurations]({{base_path}}/deploy/configure-email-sending) of the WSO2 Identity Server.

!!! tip
    The email template used to send this email notification is
    the **AdminForcedPasswordReset** template for password recovery via
    recovery email, and the **AdminForcedPasswordResetWithOTP** template
    for password recovery via OTP (one-time password).

    You can edit and customize the email template. For more information
    on how to do this, see see [Customize Automated Emails]({{base_path}}/guides/tenants/customize-automated-mails).

## Enable forced password reset

1. Log in to the WSO2 Identity Server Management Console using administrator credentials (`admin:admin`).
 
2. Go to **Main** > **Identity Providers** > **Resident** and expand **Account Management**.

3. Expand **Password Reset** to see the following options for forced password reset:

    ![forced-password-reset]({{base_path}}/assets/img/guides/forced-password-reset-options.png)

### Using Recovery Email

Enabling this option will send an email to the user with the
corresponding information.

If you wish to enable this feature for all tenants by default, add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file and restart the server.
    
```toml
[identity_mgt.password_reset_by_admin]
enable_emailed_link_based_reset= true
```

### Using OTP

Enabling this option will send an email to the user with a one time
password that the user can use to log in once to the account after
which, the user will be prompted to set a new password.

### Offline method

If you selected **Enable Password Reset Offline**, follow the steps given below.

1.  Go to **Main** > **Claims** > and click **List** to open the list of claim dialects in WSO2 IS>

2.  Click **http://wso2.org/claims** from the list to see the list of claims for this claim dialect.

3.  Select the **One Time Password** claim, click **Edit**, and select
    the **Supported by Default** checkbox.

4.  Click **Update** to save changes.

Now you can go to **Users and Roles** > **List** > **Users** and check the user profile of one of your users. The **One Time Password** field now visible in the profile and it is empty.

## Enable password reset for user
    
Use the following SCIM 2.0 REST API request to trigger a password reset.
    
Set the **forcePasswordReset** attribute under the `urn:ietf:params:scim:schemas:extension:enterprise:2.0:User` schema as
**true** in the SCIM 2.0 user create request. 

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
            
<!--- !!! info 
    In order to force a user to change the password after a specific time
    period, refer [Configuring Password Policy Authenticator](TODO:insert-link). -->

## Try it out

Attempt to log in to the My Account application as the user you created above.

Attempt to log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application as the user you created above. The login attempt will fail and a password reset will be prompted in the form of an error message saying "Login failed! Please recheck the username and password and try again".

**Password Reset via Recovery Email**

If you enabled **Enable password reset via recovery email**, follow the steps given below.
    
1.  Log in to the email account you provided in user profile of the created user. You
    will see a new email with a password reset request.
    
2.  Follow the link provided in the email to reset the password. You can
    now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application
    successfully using the new password.

**Password Reset via OTP**

If you enabled **Enable password reset via OTP**, follow the steps given below.
    
1.  Log in to the email account you provided in user profile of the created user. You
    will see a new email with an OTP (one time password) provided to log
    in to the account.
    
2.  Use the OTP provided in the email to log in as the user you created above. You will be
    redirected to the password reset UI where you are prompted to set a
    new password. Enter the relevant details to set a new password.
    
3.  You can now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application successfully as the user you created using the new password.

**Offline Password Reset**

If you enabled **Enable password reset offline**, follow the steps given below.
        
1.  Log in again to the Management Console as the admin user and check
    user profile of the user you created above. You will see that there is now a code value in the **One Time Password** field.
    
2.  Copy the code and use it as the password of the user you created above to log in to the
    the My Account (`https://<HOST>:<PORT>/myaccount`) application.
    
3. You will be redirected to the password reset UI where you are
    prompted to set a new password. Enter the relevant details to set a
    new password.
    
4. You can now log in to the My Account (`https://<HOST>:<PORT>/myaccount`) application successfully as the user you created above using the new password.


!!! info "Related topics"
    See [Configuring Claims]({{base_path}}/guides/dialects/configure-claims) for more
    information on how to store the claim values in the user store.
