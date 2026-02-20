# OpenID for Verifiable Credential Issuance (OID4VCI)

{{ product_name }} supports issuing verifiable credentials to digital wallets using the OID4VCI protocol. This page explains the key concepts, supported flows, credential formats, and endpoints.

!!! info
    OID4VCI is defined by the [OpenID for Verifiable Credential Issuance specification](https://openid.net/specs/openid-4-verifiable-credential-issuance-1_0.html){:target="_blank"}. {{ product_name }}'s implementation follows this specification to ensure interoperability with any conformant digital wallet.

## What are verifiable credentials?

A **verifiable credential (VC)** is a tamper-evident digital document that represents claims about a subject (for example, a user's name, job title, or degree). VCs are cryptographically signed by the **issuer**, held by the **holder** in a digital wallet, and presented to a **verifier** who can check authenticity without contacting the issuer.

This three-party trust model — **issuer, holder, verifier** — is the foundation of decentralized identity.

## What is OID4VCI?

**OpenID for Verifiable Credential Issuance (OID4VCI)** is a protocol built on OAuth 2.0 and OpenID Connect. It standardizes how a credential issuer delivers verifiable credentials to a digital wallet.

{{ product_name }} acts as the **credential issuer**. It exposes the necessary endpoints to allow a conformant digital wallet to:

1. Discover the issuer's capabilities via a well-known metadata endpoint.
2. Get authorization (interactively or via a pre-authorized code).
3. Request and receive a signed verifiable credential.

## Credential issuance flow

{{ product_name }} supports the **authorization code flow** for credential issuance. In this flow, the user authenticates interactively before receiving a credential.

![OID4VCI authorization code flow sequence diagram]({{base_path}}/assets/img/guides/verifiable-credentials/oid4vci-flow.png){: width="750" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

1. **Credential offer** — {{ product_name }} generates a credential offer delivered as a QR code or deep link. The wallet scans or follows it to begin the issuance flow.
2. **Fetch issuer metadata** — The wallet sends `GET /.well-known/openid-credential-issuer` to discover what credentials the issuer supports, their formats, and the relevant endpoint URLs.
3. **Credential issuer metadata response** — {{ product_name }} returns the issuer metadata, including supported credential configurations and endpoint locations.
4. **Fetch authorization server metadata** — The wallet sends `GET /.well-known/oauth-authorization-server` or `GET /.well-known/openid-configuration` to discover the authorization and token endpoints.
5. **Authorization server metadata response** — {{ product_name }} returns the authorization server metadata.
6. **Authorization request** — The wallet sends an authorization request to {{ product_name }} including `scope` specifying the verifiable credential being requested.

    !!! note
        Some wallets use the **Pushed Authorization Request (PAR)** endpoint (`POST /oauth2/par`) to send the authorization request directly to the server before redirecting the user. This improves security by keeping request parameters out of the browser URL. If the wallet supports PAR, it will use the `request_uri` returned by the PAR endpoint in the authorization redirect.

7. **Authenticate and consent** — {{ product_name }} prompts the user to log in and grant consent to share the requested attributes with the wallet.
8. **Login and grant consent** — The user authenticates and approves the consent screen.
9. **Authorization code** — {{ product_name }} issues an authorization code and redirects back to the wallet's callback URL.
10. **Token request** — The wallet exchanges the authorization code for an access token via `POST` to the token endpoint.
11. **Access token** — {{ product_name }} returns an access token bound to the authorized credential request.
12. **Nonce request** — The wallet sends `POST /nonce` to get a fresh server-generated nonce (`c_nonce`) used to prevent replay attacks.
13. **c_nonce response** — {{ product_name }} returns the `c_nonce` value.
14. **Credential request** — The wallet sends a credential request to the credential endpoint, including the Bearer access token and a JWT proof signed with `c_nonce` to prove possession of the private key.
15. **Credential response** — {{ product_name }} validates the access token and proof, then returns the signed verifiable credential (e.g., an SD-JWT VC) to the wallet.

## Supported credential formats

{{ product_name }} supports the following credential formats:

| Format | Description |
| :----- | :---------- |
| `dc+sd-jwt` | **SD-JWT VC** — Selective Disclosure JWT-based verifiable credential. Allows the holder to selectively disclose individual claims to a verifier without revealing the full credential. |
| `jwt_vc_json` | **JWT VC JSON** — Standard JWT-based verifiable credential encoded as a JSON object. All claims are included in the token and signed by the issuer. |

## Key endpoints

{{ product_name }} exposes the following OID4VCI endpoints:

| Endpoint | Path | Purpose |
| :------- | :--- | :------ |
| Credential issuer metadata | `/.well-known/openid-credential-issuer` | Advertises the issuer's capabilities, supported credential configurations, and endpoint URLs. |
| Credential offer | `/oid4vci/credential-offer?credential_offer_uri=...` | Delivers a credential offer to the wallet via a URI reference. |
| Nonce | `/oid4vci/nonce` | Issues a fresh nonce used to bind the wallet's proof of possession. |
| Credential | `/oid4vci/credential` | Issues the signed verifiable credential after validating the access token and proof. |

### Sample credential issuer metadata response

The following is an example response from the `/.well-known/openid-credential-issuer` endpoint. Wallets use this to discover what credentials the issuer supports and how to request them.

```json
{
  "credential_issuer": "https://localhost:9443/oid4vci",
  "credential_endpoint": "https://localhost:9443/oid4vci/credential",
  "nonce_endpoint": "https://localhost:9443/oid4vci/nonce",
  "authorization_servers": [
    "https://localhost:9443/oauth2/token"
  ],
  "credential_configurations_supported": {
    "work_id": {
      "id": "work_id",
      "format": "dc+sd-jwt",
      "scope": "work_id",
      "vct": "work_id",
      "credential_signing_alg_values_supported": [
        "RS256"
      ],
      "cryptographic_binding_methods_supported": [
        "jwk"
      ],
      "proof_types_supported": {
        "jwt": {
          "proof_signing_alg_values_supported": [
            "RS256", "RS384", "RS512",
            "PS256", "PS384", "PS512",
            "ES256", "ES384", "ES512"
          ]
        }
      },
      "credential_metadata": {
        "display": [
          {
            "name": "Work ID"
          }
        ],
        "claims": [
          {
            "path": ["email"]
          },
          {
            "path": ["username"]
          }
        ]
      }
    }
  }
}
```

!!! note
    The `credential_signing_alg_values_supported` field (shown as `RS256` above) specifies the algorithm {{ product_name }} uses to **sign the issued credential**. This is configured per credential template and can be customized. In contrast, `proof_signing_alg_values_supported` lists the algorithms the **wallet** can use to sign its proof of possession. These are two separate concerns — issuer-side credential signing and wallet-side proof signing.

## Proof of possession (key binding)

To prevent credential theft, OID4VCI requires the wallet to prove it controls the private key bound to the credential. {{ product_name }} supports the **JWT proof type** for this purpose.

The flow works as follows:

1. The wallet generates a **key pair** (public and private keys).
2. Before requesting the credential, the wallet calls the **nonce endpoint** to get a fresh nonce.
3. The wallet constructs a **JWT proof** — a signed JWT containing the nonce and the wallet's public key — signed with its private key.
4. The wallet includes this proof in the credential request.
5. {{ product_name }} verifies the proof signature and nonce before issuing the credential.

## Cryptographic binding

{{ product_name }} uses **JWK-based cryptographic binding** to tie the issued credential to the wallet's key pair. The wallet's public key (in JWK format) is embedded in the credential's `cnf` (confirmation) claim. This ensures that only the holder of the corresponding private key can present the credential to a verifier.

## See also

- [Issue verifiable credentials to a Digital Wallet]({{base_path}}/guides/verifiable-credentials/issue-vc/) — Step-by-step guide to configure and issue credentials.
- [OAuth 2.0 grant types]({{base_path}}/references/grant-types/) — Learn about the authorization code grant and other OAuth 2.0 flows that OID4VCI builds on.
- [Register an application]({{base_path}}/guides/applications/) — Understand how to register and configure applications in {{ product_name }}.
- [Manage user attributes]({{base_path}}/guides/users/attributes/) — Configure the user attributes that are included as claims in your verifiable credentials.
