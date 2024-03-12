# Password recovery

Enable self-service password recovery for users, providing a secure method to reset passwords on the login page of {{product_name}}.

## Configuration instructions

To configure password recovery, follow these steps:

1. In the {{product_name}} Console, go to **Login & Registration** > **Account Recovery** > **Password Recovery**.
2. Toggle the switch to enable passwords recovery option to allow users to recover their passwords.
3. Check **Notify on successful recovery** to send a confirmation email upon successful password reset.
4. Set the **Recovery link expiry time** to determine how long the password recovery link remains valid.
5. Click **Update** to save the changes.

![Password Recovery Configuration]({{base_path}}/assets/img/guides/account-configurations/password-recovery.png){: width="800" style="display: block; margin: 0;"}

## Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Notify on Successful Recovery</code></td>
    <td>When checked, the user will be notified via email after a successful password recovery.</td>
  </tr>
  <tr>
    <td><code>Recovery Link Expiry Time</code></td>
    <td>Time in minutes until the password recovery link expires.</td>
  </tr>
</table>
