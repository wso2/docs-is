# ACR and AMR

Authentication Context Class Reference (ACR) and Authentication Method Reference (AMR) are standard parameters used in OIDC and SAML authentication flows to convey assurance levels and authentication method details.

## What is ACR?

ACR is an optional parameter used in SAML and OIDC authentication requests. It enables applications to communicate the required level of assurance to {{product_name}}, which then enforces the appropriate authentication steps. In certain contexts, ACR is also referred to as the Level of Assurance (LoA).

ACR values are flexible and can be custom-defined, as long as both the application and {{product_name}} agree on their meaning.

## What is AMR?

AMR provides information about the authentication methods that were used to assert a user's authenticity. It records the session activities that took place while authenticating a user.

By default, {{product_name}} uses the internal names of the authenticators as AMR values (e.g., `BasicAuthenticator`, `totp`). You can configure mappings to translate these to standard values — see [Translate AMR values](#translate-amr-values).

## ACR vs AMR

While ACR denotes the set of business rules that must be satisfied during authentication, AMR denotes the authentication methods that were actually used to satisfy those rules.

For example:
- An application requests `acr2` (high assurance) → {{product_name}} enforces MFA based on the configured authentication script.
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
  "iss": "https://localhost:9443/oauth2/token",
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

## Translate AMR values

By default, the `amr` claim in the ID token contains the internal names of the authenticators used during authentication (e.g., `BasicAuthenticator`, `totp`). You can translate these to standard [RFC 8176](https://www.rfc-editor.org/rfc/rfc8176){:target="_blank"} AMR values (e.g., `pwd`, `otp`, `hwk`) by configuring {{product_name}}.

You can also suppress a specific authenticator from appearing in the `amr` claim entirely.

### Configure AMR value mappings

Add the following configuration to the `deployment.toml` file found in the `<IS_HOME>/repository/conf/` directory:

!!! note
    The `amr_value` should either follow the [RFC 8176 AMR specification](https://www.rfc-editor.org/rfc/rfc8176){:target="_blank"} or be any custom value you prefer to use in the `amr` claim.

```toml
[[authentication_context.method_refs]]
method = "<authenticator_name>"
amr_value = "<amr_uri>"
```

To prevent a specific authenticator from appearing in the `amr` claim of the ID token, use `excluded_methods`:

```toml
[[authentication_context.method_refs]]
excluded_methods = ["<authenticator_name>"]
```

**Example:**

```toml
[[authentication_context.method_refs]]
method = "BasicAuthenticator"
amr_value = "pwd"

[[authentication_context.method_refs]]
method = "DemoFingerprintAuthenticator"
amr_value = "fpt"

[[authentication_context.method_refs]]
method = "DemoFaceIdAuthenticator"
amr_value = "user"

[[authentication_context.method_refs]]
method = "DemoHardwareKeyAuthenticator"
amr_value = "hwk"

[[authentication_context.method_refs]]
excluded_methods = ["AuthenticatorToBeHiddenFromAMR"]
```

### Example: Translated AMR values in ID token

After configuring the mappings, the `amr` claim in the ID token will reflect the translated values:

```json
{
  "at_hash": "6OXwfxJaTWYC56RccEhSJg",
  "aud": "EUVvhKM28RkwTQL9A52kqXnfCj8a",
  "acr": "LOA3",
  "c_hash": "lDj9nihZGSUmgNmz_lxxXA",
  "sub": "admin",
  "nbf": 1548396413,
  "azp": "EUVvhKM28RkwTQL9A52kqXnfCj8a",
  "amr": [
    "pwd",
    "hwk",
    "user"
  ],
  "iss": "https://localhost:9443/oauth2/token",
  "exp": 1548400013,
  "iat": 1548396413
}
```

!!! info "Related topics"
    - [Guide: Configure ACR-based adaptive authentication]({{base_path}}/guides/authentication/conditional-auth/acr-based-adaptive-auth/)
    - [Reference: Conditional authentication API]({{base_path}}/references/conditional-auth/api-reference/)
