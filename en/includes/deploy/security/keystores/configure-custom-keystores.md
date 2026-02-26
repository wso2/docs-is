# Configure custom keystores for authentication protocols

By default, WSO2 Identity Server uses the private key and certificate from the primary keystore in all authentication flows such as,

- Signing JWT tokens in OAuth authentication flows
- Verifying JWT tokens signed by WSO2 identity server  
- Signing SAML assertions in SAML authentication flows

WSO2 Identity Server also allows configuring separate keystores for each authentication protocol.

This document provides step-by-step instructions to configure a custom keystore for a specific authentication protocol. You can define multiple custom keystores and assign each to a different protocol as needed.

!!! note
    Currently only the following authentication protocols are supported,

    - OAuth 2.0
    - WS-Federation
    - WS-Trust (Needs to be added via the WS-Trust connector)
    - SAML

## Configure custom keystore for OAuth, WS-Trust or WS-Federation

1. Locate your custom key store file in `<IS_HOME>/repository/resources/security/` directory.  
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

    Configuration parameters,

    | Configuration | Details |
    | :---- | :---- |
    | `file_name` | Key store file name. |
    | `password` | Key Store password. |
    | `type` | Key Store Type. |
    | `alias` | Alias value of the private key. |
    | `key_password` | Private key password. |

3. Map the Custom KeyStore to Authentication Protocols  

    This configuration maps the custom key stores configured above to different authentication protocols. As of now, the following authentication protocols are supported,

    === "OAuth 2.0"
        ``` toml
        [keystore.mapping.oauth]
        keystore_file_name = "<keystore name>"
        use_in_all_tenants = true
        ```

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

        !!! note
            When configuring a custom keystore for WS-Trust, ensure that you reapply the security policy defined in the [Security Token Service (STS) configurations](https://github.com/wso2-extensions/identity-inbound-auth-sts/blob/master/docs/config.md){: target="_blank"}. This step is necessary for the custom keystore to function correctly with the applied security policy.

    Configuration parameters,

    | Configuration | Details | Default Value |
    | :---- | :---- | :---- |
    | `keystore_file_name` | The file name of the custom keystore. (Should exactly match the `file name` given in the previous configuration) | (Required) |
    | `use_in_all_tenants` | Decide whether this configuration will apply to all tenants or the super tenant only. | false |

## Configure custom keystore for SAML

1. Locate your custom key store file in `<IS_HOME>/repository/resources/security/` directory.
2. Add the following configuration to `deployment.toml` file.

    === "JKS"
        ``` toml
        [keystore.saml]
        file_name = "<keystore name>"
        password = "<password>"
        type = "JKS"
        alias = "<private key alias>"
        key_password = "<password>"
        ```

    === "PKCS12"
        ``` toml
        [keystore.saml]
        file_name = "<keystore name>"
        password = "<password>"
        type = "PKCS12"
        alias = "<private key alias>"
        key_password = "<password>"
        ``` 

    Configuration parameters,

    | Configuration | Details |
    | :---- | :---- |
    | `file_name` | Key store file name. |
    | `password` | Key Store password. |
    | `type` | Key Store Type. |
    | `alias` | Alias value of the private key. |
    | `key_password` | Private key password. |
