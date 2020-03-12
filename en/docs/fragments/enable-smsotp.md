## Enable SMSOTP

Add the following configurations to `<IS_HOME>/repository/conf/deployment.toml` file to enable SMS OTP for WSO2 Identity Server.

```toml
[authentication.authenticator.sms_otp] 
name ="SMSOTP"
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

For information about the configurations given above, see [SMSOTP Configurations](../../../guides/mfa/sms-otp-config-advanced).

----

## Connect the SMS provider

1.  Download the certificate of the SMS provider by going to the SMS
    providers website on your browser, and clicking the HTTPS trust icon
    on the address bar.  
    
    !!! example
        If you wish to have NEXMO as your SMS provider, navigate to
        [https://www.nexmo.com](https://www.nexmo.com/), and click the
        padlock next to the URL on Chrome and download the certificate.
        
2.  Navigate to the
    `           <IS_HOME>/repository/resources/security          `
    directory via the terminal and import the downloaded certificate
    into the WSO2 IS client keystore.

    ``` java
    keytool -importcert -file <CERTIFICATE_FILE_PATH> -keystore client-truststore.jks -alias "Nexmo" 
    ```

3.  You are prompted to enter the keystore password. The default
    `           client-truststore.jks          ` password is
    **`            wso2carbon           `**.
    