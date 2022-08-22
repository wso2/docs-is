# Adaptive Authentication

## What is adaptive authentication?

Adaptive authentication, also known as step-up authentication, is an evolved and flexible form of [multi-factor authentication]({{base_path}}/multi-factor-authentication) that tightens security when the possibility of a security breach is higher. Additional authentication steps such as SMS OTP, Security Key/Biometrics (FIDO), etc., can be configured and deployed in such a way that the system is able to decide which steps to prompt during the authentication process depending on the user’s risk profile and their behavior.  

For instance, high-risk transactions such as a user attempting to transfer a high sum of money cause the adaptive authentication mechanism to prompt an extra authentication step like sending a one-time security code to the user's mobile phone, in order to increase security.

![adaptive authentication]({{base_path}}/assets/img/concepts/adaptive-authentication.png)

---

## Why is it needed?

With adaptive authentication, the authentication strength is adjusted in real-time based on the context at hand, before granting access to a resource. 

This means that organizations can apply precisely the right level of gateway security to each and every login request, instead of issuing static procedures for everyone to follow under all circumstances. It improves convenience for the user while still tightening the security around authentication because it results in fewer interruptions for users who are recognized and behaving in expected ways but prompts extra security for users or circumstances that might be posing a potential risk. 

Some of the most common needs addressed by adaptive authentication are:

- Users want simple and convenient access to resources that they access on a daily basis, yet organizations need to be careful when authenticating them if the user behavior seems out of the ordinary. 

- Users need seamless access to certain resources, but organizations need to further verify their identities before they access anything more sensitive. 

- Some organizations may wish to implement a membership model that limits access to their resources or services according to a pricing model. 


!!! tip
    
    To learn more about adaptive authentication, see the following articles:
    
    -   [Four reasons to upgrade your MFA to adaptive
        authentication](https://wso2.com/library/article/2018/10/4-reasons-to-upgrade-your-mfa-to-adaptive-authentication)
    -   [Five instances to use adaptive
        authentication](https://wso2.com/library/article/2018/10/5-instances-to-use-adaptive-authentication/)
    -   [Four reasons to use WSO2 Identity Server for adaptive
        authentication](https://wso2.com/library/article/2018/10/four-reasons-to-use-wso2-is-for-adaptive-authentication/)

---

## Using adaptive authentication

WSO2 Identity Server (WSO2 IS) supports script-based adaptive authentication, which allows using a provided script editor to set up appropriate authentication factors depending on the requirement. The script editor provides a set of predefined templates that can be used to easily set up adaptive authentication for some of the most common authentication scenarios. If necessary, the script editor can also be used to introduce new functions and fields to an authentication script based on specific requirements, and the script can then be engaged to the service provider’s authentication step configuration.

!!! info "Related topics"
    - [Concept: Multi-Factor Authentication]({{base_path}}/multi-factor-authentication)
    - [Guide: Adaptive Authentication]({{base_path}}/guides/adaptive-auth/configure-adaptive-auth)
    - [Quick Start: Adaptive Authentication]({{base_path}}/quick-starts/adaptive-auth-overview)



