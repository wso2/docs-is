# Add MFA with SMS OTP

SMS OTP (One-Time Password) is a security mechanism where a password is sent to the user's registered mobile number, which they must enter during the login process. This password is typically valid for a short period.

During SMS OTP authentication, the user must access their mobile device to retrieve the OTP. This method ensures that only the person who has access to the registered mobile number can log in, providing an additional layer of security.

Follow the instructions given below to configure Multi-Factor Authentication (MFA) using SMS OTP in {{ product_name }}.

## Prerequisites

- To get started, you need to [register an application with {{ product_name }}]({{base_path}}/guides/applications/). You can register your own application or use one of the [sample applications]({{base_path}}/get-started/try-samples/) provided.
- [Update the user profile of the users]({{base_path}}/guides/users/manage-users/#update-the-profile) with a mobile number to which the user will receive the OTP.
- [Configure the SMS provider](../../notification-channels/configure-sms-provider.md) in {{product_name}}.

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
         <tr>
           <td><code>Resend OTP block time</code></td>
           <td>Specifies the time duration to block OTP resend requests after reaching the max allowed resend attempts.</td>
         </tr>
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
