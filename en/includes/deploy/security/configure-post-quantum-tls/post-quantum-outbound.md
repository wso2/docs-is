# Configure Post-Quantum Outbound TLS

Outbound communication refers to {{ product_name }} acting as a client—connecting securely to third-party services such as APIs, OAuth endpoints, or external identity providers.

1. Add the following configuration to enable TLS with `X25519MLKEM768` for outbound connections:

    ```toml
    [transport.https.client]
    provider_name = "BC"
    tls_named_groups = "X25519MLKEM768:x25519"
    ```

2. Restart the Server
