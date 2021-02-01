# Recaptcha On Invalid Challenge Question Attempts

This topic guides you through configuring reCaptcha for secret questions in the password recovery flow. By configuring reCaptcha, you can mitigate or block brute force attacks.

!!! info 
        -  For more information on setting up password recovery with secret questions, see [Password Recovery](../../../guides/password-mgt/challenge-question/).
        -  For more information on brute force attacks, see [Mitigating Brute Force Attacks](../../../deploy/mitigate-attacks/mitigate-brute-force-attacks).

---

{!fragments/set-up-recaptcha.md!}

---

## Enable recaptcha

1.  Start the WSO2 IS Server and login to the management console.

2.  Click **Resident** under **Identity Providers** found in the **Main** tab.

3.  Expand the **Account Management Policies** tab and then expand the **Account Recovery** tab.

4.  Select **Enable reCaptcha for Security Question Based Password Recovery** to enable reCaptcha for account recovery.  
    ![recaptcha-for-account-recovery](../../assets/img/guides/recaptcha-for-account-recovery.png) 

5.  Enable account locking and Configure the **Max Failed Attempts for ReCaptcha**.

    !!! note
        This value should be less than the number of failed attempts configured in the account locking connector.
    
        ![max-failed-attempts-for-recaptcha](../../assets/img/guides/max-failed-attempts-for-recaptcha.png)
    

6.  You have now successfully configured reCaptcha for the password recovery with secret questions flow. The reCaptcha will be prompted if the user reaches the limit of max failed attempts when providing an answer to a secret question. For instance, since the **Max Failed Attempts for ReCaptcha** was configured as 2 above, if the user answers a question incorrectly twice, the reCaptcha will be prompted as seen in the window below.  
    ![error-max-failed-attempts](../../assets/img/guides/error-max-failed-attempts.png)
