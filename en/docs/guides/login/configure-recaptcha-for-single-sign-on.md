# Configure reCAPTCHA for Single Sign-On

This topic guides you through configuring reCAPTCHA for the single sign
on flow. By configuring reCAPTCHA, you can mitigate or block brute force
attacks.

!!! Info 
    -   For more information on configuring single sign-on, see [Configuring
    Single Sign-On](../../../guides/login/enable-single-sign-on/).
    -   For more information on brute force attacks, see [Mitigating Brute
    Force Attacks](../../../deploy/mitigate-attacks/mitigate-brute-force-attacks/).

{! fragments/configure-recaptcha-api-keys.md !}

---

{! fragments/set-up-recaptcha.md !}

{! fragments/configure-recaptcha-for-sso.md !}

!!! Info
    - If the user exceeds the Maximum failed login attempts as well, the  email notification for account locking scenario can be configured by [Configure Email Notifications for Account Locking](../../../guides/tenants/email-account-locking)
    

!!! info "Related topics"
    - [Concept: Single Sign-On](../../../references/concepts/single-sign-on)
