# Verifiable Credentials

Verifiable Credentials (VCs) are tamper-evident digital credentials that allow anyone to verify information about a subject (such as a user) without contacting the credential issuer directly. {{ product_name }} supports issuing verifiable credentials to digital wallets using the **OpenID for Verifiable Credential Issuance (OID4VCI)** standard.

## Why verifiable credentials?

Traditional identity verification often requires real-time communication with the credential issuer or centralized databases. Verifiable credentials solve this by enabling a decentralized trust model:

- **Decentralized trust** — Verifiers can check credential authenticity using cryptographic proofs without contacting the issuer.
- **User control** — Holders store credentials in their own digital wallets and choose when and with whom to share them.
- **Selective disclosure** — With formats like SD-JWT, holders can reveal only specific claims (e.g., prove their age without disclosing their full date of birth).
- **Standards-based** — Built on open standards (OID4VCI, W3C Verifiable Credentials), ensuring interoperability across different systems and wallets.

## How it works

The verifiable credentials model involves three parties:

- **Issuer** — The organization that creates and signs the credential. {{ product_name }} acts as the issuer.
- **Holder** — The user who receives the credential in their digital wallet and presents it when needed.
- **Verifier** — The party that checks the credential's authenticity and reads its claims.

![Verifiable credentials trust triangle showing the Issuer, Holder, and Verifier roles]({{base_path}}/assets/img/guides/verifiable-credentials/vc-trust-triangle.png){: width="600" style="display: block; margin: 0 auto;"}

{{ product_name }} uses the OID4VCI protocol to issue credentials to any conformant digital wallet. The wallet receives a credential offer, the user authenticates, and {{ product_name }} delivers a cryptographically signed credential.

## What you can do

Use the guides in this section to issue verifiable credentials from {{ product_name }} to standards-compliant digital wallets.

- [OpenID for verifiable credential issuance (OID4VCI)]({{base_path}}/references/concepts/oid4vci/) — Understand how OID4VCI works, the supported credential formats, key endpoints, and cryptographic binding.

- [Issue verifiable credentials to a digital wallet]({{base_path}}/guides/verifiable-credentials/issue-vc/) — Step-by-step guide to configure {{ product_name }} and issue a verifiable credential to any OID4VCI-compatible digital wallet.
