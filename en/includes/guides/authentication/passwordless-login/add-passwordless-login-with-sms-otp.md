
# Add SMS OTP login

An SMS one-time password (OTP) delivers a short-lived code to the user’s registered mobile number. This works as a passwordless authentication mechanism, allowing users to log in without a password by entering the OTP received via SMS.

Follow the instructions given below to implement passwordless login using SMS OTP in {{ product_name }}.

## Prerequisites

- To begin, you must [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You have the option to register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) available.

- Ensure you have a user account in {{ product_name }}. If not, you can [create a user account]({{base_path}}/guides/users/manage-users/#onboard-a-user) within {{ product_name }}.

- [Update the user profile of the users]({{base_path}}/guides/users/manage-users/#update-the-profile) with an mobile number to which the user will receive the OTP.

- Configure your preferred SMS provider in {{product_name}}. For detailed instructions, see [Configure SMS providers]({{base_path}}/guides/notification-channels/configure-sms-provider/).

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
         <tr>
           <td><code>Allowed OTP resend attempt count</code></td>
           <td>Specifies the number of allowed OTP resend attempts.</td>
         </tr>
   </table>
3. Once you update the SMS OTP settings, click **Update**.

## Enable SMS OTP login for your app

{% include "../../../guides/fragments/add-login/passwordless-login/add-sms-otp-login.md" %}

## Try it out

Follow these steps to test the SMS OTP login:

1. Visit the application URL.
2. Click **Login** to bring up the {{ product_name }} login page.
3. On the login page, enter your username and click **Continue**.

    ![Sign In with SMS OTP in {{ product_name }}]({{base_path}}/assets/img/guides/passwordless/sms-otp/sms-otp-login-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

    This action redirects you to the SMS OTP page.

    ![SMS OTP submit page]({{base_path}}/assets/img/guides/passwordless/sms-otp/sms-otp-submit-page.png){: width="400" style="border: 0.3px solid lightgrey;"}

4. Check your phone for the SMS containing the one-time password (OTP).

5. Enter the received OTP on the SMS OTP page and click **Continue**.
