{{ product_name }} supports multiple authentication methods tailored for AI agents, allowing you to choose the best fit based on your security posture, operational needs, and integration preferences.

## Agent ID and Secret (Current)

This is the default and most widely used authentication method for AI agents on {{ product_name }}. It leverages a simple yet effective credential pair consisting of an **Agent ID** and a **secret**.

### How It Works

* Each agent is assigned a unique **Agent ID**.
* The secret acts as a password-like token, which the agent uses alongside its ID to authenticate.

### Obtaining Credentials

* Credentials are generated when registering the agent.
* You can view and manage these credentials through the {{ product_name }} Console.

### Regenerating Agent Secret

If you suspect that your secret is compromised or want to update it for security reasons,

1. Log into the {{ product_name }} Console.
2. Navigate to **Agents** from the main menu.
3. Select the agent whose credentials you want to regenerate.
4. Go to the **Credentials** tab.
5. Click **Regenerate** under **Agent Secret**.

    !!! warning
        After regenerating the agent secret, make sure to update all services that are using the previous credentials. Using the old secret will cause authentication failures and may disrupt service access.

## Private Key JWT (Coming Soon)

    !!! note
        Private Key JWT authentication for AI agents is currently under development and will be available soon.

Private Key JWT authentication offers a more secure and modern approach by using asymmetric cryptography. Instead of sharing a secret, agents authenticate by signing a JSON Web Token (JWT) with their private key.

### How It Works

* Agent holds a private key used to sign JWT tokens.
* {{ product_name }} holds the corresponding public key to verify the signature.
* Tokens include claims such as agent identity and expiration, ensuring authenticity.

### Key Requirements

* **Key Type:** RSA or ECDSA private key.
* **Key Registration:** The public key must be registered in {{ product_name }} during agent setup.
* **JWT Format:** Tokens must conform to JWT standards and be signed with the private key.

### Benefits

* Eliminates shared secret risks — private key never leaves the agent.
* Enables cryptographically strong proof of identity.
* Supports seamless **key rotation** without downtime.
* Improves compliance with security standards requiring asymmetric authentication.

## Mutual TLS (mTLS) (Coming Soon)

    !!! note
        Mutual TLS (mTLS) authentication for AI agents is currently under development and will be available soon.

Mutual TLS (mTLS) authentication enhances security by requiring both the agent and {{ product_name }} server to present and verify digital certificates during the TLS handshake. This mutual verification establishes a trusted, encrypted connection.

### How It Works

* Both client (agent) and server authenticate each other using X.509 certificates.
* Agents prove identity by presenting a client certificate signed by a trusted Certificate Authority (CA).
* {{ product_name }} validates the certificate before allowing the connection.

### Requirements

* **Client Certificate:** Issued by a trusted CA recognized by {{ product_name }}.
* **Private Key:** Corresponds to the client certificate and is securely stored on the agent side.
* **TLS Client Authentication:** Enabled on the communication channel to enforce certificate verification.

### Benefits

* Strong, certificate-based cryptographic authentication.
* Prevents man-in-the-middle attacks by ensuring both parties are verified.
* Widely adopted in high-security environments, including banking and healthcare.
* Supports certificate lifecycle management, including renewal and revocation.

## Credential Management Best Practices

To maintain a strong security posture for your AI agents, follow these best practices when managing credentials.

* **Regular Rotation:**

  * Schedule automated credential rotations to minimize exposure.
  * Ensure your agent applications support seamless updates to credentials.

* **Secure Storage:**

  * Never hardcode credentials or keys in source code repositories.
  * Use dedicated secrets management solutions such as HashiCorp Vault, AWS Secrets Manager, or Azure Key Vault.
  * Restrict access to credentials to only authorized services or personnel.

* **Use Environment Variables:**

  * Load secrets dynamically at runtime using environment variables or configuration files secured outside source control.

* **Immediate Revocation:**

  * Revoke credentials immediately if you suspect compromise.
  * Monitor usage logs to detect anomalous access patterns.

* **Audit and Monitoring:**

  * Enable audit logging for authentication events to track access and troubleshoot incidents.
  * Regularly review logs for unauthorized or suspicious activities.
