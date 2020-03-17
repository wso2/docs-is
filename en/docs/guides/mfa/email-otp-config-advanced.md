# EMAIL OTP Configurations

This page lists out all the advanced configurations related to SMS OTP. 

The following code snippet shows a sample EMAIL OTP configuration in the `<IS_HOME>/repository/conf/deployment.toml` file. 

```toml
[authentication.authenticator.email_otp]
enable=true

[authentication.authenticator.email_otp.parameters]
EMAILOTPAuthenticationEndpointURL = "https://localhost:9443/emailotpauthenticationendpoint/emailotp.jsp"
EmailOTPAuthenticationEndpointErrorPage = "https://localhost:9443/emailotpauthenticationendpoint/emailotpError.jsp"
EmailAddressRequestPage = "https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp"
usecase = "local"
secondaryUserstore = "primary"
EMAILOTPMandatory = false
sendOTPToFederatedEmailAttribute = false
federatedEmailAttributeKey = "email"
EmailOTPEnableByUserClaim = true
CaptureAndUpdateEmailAddress = true
showEmailAddressInUI = true
```

The parameter values given above show the **default** configurations in WSO2 Identity Server. 

If you wish to change a parameter value to something other than the default value, add the configuration to the `deployment.toml` file using the following format.

```toml
[authentication.authenticator.email_otp.parameters]
<Property-name> = "<Property-value>"
```

----

#### enable 

Enable or disable the authenticator.

----

#### EMAILOTPAuthenticationEndpointURL 

Authentication endpoint URL of the authenticator.

----

#### EmailOTPAuthenticationEndpointErrorPage 

Error page that will be displayed in case of an authentication failure.

----

#### EmailAddressRequestPage

This parameter enables to display a page that requests for an email address where:

- The user has not registered an email address.
- Sending OTP is defined as the second step of 2FA/MFA.
- The `CaptureAndUpdateEmailAddress` parameter is set to *true*.

```tab="Example"
https://localhost:9443/emailotpauthenticationendpoint/emailAddress.jsp
```

----

#### usecase 

This parameter defines how the email ID will be retrieved. You can configure the following possible values:

- **local**: This is the default value and is based on the federated username. You must set the federated username in the local userstore. The federated username must be the same as the local username.

- **assocication**: The federated username must be associated with the local account in advance in the WSO2 Identity Server User Portal. The local username is retrieved from the association. For information on creating an association, see the [user portal help](insertlink).

- **subjectUri**: When configuring the federated authenticator, select the attribute in the subject identifier under the service providers section in the UI. This is used as the username of the EmailOTP authenticator.

- **userAttribute**: The name of the federated authenticator's user attribute. That is the local username that is contained in a federated user's attribute. When using this, add the following parameter under the `[authentication.authenticator.email_otp.parameters]` section in the `deployment.toml` file and enter the relevant value, e.g., email and screen_name, id.

    ```toml
    [authentication.authenticator.email_otp.parameters]
    userAttribute = "email"
    ```

    If you use OpenID Connect supported authenticators such as LinkedIn and Foursquare or in the case of multiple social login options as the first step and EmailOTP as second step, you need to add similar configuration for the specific authenticator in the `deployment.toml` file.

    **Examples**

    ```tab="Facebook"
    [authentication.authenticator.facebook.parameters]
    EmailOTP-userAttribute = "email"
    federatedEmailAttributeKey = "email"
    ```

    ```tab="Foursquare"
    [[authentication.custom_authenticator]]
    name= "Foursquare"
    [authentication.custom_authenticator.parameters]
    EmailOTP-userAttribute = "http://wso2.org/foursquare/claims/email"
    federatedEmailAttributeKey = "http://wso2.org/foursquare/claims/email"
    ```

    Likewise, you can add the Authenticator Config for Amazon, Google, Twitter, and Instagram with the relevant values.

----

#### secondaryUserstore

You can define multiple user stores per tenant as comma separated values.

```tab="Example"
secondaryUserstore = "jdbc, abc, xyz"
```

The user store configurations are maintained per tenant.

- If you use a super tenant, set all the parameter values in the `<IS_HOME>/repository/conf/deployment.toml` file.

- If you use a tenant: 

1. Upload the XML file (`<IS_HOME>/repository/conf/identity/application-authentication.xml`) into a specific registry location (`/_system/governance/EmailOTP`).

2. Create a collection named "EmailOTP", add the resource, and upload the `application-authentication.xml` file into the registry.

While doing the authentication,the system first checks whether there is an `.xml` file uploaded to the registry. If so, it reads it from the registry but does not take the local file. If there is no file in the registry, then it only takes the property values from the local file.
You can use the registry or local file to get the property values.

----

#### EMAILOTPMandatory

This parmeter defines whether EmailOTP is enforced as the second step of the 2FA/MFA or not.

If the user is not found in the active directory where the parameter is set to *true*, the OTP is directly sent to the email address defined in the claims set.

If the user is not found in the active directory where the parameter is set to *false*, the authentication flow gets terminated at the first step of the 2FA/MFA.

----

#### sendOTPToFederatedEmailAttribute

When `EMAILOTPMandatory` and this parameter are set to *true* and the user is not found in the active directory, the OTP is sent to the mail defined in the federated authenticator claim.

When `EMAILOTPMandatory` is set to *false*, an error page gets displayed.

When `EMAILOTPMandatory` is set to `false `and the user is not found in the active directory, the authentication mechanism gets terminated at the first step of the 2FA/MFA. This parameter is not required in such a scenario.

----

#### federatedEmailAttributeKey

This parameter identifies the email attribute of the federated authenticator (e.g., Foursquare).
Configure this parameter if `sendOTPToFederatedEmailAttribute` is set to *true*. Example: http://wso2.org/foursquare/claims/email

----

#### EmailOTPEnableByUserClaim

This parameter enables the user to override the functionality defined at the `EMAILOTPMandatory` parameter.

If this parameter and the `EMAILOTPMandatory` parameters are set to *true*, the user can either enable or disable the EmailOTP functionality.

If this parameter is set to *false* and the `EMAILOTPMandatory` parameter is set to *true*, the user gets redirected to an error page.

If this parameter and the `EMAILOTPMandatory` parameters are set to *false*, the authentication flow gets terminated at the first step of the 2FA/MFA.


----

#### CaptureAndUpdateEmailAddress

This parameter enables the user to update the email address that is used to send the OTP, at the first login where the email address is not previously set.

----

#### showEmailAddressInUI

This parameter enables displaying the email address to which the OTP is sent to, on the UI.

----
