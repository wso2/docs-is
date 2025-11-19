When building a custom self-service password recovery portal that uses the WSO2 Identity Server (WSO2 IS) Account Recovery APIs, implement strong security controls for flow initiation, handling one-time passwords (OTPs), and API protection.

This guide outlines recommended best practices for designing and deploying such a solution.

1. Add reCAPTCHA to the flow initiation step

   - Before sending an OTP or recovery code, require reCAPTCHA verification to block bots and brute-force attempts.
   - Apply reCAPTCHA to:
     - Forgot Password initiation
     - Resend recovery code endpoints
   - reCAPTCHA protects against automated SMS/email flooding and username enumeration.

2. Prevent username enumeration

   - Ensure API responses do not reveal whether an account exists.
   - Use a generic message such as: "If the provided username is valid, an OTP will be sent to the registered email address or phone number."
   - Return the same response for valid and invalid usernames to avoid revealing account existence.

3. Enforce a short OTP or recovery link lifespan

   - Set a short validity period for OTPs or recovery links (recommended: 1 minute) to reduce risk from interception.
   - A short expiration window significantly reduces exposure.

4. Increase OTP complexity

   - Use stronger OTPs to resist brute-force and guessing attacks:
     - Use 6–8 digit numeric OTPs or alphanumeric OTPs.
   - Stronger OTPs increase the difficulty of automated attacks.

5. Implement rate limiting for OTP submission

   - Rate limit OTP verification endpoints by IP address.
   - Consider progressive delays or temporary lockouts after repeated failures.

6. Notify users of password recovery attempts

   - Notify users when a password recovery flow completes successfully.
   - Include in the notification:
     - A warning if the user did not initiate the request
     - Recommended steps to secure their account
   -  Notifications help users detect unauthorized activity early.
