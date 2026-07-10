# Usage metrics

WSO2 Identity Platform measures your subscription usage against a set of metrics that reflect how your organization consumes the platform. These metrics determine your consumption against the quotas defined for your subscription tier, and they form the basis for pricing.

The definitions below explain how each usage metric is calculated.

## Monthly Active Users (MAUs)

Monthly Active Users (MAUs) is the number of unique users who successfully log in to or interact with an application within a 30-day billing cycle. WSO2 Identity Platform considers the following factors when calculating MAUs:

- The number of unique users who log in or obtain an access token for a particular application during a calendar month. A subsequent login by the same user is not considered in the MAU count.
- The number of unique users who obtain a new access token via a valid refresh token during a calendar month. Subsequent refresh tokens issued to the same user during the same calendar month are not considered in the MAU count.
- If long-lived tokens are issued and such token validity goes into subsequent months, the number of unique users who have obtained such a long-lived token are counted as MAUs during each month.

## Machine-to-Machine tokens (M2M tokens)

A Machine-to-Machine (M2M) token is an access token type used for authentication and authorization in interactions between software applications, services, or devices acting as themselves. An M2M token is typically obtained through the client credentials grant over the OAuth 2.0 standard. In some cases, the token exchange grant is also used to obtain M2M tokens when used in an application context instead of a user context.

The total number of M2M tokens issued for a given organization is accounted for as part of the M2M token calculation. The following factors apply:

- An M2M token obtained during a calendar month counts toward that month's M2M token quota.
- An M2M token obtained via the token exchange grant in the application context counts toward the M2M token quota for that month.
- An M2M token that is valid for a longer time and overlaps two or more calendar months counts as a single token in its issue month, unless renewed using either token refresh or token exchange mechanism.

## AgentID tokens

An AgentID token is a token issued for an AI agent in the WSO2 Identity Platform. An agent can authenticate using its own credentials, and it can also obtain On-Behalf-Of (OBO) tokens that allow it to act on behalf of a user with that user's explicit authorization. Both categories count toward an organization's total AgentID tokens. The following factors apply:

- An access token that an agent obtains by authenticating during a calendar month counts toward that month's AgentID token quota.
- An On-Behalf-Of (OBO) token issued to an agent so that it can act for a user during a calendar month counts toward that month's AgentID token quota.
- A new agent token or OBO token obtained in exchange for a valid refresh token through the refresh token grant during a calendar month counts toward that month's AgentID token quota.
- An agent token that is valid for a longer time and overlaps two or more calendar months counts as a single token in its issue month, unless renewed, in which case the renewal counts toward the month in which it occurs.

## Organizations

An organization is a dedicated workspace within the WSO2 Identity Platform that provides its own management space under a given root organization. An organization can use resources and configurations shared or inherited from its root or parent organizations, including applications, roles, and branding, while independently managing its own users, organization-specific applications, roles, and configurations.

Each organization, including those created at any level within the organization hierarchy under the root organization, counts toward the organization metric. The following factors apply:

- Every organization present under the root organization during a calendar month counts toward that month's total.
- Organizations created under parent organizations at any level within the organization hierarchy each count as a separate organization.
- An organization continues to count in each calendar month that it remains, and no longer counts after deletion.

## Enterprise SSO connections

An Enterprise SSO connection is a federated identity provider integration, using a standard protocol such as SAML or OIDC, that allows a customer's users to log in through their own corporate identity provider, such as Microsoft Entra ID. Each configured enterprise identity provider connection counts toward the Enterprise SSO connection metric. The following factors apply:

- Each enterprise identity provider connection configured within the organization or its sub-organizations during a calendar month counts toward that month's Enterprise SSO connection total.
- Social and consumer login connections, such as Google, Facebook, or Apple, do not count as Enterprise SSO connections.
