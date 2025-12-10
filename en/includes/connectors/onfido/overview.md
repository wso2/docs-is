# Overview

[Onfido](https://www.entrust.com/products/identity-verification){: target="_blank"} provides identity verification services that help businesses verify the identities of their users ensuring compliance with Know Your Customer (KYC) and Anti-Money Laundering (AML) regulations. It uses a combination of methods such as document verification, facial recognition, biometric analysis, watchlist screening, and fraud detection to confirm a user’s identity.

By integrating Onfido with {{product_name}}, you can automate the identity verification process during user onboarding or authentication, enhancing security and compliance.

![Onfido business use case]({{base_path}}/assets/img/connectors/onfido/onfido-business-use-case.png)

How it works,

- When a user logs into your application, your application logic can do one of the following:

    -  Deny login until the user completes identity verification.
    -  Allow login but restrict access to certain features until the user completes verification.

- Redirect the user to the identity verification process, handled through {{product_name}} and Onfido.

- Prompt the user to provide necessary identity documents and biometric data. This can include uploading a government-issued ID, taking a selfie, or providing additional information as required by your organization's verification policies.

- Onfido checks whether the details in the user's profile match the submitted documents and biometric data. It also performs fraud detection checks to ensure the authenticity of the documents.

- Your application receives the verification results and based on the results, it can either grant full access, restrict access, or deny access to the user.
