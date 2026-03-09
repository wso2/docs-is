# Pre-update password action

The pre-update password action in {{product_name}} lets you check a password during password update flows. You can integrate it with credential intelligence services (like HaveIBeenPwned or SpyCloud) to detect compromised passwords or to compare passwords with allowed or disallowed lists.

## How pre-update password action works

When you configure a pre-update password action with your external service endpoint, {{product_name}} calls your service and waits for a response whenever a password update action triggers. Upon receiving the response, {{product_name}} either returns a client error, server error, or executes based on the response.

=== "v1.x"
    {% include "./action-versions/pre-update-password-action-v1.x.md" %}
=== "v2.x"
    {% include "./action-versions/pre-update-password-action-v2.x.md" %}
