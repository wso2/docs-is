# Configure Email Provider

This document explains the steps to configure {{ product_name }} to send emails during multiple email-related customer identity and access management tasks such as [email OTP]({{base_path}}/guides/authentication/mfa/add-emailotp-login/), email notifications, and account recovery.

## Global Configurations of Email Provider

Follow the steps given below to enable the email sender globally for all tenants in {{ product_name }}.

1. Shut down the server if it is running.
2. Add the following properties to the `deployment.toml` file in the `<IS_HOME>/repository/conf` folder to configure the email provider.

    ```toml
    [output_adapter.email]
    from_address= "wso2iamtest@gmail.com"
    auth_type= "BASIC"
    username= "wso2iamtest"
    password= "Wso2@iam70"
    hostname= "smtp.gmail.com"
    port= 587
    enable_start_tls= true
    enable_authentication= true
    signature = "ABC.com"
    ```
   
    <table>
      <tr>
        <th>Property</th>
        <th>Description</th>
      </tr>
      <tr>
        <td><code>from_address</code></td>
        <td>This is the mail address from where you want to send the notification. It can be any working mail address.</td>
      </tr>
      <tr>
        <td><code>auth_type</code></td>
        <td>
          Authentication type to use when sending the email. {{ product_name }} supports <code>BASIC</code> and <code>CLIENT_CREDENTIAL</code> authentication types.
          <br/> For <code>BASIC</code> you need to configure <code>username</code> and <code>password</code>. 
          <br/> For <code>CLIENT_CREDENTIAL</code> you need to configure <code>client_id</code>, <code>client_secret</code>, <code>token_endpoint</code> and  <code>scopes</code>.
          Support for the <code>CLIENT_CREDENTIAL</code> authentication type is available for Microsoft 365 Exchange Online.
        </td>
      <tr>
        <td><code>username</code></td>
        <td>Provide the username of the SMTP account. <br/> Username of the mail you have provided in <strong>from_address</strong>.</td>
      </tr>
      <tr>
        <td><code>password</code></td>
        <td>Provide the password of the SMTP account. <br/> Password of the mail you have provided in <strong>from_address</strong>.</td>
      </tr>
      <tr>
        <td><code>client_id</code></td>
        <td>The application (client) ID obtained from your email service provider (for example, Microsoft Entra ID) when using <code>CLIENT_CREDENTIAL</code> authentication. This is required when <code>auth_type</code> is set to <code>CLIENT_CREDENTIAL</code>.</td>
      </tr>
      <tr>
        <td><code>client_secret</code></td>
        <td>The application secret (client secret) obtained from your email service provider when using <code>CLIENT_CREDENTIAL</code> authentication. This is required when <code>auth_type</code> is set to <code>CLIENT_CREDENTIAL</code>.</td>
      </tr>
      <tr>
        <td><code>token_endpoint</code></td>
        <td>The OAuth 2.0 token endpoint URL used to obtain access tokens when using <code>CLIENT_CREDENTIAL</code> authentication. For example, for Microsoft 365, this would be in the format <code>https://login.microsoftonline.com/{tenant_id}/oauth2/v2.0/token</code>. This is required when <code>auth_type</code> is set to <code>CLIENT_CREDENTIAL</code>.</td>
      </tr>
      <tr>
        <td><code>scopes</code></td>
        <td>The OAuth 2.0 scopes required for email sending permissions when using <code>CLIENT_CREDENTIAL</code> authentication. Multiple scopes should be separated by spaces (for example, <code>scope1 scope2</code>). For Microsoft 365 Exchange Online, use <code>https://outlook.office365.com/.default</code>. This is required when <code>auth_type</code> is set to <code>CLIENT_CREDENTIAL</code>.</td>
      </tr>
      <tr>
        <td><code>host</code></td>
        <td>The SMTP server to connect to.</td>
      </tr>
      <tr>
        <td><code>port</code></td>
        <td>This is the SMTP server port to connect to if the connect() method does not explicitly specify one. Defaults to 25.</td>
      </tr>
      <tr>
        <td><code>enable_start_tls</code></td>
        <td>If true, this enables using the <code>STARTTLS</code> command (if enabled before issuing any login commands. Note that an appropriate trust store must be configured so that the client will trust the server's certificate. Defaults to <code>true</code>.</td>
      </tr>
      <tr>
        <td><code>enable_authentication</code></td>
        <td>If true, attempt to authenticate the user using the AUTH command. Defaults to <code>true</code>.</td>
      </tr>
      <tr>
        <td><code>signature</code></td>
        <td>Specifies the display name for the "From" email address. For example, "ABC Company" results in `"ABC Company" <mail@address.tld>`. <br/><br/>If you don't set this property, the display name becomes `null` and the system falls back to your SMTP server settings. For example, some servers use the `username` as the display name.<br/><br/>To send an email with no display name and show only the email address, set this value to an empty string: `signature = ""`</td>
      </tr>
    </table>

    ### Configuration examples

    ??? note "Example 1: Using BASIC authentication"
        This example shows how to configure the email provider with BASIC authentication (username and password).

        ```toml
        [output_adapter.email]
        from_address= "wso2iamtest@gmail.com"
        auth_type= "BASIC"
        username= "wso2iamtest"
        password= "Wso2@iam70"
        hostname= "smtp.gmail.com"
        port= 587
        enable_start_tls= true
        enable_authentication= true
        signature = "ABC.com"
        ```

    ??? note "Example 2: Using CLIENT_CREDENTIAL authentication"
        This example shows how to configure the email provider with CLIENT_CREDENTIAL authentication for Microsoft 365 Exchange Online.

        ```toml
        [output_adapter.email]
        from_address= "notifications@example.com"
        auth_type= "CLIENT_CREDENTIAL"
        client_id= "12345678-1234-1234-1234-123456789abc"
        client_secret= "your_client_secret_value"
        token_endpoint= "https://login.microsoftonline.com/your-tenant-id/oauth2/v2.0/token"
        scopes= "https://outlook.office365.com/.default"
        hostname= "smtp.office365.com"
        port= 587
        enable_start_tls= true
        enable_authentication= true
        signature = "ABC.com"
        ```

        !!! note
            - Replace `your-tenant-id` with your actual Microsoft 365 tenant ID.
            - The scope value `https://outlook.office365.com/.default` is required for Microsoft 365 Exchange Online.
            - Multiple scopes should be separated by spaces if your email provider requires multiple scopes.

    !!! Tip
        For information about the SMTP, see
        [here](https://javaee.github.io/javamail/docs/api/com/sun/mail/smtp/package-summary.html){:target="_blank"}.

    !!! info
        - If you use a Gmail account as the **from_address**, you must create an [App Password](https://support.google.com/accounts/answer/185833?visit_id=637943607149528455-3801902236&p=InvalidSecondFactor&rd=1){:target="_blank"}.
         After you get an **App Password** from Google, update the `password`.
        - If your password contains special characters (example: `<`, `>`, `&`), you will run into errors when running the server. To avoid errors, update the `password` parameter as follows:
        ```toml
        password= "<![CDATA[xxxx]]>"
        ```

3. Save the configurations and start the server.

## Tenant Specific Configurations of Email Provider

!!! info
    - Super tenant email provider cannot be configured via the {{ product_name }} console. You need to configure the email provider in the `deployment.toml` file as mentioned above.

Follow the steps given below to enable the email sender per tenant.

1. On the {{ product_name }} Console, go to **Notification Channels** > **Email Provider**.
2. Provide the required details.

   ![Configure Email Provider]({{base_path}}/assets/img/guides/notification-channels/email-provider/configure-email-provider.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update**. 
4. Since these configurations will be applicable during the tenant loading process, [configure tenant loading and unloading for your tenant]({{base_path}}/guides/multitenancy/configure-the-tenant-loading-policy/).

## Supported Providers

??? note "Configuring Gmail as the email provider"
    If you use a Gmail account as the **from_address**, you must create an [App Password](https://support.google.com/accounts/answer/185833?visit_id=637943607149528455-3801902236&p=InvalidSecondFactor&rd=1){:target="_blank"}.
      After you get an **App Password** from Google, update the `password`.

    If your password contains special characters (example: `<`, `>`, `&`), you will run into errors when running the server. To avoid errors, update the `password` parameter as follows:
    ```toml
    password= "<![CDATA[xxxx]]>"
    ```

??? note "Configuring Microsoft 365 Exchange Online as the email provider"
    
    ## Before you start
    
    - You must have a [Microsoft 365](https://www.microsoft.com/en-us/microsoft-365) account with an active subscription.
    - Ensure your Microsoft 365 subscription is licensed to send emails through Exchange Online.
       - You need at a minimum a paid subscription to Microsoft Business Basic plan to use the SMTP Auth for Exchange Online. 
    - Emails will be sent from {{ product_name }} to your SMTP provider. Your ports should be open and allow inbound 
      connections from specific {{ product_name }} IP addresses.

    ## Configure Microsoft 365
    
    ### Application Configuration and Permissions

      1. Register a client application in Microsoft Entra ID if you currently do not have one.
      2. Navigate to your registered Application resource. 
      3. Select Services > App registrations, and then select the application you will be using to send emails.
      4. Configure the required application permissions by navigating to Manage > API permissions.
         Please refer [Application permissions for SMTP](https://learn.microsoft.com/en-us/exchange/client-developer/legacy-protocols/how-to-authenticate-an-imap-pop-smtp-application-by-using-oauth#add-the-pop-imap-or-smtp-permissions-to-your-microsoft-entra-application)

         ![API Permission]({{base_path}}/assets/img/guides/notification-channels/email-provider/api-permission.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

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
  
       ![Configure Email Provider]({{base_path}}/assets/img/guides/notification-channels/email-provider/email-provider-config-page.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}
    
    - Click **Update** to save the configurations.
