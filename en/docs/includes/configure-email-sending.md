1. Navigate to the `<IS_HOME>/repository/conf/deployment.toml` file and uncomment the `[output_adapter.email]` configuration block.

    ```toml
    [output_adapter.email]
    from_address= "wso2iam@outlook.com"
    username= "wso2iam@outlook.com"
    password= "xxxx"
    hostname= "smtp.office365.com"
    port= 587
    ```

    !!! info
        - If you use a Gmail account as the email OTP sender, you must create an [App Password](https://support.google.com/accounts/answer/185833?visit_id=637943607149528455-3801902236&p=InvalidSecondFactor&rd=1). After you get an **App Password** from Google, update the `password`.
        - If your password contains special characters (example: `<`, `>`, `&`), you will run into errors when running the server. To avoid errors, update the `password` parameter as follows:
        ```toml
        password= "<![CDATA[xxxx]]>"
        ```

2. Update the sample values with your email adapter configurations.

<<<<<<< Updated upstream
    !!! info
        Refer [configure email sending module](../../../deploy/configure-email-sending) for the complete list of email adapter configurations.

3. Save the configurations and restart the server.
=======
        1.  Navigate to <https://myaccount.google.com/security>.
        
        2.  Click **Signing in to Google** and make sure that the **2-step Verification** is disabled or off.
            ![google-2-step-verification](/assets/img/fragments/google-2-step-verification.png)
            
        3.  Click **Less secure app access** and enable **Allow less secure apps: ON**.
            ![allow-less-secure-apps](/assets/img/fragments/allow-less-secure-apps.png)  
    
2. Restart the server once configurations are in place. 
>>>>>>> Stashed changes
