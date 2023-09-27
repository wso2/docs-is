# Configure password validation

User accounts in {{ product_name }} can be secured from password attacks by defining password validation rules.

When a user configures a password that does not abide by the validation rules, they will be requested to re-enter a password.

To configure password validation:

1. On the {{ product_name }} Console, go to **Organizational Settings** > **Account Security**.

     The **Password Validation** section indicates whether or not it is already enabled.

2. Click **Configure** to open the **Password Validation** page.

     ![Configure password validation]({{base_path}}/assets/img/guides/organization/account-security/password-validation/configure-password-validation.png){: width="500" style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

3. Enter values to update the following parameters according to the requirements of your password policies.

    <table>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>Password Expiration</td>
            <td>The number of days after which the password expires. If a user attempts to log in using an expired password, the user will be redirected to reset the password.</td>
        </tr>
        <tr>
            <td>Password History Count</td>
            <td><code>[Optional]</code> This field identifies the number of new unique passwords that must be set before an old password can be reused again. <br> <b> Example: </b> If you assign <code>3</code> as the password history count, the user cannot use the last three passwords they have used.</td>
        </tr>
        <tr>
            <td>Number of characters</td>
            <td>You can add the minimum and maximum length of the password users should use.</td>
        </tr>
        <tr>
            <td>Mandatory characters</td>
            <td>By default, a user password should contain at least one of the following characters.
                <ul>
                    <li>Numbers</li>
                    <li>Upper-case characters: </li>
                    <li>Lower-case characters</li>
                    <li>Special characters</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td>Number of unique characters</td>
            <td><code>[Optional]</code> This field identifies the number of unique (non-repeated) characters the password should contain.</td>
        </tr>
        <tr>
            <td>Number of repeated characters</td>
            <td><code>[Optional]</code>This field identifies the number of characters that can be repeated consecutively in a user password. <br> <b> Example: </b> If you assign <code>1</code> as the number of repeated characters, the password cannot contain any repeated characters consecutively. <br> The password <code>aa1@Znlq</code> is incorrect as it has the character <code>a</code> appearing consecutively.</td>
        </tr>
    </table>

4. Click **Update** to save your password validation rules.
