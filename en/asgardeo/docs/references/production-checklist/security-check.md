# Security Checklist
Use the following list to ensure your organizations are secure in a production environment.

## Authentication
To ensure the authentication is properly configured in your organizations:

- (Recommended) Configure strong authentication for Asgardeo administrator users. [Learn more]({{base_path}}/guides/your-asgardeo/asgardeo-self-service/#enroll-totp-for-asgardeo-users)
- Configure strong authentication for your business applications based on the application's sensitivity. [Learn more]({{base_path}}/guides/authentication/mfa/)

## Account Security
To ensure the accounts are securely configured in your organizations:

- Enable account lock to prevent brute force attacks.
- When updating email templates, follow best practices related to `HTML`.
- Disable preview features provided by asgardeo.

## Application and connection security
To ensure the applications and connections are securely configured in your organizations:

- Securely store secrets and allow only authorized users to access secrets. The secrets that should be secured are:

    - OIDC client secret
    - IDPs-related secrets
    - User store agent secret

- Manage and maintain certificates (IDPs and Applications)

    - Key length
    - Expiry time
    - Revocation
    - Renew
    - Different certificates for different use cases

- Configure the expiry time of the following based on business requirements

    - Access token
    - Refresh token
    - ID token
    - Email OTP

- When requesting access tokens, use the specified scopes required for the specific task. Use the principle of least privilege.