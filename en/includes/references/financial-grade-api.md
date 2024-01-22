# Financial-grade API (FAPI)

## Overview

WSO2 Identity Server supports your applications to be FAPI compliant by offering the following features.

- **Conveniently create FAPI compliant applications** - Create FAPI compliant applications via the WSO2 Identity Console or via Dynamic Client Registration (DCR)

- **Support for certificate bound access tokens** - Enhance security of tokens by associating the access token with the user’s public key.

- **Support for pairwise subject identifiers** - Generate a unique identifier for a user for each client-user combination so that the user cannot be tracked across multiple services based on a single identifier.

- **Support for FAPI compliant additional request object validations**.
    - Mandate the authorization request object to be passed via the `request` or the `request_uri` parameter.

    - Pushed authorization requests (PAR) must send the PKCE code with the S256 code challenge method.
    
    - The request object must contain the following mandatory fields.
        - nbf
        - exp
        - scope
        - redirect_uri
        - Nonce  
    -  Request object must be signed with an algorithm allowed by FAPI standards (e.g. PS256, ES256)


- **Support for additional validations in the authorization flow**

    - If the response type of a token request is set to `code`, the `response_mode` of the request object should be set to `jwt`.

- **Support for an improved client authentication mechanism**.

    - If the client is authenticated with `private key JWT`, the client assertion must be signed using a FAPI allowed algorithm (PS256, ES256).

The following diagram illustrates how the features mentioned above combine to create a more robust authentication/authorization mechanism.

![Fapi compliant application flow]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-application.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}


## Secure client-server communication

Follow the sections below to implement FAPI-compliant features to secure the communication between the client and the authorization server.

### Configure the client authentication method

The WSO2 Identity Server uses the selected client authentication method to verify the identity of the client making requests to it.

Follow the steps below to configure a FAPI-compliant client authentication method.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Under **Client Authentication**, select one of the following **Client authentication methods**.

    ![Choose a fapi compliant authentication method]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-client-authentication-methods.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    - **Private Key JWT** - Select this option for the client to send a client-generated JSON Web Token (JWT) signed with the private key in its authentication request. The authorization server will verify the signature with the client's public key.

        Select one of the FAPI compliant algorithms to sign the JWT under **Signing algorithm** (PS256, ES256).

        !!! info
            Learn more about private key JWT in [Implement private key JWT client authentication for OIDC]({{base_path}}/guides/authentication/oidc/private-key-jwt-client-auth/).

    - **Mutual TLS** - Select this option for the server to present its certificate to the client to verify its identity and for the client to reciprocate by sending its certificate to the server to establish a two-way trust relationship.

        Enter the domain name of the client certificate under **TLS client authentication subject domain name**.

4. Click **Update** to save the changes.

### Configure the request object

Securing the OIDC request object through signing ensures the integrity of the object. Adding a layer of encryption provides the object with an additional level of security especially with browser based flows such as the authorization code flow.

Follow the steps below to configure a FAPI-compliant request object:

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Select a FAPI-compliant signing algorithm under **Request object signing algorithm**.

4. Optionally, to encrypt the request object, select,
    - a FAPI-compliant asymmetric key encryption algorithm under **Request object encryption algorithm**
    - a FAPI-compliant symmetric key encryption method under **Request object encryption method**.

    ![Choose fapi compliant request object configurations]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-request-object-configurations.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

5. Click **Update** to save the changes.

### Configure the response

If you are using the authorization code grant type, FAPI specifies that your response type should be set to JWT Secured Authorization Response Mode (JARM).

By using JARM, the authorization server includes the authorization code along with the other details in the response, signs the response using the authorization server's public key and sends it to the client.

Follow the steps below to configure a FAPI-compliant authorization response:

!!! Prerequisite

    Enable [JARM for OAuth 2.0]({{base_path}}/guides/authentication/oidc/jarm/) in {{product_name}}.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the created FAPI-compliant application and go to its **Protocol** tab.

3. Select a FAPI-compliant signing algorithm under **ID token response signing algorithm**.

    ![Choose fapi compliant ID token signing algorithm]({{base_path}}/assets/img/guides/applications/fapi-compliant-apps/fapi-compliant-id-token-response.png){: width="600" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

4. Click **Update** to save the changes.

### Configure a pairwise subject identifier

Configuring a pairwise subject identifier means that external entities will not be able to track user activities across applications based on a single user attribute. Learn about user attributes and how to [configure the subject identifier]({{base_path}}/guides/authentication/user-attributes/enable-attributes-for-oidc-app/#configure-the-subject-identifier).

### Configure levels of assurance

Applications can achieve a higher level of security by defining Authentication Context Reference (ACR) values, also known as levels of assurance. The authorization server can then receive ACR values from the application and dynamically adjust the strength of authentication.

Learn about how to set up applications to send ACR values and how you can use an adaptive authentication script to dynamically adjust the authentication steps based on the received ACR value in the [Configure ACR-based adaptive authentication]({{base_path}}/guides/authentication/conditional-auth/acr-based-adaptive-auth/) section.
