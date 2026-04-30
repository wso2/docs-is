{% set product_name = "Asgardeo" %}

# Configure Email Provider

This document explains the steps to configure {{ product_name }} to send emails during multiple email-related customer identity and access management tasks such as [email OTP]({{base_path}}/guides/authentication/mfa/add-emailotp-login/), email notifications, and account recovery.

{{ product_name }} supports SMTP-based and HTTP-based email providers. To learn how to configure each email provider per organization, please see the relevant section.

## Configure SMTP based email provider

1. On the {{ product_name }} Console, go to **Notification Channels** > **Email Provider**.
2. Click the **SMTP** tab, provide the required details.

   ![Configure Email Provider]({{base_path}}/assets/img/notification-channels/email-provider/configure-email-provider.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update**.

### Supported providers

??? note "Configuring Gmail as the email provider"
    If you use a Gmail account as the **from_address**, you must create an [App Password](https://support.google.com/accounts/answer/185833?visit_id=637943607149528455-3801902236&p=InvalidSecondFactor&rd=1){:target="_blank"}.
       After you get an **App Password** from Google, update the `password`.

??? note "Configuring Microsoft 365 Exchange Online as the email provider"

    ## Before you start
    
    - You must have a [Microsoft 365](https://www.microsoft.com/en-us/microsoft-365) account with an active subscription.
    - Ensure your Microsoft 365 subscription is licensed to send emails through Exchange Online.
       - You need at a minimum a paid subscription to Microsoft Business Basic plan to use the SMTP Auth for Exchange Online. 
    - Emails will be sent from {{ product_name }} to your SMTP provider. Your ports should be open and allow inbound 
      connections from specific {{ product_name }} IP addresses.

    ## Configure Microsoft 365
    
    ### Application Configuration and Permissions

      1. Register a Azure Active Directory Application resource if you currently do not have one.
      2. Navigate to your Active Directory Application resource. 
      3. Select Services > App registrations, and then select the application you will be using to send emails.
      4. Configure the required application permissions by navigating to Manage > API permissions.
         Please refer [Application permissions for SMTP](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth#add-the-pop-imap-or-smtp-permissions-to-your-microsoft-entra-application)

         ![API Permission]({{base_path}}/assets/img/notification-channels/email-provider/api-permission.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    ### Register service principals in Exchange
  
    - Please refer [Register service principals in Exchange](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth#register-service-principals-in-exchange).

    ### Enable SMTP AUTH for specific mailboxes
    
    - Please refer [Enable SMTP AUTH for specific mailboxes](https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/authenticated-client-smtp-submission#use-the-microsoft-365-admin-center-to-enable-or-disable-smtp-auth-on-specific-mailboxes).

    ### Retrieve required email provider configurations
    
    - Navigate to the **Application Overview** of your Azure Active Directory Application and retrieve the [Application (client) ID](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#application-id-client-id).
    - Navigate to Manage > Certificates & secrets and collect the Value to create an [application secret](https://learn.microsoft.com/en-us/azure/healthcare-apis/register-application#certificates--secrets).
    - Navigate to Overview > Endpoints and copy the **OAuth 2.0 token endpoint (v2)** URL.

    ### Configure SMTP settings in {{ product_name }}

    - Go to **Notification Channels** > **Email Provider**.
    - Provide the From email address and other relevant details. Click on **Client Credentials** from the Authentication type dropdown.
    - Provide the required details retrieved from the previous step.
    
       NOTE: The scope required for Microsoft 365 Exchange Online is `https://outlook.office365.com/.default` and the token endpoint URL should be in the format of `https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token`.
  
       ![Configure Email Provider]({{base_path}}/assets/img/notification-channels/email-provider/email-provider-config-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    
    - Click **Update** to save the configurations.

## Configure HTTP based email provider

Integrate with a custom email service by sending email data to an external HTTP endpoint. When an email is triggered, {{ product_name }} constructs a request using the configured payload template and delivers it to the specified URL.

1. On the {{ product_name }} Console, go to **Notification Channels** > **Email Provider**.
2. Click the **HTTP** tab, provide the required details and click **Update**.

    ![Configure Email Provider]({{base_path}}/assets/img/notification-channels/email-provider/configure-http-based-email-provider.png){: width="800" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Example</th>
      </tr>
      <tr>
        <td>Email Provider URL</td>
        <td>URL of the Email gateway where the payload should be published.</td>
        <td><code>https://api.example.com/api/v1</code></td>
      </tr>
      <tr>
        <td>Content Type</td>
        <td>Content type of the payload. Possible values are <code>JSON</code> or <code>FORM</code></td>
        <td><code>JSON</code></td>
      </tr>
      <tr>
        <td>HTTP Method</td>
        <td>HTTP method that should be used when publishing the payload to the provider URL. Possible values: <code>PUT</code>, <code>POST</code>. </td>
        <td><code>POST</code></td>
      </tr>
      <tr>
        <td>HTTP Headers</td>
        <td>Custom static headers need to be passed. If multiple headers need to be passed, they should be comma separated. (Optional)</td>
        <td><code>x-csrf: true, x-abc: some-value</code></td>
      </tr>
      <tr>
        <td>Payload Template</td>
        <td>How the payload template should be. </br>Placeholders:</br><code>\{\{subject\}\}</code> - Subject of the Email. </br><code>\{\{body\}\}</code> - Generated body of the Email. </br><code>\{\{footer\}\}</code> - Footer of the Email. </br><code>\{\{send-to\}\}</code> - Email address that this email should be sent to. </td>
        <td>Example JSON payload template: </br><code>{“subject”: “\{\{subject\}\}”, “body”: “\{\{body\}\}”, “footer”: “\{\{footer\}\}”, “to”: “\{\{send-to\}\}”}</code></br></br>(<code>\{\{subject\}\}</code> , <code>\{\{body\}\}</code>  <code>\{\{footer\}\}</code> and <code>\{\{send-to\}\}</code>  will be replaced with the corresponding values at the runtime.)</td>
      </tr>
      <tr>
        <td>Authentication</td>
        <td>Authentication settings for the HTTP-based email provider. Select the preferred authentication scheme and enter the required authentication properties.</td>
        <td>Authentication Scheme <code>Basic</code> with username and password.</td>
      </tr>
    </table>
