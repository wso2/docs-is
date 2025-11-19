When building a custom self-service password recovery portal using the WSO2 Identity Server (WSO2 IS) Account Recovery APIs, it is important to implement strong security controls around flow initiation, OTP handling and API protection.
This guide outlines the recommended best practices to follow when designing and deploying such a solution.

1. Add reCAPTCHA to the Flow Initiation Step

   - Before triggering OTP dispatch or recovery codes, apply CAPTCHA verification to prevent brute-force and bot-driven attacks.
   - Apply CAPTCHA to both:
     - Forgot Password initiation
     - Resend recovery code endpoints
   - This protects the system from automated SMS/email flooding and username enumeration attempts.

2. Prevent Username Enumeration

   - Ensure API responses do not disclose whether an account exists.
   - Use generic messages such as:
     - “If the provided username is valid, an OTP will be sent to the registered email or phone number.”
   - Avoid returning different error messages for invalid and valid usernames to prevent attackers from mapping valid accounts.

3. Enforce a Short OTP/recovery link Lifespan

   - Set a short OTP or recovery link validity period (eg: 1 minutes recommended) to minimize risk from OTP/recovery link interception attacks.
   - A short expiration window significantly reduces exposure risk.

4. Increase OTP Complexity

   - Enhance OTP strength to protect against brute-force and guess-based attacks:
     - Use 6–8 digit numeric OTPs or alphanumeric OTPs.
   - Stronger OTPs increase the difficulty for automated attacks.

5. Implement Rate Limiting for OTP Submission

   - Add rate limiting to the OTP verification API endpoint by restricting the number of OTP submissions per IP.
   - Rate limiting prevents brute-force attempts on OTP validation.

6. Notify Users of Password Recovery Attempts

   - Always notify users when a password recovery flow is successfully completed.
   - Notifications should include:
     - A warning if the user did not initiate the request or reset the password.
     - Recommended security steps to secure their account.
   - This helps users detect unauthorized activity early.

