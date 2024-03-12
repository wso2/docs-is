# Configure password recovery

{{ product_name }} provides the support for self-service password recovery option for [users]({{base_path}}/guides/users/manage-users/) on the login page. The user will receive a password reset link via email upon request.
This guide walks you through setting up password recovery for users to recover a lost or forgotten password.

To configure password recovery:

1. On the {{ product_name }} Console, click **Account Recovery**.

    The **Password Recovery** section indicates whether or not it is already enabled.

3. Click **Configure** to open the **Password Recovery** page.

4. Turn on **Enabled** to enable this configuration.

    ![Configure password recovery]({{base_path}}/assets/img/guides/organization/account-recovery/password-recovery/configure-password-recovery.png){: width="600" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

5. Configure the below settings if you want to change the default password recovery configurations.
    <table>
          <tbody>
             <tr>
                  <td><b>Notify on successful recovery</b></td>
                  <td>Specifies whether to notify the user via an email when password recovery is successful.</td>
             </tr>
             <tr>
                <td><b>Recovery link expiry time</b></td>
                <td>Specifies password recovery link expiry time in minutes. If you enter 60 min, the password recovery email notification will expire after 60 min.</td>
           </tr>
          </tbody>
       </table>

6. Click **Update** once you configure the required settings.  

[Try self-service password recovery]({{base_path}}/guides/user-self-service/user-password-recovery/).
