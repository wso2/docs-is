# Configure post-quantum TLS

As quantum computing becomes a reality, traditional public key algorithms like RSA and ECC grow increasingly vulnerable. {{ product_name }} mitigates this issue by supporting **Post-Quantum Cryptography (PQC)** through hybrid key exchange algorithms, specifically the [X25519MLKEM768](https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem) hybrid key agreement algorithm.

## What are hybrid key exchange algorithms?

A hybrid key agreement algorithm combines a classical algorithm with a post-quantum algorithm to establish a shared secret. This approach keeps communication secure even if one algorithm is compromised, helping systems transition seamlessly to post-quantum cryptography.

## Why post-quantum TLS?

- **Future-proof security**: Safeguards TLS communication against future quantum-based attacks.

- **Hybrid compatibility**: Ensures compatibility with current systems while introducing quantum-resistant security.

## Supported communication channels

{{ product_name }} supports post-quantum security for both:

- Inbound connections: Between clients (like browsers or apps) and the server.
- Outbound connections: Between the server and other external services.

## Enabling post-quantum TLS

1. Shut down the {{product_name}} instance if running.

2. Add the following configuration to the `<IS_HOME>/repository/conf/deployment.toml` file:

    ```toml
    [transport.https.client]
    provider_name = "BC"

    [transport.https.sslHostConfig.properties]
    protocols="TLSv1.2+TLSv1.3"
    ```

3. Restart the Server.

!!! note
    Some outbound TLS connections may omit the SNI extension when the BC provider is enabled, causing certain servers to reject the handshake.

    To resolve this, add the following system property at server startup:

    === "Linux/Mac OS"
        ``` bash
        sh wso2server.sh -Dorg.bouncycastle.jsse.client.assumeOriginalHostName=true
        ```

    === "Windows"
        ``` bash
        wso2server.bat -Dorg.bouncycastle.jsse.client.assumeOriginalHostName=true
        ```

    Note that this may expose connections to **man-in-the-middle (MITM) attacks** if the name service is not trustworthy.
