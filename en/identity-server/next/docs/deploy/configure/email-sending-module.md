# Configure the email sending module

This document explains the steps to configure WSO2 Identity Server to send emails during multiple email-related customer identity and access management tasks such as [email OTP]({{base_path}}/guides/authentication/mfa/add-emailotp-login/), email notifications, and account recovery.

## Configure the email sender (globally)

Follow the steps given below to enable the email sender globally for all tenants in your WSO2 IS.

1. Shut down the server if it is running.
2. Add the following properties to the `deployment.toml` file in the `IS_HOME/repository/conf` folder to configure the email server.

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
          Authentication type to use when sending the email. Identity Server support <code>BASIC</code> and <code>CLIENT_CREDENTIAL</code> authentication types.
          <br/> For <code>BASIC</code> you need to configure <code>username</code> and <code>password</code>. 
          <br/> For <code>CLIENT_CREDENTIAL</code> you need to configure <code>client_id</code>, <code>client_secret</code>, <code>token_endpoint</code> and  <code>scopes</code>.
          Identity Server supports <code>CLIENT_CREDENTIAL</code> authentication with Microsoft 365 Exchange Online.
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
        <td>Provide the password of the SMTP account. <br/> Password of the mail you have provided in <strong>from_address</strong>.</td>
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
        <td>Signature of the sender account.</td>
      </tr>
    </table>

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

## Configure the email sender (per tenant)

Follow the steps given below to enable the email sender per tenant.

1. On the WSO2 Identity Server Console, go to **Notification Channels** > **Email Provider**.
2. Provide the required details.

    ![Configure Email Provider]({{base_path}}/assets/img/notification-channels/email-provider/configure-email-provider.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

3. Click **Update**.

4. Since these configurations will be applicable during the tenant loading process, [configure tenant loading and 
unloading for your tenant]({{base_path}}/guides/tenants/configure-the-tenant-loading-policy).
