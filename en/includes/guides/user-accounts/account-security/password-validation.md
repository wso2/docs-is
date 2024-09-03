# Password validation

Customize password validation rules to enhance the security of user accounts in {{product_name}}.

## Configuration instructions

To configure password validation rules, follow these steps:

1. On the {{product_name}} Console, navigate to **Login & Registration** > **Login Security** > **Password Validation**.
2. On the **Password Validation** page, you will find three sections:
    - [**Password Expiration**](#configuring-rule-based-password-expiration): Define the number of days after which a 
    password must be changed.
    - [**Password History Count**](#password-history-count): Specify the number of unique new passwords a user must use 
    before an old password can be reused.
    - [**Password Input Validation**](#password-input-validation): Set requirements for password complexity, including 
    length and character types.
3. Click **Update** to save the changes.

### Configuring Rule-Based Password Expiration

Rule-based password expiration allows administrators to define password expiration policies that apply to specific 
groups or roles, offering more granular control over password security.

![Rule-Based Password Expiration]({{base_path}}/assets/img/guides/organization/account-security/password-validation/password-expiration.png){: width="800" style="display: block; margin: 0;"}

When multiple rules are defined, they are evaluated based on their priority. The rules are checked one by one according 
to their priority order, and the first rule that applies to a user will determine the password expiration policy for 
that user.

Within each rule, you can specify multiple roles or multiple groups. The rule will apply to users who belong to all 
of the specified roles or all of the specified groups.

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Attribute</td>
        <td>The user attribute (e.g., role, group) that the rule is based on.</td>
    </tr>
    <tr>
        <td>Values</td>
        <td>The specific values of the attribute that the rule applies to (e.g., specific roles or groups). If the rule 
        includes multiple roles or groups, a user must belong to all of them for the rule to apply.</td>
    </tr>
    <tr>
        <td>Operator</td>
        <td>
            <ul>
                <li><b>Apply:</b> Password expiry will be enforced for users who meet the rule criteria.</li>
                <li><b>Skip:</b> Password expiry will not be enforced for users who meet the rule criteria.</li>
            </ul>
        </td>
    </tr>
    <tr>
        <td>Expiration Days</td>
        <td>The number of days after which the password will expire for users matching the rule criteria.</td>
    </tr>
</table>

### Password History Count

The **Password History Count** feature allows you to specify the number of unique new passwords a user must use before 
an old password can be reused. This enhances account security by preventing the reuse of old passwords.

![Password History Count]({{base_path}}/assets/img/guides/organization/account-security/password-validation/password-history-count.png){: width="800" style="display: block; margin: 0;"}

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
    <tr>
        <td>Password History Count</td>
        <td><code>[Optional]</code> This field identifies the number of new unique passwords that must be set before an old password can be reused again. <br> <b> Example: </b> If you assign <code>3</code> as the password history count, the user cannot use the last three passwords they have used.</td>
    </tr>
</table>

### Password Input Validation

The **Password Input Validation** feature enables you to set requirements for password complexity, such as minimum 
length and required character types. This feature strengthens user account security by enforcing robust password 
policies.

![Password Input Validation]({{base_path}}/assets/img/guides/organization/account-security/password-validation/password-input-validation.png){: width="800" style="display: block; margin: 0;"}

<table>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
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
                <li>Upper-case characters </li>
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
