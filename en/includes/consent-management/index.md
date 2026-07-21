# Consent management

The consent management guide provides instructions for configuring and managing consent within WSO2 Identity Server, allowing organizations to handle user agreements and preferences in a compliant and transparent manner.

{% if product_name == "WSO2 Identity Server" and is_version == "7.3.0" %}
## Prerequisites

!!! note
    These features are available from **update level 7.3.0.5** onwards. See the instructions on [updating WSO2 products](https://updates.docs.wso2.com/en/latest/).

Add the following to your `deployment.toml` to enable the consent management v2 API and its related features:

```toml
[consent_mgt]
enable_v2_api = true

[console.flows.scopes]
read = ["internal_flow_view", "internal_governance_view", "internal_consent_mgt_purpose_view"]
```

Consent webhook events are disabled by default. To enable them, also add the following:

```toml
[identity_mgt.events.schemes]
ConsentEventHook.properties.enable = true
ConsentPurposeEventHook.properties.enable = true

[webhooks.event_profiles]
disabled_channels = []
```
{% endif %}

## User attribute consent

User attribute consent allows organizations to control which user attributes are shared with applications and require explicit user approval before sharing. Learn how to configure it in [Manage consent for user attributes]({{base_path}}/guides/authentication/manage-consent-for-attributes/).

## Policy consent

Policy consent enables organizations to present users with terms of service, privacy policies, or other legal agreements and capture their explicit consent. Learn how to configure it in [Policy consent]({{base_path}}/guides/consent-management/policy-consent/).

## Preference management consent

Preference management consent allows organizations to capture and manage user preferences, such as communication opt-ins and data usage preferences. Learn how to configure it in [Preference management consent]({{base_path}}/guides/consent-management/preference-management-consent/).

## Manage consents

Users can view and revoke consents they have granted for user attributes, policy agreements, and communication preferences. Learn how in [Manage consents]({{base_path}}/guides/user-self-service/manage-consents/).

{% if product_name == "WSO2 Identity Server" and is_version == "7.3.0" %}
## Consent events

{{ product_name }} can dispatch webhook events when users add or revoke consents. Learn more in [Consent events]({{base_path}}/guides/webhooks/webhook-events-and-payloads/#consent-events).
{% endif %}
