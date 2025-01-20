# Configure Custom KeyStores for Authentication Protocols

By default, WSO2 IS uses the private key and certificate from the Primary KeyStore in all authentication protocols such as,

- Sign JWT tokens in OAuth authentication flows  
- Verify JWT tokens signed by WSO2 identity server  
- Sign SAML assertions in SAML authentication flows

WSO2 Identity Server also allows configuring separate keystores for each authentication protocol.

!!! note
    Currently only the following authentication protocols are supported,

    - OAuth 2.0
    - WS-Federation
    - WS-Trust (Needs to be added via the WS-Trust connector)

This document will guide you through the process of setting up a key store for a specific authentication protocol.

## Configure Custom Key Store

1. Place your custom key store file in `<IS-HOME>/repository/resources/security/` directory.  
2. Add the following configuration to `deployment.toml` file.

    === "JKS"
        ``` toml
        [[keystore.custom]]
        file_name = "<keystore name>"
        password = "<password>"
        type = "JKS"
        alias = "<private key alias>"
        key_password = "<password>"
        ```

    === "PKCS12"
        ``` toml
        [[keystore.custom]]
        file_name = "<keystore name>"
        password = "<password>"
        type = "PKCS12"
        alias = "<private key alias>"
        key_password = "<password>"
        ```

    ### Configuration Parameters,

    | Configuration | Details |
    | :---- | :---- |
    | `file_name` | Key store file name. |
    | `password` | Key Store password. |
    | `type` | Key Store Type. |
    | `alias` | Alias value of the private key. |
    | `key_password` | Private key password. |

3. Map the Custom KeyStore to Authentication Protocols  

    - This configuration maps the custom key stores configured above to different authentication protocols.  
    - As of now, the following authentication protocols are supported,

    === "OAuth 2.0"
        ``` toml
        [keystore.mapping.oauth]
        keystore_file_name = "<keystore name>"
        use_in_all_tenants = true
        ```

        !!! note
            For the OAuth 2.0 protocol, only the following grant types are supported at the moment,

            - Authorization Code
            - Client Credential
            - Refresh Token
            - Implicit
            - Password

    === "WS-Federation"
        ``` toml
        [keystore.mapping.ws_federation]
        keystore_file_name = "<keystore name>"
        use_in_all_tenants = true
        ```

    === "WS-Trust"
        ``` toml
        [keystore.mapping.ws_trust]
        keystore_file_name = "<keystore name>"
        use_in_all_tenants = true
        ```

    ### Configuration Parameters,

    | Configuration | Details | Default Value |
    | :---- | :---- | :---- |
    | `keystore_file_name` | The file name of the custom keystore. (Should exactly match the `file name` given in the previous configuration) | (Required) |
    | `use_in_all_tenants` | Decide whether this configuration will apply to all tenants or the super tenant only. | false |