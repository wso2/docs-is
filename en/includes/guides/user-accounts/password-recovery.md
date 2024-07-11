# Configure password recovery

{{ product_name }} provides support for self-service password recovery from the login page. Once initiated, the user will receive a password reset link via email. This guide walks you through setting up password recovery for users to facilitate resetting lost or forgotten passwords.

To configure password recovery:

1. On the {{product_name}} Console, go to **Login & Registration** > **Account Recovery** > **Password Recovery**.

2. Select one or both of the following recovery options:

    - Email Link
    - SMS OTP

    ![Password Recovery Configuration]({{base_path}}/assets/img/guides/organization/account-recovery/password-recovery/configure-password-recovery.png){: width="700" style="display: block; margin: 0;"}

3. Configure the settings for the selected option/s.

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

4. Configure character constraints for OTP code generation:

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

5. Configure limitations for recovery attempts:

    <table>
        <tr>
            <td><b>Max failed attempts count</b></td>
            <td>Maximum number of times a user may enter an incorrect OTP.</td>
        </tr>
        <tr>
            <td><b>Maximum resend attempts count</b></td>
            <td>Maximum number of times a user may request to resend the OTP.</td>
        </tr>
    </table>

6. Click **Update** to save your changes.
