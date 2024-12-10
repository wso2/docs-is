# Configure login-attempts security

You can protect user accounts in {{ product_name }} from password brute-force attacks by locking the account on consecutive failed login attempts. By default, this setting is disabled.

You can configure the number of consecutive failed login attempts that should be allowed for users in an organization. When a user exceeds this number of attempts, the account is automatically locked and the user is informed via email. The account will be activated automatically after the specified lock duration.

## Enable login attempts security

To configure login attempts security:

1. On the {{ product_name }} Console, go to **Login  Registration**.

2. Click on **Login Attempts** under **Login Security** section.

3. Switch to **Enabled** to enable this configuration.  

    ![Enable login attempts security]({{base_path}}/assets/img/guides/organization/account-security/login-attempts-security/enable-login-attempts-security.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

4. Configure the settings below if you want to change how login attempts security works by default.

    ![View account security options]({{base_path}}/assets/img/guides/organization/account-security/login-attempts-security/configure-login-attempts-security.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
       <tbody>
          <tr>
               <td><b>Number of consecutive failed login attempts</b></td>
               <td>Specifies the number of consecutive failed login attempts allowed before the account is locked. <br>
               If you enter 5 as the value, the user's account is locked when five login attempts fail consecutively.</td>
          </tr>
          <tr>
             <td><b>Account lock duration</b></td>
             <td>Specifies the initial duration that the account will be locked for. The account is automatically unlocked after this time period. <br>
             If you enter 5 minutes as the value, the user's account is locked for 5 minutes starting from the last login attempt. The user can log in again after 5 minutes.</td>
        </tr>
        <tr>
            <td><b>Account lock duration increment factor</b></td>
            <td>Specifies the factor by which the account lock duration should be incremented on further failed login attempts after the account is locked.</td>
       </tr>
       </tbody>
    </table>

5. Click **Update** once you configure the required settings.

### How it works

Admin has configured the below settings:

- Number of consecutive failed login attempts: 5
- Account lock duration: 5 min
- Account lock duration increment factor: 2

Based on the above settings, let's see how account lock happens in {{ product_name }} when a user tries to log in with an incorrect password.

1. User tries to log in with an incorrect password in **5 consecutive attempts** (Number of consecutive failed login attempts).
2. User account will be **locked** for **5 minutes** (Account lock duration).
3. After **5 minutes**, the account will be unlocked.

   - If the user enters the correct password, the user can successfully log in.
   - If the user tries an incorrect password, the account will be locked for a duration of period incremented by **2 times**(Account lock duration increment factor) the previous lock duration.

       - That is, the account will be locked for 2 x (5 ^ 1)= 10 minutes.
       - If the user attempts to log in with an incorrect password again after the wait time(10min) has elapsed, and the account is unlocked, the account will be locked for 2 * (5 ^ 2)= 50 minutes.

``` 
Account unlock timeout = Account lock duration * (Account lock duration increment factor ^ failed login attempts)
```

## Disable login attempts security

To disable login attempts security:

1. On the {{ product_name }} Console, go to **Login  Registration**.
2. Under **Login Security**, click on **Login Attempts**.
3. Switch to **Disabled** to disable this security.

    ![Disable login attempts security]({{base_path}}/assets/img/guides/organization/account-security/login-attempts-security/disable-login-attempts-security.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
