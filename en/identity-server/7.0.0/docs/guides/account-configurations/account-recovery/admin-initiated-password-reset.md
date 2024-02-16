# Admin initiated password reset

Provide administrators with the ability to initiate a password reset process for users in {{product_name}}.

## Configuration instructions

To set up admin initiated password reset, follow these instructions:

1. In the {{product_name}} Console, go to **Login & Registration** > **Account Recovery** > **Admin Initiated 
   Password Reset**.
2. Check the option to **Enable password reset via recovery email** if you want users to reset their password through a recovery link sent via email.
3. Click **Update** to save the changes.

![Admin Initiated Password Reset Configuration]({{base_path}}/assets/img/guides/account-configurations/admin-initiated-password-reset.png){: width="600" style="display: block; margin: 0;"}

## Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Enable Password Reset via Recovery Email</code></td>
    <td>When enabled, allows users to reset their password through a link sent to their email.</td>
  </tr>
</table>
