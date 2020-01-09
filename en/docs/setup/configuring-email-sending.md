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
    ```
    
    |                                                   |                                                |
    |---------------------------------------------------|------------------------------------------------|
    | `               from_address                `     | The mail address from where you want to send the notification. It can be any working mail address. |
    | `               username                    `     | Provide the username of the SMTP account. <br/> User name of the the mail you have provide in **from_address**    |
    | `               password                        ` | Provide the password of the SMTP account. <br/> Password of the mail you have provided in **from_address**     |
    | `               host                        ` | The SMTP server to connect to. |
    | `               port                         `|The SMTP server port to connect to, if the connect() method does not explicitly specify one. Defaults to 25. |
   | `               enable_start_tls`            | If true, enables the use of the STARTTLS` command (if supported by the before issuing any login commands. Note that an appropriate trust store must configured so that the client will trust theserver's certificate. Defaults to false.
   | `enable_authentication`                      | If true, attempt to authenticate the user using the AUTH command. Defaults to false.
    
    !!! Tip 
        For information about the SMTP, see
        [here](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html).
        
3. Re-start the server once configurations are in place.

!!! note

    If you are using a Google mail account, note that Google has
    restricted third-party apps and less secure apps from sending emails
    by default. Therefore, you need to configure your account to disable
    this restriction, as WSO2 Identity Server acts as a third-party application when
    sending emails to confirm user registrations or notification for
    password reset WSO2 Identity Server.     
       
    Follow the steps given below to enable your Google mail account to
    provide access to third-party applications.

    1.  Navigate to <https://myaccount.google.com/security>.
    2.  Click **Signing in to Google** on the left menu and make sure
        that the **2-step Verification** is disabled or off.  
        ![google-2-step-verification](../assets/img/using-wso2-identity-server/google-2-step-verification.png)
    3.  Click **Connected apps and sites** on the left menu and enable
        **Allow less secure apps**.  
        ![allow-less-secure-apps](../assets/img/using-wso2-identity-server/allow-less-secure-apps.png)        
    
