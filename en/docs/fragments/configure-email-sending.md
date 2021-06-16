1.  Navigate to the `<IS_HOME>/repository/conf/deployment.toml` file and uncomment the following configuration block to configure the email server. Change the sample values to reflect the configurations of the email server to be used for email sending purposes.

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
            
    !!! note
        {! fragments/google-two-factor.md !}
    
2. Restart the server once configurations are in place. 
