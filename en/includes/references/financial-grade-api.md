# Financial-grade API

Financial-grade API (FAPI), a specification that extends the OAuth and OIDC frameworks, was introduced by the [FAPI Working Group](https://openid.net/wg/fapi/){:target="_blank"} and defines additional technical requirements to secure APIs. Eventhough FAPI was initially defined for financial serivces, it is appropriate for any critical API whose security is the highest priority.

{{product_name}} facilitates the creation of FAPI-compliant applications from the Console as well as with Dynamic Client Registration (DCR).

!!! note
    Learn how to [create a FAPI-compliant application]({{base_path}}/guides/applications/register-a-fapi-compliant-app/) in {{product_name}}.

The following diagram illustrates how FAPI-compliant features combine to secure applications and the following topics explain the illustrated concepts.

![Fapi compliant application flow]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-application.png){: style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Request object handling

FAPI specifies that the request object be a signed JWT either passed by value in the `request` parameter or passed by reference in the `request_uri` parameter. The latter provides the benefit of additional integrity protection.

Follow the steps below to configure a FAPI-compliant request object:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Select a FAPI-compliant signing algorithm under **Request object signing algorithm**.

4. Optionally, you can encrypt the request object, by choosing,
    - a FAPI-compliant asymmetric key encryption algorithm under **Request object encryption algorithm**
    - a FAPI-compliant symmetric key encryption method under **Request object encryption method**.

    ![Choose fapi compliant request object configurations]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-request-object-configurations.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the changes.

## Pushed Authorization Requests (PAR)

Pushed Authorization Requests (PAR) introduces the `/par` endpoint to which a client can first, push the authorization payload from the back-channel and pass a reference to it in the `request_uri` parameter when making an authorization request.

FAPI specifies that when using the `code` grant type, PAR requests must send the Proof Key Code Exchange (PKCE) code with the `S256` code challenge method.

!!! note
    Learn about [PAR]({{base_path}}/guides/authentication/oidc/implement-login-with-par/) and [PKCE]({{base_path}}/guides/authentication/oidc/implement-auth-code-with-pkce/).

Follow the steps below to implement FAPI-compliant PAR requests for the `code` grant type.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Select the **code** grant type from the **Allowed grant types**.

4. You can make **Pushed Authorization Requests** mandatory by selecting the relevant checkbox.

4. If PAR is made mandatory, be sure to make **PKCE** mandatory by selecting the relevant checkbox.

5. Click **Update** to save the changes.


## JWT Secured Authorization Response Mode (JARM)

{{product_name}} supports sending authorization response object as JSON Web Tokens (JWT). JWT can be encoded using one of the modes defined in JWT Secured Authorization Response Mode (JARM).

JARM defines the `jwt`, `query.jwt`, `fragment.jwt` and `form_post.jwt` modes to encode the response object. According to the FAPI specification, if the response type of a token request is set to `code`, the `response_mode` must be set to `jwt`.

!!! note
    JARM is not enabled by default in {{product_name}}. Learn more about JARM including how to enable it in the [JARM for OAuth 2.0]({{base_path}}/guides/authentication/oidc/jarm/) documentation.

When a client specifies the response mode in the authorization request, {{product_name}} includes the details of the authorization response such as the `code` along with other details in a JWT, signs it with the authorization server's public key and sends it to the client in the specified mode.

Follow the steps below to configure a FAPI-compliant authorization response:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Select a FAPI-compliant signing algorithm under **ID token response signing algorithm**.

    ![Choose fapi compliant ID token signing algorithm]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-id-token-response.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

## Client authentication

{{product_name}} restricts the client authentication methods for FAPI-compliant applications to two methods.

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

## Certificate bound access tokens

Access token binding is designed to preserve the integrity of the access token and mitigates several security issues related to token theft and misuse. {{product_name}} supports several token binding methods.

!!! note
    Refer to [OIDC Configurations]({{base_path}}/references/app-settings/oidc-settings-for-app/#access-token) to learn about the token binding methods supported in {{product_name}}.

FAPI mandates the use of certificate bound access tokens which binds the token to the hash of the TLS certificate passed on the token request.

If the `FAPI Compliant Application` option is selected during the [registration of the application]({{base_path}}/guides/applications/register-a-fapi-compliant-app), {{product_name}} automatically sets the `Token binding type` to `certificate`.