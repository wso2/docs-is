# Session management

{% if product_name == "Asgardeo" %}
!!! note "Premium feature"
    Only customers on the enterprise tier can access this feature.
{% endif %}

Customize session timeout and remember me settings to maintain optimal security and user experience in {{product_name}}.

## Configuration instructions

To adjust session management settings, follow these steps:

1. On the {{product_name}} Console, go to **Login & Registration** > **Login Security** > **Session Management**.
2. Configure the **Idle Session Timeout** and **Remember Me Period** to suit your security policies.
{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
3. To enforce an absolute session lifetime, select **Enable Maximum Session Timeout** and configure the **Maximum Session Timeout**.
4. Click **Update** to save the changes.
{% else %}
3. Click **Update** to save the changes.
{% endif %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
![Session Management Configuration]({{base_path}}/assets/img/guides/account-configurations/session-management-with-max-timeout.png){: width="800" style="display: block; margin: 0;"}
{% else %}
![Session Management Configuration]({{base_path}}/assets/img/guides/account-configurations/session-management.png){: width="800" style="display: block; margin: 0;"}
{% endif %}

## Parameters

<table>
  <tr>
    <th>Parameter</th>
    <th>Description</th>
  </tr>
  <tr>
    <td><code>Idle Session Timeout</code></td>
    <td>Time in minutes before an inactive user session is automatically ended.</td>
  </tr>
  <tr>
    <td><code>Remember Me Period</code></td>
    <td>Duration in minutes that the system will remember a user's session.</td>
  </tr>
{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
  <tr>
    <td><code>Enable Maximum Session Timeout</code></td>
    <td>
      When enabled, enforces an absolute maximum lifetime for user sessions regardless of user activity or a valid remember me token. This setting is disabled by default.
    </td>
  </tr>
  <tr>
    <td><code>Maximum Session Timeout</code></td>
    <td>The maximum duration in minutes a user session can remain active. The default value is <code>43200</code> minutes (30 days). This setting is applicable only when <strong>Enable Maximum Session Timeout</strong> is selected.</td>
  </tr>
{% endif %}
</table>

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}
!!! important
    When **Enable Maximum Session Timeout** is turned on, users must re-authenticate after the configured maximum session lifetime expires, even if the idle session timeout or the remember me period has not elapsed.
{% endif %}

{% if product_name == "Asgardeo" or (product_name == "WSO2 Identity Server" and is_version > "7.2.0") %}

## Maximum session timeout

The maximum session timeout enforces an absolute upper bound on how long a user session can remain active. Unlike the idle session timeout, which resets on user activity, the maximum session timeout counts from the moment the session is created.

When both are configured, the following rules apply:

- If the idle session timeout expires first, the session ends and the user must sign in again.
- If the maximum session timeout expires first, the user must re-authenticate even if they have been continuously active.
- The remember me feature does not extend a session beyond the maximum session timeout.
{% endif %}
