If you are using a Google mail account, note that Google has restricted third-party apps and less secure apps from sending emails by default. Therefore, you need to configure your account to disable this restriction, as WSO2 Identity Server acts as a third-party application when sending emails to confirm user registrations or notifications for password reset. Follow the steps given below to enable your Google mail account to provide access to third-party applications.
1.  Navigate to <https://myaccount.google.com/security>.
2.  Click **Signing in to Google** and make sure that the **2-step Verification** is disabled or off.
    ![google-2-step-verification](../../assets/img/fragments/google-2-step-verification.png)
3.  Click **Less secure app access** and enable **Allow less secure apps: ON**.
    ![allow-less-secure-apps](../../assets/img/fragments/allow-less-secure-apps.png)  