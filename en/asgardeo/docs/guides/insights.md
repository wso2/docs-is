# Insights

Asgardeo provides built-in identity **Insights** that let administrators and organization owners analyze the identity activity of their organization, such as logins, registrations, token issuance, and more.

Insights are available **out of the box**. When your Asgardeo organization is created, Asgardeo automatically provisions a dedicated analytics workspace for your organization and begins publishing your identity events to it. The resulting dashboards are then embedded directly in the **Insights** section of the Asgardeo Console — there is nothing to install, configure, or enable.

## View your insights

To view the insights of your organization:

1. On the Asgardeo Console, go to **Insights**.

2. Explore the available dashboards to analyze activities such as logins, registrations, and token issuance for your organization.

3. Use the duration selector to adjust the time period shown in the dashboards.

![Asgardeo Insights dashboard]({{base_path}}/assets/img/guides/insights/insights-dashboard.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Data retention

By default, your identity analytics data is retained for **3 months**. Insights dashboards reflect activity within this retention window.

If you require **longer data retention** or **additional, customizable dashboards**, you can move to a dedicated [Moesif](https://www.moesif.com/price){:target="_blank"} subscription. With your own Moesif subscription you gain extended retention and the ability to build and customize your own dashboards on top of your identity data.

## Insights and your subscription tier

The depth of the built-in insights available to you depends on your **Asgardeo subscription tier**. Higher tiers unlock more advanced, built-in analytics and dashboards. As you move to a higher Asgardeo tier, additional insights become available automatically in the **Insights** section.

## Data published for insights

During your Asgardeo organization creation, Asgardeo provisions an analytics workspace for your organization and begins publishing identity events to it. These events are used to build the dashboards shown in the **Insights** section.

The following identity events are published. Each event includes contextual attributes about the activity, which may include personal data such as the end user's email, login identifiers (for example, mobile number or NIC where used as login attributes), IP address, and user agent.

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Description</th>
      <th>Key attributes published</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Authentication</b></td>
      <td>Captures user login attempts and the outcome of each authentication step.</td>
      <td>Timestamp, username, user ID, user store domain, organization, application, connection (identity provider), authentication step and authenticator, step result (success/failure), session ID, inbound protocol, IP address, and user agent.</td>
    </tr>
    <tr>
      <td><b>Session</b></td>
      <td>Captures the lifecycle of user sessions (creation, update, and termination).</td>
      <td>Timestamp, session ID, session duration, termination reason, user ID, username, organization, application, connection, session action, and active session count.</td>
    </tr>
    <tr>
      <td><b>Token issuance</b></td>
      <td>Captures OAuth2/OpenID Connect token issuance, including machine-to-machine (M2M) tokens.</td>
      <td>Timestamp, application (client ID), grant type, user type, user ID and username, user store, issuing and accessing organization, authorized and unauthorized scopes, access/refresh token validity, token ID, whether an existing token was reused, sub-organization request indicator, IP address, and error details (on failure).</td>
    </tr>
    <tr>
      <td><b>Registration</b></td>
      <td>Captures user account creation.</td>
      <td>User created timestamp, user store domain, organization, onboarding method (administrator-initiated, self sign-up, or invitation), user ID, and user agent.</td>
    </tr>
    <tr>
      <td><b>Flow</b></td>
      <td>Captures step-by-step execution of self-registration, password recovery, and invited-user registration flows, enabling funnel analysis. Steps that occur before the user account exists are tracked under an anonymous identifier, which is linked to the resulting user once the flow completes.</td>
      <td>Flow type, step type, node ID and type, context ID, organization, node response status and type, application ID, executor name, cross-organization indicator, timestamp, and error code.</td>
    </tr>
    <tr>
      <td><b>Organization switch</b></td>
      <td>Captures when a user switches into (accesses) an organization in a B2B setup.</td>
      <td>User's resident (home) organization, accessing organization, application, application tenant, tenant, error code, and timestamp.</td>
    </tr>
  </tbody>
</table>

!!! note
    More event types may be added over time as additional insights become available.

## Insights for sub-organizations

Sub-organization-level insights are published against the **root organization**. This means activity that occurs within your sub-organizations is captured under your root organization's analytics workspace, and you can use this data to analyze and build insights for your sub-organizations as well.
