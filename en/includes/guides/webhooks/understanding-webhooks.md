# Understanding webhooks <div class="md-chip md-chip--preview"><span class="md-chip__label">Preview</span></div>

Webhooks enable your applications to receive instant notifications from {{product_name}}, allowing you to respond immediately to important identity-related events. Common use cases for {{product_name}} webhooks include:

- Automatically provision users or send welcome notifications upon successful user registration.
- Update external user directories or CRM systems whenever a user profile changes.
- Notify external services or security teams immediately upon password changes or resets.
- Integrate with SIEM systems to instantly detect and respond to suspicious login attempts or failed authentications.

Using webhooks, you can seamlessly integrate external systems with {{product_name}}'s identity flows. When an event happens, {{product_name}} immediately sends HTTP callbacks to your configured webhook endpoints. {{product_name}} webhooks use the [WebSubHub](https://websubhub.com/) protocol for secure and reliable event delivery.

!!! Note
      This feature is currently in **Preview**. Functionality and event payloads may change during development.  
      Expect updates without prior notice.

## How webhooks work

When an identity-related event (for example user registration, login success, profile update) occurs within {{product_name}}, it automatically generates a notification event. {{product_name}} sends this event as an HTTP request to your configured webhook URL. The request contains detailed information encoded in a structured JSON payload.

## Webhook event types

{{product_name}} supports webhooks for identity-related events categorized as follows:

- **Login events**
      - Login success
      - Login failure
- **Registration events**
      - Registration success
      - Registration failure
- **Credential events**
      - Credential updates
- **User Account Management events**
      - User profile updates
      - User account status changes (lock/unlock, enable/disable, delete)

Each webhook event payload includes structured details compliant with the [Security Event Token (SET) specification (RFC 8417)](https://datatracker.ietf.org/doc/html/rfc8417), containing issuer information, timestamp, unique identifiers, user and organization context, and event-specific metadata.
