# Use Certificates with Applications

Follow the steps given below to configure your application to use a public certificate instead of the default [JWKS]({{base_path}}/references/concepts/authentication/jwks) endpoint. This configuration is required to follow the scenarios mentioned below. 

1.  OIDC Token Encryption
2.  Request Object flow

---

{!fragments/encrypt-id-tokens.md!}

---

!!! info "Related topics" 
    -  [Concept: JWKS]({{base_path}}/references/concepts/authentication/jwks)
    -  [Guide: Generate and Encrypt ID Tokens]({{base_path}}/oidc-token-encryption)
    -  [Quick Start: OpenID Connect Token Encryptuon]({{base_path}}/quick-starts/oidc-token-encryption-sample)
    -  [Guide: Call the JSON Web Key Set (JWKS) Endpoint]({{base_path}}/using-jwks)
    -  [Guide: Pass Parameters as a Request Object]({{base_path}}/oidc-request-object)