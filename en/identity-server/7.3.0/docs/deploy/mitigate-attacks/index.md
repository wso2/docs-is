# Mitigate attacks

Securing your applications against common web and API attacks plays a crucial role in protecting both your users and your infrastructure.

This section helps you mitigate common security threats and apply best practices to build more secure applications with {{product_name}}.

## Mitigate security threats

The following guides explain how to prevent common security threats.

- [Cross site request forgery attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-cross-site-request-forgery-attacks/) - Learn how to prevent malicious sites from performing unauthorized actions on behalf of authenticated users by validating requests and enforcing proper token mechanisms.

- [Authorization code interception attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-authorization-code-interception-attacks/) - Learn how to secure OAuth 2.0 authorization codes in transit to prevent attackers from intercepting and reusing them.

- [Brute force attacks]({{base_path}}/deploy/mitigate-attacks/mitigate-brute-force-attacks/) - Explore mechanisms to detect and block repeated failed login attempts that could compromise user accounts.

- [Replay attacks]({{base_path}}/deploy/mitigate-attacks/timestamp-in-ws-security-to-mitigate-replay-attacks/) - Understand how to use timestamp validation and WS-Security configurations to stop attackers from reusing valid requests.

## Security best practices

The following guides explain security best practices recommended for your applications.

- [SameSite attribute support]({{base_path}}/deploy/samesite-attribute-support/) - Configure cookies with the SameSite attribute to prevent cross-site request forgery and unauthorized cookie sharing.

- [Prevent browser caching]({{base_path}}/deploy/security/prevent-browser-caching/) - Set response headers to prevent browsers from caching sensitive pages and exposing confidential information.
