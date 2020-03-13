# SMS OTP Configurations

This page lists out all the advanced configurations related to SMS OTP. 

The following code snippet shows a sample SMSOTP configuration in the `<IS_HOME>/repository/conf/deployment.toml` file. 

```toml
[authentication.authenticator.sms_otp] 
enable=true

[authentication.authenticator.sms_otp.parameters]
SMSOTPAuthenticationEndpointURL= "smsotpauthenticationendpoint/smsotp.jsp"
SMSOTPAuthenticationEndpointErrorPage= "smsotpauthenticationendpoint/smsotpError.jsp"
MobileNumberRegPage = "smsotpauthenticationendpoint/mobile.jsp"
RetryEnable = true
ResendEnable = true
BackupCode = true
SMSOTPEnableByUserClaim = true
SMSOTPMandatory = false
CaptureAndUpdateMobileNumber = true
SendOTPDirectlyToMobile = false
redirectToMultiOptionPageOnFailure = false
```

The parameter values given above show the **default** configurations in WSO2 Identity Server. 

If you wish to change a parameter value to something other than the default value, add the configuration to the `deployment.toml` file using the following format.

```toml
[authentication.authenticator.sms_otp.parameters]
<Property-name> = "<Property-value>"
```

----

#### enable 

Enable or disable the authenticator.

----

#### SMSOTPAuthenticationEndpointURL 

Authentication endpoint URL of the authenticator.

----

#### SMSOTPAuthenticationEndpointErrorPage 

Error page that will be displayed in case of an authentication failure.

----

#### MobileNumberRegPage 

Range of usable mobile numbers to send SMSs.

----

#### RetryEnable 

Define whether to retry or not.

----

#### ResendEnable 

Define whether to enable resending the SMSOTP or not in case a user enters an incorrect code.

----

#### BackupCode 

Define whether to use a backup code instead of the actual SMS code or not.

----

#### SMSOTPMandatory 

If the value is true, the second step will be enabled by the admin. The user cannot be authenticated without SMS OTP authentication. This parameter is used for both super tenant and tenant in the configuration. The value can be *true* or *false*.

----

#### SMSOTPEnableByUserClaim 

Disable the 'SMS OTP disabling by user' functionality. The value can be either *true* or *false*. If the value is set to *true*, the user can enable and disable the SMS OTP according to what the admin selects as the `SMSOTPMandatory` parameter value.

----

#### CaptureAndUpdateMobileNumber 

When SMSOTPMandatory is set to *true* and the user forgets to update the mobile number in a specific user profile where this property is set to *true*, the user can update a mobile claim with value during the authentication time and use that mobile number to send OTP. This update functionality will happen in the first login only. For the next logins, the updated mobile number will be used.

----

#### SendOTPDirectlyToMobile 

When SMSOTPMandatory is set to *true* and the user does not exist in the user store and if the admin sets SendOTPDirectlyToMobile to *true* , the user can enter the mobile number in authentication time in a mobile number request page; the OTP will be directly sent to that mobile number.

----

#### redirectToMultiOptionPageOnFailure 

During a failed attempt enable redirect to the Multi Option Page where the user can select the authentication mechanism.

----
