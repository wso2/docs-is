# Data published to Moesif

To build your analytics dashboards, {{ product_name }} sends a record of identity activity - logins, sign-ups, sessions, tokens, and more - to [Moesif](https://www.moesif.com/){:target="_blank"}.

This page tells you exactly what is sent. Use it to understand what your dashboards can show you, to answer privacy and compliance questions about your users' data, and, if you are building your own charts in Moesif, to find the attribute you need to filter or group by.

!!! note
    This page evolves. Each time a new dashboard or insight is added, the events behind it are added here too.

## What gets sent, at a glance

Six kinds of events are published. Each one answers a different question about your organization.

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>Sent when</th>
      <th>Helps you answer</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><a href="#logins">Login</a></td>
      <td>A user tries to log in, at every step of the login flow.</td>
      <td>How many people are logging in, how often logins fail and why, which connections and multi-factor authentication (MFA) methods are actually used.</td>
    </tr>
    <tr>
      <td><a href="#sign-ups">Sign-up</a></td>
      <td>A user account is created.</td>
      <td>How fast you are growing, and whether new users arrive through self sign-up, invitations, or an administrator.</td>
    </tr>
    <tr>
      <td><a href="#sessions">Session</a></td>
      <td>A session starts, is refreshed, or ends.</td>
      <td>How many users are active right now, how long sessions last, and why they end.</td>
    </tr>
    <tr>
      <td><a href="#tokens">Token issuance</a></td>
      <td>An OAuth2 or OpenID Connect token is issued, or a token request fails.</td>
      <td>Which applications consume tokens, which grant types they use, and how much machine-to-machine traffic you have.</td>
    </tr>
    <tr>
      <td><a href="#flows">Flow step</a></td>
      <td>Each step of a self-registration, password recovery, or invited-user registration flow.</td>
      <td>Where users drop out of your sign-up and recovery funnels.</td>
    </tr>
    <tr>
      <td><a href="#organization-switches">Organization switch</a></td>
      <td>A user switches into an organization in a business-to-business (B2B) setup.</td>
      <td>Which organizations your users actually work in.</td>
    </tr>
  </tbody>
</table>

## What personal data is included

These events describe real people, so they carry personal data. Across the events, the following may be published:

- **Who the user is** - their username and unique user ID, the user store they belong to, and any attribute you use as a login identifier, such as an email address, mobile number, or national identity number. Login events additionally carry the roles assigned to the user.
- **Where they connected from** - their IP address and the user agent of their browser or app.
- **What they were doing** - the organization, application, and connection involved in the activity.

A few things are deliberately **not** sent:

- No passwords, no one-time passcodes (OTPs), and no credentials of any kind.
- No token values. Tokens are identified by an ID only, never by their contents.
- No user profile attributes other than those listed above. Nothing else is read from the user's profile.

{% if is_version is defined %}
You decide which of these events are published. If a category is not useful to you, leave its publisher off. See [Set up Moesif analytics]({{base_path}}/guides/analytics/moesif/).
{% else %}
For where this data is stored and how long it is kept, see [Data residency]({{base_path}}/references/data-residency-in-asgardeo/#analytics-data).
{% endif %}

## How an event is shaped

Every event arrives in Moesif in the same envelope, sent to the Moesif [Actions API](https://www.moesif.com/docs/api?openapi_version=2#actions){:target="_blank"}:

```json
{
  "actionName": "User-Authentication",
  "userId": "<user ID>",
  "companyId": "<organization ID>",
  "request": {
    "time": "<event timestamp>",
    "ipAddress": "<end user IP address>"
  },
  "metadata": {
    "...": "attributes specific to this event type"
  }
}
```

- `actionName` tells you which kind of event it is. Filter on this in Moesif to isolate one event type.
- `userId` and `companyId` are how Moesif groups activity by user and by organization. `userId` is left out when the event happens before a user can be identified, such as a login that fails at the username step.
- Everything else lives under `metadata` - that is where the attributes listed below appear.
- The user agent travels as the `User-Agent` header of the request, not in the body.

Two conventions are worth knowing when you build charts:

- An attribute that could not be resolved for a particular event carries the literal value `NOT_AVAILABLE` rather than being dropped, so exclude that value when you aggregate.
- Most timestamps are ISO-8601 strings. The exceptions are epoch milliseconds: `_timestamp` on login and session events, and `createdTimestamp`, `updatedTimestamp`, and `terminationTimestamp` on session events. Each row below states the unit.

## Logins

Login events are the busiest stream. One event is published for each **step** of a login flow, and one for the **overall outcome**, so a two-factor login produces several events that share the same `contextId`.

**`actionName`:** `User-Authentication`

The attributes you will reach for most often are `authenticationSuccess` (did the login work), `serviceProvider` (which application), `stepAuthenticator` (which factor), `identityProvider` (which connection), and `errorCode` (why it failed).

??? note "All login attributes"
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>contextId</code></td><td>Correlates every step of a single login attempt. Group by this to reconstruct one user's login journey.</td></tr>
        <tr><td><code>eventId</code></td><td>Unique ID of this event.</td></tr>
        <tr><td><code>eventType</code></td><td>Whether this event reports a single step or the overall authentication outcome.</td></tr>
        <tr><td><code>authenticationSuccess</code></td><td>Whether the overall login succeeded.</td></tr>
        <tr><td><code>authStepSuccess</code></td><td>Whether this individual step succeeded.</td></tr>
        <tr><td><code>authenticationStep</code></td><td>Step number in the login flow that this event reports on.</td></tr>
        <tr><td><code>stepAuthenticator</code></td><td>Authenticator used at this step, such as username and password, or an MFA authenticator.</td></tr>
        <tr><td><code>identityProvider</code></td><td>Connection used at this step.</td></tr>
        <tr><td><code>identityProviderType</code></td><td>Whether that connection is local or federated.</td></tr>
        <tr><td><code>identityProviders</code></td><td>All connections involved in the login flow.</td></tr>
        <tr><td><code>authenticators</code></td><td>All authenticators involved in the login flow.</td></tr>
        <tr><td><code>username</code></td><td>Fully qualified username of the user.</td></tr>
        <tr><td><code>localUserName</code></td><td>Username of the user in the local user store.</td></tr>
        <tr><td><code>usernameUserInput</code></td><td>Identifier the user actually typed at the login screen. This may be an email address, mobile number, or another login identifier.</td></tr>
        <tr><td><code>userStoreDomain</code></td><td>User store domain the user belongs to.</td></tr>
        <tr><td><code>rolesCommaSeparated</code></td><td>Roles assigned to the user, as a comma-separated list.</td></tr>
        <tr><td><code>isFirstLogin</code></td><td>Whether this is the user's first login.</td></tr>
        <tr><td><code>serviceProvider</code></td><td>Application the user logged in to.</td></tr>
        <tr><td><code>inboundAuthType</code></td><td>Protocol the application used, such as OAuth2/OIDC or SAML.</td></tr>
        <tr><td><code>tenantDomain</code></td><td>Organization the login belongs to.</td></tr>
        <tr><td><code>userResidingOrgId</code></td><td>Organization the user is resident in.</td></tr>
        <tr><td><code>userAccessingOrgId</code></td><td>Organization the user is accessing.</td></tr>
        <tr><td><code>spResidingOrgId</code></td><td>Organization the application is resident in.</td></tr>
        <tr><td><code>isOrganizationLogin</code></td><td>Whether the login happened in an organization (B2B) context.</td></tr>
        <tr><td><code>isSharedAppLogin</code></td><td>Whether the login was to an application shared with an organization.</td></tr>
        <tr><td><code>remoteIp</code></td><td>IP address the login came from.</td></tr>
        <tr><td><code>region</code></td><td>Region resolved for the login.</td></tr>
        <tr><td><code>rememberMeEnabled</code></td><td>Whether the user selected "remember me".</td></tr>
        <tr><td><code>forceAuthEnabled</code></td><td>Whether the application forced re-authentication.</td></tr>
        <tr><td><code>passiveAuthEnabled</code></td><td>Whether this was a passive authentication request.</td></tr>
        <tr><td><code>duration</code></td><td>How long the authentication took, in milliseconds.</td></tr>
        <tr><td><code>errorCode</code></td><td>Error code, when the login or step failed.</td></tr>
        <tr><td><code>_timestamp</code></td><td>When the event was recorded, in epoch milliseconds.</td></tr>
        <tr><td><code>customParam1</code> to <code>customParam5</code></td><td>Reserved for custom values added through extensions. Empty unless an extension populates them.</td></tr>
      </tbody>
    </table>

## Sign-ups

One event per account created, whichever way the account came into existence.

**`actionName`:** `User-Registration`

`userOnboardedMethod` is the attribute that makes this stream useful: it separates self sign-ups from invitations and administrator-created accounts.

??? note "All sign-up attributes"
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>eventId</code></td><td>Unique ID of this event.</td></tr>
        <tr><td><code>createdTimeStamp</code></td><td>When the account was created, as an ISO-8601 string.</td></tr>
        <tr><td><code>userOnboardedMethod</code></td><td>How the account was onboarded: <code>SELF_SIGNUP</code>, <code>USER_INVITE</code>, or <code>ADMIN_INITIATED</code>.</td></tr>
        <tr><td><code>userstoreDomain</code></td><td>User store the account was created in.</td></tr>
        <tr><td><code>tenantDomain</code></td><td>Organization the account belongs to.</td></tr>
        <tr><td><code>userResidingOrgId</code></td><td>Organization the user is resident in.</td></tr>
      </tbody>
    </table>

## Sessions

Three events per session: one when it is created, one each time it is updated, and one when it ends.

**`actionName`:** `User-Session`

Use `action` to tell those three apart, `activeSessionCount` for concurrency, and the timestamps to work out how long sessions live.

??? note "All session attributes"
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>sessionId</code></td><td>Unique ID of the session.</td></tr>
        <tr><td><code>action</code></td><td>Which part of the lifecycle this event reports: creation, update, or termination.</td></tr>
        <tr><td><code>createdTimestamp</code></td><td>When the session was created, in epoch milliseconds.</td></tr>
        <tr><td><code>updatedTimestamp</code></td><td>When the session was last updated, in epoch milliseconds.</td></tr>
        <tr><td><code>terminationTimestamp</code></td><td>When the session ended, in epoch milliseconds.</td></tr>
        <tr><td><code>activeSessionCount</code></td><td>How many sessions the user holds at this moment.</td></tr>
        <tr><td><code>username</code></td><td>Username of the session owner.</td></tr>
        <tr><td><code>userStoreDomain</code></td><td>User store domain the user belongs to.</td></tr>
        <tr><td><code>tenantDomain</code></td><td>Organization the session belongs to.</td></tr>
        <tr><td><code>serviceProvider</code></td><td>Application the session was established for.</td></tr>
        <tr><td><code>identityProviders</code></td><td>Connections involved in establishing the session.</td></tr>
        <tr><td><code>remoteIp</code></td><td>IP address the session came from.</td></tr>
        <tr><td><code>region</code></td><td>Region resolved for the session.</td></tr>
        <tr><td><code>userAgent</code></td><td>User agent of the browser or client that established the session.</td></tr>
        <tr><td><code>rememberMeEnabled</code></td><td>Whether the session was established with "remember me".</td></tr>
        <tr><td><code>_timestamp</code></td><td>When the event was recorded, in epoch milliseconds.</td></tr>
      </tbody>
    </table>

## Tokens

One event per token request, successful or not. Machine-to-machine (M2M) tokens are included.

**`actionName`:** `OAuth-Token-Issuance`

`grantType`, `clientId`, and `userType` are what most token dashboards are built on. `existingTokenUsed` is worth knowing about: it tells you the request was served from an existing valid token rather than issuing a new one, which is why token counts and login counts do not line up.

!!! warning "No token values are published"
    Only `tokenId`, an opaque identifier, is sent. The access token, refresh token, and ID token contents never leave {{ product_name }}.

??? note "All token attributes"
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>clientId</code></td><td>Client ID of the application the token was issued to.</td></tr>
        <tr><td><code>grantType</code></td><td>OAuth2 grant type used.</td></tr>
        <tr><td><code>userType</code></td><td>Whether the token was issued for an end user or an application.</td></tr>
        <tr><td><code>userId</code></td><td>Unique ID of the user the token was issued for.</td></tr>
        <tr><td><code>userName</code></td><td>Username of the user the token was issued for.</td></tr>
        <tr><td><code>userStoreDomain</code></td><td>User store domain the user belongs to.</td></tr>
        <tr><td><code>actor</code></td><td>Acting identity behind the request, when a token is requested on behalf of another identity.</td></tr>
        <tr><td><code>tokenId</code></td><td>Identifier of the issued token. Not the token itself.</td></tr>
        <tr><td><code>iat</code></td><td>When the token was issued, as an ISO-8601 string.</td></tr>
        <tr><td><code>authorizedScopes</code></td><td>Scopes granted to the token.</td></tr>
        <tr><td><code>unauthorizedScopes</code></td><td>Scopes requested but not granted.</td></tr>
        <tr><td><code>accessTokenValidityMillis</code></td><td>Access token validity, in milliseconds.</td></tr>
        <tr><td><code>refreshTokenValidityMillis</code></td><td>Refresh token validity, in milliseconds.</td></tr>
        <tr><td><code>existingTokenUsed</code></td><td>Whether an existing valid token was returned instead of issuing a new one.</td></tr>
        <tr><td><code>tenantDomain</code></td><td>Organization the request belongs to.</td></tr>
        <tr><td><code>rootTenantDomain</code></td><td>Root organization of the request.</td></tr>
        <tr><td><code>issuerOrganizationId</code></td><td>Organization that issued the token.</td></tr>
        <tr><td><code>accessingOrganizationId</code></td><td>Organization the token grants access to.</td></tr>
        <tr><td><code>appResidentTenantId</code></td><td>Tenant the application is resident in.</td></tr>
        <tr><td><code>appResidentOrgUuid</code></td><td>Organization the application is resident in.</td></tr>
        <tr><td><code>subOrgRequest</code></td><td>Whether the request came from a sub-organization.</td></tr>
        <tr><td><code>remoteIp</code></td><td>IP address the request came from.</td></tr>
        <tr><td><code>errorCode</code></td><td>Error code, when the request failed.</td></tr>
        <tr><td><code>errorMsg</code></td><td>Error message, when the request failed.</td></tr>
        <tr><td><code>publishingTime</code></td><td>When the event was published, as an ISO-8601 string.</td></tr>
      </tbody>
    </table>

## Flows

Self-registration, password recovery, and invited-user registration are multi-step flows, and this stream publishes one event per step. That is what makes funnel analysis possible: you can see how many users started sign-up, how many reached email verification, and how many finished.

**`actionName`:** `User-Registration-Flow`, `Password-Recovery-Flow`, or `Invited-User-Registration-Flow`

Group by `flowId` to follow one user through a flow, and by `currentNodeId` and `nodeResponseStatus` to find the step where people drop out.

!!! note "How anonymous steps are linked to users"
    The first steps of a sign-up happen before the user account exists, so there is no user ID to attach them to. Those steps are published against an anonymous identifier instead. When the flow completes and the account is created, a small **user link** event is sent to the Moesif [Users API](https://www.moesif.com/docs/api?openapi_version=2#users){:target="_blank"} that ties the anonymous identifier to the new user ID, so the funnel joins up end to end. The link event carries nothing but those two identifiers.

??? note "All flow attributes"
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>flowType</code></td><td>Which flow this is, such as registration or password recovery.</td></tr>
        <tr><td><code>flowId</code></td><td>Correlates every step of a single flow execution.</td></tr>
        <tr><td><code>stepType</code></td><td>Type of the step that was executed.</td></tr>
        <tr><td><code>currentNodeId</code></td><td>ID of the node that was executed.</td></tr>
        <tr><td><code>currentNodeType</code></td><td>Type of the node that was executed.</td></tr>
        <tr><td><code>nodeResponseStatus</code></td><td>Outcome of the node execution.</td></tr>
        <tr><td><code>nodeResponseType</code></td><td>Type of response the node produced.</td></tr>
        <tr><td><code>executorName</code></td><td>Executor that ran the step, for example the executor for a particular verification method.</td></tr>
        <tr><td><code>applicationId</code></td><td>Application the flow was started from.</td></tr>
        <tr><td><code>tenantDomain</code></td><td>Organization the flow belongs to.</td></tr>
        <tr><td><code>organizationId</code></td><td>Unique ID of that organization.</td></tr>
        <tr><td><code>isOrganizationLogin</code></td><td>Whether the flow ran in an organization (B2B) context.</td></tr>
        <tr><td><code>publishTimestamp</code></td><td>When the event was published, as an ISO-8601 string.</td></tr>
        <tr><td><code>errorCode</code></td><td>Error code, when the step failed.</td></tr>
      </tbody>
    </table>

## Organization switches

In a B2B setup, a user who belongs to one organization can access another. Each switch is published as an event.

**`actionName`:** `Organization-Switch`

`userResidentOrgId` is where the user comes from and `userAccessingOrgId` is where they went, so a breakdown of the two shows how your organizations relate to each other.

??? note "All organization switch attributes"
    <table>
      <thead>
        <tr>
          <th>Attribute</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><code>userResidentOrgId</code></td><td>The user's home organization.</td></tr>
        <tr><td><code>userAccessingOrgId</code></td><td>Organization the user switched into.</td></tr>
        <tr><td><code>serviceProvider</code></td><td>Application the switch was performed for.</td></tr>
        <tr><td><code>serviceProviderTenantDomain</code></td><td>Tenant that application belongs to.</td></tr>
        <tr><td><code>tenantDomain</code></td><td>Organization the switch belongs to.</td></tr>
        <tr><td><code>errorCode</code></td><td>Error code, when the switch failed.</td></tr>
        <tr><td><code>publishTime</code></td><td>When the event was published, as an ISO-8601 string.</td></tr>
      </tbody>
    </table>

{% if is_version is defined %}
## A note on sub-organizations

Activity inside a sub-organization is published against the **root organization**, so everything lands in one place rather than being scattered across workspaces. The sub-organization is not lost: it is preserved in attributes such as `userResidingOrgId` and `userAccessingOrgId`, so you can still filter or break down any chart by sub-organization.
{% endif %}
