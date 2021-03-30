1. Navigate to the `<IS_HOME>/repository/conf/deployment.toml` file and uncomment the following configuration block to 
   configure the email server. Change the sample values to reflect the configurations of the email server to be used 
   for email sending purposes.

    ```toml
    [output_adapter.email]
    from_address= "abcd@gmail.com"
    username= "abcd"
    password= "xxxx"
    hostname= "smtp.gmail.com"
    port= 587
    ```

    ??? Note "Click to view details on each of the properties"

        | Property | Description |
        |----------|-------------|
        | `from_address` | The mail address from where you want to send the notification. It can be any working mail address. |
        | `username` | Provide the username of the SMTP account i.e., the user name of the email address you have provided as the **from_address**.    |
        | `password` | Provide the password of the SMTP account i.e., the password of the email address you have provided as the **from_address**.     |
        | `host` | The SMTP server to connect to. |
        | `port`|The SMTP server port to connect to, if the `connect()` method does not explicitly specify one. Defaults to 25. |
    
        !!! Tip 
            For information about the SMTP, see [here](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html).
            
    ??? Note "Click to view information on using Google for email notifications"
    
        If you are using a Google mail account, note that Google has restricted third-party apps and less secure apps from 
        sending emails by default. Therefore, you need to configure your account to disable this restriction, as WSO2 
        Identity Server acts as a third-party application when sending emails to confirm user registrations or notifications 
        for password reset.     
        
        Follow the steps given below to enable your Google mail account to provide access to third-party applications.
    
        1. Navigate to <https://myaccount.google.com/security>.
    
        2. Click **Signing in to Google** on the left menu and make sure that the **2-step Verification** is disabled or off.
        ![google-2-step-verification](../../assets/img/fragments/google-2-step-verification.png)
    
        3. Click **Connected apps and sites** on the left menu and enable **Allow less secure apps**.  
        ![allow-less-secure-apps](../../assets/img/fragments/allow-less-secure-apps.png)  
    
2. Restart the server once configurations are in place. 
