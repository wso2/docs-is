# Configure post-quantum TLS

As quantum computing becomes a reality, traditional public key algorithms like RSA and ECC grow increasingly vulnerable. {{ product_name }} mitigates this issue by supporting **Post-Quantum Cryptography (PQC)** through hybrid key exchange algorithms, specifically the [X25519+Kyber](https://datatracker.ietf.org/doc/draft-tls-westerbaan-xyber768d00/) hybrid key agreement algorithm.

A hybrid key agreement algorithm combines a classical algorithm with a post-quantum algorithm to establish a shared secret. This approach keeps communication secure even if one algorithm is compromised, helping systems transition seamlessly to post-quantum cryptography.

{% include "../../../../../includes/deploy/security/configure-post-quantum-tls/post-quantum-inbound.md" %}
