# Organization login for shared users

An organization can include shared users, users who belong to the organization but whose profiles are managed by another organization. Shared users can sign in to the organization using one of the following methods.

- **B2B applications** — applications registered in the parent organization and [shared with child organizations]({{base_path}}/guides/organization-management/share-applications/).
- **Organization applications** — applications [created directly within an organization]({{base_path}}/guides/organization-management/organization-applications/).

This is useful when:

- Applications are created directly in an organization and need to be accessed by users whose identities are managed in a parent or higher-level organization.
- You want shared users to access an organization through its own branded login page.
- You want shared users to authenticate directly into an organization instead of first logging in to their resident organization and then exchanging tokens using the `organization_switch` grant type.

!!! warning
    If the [alternative login identifiers]({{base_path}}/guides/account-configurations/account-login/configure-login-identifiers/) feature is enabled, shared users will not be able to log in to organizations.

## How it works

To enable this behavior for an organization, the **Shared User Identifier** authenticator must be configured as the first step in the application’s login flow. This authenticator identifies whether the user attempting to sign in is a shared user for the target organization. If the user is identified as a shared user, it resolves their resident user profile before continuing with the remaining authentication steps in the flow.

## Single sign-on across organizations

Once a user logs into an organization, they can seamlessly access other shared organizations without re-authenticating. {{ product_name }} achieves this by reusing the active session and extending Single Sign-On (SSO) across all organizations the user is shared to.

A user will skip the login prompt only if their active session was established using the exact authenticator required by the target organization. If no matching active session exists in any of the already authenticated organizations, the user will be prompted to authenticate with that specific authentication method before gaining access.

!!! info
    For this single sign-on to work:

    - Enhanced organization login must be enabled.
    - Each sub-organization the user wishes to single sign-on into must have the **Shared User Identifier** authenticator added as the first step of the login flow, as described in [Add the shared user identifier to the login flow](#add-the-shared-user-identifier-to-the-login-flow).

## Configure shared user login

Follow the steps below to allow shared users to log in directly to an organization.

### Prerequisites

- The user profile must be [shared with the organization]({{base_path}}/guides/organization-management/share-user-profiles/) from a parent or ancestor organization.
- An application must be registered in the organization where the shared user needs to log in or a B2B application must be shared with the organization.

### Add the shared user identifier to the login flow

1. Sign in to the {{ product_name }} Console of the organization.

2. Go to **Applications** and select the application that shared users need to access.

3. Go to the application's **Login Flow** tab.

4. Add the **Shared User Identifier** as the first step of the login flow.

    === "Classic Editor"

        1. In the first step, click **Add Authentication** and select **Shared User Identifier**.

            !!! note
                Remove the **Username & Password** authenticator from the first step. The **Shared User Identifier** must be the only authenticator in the first step.

        2. Add a second authentication step by clicking the **+** icon and add your preferred authenticators (such as Username & Password, a passwordless option, or a federated identity provider) to this step.

    === "Visual Editor"

        1. Switch to the **Visual Editor** tab.

        2. In the first step, click **+ Add Sign In Option** and select **Shared User Identifier**.

            !!! note
                Remove the **Username & Password** authenticator from the first step. The **Shared User Identifier** must be the only authenticator in the first step.

        3. Add a second authentication step by clicking the **+** icon and add your preferred authenticators to this step.

5. Click **Update** to save your changes.

Once configured, shared users will be prompted for their identifier (for example, their username or email) in the first step. {{ product_name }} resolves the resident user and engages the configured authenticators in the next step to complete authentication.

!!! note

    - Password recovery notifications are not triggered for shared user logins in organizations. Shared users must recover their passwords through their resident organization.
    - Password expiry policies configured in the user's **resident** organization apply for shared user logins. If a shared user's password has expired, login to all shared organizations are blocked, but the password reset flow is not initiated from the organization. The user must reset the password through their resident organization.
    - If the resident user profile is locked, login is blocked for all shared profiles of that user across organizations. Failed login attempts during shared user logins are counted against the resident user profile, and the account locking configuration of the **resident** organization determines limits such as the maximum number of failed attempts.
    - For tokens issued through shared user login to organizations, the `sub` claim contains the user ID of the user's **resident** profile rather than the user ID of the shared profile in the accessing organization.
