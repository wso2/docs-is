# Add MFA with Email OTP

Email OTP is a One-Time Password (OTP) sent to the user's verified email address, which the user must submit during login (as an additional authentication step). This password is typically valid for a very short period.

During Email OTP authentication, the user is required to access the verified email account within a short time span to get the OTP. This prevents unauthorized users from accessing the OTP and thereby adds an extra layer of security to the authentication process.

Follow the instructions given below to configure Multi-Factor Authentication (MFA) using Email OTP in {{ product_name }}.

## Prerequisites

- [Register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- [Update users' profiles]({{base_path}}/guides/users/manage-users/#update-the-profile) with email addresses.

{% if product_name == 'Asgardeo' %}
{% elif (product_name == "WSO2 Identity Server" and is_version > "7.1.0") %}
- [Configure the email provider]({{base_path}}/guides/notification-channels/configure-email-provider/) in {{product_name}}.
{% else %}
- [Configure the email sending module]({{base_path}}/deploy/configure/email-sending-module/) in {{product_name}}.
{% endif %}

!!! note "Info"
    You can use Email OTP for multi-factor authentication only if a previous authentication step is configured with **username and password** or another factor that can validate user credentials.

## Set up Email OTP
{{ product_name }} has some default settings for email OTP, which are sufficient for most cases. If required, you can change the default settings, as explained below.

To update the default Email OTP settings:

1. On the {{ product_name }} Console, go to **Connections** and select **Email OTP**.
2. Update the following parameters in the **Settings** tab:

    ![Setup email OTP in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/emailotp/setup-email-otp.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% if product_name == "WSO2 Identity Server" and (is_version == "7.0.0" or is_version == "7.1.0" or is_version == "7.2.0") %}
    <table>
      <tr>
        <th>Field</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Email OTP expiry time</td>
        <td>Specifies the expiry time of the OTP. The generated OTP will not be valid after this expiry time.</td>
      </tr>
      <tr>
        <td>Use alphanumeric characters for OTP</td>
        <td>
            Specifies whether to use alphanumeric characters in the OTP. If not selected, the generated OTP contains only digits (0-9).
            <br><br>
            <b>Note:</b> The UI options for <b>Include uppercase characters in OTP</b> and <b>Include lowercase characters in OTP</b> have been removed. To configure specific character types (uppercase/lowercase), use the <code>deployment.toml</code> file or the <a href="{{base_path}}/apis/governance-connectors/">Identity Governance REST API</a>. See the <a href="#configure-advanced-email-otp-settings">Configure advanced email OTP settings</a> section below for details.
        </td>
      </tr>
      <tr>
        <td>Email OTP length</td>
        <td>Specifies the number of characters allowed in the OTP.</td>
      </tr>
    </table>
    {% else %}
    <table>
      <tr>
        <th>Field</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Email OTP expiry time</td>
        <td>Specifies the expiry time of the OTP. The generated OTP will not be valid after this expiry time.</td>
      </tr>
      <tr>
        <td>Use alphanumeric characters for OTP</td>
        <td>
            Specifies whether to use alphanumeric characters in the OTP. If not selected, the generated OTP contains only digits (0-9).
        </td>
      </tr>
      <tr>
        <td>Email OTP length</td>
        <td>Specifies the number of characters allowed in the OTP.</td>
      </tr>
      <tr>
        <td>Allowed OTP resend attempt count</td>
        <td>Specifies the number of allowed OTP resend attempts.</td>
      </tr>
      <tr>
        <td>Resend block duration</td>
        <td>Specifies the time duration to block OTP resend requests after reaching the maximum allowed resend attempts.</td>
      </tr>
    </table>
    {% endif %}
3. Once you update the Email OTP settings, click **Update**.

## Enable Email OTP for an app

{% include "../../../guides/fragments/add-login/mfa/add-emailotp-login.md" %}

## How it works

When Email OTP is enabled in the login flow of your application, the application user will be prompted with the email OTP authentication step once the first authentication step is completed. Given below are the high-level steps that follow:

1. {{ product_name }} sends the OTP to the user's verified email address.
2. {{ product_name }} prompts the user to enter the OTP code.
  
    ![Authenticate with email OTP in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/emailotp/enter-email-otp.png){: width="300" style="border: 0.3px solid lightgrey;"}

3. If required, the user can request {{ product_name }} to resend the OTP. The new OTP invalidates the previously sent OTP.
4. The user enters the OTP and clicks **Continue**.
5. If the authentication is successful, the user can access the application.

## Configure advanced email OTP settings

The UI options for **Include uppercase characters in OTP** and **Include lowercase characters in OTP** have been removed. To configure the character composition of email OTP codes with specific uppercase/lowercase requirements, use one of the following methods:

### Configure via deployment.toml

Add the following configuration parameters to the `<IS_HOME>/repository/conf/deployment.toml` file under the `[authentication.authenticator.email_otp.parameters]` section.

**Use numeric characters only**

To generate OTP codes with only numeric characters (default behavior):

```toml
[authentication.authenticator.email_otp.parameters]
UseNumericChars = true
```

**Use alphanumeric characters with uppercase and lowercase**

To generate OTP codes with alphanumeric characters including both uppercase and lowercase letters:

```toml
[authentication.authenticator.email_otp.parameters]
UseNumericChars = false
UseUppercaseCharacters = true
UseLowercaseCharacters = true
```

**Use alphanumeric characters with only uppercase**

To generate OTP codes with numbers and uppercase letters only:

```toml
[authentication.authenticator.email_otp.parameters]
UseNumericChars = false
UseUppercaseCharacters = true
UseLowercaseCharacters = false
```

**Use alphanumeric characters with only lowercase**

To generate OTP codes with numbers and lowercase letters only:

```toml
[authentication.authenticator.email_otp.parameters]
UseNumericChars = false
UseUppercaseCharacters = false
UseLowercaseCharacters = true
```

### Configure via Identity Governance REST API

You can also configure these settings programmatically using the [Identity Governance REST API]({{base_path}}/apis/governance-connectors/). Use the API to retrieve and update the email OTP authenticator connector properties.

**Retrieve current configuration**

Send a GET request to retrieve the current email OTP configuration:

```bash
curl -X GET "https://<IS_HOST>:<PORT>/api/identity/governance/v1/connectors" \
-H "Authorization: Bearer <access_token>"
```

**Update configuration**

Send a PATCH request to update the email OTP configuration with your desired character composition settings.