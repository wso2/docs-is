
# Add SMS OTP Login

SMS OTP (One-Time Password) is a security mechanism where a password, valid for a short duration, is sent to the user's registered mobile number. This password must be entered during the login process.

This method can be used as a form of passwordless authentication, allowing users to log in by providing a one-time passcode received via SMS on their mobile phones, instead of using a traditional password.

To configure SMS OTP as a passwordless authentication mechanism in {{ product_name }}, follow the instructions given below.

## Prerequisites
- To begin, you must [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You have the option to register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) available.

- Ensure you have a user account in {{ product_name }}. If not, you can [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) within {{ product_name }}.

- [Update the user profile of the users]({{base_path}}/guides/users/manage-users/#update-the-profile) with an mobile number to which the user will receive the OTP.

{{ admin_login_note}}

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

Configurations related to SMS providers are located under the **Email & SMS** section On the {{ product_name }} Console.

### Supported Providers

{{ product_name }} supports Twilio, Vonage, or custom SMS providers by default. To learn how to configure each provider, please see the relevant section.

??? note "Configuring Twilio"
      To configure Twilio as your SMS provider, follow the steps below:
   
       - Go to [Twilio](https://www.twilio.com/try-twilio) and create an account.
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

       - Login to [Vonage](https://www.vonage.com/) and create an account.
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
              <td><code>SMS Provider Name</code></td>
              <td>Display name for the SMS provider.</td>
              <td><code>MySMSProvider</code></td>
            </tr>
            <tr>
              <td><code>SMS Provider URL</code></td>
              <td>URL of the SMS gateway where the payload should be published.</td>
              <td><code>YourProviderURL</code></td>
            </tr>
            <tr>
              <td><code>SMS Provider Auth Key</code></td>
              <td>Authorization key if required.</td>
              <td><code>abcdefghijklmnopqrstuvwxyz</code></td>
            </tr>
            <tr>
              <td><code>SMS Provider Auth Secret</code></td>
              <td>Authorization secret if required.</td>
              <td><code>qwer1234asdfzxcv</code></td>
            </tr>
            <tr>
              <td><code>Sender</code></td>
              <td>Sender’s identification.</td>
              <td><code>+1098765432</code></td>
            </tr>
            <tr>
              <td><code>Content Type</code></td>
              <td>Content type of the payload.</td>
              <td><code>JSON</code></td>
            </tr>
            <tr>
              <td><code>HTTP Method</code></td>
              <td>HTTP method that should be used when publishing the payload to the provider URL.</td>
              <td><code>POST</code></td>
            </tr>
            <tr>
              <td><code>Payload</code></td>
              <td>Optional static payload that needs to be added.</td>
              <td><code>{"smsBody": "Your OTP is: 123456"}</code></td>
            </tr>
            <tr>
              <td><code>Headers</code></td>
              <td>Custom static headers needed to be passed.</td>
              <td><code>{"Authorization": "Bearer YourAuthToken"}</code></td>
            </tr>
          </table>
      
          Example Payload Structure:
          ```json
          {
            "toNumber": "+1234567890",
            "fromNumber": "+1098765432",
            "smsBody": "Your OTP will be: 123456",
            "smsMetadata": {
              "key": "abcdefghijklmnop",
              "secret": "qwer1234asdfzxcv",
              "sender": "+1098765432",
              "contentType": "JSON",
              "tenantDomain": "my-organisation"
            }
          }
          ```

## Enable SMS OTP Login for Your App

Follow the steps given below to enable **SMS OTP** login to the login flow of your application.

1. On the {{ product_name }} Console, go to **Applications**.

2. Select the application to which you wish to add SMS OTP login.

3. Go to the **Sign-in Method** tab of the application and add SMS OTP login from your preferred editor:

    ---
    === "Classic Editor"
        - If you haven’t yet built a login flow for your application, add `SMS OTP` authenticator as the first authentication step.

            ![Configuring SMS OTP login in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/sms-otp/add-sms-otp-login.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

        - If you already have an existing login flow, add the `SMS OTP` authenticator as the first authentication step with the other login options.
        
            ![Customize the login flow]({{base_path}}/assets/img/guides/passwordless/sms-otp/add-sms-otp-login-step.png){: style="display: block; margin: 0 auto; border: 0.3px solid lightgrey;"}

    === "Visual Editor"
        To implement passwordless login with SMS OTP using the Visual Editor:

        1. Switch to the **Visual Editor** tab and click **Add Sign in Option**.

        2. Add `SMS OTP`.

        3. Click **Confirm** to integrate passwordless login with SMS OTP into the sign-in flow.

            ![Configuring SMS OTP login in {{ product_name }} using the Visual Editor]({{base_path}}/assets/img/guides/passwordless/sms-otp/add-sms-otp-login-step-with-visual-editor.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ---

4. Click **Update** to save your configuration.

## Try It Out

Follow these steps to test the SMS OTP login:

1. Visit the application URL.
2. Click **Login** to bring up the {{ product_name }} login page.
3. On the login page, enter your username and click **Continue**.

    ![Sign In with SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/sms-otp/sms-otp-login-page.png){: width="300" style="border: 0.3px solid lightgrey;"}

    This action redirects you to the SMS OTP page.

    ![SMS OTP submit page]({{base_path}}/assets/img/guides/passwordless/sms-otp/sms-otp-submit-page.png){: width="300" style="border: 0.3px solid lightgrey;"}

4. Check your phone for the SMS containing the one-time passcode.

5. Enter the received passcode on the SMS OTP page and click **Continue**.
