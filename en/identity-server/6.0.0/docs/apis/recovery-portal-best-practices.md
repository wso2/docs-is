When building a custom self-service password recovery portal using the WSO2 Identity Server Account Recovery APIs, you must implement strong security controls.
Secure the flow initiation to prevent unauthorized recovery attempts. Handle one-time passwords (OTP) with strict validation and expiration rules. Protect all Account Recovery portal APIs with rate-limiting mechanisms.
This guide outlines recommended best practices for designing and deploying such a solution.

1. Add reCAPTCHA to the flow initiation step

    - Before sending an OTP or recovery code, require reCAPTCHA verification to block bots and brute-force attempts.
    - Apply reCAPTCHA to:
        - Forgot Password initiation
        - Resend recovery code endpoints
    - reCAPTCHA protects against automated SMS/email flooding and username enumeration.

2. Prevent username enumeration

    - Ensure API responses didn't reveal whether an account exists.
    - Use a generic message such as: "If the provided username is valid, an OTP will be sent to the registered email address or phone number."
    - Return the same response for valid and invalid usernames to avoid revealing account existence.

3. Enforce a short OTP or recovery link lifespan

    - Set a short validity period for OTP or recovery link (recommended: 1 minute) to reduce risk from interception.
    - A short expiration window significantly reduces exposure.

4. Increase OTP complexity

    - Use stronger OTP to resist brute-force and guessing attacks:
        - Use 6–8 digit numeric OTP or alphanumeric OTP.
    - Stronger OTPs increase the difficulty of automated attacks.

5. Implement rate limiting for OTP submission

    - Rate limit OTP verification endpoints by IP address.
    - Consider progressive delays or temporary lockouts after repeated failures.

6. Notify users of password recovery attempts

    - Notify users when a password recovery flow completes successfully.
    - Include in the notification:
        - A warning if the user didn't initiate the request
        - Recommended steps to secure their account
    -  Notifications help users detect unauthorized activity early.
