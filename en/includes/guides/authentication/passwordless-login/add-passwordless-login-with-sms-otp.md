
# Add SMS OTP Login

SMS OTP (One-Time Password) is a security mechanism where a password, valid for a short duration, is sent to the user's registered mobile number. This password must be entered during the login process.

This method can be used as a form of passwordless authentication, allowing users to log in by providing a one-time passcode received via SMS on their mobile phones, instead of using a traditional password.

To configure SMS OTP as a passwordless authentication mechanism in {{ product_name }}, follow the instructions given below.

## Prerequisites
- To begin, you must [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You have the option to register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) available.

- Ensure you have a user account in {{ product_name }}. If not, you can [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) within {{ product_name }}.

- [Update the user profile of the users]({{base_path}}/guides/users/manage-users/#update-the-profile) with an mobile number to which the user will receive the OTP.

{{ admin_login_note }}

## Set up SMS OTP
{{ product_name }} has some default settings for SMS OTP, which are sufficient for most cases. If required, you can change the default settings, as explained below.

To update the default SMS OTP settings:

1. On the {{ product_name }} Console, go to **Connections** and select **SMS OTP**.
2. Update the following parameters in the **Settings** tab:
   ![Setup SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/sms-otp/setup-sms-otp.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
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
3. Once you update the SMS OTP settings, click **Update**.

## Configuring SMS Providers

Configurations related to SMS providers are located under the **{{ notification_tab_name }}** section On the {{ product_name }} Console.

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
           <td><code>Twilio Account SID</code></td>
           <td>Account SID received in the previous step.</td>
           <td><code>YourAccountSID</code></td>
         </tr>
         <tr>
           <td><code>Twilio Auth Token</code></td>
           <td>Auth token received in the previous step.</td>
           <td><code>YourAuthToken</code></td>
         </tr>
         <tr>
           <td><code>Sender</code></td>
           <td>Phone number that you received when creating the Twilio account.</td>
           <td><code>+1234567890</code></td>
         </tr>
       </table>

??? note "Configuring Vonage"
      To configure Vonage as your SMS provider, follow the steps below:

       - Login to [Vonage](https://www.vonage.com/){:target="_blank"} and create an account.
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
           <td><code>Vonage API Key</code></td>
           <td>Use the API Key from the previous step.</td>
           <td><code>YourAPIKey</code></td>
         </tr>
         <tr>
           <td><code>Vonage API Secret</code></td>
           <td>Use the API Secret from the previous step.</td>
           <td><code>YourAPISecret</code></td>
         </tr>
         <tr>
           <td><code>Sender</code></td>
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
        <td>SMS Provider Name</td>
        <td>Display name for the SMS provider.</td>
        <td><code>MySMSProvider</code></td>
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

## Enable SMS OTP Login for Your App

{% include "../../../guides/fragments/add-login/passwordless-login/add-sms-otp-login.md" %}

## Try It Out

Follow these steps to test the SMS OTP login:

1. Visit the application URL.
2. Click **Login** to bring up the {{ product_name }} login page.
3. On the login page, enter your username and click **Continue**.

    ![Sign In with SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/sms-otp/sms-otp-login-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

    This action redirects you to the SMS OTP page.

    ![SMS OTP submit page]({{base_path}}/assets/img/guides/passwordless/sms-otp/sms-otp-submit-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

4. Check your phone for the SMS containing the one-time passcode.

5. Enter the received passcode on the SMS OTP page and click **Continue**.
