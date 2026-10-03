# Add Email OTP login

Email OTP is a form of passwordless authentication. It allows users to log in by providing a one-time passcode sent to their email instead of entering a password.

## Prerequisites
- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.

- You need to have a user account in {{ product_name }}. If you don't already have one, [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) in {{ product_name }}.

{{ admin_login_note}}

{{ configure_email_sender }}

## Enable Email OTP login for an app

{% include "../../../guides/fragments/add-login/passwordless-login/add-email-otp-login.md" %}

## Try it out

Follow the steps given below.

1. Access the application URL.
2. Click **Login** to open the {{ product_name }} login page.
3. On the {{ product_name }} login page, enter your username and press **Continue**.

    ![Sign In with email OTP in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/email-otp/email-otp-login-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

    You will be redirected to the below email OTP page.

    ![Email OTP submit page]({{base_path}}/assets/img/guides/passwordless/email-otp/email-otp-submit-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

4. Check your inbox for the email containing the one-time passcode. The email reads as follows.

    ![Email OTP email]({{base_path}}/assets/img/guides/passwordless/email-otp/email-otp-email.png){: width="400" style="border: 0.3px solid lightgrey;"}

5. Enter the received passcode in the email OTP page and click on **Continue**.

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
