# Policy consent

Policy consent allows you to present users with legal agreements, such as a Privacy Policy or Terms of Service, and capture their explicit acceptance during registration and login flows.

{% if product_name == "WSO2 Identity Server" and is_version == "7.3.0" %}
## Prerequisites

Add the following to your `deployment.toml` to enable the consent management v2 API required for this feature:

```toml
[consent_mgt]
enable_v2_api = true
```
{% endif %}

## Overview

In {{ product_name }}, policies are configured globally and apply across all applications in the organization.

Policy consent is primarily collected during **registration** and **ask-password** flows by adding the **Policy Consent** widget to the flow in the Flow Builder. Policies can also be configured to prompt users during the **login flow** (see [Configure policies for the login flow](#configure-policies-for-the-login-flow)).

## Add a policy

{{ product_name }} includes two built-in policies, **Privacy Policy** and **Terms of Service**, which are linked to the corresponding URLs in your [branding configuration]({{base_path}}/guides/branding/configure-ui-branding/). These default policies can only be configured when branding is enabled. You can also create additional custom policies regardless of the branding configuration.

To add a policy:

1. On the {{ product_name }} Console, go to **Login and Registration** > **Policy Management**.
2. Click **New Policy**.
3. Provide the following details:

    | Field | Description |
    |-------|-------------|
    | **Name** | A unique name for the policy (e.g., *Cookie Policy*). |
    | **Policy URL** | The URL of the hosted policy document. You may use the placeholders `{{lang}}`, `{{country}}`, and `{{locale}}` to serve locale-specific versions (e.g., `https://myapp.com/{{locale}}/privacy-policy`). |
    | **Description** | The checkbox label shown to users on the consent screen. If left empty, a default label is used. To hyperlink any word or phrase to the policy URL, highlight it in the editor and click **Policy Link**. Supports rich text and i18n keys in the format `{{keyName}}`. |
    | **Mandatory** | When enabled, users must accept this policy to proceed. When disabled, the policy is optional. |

    The **Preview** panel on the right updates in real time as you fill in the form.

4. Click **Create**. In the dialog that appears, select whether existing users should be prompted to accept this policy at their next login by checking **Prompt at next login**.
5. Click **Confirm**.

![Create policy]({{base_path}}/assets/img/guides/consent-management/policy-consent/create-policy.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

!!! note
    Policies are automatically inherited by sub-organizations.

## Manage policy versions

Each time you save changes to a policy, {{ product_name }} creates a new version automatically. Use the version selector on the policy page to review the full version history.

To create a new version:

1. On the {{ product_name }} Console, go to **Login and Registration** > **Policy Management**.
2. Open the policy you want to update.
3. On the **General** tab, update the **Policy URL**, **Description**, or **Mandatory** setting as needed.
4. Click **Create New Version**. The **Save as New Version** dialog appears.
5. Check **Prompt at next login** if existing users should be re-prompted to accept this version at their next login.
6. Click **Confirm**.

![Save as New Version dialog]({{base_path}}/assets/img/guides/consent-management/policy-consent/save-policy-version.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

The **Prompt at next login** setting controls re-prompt behavior:

- **Enabled**: Users who have not yet accepted this version will be prompted at their next login (subject to application-level configuration).
- **Disabled**: Existing users are not re-prompted at login. Only users going through registration or ask-password flows will see the updated version.

!!! note
    If a user has not yet consented to any version that has **Prompt at next login** enabled, they will be prompted at login, regardless of whether the latest version has this setting enabled.

## Add the policy consent widget to a flow

To collect policy consent during registration or ask-password, add the **Policy Consent** widget from the **Components** panel in the Flow Builder.

1. On the {{ product_name }} Console, navigate to your application and go to **Login Flow**.
2. Select the **Registration** or **Ask Password** flow.
3. From the **Components** panel, drag the **Policy Consent** widget into the flow.
4. In the widget's properties panel, configure the following:

    | Property | Description |
    |----------|-------------|
    | **Select Policies** | Choose which policies to display in this widget. You can select one or more policies from the list. |
    | **Description** | The header text shown to users above the policy checkboxes. Supports [i18n keys](#localize-the-policy-description). |

![Policy consent widget in Flow Builder]({{base_path}}/assets/img/guides/consent-management/policy-consent/flow-builder-widget.png){: width="500" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## Configure policies for the login flow

To prompt users to accept a policy at login, configure it at both levels described below. A user will be shown the policy at login only when **both** conditions are met:

1. The policy version has **Prompt at next login** enabled.
2. The application is configured to show the policy during login.

To configure the application-level setting:

1. On the {{ product_name }} Console, go to **Login and Registration** > **Policy Management**.
2. Open the policy you want to configure.
3. Go to the **Applications** tab.
4. Click **+ Assign Application** and select the applications that should prompt users to accept this policy at login.

![Applications tab - Assign Applications]({{base_path}}/assets/img/guides/consent-management/policy-consent/policy-login-config.png){: width="700" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

To remove an application, click the delete icon next to it in the list.

!!! note
    Policy consent during login is not supported for federated users or app-native authentication flows.

## Delete a policy

1. On the {{ product_name }} Console, go to **Login and Registration** > **Policy Management**.
2. Click on the policy you want to delete.
3. Scroll to the **Danger Zone** and click **Delete Policy**.
4. Confirm the deletion.

!!! note
    A policy cannot be deleted if any user has already given consent to it.

## What the user sees

**During registration or ask-password:**

The consent screen appearance depends on how the **Policy Consent** widget is configured in the Flow Builder, including which policies are shown and the header description displayed to the user. The following is a sample consent screen:

![Sample policy consent screen during registration]({{base_path}}/assets/img/guides/consent-management/policy-consent/user-consent-screen.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

**During login:**

When a user logs in to a configured application and has not yet accepted a policy version marked with **Prompt at next login**, the policy consent screen is displayed before completing login. Policies are grouped into:

- **New policies** – policies the user has never consented to.
- **Updated policies** – policies the user previously accepted but has a newer version requiring consent.

![Policy consent screen during login]({{base_path}}/assets/img/guides/consent-management/policy-consent/user-login-consent-screen.png){: width="400" style="display: block; margin: 0; border: 0.3px solid lightgrey;"}

## What's next

- [Manage consents]({{base_path}}/guides/user-self-service/manage-consents/) – Users can view and revoke their policy consents from MyAccount.
- [Preference management consent]({{base_path}}/guides/consent-management/preference-management-consent/) – Capture user preferences for specific data uses.
