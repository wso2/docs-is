# Add MFA with SMS OTP

SMS OTP (One-Time Password) is a security mechanism where a password is sent to the user's registered mobile number, which they must enter during the login process. This password is typically valid for a short period.

During SMS OTP authentication, the user must access their mobile device to retrieve the OTP. This method ensures that only the person who has access to the registered mobile number can log in, providing an additional layer of security.

Follow the instructions given below to configure Multi-Factor Authentication (MFA) using SMS OTP in {{ product_name }}.

## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.
- [Update the user profile of the users]({{base_path}}/guides/users/manage-users/#update-the-profile) with a mobile number to which the user will receive the OTP.{% if product_name == "WSO2 Identity Server" and is_version > "7.3.0" %} Alternatively, [allow mobile number enrollment during login](#allow-mobile-number-enrollment-during-login) so that users without a mobile number can add one when they sign in.{% endif %}
- [Configure the SMS provider](../../notification-channels/configure-sms-provider.md) in {{product_name}}.

!!! note "Info"
    You can use SMS OTP for multi-factor authentication only if a previous authentication step is configured with **username and password** or another factor that can validate user credentials.
  
## Set up SMS OTP
{{ product_name }} has some default settings for SMS OTP, which are sufficient for most cases. If required, you can change the default settings, as explained below.

To update the default SMS OTP settings:

1. On the {{ product_name }} Console, go to **Connections** and select **SMS OTP**.
2. Update the following parameters in the **Settings** tab:

    {% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.3.0") %}
    ![Setup SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/smsotp/setup-sms-otp-v2.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% else %}
    ![Setup SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/smsotp/setup-sms-otp.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    {% endif %}

    {% if product_name == "WSO2 Identity Server" and (is_version == "7.0.0" or is_version == "7.1.0") %}
    <table>
      <tr>
        <th style="width: 350px;">Field</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><code>SMS OTP expiry time</code></td>
        <td>Specifies the expiry time of the OTP. The generated OTP will not be valid after this expiry time.</td>
      </tr>
      <tr>
        <td><code>Use only numeric characters for OTP</code></td>
        <td>
            Specifies whether to use only numeric characters in the OTP. If this is selected, the generated OTP contains only digits (0-9).
            If this option is not selected, the OTP will contain alphanumeric characters.
        </td>
      </tr>
      <tr>
        <td><code>SMS OTP length</code></td>
        <td>Specifies the number of characters allowed in the OTP.</td>
      </tr>
    </table>
    {% else %}
    <table>
      <tr>
        <th style="width: 350px;">Field</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><code>SMS OTP expiry time</code></td>
        <td>Specifies the expiry time of the OTP. The generated OTP will not be valid after this expiry time.</td>
      </tr>
      <tr>
        <td><code>Use only numeric characters for OTP</code></td>
        <td>
            Specifies whether to use only numeric characters in the OTP. If this is selected, the generated OTP contains only digits (0-9).
            If this option is not selected, the OTP will contain alphanumeric characters.
        </td>
      </tr>
      <tr>
        <td><code>SMS OTP length</code></td>
        <td>Specifies the number of characters allowed in the OTP.</td>
      </tr>
      <tr>
        <td><code>Allowed OTP resend attempt count</code></td>
        <td>Specifies the number of allowed OTP resend attempts.</td>
      </tr>
      <tr>
        <td><code>Resend OTP block time</code></td>
        <td>Specifies the time duration to block OTP resend requests after reaching the maximum allowed resend attempts.</td>
      </tr>
      {% if product_name == "WSO2 Identity Platform" or (product_name == "WSO2 Identity Server" and is_version > "7.3.0") %}
      <tr>
        <td><code>Notify users on OTP delivery failure</code></td>
        <td>
            If enabled, users are notified when the SMS OTP fails to send due to a connectivity or provider error. If disabled, the failure occurs silently and users are still prompted to enter the OTP without any error indication. Note that actual delivery failures (e.g., the SMS not reaching the recipient's device) may not be captured, depending on the provider used.
            This is disabled by default.
        </td>
      </tr>
      {% endif %}
      {% if product_name == "WSO2 Identity Server" and is_version > "7.3.0" %}
      <tr>
        <td><code>Allow mobile number enrollment during login</code></td>
        <td>
            If enabled, users who don't have a mobile number in their profile can add and verify one during login. This applies only when the user has already signed in with another authenticator in the same login flow. Learn more in <a href="#allow-mobile-number-enrollment-during-login">Allow mobile number enrollment during login</a>.
            This is disabled by default.
        </td>
      </tr>
      {% endif %}
    </table>
    {% endif %}

3. Once you update the SMS OTP settings, click **Update**.

## Enable SMS OTP for an app

{% include "../../../guides/fragments/add-login/mfa/add-smsotp-login.md" %}

## How it works

When SMS OTP is enabled in the login flow of your application, the application user will be prompted with the SMS OTP authentication step once the first authentication step is completed. Given below are the high-level steps that follow:

1. {{ product_name }} sends the OTP to the user's mobile number.
2. {{ product_name }} prompts the user to enter the OTP code.
  
    ![Authenticate with SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/smsotp/enter-sms-otp.png){: width="300" style="border: 0.3px solid lightgrey;"}

3. If required, the user can request {{ product_name }} to resend the OTP. The new OTP invalidates the previously sent OTP.
4. The user enters the OTP and clicks **Continue**.
5. If the authentication is successful, the user can access the application.

{% if product_name == "WSO2 Identity Server" and is_version > "7.3.0" %}

## Allow mobile number enrollment during login

A user who doesn't have a mobile number in their profile can add and verify one during login. This applies when SMS OTP runs as a later step, after the user has already signed in with another authenticator in the same login flow. For example, the user signs in with a username and password in the first step and SMS OTP runs in the second step.

{{ product_name }} saves the mobile number to the user's profile only after the user enters the correct OTP sent to that number.

### Before you begin

- [Configure the SMS provider](../../notification-channels/configure-sms-provider.md) in {{ product_name }}.
- Add SMS OTP to the login flow of the application as a step that comes after an authenticator that verifies the user's credentials, such as **Username & Password**. Learn how to do so in [Enable SMS OTP for an app](#enable-sms-otp-for-an-app).

### Enable mobile number enrollment

Mobile number enrollment during login is disabled by default. To enable it for your organization:

1. On the {{ product_name }} Console, go to **Connections** and select **SMS OTP**.
2. Go to the **Settings** tab and select the **Allow mobile number enrollment during login** checkbox.
3. Click **Update** to save your changes.

!!! note
    You can also enable this setting using the [identity governance REST API]({{base_path}}/apis/identity-governance-rest-api/). Set the `SmsOTP.EnrollUserInAuthenticationFlow` property to `true` as shown below.

    ```bash
    curl -X PATCH \
    '{{base_url}}/api/server/v1/identity-governance/TXVsdGkgRmFjdG9yIEF1dGhlbnRpY2F0b3Jz/connectors/c21zLW90cC1hdXRoZW50aWNhdG9y' \
    -H 'Authorization: Bearer <access_token>' \
    -H 'Content-Type: application/json' \
    -d '{
        "operation": "UPDATE",
        "properties": [
            {
                "name": "SmsOTP.EnrollUserInAuthenticationFlow",
                "value": "true"
            }
        ]
    }'
    ```

### How mobile number enrollment works

When mobile number enrollment is enabled, the SMS OTP step works as follows for a user who doesn't have a mobile number:

1. The user completes the earlier authentication step, for example, by entering their username and password.
2. {{ product_name }} prompts the user to enter a mobile number.
3. The user enters a mobile number. {{ product_name }} removes spaces and hyphens from the number and validates the number against the [mobile number format](#configure-the-mobile-number-format).

    If the number isn't valid, {{ product_name }} doesn't send an OTP and shows the message `The mobile number is not valid. Enter a valid mobile number.`

4. {{ product_name }} sends an OTP to the mobile number and prompts the user to enter the OTP.
5. The user enters the OTP. If the OTP is correct, {{ product_name }} saves the number to the user's profile as the mobile number, marks the number as verified, and completes the SMS OTP step.

Note the following about this flow:

- {{ product_name }} doesn't save the mobile number if the user enters an incorrect OTP.
- If {{ product_name }} can't save the mobile number to the user's profile, the SMS OTP step fails and {{ product_name }} prompts the user to enter the mobile number again with the message `The mobile number could not be added to your profile. Enter the mobile number again.` For example, this happens if the mobile number attribute is [configured as a unique attribute]({{base_path}}/guides/users/attributes/configure-unique-attributes/) and another user already has the same mobile number.
- If the user enters the same mobile number again, {{ product_name }} treats the request as an OTP resend. The **Allowed OTP resend attempt count** setting of the SMS OTP connection applies.
- A user can enter up to 3 different mobile numbers during a single login. Numbers that fail validation don't count towards this limit. When the user exceeds the limit, {{ product_name }} shows the message `You have entered too many mobile numbers. Restart the login to try again.` To change the limit, see [Configure the mobile number enrollment limit](#configure-the-mobile-number-enrollment-limit).
- The login page shows these messages in the languages that the login page supports.

{{ product_name }} doesn't prompt for a mobile number and the SMS OTP step works as usual in the following cases:

- Mobile number enrollment is disabled for the organization or [turned off for the application](#turn-off-mobile-number-enrollment-for-an-application).
- SMS OTP is the first authentication step.
- The earlier steps only identified the user without verifying the user's credentials, for example, with **Identifier First**.
- The user is a federated user.
- The user already has a mobile number in their profile.
- The user account is locked.

### Configure the mobile number format

By default, a mobile number must match the regular expression `^\+?[0-9]{7,15}$`, which accepts an optional leading `+` followed by 7 to 15 digits. {{ product_name }} validates the number after removing spaces and hyphens.

To use a different format for your organization, set the `SmsOTP.MobileNumberRegex` property using the [identity governance REST API]({{base_path}}/apis/identity-governance-rest-api/). You can't configure this property from the {{ product_name }} Console.

```bash
curl -X PATCH \
'{{base_url}}/api/server/v1/identity-governance/TXVsdGkgRmFjdG9yIEF1dGhlbnRpY2F0b3Jz/connectors/c21zLW90cC1hdXRoZW50aWNhdG9y' \
-H 'Authorization: Bearer <access_token>' \
-H 'Content-Type: application/json' \
-d '{
    "operation": "UPDATE",
    "properties": [
        {
            "name": "SmsOTP.MobileNumberRegex",
            "value": "<regex>"
        }
    ]
}'
```

!!! note
    - If you leave `SmsOTP.MobileNumberRegex` empty, {{ product_name }} uses the default format.
    - If the value isn't a valid regular expression, {{ product_name }} rejects all mobile numbers that users enter during login.
    - {{ product_name }} rejects mobile numbers longer than 32 characters regardless of the configured format.

### Configure the mobile number enrollment limit

You can configure the following server-wide parameters of the SMS OTP authenticator in the `<IS_HOME>/repository/conf/deployment.toml` file.

<table>
  <tr>
    <th style="width: 350px;">Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>MobileNumberEnrollmentMaxAttempts</code></td>
    <td>
        The maximum number of different mobile numbers that a user can enter during a single login. The value must be a positive integer. If the value isn't a positive integer, {{ product_name }} uses the default value.
        The default value is <code>3</code>.
    </td>
  </tr>
  <tr>
    <td><code>SMSOTPMobileNumberRequestPageURL</code></td>
    <td>
        The path of the page that prompts users to enter a mobile number, relative to the server URL. Change this value only if you use a custom page.
        The default value is <code>authenticationendpoint/mobile.jsp</code>.
    </td>
  </tr>
</table>

For example, to allow users to enter up to 5 different mobile numbers during a single login, add the following configuration and restart the server.

```toml
[authentication.authenticator.sms_otp_local.parameters]
MobileNumberEnrollmentMaxAttempts = 5
```

### Turn off mobile number enrollment for an application

When mobile number enrollment is enabled for the organization, you can turn it off for the login flow of a specific application using a [conditional authentication]({{base_path}}/guides/authentication/conditional-auth/) script. To do so, pass the `enrollUserInAuthenticationFlow` parameter to the SMS OTP authenticator in the step that runs SMS OTP.

```js
var onLoginRequest = function(context) {
    executeStep(1);
    executeStep(2, {
        authenticatorParams: {
            local: {
                "sms-otp-authenticator": {
                    "enrollUserInAuthenticationFlow": "false"
                }
            }
        }
    }, {});
};
```

!!! note
    An application can only turn off mobile number enrollment. If mobile number enrollment is disabled for the organization, setting `enrollUserInAuthenticationFlow` to `true` in the script doesn't enable it.

### Mobile number enrollment with app-native authentication

If your application uses [app-native authentication]({{base_path}}/references/app-native-authentication/), the response for the SMS OTP step contains `MOBILE_NUMBER` in `requiredParams` when {{ product_name }} expects the user to enter a mobile number. Send the mobile number in the `params` of the request, the same way you send other authenticator parameters. {{ product_name }} then sends the OTP, and you send the OTP in the `OTPcode` parameter as usual.

{% endif %}
