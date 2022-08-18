# Multi-Factor Authentication

## What is multi-factor authentication?

Multi-factor authentication (MFA) is an effective method of providing enhanced security during user authentication by verifying user identity using more than one piece of identifying information. This means that in addition to providing basic authentication (username and password credentials), the user is also prompted to provide further verification in the form of a one-time password, biometrics, hardware key devices, etc. 

Due to increasing digital crimes and internet fraud in the world, people are highly concerned about security. The traditional username and password method is not enough to secure the authentication. Processing speeds of CPUs have increased, so brute force attacks are a reality, and dictionary attacks have become a common threat. GPGPU password cracking and rainbow tables have provided similar advantages to attackers.

To mitigate this, MFA creates a layered defense and makes it more difficult for an unauthorized person to gain access. Even if the username and password is compromised, the attacker would still have at least one more barrier to break through in order to successfully breach security. 

---

## Authentication factors

Multi-factor authentication uses a combination of different types of authentication factors. The three main categories are: 

- Knowledge factors: Things only the user knows, such as passwords or PIN numbers.

- Possession factors: Things only the user has, such as ATM cards or hardware key devices.

- Inherence factors: Things only the user is, such as a fingerprint or face.

A common day-to-day example of using a combination of these factors for MFA can be seen when withdrawing money from a bank. In this case, the ATM card is the possession factor and the PIN number is the knowledge factor.

---

## Using multi-factor authentication

By default, WSO2 Identity Server (WSO2 IS) is shipped with username-and-password-based authentication along with support for adding additional steps of authentication with authenticators such as SMSOTP, Security Key/Biometrics (FIDO), MEPin, etc. WSO2 Identity Server allows configuring multi-step authentication that enables defining an authentication chain containing different authenticators in different steps. This chain can also be converted to a multi-factor authentication chain by adding different factors of authentication as options to each step. 

For instance, a multi-step authentication chain would prompt password authentication as the first step and then prompt SMS OTP as the second step, whereas multi-factor authentication would prompt password authentication as the first step and provide an option to authenticate with SMS OTP **or** biometric as the second step. 

!!! tip
    For a complete list of readily available authenticators, see the [WSO2 IS Connector Store](https://store.wso2.com/store/assets/isconnector/list). 

Note that there are certain second-factor authenticators that **must** be followed by a knowledge factor authenticator. For instance, when you configure the Security Key/Biometrics (FIDO) authenticator, it must not be configured as the first step and must be followed by a first factor authenticator first since FIDO U2F is used for second factor authentication.

**Context-aware MFA**

Adaptive and context-aware access management is an evolved and flexible form of MFA that enables you to only prompt extra steps of authentication based on certain conditions such as geographic location, network or IP address etc. For more information, see [Adaptive Authentication]({{base_path}}/adaptive-authentication).


!!! info "Related topics"
    - [Concept: Adaptive Authentication]({{base_path}}/adaptive-authentication)
    - [Guide: Multi-Factor Authentication]({{base_path}}/guides/mfa/configure-authentication-journey)

