# Configuring Google reCaptcha for Security-Question Based Password Recovery

This topic guides you through configuring reCaptcha for secret questions
in the [password recovery
flow](Password-Recovery_103330558.html#PasswordRecovery-Recoveryusingchallengequestions)
. By configuring reCaptcha, you can mitigate or block brute force
attacks.

  

-   For more information on setting up password recovery with secret
    questions, see [Password
    Recovery](Password-Recovery_103330558.html#PasswordRecovery-Recoveryusingchallengequestions)
    .
-   For more information on brute force attacks, see [Mitigating Brute
    Force Attacks](_Mitigating_Brute_Force_Attacks_).

  

1.  Set up reCaptcha with the WSO2 Identity Server. For instructions on
    how to do this and more information about reCaptcha, see [Setting Up
    ReCaptcha](https://docs.wso2.com/display/IS530/Setting+Up+ReCaptcha)
    .
2.  Start the WSO2 IS Server and login to the management console.
3.  Click **Resident** under **Identity Providers** found in the
    **Main** tab.
4.  Expand the **Account Management Policies** tab and then expand the
    **Account Recovery** tab.
5.  Select **Enable reCaptcha for Security Question Based Password
    Recovery** to enable reCaptcha for account recovery.  
    ![](attachments/103330575/103330576.png){width="758"}

6.  Enable account locking and Configure the **Max Failed Attempts for
    ReCaptcha**.

    !!! note
    
        **Note:** This value should be less than the number of failed
        attempts configured in the account locking connector.
    
        ![](attachments/103330575/103330577.png)
    

7.  You have now successfully configured reCaptcha for the password
    recovery with secret questions flow. The reCaptcha will be prompted
    if the user reaches the limit of max failed attempts when providing
    an answer to a secret question. For instance, since the **Max Failed
    Attempts for ReCaptcha** was configured as 2 above, if the user
    answers a question incorrectly twice, the reCaptcha will be prompted
    as seen in the window below.  
    ![](attachments/103330575/103330579.png){height="250"}
