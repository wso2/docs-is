# Financial-grade API 2.0

Financial-grade API (FAPI), a specification that extends the OAuth and OIDC frameworks, was introduced by the [FAPI Working Group](https://openid.net/wg/fapi/){:target="_blank"} and defines additional technical requirements to secure high-value APIs.

[FAPI 2.0](https://openid.net/specs/fapi-security-profile-2_0-final.html){: target="_blank"} builds upon FAPI 1.0 Advanced and introduces additional security measures to further enhance the protection of sensitive data and transactions. {{product_name}} facilitates the creation of FAPI 2.0-compliant applications from the Console and with Dynamic Client Registration (DCR).

!!! note
    Learn how to [create a FAPI-compliant application]({{base_path}}/guides/applications/register-a-fapi-compliant-app/) in {{product_name}}.

The following diagram illustrates how FAPI-compliant features combine to secure applications and the following topics explain the illustrated concepts.

![FAPI 2.0 compliant application flow]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-2.0-compliant-application.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Authorization code grant type

FAPI 2.0 mandates the use of the authorization code grant type for all FAPI-compliant applications. The implicit and hybrid grant types are not allowed in FAPI 2.0. Follow the steps below to apply this restriction.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Under **Allowed grant types**, select only the **code** grant type.

4. Under **Authorized redirect URLs**, add the redirect URLs allowed for the application.

5. Under **Allowed origins**, add the allowed origins for the application.

6. Click **Update** to save the changes.

## Proof Key for Code Exchange (PKCE)

To be FAPI 2.0-compliant, clients must use Proof Key for Code Exchange (PKCE) when making authorization requests. With PKCE, the client generates a code verifier and derives a code challenge from it. The client must use the `S256` code challenge method to create the code challenge.

Follow the steps below to enforce PKCE:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Under **PKCE**, select **Mandatory**.

    !!! note

        FAPI 2.0 disallows the use of the `Plain` code challenge method. Therefore, when PKCE is made mandatory, {{product_name}} automatically restricts the code challenge method to `S256` only.

4. Click **Update** to save the changes.

## Client authentication

FAPI 2.0 requires clients to authenticate using one of the following methods:

1. **Private Key JWT** - The client sends a client-generated JSON Web Token (JWT) signed with the private key in its authentication request. The authorization server will verify the signature with the client's public key.

    !!! info
        Learn more about private key JWT in [Implement private key JWT client authentication for OIDC]({{base_path}}/guides/authentication/oidc/private-key-jwt-client-auth/).

2. **Mutual TLS** - The server presents its certificate to the client to verify its identity and the client sends its certificate to the server to establish a two-way trust relationship.

{{product_name}} will use the selected client authentication method to verify the identity of the client making requests to it.

Follow the steps below to configure a FAPI-compliant client authentication method.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Under **Client Authentication**, select one of the following **Client authentication methods**.

    ![Choose a fapi compliant authentication method]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-client-authentication-methods.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

## Pushed Authorization Requests (PAR)

Using Pushed Authorization Requests (PAR), clients can push the authorization request parameters to the authorization server from a back-channel request before making the authorization request. FAPI 2.0 requires authorization requests to be made using PAR.

!!! note
    Learn about [PAR]({{base_path}}/guides/authentication/oidc/implement-login-with-par/) and [PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/).

Follow the steps below to implement FAPI-compliant PAR requests for the `code` grant type.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Under **Pushed Authorization Requests**, select **Mandatory**.

4. Click **Update** to save the changes.

## Request object handling

FAPI 2.0 requires the JWT containing the authorization request parameters sent to the Pushed Authorization Request (PAR) endpoint to be signed and optionally encrypted.

Follow the steps below to configure a FAPI-compliant request object:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Select a FAPI-compliant signing algorithm under **Request object signing algorithm**.

4. Optionally, you can encrypt the request object, by choosing,
    - a FAPI-compliant asymmetric key encryption algorithm under **Request object encryption algorithm**
    - a FAPI-compliant symmetric key encryption method under **Request object encryption method**.

    ![Choose fapi compliant request object configurations]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-request-object-configurations.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the changes.

## Certificate-bound access tokens

Access token binding prevents token theft and misuse by tying the token to a client-specific credential or element. FAPI 2.0 mandates the use of certificate-bound access tokens which binds the token to the hash of the TLS certificate passed on the token request.

{{product_name}} automatically binds access tokens to the client's TLS certificate in a FAPI-compliant application.

!!! note
    Refer to [OIDC Configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token) to learn about the token binding methods supported in {{product_name}}.
