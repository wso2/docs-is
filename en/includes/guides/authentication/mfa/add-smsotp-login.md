# Add MFA with SMS OTP

SMS OTP (One-Time Password) is a security mechanism where a password is sent to the user's registered mobile number, which they must enter during the login process. This password is typically valid for a short period.

During SMS OTP authentication, the user must access their mobile device to retrieve the OTP. This method ensures that only the person who has access to the registered mobile number can log in, providing an additional layer of security.

Follow the instructions given below to configure Multi-Factor Authentication (MFA) using SMS OTP in {{ product_name }}.

## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.
- [Update the user profile of the users]({{base_path}}/guides/users/manage-users/#update-the-profile) with an mobile number to which the user will receive the OTP.

!!! note "Info"
    You can use SMS OTP for multi-factor authentication only if a previous authentication step is configured with **username and password** or another factor that can validate user credentials.
  
## Set up SMS OTP
{{ product_name }} has some default settings for SMS OTP, which are sufficient for most cases. If required, you can change the default settings, as explained below.

To update the default SMS OTP settings:

1. On the {{ product_name }} Console, go to **Connections** and select **SMS OTP**.
2. Update the following parameters in the **Settings** tab:

    ![Setup SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/mfa/smsotp/setup-sms-otp.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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
    </table>
    {% endif %}

3. Once you update the SMS OTP settings, click **Update**.

## Configuring SMS Providers

Configurations related to SMS providers are located under the **{{ notification_tab_name }}** section.

### Supported Providers

{{ product_name }} supports Twilio, Vonage, or custom SMS providers by default. To learn how to configure each provider, please see the relevant section.

??? note "Configuring Twilio"
    To configure Twilio as your SMS provider, follow the steps below:

    - Go to [Twilio](https://www.twilio.com/try-twilio){:target="_blank"} and create an account.
    - After signing up for your account, navigate to the Phone Numbers page in your console. You’ll see the phone number that has been selected for you. Note the phone number’s capabilities, such as "Voice", "SMS", and "MMS".
    - After signing up, navigate to the Phone Numbers page in your console and note the phone number’s capabilities.
    - Get your first Twilio phone number and use that as the “Sender” in the settings. For more information, see this tutorial in the Twilio documentation.
    - Copy the Account SID and Auth Token from the Twilio console dashboard.
    - Go to **SMS Provider** section in the {{ product_name }} Console and click the **Twilio** tab and fill the required fields.

    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>Twilio Account SID</td>
        <td>Account SID received in the previous step.</td>
        <td><code>YourAccountSID</code></td>
      </tr>
      <tr>
        <td>Twilio Auth Token</td>
        <td>Auth token received in the previous step.</td>
        <td><code>YourAuthToken</code></td>
      </tr>
      <tr>
        <td>Sender</td>
        <td>Phone number that you received when creating the Twilio account.</td>
        <td><code>+1234567890</code></td>
      </tr>
    </table>

??? note "Configuring Vonage"
    To configure Vonage as your SMS provider, follow the steps below:

    - Login to [Vonage](https://dashboard.nexmo.com/sign-in){:target="_blank"} and create an account.
    - Fill in the required fields and create the account.
    - Login to the Vonage dashboard and copy the API Key and API Secret.
    - Go to **SMS Provider** section in the {{ product_name }} Console and click the **Vonage** tab and fill the required fields.

    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>Vonage API Key</td>
        <td>Use the API Key from the previous step.</td>
        <td><code>YourAPIKey</code></td>
      </tr>
      <tr>
        <td>Vonage API Secret</td>
        <td>Use the API Secret from the previous step.</td>
        <td><code>YourAPISecret</code></td>
      </tr>
      <tr>
        <td>Sender</td>
        <td>The number that the receiver will see when you send an SMS.</td>
        <td><code>+1234567890</code></td>
      </tr>
    </table>

??? note "Configuring a Custom Provider"
    If you are not using either Twilio or Vonage as the SMS provider, you can configure a custom SMS provider. Custom SMS provider configuration will pass the SMS data to the given URL as an HTTP request.

    To configure a custom SMS provider, in the  **SMS Provider** section click the **Custom** tab and fill the required fields.

    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>SMS Provider URL</td>
        <td>URL of the SMS gateway where the payload should be published.</td>
        <td><code>https://api.example.com/api/v1</code></td>
      </tr>
      <tr>
        <td>Content Type</td>
        <td>Content type of the payload. Possible values are <code>JSON</code> or <code>FORM</code> (Optional).</td>
        <td><code>JSON</code></td>
      </tr>
      <tr>
        <td>HTTP Method</td>
        <td>HTTP method that should be used when publishing the payload to the provider URL. Possible values: <code>PUT</code>, <code>POST</code> (Optional). </td>
        <td><code>POST</code></td>
      </tr>
      <tr>
        <td>Payload Template</td>
        <td>How the payload template should be. </br>Placeholders: </br><code>\{\{body\}\}</code> - Generated body of the SMS. (Example - This can be the OTP). </br><code>\{\{mobile\}\}</code> - Number that this sms should be sent to.</td>
        <td>Example JSON payload template: </br><code>{“content”: \{\{body\}\},“to”: \{\{mobile\}\}}}</code></br></br>(<code>\{\{mobile\}\}</code> and <code>\{\{body\}\}</code> will be replaced with the corresponding values at the runtime.)</td>
      </tr>
      <tr>
        <td>Headers</td>
        <td>Custom static headers need to be passed. If multiple headers need to be passed, they should be comma separated. (Optional)</td>
        <td><code>authorisation: qwer1234asdfzxcv, x-csrf: true, x-abc: some-value</code></td>
      </tr>
    </table>

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
