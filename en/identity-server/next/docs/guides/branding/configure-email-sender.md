# Configure the Email Sender

This document explains the steps to configure WSO2 Identity Server to send emails for activities such as email OTP, email notifications, and account recovery.

Follow the steps given below to enable the email sender in the WSO2 Identity Server.

1. Shut down the server if it is running.
2. Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to configure the email server.

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

    | Property  | Description   |
    |-----------|---------------|
    | `from_address`    | This is the mail address from where you want to send the notification. It can be any working mail address. |
    | `username`     | Provide the username of the SMTP account. <br/> Username of the mail you have provided in **from_address**.    |
    | `password` | Provide the password of the SMTP account. <br/> Password of the mail you have provided in **from_address**.     |
    | `host` | The SMTP server to connect to. |
    | `port`|This is the SMTP server port to connect to if the connect() method does not explicitly specify one. Defaults to 25. |
    | `enable_start_tls`    | If true, this enables using the `STARTTLS` command (if enabled before issuing any login commands. Note that an appropriate trust store must be configured so that the client will trust the server's certificate. Defaults to `false`. |
    | `enable_authentication`    | If true, attempt to authenticate the user using the AUTH command. Defaults to `false`.|
    | `signature`    | Signature of the sender account. |

    !!! Tip
        For information about SMTP, see
        [here](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html).

    !!! info
        - If you use a Gmail account as the **from_address**, you must create an [App Password](https://support.google.com/accounts/answer/185833?visit_id=637943607149528455-3801902236&p=InvalidSecondFactor&rd=1).
        After you get an **App Password** from Google, update the `password`.
        - If your password contains special characters (example: `<`, `>`, `&`), you will run into errors when running the server. To avoid errors, update the `password` parameter as follows:
        ```toml
        password= "<![CDATA[xxxx]]>"
        ```

3. Save the configurations and start the server.