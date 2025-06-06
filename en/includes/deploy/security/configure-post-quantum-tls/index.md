# Configure post-quantum TLS

As quantum computing becomes a reality, traditional public key algorithms like RSA and ECC are increasingly vulnerable. {{ product_name }} supports **post-quantum cryptography (PQC)** to mitigate these future threats by enabling hybrid key exchange algorithms for TLS communication.

To address the quantum threat, {{ product_name }} integrates post-quantum cryptography with existing classical methods. Specifically, it adopts the [X25519MLKEM768](https://datatracker.ietf.org/doc/draft-ietf-tls-ecdhe-mlkem) hybrid key agreement algorithm for TLS communication, ensuring strong protection against future quantum attacks.

## Why post-quantum TLS?

- **Future-proof Security**: Protects against potential attacks by quantum computers.
- **Hybrid Key Exchange**: Combines classical and post-quantum algorithms for transitional security.
- **TLS 1.3 Support**: PQC is implemented over TLS 1.3 for improved performance and security.

## Types of communication

{{ product_name }} can be configured to support post-quantum security in both:

- **Inbound communication**: Between clients (like browsers or apps) and the server.
- **Outbound communication**: Between the server and other external services.

## Learn more

- [Post-Quantum Inbound TLS Configuration]({{base_path}}/deploy/security/configure-post-quantum-tls/post-quantum-inbound)

- [Post-Quantum Outbound TLS Configuration]({{base_path}}/deploy/security/configure-post-quantum-tls/post-quantum-outbound)
