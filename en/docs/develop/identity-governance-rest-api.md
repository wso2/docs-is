---
template: templates/swagger.html
---

# Governance Connectors Management API Definition - v1
     
This is the RESTful API for managing identity governance configurations
in WSO2 Identity Server. These configurations are grouped into five main
categories. Each category has subcategories which are called connectors,
and properties of connectors as mentioned below. <br>

??? "Password Policies"

    * Password History
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable Password History Feature   | passwordHistory.enable   | Enable to disallow previously used passwords |
    | Password History validation count   | passwordHistory.count   | Restrict reusing last x number of passwords 
    when updating the password |
    
    * Password Patterns
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable Password Policy Feature   | passwordPolicy.enable   | Enable password pattern policy |
    | Password Policy Min Length   | passwordPolicy.min.length   | Minumum length of the password |
    | Password Policy Max Length   | passwordPolicy.max.length   | Maximum length of the password |
    | Password Policy Pattern   | passwordPolicy.pattern   | Allowed password regex pattern |
    | Password Policy Error Message   | passwordPolicy.errorMsg   | Error message for invalid password patterns |

??? "Login Policies"

    * Account Locking
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Account Lock Enabled   | account.lock.handler.enable   | Enable account locking for failed logins |
    | Maximum Failed Login Attempts   | account.lock.handler.On.Failure.Max.Attempts   | Number of failed attempts allowed before locking the account |
    | Account Unlock Time   | account.lock.handler.Time   | Account locked time span in minutes |
    | Lock Timeout Increment Factor   | account.lock.handler.login.fail.timeout.ratio   |  |
    | Internal Notification Management   | account.lock.handler.notification.manageInternally   | Error message for invalid password patterns |
    
    * Account Disabling
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable Account Disabling   | account.disable.handler.enable   | Enable account disable Feature |
    | Internal Notification Management   | account.disable.handler.notification.manageInternally   | Set false if the client application handles notification sending |
    
    * Captcha for SSO Login
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable captcha always   | sso.login.recaptcha.enable.always   | Always enable captcha verification during SSO login |
    | Enable captcha after the Max failed attempts   | sso.login.recaptcha.enable   | Enable captcha verification during SSO login after allowing a certain number of failed attempts |
    | Max failed attempts   | sso.login.recaptcha.on.max.failed.attempts   | Number of failed attempts allowed without showing the captcha |

??? "Account Management Policies"

    * Lock Idle Accounts
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable   | suspension.notification.enable   |  |
    | Lock Account After (days)   | suspension.notification.account.disable.delay   |  |
    | Alert Users before account locking in days (comma-separated list)   | suspension.notification.delays   |  |
    
    * Account Recovery
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable Notification Based Password Recovery   | Recovery.Notification.Password.Enable   |  |
    | Enable reCaptcha for Password Recovery   | Recovery.ReCaptcha.Password.Enable   |  |
    | Enable Security Question Based Password Recovery   | Recovery.Question.Password.Enable   |  |
    | Number Of Questions Required For Password Recovery   | Recovery.Question.Password.MinAnswers   |  |
    | Enable reCaptcha for Security Questions Based Password Recovery   | Recovery.Question.Password.ReCaptcha.Enable   | Show captcha for challenge question based password recovery |
    | Max Failed Attempts for ReCaptcha   | Recovery.Question.Password.ReCaptcha.MaxFailedAttempts   |  |
    | Enable Username Recovery   | Recovery.Notification.Username.Enable   |  |
    | Enable reCaptcha for Username Recovery   |  Recovery.ReCaptcha.Username.Enable  |  |
    | Enable Internal Notification Management   | Recovery.Notification.InternallyManage  | Set to false if the client application handles notification sending |
    | Notify when Recovery Success   | Recovery.NotifySuccess   |  |
    | Notify when Questions Based Recovery Starts   | Recovery.Question.Password.NotifyStart   |  |
    | Recovery Link Expiry Time   | Recovery.ExpiryTime   |  |
    | Enable forced challenge questions   | Recovery.Question.Password.Forced.Enable   | Force users to provide answers to challenge questions during sign in |
    | Recovery callback URL regex   | Recovery.CallbackRegex   |  |
    
    * User Self Registration
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable Self User Registration  | SelfRegistration.Enable  | Enable self user registration |
    | Enable Account Lock On Creation | SelfRegistration.LockOnCreation  | Lock user account during user registration |
    | Internal Notification Management  | SelfRegistration.Notification.InternallyManage  | Set to false if the client application handles notification sending |
    | Enable reCaptcha  | SelfRegistration.ReCaptcha  | Enable captcha verification during self registration |
    | User self registration verification link expiry time  | SelfRegistration.VerificationCode.ExpiryTime  | Set the number of minutes for which the user self registration verification mail is valid |
    | User self registration SMS OTP expiry time  | SelfRegistration.VerificationCode.SMSOTP.ExpiryTime  | Set the number of minutes that the SMS OTP would be valid |
    | User self registration callback URL regex  | SelfRegistration.CallbackRegex  | User self registration callback URL regex |
    | Manage Self-Sign-Up purposes  | _url_listPurposeSelfSignUp  | Click here to manage Self-Sign-Up purposes |
    
    * User Onboarding
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable User Email Verification  | EmailVerification.Enable  | Enable to trigger a verification notification during user creation |
    | Enable Account Lock On Creation  | EmailVerification.LockOnCreation  | Lock user account during user creation |
    | Internal Notification Management  | EmailVerification.Notification.InternallyManage  | Set to false if the client application handles notification sending |
    | Email verification code expiry time  | EmailVerification.ExpiryTime  | Set the number of minutes for which the email verification mail is valid. Setting it to a negative value results in infinite validity) |
    | Ask password code expiry time  | EmailVerification.AskPassword.ExpiryTime  | Set the number of minutes the ask password mail would be valid. (Negative value for infinite validity) |
    | Temporary password generation extension class  | EmailVerification.AskPassword.PasswordGenerator  | Temporary password generation extension point in ask password feature) |
    | Manage Just In Time Provisioning purposes  | _url_listPurposeJITProvisioning  | Click here to manage JIT purposes |
    
    * Account Management Policies
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable Password Reset via Recovery Email |  Recovery.AdminPasswordReset.RecoveryLink | User gets notified with a link to reset password |
    | Enable Password Reset via OTP  | Recovery.AdminPasswordReset.OTP  | User gets notified with a one time password to try out SSO login |
    | Enable Password Reset Offline  | Recovery.AdminPasswordReset.Offline  | An OTP generated and stored in users claims |

??? "Consent Management"

    * Consent Management
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Controller Name | piiController | Name of the first Controller who collects the data |
    | Contact Name | contact | Contact name of the Controller |
    | Email Address | email | Contact email address of the Controller |
    | Phone Number | phone | Contact phone number of the Controller |
    | On Behalf | onBehalf | A user information (PII) Processor acting on behalf of a Controller or PII Processor |
    | Url | piiControllerUrl | A URL for contacting the Controller |
    | Country | addressCountry | Country of the Controller |
    | Locality | addressLocality | Locality of the Controller |
    | Region | addressRegion | Region of the Controller |
    | Post Office Box Number | postOfficeBoxNumber | Post Office Box Number of the Controller |
    | Postal Code | postalCode | Postal Code of the Controller |
    | Street Address | streetAddress | Street Address of the Controller |

??? "Analytics Engine"

    * Analytics Engine Configuration
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Target Host | adaptive_authentication.analytics.receiver | Target Host |
    | Enable Basic Authentication | adaptive_authentication.analytics.basicAuth.enabled | Enable Basic Authentication |
    | User ID | adaptive_authentication.analytics.basicAuth.username | Target Host Secured User ID |
    | Secret | __secret__adaptive_authentication.analytics.basicAuth.password | Target Host Secured Secret |
    | HTTP Connection Timeout | adaptive_authentication.analytics.HTTPConnectionTimeou | HTTP Connection Timeout in milliseconds |
    | HTTP Read Timeout | adaptive_authentication.analytics.HTTPReadTimeout | HTTP Read Timeout in milliseconds |
    | HTTP Connection Request Timeout | adaptive_authentication.analytics.HTTPConnectionRequestTimeout | HTTP Connection Request Timeout in milliseconds |
    | Hostname verification | adaptive_authentication.analytics.hostnameVerfier | Hostname verification. (STRICT, ALLOW_ALL) |

The APIs can be used to retrieve the above mentioned categories, connectors of the categories, properties of the categories, and update the property values.

??? Note "Click For Instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
    
    1.  Click **Authorize** and provide desired values for authentication. 
    2.  Expand the relevant API operation and click **Try it Out**.  
    3.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
     IS.
    
<div id="swagger-ui"></div>
<script>
window.onload = function() {
  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
    url: "https://raw.githubusercontent.com/wso2/identity-api-server/master/components/org.wso2.carbon.identity.api.server.identity.governance/org.wso2.carbon.identity.api.server.identity.governance.v1/src/main/resources/identity-governance.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    validatorUrl: null,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
  // End Swagger UI call region

  window.ui = ui
}
</script>

[![Run in Postman](https://run.pstmn.io/button.svg)](https://www.getpostman.com/run-collection/13f70a73e4231606b363).