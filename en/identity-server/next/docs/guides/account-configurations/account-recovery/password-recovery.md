# Password recovery

Enable self-service password recovery for users, providing a secure method to reset passwords on the login page of {{product_name}}.

## Configuration instructions

To configure password recovery, follow these steps:

1. In the {{product_name}} Console, go to **Login & Registration** > **Account Recovery** > **Password Recovery**.
2. Toggle the switch to enable passwords recovery option to allow users to recover their passwords.
3. Select one or both of the recovery options: **Email Link** or **SMS OTP**, to enable them for your account.
  ![Password Recovery Configuration]({{base_path}}/assets/img/guides/organization/account-recovery/password-recovery/configure-password-recovery.png){: width="800" style="display: block; margin: 0;"}
4. Configure the below settings if you want to change the password recovery configurations.
    <table>
        <tbody>
            <tr>
                <td><h3>Email Link</h3></td>
                <td></td>
            </tr>
            <tr>
                <td><b>Notify on successful recovery</b></td>
                <td>Specifies whether to notify the user via an email when password recovery is successful.</td>
            </tr>
            <tr>
                <td><b>Recovery link expiry time</b></td>
                <td>Specifies password recovery link expiry time in minutes. If you enter 60 min, the password recovery email notification will expire after 60 min.</td>
            </tr>
        </tbody>
    </table>
    <table>
        <tbody>
            <tr>
                <td><h3>SMS OTP</h3></td>
                <td></td>
            </tr>
            <tr>
                <td><b>Password recovery OTP expiry time</b></td>
                <td>Specifies the duration (in minutes) after which the OTP code sent through SMS will expire.</td>
            </tr>
        </tbody>
    </table>
5. Configure the below settings if you want to change the password recovery OTP code configurations.
  !!! info
    Note that including a character set does not guarantee that at least one of those characters will be included in each OTP code.
  ![Password Recovery Configuration]({{base_path}}/assets/img/guides/organization/account-recovery/password-recovery/configure-password-recovery-otp-code.png){: width="800" style="display: block; margin: 0;"}
  <table>
    <tbody>
      <tr>
        <td><b>Password recovery OTP expiry time</b></td>
        <td>Specifies the duration (in minutes) after which the OTP code sent through SMS will expire.</td>
      </tr>
    </tbody>
  </table>
6. Set the following settings to configure the limitations for password recovery attempts.
  ![Password Recovery Attempts Limitations Configuration]({{base_path}}/assets/img/guides/organization/account-recovery/password-recovery/configure-password-recovery-attempts-limitation.png){: width="800" style="display: block; margin: 0;"}
7. Click **Update** once you configure the required settings.

<a :href="$withBase('/guides/user-self-service/customer-password-recovery/')">Try self-service password recovery</a>.
