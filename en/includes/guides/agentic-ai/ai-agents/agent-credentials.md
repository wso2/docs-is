{{ product_name }} supports multiple authentication methods for AI agents, providing flexibility based on security requirements and implementation preferences.

## Agent ID and Secret (Current)

The default authentication method uses an Agent ID and secret pair.

### Obtaining Credentials

You will obtain the agent credentials at the time of registering the agent. In case you lost it or need a new secret, you can regenerate it by following the steps.

1. On the {{ product_name }} Console, go to **Agents**.
2. Click on the agent you want to update.
3. Go to the Credentials tab.
4. Under **Agent Secret**, click **Regenerate**.

## Private Key JWT (Coming Soon)

Private Key JWT authentication enables AI agents to authenticate with {{ product_name }} using a JSON Web Token (JWT) signed with a private key. This method eliminates the need for shared secrets, enhancing security by relying on asymmetric cryptography.

### Key Requirements:

- RSA or ECDSA private key
- Corresponding public key registered with {{ product_name }}
- JWT signed with the private key

### Benefits:

- No shared secrets
- Cryptographically strong authentication
- Support for key rotation

## Mutual TLS (mTLS) (Coming Soon)

mTLS provides an additional layer of security by requiring both the agent and server to authenticate each other using digital certificates. This ensures that only trusted agents can connect to your services.

### Requirements:

- Client certificate issued by a trusted CA
- Private key corresponding to the client certificate
- TLS client authentication during the handshake

### Benefits:

- Certificate-based authentication
- Strong cryptographic identity
- Industry-standard security

## Credential Management Best Practices

- Rotate credentials regularly - Set up automated credential rotation
- Use environment variables - Never hardcode credentials in source code
- Implement secure storage - Use secure vaults or key management systems
- Revoke compromised credentials - Immediately revoke and replace compromised credentials
