# Password recovery

{% if product_name == "WSO2 Identity Server" and is_version == "7.0.0" %}

You may enable self-service password recovery for users so that they may reset their forgotten passwords right from the login page. Once enabled, users can click the `Forgot password?` option and receive a password reset link to their registered emails.

To do so,

1. On the {{product_name}} Console, go to **Login & Registration**.
2. Under **Account Recovery**, click on **Password Recovery**.
3. Toggle the switch on to enable password recovery.
4. Configure the following options:

    <table>
    <tr>
      <td><b>Notify on Successful Recovery</b></td>
      <td>When checked, the user will be notified via email after a successful password recovery.</td>
    </tr>
    <tr>
      <td><b>Recovery Link Expiry Time</b></td>
      <td>Time in minutes until the password recovery link expires.</td>
    </tr>
    </table>

5. Click **Update** to save the changes.

![Password Recovery Configuration]({{base_path}}/assets/img/guides/account-configurations/password-recovery.png){: width="800" style="display: block; margin: 0;"}

{% else %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.1.0" ) %}

You may enable self-service password recovery for users so that they may reset their forgotten passwords right from the login page. Users can click the `Forgot password?` option and choose to recieve either a Link or an OTP via Email or SMS to reset the password.

To configure password recovery options,

1. On the {{product_name}} Console, go to **Login & Registration**.
2. Under **Account Recovery**, click on **Password Recovery**.
4. Select both **Email** and **SMS OTP** or one of the options to enable them for your organization.
  
    ![Password Recovery Configuration]({{base_path}}/assets/img/guides/organization/account-recovery/password-recovery/configure-password-recovery.png){: width="800" style="display: block; margin: 0;"}

5. Configure the corresponding settings.
    <table>
        <tbody>
            <tr>
                <td><h3>Email Link/OTP</h3></td>
                <td></td>
            </tr>
            <tr>
                <td><b>Notify on successful recovery</b></td>
                <td>Specifies whether to notify the user via an email when password recovery is successful.</td>
            </tr>
            <tr>
                <td><b>Recovery link expiry time</b></td>
                <td>Specifies the duration (in minutes) after which the email link/OTP will expire.</td>
            </tr>
        </tbody>
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

{% elif product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version == "7.1.0" ) %}

You may enable self-service password recovery for users so that they may reset their forgotten passwords right from the login page. Users can click the `Forgot password?` option and either receive an email or a mobile OTP to reset the password.

To do so,

1. On the {{product_name}} Console, go to **Login & Registration**.
2. Under **Account Recovery**, click on **Password Recovery**.
3. Toggle the switch to enable passwords recovery option to allow users to recover their passwords.
4. Select both **Email Link** and **SMS OTP** or one of the options to enable them for your organization.
  
    ![Password Recovery Configuration]({{base_path}}/assets/img/guides/organization/account-recovery/password-recovery/configure-password-recovery.png){: width="800" style="display: block; margin: 0;"}

5. Configure the corresponding settings.
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
                <td>Specifies the duration (in minutes) after which the email link will expire.</td>
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
{% endif %}

6. Configure the following settings if you wish to customize the OTP pattern.
    
    <table>
        <tr>
            <td><b>Include upper case letters</b></td>
            <td>If nothing else is selected, the code will have only upper case letters or else a combination of upper case letters and any other selected character types.</td>
        </tr>
        <tr>
            <td><b>Include lower case letters</b></td>
            <td>If nothing else is selected, the code will have only lower case letters or else a combination of lower case letters and any other selected character types.</td>
        </tr>
        <tr>
            <td><b>Include numeric characters</b></td>
            <td>If nothing else is selected, the code will have only digits or else a combination of digits and any other selected character types.</td>
        </tr>
        <tr>
            <td><b>Password recovery OTP code length</b></td>
            <td>Specify the length of the code</td>
        </tr>
    </table>

    !!! info
    
        Including a character set does not guarantee that at least one of those characters will be included in each OTP code.

7. Set the following settings to configure the limitations for password recovery attempts.

    <table>
        <tbody>
            <tr>
                <td><b>Max failed attempts count</b></td>
                <td>Specifies the maximum number of incorrect entries allowed for a password recovery method.</td>
            </tr>
            <tr>
                <td><b>Max resend attempts count</b></td>
                <td>Specifies the maximum number of times a user can request to resend the OTP or recovery link.</td>
            </tr>
        </tbody>
    </table>

8. Click **Update** once you configure the required settings.

{% endif %}