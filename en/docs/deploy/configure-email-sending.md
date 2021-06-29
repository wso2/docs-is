# Configure the Email Sending Module

This document explains the steps to configure WSO2 Identity Server to send emails during multiple email related identity and access management tasks such as [email OTP](../../../guides/mfa/2fa-email-otp/), email notifications, and account recovery.

----

## Configure email sending

1.  Shut down the server if it is running.
2.  Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to configure the email server.

    ```toml
    [output_adapter.email]
    from_address= "wso2iamtest@gmail.com"
    username= "wso2iamtest"
    password= "Wso2@iam70"
    hostname= "smtp.gmail.com"
    port= 587
    enable_start_tls= true
    enable_authentication= true
    signature = "ABC.com"
    ```
    
    |                    Property                       |                Description                     |
    |---------------------------------------------------|------------------------------------------------|
    | `               from_address                `     | This is the mail address from where you want to send the notification. It can be any working mail address. |
    | `               username                    `     | Provide the username of the SMTP account. <br/> Username of the the mail you have provided in **from_address**    |
    | `               password                        ` | Provide the password of the SMTP account. <br/> Password of the mail you have provided in **from_address**     |
    | `               host                        ` | The SMTP server to connect to |
    | `               port                         `|This is the SMTP server port to connect to if the connect() method does not explicitly specify one. Defaults to 25. |
   | `               enable_start_tls`            | If true, this enables the use of the STARTTLS command (if enabled before issuing any login commands. Note that an appropriate trust store must be configured so that the client will trust the server's certificate. Defaults to `false`
   | `enable_authentication`                      | If true, attempt to authenticate the user using the AUTH command. Defaults to `false`|
   | `signature`                                   | Signature of the sender account |
    
    !!! Tip 
        For information about the SMTP, see
        [here](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html).
        
3. Re-start the server once configurations are in place.

!!! note 
    {! fragments/google-two-factor.md !}
    