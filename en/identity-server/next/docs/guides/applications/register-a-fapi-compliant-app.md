# Register a FAPI compliant application

Financial-Grade API (FAPI) is a standard that extends the OAuth and OIDC frameworks to provide enhanced security to applications. Although this is a standard initially defined for financial services, any developer that has integrated OAuth and OIDC protocols into their applications should consider making those applications FAPI compliant to incorporate the highest level of security.

## Overview

WSO2 Identity Server supports your applications to be FAPI compliant by offering the following features.

- **Conveniently create FAPI compliant applications** - Create FAPI compliant applications via the WSO2 Identity Console  and Dynamic Client Registration (DCR)

- **Support for certificate bound access tokens** - Enhance security of tokens by associating the access token with the user’s public key.

- **Support for pairwise subject identifiers** - Generate a unique identifier for a user for each client user combination so that the user cannot be tracked across multiple services based on a single identifier.

- **Support for FAPI compliant additional object validations** -
    - Mandate the authorization request object to be passed via the `request` or the `request_uri` parameter

    - Pushed authorization requests (PAR) must send the PKCE code in the S256 code challenge method.
    
    - The request object must contain the following mandatory fields.
        - nbf
        - exp
        - scope
        - redirect_uri
        - Nonce  
    -  Request object must be signed with an algorithm allowed by FAPI standards (e.g. PS256, ES256)


- **Support for additional validations in the authorization flow**

    - If the response type of a token request is set to code, the `response_mode` within the request object should be set to jwt.

- **Support for an improved token endpoint client authentication mechanisms**.

    - If private key jwt client authentication method is used, the client assertion must be signed using a FAPI allowed algorithm (PS256, ES256)

The following diagram illustrates how the features mentioned above combine to create a more robust authorization mechanism.

![Fapi compliant application flow]({{base_path}}/assets/img/guides/applications/fapi-compliant-application.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}