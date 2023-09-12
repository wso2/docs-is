# SMS OTP Configurations

This page lists out all the advanced configurations related to SMS OTP. 

The following code snippet shows a sample SMSOTP configuration in the `<IS_HOME>/repository/conf/deployment.toml` file. 

```toml
[authentication.authenticator.sms_otp] 
enable=true

[authentication.authenticator.sms_otp.parameters]
SMSOTPAuthenticationEndpointURL= "/smsotpauthenticationendpoint/smsotp.jsp"
SMSOTPAuthenticationEndpointErrorPage= "/smsotpauthenticationendpoint/smsotpError.jsp"
MobileNumberRegPage = "/smsotpauthenticationendpoint/mobile.jsp"
RetryEnable = true
ResendEnable = true
BackupCode = true
SMSOTPEnableByUserClaim = true
usecase = "local"
secondaryUserstore = "primary"
SMSOTPMandatory = false
SendOtpToFederatedMobile = false
federatedMobileAttributeKey = "mobile"
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

#### usecase 

This parameter defines how the username is retrieved and this has to be configured if the previous authenticator is not a Local Authenticator (e.g.: **Basic Auth**). You can configure the following possible values:

- **local**: This is the default value and is based on the federated username. You must set the federated username in the local userstore. The federated username must be the same as the local username.

- **subjectUri**: The subject identified that is used as the username of the SMSOTP authenticator. When configuring the federated authenticator, select the attribute in the subject identifier under the service providers section in the user interface (UI). This is used as the username of the SMSOTP authenticator.

- **userAttribute**: The name of the federated authenticator's user attribute. This is the local username that is contained in a federated user's attribute. When using this, add the following parameter under the `[authentication.authenticator.sms_otp.parameters]` section in the `deployment.toml` file and enter the relevant value, `email`, `screen_name`, and `id`.

    ```toml
    [authentication.authenticator.sms_otp.parameters]
    userAttribute = "email"
    ```

----

#### secondaryUserstore

You can define multiple user stores per tenant as comma separated values.

```tab="Example"
secondaryUserstore = "jdbc, abc, xyz"
```

The user store configurations are maintained per tenant.

- If you use a super tenant, set all the parameter values in the `<IS_HOME>/repository/conf/deployment.toml` file.

- If you use a tenant: 

  1. Upload the XML file (`<IS_HOME>/repository/conf/identity/application-authentication.xml`) into a specific registry location (`/_system/governance/SMSOTP`).

  2. Create a collection named "SMSOTP", add the resource, and upload the `application-authentication.xml` file into the registry.

While doing the authentication,the system first checks whether there is an `.xml` file uploaded to the registry. If so, it reads it from the registry but does not take the local file. If there is no file in the registry, then it only takes the property values from the local file.
You can use the registry or local file to get the property values.

----

#### SMSOTPMandatory 

If the value is true, the second step will be enabled by the admin. The user cannot be authenticated without SMS OTP authentication. This parameter is used for both super tenant and tenant in the configuration. The value can be *true* or *false*.

----

#### SendOtpToFederatedMobile

- When `SMSOTPMandatory` and this parameter are set to `true` and the user is not found in the active directory, the OTP is sent to the mobile number defined in the federated authenticator claim.

- When `SMSOTPMandatory` is set to `false`, an error page gets displayed.

- When `SMSOTPMandatory` is set to `false` and the user is not found in the active directory, the authentication mechanism gets terminated at the first step of the 2FA/MFA. This parameter is not required in such a scenario.

----

#### federatedMobileAttributeKey

This parameter identifies the mobile attribute of the federated authenticator (e.g., Foursquare).
Configure this parameter if `SendOtpToFederatedMobile` is set to `true`. Example: `http://wso2.org/foursquare/claims/phone_number`

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

#### TokenExpiryTime

SMS OTP does not have a default validity period hence you will have to explicitly configure it by adding the <code>TokenExpiryTime</code> parameter. The value provided for the parameter is considered as seconds.

----
