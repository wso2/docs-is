# Use Certificates with Applications

Follow the steps given below to configure your application to use a public certificate instead of the default [JWKS](../../../references/concepts/authentication/jwks) endpoint. This configuration is required to follow the scenarios mentioned below. 

1.  OIDC Token Encryption
2.  Request Object flow

---

{!fragments/encrypt-id-tokens.md!}

---

!!! info "Related topics" 
    -  [Concept: JWKS](../../../references/concepts/authentication/jwks)
    -  [Guide: Generate and Encrypt ID Tokens](../oidc-token-encryption)
    -  [Quick Start: OpenID Connect Token Encryptuon](../../../quick-starts/oidc-token-encryption-sample)
    -  [Guide: Call the JSON Web Key Set (JWKS) Endpoint](../using-jwks)
    -  [Guide: Pass Parameters as a Request Object](../oidc-request-object)