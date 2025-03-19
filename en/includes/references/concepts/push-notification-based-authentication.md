# Push Notification Based Authentication

Push Notification-Based Authentication is a **real-time, device-bound authentication mechanism** that leverages cryptographic signatures and secure 
push channels to verify user identity in IAM systems. This method replaces static credentials with **asymmetric cryptographic verification**, 
ensuring authentication requests are bound to a registered device and resistant to interception or replay attacks.

The process begins when an authentication request is initiated, triggering a push notification to the **user’s pre-registered mobile device** via 
**push notification services**. The user interacts with the request, approving or rejecting it. If approved, 
the authentication response is signed using a **private key securely stored on the device**, and the signed response is sent back to the 
authentication server for verification. Upon validation using the **corresponding public key**, the IAM system grants or denies access.

By **binding authentication to a user’s trusted device** and utilizing **public-key cryptography**, Push Notification-Based Authentication 
enhances security while providing a seamless user experience. Its low-latency challenge-response model, coupled with strong cryptographic assurances, 
makes it a highly secure and scalable authentication approach for modern IAM architectures.

The below given diagram illustrates the basic flow of Push Notification-Based Authentication in a multi factor authentication (MFA) scenario:

![Push Notification-Based Authentication Flow]({{base_path}}/assets/img/guides/mfa/push/push-authentication-sequence.jpg)

!!! note
    Learn how to [implement Push Notification-Based Authentication in {{product_name}}]({{push_mfa_doc_path}}).
