# Moesif Analytics

WSO2 Identity Server can publish identity events to [Moesif](https://www.moesif.com/price){:target="_blank"}, a SaaS analytics platform, so that you can build dashboards and analyze the identity activity of your deployment — such as logins, registrations, token issuance, and more.

You manage your own Moesif subscription. You connect your WSO2 Identity Server tenants to your Moesif account, choose which data to publish, and build your own dashboards in Moesif on top of the published data.

## How it works

1. You enable the Moesif integration in WSO2 Identity Server by adding a set of configurations to the `deployment.toml` file. Once these are added, an **Insights** tab becomes visible in the WSO2 Identity Server Console.
2. From the **Insights** settings page in the Console, each tenant configures their Moesif **collector key** and enables the data publishers they need. This is a **per-tenant (tenanted) configuration** — each tenant publishes to its own Moesif workspace.
3. WSO2 Identity Server publishes the selected identity events to Moesif.
4. You build and view your own dashboards in Moesif based on the published data.

!!! note
    Sample / pre-built dashboards are planned for a future release but are **not yet available**. For now, you create your own dashboards in Moesif based on the published data.

## Prerequisites

- A Moesif account and subscription. You are responsible for managing your own Moesif subscription, data retention, and access.
- Access to your WSO2 Identity Server `deployment.toml` file to enable the integration.

## Step 1: Enable the Moesif integration

To make the **Insights** tab visible in the Console and enable Moesif publishing, add the following configurations to the `deployment.toml` file of your WSO2 Identity Server and restart the server.

```toml
[analytics.moesif]
enabled = true
provider_url = "https://api.moesif.net/v1"
auth_type = "API_KEY"
api_key_header = "X-Moesif-Application-Id"
stream_version = "1.0.0"
```

!!! note
    `provider_url` is the base URL events are published to. The integration appends the
    Moesif API path (for example `/actions` or `/users`) per event, so configure the base
    URL without a trailing API path. If you publish through an intermediary (for example,
    an event gateway), point `provider_url` at it instead.

The following data publishers are available. You can enable the publishers you need (these can also be enabled per tenant from the **Insights** settings page in the Console):

```toml
[identity_mgt.events.schemes.moesifUserAuthenticationPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifUserRegistrationPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifFlowPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifOrgSwitchPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifUserSessionPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifOAuthTokenIssuancePublisher.properties]
enable = true
```

Once these configurations are added and the server is restarted, the **Insights** tab appears in the WSO2 Identity Server Console.

## Step 2: Obtain your Moesif collector key

The **collector key** (also called the Application Id) is the write-only key that WSO2 Identity Server uses to publish events to your Moesif workspace. To obtain it:

1. Log in to the [Moesif portal](https://www.moesif.com/){:target="_blank"}.

2. Go to your workspace settings and open the **Collector Application Ids** (API keys) section.

3. Copy the **Collector Application Id** for the workspace you want WSO2 Identity Server to publish to.

![Obtain the Moesif collector key]({{base_path}}/assets/img/guides/analytics/moesif-analytics/moesif-collector-key.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    The collector key is a **write-only** key used only to send events to Moesif. Keep a separate collector key per tenant if you want to keep each tenant's analytics data in its own Moesif workspace.

## Step 3: Configure Moesif for a tenant

After the integration is enabled, each tenant configures its own connection to Moesif from the Console:

1. On the WSO2 Identity Server Console, go to **Insights**.

2. On the Insights settings page, enter the Moesif **collector key** you obtained in Step 2 for this tenant.

3. Enable the data publishers you want for this tenant (authentication, session, token issuance, registration, flow, and organization switch).

4. Save the configuration.

![Moesif Insights settings page]({{base_path}}/assets/img/guides/analytics/moesif-analytics/insights-settings.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    Configuration is **per tenant**. Each tenant publishes data to its own Moesif workspace using its own collector key, so you can keep each tenant's analytics data separate.

## Step 4: Build dashboards in Moesif

Once data starts flowing into Moesif, you can create your own dashboards in the Moesif console based on the published data. Use the attributes published with each event (described below) to build the visualizations and reports you need.

## Data published to Moesif

The following identity events can be published to Moesif. Each event includes contextual attributes about the activity, which may include personal data such as the end user's email, login identifiers (for example, mobile number or NIC where used as login attributes), IP address, and user agent.

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Publisher</th>
      <th>Description</th>
      <th>Key attributes published</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><b>Authentication</b></td>
      <td><code>moesifUserAuthenticationPublisher</code></td>
      <td>Captures user login attempts and the outcome of each authentication step.</td>
      <td>Timestamp, username, user ID, user store domain, tenant/organization, application (service provider), connection (identity provider), authentication step and authenticator, step result (success/failure), session ID, inbound protocol, IP address, and user agent.</td>
    </tr>
    <tr>
      <td><b>Session</b></td>
      <td><code>moesifSessionPublisher</code></td>
      <td>Captures the lifecycle of user sessions (creation, update, and termination).</td>
      <td>Timestamp, session ID, session duration, termination reason, user ID, username, tenant/organization, service provider, identity provider, session action, and active session count.</td>
    </tr>
    <tr>
      <td><b>Token issuance</b></td>
      <td><code>moesifTokenPublisher</code></td>
      <td>Captures OAuth2/OpenID Connect token issuance, including machine-to-machine (M2M) tokens.</td>
      <td>Timestamp, application (client ID), grant type, user type, user ID and username, user store, issuing and accessing organization, authorized and unauthorized scopes, access/refresh token validity, token ID, whether an existing token was reused, sub-organization request indicator, IP address, and error details (on failure).</td>
    </tr>
    <tr>
      <td><b>Registration</b></td>
      <td><code>moesifUserRegistrationPublisher</code></td>
      <td>Captures user account creation.</td>
      <td>User created timestamp, user store domain, tenant/organization, onboarding method (administrator-initiated, self sign-up, or invitation), user ID, and user agent.</td>
    </tr>
    <tr>
      <td><b>Flow</b></td>
      <td><code>moesifFlowPublisher</code></td>
      <td>Captures step-by-step execution of self-registration, password recovery, and invited-user registration flows, enabling funnel analysis.</td>
      <td>Flow type, step type, node ID and type, context ID, tenant/organization, node response status and type, application ID, executor name, cross-organization indicator, timestamp, and error code.</td>
    </tr>
    <tr>
      <td><b>Organization switch</b></td>
      <td><code>moesifOrgSwitchPublisher</code></td>
      <td>Captures when a user switches into (accesses) an organization in a B2B setup.</td>
      <td>User's resident (home) organization, accessing organization, application, application tenant, tenant, error code, and timestamp.</td>
    </tr>
  </tbody>
</table>

!!! note
    More event types may be added over time.

## Insights for sub-organizations

Sub-organization-level events are published against the **root organization**. Activity that occurs within sub-organizations is captured under the root organization's Moesif workspace, so you can use this data to build dashboards for your sub-organizations as well.
