{% set product_name = "WSO2 Identity Platform" %}

# ACR and AMR

Authentication Context Class Reference (ACR) and Authentication Method Reference (AMR) are standard parameters used in OIDC and SAML authentication flows to convey assurance levels and authentication method details.

## What is ACR?

ACR is an optional parameter used in SAML and OIDC authentication requests. It enables applications to communicate the required level of assurance to {{ product_name }}, which then enforces the appropriate authentication steps. In certain contexts, ACR is also referred to as the Level of Assurance (LoA).

ACR values are flexible and can be custom-defined, as long as both the application and {{ product_name }} agree on their meaning.

## What is AMR?

AMR provides information about the authentication methods that were used to assert a user's authenticity. It records the session activities that took place while authenticating a user.

By default, {{ product_name }} uses the internal names of the authenticators as AMR values (e.g., `BasicAuthenticator`, `totp`).

## ACR vs AMR

While ACR denotes the set of business rules that must be met during authentication, AMR denotes the authentication methods that were actually used to meet those rules.

For example:

- An application requests `acr2` (high assurance) → {{ product_name }} enforces MFA based on the configured authentication script.
- The resulting ID token's `amr` claim reflects the actual methods used: e.g., `["BasicAuthenticator", "totp"]`.

## ACR and AMR in authentication responses

After a successful authentication, both `acr` and `amr` are included in the ID token. The following is an example of a decoded ID token:

```json
{
  "at_hash": "6OXwfxJaTWYC56RccEhSJg",
  "aud": "EUVvhKM28RkwTQL9A52kqXnfCj8a",
  "acr": "LOA2",
  "c_hash": "lDj9nihZGSUmgNmz_lxxXA",
  "sub": "admin",
  "nbf": 1548396413,
  "azp": "EUVvhKM28RkwTQL9A52kqXnfCj8a",
  "amr": [
    "BasicAuthenticator",
    "totp"
  ],
  "iss": "https://api.asgardeo.io/t/{organization_name}/oauth2/token",
  "exp": 1548400013,
  "iat": 1548396413
}
```

For SAML applications, the selected ACR value is returned in the `AuthnStatement` element of the SAML assertion:

```xml
<saml2:AuthnStatement AuthnInstant="2019-07-03T10:26:56.645Z"
                      SessionIndex="9e2a915b-aa69-4262-bd06-59e70c18469b">
    <saml2:AuthnContext>
        <saml2:AuthnContextClassRef>urn:federation:authentication:windows</saml2:AuthnContextClassRef>
    </saml2:AuthnContext>
</saml2:AuthnStatement>
```

## Next steps

- [Add adaptive MFA]({{base_path}}/guides/authentication/conditional-auth/adaptive-mfa/)
- [Conditional authentication API reference]({{base_path}}/references/conditional-auth/api-reference/)
