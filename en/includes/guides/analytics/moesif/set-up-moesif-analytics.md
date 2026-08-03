# Set up Moesif analytics

{{ product_name }} can publish identity events - logins, sign-ups, sessions, tokens, and more - to [Moesif](https://www.moesif.com/){:target="_blank"}, a software-as-a-service (SaaS) analytics platform in the WSO2 product family. Once the events are flowing, you build the charts and dashboards you want in Moesif on top of them.

You bring your own Moesif subscription and stay in control of it. You own the account, set the retention period, and decide who can see the data. Each {{ product_name }} tenant connects to Moesif separately, so every tenant can keep its analytics in its own workspace.

!!! note "About pre-built dashboards"
    {{ product_name }} does not yet ship sample dashboards for Moesif. They are planned for a future release. For now you create the dashboards you need in Moesif, using the events described in [Data published to Moesif]({{base_path}}/guides/analytics/moesif/data-published-to-moesif/).

## Before you begin

You will need:

- A Moesif account. If you do not have one, [sign up for Moesif](https://www.moesif.com/wrap){:target="_blank"}. See [Moesif pricing](https://www.moesif.com/price){:target="_blank"} for the available plans.
- Access to the `deployment.toml` file of your {{ product_name }} deployment, and the ability to restart the server.
- Administrator access to the {{ product_name }} Console for each tenant you want to connect.

## Step 1: Create your Moesif workspace

Log in to Moesif and create the workspace that will receive your identity events. If you want to keep tenants separate, create one workspace per tenant.

## Step 2: Copy your collector Application Id

The **collector Application Id** is the write-only key {{ product_name }} uses to send events into your workspace. To find it:

1. Log in to the [Moesif portal](https://www.moesif.com/){:target="_blank"}.

2. Open the menu at the bottom left of the screen (it shows your name) and select **API Keys**.

3. Copy the value under **Collector Application Id**.

![Copy the Moesif collector Application Id]({{base_path}}/assets/img/guides/analytics/moesif/moesif-collector-key.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! warning "Keep the two key types apart"
    The collector Application Id is **write-only** - it can send events, but it cannot read your data. The Management API key on the same page *can* read your data. Only ever give {{ product_name }} the collector Application Id.

If you want each tenant's data in its own workspace, repeat this step per workspace and keep the keys separate. You will paste one key per tenant in Step 5.

## Step 3: Turn on the integration

Add the following to the `deployment.toml` file of your {{ product_name }} deployment:

```toml
[analytics.moesif]
enabled = true
provider_url = "https://api.moesif.net/v1"
auth_type = "API_KEY"
api_key_header = "X-Moesif-Application-Id"
stream_version = "1.0.0"
```

<table>
  <thead>
    <tr>
      <th>Property</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>enabled</code></td>
      <td>Turns the integration on and makes the <b>Insights</b> page available in the Console.</td>
    </tr>
    <tr>
      <td><code>provider_url</code></td>
      <td>Base URL events are published to. Use the Moesif collector base URL shown above.</td>
    </tr>
    <tr>
      <td><code>auth_type</code></td>
      <td>Authentication method used against the collector. Moesif uses API key authentication.</td>
    </tr>
    <tr>
      <td><code>api_key_header</code></td>
      <td>HTTP header the collector Application Id is sent in.</td>
    </tr>
    <tr>
      <td><code>stream_version</code></td>
      <td>Version of the event streams published by {{ product_name }}.</td>
    </tr>
  </tbody>
</table>

!!! note "Setting `provider_url`"
    {{ product_name }} appends the Moesif API path to this base URL per event, for example `/actions` or `/users`, so configure the base URL **without** a trailing API path. If you publish through an intermediary such as an event gateway, point `provider_url` at the intermediary instead.

## Step 4: Choose which events to publish

Each event category has its own publisher. Add an entry for every category you want to publish:

```toml
[identity_mgt.events.schemes.moesifUserAuthenticationPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifUserRegistrationPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifUserSessionPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifOAuthTokenIssuancePublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifFlowPublisher.properties]
enable = true

[identity_mgt.events.schemes.moesifOrgSwitchPublisher.properties]
enable = true
```

<table>
  <thead>
    <tr>
      <th>Publisher</th>
      <th>Publishes</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>moesifUserAuthenticationPublisher</code></td>
      <td>Login attempts and the outcome of each authentication step.</td>
    </tr>
    <tr>
      <td><code>moesifUserRegistrationPublisher</code></td>
      <td>User account creation.</td>
    </tr>
    <tr>
      <td><code>moesifUserSessionPublisher</code></td>
      <td>Session creation, update, and termination.</td>
    </tr>
    <tr>
      <td><code>moesifOAuthTokenIssuancePublisher</code></td>
      <td>OAuth2 and OpenID Connect token issuance, including M2M tokens.</td>
    </tr>
    <tr>
      <td><code>moesifFlowPublisher</code></td>
      <td>Step-by-step execution of self-registration, password recovery, and invited-user registration flows.</td>
    </tr>
    <tr>
      <td><code>moesifOrgSwitchPublisher</code></td>
      <td>Users switching into an organization in a business-to-business (B2B) setup.</td>
    </tr>
  </tbody>
</table>

All publishers are off by default, so add an entry for each category you want available. Leaving out the categories you do not need is the simplest way to limit what leaves your deployment. For exactly what each category contains, see [Data published to Moesif]({{base_path}}/guides/analytics/moesif/data-published-to-moesif/).

Now **restart the server**. The **Insights** page appears in the Console once it comes back up.

## Step 5: Connect a tenant to Moesif

Repeat this step for each tenant you want to publish analytics for.

1. Log in to the {{ product_name }} Console as an administrator of the tenant.

2. Go to **Insights**. The **Analytics** settings page opens.

3. Under **Collector API Key**, paste the Moesif collector Application Id you copied in Step 2.

4. Under **Event Publishers**, select the events this tenant should publish: **Authentication**, **Registration**, **Flow**, **Organization Switch**, **Token**, and **Session**.

5. Click **Enable**.

![Configure Moesif on the Analytics settings page]({{base_path}}/assets/img/guides/analytics/moesif/insights-settings-page.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    This configuration is per tenant. Each tenant uses its own collector API key, so pointing two tenants at two different Moesif workspaces keeps their analytics fully separate.

All six publishers are always listed here. Selecting one takes effect only when the same publisher is enabled in `deployment.toml` (Step 4).

To change the key later, enter the new value and click **Update**. The stored key is never displayed back to you, so leave the field blank to keep the current key while changing which publishers are selected.

## Step 6: Confirm data is arriving

Trigger some activity - log in to an application in that tenant, or create a test user - then open your Moesif workspace and check the **Live Event Log**. Events should appear within a few seconds.

If nothing shows up, work back through the chain:

- Is the publisher for that event category enabled in `deployment.toml` (Step 4) *and* selected on the Insights page (Step 5)?
- Was the server restarted after the `deployment.toml` change?
- Is the collector Application Id correct, and does it belong to the workspace you are looking at?
- Can the server reach `provider_url`? Check for outbound network or proxy restrictions.

## Step 7: Build your dashboards

With events flowing, create the charts you need in Moesif. [Data published to Moesif]({{base_path}}/guides/analytics/moesif/data-published-to-moesif/) lists every event and every attribute available to filter and group by, which is the reference you will want open while building.

A few dashboards worth starting with:

- **Logins** - successful versus failed logins over time, broken down by application and connection.
- **Sign-ups** - new accounts over time, split by `userOnboardedMethod` to separate self sign-ups from invitations.
- **Tokens** - token issuance by grant type and application, with machine-to-machine traffic isolated by `userType`.
- **Funnels** - flow events grouped by `currentNodeId` to find where users abandon sign-up or password recovery.

## Stop publishing for a tenant

To disconnect a tenant from Moesif, go to **Insights** in that tenant's Console and, under **Danger Zone**, click **Remove Configuration** and confirm. This deletes the stored collector API key and turns off every publisher for the tenant. Data already sent to Moesif stays in your Moesif workspace and is yours to manage or delete there.

To turn the integration off for the whole server, set `enabled = false` under `[analytics.moesif]` in `deployment.toml` and restart.
