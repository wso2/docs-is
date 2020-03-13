# What Has Changed

WSO2 Identity Server 5.10.0 brings a range of new features and major improvements. In IS 5.10.0 following aspects has 
been changed compared to the previous IS versions.

This page provides details about the behavioral changes from WSO2 Identity Server 5.9.0 to 5.10.0.

??? note "If you are migrating from an older version of Identity Server"
    In order to find the changes introduced in the previous versions please checkout the relevant docs
    
    - Changes introduced in IS 5.9.0 can be found at [What Has Changed in IS 5.9.0](https://is.docs.wso2.com/en/latest/setup/migrating-what-has-changed/)
    - Changes introduced in IS 5.8.0 and before can be found at [Migrating Configurations to IS 5.8.0](https://docs.wso2.com/display/IS580/Upgrading+From+an+Older+Version+of+WSO2+IS#UpgradingFromanOlderVersionofWSO2IS-Migratingtheconfigurations)

## Handling Last login Time as an Identity Claim
In the previous versions of WSO2 Identity Server, the Last login time claim(used in account suspension) has been handled 
as a default claim. From IS 5.10.0 onwards it will be handled as an identity claim. 

!!! note "NOTE" 
    If you want to have the previous behaviour please add the following property in the `deployment.toml` file located at 
    `<IS_HOME>/repository/conf/` directory.
    ```toml
    [identity_mgt_account_suspension]
    use_identity_claims = false
    ```

## SCIM has been enabled by default
From WSO2 Identity Server 5.10.0 onwards SCIM has been enabled by default for all the User Store Manager types. 

## Email Templates has been changed for Account Lock
From IS 5.10.0 onwards, different set of email templates will be used for account lock feature to notify the below 
events,

- Account locking by exceeding `Maximum Failed Login Attempts` - **AccountLockFailedAttempt**
- Account unlocking by exceeding `Account Unlock Time` - **AccountUnlockTimeBased**
- Account locking by administrator - **AccountLockAdmin**
- Account unlocking by administrator - **AccountUnlockAdmin**

If the above new templates are not available in the server, then the old templates will be used to notify account lock 
events which are **AccountLock** and **AccountUnLock**. 

If you wish to have the new templates, then please add the following templates at management by referring to the 
instructions at [Customizing AutomatedEmails](../../learn/customizing-automated-emails). Consider that you should
 migrate the customization done to the previous templates to the newly added templates. 
 
??? Sample template for "AccountLockFailedAttempt"
     
     - Email Template Type: AccountLockFailedAttempt
     - Email Template Locale: English(United States)
     - Email Content Type:text/html
     - Email Template Subject: WSO2 - Your Account has been Locked
     - Email Body: 
     ```  
     <![CDATA[
     <table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
     <tr>
       <td style="padding: 30px 30px 20px 30px;">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
             <tr>
                <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                   <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0"/></a>
                </td>
             </tr>
             <tr>
                <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                   <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                      Account Locked
                   </h1>
                </td>
             </tr>
             <tr>
                <td style="text-align: left; padding: 0px 50px;" valign="top">
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                      Hi {{user.claim.givenname}},
                   </p>
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                      Please note that the account registered with the user name <b>{{user-name}}</b> has been locked. Please try again later. <br>
                   </p>
                </td>
             </tr>
             <tr>
                <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                      Thanks,<br/>WSO2 Identity Server Team
                   </p>
                </td>
             </tr>
             <tr>
                <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                   <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                      &copy; 2018
                      <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                      <br>
                      787 Castro Street, Mountain View, CA 94041.
                   </p>
                </td>
             </tr>
          </table>
       </td>
     </tr>
     </table>
     ]]
     ```
     - Email Footer: ---
 
??? Sample template for "AccountUnlockTimeBased"
 
     - Email Template Type: AccountUnlockTimeBased
     - Email Template Locale: English(United States)
     - Email Content Type:text/html
     - Email Template Subject: WSO2 - Your Account has been Unlocked
     - Email Body: 
     ```  
     <![CDATA[<table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
        <tr>
        <td style="padding: 30px 30px 20px 30px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
            <tr>
                <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                    <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0" /></a>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                    <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                        Account Unlocked
                    </h1>
                </td>
            </tr>
            <tr>
                <td style="text-align: left; padding: 0px 50px;" valign="top">
                    <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                        Hi {{user.claim.givenname}},
                    </p>
                    <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                        Please note that the account registered with the user name <b>{{user-name}}</b> has been unlocked automatically as locked time exceeded.  <br>
                    </p>
                </td>
            </tr>
            <tr>
                <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                    <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                        Thanks,<br/>WSO2 Identity Server Team
                    </p>
                </td>
            </tr>
            <tr>
                <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                    <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                        &copy; 2018
                        <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                        <br>
                        787 Castro Street, Mountain View, CA 94041.
                    </p>
                </td>
            </tr>
            </table>
        </td>
        </tr>
        </table>]]>
     ```
     - Email Footer: ---
     
??? Sample template for "AccountLockAdmin"
    
    - Email Template Type: AccountLockAdmin
    - Email Template Locale: English(United States)
    - Email Content Type:text/html
    - Email Template Subject: WSO2 - Your Account has been Locked
    - Email Body: 
    ```  
    <![CDATA[<table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
       <tr>
       <td style="padding: 30px 30px 20px 30px;">
           <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
           <tr>
               <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                   <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0"/></a>
               </td>
           </tr>
           <tr>
               <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                   <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                       Account Locked
                   </h1>
               </td>
           </tr>
           <tr>
               <td style="text-align: left; padding: 0px 50px;" valign="top">
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                       Hi {{user.claim.givenname}},
                   </p>
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                       Please note that the account registered with the user name <b>{{user-name}}</b> has been locked. Please Contact the Administrator.<br>
                   </p>
               </td>
           </tr>
           <tr>
               <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                       Thanks,<br/>WSO2 Identity Server Team
                   </p>
               </td>
           </tr>
           <tr>
               <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                   <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                       &copy; 2018
                       <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                       <br>
                       787 Castro Street, Mountain View, CA 94041.
                   </p>
               </td>
           </tr>
           </table>
       </td>
       </tr>
       </table>]]>
    ```
    - Email Footer: ---

??? Sample template for "AccountUnlockAdmin"

    - Email Template Type: AccountUnlockAdmin
    - Email Template Locale: English(United States)
    - Email Content Type:text/html
    - Email Template Subject: WSO2 - Your Account has been Unlocked
    - Email Body: 
    ```  
    <![CDATA[<table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
       <tr>
       <td style="padding: 30px 30px 20px 30px;">
           <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
           <tr>
               <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                   <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0" /></a>
               </td>
           </tr>
           <tr>
               <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                   <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                       Account Unlocked
                   </h1>
               </td>
           </tr>
           <tr>
               <td style="text-align: left; padding: 0px 50px;" valign="top">
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                       Hi {{user.claim.givenname}},
                   </p>
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                       Please note that the account registered with the user name <b>{{user-name}}</b> has been unlocked by administrator. <br>
                   </p>
               </td>
           </tr>
           <tr>
               <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                       Thanks,<br/>WSO2 Identity Server Team
                   </p>
               </td>
           </tr>
           <tr>
               <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                   <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                       &copy; 2018
                       <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                       <br>
                       787 Castro Street, Mountain View, CA 94041.
                   </p>
               </td>
           </tr>
           </table>
       </td>
       </tr>
       </table>]]>
    <![CDATA[<table align="center" cellpadding="0" cellspacing="0" border="0" width="100%"bgcolor="#f0f0f0">
       <tr>
       <td style="padding: 30px 30px 20px 30px;">
           <table cellpadding="0" cellspacing="0" border="0" width="100%" bgcolor="#ffffff" style="max-width: 650px; margin: auto;">
           <tr>
               <td colspan="2" align="center" style="background-color: #333; padding: 40px;">
                   <a href="http://wso2.com/" target="_blank"><img src="http://cdn.wso2.com/wso2/newsletter/images/nl-2017/wso2-logo-transparent.png" border="0" /></a>
               </td>
           </tr>
           <tr>
               <td colspan="2" align="center" style="padding: 50px 50px 0px 50px;">
                   <h1 style="padding-right: 0em; margin: 0; line-height: 40px; font-weight:300; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 1em;">
                       Account Unlocked
                   </h1>
               </td>
           </tr>
           <tr>
               <td style="text-align: left; padding: 0px 50px;" valign="top">
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                       Hi {{user.claim.givenname}},
                   </p>
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #666; text-align: left; padding-bottom: 3%;">
                       Please note that the account registered with the user name <b>{{user-name}}</b> has been unlocked by administrator. <br>
                   </p>
               </td>
           </tr>
           <tr>
               <td style="text-align: left; padding: 30px 50px 50px 50px" valign="top">
                   <p style="font-size: 18px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #505050; text-align: left;">
                       Thanks,<br/>WSO2 Identity Server Team
                   </p>
               </td>
           </tr>
           <tr>
               <td colspan="2" align="center" style="padding: 20px 40px 40px 40px;" bgcolor="#f0f0f0">
                   <p style="font-size: 12px; margin: 0; line-height: 24px; font-family: 'Nunito Sans', Arial, Verdana, Helvetica, sans-serif; color: #777;">
                       &copy; 2018
                       <a href="http://wso2.com/" target="_blank" style="color: #777; text-decoration: none">WSO2</a>
                       <br>
                       787 Castro Street, Mountain View, CA 94041.
                   </p>
               </td>
           </tr>
           </table>
       </td>
       </tr>
       </table>]]>
    ```
    - Email Footer: ---

## Handling Internal Scopes
From IS 5.10.0 onwards, internal scopes validation while accessing internal resources will be enabled by default, 
but this will break existing applications using some APIs such as scim2/Me.

!!! note "NOTE"
    We can go back to the previous behaviour and disable scope based permissions with the following config in the 
    `deployment.toml` file.
    ```toml
    [resource_access_control]
    disable_scope_validation=true
    ```

## Introducing two Separate Configuration to Manage OIDC Consent Flow
This will introduce the following two new properties in the `identity.xml` inside OpenIDConnect tag to manage the 
consent during OIDC login and logout flows.
- SkipLoginConsent - Skip the OIDC login consent
- SkipLogoutConsent - Skip the OIDC logout consent

If these properties are not defined, the value will be retrieved from SkipUserConsent

These properties can be managed by adding the below configuration to `deployment.toml` file
```toml
[oauth]
prompt_login_consent = false
prompt_logout_consent = false
```

## WSDL of the Application Management Service has been changed
In IS 5.10.0, there are significant changes has been introduced to the WSDL of the Application Management Admin Service 
with the addition of new properties to the service provider model object. Therefore SOAP API consumers should 
regenerate the stub or upgrade the dependency version of the stub.

## WSDL of the Identity Provider Management Service has been changed
In IS 5.10.0, there are significant changes has been introduced to the WSDL of the Identity Provider Management 
Admin Service with the addition of new properties to the service provider model object. Therefore SOAP API consumers 
should regenerate the stub or upgrade the dependency version of the stub.

## WSDL of the User Account Association Service has been changed 
In IS 5.10.0, there are significant changes has been introduced to the WSDL of the User Account Association 
Admin Service with the addition of new properties to the service provider model object. Therefore SOAP API consumers 
should regenerate the stub or upgrade the dependency version of the stub.

## Handling SMS OTP Error Response using Internal Error Codes 
From IS 5.10.0 onwards, SMS-OTP webapp uses internal error codes when there is an error response returned from the 
SMS provider.

!!! note "NOTE"
    To have the previous behaviour where the SMS-Provider error codes were used by SMS-OTP webapp, please add the 
    below configuration in the `deployment.toml` file located at `<IS_HOME>/repository/conf/` directory.
    ```toml
    [authentication.authenticator.sms_otp.parameters]
    UseInternalErrorCodes = false
    ```