# Fast Identity Online (FIDO)

## What is FIDO?

Fast Identity Online (FIDO) is a set of protocols that supports authentication of any type including fingerprint, biometrics, and security tokens. FIDO specifications support [multi-factor authentication]({{base_path}}/multi-factor-authentication) and make it simpler to authenticate users while also ensuring that security is enhanced. 

FIDO protocols are based on public key cryptography and are strongly resistant to phishing. In order to address a wide range of use cases and deployment scenarios, FIDO provides two specifications that support two different user experience paths:

- Universal Authentication Framework (UAF)
- Universal Second Factor (U2F)

![FIDO]({{base_path}}/assets/img/concepts/fido.png)

---

## UAF 

Universal Authentication Framework (UAF) involves a passwordless experience with the following key processes:

-   The user carries the client device with the UAF stack installed. 
-   The user presents a local biometric or PIN.
-   The website can choose whether to retain the authentication information.

---

## U2F 

U2F focuses on the second factor experience and has the following key processes:

-   The user carries the U2F device with built-in support for
 web browsers.
-   The user presents the U2F device.
-   The website can simplify the password (for example, it can be simplified to a 4-digit PIN).

U2F tokens provide cryptographic assertions that can be verified by relying parties. Typically, the relying party is a web server, and the cryptographic assertions are used as the second factor (in addition to passwords) during user authentication. U2F tokens are typically small special-purpose devices and FIDO client is a web browser that communicates between the token and relying party.

**Operations**

The following are the two main operations that take place when using FIDO U2F.

1.  **Registration**: Upon registration, a device gives the server its attestation certificate. This certificate can be (optionally) used to verify the authenticity of the device.

2.  **Authentication**: The authentication operation proves possession of a previously registered key pair to the relying party.

**Phases**

Both the registration and authentication operations consist of three **phases** as shown in the diagram below.

![U2F protocol operations]({{base_path}}/assets/img/concepts/u2f-protocol-operations.png)

1.  **Setup**: In this phase, the FIDO client contacts the relying party and obtains a challenge. Using the challenge (and possibly other data obtained from the relying party and/or prepared by the FIDO client itself), the FIDO client prepares a request message for the U2F token.
2.  **Processing**: In this phase, the FIDO client sends the request message to the token, and the token performs some cryptographic operations on the message, creating a response message. This response message is sent to the FIDO client. 
3.  **Verification**: In this phase, the FIDO client transmits the token's response message, along with other data necessary for the relying party to verify the token response, to the relying party.     The relying party then processes the token response and verifies its accuracy. A correct registration response will cause the relying party to register a new public key for a user, while a correct authentication response will cause the relying party to accept that the client is in possession of the corresponding private key.

**Authentication flow**

The following diagram depicts the FIDO U2F-based authentication process.

![U2F process flow]({{base_path}}/assets/img/concepts/u2f-process-flow.png) 

---

For more information about FIDO and how it works, see the official FIDO documentation: [What is FIDO?](https://fidoalliance.org/what-is-fido/). 

!!! info "Related topics"
    - [Concept: Multi-Factor Authentication]({{base_path}}/multi-factor-authentication)
    - [Guide: Configure Two-Factor Authentication with FIDO]({{base_path}}/guides/mfa/2fa-fido)






