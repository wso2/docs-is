# Configure reCAPTCHA for Single Sign-On

This topic guides you through configuring reCAPTCHA for the single sign
on flow. By configuring reCAPTCHA, you can mitigate or block brute force
attacks.

!!! Info 
    -   For more information on configuring single sign-on, see [Configuring
    Single Sign-On]({{base_path}}/guides/login/enable-single-sign-on/).
    -   For more information on brute force attacks, see [Mitigating Brute
    Force Attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks/).

{!includes/configure-recaptcha-api-keys.md !}


---

{!includes/set-up-recaptcha.md !}

## Configure reCAPTCHA for SSO

{!includes/configure-recaptcha-for-sso.md !}

!!! Info
     If the user exceeds the maximum allowed failed login attempts as well, be sure to [configure email notifications for account locking]({{base_path}}/guides/tenants/email-account-locking).
    

!!! info "Related topics"
    - [Concept: Single Sign-On]({{base_path}}/references/concepts/single-sign-on)
