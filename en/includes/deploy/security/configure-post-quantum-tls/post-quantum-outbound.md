# Configure post-quantum TLS for outbound connections

An outbound connection refers to communication initiated by {{ product_name }} when it acts as a client and connects securely to third-party services such as APIs, OAuth endpoints or external identity providers.

To enable TLS to use post-quantum cryptography for outbound connections,

1. Shut down the {{product_name}} instance if running.

2. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [transport.https.client]
    provider_name = "BC"
    ```

3. Restart the Server.
