{{ product_name }} offers several authentication options tailored for AI agents, letting you choose the best fit based on your security needs and integration preferences.

<!-- vale off -->
### Agent ID and secret (default method)
<!-- vale on -->

This is the most widely used authentication method for agents on {{ product_name }}. Each agent is assigned a unique **Agent ID** paired with a secret that functions similarly to a password. The agent authenticates by presenting this credential pair.

Credentials are generated during agent registration and can be viewed or managed via the {{ product_name }} Console. If you suspect that your secret is compromised or want to update it for security reasons,

1. Log into the {{ product_name }} Console.
2. Navigate to **Agents** from the main menu.
3. Select the agent whose credentials you want to regenerate.
4. Go to the **Credentials** tab.
5. Click **Regenerate** under **Agent Secret**.

    !!! warning
        After regenerating the agent secret, make sure to update all services that are using the previous credentials. Using the old secret will cause authentication failures and may disrupt service access.

### Advanced Authentication Methods (Coming Soon)

We're actively working on providing enhanced authentication options to improve security and flexibility for AI agents:

* **Private Key JWT Authentication**
  This method uses asymmetric cryptography, allowing agents to sign JSON Web Tokens (JWTs) with a private key that never leaves the agent environment. {{ product_name }} holds the corresponding public key to verify the signature. JWTs include claims such as agent identity and expiration to ensure authenticity.

  Requirements include RSA or ECDSA private keys and public key registration during agent setup. This approach eliminates shared secret risks, enables cryptographically strong identity proof, supports key rotation without downtime, and aligns with modern security standards.

* **Mutual TLS (mTLS) Authentication**
  Mutual TLS requires both the agent and {{ product_name }} server to present and verify X.509 certificates during the TLS handshake. This mutual verification creates a trusted, encrypted channel and prevents man-in-the-middle attacks.

  Agents authenticate by presenting client certificates issued by a trusted Certificate Authority (CA). The private key corresponding to the client certificate must be securely stored by the agent. This method is commonly used in high-security environments and supports certificate lifecycle management including renewal and revocation.

### Best Practices for Credential Management

To maintain robust security for your AI agents, adhere to the following guidelines:

* **Regular Rotation:** Automate credential rotation and ensure your agents can seamlessly update credentials without downtime.
* **Secure Storage:** Avoid hardcoding credentials or keys in source code. Use dedicated secrets management systems like HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault, and limit access strictly.
* **Use Environment Variables:** Inject credentials dynamically at runtime through environment variables or secure configuration files, keeping them out of source control.
* **Immediate Revocation:** Revoke credentials immediately upon suspected compromise and monitor usage logs for anomalies.
* **Audit and Monitoring:** Enable comprehensive logging of authentication events and review logs regularly to detect unauthorized activity early.
