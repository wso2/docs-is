# Configure post-quantum TLS

As quantum computing becomes a reality, traditional public key algorithms like RSA and ECC grow increasingly vulnerable. {{ product_name }} mitigates this issue by supporting **Post-Quantum Cryptography (PQC)** through hybrid key exchange algorithms, specifically the [X25519MLKEM768](https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem) hybrid key agreement algorithm.

## What are hybrid key exchange algorithms?

A hybrid key agreement algorithm combines a classical algorithm with a post-quantum algorithm to establish a shared secret. This approach keeps communication secure even if one algorithm is compromised, helping systems transition seamlessly to post-quantum cryptography.

## Why post-quantum TLS?

- **Future-proof Security**: Safeguards TLS communication against future quantum-based attacks.

- **Hybrid Compatibility**: Ensures compatibility with current systems while introducing quantum-resistant security.

- **Optimized Performance**: Leverages TLS 1.3 for faster handshakes and stronger encryption.

## Supported communication channels

{{ product_name }} supports post-quantum security for both:

- [Inbound connections]({{base_path}}/deploy/security/configure-post-quantum-tls/post-quantum-inbound): Between clients (like browsers or apps) and the server.
- [Outbound connections]({{base_path}}/deploy/security/configure-post-quantum-tls/post-quantum-outbound): Between the server and other external services.
