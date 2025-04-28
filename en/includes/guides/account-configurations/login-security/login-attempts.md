# Configure login-attempts security

You can protect user accounts in {{ product_name }} from brute-force attacks by locking the account after consecutive failed login attempts.

You can configure the number of consecutive failed login attempts that should be allowed for users in an organization. When a user exceeds this number of attempts, the account is automatically locked and the user is informed via email. The account will be activated automatically after the specified lock duration.

## Enable login attempts security

This setting is disabled by default. To enable login attempts security,

1. On the {{ product_name }} Console, go to **Login  Registration**.

2. Click on **Login Attempts** under **Login Security** section.

3. Switch to **Enabled** to enable this configuration.  

    ![Enable login attempts security]({{base_path}}/assets/img/guides/organization/account-security/login-attempts-security/enable-login-attempts-security.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Configure the settings below if you want to change how login attempts security works by default.

    ![View account security options]({{base_path}}/assets/img/guides/account-configurations/login-attempts.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
       <tbody>
          <tr>
               <td><b>Number of consecutive failed login attempts</b></td>
               <td>Specifies the number of consecutive failed login attempts allowed before the account is locked. <br>
               If you enter 5 as the value, the user's account is locked when five login attempts fail consecutively.</td>
          </tr>
          <tr>
             <td><b>Account lock duration</b></td>
             <td>Specifies the duration of the initial account lock. The account is automatically unlocked after this time period. <br>
             If you enter 5 minutes as the value, the user's account is locked for 5 minutes starting from the last login attempt. The user can log in again after 5 minutes.</td>
        </tr>
        <tr>
            <td><b>Account lock duration increment factor</b></td>
            <td>Specifies the factor by which the account lock duration increases after each subsequent lock following the initial one.</td>
       </tr>
       <tr>
            <td><b>Notify user when lock time is increased</b></td>
            <td>Send an email notification to the user when the lock time increases due to continuous failed login attempts.</td>
       </tr>

       </tbody>
    </table>

5. Click **Update** once you configure the required settings.

## How it works

Let's look at how the login attempt configurations work with an example. Imagine a scenario where an admin has configured the settings below:

- Number of consecutive failed login attempts: 5
- Account lock duration: 5 min
- Account lock duration increment factor: 2

Based on the above settings, the following happens when a user tries to log in with an incorrect password.

1. User tries to log in with an incorrect password for **5 consecutive attempts**.
2. User account will be **locked** for **5 minutes**.
3. After **5 minutes**, the account will be unlocked.

   - If the user enters the correct password, the user can successfully log in.
   - If the user tries enters an incorrect password for another **5 consecutive attempts**, the account lock period will be incremented by **2 times** the previous lock duration i.e. the account will be locked for 5 x (2 ^ 1)= 10 minutes.
   - If the user attempts to enter an incorrect password for another **5 consecutive attempts**, after the wait time (10min), the account will be locked again for 5 * (2 ^ 2)= 20 minutes.

``` 
Time for account to unlock = Account lock duration * (Account lock duration increment factor ^ Account lock count excluding the initial occurrence)
```

{% if product_name == "WSO2 Identity Server" %}

!!! Info
    - On the {{product_name}} login pages, a generic error message is displayed by default to end-users in the event of login failures. To show more specific error messages on the login page, the following properties can be configured in the `deployment.toml` file, which is located in the `<IS_HOME>/repository/conf` directory.

    Basic authenticator configurations:

    ```toml
        [authentication.authenticator.basic.parameters]
        showAuthFailureReason = true
        showAuthFailureReasonOnLoginPage = true
    ```

    Email OTP authenticator configurations:

    ```toml
        [authentication.authenticator.email_otp.parameters]
        showAuthFailureReason = true
        showAuthFailureReasonOnLoginPage = true
    ```

    TOTP authenticator configurations:

    ```toml
        [authentication.authenticator.totp.parameters]
        showAuthFailureReason = true
        showAuthFailureReasonOnLoginPage = true
    ```
{% endif %}