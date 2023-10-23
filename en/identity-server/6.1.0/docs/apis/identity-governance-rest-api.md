---
template: templates/swagger.html
---

# Governance Connectors Management API Definition
     
This is the RESTful API for managing identity governance configurations
in WSO2 Identity Server. These configurations are grouped into five main
categories. Each category has subcategories which are called connectors,
and properties of connectors as mentioned below. <br>

??? "Password Policies"

    **Password History**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Validate password history   | passwordHistory.enable   | User will not be allowed to use previously used passwords. |
    | Password history validation count   | passwordHistory.count   | Restrict reusing this number of previously used passwords during a password update. |
    
    **Password Patterns**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Validate passwords based on a policy pattern   | passwordPolicy.enable   | Validate user passwords against a policy. |
    | Minimum number of characters  | passwordPolicy.min.length   | This denotes the minimum number of characters in the password. |
    | Maximum number of characters  | passwordPolicy.max.length   | This denotes the maximum number of characters in the password. |
    | Password pattern regex   | passwordPolicy.pattern   | The regular expression pattern to validate the password. |
    | Error message on pattern violation   | passwordPolicy.errorMsg   | The error message that will be displayed when a pattern violation is detected in the password. |

??? "User Onboarding"

    **Self Registration**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | User self registration  | SelfRegistration.Enable  | Users are allowed to self register to the system. |
    | Lock user account on creation | SelfRegistration.LockOnCreation  | Lock self-registered user account until e-mail verification. |
    | Manage notifications sending internally | SelfRegistration.Notification.InternallyManage  | This property should be disabled if the client application handles notification sending. |
    | Prompt reCaptcha  | SelfRegistration.ReCaptcha  | This denotes whether reCaptcha verification is required during self registration. |
    | User self registration verification link expiry time  | SelfRegistration.VerificationCode.ExpiryTime  | This denotes the expiry time in minutes for the verification link. |
    | User self registration SMS OTP expiry time  | SelfRegistration.VerificationCode.SMSOTP.ExpiryTime  | This denotes the expiry time in minutes for the SMS OTP. |
    | User self registration callback URL regex  | SelfRegistration.CallbackRegex  | This prefix will be used to validate the callback URL. |
    | Manage Self-Sign-Up purposes  | _url_listPurposeSelfSignUp  | Manage Self-Sign-Up purposes |
    | Send sign up confirmation email  | SelfRegistration.NotifyAccountConfirmation  | This enable sending notification for self signup confirmation. |
    | Prompt reCaptcha on re-send confirmation  | SelfRegistration.ResendConfirmationReCaptcha  | This prompts reCaptcha verification for resend confirmation. |
    | Enable Auto Login After Account Confirmation  | SelfRegistration.AutoLogin.Enable  | User will be logged in automatically after the account confirmation. |
    | Alias of the key used to sign to cookie  | SelfRegistration.AutoLogin.AliasName  | This is the alias of the key used to sign to cookie. The public key has to be imported to the keystore. |       
 
    **Lite User Registration**
     
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Lite user registration  | LiteRegistration.Enable  | Users are allowed to self register to the system without a password. |
    | Lock user account on creation | LiteRegistration.LockOnCreation  | The self-registered user account will be locked until e-mail verification. |
    | Manage notifications sending internally | LiteRegistration.Notification.InternallyManage  | This property should be disabled if the client application handles notification sending. |
    | Prompt reCaptcha  | LiteRegistration.ReCaptcha  | The reCaptcha verification will be prompted during self registration. |
    | Lite user registration verification link expiry time  | LiteRegistration.VerificationCode.ExpiryTime  | Specify the expiry time in minutes for the verification link. |
    | Lite user registration SMS OTP expiry time | LiteRegistration.VerificationCode.SMSOTP.ExpiryTime  | Specify the expiry time in minutes for the SMS OTP. |
    | Lite user registration callback URL regex  | LiteRegistration.CallbackRegex  | This regular expression pattern will be used to validate the callback URL. |
    | Manage Lite-Sign-Up purposes  | _url_listPurposeSelfSignUp  | Manage Lite-Sign-Up purposes |
  
    **Ask Password**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable user email verification  | EmailVerification.Enable  | A verification notification will be triggered during user creation. |
    | Enable account lock on creation  | EmailVerification.LockOnCreation  | The user account will be locked during user creation. |
    | Manage notifications sending internally  | EmailVerification.Notification.InternallyManage  | Disable if the client application handles notification sending. |
    | Email verification code expiry time  | EmailVerification.ExpiryTime  | Set the time span that the verification e-mail would be valid, in minutes. (For infinite validity period, set -1) |
    | Ask password code expiry time  | EmailVerification.AskPassword.ExpiryTime  | Set the time span that the ask password e-mail would be valid, in minutes. (For infinite validity period, set -1) |
    | Temporary password generation extension class  | EmailVerification.AskPassword.PasswordGenerator  | Temporary password generation extension point in ask password feature |
    | Manage JIT provisioning purposes  | _url_listPurposeJITProvisioning  | Click here to manage just in time provisioning purposes. |

??? "Login Attempts Security"

    **Account Lock**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Lock user accounts   | account.lock.handler.enable   | Lock user accounts on failed login attempts |
    | Maximum failed login attempts   | account.lock.handler.On.Failure.Max.Attempts   | Number of failed login attempts allowed before the account is locked. |
    | Initial account lock duration   | account.lock.handler.Time   | The time period for which an account will remain locked during the first account locking instance. Account will be automatically unlocked after this time period. |
    | Account lock duration increment factor   | account.lock.handler.login.fail.timeout.ratio   | Account lock duration will be increased by this factor. Ex: Initial duration: 5m; Increment factor: 2; Next lock duration: 5 x 2 = 10m |
    | Manage notification sending internally   | account.lock.handler.notification.manageInternally   | This property should be disabled if the client application handles notification sending. |
    
    **reCaptcha for SSO Login**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Always prompt reCaptcha   | sso.login.recaptcha.enable.always   | Always prompt reCaptcha verification during SSO login flow. |
    | Prompt reCaptcha after max failed attempts   | sso.login.recaptcha.enable   | Prompt reCaptcha verification during SSO login flow only after the max failed attempts exceeded. |
    | Max failed attempts for reCaptcha   | sso.login.recaptcha.on.max.failed.attempts   | Number of failed attempts allowed without prompting reCaptcha verification. |

??? "Other Settings"

    **Consent Information Controller**
    
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

    **Analytics Engine Configuration**
    
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

    **User Claim Update**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable user email verification on update | UserClaimUpdate.Email.EnableVerification | Trigger a verification notification when user's email address is updated. |
    | Email verification on update link expiry time | UserClaimUpdate.Email.VerificationCode.ExpiryTime | Validity time of the email confirmation link in minutes. |
    | Enable user mobile number verification on update | UserClaimUpdate.MobileNumber.EnableVerification | Trigger a verification SMS OTP when user's mobile number is updated. |
    | Mobile number verification on update SMS OTP expiry time | UserClaimUpdate.MobileNumber.VerificationCode.ExpiryTime | Validity time of the mobile number confirmation OTP in minutes. |

??? "Account Management"

    **Idle Account Suspend**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Suspend idle user accounts   | suspension.notification.enable   | Lock user account after a given idle period. |
    | Allowed idle time span in days   | suspension.notification.account.disable.delay   | Time period in days before locking the user account. |
    | Alert sending time periods in days   | suspension.notification.delays   | Send warning alerts to users before locking the account after each period. Comma-separated multiple values accepted. |

    **Account Disable**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable account disabling   | account.disable.handler.enable   | Allow an administrative user to disable user accounts |
    | Manage notification sending internally   | account.disable.handler.notification.manageInternally   | This property should be disabled if the client application handles notification sending. |
    
    **Account Recovery**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Notification based password recovery   | Recovery.Notification.Password.Enable   | This enables password recovery via email notifications. |
    | Enable reCaptcha for password recovery   | Recovery.ReCaptcha.Password.Enable   | reCaptcha is prompted during password recovery via email notifications.  |
    | Security question based password recovery   | Recovery.Question.Password.Enable   | This enables password recovery via answering security questions. |
    | Number of questions required for password recovery   | Recovery.Question.Password.MinAnswers   | This defines the number of security questions that are required to be answered. |
    | Security question answer regex   | Recovery.Question.Password.ReCaptcha.Enable   | The regular expression pattern for answers provided for security questions. |
    | Enforce security question answer uniqueness   | Recovery.Question.Answer.Uniqueness   | This enforces the uniqueness of the answers provided for security questions. |
    | Enable reCaptcha for security questions based password recovery   | Recovery.Question.Password.ReCaptcha.Enable   | Prompt reCaptcha for security question-based password recovery |
    | Max failed attempts for reCaptcha   | Recovery.Question.Password.ReCaptcha.MaxFailedAttempts   | The reCaptcha will be prompted only after it exceeds this number of failed attempts. |
    | Username recovery   | Recovery.Notification.Username.Enable   | This enables the user to recover the account if the user has forgotten the username. |
    | Enable reCaptcha for username recovery   |  Recovery.ReCaptcha.Username.Enable  | reCaptcha is prompted during username recovery |
    | Manage notifications sending internally   | Recovery.Notification.InternallyManage  | This property should be disabled if the client application handles notification sending. |
    | Notify when recovery success   | Recovery.NotifySuccess   | Upon a successful password reset, a success notification is sent to the user. |
    | Notify when security questions based recovery starts   | Recovery.Question.Password.NotifyStart   | A notification will be sent to the user that the security question-based recovery has started. |
    | Recovery link expiry time in Minutes  | Recovery.ExpiryTime   | The expiration time for the recovery link. |
    | SMS OTP expiry time  | Recovery.Notification.Password.ExpiryTime.smsOtp   | Expiration time of the SMS OTP code for password recovery |
    | SMS OTP regex  | Recovery.Notification.Password.smsOtp.Regex  | The regular expression pattern for SMS OTP in format [allowed characters]{length}. Supported character ranges are a-z, A-Z, 0-9. |
    | Enable forced security questions   | Recovery.Question.Password.Forced.Enable   | Force users to provide answers to security questions during sign-in |
    | Minimum number of forced security questions to be answered   | Recovery.Question.MinQuestionsToAnswer   | Force users to provide answers to more security questions during sign-in if the number of questions answered is lesser than this value |    
    | Recovery callback URL regex   | Recovery.CallbackRegex   | This regular expression pattern will be used to validate the recovery callback URL. |
    | Enable Auto Login After Password Reset   | Recovery.AutoLogin.Enable   | User will be logged in automatically after completing the Password Reset wizard |    
    
    **Password Reset**
    
    | Property display name | Property name | Purpose |
    | ------- | -------|---|
    | Enable password reset via recovery e-mail |  Recovery.AdminPasswordReset.RecoveryLink | User gets notified with a link to reset password. |
    | Enable password reset via OTP  | Recovery.AdminPasswordReset.OTP  | User gets notified with a one-time password to try with SSO login. |
    | Enable password reset offline  | Recovery.AdminPasswordReset.Offline  | An OTP will be generated and stored in users claims. |

The APIs can be used to retrieve the above mentioned categories, connectors of the categories, properties of the categories, and update the property values.

??? Note "Click for instructions"
    Follow the steps given below to try out the REST APIs with your local instance of WSO2 Identity Server. 
    
    1.  Click **Authorize** and provide the desired values for authentication. 
    2.  Expand the relevant API operation and click **Try it Out**.  
    3.  Fill in relevant sample values for the input parameters and click **Execute**. 
        You will receive a sample curl command with the sample values you filled in. 
    4. Add a `-k` header to the curl command and run the curl command on the terminal with a running instance of WSO2
     IS.
    
<div id="swagger-ui"></div>
<script>

  // Begin Swagger UI call region
  const ui = SwaggerUIBundle({
     url: "{{base_path}}/apis/restapis/identity-governance.yaml",
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
</script>
