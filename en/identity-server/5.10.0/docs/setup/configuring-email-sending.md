# Configuring the Email Sending Module

This document explains the steps to configure WSO2 Identity Server to
send emails during multiple email related identity and access management
tasks such as [email OTP](../../learn/configuring-email-otp), [email
notifications](../../learn/enabling-notifications-for-user-operations),
[account recovery](../../learn/password-recovery).

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
    
    |                                                   |                                                |
    |---------------------------------------------------|------------------------------------------------|
    | `               from_address                `     | The mail address from where you want to send the notification. It can be any working mail address. |
    | `               username                    `     | Provide the username of the SMTP account. <br/> User name of the the mail you have provide in **from_address**    |
    | `               password                        ` | Provide the password of the SMTP account. <br/> Password of the mail you have provided in **from_address**     |
    | `               host                        ` | The SMTP server to connect to. |
    | `               port                         `|The SMTP server port to connect to, if the connect() method does not explicitly specify one. Defaults to 25. |
   | `               enable_start_tls`            | If true, enables the use of the STARTTLS` command (if supported by the before issuing any login commands. Note that an appropriate trust store must configured so that the client will trust the server's certificate. Defaults to true.
   | `enable_authentication`                      | If true, attempt to authenticate the user using the AUTH command. Defaults to true.|
   | `signature`                                   | Signature of the sender account |
    
    !!! Tip 
        For information about the SMTP, see
        [here](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html).
        
3. Re-start the server once configurations are in place.

!!! note

    If you are using a Google mail account, note that Google has
    restricted third-party apps and less secure apps from sending emails
    by default. Therefore, you need to configure your account to work around
    this restriction, as WSO2 Identity Server acts as a third-party application when
    sending emails to confirm user registrations or notification for
    password reset WSO2 Identity Server.     
       
    Follow the steps provided by [Google](https://support.google.com/mail/answer/185833) to create an app specific 
    password and use it for the SMTP configurations on the WSO2 Identity Server so that Google does not restrict the 
    access.
